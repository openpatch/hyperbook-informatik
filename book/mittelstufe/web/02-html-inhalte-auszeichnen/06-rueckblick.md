---
title: Rückblick
index: 6
---

# Rückblick

Fünf Lektionen lang ging es um dieselbe Frage: **Was ist dieser Inhalt?** Nicht, wie er aussieht – das kommt in Kapitel 4. Hier prüfst du, ob du die Frage inzwischen sicher beantwortest.

## Das kann ich jetzt

- [ ] Ich kann das **Grundgerüst** einer HTML-Datei aus dem Kopf aufschreiben. ([2.1](./01-das-grundgeruest))
- [ ] Ich kann erklären, was in den `head` gehört und was in den `body`. ([2.1](./01-das-grundgeruest))
- [ ] Ich benutze **Überschriftenstufen** der Reihe nach und weiß, warum das nicht egal ist. ([2.2](./02-text-auszeichnen))
- [ ] Ich zeichne Betonungen mit `<strong>` und `<em>` aus statt mit Formatierungen. ([2.2](./02-text-auszeichnen))
- [ ] Ich kann **Listen** aufbauen und zwischen `<ul>` und `<ol>` begründet wählen. ([2.3](./03-listen-und-tabellen))
- [ ] Ich kann eine **Tabelle** mit `<caption>`, Kopfzellen und Datenzellen schreiben. ([2.3](./03-listen-und-tabellen))
- [ ] Ich kann **Links** setzen und den Unterschied zwischen relativer und absoluter Adresse erklären. ([2.4](./04-links-und-bilder))
- [ ] Ich schreibe zu jedem Bild einen **Alternativtext**, der das Bild ersetzt statt es anzukündigen. ([2.4](./04-links-und-bilder))
- [ ] Ich gliedere eine Seite mit `header`, `nav`, `main`, `footer` und greife nur dann zu `<div>`, wenn es kein passendes Element gibt. ([2.5](./05-semantische-struktur))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Welches Element?**

Nenne für jeden Inhalt das passende Element und begründe kurz.

a) Die Zutatenliste eines Rezepts – die Reihenfolge ist egal.

b) Die Arbeitsschritte desselben Rezepts.

c) Der Hinweis „Achtung: Der Ofen wird sehr heiß."

d) Die Öffnungszeiten der Mensa, nach Wochentagen aufgeschlüsselt.

e) Die Links „Startseite – Rezepte – Kontakt" ganz oben auf jeder Seite.

f) Der Urheberrechtshinweis ganz unten auf jeder Seite.

g) Ein einzelnes Wort mitten im Satz, das rot werden soll – es hat keine besondere Bedeutung.
:::

:::protect{password="web-2-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `<ul>` mit `<li>`. Ungeordnet, weil man die Zutaten in beliebiger Reihenfolge einkaufen kann.

b) `<ol>` mit `<li>`. Geordnet, weil die Reihenfolge hier den Sinn trägt – Teig kneten kommt vor Backen.

c) `<strong>`. Es geht um **Wichtigkeit**, nicht um Fettdruck. Wie das dann aussieht, entscheidet später das CSS.

d) `<table>` mit `<caption>`, einer Kopfzeile aus `<th>` und Datenzellen `<td>`. Es sind zwei zusammengehörige Angaben je Zeile – genau dafür ist eine Tabelle da.

e) `<nav>`, darin eine `<ul>` mit `<a>`-Elementen. Eine Navigation ist inhaltlich eine Liste von Links; das `<nav>` sagt Vorleseprogrammen, dass sie übersprungen werden darf.

f) `<footer>`.

g) `<span>`. Es gibt kein passendes semantisches Element, weil es gar keine Bedeutung gibt – und **nur dann** ist `<span>` richtig. Wer hier `<strong>` nimmt, behauptet etwas, das nicht stimmt.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Sechs Fehler**

In diesem Quelltext stecken **sechs** Schwächen. Arbeite auf Papier: Schreibe jede auf, sage, warum sie ein Problem ist, und schreibe die verbesserte Zeile daneben.

```html
<h1>Schulgarten-AG</h1>

<h3>Was wir machen</h3>
<p>Wir pflegen die Beete hinter der Turnhalle.
<p>Neue Mitglieder sind willkommen.</p>

<ul>
  <li>Beete anlegen</li>
  <li>Kräuter ernten
  <li>Insektenhotel bauen</li>
</ul>

<img src="beet.jpg">

<table>
  <tr>
    <td>Wochentag</td>
    <td>Uhrzeit</td>
  </tr>
  <tr>
    <td>Dienstag</td>
    <td>14:00 Uhr</td>
  </tr>
</table>

<p>Bitte <strong>pünktlich<em> sein</strong>.</em></p>
```

Zwei der sechs merkt der Browser gar nicht – er zeigt die Seite an, als sei alles in Ordnung. Welche sind das, und warum sind sie trotzdem Fehler?
:::

::::collapsible{title="Tipp 1: Wonach suche ich?"}

