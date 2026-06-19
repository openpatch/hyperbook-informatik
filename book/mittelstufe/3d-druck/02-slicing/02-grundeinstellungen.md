---
title: Grundeinstellungen
index: 2
---

# Grundeinstellungen

Die wichtigsten Einstellungen im Slicer bestimmen, wie gut, wie schnell und wie stabil dein Modell gedruckt wird. Hier lernst du die sechs wichtigsten kennen.

---

## 1. Schichthöhe (Layer Height)

Die Schichthöhe gibt an, wie dick jede einzelne Druckschicht ist. Sie beeinflusst direkt die **Druckqualität** und die **Druckzeit**.

> 📸 **Screenshot-Hinweis:** Zwei Vergleichsfotos einfügen: dasselbe Objekt einmal mit 0,1 mm (glatt) und einmal mit 0,3 mm (sichtbare Schichten) gedruckt.

| Schichthöhe | Qualität | Druckzeit |
| ----------- | -------- | --------- |
| 0,1 mm | ✨ Sehr fein, glatte Oberfläche | 🐢 Lang |
| 0,2 mm | ✅ Gut (Standard) | ⚖️ Mittel |
| 0,3 mm | 🔨 Grober, Schichten sichtbar | 🐇 Schnell |

:::alert{info}
Die Schichthöhe sollte maximal **75 % des Düsendurchmessers** betragen. Bei einer Standard-Düse (0,4 mm) sind also maximal 0,3 mm sinnvoll.
:::

---

## 2. Fülldichte (Infill)

Der Infill beschreibt, wie viel Material ins **Innere** des Modells gedruckt wird – also wie hohl oder massiv es ist.

> 📸 **Screenshot-Hinweis:** Slicer-Screenshot mit Layer-Ansicht einfügen, auf der das Infill-Muster (z. B. Gitter) sichtbar ist. Gerne mehrere Muster nebeneinander.

| Infill | Verwendung |
| ------ | ---------- |
| 5–15 % | Dekorationsobjekte, die keine Kräfte aushalten müssen |
| 15–25 % | Standard für die meisten Objekte |
| 40–60 % | Technische Teile, die belastet werden |
| 80–100 % | Maximale Festigkeit (selten nötig) |

**Infill-Muster** beeinflussen Stabilität und Druckzeit:

- **Gitter (Grid)** – schnell, gut für Standardteile
- **Gyroid** – sehr gleichmäßige Festigkeit in alle Richtungen
- **Wabenstruktur (Honeycomb)** – gut für leichte, stabile Teile
- **Konzentrisch (Concentric)** – gut für flexible Materialien

---

## 3. Druckgeschwindigkeit (Print Speed)

Die Druckgeschwindigkeit gibt an, wie schnell der Druckkopf sich bewegt (in mm/s).

> 📸 **Screenshot-Hinweis:** Geschwindigkeitseinstellungen im Slicer-Panel als Screenshot einfügen.

| Geschwindigkeit | Empfehlung |
| --------------- | ---------- |
| 20–40 mm/s | Sehr hohe Qualität, für feine Details |
| 40–80 mm/s | Standard für die meisten FDM-Drucker |
| 80–200+ mm/s | Moderne Drucker (z. B. Bambu Lab, Voron) mit CoreXY |

:::alert{warn}
Zu hohe Geschwindigkeit bei älteren Druckern führt zu Qualitätsverlust: unscharfe Kanten, Schichtversatz oder fehlende Schichten.
:::

---

## 4. Drucktemperatur

FDM-Drucker haben zwei Heizelemente mit eigener Temperatur:

> 📸 **Screenshot-Hinweis:** Temperatureinstellungen im Slicer als Screenshot einfügen, Hotend und Druckbett markiert.

### Hotend (Düse)

Schmilzt das Filament. Die richtige Temperatur hängt vom Material ab:

| Material | Hotend-Temperatur |
| -------- | ----------------- |
| PLA | 190–220 °C |
| PETG | 230–250 °C |
| ABS | 230–260 °C |
| TPU | 220–240 °C |

### Druckbett (Heatbed)

Hält die erste Schicht am Bett und verhindert Verzug:

| Material | Betttemperatur |
| -------- | -------------- |
| PLA | 50–65 °C |
| PETG | 70–85 °C |
| ABS | 90–110 °C |

---

## 5. Wandanzahl (Walls / Perimeters)

Die Wandanzahl gibt an, wie viele Außenhüllen das Objekt bekommt, bevor das Infill gedruckt wird.

| Wände | Empfehlung |
| ----- | ---------- |
| 2 | Dekorationsobjekte |
| 3 | Standard |
| 4–5 | Technische Teile, Gewinde, Verbindungsstücke |

---

## 6. Kühlung (Cooling)

Der Lüfter am Druckkopf kühlt das frisch gedruckte Material schnell ab. Das ist wichtig für:

- **Überhänge** – Material hängt ohne Kühlung durch
- **Brücken (Bridges)** – Querstücke über freiem Raum gelingen nur mit Kühlung
- **Detailgenauigkeit** – scharfe Kanten und feine Details

:::alert{info}
**Ausnahme:** Bei ABS-Druck den Lüfter ausschalten oder sehr niedrig stellen, da ABS sonst Risse bekommt (Warping).
:::

---

## Wissensüberprüfung

:::multievent
Du möchtest ein sehr glattes, detailreiches Modell drucken. Welche Schichthöhe wählst du?

{r1{0,3 mm}} {r1{0,2 mm}} {r1{!0,1 mm}} {r1{0,5 mm}}
:::

:::multievent
Für welches Objekt ist ein Infill von 5 % ausreichend?

{r2{Eine Halterung für einen Fahrradlenker.}} {r2{!Eine dekorative Vase.}} {r2{Ein Schraubenverbinder.}} {r2{Ein Schlüsselhalter, der täglich benutzt wird.}}
:::

:::multievent
Warum wird das Druckbett beim FDM-Druck geheizt?

{r3{Um das Filament zu schmelzen.}} {r3{Um den Druckkopf zu kühlen.}} {r3{!Damit die erste Schicht haftet und das Modell sich nicht vom Bett löst.}} {r3{Um die Druckgeschwindigkeit zu erhöhen.}}
:::

:::multievent
Was passiert bei zu hoher Druckgeschwindigkeit?

{r4{Das Modell wird stabiler.}} {r4{!Die Qualität sinkt: unscharfe Kanten, Versatz oder fehlende Schichten.}} {r4{Die Schichthöhe erhöht sich automatisch.}} {r4{Nichts – Geschwindigkeit hat keinen Einfluss auf Qualität.}}
:::

:::multievent
Welches Material braucht die höchste Druckbett-Temperatur?

{r5{PLA}} {r5{PETG}} {r5{!ABS}} {r5{TPU}}
:::
