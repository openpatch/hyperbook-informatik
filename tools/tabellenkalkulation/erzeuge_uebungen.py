#!/usr/bin/env python3
"""Erzeugt die interaktiven Übungen (bitflow) für den Lernpfad Tabellenkalkulation.

    python3 tools/tabellenkalkulation/erzeuge_uebungen.py

Jedes Kapitel bekommt eine Datei ``uebung.bitflow`` neben seinem Rückblick. Der
Rückblick bindet sie mit ``::bitflow{…}`` ein. Dazu kommen einzelne Übungen, die
eine Lektion direkt einbettet (``LEKTIONEN``). Wer eine Aufgabe ändern will,
ändert sie hier und erzeugt die Dateien neu – nicht im JSON.

Aufbau jeder Übung: Start, Aufgaben, Ende. Ausgewählte Aufgaben besitzen eine
Hilfeschleife: Bei einer falschen Antwort erscheint ein Hinweis, danach gibt es
genau einen zweiten Versuch, anschließend geht es in jedem Fall weiter.

Das Format ist unter https://bitflow.openpatch.org/llms.txt beschrieben.
"""

from __future__ import annotations

import html
import json
import pathlib
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parents[2]
BOOK = ROOT / "book" / "mittelstufe" / "tabellenkalkulation"

AUSWERTUNG = {"mode": "auto", "enableRetry": False, "showFeedback": True, "allowSkip": False}


# -- Bausteine -------------------------------------------------------------------


def hinweis(text: str) -> dict:
    return {"message": text, "severity": "warning"}


def svg_bild(svg: str, alt: str) -> str:
    """Ein SVG als Markdown-Bild mit data:-URI – bitflow-Dateien sollen keine Links enthalten."""
    return f"![{alt}](data:image/svg+xml,{urllib.parse.quote(svg)})"


def calc_ausschnitt(zeilen: list[list[str]], breiten: list[int]) -> str:
    """Zeichnet einen Tabellenausschnitt wie in Calc als SVG.

    Abschnitte (sections) sind in bitflow auf 40 % der Fensterhöhe begrenzt, und
    eine Markdown-Tabelle hat dort kein Gitter. Ein kompaktes Bild mit
    Spalten- und Zeilenköpfen liest sich wie das Programm selbst. Zellen, die mit
    ``=`` beginnen, werden als Formel in Festbreitenschrift gesetzt.
    """
    kopf, hoehe = 28, 26
    spalten = [kopf, *breiten]
    x = [0]
    for breite in spalten:
        x.append(x[-1] + breite)
    gesamt_b, gesamt_h = x[-1], hoehe * (len(zeilen) + 1)
    teile = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {gesamt_b} {gesamt_h}" '
             f'width="{gesamt_b}" height="{gesamt_h}" font-family="sans-serif" font-size="13">',
             f'<rect width="{gesamt_b}" height="{gesamt_h}" fill="#ffffff"/>',
             f'<rect width="{gesamt_b}" height="{hoehe}" fill="#e6e6e6"/>',
             f'<rect width="{kopf}" height="{gesamt_h}" fill="#e6e6e6"/>']
    for nummer in range(len(breiten)):
        mitte = (x[nummer + 1] + x[nummer + 2]) / 2
        teile.append(f'<text x="{mitte}" y="18" text-anchor="middle" font-weight="bold">{chr(65 + nummer)}</text>')
    for nummer, zeile in enumerate(zeilen, start=1):
        y = hoehe * nummer
        teile.append(f'<text x="{kopf / 2}" y="{y + 18}" text-anchor="middle" font-weight="bold">{nummer}</text>')
        for spalte, zelle in enumerate(zeile):
            if not zelle:
                continue
            formel = zelle.startswith("=")
            schrift = ' font-family="monospace"' if formel else ""
            teile.append(f'<text x="{x[spalte + 1] + 5}" y="{y + 18}"{schrift}>{html.escape(zelle)}</text>')
    for linie in x:
        teile.append(f'<line x1="{linie}" y1="0" x2="{linie}" y2="{gesamt_h}" stroke="#aaaaaa"/>')
    for nummer in range(len(zeilen) + 2):
        teile.append(f'<line x1="0" y1="{hoehe * nummer}" x2="{gesamt_b}" y2="{hoehe * nummer}" stroke="#aaaaaa"/>')
    teile.append("</svg>")
    return "".join(teile)


def lob(text: str) -> dict:
    return {"message": text, "severity": "success"}


def auswahl(frage: str, optionen: list[tuple[str, bool, str]], mehrfach: bool = False,
            mischen: bool = False) -> dict:
    """Optionen als (Text, richtig, Rückmeldung beim Ankreuzen)."""
    choices = []
    for nummer, (text, richtig, rueckmeldung) in enumerate(optionen, start=1):
        choice = {"id": f"o{nummer}", "markdown": text, "correct": richtig}
        if rueckmeldung:
            choice["feedbackWhenChecked"] = lob(rueckmeldung) if richtig else hinweis(rueckmeldung)
        choices.append(choice)
    return {
        "type": "task-choice",
        "data": {
            "instruction": frage,
            "variant": "multiple" if mehrfach else "single",
            "choices": choices,
            "shuffle": mischen,
            "partialCredit": False,
            "patternFeedback": [],
            "evaluation": AUSWERTUNG,
        },
    }


def zahl(frage: str, erwartet: str, toleranz: float = 0, einheit: str = "") -> dict:
    data = {
        "instruction": frage,
        "expected": erwartet,
        "tolerance": "absolute" if toleranz else "exact",
        "toleranceValue": toleranz,
        "decimalSeparator": "both",
        "allowExpression": False,
        "evaluation": AUSWERTUNG,
    }
    if einheit:
        data |= {"unitMode": "shown", "unit": einheit}
    return {"type": "task-numeric", "data": data}


def luecken(frage: str, text: str, antworten: dict[str, list[str]]) -> dict:
    return {
        "type": "task-fill-in-the-blank",
        "data": {
            "instruction": frage,
            "text": text,
            "blanks": antworten,
            "caseSensitive": False,
            "trim": True,
            "partialCredit": True,
            "evaluation": AUSWERTUNG,
        },
    }


def zuordnen(frage: str, paare: list[tuple[str, str]]) -> dict:
    return {
        "type": "task-matching",
        "data": {
            "instruction": frage,
            "pairs": [
                {
                    "id": f"p{nummer}",
                    "left": {"kind": "text", "label": links},
                    "right": {"kind": "text", "label": rechts},
                }
                for nummer, (links, rechts) in enumerate(paare, start=1)
            ],
            "evaluation": AUSWERTUNG,
        },
    }


def reihenfolge(frage: str, schritte: list[str]) -> dict:
    return {
        "type": "task-ordering",
        "data": {
            "instruction": frage,
            "items": [
                {"id": f"s{nummer}", "kind": "text", "label": schritt}
                for nummer, schritt in enumerate(schritte, start=1)
            ],
            "evaluation": AUSWERTUNG,
        },
    }


def tabelle(frage: str, spalten: list[tuple[str, str]], zeilen: list[list], erste_zeile: int = 1,
            beschriftung: str = "", toleranz: float = 0) -> dict:
    """Ein Tabellenausschnitt wie in Calc.

    ``spalten`` sind (Spaltenbuchstabe, Art) mit Art text/number/formula. In
    ``zeilen`` ist jede Zelle entweder ein String (vorgegeben) oder eine Liste
    akzeptierter Antworten (auszufüllen). Die Zeilennummern stehen als
    Zeilenköpfe davor.
    """
    columns = [{"id": buchstabe.lower(), "header": buchstabe, "kind": art} for buchstabe, art in spalten]
    rows = []
    for nummer, zeile in enumerate(zeilen, start=erste_zeile):
        cells = {}
        for (buchstabe, _), zelle in zip(spalten, zeile):
            cells[buchstabe.lower()] = {"accepted": zelle} if isinstance(zelle, list) else {"given": zelle}
        rows.append({"id": f"z{nummer}", "header": str(nummer), "cells": cells})
    return {
        "type": "task-table",
        "data": {
            "instruction": frage,
            "caption": beschriftung,
            "columns": columns,
            "rows": rows,
            "rowHeaders": True,
            "rowOrder": "fixed",
            "caseSensitive": False,
            "ignoreWhitespace": True,
            "numberTolerance": toleranz,
            "partialCredit": True,
            "evaluation": AUSWERTUNG,
        },
    }


def wahrheitstabelle(frage: str) -> dict:
    a = {"kind": "variable", "name": "A"}
    b = {"kind": "variable", "name": "B"}
    return {
        "type": "task-boolean-logic",
        "data": {
            "instruction": frage,
            "variables": ["A", "B"],
            "columns": [
                {"id": "und", "label": "UND(A; B)", "expression": {"kind": "and", "left": a, "right": b}, "given": False},
                {"id": "oder", "label": "ODER(A; B)", "expression": {"kind": "or", "left": a, "right": b}, "given": False},
            ],
            "rowOrder": "standard",
            "partialCredit": True,
            "evaluation": AUSWERTUNG,
        },
    }


