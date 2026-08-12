---
title: Grundeinstellungen
index: 2
---

# Grundeinstellungen

Damit dein Modell gut gedruckt wird, musst du im Slicer einige Einstellungen anpassen. Hier lernst du die **vier wichtigsten** kennen, die du für fast jeden Druck brauchst.

---

## 1. Schichthöhe (Layer Height)

Die Schichthöhe gibt an, wie dick jede Schicht deines Modells ist. Sie bestimmt mit, wie **glatt** die Oberfläche wird und wie **lange** der Druck dauert.

| Schichthöhe | Oberfläche | Druckzeit | Empfehlung |
| ----------- | ---------- | --------- | ----------- |
| 0,1 mm | Sehr glatt, fast keine sichtbaren Schichten | Langsam (2–3× länger) | Für besondere Modelle mit feinen Details |
| 0,2 mm | Glatt, leichte Schichten sichtbar | Mittel | **Standard für die meisten Drucke** |
| 0,3 mm | Schichten gut sichtbar | Schnell | Für große Objekte oder schnelle Tests |

:::alert{info}
Die Schichthöhe sollte nicht dicker als **0,3 mm** sein (bei Standard-Düsen mit 0,4 mm).
:::

Für eine ausführliche Erklärung kannst du diesen Artikel lesen: https://help.prusa3d.com/de/article/schichten-und-konturen_1748

## 2. Fülldichte (Infill)

Der Infill bestimmt, wie viel Material **im Inneren** deines Modells gedruckt wird. Ein höherer Infill macht das Objekt stabiler, verbraucht aber mehr Material und Zeit.

| Infill | Verwendung | Beispiel |
| ------ | ---------- | -------- |
| 10–15 % | Leichte, dekorative Objekte | Vase, Schlüsselanhänger |
| 20–25 % | **Standard für die meisten Modelle** | Handyhalter, Gehäuse |
| 50–100 % | Sehr stabile, belastbare Teile | Werkzeughalter, Ersatzteile |

**Infill-Muster:**
Die meisten Slicer bieten verschiedene Muster an. Für den Anfang reicht:
- **Gitter (Grid)** – schnell und einfach, gut für die meisten Objekte
- **Wabenstruktur (Honeycomb)** – sehr stabil, gut für belastbare Teile

Für eine ausführliche Erklärung kannst du diesen Artikel lesen: https://help.prusa3d.com/de/article/infill_42

## 3. Drucktemperatur

Damit das Filament schmilzt und gut haftet, müssen zwei Dinge geheizt werden:

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

| Geschwindigkeit | Qualität | Empfehlung |
| --------------- | -------- | ---------- |
| 30–50 mm/s | Sehr gute Qualität, feine Details | Für kleine, detailreiche Modelle |
| **60–120 mm/s** | **Gute Qualität, Standard** | **Für die meisten Drucke ideal** |
| 150–200 mm/s | Schnell, aber weniger präzise | Für große, einfache Objekte mit CoreXY-Druckern |

:::alert{warn}
Zu hohe Geschwindigkeiten können zu Qualitätsproblemen führen: unscharfe Kanten oder fehlende Schichten. CoreXY-Drucker ermöglichen aber höhere Geschwindigkeiten als ältere Modelle.

:::

## Ausprobieren

:::snippet{#aufgabe}
1. Lade eine STL-Datei herunter z.B. von einem vorherigen OpenSCAD Project.
2. Öffne die Datei im Online-Slicer Kiri (File->Import).
3. Wähle die Grundeinstellungen aus, die du gelernt hast (Schichthöhe, Infill, Temperatur, Geschwindigkeit)
4. Klicke auf Slice und warte, bis der Slicer fertig ist.
5. Klicke auf Preview/Vorschau und überprüfe den Einfluss deiner Einstellungen auf das Modell.
:::

::embed{src="https://grid.space/kiri" width="100%" height="600px"}

---

## Selbsttest

::::multievent

**1. Du willst ein sehr glattes, detailreiches Modell drucken. Welche Schichthöhe wählst du?**

{r1{0,3 mm}}

{r1{0,2 mm}}

{r1{!0,1 mm}}

{r1{0,5 mm}}

{h{Dünnere Schichten bedeuten feinere Stufen an schrägen Flächen.}}
{H{Richtig – der Preis ist die doppelte bis dreifache Druckzeit.}}

**2. Für welches Objekt genügt eine Fülldichte von 10 bis 15 Prozent?**

{r2{eine Halterung für einen Fahrradlenker}}

{r2{!eine dekorative Vase}}

{r2{ein Schraubverbinder}}

{r2{ein Haken, der täglich belastet wird}}

{h{Frag dich, welches Teil Kräfte aushalten muss.}}
{H{Richtig. Bei tragenden Teilen nimmt man deutlich mehr.}}

**3. Was passiert, wenn die Drucktemperatur zu niedrig ist?**

{r3{Das Filament wird zu flüssig und verläuft.}}

{r3{!Die Schichten haften schlecht aneinander, das Teil bricht leicht.}}

{r3{Der Druck wird schneller.}}

{r3{Nichts.}}

{h{Zum Verbinden zweier Schichten muss die untere kurz anschmelzen.}}
{H{Richtig – zu hohe Temperatur führt umgekehrt zu Fäden und unsauberen Kanten.}}

**4. Welche Einstellung beeinflusst die Druckzeit am stärksten?**

{r4{die Farbe}}

{r4{!die Schichthöhe}}

{r4{der Dateiname}}

{r4{die Anzahl der Perimeter allein}}

{h{Halbe Schichthöhe bedeutet doppelt so viele Schichten.}}
{H{Richtig.}}

::::
