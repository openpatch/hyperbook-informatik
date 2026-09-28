#!/usr/bin/env python3
"""Erzeugt reproduzierbare Calc-Dateien fuer die Screenshots des Lernpfads.

    python3 tools/tabellenkalkulation/erzeuge_screenshot_vorlagen.py

Die Dateien landen in /tmp/calc-lernpfad. Die Screenshots selbst nimmt
screenshots.py auf; es benutzt die Funktionen dieses Moduls.

Zahlen tragen deutsche Formate (Waehrung, Prozent, Datum). Damit sie auch mit
Komma erscheinen, muss LibreOffice mit deutschem Gebietsschema laufen – das
Profil dafuer legt ``profil_anlegen`` an.
"""

from datetime import date
from pathlib import Path
import shutil
import subprocess
import time
import uno
from com.sun.star.beans import PropertyValue
from com.sun.star.lang import Locale


OUT = Path("/tmp/calc-lernpfad")
PROFIL = Path("/tmp/lo-calc-de")
PORT = 2002
DEUTSCH = Locale("de", "DE", "")

# Deutsche Oberflaeche und deutsches Gebietsschema (Dezimalkomma), helle
# Darstellung, ohne Tipp des Tages, ohne "Was ist neu"-Leiste und ohne rote
# Kringel der automatischen Rechtschreibpruefung (sie markiert "Jan", "Feb" ...). Ein frisches Profil sorgt
# dafuer, dass keine Einstellungen vom eigenen Rechner in die Bilder geraten.
REGISTRY = """<?xml version="1.0" encoding="UTF-8"?>
<oor:items xmlns:oor="http://openoffice.org/2001/registry" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<item oor:path="/org.openoffice.Office.Linguistic/General"><prop oor:name="UILocale" oor:op="fuse"><value>de-DE</value></prop></item>
<item oor:path="/org.openoffice.Setup/L10N"><prop oor:name="ooLocale" oor:op="fuse"><value>de-DE</value></prop></item>
<item oor:path="/org.openoffice.Setup/L10N"><prop oor:name="ooSetupSystemLocale" oor:op="fuse"><value>de-DE</value></prop></item>
<item oor:path="/org.openoffice.Setup/Product"><prop oor:name="ooSetupLastVersion" oor:op="fuse"><value>99.0</value></prop></item>
<item oor:path="/org.openoffice.Office.Common/Misc"><prop oor:name="ShowTipOfTheDay" oor:op="fuse"><value>false</value></prop></item>
<item oor:path="/org.openoffice.Office.Common/Appearance"><prop oor:name="ApplicationAppearance" oor:op="fuse"><value>1</value></prop></item>
<item oor:path="/org.openoffice.Office.Linguistic/SpellChecking"><prop oor:name="IsSpellAuto" oor:op="fuse"><value>false</value></prop></item>
<item oor:path="/org.openoffice.Office.Common/Misc"><prop oor:name="FirstRun" oor:op="fuse"><value>false</value></prop></item>
</oor:items>
"""


def prop(name, value):
    p = PropertyValue()
    p.Name = name
    p.Value = value
    return p


def profil_anlegen():
    shutil.rmtree(PROFIL, ignore_errors=True)
    (PROFIL / "user").mkdir(parents=True)
    (PROFIL / "user" / "registrymodifications.xcu").write_text(REGISTRY, encoding="utf-8")


def connect(headless=True, umgebung=None):
    """Startet LibreOffice mit dem deutschen Profil und gibt (Prozess, Kontext) zurueck."""
    profil_anlegen()
    befehl = [
        "soffice", f"-env:UserInstallation={PROFIL.as_uri()}",
        f"--accept=socket,host=localhost,port={PORT};urp;",
        "--norestore", "--nodefault", "--nofirststartwizard", "--nologo",
    ]
    if headless:
        befehl.append("--headless")
    prozess = subprocess.Popen(befehl, env=umgebung)
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local
    )
    for _ in range(100):
        try:
            return prozess, resolver.resolve(
                f"uno:socket,host=localhost,port={PORT};urp;StarOffice.ComponentContext"
            )
        except Exception:
            time.sleep(0.2)
    prozess.kill()
    raise RuntimeError("LibreOffice konnte nicht gestartet werden")