def stelle_finden(frage: str, svg: str, alt: str, groesse: tuple[int, int],
                  stellen: list[dict], daneben: str) -> dict:
    return {
        "type": "task-find-hotspots",
        "data": {
            "instruction": frage,
            "background": {"src": "data:image/svg+xml," + urllib.parse.quote(svg), "alt": alt},
            "size": {"width": groesse[0], "height": groesse[1]},
            "hotspots": stellen,
            "missFeedback": daneben,
            "evaluation": AUSWERTUNG,
        },
    }


# -- Zusammenbau -----------------------------------------------------------------


def uebung(kennung: str, titel: str, einleitung: str, schluss: str, aufgaben: list[dict],
           abschnitte: dict[str, tuple[str, str]] | None = None) -> dict:
    """Setzt Start, Aufgaben (mit optionaler Hilfeschleife) und Ende zusammen.

    Jede Aufgabe ist ein Baustein von oben plus ``id`` und optional ``hilfe``
    (Titel, Markdown) und ``abschnitt``.

    Bitflow zeigt immer nur einen Schritt. Braucht eine Aufgabe Material, das
    eine andere schon gezeigt hat – eine Tabelle, ein Diagramm –, gehört dieses
    Material in einen Abschnitt (bitflow: ``section``). Dessen Markdown steht
    über jeder Aufgabe, die dem Abschnitt angehört. ``abschnitte`` bildet die
    Kennung auf (Überschrift, Markdown) ab.
    """
    nodes = [{
        "id": "start",
        "type": "start-simple",
        "position": {"x": 0, "y": 0},
        "data": {"title": titel, "markdown": einleitung, "showOutline": False},
    }]
    edges = []
    vorher = "start"
    y = 0
    for aufgabe in aufgaben:
        y += 140
        node = {"id": aufgabe["id"], "type": aufgabe["type"], "position": {"x": 0, "y": y},
                "data": aufgabe["data"]}
        if "abschnitt" in aufgabe:
            node["section"] = aufgabe["abschnitt"]
        nodes.append(node)
        edges.append({"id": f"e-{vorher}-{aufgabe['id']}", "source": vorher, "target": aufgabe["id"]})
        vorher = aufgabe["id"]

    nodes.append({
        "id": "ende",
        "type": "end-tries",
        "position": {"x": 0, "y": y + 140},
        "data": {"title": "Geschafft", "markdown": schluss,
                 "showBreakdown": True, "showScore": True, "allowReview": True},
    })
    edges.append({"id": f"e-{vorher}-ende", "source": vorher, "target": "ende"})

    # Hilfeschleifen: falsch -> Hinweis -> (beim ersten Mal) zurück, sonst weiter.
    nachfolger = {edge["source"]: edge["target"] for edge in edges}
    for aufgabe, node in zip(aufgaben, nodes[1:]):
        if "hilfe" not in aufgabe:
            continue
        kennung_aufgabe = aufgabe["id"]
        hilfe_id = f"hilfe-{kennung_aufgabe}"
        hilfe_titel, hilfe_text = aufgabe["hilfe"]
        nodes.append({
            "id": hilfe_id,
            "type": "title-simple",
            "position": {"x": 360, "y": node["position"]["y"] + 70},
            "data": {"title": hilfe_titel, "markdown": hilfe_text},
        })
        edges += [
            {
                "id": f"e-{kennung_aufgabe}-falsch",
                "source": kennung_aufgabe,
                "target": hilfe_id,
                "label": "noch nicht",
                "condition": {
                    "type": "compare",
                    "left": {"kind": "result", "nodeId": kennung_aufgabe, "path": "state"},
                    "op": "eq",
                    "right": "wrong",
                },
            },
            {
                "id": f"e-{hilfe_id}-zurueck",
                "source": hilfe_id,
                "target": kennung_aufgabe,
                "label": "noch ein Versuch",
                "resetTarget": "result",
                "condition": {
                    "type": "compare",
                    "left": {"kind": "visits", "nodeId": kennung_aufgabe},
                    "op": "lt",
                    "right": 2,
                },
            },
            {
                "id": f"e-{hilfe_id}-weiter",
                "source": hilfe_id,
                "target": nachfolger[kennung_aufgabe],
                "label": "weiter",
            },
        ]

    return {
        "version": 1,
        "meta": {
            "id": kennung,
            "title": titel,
            "locale": "de",
            "askConfidence": False,
            "askReasoning": False,
            "navigation": "back",
            "allowSkip": False,
            "sections": [
                {"id": kennung_abschnitt, "label": ueberschrift, "markdown": markdown}
                for kennung_abschnitt, (ueberschrift, markdown) in (abschnitte or {}).items()
            ],
        },
        "nodes": nodes,
        "edges": edges,
    }


def mit(baustein: dict, kennung: str, hilfe: tuple[str, str] | None = None,
        abschnitt: str | None = None) -> dict:
    aufgabe = {"id": kennung, **baustein}
    if hilfe:
        aufgabe["hilfe"] = hilfe
    if abschnitt:
        aufgabe["abschnitt"] = abschnitt
    return aufgabe


# -- Kapitel 1: Daten, Zellen und Formeln -----------------------------------------


REISEETAT = svg_bild(calc_ausschnitt(
    [
        ["Position", "Anzahl", "Einzelpreis", "Gesamt"],
        ["Flug", "26", "58,00 €", "=B2*C2"],
        ["Hostel", "26", "84,00 €", "=B3*C3"],
        ["Tram-Ticket", "26", "12,00 €", "=B4*C4"],
        ["Summe", "", "", "=SUMME(D2:D4)"],
    ],
    [100, 64, 84, 118],
), "Reiseetat: Flug, Hostel und Tram-Ticket für je 26 Personen zu 58, 84 und 12 Euro. "
   "In Spalte D stehen =B2*C2 bis =B4*C4, in D5 =SUMME(D2:D4).")


