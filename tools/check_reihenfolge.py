#!/usr/bin/env python3
"""Prueft, dass die Reihenfolge im Buch eindeutig festgelegt ist.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/check_reihenfolge.py

Seit Hyperbook 0.101 werden **Seiten und Sektionen gemeinsam** nach ihrem
`index:` sortiert. Vorher hatten beide eine eigene Reihenfolge, weshalb eine
Uebersichtsseite mit `index: 0` und eine Sektion mit `index: 0` nebeneinander
bestehen konnten. Heute konkurrieren sie - und welche zuerst kommt, entscheidet
dann nicht mehr die Absicht, sondern der Zufall.

Gemeldet wird deshalb:

1. **Zwei Kinder eines Ordners mit demselben `index:`** - gleich ob Seite oder
   Sektion.
2. **Ein Ordner, in dem manche Kinder einen `index:` haben und andere nicht.**
   Die ohne rutschen ans Ende; ist das gewollt, gibt man ihnen eine hohe Zahl,
   dann steht es im Quelltext statt im Kopf der Autorin.

Ordner, in denen **kein** Kind einen `index:` hat, sind in Ordnung: Dort gilt
die alphabetische Reihenfolge, und das ist eine bewusste Entscheidung.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BOOK = ROOT / "book"

problems: list[str] = []

FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---(\n|\Z)", re.S)


def frontmatter(pfad: pathlib.Path) -> dict[str, str]:
    if not pfad.exists():
        return {}
    treffer = FRONTMATTER_RE.match(pfad.read_text(encoding="utf-8"))
    if not treffer:
        return {}
    daten: dict[str, str] = {}
    for zeile in treffer.group(1).splitlines():
        paar = re.match(r"^(\w+):\s*(.*)$", zeile)
        if paar:
            daten[paar.group(1)] = paar.group(2).strip().strip('"')
    return daten


def index_von(daten: dict[str, str]) -> int | None:
    wert = daten.get("index")
    return int(wert) if wert and re.fullmatch(r"-?\d+", wert) else None


def kinder(ordner: pathlib.Path) -> list[tuple[str, str, int | None]]:
    """(Art, Name, index) aller Eintraege, die in der Navigation erscheinen."""
    ergebnis: list[tuple[str, str, int | None]] = []
    for pfad in sorted(ordner.iterdir()):
        if pfad.is_dir():
            datei = pfad / "index.md"
            if not datei.exists():
                continue  # ohne index.md ist es keine Sektion
            daten = frontmatter(datei)
            art = "Sektion"
        elif pfad.suffix == ".md" and pfad.name != "index.md":
            if pfad.stat().st_size == 0:
                continue  # leerer Platzhalter, noch keine Seite
            daten = frontmatter(pfad)
            art = "Seite"
        else:
            continue
        if daten.get("hide") == "true":
            continue  # versteckte Seiten stehen nicht im Baum
        ergebnis.append((art, pfad.name, index_von(daten)))
    return ergebnis


def main() -> int:
    if not BOOK.exists():
        print(f"{BOOK} gibt es nicht.")
        return 1

    ordner_liste = [BOOK] + [p for p in BOOK.rglob("*") if p.is_dir()]
    geprueft = 0
    for ordner in sorted(ordner_liste):
        eintraege = kinder(ordner)
        if len(eintraege) < 2:
            continue
        geprueft += 1
        rel = ordner.relative_to(ROOT)

        nach_index: dict[int, list[str]] = {}
        for art, name, idx in eintraege:
            if idx is not None:
                nach_index.setdefault(idx, []).append(f"{art} {name}")
        for idx, liste in sorted(nach_index.items()):
            if len(liste) > 1:
                problems.append(
                    f"{rel}: index {idx} doppelt vergeben - " + ", ".join(liste)
                )

        mit = [f"{a} {n}" for a, n, i in eintraege if i is not None]
        ohne = [f"{a} {n}" for a, n, i in eintraege if i is None]
        if mit and ohne:
            problems.append(
                f"{rel}: {len(ohne)} Eintrag/Eintraege ohne index neben "
                f"{len(mit)} mit index - " + ", ".join(ohne[:4])
                + (" ..." if len(ohne) > 4 else "")
            )

    print(f"{geprueft} Ordner mit mehr als einem Eintrag geprueft.")
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Reihenfolge ueberall eindeutig.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
