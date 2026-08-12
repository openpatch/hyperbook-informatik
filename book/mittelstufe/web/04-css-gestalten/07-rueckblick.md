---
title: Rückblick
index: 7
---

# Rückblick

Sechs Lektionen, ein Werkzeug: :t[CSS]{#css}. Wenn du dieses Kapitel im Griff hast, kannst du jede Seite gestalten, die du dir vornimmst – der Rest ist Nachschlagen.

## Das kann ich jetzt

- [ ] Ich kann CSS auf **drei Wegen** einbinden und begründen, warum die eigene Datei der richtige ist. ([4.1](./01-css-einbinden))
- [ ] Ich kann Elemente über **Typ, Klasse, id, Nachfahre und Kind** gezielt ansprechen. ([4.2](./02-selektoren-und-kaskade))
- [ ] Ich kann vorhersagen, **welche Regel gewinnt**, wenn mehrere auf dasselbe Element passen. ([4.2](./02-selektoren-und-kaskade))
- [ ] Ich kann erklären, was sich **vererbt** und was nicht. ([4.2](./02-selektoren-und-kaskade))
- [ ] Ich kann Farben in `hsl` angeben und wiederkehrende Werte als **eigene Werte** (`--name`) ablegen. ([4.3](./03-farben-schrift-und-variablen))
- [ ] Ich kann die vier Schichten des **Boxmodells** benennen und die Gesamtbreite einer Box ausrechnen. ([4.4](./04-das-boxmodell))
- [ ] Ich weiß, was `box-sizing: border-box` ändert und warum die Regel an den Anfang gehört. ([4.4](./04-das-boxmodell))
- [ ] Ich kann entscheiden, ob eine Anordnung **Flexbox** oder **Grid** verlangt, und beides aufsetzen. ([4.5](./05-layout-mit-flexbox-und-grid))
- [ ] Ich kann eine Seite so bauen, dass sie auf **jedem Bildschirm** funktioniert – ohne feste Breiten, mit `max-width` und Media Queries. ([4.6](./06-responsiv-gestalten))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Wer gewinnt?**

```html
<main>
  <p>Erster Absatz</p>
  <p class="hinweis">Zweiter Absatz</p>
  <section>
    <p class="hinweis">Dritter Absatz</p>
  </section>
</main>
```

```css
p { color: black; }
main p { color: teal; }
.hinweis { color: orange; }
main > p { color: red; }
section .hinweis { color: green; }
```

a) Sag für **jeden** der drei Absätze voraus, welche Farbe er bekommt. Schreib dazu, welche Regeln jeweils überhaupt passen.

b) Prüfe deine Vorhersage im Übungsbereich.

c) Beim ersten Absatz passen zwei Regeln mit **gleicher** Stärke. Welche gewinnt, und warum?

d) Ergänze `main { color: purple; }`. Ändert sich etwas? Begründe mit dem Wort *Vererbung*.
:::

:::webide{id="web-4-7-kaskade" height="420px"}

```html
<main>
  <p>Erster Absatz</p>
  <p class="hinweis">Zweiter Absatz</p>
  <section>
    <p class="hinweis">Dritter Absatz</p>
  </section>
</main>
```

```css
p { color: black; }
main p { color: teal; }
.hinweis { color: orange; }
main > p { color: red; }
section .hinweis { color: green; }
```

:::

::::collapsible{title="Tipp: In welcher Reihenfolge prüfe ich?"}

Frag der Reihe nach:

1. Welche Regeln **passen** überhaupt auf dieses Element?
2. Ist eine davon stärker? Eine Klasse schlägt jeden Elementnamen, egal wie viele.
3. Sind zwei gleich stark – wer steht weiter unten?

::::

