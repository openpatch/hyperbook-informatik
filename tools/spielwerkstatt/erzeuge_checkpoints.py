#!/usr/bin/env python3
"""Erzeugt die Checkpoints der Spielwerkstatt fuer die Online-IDE.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/spielwerkstatt/erzeuge_checkpoints.py

Ein Checkpoint ist ein Stand des Referenzspiels, mit dem man wieder einsteigen
kann, wenn man laenger gefehlt hat. Es gibt ihn zweimal:

- auf dem Rechner als vollstaendiges ZIP-Archiv mit allen Assets:
  archives/<name>, eingebunden mit ::archive (fuer Studio, BlueJ und VS Code)
- im Buch als Workspace-Datei: book/projekte/spielwerkstatt/checkpoints/<name>.json

Die Workspace-Datei laedt man in der eingebetteten Online-IDE ueber den Knopf
"Workspace aus Datei laden". Sie ersetzt dann alle Dateien des Arbeitsbereichs.
Das Format liest die IDE in loadWorkspaceFromFile:

    {"name": ..., "settings": {"language": "Java", "libraries": [...]},
     "modules": [{"name": "Welt.java", "text": "..."}, ...]}

Importe bleiben erhalten. Assets und Abiturklassen werden als Daten-URLs
mitgenommen; desktopFiles verhindert doppelte NRW-Klassen im Browser.
Die Studio-Einstellungen und Verhaltenstests werden in .scratch4j/ des
vollstaendigen Archivs abgelegt. Die ZIPs dieser Archive erzeugt Hyperbook.
"""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import sys
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
ARCHIVE = ROOT / "archives"
ZIEL = ROOT / "book" / "projekte" / "spielwerkstatt" / "checkpoints"

# Archivname -> Name des Workspace. Die Reihenfolge ist die der Lernpfade.
CHECKPOINTS = {
    "spielwerkstatt": "Spielwerkstatt: Start",
    "spielwerkstatt-ef-02-variablen": "Spielwerkstatt: nach Variablen und Datentypen",
    "spielwerkstatt-ef-03-kontrollstrukturen": "Spielwerkstatt: nach Kontrollstrukturen",
    "spielwerkstatt-ef-04-methoden": "Spielwerkstatt: nach Methoden",
    "spielwerkstatt-ef-05-felder": "Spielwerkstatt: nach Feldern",
    "spielwerkstatt-ef-06-objektorientierung": "Spielwerkstatt: nach Objektorientierung",
    "spielwerkstatt-ef-07-suchen-und-sortieren": "Spielwerkstatt: nach Suchen und Sortieren",
    "spielwerkstatt-q-01-objektorientierung": "Spielwerkstatt: nach Vertiefter Objektorientierung",
    "spielwerkstatt-q-02-felder-und-referenzen": "Spielwerkstatt: nach Feldern, Referenzen und Generik",
    "spielwerkstatt-q-03-rekursion": "Spielwerkstatt: nach Rekursion",
    "spielwerkstatt-q-04-lineare-datenstrukturen": "Spielwerkstatt: nach Linearen Datenstrukturen",
    "spielwerkstatt-q-05-baeume": "Spielwerkstatt: nach Nichtlinearen Datenstrukturen",
    "spielwerkstatt-q-06-sortieren": "Spielwerkstatt: nach Suchen und Sortieren (Q)",
    "spielwerkstatt-q-07-testen": "Spielwerkstatt: nach Testen und Laufzeit",
}

ABITURKLASSEN = {"List", "Queue", "Stack", "BinaryTree", "BinarySearchTree",
                 "ComparableContent", "Graph", "Vertex", "Edge"}
# Diese Dateien stehen vorn, der Rest folgt alphabetisch.
ZUERST = ["Welt.java", "Main.java"]

# These are the only asset types currently embedded in a checkpoint. Keep the
# mapping explicit: Python's system MIME database differs between developer
# machines and GitHub runners, and a different media type changes every JSON
# checkpoint even though the project itself did not change.
MIME_TYPES = {
    ".java": "application/octet-stream",
    ".ogg": "audio/ogg",
    ".png": "image/png",
    ".txt": "text/plain",
}

