#!/usr/bin/env python3
"""Prueft den Lernpfad "Webentwicklung" auf typische Fehlerquellen.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/web-lernpfad/check_lernpfad.py

Geprueft wird:

1. **Backticks in multievent-Bloecken** sowie Gruppenziffern und Dropdowns.
2. **webide-Bloecke:** eindeutige id, gesetzte height, erlaubte Sprachen in den
   Code-Fences, hoechstens ein Fence je Sprache.
3. **HTML in webide-Bloecken:** Tags sauber geschlossen und richtig
   verschachtelt. Wo der Fehler zur Aufgabe gehoert, steht im Quelltext ein
   Kommentar mit "absichtlich".
4. **CSS in webide-Bloecken:** ausgeglichene geschweifte Klammern, jede
   Deklaration mit Semikolon abgeschlossen.
5. **Bildverweise**, die ins Leere zeigen.
6. **Doppelt vergebene Loesungspasswoerter.**
7. **Selbsttest** am Ende jeder Lektion (Kapitelseiten, Projekt und Referenz
   ausgenommen).
8. **Lehrplanbezuege** stehen in HTML-Kommentaren, nicht im sichtbaren Text.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "web"

# Das webide-Element kommt auch im Projekt "Amsterdam Webseite" vor. Dieselben
# Regeln gelten dort: eindeutige id, gesetzte Hoehe, wohlgeformtes HTML.
# Kapitelabschluesse verlangt ein Projekt dagegen nicht.
WEITERE = [ROOT / "book" / "projekte" / "amsterdam-webseite"]
PUBLIC = ROOT / "public"

problems: list[str] = []

# Nur diese Ereignistypen werten eine Gruppennummer aus (multievent.js).
GROUPED_EVENTS = set("rRcCkKS")

# HTML-Elemente ohne schliessendes Tag.
LEER = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

# Elemente, deren schliessendes Tag der Browser ergaenzen darf. Im Lernpfad
# schreiben wir sie trotzdem immer aus - ausser in Aufgaben, die genau das
# zum Thema haben.
OPTIONAL_SCHLIESSBAR = {"li", "p", "td", "th", "tr", "thead", "tbody", "option"}

WEBIDE_RE = re.compile(r"^:::webide(\{[^}]*\})?[ \t]*$(.*?)^:::[ \t]*$", re.S | re.M)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)
TAG_RE = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(/?)>")


def line_of(text: str, pos: int) -> int:
    return text[:pos].count("\n") + 1


def check_multievent(path: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"^::::multievent$(.*?)^::::$", text, re.S | re.M):
        block = match.group(1)
        offset = line_of(text, match.start())

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

        for event in re.finditer(r"\{[aA]\{", block):
            line = offset + block[: event.start()].count("\n")
            problems.append(
                f"{path}:{line}: {{a{{...}}-Dropdown wird nicht korrekt "
                f"aufgetrennt - nutze {{S1{{...}} oder Radiobuttons"
            )


def pruefe_html(path: pathlib.Path, offset: int, code: str) -> None:
    """Einfacher Wohlgeformtheitstest: Tags muessen sich sauber schachteln.

    Der Browser repariert fehlerhaftes HTML stillschweigend - deshalb faellt
    ein vergessenes schliessendes Tag beim Ausprobieren nicht auf, sondern
    erst an der falschen Darstellung. Genau deshalb pruefen wir es hier.
    """
    if re.search(r"<!--[^>]*absichtlich", code, re.I):
        return
    ohne_kommentare = re.sub(r"<!--.*?-->", "", code, flags=re.S)
    stapel: list[tuple[str, int]] = []
    for m in TAG_RE.finditer(ohne_kommentare):
        schliessend, name, selbst = m.group(1), m.group(2).lower(), m.group(4)
        zeile = offset + ohne_kommentare[: m.start()].count("\n")
        if name in LEER or selbst == "/":
            continue
        if not schliessend:
            stapel.append((name, zeile))
            continue
        if not stapel:
            problems.append(
                f"{path}:{zeile}: schliessendes </{name}> ohne oeffnendes Tag"
            )
            continue
        if stapel[-1][0] == name:
            stapel.pop()
            continue
        # Vielleicht wurde ein Tag mit optionalem Ende nicht geschlossen.
        while stapel and stapel[-1][0] in OPTIONAL_SCHLIESSBAR and stapel[-1][0] != name:
            offen, offen_zeile = stapel.pop()
            problems.append(
                f"{path}:{offen_zeile}: <{offen}> wird nicht geschlossen "
                f"(der Browser ergaenzt das zwar, im Lernpfad schreiben wir es aus)"
            )
        if stapel and stapel[-1][0] == name:
            stapel.pop()
        else:
            problems.append(
                f"{path}:{zeile}: </{name}> passt nicht zum zuletzt geoeffneten "
                f"<{stapel[-1][0]}> aus Zeile {stapel[-1][1]} - falsche Verschachtelung"
            )
            return
    for offen, offen_zeile in stapel:
        problems.append(f"{path}:{offen_zeile}: <{offen}> wird nie geschlossen")


def pruefe_css(path: pathlib.Path, offset: int, code: str) -> None:
    if re.search(r"/\*[^*]*absichtlich", code, re.I):
        return
    ohne_kommentare = re.sub(r"/\*.*?\*/", "", code, flags=re.S)
    tiefe = 0
    for i, zeichen in enumerate(ohne_kommentare):
        if zeichen == "{":
            tiefe += 1
        elif zeichen == "}":
            tiefe -= 1
            if tiefe < 0:
                zeile = offset + ohne_kommentare[:i].count("\n")
                problems.append(
                    f"{path}:{zeile}: schliessende geschweifte Klammer ohne "
                    f"oeffnende"
                )
                return
    if tiefe != 0:
        problems.append(f"{path}:{offset}: im CSS fehlen {tiefe} schliessende Klammern")
        return

    # Jede Deklaration braucht ein Semikolon. Gesucht wird nach Zeilen, die
    # eine Eigenschaft enthalten und weder mit ; noch mit { oder } enden.
    for nr, zeile in enumerate(ohne_kommentare.splitlines(), start=0):
        blank = zeile.strip()
        if not blank or blank.endswith(("{", "}", ";", ",")):
            continue
        if re.match(r"^[a-zA-Z-]+\s*:", blank):
            problems.append(
                f"{path}:{offset + nr}: CSS-Deklaration ohne Semikolon: {blank[:50]}"
            )


def check_webide(path: pathlib.Path, text: str, ids: dict[str, str]) -> None:
    for match in WEBIDE_RE.finditer(text):
        attrs = match.group(1) or ""
        body = match.group(2)
        offset = line_of(text, match.start())

        block_id = re.search(r'id="([^"]+)"', attrs)
        if not block_id:
            problems.append(
                f"{path}:{offset}: webide-Block ohne id - ohne feste id geht die "
                f"Arbeit der Lernenden bei jeder Textaenderung verloren"
            )
        else:
            wert = block_id.group(1)
            if wert in ids:
                problems.append(
                    f"{path}:{offset}: webide-id {wert} bereits vergeben in {ids[wert]}"
                )
            else:
                ids[wert] = f"{path}:{offset}"

        if "height=" not in attrs:
            problems.append(
                f"{path}:{offset}: webide-Block ohne height - der Block wird "
                f"sonst fast bildschirmfuellend"
            )

        fences = FENCE_RE.findall(body)
        if not fences:
            problems.append(f"{path}:{offset}: webide-Block ohne Code-Fence")
            continue

        gesehen: list[str] = []
        for info, code in fences:
            teile = info.split()
            sprache = teile[0] if teile else ""
            zusatz = teile[1] if len(teile) > 1 else ""
            if sprache not in ("html", "css"):
                problems.append(
                    f"{path}:{offset}: Code-Fence mit Sprache '{sprache}' - "
                    f"erlaubt sind html und css"
                )
                continue
            kennung = f"{sprache} {zusatz}".strip()
            if kennung in gesehen:
                problems.append(
                    f"{path}:{offset}: zweiter Fence '{kennung}' - je Block "
                    f"wird nur der erste ausgewertet"
                )
            gesehen.append(kennung)
            if sprache == "html" and zusatz != "template":
                pruefe_html(path, offset, code)
            elif sprache == "css":
                pruefe_css(path, offset, code)


MERMAID_RE = re.compile(r"^```mermaid\n(.*?)^```[ \t]*$", re.S | re.M)


def check_mermaid(path: pathlib.Path, text: str) -> None:
    """Mermaid stellt Nicht-ASCII-Zeichen in Beschriftungen falsch dar.

    Aus "Fussbereich" wird dort "FuAYbereich", aus einem Geviertstrich ein
    einzelnes Fragezeichen-Zeichen. Der Grund liegt in der Kodierung beim
    Rendern, nicht in der Quelle - beheben laesst es sich hier nur, indem
    Beschriftungen bei ASCII bleiben.
    """
    for match in MERMAID_RE.finditer(text):
        offset = line_of(text, match.start())
        for nr, zeile in enumerate(match.group(1).splitlines(), start=1):
            fremd = {z for z in zeile if ord(z) > 127}
            if fremd:
                problems.append(
                    f"{path}:{offset + nr}: Nicht-ASCII in einem Mermaid-"
                    f"Diagramm ({''.join(sorted(fremd))}) - Mermaid stellt das "
                    f"falsch dar, Beschriftung umformulieren"
                )


def check_lehrplanbezug(path: pathlib.Path, text: str) -> None:
    sichtbar = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    for begriff in ("Kernlehrplan", "Kompetenzerwartung", "Inhaltsfeld", "Unterrichtsvorhaben"):
        if begriff in sichtbar:
            problems.append(
                f"{path}: {begriff} steht sichtbar im Text - "
                f"Lehrplanbezuege gehoeren in einen HTML-Kommentar"
            )


def check_images(path: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    """Bilder in Markdown und in den src-Attributen der webide-Bloecke."""
    ziele = [(m.group(1), m.start()) for m in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text)]
    for match in WEBIDE_RE.finditer(text):
        for m in re.finditer(r'src="([^"]+)"', match.group(2)):
            ziele.append((m.group(1), match.start() + m.start()))
    for ziel, pos in ziele:
        if ziel.startswith(("http://", "https://", "data:")):
            continue
        if ziel.startswith("/"):
            if not (PUBLIC / ziel.lstrip("/")).exists():
                problems.append(f"{rel}:{line_of(text, pos)}: Bild fehlt: {ziel}")
            continue
        if not (path.parent / ziel).resolve().exists():
            problems.append(f"{rel}:{line_of(text, pos)}: Bild fehlt: {ziel}")


def check_selbsttest(path: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    if path.name == "index.md" or "referenz" in str(rel) or "projekt" in str(rel):
        return
    if "## Selbsttest" not in text:
        problems.append(f"{rel}: kein Selbsttest am Ende der Lektion")
    elif "::::multievent" not in text:
        problems.append(f"{rel}: Selbsttest ohne multievent-Block")


# Ordner, die keinen Kapitelabschluss brauchen: Projekt und Referenz sind
# selbst schon Abschluss beziehungsweise Nachschlagewerk. Verglichen wird der
# **ganze** Name ohne Nummernpraefix - eine Teilzeichenkette wuerde auch
# "02-felder-referenzen-generik" ausnehmen, und das ist ein Inhaltskapitel.
OHNE_RUECKBLICK = {"referenz", "projekt", "projekte"}


def check_rueckblick(kapitelwurzeln: list[pathlib.Path]) -> int:
    """Jedes Inhaltskapitel endet mit einer Rueckblick-Seite.

    Der Rueckblick buendelt, was in den Lektionen einzeln geuebt wurde:
    Checkliste, gemischte Aufgaben ueber mehrere Lektionen, Selbsttest. Ohne
    ihn testet jede Lektion nur, was zwei Bildschirmseiten vorher stand.
    """
    gefunden = 0
    for wurzel in kapitelwurzeln:
        if not wurzel.is_dir():
            continue
        for kapitel in sorted(p for p in wurzel.iterdir() if p.is_dir()):
            if re.sub(r"^\d+-", "", kapitel.name) in OHNE_RUECKBLICK:
                continue
            lektionen = [p for p in kapitel.rglob("*.md") if p.name != "index.md"]
            if not lektionen:
                continue
            if any("rueckblick" in p.name for p in kapitel.glob("*.md")):
                gefunden += 1
            else:
                problems.append(
                    f"{kapitel.relative_to(ROOT)}: kein Rueckblick "
                    f"(erwartet eine Datei mit rueckblick im Namen)"
                )
    return gefunden


def check_passwords(files: list[pathlib.Path]) -> None:
    seen: dict[str, pathlib.Path] = {}
    for path in files:
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'protect\{password="([^"]+)"', text):
            password = match.group(1)
            if password in seen:
                problems.append(
                    f"{path.relative_to(ROOT)}: Passwort {password} bereits "
                    f"vergeben in {seen[password].relative_to(ROOT)}"
                )
            else:
                seen[password] = path
    print(f"{len(seen)} eindeutige Loesungspasswoerter.")


def main() -> int:
    if not BOOK.exists():
        print(f"{BOOK} gibt es nicht.")
        return 1
    files = sorted(BOOK.rglob("*.md"))
    for weiterer in WEITERE:
        files += sorted(weiterer.rglob("*.md"))
    ids: dict[str, str] = {}
    for path in files:
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT)
        check_multievent(rel, text)
        check_webide(rel, text, ids)
        check_mermaid(rel, text)
        check_lehrplanbezug(rel, text)
        check_images(path, rel, text)
        check_selbsttest(path, rel, text)
    check_passwords(files)
    kapitel = check_rueckblick([BOOK])

    print(
        f"{len(ids)} webide-Bloecke, {kapitel} Kapitelabschluesse, "
        f"{len(files)} Seiten geprueft (davon "
        f"{sum(len(list(w.rglob('*.md'))) for w in WEITERE)} im Projekt Amsterdam)."
    )
    if problems:
        print(f"\n{len(problems)} Problem(e):\n")
        for problem in problems:
            print(f"  {problem}")
        return 1
    print("Keine Probleme gefunden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
