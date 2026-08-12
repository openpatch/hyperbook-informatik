#!/usr/bin/env python3
"""Prueft den Lernpfad "3D-Druck" auf typische Fehlerquellen.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/3d-druck/check_lernpfad.py
    python3 tools/3d-druck/check_lernpfad.py --ohne-openscad

Geprueft wird:

1. **multievent-Bloecke:** keine Backticks (Inline-Code zerlegt die
   Antwortoptionen), Gruppenziffern nur bei den Typen, die sie auswerten,
   keine {a{...}}-Dropdowns, und jede Frage braucht mindestens eine als
   richtig markierte Antwort.
2. **openscad-Bloecke:** gesetzte height, nur `scad` als Fence-Sprache,
   `library` nur mit bekannten Werten.
3. **OpenSCAD-Quelltext:** jeder Block wird tatsaechlich uebersetzt. Damit
   fallen unbekannte Module (`Cube` statt `cube`), fehlende Semikola und
   vertippte Parameter auf, bevor jemand die Seite oeffnet. Braucht das
   Programm `openscad`; fehlt es, wird dieser Teil uebersprungen.
4. **Bildverweise**, die ins Leere zeigen.
5. **Doppelt vergebene Loesungspasswoerter.**
6. **Selbsttest** am Ende jeder Lektion (Kapitelseiten, Projekt und Referenz
   ausgenommen).
7. **Kapitelabschluss** in jedem Inhaltskapitel.
"""

from __future__ import annotations

import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "3d-druck"

problems: list[str] = []

# Nur diese Ereignistypen werten eine Gruppennummer aus (multievent.js).
GROUPED_EVENTS = set("rRcCkKS")

# Bibliotheken, die das openscad-Element kennt.
BIBLIOTHEKEN = {"BOSL2"}

# Ordner ohne Selbsttest beziehungsweise ohne Kapitelabschluss.
OHNE_SELBSTTEST = ("projekt", "referenz")
OHNE_RUECKBLICK = {"projekt", "referenz"}

OPENSCAD_RE = re.compile(r"^:::openscad(\{[^}]*\})?[ \t]*$(.*?)^:::[ \t]*$", re.S | re.M)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)
MULTIEVENT_RE = re.compile(r"^(:{3,})multievent$(.*?)^\1$", re.S | re.M)


def line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def check_multievent(rel: pathlib.Path, text: str) -> None:
    for match in MULTIEVENT_RE.finditer(text):
        block = match.group(2)
        offset = line_of(text, match.start())

        if "`" in block:
            problems.append(
                f"{rel}:{offset}: {block.count('`')} Backtick(s) im "
                f"multievent-Block (Inline-Code zerlegt die Antwortoptionen)"
            )

        for event in re.finditer(r"\{([a-zA-Z])(\d*)\{", block):
            typ, ziffern = event.group(1), event.group(2)
            if ziffern and typ not in GROUPED_EVENTS:
                zeile = offset + block[: event.start()].count("\n")
                problems.append(
                    f"{rel}:{zeile}: {{{typ}{ziffern}{{ - der Typ {typ} kennt "
                    f"keine Gruppennummer"
                )

        for event in re.finditer(r"\{[aA]\{", block):
            zeile = offset + block[: event.start()].count("\n")
            problems.append(
                f"{rel}:{zeile}: {{a{{...}}-Dropdown wird nicht korrekt "
                f"aufgetrennt - nutze {{S1{{...}} oder Radiobuttons"
            )

        # Jede Radiogruppe braucht genau eine als richtig markierte Antwort.
        gruppen: dict[str, list[bool]] = {}
        for option in re.finditer(r"\{([rR])(\d+)\{(!?)", block):
            gruppen.setdefault(option.group(2), []).append(option.group(3) == "!")
        for nummer, markierungen in gruppen.items():
            if sum(markierungen) != 1:
                problems.append(
                    f"{rel}:{offset}: Radiogruppe {nummer} hat "
                    f"{sum(markierungen)} richtige Antworten, erwartet ist genau eine"
                )


def check_openscad_block(rel: pathlib.Path, text: str) -> list[tuple[int, str, str]]:
    """Prueft Aufbau der openscad-Bloecke und liefert den Quelltext zurueck."""
    bloecke: list[tuple[int, str, str]] = []
    for match in OPENSCAD_RE.finditer(text):
        attrs = match.group(1) or ""
        offset = line_of(text, match.start())

        if "height=" not in attrs:
            problems.append(
                f"{rel}:{offset}: openscad-Block ohne height - der Block wird "
                f"sonst fast bildschirmfuellend"
            )

        bibliothek = re.search(r'library="([^"]+)"', attrs)
        if bibliothek and bibliothek.group(1) not in BIBLIOTHEKEN:
            problems.append(
                f"{rel}:{offset}: unbekannte Bibliothek {bibliothek.group(1)}"
            )

        fences = FENCE_RE.findall(match.group(2))
        if not fences:
            problems.append(f"{rel}:{offset}: openscad-Block ohne Code-Fence")
            continue
        for info, code in fences:
            sprache = info.split()[0] if info.split() else ""
            if sprache != "scad":
                problems.append(
                    f"{rel}:{offset}: Fence-Sprache {sprache or '(keine)'} im "
                    f"openscad-Block, erwartet scad"
                )
                continue
            bloecke.append((offset, bibliothek.group(1) if bibliothek else "", code))
    return bloecke


