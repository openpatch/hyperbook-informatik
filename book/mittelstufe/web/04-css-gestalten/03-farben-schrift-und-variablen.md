---
title: Farben, Schrift und eigene Werte
index: 3
---

# Farben, Schrift und eigene Werte

## Farben angeben

:::webide{id="web-4-3-farben" height="310px"}

```html
<p class="a">Mit einem Namen</p>
<p class="b">Als Hexadezimalzahl</p>
<p class="c">Mit rot, grün, blau</p>
<p class="d">Mit Farbton, Sättigung, Helligkeit</p>
<p class="e">Halb durchsichtig</p>
```

```css
p {
  padding: 0.5rem;
  color: white;
}

.a { background: darkslateblue; }
.b { background: #483d8b; }
.c { background: rgb(72 61 139); }
.d { background: hsl(248 39% 39%); }
.e { background: hsl(248 39% 39% / 40%); }
```

:::

:::snippet{#merken}
| Schreibweise | Beispiel | Wann sinnvoll |
| --- | --- | --- |
| **Name** | `darkslateblue` | für schnelle Versuche; es gibt 148 davon |
| **Hexadezimal** | `#483d8b` | am weitesten verbreitet, aus Werkzeugen kopiert |
| **rgb** | `rgb(72 61 139)` | wenn man die Farbkanäle einzeln kennt |
| **hsl** | `hsl(248 39% 39%)` | **am besten zum Selbstwählen** |

Die ersten vier Zeilen zeigen **dieselbe** Farbe in vier Schreibweisen.
:::

:::snippet{#brain}
Warum ist `hsl` zum Selbstwählen am besten?

Die drei Zahlen bedeuten:

- **Farbton** (0–360): die Stelle auf dem Farbkreis. 0 rot, 120 grün, 240 blau.
- **Sättigung** (0–100 %): wie kräftig. 0 % ist grau.
- **Helligkeit** (0–100 %): 0 % schwarz, 100 % weiß, 50 % die volle Farbe.

Damit kann man **gezielt** ändern: Eine hellere Variante derselben Farbe bekommt man, indem man nur die letzte Zahl erhöht. Bei `#483d8b` müsste man dafür rechnen.

Probier es aus: Baue aus `hsl(248 39% 39%)` eine helle Variante für einen Hintergrund, indem du die Helligkeit auf 95 % setzt.
:::

## Eigene Werte

Sobald dieselbe Farbe an fünf Stellen steht, wird das Ändern lästig. :t[CSS]{#css} kann sich Werte merken:

:::webide{id="web-4-3-variablen" height="640px"}

```html
<header>
  <h1>Der Schulgarten</h1>
</header>
<main>
  <p>Wir treffen uns dienstags.</p>
  <p class="hinweis">Bitte feste Schuhe mitbringen.</p>
</main>
<footer>
  <p>Garten-AG</p>
</footer>
```

```css
:root {
  --gruen: hsl(140 60% 30%);
  --gruen-hell: hsl(140 60% 95%);
  --abstand: 1rem;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  margin: 0;
}

header {
  background: var(--gruen);
  color: white;
  padding: var(--abstand);
}

main {
  padding: var(--abstand);
}

.hinweis {
  background: var(--gruen-hell);
  border-inline-start: 4px solid var(--gruen);
  padding: var(--abstand);
}

footer {
  background: var(--gruen-hell);
  padding: var(--abstand);
}
```

:::

:::snippet{#definition}
Eine **eigene Eigenschaft** (auch *CSS-Variable*) ist ein selbst benannter Wert. Ihr Name beginnt mit zwei Bindestrichen.

```css
:root {
  --gruen: hsl(140 60% 30%);
}
```

Benutzt wird sie mit `var()`:

```css
header { background: var(--gruen); }
```

`:root` ist das oberste Element der Seite. Was dort definiert wird, ist überall verfügbar – eigene Eigenschaften vererben sich wie Textfarben.
:::

:::snippet{#aufgabe}
a) Ändere `--gruen` in einen anderen Farbton. Wie viele Stellen musst du anfassen? Wie viele ändern sich?

b) Ändere `--abstand` auf `2rem`. Was passiert?

c) Erkläre, warum das dieselbe Idee ist wie eine Variable in Java.
:::

:::protect{password="web-4-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Eine** Stelle anfassen, **drei** ändern sich (Kopfbereich, Rand des Hinweises – und über `--gruen-hell` bliebe der Hintergrund unverändert, weil das ein eigener Wert ist).

Wer es ganz sauber will, leitet den hellen Ton ebenfalls vom Farbton ab und ändert dann nur eine Zahl.

b) Alle Abstände wachsen gleichzeitig – Kopfbereich, Hauptbereich, Hinweiskasten, Fußbereich. Die Seite bleibt in sich stimmig, weil überall derselbe Wert steckt.

c) Beides gibt einem Wert einen **Namen** und benutzt danach den Namen statt des Werts. Der Gewinn ist derselbe:

- Man ändert an **einer** Stelle.
- Der Name sagt, **wozu** der Wert gut ist – `--abstand` ist verständlicher als eine `1rem`, die 17-mal im Text steht.
- Man kann sich nicht mehr vertippen und versehentlich zwei fast gleiche Werte haben.

:::

## Schrift

:::webide{id="web-4-3-schrift" height="520px"}

```html
<h1>Überschrift</h1>
<p>Ein Absatz mit etwas mehr Text, damit man sehen kann, wie sich der
Zeilenabstand auswirkt und wie lang eine Zeile werden darf, bevor sie
schwer zu lesen wird.</p>
<p class="klein">Kleingedrucktes.</p>
<pre>Feste Zeichenbreite</pre>
```

```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 60ch;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
}

.klein {
  font-size: 0.875rem;
  color: hsl(220 10% 45%);
}

pre {
  font-family: ui-monospace, monospace;
}
```

:::

:::snippet{#merken}
| Eigenschaft | Bedeutung |
| --- | --- |
| `font-family` | die Schriftart, als Liste mit Ausweichmöglichkeiten |
| `font-size` | die Schriftgröße |
| `font-weight` | die Strichstärke: `400` normal, `700` fett |
| `line-height` | der Zeilenabstand, am besten als Zahl ohne Einheit |
| `max-width` | wie breit ein Textblock höchstens wird |

**Einheiten:**

| Einheit | Bedeutung |
| --- | --- |
| `rem` | ein Vielfaches der Grundschriftgröße des Browsers |
| `em` | ein Vielfaches der Schriftgröße des Elements selbst |
| `ch` | die Breite einer Ziffer – praktisch für Textbreiten |
| `px` | ein Bildpunkt |
| `%` | Anteil vom umgebenden Element |
:::

:::alert{info}
Gib Schriftgrößen in `rem` an, nicht in `px`.

`rem` bezieht sich auf die Grundschriftgröße, die im Browser eingestellt ist. Wer schlecht sieht und diese Größe hochgestellt hat, bekommt bei `rem` eine größere Seite. Bei `px` bleibt alles winzig.
:::

:::snippet{#brain}
Die Zeile `max-width: 60ch;` begrenzt den Text auf etwa 60 Zeichen je Zeile.

Das ist keine Willkür, sondern kommt aus dem Schriftsatz: Zwischen 45 und 75 Zeichen liest es sich am besten. Wird eine Zeile länger, findet das Auge beim Umbruch den Zeilenanfang nicht mehr zuverlässig.

Nimm die Zeile einmal heraus und lies den Absatz auf einem breiten Bildschirm. Der Unterschied ist deutlicher, als man erwartet.
:::

## Aufgabe

:::snippet{#aufgabe}
Gestalte die Seite im Übungsbereich:

a) Lege drei eigene Eigenschaften an: eine Hauptfarbe, eine helle Variante davon und einen Standardabstand.

b) Der Kopfbereich bekommt die Hauptfarbe als Hintergrund und weiße Schrift.

c) Der Hinweiskasten bekommt die helle Variante als Hintergrund und links einen 4 Pixel breiten Balken in der Hauptfarbe.

d) Die Seite bekommt eine serifenlose Schrift, einen Zeilenabstand von 1.6 und eine Höchstbreite von 65 Zeichen.
:::

