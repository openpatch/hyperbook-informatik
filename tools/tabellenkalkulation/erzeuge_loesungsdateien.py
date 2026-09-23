#!/usr/bin/env python3
"""Erzeugt die Calc-Loesungsdateien und die Beispieldatei des Lernpfads Tabellenkalkulation."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any

from odf.opendocument import OpenDocumentSpreadsheet
from odf.number import (
    CurrencyStyle,
    CurrencySymbol,
    DateStyle,
    Day,
    Month,
    Number,
    PercentageStyle,
    Text,
    Year,
)
from odf.style import Style, TableCellProperties, TextProperties
from odf.table import Table, TableCell, TableColumn, TableRow
from odf.text import P


ROOT = Path(__file__).resolve().parents[2]
BOOK = ROOT / "book/mittelstufe/tabellenkalkulation"


@dataclass(frozen=True)
class Formel:
    ausdruck: str
    wert: float | str


@dataclass(frozen=True)
class Waehrung:
    wert: Any


@dataclass(frozen=True)
class Prozent:
    wert: Any


@dataclass(frozen=True)
class Datum:
    wert: date


def zelle(wert: Any, stil: str | None = None) -> TableCell:
    if isinstance(wert, Waehrung):
        stil = "Waehrung"
        wert = wert.wert
    elif isinstance(wert, Prozent):
        stil = "Prozent"
        wert = wert.wert
    elif isinstance(wert, Datum):
        attrs = {
            "valuetype": "date",
            "datevalue": wert.wert.isoformat(),
            "stylename": "Datum",
        }
        cell = TableCell(**attrs)
        cell.addElement(P(text=wert.wert.strftime("%d.%m.%Y")))
        return cell
    attrs: dict[str, Any] = {}
    if stil:
        attrs["stylename"] = stil
    if isinstance(wert, Formel):
        attrs["formula"] = f"of:={wert.ausdruck}"
        if isinstance(wert.wert, str):
            attrs.update(valuetype="string", stringvalue=wert.wert)
        else:
            attrs.update(valuetype="float", value=wert.wert)
        cell = TableCell(**attrs)
        cell.addElement(P(text=str(wert.wert)))
        return cell
    if isinstance(wert, (int, float)):
        attrs.update(valuetype="float", value=float(wert))
        cell = TableCell(**attrs)
        cell.addElement(P(text=str(wert).replace(".", ",")))
        return cell
    cell = TableCell(valuetype="string", **attrs)
    cell.addElement(P(text="" if wert is None else str(wert)))
    return cell


def erzeuge(
    pfad: Path,
    titel: str,
    zeilen: list[list[Any]],
    hinweise: list[str] = [],
    tabellenname: str = "Lösung",
) -> None:
    doc = OpenDocumentSpreadsheet()
    kopf = Style(name="Kopf", family="table-cell")
    kopf.addElement(TableCellProperties(backgroundcolor="#2f5597", padding="0.08in"))
    kopf.addElement(TextProperties(color="#ffffff", fontweight="bold"))
    doc.automaticstyles.addElement(kopf)
    titelstil = Style(name="Titel", family="table-cell")
    titelstil.addElement(TableCellProperties(backgroundcolor="#d9eaf7", padding="0.1in"))
    titelstil.addElement(TextProperties(fontweight="bold", fontsize="15pt"))
    doc.automaticstyles.addElement(titelstil)
    hinweisstil = Style(name="Hinweis", family="table-cell")
    hinweisstil.addElement(TableCellProperties(backgroundcolor="#fff2cc", padding="0.08in"))
    doc.automaticstyles.addElement(hinweisstil)

    euroformat = CurrencyStyle(name="Euroformat")
    euroformat.addElement(Number(decimalplaces=2, minintegerdigits=1, grouping=True))
    euroformat.addElement(Text(text=" "))
    euroformat.addElement(CurrencySymbol(language="de", country="DE", text="€"))
    doc.automaticstyles.addElement(euroformat)
    waehrungsstil = Style(
        name="Waehrung", family="table-cell", datastylename="Euroformat"
    )
    doc.automaticstyles.addElement(waehrungsstil)

    prozentformat = PercentageStyle(name="Prozentformat")
    prozentformat.addElement(Number(decimalplaces=0, minintegerdigits=1))
    prozentformat.addElement(Text(text=" %"))
    doc.automaticstyles.addElement(prozentformat)
    prozentstil = Style(
        name="Prozent", family="table-cell", datastylename="Prozentformat"
    )
    doc.automaticstyles.addElement(prozentstil)

    datumformat = DateStyle(name="Datumformat")
    datumformat.addElement(Day(style="long"))
    datumformat.addElement(Text(text="."))
    datumformat.addElement(Month(style="long"))
    datumformat.addElement(Text(text="."))
    datumformat.addElement(Year(style="long"))
    doc.automaticstyles.addElement(datumformat)
    datumstil = Style(name="Datum", family="table-cell", datastylename="Datumformat")
    doc.automaticstyles.addElement(datumstil)

    table = Table(name=tabellenname)
    for _ in range(max(8, max((len(r) for r in zeilen), default=1))):
        table.addElement(TableColumn(stylename=None))
    for index, values in enumerate(zeilen):
        row = TableRow()
        for value in values:
            row.addElement(zelle(value, "Kopf" if index == 0 else None))
        table.addElement(row)
    doc.spreadsheet.addElement(table)

    # Die Datentabelle beginnt absichtlich immer in A1. Formeln in den
    # Vorlagen dürfen dadurch dieselben Zelladressen verwenden wie im
    # zugehörigen Lösungstext. Titel und Erläuterungen stehen auf einem
    # separaten Blatt und verschieben keine Bezüge.
    info = Table(name="Hinweise")
    info.addElement(TableColumn())
    title_row = TableRow()
    title_row.addElement(zelle(titel, "Titel"))
    info.addElement(title_row)
    for text in hinweise or ["Diese Datei gehört zur Musterlösung im Lernpfad Tabellenkalkulation."]:
        row = TableRow()
        row.addElement(zelle(text, "Hinweis"))
        info.addElement(row)
    doc.spreadsheet.addElement(info)
    pfad.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(pfad), addsuffix=False)


def ziel(ordner: str, passwort: str) -> Path:
    return BOOK / ordner / f"loesung-{passwort}.ods"


def erzeuge_beispieldatei_klassenfahrt() -> None:
    """Erzeugt eine Beispiel-Arbeitsmappe fuer Kapitel 2.

    Die Datei zeigt den Stand nach Kapitel 1 (Reiseetat als Rechengeruest)
    und ersetzt die eigene Klassenfahrt.ods, falls in Kapitel 1 keine
    eigene Datei entstanden ist.
    """
    erzeuge(
        BOOK / "02-bezuege" / "beispiel-klassenfahrt.ods",
        "Beispiel-Arbeitsmappe Klassenfahrt",
        [
            ["Position", "Abrechnung", "Anzahl", "Einzelpreis", "Gesamt"],
            ["Busmiete", "fix", 1, 1800, Formel("[.C2]*[.D2]", 1800)],
            ["Unterkunft", "pro Person", 25, 96, Formel("[.C3]*[.D3]", 2400)],
            ["Nahverkehr", "pro Person", 25, 18, Formel("[.C4]*[.D4]", 450)],
            ["Museum", "pro Person", 25, 14, Formel("[.C5]*[.D5]", 350)],
            ["Stadtführung", "fix", 1, 220, Formel("[.C6]*[.D6]", 220)],
            ["Verpflegung", "pro Person", 25, 42, Formel("[.C7]*[.D7]", 1050)],
            ["Gesamtkosten", "", "", "", Formel("SUM([.E2:.E7])", 6270)],
            ["Kosten pro Person", "", 25, "", Formel("[.E8]/[.C9]", 250.8)],
            [],
            ["Ziel", "Prag"],
            ["Zeitraum", Datum(date(2027, 5, 12)), "bis", Datum(date(2027, 5, 16))],
        ],
        [
            "Diese Datei ersetzt deine eigene Klassenfahrt.ods, falls du in Kapitel 1 keine erstellt hast.",
            "Speichere sie unter dem Namen Klassenfahrt.ods und füge in Kapitel 2 das Tabellenblatt Angebote hinzu.",
            "Die Preise sind Beispielwerte; ersetze sie bei Bedarf durch selbst recherchierte Preise inklusive Quelle.",
        ],
        tabellenname="Reiseetat",
    )


def erzeuge_rueckblick_1() -> None:
    ordner = BOOK / "01-daten-und-formeln"
    erzeuge(
        ordner / "aufgabe-calc-1-4-1.ods",
        "Fehlerhafte Eingaben untersuchen",
        [
            ["Teilnehmende", "Preis pro Person", "Gesamt"],
            ["24 Personen", "18 €", Formel("24*18", 432)],
            [],
            ["Angebot", "Preis"],
            ["Bus", 12],
            ["Museum", 18],
            ["Stadtführung", 25],
            ["Minimum", Formel("MIN([.B5:.B7])", 12)],
            ["Maximum", Formel("MAX([.B5:.B7])", 25)],
            ["Mittelwert", Formel("AVERAGE([.B2:.C7])", 121.75)],
        ],
        [
            "Die Datei enthält absichtlich mehrere Modellierungs- und Eingabefehler.",
            "Verbessere sie so, dass geänderte Eingaben automatisch weitergerechnet werden.",
        ],
        tabellenname="Fehlerhafte Tabelle",
    )

    erzeuge(
        ziel("01-daten-und-formeln", "calc-1-4-1"),
        "Fehlerhafte Eingaben verbessern",
        [
            ["Teilnehmende", "Preis pro Person", "Gesamt"],
            [24, Waehrung(18), Waehrung(Formel("[.A2]*[.B2]", 432))],
            [],
            ["Angebot", "Preis"],
            ["Bus", Waehrung(12)],
            ["Museum", Waehrung(18)],
            ["Stadtführung", Waehrung(25)],
            ["Minimum", Waehrung(Formel("MIN([.B5:.B7])", 12))],
            ["Maximum", Waehrung(Formel("MAX([.B5:.B7])", 25))],
            ["Mittelwert", Waehrung(Formel("AVERAGE([.B5:.B7])", 55 / 3))],
        ],
        [
            "Werte und Einheiten sind getrennt; Geldbeträge besitzen ein Währungsformat.",
            "Gesamt und Kennzahlen werden mit Zellbezügen aus den Eingaben berechnet.",
        ],
    )


def main() -> None:
    erzeuge(ziel("01-daten-und-formeln", "calc-1-1-1"), "Datentypen und Formate", [
        ["Stadt", "Abfahrt", "Preis pro Person", "Rabatt"],
        ["Prag", Datum(date(2027, 5, 15)), Waehrung(129.90), Prozent(0.10)],
        ["Paris", Datum(date(2027, 6, 3)), Waehrung(184.50), Prozent(0.08)],
        ["Wien", Datum(date(2027, 6, 21)), Waehrung(149.00), Prozent(0.12)],
    ], ["Spalte B ist als Datum, C als Währung und D als Prozent formatiert.", "Der Wert 129,90 bleibt beim Wechsel des Zahlenformats unverändert."])

    erzeuge(ziel("01-daten-und-formeln", "calc-1-2-1"), "Funktionen für Reisepreise", [
        ["Stadt", "Preis", "Kennzahl", "Ergebnis"],
        ["Prag", 129.9, "Minimum", Formel("MIN([.B2:.B7])", 119.0)],
        ["Paris", 184.5, "Maximum", Formel("MAX([.B2:.B7])", 212.4)],
        ["Wien", 149.0, "Mittelwert", Formel("AVERAGE([.B2:.B7])", 158.55)],
        ["Kopenhagen", 212.4, "Summe", Formel("SUM([.B2:.B7])", 951.3)],
        ["Brüssel", 156.5, "", ""], ["Ljubljana", 119.0, "", ""],
    ], ["Die Kennzahlen müssen zwischen Minimum und Maximum plausibel sein."])

    erzeuge(ziel("01-daten-und-formeln", "calc-1-3-1"), "Mini-Projekt: Reiseetat", [
        ["Position", "Abrechnung", "Anzahl", "Einzelpreis", "Gesamt"],
        ["Busmiete", "fix", 1, 1800, Formel("[.C2]*[.D2]", 1800)],
        ["Unterkunft", "pro Person", 25, 96, Formel("[.C3]*[.D3]", 2400)],
        ["Nahverkehr", "pro Person", 25, 18, Formel("[.C4]*[.D4]", 450)],
        ["Museum", "pro Person", 25, 14, Formel("[.C5]*[.D5]", 350)],
        ["Stadtführung", "fix", 1, 220, Formel("[.C6]*[.D6]", 220)],
        ["Verpflegung", "pro Person", 25, 42, Formel("[.C7]*[.D7]", 1050)],
        ["Gesamtkosten", "", "", "", Formel("SUM([.E2:.E7])", 6270)],
        ["Kosten pro Person", "", 25, "", Formel("[.E8]/[.C9]", 250.8)],
    ], ["Ändere die Teilnehmerzahl bei allen personenbezogenen Positionen und prüfe die Neuberechnung."])

    erzeuge_rueckblick_1()
    erzeuge_beispieldatei_klassenfahrt()

    erzeuge(ziel("02-bezuege", "calc-2-1-1"), "Relative, absolute und gemischte Bezüge", [
        ["Ausgang in C2", "Kopie nach D4", "Was bleibt fest?"],
        ["=B2", "=C4", "nichts"], ["=$B$2", "=$B$2", "Spalte und Zeile"],
        ["=$B2", "=$B4", "Spalte B"], ["=B$2", "=C$2", "Zeile 2"],
    ])

    erzeuge(ziel("02-bezuege", "calc-2-1-2"), "Wechselkurs und Rabatt als Parameter", [
        ["Angebot", "Preis", "Endpreis", "", "Parameter", "Wert"],
        ["A", 82, Formel("[.B2]*(1-[.$F$3])*[.$F$2]", 87.5104), "", "Wechselkurs", 1.16],
        ["B", 95, Formel("[.B3]*(1-[.$F$3])*[.$F$2]", 101.384), "", "Rabatt", 0.08],
        ["C", 76.5, Formel("[.B4]*(1-[.$F$3])*[.$F$2]", 81.6408), "", "", ""],
    ], ["Beim Kopieren wandert nur der Preisbezug; F2 und F3 bleiben absolut."])

    erzeuge(ziel("02-bezuege", "calc-2-2-1"), "Komplexe Formel schrittweise testen", [
        ["Preis", "Rabatt", "Versand", "Steuer", "Kurs", "Endpreis"],
        [100, 0.12, 8, 0.20, 1.16, Formel("(([.A2]*(1-[.$B$2])+[.$C$2])*(1+[.$D$2]))*[.$E$2]", 133.632)],
        [0, 0.12, 8, 0.20, 1.16, Formel("(([.A3]*(1-[.$B$2])+[.$C$2])*(1+[.$D$2]))*[.$E$2]", 11.136)],
    ], ["Die zweite Zeile isoliert Versand, Steuer und Wechselkurs als Sonderfall Preis = 0."])

    erzeuge(ziel("02-bezuege", "calc-2-3-1"), "Mini-Projekt: Preisvergleich", [
        ["Angebot", "Listenpreis", "Währung", "Rabatt", "Versand", "Endpreis (€)", "Parameter", "Wert"],
        ["A", 82, "GBP", 0.08, 7, Waehrung(Formel("(([.B2]*(1-[.D2]))+[.E2])*(1+[.$H$2])*[.$H$3]", 114.75648)), "Steuer", 0.20],
        ["B", 95, "GBP", 0.12, 0, Waehrung(Formel("(([.B3]*(1-[.D3]))+[.E3])*(1+[.$H$2])*[.$H$3]", 116.3712)), "Wechselkurs", 1.16],
        ["C", 76.5, "GBP", 0, 12, Waehrung(Formel("(([.B4]*(1-[.D4]))+[.E4])*(1+[.$H$2])*[.$H$3]", 123.192)), "", ""],
        ["D", 88, "GBP", 0.05, 5, Waehrung(Formel("(([.B5]*(1-[.D5]))+[.E5])*(1+[.$H$2])*[.$H$3]", 123.3312)), "", ""],
        ["E", 91, "GBP", 0.10, 4, Waehrung(Formel("(([.B6]*(1-[.D6]))+[.E6])*(1+[.$H$2])*[.$H$3]", 119.568)), "", ""],
        ["Minimum", "", "", "", "", Waehrung(Formel("MIN([.F2:.F6])", 114.75648))],
        ["Maximum", "", "", "", "", Waehrung(Formel("MAX([.F2:.F6])", 123.3312))],
    ], ["Alle Angebote verwenden GBP. Bei mehreren Ausgangswährungen braucht jede Währung einen eigenen Wechselkurs."])

    erzeuge(ziel("02-bezuege", "calc-2-4-1"), "Bezüge nach dem Kopieren", [
        ["Ausgangszelle", "Ausgangsformel", "Zielzelle", "Zielformel", "Bewertung"],
        ["D4", "=B4*(1-$H$2)+$H3", "F7", "=D7*(1-$H$2)+$H6", "$H3 ist für globalen Versand nicht ausreichend"],
        ["Verbesserung", "=B4*(1-$H$2)+$H$3", "F7", "=D7*(1-$H$2)+$H$3", "Versand bleibt vollständig fest"],
    ])

    climate = [["Monat", "Berlin °C", "Lissabon °C"]] + [[m, b, l] for m, b, l in zip(
        ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        [1, 2, 6, 11, 16, 19, 21, 20, 16, 11, 6, 2],
        [12, 13, 15, 17, 19, 22, 24, 24, 23, 19, 15, 12])]
    erzeuge(ziel("03-diagramme", "calc-3-1-1"), "Liniendiagramm vorbereiten", climate,
            ["Markiere A1:C13 und füge ein Liniendiagramm ein. X-Achse: Monat; Y-Achse: Temperatur in °C."])
    erzeuge(ziel("03-diagramme", "calc-3-2-1"), "Korrelation verantwortungsvoll deuten", [
        ["Stadt", "Fahrräder (Tsd.)", "Unfälle absolut", "Einwohner (Tsd.)", "Unfälle je 100 000 Einwohner"],
        ["A", 80, 320, 500, Formel("[.C2]/[.D2]*100", 64)],
        ["B", 150, 510, 900, Formel("[.C3]/[.D3]*100", 56.67)],
        ["C", 230, 650, 1300, Formel("[.C4]/[.D4]*100", 50)],
    ], ["Absolute Zahlen allein belegen nicht, dass Fahrräder Unfälle verursachen. Bezugsgrößen verändern den Vergleich."])
    erzeuge(ziel("03-diagramme", "calc-3-3-1"), "Mini-Projekt: Klimavergleich", climate + [
        ["Mittelwert", Formel("AVERAGE([.B2:.B13])", 11.75), Formel("AVERAGE([.C2:.C13])", 17.83)],
        ["Minimum", Formel("MIN([.B2:.B13])", 1), Formel("MIN([.C2:.C13])", 12)],
        ["Maximum", Formel("MAX([.B2:.B13])", 21), Formel("MAX([.C2:.C13])", 24)],
    ], ["Ergänze dokumentierte Niederschlagsdaten auf einem zweiten Tabellenblatt und erstelle zwei getrennte Diagramme."])
    erzeuge(ziel("03-diagramme", "calc-3-4-1"), "Fairer Niederschlagsvergleich", [
        ["Stadt", "Jahresniederschlag (mm)", "Faire Darstellung"],
        ["London", 615, "schlichte Säule; Achse beginnt bei 0"],
        ["Madrid", 455, "gleiche Skala; Quelle und Jahr nennen"],
        ["Differenz", Formel("[.B2]-[.B3]", 160), "Monatswerte nötig, um Verteilung zu beurteilen"],
    ])

    growth = [["Monat", "linear", "exponentiell", "quadratisch n²", "", "Parameter", "Wert"]]
    growth.append([0, 100, 100, 0, "", "linearer Zuwachs", 20])
    growth.append([1, Formel("[.B2]+[.$G$2]", 120), Formel("[.C2]*(1+[.$G$3])", 108), Formel("[.A3]^2", 1), "", "Wachstumsrate", 0.08])
    for n in range(2, 25):
        row = n + 2
        previous = row - 1
        growth.append([
            n,
            Formel(f"[.B{previous}]+[.$G$2]", 100 + 20*n),
            Formel(f"[.C{previous}]*(1+[.$G$3])", round(100 * 1.08**n, 4)),
            Formel(f"[.A{row}]^2", n*n),
        ])
    erzeuge(ziel("04-wachstum", "calc-4-1-1"), "Wachstumsmodelle vergleichen", growth,
            ["Linear: konstante erste Differenz. Exponentiell: konstanter Faktor. Quadratisch: konstante zweite Differenz."])
    scenarios = [["Jahr", "1 %", "2 %", "3 %", "", "Parameter", "Wert"]]
    scenarios.append([0, Formel("[.$G$2]", 100000), Formel("[.$G$2]", 100000), Formel("[.$G$2]", 100000), "", "Startwert", 100000])
    scenarios.append([1, Formel("[.B2]*(1+[.$G$3])", 101000), Formel("[.C2]*(1+[.$G$4])", 102000), Formel("[.D2]*(1+[.$G$5])", 103000), "", "Rate günstig", 0.01])
    for n in range(2, 51):
        row = n + 2
        previous = row - 1
        extras: list[Any] = []
        if n == 2:
            extras = ["", "Rate mittel", 0.02]
        elif n == 3:
            extras = ["", "Rate ungünstig", 0.03]
        scenarios.append([
            n,
            Formel(f"[.B{previous}]*(1+[.$G$3])", round(100000*1.01**n)),
            Formel(f"[.C{previous}]*(1+[.$G$4])", round(100000*1.02**n)),
            Formel(f"[.D{previous}]*(1+[.$G$5])", round(100000*1.03**n)),
            *extras,
        ])
    erzeuge(ziel("04-wachstum", "calc-4-2-1"), "Drei Wachstumsszenarien", scenarios,
            ["Wenn Startwert, Rate und exponentielles Modell gelten, ergeben sich diese Szenarien – keine sicheren Vorhersagen."])
    erzeuge(ziel("04-wachstum", "calc-4-3-1"), "Mini-Projekt: Blick in die Glaskugel", scenarios,
            ["Bewerte Datenquelle, Parameter, Bezüge, Sonderfall Rate = 0 %, Diagramm, Wenn-dann-Aussage und Modellgrenzen."])
    compare = [["Jahr", "Modell A: linear", "Modell B: exponentiell", "", "Parameter", "Wert"]]
    compare.append([0, 500, 500, "", "Zuwachs A", 50])
    compare.append([1, Formel("[.B2]+[.$F$2]", 550), Formel("[.C2]*(1+[.$F$3])", 540), "", "Rate B", 0.08])
    for n in range(2, 21):
        row = n + 2
        previous = row - 1
        compare.append([
            n,
            Formel(f"[.B{previous}]+[.$F$2]", 500 + 50*n),
            Formel(f"[.C{previous}]*(1+[.$F$3])", round(500*1.08**n, 2)),
        ])
    erzeuge(ziel("04-wachstum", "calc-4-4-1"), "Linear und exponentiell", compare,
            ["A liegt nach einem Jahr vorn; langfristig überholt B. Die Aussage gilt nur bei konstanten Regeln."])

    erzeuge(ziel("05-wenn", "calc-5-1-1"), "WENN mit einer Budgetgrenze", [
        ["Angebot", "Preis", "Budget", "Bewertung"],
        ["A", 148, 150, Formel('IF([.B2]<=[.$C$2];"im Budget";"zu teuer")', "im Budget")],
        ["B", 150, 150, Formel('IF([.B3]<=[.$C$2];"im Budget";"zu teuer")', "im Budget")],
        ["C", 151, 150, Formel('IF([.B4]<=[.$C$2];"im Budget";"zu teuer")', "zu teuer")],
    ], ["Grenztest: unter, genau auf und über 150 €."])
    erzeuge(ziel("05-wenn", "calc-5-2-1"), "UND und ODER", [
        ["A", "B", "UND", "ODER"],
        ["wahr", "wahr", "wahr", "wahr"], ["wahr", "falsch", "falsch", "wahr"],
        ["falsch", "wahr", "falsch", "wahr"], ["falsch", "falsch", "falsch", "falsch"],
    ])
    erzeuge(ziel("05-wenn", "calc-5-2-2"), "Drei Preisbereiche", [
        ["Preis", "Bewertung"],
        [99, Formel('IF([.A2]<100;"günstig";IF([.A2]<=150;"mittel";"teuer"))', "günstig")],
        [100, Formel('IF([.A3]<100;"günstig";IF([.A3]<=150;"mittel";"teuer"))', "mittel")],
        [150, Formel('IF([.A4]<100;"günstig";IF([.A4]<=150;"mittel";"teuer"))', "mittel")],
        [151, Formel('IF([.A5]<100;"günstig";IF([.A5]<=150;"mittel";"teuer"))', "teuer")],
    ])
    erzeuge(ziel("05-wenn", "calc-5-3-1"), "Mini-Projekt: Reiseampel", [
        ["Ziel", "Preis", "Fahrtdauer", "CO₂", "Kriterien erfüllt", "Ampel"],
        ["Prag", 145, 6, 42, 3, Formel('IF([.B2]>180;"Rot";IF([.E2]=3;"Grün";IF([.E2]=2;"Gelb";"Rot")))', "Grün")],
        ["Paris", 175, 5, 68, 2, Formel('IF([.B3]>180;"Rot";IF([.E3]=3;"Grün";IF([.E3]=2;"Gelb";"Rot")))', "Gelb")],
        ["Athen", 230, 4, 180, 1, Formel('IF([.B4]>180;"Rot";IF([.E4]=3;"Grün";IF([.E4]=2;"Gelb";"Rot")))', "Rot")],
    ], ["Die Ampelwörter bleiben zusätzlich zur Farbe lesbar. Kriterien und Grenzen müssen dokumentiert werden."])
    erzeuge(ziel("05-wenn", "calc-5-4-1"), "Rabattregel prüfen", [
        ["Alter", "Schülerkarte", "Ausgabe"],
        [16, "ja", Formel('IF(AND([.A2]<=17;[.B2]="ja");"Rabatt";"Normalpreis")', "Rabatt")],
        [17, "ja", Formel('IF(AND([.A3]<=17;[.B3]="ja");"Rabatt";"Normalpreis")', "Rabatt")],
        [18, "ja", Formel('IF(AND([.A4]<=17;[.B4]="ja");"Rabatt";"Normalpreis")', "Normalpreis")],
        [17, "nein", Formel('IF(AND([.A5]<=17;[.B5]="ja");"Rabatt";"Normalpreis")', "Normalpreis")],
        [17, "", Formel('IF(AND([.A6]<=17;[.B6]="ja");"Rabatt";"Normalpreis")', "Normalpreis")],
    ], ["Das Modell kann nicht prüfen, ob die Karte echt und gültig ist."])

    print("22 Calc-Lösungsdateien und eine Beispieldatei erzeugt.")


if __name__ == "__main__":
    main()