:::protect{password="web-4-7-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

**Erster Absatz** – es passen `p`, `main p` und `main > p`. `main p` und `main > p` sind gleich stark (je ein Elementname mehr als `p`); der Pfeil ändert an der Stärke nichts. Also entscheidet die Reihenfolge: **rot**.

**Zweiter Absatz** – es passen `p`, `main p`, `.hinweis` und `main > p`. Eine **Klasse** ist stärker als jede Zahl von Elementnamen: **orange**.

**Dritter Absatz** – er steht in einer `section`, also greift `main > p` nicht mehr (kein direktes Kind). Es passen `p`, `main p`, `.hinweis` und `section .hinweis`. Die letzte ist die stärkste, weil sie eine Klasse **und** einen Elementnamen mitbringt: **grün**.

c) Bei gleicher Stärke gewinnt die Regel, die **weiter unten** in der Datei steht – hier `main > p`. Das ist die Notbremse der Kaskade und der Grund, warum die Reihenfolge in einer CSS-Datei nicht beliebig ist.

d) Für die drei Absätze ändert sich **nichts**. Vererbung ist das schwächste Mittel überhaupt: Ein geerbter Wert kommt erst zum Zug, wenn auf das Element selbst **keine** Regel passt. Hier passt auf jeden Absatz mindestens eine. Sichtbar würde `purple` erst bei Text, der direkt im `main` steht.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Rechnen und begründen**

a) Eine Box hat `width: 300px`, `padding: 16px`, `border: 2px` und `margin: 24px`. Wie breit ist sie **auf dem Bildschirm**, und wie viel Platz beansprucht sie insgesamt?

b) Dieselbe Box bekommt zusätzlich `box-sizing: border-box`. Wie breit ist der Inhaltsbereich jetzt?

c) In einem Stylesheet steht:

```css
.karte {
  width: 400px;
}
```

Nenne den Nachteil und schreib die Zeile so um, dass die Karte auf einem schmalen Handy nicht überläuft.

d) Was ist an dieser Media Query unklug?

```css
@media (max-width: 30rem) {
  .navigation { flex-direction: column; }
}
```
:::

::::collapsible{title="Tipp zu d)"}

Erinnere dich an die Empfehlung *mobile first*. In welcher Richtung soll man Media Queries schreiben – und was heißt das für `max-width` gegenüber `min-width`?

::::

:::protect{password="web-4-7-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Sichtbar ist die Box **336 px** breit: 300 Inhalt + 2 · 16 Polster + 2 · 2 Rahmen. Mit den Außenabständen beansprucht sie **384 px** Platz: 336 + 2 · 24. Der `margin` gehört nicht zur Box selbst, deshalb zählt er getrennt.

b) Dann sind die 300 px die **ganze** Box. Für den Inhalt bleiben 300 − 32 − 4 = **264 px**.

c) `width: 400px` ist eine feste Breite. Auf einem Bildschirm, der schmaler ist, ragt die Karte hinaus und die ganze Seite lässt sich seitwärts schieben. Besser:

```css
.karte {
  max-width: 400px;
}
```

`max-width` heißt „höchstens" – ist weniger Platz da, wird die Karte schmaler.

d) Sie ist **von breit nach schmal** gedacht: Die Grundregel gilt für große Bildschirme, der Sonderfall wird für kleine nachgereicht. Üblich ist der umgekehrte Weg – die einfache Form (untereinander) als Grundregel, und mit `min-width` die Reihe für breite Bildschirme:

```css
.navigation { flex-direction: column; }

@media (min-width: 30rem) {
  .navigation { flex-direction: row; }
}
```

So funktioniert die Seite auch auf einem Gerät, dessen Bildschirmbreite gar nicht erkannt wird – und das ist der Sinn von *mobile first*.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Eine Seite fertig gestalten**

Im Übungsbereich steht ein fertig ausgezeichnetes HTML – ohne eine einzige CSS-Regel. Gestalte es.

a) Beginne mit den Grundregeln: `box-sizing` für alle Elemente, eine lesbare Schrift, ein Zeilenabstand um 1.6.

b) Lege in `:root` mindestens **drei** eigene Werte an: zwei Farben und einen Abstand. Benutze sie danach überall – im ganzen Stylesheet soll keine Farbe zweimal ausgeschrieben stehen.

