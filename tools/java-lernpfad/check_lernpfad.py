#!/usr/bin/env python3
"""Prueft die beiden Java-Lernpfade auf typische Fehlerquellen.

Aufruf aus dem Repository-Wurzelverzeichnis:

    python3 tools/java-lernpfad/check_lernpfad.py

Geprueft wird:

1. **Backticks in multievent-Bloecken.** Inline-Code wird von rehype-pretty-code
   zu HTML mit eingebettetem <style>-Block und Kopier-Button aufgeblasen. Landet
   das innerhalb der {r{...}}-Klammern, zerlegt es die Antwortoption. Deshalb
   gilt im ganzen multievent-Block: kein Inline-Code. Ausserdem: Gruppenziffern
   nur bei den Ereignistypen, die sie auswerten, und keine {a{...}}-Dropdowns.
2. **onlineide-Bloecke.** Jeder Code-Fence braucht einen Dateinamen, der
   Klassenname muss zum Dateinamen passen, `package`/`import` gibt es nicht,
   Scratch-Klassen brauchen libraries="scratch", NRW-Klassen libraries="nrw".
   Die veralteten Attribute url= und id= sind nicht mehr erlaubt.
3. **Java-Konstrukte, die die Online-IDE nicht kennt** (Scanner, Arrays.sort,
   Integer.toBinaryString, static-Methoden auf oberster Ebene ...).
   Siehe NOTIZEN.md.
4. **Bildverweise**, die ins Leere zeigen.
5. **Doppelt vergebene Loesungspasswoerter.**
6. **Selbsttest** am Ende jeder Lektion (Kapitelseiten und Referenzseiten
   ausgenommen).
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "oberstufe" / "oop"

problems: list[str] = []

# Nur diese Ereignistypen werten eine Gruppennummer aus (multievent.js).
GROUPED_EVENTS = set("rRcCkKS")

# Konstrukte aus dem "echten" Java, die die Online-IDE nicht kennt.
# (name, ersatz)
UNSUPPORTED = [
    ("Scanner", "IO.readln(...) statt Scanner"),
    ("System.in", "IO.readln(...) statt System.in"),
    ("System.out.print", "IO.println(...) / IO.print(...) - Hausstil ist Java 25"),
    ("public static void main", "void main() ohne Klasse - Hausstil ist Java 25"),
    ("Arrays.sort", "Arrays kennt nur asList - Sortieren selbst schreiben"),
    ("Arrays.equals", "Arrays kennt nur asList - Vergleich selbst schreiben"),
    ("Arrays.toString", "Arrays kennt nur asList - Ausgabe selbst schreiben"),
    ("Arrays.fill", "Arrays kennt nur asList - Fuellen selbst schreiben"),
    ("Integer.toBinaryString", "Integer.toBinary"),
    ("Integer.toHexString", "Integer.toHex"),
    ("Integer.toOctalString", "Integer.toOctal"),
    ("import org.openpatch", "in der Online-IDE gibt es keine Pakete"),
    ("import java.", "in der Online-IDE gibt es keine Pakete"),
    ("(T)", "Casten nach einem Typparameter geht nicht - T[] statt Object[] nehmen"),
]

# Klassen, die nur mit libraries="scratch" bzw. libraries="nrw" existieren.
SCRATCH_CLASSES = [
    "Stage",
    "Sprite",
    "AnimatedSprite",
    "UISprite",
    "Pen",
    "KeyCode",
    "MouseCode",
    "RotationStyle",
]
NRW_CLASSES = [
    "BinaryTree",
    "BinarySearchTree",
    "ComparableContent",
    "Vertex",
    "Graph",
]

ONLINEIDE_RE = re.compile(
    r"^:::onlineide(\{[^}]*\})?[ \t]*$(.*?)^:::[ \t]*$", re.S | re.M
)
FENCE_RE = re.compile(r"^```([^\n]*)\n(.*?)^```[ \t]*$", re.S | re.M)


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


def check_onlineide(path: pathlib.Path, text: str) -> None:
    for match in ONLINEIDE_RE.finditer(text):
        attrs = match.group(1) or ""
        body = match.group(2)
        offset = line_of(text, match.start())

        for veraltet in ("url=", "id="):
            if veraltet in attrs:
                problems.append(
                    f"{path}:{offset}: onlineide-Attribut {veraltet} ist "
                    f"veraltet - libraries= verwenden bzw. weglassen"
                )

        fences = FENCE_RE.findall(body)
        if not fences:
            problems.append(f"{path}:{offset}: onlineide-Block ohne Code-Fence")
            continue

        gesamter_code = "\n".join(code for _, code in fences)

        # Jeder ausfuehrbare Block braucht einen Einstiegspunkt - entweder
        # void main() oder eine Testklasse. Wer nur Code zeigen will, nimmt
        # einen normalen Code-Fence statt eines onlineide-Blocks.
        hat_main = re.search(r"^\s*void\s+main\s*\(", gesamter_code, re.M)
        hat_test = "@Test" in gesamter_code
        if not hat_main and not hat_test:
            problems.append(
                f"{path}:{offset}: onlineide-Block ohne void main() und ohne "
                f"@Test - fuer reine Code-Anzeige einen normalen Fence nehmen"
            )
        elif hat_main and not re.search(r"^\s*void\s+main\s*\(", fences[0][1], re.M):
            problems.append(
                f"{path}:{offset}: void main() steht nicht in der ersten Datei "
                f"des Blocks - das Hausstil-Einstiegsprogramm gehoert nach oben, "
                f"damit man beim Lesen dort anfaengt"
            )

        for info, code in fences:
            teile = info.split()
            if len(teile) < 2:
                problems.append(
                    f"{path}:{offset}: Code-Fence ohne Dateiname "
                    f"(erwartet z. B. ```java Auto.java, gefunden ```{info})"
                )
                continue
            dateiname = teile[1]
            if not dateiname.endswith(".java"):
                problems.append(
                    f"{path}:{offset}: Dateiname {dateiname} endet nicht auf .java"
                )
                continue
            erwartet = dateiname[: -len(".java")]
            klassen = re.findall(
                r"^\s*(?:public\s+|abstract\s+|final\s+)*"
                r"(?:class|interface|enum)\s+([A-Za-z_][A-Za-z0-9_]*)",
                code,
                re.M,
            )
            if klassen and erwartet not in klassen:
                problems.append(
                    f"{path}:{offset}: {dateiname} enthaelt "
                    f"{', '.join(klassen)} - Dateiname und Klassenname muessen "
                    f"uebereinstimmen"
                )
            if re.search(r"^\s*package\s", code, re.M):
                problems.append(
                    f"{path}:{offset}: {dateiname} enthaelt eine "
                    f"package-Anweisung - die Online-IDE kennt keine Pakete"
                )
            if not klassen and re.search(
                r"^\s*(?:public\s+)?static\s+[\w<>\[\]]+\s+\w+\s*\(", code, re.M
            ):
                problems.append(
                    f"{path}:{offset}: {dateiname} deklariert eine "
                    f"static-Methode auf oberster Ebene - dort ohne static "
                    f"schreiben"
                )

        for klasse in SCRATCH_CLASSES:
            if re.search(rf"\b{klasse}\b", gesamter_code) and 'libraries="scratch"' not in attrs:
                problems.append(
                    f"{path}:{offset}: benutzt {klasse}, aber der Block hat "
                    f'kein libraries="scratch"'
                )
                break

        # Unter libraries="scratch" verdeckt die Scratch-eigene Random-Klasse
        # die der Standardbibliothek. Zufallszahlen kommen dort von
        # pickRandom(from, to) auf Sprite bzw. Stage.
        if 'libraries="scratch"' in attrs and "Random.randint" in gesamter_code:
            problems.append(
                f"{path}:{offset}: Random.randint gibt es unter "
                f'libraries="scratch" nicht - this.pickRandom(von, bis) nehmen'
            )

        for klasse in NRW_CLASSES:
            if re.search(rf"\b{klasse}\b", gesamter_code) and 'libraries="nrw"' not in attrs:
                problems.append(
                    f"{path}:{offset}: benutzt {klasse}, aber der Block hat "
                    f'kein libraries="nrw"'
                )
                break


def check_unsupported_api(path: pathlib.Path, text: str) -> None:
    """Prueft nur den Code in onlineide-Bloecken.

    Normale Code-Fences zeigen bewusst auch mal die alte Schreibweise oder
    Java-Konstrukte, die es hier nicht gibt - die laufen ja nicht.
    """
    for match in ONLINEIDE_RE.finditer(text):
        offset = line_of(text, match.start())
        for info, code in FENCE_RE.findall(match.group(2)):
            for lineno, line in enumerate(code.splitlines(), start=1):
                for name, ersatz in UNSUPPORTED:
                    if name in line:
                        problems.append(
                            f"{path}:{offset}: im onlineide-Block "
                            f"(Zeile {lineno} von {info}): {name} gibt es nicht "
                            f"- {ersatz}"
                        )


def check_lehrplanbezug(path: pathlib.Path, text: str) -> None:
    """Lehrplanbezuege gehoeren in HTML-Kommentare.

    Sie sind fuer Lehrkraefte gedacht und sollen im Hyperbook nicht erscheinen.
    """
    ohne_kommentare = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    for begriff in ("Kernlehrplan", "Kompetenzerwartung", "Inhaltsfeld"):
        if begriff in ohne_kommentare:
            problems.append(
                f"{path}: {begriff} steht sichtbar im Text - "
                f"Lehrplanbezuege gehoeren in einen HTML-Kommentar"
            )


def check_images(path: pathlib.Path, text: str) -> None:
    for match in re.finditer(r"!\[[^\]]*\]\(([^)]+)\)", text):
        target = match.group(1)
        if target.startswith(("http://", "https://", "/")):
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            problems.append(f"{path}:{line_of(text, match.start())}: Bild fehlt: {target}")


def check_selbsttest(path: pathlib.Path, rel: pathlib.Path, text: str) -> None:
    # Kapitelseiten, Referenzseiten und Projekte brauchen keinen Selbsttest -
    # Projekte werden am Produkt beurteilt, nicht an Ankreuzfragen.
    if path.name == "index.md" or "referenz" in path.name:
        return
    if "projekte" in str(rel):
        return
    if "## Selbsttest" not in text:
        problems.append(f"{rel}: kein Selbsttest am Ende der Lektion")
    elif "::::multievent" not in text:
        problems.append(f"{rel}: Selbsttest ohne multievent-Block")


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
    files = sorted(BOOK.rglob("*.md"))
    for path in files:
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT)
        check_multievent(rel, text)
        check_onlineide(rel, text)
        check_unsupported_api(rel, text)
        check_lehrplanbezug(rel, text)
        check_images(path, text)
        check_selbsttest(path, rel, text)
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
