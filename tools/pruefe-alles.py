#!/usr/bin/env python3
"""Startet alle Pruefungen des Repositorys.

    python3 tools/pruefe-alles.py            # alles
    python3 tools/pruefe-alles.py --schnell  # nur die statischen Pruefungen
    python3 tools/pruefe-alles.py --liste    # nur anzeigen, was liefe
    python3 tools/pruefe-alles.py --nur web  # nur Pruefungen, deren Pfad "web" enthaelt

Die Pruefungen werden **gefunden, nicht aufgezaehlt**. Wer ein neues Werkzeug
nach den Namenskonventionen ablegt, muss dieses Skript nicht anfassen:

| Datei in tools/ oder tools/<irgendein-ordner>/ | Art |
| --- | --- |
| `check_*.py`   | statische Pruefung, braucht nichts weiter |
| `pruefe_*.py`  | statische Pruefung, braucht nichts weiter |
| `pruefe_seiten.js` | Browserpruefung, braucht den Dev-Server und Playwright |
| `erzeuge_*.py`, `render_*.py` | Generator - wird **nicht** ausgefuehrt, nur mit --generatoren geprueft |

Alles andere in den Ordnern (Bibliotheken, Notizen, einmalige Hilfsskripte)
bleibt unberuehrt.

Rueckgabewert:

| Wert | Bedeutung |
| --- | --- |
| 0 | alle Pruefungen gelaufen und bestanden |
| 1 | mindestens eine Pruefung ist fehlgeschlagen |
| 2 | alles Gelaufene war in Ordnung, aber etwas konnte nicht geprueft werden |

Der Wert 2 ist wichtig: „nicht geprueft" ist nicht dasselbe wie „in Ordnung".
"""

from __future__ import annotations

import argparse
import os
import pathlib
import shutil
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
TOOLS = ROOT / "tools"
URL = os.environ.get("HYPERBOOK_URL", "http://localhost:8080")

# Ein vollstaendiger Lauf dauert je nach Umfang viele Minuten. Ohne dies
# sammelt Python die Ausgabe in einer Pipe an und man saehe bis zum Ende
# nichts - also weder welche Pruefung gerade laeuft noch ob sie haengt.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(line_buffering=True)  # type: ignore[union-attr]

# Der Fortschrittsvermerk wird ueberschrieben - das ergibt nur auf einem
# Terminal Sinn, in einer Logdatei stuenden sonst doppelte Zeilen.
TERMINAL = sys.stdout.isatty()

# Uebliche Orte fuer playwright-core. Siehe NOTIZEN.md der Lernpfade.
PLAYWRIGHT_ORTE = [
    pathlib.Path("/tmp/pw/node_modules"),
    ROOT / "node_modules",
]


class Pruefung:
    def __init__(self, name: str, befehl: list[str], art: str, umgebung: dict | None = None):
        self.name = name
        self.befehl = befehl
        self.art = art  # statisch, browser, bauen oder generator
        self.umgebung = umgebung or {}
        self.ergebnis = "offen"
        self.dauer = 0.0
        self.ausgabe = ""


def finde_pruefungen(nur: str | None) -> list[Pruefung]:
    gefunden: list[Pruefung] = []
    # tools/ selbst und jeder Unterordner. Pfadweite Werkzeuge liegen in einem
    # Unterordner, buchweite (etwa die Passwortseite) direkt in tools/.
    ordner_liste = [TOOLS] + sorted(p for p in TOOLS.iterdir() if p.is_dir())
    for ordner in ordner_liste:
        for datei in sorted(ordner.iterdir()):
            if not datei.is_file():
                continue
            name = datei.name
            pfad = str(datei.relative_to(ROOT))
            if datei.suffix == ".py" and (
                name.startswith("check_") or name.startswith("pruefe_")
            ):
                gefunden.append(Pruefung(pfad, [sys.executable, pfad], "statisch"))
            elif name == "pruefe_seiten.js":
                gefunden.append(Pruefung(pfad, ["node", pfad], "browser"))
    if nur:
        gefunden = [p for p in gefunden if nur in p.name]
    return gefunden


def finde_generatoren(nur: str | None) -> list[Pruefung]:
    gefunden: list[Pruefung] = []
    ordner_liste = [TOOLS] + sorted(p for p in TOOLS.iterdir() if p.is_dir())
    for ordner in ordner_liste:
        for datei in sorted(ordner.glob("*.py")):
            if datei.name.startswith(("erzeuge_", "render_")):
                pfad = str(datei.relative_to(ROOT))
                gefunden.append(Pruefung(pfad, [sys.executable, pfad], "generator"))
    if nur:
        gefunden = [p for p in gefunden if nur in p.name]
    return gefunden