def kapitel_1() -> dict:
    return uebung(
        "calc-uebung-1-daten-und-formeln",
        "Übung: Daten, Zellen und Formeln",
        "Zehn kurze Aufgaben zu Zelladressen, Datentypen, Formeln und Funktionen. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du kannst Zellen adressieren, Datentypen unterscheiden und Formeln mit Zellbezügen "
        "und Funktionen schreiben. Schau dir in der Übersicht an, wo du noch unsicher warst.",
        [
            mit(luecken(
                "Ergänze die Zelladressen.",
                "Die Zelle in Spalte F und Zeile 12 heißt [[1]]. "
                "Der Bereich von B3 bis E9 wird als [[2]] geschrieben.",
                {"1": ["F12"], "2": ["B3:E9"]},
            ), "adresse", ("Erst die Spalte, dann die Zeile",
                           "Eine Adresse nennt zuerst den **Spaltenbuchstaben**, dann die **Zeilennummer**: "
                           "`C4`. Ein Bereich besteht aus der linken oberen und der rechten unteren Zelle, "
                           "getrennt durch einen **Doppelpunkt**: `B2:D6`.")),
            mit(zuordnen(
                "Ordne jeder Eingabe zu, wie Calc sie speichert.",
                [
                    ("Lissabon", "Text"),
                    ("24.06.2027", "Datum"),
                    ("89,90 €", "Zahl mit Währungsformat"),
                    ("15 %", "Zahl mit Prozentformat"),
                    ("=B2*C2", "Formel"),
                ],
            ), "datentypen", ("Wert und Format",
                              "Calc speichert einen **Wert** und zeigt ihn in einem **Format**. `89,90 €` ist die "
                              "Zahl 89,9 im Währungsformat, `15 %` die Zahl 0,15 im Prozentformat. Alles, was "
                              "mit `=` beginnt, ist eine Formel.")),
            mit(zahl("In einer Zelle wird `15 %` angezeigt. Welchen Zahlenwert speichert Calc?", "0.15"),
                "prozentwert", ("Prozent heißt Hundertstel",
                                "15 % sind 15 von 100, also 15 : 100. Calc speichert diese Dezimalzahl und zeigt "
                                "sie nur mit Prozentzeichen an.")),
            mit(auswahl(
                "Mit welchen Einträgen kann Calc rechnen? Wähle alle passenden aus.",
                [
                    ("`24`", True, ""),
                    ("`24 Personen`", False, "Das ist Text – die Einheit gehört in die Überschrift."),
                    ("`129,90` im Währungsformat", True, ""),
                    ("`ca. 130`", False, "Das ist Text. Calc kann „ca.“ nicht verrechnen."),
                    ("`12.05.2027` als Datum", True, "Richtig – ein Datum ist intern eine Zahl."),
                ],
                mehrfach=True,
            ), "rechenbar"),
            mit(tabelle(
                "Die Klasse plant eine Fahrt nach Lissabon. Trage in `D2` bis `D4` Formeln ein, die die "
                "Gesamtkosten jeder Position berechnen, und in `D5` eine Formel mit einer Funktion für die "
                "Summe.",
                [("A", "text"), ("B", "text"), ("C", "text"), ("D", "formula")],
                [
                    ["Position", "Anzahl", "Einzelpreis", "Gesamt"],
                    ["Flug", "26", "58,00 €", ["=B2*C2", "=C2*B2"]],
                    ["Hostel", "26", "84,00 €", ["=B3*C3", "=C3*B3"]],
                    ["Tram-Ticket", "26", "12,00 €", ["=B4*C4", "=C4*B4"]],
                    ["Summe", "", "", ["=SUMME(D2:D4)"]],
                ],
            ), "reiseetat", ("Zellbezüge statt Zahlen",
                             "In jede Formel gehören **Zellbezüge**, keine abgetippten Zahlen: `=B2*C2` rechnet "
                             "neu, sobald sich Anzahl oder Preis ändern. Für die Summe eines Bereichs gibt es "
                             "die Funktion `SUMME`, zum Beispiel `=SUMME(D2:D4)`.")),
            mit(zahl("Welcher Wert erscheint in `D5`?", "4004", einheit="€"), "summe",
                ("Rechne Zeile für Zeile",
                 "26 · 58 = 1 508, 26 · 84 = 2 184 und 26 · 12 = 312. Addiere die drei Ergebnisse."),
                abschnitt="reiseetat"),
            mit(zahl("Wie viel kostet die Fahrt pro Person?", "154", einheit="€"), "pro-person",
                abschnitt="reiseetat"),
            mit(luecken(
                "Ergänze die Funktionsnamen.",
                "Den günstigsten Einzelpreis liefert =[[1]](C2:C4), den teuersten =[[2]](C2:C4) "
                "und den Durchschnitt =[[3]](C2:C4).",
                {"1": ["MIN"], "2": ["MAX"], "3": ["MITTELWERT"]},
            ), "funktionen", abschnitt="reiseetat"),
            mit(auswahl(
                "Jemand berechnet den durchschnittlichen Einzelpreis und erhält 693,00 €. Der teuerste "
                "Einzelpreis ist aber 84,00 €. Was ist die wahrscheinlichste Ursache?",
                [
                    ("Der Bereich in der Formel enthält auch die Gesamtkosten aus Spalte D.", True,
                     "Genau. Ein Mittelwert muss zwischen Minimum und Maximum liegen."),
                    ("Mittelwerte können größer sein als der größte Wert.", False,
                     "Nein – der Durchschnitt liegt immer zwischen kleinstem und größtem Wert."),
                    ("Die Zelle braucht ein Prozentformat.", False,
                     "Das Format ändert nur die Anzeige, nicht den berechneten Wert."),
                ],
            ), "plausibel", ("Plausibilität prüfen",
                             "Ein Mittelwert liegt **immer zwischen Minimum und Maximum**. Liegt er darüber, "
                             "stimmt der Bereich nicht – oft wurde eine Spalte mit Ergebnissen mitmarkiert."),
                abschnitt="reiseetat"),
            mit(auswahl(
                "Jemand schreibt in `D2` statt `=B2*C2` die Formel `=26*58`. Das Ergebnis stimmt. "
                "Warum ist die Formel trotzdem ungünstig?",
                [
                    ("Ändert sich die Anzahl in `B2`, rechnet `D2` nicht mit.", True,
                     "Richtig. Erst Zellbezüge machen die Tabelle zu einem Modell."),
                    ("Calc kann mit festen Zahlen nicht multiplizieren.", False,
                     "Doch – das Ergebnis stimmt ja. Das Problem zeigt sich erst bei einer Änderung."),
                    ("Die Formel muss mit `SUMME` beginnen.", False,
                     "SUMME addiert Bereiche. Hier wird multipliziert."),
                ],
            ), "feste-zahlen", abschnitt="reiseetat"),
        ],
        abschnitte={"reiseetat": ("Der Reiseetat für Lissabon", REISEETAT)},
    )


# -- Kapitel 2: Bezüge ------------------------------------------------------------


MILAS_RECHNER = svg_bild(calc_ausschnitt(
    [
        ["Artikel", "Preis in €", "Preis in zł", "", "Kurs", "4,25"],
        ["Mittagessen", "12,00 €", "=B2*F1", "", "", ""],
        ["Straßenbahn", "1,20 €", "0,00", "", "", ""],
        ["Museum", "8,00 €", "0,00", "", "", ""],
    ],
    [96, 76, 80, 24, 44, 44],
), "Milas Währungsrechner: Preise in Euro in B2 bis B4, Kurs 4,25 in F1. "
   "In C2 steht =B2*F1, in C3 und C4 wird 0,00 angezeigt.")


def kapitel_2() -> dict:
    return uebung(
        "calc-uebung-2-bezuege",
        "Übung: Formeln kopieren und Bezüge steuern",
        "Neun Aufgaben zu relativen, absoluten und gemischten Bezügen – mit dem Währungsrechner. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du entscheidest bewusst, welcher Bezug beim Kopieren wandert und welcher feststeht. "
        "Schau in der Übersicht nach, welche Art von Bezug dir noch Mühe macht.",
        [
            mit(auswahl(
                "In `C2` steht `=B2*F1`. Die Formel wird eine Zeile nach unten kopiert. Was steht dann in `C3`?",
                [
                    ("`=B3*F2`", True, "Richtig: Beide relativen Bezüge wandern eine Zeile mit."),
                    ("`=B3*F1`", False, "Das wäre richtig mit `$F$1`. Ohne Dollarzeichen wandert auch F1."),
                    ("`=B2*F1`", False, "Relative Bezüge bleiben beim Kopieren nicht stehen."),
                ],
            ), "wandern", ("Relative Bezüge wandern",
                           "Calc verschiebt beim Kopieren **jeden relativen Bezug** um denselben Weg wie die "
                           "Formel. Eine Zeile tiefer wird aus `B2` also `B3` – und aus `F1` wird `F2`.")),
            mit(tabelle(
                "In `C2` steht jeweils eine Formel mit dem angegebenen Bezug. Sie wird nach `E5` kopiert – "
                "zwei Spalten nach rechts, drei Zeilen nach unten. Wie lautet der Bezug dort?",
                [("in C2", "formula"), ("in E5", "formula")],
                [
                    ["=B2", ["=D5"]],
                    ["=$B$2", ["=$B$2"]],
                    ["=$B2", ["=$B5"]],
                    ["=B$2", ["=D$2"]],
                ],
            ), "vorhersagen", ("Das Dollarzeichen hält fest, was dahinter steht",
                               "`$B` hält die **Spalte** fest, `$2` die **Zeile**. Alles ohne `$` wandert mit: "
                               "zwei Spalten nach rechts (B → D) und drei Zeilen nach unten (2 → 5).")),
            mit(auswahl(
                "Mila baut einen Währungsrechner: Preise in Euro stehen in `B2:B4`, der Kurs für Złoty in `F1`. "
                "Welche Formel gehört in `C2`, damit sie sich nach unten kopieren lässt?",
                [
                    ("`=B2*$F$1`", True, "Genau: Der Preis wandert, der Kurs bleibt fest."),
                    ("`=B2*F1`", False, "Beim Kopieren würde F1 zu F2 und F3 wandern."),
                    ("`=$B$2*$F$1`", False, "Dann rechnet jede Zeile mit dem ersten Preis."),
                ],
            ), "waehrung"),
            mit(auswahl(
                "Mila hat `=B2*F1` aus `C2` nach unten kopiert. In `C3` und `C4` erscheint `0`. Warum?",
                [
                    ("Die Formeln verweisen auf `F2` und `F3` – dort steht kein Kurs.", True,
                     "Richtig. Eine leere Zelle zählt als 0."),
                    ("Calc kann Formeln nicht nach unten kopieren.", False,
                     "Doch – das Ausfüllkästchen ist genau dafür da."),
                    ("Die Preise in `B3` und `B4` sind zu klein.", False,
                     "Auch ein kleiner Preis mal Kurs ergibt nicht 0."),
                ],
            ), "fehler-null", abschnitt="mila"),
            mit(luecken(
                "In `F1` steht der Kurs, in `F2` ein Rabatt. Ergänze die Formel für `C2` so, dass sie sich "
                "nach unten kopieren lässt.",
                "=B2*(1-[[1]])*[[2]]",
                {"1": ["$F$2"], "2": ["$F$1"]},
            ), "rabatt", ("Parameter immer festhalten",
                          "Kurs und Rabatt gelten für **alle** Zeilen. Solche Parameterzellen werden vollständig "
                          "festgehalten: Dollarzeichen vor Spalte **und** Zeile.")),
            mit(zahl(
                "Ein Angebot kostet 50 Pfund. Es gibt 10 % Rabatt, danach kommen 5 Pfund Versand hinzu, auf "
                "alles 20 % Steuer. Umgerechnet wird mit dem Kurs 1,1. Wie viel Euro kostet das Angebot?",
                "66", toleranz=0.01, einheit="€",
            ), "lange-formel", ("Schritt für Schritt",
                                "Rabatt: 50 · 0,9 = 45. Versand: 45 + 5 = 50. Steuer: 50 · 1,2 = 60. "
                                "Kurs: 60 · 1,1 = …")),
            mit(zuordnen(
                "Welchen Teil der Formel prüft welcher Testwert?",
                [
                    ("Rabatt 0 %", "Ist der Rabatt richtig eingebaut?"),
                    ("Kurs 1", "Funktioniert die Umrechnung?"),
                    ("Preis 0", "Wird der Versand versehentlich rabattiert?"),
                    ("Steuer 0 %", "Ist der Steuerfaktor richtig?"),
                ],
            ), "testwerte"),
            mit(tabelle(
                "Eine Umrechnungstabelle: Euro-Beträge in Spalte A, Kurse in Zeile 2. In `B3` steht "
                "`=$A3*B$2`. Die Formel wird in den ganzen Bereich kopiert. Trage die Formeln ein, die in "
                "`C3`, `B4` und `C4` entstehen.",
                [("A", "text"), ("B", "formula"), ("C", "formula")],
                [
                    ["Euro", "PLN", "CZK"],
                    ["Kurs", "4,25", "24,50"],
                    ["10", "=$A3*B$2", ["=$A3*C$2"]],
                    ["20", ["=$A4*B$2"], ["=$A4*C$2"]],
                ],
            ), "gemischt", ("Gemischte Bezüge",
                            "`$A3`: Die Spalte A bleibt fest, die Zeile wandert – der Betrag steht immer in "
                            "Spalte A. `B$2`: Die Zeile 2 bleibt fest, die Spalte wandert – der Kurs steht "
                            "immer in Zeile 2.")),
            mit(auswahl(
                "In `D4` steht `=B4*(1-$H$2)+$H3`. In `H3` steht ein einziger Versandpreis für alle Zeilen. "
                "Wie sollte der Versandbezug lauten?",
                [
                    ("`$H$3`", True, "Richtig. Nur so bleibt er auch beim Kopieren nach unten fest."),
                    ("`$H3`", False, "Beim Kopieren nach unten wandert die Zeile – aus H3 wird H4, H5, …"),
                    ("`H3`", False, "Dann wandern Spalte und Zeile."),
                ],
            ), "versand"),
        ],
        abschnitte={"mila": ("Milas Währungsrechner", MILAS_RECHNER)},
    )


