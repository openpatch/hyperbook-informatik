---
title: Haftung und Stützstrukturen
index: 3
---

# Haftung und Stützstrukturen

Damit dein Modell erfolgreich gedruckt wird, musst du zwei Dinge beachten:
1. **Das Modell muss gut am Druckbett haften**, sonst löst es sich während des Drucks.
2. **Teile, die in der Luft hängen**, brauchen Unterstützung, sonst fallen sie durch oder verziehen sich.

Für beide Probleme gibt es Lösungen im Slicer.

## Bett-Haftung (Bed Adhesion)

Damit die erste Schicht deines Modells gut am Druckbett haftet, kannst du eine dieser Hilfen aktivieren:

### Skirt

Ein Skirt ist eine einfache Linie, die **außen um das Modell herum** gedruckt wird – **ohne das Modell zu berühren**.
- Der Skirt hilft nicht direkt bei der Haftung
- Aber er füllt die Düse vor dem eigentlichen Druck
- Und er zeigt, ob das Bett richtig nivelliert ist

### Brim

Ein Brim ist eine breite, flache Fläche, die **direkt am Modell anhaftet**. Er vergrößert die Kontaktfläche mit dem Druckbett.
- Verhindert, dass sich Ecken des Modells hochbiegen
- Empfohlen bei: kleinen Grundflächen, scharfen Ecken
- Nach dem Druck wird der Brim **abgebrochen oder abgeschnitten**

### Raft

Ein Raft ist eine mehrschichtige Gitterfläche, die **unter dem gesamten Modell** gedruckt wird. Das Modell wird dann auf dem Raft aufgebaut.
- Maximale Haftung, gut für große, flache Objekte
- Nachteil: Die Unterseite des Modells wird rauer
- Selten notwendig bei gut eingestellten Druckern

| Methode | Haftung | Materialverbrauch | Nacharbeit |
| ------- | ------- | ----------------- | ---------- |
| Skirt | Keine | Sehr gering | Keine |
| Brim | Gut | Gering | Abbrechen |
| Raft | Sehr gut | Hoch | Ablösen |

## Stützstrukturen (Supports)

Der FDM-Drucker druckt Schicht für Schicht von unten nach oben. **Alles, was steil nach oben ragt, braucht Unterstützung.** Ohne Unterstützung würde das Material einfach in die Luft gedruckt werden und durchhängen.

### Wann brauche ich Supports?

Supports werden automatisch für folgende Teile erstellt:
- **Überhänge steiler als 45°** (z. B. ein Dach, das stark geneigt ist)
- **Brücken** über mehr als ~5 mm Abstand (z. B. ein Horizontalstab zwischen zwei Säulen)
- **Horizontale Löcher** (z. B. ein Schraubenloch von der Seite)

### Support-Einstellungen

| Einstellung | Bedeutung |
| ----------- | --------- |
| **Überhang-Winkel** | Ab welchem Winkel Supports generiert werden (Standard: 45°) |
| **Dichte** | Wie dicht das Support-Gitter ist (10–20 % reicht meist) |

:::alert{info}
**Tipp:** Versuche, Supports durch geschicktes Design zu vermeiden. Oft hilft es schon, das Modell im Slicer zu **drehen** oder **Fasen (45°-Kanten)** einzubauen.
:::

---

## Wissensüberprüfung

:::multievent
Was ist der Hauptunterschied zwischen Brim und Raft?

{r1{Beide sind identisch.}} 

{r1{!Ein Brim ist eine flache Randschicht um das Modell, ein Raft liegt unter dem gesamten Modell.}} 

{r1{Ein Raft ist kleiner als ein Brim.}} 

{r1{Ein Brim wird automatisch entfernt, ein Raft nicht.}}

Ab welchem Überhang-Winkel braucht man typischerweise Stützstrukturen?

{r2{10°}} 

{r2{30°}} 

{r2{!45°}} 

{r2{90°}}

Du druckst ein Modell mit einer sehr kleinen Grundfläche und es löst sich immer wieder vom Bett. Was hilft?

{r3{Infill erhöhen}} 

{r3{Schichthöhe verringern}} 

{r3{!Brim aktivieren}} 

{r3{Druckgeschwindigkeit erhöhen}}
:::
