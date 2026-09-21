#!/usr/bin/env python3
"""Erzeugt reproduzierbare Calc-Dateien fuer die Screenshots des Lernpfads."""

from pathlib import Path
import subprocess
import time
import uno
from com.sun.star.beans import PropertyValue


OUT = Path("/tmp/calc-lernpfad")


def prop(name, value):
    p = PropertyValue()
    p.Name = name
    p.Value = value
    return p


def connect():
    subprocess.Popen([
        "soffice", "-env:UserInstallation=file:///tmp/lo-calc-template", "--headless",
        "--accept=socket,host=localhost,port=2002;urp;",
        "--norestore", "--nodefault", "--nofirststartwizard",
    ])
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local
    )
    for _ in range(30):
        try:
            return resolver.resolve(
                "uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext"
            )
        except Exception:
            time.sleep(0.2)
    raise RuntimeError("LibreOffice konnte nicht gestartet werden")


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


def prepare_view(doc, sheet, selection):
    controller = doc.CurrentController
    controller.setActiveSheet(sheet)
    controller.select(sheet.getCellRangeByName(selection))
    controller.ZoomValue = 120


def make_zelle(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Reiseziele"
    rows = [
        ["Stadt", "Abfahrt", "Preis pro Person", "Rabatt"],
        ["Prag", "15.05.2027", 129.90, 0.10],
        ["Paris", "03.06.2027", 184.50, 0.08],
        ["Wien", "21.06.2027", 149.00, 0.12],
        ["Kopenhagen", "08.07.2027", 212.40, 0.05],
    ]
    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = s.getCellByPosition(c, r)
            if isinstance(value, (int, float)):
                cell.Value = value
            else:
                cell.String = value
    style(s, "A1:D1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:D1").CharColor = 0xFFFFFF
    style(s, "C4", bg=0xFFF2CC, bold=True)
    widths(s, {"A": 3000, "B": 3000, "C": 4200, "D": 2600})
    prepare_view(doc, s, "C4")
    save(doc, "zelle.ods")


def make_bezuege(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Preisvergleich"
    rows = [
        ["Angebot", "Preis (GBP)", "Preis (€)", "", "Wechselkurs", 1.16],
        ["London A", 82.00, None, "", "Rabatt", 0.08],
        ["London B", 95.00, None, "", "", ""],
        ["London C", 76.50, None, "", "", ""],
        ["London D", 109.00, None, "", "", ""],
    ]
    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = s.getCellByPosition(c, r)
            if isinstance(value, (int, float)):
                cell.Value = value
            elif value is not None:
                cell.String = value
    for r in range(1, 5):
        s.getCellByPosition(2, r).Formula = f"=B{r+1}*(1-$F$2)*$F$1"
    style(s, "A1:C1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:C1").CharColor = 0xFFFFFF
    style(s, "E1:F2", bg=0xD9EAF7)
    style(s, "F1:F2", bg=0xFFF2CC, bold=True)
    style(s, "C2", bg=0xE2F0D9, bold=True)
    widths(s, {"A": 3300, "B": 3200, "C": 3200, "D": 900, "E": 3400, "F": 2600})
    prepare_view(doc, s, "C2")
    save(doc, "bezuege.ods")


def make_diagramm(desk):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    s.Name = "Temperatur"
    rows = [
        ["Monat", "Temperatur (°C)"],
        ["Jan", 1.2], ["Feb", 2.1], ["Mär", 5.8], ["Apr", 10.4],
        ["Mai", 14.8], ["Jun", 18.1], ["Jul", 20.3], ["Aug", 20.0],
        ["Sep", 15.7], ["Okt", 10.8], ["Nov", 5.5], ["Dez", 2.3],
    ]
    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = s.getCellByPosition(c, r)
            if isinstance(value, (int, float)):
                cell.Value = value
            else:
                cell.String = value
    style(s, "A1:B1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:B1").CharColor = 0xFFFFFF
    s.getCellRangeByName("B2:B13").NumberFormat = 2
    widths(s, {"A": 3000, "B": 4300})
    prepare_view(doc, s, "A1:B13")
    save(doc, "diagramm.ods")


def fill_growth_sheet(s):
    s.Name = "Wachstum"
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
    s.getCellRangeByName("C2:C14").NumberFormat = 2
    style(s, "A1:C1", bg=0x2F5597, bold=True)
    s.getCellRangeByName("A1:C1").CharColor = 0xFFFFFF
    widths(s, {"A": 2200, "B": 3800, "C": 4700})


def make_growth(desk, name, chart):
    doc = new_calc(desk)
    s = doc.Sheets.getByIndex(0)
    fill_growth_sheet(s)
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
    save(doc, name)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ctx = connect()
    desk = desktop(ctx)
    make_zelle(desk)
    make_bezuege(desk)
    make_diagramm(desk)
    make_growth(desk, "wachstum.ods", True)
    print(OUT)


if __name__ == "__main__":
    main()