def beenden(prozess, desk):
    """Beendet LibreOffice. Ohne das bleibt soffice haengen und blockiert den Aufrufer."""
    try:
        desk.terminate()
    except Exception:
        pass  # Die Verbindung bricht beim Beenden ab.
    try:
        prozess.wait(timeout=15)
    except subprocess.TimeoutExpired:
        prozess.kill()


def desktop(ctx):
    return ctx.ServiceManager.createInstanceWithContext(
        "com.sun.star.frame.Desktop", ctx
    )


def new_calc(desk):
    return desk.loadComponentFromURL("private:factory/scalc", "_blank", 0, ())


def save(doc, name):
    url = uno.systemPathToFileUrl(str((OUT / name).resolve()))
    doc.storeAsURL(url, (prop("FilterName", "calc8"),))
    doc.close(True)


def zahlenformat(doc, code):
    """Schluessel eines Zahlenformats; ``code`` in deutscher Schreibweise."""
    formate = doc.NumberFormats
    schluessel = formate.queryKey(code, DEUTSCH, False)
    if schluessel == -1:
        schluessel = formate.addNew(code, DEUTSCH)
    return schluessel


def formatieren(doc, sheet, area, code):
    sheet.getCellRangeByName(area).NumberFormat = zahlenformat(doc, code)


EURO = '#.##0,00 [$€-407];-#.##0,00 [$€-407]'
PROZENT = "0 %"
DATUM = "TT.MM.JJJJ"
ZWEI_STELLEN = "0,00"


def datum(jahr, monat, tag):
    return (date(jahr, monat, tag) - date(1899, 12, 30)).days


def style(sheet, area, *, bg=None, bold=False, size=None):
    cells = sheet.getCellRangeByName(area)
    if bg is not None:
        cells.CellBackColor = bg
    cells.CharWeight = 150 if bold else 100
    if size:
        cells.CharHeight = size
    cells.VertJustify = 2


def widths(sheet, values):
    for column, width in values.items():
        sheet.Columns.getByName(column).Width = width


def prepare_view(doc, sheet, selection, zoom=120):
    controller = doc.CurrentController
    controller.setActiveSheet(sheet)
    controller.select(sheet.getCellRangeByName(selection))
    controller.ZoomValue = zoom


def fill(sheet, rows):
    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = sheet.getCellByPosition(c, r)
            if isinstance(value, (int, float)):
                cell.Value = value
            elif value:
                cell.String = value


