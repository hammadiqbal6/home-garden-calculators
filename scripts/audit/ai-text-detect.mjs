#!/usr/bin/env node
/**
 * Optional AI-text detector for YardTally tool/guide bodies.
 * Not run in CI (model download is heavy). Prefer a local Hugging Face
 * RoBERTa OpenAI detector when Python + transformers are available.
 *
 * Usage:
 *   node scripts/audit/ai-text-detect.mjs --slug deck-footing-calculator
 *   node scripts/audit/ai-text-detect.mjs --file /tmp/sample.txt
 *
 * Exit 0 always after printing scores (rewrite guidance is manual).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

function stripHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractToolBody(slug) {
  const src = fs.readFileSync(path.join(root, 'src/data/toolBodies.ts'), 'utf8');
  const re = new RegExp(`'${slug}':\\s*\`([\\s\\S]*?)\`,\\s*\\n\\s*'`, 'm');
  const m = src.match(re);
  if (!m) {
    // last entry or end of object
    const re2 = new RegExp(`'${slug}':\\s*\`([\\s\\S]*?)\`,\\s*\\n\\}`, 'm');
    const m2 = src.match(re2);
    if (!m2) throw new Error(`toolBodies slug not found: ${slug}`);
    return stripHtml(m2[1]);
  }
  return stripHtml(m[1]);
}

function extractAnswerFirst(slug) {
  const src = fs.readFileSync(path.join(root, 'src/data/tools.ts'), 'utf8');
  const idx = src.indexOf(`slug: '${slug}'`);
  if (idx < 0) return '';
  const slice = src.slice(idx, idx + 2500);
  const m = slice.match(/answerFirst:\s*\n?\s*'([^']+)'/) || slice.match(/answerFirst:\s*\n?\s*"([^"]+)"/);
  return m ? m[1] : '';
}

const args = process.argv.slice(2);
let text = '';
let label = 'stdin';

if (args.includes('--slug')) {
  const slug = args[args.indexOf('--slug') + 1];
  label = slug;
  const body = extractToolBody(slug);
  const af = extractAnswerFirst(slug);
  text = [af, body].filter(Boolean).join('\n\n');
} else if (args.includes('--file')) {
  const file = args[args.indexOf('--file') + 1];
  label = file;
  text = fs.readFileSync(file, 'utf8');
} else if (!process.stdin.isTTY) {
  text = fs.readFileSync(0, 'utf8');
} else {
  console.error('Usage: node scripts/audit/ai-text-detect.mjs --slug <tool-slug> | --file <path>');
  process.exit(1);
}

const tmp = path.join(root, '.cache', 'ai-detect-sample.txt');
fs.mkdirSync(path.dirname(tmp), { recursive: true });
fs.writeFileSync(tmp, text);

const py = `
import json, sys
text = open(${JSON.stringify(tmp)}, encoding="utf-8").read()
# Chunk ~500 tokens worth of chars for classifier stability
chunks = []
step = 1200
for i in range(0, max(1, len(text)), step):
    chunk = text[i : i + step].strip()
    if chunk:
        chunks.append(chunk)
if not chunks:
    print(json.dumps({"error": "empty text"}))
    sys.exit(0)

try:
    from transformers import pipeline
except Exception as e:
    print(json.dumps({"error": "transformers_missing", "detail": str(e)}))
    sys.exit(0)

# openai-community/roberta-base-openai-detector: Fake=AI, Real=Human
clf = pipeline(
    "text-classification",
    model="openai-community/roberta-base-openai-detector",
    truncation=True,
    max_length=512,
)
rows = []
ai_probs = []
for c in chunks:
    out = clf(c)[0]
    label = out["label"]
    score = float(out["score"])
    # Model labels: Real / Fake (Fake ≈ AI-written)
    if label.lower() in ("fake", "ai", "gpt", "chatgpt"):
        ai = score
    else:
        ai = 1.0 - score
    ai_probs.append(ai)
    rows.append({"label": label, "score": round(score, 4), "ai_prob": round(ai, 4), "chars": len(c)})
avg = sum(ai_probs) / len(ai_probs)
print(json.dumps({
    "model": "openai-community/roberta-base-openai-detector",
    "chunks": rows,
    "avg_ai_prob": round(avg, 4),
    "pass": avg < 0.30,
}))
`;

const pyFile = path.join(root, '.cache', 'ai-detect-run.py');
fs.writeFileSync(pyFile, py);

console.log(`AI text detect: ${label} (${text.length} chars)`);
const res = spawnSync('python3', [pyFile], {
  encoding: 'utf8',
  cwd: root,
  maxBuffer: 20 * 1024 * 1024,
  env: { ...process.env, TOKENIZERS_PARALLELISM: 'false' },
});
if (res.stdout) process.stdout.write(res.stdout);
if (res.stderr) process.stderr.write(res.stderr);
if (res.status && res.status !== 0) {
  console.error(JSON.stringify({ error: 'python_failed', status: res.status }));
}
