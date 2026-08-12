---
title: Layout mit Flexbox und Grid
index: 5
---

# Layout mit Flexbox und Grid

Bis hierher stand alles untereinander. Für alles andere gibt es zwei Werkzeuge – eines für **eine Reihe**, eines für **ein Raster**.

## Flexbox: eine Reihe

:::webide{id="web-4-5-flex" height="580px"}

```html
<nav>
  <a href="#">Start</a>
  <a href="#">Garten</a>
  <a href="#">Termine</a>
  <a href="#">Kontakt</a>
</nav>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  background: hsl(210 60% 35%);
  padding: 1rem;
  border-radius: 0.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: hsl(210 60% 45%);
}
```

:::

:::snippet{#merken}
`display: flex` am **Elternelement** ordnet dessen Kinder in einer Reihe an. Danach steuerst du sie mit:

| Eigenschaft | Wirkung |
| --- | --- |
| `gap` | Abstand zwischen den Kindern |
| `justify-content` | Verteilung **entlang** der Reihe |
| `align-items` | Ausrichtung **quer** zur Reihe |
| `flex-wrap: wrap` | erlaubt den Umbruch in mehrere Zeilen |
| `flex-direction: column` | ordnet untereinander statt nebeneinander an |

Wichtig: Die Eigenschaften stehen am **Container**, nicht an den Kindern.
:::

:::webide{id="web-4-5-justify" height="540px"}

```html
<div class="leiste">
  <span>Links</span>
  <span>Mitte</span>
  <span>Rechts</span>
</div>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

.leiste {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: hsl(45 90% 88%);
  padding: 1rem;
  min-height: 6rem;
}

.leiste span {
  background: hsl(45 70% 60%);
  padding: 0.5rem 1rem;
}
```

:::

:::snippet{#aufgabe}
Probiere für `justify-content` nacheinander diese Werte aus und beschreibe jeweils in einem Satz, was passiert:

`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`

Probiere danach für `align-items`: `stretch`, `center`, `flex-start`, `flex-end`.
:::

::::collapsible{title="Tipp: Ich sehe keinen Unterschied"}

Ändere immer nur **einen** Wert und sieh sofort in die Vorschau.

Wenn sich bei `justify-content` gar nichts tut, ist meist kein Platz übrig: Die Eigenschaft verteilt den **freien** Raum in der Reihe. Zieh die Trennlinie zwischen Vorschau und Editor nach rechts, damit die Leiste breiter wird – dann werden die Unterschiede sichtbar.

::::

:::protect{password="web-4-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

`justify-content` verteilt **entlang** der Reihe, also hier waagerecht:

| Wert | Wirkung |
| --- | --- |
| `flex-start` | alle links, der übrige Platz bleibt rechts |
| `center` | alle in der Mitte |
| `flex-end` | alle rechts |
| `space-between` | erstes ganz links, letztes ganz rechts, Rest gleichmäßig dazwischen |
| `space-around` | jedes bekommt links und rechts gleich viel Platz – außen wirkt es dadurch halb so groß |
| `space-evenly` | alle Lücken gleich groß, auch die außen |

`align-items` richtet **quer** zur Reihe aus, also hier senkrecht:

| Wert | Wirkung |
| --- | --- |
| `stretch` | die Kästchen werden so hoch wie die Leiste (Voreinstellung) |
| `center` | mittig auf halber Höhe |
| `flex-start` | oben |
| `flex-end` | unten |

**Die Merkregel:** `justify` in Laufrichtung, `align` quer dazu.

:::

## Grid: ein Raster

:::webide{id="web-4-5-grid" height="560px"}

```html
<div class="karten">
  <article><h3>Tomaten</h3><p>Brauchen viel Sonne.</p></article>
  <article><h3>Basilikum</h3><p>Mag es warm.</p></article>
  <article><h3>Erdbeeren</h3><p>Tragen im Juni.</p></article>
  <article><h3>Radieschen</h3><p>Sind schnell reif.</p></article>
  <article><h3>Minze</h3><p>Wuchert gern.</p></article>
</div>
```

```css
* { box-sizing: border-box; }

body {
  font-family: system-ui, sans-serif;
  padding: 1rem;
}

.karten {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}

.karten article {
  background: hsl(140 40% 92%);
  border-radius: 0.5rem;
  padding: 1rem;
}

.karten h3 {
  margin-block-start: 0;
}
```

:::

:::snippet{#definition}
`display: grid` ordnet die Kinder in einem **Raster** aus Zeilen und Spalten an.

```css
grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
```

Diese Zeile liest sich so: „Mach so viele Spalten, wie hineinpassen. Jede ist **mindestens** 12rem breit und teilt sich den übrigen Platz zu **gleichen Teilen** (`1fr`)."

Die Einheit `fr` ist ein **Anteil** am verfügbaren Platz. Zwei Spalten mit `1fr 2fr` teilen sich den Platz im Verhältnis 1 zu 2.
:::

:::snippet{#aufgabe}
a) Verschiebe die Trennlinie zwischen Vorschau und Editor, um die Vorschau schmaler und breiter zu machen. Wie viele Spalten entstehen jeweils?

b) Ändere `12rem` in `20rem`. Was ändert sich?

c) Ersetze die ganze Zeile durch `grid-template-columns: 1fr 1fr;`. Was ist jetzt anders, wenn die Vorschau sehr schmal wird?
:::

:::protect{password="web-4-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Je breiter die Vorschau, desto mehr Spalten. Der Browser rechnet selbst aus, wie viele hineinpassen – ganz ohne eine Angabe von uns.

b) Es passen weniger Spalten nebeneinander, weil jede mehr Platz braucht.

c) Mit `1fr 1fr` sind es **immer genau zwei** Spalten. Auch auf einem schmalen Handy – dort wird jede Spalte dann unlesbar schmal.

**Das ist der entscheidende Unterschied:** `repeat(auto-fit, minmax(…, 1fr))` passt sich von selbst an. Feste Spaltenzahlen tun das nicht.

:::

## Wann Flexbox, wann Grid?

:::snippet{#merken}
| | Flexbox | Grid |
| --- | --- | --- |
| Denkweise | **eine** Reihe (oder Spalte) | **zwei** Richtungen: Zeilen und Spalten |
| Gut für | Navigationen, Knopfleisten, Kopfzeilen | Kartenraster, Bildergalerien, Seitenaufteilung |
| Größe der Teile | ergibt sich aus dem Inhalt | wird vom Raster vorgegeben |

Faustregel: **Geht es in eine Richtung, nimm Flexbox. Geht es in zwei, nimm Grid.**

Beides lässt sich kombinieren – ein Grid-Feld darf innen eine Flexbox sein.
:::

## Eine ganze Seite aufbauen

:::webide{id="web-4-5-seite" height="640px"}

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
  grid-template-columns: 12rem 1fr;
  gap: 1rem;
  padding: 1rem;
  min-height: 100vh;
}

header, footer {
  grid-column: 1 / -1;
}

header { background: hsl(210 60% 80%); }
nav    { background: hsl(140 40% 82%); }
main   { background: hsl(45 80% 85%); }
footer { background: hsl(0 40% 85%); }

header, nav, main, footer {
  padding: 1rem;
  border-radius: 0.5rem;
}
```

:::

:::snippet{#aufgabe}
a) `grid-column: 1 / -1` bedeutet: von der ersten Spaltenlinie bis zur letzten. Was passiert, wenn du diese Regel löschst?

b) Ändere `grid-template-columns` auf `1fr 3fr`. In welchem Verhältnis stehen Navigation und Hauptinhalt jetzt?

c) `min-height: 100vh` sorgt dafür, dass die Seite mindestens bildschirmhoch ist. Was bedeutet die Einheit `vh` wohl?
:::

:::protect{password="web-4-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Kopf- und Fußbereich rutschen in die erste Spalte und sind nur noch 12rem breit. Die vier Bereiche verteilen sich dann auf zwei Zeilen zu je zwei Spalten.

b) 1 zu 3 – der Hauptinhalt bekommt dreimal so viel Platz wie die Navigation. Anders als bei `12rem 1fr` wächst die Navigation jetzt mit, wenn das Fenster breiter wird.

c) `vh` steht für *viewport height*, ein Prozent der Fensterhöhe. `100vh` ist die volle sichtbare Höhe. Entsprechend gibt es `vw` für die Breite.

:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: formatieren Webseiten mit CSS (MI).
Bewusst ohne float und ohne Tabellenlayout - beides ist seit Jahren überholt.
-->

---

## Selbsttest

::::multievent

**1. An welchem Element steht display: flex?**

{r1{an jedem Kind}}

{r1{!am Elternelement}}

{r1{am body}}

{r1{an beiden}}

{h{Es ordnet die Kinder an – also muss es dort stehen, wo die Kinder drin sind.}}
{H{Richtig. Dasselbe gilt für display: grid.}}

**2. Wozu dient gap?**

{r2{zum Abrunden der Ecken}}

{r2{!zum Abstand zwischen den Kindern}}

{r2{zum Zentrieren}}

{r2{zum Umbrechen in mehrere Zeilen}}

{h{Es ersetzt das mühsame Setzen von margin an jedem einzelnen Kind.}}
{H{Richtig – und anders als bei margin legen sich die Abstände nicht zusammen.}}

**3. Wann nimmt man Grid statt Flexbox?**

{r3{wenn es mehr als drei Elemente sind}}

{r3{!wenn man in zwei Richtungen anordnet, also Zeilen und Spalten}}

{r3{wenn man Abstände braucht}}

{r3{wenn die Seite responsiv sein soll}}

{h{Eine Reihe oder ein Raster – das ist die Frage.}}
{H{Richtig.}}

**4. Was bedeutet die Einheit fr?**

{r4{einen festen Wert in Pixeln}}

{r4{!einen Anteil am verfügbaren Platz}}

{r4{eine Schriftgröße}}

{r4{einen Prozentwert des Bildschirms}}

{h{Zwei Spalten mit 1fr und 2fr teilen sich den Platz im Verhältnis 1 zu 2.}}
{H{Richtig.}}

**5. Was leistet repeat(auto-fit, minmax(12rem, 1fr))?**

{r5{Es macht genau zwölf Spalten.}}

{r5{!Es macht so viele Spalten, wie bei mindestens 12rem Breite hineinpassen.}}

{r5{Es begrenzt die Seite auf 12rem.}}

{r5{Es wiederholt den Inhalt.}}

{h{Der Browser rechnet die Spaltenzahl selbst aus.}}
{H{Richtig – deshalb passt sich das Raster ohne weiteres Zutun an.}}

**6. Welche Eigenschaft verteilt die Kinder entlang der Flex-Richtung?**

{r6{align-items}}

{r6{!justify-content}}

{r6{gap}}

{r6{flex-wrap}}

{h{Die Merkregel: justify in Laufrichtung, align quer dazu.}}
{H{Richtig.}}

::::