def make_zelle(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Reiseetat"
    fill(s, [
        ["Stadt", "Abfahrt", "Preis pro Person", "Rabatt"],
        ["Prag", datum(2027, 5, 15), 129.90, 0.10],
        ["Paris", datum(2027, 6, 3), 184.50, 0.08],
        ["Wien", datum(2027, 6, 21), 149.00, 0.12],
        ["Kopenhagen", datum(2027, 7, 8), 212.40, 0.05],
    ])
    formatieren(doc, s, "B2:B5", DATUM)
    formatieren(doc, s, "C2:C5", EURO)
    formatieren(doc, s, "D2:D5", PROZENT)
    style(s, "A1:D1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:D1").CharColor = 0xFFFFFF
    style(s, "C4", bg=0xFFF2CC, bold=True)
    widths(s, {"A": 3000, "B": 3000, "C": 4200, "D": 2600})
    prepare_view(doc, s, "C4")
    return doc


def make_bezuege(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Angebote"
    fill(s, [
        ["Angebot", "Preis (GBP)", "Preis (€)", "", "Wechselkurs", 1.16],
        ["London A", 82.00, None, "", "Rabatt", 0.08],
        ["London B", 95.00, None, "", "", ""],
        ["London C", 76.50, None, "", "", ""],
        ["London D", 109.00, None, "", "", ""],
    ])
    for r in range(1, 5):
        s.getCellByPosition(2, r).Formula = f"=B{r+1}*(1-$F$2)*$F$1"
    formatieren(doc, s, "B2:B5", ZWEI_STELLEN)
    formatieren(doc, s, "C2:C5", EURO)
    formatieren(doc, s, "F1", ZWEI_STELLEN)
    formatieren(doc, s, "F2", PROZENT)
    style(s, "A1:C1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:C1").CharColor = 0xFFFFFF
    style(s, "E1:F2", bg=0xD9EAF7)
    style(s, "F1:F2", bg=0xFFF2CC, bold=True)
    style(s, "C2", bg=0xE2F0D9, bold=True)
    widths(s, {"A": 3300, "B": 3200, "C": 3200, "D": 900, "E": 3400, "F": 2600})
    prepare_view(doc, s, "C2")
    return doc


def angebote(doc, s):
    """Das Blatt aus Lektion 2.1: Preise in GBP, Wechselkurs und Rabatt als Parameter."""
    s.Name = "Angebote"
    fill(s, [
        ["Angebot", "Preis (GBP)", "Preis (€)", "", "Wechselkurs", 1.16],
        ["London A", 82.00, None, "", "Rabatt", 0.08],
        ["London B", 95.00, None, "", "", ""],
        ["London C", 76.50, None, "", "", ""],
        ["London D", 109.00, None, "", "", ""],
    ])
    formatieren(doc, s, "B2:B5", ZWEI_STELLEN)
    formatieren(doc, s, "C2:C5", EURO)
    formatieren(doc, s, "F1", ZWEI_STELLEN)
    formatieren(doc, s, "F2", PROZENT)
    style(s, "A1:C1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:C1").CharColor = 0xFFFFFF
    style(s, "E1:F2", bg=0xD9EAF7)
    style(s, "F1:F2", bg=0xFFF2CC, bold=True)
    widths(s, {"A": 3300, "B": 3200, "C": 3200, "D": 900, "E": 3400, "F": 2600})


def make_ausfuellkaestchen(desk):
    """Lektion 2.1: C2 ausgewählt, stark vergrößert – das Ausfüllkästchen ist gut zu sehen."""
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    angebote(doc, s)
    s.getCellRangeByName("C2").Formula = "=B2*(1-$F$2)*$F$1"
    prepare_view(doc, s, "C2", zoom=220)
    return doc


def make_bezuege_fehler(desk):
    """Lektion 2.1: =B2*F1 nach unten kopiert – der Kurs wandert mit, C3 ist ausgewählt."""
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    angebote(doc, s)
    for r in range(2, 6):
        s.getCellRangeByName(f"C{r}").Formula = f"=B{r}*F{r - 1}"
    style(s, "C3:C5", bg=0xF8D7DA, bold=True)
    prepare_view(doc, s, "C3")
    return doc


def make_gemischt(desk):
    """Lektion 2.1: Umrechnungstabelle mit gemischten Bezügen, D5 ausgewählt."""
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Umrechnung"
    fill(s, [
        ["Euro", "PLN", "CZK", "CHF"],
        ["Kurs", 4.25, 24.50, 0.94],
        [10], [20], [50], [100], [200],
    ])
    for r in range(3, 8):
        for spalte in "BCD":
            s.getCellRangeByName(f"{spalte}{r}").Formula = f"=$A{r}*{spalte}$2"
    formatieren(doc, s, "B2:D2", ZWEI_STELLEN)
    formatieren(doc, s, "A3:A7", EURO)
    formatieren(doc, s, "B3:D7", ZWEI_STELLEN)
    style(s, "A1:D1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:D1").CharColor = 0xFFFFFF
    style(s, "A2:D2", bg=0xFFF2CC, bold=True)
    style(s, "A3:A7", bg=0xD9EAF7)
    widths(s, {"A": 3000, "B": 3000, "C": 3000, "D": 3000})
    prepare_view(doc, s, "D5")
    return doc


def make_formel_testen(desk):
    """Lektion 2.2: Hilfsspalten B bis E, die ganze Rechnung in F, Parameter in H."""
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Angebote"
    fill(s, [
        ["Preis", "nach Rabatt", "mit Versand", "mit Steuer", "in Euro", "alles in einer Formel", "", ""],
        [100, None, None, None, None, None, "Rabatt", 0.12],
        [80, None, None, None, None, None, "Versand", 8],
        ["", "", "", "", "", "", "Steuer", 0.20],
        ["", "", "", "", "", "", "Wechselkurs", 1.16],
    ])
    for r in (2, 3):
        s.getCellRangeByName(f"B{r}").Formula = f"=A{r}*(1-$H$2)"
        s.getCellRangeByName(f"C{r}").Formula = f"=B{r}+$H$3"
        s.getCellRangeByName(f"D{r}").Formula = f"=C{r}*(1+$H$4)"
        s.getCellRangeByName(f"E{r}").Formula = f"=D{r}*$H$5"
        s.getCellRangeByName(f"F{r}").Formula = f"=((A{r}*(1-$H$2)+$H$3)*(1+$H$4))*$H$5"
    formatieren(doc, s, "A2:F3", ZWEI_STELLEN)
    formatieren(doc, s, "H2", PROZENT)
    formatieren(doc, s, "H3", ZWEI_STELLEN)
    formatieren(doc, s, "H4", PROZENT)
    formatieren(doc, s, "H5", ZWEI_STELLEN)
    style(s, "A1:F1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:F1").CharColor = 0xFFFFFF
    style(s, "G2:H5", bg=0xD9EAF7)
    style(s, "H2:H5", bg=0xFFF2CC, bold=True)
    style(s, "F2:F3", bg=0xE2F0D9, bold=True)
    widths(s, {"A": 2200, "B": 2800, "C": 2800, "D": 2800, "E": 2600, "F": 4600, "G": 3000, "H": 2200})
    prepare_view(doc, s, "F2")
    return doc


def make_preisvergleich(desk):
    """Mini-Projekt 2.3: möglicher Aufbau mit den Werten der Beispiel-Lösung.

    Steuer in H2, Wechselkurs in H3 – genau wie die Formel im Buchtext.
    """
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Angebote"
    fill(s, [
        ["Angebot", "Listenpreis", "Währung", "Rabatt", "Zusatzkosten", "Endpreis (€)", "Parameter", "Wert"],
        ["A", 82, "GBP", 0.08, 7, None, "Steuer", 0.20],
        ["B", 95, "GBP", 0.12, 0, None, "Wechselkurs", 1.16],
        ["C", 76.5, "GBP", 0, 12],
        ["D", 88, "GBP", 0.05, 5],
        ["E", 91, "GBP", 0.10, 4],
        [],
        ["günstigstes"], ["teuerstes"],
    ])
    for r in range(2, 7):
        s.getCellRangeByName(f"F{r}").Formula = f"=((B{r}*(1-D{r}))+E{r})*(1+$H$2)*$H$3"
    s.getCellRangeByName("F8").Formula = "=MIN(F2:F6)"
    s.getCellRangeByName("F9").Formula = "=MAX(F2:F6)"
    formatieren(doc, s, "B2:B6", ZWEI_STELLEN)
    formatieren(doc, s, "D2:D6", PROZENT)
    formatieren(doc, s, "E2:E6", ZWEI_STELLEN)
    formatieren(doc, s, "F2:F9", EURO)
    formatieren(doc, s, "H2", PROZENT)
    formatieren(doc, s, "H3", ZWEI_STELLEN)
    style(s, "A1:H1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:H1").CharColor = 0xFFFFFF
    s.getCellRangeByName("C2:C6").HoriJustify = 2  # zentriert, damit „GBP“ nicht am Preis klebt
    style(s, "G2:H3", bg=0xD9EAF7)
    style(s, "H2:H3", bg=0xFFF2CC, bold=True)
    style(s, "A8:F9", bold=True)
    style(s, "F2", bg=0xE2F0D9, bold=True)
    widths(s, {"A": 3000, "B": 2800, "C": 2400, "D": 2200, "E": 2400, "F": 3400, "G": 3200, "H": 2200})
    prepare_view(doc, s, "F2")
    return doc


def make_diagramm(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Klima"
    fill(s, [
        ["Monat", "Temperatur (°C)"],
        ["Jan", 1.2], ["Feb", 2.1], ["Mär", 5.8], ["Apr", 10.4],
        ["Mai", 14.8], ["Jun", 18.1], ["Jul", 20.3], ["Aug", 20.0],
        ["Sep", 15.7], ["Okt", 10.8], ["Nov", 5.5], ["Dez", 2.3],
    ])
    style(s, "A1:B1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:B1").CharColor = 0xFFFFFF
    formatieren(doc, s, "B2:B13", "0,0")
    widths(s, {"A": 3000, "B": 4300})
    prepare_view(doc, s, "A1:B13")
    return doc


def fill_growth_sheet(doc, s):
    s.Name = "Prognose"
    headers = ["Monat", "linear (+20)", "exponentiell (+8 %)"]
    for c, value in enumerate(headers):
        s.getCellByPosition(c, 0).String = value
    for r in range(1, 14):
        s.getCellByPosition(0, r).Value = r - 1
    s.getCellByPosition(1, 1).Value = 100
    s.getCellByPosition(2, 1).Value = 100
    for r in range(2, 14):
        s.getCellByPosition(1, r).Formula = f"=B{r}+20"
        s.getCellByPosition(2, r).Formula = f"=C{r}*1.08"
    formatieren(doc, s, "C2:C14", ZWEI_STELLEN)
    style(s, "A1:C1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:C1").CharColor = 0xFFFFFF
    widths(s, {"A": 2200, "B": 3800, "C": 4700})


def make_growth(desk, chart=True):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    fill_growth_sheet(doc, s)
    if chart:
        charts = s.Charts
        rect = uno.createUnoStruct("com.sun.star.awt.Rectangle")
        rect.X, rect.Y, rect.Width, rect.Height = 12000, 800, 17000, 9000
        source = (s.getCellRangeByName("A1:C14").RangeAddress,)
        charts.addNewByName("Wachstumsvergleich", rect, source, True, True)
        embedded = charts.getByName("Wachstumsvergleich").EmbeddedObject
        embedded.Diagram = embedded.createInstance(
            "com.sun.star.chart.LineDiagram"
        )
        embedded.HasLegend = True
        embedded.HasMainTitle = True
        embedded.Title.String = "Linear oder exponentiell?"
        embedded.HasSubTitle = True
        embedded.SubTitle.String = "Startwert 100"
    prepare_view(doc, s, "A1")
    return doc


VORLAGEN = {
    "zelle.ods": make_zelle,
    "ausfuellkaestchen.ods": make_ausfuellkaestchen,
    "bezuege-fehler.ods": make_bezuege_fehler,
    "gemischt.ods": make_gemischt,
    "formel-testen.ods": make_formel_testen,
    "preisvergleich.ods": make_preisvergleich,
    "bezuege.ods": make_bezuege,
    "diagramm.ods": make_diagramm,
    "wachstum.ods": make_growth,
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    prozess, ctx = connect()
    desk = desktop(ctx)
    try:
        for name, erzeuge in VORLAGEN.items():
            save(erzeuge(desk), name)
    finally:
        beenden(prozess, desk)
    print(OUT)


if __name__ == "__main__":
    main()
