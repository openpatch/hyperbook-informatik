---
title: Parameter
index: 1
permaid: openscad-parameter
---

# Parameter

In OpenSCAD kannst du **Parameter** (auch *Variablen* genannt) verwenden, um Werte zu speichern und später im Quelltext mehrfach zu nutzen. Das kennst du bereits aus dem Matheunterricht: Dort schreibst du `a = 5`, hier schreibst du `a = 5;` – das Prinzip ist dasselbe.

Parameter sind besonders nützlich, wenn du ein Modell erstellen möchtest, das leicht anpassbar sein soll: Du änderst nur den Wert an einer Stelle, und das gesamte Modell passt sich an.

### Parameter erstellen

```scad
parameter_name = Wert;
```

### Parameter verwenden

Sobald du einen Parameter erstellt hast, kannst du ihn anstelle eines festen Werts einsetzen:

```scad
parameter_name = 10;
cube(parameter_name);
```

::::snippet{#aufgabe}
Verändere den Wert des Parameters `wuerfel_groesse` und beobachte, wie sich die Größe des Würfels verändert.

:::openscad{height="600px"}
```scad
// Parameter für die Abmessungen des Würfels
wuerfel_groesse = 30;

// Erstellen eines Würfels
cube(wuerfel_groesse);

// Ein zweiter, fest kodierter Würfel zum Vergleich
translate([50, 0, 0]) cube(20);
```
:::

::::

:::alert{info}
In der webbasierten Version von OpenSCAD erscheinen Parameter, die du definierst, automatisch als Eingabefelder in der **Parameterliste** – so kannst du Werte bequem anpassen, ohne den Quelltext zu bearbeiten. In der lokalen Version musst du den **Customizer** (Ansicht → Customizer) zuerst aktivieren.
:::

---

## Rechnen mit Parametern

Du kannst Parameter auch in Rechenausdrücken verwenden – genau wie in der Mathematik:

| Operator | Bedeutung      | Beispiel         |
| -------- | -------------- | ---------------- |
| `+`      | Addition       | `breite + 5`     |
| `-`      | Subtraktion    | `hoehe - 10`     |
| `*`      | Multiplikation | `seite * 2`      |
| `/`      | Division       | `laenge / 3`     |

Das ist besonders mächtig: Wenn du einen Parameter änderst, passen sich alle davon abhängigen Maße automatisch an.

```scad
// Nur diesen einen Wert ändern – alles andere passt sich an!
grundmass = 20;

// Basis
cube([grundmass * 3, grundmass * 3, grundmass / 2]);

// Säule in der Mitte
translate([grundmass, grundmass, grundmass / 2])
cube([grundmass, grundmass, grundmass * 2]);
```

::::snippet{#aufgabe}
Verändere nur `grundmass` und beobachte, wie sich das gesamte Modell proportional anpasst.

:::openscad{height="500px"}
```scad
// Nur diesen einen Wert ändern – alles andere passt sich an!
grundmass = 20;

// Basis
cube([grundmass * 3, grundmass * 3, grundmass / 2]);

// Säule in der Mitte
translate([grundmass, grundmass, grundmass / 2])
cube([grundmass, grundmass, grundmass * 2]);
```
:::

::::

---

---

## Selbsttest

::::multievent

**1. Welche Aussage über Parameter stimmt?**

{r1{Parameter können nur ganze Zahlen speichern.}}

{r1{!Ändert man den Wert an einer Stelle, ändert sich alles, was ihn benutzt.}}

{r1{Parameter müssen am Ende des Quelltexts stehen.}}

{r1{Parameter werden mitgedruckt.}}

{h{Genau darin liegt der ganze Nutzen.}}
{H{Richtig – deshalb gehören Maße in Parameter und nicht als Zahlen in den Quelltext.}}

**2. Ein Parameter grundmass hat den Wert 15. Was ergibt grundmass mal 2?**

{z{30}}

{h{Ganz normale Rechnung.}}
{H{Richtig. Man kann aus einem Maß weitere berechnen – das hält das Modell stimmig.}}

**3. Warum schreibt man ein Maß lieber in einen Parameter, als die Zahl an jeder Stelle hinzuschreiben?**

{c1{!Weil man das Modell später an einer Stelle ändern kann.}}

{c1{!Weil der Name erklärt, was die Zahl bedeutet.}}

{c1{Weil das Modell dadurch schneller gerendert wird.}}

{c1{Weil OpenSCAD sonst einen Fehler meldet.}}

{h{Zwei der Gründe betreffen die Arbeit mit dem Quelltext, zwei sind schlicht falsch.}}
{H{Richtig – dieselben zwei Gründe wie bei Variablen in jeder Programmiersprache.}}

::::
