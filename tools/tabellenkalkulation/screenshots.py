#!/usr/bin/env python3
"""Nimmt die Calc-Screenshots des Lernpfads Tabellenkalkulation auf – mit deutscher Oberflaeche.

    python3 tools/tabellenkalkulation/screenshots.py              # alle Bilder
    python3 tools/tabellenkalkulation/screenshots.py bezuege      # nur eines

LibreOffice laeuft dabei mit frischem deutschem Profil in einem virtuellen
Bildschirm (Xvfb). Deshalb stehen Dezimalzahlen mit Komma, die Menues heissen
„Einfuegen“ und „Diagramm“, und vom eigenen Desktop gelangt nichts ins Bild.

Braucht: LibreOffice mit deutschem Sprachpaket (z. B. libreoffice-still-de),
Xvfb, ImageMagick (``import``) und xdotool.

Das Skript heisst bewusst nicht ``erzeuge_*``: pruefe-alles.py soll es nicht
ausfuehren – es braucht einen X-Server und liefert nie bitgleiche Bilder.
"""

from __future__ import annotations

import os
import pathlib
import subprocess
import sys
import threading
import time

import erzeuge_screenshot_vorlagen as vorlagen

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "tabellenkalkulation"
ANZEIGE = ":93"


def xvfb(breite: int, hoehe: int) -> subprocess.Popen:
    prozess = subprocess.Popen(
        ["Xvfb", ANZEIGE, "-screen", "0", f"{breite}x{hoehe}x24", "-nolisten", "tcp"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    time.sleep(1)
    return prozess


def fenster(doc, breite: int, hoehe: int) -> None:
    """Setzt das Dokumentfenster auf die Bildgroesse, oben links.

    Ohne Fenstermanager ignoriert GTK ``setPosSize`` – deshalb xdotool auf dem
    X-Fenster. Gesucht wird ueber den Fenstertitel, der „LibreOffice Calc“ enthaelt.
    """
    time.sleep(1)
    for kennung in xdotool("search", "--name", "LibreOffice Calc").split():
        xdotool("windowmove", kennung, "0", "0")
        xdotool("windowsize", kennung, str(breite), str(hoehe))


def aufnehmen(ziel: pathlib.Path, breite: int, hoehe: int) -> None:
    time.sleep(2)  # Neuzeichnen abwarten
    subprocess.run(
        ["import", "-display", ANZEIGE, "-window", "root", "-crop", f"{breite}x{hoehe}+0+0", "+repage", str(ziel)],
        check=True,
    )
    print(f"geschrieben: {ziel.relative_to(ROOT)}")


def markiere_ausfuellkaestchen(bild: pathlib.Path) -> None:
    """Kreist das Ausfuellkaestchen rot ein.

    Das Kaestchen ist ein voll gefuelltes Quadrat in der Farbe des Auswahlrahmens.
    Gesucht wird ein 6 x 6 grosser Block ganz in dieser Farbe, der nach rechts und
    unten schnell endet – der Rahmen selbst ist nur 2 Pixel breit, der markierte
    Spaltenkopf viel groesser.
    """
    from PIL import Image, ImageDraw

    im = Image.open(bild).convert("RGB")
    breite, hoehe = im.size
    pixel = im.load()

    def blau(x: int, y: int) -> bool:
        r, g, b = pixel[x, y]
        return r < 90 and 110 < g < 160 and b > 200

    for y in range(3, hoehe - 10):
        for x in range(3, breite - 10):
            # Kaestchen: 6 x 6 ganz blau, rechts und unterhalb nach 9 Pixeln kein Blau mehr,
            # schraeg links oberhalb die helle Zellfuellung. Der markierte Spaltenkopf ist
            # ringsum blau und faellt so heraus.
            if (all(blau(x + dx, y + dy) for dx in range(6) for dy in range(6))
                    and not blau(x + 9, y + 3) and not blau(x + 3, y + 9)
                    and not blau(x - 3, y - 3) and not blau(x + 9, y + 9)):
                mx, my = x + 3, y + 3
                zeichnen = ImageDraw.Draw(im)
                zeichnen.ellipse((mx - 24, my - 24, mx + 24, my + 24), outline="#c0392b", width=4)
                im.save(bild)
                return
    raise RuntimeError("Ausfuellkaestchen im Bild nicht gefunden")


def xdotool(*argumente: str) -> str:
    return subprocess.run(["xdotool", *argumente], capture_output=True, text=True,
                          env={**os.environ, "DISPLAY": ANZEIGE, "WAYLAND_DISPLAY": ""}).stdout


def taste(*tasten: str) -> None:
    xdotool("key", "--delay", "150", *tasten)


def seitenleiste_aus(doc) -> None:
    """Blendet die Seitenleiste aus; sie verdeckt sonst die rechten Spalten."""
    doc.CurrentController.Frame.LayoutManager.hideElement("private:resource/toolpanel/Sidebar")
    try:
        doc.CurrentController.Frame.getController().getSidebar().setVisible(False)
    except Exception:
        pass


def dispatch(ctx, doc, befehl: str) -> None:
    helfer = ctx.ServiceManager.createInstanceWithContext("com.sun.star.frame.DispatchHelper", ctx)
    helfer.executeDispatch(doc.CurrentController.Frame, befehl, "", 0, ())


# (Name, Ziel, Breite, Hoehe, Vorlage)
BILDER = [
    ("zelle", "01-daten-und-formeln/calc-zelle-c4.png", 1400, 760, vorlagen.make_zelle),
    ("bezuege", "02-bezuege/calc-bezuege.png", 1400, 760, vorlagen.make_bezuege),
    ("ausfuellkaestchen", "02-bezuege/calc-ausfuellkaestchen.png", 1100, 420, vorlagen.make_ausfuellkaestchen),
    ("bezuege-fehler", "02-bezuege/calc-bezuege-fehler.png", 1400, 420, vorlagen.make_bezuege_fehler),
    ("gemischt", "02-bezuege/calc-gemischt.png", 1100, 460, vorlagen.make_gemischt),
    ("formel-testen", "02-bezuege/calc-formel-testen.png", 1600, 420, vorlagen.make_formel_testen),
    ("preisvergleich", "02-bezuege/calc-preisvergleich.png", 1500, 520, vorlagen.make_preisvergleich),
    ("diagramm", "03-diagramme/calc-diagrammassistent.png", 1600, 900, vorlagen.make_diagramm),
    ("wachstum", "04-wachstum/calc-wachstum.png", 1750, 800, vorlagen.make_growth),
]


def diagrammassistent(ctx, doc) -> None:
    """Oeffnet Einfuegen → Diagramm und waehlt „Linie“ mit „Punkte und Linien“.

    Der Assistent ist modal: executeDispatch kehrt erst zurueck, wenn er
    geschlossen wird. Deshalb laeuft der Aufruf in einem eigenen Thread.
    """
    threading.Thread(target=dispatch, args=(ctx, doc, ".uno:InsertObjectChart"), daemon=True).start()
    time.sleep(3)
    # Diagrammtypen: Säule, Balken, Kreis, Kreis+, Fläche, Linie – fünfmal nach unten,
    # dann zu den Varianten und dort von „Nur Punkte“ auf „Punkte und Linien“.
    taste(*["Down"] * 5)
    taste("Tab", "Right")
    # Der Dialog erscheint ohne Fenstermanager oben links und verdeckt die Tabelle.
    # Der Dialog (Fenstertitel wie der erste Schritt: „Diagrammtyp“) erscheint ohne
    # Fenstermanager oben links und verdeckt die Tabelle – nach rechts unten damit.
    for kennung in xdotool("search", "--name", "^Diagrammtyp$").split():
        xdotool("windowmove", kennung, "530", "425")


def main(auswahl: list[str]) -> None:
    breite = max(b for _, _, b, _, _ in BILDER)
    hoehe = max(h for _, _, _, h, _ in BILDER)
    anzeige = xvfb(breite, hoehe)
    # Ohne WAYLAND_DISPLAY und mit GDK_BACKEND=x11 landet das Fenster sicher im
    # virtuellen Bildschirm und nicht auf dem eigenen Desktop.
    umgebung = {k: v for k, v in os.environ.items() if k != "WAYLAND_DISPLAY"}
    # GTK_THEME: helles Standard-Theme, unabhaengig vom Theme des eigenen Desktops.
    umgebung |= {"DISPLAY": ANZEIGE, "GDK_BACKEND": "x11", "SAL_USE_VCLPLUGIN": "gtk3",
                 "GTK_THEME": "Adwaita:light",
                 "LANG": "de_DE.UTF-8", "LC_ALL": "de_DE.UTF-8"}
    prozess, ctx = vorlagen.connect(headless=False, umgebung=umgebung)
    desk = vorlagen.desktop(ctx)
    try:
        for name, ziel, b, h, vorlage in BILDER:
            if auswahl and name not in auswahl:
                continue
            doc = vorlage(desk)
            fenster(doc, b, h)
            seitenleiste_aus(doc)
            if name == "diagramm":
                diagrammassistent(ctx, doc)
            aufnehmen(BOOK / ziel, b, h)
            if name == "ausfuellkaestchen":
                markiere_ausfuellkaestchen(BOOK / ziel)
            if name == "diagramm":
                taste("Escape")
                time.sleep(1)
            doc.close(True)
    finally:
        vorlagen.beenden(prozess, desk)
        anzeige.terminate()


if __name__ == "__main__":
    main(sys.argv[1:])
