---
title: Slicer-Software
index: 1
---

# Slicer-Software

Nachdem du dein 3D-Modell in OpenSCAD erstellt hast, kann der Drucker es noch nicht direkt verwenden. Du brauchst ein Zwischenprogramm: den **Slicer**.

## Was macht ein Slicer?

Ein Slicer (von englisch *to slice* = schneiden) übernimmt drei Aufgaben:

1. **Zerlegen** – Das 3D-Modell wird in viele dünne horizontale Schichten (Lagen) geschnitten.
2. **Berechnen** – Für jede Schicht berechnet der Slicer den genauen Weg, den der Druckkopf fahren soll.
3. **Übersetzen** – Das Ergebnis wird als **G-Code**-Datei gespeichert, die der Drucker versteht.

> 📸 **Screenshot-Hinweis:** Screenshot eines Slicers (z. B. PrusaSlicer) mit geöffnetem Modell und sichtbaren Schichten (Layer-Ansicht) einfügen.

## Bekannte Slicer-Programme

| Slicer | Hersteller | Besonderheit |
| -------- | ---------- | ------------ |
| **Cura** | Ultimaker | Kostenlos, sehr weit verbreitet, viele Einstellungen |
| **PrusaSlicer** | Prusa Research | Kostenlos, Open Source, gute Voreinstellungen |
| **OrcaSlicer** | Community | Kostenlos, sehr aktiv entwickelt, schnelle Druckprofile |
| **Bambu Studio** | Bambu Lab | Für Bambu-Drucker optimiert, einfache Bedienung |

Für dieses Hyperbook verwenden wir **PrusaSlicer** oder **OrcaSlicer**, da beide kostenlos und für alle gängigen Drucker geeignet sind.

## Die wichtigsten Bereiche im Slicer

> 📸 **Screenshot-Hinweis:** Annotierten Screenshot des Slicers mit markierten Bereichen einfügen: 3D-Vorschau, Einstellungs-Panel, Schichten-Schieberegler, Slice-Button.

Ein typischer Slicer besteht aus folgenden Bereichen:

- **3D-Vorschau** – Hier siehst du dein Modell und kannst es ausrichten, skalieren und drehen.
- **Einstellungs-Panel** – Hier stellst du alle Druckparameter ein (Schichthöhe, Infill, Temperatur …).
- **Schichten-Ansicht** – Nach dem Slicen kannst du Schicht für Schicht durch das Modell scrollen und den Druckweg sehen.
- **Slice-Button** – Startet die Berechnung. Danach siehst du Druckzeit und Filamentverbrauch.

## Ablauf: vom Modell zum Druck

```
OpenSCAD  →  STL exportieren  →  Slicer  →  G-Code  →  SD-Karte / USB / WLAN  →  Drucker
```

Was genau in einer G-Code-Datei steht und wie der Drucker damit umgeht, erfährst du in [G-Code](../../03-3d-druck/02-gcode.md).

:::multievent
Was ist die Aufgabe eines Slicers?

{r1{Das 3D-Modell direkt drucken.}} {r1{!Das 3D-Modell in druckerverständlichen G-Code umwandeln.}} {r1{Das 3D-Modell in OpenSCAD öffnen.}} {r1{Das Filament schmelzen.}}
:::

:::multievent
In welchem Dateiformat exportiert man ein Modell aus OpenSCAD, um es in den Slicer zu laden?

{r2{.scad}} {r2{.png}} {r2{!.stl}} {r2{.gcode}}
:::
