#!/usr/bin/env python3
"""Prueft den Lernpfad Tabellenkalkulation auf typische Fehlerquellen.

Geprueft werden lokale Links, eindeutige Loesungspasswoerter, Selbsttests,
Kapitelabschluesse sowie die Struktur und Formeln der verlinkten ODS-Dateien.
"""

from __future__ import annotations

import pathlib
import re
import sys
import zipfile


ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "tabellenkalkulation"
PROBLEMS: list[str] = []

LINK_RE = re.compile(r"!?\[[^]]*\]\(([^)]+)\)")
PASSWORD_RE = re.compile(r'password="([^"]+)"')


def line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def check_links(path: pathlib.Path, text: str) -> None:
    for match in LINK_RE.finditer(text):
        target = match.group(1).split("#", 1)[0]
        if not target or target.startswith(("/", "http://", "https://")):
            continue
        resolved = path.parent / target
        if not (
            resolved.exists()
            or resolved.with_suffix(".md").exists()
            or (resolved / "index.md").exists()
        ):
            PROBLEMS.append(
                f"{path.relative_to(ROOT)}:{line_of(text, match.start())}: "
                f"lokales Linkziel fehlt: {target}"
            )


def check_selftest(path: pathlib.Path, text: str) -> None:
    if path.name == "index.md" or "mini-projekt" in path.name:
        return
    if "## Selbsttest" not in text or "::::multievent" not in text:
        PROBLEMS.append(f"{path.relative_to(ROOT)}: Selbsttest fehlt oder ist unvollstaendig")


def ods_content(path: pathlib.Path) -> str | None:
    try:
        with zipfile.ZipFile(path) as archive:
            if archive.read("mimetype") != b"application/vnd.oasis.opendocument.spreadsheet":
                PROBLEMS.append(f"{path.relative_to(ROOT)}: falscher ODS-Medientyp")
                return None
            return archive.read("content.xml").decode("utf-8")
    except (KeyError, UnicodeDecodeError, zipfile.BadZipFile) as error:
        PROBLEMS.append(f"{path.relative_to(ROOT)}: ungueltige ODS-Datei ({error})")
        return None


def main() -> int:
    pages = sorted(BOOK.rglob("*.md"))
    passwords: dict[str, list[pathlib.Path]] = {}
    linked_ods: set[pathlib.Path] = set()

    for path in pages:
        text = path.read_text(encoding="utf-8")
        check_links(path, text)
        check_selftest(path, text)
        for password in PASSWORD_RE.findall(text):
            passwords.setdefault(password, []).append(path)
        for target in LINK_RE.findall(text):
            if target.endswith(".ods"):
                linked_ods.add(path.parent / target)

    for password, paths in passwords.items():
        if len(paths) > 1:
            where = ", ".join(str(path.relative_to(ROOT)) for path in paths)
            PROBLEMS.append(f"Loesungspasswort {password} ist mehrfach vergeben: {where}")

    chapters = sorted(path for path in BOOK.iterdir() if path.is_dir())
    for chapter in chapters:
        if not list(chapter.glob("*-rueckblick.md")):
            PROBLEMS.append(f"{chapter.relative_to(ROOT)}: Rueckblick fehlt")

    contents: dict[str, str] = {}
    for path in sorted(linked_ods):
        if not path.exists():
            continue  # Bereits als defektes Linkziel gemeldet.
        content = ods_content(path)
        if content is not None:
            contents[path.name] = content

    # Diese Dateien sollen gerade das Kopieren von Formeln demonstrieren.
    # Nur vorab ausgerechnete Zahlen waeren hier eine irrefuehrende Loesung.
    minimum_formulas = {
        "loesung-calc-2-3-1.ods": 7,
        "loesung-calc-4-1-1.ods": 70,
        "loesung-calc-4-2-1.ods": 150,
        "loesung-calc-4-4-1.ods": 38,
    }
    for name, minimum in minimum_formulas.items():
        content = contents.get(name)
        if content is None:
            continue
        count = content.count("table:formula=")
        if count < minimum:
            PROBLEMS.append(
                f"{name}: nur {count} Formeln; mindestens {minimum} erwartet"
            )

    format_solution = contents.get("loesung-calc-1-1-1.ods", "")
    for style in ('style:name="Datum"', 'style:name="Waehrung"', 'style:name="Prozent"'):
        if style not in format_solution:
            PROBLEMS.append(
                "loesung-calc-1-1-1.ods: Datums-, Waehrungs- oder Prozentformat fehlt"
            )
            break

    price_page = BOOK / "02-bezuege" / "03-mini-projekt-preisvergleich.md"
    price_text = price_page.read_text(encoding="utf-8")
    expected = "=((B2*(1-D2))+E2)*(1+$H$2)*$H$3"
    if expected not in price_text:
        PROBLEMS.append(
            f"{price_page.relative_to(ROOT)}: Beispiel-Formel passt nicht zur Spaltenfolge"
        )

    print(
        f"{len(pages)} Seiten, {len(chapters)} Kapitel, "
        f"{len(passwords)} eindeutige Loesungspasswoerter und "
        f"{len(linked_ods)} ODS-Dateien geprueft."
    )
    if PROBLEMS:
        print(f"\n{len(PROBLEMS)} Problem(e):\n")
        for problem in PROBLEMS:
            print(f"  {problem}")
        return 1
    print("Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
