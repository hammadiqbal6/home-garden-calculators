#!/usr/bin/env python3
"""
Score YardTally guideBodies / toolBodies for AI-likeness with local HF detectors.

Models (both run when available; table reports the worse / higher AI %):
  1. Hello-SimpleAI/chatgpt-detector-roberta
  2. openai-community/roberta-base-openai-detector

Not wired into CI — run manually:
  python3 scripts/audit/ai-detect.py
  node scripts/audit/ai-detect.mjs

Writes docs/ai-detect-scores.md and prints a markdown table to stdout.
Exit 0 always (best-effort); exit 2 if any scored body is >= 30% AI when --strict.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GUIDE_BODIES = ROOT / "src" / "data" / "guideBodies.ts"
TOOL_BODIES = ROOT / "src" / "data" / "toolBodies.ts"
OUT_MD = ROOT / "docs" / "ai-detect-scores.md"
TARGET_AI_PCT = 30.0

MODEL_CANDIDATES = [
    "Hello-SimpleAI/chatgpt-detector-roberta",
    "openai-community/roberta-base-openai-detector",
]


class _TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style"}:
            self._skip = True

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self._skip = False

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)


def html_to_text(html: str) -> str:
    parser = _TextExtractor()
    try:
        parser.feed(html)
    except Exception:
        return re.sub(r"<[^>]+>", " ", html)
    text = " ".join(parser.parts)
    return re.sub(r"\s+", " ", text).strip()


def extract_bodies(path: Path) -> dict[str, str]:
    raw = path.read_text(encoding="utf-8")
    pattern = re.compile(
        r"^\s*'([^']+)':\s*`(.*?)`\s*,?\s*$",
        re.MULTILINE | re.DOTALL,
    )
    return {m.group(1): m.group(2) for m in pattern.finditer(raw)}


def load_detector(model_id: str):
    import torch
    from transformers import AutoModelForSequenceClassification, AutoTokenizer

    print(f"Loading model: {model_id}", file=sys.stderr)
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForSequenceClassification.from_pretrained(model_id)
    model.eval()
    device = torch.device("cpu")
    model.to(device)
    id2label = {int(k): str(v) for k, v in getattr(model.config, "id2label", {}).items()}
    return tokenizer, model, device, id2label, model_id


def resolve_ai_index(id2label: dict[int, str], n: int) -> int:
    labels = [id2label.get(i, str(i)).lower() for i in range(n)]
    for i, lab in enumerate(labels):
        if any(x in lab for x in ("fake", "ai", "chatgpt", "gpt")):
            return i
    # Fallback: older OpenAI detector often uses LABEL_0=Fake
    return 0


def score_text(tokenizer, model, device, id2label, text: str) -> dict:
    import torch

    max_len = 512
    stride = 256
    enc = tokenizer(text, return_tensors="pt", truncation=False, add_special_tokens=True)
    input_ids = enc["input_ids"][0]
    n = input_ids.size(0)
    if n == 0:
        return {"ai_pct": 0.0, "human_pct": 100.0, "chunks": 0}

    chunks = []
    start = 0
    while start < n:
        end = min(start + max_len, n)
        chunk_ids = input_ids[start:end].unsqueeze(0)
        attn = torch.ones_like(chunk_ids)
        with torch.no_grad():
            logits = model(input_ids=chunk_ids.to(device), attention_mask=attn.to(device)).logits[0]
            probs = torch.softmax(logits.float(), dim=-1)
        chunks.append(probs.cpu())
        if end >= n:
            break
        start += stride

    mean = torch.stack(chunks).mean(dim=0)
    ai_idx = resolve_ai_index(id2label, mean.size(0))
    human_idx = 1 - ai_idx if mean.size(0) > 1 else 0
    ai_pct = float(mean[ai_idx].item() * 100.0)
    human_pct = float(mean[human_idx].item() * 100.0)
    return {
        "ai_pct": round(ai_pct, 1),
        "human_pct": round(human_pct, 1),
        "chunks": len(chunks),
    }


def try_load_models():
    loaded = []
    errors = []
    for mid in MODEL_CANDIDATES:
        try:
            loaded.append(load_detector(mid))
        except Exception as e:  # noqa: BLE001
            errors.append(f"{mid}: {e}")
            print(f"Model load failed for {mid}: {e}", file=sys.stderr)
    return loaded, errors


def write_scores_md(rows: list[dict], model_names: list[str], notes: str) -> None:
    lines = [
        "# AI detector scores (YardTally bodies)",
        "",
        f"**Last run:** {time.strftime('%Y-%m-%d')}",
        f"**Models:** {', '.join(f'`{m}`' for m in model_names)}",
        f"**Target:** AI probability &lt; {TARGET_AI_PCT:.0f}% (gate uses the **higher** AI % across models)",
        "",
        notes.strip(),
        "",
        "| Type | Slug | AI % (max) | Hello-SimpleAI | OpenAI-detector | Pass (&lt;30%) |",
        "|---|---|---:|---:|---:|:---:|",
    ]
    for r in rows:
        hs = r.get("hello_ai", "—")
        oa = r.get("openai_ai", "—")
        hs_s = f"{hs:.1f}" if isinstance(hs, float) else hs
        oa_s = f"{oa:.1f}" if isinstance(oa, float) else oa
        passed = "yes" if r["ai_pct"] < TARGET_AI_PCT else "no"
        lines.append(
            f"| {r['type']} | `{r['slug']}` | {r['ai_pct']:.1f} | {hs_s} | {oa_s} | {passed} |"
        )
    fails = [r for r in rows if r["ai_pct"] >= TARGET_AI_PCT]
    lines.extend(
        [
            "",
            f"**Summary:** {len(rows)} bodies scored · {len(rows) - len(fails)} pass · {len(fails)} fail",
            "",
            "## How to re-run",
            "",
            "```bash",
            "python3 scripts/audit/ai-detect.py",
            "# or",
            "node scripts/audit/ai-detect.mjs",
            "```",
            "",
            "Not part of CI (model download + CPU inference). See [`docs/WRITING-GUIDE.md`](WRITING-GUIDE.md).",
            "",
        ]
    )
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true", help="Exit 2 if any body >= 30% AI")
    parser.add_argument("--json", action="store_true", help="Also print JSON to stdout")
    parser.add_argument("--limit", type=int, default=0, help="Score only first N bodies (debug)")
    args = parser.parse_args()

    guides = extract_bodies(GUIDE_BODIES)
    tools = extract_bodies(TOOL_BODIES)
    items = [("guide", k, v) for k, v in guides.items()] + [
        ("tool", k, v) for k, v in tools.items()
    ]
    if args.limit:
        items = items[: args.limit]

    loaded, errors = try_load_models()
    if not loaded:
        notes = (
            "## Detector unavailable\n\n"
            "Could not load a local Hugging Face detector. Tried:\n\n"
            + "\n".join(f"- `{e}`" for e in errors)
            + "\n\nBodies were still rewritten to [`docs/WRITING-GUIDE.md`](WRITING-GUIDE.md). "
            "Install `torch` + `transformers` and re-run this script.\n"
        )
        OUT_MD.write_text(
            "# AI detector scores (YardTally bodies)\n\n"
            f"**Last run:** {time.strftime('%Y-%m-%d')}\n\n" + notes,
            encoding="utf-8",
        )
        print(notes)
        return 0

    model_names = [m[-1] for m in loaded]
    rows = []
    for typ, slug, html in items:
        text = html_to_text(html)
        if len(text) < 40:
            text = text + " " + slug.replace("-", " ")
        per_model: dict[str, float] = {}
        for tokenizer, model, device, id2label, mid in loaded:
            result = score_text(tokenizer, model, device, id2label, text)
            short = "hello" if "Hello-SimpleAI" in mid else "openai"
            per_model[short] = result["ai_pct"]
            print(
                f"{typ:5} {slug:40} [{short}] AI={result['ai_pct']:5.1f}%",
                file=sys.stderr,
            )
        ai_max = max(per_model.values()) if per_model else 0.0
        rows.append(
            {
                "type": typ,
                "slug": slug,
                "ai_pct": ai_max,
                "hello_ai": per_model.get("hello"),
                "openai_ai": per_model.get("openai"),
            }
        )

    notes = (
        "Local Hugging Face sequence classifiers on stripped HTML from "
        "`src/data/guideBodies.ts` and `src/data/toolBodies.ts`. "
        "Each model averages overlapping 512-token chunks. The gate column uses the "
        "**maximum** AI % across models. Commercial detectors (GPTZero, etc.) may differ."
    )
    write_scores_md(rows, model_names, notes)

    print(f"\nModels: {', '.join(f'`{m}`' for m in model_names)} · target AI < {TARGET_AI_PCT:.0f}%\n")
    print("| Type | Slug | AI % (max) | Pass |")
    print("|---|---|---:|:---:|")
    for r in rows:
        passed = "yes" if r["ai_pct"] < TARGET_AI_PCT else "no"
        print(f"| {r['type']} | `{r['slug']}` | {r['ai_pct']:.1f} | {passed} |")

    if args.json:
        print(json.dumps({"models": model_names, "rows": rows}, indent=2))

    if args.strict and any(r["ai_pct"] >= TARGET_AI_PCT for r in rows):
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