def uebersetze(bloecke: list[tuple[pathlib.Path, int, str, str]]) -> int:
    """Laesst jeden Block von OpenSCAD uebersetzen."""
    geprueft = 0
    with tempfile.TemporaryDirectory() as tmp:
        quelle = pathlib.Path(tmp) / "block.scad"
        ziel = pathlib.Path(tmp) / "block.stl"
        for rel, zeile, bibliothek, code in bloecke:
            if re.search(r"//[^\n]*absichtlich", code, re.I):
                continue  # der Fehler gehoert zur Aufgabe
            ohne_kommentare = re.sub(r"//.*", "", code).strip()
            if not ohne_kommentare:
                continue  # leeres Geruest, in das Lernende erst etwas schreiben
            kopf = "include <BOSL2/std.scad>\n" if bibliothek == "BOSL2" else ""
            quelle.write_text(kopf + code, encoding="utf-8")
            ergebnis = subprocess.run(
                ["openscad", "-o", str(ziel), str(quelle)],
                capture_output=True, text=True, timeout=120,
            )
            geprueft += 1
            meldungen = [
                z for z in ergebnis.stderr.splitlines()
                if "ERROR" in z or "WARNING: Ignoring unknown" in z
                or "WARNING: Unknown" in z
            ]
            for meldung in meldungen[:3]:
                problems.append(f"{rel}:{zeile}: OpenSCAD meldet: {meldung.strip()}")
            ziel.unlink(missing_ok=True)
    return geprueft


def check_images(pfad: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        ziel = match.group(1).split()[0]
        if ziel.startswith(("http://", "https://", "data:")):
            continue
        datei = (ROOT / "public" / ziel.lstrip("/")) if ziel.startswith("/") \
            else (pfad.parent / ziel)
        if not datei.exists():
            problems.append(f"{rel}:{line_of(text, match.start())}: Bild fehlt: {ziel}")


def check_selbsttest(pfad: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    if pfad.name == "index.md" or any(w in str(rel) for w in OHNE_SELBSTTEST):
        return
    if "## Selbsttest" not in text:
        problems.append(f"{rel}: kein Selbsttest am Ende der Lektion")
    elif "multievent" not in text:
        problems.append(f"{rel}: Selbsttest ohne multievent-Block")


def check_rueckblick() -> int:
    gefunden = 0
    for kapitel in sorted(p for p in BOOK.iterdir() if p.is_dir()):
        if re.sub(r"^\d+-", "", kapitel.name) in OHNE_RUECKBLICK:
            continue
        if not [p for p in kapitel.rglob("*.md") if p.name != "index.md"]:
            continue
        if any("rueckblick" in p.name for p in kapitel.glob("*.md")):
            gefunden += 1
        else:
            problems.append(
                f"{kapitel.relative_to(ROOT)}: kein Rueckblick "
                f"(erwartet eine Datei mit rueckblick im Namen)"
            )
    return gefunden


def check_passwords(dateien: list[pathlib.Path]) -> None:
    gesehen: dict[str, pathlib.Path] = {}
    for pfad in dateien:
        text = pfad.read_text(encoding="utf-8")
        for match in re.finditer(r'protect\{password="([^"]+)"', text):
            passwort = match.group(1)
            if passwort in gesehen:
                problems.append(
                    f"{pfad.relative_to(ROOT)}: Passwort {passwort} bereits "
                    f"vergeben in {gesehen[passwort].relative_to(ROOT)}"
                )
            else:
                gesehen[passwort] = pfad
    print(f"{len(gesehen)} eindeutige Loesungspasswoerter.")


def main() -> int:
    if not BOOK.exists():
        print(f"{BOOK} gibt es nicht.")
        return 1

    mit_openscad = "--ohne-openscad" not in sys.argv and shutil.which("openscad")

    dateien = sorted(BOOK.rglob("*.md"))
    alle_bloecke: list[tuple[pathlib.Path, int, str, str]] = []
    for pfad in dateien:
        text = pfad.read_text(encoding="utf-8")
        rel = pfad.relative_to(ROOT)
        check_multievent(rel, text)
        check_images(pfad, rel, text)
        check_selbsttest(pfad, rel, text)
        for zeile, bibliothek, code in check_openscad_block(rel, text):
            alle_bloecke.append((rel, zeile, bibliothek, code))

    check_passwords(dateien)
    kapitel = check_rueckblick()

    if mit_openscad:
        geprueft = uebersetze(alle_bloecke)
        print(f"{geprueft} von {len(alle_bloecke)} openscad-Bloecken uebersetzt.")
    else:
        print(
            f"{len(alle_bloecke)} openscad-Bloecke NICHT uebersetzt "
            f"(openscad nicht gefunden oder abgeschaltet)."
        )

    print(f"{kapitel} Kapitelabschluesse, {len(dateien)} Seiten geprueft.")
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
