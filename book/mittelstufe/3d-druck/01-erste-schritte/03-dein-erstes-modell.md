---
title: Dein erstes 3D-Modell
index: 3
permaid: openscad
---

# Dein erstes 3D-Modell

In diesem Kapitel wirst du **in unter einer Minute** dein erstes 3D-Objekt erstellen – **ohne Vorwissen!**

## Schritt 1: OpenSCAD öffnen

:::alert{info}
Du musst OpenSCAD nicht installieren. Nutze die **interaktiven Online-Editoren**, die direkt in deinem Browser funktionieren.
:::

## Schritt 2: Einen Würfel erstellen

Der Code `cube(30);` erzeugt einen Würfel mit 30mm Kantenlänge.

```scad
cube(30);
```

::::snippet{#aufgabe}
**Experimentiere:**
- Ändere die `30` in `50` – was passiert?
- Probiere `20` oder `100` aus
- Die Vorschau aktualisiert sich automatisch

:::openscad{height="400px"}

```scad
cube(30);
```
:::

::::

## Schritt 3: Zweites Objekt hinzufügen

Jetzt fügen wir eine Kugel hinzu. Tippe diesen Code:

```scad
cube(30);
sphere(20);
```

::::snippet{#aufgabe}
**Bewege die Kugel nach rechts:**
Ersetze `sphere(20);` durch `translate([40,0,0]) sphere(20);`

Hinweis: `translate([x,y,z])` bewegt das Objekt um x, y und z Millimeter.
::::

:::openscad{height="400px"}

```scad
cube(30);
sphere(20);
```
:::

## Herzlichen Glückwunsch! 🎉

Du hast gerade:
- ✅ Dein erstes 3D-Modell erstellt
- ✅ Ein Objekt bewegt
- ✅ OpenSCAD kennengelernt

---

## Selbsttest

::::multievent

**1. Womit erzeugst du einen Würfel mit 30 Millimetern Kantenlänge?**

{r1{!cube(30);}}

{r1{würfel(30);}}

{r1{cube[30];}}

{r1{box(30);}}

{h{Der Befehl ist englisch, die Angabe steht in runden Klammern.}}
{H{Richtig – und das Semikolon am Ende gehört dazu.}}

**2. Was bewirkt translate mit den Werten 40, 0 und 0?**

{r2{Es dreht das Objekt um 40 Grad.}}

{r2{!Es verschiebt das Objekt um 40 Millimeter entlang der x-Achse.}}

{r2{Es vergrößert das Objekt um das 40-fache.}}

{r2{Es färbt das Objekt ein.}}

{h{Der Name des Befehls heißt übersetzt verschieben.}}
{H{Richtig. Die drei Zahlen stehen für x, y und z.}}

**3. Was passiert, wenn zwei Objekte an derselben Stelle stehen?**

{r3{Es entsteht ein Fehler.}}

{r3{Das zweite Objekt ersetzt das erste.}}

{r3{!Beide werden gezeichnet und überlappen sich.}}

{r3{Nur das erste ist zu sehen.}}

{h{Probier es aus: ein Würfel und eine Kugel ohne translate.}}
{H{Richtig – beim Drucken werden überlappende Objekte zu einem einzigen Körper.}}

::::
