#!/usr/bin/env python3
"""Erzeugt `book/projekte/fotofilter/quelle/Foto.java` aus einem echten Foto.

    python3 tools/fotofilter/erzeuge_foto.py

Das Projekt *Fotofilter* rechnet mit einem Foto, aber die Online-IDE kann
keines laden: Sie kennt nur ihre eingebauten Spielgrafiken, und die sind
klein, gezeichnet und kontrastarm. Also bringt das Foto sich selbst mit -
als Java-Quelltext.

Jeder Bildpunkt wird zu drei Zeichen, eines je Farbkanal. Ein Zeichen steht
fuer 6 Bit, also 64 Helligkeitsstufen; beim Dekodieren wird mal 4 gerechnet
und man ist wieder bei 0 bis 255. Die 64 Stufen sieht man dem Bild nicht an,
die Datei wird aber nur ein Drittel so gross wie mit zwei Hex-Ziffern.

Die erzeugte Datei holen sich die Projektseiten mit

    {{{rfile "/book/projekte/fotofilter/quelle/Foto.java"}}}

in jeden `onlineide`-Block. Deshalb stehen die Seiten als `.md.hbs` im Buch
und nicht als `.md`.

Die Datei wird **nicht von Hand bearbeitet**. Wer ein anderes Foto oder eine
andere Aufloesung will, aendert die Konstanten hier oben und laesst das
Skript neu laufen.
"""

from __future__ import annotations

import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]

QUELLE = ROOT / "public" / "images" / "willkommen-banner.jpg"
ZIEL = ROOT / "book" / "projekte" / "fotofilter" / "quelle" / "Foto.java"

# Das Banner ist ein Panorama. Der Ausschnitt beginnt bei diesem x-Wert und
# nimmt die volle Hoehe mit - dort steht die leuchtende LED neben den bunten
# Kabeln. Genau die Mischung braucht das Projekt: eine ueberstrahlte Flaeche
# fuer Helligkeit und Schwellenwert, harte Kanten fuer die Kantensuche,
# kraeftige Farben fuer die Kanaele.
AUSSCHNITT_LINKS = 380
BREITE = 96
HOEHE = 72

# 64 Zeichen, die in einem Java-String nichts bedeuten: keine Anfuehrungs-
# zeichen, kein Rueckwaertsstrich, kein Zeichen, das Markdown anfasst.
ZEICHEN = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-"

VORLAGE = '''public class Foto {{

    /* Diese Datei ist erzeugt. Sie stammt aus
       tools/fotofilter/erzeuge_foto.py und wird nicht von Hand geaendert.

       Das Foto steckt in DATEN: eine Zeichenkette je Bildzeile, drei Zeichen
       je Bildpunkt - rot, gruen, blau. Jedes Zeichen steht fuer eine von 64
       Stufen; mal 4 ergibt daraus wieder ein Wert von 0 bis 255. */

    private static final String ZEICHEN =
        "{zeichen}";

    private static final String[] DATEN = {{
{daten}
    }};

    /** Die Breite des Fotos in Bildpunkten. */
    public int breite() {{
        return DATEN[0].length() / 3;
    }}

    /** Die Hoehe des Fotos in Bildpunkten. */
    public int hoehe() {{
        return DATEN.length;
    }}

    /**
     * Liefert einen Farbkanal als Gitter von Werten zwischen 0 und 255.
     * @param pVersatz 0 fuer rot, 1 fuer gruen, 2 fuer blau
     */
    private int[][] kanal(int pVersatz) {{
        int[][] werte = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {{
            String daten = DATEN[zeile];
            for (int spalte = 0; spalte < breite(); spalte++) {{
                werte[zeile][spalte] = ZEICHEN.indexOf(daten.charAt(spalte * 3 + pVersatz)) * 4;
            }}
        }}
        return werte;
    }}

    /** Der rote Kanal des Fotos, 0 bis 255. */
    public int[][] rot() {{
        return kanal(0);
    }}

    /** Der gruene Kanal des Fotos, 0 bis 255. */
    public int[][] gruen() {{
        return kanal(1);
    }}

    /** Der blaue Kanal des Fotos, 0 bis 255. */
    public int[][] blau() {{
        return kanal(2);
    }}

    /**
     * Das Foto als Graustufen, 0 ist schwarz und 255 ist weiss.
     * Gruen zaehlt am meisten, blau am wenigsten - so sieht das Auge.
     */
    public int[][] graustufen() {{
        int[][] r = rot();
        int[][] g = gruen();
        int[][] b = blau();
        int[][] grau = new int[hoehe()][breite()];
        for (int zeile = 0; zeile < hoehe(); zeile++) {{
            for (int spalte = 0; spalte < breite(); spalte++) {{
                grau[zeile][spalte] =
                    (r[zeile][spalte] * 30 + g[zeile][spalte] * 59 + b[zeile][spalte] * 11) / 100;
            }}
        }}
        return grau;
    }}
}}
'''


def ausschnitt() -> Image.Image:
    bild = Image.open(QUELLE).convert("RGB")
    hoch = bild.height
    breit = int(hoch * BREITE / HOEHE)
    links = AUSSCHNITT_LINKS
    if links + breit > bild.width:
        raise SystemExit(f"Der Ausschnitt ab {links} passt nicht in {QUELLE.name}.")
    return bild.crop((links, 0, links + breit, hoch)).resize((BREITE, HOEHE), Image.LANCZOS)


def main() -> int:
    if len(ZEICHEN) != 64 or len(set(ZEICHEN)) != 64:
        raise SystemExit("ZEICHEN braucht 64 verschiedene Zeichen.")
    if not QUELLE.exists():
        print(f"{QUELLE} gibt es nicht.")
        return 1

    bild = ausschnitt()
    zeilen = []
    for y in range(HOEHE):
        werte = []
        for x in range(BREITE):
            r, g, b = bild.getpixel((x, y))
            werte.append(ZEICHEN[r >> 2] + ZEICHEN[g >> 2] + ZEICHEN[b >> 2])
        zeilen.append('        "' + "".join(werte) + '"')

    ZIEL.parent.mkdir(parents=True, exist_ok=True)
    ZIEL.write_text(
        VORLAGE.format(zeichen=ZEICHEN, daten=",\n".join(zeilen)),
        encoding="utf-8",
    )
    print(f"{ZIEL.relative_to(ROOT)}: {BREITE} x {HOEHE} aus {QUELLE.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
