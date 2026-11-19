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
#!/usr/bin/env node
/**
 * Optional AI-text detector for YardTally tool/guide bodies (not wired into CI).
 *
 * Always runs a fast heuristic (banned AI-tell phrases + sentence-length burstiness).
 * When AI_DETECT_MODEL=1 and Python `transformers` + torch are installed, also runs:
 *   - Hello-SimpleAI/chatgpt-detector-roberta
 *   - openai-community/roberta-base-openai-detector
 *
 * Usage:
 *   node scripts/audit/ai-text-detect.mjs [slug...]
 *   AI_DETECT_MODEL=1 node scripts/audit/ai-text-detect.mjs concrete-slab-cost-calculator
 *
 * Target: AI probability < 0.30 on every detector used.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

const BANNED = [
  'delve',
  "in today's",
  "it's important to note",
  'navigate',
  'robust',
  'seamless',
  'leverage',
  'unlock',
  'elevate',
  'comprehensive guide',
  'in conclusion',
  "whether you're a",
  'game-changer',
  'dive into',
  'look no further',
];

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

function heuristicScore(text) {
  const lower = text.toLowerCase();
  const hits = BANNED.filter((w) => lower.includes(w));
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  const variance =
    lengths.length > 1
      ? lengths.reduce((a, b) => a + (b - avg) ** 2, 0) / lengths.length
      : 0;
  const burstPenalty = variance < 20 ? 0.15 : variance < 40 ? 0.05 : 0;
  const banPenalty = Math.min(0.5, hits.length * 0.12);
  return {
    method: 'heuristic',
    aiProbability: Number(Math.min(0.95, banPenalty + burstPenalty).toFixed(3)),
    bannedHits: hits,
    lengthVariance: Number(variance.toFixed(1)),
  };
}

function pythonHfScores(text) {
  const tmp = path.join(os.tmpdir(), `yt-ai-detect-${process.pid}.txt`);
  fs.writeFileSync(tmp, text.slice(0, 1200), 'utf8');
  const py = `
import json, re, sys
from pathlib import Path
text = Path(sys.argv[1]).read_text(encoding="utf8")
try:
  from transformers import pipeline
except Exception as e:
  print(json.dumps({"error": "no-transformers:" + str(e)}))
  raise SystemExit(0)
rows = []
for name in [
  "Hello-SimpleAI/chatgpt-detector-roberta",
  "openai-community/roberta-base-openai-detector",
]:
  try:
    out = pipeline("text-classification", model=name)(text)[0]
    label, score = out["label"], float(out["score"])
    if re.search(r"fake|chatgpt|ai|gpt", label, re.I):
      ai = score
    elif re.search(r"real|human", label, re.I):
      ai = 1 - score
    elif label == "LABEL_0":
      ai = score
    elif label == "LABEL_1":
      ai = 1 - score
    else:
      ai = score
    rows.append({"method": name, "label": label, "aiProbability": round(ai, 3)})
  except Exception as e:
    rows.append({"method": name, "error": str(e), "aiProbability": None})
print(json.dumps({"rows": rows}))
`;
  try {
    const r = spawnSync('python3', ['-c', py, tmp], {
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    });
    if (r.status !== 0) {
      return { error: (r.stderr || r.stdout || 'python failed').slice(0, 400) };
    }
    const line = r.stdout
      .trim()
      .split('\n')
      .filter(Boolean)
      .pop();
    return JSON.parse(line);
  } finally {
    try {
      fs.unlinkSync(tmp);
    } catch {
      /* ignore */
    }
  }
}

function loadToolBody(slug) {
  const src = fs.readFileSync(path.join(root, 'src/data/toolBodies.ts'), 'utf8');
  const re = new RegExp(`'${slug}'\\s*:\\s*\`([\\s\\S]*?)\`,`, 'm');
  const m = src.match(re);
  if (!m) throw new Error(`No toolBodies entry for ${slug}`);
  return stripHtml(m[1]);
}

function printRow(page, row) {
  if (row.aiProbability == null) {
    console.log(`| ${page} | ${row.method} | — | — | ${row.error || row.notes || ''} |`);
    return false;
  }
  const pass = row.aiProbability < 0.3;
  const notes = [
    row.bannedHits?.length ? `banned: ${row.bannedHits.join(', ')}` : '',
    row.lengthVariance != null ? `burst var ${row.lengthVariance}` : '',
    row.label ? `label ${row.label}` : '',
    row.method === 'heuristic' && !row.bannedHits?.length ? 'no banned phrases' : '',
  ]
    .filter(Boolean)
    .join('; ');
  console.log(
    `| ${page} | ${row.method} | ${row.aiProbability} | ${pass ? 'yes' : 'no'} | ${notes} |`,
  );
  return pass;
}

function main() {
  const args = process.argv.slice(2);
  const targets = [];
  if (args[0] === '--file' && args[1]) {
    targets.push({ id: path.basename(args[1]), text: fs.readFileSync(args[1], 'utf8') });
  } else {
    const slugs = args.length ? args : ['concrete-slab-cost-calculator'];
    for (const slug of slugs) {
      targets.push({ id: slug, text: loadToolBody(slug) });
    }
  }

  const useModel = process.env.AI_DETECT_MODEL === '1';
  console.log('| Page | Method | AI probability | Pass (<0.30) | Notes |');
  console.log('|---|---|---:|:---:|---|');

  let allPass = true;
  for (const t of targets) {
    const h = heuristicScore(t.text);
    if (!printRow(t.id, h)) allPass = false;
    if (useModel) {
      const m = pythonHfScores(t.text);
      if (m.error) {
        printRow(t.id, { method: 'hf-unavailable', aiProbability: null, error: m.error });
      } else {
        for (const row of m.rows || []) {
          if (!printRow(t.id, row)) allPass = false;
        }
      }
    }
  }
  if (!allPass) process.exitCode = 1;
}

main();
