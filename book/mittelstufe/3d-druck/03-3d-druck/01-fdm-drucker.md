---
title: FDM-Drucker
index: 1
---

# FDM-Drucker

Der gebräuchlichste 3D-Drucker für Schulen, Maker-Spaces und Zuhause ist der **FDM-Drucker** (Fused Deposition Modeling – auf Deutsch: Schmelzschichtung).

## Wie funktioniert FDM?

Beim FDM-Verfahren wird ein Kunststofffaden (**Filament**) durch eine beheizte Düse (**Hotend**) gedrückt und dabei aufgeschmolzen. Der Druckkopf fährt die berechneten Bahnen ab und trägt das geschmolzene Material Schicht für Schicht auf. Jede neue Schicht verbindet sich mit der darunter liegenden, während das Material abkühlt und sich verfestigt.

> 📸 **Screenshot-Hinweis:** Schemazeichnung oder Foto eines FDM-Druckers mit beschrifteten Teilen einfügen: Druckkopf/Hotend, Filament-Rolle, Extruder, Druckbett, Rahmen, Z-Achse.

**Wichtige Bauteile:**

| Bauteil | Funktion |
| ------- | -------- |
| **Extruder** | Zieht das Filament von der Rolle und drückt es ins Hotend |
| **Hotend** | Heizt das Filament und drückt es durch die Düse |
| **Düse (Nozzle)** | Öffnung, durch die das Filament austritt (Standard: 0,4 mm) |
| **Druckbett** | Fläche, auf der das Modell aufgebaut wird |
| **Heizbett** | Beheiztes Druckbett für bessere Haftung |
| **Stepper-Motoren** | Bewegen Druckkopf und Bett präzise |

---

## Bauformen: Bedslinger vs. CoreXY

Es gibt zwei weit verbreitete Konstruktionsprinzipien für FDM-Drucker, die sich in der Bewegungsführung unterscheiden.

### Bedslinger

> 📸 **Foto-Hinweis:** Foto eines typischen Bedslinger-Druckers einfügen (z. B. Prusa i3 MK4, Creality Ender 3). Achsen mit Pfeilen beschriften: X = Druckkopf links/rechts, Y = Bett vor/zurück, Z = Druckkopf hoch/runter.

**Bewegungsprinzip:**
- **X-Achse:** Druckkopf bewegt sich links ↔ rechts
- **Y-Achse:** Druckbett bewegt sich vor ↔ zurück
- **Z-Achse:** Druckkopf bewegt sich hoch/runter (oder das Bett)

**Bekannte Modelle:** Prusa i3 MK4, Creality Ender 3, Anycubic Kobra

**Vorteile:**
- Einfache und bewährte Konstruktion
- Günstiger in der Herstellung → niedrigerer Preis
- Leicht zu warten und zu reparieren

**Nachteile:**
- Das Bett bewegt sich mit dem Modell mit → bei hohen Geschwindigkeiten kann das Modell „wackeln"
- Schlechtere Druckqualität bei sehr schnellen Drucken
- Maximale Druckgröße wird durch die Bettbewegung limitiert

---

### CoreXY

> 📸 **Foto-Hinweis:** Foto eines CoreXY-Druckers einfügen (z. B. Bambu Lab X1C, Voron 2.4). Riemensystem von oben zeigen und erklären.

**Bewegungsprinzip:**
- **X- und Y-Achse:** Druckkopf bewegt sich in beide Richtungen – gesteuert durch **zwei Motoren gleichzeitig** über ein Riemensystem
- **Z-Achse:** Nur das Druckbett bewegt sich nach unten

Das CoreXY-Riemensystem ist so aufgebaut, dass Motor A und Motor B zusammenarbeiten:
- Beide Motoren vorwärts → Druckkopf nach vorne
- Motor A vorwärts, Motor B rückwärts → Druckkopf nach rechts

> 📸 **Grafik-Hinweis:** Schematische Zeichnung des CoreXY-Riemensystems einfügen, die zeigt, wie die beiden Riemen verlegt sind.

**Bekannte Modelle:** Bambu Lab A1/X1/P1, Voron, Prusa XL, Creality K1

**Vorteile:**
- Druckkopf ist leichter (kein schweres Bett bewegt sich)
- Sehr hohe Geschwindigkeiten möglich (100–500+ mm/s)
- Bessere Druckqualität bei hohen Geschwindigkeiten
- Präzisere Bewegungen durch geringere Massenträgheit

**Nachteile:**
- Komplexeres Riemensystem → aufwendiger zu warten
- In der Regel teurer als Bedslinger
- Kalibrierung etwas anspruchsvoller

---

## Vergleich auf einen Blick

| Eigenschaft | Bedslinger | CoreXY |
| ----------- | ---------- | ------ |
| Preis | 💰 Günstiger | 💰💰 Teurer |
| Druckgeschwindigkeit | 🐢 40–80 mm/s | 🐇 100–500+ mm/s |
| Druckqualität (schnell) | ⚖️ Mittel | ✅ Gut |
| Wartung | ✅ Einfach | ⚠️ Aufwendiger |
| Typische Modelle | Ender 3, Prusa i3 | Bambu Lab, Voron |

---

## Wissensüberprüfung

:::multievent
Was bedeutet FDM?

{r1{Fast Digital Manufacturing}} {r1{!Fused Deposition Modeling}} {r1{Filament Direct Movement}} {r1{Fixed Design Modeling}}
:::

:::multievent
Welches Bauteil schmilzt das Filament und drückt es durch die Düse?

{r2{Extruder}} {r2{Heizbett}} {r2{!Hotend}} {r2{Stepper-Motor}}
:::

:::multievent
Wie bewegt sich das Druckbett bei einem Bedslinger?

{r3{Hoch und runter (Z-Achse)}} {r3{Links und rechts (X-Achse)}} {r3{!Vor und zurück (Y-Achse)}} {r3{Das Bett bewegt sich gar nicht.}}
:::

:::multievent
Was ist ein Vorteil von CoreXY gegenüber dem Bedslinger?

{r4{CoreXY ist immer günstiger.}} {r4{Das Bett bewegt sich auch bei CoreXY mit.}} {r4{!CoreXY erreicht höhere Druckgeschwindigkeiten mit besserer Qualität.}} {r4{CoreXY ist einfacher zu warten.}}
:::

:::multievent
Warum können Bedslinger bei hohen Geschwindigkeiten schlechtere Qualität liefern?

{r5{Weil das Hotend zu schnell heizt.}} {r5{!Weil das schwere Druckbett mitbewegt wird und bei hohen Geschwindigkeiten wackelt.}} {r5{Weil das Filament zu schnell abkühlt.}} {r5{Weil die Düse zu klein ist.}}
:::
