---
title: Selektoren und Kaskade
index: 2
---

# Selektoren und Kaskade

Der Selektor entscheidet, **welche** Elemente eine Regel trifft. Und wenn mehrere Regeln dasselbe Element treffen, entscheidet die **Kaskade**, welche gewinnt.

## Die wichtigsten Selektoren

:::webide{id="web-4-2-selektoren" height="640px"}

```html
<h1 id="titel">Der Schulgarten</h1>

<p>Ein ganz normaler Absatz.</p>
<p class="hinweis">Ein Hinweis.</p>
<p class="hinweis wichtig">Ein wichtiger Hinweis.</p>

<section>
  <p>Ein Absatz in der section.</p>
  <div>
    <p>Ein Absatz im div in der section.</p>
  </div>
</section>

<a href="#titel">Ein Link</a>
```

```css
/* 1 Typ: alle Absätze */
p {
  margin-block: 0.5rem;
}

/* 2 Klasse: alle Elemente mit class="hinweis" */
.hinweis {
  color: hsl(210 70% 40%);
}

/* 3 Zwei Klassen am selben Element */
.hinweis.wichtig {
  font-weight: bold;
}

/* 4 id: genau ein Element */
#titel {
  color: hsl(140 60% 30%);
}

/* 5 Nachfahre: jedes p irgendwo in einer section */
section p {
  background: hsl(45 90% 92%);
}

/* 6 Kind: nur ein p direkt in der section */
section > p {
  border-inline-start: 3px solid hsl(45 70% 45%);
}

/* 7 Zustand: der Link, wenn die Maus darüber ist */
a:hover {
  color: hsl(0 70% 40%);
}
```

:::

:::snippet{#merken}
| Selektor | Trifft |
| --- | --- |
| `p` | alle `<p>`-Elemente |
| `.hinweis` | alle Elemente mit `class="hinweis"` |
| `#titel` | das eine Element mit `id="titel"` |
| `.hinweis.wichtig` | Elemente, die **beide** Klassen haben |
| `section p` | jedes `p`, das **irgendwo** in einer `section` steht |
| `section > p` | nur ein `p`, das **direkt** in der `section` steht |
| `a:hover` | den Link, während die Maus darauf zeigt |
| `h1, h2, h3` | alle drei – das Komma bedeutet „oder" |

Der Unterschied zwischen `section p` (Leerzeichen) und `section > p` (Pfeil) ist genau der zwischen **Nachfahre** und **Kind** aus [Kapitel 3](../03-quelltexte-analysieren/01-der-baum-hinter-der-seite).
:::

:::snippet{#aufgabe}
Sieh dir das Beispiel oben an und beantworte **ohne** auszuprobieren:

a) Wie viele Absätze bekommen den gelben Hintergrund?

b) Wie viele bekommen den Balken an der Seite?

c) Warum unterscheiden sich die beiden Zahlen?

Prüfe danach in der Vorschau.
:::

:::protect{password="web-4-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Zwei** – der Absatz direkt in der `section` und der im `div` darin. Beide sind Nachfahren.

b) **Einer** – nur der direkt in der `section`. Der im `div` ist ein Kind des `div`, nicht der `section`.

c) `section p` fragt: Steht irgendwo über mir eine `section`? `section > p` fragt: Ist mein **Elternelement** eine `section`?

:::

## Klasse oder id?

:::snippet{#merken}
| | `class` | `id` |
| --- | --- | --- |
| Wie oft je Seite? | beliebig oft | **genau einmal** |
| Wie viele je Element? | beliebig viele, mit Leerzeichen getrennt | eine |
| Wofür | zum Gestalten | zum eindeutigen Ansprechen, etwa als Sprungziel |

**Zum Gestalten nimmst du Klassen.** Eine `id` ist etwas so Starkes, dass sie später Ärger macht – und wenn eine `id` zweimal vorkommt, ist das :t[HTML]{#html} ungültig.
:::

:::snippet{#brain}
Klassennamen sollen sagen, **was** ein Element ist, nicht wie es aussieht.

| Schlecht | Gut |
| --- | --- |
| `.rot` | `.warnung` |
| `.gross` | `.seitentitel` |
| `.linke-spalte` | `.navigation` |

Der Grund: Wenn die Warnung eines Tages orange sein soll, heißt sie sonst `.rot` und ist orange. Wenn aus der linken Spalte eine obere Leiste wird, heißt sie `.linke-spalte` und steht oben.

Dasselbe Prinzip wie bei Variablennamen in Java: Der Name beschreibt die Bedeutung, nicht die zufällige aktuelle Ausprägung.
:::

## Wer gewinnt?

Mehrere Regeln treffen dasselbe Element. Was passiert?

:::webide{id="web-4-2-kaskade" height="330px"}

```html
<p class="hinweis" id="besonders">Welche Farbe habe ich?</p>
```

```css
p {
  color: blue;
}

.hinweis {
  color: green;
}

#besonders {
  color: orange;
}
```

:::

:::snippet{#aufgabe}
a) Sag voraus, welche Farbe der Absatz hat. Prüfe dann.

b) Vertausche die Reihenfolge der drei Regeln. Ändert sich etwas?

c) Lösche die `#besonders`-Regel. Welche Farbe jetzt?

d) Ergänze eine zweite Regel `p { color: purple; }` **unter** der ersten. Was passiert?
:::