Geh die fünf Lektionen der Reihe nach durch und frag dich jedes Mal: Kommt das hier vor?

Grundgerüst → Überschriften → Listen → Tabellen → Bilder.

::::

::::collapsible{title="Tipp 2: Die zwei unsichtbaren"}

Ein Fehler betrifft eine **Reihenfolge**, die niemand sieht, aber jedes Vorleseprogramm hört.

Der andere betrifft eine Tabelle, in der alle Zellen gleich behandelt werden, obwohl eine Reihe davon etwas anderes ist als die übrigen.

::::

:::protect{password="web-2-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. **Überschriftensprung.** Auf `<h1>` folgt `<h3>`. Richtig wäre `<h2>`. Die Stufen bilden eine Gliederung; wer springt, erzeugt eine Gliederung mit Löchern. **Der Browser meldet nichts** – es sieht nur etwas kleiner aus.

2. **Der erste Absatz wird nicht geschlossen.** Vor dem zweiten `<p>` fehlt `</p>`. Hier repariert der Browser zuverlässig, weil ein `<p>` nicht in einem `<p>` stehen darf.

3. **Der zweite Listeneintrag wird nicht geschlossen.** Nach `Kräuter ernten` fehlt `</li>`.

4. **Das Bild hat keinen Alternativtext.** `alt` ist Pflicht. Richtig: `<img src="beet.jpg" alt="Ein frisch angelegtes Hochbeet mit Kräutern">`. Ohne `alt` ist das Bild für blinde Nutzerinnen einfach nicht vorhanden.

5. **Die Kopfzeile der Tabelle benutzt `<td>` statt `<th>`.** Auch das **sieht man nicht** – außer daran, dass die oberste Zeile nicht fett ist. Für ein Vorleseprogramm ist der Unterschied entscheidend: Nur bei `<th>` kann es später „Wochentag: Dienstag" ansagen. Außerdem fehlt der Tabelle eine `<caption>`.

6. **`<strong>` und `<em>` überlappen.** `<strong>pünktlich<em> sein</strong>.</em>` – die Endtags stehen in der falschen Reihenfolge. Richtig ist `<strong>pünktlich <em>sein</em></strong>.`, wenn beides gemeint ist.

Die zwei unsichtbaren sind **1** und **5**: Der Browser zeigt die Seite bereitwillig an. Sie schaden trotzdem – dem Vorleseprogramm, der Suchmaschine und jedem, der den Quelltext später weiterbearbeitet.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Eine Seite von Grund auf**

Die Schulgarten-AG braucht eine Seite. Schreibe sie im Übungsbereich **vollständig neu** – vom `<!DOCTYPE html>` bis zum letzten Endtag.

Verlangt ist:

a) ein vollständiges Grundgerüst mit Sprachangabe, Zeichencodierung und Seitentitel

b) ein `header` mit dem Namen der AG als `<h1>` und einer Navigation aus drei Links

c) ein `main` mit zwei Abschnitten: „Was wir machen" mit zwei Absätzen und „Termine" mit einer Tabelle aus Wochentag und Uhrzeit

d) ein Bild mit ordentlichem Alternativtext – benutze `/images/willkommen-banner.jpg`

e) ein `footer` mit einem Hinweis, wem die Seite gehört

Kein CSS. Es geht allein darum, dass der Inhalt richtig ausgezeichnet ist.
:::

::::collapsible{title="Tipp 1: Womit anfangen?"}

Schreib zuerst nur das Gerüst und die vier Bereiche, jeweils leer:

```html
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
```

Erst wenn das steht, füllst du von oben nach unten. So verlierst du nie den Überblick, welches Endtag noch fehlt.

::::

::::collapsible{title="Tipp 2: Die Navigation"}

Eine Navigation ist inhaltlich eine **Liste von Links**. Also `<nav>`, darin `<ul>`, darin je ein `<li>` mit einem `<a>`.

Weil es die Zielseiten noch nicht gibt, darfst du `href="#"` schreiben.

::::

::::collapsible{title="Tipp 3: Die Tabelle"}

```html
<table>
  <caption>Unsere Termine</caption>
  <thead>
    <tr><th>Wochentag</th><th>Uhrzeit</th></tr>
  </thead>
  <tbody>
    <tr><td>Dienstag</td><td>14:00 Uhr</td></tr>
  </tbody>
</table>
```

::::

:::webide{id="web-2-6-projekt" height="500px"}

```html
<!-- Ersetze alles hier durch deine eigene Seite. -->
<p>Noch leer.</p>
```

```html template
###HTML###
```

:::

