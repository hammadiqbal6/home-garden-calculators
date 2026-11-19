#!/usr/bin/env python3
"""
Offline AI-text detector helper for YardTally copy QA.

Uses Hugging Face sequence-classification checkpoints when torch is available.
Not run in CI (model download + CPU inference is slow). Preferred models:

  - openai-community/roberta-base-openai-detector
  - Hello-SimpleAI/chatgpt-detector-roberta

Usage:
  python3 scripts/audit/ai-text-detect.py path/to/text.txt
  python3 scripts/audit/ai-text-detect.py --text "…"
  echo "…" | python3 scripts/audit/ai-text-detect.py -

Exit 0 always (reporting tool). Prints AI probability per model; treat AI≥0.30
as a rewrite signal for human-writing QA.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

MODELS = [
    "openai-community/roberta-base-openai-detector",
    "Hello-SimpleAI/chatgpt-detector-roberta",
]


def read_input(args: argparse.Namespace) -> str:
    if args.text is not None:
        return args.text.strip()
    if args.path == "-":
        return sys.stdin.read().strip()
    return Path(args.path).read_text(encoding="utf-8").strip()


def chunk(text: str, max_chars: int = 1800) -> list[str]:
    """Rough character chunks so long pages fit RoBERTa context."""
    text = " ".join(text.split())
    if len(text) <= max_chars:
        return [text]
    parts: list[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        if end < len(text):
            # break on space when possible
            sp = text.rfind(" ", start, end)
            if sp > start + max_chars // 2:
                end = sp
        parts.append(text[start:end].strip())
        start = end
    return [p for p in parts if p]


def score_model(model_id: str, text: str) -> float:
    from transformers import pipeline

    clf = pipeline("text-classification", model=model_id, truncation=True)
    parts = chunk(text)
    ai_scores: list[float] = []
    for part in parts:
        out = clf(part)[0]
        label = str(out["label"]).lower()
        score = float(out["score"])
        # Normalize to P(AI)
        if "fake" in label or "ai" in label or "chatgpt" in label or label in {"1", "label_1"}:
            ai_scores.append(score)
        elif "real" in label or "human" in label or label in {"0", "label_0"}:
            ai_scores.append(1.0 - score)
        else:
            # Unknown label scheme — assume positive class is AI when score high
            ai_scores.append(score if "gpt" in label or "generated" in label else 1.0 - score)
    return sum(ai_scores) / len(ai_scores)


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("path", nargs="?", help="Text file, or - for stdin")
    p.add_argument("--text", help="Inline text instead of a file")
    p.add_argument(
        "--model",
        action="append",
        dest="models",
        help="Model id (repeatable). Defaults to both preferred detectors.",
    )
    args = p.parse_args()
    if not args.text and not args.path:
        p.error("Provide a path or --text")

    text = read_input(args)
    if not text:
        print("Empty input", file=sys.stderr)
        return 1

    models = args.models or MODELS
    print(f"chars={len(text)} words={len(text.split())}")
    for mid in models:
        try:
            ai = score_model(mid, text)
            verdict = "human" if ai < 0.30 else "ai-likely"
            print(f"{mid}\tAI={ai:.3f}\t{verdict}")
        except Exception as e:  # noqa: BLE001 — report and continue other models
            print(f"{mid}\tERROR\t{e}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
