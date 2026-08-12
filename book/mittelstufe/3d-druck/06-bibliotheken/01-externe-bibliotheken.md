---
title: Externe Bibliotheken
index: 1
permaid: openscad-externe-bibliotheken
---

# Externe Bibliotheken

OpenSCAD bietet die Möglichkeit, externe Bibliotheken zu verwenden, um zusätzliche Funktionen und Module in deinen Projekten zu nutzen. Diese Bibliotheken können von der OpenSCAD-Community erstellt und geteilt werden und bieten eine Vielzahl von vorgefertigten Modulen für verschiedene Anwendungen.

## Beispiel: Verwendung der BOSL2-Bibliothek

Die BOSL2-Bibliothek (The Belfry OpenSCAD Library) ist eine umfangreiche Sammlung von Modulen, die von der OpenSCAD-Community entwickelt wurden. Sie bietet unter anderem fertige Module für Gewinde, abgerundete Formen, Zahnräder und vieles mehr.

### Installation (lokal)

1. Lade die Bibliothek von GitHub herunter: [https://github.com/BelfrySCAD/BOSL2](https://github.com/BelfrySCAD/BOSL2)
2. Entpacke den Ordner und lege ihn in dein OpenSCAD-Bibliotheksverzeichnis (unter Windows z. B. `Dokumente/OpenSCAD/libraries/`).
3. Starte OpenSCAD neu.

### Verwendung

Sobald die Bibliothek installiert ist, kannst du sie in deinem Quelltext einbinden:

```scad
include <BOSL2/std.scad>

// Beispiel: Eine abgerundete Box
cuboid([30, 20, 10], rounding=3);
```

:::alert{info}
In der browserbasieren Version von OpenSCAD können externe Bibliotheken nicht verwendet werden. Für die Arbeit mit Bibliotheken benötigst du die lokal installierte Version.
:::

## Weitere Bibliotheken

Eine Übersicht über verfügbare Bibliotheken findest du in der OpenSCAD-Dokumentation:

https://openscad.org/libraries.html

---

## Selbsttest

::::multievent

**1. Was ist eine Bibliothek?**

{r1{ein Ordner mit fertigen 3D-Modellen}}

{r1{!eine Sammlung fertiger Bausteine, die man im eigenen Modell benutzen kann}}

{r1{ein Teil des Slicers}}

{r1{eine Dateiendung}}

{h{Es geht um Code, den jemand anders geschrieben hat.}}
{H{Richtig.}}

**2. Womit bindest du eine Bibliothek ein?**

{r2{mit einer Schleife}}

{r2{!mit einer include- beziehungsweise use-Zeile am Anfang der Datei}}

{r2{indem man ihren Quelltext hineinkopiert}}

{r2{gar nicht, sie ist immer verfügbar}}

{h{Die Zeile steht ganz oben, bevor irgendetwas gezeichnet wird.}}
{H{Richtig.}}

**3. Welche Vorteile bringt eine Bibliothek? Wähle alle zutreffenden aus.**

{c1{!Man muss Häufiges nicht selbst schreiben.}}

{c1{!Der Code ist erprobt und von vielen benutzt.}}

{c1{Der Druck wird schneller.}}

{c1{Man braucht keine Parameter mehr.}}

{h{Zwei Angebote betreffen die Arbeit am Modell, zwei sind falsch.}}
{H{Richtig – dafür muss man die Dokumentation der Bibliothek lesen können, und das ist selbst eine Fertigkeit.}}

::::
