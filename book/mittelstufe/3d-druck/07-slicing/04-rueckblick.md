---
title: Rückblick
index: 4
---

# Rückblick

Slicen ist die Stelle, an der aus einer Form eine **Handlungsanweisung** wird. Die Einstellungen dabei sind keine Geschmacksfrage: Jede von ihnen ist eine Abwägung zwischen Zeit, Material und Haltbarkeit.

## Das kann ich jetzt

- [ ] Ich kann erklären, was ein Slicer tut und welche Dateien dabei entstehen. ([7.1](./01-slicer-software))
- [ ] Ich kann Schichthöhe, Fülldichte, Temperatur und Geschwindigkeit einordnen. ([7.2](./02-grundeinstellungen))
- [ ] Ich kann begründen, welche Einstellung ich für ein bestimmtes Teil wähle. ([7.2](./02-grundeinstellungen))
- [ ] Ich kann dafür sorgen, dass ein Druck haftet und Überhänge gelingen. ([7.3](./03-haftung-und-stuetzen))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Einstellungen begründen**

Wähle für jedes Teil Schichthöhe, Fülldichte und begründe kurz. Sag außerdem, ob Stützen nötig sind.

a) Ein Ersatzknopf für eine Waschmaschine, der gedreht wird.

b) Eine Figur zum Aufstellen, 12 Zentimeter hoch, mit feinem Gesicht.

c) Ein Prototyp, an dem nur die Maße geprüft werden sollen.

d) Eine Halterung, die ein Regalbrett trägt.

e) Ein Becher mit dünner Wand und Henkel.
:::

::::collapsible{title="Tipp: Drei Fragen"}

Stell dir bei jedem Teil dieselben drei Fragen:

1. Muss es **Kraft aushalten**? → mehr Fülldichte, mehr Wände
2. Sieht man die **Oberfläche**? → kleinere Schichthöhe
3. Gibt es **Überhänge** über 45 Grad? → Stützen oder anders ausrichten

::::

:::protect{password="druck-7-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Knopf:** 0,2 mm Schichthöhe, 40 bis 60 Prozent Fülldichte. Er wird gedreht und belastet, deshalb viel Material; die Oberfläche ist nebensächlich. Keine Stützen, wenn er flach liegt.

b) **Figur:** 0,1 mm Schichthöhe, 10 bis 15 Prozent Fülldichte. Umgekehrter Fall – die Oberfläche ist alles, Kraft wirkt keine. Stützen je nach Haltung, etwa unter ausgestreckten Armen.

c) **Prototyp:** 0,3 mm, 10 Prozent. Er soll nur schnell fertig sein; Aussehen und Festigkeit sind gleichgültig.

d) **Regalhalterung:** 0,2 mm, 60 Prozent oder mehr, dazu mehr Wände. Hier hängt Gewicht daran. Die **Ausrichtung** ist wichtiger als jede andere Einstellung: Die Schichten müssen quer zur Zugrichtung liegen, sonst reißt das Teil zwischen den Schichten auf.

e) **Becher:** 0,2 mm, wenige Prozent Fülldichte – die Wand macht die Festigkeit, nicht die Füllung. Der Henkel hat einen Überhang; entweder Stützen oder den Becher so drehen, dass der Henkel nach oben zeigt.

**Der rote Faden:** Es gibt keine allgemein richtige Einstellung. Es gibt nur eine, die zum Zweck des Teils passt – und der Zweck entscheidet auch über die Lage auf dem Druckbett.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Fehlersuche im Druck**

Ordne jedem Fehlerbild eine wahrscheinliche Ursache und eine Gegenmaßnahme zu.

a) Das Teil löst sich während des Drucks an einer Ecke vom Bett.

b) Die Schichten lassen sich mit dem Finger auseinanderziehen.

c) An schrägen Flächen hängen Fäden herunter, die Fläche ist rau.

d) Zwischen den Wänden sind kleine Löcher zu sehen.

e) Der Druck dauert doppelt so lange wie erwartet.
:::

:::protect{password="druck-7-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Warping** – das Teil zieht sich beim Abkühlen zusammen. Ursache: zu kaltes oder unsauberes Druckbett, große flache Grundfläche. Maßnahme: Bett heizen und reinigen, Brim oder Raft verwenden, Zugluft vermeiden.

b) **Zu geringe Schichthaftung.** Ursache: zu niedrige Drucktemperatur oder zu viel Kühlung. Maßnahme: Temperatur schrittweise erhöhen, Bauteillüfter reduzieren.

c) **Überhang ohne Stütze.** Die Schicht hat unter sich nichts, worauf sie sich ablegen kann. Maßnahme: Stützen aktivieren oder – besser – das Teil anders ausrichten.

d) **Zu wenig Material.** Ursache: zu geringe Fülldichte oder zu wenige Wände; auch ein teilweise verstopftes Hotend kommt infrage. Maßnahme: Wandzahl erhöhen, Fülldichte anheben.

e) **Zu kleine Schichthöhe oder zu hohe Fülldichte.** Beide vervielfachen die Arbeit. Maßnahme: prüfen, ob das Teil die Feinheit wirklich braucht – bei einem Prototyp fast nie.

:::

---

## Selbsttest

::::multievent

**1. Was erzeugt der Slicer?**

{r1{ein 3D-Modell}}

{r1{!eine G-Code-Datei mit den Bewegungen des Druckkopfs}}

{r1{eine stl-Datei}}

{r1{ein Bild}}

{h{Der Drucker versteht keine Formen, nur Bewegungen.}}
{H{Richtig.}}

**2. Für welches Teil wählst du eine hohe Fülldichte?**

{r2{eine Dekofigur}}

{r2{!eine Halterung, die Gewicht trägt}}

{r2{einen schnellen Prototyp}}

{r2{eine Vase}}

{h{Wo wirken Kräfte?}}
{H{Richtig – bei allen anderen ist viel Füllung nur verschwendete Zeit.}}

**3. Halbe Schichthöhe bedeutet für die Druckzeit ungefähr …**

{r3{die Hälfte}}

{r3{!das Doppelte}}

{r3{keinen Unterschied}}

{r3{das Vierfache}}

{h{Halb so hohe Schichten – wie viele braucht man dann?}}
{H{Richtig.}}

**4. Ab welchem Überhangwinkel braucht man meist Stützen?**

{z{45}}

{h{Gemessen gegen die Senkrechte.}}
{H{Richtig – bis dahin findet jede Schicht genug Halt.}}

**5. Was ist die wirksamste Maßnahme gegen Stützen?**

{r4{höhere Temperatur}}

{r4{!das Teil anders auf dem Druckbett ausrichten}}

{r4{mehr Fülldichte}}

{r4{kleinere Schichthöhe}}

{h{Welche Überhänge es gibt, hängt davon ab, wie das Teil steht.}}
{H{Richtig – Stützen kosten Zeit, Material und hinterlassen Spuren.}}

::::