:::protect{password="web-4-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Orange.** Die `id` gewinnt.

b) **Nichts.** Die Reihenfolge ist erst dann wichtig, wenn die Regeln gleich stark sind.

c) **Grün.** Die Klasse ist stärker als der Elementname.

d) Der Absatz wird **lila**. Beide Regeln sind gleich stark, also gewinnt die **spätere**.

:::

:::snippet{#definition}
Treffen mehrere Regeln dasselbe Element, entscheidet die **Kaskade** in dieser Reihenfolge:

1. **Spezifität** – wie genau spricht der Selektor das Element an?
   - `id` schlägt Klasse
   - Klasse schlägt Elementname
   - Elementname schlägt geerbten Wert
2. **Reihenfolge** – bei gleicher Spezifität gewinnt die **spätere** Regel.

Merkhilfe: Je genauer du hinzeigst, desto stärker deine Aussage. Und wenn zwei gleich genau hinzeigen, gilt das zuletzt Gesagte.
:::

:::alert{warn}
Es gibt noch `!important`, womit sich jede Regel erzwingen lässt:

```css
p { color: blue !important; }
```

**Finger weg.** Es ist der Notausgang für Fälle, in denen man fremdes :t[CSS]{#css} nicht ändern kann. Wer es im eigenen Projekt benutzt, hat meist nur ein zu spezifisches Selektorproblem – und braucht beim nächsten Mal ein zweites `!important`, um das erste zu überschreiben.

Der bessere Weg ist fast immer: einen einfacheren Selektor nehmen.
:::

## Vererbung

:::webide{id="web-4-2-vererbung" height="300px"}

```html
<body>
  <h1>Überschrift</h1>
  <section>
    <p>Ein Absatz mit einem <a href="#">Link</a> darin.</p>
  </section>
</body>
```

```css
body {
  font-family: system-ui, sans-serif;
  color: hsl(220 15% 25%);
  border: 3px solid hsl(220 15% 80%);
}
```

:::

:::snippet{#aufgabe}
a) Welche der drei Deklarationen wirken auch auf die Überschrift, den Absatz und den Link?

b) Der Link hat trotzdem eine andere Farbe. Warum?

c) Formuliere eine Regel, die auch den Link einfärbt.
:::

::::collapsible{title="Tipp zu b)"}

Jeder Browser bringt eigene Voreinstellungen mit. Sieh im Reiter *Elemente* unter *Styles* nach, woher die Linkfarbe kommt.

::::

:::protect{password="web-4-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `font-family` und `color` vererben sich nach unten. `border` **nicht** – der Rahmen erscheint nur um das `body`-Element.

Die Faustregel: Was mit **Text** zu tun hat, vererbt sich (`color`, `font-family`, `font-size`, `line-height`, `text-align`). Was mit der **Kiste** zu tun hat, nicht (`border`, `margin`, `padding`, `background`).

b) Der Browser hat für Links eine eigene eingebaute Regel. Und eine **eigene** Regel schlägt einen **geerbten** Wert immer – egal wie schwach sie ist.

c)

```css
a {
  color: hsl(280 60% 45%);
}
```

Eine eigene Regel für `a` überschreibt die eingebaute des Browsers, weil deine CSS-Datei später kommt.

:::

## Aufgabe

:::snippet{#aufgabe}
Schreibe CSS zu dem vorgegebenen HTML, sodass:

a) die ganze Seite eine serifenlose Schrift verwendet

