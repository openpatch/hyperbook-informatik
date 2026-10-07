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
3. Jede Checkpoint-Datei fuer die Online-IDE passt zu ihrem Archiv. Sonst muss
   tools/spielwerkstatt/erzeuge_checkpoints.py noch einmal laufen.

Rueckgabewert 0: alles in Ordnung, 1: Fehler, 2: javac fehlt, nicht geprueft.
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

import erzeuge_checkpoints
import teaching_tests

ROOT = pathlib.Path(__file__).resolve().parents[2]
WERKSTATT = ROOT / "book" / "projekte" / "spielwerkstatt"
# das Startgeruest und jeder Stand, den eine Werkstatt-Seite zeigt
ARCHIVE = sorted(p for p in (ROOT / "archives").glob("spielwerkstatt*") if p.is_dir())

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


def pruefe_checkpoints() -> None:
    for archivname in erzeuge_checkpoints.CHECKPOINTS:
        datei = erzeuge_checkpoints.ZIEL / f"{archivname}.json"
        if not datei.exists():
            problems.append(f"{datei.relative_to(ROOT)} fehlt - erzeuge_checkpoints.py ausfuehren")
            continue
        gespeichert = json.loads(datei.read_text(encoding="utf-8"))
        if gespeichert != erzeuge_checkpoints.workspace(archivname, erzeuge_checkpoints.CHECKPOINTS[archivname]):
            problems.append(f"{datei.relative_to(ROOT)} ist veraltet - erzeuge_checkpoints.py ausfuehren")


def uebersetze(archiv: pathlib.Path) -> None:
    jars = sorted((archiv / "+libs").glob("*.jar"))
    if not jars:
        problems.append(f"{archiv.relative_to(ROOT)}: keine Bibliothek in +libs")
        return
    sources = sorted(archiv.glob("*.java"))
    tests = [p.stem for p in sources if re.search(r"@Test\b", p.read_text(encoding="utf-8"))]
    if tests:
        jars.append(teaching_tests.junit_jar())
    with tempfile.TemporaryDirectory() as out:
        directory = pathlib.Path(out)
        prepared = directory / "source"
        prepared.mkdir()
        for source in sources:
            (prepared / source.name).write_text(teaching_tests.adapt(source.read_text(encoding="utf-8")), encoding="utf-8")
        quellen = [str(prepared / source.name) for source in sources]
        r = subprocess.run(
            ["javac", "-nowarn", "-encoding", "UTF-8", "-d", out,
             "-classpath", os.pathsep.join(str(j) for j in jars)] + quellen,
            capture_output=True, text=True, timeout=30)
        if r.returncode == 0 and tests:
            command = ["java", "-Djava.awt.headless=true", "-jar", str(jars[-1]), "execute",
                       "--disable-banner", "--fail-if-no-tests", "--class-path",
                       os.pathsep.join([out] + [str(j) for j in jars[:-1]])]
            for name in tests:
                command.extend(["--select-class", name])
            r = subprocess.run(command, cwd=archiv, capture_output=True, text=True, timeout=30)
            if r.returncode:
                r.stderr += r.stdout
            else:
                print(f"[ok] {archiv.relative_to(ROOT)}: JUnit ({', '.join(tests)})")
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
    pruefe_checkpoints()
    for archiv in ARCHIVE:
        pruefe_assets(archiv)
        uebersetze(archiv)
    for p in problems:
        print(p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
