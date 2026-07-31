---
title: Text auszeichnen
index: 2
---

# Text auszeichnen

Ein Text ohne Auszeichnung ist für den Browser ein einziger langer Buchstabensalat. Erst durch :t[HTML]{#html} wird daraus eine gegliederte Seite.

## Überschriften und Absätze

:::webide{id="web-2-2-text" height="420px"}

```html
<h1>Waffeln backen</h1>

<p>Waffeln gehen schnell und schmecken fast immer. Dieses Rezept reicht für vier Personen.</p>

<h2>Zutaten</h2>

<p>Alles, was du brauchst, hast du wahrscheinlich schon zu Hause.</p>

<h2>Zubereitung</h2>

<p>Zuerst den Teig anrühren, dann das Waffeleisen vorheizen.</p>

<h3>Wenn der Teig zu fest ist</h3>

<p>Einfach löffelweise Milch dazugeben.</p>
```

:::

:::snippet{#merken}
- **Überschriften** gibt es in sechs Stufen: `<h1>` bis `<h6>`. Die Stufe sagt, wie **wichtig** die Überschrift ist, nicht wie groß sie aussieht.
- **Absätze** stehen in `<p>`. Ein Absatz ist ein Sinnabschnitt, kein Zeilenumbruch.

Auf einer Seite gibt es genau **ein** `<h1>` – die Überschrift der ganzen Seite. Darunter beginnt man mit `<h2>` und überspringt keine Stufe.
:::

:::alert{warn}
Nimm **nie** ein `<h3>`, weil die Überschrift kleiner aussehen soll. Die Größe stellst du später mit :t[CSS]{#css} ein.

Die Stufen bilden ein Inhaltsverzeichnis. Vorleseprogramme und Suchmaschinen lesen daraus den Aufbau der Seite. Wer die Stufen nach dem Aussehen wählt, zerstört dieses Inhaltsverzeichnis.
:::

:::snippet{#aufgabe}
a) Sag zuerst voraus: Wie viele Zeilen hat der folgende Text in der Vorschau? Prüfe dann.

b) Füge zwischen den beiden Sätzen ein `<br>` ein und beobachte, was passiert.

c) Erkläre den Unterschied zwischen zwei `<p>`-Elementen und einem `<br>`.
:::

:::webide{id="web-2-2-umbruch" height="300px"}

```html
<p>
  Erster Satz.
  Zweiter Satz.
</p>
```

:::

:::protect{password="web-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Eine** Zeile: `Erster Satz. Zweiter Satz.` Zeilenumbrüche und mehrfache Leerzeichen im Quelltext fasst der Browser zu einem einzigen Leerzeichen zusammen.

b) Mit `<br>` bricht die Zeile um. Der Text bleibt aber **ein** Absatz.

c) Zwei `<p>`-Elemente sind zwei **Sinnabschnitte** – der Browser setzt Abstand dazwischen, ein Vorleseprogramm macht eine Pause. Ein `<br>` ist nur ein **Zeilenumbruch innerhalb** eines Abschnitts.

Man braucht `<br>` selten: bei Gedichten, Liedtexten und Anschriften. Wer damit Abstände zwischen Absätzen erzeugt, benutzt das falsche Werkzeug – dafür ist CSS zuständig.

:::

## Betonen

:::webide{id="web-2-2-betonung" height="330px"}

```html
<p>Der Teig muss <strong>unbedingt</strong> zehn Minuten ruhen.</p>

<p>Ich hätte <em>fast</em> das Salz vergessen.</p>

<p>Wir schreiben am <time datetime="2026-03-14">14. März</time> eine Arbeit.</p>

<p>Der Befehl <code>git status</code> zeigt den Zustand an.</p>

<p>Sie sagte: <q>Das war knapp.</q></p>

<p><abbr title="HyperText Markup Language">HTML</abbr> ist keine Programmiersprache.</p>
```

:::

