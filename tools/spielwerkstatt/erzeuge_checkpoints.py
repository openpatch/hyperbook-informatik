#!/usr/bin/env python3
"""Erzeugt die Checkpoints der Spielwerkstatt fuer die Online-IDE.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/spielwerkstatt/erzeuge_checkpoints.py

Ein Checkpoint ist ein Stand des Referenzspiels, mit dem man wieder einsteigen
kann, wenn man laenger gefehlt hat. Es gibt ihn zweimal:

- offline als zip-Archiv: archives/<name>, eingebunden mit ::archive
- im Buch als Workspace-Datei: book/projekte/spielwerkstatt/checkpoints/<name>.json

Die Workspace-Datei laedt man in der eingebetteten Online-IDE ueber den Knopf
"Workspace aus Datei laden". Sie ersetzt dann alle Dateien des Arbeitsbereichs.
Das Format liest die IDE in loadWorkspaceFromFile:

    {"name": ..., "settings": {"language": "Java", "libraries": [...]},
     "modules": [{"name": "Welt.java", "text": "..."}, ...]}

Wie im Buch fehlen die import-Zeilen, und die Abiturklassen bleiben weg, weil
die Online-IDE sie schon mitbringt.
"""

from __future__ import annotations

import json
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

IMPORT_RE = re.compile(r"^import .*\n", re.M)


def module(archiv: pathlib.Path) -> list[dict[str, str]]:
    dateien = [p for p in archiv.glob("*.java") if p.stem not in ABITURKLASSEN]
    dateien.sort(key=lambda p: (ZUERST.index(p.name) if p.name in ZUERST else len(ZUERST), p.name))
    return [{"name": p.name, "text": IMPORT_RE.sub("", p.read_text(encoding="utf-8")).lstrip("\n")}
            for p in dateien]


def main() -> None:
    ZIEL.mkdir(exist_ok=True)
    for archivname, name in CHECKPOINTS.items():
        workspace = {
            "name": name,
            "settings": {"language": "Java", "libraries": ["scratch", "nrw"]},
            "modules": module(ARCHIVE / archivname),
        }
        datei = ZIEL / f"{archivname}.json"
        datei.write_text(json.dumps(workspace, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"[ok] {datei.relative_to(ROOT)} ({len(workspace['modules'])} Dateien)")


if __name__ == "__main__":
    main()
