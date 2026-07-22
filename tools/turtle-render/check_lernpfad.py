#!/usr/bin/env python3
"""Prueft den Turtle-Lernpfad auf typische Fehlerquellen.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/turtle-render/check_lernpfad.py

Geprueft wird:

1. **Backticks in multievent-Bloecken.** Inline-Code wird von rehype-pretty-code
   zu HTML mit eingebettetem <style>-Block und Kopier-Button aufgeblasen. Landet
   das innerhalb der {r{...}}-Klammern, zerlegt es die Antwortoption. Deshalb
   gilt im ganzen multievent-Block: kein Inline-Code.
2. **Turtle-Befehle, die es im pyide-Turtle nicht gibt** (done, tracer, stamp,
   distance ...) sowie circle() mit einem Winkel als zweitem Parameter.
3. **Bildverweise**, die ins Leere zeigen.
4. **Doppelt vergebene Loesungspasswoerter.**
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "python" / "einfuehrung-mit-turtle"

# Befehle anderer Turtle-Varianten, die das pyide-Turtle nicht kennt.
UNSUPPORTED = [
    "done()",
    "mainloop()",
    "exitonclick()",
    "tracer(",
    "update()",
    "stamp(",
    "undo(",
    "onkey(",
    "onclick(",
    "ontimer(",
    "Screen()",
    "numinput(",
    "textinput(",
    "setundobuffer(",
    "distance(",
]

problems: list[str] = []


# Nur diese Ereignistypen werten eine Gruppennummer aus (multievent.js).
# Bei allen anderen ist die Ziffer nicht Teil der Syntax - der Ausdruck bliebe
# dann als Klartext stehen.
GROUPED_EVENTS = set("rRcCkKS")


def check_multievent(path: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"^::::multievent$(.*?)^::::$", text, re.S | re.M):
        block = match.group(1)
        offset = text[: match.start()].count("\n") + 1

        if "`" in block:
            problems.append(
                f"{path}:{offset}: {block.count('`')} Backtick(s) im "
                f"multievent-Block (Inline-Code zerlegt die Antwortoptionen)"
            )

        for event in re.finditer(r"\{([a-zA-Z])(\d*)\{", block):
            typ, digits = event.group(1), event.group(2)
            if digits and typ not in GROUPED_EVENTS:
                line = offset + block[: event.start()].count("\n")
                problems.append(
                    f"{path}:{line}: {{{typ}{digits}{{ - der Typ {typ} kennt "
                    f"keine Gruppennummer, schreibe {{{typ}{{"
                )

        # Die {a{...}}- und {A{...}}-Dropdowns trennen ihre Optionen in dieser
        # Bibliotheksversion nicht auf. Fuer Zuordnungen {S1{...}} verwenden.
        for event in re.finditer(r"\{[aA]\{", block):
            line = offset + block[: event.start()].count("\n")
            problems.append(
                f"{path}:{line}: {{a{{...}}-Dropdown wird nicht korrekt "
                f"aufgetrennt - nutze {{S1{{...}} oder Radiobuttons"
            )


def check_unsupported_api(path: pathlib.Path, text: str) -> None:
    # Die Dokumentationsseite listet die nicht unterstuetzten Befehle bewusst auf.
    if path.name == "07-turtle-dokumentation.md":
        return
    for lineno, line in enumerate(text.splitlines(), start=1):
        for name in UNSUPPORTED:
            if name in line:
                problems.append(f"{path}:{lineno}: nicht unterstuetzt: {name}")
        # circle(radius, extent) gibt es nicht - der zweite Parameter sind Schritte.
        for call in re.finditer(r"circle\(\s*-?\d+\s*,\s*(\d+)", line):
            steps = int(call.group(1))
            if steps > 30:
                problems.append(
                    f"{path}:{lineno}: circle(..., {steps}) sieht nach einem "
                    f"Winkel aus - der zweite Parameter sind Schritte"
                )


def check_images(path: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        target = match.group(1)
        if target.startswith(("http://", "https://", "/")):
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            line = text[: match.start()].count("\n") + 1
            problems.append(f"{path}:{line}: Bild fehlt: {target}")


def check_passwords(files: list[pathlib.Path]) -> None:
    seen: dict[str, pathlib.Path] = {}
    for path in files:
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'protect\{password="([^"]+)"', text):
            password = match.group(1)
            if password in seen:
                problems.append(
                    f"{path}: Passwort {password} bereits vergeben in {seen[password]}"
                )
            else:
                seen[password] = path
    print(f"{len(seen)} eindeutige Loesungspasswoerter.")


def main() -> int:
    files = sorted(BOOK.rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT)
        check_multievent(rel, text)
        check_unsupported_api(rel, text)
        check_images(path, text)
    check_passwords(files)

    print(f"{len(files)} Seiten geprueft.")
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