# -- Kapitel 3: Diagramme ---------------------------------------------------------


SAEULEN_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 310" font-family="sans-serif" font-size="16">
<rect width="620" height="310" fill="#ffffff"/>
<text x="310" y="28" text-anchor="middle" font-size="18" font-weight="bold">Zufriedenheit in drei Städten</text>
<g stroke="#bbbbbb" stroke-dasharray="4 4">
<line x1="120" y1="250" x2="560" y2="250"/><line x1="120" y1="210" x2="560" y2="210"/>
<line x1="120" y1="170" x2="560" y2="170"/><line x1="120" y1="130" x2="560" y2="130"/>
<line x1="120" y1="90" x2="560" y2="90"/><line x1="120" y1="50" x2="560" y2="50"/>
</g>
<line x1="120" y1="40" x2="120" y2="250" stroke="#000000" stroke-width="2"/>
<line x1="120" y1="250" x2="560" y2="250" stroke="#000000" stroke-width="2"/>
<g text-anchor="end">
<text x="110" y="256">77</text><text x="110" y="216">78</text><text x="110" y="176">79</text>
<text x="110" y="136">80</text><text x="110" y="96">81</text><text x="110" y="56">82</text>
</g>
<rect x="160" y="210" width="80" height="40" fill="#23373b"/>
<rect x="300" y="130" width="80" height="120" fill="#23373b"/>
<rect x="440" y="50" width="80" height="200" fill="#23373b"/>
<g text-anchor="middle">
<text x="200" y="276">Stadt A</text><text x="340" y="276">Stadt B</text><text x="480" y="276">Stadt C</text>
</g>
<text x="30" y="150" text-anchor="middle" transform="rotate(-90 30 150)">Punkte</text>
</svg>"""


def punkt_svg(titel: str, untertitel: str, x_titel: str, y_titel: str,
              x_max: int, x_schritt: int, y_max: int, y_schritt: int,
              punkte: list[tuple]) -> str:
    """XY-Punktdiagramm mit beschrifteten Punkten, im Stil der übrigen Grafiken.

    Ein Punkt ist (x, y, Beschriftung) oder (x, y, Beschriftung, Seite) mit Seite
    "links" oder "rechts" für eng liegende Punkte. Ohne Seite steht die
    Beschriftung rechts unterhalb, am rechten Rand links unterhalb.
    """
    links, rechts, oben, unten = 90, 580, 60, 300

    def px(wert: float) -> float:
        return links + wert / x_max * (rechts - links)

    def py(wert: float) -> float:
        return unten - wert / y_max * (unten - oben)

    def zahl(wert: int) -> str:
        return f"{wert:,}".replace(",", ".")

    teile = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 360" font-family="sans-serif" font-size="13">',
             '<rect width="620" height="360" fill="#ffffff"/>',
             f'<text x="335" y="24" text-anchor="middle" font-size="16" font-weight="bold">{html.escape(titel)}</text>',
             f'<text x="335" y="44" text-anchor="middle" fill="#555555">{html.escape(untertitel)}</text>']
    for wert in range(0, x_max + 1, x_schritt):
        teile.append(f'<line x1="{px(wert)}" y1="{oben}" x2="{px(wert)}" y2="{unten}" stroke="#dddddd"/>')
        teile.append(f'<text x="{px(wert)}" y="{unten + 18}" text-anchor="middle">{zahl(wert)}</text>')
    for wert in range(0, y_max + 1, y_schritt):
        teile.append(f'<line x1="{links}" y1="{py(wert)}" x2="{rechts}" y2="{py(wert)}" stroke="#dddddd"/>')
        teile.append(f'<text x="{links - 8}" y="{py(wert) + 4}" text-anchor="end">{zahl(wert)}</text>')
    teile += [f'<line x1="{links}" y1="{unten}" x2="{rechts}" y2="{unten}" stroke="#000000" stroke-width="1.5"/>',
              f'<line x1="{links}" y1="{oben}" x2="{links}" y2="{unten}" stroke="#000000" stroke-width="1.5"/>',
              f'<text x="{(links + rechts) / 2}" y="{unten + 42}" text-anchor="middle">{html.escape(x_titel)}</text>',
              f'<text x="22" y="{(oben + unten) / 2}" text-anchor="middle" '
              f'transform="rotate(-90 22 {(oben + unten) / 2})">{html.escape(y_titel)}</text>']
    for x_wert, y_wert, beschriftung, *seite in punkte:
        x, y = px(x_wert), py(y_wert)
        teile.append(f'<circle cx="{x}" cy="{y}" r="6" fill="#23373b"/>')
        if seite == ["links"]:
            teile.append(f'<text x="{x - 11}" y="{y + 5}" text-anchor="end">{html.escape(beschriftung)}</text>')
        elif seite == ["rechts"]:
            teile.append(f'<text x="{x + 11}" y="{y + 5}">{html.escape(beschriftung)}</text>')
        # Am rechten Rand steht die Beschriftung links vom Punkt, sonst wird sie abgeschnitten.
        elif x > rechts - 120:
            teile.append(f'<text x="{x - 10}" y="{y + 18}" text-anchor="end">{html.escape(beschriftung)}</text>')
        else:
            teile.append(f'<text x="{x + 10}" y="{y + 16}">{html.escape(beschriftung)}</text>')
    teile.append("</svg>")
    return "".join(teile)


# Fiktive Daten für „Korrelation ist keine Ursache“ in Lektion 3.2.
# Beispiel: (Monat, Eis in Tausend Kugeln, Behandlungen wegen Sonnenbrand, Seite der Beschriftung)
EIS_MONATE = [
    ("April", 45, 12, "rechts"), ("Mai", 75, 32, "links"), ("Juni", 130, 55, "rechts"),
    ("Juli", 170, 82, "links"), ("August", 150, 66, "links"), ("September", 100, 38, "rechts"),
]

# Aufgabe: (Stadt, Einwohner in Mio., Fahrräder in Tausend, Verkehrsunfälle pro Jahr)
FAHRRAD_STAEDTE = [
    ("A", "0,3", 60, 310),
    ("B", "0,6", 130, 540),
    ("C", "1,1", 210, 900),
    ("D", "1,8", 330, 1180),
    ("E", "2,6", 470, 1720),
    ("F", "3,6", 600, 2250),
]


def eis_svg() -> str:
    return punkt_svg(
        "Eisverkauf und Sonnenbrände in einer Stadt", "fiktive Daten · ein Punkt je Monat",
        "verkaufte Eiskugeln (in Tausend)", "Behandlungen wegen Sonnenbrand",
        200, 25, 100, 20,
        [(eis, sonnenbrand, monat, seite) for monat, eis, sonnenbrand, seite in EIS_MONATE],
    )


def fahrrad_svg() -> str:
    return punkt_svg(
        "Fahrräder und Verkehrsunfälle in sechs europäischen Städten", "fiktive Daten · in Klammern: Einwohner",
        "Fahrräder (in Tausend)", "Verkehrsunfälle pro Jahr",
        700, 100, 2500, 500,
        [(raeder, unfaelle, f"Stadt {stadt} ({einwohner} Mio.)")
         for stadt, einwohner, raeder, unfaelle in FAHRRAD_STAEDTE],
    )


FAHRRAD_ALT = ("XY-Punktdiagramm mit fiktiven Daten: Sechs Städte von 0,3 bis 3,6 Millionen Einwohnern. "
               "Je größer die Stadt, desto mehr Fahrräder (60 000 bis 600 000) und desto mehr "
               "Verkehrsunfälle (310 bis 2 250 pro Jahr).")


def kapitel_3() -> dict:
    return uebung(
        "calc-uebung-3-diagramme",
        "Übung: Daten mit Diagrammen erzählen",
        "Acht Aufgaben zur Wahl des Diagrammtyps, zur Beschriftung und zu irreführenden Darstellungen. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du wählst Diagramme passend zur Frage und erkennst, wann eine Darstellung täuscht. "
        "Schau in der Übersicht nach, wo du noch unsicher warst.",
        [
            mit(zuordnen(
                "Ordne jeder Frage den passenden Diagrammtyp zu.",
                [
                    ("Besucherzahl eines Museums in Wien von 2015 bis 2025", "Liniendiagramm"),
                    ("Einwohnerzahl von vier europäischen Metropolen", "Säulendiagramm"),
                    ("Anteile von Fahrt, Unterkunft und Eintritten am Reiseetat", "Kreisdiagramm"),
                    ("Zusammenhang zwischen Körpergröße und Schuhgröße", "XY-Punktdiagramm"),
                ],
            ), "diagrammtyp", ("Die Frage bestimmt den Typ",
                               "**Linie:** Verlauf über die Zeit. **Säulen:** wenige Kategorien vergleichen. "
                               "**Kreis:** Anteile an einem Ganzen. **XY-Punkte:** Hängen zwei Zahlenmerkmale "
                               "zusammen?")),
            mit(reihenfolge(
                "Bringe die Schritte in die richtige Reihenfolge, um in Calc ein Diagramm zu erstellen.",
                [
                    "Monatsnamen und Werte markieren",
                    "Einfügen → Diagramm wählen",
                    "Diagrammtyp festlegen",
                    "Datenbereich und Datenreihen kontrollieren",
                    "Titel und Achsen beschriften",
                ],
            ), "assistent"),
            mit(auswahl(
                "Was braucht ein Diagramm mit zwei Temperaturreihen mindestens? Wähle alle passenden aus.",
                [
                    ("einen Titel, der den Zusammenhang nennt", True, ""),
                    ("Achsenbeschriftungen mit Größe und Einheit", True, ""),
                    ("eine Legende, die die beiden Reihen unterscheidet", True, ""),
                    ("einen 3D-Effekt", False, "3D verzerrt Größen und erschwert das Ablesen."),
                    ("eine farbige Hintergrundgrafik", False, "Dekoration trägt keine Aussage."),
                ],
                mehrfach=True,
            ), "beschriftung", ("Aussage statt Dekoration",
                                "Ein Diagramm braucht **Titel**, **Achsen mit Größe und Einheit** und gut "
                                "erkennbare **Datenreihen** – bei mehreren Reihen also eine Legende.")),
            mit(stelle_finden(
                "Dieses Diagramm übertreibt die Unterschiede. Klicke auf die Stelle, die dafür verantwortlich ist.",
                SAEULEN_SVG,
                "Säulendiagramm: Stadt A 78, Stadt B 80, Stadt C 82 Punkte. Die y-Achse beginnt bei 77.",
                (620, 310),
                [
                    {"id": "achsenanfang", "shape": "rect", "x": 0.08, "y": 0.72, "width": 0.14, "height": 0.16,
                     "correct": True, "label": "Achsenanfang bei 77",
                     "feedback": "Genau: Die y-Achse beginnt bei 77 statt bei 0."},
                    {"id": "titel", "shape": "rect", "x": 0.2, "y": 0.02, "width": 0.6, "height": 0.1,
                     "correct": False, "label": "Titel",
                     "feedback": "Der Titel ist sachlich. Schau auf die Zahlenachse."},
                    {"id": "saeule-c", "shape": "rect", "x": 0.7, "y": 0.15, "width": 0.14, "height": 0.66,
                     "correct": False, "label": "Säule C",
                     "feedback": "Die Säule zeigt den richtigen Wert 82. Wo beginnt die Achse?"},
                ],
                "Schau dir die Zahlenachse genau an.",
            ), "achse", ("Die abgeschnittene Achse",
                         "Säulen vergleichen **Längen**. Beginnt die Achse nicht bei 0, stimmen die Längen nicht "
                         "mehr mit den Werten überein – kleine Unterschiede wirken riesig.")),
            mit(zahl(
                "Wievielmal so hoch wie die Säule von Stadt A *wirkt* die Säule von Stadt C?",
                "5",
            ), "wirkung", ("Längen vergleichen",
                           "Die Achse beginnt bei 77. Die Säule A reicht von 77 bis 78, die Säule C von 77 bis 82. "
                           "Vergleiche die beiden Längen."), abschnitt="diagramm"),
            mit(zahl(
                "Wievielmal so groß ist der Wert von Stadt C wirklich? Runde auf zwei Nachkommastellen.",
                "1.05", toleranz=0.005,
            ), "wirklich", abschnitt="diagramm"),
            mit(auswahl(
                "Das Diagramm zeigt: In größeren europäischen Städten gibt es mehr Fahrräder und mehr "
                "Verkehrsunfälle. Welche Aussage trägt das Diagramm wirklich?",
                [
                    ("In den betrachteten Städten treten viele Fahrräder und viele Unfälle gemeinsam auf.", True,
                     "Richtig – das ist eine Beobachtung, keine Ursache."),
                    ("Fahrräder verursachen Verkehrsunfälle.", False,
                     "Korrelation ist keine Ursache. Größere Städte haben einfach von allem mehr."),
                    ("Weniger Fahrräder würden die Unfälle senken.", False,
                     "Das ist eine Vermutung über eine Ursache, die das Diagramm nicht belegt."),
                ],
            ), "korrelation", ("Korrelation ist keine Ursache",
                               "Ein gemeinsamer Verlauf zeigt nur einen **Zusammenhang**. Oft beeinflusst eine "
                               "dritte Größe beide – hier die Einwohnerzahl."), abschnitt="fahrrad"),
            mit(auswahl(
                "Welche Größe macht den Unfallvergleich zwischen den Städten fairer?",
                [
                    ("Unfälle pro 100 000 Einwohner", True, "Genau – eine Bezugsgröße macht Städte vergleichbar."),
                    ("Unfälle insgesamt", False, "Absolute Zahlen sind in großen Städten fast immer größer."),
                    ("Unfälle als 3D-Säulen", False, "Die Darstellung ändert nichts an der Vergleichsgröße."),
                ],
            ), "bezugsgroesse", abschnitt="fahrrad"),
        ],
        abschnitte={"diagramm": (
            "Das Diagramm aus der vorigen Aufgabe",
            svg_bild(SAEULEN_SVG.replace('viewBox="0 0 620 310"', 'viewBox="0 0 620 310" width="440" height="220"', 1),
                     "Säulendiagramm: Stadt A 78, Stadt B 80, Stadt C 82 Punkte. Die y-Achse beginnt bei 77."),
        ), "fahrrad": (
            "Fahrräder und Verkehrsunfälle",
            svg_bild(fahrrad_svg().replace('viewBox="0 0 620 360"', 'viewBox="0 0 620 360" width="480" height="279"', 1),
                     FAHRRAD_ALT),
        )},
    )


# -- Kapitel 4: Wachstum ----------------------------------------------------------


def kapitel_4() -> dict:
    return uebung(
        "calc-uebung-4-wachstum",
        "Übung: Wachstum modellieren und simulieren",
        "Acht Aufgaben zu linearem, exponentiellem und quadratischem Wachstum und zu Prognosen. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du erkennst Wachstumsmodelle an ihrer Regel, setzt sie mit Parameterzellen um und formulierst "
        "Prognosen vorsichtig. Schau in der Übersicht nach, wo du noch unsicher warst.",
        [
            mit(zuordnen(
                "Ordne jeder Regel das Wachstumsmodell zu.",
                [
                    ("Jeden Monat kommen 20 Kundinnen und Kunden hinzu.", "linear"),
                    ("Jeden Monat wächst die Zahl um 8 %.", "exponentiell"),
                    ("Die Zuwächse lauten +3, +5, +7, +9, …", "quadratisch"),
                ],
            ), "modelle", ("Woran man die Modelle erkennt",
                           "**Linear:** gleicher Zuwachs. **Exponentiell:** gleicher Faktor, also gleicher "
                           "prozentualer Zuwachs. **Quadratisch:** Die Zuwächse selbst wachsen gleichmäßig.")),
            mit(zahl("Welcher Wachstumsfaktor gehört zu 6 % Wachstum?", "1.06"), "faktor",
                ("Faktor = 1 + Rate", "Zum alten Wert (100 % = 1) kommen 6 % = 0,06 hinzu.")),
            mit(tabelle(
                "Beide Modelle starten bei 100. Modell B wächst jedes Jahr um 20, Modell C um 10 %. "
                "Trage die Werte für die Jahre 1 bis 3 ein.",
                [("A", "text"), ("B", "number"), ("C", "number")],
                [
                    ["Jahr", "linear", "exponentiell"],
                    ["0", "100", "100"],
                    ["1", ["120"], ["110"]],
                    ["2", ["140"], ["121"]],
                    ["3", ["160"], ["133,1", "133.1"]],
                ],
                toleranz=0.05,
            ), "wertetabelle", ("Addieren oder multiplizieren",
                                "Linear: jedes Jahr **+ 20**. Exponentiell: jedes Jahr **· 1,1** – der Zuwachs wird "
                                "dadurch von Jahr zu Jahr größer: +10, +11, +12,1.")),
            mit(luecken(
                "Der feste Zuwachs steht in `F1`, die Wachstumsrate in `F2`. Ergänze die Formeln für "
                "`B3` (linear) und `C3` (exponentiell), die sich nach unten kopieren lassen.",
                "B3: =B2+[[1]]    C3: =C2*(1+[[2]])",
                {"1": ["$F$1"], "2": ["$F$2"]},
            ), "formeln", ("Parameter festhalten",
                           "Der vorige Wert (`B2`, `C2`) soll beim Kopieren wandern. Zuwachs und Rate gelten für "
                           "alle Jahre – sie werden mit `$` vor Spalte und Zeile festgehalten.")),
            mit(auswahl(
                "Eine Folge lautet 2, 6, 18, 54, … Welches Modell liegt vor?",
                [
                    ("exponentiell", True, "Richtig: Der Quotient aufeinanderfolgender Werte ist immer 3."),
                    ("linear", False, "Die Zuwächse (4, 12, 36) sind nicht gleich."),
                    ("quadratisch", False, "Die Zuwächse wachsen nicht gleichmäßig, sie verdreifachen sich."),
                ],
            ), "folge", ("Differenzen und Quotienten",
                         "Bilde die **Differenzen** benachbarter Werte. Sind sie gleich: linear. Wachsen sie "
                         "gleichmäßig: quadratisch. Ist stattdessen der **Quotient** gleich: exponentiell.")),
            mit(zahl(
                "Modell A startet bei 500 und wächst jährlich um 50. Modell B startet bei 500 und wächst "
                "jährlich um 8 %. Nach wie vielen Jahren liegt B erstmals vor A?",
                "7",
            ), "ueberholen", ("Rechne es in Calc nach",
                              "Nach einem Jahr: A = 550, B = 540. B wächst aber jedes Jahr um mehr. Lege zwei "
                              "Spalten an und vergleiche Jahr für Jahr.")),
            mit(auswahl(
                "Eine Stadt hat 2 Mio. Übernachtungen pro Jahr. Ein Modell rechnet mit 7 % Wachstum pro Jahr. "
                "Welche Formulierung einer Prognose ist verantwortbar?",
                [
                    ("Wenn die Rate konstant bei 7 % bleibt, ergibt das Modell nach 25 Jahren rund 11 Mio. Übernachtungen.",
                     True, "Genau – eine Wenn-dann-Aussage nennt die Annahme."),
                    ("In 25 Jahren wird es 11 Mio. Übernachtungen geben.", False,
                     "Das klingt wie eine Gewissheit. Das Modell gilt nur unter seinen Annahmen."),
                    ("Die Tabelle beweist, dass der Tourismus immer wächst.", False,
                     "Ein Modell beweist nichts über die Zukunft."),
                ],
            ), "prognose"),
            mit(auswahl(
                "Ein Tourismusverband sagt: „Die Übernachtungen wachsen für immer um 7 % pro Jahr.“ "
                "Welche Gründe sprechen dagegen? Wähle alle passenden aus.",
                [
                    ("Die Zahl der Betten ist begrenzt.", True, ""),
                    ("Nachfrage und Reiseverhalten können sich ändern.", True, ""),
                    ("Unvorhersehbare Ereignisse können das Wachstum stoppen.", True, ""),
                    ("Calc kann nicht weiter als 20 Jahre rechnen.", False,
                     "Calc rechnet beliebig weit. Das Problem liegt in den Annahmen des Modells."),
                ],
                mehrfach=True,
            ), "grenzen"),
        ],
    )


# -- Kapitel 5: WENN --------------------------------------------------------------


def kapitel_5() -> dict:
    return uebung(
        "calc-uebung-5-wenn",
        "Übung: Entscheidungen mit WENN",
        "Acht Aufgaben zu WENN, Vergleichsoperatoren, UND und ODER und zu Grenztests. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du baust Entscheidungsregeln mit WENN und testest sie an ihren Grenzen. "
        "Schau in der Übersicht nach, wo du noch unsicher warst.",
        [
            mit(auswahl(
                "In `B2` steht 150, in `F1` das Budget 150. Was liefert "
                "`=WENN(B2<=$F$1; \"im Budget\"; \"zu teuer\")`?",
                [
                    ("im Budget", True, "Richtig: 150 ≤ 150 ist wahr."),
                    ("zu teuer", False, "`<=` heißt kleiner **oder gleich** – die Grenze gehört dazu."),
                    ("eine Fehlermeldung", False, "Die Formel ist vollständig: Bedingung; wahr; falsch."),
                ],
            ), "grenze", ("Kleiner oder gleich",
                          "`<=` ist wahr, wenn der linke Wert kleiner **oder gleich** dem rechten ist. "
                          "Ist die Bedingung wahr, liefert WENN das zweite Argument.")),
            mit(auswahl(
                "Welcher Operator bedeutet in Calc „ungleich“?",
                [
                    ("`<>`", True, ""),
                    ("`!=`", False, "So schreibt man es in vielen Programmiersprachen, aber nicht in Calc."),
                    ("`=/=`", False, "Diesen Operator gibt es nicht."),
                ],
            ), "ungleich"),
            mit(zahl(
                "In `B2` stehen 12 Teilnehmende, in `C2` der Preis 250 €, in `F2` der Rabatt 8 %. "
                "Was liefert `=WENN(B2>=10; C2*(1-$F$2); C2)`?",
                "230", toleranz=0.01, einheit="€",
            ), "rabatt", ("Erst prüfen, dann rechnen",
                          "12 ≥ 10 ist wahr, also wird das zweite Argument berechnet: 250 · (1 − 0,08).")),
            mit(tabelle(
                "In `B2` steht `=WENN(A2<100; \"günstig\"; WENN(A2<=150; \"mittel\"; \"teuer\"))`, nach unten "
                "kopiert. Sage die Ausgaben voraus.",
                [("A", "number"), ("B", "text")],
                [
                    ["99", ["günstig"]],
                    ["100", ["mittel"]],
                    ["150", ["mittel"]],
                    ["151", ["teuer"]],
                ],
                erste_zeile=2,
            ), "verschachtelt", ("Von außen nach innen",
                                 "Zuerst wird `A2<100` geprüft. Nur wenn das **falsch** ist, kommt die innere "
                                 "WENN-Funktion dran: `A2<=150` – die 150 gehört also noch zu „mittel“.")),
            mit(wahrheitstabelle("Ergänze die Wahrheitstabelle für UND und ODER."), "und-oder",
                ("UND und ODER",
                 "**UND** ist nur wahr, wenn **alle** Bedingungen wahr sind. **ODER** ist wahr, sobald "
                 "**mindestens eine** Bedingung wahr ist.")),
            mit(luecken(
                "Jugendliche bis einschließlich 17 Jahre bekommen Rabatt, wenn sie zusätzlich eine Schülerkarte "
                "haben. Das Alter steht in `B2`, in `C2` steht „ja“ oder „nein“.",
                "=WENN([[1]](B2<=[[2]]; C2=\"ja\"); \"Rabatt\"; \"Normalpreis\")",
                {"1": ["UND"], "2": ["17"]},
            ), "schwimmbad", ("Beide Bedingungen müssen stimmen",
                              "Rabatt gibt es nur, wenn das Alter passt **und** die Karte vorliegt. "
                              "„Bis einschließlich 17“ heißt: `<=17`.")),
            mit(auswahl(
                "Ab 10 Teilnehmenden gibt es Rabatt. Welche Testwerte prüfen diese Grenze am besten? "
                "Wähle alle passenden aus.",
                [
                    ("9", True, ""),
                    ("10", True, ""),
                    ("11", True, ""),
                    ("50", False, "Weit weg von der Grenze findest du vertauschte Operatoren nicht."),
                    ("0", False, "Das ist ein Sonderfall, aber kein Test der Grenze 10."),
                ],
                mehrfach=True,
            ), "grenztest"),
            mit(auswahl(
                "Die Formel `=WENN(UND(B2<=17; C2=\"ja\"); \"Rabatt\"; \"Normalpreis\")` liefert „Rabatt“. "
                "Was kann das Modell trotzdem nicht prüfen?",
                [
                    ("ob die vorgezeigte Schülerkarte echt und gültig ist", True,
                     "Genau – das Modell verarbeitet nur die eingegebenen Daten."),
                    ("ob das Alter höchstens 17 ist", False, "Genau das prüft die Bedingung `B2<=17`."),
                    ("ob in `C2` „ja“ steht", False, "Das prüft die Bedingung `C2=\"ja\"`."),
                ],
            ), "grenzen-modell"),
        ],
    )


# -- Kleine Abbildungen zu den Diagrammtypen (Lektion 3.1) --------------------------

TYP_B, TYP_H = 180, 110
DUNKEL, AKZENT, HELL = "#23373b", "#ba7720", "#dddddd"


def _typ_rahmen(inhalt: str, achsen: bool = True) -> str:
    teile = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TYP_B} {TYP_H}" '
             f'width="{TYP_B}" height="{TYP_H}">',
             f'<rect width="{TYP_B}" height="{TYP_H}" fill="#ffffff"/>']
    if achsen:
        teile += [f'<line x1="18" y1="95" x2="170" y2="95" stroke="#000000" stroke-width="1.5"/>',
                  f'<line x1="18" y1="10" x2="18" y2="95" stroke="#000000" stroke-width="1.5"/>']
        for y in (32, 53, 74):
            teile.append(f'<line x1="18" y1="{y}" x2="170" y2="{y}" stroke="{HELL}"/>')
    teile.append(inhalt)
    teile.append("</svg>")
    return "".join(teile)


def typ_linie() -> str:
    """Jahresgang der Berliner Temperatur aus der Aufgabe weiter unten."""
    werte = [1, 2, 6, 11, 16, 19, 21, 20, 16, 11, 6, 2]
    punkte = [(26 + i * 13, 90 - w * 3.6) for i, w in enumerate(werte)]
    linie = " ".join(f"{x:.0f},{y:.0f}" for x, y in punkte)
    kreise = "".join(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="2.5" fill="{DUNKEL}"/>' for x, y in punkte)
    return _typ_rahmen(f'<polyline points="{linie}" fill="none" stroke="{DUNKEL}" stroke-width="2"/>{kreise}')


def typ_saeulen() -> str:
    """Jahresniederschlag von fünf Hauptstädten."""
    hoehen = [60, 42, 75, 30, 52]
    return _typ_rahmen("".join(
        f'<rect x="{28 + i * 28}" y="{95 - h}" width="20" height="{h}" fill="{DUNKEL}"/>'
        for i, h in enumerate(hoehen)))


def typ_kreis() -> str:
    """Anteile der Verkehrsmittel an allen Fahrten: 45 %, 30 %, 15 %, 10 %."""
    import math
    anteile = [(0.45, DUNKEL), (0.30, AKZENT), (0.15, "#7f9aa0"), (0.10, "#e3c89c")]
    mx, my, r = TYP_B / 2, TYP_H / 2, 45
    teile, start = [], -math.pi / 2
    for anteil, farbe in anteile:
        ende = start + anteil * 2 * math.pi
        x1, y1 = mx + r * math.cos(start), my + r * math.sin(start)
        x2, y2 = mx + r * math.cos(ende), my + r * math.sin(ende)
        gross = 1 if anteil > 0.5 else 0
        teile.append(f'<path d="M{mx},{my} L{x1:.1f},{y1:.1f} A{r},{r} 0 {gross} 1 {x2:.1f},{y2:.1f} Z" '
                     f'fill="{farbe}" stroke="#ffffff" stroke-width="1.5"/>')
        start = ende
    return _typ_rahmen("".join(teile), achsen=False)


def typ_punkte() -> str:
    """Entfernung und Fahrtdauer: eine Punktwolke mit steigendem Trend."""
    punkte = [(30, 84), (44, 78), (52, 70), (66, 72), (78, 60), (90, 56), (104, 48),
              (112, 52), (126, 38), (138, 34), (150, 26), (160, 20)]
    return _typ_rahmen("".join(f'<circle cx="{x}" cy="{y}" r="3.5" fill="{DUNKEL}"/>' for x, y in punkte))


DIAGRAMMTYPEN = {
    "typ-linie.svg": typ_linie,
    "typ-saeulen.svg": typ_saeulen,
    "typ-kreis.svg": typ_kreis,
    "typ-punkte.svg": typ_punkte,
}


# -- Lektion 2.1: Wohin wandern die Bezüge? ----------------------------------------


BEZUG_HILFE = ("Was wandert, was bleibt?",
               "Kopierst du eine Formel, verschiebt Calc jeden **relativen** Bezug um denselben Weg: "
               "eine Zeile tiefer → Zeilennummer + 1, eine Spalte weiter rechts → nächster Buchstabe. "
               "Das `$` hält fest, was **direkt dahinter** steht: `$B` die Spalte, `$2` die Zeile.")


def lektion_2_1() -> dict:
    """Vorhersage-Quiz vor dem Ausprobieren in Calc."""
    return uebung(
        "calc-bezuege-vorhersagen",
        "Wohin wandern die Bezüge?",
        "Sage vorher, was beim Kopieren aus einer Formel wird. Danach probierst du es in Calc aus. "
        "Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du kannst vorhersagen, wie sich Bezüge beim Kopieren verändern. Prüfe deine Vorhersagen jetzt in Calc.",
        [
            mit(auswahl(
                "In `C2` steht `=B2*$F$1`. Die Formel wird eine Zeile nach unten nach `C3` kopiert. "
                "Welche Formel steht dann in `C3`?",
                [
                    ("`=B3*$F$1`", True, "Richtig: Der Preis wandert mit, der Kurs bleibt fest."),
                    ("`=B3*$F$2`", False, "`$F$1` ist absolut – Spalte und Zeile sind festgehalten."),
                    ("`=B2*$F$1`", False, "`B2` ist relativ und wandert eine Zeile mit."),
                ],
            ), "nach-unten", BEZUG_HILFE),
            mit(auswahl(
                "Dieselbe Formel `=B2*$F$1` wird von `C2` eine Spalte nach **rechts** nach `D2` kopiert. "
                "Welche Formel steht dann in `D2`?",
                [
                    ("`=C2*$F$1`", True, "Genau: Nach rechts wandert der Spaltenbuchstabe, B wird zu C."),
                    ("`=B3*$F$1`", False, "Nach rechts ändert sich die Spalte, nicht die Zeile."),
                    ("`=C2*$G$1`", False, "`$F$1` bleibt auch beim Kopieren nach rechts fest."),
                ],
            ), "nach-rechts", BEZUG_HILFE),
            mit(tabelle(
                "In `C2` steht jeweils eine Formel mit dem angegebenen Bezug. Sie wird nach `D4` kopiert – "
                "eine Spalte nach rechts, zwei Zeilen nach unten. Trage ein, was dann in `D4` steht.",
                [("in C2", "formula"), ("in D4", "formula")],
                [
                    ["=B2", ["=C4"]],
                    ["=$B$2", ["=$B$2"]],
                    ["=$B2", ["=$B4"]],
                    ["=B$2", ["=C$2"]],
                ],
            ), "vier-bezuege", BEZUG_HILFE),
            mit(auswahl(
                "In `C2` steht `=B2*(1-$F$2)*$F$1`. Welche Bezüge verändern sich, wenn du die Formel "
                "nach unten kopierst? Wähle alle aus.",
                [
                    ("`B2`", True, ""),
                    ("`$F$2`", False, "Der Rabatt gilt für alle Angebote und bleibt fest."),
                    ("`$F$1`", False, "Der Wechselkurs gilt für alle Angebote und bleibt fest."),
                ],
                mehrfach=True,
            ), "zwei-parameter"),
        ],
    )


# -- Lektion 2.2: Sonderfälle vorhersagen ------------------------------------------


AUSGANGSWERTE = """In `F2` steht `=((A2*(1-$H$2)+$H$3)*(1+$H$4))*$H$5`. Die Ausgangswerte:

