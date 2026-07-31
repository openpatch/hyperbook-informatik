---
title: Listen und Tabellen
index: 3
---

# Listen und Tabellen

Sobald mehrere gleichartige Dinge zusammengehören, ist eine Liste oder eine Tabelle das richtige Element – nicht eine Reihe von Absätzen mit Bindestrichen davor.

## Listen

:::webide{id="web-2-3-listen" height="540px"}

```html
<h2>Zutaten</h2>
<ul>
  <li>250 g Mehl</li>
  <li>3 Eier</li>
  <li>200 ml Milch</li>
</ul>

<h2>Zubereitung</h2>
<ol>
  <li>Mehl und Eier verrühren.</li>
  <li>Milch langsam dazugeben.</li>
  <li>Zehn Minuten ruhen lassen.</li>
</ol>

<h2>Fachbegriffe</h2>
<dl>
  <dt>Teigruhe</dt>
  <dd>Zeit, in der das Mehl die Flüssigkeit aufnimmt.</dd>
  <dt>Backtriebmittel</dt>
  <dd>Stoff, der den Teig aufgehen lässt.</dd>
</dl>
```

:::

:::snippet{#merken}
| Element | Wofür |
| --- | --- |
| `<ul>` | **u**ngeordnete Liste – die Reihenfolge spielt keine Rolle |
| `<ol>` | ge**o**rdnete Liste – die Reihenfolge ist wichtig |
| `<li>` | ein Eintrag; steht **immer** in `<ul>` oder `<ol>` |
| `<dl>`, `<dt>`, `<dd>` | Beschreibungsliste: Begriff und Erklärung |

Die Wahl zwischen `<ul>` und `<ol>` ist keine Geschmacksfrage: Bei Zutaten ist die Reihenfolge egal, bei Arbeitsschritten nicht.
:::

:::snippet{#aufgabe}
a) Ändere im Übungsbereich `<ul>` in `<ol>`. Was ändert sich, was nicht?

b) Verschachtele eine Liste: Ergänze unter *Milch langsam dazugeben* eine Unterliste mit zwei Schritten.

c) Warum ist es falsch, eine Liste so zu schreiben?

```html
<p>- 250 g Mehl</p>
<p>- 3 Eier</p>
```
:::

::::collapsible{title="Tipp zu b)"}

Die Unterliste gehört **in** das `<li>`, zu dem sie gehört – vor dessen `</li>`:

```html
<li>Milch langsam dazugeben.
  <ol>
    <li>…</li>
  </ol>
</li>
```

::::

:::protect{password="web-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Aus Punkten werden Nummern. Der Inhalt der `<li>`-Elemente bleibt unverändert – man muss nur ein einziges Zeichen ändern. Inhaltlich ist es dann aber falsch: Bei Zutaten gibt es keine Reihenfolge.

b)

```html
<ol>
  <li>Mehl und Eier verrühren.</li>
  <li>Milch langsam dazugeben.
    <ol>
      <li>Erst die Hälfte, dann rühren.</li>
      <li>Dann den Rest.</li>
    </ol>
  </li>
  <li>Zehn Minuten ruhen lassen.</li>
</ol>
```

c) Für den Browser sind das zwei unabhängige Absätze, die zufällig mit einem Bindestrich anfangen. Der Zusammenhang existiert nur im Kopf der Leserin.

Die Folgen: Ein Vorleseprogramm sagt nicht „Liste mit drei Einträgen" an. Man kann die Liste nicht als Ganzes gestalten. Und die Bindestriche stehen im Text, statt aus der Darstellung zu kommen – wer sie durch Punkte ersetzen will, muss jede Zeile anfassen.

:::

## Tabellen

:::webide{id="web-2-3-tabelle" height="640px"}

```html
<table>
  <caption>Stundenplan Montag</caption>
  <thead>
    <tr>
      <th>Stunde</th>
      <th>Fach</th>
      <th>Raum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Informatik</td>
      <td>B204</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Mathematik</td>
      <td>A112</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Sport</td>
      <td>Halle</td>
    </tr>
  </tbody>
</table>
```

```css
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #999;
  padding: 0.4rem 0.8rem;
  text-align: left;
}
caption {
  font-weight: bold;
  margin-block-end: 0.5rem;
}
```

:::

