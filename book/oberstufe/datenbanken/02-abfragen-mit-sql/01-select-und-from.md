---
title: SELECT und FROM
index: 1
---

# SELECT und FROM

Jede Abfrage besteht aus mindestens zwei Teilen: **was** du sehen willst und **woher** es kommt.

## Die Projektion

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Auswahl.sql
SELECT * FROM band;

SELECT name, herkunftsland FROM band;

SELECT name FROM band;
```

:::

:::snippet{#definition}
Das Auswählen von **Spalten** heißt **Projektion**. Der Stern `*` steht für „alle Spalten".

Die Reihenfolge im `SELECT` bestimmt die Reihenfolge im Ergebnis – sie muss nicht der Reihenfolge in der Tabelle entsprechen.
:::

:::snippet{#aufgabe}
a) Führe alle drei Anweisungen aus. Wie viele Zeilen liefert jede?

b) Schreibe eine Abfrage, die `herkunftsland` **vor** `name` ausgibt.

c) Warum liefern alle drei Anweisungen gleich viele Zeilen, obwohl die dritte nur eine Spalte hat?
:::

:::protect{password="db-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Alle drei liefern 22 Zeilen.

b)

```sql Loesung_b.sql
SELECT herkunftsland, name FROM band;
```

c) Weil `SELECT` nur über die **Spalten** entscheidet. Wie viele Zeilen im Ergebnis stehen, hängt allein von `FROM` und `WHERE` ab. Eine Projektion streicht Spalten, keine Zeilen.

:::

:::snippet{#brain}
In der Theorie der Relationen entfernt die Projektion doppelte :t[Tupel]{#tupel} – eine :t[Relation]{#relation} ist ja eine *Menge*. SQL macht das **nicht** von selbst: `SELECT herkunftsland FROM band` liefert 22 Zeilen, obwohl es nur 8 verschiedene Länder gibt.

Der Grund ist praktischer Natur: Doppelte zu entfernen kostet Rechenzeit, und meistens braucht man sie nicht entfernt. Wer sie loswerden will, sagt es ausdrücklich – dazu kommen wir in der Lektion über [Sortieren und Begrenzen](./03-sortieren-und-begrenzen).
:::

## Spalten benennen

Die Spaltenüberschrift im Ergebnis lässt sich ändern:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="530px"}

```mysql Benennen.sql
SELECT name AS bandname, gruendungsjahr AS gegruendet
  FROM band;

SELECT name bandname, gruendungsjahr gegruendet
  FROM band;
```

:::

:::snippet{#merken}
Ein solcher Ersatzname heißt **Alias**. Das Schlüsselwort `AS` darf man weglassen, aber mit `AS` liest es sich deutlich besser – gerade wenn viele Spalten aufgezählt werden. Schreibe `AS`.
:::

## Syntax und Semantik

Zwei Begriffe, die du sauber auseinanderhalten solltest:

:::snippet{#definition}
Die **Syntax** einer Sprache legt fest, welche Zeichenfolgen überhaupt gültige Anweisungen sind. Ein Verstoß gegen die Syntax führt zu einer Fehlermeldung – die Anweisung läuft gar nicht erst.

Die **Semantik** legt fest, was eine gültige Anweisung **bedeutet**, also welches Ergebnis sie liefert.
:::

Der Unterschied wird an einem Beispiel klar:

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="420px"}

```mysql Syntax.sql
-- Diese Abfrage scheitert absichtlich. Lies die Meldung im Reiter Fehler.
SELECT name, herkunftslamd FROM band;
```

:::

:::snippet{#aufgabe}
a) Die Abfrage oben enthält einen Tippfehler. Öffne den Reiter *Fehler* und lies die Meldung. Handelt es sich um einen Syntax- oder um einen Semantikfehler?

b) Repariere den Tippfehler.

c) Diese beiden Abfragen sind beide syntaktisch korrekt, liefern aber Verschiedenes:

```sql
SELECT name FROM band;
SELECT name FROM buehne;
```

Erkläre damit den Unterschied zwischen Syntax und Semantik in eigenen Worten.
:::

::::collapsible{title="Tipp: Woran erkennt man den Unterschied?"}

Frag dich: Kann der Rechner den Fehler allein durch Ansehen der Anweisung finden, ohne die Datenbank zu kennen? Wenn ja, ist es ein Syntaxfehler.

::::

:::protect{password="db-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es ist ein **Semantik**fehler im weiteren Sinn: Die Anweisung ist grammatisch einwandfrei gebaut – `SELECT` *irgendwas* `FROM` *irgendwas*. Erst wenn man das Schema der Datenbank hinzunimmt, zeigt sich, dass es die Spalte `herkunftslamd` nicht gibt. Ein reiner Syntaxfehler wäre zum Beispiel `SELECT FROM band;` – dort fehlt ein Pflichtbestandteil, und das sieht man der Anweisung ohne jede Datenbank an.

b) `SELECT name, herkunftsland FROM band;`

c) Beide Anweisungen haben dieselbe Syntax – dasselbe Muster aus `SELECT`, Spaltenname, `FROM`, Tabellenname. Ihre Bedeutung ist verschieden: Die eine liefert Bandnamen, die andere Bühnennamen. Syntax ist die Form, Semantik ist die Bedeutung.

:::

<!--
KLP QPh, Formale Sprachen und Automaten: erläutern die Syntax und Semantik von
Programmen und Datenbankabfragen (A). Vertiefung in 04/05.
-->

---

## Selbsttest

::::multievent

**1. Was bewirkt der Stern in SELECT * FROM band?**

{r1{Er sortiert das Ergebnis.}}

{r1{!Er wählt alle Spalten aus.}}

{r1{Er wählt alle Zeilen aus.}}

{r1{Er entfernt doppelte Zeilen.}}

{h{Der Stern steht dort, wo sonst die Spaltennamen stehen.}}
{H{Richtig. Alle Zeilen bekommt man auch ohne Stern – dafür ist WHERE zuständig.}}

**2. Wie nennt man das Auswählen von Spalten mit Fachbegriff?**

{r2{Selektion}}

{r2{!Projektion}}

{r2{Verbund}}

{r2{Aggregation}}

{h{Das andere Wort, Selektion, meint das Auswählen von Zeilen.}}
{H{Richtig. Projektion für Spalten, Selektion für Zeilen.}}

**3. Wozu dient AS in einer Abfrage?**

{r3{Es sortiert nach der Spalte.}}

{r3{Es filtert die Zeilen.}}

{r3{!Es gibt der Ergebnisspalte einen anderen Namen.}}

{r3{Es verbindet zwei Tabellen.}}

{h{Denk an SELECT name AS bandname.}}
{H{Richtig. Ein solcher Ersatzname heißt Alias.}}

**4. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Die Syntax legt fest, welche Anweisungen überhaupt gültig sind.}}

{c1{!Die Semantik legt fest, was eine Anweisung bedeutet.}}

{c1{!Zwei Anweisungen können dieselbe Syntax und verschiedene Bedeutungen haben.}}

{c1{Eine syntaktisch korrekte Anweisung liefert immer das gewünschte Ergebnis.}}

{h{Denk an die beiden Abfragen auf band und auf buehne.}}
{H{Richtig. Syntaktisch korrekt heißt nur: der Rechner versteht die Form.}}

**5. Wie viele verschiedene Herkunftsländer gibt es in der Tabelle band?**

{z{8}}

{h{Führe SELECT herkunftsland FROM band aus und zähle die verschiedenen Werte – nicht die Zeilen.}}
{H{Richtig – bei 22 Zeilen.}}

::::
