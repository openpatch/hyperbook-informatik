#!/usr/bin/env python3
"""Export unchanged teaching-test sources; checks never modify the browser checkout."""
import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--online-ide", type=Path, required=True)
parser.add_argument("--check", action="store_true")
args = parser.parse_args()
if not (args.online_ide / "package.json").is_file():
    sys.exit("Browser checkout missing: " + str(args.online_ide))
for name in ("Punkteregel.java", "PunkteregelTest.java"):
    source = ROOT / "archives/spielwerkstatt-q-07-testen" / name
    target = args.online_ide / "src/test/teaching" / name
    if args.check:
        if not target.exists() or target.read_bytes() != source.read_bytes():
            sys.exit("Stale teaching checks: " + str(target))
    else:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(source.read_bytes())
print("Portable teaching test sources current")
