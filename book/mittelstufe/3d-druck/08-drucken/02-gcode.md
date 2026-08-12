---
title: G-Code
index: 2
---

# G-Code

Wenn der [Slicer](../07-slicing/01-slicer-software) (z. B. OrcaSlicer) dein 3D-Modell verarbeitet hat, erzeugt er eine **G-Code-Datei** (Dateiendung `.gcode`). Diese Datei enthält die genauen Anweisungen für den Drucker: wohin er den Druckkopf bewegen soll, wie schnell, bei welcher Temperatur und wie viel Filament er dabei extrudieren soll.

## Was ist G-Code?

G-Code ist eine **Maschinensprache**, die ursprünglich für CNC-Fräsen entwickelt wurde und heute auch von 3D-Druckern verwendet wird. Jede Zeile ist ein Befehl, der direkt vom Drucker ausgeführt wird.

Im Gegensatz zu OpenSCAD-Quelltext schreibt man G-Code **nicht selbst** – den erzeugt der Slicer automatisch. Es ist aber hilfreich zu verstehen, was darin steht.

## Aufbau einer G-Code-Datei

Eine typische G-Code-Datei hat drei Abschnitte:

### 1. Start-Code (Start G-Code)

Befehle, die **vor dem eigentlichen Druck** ausgeführt werden:
- Drucker aufheizen (Bett und Hotend)
- Achsen in die Ausgangsposition fahren (Homing)
- Düse reinigen (Purge-Linie drucken)

### 2. Druckbefehle

Der eigentliche Druckauftrag: tausende von Bewegungsbefehlen, die der Slicer aus dem 3D-Modell berechnet hat.

### 3. End-Code (End G-Code)

Befehle **nach dem Druck**:
- Heizung ausschalten
- Druckkopf in eine sichere Position fahren
- Lüfter ausschalten

## Wichtige G-Code-Befehle

Hier sind die **fünf wichtigsten Befehle**, die du kennen solltest:

| Befehl | Bedeutung | Beispiel |
| ------ | --------- | ------- |
| `G28` | Alle Achsen in die Ausgangsposition (Homing) | `G28` |
| `G0` | Schnelle Bewegung **ohne** Extrusion | `G0 X100 Y50` |
| `G1` | Langsame Bewegung **mit** Extrusion | `G1 X110 Y50 E1.5` |
| `M104` | Hotend-Temperatur setzen | `M104 S200` |
| `M140` | Bett-Temperatur setzen | `M140 S60` |

**Parameter in Bewegungsbefehlen:**

| Parameter | Bedeutung |
| --------- | --------- |
| `X`, `Y`, `Z` | Zielposition auf der jeweiligen Achse (in mm) |
| `E` | Menge Filament, die extrudiert wird (in mm) |
| `F` | Geschwindigkeit (Feed Rate) in mm/min |
| `S` | Sollwert (z. B. Temperatur in °C) |

---

## Beispiel: Start eines Drucks

So könnte der Anfang einer G-Code-Datei aussehen:

```gcode
; Start G-Code
M140 S60    ; Bett auf 60°C vorheizen
M104 S200   ; Hotend auf 200°C vorheizen
G28         ; Alle Achsen in Ausgangsposition
M190 S60    ; Warten, bis Bett 60°C erreicht hat
M109 S200   ; Warten, bis Hotend 200°C erreicht hat
; Druck beginnt...
```

## Kommentare in G-Code

Zeilen, die mit einem Semikolon (`;`) beginnen, sind **Kommentare** – der Drucker ignoriert sie. Slicer fügen automatisch viele Kommentare ein, damit man den Code verstehen kann:

```gcode
; Layer 5 of 120
G1 X45.3 Y80.1 E0.5 F2400  ; Außenwand
```

---

## Wie kommt der G-Code zum Drucker?

Es gibt zwei gängige Wege:

| Methode | Beschreibung |
| ------- | ------------ |
| **SD-Karte / USB-Stick** | G-Code-Datei auf Speicherkarte kopieren und am Drucker einlegen |
| **USB-Kabel** | Direktverbindung zum Computer, Slicer sendet G-Code direkt |

---

## Selbsttest

::::multievent

**1. Was ist G-Code?**

{r1{ein Modellierungsprogramm}}

{r1{!eine Maschinensprache aus Befehlen für den Drucker}}

{r1{ein Dateiformat für 3D-Modelle}}

{r1{die Software, die Schichten erzeugt}}

{h{Es steht drin, wohin sich der Druckkopf bewegen soll.}}
{H{Richtig.}}

**2. Welcher Befehl fährt alle Achsen in die Ausgangsstellung?**

{r2{G1}}

{r2{M104}}

{r2{!G28}}

{r2{G92}}

{h{Man nennt das homing.}}
{H{Richtig. Erst danach weiß der Drucker, wo er ist.}}

**3. Was steht in einer typischen G1-Zeile?**

{c1{!Zielkoordinaten}}

{c1{!wie viel Filament dabei gefördert wird}}

{c1{!die Geschwindigkeit}}

{c1{die Farbe des Objekts}}

{h{Drei Angaben betreffen die Bewegung, eine gibt es im G-Code gar nicht.}}
{H{Richtig.}}

**4. Warum ist eine G-Code-Datei so viel größer als die stl-Datei?**

{r3{Weil sie das Modell doppelt enthält.}}

{r3{!Weil für jede einzelne Bewegung jeder Schicht eine eigene Zeile darin steht.}}

{r3{Weil sie Bilder enthält.}}

{r3{Sie ist kleiner.}}

{h{Ein Druck besteht aus hunderten Schichten mit je hunderten Bewegungen.}}
{H{Richtig.}}

**5. Wie kommt der G-Code zum Drucker?**

{c1{!über eine Speicherkarte}}

{c1{!über eine Netzwerkverbindung}}

{c1{!über ein USB-Kabel}}

{c1{über den Slicer, der den Drucker direkt steuert, ohne Datei}}

{h{Drei Wege übertragen die fertige Datei – der vierte beschreibt etwas, das der Slicer nicht tut.}}
{H{Richtig.}}

::::