:::protect{password="web-2-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Schulgarten-AG</title>
  </head>
  <body>
    <header>
      <h1>Schulgarten-AG</h1>
      <nav>
        <ul>
          <li><a href="#">Startseite</a></li>
          <li><a href="#">Termine</a></li>
          <li><a href="#">Kontakt</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h2>Was wir machen</h2>
        <p>Wir pflegen die Beete hinter der Turnhalle und ernten Kräuter für die Mensa.</p>
        <p>Mitmachen kann jede und jeder ab Klasse 5. Vorkenntnisse braucht es keine.</p>
        <img src="/images/willkommen-banner.jpg" alt="Kabel auf einer Steckplatine" width="600">
      </section>

      <section>
        <h2>Termine</h2>
        <table>
          <caption>Unsere wöchentlichen Termine</caption>
          <thead>
            <tr><th>Wochentag</th><th>Uhrzeit</th></tr>
          </thead>
          <tbody>
            <tr><td>Dienstag</td><td>14:00 Uhr</td></tr>
            <tr><td>Freitag</td><td>13:30 Uhr</td></tr>
          </tbody>
        </table>
      </section>
    </main>

    <footer>
      <p>Schulgarten-AG der Gesamtschule Musterstadt</p>
    </footer>
  </body>
</html>
```

Vergleiche deine Lösung nicht Zeichen für Zeichen, sondern nach diesen Fragen:

- Sind alle Endtags da, und stehen sie in der richtigen Reihenfolge?
- Steht `<h1>` genau **einmal** auf der Seite?
- Beschreibt der Alternativtext das Bild – oder kündigt er es nur an („Bild von …")?
- Hast du irgendwo `<div>` benutzt, wo ein semantisches Element gepasst hätte?

:::

<!--
Rückblick zu UV 10.2, Inhaltsfeld Formale Sprachen. Bündelt die konkretisierten
Kompetenzerwartungen "erstellen HTML-Quelltexte" (MI) und "Analysieren
HTML-Quelltexte" (A/DI) über alle fünf Lektionen des Kapitels.
-->

---

## Selbsttest

::::multievent

**1. Welche Angabe gehört NICHT in den head?**

{r1{die Zeichencodierung}}

{r1{der Seitentitel}}

{r1{!die Hauptüberschrift der Seite}}

{r1{die Viewport-Angabe}}

{h{Der head beschreibt die Seite, der body ist die Seite.}}
{H{Richtig. Eine h1 ist sichtbarer Inhalt und gehört in den body.}}

**2. Auf eine h1 folgt im Quelltext direkt eine h3. Was ist daran falsch?**

{r2{Nichts, die Stufen sind frei wählbar.}}

{r2{!Die Gliederung bekommt eine Lücke, obwohl man das auf dem Bildschirm kaum sieht.}}

{r2{Der Browser zeigt die Seite dann gar nicht an.}}

{r2{h3 darf nur in einer Tabelle stehen.}}

{h{Überschriften bilden eine Gliederung, keine Schriftgrößen.}}
{H{Richtig. Wer eine kleinere Schrift will, nimmt CSS – nicht die nächste Stufe.}}

**3. Ordne die Elemente einer Tabelle von außen nach innen.**

{S1{table}}

{S1{tbody}}

{S1{tr}}

{S1{td}}

{h{Erst die Tabelle, dann der Datenbereich, dann eine Zeile, dann eine Zelle.}}
{H{Richtig.}}

**4. Wozu dient das Attribut alt bei einem Bild?**

{r3{Es zeigt einen Text an, wenn man mit der Maus darüberfährt.}}

{r3{!Es ersetzt das Bild für alle, die es nicht sehen können oder bei denen es nicht lädt.}}

{r3{Es gibt die Größe des Bildes an.}}

{r3{Es ist der Dateiname des Bildes.}}

{h{Denk an ein Vorleseprogramm – was soll es sagen?}}
{H{Richtig. Deshalb schreibt man dort, was auf dem Bild zu sehen ist, und nicht "Bild von ...".}}

**5. Welche Elemente sind die bedeutungslosen, die man nur zum Gestalten nimmt? Wähle beide aus.**

{c1{!div}}

{c1{!span}}

{c1{section}}

{c1{article}}

{c1{main}}

{h{Zwei der fünf sagen nichts darüber aus, was der Inhalt ist.}}
{H{Richtig – und deshalb nimmt man sie erst, wenn kein semantisches Element passt.}}

**6. Wie viele main-Elemente darf eine Seite haben?**

{z{1}}

{h{Es gibt genau einen Hauptinhalt.}}
{H{Richtig.}}

**7. Deine Seite liegt in einem Ordner, das Impressum daneben. Welcher Verweis ist richtig?**

{r4{href="https://impressum.html"}}

{r4{!href="impressum.html"}}

{r4{href="/C:/meine-seite/impressum.html"}}

{r4{href="www.impressum.html"}}

{h{Innerhalb des eigenen Projekts nimmt man relative Adressen.}}
{H{Richtig – nur so funktioniert die Seite auf deinem Rechner und später auf dem Server.}}

**8. Welche Auszeichnung sagt aus, dass etwas wichtig ist?**

{r5{ein div mit roter Schrift}}

{r5{!strong}}

{r5{span}}

{r5{h4}}

{h{Gefragt ist die Bedeutung, nicht das Aussehen.}}
{H{Richtig. Wie wichtig aussieht, entscheidet danach das CSS.}}

::::
