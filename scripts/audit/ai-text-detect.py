#!/usr/bin/env python3
"""
Offline-ish AI-text detector for YardTally tool/guide bodies.

Uses Hugging Face transformers with one or both of:
  - openai-community/roberta-base-openai-detector
  - Hello-SimpleAI/chatgpt-detector-roberta

Not wired into CI (model download is heavy). Run manually:

  python3 scripts/audit/ai-text-detect.py --slug concrete-footing-calculator
  python3 scripts/audit/ai-text-detect.py --file /tmp/body.txt

Target: Fake/AI probability < 0.30 on every detector used.
"""

from __future__ import annotations

import argparse
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

DETECTORS = [
    "openai-community/roberta-base-openai-detector",
    "Hello-SimpleAI/chatgpt-detector-roberta",
]


def strip_html(raw: str) -> str:
    text = re.sub(r"(?is)<script.*?>.*?</script>", " ", raw)
    text = re.sub(r"(?is)<style.*?>.*?</style>", " ", text)
    text = re.sub(r"(?s)<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_tool_body(slug: str) -> str:
    path = ROOT / "src/data/toolBodies.ts"
    src = path.read_text(encoding="utf-8")
    # Match 'slug': `...`,
    pattern = rf"'{re.escape(slug)}'\s*:\s*`([\s\S]*?)`\s*,"
    m = re.search(pattern, src)
    if not m:
        raise SystemExit(f"No toolBodies entry for slug={slug!r} in {path}")
    return strip_html(m.group(1))


def chunk_text(text: str, max_chars: int = 900) -> list[str]:
    words = text.split()
    chunks: list[str] = []
    cur: list[str] = []
    size = 0
    for w in words:
        add = len(w) + (1 if cur else 0)
        if cur and size + add > max_chars:
            chunks.append(" ".join(cur))
            cur = [w]
            size = len(w)
        else:
            cur.append(w)
            size += add
    if cur:
        chunks.append(" ".join(cur))
    return chunks or [text]


def score_with_pipeline(pipe, text: str) -> float:
    """Return Fake/AI probability in [0,1] averaged across chunks."""
    scores = []
    for chunk in chunk_text(text):
        out = pipe(chunk, truncation=True)
        # pipeline may return list[dict] or list[list[dict]]
        labels = out[0] if out and isinstance(out[0], list) else out
        fake = None
        real = None
        for item in labels:
            label = str(item["label"]).lower()
            score = float(item["score"])
            if label in {"fake", "ai", "chatgpt", "generated"}:
                fake = score
            elif label in {"real", "human", "original"}:
                real = score
        if fake is not None:
            scores.append(fake)
        elif real is not None:
            scores.append(1.0 - real)
        else:
            # Unknown label set — take the non-human-looking top label if present
            top = max(labels, key=lambda x: float(x["score"]))
            lab = str(top["label"]).lower()
            scores.append(float(top["score"]) if lab not in {"real", "human"} else 1.0 - float(top["score"]))
    return sum(scores) / len(scores)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--slug", help="toolBodies.ts slug to score")
    ap.add_argument("--file", type=Path, help="plain text / HTML file to score")
    ap.add_argument("--threshold", type=float, default=0.30, help="max Fake/AI probability")
    ap.add_argument(
        "--models",
        nargs="+",
        default=DETECTORS,
        help="HF model ids to run",
    )
    args = ap.parse_args()

    if bool(args.slug) == bool(args.file):
        ap.error("Provide exactly one of --slug or --file")

    text = extract_tool_body(args.slug) if args.slug else strip_html(args.file.read_text(encoding="utf-8"))
    if len(text.split()) < 40:
        print("WARN: text is short; detector scores may be noisy", file=sys.stderr)

    try:
        from transformers import pipeline  # type: ignore
    except ImportError:
        print(
            "transformers not installed. Try:\n"
            "  pip install 'torch' --index-url https://download.pytorch.org/whl/cpu\n"
            "  pip install transformers\n",
            file=sys.stderr,
        )
        return 2

    print(f"chars={len(text)} words≈{len(text.split())}")
    print("| Detector | Fake/AI probability | Pass (<{:.0%}) |".format(args.threshold))
    print("|---|---|---|")

    failed = False
    for model in args.models:
        try:
            pipe = pipeline("text-classification", model=model, top_k=None)
            p_fake = score_with_pipeline(pipe, text)
            ok = p_fake < args.threshold
            if not ok:
                failed = True
            print(f"| `{model}` | {p_fake:.1%} | {'yes' if ok else 'NO'} |")
        except Exception as exc:  # noqa: BLE001 — report per-model failure
            failed = True
            print(f"| `{model}` | error: {exc} | NO |")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
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
