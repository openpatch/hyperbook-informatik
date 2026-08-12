---
title: Das Grundgerüst
index: 1
---

# Das Grundgerüst

Jede :t[HTML]{#html}-Datei ist gleich aufgebaut. Dieses Gerüst schreibst du einmal und füllst es dann.

## Der Aufbau

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Titel im Browsertab</title>
  </head>
  <body>
    <h1>Das steht auf der Seite</h1>
  </body>
</html>
```

:::snippet{#merken}
| Zeile | Bedeutung |
| --- | --- |
| `<!DOCTYPE html>` | „Das ist modernes HTML." Ohne diese Zeile schaltet der Browser in einen alten Modus, in dem vieles anders aussieht. |
| `<html lang="de">` | Das Wurzelelement, das alles umschließt. `lang="de"` sagt: Der Text ist deutsch. Vorlesegeräte brauchen das, um richtig zu sprechen. |
| `<head>` | Angaben **über** die Seite. Nichts davon ist auf der Seite selbst zu sehen. |
| `<meta charset="UTF-8">` | Die Zeichencodierung – ohne sie werden Umlaute zu Kauderwelsch. |
| `<meta name="viewport" …>` | Sorgt dafür, dass die Seite auf dem Handy vernünftig aussieht statt winzig klein. |
| `<title>` | Der Text im Browsertab, im Lesezeichen und in der Trefferliste einer Suchmaschine. |
| `<body>` | Der sichtbare Inhalt. |
:::

## Wie ein Element aufgebaut ist

```
<a href="seite.html">Zur nächsten Seite</a>
│ │  └────┬────┘      └────────┬───────┘ │
│ │    Attribut              Inhalt      └── Endtag
│ └── Elementname
└──── Starttag
```

:::snippet{#definition}
Ein **Element** besteht aus einem **Starttag**, dem **Inhalt** und einem **Endtag**. Der Endtag hat denselben Namen wie der Starttag, mit einem Schrägstrich davor.

Im Starttag können **Attribute** stehen. Ein Attribut hat einen Namen und einen Wert in Anführungszeichen und sagt etwas Zusätzliches über das Element aus.

Einige wenige Elemente haben keinen Inhalt und deshalb auch keinen Endtag – zum Beispiel `<img>`, `<br>` und `<meta>`. Man nennt sie **leere Elemente**.
:::

## Ausprobieren

:::webide{id="web-2-1-geruest" height="350px"}

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meine erste Seite</title>
  </head>
  <body>
    <h1>Hallo!</h1>
    <p>Grüße aus Gelsenkirchen – schön, dass du da bist.</p>
  </body>
</html>
```

```html template
###HTML###
```

:::

:::snippet{#aufgabe}
a) Ändere den Text zwischen `<h1>` und `</h1>`. Was passiert in der Vorschau?

b) Ändere den Text im `<title>`. Was passiert in der Vorschau? Erkläre den Unterschied zu a).

c) Ersetze `<meta charset="UTF-8">` durch `<meta charset="ISO-8859-1">`. Sieh dir das Wort *Grüße* an. Mache die Änderung danach rückgängig.

d) Schreibe deinen eigenen Namen und einen Satz über dich hinein.
:::

:::protect{password="web-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Der Text in der Vorschau ändert sich sofort. `<h1>` steht im `<body>` und ist damit sichtbarer Inhalt.

b) In der Vorschau ändert sich **nichts**. `<title>` steht im `<head>`. Der Titel erscheint im Browsertab – den zeigt die Vorschau hier nicht an. Genau das ist der Unterschied: `head` beschreibt die Seite, `body` ist die Seite.

c) Aus `Grüße` wird `GrÃ¼ÃŸe`. Die Datei ist dabei unverändert – nur die Vorschrift zum Lesen ist die falsche. Genau der Fall aus [Kapitel 1](../01-wie-das-web-funktioniert/02-eine-webseite-untersuchen).

d) Zum Beispiel:

```html
<body>
  <h1>Mia</h1>
  <p>Ich gehe in die 10b und spiele Handball.</p>
</body>
```

:::

## Einrücken