b) alle Elemente mit der Klasse `warnung` rot und fett sind

c) nur die Listeneinträge **direkt** in der Navigation nebeneinander stehen (Tipp: `display: inline;`)

d) Links beim Überfahren mit der Maus die Farbe wechseln
:::

:::webide{id="web-4-2-uebung" height="460px"}

```html
<nav>
  <ul>
    <li><a href="#a">Start</a></li>
    <li><a href="#b">Garten</a></li>
    <li><a href="#c">Kontakt</a></li>
  </ul>
</nav>

<main>
  <h1>Der Schulgarten</h1>
  <p>Wir treffen uns dienstags.</p>
  <p class="warnung">Achtung: Das Beet ist frisch gedüngt.</p>
  <ul>
    <li>Tomaten</li>
    <li>Basilikum</li>
  </ul>
</main>
```

```css

```

:::

::::collapsible{title="Tipp 1: zu c)"}

Die Einträge in `<main>` sollen **nicht** nebeneinander stehen. Dein Selektor muss also die Navigation nennen: `nav li`.

::::

::::collapsible{title="Tipp 2: zu d)"}

Der Zustand hängt mit einem Doppelpunkt am Selektor: `a:hover { … }`.

::::

:::protect{password="web-4-2-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```css
body {
  font-family: system-ui, sans-serif;
}

.warnung {
  color: hsl(0 70% 40%);
  font-weight: bold;
}

nav li {
  display: inline;
  margin-inline-end: 1rem;
}

a:hover {
  color: hsl(140 60% 30%);
}
```

Zu a): `font-family` am `body` genügt, weil sich Schriftarten vererben. Man muss sie nicht bei jedem Element wiederholen.

Zu c): Ohne `nav` vor dem `li` würden auch Tomaten und Basilikum nebeneinander stehen. Probier es aus – so siehst du, wozu Nachfahrenselektoren gut sind.

:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: formatieren Webseiten mit CSS (MI).
Übergeordnet MI: strukturieren und zerlegen - Klassen als Mittel der
Wiederverwendung.
-->

---

## Selbsttest

::::multievent

**1. Was trifft der Selektor section p?**

{r1{nur die Absätze direkt in der section}}

{r1{!alle Absätze irgendwo in einer section}}

{r1{alle sections in einem Absatz}}

{r1{alle Absätze der Seite}}

{h{Das Leerzeichen bedeutet Nachfahre.}}
{H{Richtig. Für nur die direkten Kinder nimmt man den Pfeil.}}

**2. Wie oft darf dieselbe id auf einer Seite vorkommen?**

{z{1}}

{h{Sonst ist das HTML ungültig.}}
{H{Richtig. Für mehrfach genutzte Gestaltung nimmt man Klassen.}}

**3. Ein Element wird von einer Typ-, einer Klassen- und einer id-Regel getroffen. Welche gewinnt?**

{r2{die Typ-Regel}}

{r2{die Klassen-Regel}}

{r2{!die id-Regel}}

{r2{die zuletzt geschriebene}}

{h{Je genauer der Selektor hinzeigt, desto stärker.}}
{H{Richtig. Die Reihenfolge zählt erst bei gleicher Stärke.}}

**4. Zwei gleich starke Regeln widersprechen sich. Welche gewinnt?**

{r3{die erste}}

{r3{!die spätere}}

{r3{beide werden verworfen}}

{r3{das ist zufällig}}

{h{Wie bei einem Gespräch: Es gilt das zuletzt Gesagte.}}
{H{Richtig.}}

**5. Welche Eigenschaften vererben sich auf Nachfahren?** (Mehrfachauswahl)

{c1{!color}}

{c1{!font-family}}

{c1{border}}

{c1{padding}}

{h{Was mit Text zu tun hat, vererbt sich – was mit der Kiste zu tun hat, nicht.}}
{H{Richtig.}}

**6. Warum ist der Klassenname „rot" eine schlechte Wahl?**

{r4{Weil Farben keine Klassennamen sein dürfen.}}

{r4{!Weil er das Aussehen beschreibt und beim Umgestalten nicht mehr stimmt.}}

{r4{Weil er zu kurz ist.}}

{r4{Weil er nur auf Text wirkt.}}

{h{Was, wenn die Warnung eines Tages orange sein soll?}}
{H{Richtig. Ein Klassenname beschreibt die Bedeutung.}}

::::