:::snippet{#merken}
| Element | Bedeutung |
| --- | --- |
| `<table>` | die Tabelle |
| `<caption>` | die Beschriftung – sagt, worum es in der Tabelle geht |
| `<thead>` / `<tbody>` | Kopf- und Datenbereich |
| `<tr>` | eine Zeile (*table row*) |
| `<th>` | eine **Kopfzelle** (*table header*) |
| `<td>` | eine **Datenzelle** (*table data*) |

Der Unterschied zwischen `<th>` und `<td>` ist wichtiger, als er aussieht: Ein Vorleseprogramm nennt bei jeder Datenzelle die zugehörige Kopfzelle mit. Ohne `<th>` hört man nur „B204" und weiß nicht, dass das ein Raum ist.
:::

:::alert{warn}
Eine Tabelle ist für **Daten mit Zeilen und Spalten** da – Stundenpläne, Messreihen, Preislisten.

Sie ist **nicht** dafür da, Dinge nebeneinander anzuordnen. Dafür gibt es :t[CSS]{#css}, und du lernst es in [Kapitel 4](../04-css-gestalten/05-layout-mit-flexbox-und-grid). Layout mit Tabellen war in den 1990er Jahren üblich und ist heute ein Fehler: Auf einem Handy lässt sich eine solche Seite nicht umbrechen, und vorgelesen ergibt sie keinen Sinn.
:::

## Aufgabe

:::snippet{#aufgabe}
Baue im Übungsbereich zwei Dinge auf:

a) Eine **geordnete** Liste mit deinen drei nächsten Terminen.

b) Eine **Tabelle** mit drei Spalten (Fach, Lehrkraft, Raum) und mindestens drei Zeilen. Sie braucht eine `<caption>` und eine richtige Kopfzeile mit `<th>`.
:::

:::webide{id="web-2-3-uebung" height="300px"}

```html
<h2>Meine Termine</h2>


<h2>Meine Fächer</h2>


```

```css
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #999;
  padding: 0.4rem 0.8rem;
  text-align: left;
}
```

:::

:::protect{password="web-2-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```html
<h2>Meine Termine</h2>
<ol>
  <li>Montag: Mathearbeit</li>
  <li>Mittwoch: Handballtraining</li>
  <li>Freitag: Geburtstag von Nele</li>
</ol>

<h2>Meine Fächer</h2>
<table>
  <caption>Fächer im zweiten Halbjahr</caption>
  <thead>
    <tr>
      <th>Fach</th>
      <th>Lehrkraft</th>
      <th>Raum</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Informatik</td>
      <td>Frau Kern</td>
      <td>B204</td>
    </tr>
    <tr>
      <td>Mathematik</td>
      <td>Herr Adler</td>
      <td>A112</td>
    </tr>
    <tr>
      <td>Sport</td>
      <td>Frau Vogel</td>
      <td>Halle 2</td>
    </tr>
  </tbody>
</table>
```

Bei a) ist `<ol>` richtig, weil die Termine zeitlich aufeinanderfolgen. Bei einer Aufzählung deiner Hobbys wäre `<ul>` richtig.

:::

<!--
UV 10.2, Inhaltsfeld Formale Sprachen: Erstellung von Quelltexten.
Konkretisierte Kompetenzerwartung: erstellen HTML-Quelltexte (MI).
-->

---

## Selbsttest

::::multievent

**1. Wann nimmt man ol statt ul?**

{r1{wenn die Liste mehr als drei Einträge hat}}

{r1{!wenn die Reihenfolge der Einträge eine Bedeutung hat}}

{r1{wenn die Einträge nummeriert aussehen sollen}}

{r1{wenn die Liste verschachtelt ist}}

{h{Zutaten oder Arbeitsschritte – bei welchem der beiden kommt es auf die Reihenfolge an?}}
{H{Richtig. Wie es aussieht, ändert man später mit CSS.}}

**2. Welches Element darf direkt in einem ul stehen?**

{r2{p}}

{r2{!li}}

{r2{td}}

{r2{dt}}

{h{Alles andere gehört woandershin.}}
{H{Richtig – und eine verschachtelte Liste steht innerhalb eines li.}}

**3. Was unterscheidet th von td?**

{r3{th ist fett, td nicht}}

{r3{!th ist eine Kopfzelle und beschreibt, was in der Spalte oder Zeile steht}}

{r3{th steht immer in der ersten Zeile}}

{r3{es gibt keinen Unterschied}}

{h{Denk an jemanden, der sich die Tabelle vorlesen lässt.}}
{H{Richtig. Vorleseprogramme nennen zu jeder Datenzelle die Kopfzelle mit.}}

**4. Wozu dient caption?**

{r4{zur Beschriftung eines Bildes}}

{r4{!zur Beschriftung der Tabelle}}

{r4{für die Kopfzeile}}

{r4{für eine Fußnote}}

{h{Es steht direkt im table-Element.}}
{H{Richtig. Es sagt, worum es in der Tabelle geht.}}

**5. Warum baut man kein Layout mit Tabellen?** (Mehrfachauswahl)

{c1{!Auf kleinen Bildschirmen lässt sich so eine Seite nicht umbrechen.}}

{c1{!Vorgelesen ergibt die Reihenfolge keinen Sinn.}}

{c1{!Für Layout ist CSS da.}}

{c1{Tabellen funktionieren in modernen Browsern nicht mehr.}}

{h{Tabellen funktionieren einwandfrei – für das, wofür sie gedacht sind.}}
{H{Richtig. Das Problem ist der falsche Einsatz, nicht das Element.}}

**6. Warum sind drei Absätze mit Bindestrich keine Liste?**

{r5{Weil Bindestriche in HTML verboten sind.}}

{r5{!Weil der Zusammenhang nur optisch besteht, für den Browser aber nicht.}}

{r5{Weil Absätze keinen Text enthalten dürfen.}}

{r5{Weil es zu viel Tipparbeit ist.}}

{h{Was weiß der Browser über den Zusammenhang der drei Absätze?}}
{H{Richtig – nichts. Und deshalb kann auch kein Programm etwas damit anfangen.}}

::::
