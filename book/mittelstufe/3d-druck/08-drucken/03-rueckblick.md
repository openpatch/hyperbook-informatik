---
title: Rückblick
index: 3
---

# Rückblick

Am Ende des Pfads steht die Maschine – und die Erkenntnis, dass sie nichts von deinem Modell weiß. Sie führt eine lange Liste von Bewegungen aus. Wer das verstanden hat, versteht auch, warum manche Fehler erst beim Drucken auffallen.

## Das kann ich jetzt

- [ ] Ich kann den Aufbau eines FDM-Druckers und die Aufgabe seiner Teile beschreiben. ([8.1](./01-fdm-drucker))
- [ ] Ich kann erklären, wozu das beheizte Druckbett dient. ([8.1](./01-fdm-drucker))
- [ ] Ich kann G-Code lesen und die wichtigsten Befehle deuten. ([8.2](./02-gcode))
- [ ] Ich kann die ganze Kette vom Modell bis zum fertigen Teil beschreiben.

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: G-Code lesen**

```gcode
G28
M104 S210
M140 S60
G1 Z0.2 F3000
G1 X20 Y20 E0 F1500
G1 X60 Y20 E1.8 F900
G1 X60 Y60 E3.6 F900
```

a) Was passiert in den ersten drei Zeilen, bevor überhaupt gedruckt wird?

b) Was bedeutet der Wert hinter `Z` in der vierten Zeile?

c) In der fünften Zeile steht `E0`, danach steigende Werte. Was sagt das über die Bewegung in Zeile 5 aus?

d) Wieso ist die Geschwindigkeit in Zeile 5 höher als in den Zeilen darunter?

e) Welche Figur entsteht durch die letzten drei Zeilen?
:::

::::collapsible{title="Tipp"}

`E` steht für die Menge Filament, die währenddessen gefördert wird. Bleibt der Wert gleich, wird nichts ausgegeben – der Kopf fährt nur.

::::

:::protect{password="druck-8-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `G28` fährt alle Achsen in die Ausgangsstellung, damit der Drucker weiß, wo er ist. `M104 S210` heizt die Düse auf 210 Grad, `M140 S60` das Bett auf 60 Grad.

b) Die Höhe der aktuellen Schicht: Der Kopf steht 0,2 Millimeter über dem Bett. Das ist zugleich die Schichthöhe der ersten Schicht.

c) In Zeile 5 bleibt `E` bei 0 – es wird **kein** Material gefördert. Der Kopf fährt also nur zum Startpunkt, ohne zu drucken. Das nennt man eine Leerfahrt.

d) Weil bei einer Leerfahrt nichts abgelegt wird, kann der Drucker schneller fahren. Sobald Material fließt, muss er langsamer werden, damit die Menge stimmt.

e) Zwei Linien: von (20, 20) nach (60, 20) und weiter nach (60, 60) – ein rechter Winkel, die ersten beiden Seiten eines Quadrats.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Die ganze Kette**

a) Beschreib den Weg von deiner Idee bis zum fertigen Teil in fünf Schritten. Nenne zu jedem Schritt das Programm oder Gerät und das Dateiformat, das dabei entsteht.

b) An welcher Stelle gehen die Parameter und Schleifen deines Modells verloren? Was bedeutet das, wenn du später etwas ändern willst?

c) Ein Mitschüler schickt dir seine G-Code-Datei, damit du sie auf deinem Drucker ausgibst. Warum ist das keine gute Idee? Was solltest du dir stattdessen schicken lassen?

d) Nenne für jede der drei Stationen einen Fehler, der genau dort entsteht und erst später auffällt.
:::

:::protect{password="druck-8-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Schritt | Womit | Ergebnis |
| --- | --- | --- |
| 1. Modell beschreiben | OpenSCAD | `.scad` |
| 2. Modell exportieren | OpenSCAD | `.stl` – nur noch Dreiecke |
| 3. Slicen | Slicer | `.gcode` |
| 4. Übertragen | Karte, Netzwerk oder Kabel | – |
| 5. Drucken | Drucker | das Werkstück |

b) Beim **Export nach STL**. Danach besteht das Modell nur noch aus Dreiecken; Variablen, Schleifen und Module sind verschwunden. Wer etwas ändern will, muss zurück zur `.scad`-Datei – **deshalb hebt man sie auf**. Aus einer STL-Datei die ursprüngliche Beschreibung zurückzugewinnen, ist praktisch unmöglich.

c) Weil G-Code auf einen bestimmten Drucker zugeschnitten ist: Bauraum, Temperaturen, Startbefehle, manchmal sogar die Zahl der Extruder. Auf einem anderen Gerät kann das im besten Fall schiefgehen und im schlechtesten den Drucker beschädigen. Sinnvoll ist die **STL-Datei** – oder noch besser die `.scad`-Datei, dann kann man auch noch etwas ändern.

d) Zum Beispiel:

- **Modellieren:** zwei Teile, die sich nur berühren statt zu überlappen – fällt erst auf, wenn das gedruckte Teil auseinanderfällt.
- **Slicen:** zu geringe Fülldichte für ein tragendes Teil – fällt erst auf, wenn es unter Last bricht.
- **Drucken:** ein nicht gereinigtes Druckbett – fällt nach ein paar Schichten auf, wenn sich eine Ecke löst.

:::

---

## Selbsttest

::::multievent

**1. Welches Bauteil schmilzt das Filament?**

{r1{der Extruder}}

{r1{!das Hotend}}

{r1{das Heizbett}}

{r1{der Schrittmotor}}

{h{Der Extruder schiebt nur.}}
{H{Richtig.}}

**2. Was bewirkt der Befehl G28?**

{r2{Er heizt die Düse.}}

{r2{!Er fährt die Achsen in die Ausgangsstellung.}}

{r2{Er beendet den Druck.}}

{r2{Er fördert Filament.}}

{h{Ohne ihn weiß der Drucker nicht, wo er steht.}}
{H{Richtig.}}

**3. In einer G1-Zeile bleibt der E-Wert unverändert. Was heißt das?**

{r3{Der Drucker steht still.}}

{r3{!Der Kopf fährt, ohne Material abzulegen – eine Leerfahrt.}}

{r3{Es wird doppelt so viel Material abgelegt.}}

{r3{Die Zeile ist fehlerhaft.}}

{h{E gibt an, wie viel Filament gefördert wird.}}
{H{Richtig.}}

**4. Wo gehen Parameter und Schleifen deines Modells verloren?**

{r4{beim Slicen}}

{r4{!beim Export nach STL}}

{r4{beim Übertragen}}

{r4{beim Drucken}}

{h{Was steht in einer STL-Datei noch drin?}}
{H{Richtig – nur Dreiecke. Deshalb hebt man die scad-Datei auf.}}

**5. Was schickt man jemandem, der dein Teil selbst drucken soll?**

{r5{die G-Code-Datei}}

{r5{!die STL- oder besser die scad-Datei}}

{r5{ein Foto}}

{r5{nichts, das geht nicht}}

{h{G-Code ist auf einen bestimmten Drucker zugeschnitten.}}
{H{Richtig.}}

::::