c) Der Inhalt soll höchstens 60rem breit und zentriert sein.

d) Die Navigation im `header` wird eine **Reihe** mit Abstand zwischen den Punkten und ohne Aufzählungszeichen.

e) Die drei Karten im `main` werden ein **Raster**, das von selbst umbricht: so viele Spalten, wie hineinpassen, jede mindestens 14rem breit.

f) Auf schmalen Bildschirmen soll die Navigation untereinander stehen. Schreib die Media Query von schmal nach breit.
:::

::::collapsible{title="Tipp 1: Reihenfolge"}

Arbeite von außen nach innen und von allgemein nach speziell:

1. `*` und `body` – die Grundlagen
2. `:root` – die eigenen Werte
3. `header`, `nav`, `main`, `footer` – die Bereiche
4. `.karte` – die Einzelheiten
5. ganz zum Schluss die Media Query

::::

::::collapsible{title="Tipp 2: Die Navigation"}

Eine Navigation ist eine Liste. Zwei Dinge sind dafür nötig:

```css
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
}
```

`list-style: none` nimmt die Punkte weg, `padding: 0` die Einrückung, die Listen von Haus aus haben.

::::

::::collapsible{title="Tipp 3: Das Kartenraster"}

Das ist die eine Zeile aus [Lektion 4.5](./05-layout-mit-flexbox-und-grid), die du dir merken solltest:

```css
.karten {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}
```

::::

:::webide{id="web-4-7-projekt" height="640px"}

```html
<header>
  <h1>Schulgarten-AG</h1>
  <nav>
    <ul>
      <li><a href="#">Start</a></li>
      <li><a href="#">Termine</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>

<main>
  <p>Wir pflegen die Beete hinter der Turnhalle. Mitmachen kann jede und jeder.</p>
  <div class="karten">
    <article class="karte">
      <h2>Beete</h2>
      <p>Umgraben, saeen, giessen.</p>
    </article>
    <article class="karte">
      <h2>Kraeuter</h2>
      <p>Ernte fuer die Mensa.</p>
    </article>
    <article class="karte">
      <h2>Insekten</h2>
      <p>Wir bauen ein Insektenhotel.</p>
    </article>
  </div>
</main>

<footer>
  <p>Garten-AG der Gesamtschule Musterstadt</p>
</footer>
```

```css

```

:::

:::protect{password="web-4-7-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```css
* {
  box-sizing: border-box;
}

:root {
  --gruen: hsl(140 55% 28%);
  --gruen-hell: hsl(140 45% 95%);
  --abstand: 1rem;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: var(--abstand);
  max-width: 60rem;
  margin-inline: auto;
}

header {
  border-bottom: 2px solid var(--gruen);
  margin-bottom: var(--abstand);
}

h1 {
  color: var(--gruen);
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--abstand);
}

nav a {
  color: var(--gruen);
}

.karten {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: var(--abstand);
  margin-block: var(--abstand);
}

.karte {
  background: var(--gruen-hell);
  border-radius: 0.5rem;
  padding: var(--abstand);
}

.karte h2 {
  margin-top: 0;
  color: var(--gruen);
}

footer {
  border-top: 1px solid var(--gruen);
  padding-top: var(--abstand);
  color: hsl(0 0% 35%);
}