- Preis `A2`: 100 · Rabatt `H2`: 12 % · Versand `H3`: 8 · Steuer `H4`: 20 % · Wechselkurs `H5`: 1,16
- Ergebnis in `F2`: **133,63 €**

In jeder Aufgabe änderst du **genau einen** Wert, alle anderen bleiben wie hier."""

SONDERFALL_HILFE = ("Rechne Schritt für Schritt",
                    "Gehe die Rechenschritte der Reihe nach durch: Preis · (1 − Rabatt), dann + Versand, "
                    "dann · (1 + Steuer), dann · Wechselkurs. Setze nur den geänderten Wert neu ein.")


def lektion_2_2() -> dict:
    """Sonderfälle vorhersagen und zwei typische Fehler finden."""
    def sonderfall(kennung, aenderung, erwartet, hinweis=None):
        return mit(zahl(f"{aenderung} Welcher Wert erscheint dann in `F2`? Runde auf zwei Nachkommastellen.",
                        erwartet, toleranz=0.01, einheit="€"),
                   kennung, hinweis or SONDERFALL_HILFE, abschnitt="ausgang")

    return uebung(
        "calc-sonderfaelle-vorhersagen",
        "Sage die Sonderfälle voraus",
        "Ein guter Test beginnt mit einer Vorhersage. Berechne im Kopf oder mit dem Taschenrechner, was "
        "Calc anzeigen müsste – danach prüfst du es in deiner Tabelle.",
        "Du kannst mit Sonderfällen vorhersagen, was eine Formel liefern muss, und Fehler gezielt eingrenzen. "
        "Prüfe deine Vorhersagen jetzt in Calc.",
        [
            sonderfall("rabatt-null", "Du setzt den Rabatt auf **0 %**.", "150.34",
                       ("Ohne Rabatt", "Der volle Preis 100 wird verwendet: (100 + 8) · 1,2 · 1,16.")),
            sonderfall("versand-null", "Du setzt den Versand auf **0**.", "122.50",
                       ("Ohne Versand", "100 · 0,88 = 88. Ohne Versand bleibt es bei 88; dann · 1,2 · 1,16.")),
            sonderfall("steuer-null", "Du setzt die Steuer auf **0 %**.", "111.36",
                       ("Ohne Steuer", "(100 · 0,88 + 8) = 96. Der Faktor für die Steuer ist jetzt 1; dann · 1,16.")),
            sonderfall("kurs-eins", "Du setzt den Wechselkurs auf **1**.", "115.20",
                       ("Kurs 1", "Mit dem Faktor 1 bleibt das Ergebnis in der Ausgangswährung: (88 + 8) · 1,2.")),
            sonderfall("preis-null", "Du setzt den Preis auf **0**.", "11.14",
                       ("Preis 0", "Vom Preis bleibt nichts übrig. Versand, Steuer und Kurs wirken weiter: 8 · 1,2 · 1,16.")),
            mit(auswahl(
                "Jemand schreibt `=A2*(1-$H$2)+$H$3*(1+$H$4)*$H$5` und erhält **99,14 €** statt 133,63 €. "
                "Was ist falsch?",
                [
                    ("Es fehlen Klammern: Steuer und Kurs wirken nur auf den Versand.", True,
                     "Genau. Punkt vor Strich – ohne Klammer wird nur $H$3 mit Steuer und Kurs multipliziert."),
                    ("Der Rabatt müsste ein relativer Bezug sein.", False,
                     "Relativ oder absolut ändert in Zeile 2 nichts am Ergebnis – erst beim Kopieren."),
                    ("Calc rechnet Prozentwerte falsch.", False,
                     "Calc rechnet richtig. Die Formel beschreibt eine andere Rechnung als gewollt."),
                ],
            ), "klammer", ("Punkt vor Strich",
                           "Auch Calc rechnet **Punkt vor Strich**. Ohne Klammer um `A2*(1-$H$2)+$H$3` wird zuerst "
                           "`$H$3*(1+$H$4)*$H$5` berechnet und danach zum rabattierten Preis addiert."),
                abschnitt="ausgang"),
            mit(auswahl(
                "Die Formel stimmt in `F2`. Nach dem Kopieren zeigt `F3` einen falschen Wert. In `F3` steht "
                "`=((A3*(1-H3)+H4)*(1+H5))*H6`. Was ist die Ursache?",
                [
                    ("In `F2` fehlten die Dollarzeichen – die Parameter sind beim Kopieren mitgewandert.", True,
                     "Richtig. Parameter wie Rabatt und Kurs müssen mit $ festgehalten werden."),
                    ("`A3` müsste `A2` bleiben.", False, "Der Preis soll wandern – Zeile 3 hat ihren eigenen Preis."),
                    ("In `F3` muss man die Formel neu eintippen.", False,
                     "Dann wäre das Kopieren sinnlos. Die Formel in `F2` muss so gebaut sein, dass sie kopierbar ist."),
                ],
            ), "kopierfehler", BEZUG_HILFE),
        ],
        abschnitte={"ausgang": ("Die Ausgangswerte", AUSGANGSWERTE)},
    )


# -- Lektion 3.1: Welcher Diagrammtyp passt? --------------------------------------


DIAGRAMMTYP_HILFE = ("Die Frage bestimmt den Typ",
                     "- **Linie:** Wie verändert sich eine Größe über die Zeit?\n"
                     "- **Säulen oder Balken:** Wie unterscheiden sich wenige Kategorien?\n"
                     "- **Kreis:** Wie setzt sich ein Ganzes zusammen?\n"
                     "- **XY-Punkte:** Hängen zwei Zahlenmerkmale zusammen?\n\n"
                     "Achte auch auf die **Begründung**: Sie muss sagen, was die Daten sind "
                     "– ein Verlauf, Kategorien, Anteile oder zwei Messgrößen.")


def lektion_3_1() -> dict:
    """Die Zuordnungsaufgabe aus 3.1: erst Frage → Diagrammtyp, dann Typ → Begründung."""
    return uebung(
        "calc-diagrammtyp-waehlen",
        "Welcher Diagrammtyp passt?",
        "Zwei Zuordnungen: Zuerst ordnest du jeder Frage einen Diagrammtyp zu, danach jedem "
        "Diagrammtyp seine Begründung. Bei einem Fehler bekommst du einen Hinweis und einen zweiten Versuch.",
        "Du wählst den Diagrammtyp nach der Frage, die das Diagramm beantworten soll – nicht danach, "
        "was am schönsten aussieht.",
        [
            mit(zuordnen(
                "Ordne jeder Frage den passenden Diagrammtyp zu.",
                [
                    ("Monatsmitteltemperatur in Berlin über ein Jahr", "Liniendiagramm"),
                    ("Jahresniederschlag von fünf Hauptstädten", "Säulendiagramm"),
                    ("Zusammenhang zwischen Entfernung und Fahrtdauer", "XY-Punktdiagramm"),
                    ("Anteile verschiedener Verkehrsmittel an allen Fahrten", "Kreisdiagramm"),
                ],
            ), "zuordnung", DIAGRAMMTYP_HILFE),
            mit(zuordnen(
                "Begründe deine Wahl: Ordne jedem Diagrammtyp zu, wann er passt.",
                [
                    ("Liniendiagramm",
                     "Die Werte folgen zeitlich aufeinander; der Verlauf soll sichtbar werden."),
                    ("Säulendiagramm",
                     "Wenige Kategorien werden direkt miteinander verglichen."),
                    ("XY-Punktdiagramm",
                     "Zu jedem Datensatz gibt es zwei Zahlen; gesucht ist, ob sie zusammenhängen."),
                    ("Kreisdiagramm",
                     "Die Teile ergeben zusammen ein Ganzes, also 100 %."),
                ],
            ), "begruendung", DIAGRAMMTYP_HILFE),
        ],
    )

KAPITEL = {
    "01-daten-und-formeln": kapitel_1,
    "02-bezuege": kapitel_2,
    "03-diagramme": kapitel_3,
    "04-wachstum": kapitel_4,
    "05-wenn": kapitel_5,
}

# Übungen, die in eine Lektion eingebettet sind statt in den Rückblick.
LEKTIONEN = {
    "02-bezuege/bezuege-vorhersagen.bitflow": lektion_2_1,
    "02-bezuege/sonderfaelle.bitflow": lektion_2_2,
    "03-diagramme/diagrammtyp.bitflow": lektion_3_1,
}


def main() -> None:
    for ordner, erzeuge in KAPITEL.items():
        ziel = BOOK / ordner / "uebung.bitflow"
        ziel.write_text(json.dumps(erzeuge(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"geschrieben: {ziel.relative_to(ROOT)}")
    # Die Grafiken zur Korrelation stehen auch als Bilder in Lektion 3.2.
    for name, zeichne in (("eis-sonnenbrand.svg", eis_svg), ("fahrraeder-unfaelle.svg", fahrrad_svg),
                          *DIAGRAMMTYPEN.items()):
        ziel = BOOK / "03-diagramme" / name
        ziel.write_text(zeichne() + "\n", encoding="utf-8")
        print(f"geschrieben: {ziel.relative_to(ROOT)}")
    for pfad, erzeuge in LEKTIONEN.items():
        ziel = BOOK / pfad
        ziel.write_text(json.dumps(erzeuge(), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"geschrieben: {ziel.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
