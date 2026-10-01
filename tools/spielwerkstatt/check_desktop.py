#!/usr/bin/env python3
"""Prueft, dass die Spielwerkstatt auch auf dem Rechner laeuft.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/spielwerkstatt/check_desktop.py

Die Spielwerkstatt ist ein Projekt fuer zwei Welten: Im Buch laeuft es in der
Online-IDE, auf dem Rechner mit Scratch for Java und den Abiturklassen aus dem
Archiv. Die Online-IDE nimmt manches hin, was javac ablehnt - etwa eine NRW-List
dort, wo die Desktop-Bibliothek eine java.util.List liefert. Deshalb wird hier
jedes Archiv der Werkstatt mit javac uebersetzt, gegen die Bibliotheken in
seinem Ordner +libs.

Geprueft wird ausserdem, was das Archiv zum Laufen braucht:

1. Jede Datei, die eine Werkstatt-Seite per rfile einbindet, gibt es im Archiv.
2. Jeder Pfad assets/..., den der Quelltext laedt, gibt es im Ordner assets der
   Werkstatt - denn im Buch wie auf dem Rechner wird er relativ zum Projekt
   aufgeloest.

Rueckgabewert 0: alles in Ordnung, 1: Fehler, 2: javac fehlt, nicht geprueft.
"""

from __future__ import annotations

import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
WERKSTATT = ROOT / "book" / "oberstufe" / "oop" / "03-spielwerkstatt"
ARCHIVE = [ROOT / "archives" / "spielwerkstatt"]

RFILE_RE = re.compile(r'rfile\s+"/archives/([^/"]+)/([^"]+)"')
ASSET_RE = re.compile(r'"(assets/[^"]+)"')

problems: list[str] = []


def pruefe_rfiles() -> None:
    for seite in sorted(WERKSTATT.glob("*.md*")):
        for archiv, datei in RFILE_RE.findall(seite.read_text(encoding="utf-8")):
            if not (ROOT / "archives" / archiv / datei).exists():
                problems.append(f"{seite.relative_to(ROOT)}: rfile auf fehlende Datei archives/{archiv}/{datei}")


def pruefe_assets(archiv: pathlib.Path) -> None:
    for quelle in sorted(archiv.glob("*.java")):
        for pfad in ASSET_RE.findall(quelle.read_text(encoding="utf-8")):
            if not (WERKSTATT / pfad).exists():
                problems.append(f"{quelle.relative_to(ROOT)}: Datei fehlt: {pfad}")


def uebersetze(archiv: pathlib.Path) -> None:
    jars = sorted((archiv / "+libs").glob("*.jar"))
    if not jars:
        problems.append(f"{archiv.relative_to(ROOT)}: keine Bibliothek in +libs")
        return
    quellen = sorted(str(p) for p in archiv.glob("*.java"))
    with tempfile.TemporaryDirectory() as out:
        r = subprocess.run(
            ["javac", "-nowarn", "-encoding", "UTF-8", "-d", out,
             "-classpath", ":".join(str(j) for j in jars)] + quellen,
            capture_output=True, text=True)
    if r.returncode:
        zeilen = [z for z in r.stderr.splitlines() if not z.startswith(("Hinweis", "Note"))]
        problems.append(f"{archiv.relative_to(ROOT)}: javac meldet Fehler\n    "
                        + "\n    ".join(zeilen[:10]))
    else:
        print(f"[ok] {archiv.relative_to(ROOT)} ({len(quellen)} Dateien)")


def main() -> int:
    if shutil.which("javac") is None:
        print("javac nicht gefunden - die Spielwerkstatt wurde nicht uebersetzt.")
        return 2
    pruefe_rfiles()
    for archiv in ARCHIVE:
        pruefe_assets(archiv)
        uebersetze(archiv)
    for p in problems:
        print(p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