def server_laeuft() -> bool:
    try:
        with urllib.request.urlopen(URL, timeout=3):
            return True
    except (urllib.error.URLError, OSError):
        return False


def finde_playwright() -> str | None:
    if os.environ.get("NODE_PATH"):
        return os.environ["NODE_PATH"]
    for ort in PLAYWRIGHT_ORTE:
        if (ort / "playwright-core").exists():
            return str(ort)
    return None


def starte_server() -> subprocess.Popen | None:
    print("  Dev-Server wird gestartet …")
    prozess = subprocess.Popen(
        ["npx", "hyperbook", "dev"],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )
    for _ in range(90):
        time.sleep(2)
        if server_laeuft():
            print("  Dev-Server ist bereit.")
            return prozess
        if prozess.poll() is not None:
            print("  Dev-Server hat sich beendet.")
            return None
    print("  Dev-Server antwortet nicht.")
    stoppe_server(prozess)
    return None


def stoppe_server(prozess: subprocess.Popen) -> None:
    """Beendet den Dev-Server samt Kindprozessen.

    npx startet den eigentlichen Server als Kindprozess. Ein terminate() auf
    npx allein laesst diesen weiterlaufen - der Port bliebe belegt und der
    naechste Lauf hielte den Ueberrest fuer einen absichtlich gestarteten
    Server. Deshalb wird die ganze Prozessgruppe beendet; sie existiert, weil
    der Start mit start_new_session=True erfolgt ist.
    """
    try:
        os.killpg(os.getpgid(prozess.pid), signal.SIGTERM)
    except (ProcessLookupError, PermissionError):
        prozess.terminate()
    try:
        prozess.wait(timeout=15)
    except subprocess.TimeoutExpired:
        try:
            os.killpg(os.getpgid(prozess.pid), signal.SIGKILL)
        except (ProcessLookupError, PermissionError):
            prozess.kill()
    for _ in range(10):
        if not server_laeuft():
            print("  Dev-Server beendet.")
            return
        time.sleep(1)
    print("  Achtung: Der Dev-Server antwortet noch. Bitte von Hand beenden.")


def fuehre_aus(pruefung: Pruefung, ausfuehrlich: bool) -> None:
    umgebung = {**os.environ, **pruefung.umgebung}
    # Browserpruefungen laufen minutenlang. Ohne diese Zeile sieht man erst
    # hinterher, welche gerade dran war.
    if TERMINAL:
        print(f"  [ .. ] {pruefung.name}", end="\r", flush=True)
    beginn = time.monotonic()
    lauf = subprocess.run(
        pruefung.befehl,
        cwd=ROOT,
        env=umgebung,
        capture_output=True,
        text=True,
    )
    pruefung.dauer = time.monotonic() - beginn
    pruefung.ausgabe = (lauf.stdout or "") + (lauf.stderr or "")
    pruefung.ergebnis = "ok" if lauf.returncode == 0 else "fehlgeschlagen"

    zeichen = "OK  " if pruefung.ergebnis == "ok" else "FEHL"
    vorspann = "\r" + " " * (len(pruefung.name) + 10) + "\r" if TERMINAL else ""
    print(f"{vorspann}  [{zeichen}] {pruefung.name}  ({pruefung.dauer:.1f}s)")
    if pruefung.ergebnis != "ok" or ausfuehrlich:
        for zeile in pruefung.ausgabe.rstrip().splitlines():
            print(f"         {zeile}")


def pruefe_generatoren(generatoren: list[Pruefung], ausfuehrlich: bool) -> None:
    """Laesst jeden Generator laufen und prueft, ob sich etwas geaendert hat.

    Die Generatoren sind so gebaut, dass sie bei gleichem Eingang byte-gleiche
    Dateien liefern. Aendert sich nach einem Lauf etwas im Arbeitsverzeichnis,
    ist das erzeugte Ergebnis im Repository veraltet.
    """
    if not generatoren:
        return
    print("\nGeneratoren (erzeugen sie unveraenderte Dateien?)")
    for gen in generatoren:
        vorher = subprocess.run(
            ["git", "status", "--porcelain"], cwd=ROOT, capture_output=True, text=True
        ).stdout
        fuehre_aus(gen, ausfuehrlich)
        if gen.ergebnis != "ok":
            continue
        nachher = subprocess.run(
            ["git", "status", "--porcelain"], cwd=ROOT, capture_output=True, text=True
        ).stdout
        if vorher != nachher:
            gen.ergebnis = "fehlgeschlagen"
            gen.ausgabe += (
                "\nDer Lauf hat Dateien veraendert - das erzeugte Ergebnis im "
                "Repository ist veraltet. Bitte die neuen Dateien einchecken."
            )
            print("         Der Lauf hat Dateien veraendert.")


