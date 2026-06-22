---
title: Grundeinstellungen
index: 2
---

# Grundeinstellungen

Damit dein Modell gut gedruckt wird, musst du im Slicer einige Einstellungen anpassen. Hier lernst du die **vier wichtigsten** kennen, die du für fast jeden Druck brauchst.

---

## 1. Schichthöhe (Layer Height)

Die Schichthöhe gibt an, wie dick jede Schicht deines Modells ist. Sie bestimmt mit, wie **glatt** die Oberfläche wird und wie **lange** der Druck dauert.

> 📸 **Screenshot-Hinweis:** Zwei Vergleichsfotos einfügen: dasselbe Objekt einmal mit 0,1 mm (glatt) und einmal mit 0,3 mm (sichtbare Schichten) gedruckt.

| Schichthöhe | Oberfläche | Druckzeit | Empfehlung |
| ----------- | ---------- | --------- | ----------- |
| 0,1 mm | Sehr glatt, fast keine sichtbaren Schichten | Langsam (2–3× länger) | Für besondere Modelle mit feinen Details |
| 0,2 mm | Glatt, leichte Schichten sichtbar | Mittel | **Standard für die meisten Drucke** |
| 0,3 mm | Schichten gut sichtbar | Schnell | Für große Objekte oder schnelle Tests |

:::alert{info}
Die Schichthöhe sollte nicht dicker als **0,3 mm** sein (bei Standard-Düsen mit 0,4 mm).
:::

---

## 2. Fülldichte (Infill)

Der Infill bestimmt, wie viel Material **im Inneren** deines Modells gedruckt wird. Ein höherer Infill macht das Objekt stabiler, verbraucht aber mehr Material und Zeit.

> 📸 **Screenshot-Hinweis:** OrcaSlicer-Screenshot mit Layer-Ansicht einfügen, auf der das Infill-Muster (z. B. Gitter) sichtbar ist.

| Infill | Verwendung | Beispiel |
| ------ | ---------- | -------- |
| 10–15 % | Leichte, dekorative Objekte | Vase, Schlüsselanhänger |
| 20–25 % | **Standard für die meisten Modelle** | Handyhalter, Gehäuse |
| 50–100 % | Sehr stabile, belastbare Teile | Werkzeughalter, Ersatzteile |

**Infill-Muster:**
Die meisten Slicer bieten verschiedene Muster an. Für den Anfang reicht:
- **Gitter (Grid)** – schnell und einfach, gut für die meisten Objekte
- **Wabenstruktur (Honeycomb)** – sehr stabil, gut für belastbare Teile

---

## 3. Drucktemperatur

Damit das Filament schmilzt und gut haftet, müssen zwei Dinge geheizt werden:

> 📸 **Screenshot-Hinweis:** Temperatureinstellungen in OrcaSlicer als Screenshot einfügen, Hotend und Druckbett markiert.

### Hotend (Düse)
Hier wird das Filament geschmolzen:

| Material | Temperatur |
| -------- | ---------- |
| **PLA** | 190–210 °C |
| **PETG** | 230–240 °C |

### Druckbett (Heatbed)
Das beheizte Bett hält die erste Schicht fest:

| Material | Betttemperatur |
| -------- | -------------- |
| **PLA** | 50–60 °C |
| **PETG** | 70–80 °C |

:::alert{info}
Die richtige Temperatur hängt vom Filament-Hersteller ab. Die Angaben auf der Verpackung beachten!
:::

---

## 4. Druckgeschwindigkeit (Print Speed)

Die Druckgeschwindigkeit gibt an, wie schnell der Druckkopf sich bewegt (in mm/s). CoreXY-Drucker (wie Prusa Core One+ oder Voron) können sehr schnell drucken.

> 📸 **Screenshot-Hinweis:** Geschwindigkeitseinstellung in OrcaSlicer als Screenshot einfügen.

| Geschwindigkeit | Qualität | Empfehlung |
| --------------- | -------- | ---------- |
| 30–50 mm/s | Sehr gute Qualität, feine Details | Für kleine, detailreiche Modelle |
| **60–120 mm/s** | **Gute Qualität, Standard** | **Für die meisten Drucke ideal** |
| 150–200 mm/s | Schnell, aber weniger präzise | Für große, einfache Objekte mit CoreXY-Druckern |

:::alert{warn}
Zu hohe Geschwindigkeiten könnnen zu Qualitätsproblemen führen: unscharfe Kanten oder fehlende Schichten. CoreXY-Drucker ermöglichen aber höhere Geschwindigkeiten als ältere Modelle.

:::

---

## Wissensüberprüfung

:::multievent
Du möchtest ein sehr glattes, detailreiches Modell drucken. Welche Schichthöhe wählst du?

{r1{0,3 mm}} 

{r1{0,2 mm}} 

{r1{!0,1 mm}} 

{r1{0,5 mm}}

Für welches Objekt ist ein Infill von 10–15 % ausreichend?

{r2{Eine Halterung für einen Fahrradlenker.}} 

{r2{!Eine dekorative Vase.}} 

{r2{Ein Schraubenverbinder.}} 

{r2{Ein Schlüsselhalter, der täglich benutzt wird.}}

Warum wird das Druckbett beim FDM-Druck geheizt?

{r3{Um das Filament zu schmelzen.}} 

{r3{Um den Druckkopf zu kühlen.}} 

{r3{!Damit die erste Schicht haftet und das Modell sich nicht vom Bett löst.}} 

{r3{Um die Druckgeschwindigkeit zu erhöhen.}}

Was passiert bei zu hoher Druckgeschwindigkeit?

{r4{Das Modell wird stabiler.}} 

{r4{!Die Qualität sinkt: unscharfe Kanten, Versatz oder fehlende Schichten.}} 

{r4{Die Schichthöhe erhöht sich automatisch.}} 

{r4{Nichts – Geschwindigkeit hat keinen Einfluss auf Qualität.}}

Welche Temperatur braucht das Hotend für PLA-Filament?

{r5{150–170 °C}} 

{r5{230–250 °C}} 

{r5{!190–210 °C}} 

{r5{260–280 °C}}
:::
