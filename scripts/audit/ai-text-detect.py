#!/usr/bin/env python3
"""
Offline AI-text detector for YardTally tool/guide bodies (not CI by default).

Uses Hugging Face sequence classifiers when transformers+torch are installed:
  - openai-community/roberta-base-openai-detector
  - Hello-SimpleAI/chatgpt-detector-roberta

Usage:
  python3 scripts/audit/ai-text-detect.py [slug ...]
  python3 scripts/audit/ai-text-detect.py --file path/to/text.txt

Exit 0 always after printing a markdown table (rewrite until AI prob < 30%).
"""
from __future__ import annotations

import argparse
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def strip_html(raw: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", raw, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_tool_body(slug: str) -> str:
    path = ROOT / "src/data/toolBodies.ts"
    src = path.read_text(encoding="utf-8")
    # Match: 'slug': `...`,
    pat = re.compile(
        rf"(?:^|\n)\s*'{re.escape(slug)}'\s*:\s*`([\s\S]*?)`\s*,",
        re.M,
    )
    m = pat.search(src)
    if not m:
        raise SystemExit(f"No toolBodies entry for {slug!r}")
    return strip_html(m.group(1))


def chunk(text: str, max_chars: int = 1800) -> list[str]:
    if len(text) <= max_chars:
        return [text]
    parts: list[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        if end < len(text):
            cut = text.rfind(". ", start, end)
            if cut > start + max_chars // 2:
                end = cut + 1
        parts.append(text[start:end].strip())
        start = end
    return [p for p in parts if p]


def score_with_pipeline(model_id: str, text: str) -> float | None:
    try:
        from transformers import pipeline  # type: ignore
    except Exception as exc:  # noqa: BLE001
        print(f"(skip {model_id}: transformers unavailable: {exc})", file=sys.stderr)
        return None

    try:
        clf = pipeline("text-classification", model=model_id, truncation=True)
    except Exception as exc:  # noqa: BLE001
        print(f"(skip {model_id}: load failed: {exc})", file=sys.stderr)
        return None

    # Average Fake/ChatGPT probability across chunks (label names vary by model).
    probs: list[float] = []
    for part in chunk(text):
        out = clf(part)[0]
        label = str(out.get("label", "")).lower()
        score = float(out.get("score", 0.0))
        if label in {"fake", "chatgpt", "ai", "generated", "gpt"}:
            probs.append(score)
        elif label in {"real", "human", "original"}:
            probs.append(1.0 - score)
        else:
            # openai detector: Label_0/Label_1 historically; prefer Fake if present
            probs.append(score if "fake" in label or label.endswith("1") else 1.0 - score)
    if not probs:
        return None
    return sum(probs) / len(probs)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("slugs", nargs="*", help="toolBodies slug(s)")
    parser.add_argument("--file", help="plain text file instead of slug")
    args = parser.parse_args()

    items: list[tuple[str, str]] = []
    if args.file:
        items.append((args.file, Path(args.file).read_text(encoding="utf-8")))
    else:
        slugs = args.slugs or ["french-drain-gravel-calculator"]
        for slug in slugs:
            items.append((slug, extract_tool_body(slug)))

    models = [
        "openai-community/roberta-base-openai-detector",
        "Hello-SimpleAI/chatgpt-detector-roberta",
    ]

    print("| Article | Detector | AI probability | Verdict |")
    print("|---|---|---:|---|")
    for name, text in items:
        for model in models:
            p = score_with_pipeline(model, text)
            if p is None:
                print(f"| {name} | `{model}` | n/a | detector unavailable |")
                continue
            verdict = "human" if p < 0.30 else "rewrite"
            print(f"| {name} | `{model}` | {p * 100:.1f}% | {verdict} |")


if __name__ == "__main__":
    main()