IMPORT_RE = re.compile(r"^import .*\n", re.M)


def assets(archiv: pathlib.Path) -> list[pathlib.Path]:
    """Only referenced files plus the selectable characters, without preview images."""
    selected = {ROOT / "book/projekte/spielwerkstatt/assets/lizenz.txt"}
    for source in archiv.glob("*.java"):
        for name in re.findall(r'"(assets/[^"\n]+)"', source.read_text(encoding="utf-8")):
            path = ROOT / "book/projekte/spielwerkstatt" / name
            if path.is_file():
                selected.add(path)
            elif path.is_dir():
                selected.update(path.glob("*/sprite-sheet.png"))
    return sorted(selected)


def module(archiv: pathlib.Path) -> list[dict]:
    sources = sorted(archiv.glob("*.java"), key=lambda p: (
        ZUERST.index(p.name) if p.name in ZUERST else len(ZUERST), p.name))
    modules = []
    for path in sources + assets(archiv):
        name = path.name if path in sources else path.relative_to(ROOT / "book/projekte/spielwerkstatt").as_posix()
        if path in sources and path.stem not in ABITURKLASSEN:
            text = path.read_text(encoding="utf-8")
        else:
            mime = MIME_TYPES.get(path.suffix.lower()) or mimetypes.guess_type(name)[0] or "application/octet-stream"
            text = "data:" + mime + ";base64," + base64.b64encode(path.read_bytes()).decode("ascii")
        modules.append({"name": name, "text": text, "id": len(modules) + 1,
                        "isFolder": False, "identical_to_repository_version": True})
    return modules


def workspace(archivname: str, name: str) -> dict:
    archiv = ARCHIVE / archivname
    metadata = {
        "version": 1, "portableVersion": 1, "flavour": "nrw", "libraryVersion": "6.2.0",
        "startStage": "Main", "startFile": "Main.java", "pixelArt": True,
        "lesson": "spielwerkstatt", "checkpoint": archivname, "sourceEnvironment": "browser",
        "browserFeatures": [], "externalDependencies": [],
        "desktopFiles": sorted(p.name for p in archiv.glob("*.java") if p.stem in ABITURKLASSEN),
    }
    modules = module(archiv)
    checks = [p.stem for p in sorted(archiv.glob("*.java")) if re.search(r"@Test\b", p.read_text(encoding="utf-8"))]
    if checks:
        modules.append({"name": ".scratch4j/checks.json", "text": json.dumps({
            "schemaVersion": 1, "mode": "logic", "classes": checks}, indent=2) + "\n",
            "id": len(modules) + 1, "isFolder": False, "identical_to_repository_version": True})
    return {"name": name, "settings": {"language": "Java", "libraries": ["scratch", "nrw"],
            "scratchProject": metadata}, "modules": modules}


def checkpoint_files(archivname: str, name: str) -> dict[pathlib.Path, str]:
    """Workspace im Buch und Studio-Einstellungen im vollstaendigen Archiv."""
    project = workspace(archivname, name)
    metadata = {**project["settings"]["scratchProject"], "sourceEnvironment": "studio"}
    files = {
        ZIEL / f"{archivname}.json": json.dumps(project, ensure_ascii=False, indent=2) + "\n",
        ARCHIVE / archivname / ".scratch4j/project.json": json.dumps(metadata, ensure_ascii=False, indent=2) + "\n",
    }
    for entry in project["modules"]:
        if entry["name"] == ".scratch4j/checks.json":
            files[ARCHIVE / archivname / entry["name"]] = entry["text"]
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check committed workspaces and archive settings without writing files")
    args = parser.parse_args()
    failed = False
    for archivname, name in CHECKPOINTS.items():
        for target, expected in checkpoint_files(archivname, name).items():
            if args.check:
                if not target.exists() or target.read_text(encoding="utf-8") != expected:
                    print(f"[stale] {target.relative_to(ROOT)}; run {pathlib.Path(__file__).relative_to(ROOT)}")
                    failed = True
            else:
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(expected, encoding="utf-8")
        if not args.check:
            print(f"[ok] {archivname}: Workspace und Archiveinstellungen")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
