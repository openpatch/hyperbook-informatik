---
title: Text
index: 2
permaid: openscad-text
---

# Text

Der Text-Befehl `text()` erstellt eine 2D-Form. Da OpenSCAD nur 3D-Objekte darstellen kann, **musst du Text immer mit `linear_extrude()` extrudieren**, um ihn sichtbar zu machen.

:::openscad{height="600px"}
```scad
mein_text = "Hallo Welt!";
linear_extrude(height=5) 
    text(mein_text, size=10, halign="center", valign="center");
```
:::

:::alert{info}
**Wichtig:** `text()` allein erstellt eine 2D-Form, die in OpenSCAD **nicht sichtbar** ist. Du **musst** immer `linear_extrude()` verwenden, um Text in 3D darzustellen.
:::

---

## Selbsttest

::::multievent

**1. Was passiert, wenn du text ohne linear_extrude benutzt?**

{r1{Es entsteht ein Fehler.}}

{r1{!Der Text bleibt flach und lässt sich nicht drucken.}}

{r1{Der Text wird automatisch 1 mm hoch.}}

{r1{Der Text erscheint spiegelverkehrt.}}

{h{text erzeugt eine zweidimensionale Form.}}
{H{Richtig – erst das Hochziehen macht daraus einen Körper.}}

**2. Wie machst du eine Beschriftung, die in die Oberfläche eingeprägt ist?**

{r2{mit color}}

{r2{!indem man den hochgezogenen Text mit difference vom Werkstück abzieht}}

{r2{mit einer Schleife}}

{r2{mit negativer Textgröße}}

{h{Eingeprägt heißt: An dieser Stelle fehlt Material.}}
{H{Richtig. Für erhabene Schrift legt man den Text stattdessen mit union oben auf.}}

**3. Worauf musst du bei kleiner Schrift im Druck achten?**

{r3{auf die Farbe}}

{r3{!Sehr feine Linien fallen schmaler aus als die Düse breit ist und verschwinden.}}

{r3{auf die Schriftart}}

{r3{gar nichts}}

{h{Wie dünn kann eine Linie werden, die aus einer 0,4 Millimeter breiten Düse kommt?}}
{H{Richtig – Buchstaben unter etwa 5 Millimetern Höhe werden schnell unlesbar.}}

::::