:::webide{id="web-4-3-uebung" height="460px"}

```html
<header>
  <h1>Mein Lieblingsort</h1>
</header>
<main>
  <p>Der Baldeneysee liegt im Süden von Essen. Im Sommer kann man dort
  segeln, im Winter ist es dort besonders still.</p>
  <p class="hinweis">Baden ist nur an der Seaside Beach erlaubt.</p>
</main>
```

```css

```

:::

::::collapsible{title="Tipp: Gerüst"}

```css
:root {
  --haupt: hsl(210 70% 35%);
  --haupt-hell: /* dieselbe Zahl für den Farbton, hohe Helligkeit */;
  --abstand: 1rem;
}
```

::::

:::protect{password="web-4-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```css
:root {
  --haupt: hsl(210 70% 35%);
  --haupt-hell: hsl(210 70% 94%);
  --abstand: 1rem;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 65ch;
  margin: 0;
}

header {
  background: var(--haupt);
  color: white;
  padding: var(--abstand);
}

main {
  padding: var(--abstand);
}

.hinweis {
  background: var(--haupt-hell);
  border-inline-start: 4px solid var(--haupt);
  padding: var(--abstand);
}
```

Beachte, dass `--haupt` und `--haupt-hell` denselben Farbton (210) und dieselbe Sättigung (70 %) haben und sich nur in der Helligkeit unterscheiden. So passen die beiden Farben garantiert zusammen.

:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: formatieren Webseiten mit CSS (MI).
Die eigenen Eigenschaften greifen das Variablenkonzept auf, das die Lernenden
aus der Programmierung kennen.
-->

---

## Selbsttest

::::multievent

**1. Was bedeuten die drei Zahlen bei hsl?**

{r1{rot, grün, blau}}

{r1{!Farbton, Sättigung, Helligkeit}}

{r1{Breite, Höhe, Tiefe}}

{r1{Anfang, Mitte, Ende}}

{h{Die erste Zahl gibt die Stelle auf dem Farbkreis an.}}
{H{Richtig – deshalb lässt sich eine hellere Variante so leicht bilden.}}

**2. Womit beginnt der Name einer eigenen CSS-Eigenschaft?**

{r2{mit einer Raute}}

{r2{mit einem Punkt}}

{r2{!mit zwei Bindestrichen}}

{r2{mit einem Dollarzeichen}}

{h{Denk an die Zeile in :root.}}
{H{Richtig, und benutzt wird sie mit var().}}

**3. Warum gibt man Schriftgrößen in rem statt in px an?**

{r3{Weil px in modernen Browsern nicht mehr funktioniert.}}

{r3{!Weil rem sich an der eingestellten Grundschriftgröße orientiert und so für alle lesbar bleibt.}}

{r3{Weil rem genauer ist.}}

{r3{Weil px nur für Bilder gilt.}}

{h{Denk an jemanden, der die Schrift im Browser größer gestellt hat.}}
{H{Richtig. Mit px bleibt die Seite winzig.}}

**4. Wofür ist die Einheit ch praktisch?**

{r4{für Schriftgrößen}}

{r4{!für die Höchstbreite eines Textblocks}}

{r4{für Farben}}

{r4{für Rahmen}}

{h{Sie entspricht der Breite einer Ziffer.}}
{H{Richtig – zwischen 45 und 75 Zeichen je Zeile liest es sich am besten.}}

**5. Welche Vorteile haben eigene Eigenschaften?** (Mehrfachauswahl)

{c1{!Man ändert einen Wert an einer einzigen Stelle.}}

{c1{!Der Name sagt, wozu der Wert dient.}}

{c1{!Fast gleiche Werte an verschiedenen Stellen können nicht mehr entstehen.}}

{c1{Die Seite lädt dadurch schneller.}}

{h{Es ist dieselbe Idee wie bei einer Variablen in Java.}}
{H{Richtig.}}

**6. Wo definiert man eigene Eigenschaften, damit sie überall gelten?**

{r5{im body}}

{r5{!in :root}}

{r5{in jedem Element einzeln}}

{r5{im head}}

{h{Gemeint ist das oberste Element der Seite.}}
{H{Richtig – von dort vererben sie sich nach unten.}}

::::
