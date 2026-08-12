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

## Ausprobieren

:::snippet{#aufgabe}
1. Lade eine STL-Datei herunter z.B. von einem vorherigen OpenSCAD Project.
2. Öffne die Datei im Online-Slicer Kiri (File->Import).
3. Wähle die Haftung und Stützten aus, die du gelernt hast.
4. Klicke auf Slice und warte, bis der Slicer fertig ist.
5. Klicke auf Preview/Vorschau und überprüfe den Einfluss deiner Einstellungen auf das Modell.
:::

::embed{src="https://grid.space/kiri" width="100%" height="600px"}

---

## Selbsttest

::::multievent

**1. Was ist der Unterschied zwischen Brim und Raft?**

{r1{Beide sind dasselbe.}}

{r1{!Ein Brim ist ein flacher Rand um das Modell, ein Raft liegt als Unterlage unter dem ganzen Modell.}}

{r1{Ein Raft ist kleiner als ein Brim.}}

{r1{Ein Brim lässt sich nicht entfernen.}}

{h{Brim heißt Hutkrempe, Raft heißt Floß.}}
{H{Richtig – der Brim kostet weniger Material, das Raft hilft bei stark verzugsanfälligen Teilen.}}

**2. Ab welchem Überhangwinkel braucht man in der Regel Stützen?**

{r2{ab 10 Grad}}

{r2{ab 30 Grad}}

{r2{!ab etwa 45 Grad}}

{r2{ab 90 Grad}}

{h{Bis zu diesem Winkel findet jede Schicht noch genug Halt auf der darunterliegenden.}}
{H{Richtig – gemessen wird dabei gegen die Senkrechte.}}

**3. Wie vermeidest du Stützen am besten?**

{r3{durch höhere Temperatur}}

{r3{!indem du das Teil anders auf das Druckbett drehst}}

{r3{durch mehr Fülldichte}}

{r3{gar nicht}}

{h{Die Überhänge hängen davon ab, wie das Teil steht.}}
{H{Richtig – Stützen kosten Material, Zeit und hinterlassen Spuren an der Oberfläche.}}

**4. Warum haftet die erste Schicht manchmal nicht?**

{c1{!Das Druckbett ist nicht sauber.}}

{c1{!Der Abstand zwischen Düse und Bett stimmt nicht.}}

{c1{Die Fülldichte ist zu niedrig.}}

{c1{Das Modell hat zu viele Ecken.}}

{h{Zwei Ursachen betreffen die erste Schicht selbst, zwei haben damit nichts zu tun.}}
{H{Richtig.}}

::::
