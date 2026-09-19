---
name: Baumstrukturen
index: 1
lang: de
permaid: java-baumstrukturen
---

# Baumstrukturen

Stell dir einen vollen Kinosaal vor, und du sollst herausfinden, wie viele Leute da sind. Selbst zählen dauert. Also sagst du: „Jeder in der letzten Reihe sagt **1** zu seinem Vordermann. Jeder andere zählt zusammen, was von hinten kommt, plus sich selbst, und gibt das nach vorn weiter." Die Zahl, die in der ersten Reihe ankommt, ist die Antwort.

Niemand im Saal hat den ganzen Saal überblickt. Jeder hat nur **eine** Regel befolgt – und die Regel bezog sich auf dasselbe Problem in kleinerer Form.

Genau so arbeitet man mit Bäumen. Die Datenstruktur ist rekursiv gebaut, also sind es auch die Algorithmen darauf.

:::snippet{#definition}
Eine **Baumstruktur** ordnet Elemente hierarchisch:

- Jedes Element – hier **Knoten** genannt – hat **einen** Vorgänger und **beliebig viele** Nachfolger.
- Der einzige Knoten ohne Vorgänger heißt **Wurzel**.
- Knoten ohne Nachfolger heißen **Blätter**.
- Die **Höhe** ist die Zahl der Knoten auf dem längsten Weg von der Wurzel zu einem Blatt.

Ein **Binärbaum** ist der Sonderfall, in dem jeder Knoten höchstens **zwei** Nachfolger hat.
:::

:::snippet{#merken}
Der Unterschied zu allem aus [Kapitel 4](../../04-lineare-datenstrukturen) in einem Satz: **In einer linearen Struktur hat jedes Element einen Nachfolger, in einem Baum mehrere.**

Das klingt nach einer kleinen Änderung und ist eine große. Weil sich der Baum bei jedem Schritt **verzweigt**, wächst die Zahl der erreichbaren Knoten mit jeder Ebene, statt nur um eins. Genau daher kommt der Sprung von `n` auf `log n`, der die nächsten Seiten trägt.
:::

## Wo Bäume auftauchen

Bäume sind keine Erfindung für den Informatikunterricht. Du benutzt sie täglich:

| Wo | Wurzel | Blätter |
| --- | --- | --- |
| Dateisystem | das oberste Verzeichnis | die Dateien |
| Stammbaum | die älteste Generation | die jüngste |
| Turnierbaum | der Sieger | die Erstrundenpaarungen |
| HTML-Seite | das `<html>`-Element | Texte und Bilder |
| Rechenausdruck | der zuletzt ausgeführte Operator | die Zahlen |

Die letzten beiden Zeilen sind die interessanten – sie zeigen, dass auch Dinge, die man **flach** hinschreibt, in Wahrheit eine Baumstruktur haben. Auf den nächsten beiden Seiten siehst du das an zwei Beispielen: an einem [Termbaum](./beispiel-termbaum) und an einem [Entscheidungsbaum](./beispiel-entscheidungsbaum).

:::snippet{#aufgabe}
*Ohne Rechner.*

a) Nimm die Tabelle oben und bestimme für drei der Zeilen, was jeweils ein **innerer Knoten** ist – also ein Knoten, der weder Wurzel noch Blatt ist.

b) Ein Dateisystem lässt beliebig viele Unterordner zu, ein Turnierbaum immer genau zwei Vorrundenpaarungen. Erkläre, welcher der beiden ein **Binärbaum** ist und welcher nicht.

c) Zurück in den Kinosaal: Warum funktioniert das Zählverfahren von oben **nicht**, wenn zwei Leute denselben Vordermann haben und einer von ihnen seine Zahl an zwei Personen weitergibt?
:::

::::collapsible{title="Auflösung" id="baumstrukturen-aufloesung"}

a) Zum Beispiel: im Dateisystem ein Unterverzeichnis, das selbst wieder Verzeichnisse enthält; im Stammbaum die mittlere Generation; im Turnierbaum ein Halbfinale; in der HTML-Seite ein `<div>` oder `<p>`; im Rechenausdruck ein Operator, dessen Operanden selbst wieder Rechnungen sind.

b) Der **Turnierbaum** ist ein Binärbaum: Jede Partie hat genau zwei Vorgängerpartien. Das Dateisystem ist ein allgemeiner Baum – ein Ordner darf beliebig viele Unterordner haben.

c) Dann wäre es kein Baum mehr. In einem Baum hat jeder Knoten **genau einen** Vorgänger, und jede Zahl wird genau einmal weitergegeben. Gäbe jemand seine Zahl an zwei Personen, würden dieselben Zuschauer doppelt gezählt. Eine Struktur, in der das erlaubt ist, heißt **Graph** – und die ist deutlich schwieriger zu behandeln.

::::

---

## Selbsttest

::::multievent

**1. Wie viele Vorgänger hat ein Knoten in einem Baum?**

{r1{beliebig viele}}

{r1{!genau einen – außer der Wurzel, die keinen hat}}

{r1{höchstens zwei}}

{h{Genau das unterscheidet einen Baum von einem Graphen.}}
{H{Richtig!}}

**2. Wie heißen Knoten ohne Nachfolger?**

{r2{Wurzeln}}

{r2{!Blätter}}

{r2{Zweige}}

{h{Das Bild vom Baum wird konsequent zu Ende geführt – nur steht er auf dem Kopf.}}
{H{Richtig!}}

**3. Was macht einen Baum zum Binärbaum?**

{r3{er enthält nur Zahlen}}

{r3{!jeder Knoten hat höchstens zwei Nachfolger}}

{r3{er ist immer ausgeglichen}}

{h{Der Name sagt es.}}
{H{Richtig!}}

**4. Warum arbeiten die meisten Baumalgorithmen rekursiv?**

{r4{weil Rekursion immer schneller ist}}

{r4{!weil jeder Teilbaum selbst wieder ein Baum ist}}

{r4{weil Bäume keine Schleifen zulassen}}

{h{Denk an den Kinosaal: Jeder befolgt dieselbe Regel.}}
{H{Richtig! Die Datenstruktur ist selbst rekursiv aufgebaut.}}

::::