def main() -> int:
    p = argparse.ArgumentParser(description="Startet alle Pruefungen des Repositorys.")
    p.add_argument("--schnell", "-s", action="store_true",
                   help="nur die statischen Pruefungen, kein Bauen, kein Browser")
    p.add_argument("--liste", "-l", action="store_true",
                   help="nur anzeigen, was laufen wuerde")
    p.add_argument("--nur", metavar="MUSTER",
                   help="nur Pruefungen, deren Pfad MUSTER enthaelt")
    p.add_argument("--generatoren", action="store_true",
                   help="zusaetzlich pruefen, ob die Generatoren unveraenderte Dateien liefern")
    p.add_argument("--ausfuehrlich", "-v", action="store_true",
                   help="Ausgabe auch bestandener Pruefungen zeigen")
    args = p.parse_args()

    pruefungen = finde_pruefungen(args.nur)
    statisch = [x for x in pruefungen if x.art == "statisch"]
    browser = [x for x in pruefungen if x.art == "browser"]
    generatoren = finde_generatoren(args.nur) if args.generatoren else []

    if args.liste:
        print("Statische Pruefungen:")
        for x in statisch:
            print(f"  {x.name}")
        print("\nBrowserpruefungen (brauchen Dev-Server und Playwright):")
        for x in browser:
            print(f"  {x.name}")
        print("\nGeneratoren (nur mit --generatoren):")
        for x in finde_generatoren(args.nur):
            print(f"  {x.name}")
        return 0

    uebersprungen: list[str] = []
    bauen: Pruefung | None = None

    print(f"Statische Pruefungen ({len(statisch)})")
    for x in statisch:
        fuehre_aus(x, args.ausfuehrlich)

    if args.generatoren:
        pruefe_generatoren(generatoren, args.ausfuehrlich)

    server = None
    if not args.schnell:
        lief_schon = server_laeuft()

        if lief_schon:
            print("\nBauen wird uebersprungen - der Dev-Server laeuft schon und "
                  "baut selbst.")
        else:
            print("\nBauen")
            bauen = Pruefung("npx hyperbook build", ["npx", "hyperbook", "build"], "bauen")
            fuehre_aus(bauen, args.ausfuehrlich)

        if browser:
            node_path = finde_playwright()
            if not node_path:
                print("\nBrowserpruefungen werden uebersprungen: playwright-core "
                      "nicht gefunden.")
                print("  Einmalig einrichten:")
                print("    mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && "
                      "npm i playwright-core")
                uebersprungen += [x.name for x in browser]
            elif not shutil.which("npx"):
                print("\nBrowserpruefungen werden uebersprungen: npx nicht gefunden.")
                uebersprungen += [x.name for x in browser]
            else:
                print(f"\nBrowserpruefungen ({len(browser)})")
                if not lief_schon:
                    server = starte_server()
                    if server is None:
                        print("  Ohne Dev-Server keine Browserpruefung.")
                        uebersprungen += [x.name for x in browser]
                        browser = []
                for x in browser:
                    x.umgebung["NODE_PATH"] = node_path
                    fuehre_aus(x, args.ausfuehrlich)
                if server is not None:
                    stoppe_server(server)
    else:
        uebersprungen += ["npx hyperbook build"] + [x.name for x in browser]

    alle = statisch + [x for x in browser if x.ergebnis != "offen"] + generatoren
    if bauen is not None:
        alle.append(bauen)
    fehlgeschlagen = [x for x in alle if x.ergebnis == "fehlgeschlagen"]

    print("\n" + "=" * 60)
    print(f"{len(alle)} Pruefung(en) gelaufen, "
          f"{len(alle) - len(fehlgeschlagen)} bestanden, "
          f"{len(fehlgeschlagen)} fehlgeschlagen.")
    if uebersprungen:
        print(f"{len(uebersprungen)} uebersprungen:")
        for name in uebersprungen:
            print(f"  {name}")
    if fehlgeschlagen:
        print("\nFehlgeschlagen:")
        for x in fehlgeschlagen:
            print(f"  {x.name}")
        return 1
    if uebersprungen:
        print("\nAlles Gelaufene ist in Ordnung - aber nicht alles wurde geprueft.")
        return 2
    print("Alles in Ordnung.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        # Passiert beim Weiterleiten an head oder less. Kein Fehler.
        os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())
        sys.exit(0)
    except KeyboardInterrupt:
        print("\nAbgebrochen.")
        sys.exit(130)
