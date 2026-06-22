---
title: Parameter
index: 5
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

## Wissensüberprüfung

:::multievent
Welche Aussage über Parameter in OpenSCAD ist **richtig**?

{r1{Parameter können nur ganze Zahlen speichern.}} 

{r1{!Ändert man einen Parameter, passen sich alle Stellen im Code an, die ihn verwenden.}} 

{r1{Parameter müssen immer am Ende des Quelltexts stehen.}}

Was ergibt `grundmass * 2`, wenn `grundmass = 15` ist?

{r2{15}} 

{r2{!30}} 

{r2{2}}

{r2{7.5}}
:::
