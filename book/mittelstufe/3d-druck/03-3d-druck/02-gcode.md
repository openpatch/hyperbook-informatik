---
title: G-Code
index: 2
---

# G-Code

Wenn der [Slicer](../02-slicing/01-slicer-software.md) dein 3D-Modell verarbeitet hat, erzeugt er eine **G-Code-Datei** (Dateiendung `.gcode`). Diese Datei enthält die genauen Anweisungen für den Drucker: wohin er den Druckkopf bewegen soll, wie schnell, bei welcher Temperatur und wie viel Filament er dabei extrudieren soll.

## Was ist G-Code?

G-Code ist eine **Maschinensprache**, die ursprünglich für CNC-Fräsen entwickelt wurde und heute auch von 3D-Druckern verwendet wird. Jede Zeile ist ein Befehl, der direkt vom Drucker ausgeführt wird.

> 📸 **Screenshot-Hinweis:** Screenshot eines Texteditors mit einer G-Code-Datei einfügen. Einige Befehle farbig markieren und mit Pfeilen erklären.

Im Gegensatz zu OpenSCAD-Quelltext schreibt man G-Code **nicht selbst** – den erzeugt der Slicer automatisch. Es ist aber hilfreich zu verstehen, was darin steht.

---

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

---

## Wichtige G-Code-Befehle

| Befehl | Bedeutung | Beispiel |
| ------ | --------- | ------- |
| `G0` | Schnelle Bewegung ohne Extrusion | `G0 X100 Y50 F6000` |
| `G1` | Langsame Bewegung mit Extrusion | `G1 X110 Y50 E1.5 F3000` |
| `G28` | Alle Achsen in die Ausgangsposition (Homing) | `G28` |
| `G92` | Koordinaten zurücksetzen | `G92 E0` |
| `M104` | Hotend-Temperatur setzen (ohne zu warten) | `M104 S200` |
| `M109` | Hotend-Temperatur setzen und warten | `M109 S200` |
| `M140` | Bett-Temperatur setzen (ohne zu warten) | `M140 S60` |
| `M190` | Bett-Temperatur setzen und warten | `M190 S60` |
| `M106` | Lüfter einschalten | `M106 S255` |
| `M107` | Lüfter ausschalten | `M107` |

**Parameter in Bewegungsbefehlen:**

| Parameter | Bedeutung |
| --------- | --------- |
| `X`, `Y`, `Z` | Zielposition auf der jeweiligen Achse (in mm) |
| `E` | Menge Filament, die extrudiert wird (in mm) |
| `F` | Geschwindigkeit (Feed Rate) in mm/min |
| `S` | Sollwert (z. B. Temperatur in °C oder Lüfterdrehzahl 0–255) |

---

## Beispiel: Start eines Drucks

So könnte der Anfang einer G-Code-Datei aussehen:

```gcode
; === Start G-Code ===
M140 S60          ; Bett auf 60°C vorheizen (ohne zu warten)
M104 S200         ; Hotend auf 200°C vorheizen (ohne zu warten)
G28               ; Alle Achsen homen (in Ausgangsposition fahren)
M190 S60          ; Warten, bis Bett 60°C erreicht hat
M109 S200         ; Warten, bis Hotend 200°C erreicht hat

; === Düse reinigen ===
G92 E0            ; Extruder-Position auf 0 setzen
G1 X5 Y20 Z0.3 F5000  ; Druckkopf zur Startposition bewegen
G1 X5 Y200 E15 F1500  ; Purge-Linie drucken

; === Druck beginnt ===
G92 E0            ; Extruder erneut auf 0 setzen
```

> 📸 **Screenshot-Hinweis:** Screenshot des Slicer-Bereichs „Drucker-Einstellungen → Start-G-Code" einfügen und die einzelnen Bereiche erklären.

---

## Kommentare in G-Code

Zeilen, die mit einem Semikolon (`;`) beginnen, sind **Kommentare** – der Drucker ignoriert sie. Slicer fügen automatisch viele Kommentare ein, damit man den Code verstehen kann:

```gcode
; Layer 5 of 120
G1 X45.3 Y80.1 E0.5 F2400  ; Außenwand
```

---

## Wie kommt der G-Code zum Drucker?

> 📸 **Foto-Hinweis:** Foto mit drei Varianten einfügen: SD-Karte im Drucker, USB-Kabel, WLAN-Symbol/App.

Es gibt drei gängige Wege:

| Methode | Beschreibung |
| ------- | ------------ |
| **SD-Karte / USB-Stick** | G-Code-Datei auf Speicherkarte kopieren und am Drucker einlegen |
| **USB-Kabel** | Direktverbindung zum Computer, Slicer sendet G-Code direkt |
| **WLAN / Netzwerk** | Moderner Weg bei Druckern wie Bambu Lab oder über OctoPrint |

---

## Wissensüberprüfung

:::multievent
Was ist G-Code?

{r1{Ein 3D-Modellierungsprogramm.}} {r1{!Eine Maschinensprache mit Befehlen für den 3D-Drucker.}} {r1{Ein Dateiformat für 3D-Modelle.}} {r1{Die Software, die das Modell in Schichten zerlegt.}}
:::

:::multievent
Welcher Befehl fährt alle Achsen in die Ausgangsposition?

{r2{G1}} {r2{M104}} {r2{!G28}} {r2{G92}}
:::

:::multievent
Was bedeutet `M109 S210` in G-Code?

{r3{Fahre den Druckkopf auf Position 210.}} {r3{Setze die Lüfterdrehzahl auf 210.}} {r3{!Heize das Hotend auf 210 °C und warte, bis die Temperatur erreicht ist.}} {r3{Drucke 210 mm Filament.}}
:::

:::multievent
Wozu dienen Zeilen, die in G-Code mit `;` beginnen?

{r4{Sie starten den Druck.}} {r4{Sie setzen die Temperatur.}} {r4{!Sie sind Kommentare – der Drucker ignoriert sie.}} {r4{Sie legen die Druckgeschwindigkeit fest.}}
:::

:::multievent
Wer erzeugt normalerweise den G-Code für einen 3D-Druck?

{r5{Der Drucker selbst.}} {r5{Man tippt ihn per Hand ein.}} {r5{!Der Slicer berechnet ihn automatisch aus dem 3D-Modell.}} {r5{OpenSCAD exportiert ihn direkt.}}
:::
