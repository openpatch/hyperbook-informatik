---
title: Haftung und Stützstrukturen
index: 3
---

# Haftung und Stützstrukturen

Zwei der häufigsten Probleme beim 3D-Druck sind:
1. Das Modell **löst sich vom Druckbett** während des Drucks.
2. Teile des Modells **hängen in der Luft** und können nicht ohne Unterstützung gedruckt werden.

Für beide Probleme gibt es Lösungen im Slicer.

---

## Bett-Haftung (Bed Adhesion)

### Skirt

Ein Skirt ist eine einfache Linie, die außen um das Modell herum gedruckt wird – **ohne das Modell zu berühren**. Er hat keinen Haftungseffekt, aber er:
- füllt die Düse vor dem eigentlichen Druck
- zeigt, ob das Bett richtig nivelliert ist

> 📸 **Screenshot-Hinweis:** Slicer-Vorschau mit Skirt (gestrichelte Linie um das Modell) als Screenshot einfügen.

### Brim

Ein Brim ist eine breite, flache Fläche, die direkt an das Modell **angebaut** wird. Er vergrößert die Kontaktfläche mit dem Druckbett und verhindert, dass sich Ecken hochbiegen.

- Empfohlen bei: kleinen Grundflächen, scharfen Ecken, ABS
- Nach dem Druck wird der Brim **abgebrochen oder abgeschnitten**

> 📸 **Screenshot-Hinweis:** Foto eines gedruckten Teils mit sichtbarem Brim einfügen (vor dem Entfernen).

### Raft

Ein Raft ist eine mehrschichtige Gitterfläche **unter dem gesamten Modell**. Das Modell wird auf dem Raft gedruckt.

- Maximale Haftung, gut für große, flache Objekte
- Nachteil: Die Unterseite des Modells wird rauer
- Selten notwendig bei gut kalibrierten Druckern

| Methode | Haftung | Materialverbrauch | Nacharbeit |
| ------- | ------- | ----------------- | ---------- |
| Skirt | Keine | Sehr gering | Keine |
| Brim | Gut | Gering | Abbrechen |
| Raft | Sehr gut | Hoch | Ablösen |

---

## Stützstrukturen (Supports)

Der FDM-Drucker druckt Schicht für Schicht von unten nach oben. Teile, die **mehr als etwa 45° überhängen**, haben keine Unterstützung darunter – das Material würde durchhängen oder in die Luft fallen.

> 📸 **Screenshot-Hinweis:** Foto oder Grafik einfügen, die den „45°-Regel"-Überhang zeigt: links ohne Support (durchgehangen), rechts mit Support (sauber).

### Wann brauche ich Supports?

- Überhänge **steiler als 45°** zur Senkrechten
- **Brücken** über mehr als ~5 mm Abstand
- **Horizontale Löcher** (z. B. Schraubenlöcher von der Seite)

### Support-Arten

**Normale Supports (Normal/Linear)**
- Einfaches Gitter, das von der Druckbett-Oberfläche oder einem Modell-Teil wächst
- Schnell zu drucken, manchmal schwer zu entfernen

**Baum-Supports (Tree Supports)**
- Supports wachsen wie Äste von einem dünnen Stamm
- Berühren das Modell nur minimal → leichter zu entfernen, bessere Oberfläche
- Empfohlen für organische Formen

> 📸 **Screenshot-Hinweis:** Slicer-Vorschau mit normalen Supports und Baum-Supports im Vergleich einfügen.

### Support-Einstellungen

| Einstellung | Bedeutung |
| ----------- | --------- |
| **Überhang-Winkel** | Ab welchem Winkel werden Supports generiert (Standard: 45°) |
| **Z-Abstand** | Kleiner Luftspalt zwischen Support und Modell → leichter ablösen |
| **Dichte** | Wie dicht ist das Support-Gitter (10–30 % typisch) |

:::alert{info}
**Tipp beim Design:** Versuche, Supports durch clevere Modellgestaltung zu vermeiden. Überhänge können oft durch **Fasen** (45°-Kanten) oder das **Drehen des Modells** im Slicer vermieden werden.
:::

---

## Wissensüberprüfung

:::multievent
Was ist der Hauptunterschied zwischen Brim und Raft?

{r1{Beide sind identisch.}} {r1{!Ein Brim ist eine flache Randschicht um das Modell, ein Raft liegt unter dem gesamten Modell.}} {r1{Ein Raft ist kleiner als ein Brim.}} {r1{Ein Brim wird automatisch entfernt, ein Raft nicht.}}
:::

:::multievent
Ab welchem Überhang-Winkel braucht man typischerweise Stützstrukturen?

{r2{10°}} {r2{30°}} {r2{!45°}} {r2{90°}}
:::

:::multievent
Welcher Support-Typ hinterlässt in der Regel eine bessere Oberfläche am Modell?

{r3{Normal-Supports}} {r3{!Baum-Supports (Tree Supports)}} {r3{Beide sind gleich.}} {r3{Raft-Supports}}
:::

:::multievent
Du druckst ein Modell mit einer sehr kleinen Grundfläche und es löst sich immer wieder vom Bett. Was hilft?

{r4{Infill erhöhen}} {r4{Schichthöhe verringern}} {r4{!Brim aktivieren}} {r4{Druckgeschwindigkeit erhöhen}}
:::
