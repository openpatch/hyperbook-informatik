---
title: FDM-Drucker
index: 1
permaid: fdm-drucker
---

# FDM-Drucker

Der gebräuchlichste 3D-Drucker in Schulen ist der **FDM-Drucker** (Fused Deposition Modeling, auf Deutsch: Schmelzschichtung).

## Wie funktioniert FDM?

Beim FDM-Verfahren wird ein Kunststofffaden (**Filament**) durch eine beheizte Düse (**Hotend**) gedrückt und dabei aufgeschmolzen. Der Druckkopf fährt die berechneten Bahnen ab und trägt das geschmolzene Material Schicht für Schicht auf. Jede neue Schicht verbindet sich mit der darunter liegenden, während das Material abkühlt und sich verfestigt.

> 📸 **Screenshot-Hinweis:** Schemazeichnung oder Foto eines FDM-Druckers mit beschrifteten Teilen einfügen: Druckkopf/Hotend, Filament-Rolle, Extruder, Druckbett, Rahmen.

**Wichtige Bauteile:**

| Bauteil | Funktion |
| ------- | -------- |
| **Extruder** | Zieht das Filament von der Rolle und drückt es ins Hotend |
| **Hotend** | Heizt das Filament und drückt es durch die Düse |
| **Düse (Nozzle)** | Öffnung, durch die das Filament austritt (Standard: 0,4 mm) |
| **Druckbett** | Fläche, auf der das Modell aufgebaut wird |
| **Heizbett** | Beheiztes Druckbett für bessere Haftung |

---

## Bauformen: CoreXY

In vielen Schulen werden **CoreXY-Drucker** verwendet, z. B. Prusa Core One+ oder Voron. Bei dieser Bauform bewegt sich nur der Druckkopf, das Druckbett bleibt fest. Das ermöglicht präzise und schnelle Drucke.

> 📸 **Foto-Hinweis:** Foto eines CoreXY-Druckers einfügen (z. B. Prusa Core One+ oder Voron). Riemensystem von oben zeigen.

**Bewegungsprinzip:**
- **X- und Y-Achse:** Der Druckkopf bewegt sich in beide Richtungen – gesteuert durch **zwei Motoren gleichzeitig** über ein Riemensystem
- **Z-Achse:** Nur das Druckbett bewegt sich nach unten

Das CoreXY-Riemensystem funktioniert so:
- Beide Motoren vorwärts → Druckkopf bewegt sich **nach vorne**
- Motor A vorwärts, Motor B rückwärts → Druckkopf bewegt sich **nach rechts**

> 📸 **Grafik-Hinweis:** Schematische Zeichnung des CoreXY-Riemensystems einfügen.

**Vorteile von CoreXY:**
- Druckkopf ist leichter (kein schweres Bett bewegt sich)
- Sehr hohe Druckgeschwindigkeiten (100–500+ mm/s)
- Bessere Druckqualität, besonders bei schnellen Drucken
- Präzisere Bewegungen durch geringere Massenträgheit

**Bekannte CoreXY-Modelle:** Prusa Core One+, Voron, Bambu Lab, Creality K1

Es gibt auch ältere Drucker (z. B. Prusa i3, Creality Ender 3), bei denen sich das Druckbett vor und zurück bewegt (Bedslinger).

---

## Wissensüberprüfung

:::multievent
Was bedeutet FDM?

{r1{Fast Digital Manufacturing}}

{r1{!Fused Deposition Modeling}} 

{r1{Filament Direct Movement}} 

{r1{Fixed Design Modeling}}

Welches Bauteil schmilzt das Filament und drückt es durch die Düse?

{r2{Extruder}} 

{r2{Heizbett}} 

{r2{!Hotend}} 

{r2{Stepper-Motor}}

Wie bewegt sich der Druckkopf bei einem CoreXY-Drucker in der X-Y-Ebene?

{r3{Der Druckkopf bewegt sich nur links und rechts.}} 

{r3{Das Druckbett bewegt sich vor und zurück.}} 

{r3{!Durch zwei Motoren und ein Riemensystem in beide Richtungen.}} 

{r3{Der Druckkopf kann sich frei in alle Richtungen bewegen.}}

Was ist ein Vorteil von CoreXY-Druckern?

{r4{CoreXY ist immer günstiger.}} 

{r4{Das Bett bewegt sich auch bei CoreXY mit.}} 

{r4{!CoreXY erreicht höhere Druckgeschwindigkeiten mit besserer Qualität.}} 

{r4{CoreXY ist einfacher zu warten.}}
:::