@media (min-width: 35rem) {
  nav ul {
    flex-direction: row;
  }
}
```

Prüfe deine eigene Lösung an diesen Fragen:

- Steht irgendeine Farbe zweimal ausgeschrieben da? Dann gehört sie nach `:root`.
- Steht irgendwo eine feste `width` in Pixeln? Dann sieh nach, ob `max-width` reicht.
- Zieh die Trennlinie zwischen Vorschau und Editor ganz nach links: Bricht das Kartenraster sauber um, oder ragt etwas hinaus?
- Steht die Media Query am **Ende** und benutzt sie `min-width`?

:::

<!--
Rückblick zu UV 10.2, Inhaltsfeld Formale Sprachen und Informatiksysteme.
Bündelt die konkretisierte Kompetenzerwartung "formatieren Webseiten mit CSS"
(MI); Aufgabe 1 zielt auf das Analysieren von Quelltexten (A/DI).
-->

---

## Selbsttest

::::multievent

**1. Auf ein Element passen die Regeln p und .hinweis. Welche gewinnt?**

{r1{p, weil sie zuerst steht}}

{r1{!.hinweis, weil eine Klasse stärker ist als ein Elementname}}

{r1{die kürzere}}

{r1{beide zur Hälfte}}

{h{Klasse schlägt Elementname – unabhängig von der Reihenfolge.}}
{H{Richtig. Erst bei gleicher Stärke entscheidet die Reihenfolge.}}

**2. Zwei Regeln sind gleich stark und setzen dieselbe Eigenschaft. Welche gewinnt?**

{r2{die erste}}

{r2{!die letzte}}

{r2{die mit dem kürzeren Selektor}}

{r2{keine von beiden}}

{h{Die Kaskade arbeitet die Datei von oben nach unten ab.}}
{H{Richtig.}}

**3. Was ist der Unterschied zwischen section p und section > p?**

{r3{Es gibt keinen.}}

{r3{!Der Pfeil trifft nur direkte Kinder, das Leerzeichen alle Nachfahren.}}

{r3{Der Pfeil trifft alle Nachfahren, das Leerzeichen nur Kinder.}}

{r3{Der Pfeil ist die stärkere Regel.}}

{h{Es ist genau der Unterschied zwischen Kind und Nachfahre aus Kapitel 3.}}
{H{Richtig – und an der Stärke ändert der Pfeil nichts.}}

**4. Eine Box hat width 300px, padding 16px und border 2px, ohne border-box. Wie breit ist sie sichtbar?**

{z{336}}

{h{300 plus zweimal 16 plus zweimal 2.}}
{H{Richtig.}}

**5. Wofür nimmt man Flexbox, wofür Grid? Wähle die richtigen Aussagen.**

{c1{!Flexbox ordnet in eine Richtung an.}}

{c1{!Grid denkt in Zeilen und Spalten.}}

{c1{!Eine Navigation ist ein Fall für Flexbox.}}

{c1{Grid funktioniert nur mit fester Spaltenzahl.}}

{c1{Beides lässt sich nicht kombinieren.}}

{h{Faustregel: eine Richtung oder zwei?}}
{H{Richtig – und ein Grid-Feld darf innen durchaus eine Flexbox sein.}}

**6. Welche Zeile macht ein Raster, das von selbst umbricht?**

{r4{grid-template-columns: 3;}}

{r4{!grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));}}

{r4{display: grid-wrap;}}

{r4{columns: auto;}}

{h{Gesucht ist: so viele Spalten wie hineinpassen, jede mit Mindestbreite.}}
{H{Richtig.}}

**7. Warum schreibt man Media Queries von schmal nach breit?**

{r5{Weil max-width nicht überall funktioniert.}}

{r5{!Weil dann die einfache Darstellung die Grundregel ist und Ergänzungen nur dort greifen, wo Platz da ist.}}

{r5{Weil Handys älter sind als Bildschirme.}}

{r5{Weil min-width schneller ist.}}

{h{Was passiert, wenn ein Gerät die Media Query gar nicht auswertet? Welche Darstellung bleibt dann übrig?}}
{H{Richtig – das ist der Kern von mobile first.}}

**8. Wo legt man eigene Werte wie eine Hausfarbe sinnvollerweise an?**

{r6{in jeder Regel neu}}

{r6{!einmal in :root und danach überall mit var()}}

{r6{im HTML als Attribut}}

{r6{in einer Media Query}}

{h{Sie sollen für die ganze Seite gelten.}}
{H{Richtig – dann ändert man die Farbe später an genau einer Stelle.}}

::::
