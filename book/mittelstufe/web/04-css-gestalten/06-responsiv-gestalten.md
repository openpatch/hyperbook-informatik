---
title: Für jeden Bildschirm gestalten
index: 6
---

# Für jeden Bildschirm gestalten

Deine Seite wird auf einem Handy gelesen, auf einem Tablet, auf einem großen Bildschirm – und vielleicht vorgelesen. Sie muss überall funktionieren. Das nennt man **responsiv**.

## Die Grundlage: nichts festnageln

:::snippet{#merken}
Die meiste Arbeit erledigt sich von selbst, wenn man **keine festen Breiten** vorgibt. Ein `<p>` ohne jede :t[CSS]{#css}-Regel ist bereits responsiv – es füllt den vorhandenen Platz und bricht um.

Vier Regeln, die fast immer richtig sind:

```css
* { box-sizing: border-box; }

img { max-width: 100%; height: auto; }

body { max-width: 70rem; margin-inline: auto; padding: 1rem; }
```

- `max-width` statt `width` – so wird es bei wenig Platz schmaler statt überzustehen
- Bilder nie breiter als ihr Platz
- Innenabstand am `body`, damit der Text auf dem Handy nicht am Rand klebt
:::

## Mit der Größe rechnen

:::webide{id="web-4-6-clamp" height="330px"}

```html
<h1>Diese Überschrift wächst mit</h1>
<p>Verschiebe die Trennlinie zwischen Vorschau und Editor und beobachte
die Überschrift und die Abstände.</p>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  padding: clamp(1rem, 4vw, 3rem);
  line-height: 1.6;
}

h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

:::

:::snippet{#definition}
`clamp(kleinster, gewünschter, größter)` klemmt einen Wert zwischen zwei Grenzen ein.

`clamp(1.5rem, 5vw, 3rem)` bedeutet: „Nimm 5 % der Fensterbreite – aber nie weniger als 1.5rem und nie mehr als 3rem."

Damit wächst die Schrift mit dem Bildschirm, ohne auf dem Handy unlesbar klein und auf dem Fernseher absurd groß zu werden. Und man braucht dafür keine einzige Fallunterscheidung.
:::

## Fallunterscheidungen: Media Queries

Manches lässt sich nicht rechnen. Dann fragt man nach der Fensterbreite.

:::webide{id="web-4-6-media" height="640px"}

```html
<div class="seite">
  <header>Kopfbereich</header>
  <nav>Navigation</nav>
  <main>Hauptinhalt</main>
  <footer>Fußbereich</footer>
</div>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

.seite {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

header { background: hsl(210 60% 80%); }
nav    { background: hsl(140 40% 82%); }
main   { background: hsl(45 80% 85%); }
footer { background: hsl(0 40% 85%); }

header, nav, main, footer {
  padding: 1rem;
  border-radius: 0.5rem;
}

@media (min-width: 45rem) {
  .seite {
    grid-template-columns: 12rem 1fr;
  }
  header, footer {
    grid-column: 1 / -1;
  }
}
```

:::

:::snippet{#merken}
```css
@media (min-width: 45rem) {
  /* gilt nur, wenn das Fenster mindestens 45rem breit ist */
}
```

Eine **Media Query** ist eine Bedingung. Die Regeln darin gelten nur, wenn sie erfüllt ist – so wie ein `if` in Java.

**Schreib von schmal nach breit.** Also zuerst die Regeln für kleine Bildschirme, dann mit `min-width` die Ergänzungen für größere. Man nennt das *mobile first*.

Der Grund: Auf einem schmalen Bildschirm ist einfach alles untereinander – das ist der einfachste Fall und der Ausgangszustand von :t[HTML]{#html}. Alles Weitere kommt hinzu, wenn Platz da ist.
:::

:::snippet{#aufgabe}
a) Verschiebe die Trennlinie langsam. An welcher Stelle springt das Layout um?

b) Ändere `45rem` auf `30rem`. Was ändert sich?

c) Schreibe die Media Query um: Sie soll `max-width` statt `min-width` benutzen und dasselbe Ergebnis liefern. Warum ist die `min-width`-Fassung trotzdem die bessere?
:::

:::protect{password="web-4-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Bei 45rem, also bei 720 Pixeln, wenn die Grundschriftgröße bei 16 Pixeln liegt.

b) Der Umbruch passiert früher – die zweispaltige Fassung erscheint schon bei schmaleren Fenstern.

c) Mit `max-width` müsste man die Grundregeln umdrehen:

```css
.seite {
  display: grid;
  grid-template-columns: 12rem 1fr;
}
header, footer { grid-column: 1 / -1; }

@media (max-width: 44.99rem) {
  .seite { grid-template-columns: 1fr; }
  header, footer { grid-column: auto; }
}
```

Das ist aus drei Gründen schlechter:

- Man muss Regeln wieder **zurücknehmen** statt hinzuzufügen – das ist fehleranfälliger.
- Der krumme Wert `44.99rem` ist nötig, damit sich die beiden Bereiche nicht überlappen.
- Ein alter oder sehr schmaler Browser bekommt im Zweifel das **komplizierte** Layout statt des einfachen.

:::

## Was der Browser sonst noch weiß

:::webide{id="web-4-6-schema" height="640px"}

```html
<article class="karte">
  <h2>Helles und dunkles Design</h2>
  <p>Stell in deinem Betriebssystem auf dunkles Design um und lade
  diese Seite neu.</p>
</article>
```

```css
* { box-sizing: border-box; }

:root {
  color-scheme: light dark;
  --hintergrund: white;
  --text: hsl(220 15% 20%);
  --rahmen: hsl(220 20% 80%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --hintergrund: hsl(220 15% 15%);
    --text: hsl(220 15% 92%);
    --rahmen: hsl(220 15% 35%);
  }
}

body {
  font-family: system-ui, sans-serif;
  background: var(--hintergrund);
  color: var(--text);
  padding: 1rem;
  margin: 0;
}

.karte {
  border: 1px solid var(--rahmen);
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 40rem;
}
```

:::

:::snippet{#brain}
`prefers-color-scheme` fragt nach der Einstellung des Betriebssystems. Es gibt noch mehr solcher Fragen:

| Abfrage | Bedeutung |
| --- | --- |
| `prefers-reduced-motion` | Jemand hat Animationen abgeschaltet – oft wegen Übelkeit bei Bewegung. |
| `print` | Die Seite wird gedruckt. |
| `hover: none` | Das Gerät kennt kein Überfahren mit der Maus, also ein Touchscreen. |

Bemerkenswert daran: Der Browser weiß Dinge über die **Person vor dem Bildschirm** und ihre Bedürfnisse – und du kannst darauf eingehen, ohne irgendetwas über sie zu erfahren. Die Seite fragt nicht „wer bist du", sondern „was brauchst du".

Beachte auch, wie wenig Arbeit die eigenen Eigenschaften aus [Lektion 3](./03-farben-schrift-und-variablen) hier machen: Für das dunkle Design mussten nur drei Werte neu gesetzt werden, nicht jede einzelne Regel.
:::

## Aufgabe

:::snippet{#aufgabe}
Baue eine Kartenübersicht, die sich anpasst:

a) Die Karten sollen in einem Raster liegen, das von selbst so viele Spalten macht, wie bei mindestens 14rem Breite hineinpassen.

b) Der Abstand zwischen den Karten soll zwischen 0.5rem und 2rem mit der Fensterbreite wachsen.

c) Die Überschrift soll zwischen 1.5rem und 2.5rem mitwachsen.

d) Ab 50rem Fensterbreite soll die Seite höchstens 60rem breit und zentriert sein.
:::

:::webide{id="web-4-6-uebung" height="350px"}

```html
<h1>Unsere Pflanzen</h1>
<div class="karten">
  <article><h2>Tomaten</h2><p>Brauchen viel Sonne.</p></article>
  <article><h2>Basilikum</h2><p>Mag es warm.</p></article>
  <article><h2>Erdbeeren</h2><p>Tragen im Juni.</p></article>
  <article><h2>Minze</h2><p>Wuchert gern.</p></article>
</div>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

.karten article {
  background: hsl(140 40% 92%);
  border-radius: 0.5rem;
  padding: 1rem;
}
```

:::

::::collapsible{title="Tipp 1: zu a)"}

Die Zeile kennst du aus [Lektion 5](./05-layout-mit-flexbox-und-grid) – nur mit einer anderen Mindestbreite.

::::

::::collapsible{title="Tipp 2: zu b) und c)"}

`gap` und `font-size` vertragen beide ein `clamp(…)`.

::::

:::protect{password="web-4-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

h1 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
}

.karten {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: clamp(0.5rem, 2vw, 2rem);
}

.karten article {
  background: hsl(140 40% 92%);
  border-radius: 0.5rem;
  padding: 1rem;
}

@media (min-width: 50rem) {
  body {
    max-width: 60rem;
    margin-inline: auto;
  }
}
```

Beachte, wie wenig Media Queries nötig waren: nur **eine**. Spaltenzahl, Abstand und Schriftgröße regeln sich über `auto-fit` und `clamp` von selbst.

Das ist die Faustregel für responsives Gestalten: **Erst versuchen, es ohne Fallunterscheidung zu lösen.** Eine Media Query ist die letzte, nicht die erste Wahl.

:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: formatieren Webseiten mit CSS (MI).
prefers-color-scheme und prefers-reduced-motion bereiten zugleich Kapitel 5
vor (Verantwortung gegenüber den Nutzenden).
-->

---

## Selbsttest

::::multievent

**1. Was bedeutet clamp(1.5rem, 5vw, 3rem)?**

{r1{immer genau 5 Prozent der Fensterbreite}}

{r1{!5 Prozent der Fensterbreite, aber nie unter 1.5rem und nie über 3rem}}

{r1{einen zufälligen Wert dazwischen}}

{r1{1.5rem auf kleinen und 3rem auf großen Bildschirmen}}

{h{Die drei Werte sind Untergrenze, Wunschwert und Obergrenze.}}
{H{Richtig – und man braucht dafür keine Fallunterscheidung.}}

**2. Was ist mobile first?**

{r2{eine Seite nur für Handys}}

{r2{!zuerst für schmale Bildschirme schreiben und dann per min-width ergänzen}}

{r2{Handynutzer bevorzugt behandeln}}

{r2{eine App statt einer Webseite}}

{h{Welcher Fall ist der einfachere – alles untereinander oder mehrspaltig?}}
{H{Richtig. Man fügt hinzu, statt zurückzunehmen.}}

**3. Warum nimmt man max-width statt width?**

{r3{weil width nicht mehr funktioniert}}

{r3{!weil ein Element bei wenig Platz dann schmaler wird, statt überzustehen}}

{r3{weil max-width genauer ist}}

{r3{weil width nur bei Bildern erlaubt ist}}

{h{Was passiert mit width: 30rem auf einem schmalen Handy?}}
{H{Richtig – dann muss man seitlich scrollen.}}

**4. Welche zwei Zeilen sorgen dafür, dass Bilder nie überstehen?**

{r4{width: 100% und height: 100%}}

{r4{!max-width: 100% und height: auto}}

{r4{max-height: 100% und width: auto}}

{r4{object-fit: cover}}

{h{Die zweite Zeile erhält das Seitenverhältnis.}}
{H{Richtig – diese zwei Zeilen gehören in fast jedes Projekt.}}

**5. Wonach fragt prefers-color-scheme?**

{r5{nach der Uhrzeit}}

{r5{!nach der Einstellung für helles oder dunkles Design}}

{r5{nach der Bildschirmgröße}}

{r5{nach dem Browser}}

{h{Die Einstellung kommt aus dem Betriebssystem.}}
{H{Richtig – die Seite fragt nicht, wer jemand ist, sondern was er braucht.}}

**6. Was sollte man zuerst versuchen, bevor man eine Media Query schreibt?**

{r6{eine feste Breite setzen}}

{r6{!eine Lösung, die sich von selbst anpasst, etwa mit auto-fit oder clamp}}

{r6{zwei getrennte Seiten bauen}}

{r6{JavaScript einsetzen}}

{h{In der letzten Aufgabe war nur eine einzige Media Query nötig.}}
{H{Richtig. Eine Fallunterscheidung ist die letzte, nicht die erste Wahl.}}

::::
