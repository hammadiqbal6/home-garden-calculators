#!/usr/bin/env node
/**
 * YardTally AI-likeness scorer for guide/tool HTML bodies.
 * Thin Node wrapper around scripts/audit/ai-detect.py (Hugging Face local models).
 *
 * Usage:
 *   node scripts/audit/ai-detect.mjs
 *   node scripts/audit/ai-detect.mjs --strict
 *
 * Not wired into CI — model download + CPU inference is too heavy.
 * See docs/WRITING-GUIDE.md and docs/ai-detect-scores.md.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const py = path.join(root, 'scripts/audit/ai-detect.py');
const args = process.argv.slice(2);

const result = spawnSync('python3', [py, ...args], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  console.error('Failed to run ai-detect.py:', result.error.message);
  console.error('Install: pip3 install --user torch transformers');
  process.exit(1);
}

process.exit(result.status ?? 1);
