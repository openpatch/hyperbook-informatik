---
title: CSS einbinden
index: 1
---

# CSS einbinden

Bevor du gestalten kannst, muss der Browser wissen, dass es überhaupt :t[CSS]{#css} gibt. Dafür gibt es drei Wege – und einen davon solltest du fast immer nehmen.

## Wie eine Regel aufgebaut ist

```
h1 { color: darkred; font-size: 2rem; }
│    └──┬──┘ └──┬──┘
│   Eigenschaft Wert
│    └────────┬────────────────────┘
└─ Selektor        Deklarationsblock
```

:::snippet{#definition}
Eine **Regel** besteht aus einem **Selektor** und einem **Deklarationsblock** in geschweiften Klammern.

Im Block stehen **Deklarationen**. Jede besteht aus einer **Eigenschaft**, einem Doppelpunkt, einem **Wert** und einem **Semikolon**.

Das Semikolon hinter der letzten Deklaration darf man weglassen. Lass es trotzdem stehen – sonst fehlt es garantiert genau dann, wenn du eine Zeile ergänzt.
:::

## Die drei Wege

:::snippet{#merken}
**1. Eigene Datei** – der Regelfall

```html
<head>
  <link rel="stylesheet" href="stil.css">
</head>
```

Alle Regeln stehen in `stil.css`. Diese Datei gilt für **alle** Seiten, die sie einbinden.

**2. Im `<style>`-Element** – nur für Ausnahmen

```html
<head>
  <style>
    h1 { color: darkred; }
  </style>
</head>
```

Die Regeln gelten nur für **diese eine** Seite.

**3. Im `style`-Attribut** – möglichst gar nicht

```html
<h1 style="color: darkred;">Titel</h1>
```

Die Regel gilt nur für **dieses eine** Element.
:::

:::snippet{#aufgabe}
Deine Homepage besteht aus fünf Seiten. Alle sollen dieselbe Schriftart bekommen.

a) Wie viele Stellen musst du bei jedem der drei Wege anfassen?

b) Später soll die Schriftart geändert werden. Wie viele Stellen jetzt?

c) Welchen Weg wählst du – und warum?
:::

:::protect{password="web-4-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

- **Eigene Datei:** eine Regel schreiben, in fünf Seiten je eine `<link>`-Zeile ergänzen.
- **style-Element:** in jeder der fünf Seiten die Regel schreiben – fünfmal dasselbe.
- **style-Attribut:** an jedem einzelnen Element auf jeder Seite. Bei zwanzig Elementen je Seite sind das hundert Stellen.

b)

- **Eigene Datei:** **eine** Stelle.
- **style-Element:** fünf.
- **style-Attribut:** wieder hundert.

c) Die eigene Datei. Der Aufwand am Anfang ist minimal höher, danach ist sie in jeder Hinsicht besser: Man ändert an einer Stelle, der Browser kann die Datei zwischenspeichern und muss sie nur einmal laden, und der :t[HTML]{#html}-Quelltext bleibt lesbar.

Der Grundgedanke ist derselbe wie bei Methoden in Java: **Was mehrfach vorkommt, schreibt man einmal auf und benutzt es mehrfach.**

:::

:::alert{warn}
Das `style`-Attribut ist nicht verboten, aber es ist fast immer ein Zeichen dafür, dass etwas schiefläuft. Es vermischt Inhalt und Gestaltung wieder – genau das, was CSS trennen sollte.

In diesem Lernpfad kommt es deshalb nicht mehr vor.
:::

## Ausprobieren

:::webide{id="web-4-1-erste-regeln" height="370px"}

```html
<h1>Der Schulgarten</h1>
<p>Wir treffen uns jeden Dienstag am Hochbeet.</p>
<p class="hinweis">Bringt bitte feste Schuhe mit.</p>
```

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

h1 {
  color: hsl(140 60% 30%);
}

.hinweis {
  color: hsl(0 60% 40%);
  font-weight: bold;
}
```

:::

:::snippet{#aufgabe}
a) Ändere die Farbe der Überschrift.

b) Ergänze eine Regel, die alle Absätze in einer anderen Schriftgröße darstellt. Die Eigenschaft heißt `font-size`, ein möglicher Wert ist `1.2rem`.

c) Baue absichtlich einen Fehler ein: Schreibe `colour` statt `color`. Was passiert?

d) Baue einen zweiten Fehler ein: Lass ein Semikolon weg. Was passiert jetzt?
:::

:::protect{password="web-4-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zum Beispiel `color: hsl(210 70% 40%);`

b)

```css
p {
  font-size: 1.2rem;
}
```

c) **Nichts** – die Deklaration wird stillschweigend übersprungen. Der Rest der Regel gilt weiter.

d) Ohne Semikolon wird die Deklaration mit der **folgenden** verschmolzen. Das Ergebnis ist ungültig, und **beide** verschwinden.

**Merke:** CSS verhält sich wie HTML – es meldet keine Fehler, es lässt weg. Wenn eine Gestaltung nicht wirkt, ist ein Tippfehler die wahrscheinlichste Ursache.

**Der Trick zum Finden:** Öffne die Entwicklerwerkzeuge, wähle das Element aus und sieh unter *Styles* nach. Der Browser zeigt dort verworfene Deklarationen durchgestrichen und mit einem Warnzeichen an.

:::

## Kommentare in CSS

```css
/* Farben der Seite */
h1 { color: hsl(140 60% 30%); }

/* Das hier ist gerade abgeschaltet:
p { font-size: 2rem; }
*/
```

:::snippet{#merken}
CSS kennt nur eine Sorte Kommentar: `/* … */`. Sie funktioniert auch über mehrere Zeilen und eignet sich gut, um beim Suchen eines Fehlers Regeln vorübergehend abzuschalten.

Ein `//` wie in Java gibt es in CSS **nicht**. Es wirkt nicht als Kommentar, sondern macht die folgende Regel ungültig.
:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: formatieren Webseiten mit CSS (MI).
Inhaltsfeld Formale Sprachen: Erstellung von Quelltexten.
-->

---

## Selbsttest

::::multievent

**1. Woraus besteht eine CSS-Regel?**

{r1{aus Eigenschaft und Wert}}

{r1{!aus einem Selektor und einem Deklarationsblock}}

{r1{aus einem Tag und einem Attribut}}

{r1{aus einer Zeile Text}}

{h{Der Selektor steht vor der geschweiften Klammer.}}
{H{Richtig. Im Block stehen dann die einzelnen Deklarationen.}}

**2. Welcher Weg, CSS einzubinden, ist für ein Projekt aus mehreren Seiten der beste?**

{r2{das style-Attribut an jedem Element}}

{r2{ein style-Element in jeder Seite}}

{r2{!eine eigene CSS-Datei, die alle Seiten einbinden}}

{r2{alle drei sind gleich gut}}

{h{Überleg, wie viele Stellen du bei einer Änderung anfassen musst.}}
{H{Richtig – eine Stelle statt vieler.}}

**3. Was passiert bei einem Tippfehler in einem Eigenschaftsnamen?**

{r3{Die ganze CSS-Datei wird verworfen.}}

{r3{Der Browser zeigt eine Fehlermeldung.}}

{r3{!Nur diese eine Deklaration wird übersprungen.}}

{r3{Die Seite lädt nicht.}}

{h{Genau wie HTML meldet CSS keine Fehler.}}
{H{Richtig. Deshalb sind die Entwicklerwerkzeuge beim Suchen so nützlich.}}

**4. Was passiert, wenn ein Semikolon fehlt?**

{r4{nichts, es ist optional}}

{r4{!die Deklaration verschmilzt mit der nächsten, beide fallen weg}}

{r4{der Browser ergänzt es}}

{r4{alle folgenden Regeln werden ignoriert}}

{h{Woran soll der Browser erkennen, wo die eine Deklaration aufhört?}}
{H{Richtig – deshalb setzt man es auch hinter die letzte.}}

**5. Womit schreibt man einen Kommentar in CSS?**

{r5{mit zwei Schrägstrichen}}

{r5{!mit Schrägstrich-Stern und Stern-Schrägstrich}}

{r5{mit einer Raute}}

{r5{mit spitzen Klammern und Ausrufezeichen}}

{h{Die Schreibweise mit zwei Schrägstrichen kennst du aus Java – in CSS gibt es sie nicht.}}
{H{Richtig.}}

**6. Wo siehst du, dass der Browser eine Deklaration verworfen hat?**

{r6{im Reiter Netzwerk}}

{r6{!im Reiter Elemente unter Styles, dort ist sie durchgestrichen}}

{r6{in der Adresszeile}}

{r6{gar nicht}}

{h{Dort stehen alle Regeln, die auf das ausgewählte Element wirken.}}
{H{Richtig – mit Warnzeichen daneben.}}

::::