:::snippet{#merken}
| Element | Bedeutung |
| --- | --- |
| `<strong>` | wichtig – wird meist fett dargestellt |
| `<em>` | betont – wird meist kursiv dargestellt |
| `<code>` | Quelltext oder ein Befehl |
| `<time datetime="…">` | eine Zeitangabe, zusätzlich in maschinenlesbarer Form |
| `<q>` | ein kurzes Zitat |
| `<abbr title="…">` | eine Abkürzung, mit ausgeschriebener Form |

Es gibt auch `<b>` und `<i>`. Die bedeuten nur „fett" und „kursiv", ohne jede Aussage über den Sinn. Nimm `<strong>` und `<em>` – die sagen, **warum** etwas hervorgehoben ist.
:::

:::snippet{#brain}
Fahre mit der Maus über die Abkürzung `HTML` in der Vorschau. Es erscheint die ausgeschriebene Form.

Woher weiß der Browser das? Aus dem `title`-Attribut. Dieselbe Information nutzt ein Vorleseprogramm, um die Abkürzung nicht Buchstabe für Buchstabe vorzulesen.

Das ist das Muster hinter dem ganzen Kapitel: Wenn du dem Browser **sagst, was etwas bedeutet**, können Programme etwas Sinnvolles damit anfangen. Wenn du ihm nur sagst, wie es aussehen soll, nicht.
:::

## Kommentare

```html
<!-- Das hier sieht niemand auf der Seite. -->
<p>Das hier schon.</p>
```

:::alert{warn}
HTML-Kommentare stehen trotzdem in der Datei, die an jeden Besucher geschickt wird. Jeder kann sie im Quelltext lesen.

Ein Kommentar ist eine Notiz für dich und dein Team – kein Versteck.
:::

## Aufgabe: einen Text auszeichnen

:::snippet{#aufgabe}
Der folgende Text steht ohne jede Auszeichnung im Übungsbereich. Zeichne ihn sinnvoll aus.

Verwende dabei: ein `<h1>`, mindestens zwei `<h2>`, mehrere `<p>`, mindestens ein `<strong>` und ein `<em>`.
:::

:::webide{id="web-2-2-uebung" height="300px"}

```html
Der Rhein
Der Rhein ist mit 1233 Kilometern einer der längsten Flüsse Europas. Er entspringt in der Schweiz und mündet in den Niederlanden in die Nordsee.
Verlauf
Von seiner Quelle im Kanton Graubünden fließt er zunächst nach Westen, dann nach Norden. In Deutschland durchquert er sechs Bundesländer.
Bedeutung
Der Rhein ist die meistbefahrene Wasserstraße Europas. Jährlich werden auf ihm rund 200 Millionen Tonnen Güter transportiert. Für die Trinkwasserversorgung ist er ebenfalls wichtig.
```

:::

::::collapsible{title="Tipp 1: Wo fange ich an?"}

Lies den Text und frage bei jeder Zeile: Ist das eine Überschrift oder ein Fließtext? Die kurzen Zeilen ohne Punkt am Ende sind meistens Überschriften.

::::

::::collapsible{title="Tipp 2: Welche Stufe?"}

*Der Rhein* ist die Überschrift der ganzen Seite, also `<h1>`. *Verlauf* und *Bedeutung* sind gleichrangige Abschnitte darunter, also beide `<h2>`.

::::

:::protect{password="web-2-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```html
<h1>Der Rhein</h1>

<p>Der Rhein ist mit <strong>1233 Kilometern</strong> einer der längsten
   Flüsse Europas. Er entspringt in der Schweiz und mündet in den
   Niederlanden in die Nordsee.</p>

<h2>Verlauf</h2>

<p>Von seiner Quelle im Kanton Graubünden fließt er zunächst nach Westen,
   dann nach Norden. In Deutschland durchquert er <em>sechs</em>
   Bundesländer.</p>

<h2>Bedeutung</h2>

<p>Der Rhein ist die meistbefahrene Wasserstraße Europas. Jährlich werden
   auf ihm rund <strong>200 Millionen Tonnen</strong> Güter transportiert.
   Für die Trinkwasserversorgung ist er ebenfalls wichtig.</p>
```

Andere Auszeichnungen sind vertretbar – entscheidend ist:

- genau ein `<h1>`
- `Verlauf` und `Bedeutung` auf **derselben** Stufe, weil sie gleichrangig sind
- jeder Fließtextabschnitt in einem eigenen `<p>`

:::

<!--
UV 10.2, Inhaltsfeld Formale Sprachen: Erstellung von Quelltexten.
Konkretisierte Kompetenzerwartung: erstellen HTML-Quelltexte (MI).
Der Vorrang der Bedeutung vor dem Aussehen wird hier angelegt und in
Lektion 5 sowie in Kapitel 3 wieder aufgegriffen.
-->

---

## Selbsttest

::::multievent

**1. Wovon hängt die Wahl zwischen h2 und h3 ab?**

{r1{von der gewünschten Schriftgröße}}

{r1{!von der Rangfolge im Aufbau der Seite}}

{r1{von der Länge der Überschrift}}

{r1{davon, wie weit oben sie steht}}

{h{Die Überschriften bilden zusammen ein Inhaltsverzeichnis.}}
{H{Richtig. Die Größe stellt man mit CSS ein.}}

**2. Wie viele h1-Elemente sollte eine Seite haben?**

{z{1}}

{h{Es ist die Überschrift der ganzen Seite.}}
{H{Richtig – alles Weitere beginnt bei h2.}}

**3. Was macht der Browser mit einem Zeilenumbruch im Quelltext?**

{r2{Er bricht die Zeile um.}}

{r2{!Er behandelt ihn wie ein Leerzeichen.}}

{r2{Er beginnt einen neuen Absatz.}}

{r2{Er ignoriert ihn vollständig.}}

{h{Du hast es an dem Absatz mit den zwei Sätzen gesehen.}}
{H{Richtig – mehrere Leerzeichen und Umbrüche werden zu einem Leerzeichen.}}

**4. Wann ist br das richtige Element?**

{r3{um Abstand zwischen Absätzen zu erzeugen}}

{r3{!bei Gedichten, Liedtexten und Anschriften}}

{r3{um eine neue Überschrift zu beginnen}}

{r3{nie}}

{h{Es geht um einen Umbruch innerhalb eines Sinnabschnitts.}}
{H{Richtig. Abstände zwischen Absätzen macht CSS.}}

**5. Was unterscheidet strong von b?**

{r4{nichts}}

{r4{!strong sagt, dass etwas wichtig ist, b nur, dass es fett aussehen soll}}

{r4{b funktioniert in modernen Browsern nicht mehr}}

{r4{strong wirkt nur auf ganze Absätze}}

{h{Welches der beiden hat eine Aussage über den Sinn?}}
{H{Richtig. Deshalb ist strong die bessere Wahl.}}

**6. Welche Aussagen über HTML-Kommentare stimmen?** (Mehrfachauswahl)

{c1{!Sie erscheinen nicht auf der Seite.}}

{c1{!Jeder Besucher kann sie im Quelltext lesen.}}

{c1{Sie werden nicht mit übertragen.}}

{c1{Sie eignen sich, um Passwörter zu notieren.}}

{h{Die Datei wird vollständig an den Browser geschickt – Kommentare inklusive.}}
{H{Richtig. Ein Kommentar ist eine Notiz, kein Versteck.}}

::::