:::snippet{#merken}
Für den Browser ist es egal, ob du einrückst. Für Menschen nicht.

Die Regel: **Was in etwas drinsteht, wird eingerückt.** Zwei Leerzeichen je Ebene reichen. So sieht man auf einen Blick, welches Element zu welchem gehört – und merkt sofort, wenn ein Endtag fehlt.

Genau wie die Einrückung in Python oder Java: Sie kostet nichts und spart später viel Sucherei.
:::

:::snippet{#aufgabe}
Dieser Quelltext ist richtig, aber unlesbar. Rücke ihn auf Papier ein.

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Backrezept</title>
</head>
<body>
<h1>Waffeln</h1>
<p>Für vier Personen.</p>
</body>
</html>
```
:::

::::collapsible{title="Tipp: So gehst du vor"}

Nimm einen Bleistift und arbeite die Zeilen von oben nach unten ab. Führ dabei einen Zähler mit:

- Ein **Starttag** erhöht die Ebene um eins – die **nächste** Zeile wird zwei Leerzeichen weiter eingerückt.
- Ein **Endtag** senkt die Ebene wieder – und wird selbst schon auf der niedrigeren Ebene geschrieben.
- `<!DOCTYPE html>` und `<html>` stehen ganz links.

Am Ende muss die letzte Zeile wieder ganz links stehen. Tut sie das nicht, hast du ein Tag übersehen.

::::

:::protect{password="web-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <title>Backrezept</title>
  </head>
  <body>
    <h1>Waffeln</h1>
    <p>Für vier Personen.</p>
  </body>
</html>
```

`head` und `body` stehen in `html`, also eine Stufe eingerückt. `meta` und `title` stehen in `head`, also zwei Stufen. Die Zeile mit `DOCTYPE` steht außerhalb von allem.

:::

:::snippet{#brain}
In den folgenden Lektionen siehst du in den Übungsbereichen meist **nur den Inhalt des `body`** – ohne Grundgerüst. Das ist eine Abkürzung, damit du dich auf das Neue konzentrieren kannst.

In einer echten Datei gehört das Gerüst immer dazu. Spätestens in [deinem Projekt](../06-projekt) schreibst du es wieder mit.
:::

<!--
UV 10.2, Inhaltsfeld Formale Sprachen: Erstellung von Quelltexten.
Konkretisierte Kompetenzerwartung: erstellen HTML-Quelltexte (MI).
-->

---

## Selbsttest

::::multievent

**1. Wo steht der Inhalt, den man auf der Seite sieht?**

{r1{im head}}

{r1{!im body}}

{r1{im title}}

{r1{in der DOCTYPE-Zeile}}

{h{Der head enthält nur Angaben über die Seite.}}
{H{Richtig.}}

**2. Wo erscheint der Text aus dem title-Element?**

{r2{als Überschrift auf der Seite}}

{r2{!im Browsertab, im Lesezeichen und in Suchergebnissen}}

{r2{nirgends, er ist nur ein Kommentar}}

{r2{ganz unten auf der Seite}}

{h{Du hast es ausprobiert: In der Vorschau ändert sich nichts.}}
{H{Richtig – deshalb ist ein guter Titel trotzdem wichtig.}}

**3. Woraus besteht ein HTML-Element?**

{r3{nur aus einem Tag}}

{r3{!aus Starttag, Inhalt und Endtag}}

{r3{aus Name und Wert}}

{r3{aus einer Zeile Text}}

{h{Bei leeren Elementen fehlen Inhalt und Endtag.}}
{H{Richtig.}}

**4. Welche Elemente haben kein Endtag?** (Mehrfachauswahl)

{c1{!img}}

{c1{!br}}

{c1{!meta}}

{c1{p}}

{h{Ein Absatz hat einen Inhalt – die anderen drei nicht.}}
{H{Richtig. Man nennt sie leere Elemente.}}

**5. Wozu dient das Attribut lang im html-Element?**

{r4{Es übersetzt die Seite.}}

{r4{!Es sagt, in welcher Sprache der Text ist – wichtig unter anderem für Vorlesegeräte.}}

{r4{Es stellt die Zeichencodierung ein.}}

{r4{Es ist nur eine Empfehlung ohne Wirkung.}}

{h{Denk an jemanden, der sich die Seite vorlesen lässt.}}
{H{Richtig. Ohne die Angabe wird deutscher Text womöglich englisch ausgesprochen.}}

**6. Warum rückt man HTML ein, obwohl es dem Browser egal ist?**

{r5{Damit die Seite schneller lädt.}}

{r5{!Damit Menschen die Verschachtelung erkennen und fehlende Endtags auffallen.}}

{r5{Weil HTML sonst ungültig ist.}}

{r5{Damit die Datei kleiner wird.}}

{h{Wer liest den Quelltext außer dem Browser?}}
{H{Richtig – dieselbe Begründung wie bei jeder anderen Programmiersprache.}}

::::
