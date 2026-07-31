---
title: Logische Ausdrücke
index: 2
---

# Logische Ausdrücke

Die Schaltjahrregel war umständlich, weil du drei verschachtelte Fälle brauchtest. Mit **logischen Operatoren** verknüpfst du mehrere Bedingungen zu einer einzigen.

## Wahrheitswerte sind Werte

Eine Bedingung ist nichts Besonderes – sie ist ein Ausdruck vom Typ `boolean`. Man kann sie in einer Variablen speichern.

:::onlineide{height="400px"}

```java Main.java
void main() {
    int alter = 17;

    boolean volljaehrig = alter >= 18;

    IO.println("volljaehrig hat den Wert: " + volljaehrig);

    if (volljaehrig) {
        IO.println("Zutritt erlaubt.");
    } else {
        IO.println("Zutritt verweigert.");
    }
}
```

:::

:::snippet{#merken}
`alter >= 18` ist ein Ausdruck, der zu `true` oder `false` **ausgewertet** wird – genau wie `3 + 4` zu 7 ausgewertet wird.

Deshalb schreibt man **nicht** `if (volljaehrig == true)`. Das ist zwar richtig, aber überflüssig: `if (volljaehrig)` sagt dasselbe.
:::

## Und, oder, nicht

Aus dem Unterricht kennst du vielleicht schon die Logikgatter UND, ODER und NICHT. In Java heißen sie so:

:::snippet{#merken}
| Operator | Name | wahr, wenn … |
| --- | --- | --- |
| `&&` | UND (Konjunktion) | **beide** Bedingungen wahr sind |
| `\|\|` | ODER (Disjunktion) | **mindestens eine** Bedingung wahr ist |
| `!` | NICHT (Negation) | die Bedingung falsch ist |

Das ODER in der Informatik ist immer ein **einschließendes** Oder: „a oder b oder beides“.
:::

:::onlineide{height="470px"}

```java Main.java
void main() {
    boolean a = true;
    boolean b = false;

    IO.println("a && b  = " + (a && b));
    IO.println("a || b  = " + (a || b));
    IO.println("!a      = " + (!a));
    IO.println("!b      = " + (!b));
    IO.println("a && !b = " + (a && !b));
}
```

:::

## Wahrheitstafel

:::snippet{#aufgabe}
Fülle die Tabelle **auf Papier** aus, bevor du sie mit dem Programm überprüfst.

| a | b | a && b | a \|\| b | !a |
| --- | --- | --- | --- | --- |
| falsch | falsch | ? | ? | ? |
| falsch | wahr | ? | ? | ? |
| wahr | falsch | ? | ? | ? |
| wahr | wahr | ? | ? | ? |
:::

::::collapsible{title="Auflösung"}

| a | b | a && b | a \|\| b | !a |
| --- | --- | --- | --- | --- |
| falsch | falsch | falsch | falsch | wahr |
| falsch | wahr | falsch | wahr | wahr |
| wahr | falsch | falsch | wahr | falsch |
| wahr | wahr | wahr | wahr | falsch |

::::

## Und vor Oder

:::snippet{#merken}
Wie bei Punkt vor Strich gibt es auch hier eine Rangfolge:

1. `!` (Negation)
2. `&&` (Und)
3. `||` (Oder)

Also bindet `a || b && c` wie `a || (b && c)`.

**Setze im Zweifel Klammern.** Sie kosten nichts und machen die Absicht eindeutig – auch für den Menschen, der deinen Code später liest.
:::

:::snippet{#aufgabe}
Ein Informatiker geht donnerstags ins Kino oder joggen – aber nur, wenn er nicht krank ist.

a) Formuliere die Bedingung mit `&&`, `||` und `!`.

b) An welcher Stelle brauchst du Klammern? Was ginge sonst schief?
:::

::::collapsible{title="Auflösung"}

a) `(kino || joggen) && !krank`

b) Ohne Klammern würde `kino || joggen && !krank` als `kino || (joggen && !krank)` gelesen. Dann ginge er auch krank ins Kino – die Bedingung „nicht krank“ würde sich nur auf das Joggen beziehen.

::::

## Die Schaltjahrregel in einer Zeile

:::onlineide{height="420px"}

```java Main.java
void main() {
    int jahr = Integer.parseInt(IO.readln("Jahr: "));

    boolean schaltjahr = (jahr % 4 == 0 && jahr % 100 != 0) || jahr % 400 == 0;

    if (schaltjahr) {
        IO.println(jahr + " ist ein Schaltjahr.");
    } else {
        IO.println(jahr + " ist kein Schaltjahr.");
    }
}
```

:::

:::snippet{#aufgabe}
Prüfe die Bedingung an den vier Testfällen 2024, 1900, 2000 und 2023 durch – **auf Papier**, indem du die Teilbedingungen einzeln auswertest. Erst danach ausprobieren.

Beurteile anschließend: Ist diese Fassung besser als die verschachtelte aus der letzten Lektion? Begründe.
:::

::::collapsible{title="Auflösung"}

| Jahr | `% 4 == 0` | `% 100 != 0` | linker Teil | `% 400 == 0` | gesamt |
| --- | --- | --- | --- | --- | --- |
| 2024 | wahr | wahr | wahr | falsch | **wahr** |
| 1900 | wahr | falsch | falsch | falsch | **falsch** |
| 2000 | wahr | falsch | falsch | wahr | **wahr** |
| 2023 | falsch | wahr | falsch | falsch | **falsch** |

Zur Beurteilung lässt sich beides vertreten:

- **Für die kurze Fassung**: Die Regel steht an einer Stelle, die Variable `schaltjahr` benennt genau das, worum es geht, und die Verzweigung darunter ist trivial.
- **Für die verschachtelte Fassung**: Sie bildet die drei Ausnahmeregeln so ab, wie sie sprachlich formuliert sind, und ist beim ersten Lesen leichter zu verstehen.

Solche Abwägungen zu begründen ist genau das, was der Kompetenzbereich *Argumentieren* meint.

::::

## Ein Bereich, zwei Bedingungen

:::snippet{#aufgabe}
Ein häufiger Fehler: Man will prüfen, ob eine Zahl zwischen 1 und 6 liegt, und schreibt `1 <= wurf <= 6`.

Probiere es aus. Was meldet die IDE? Erkläre, warum die Schreibweise aus dem Matheunterricht hier nicht funktioniert.
:::

:::onlineide{height="360px"}

```java Main.java
// ABSICHTLICH FEHLERHAFT - die Fehlermeldung ist hier der Lerngegenstand.
void main() {
    int wurf = 4;

    if (1 <= wurf <= 6) {
        IO.println("gültiger Würfelwurf");
    }
}
```

:::

::::collapsible{title="Auflösung"}

Die IDE meldet einen Fehler. Java wertet von links nach rechts aus:

1. `1 <= wurf` ergibt einen **Wahrheitswert**, hier `true`.
2. Dann müsste `true <= 6` ausgewertet werden – und ein Wahrheitswert lässt sich nicht mit einer Zahl vergleichen.

Richtig ist:

```java
if (wurf >= 1 && wurf <= 6) {
```

::::

## Aufgabe: Eintrittspreis

:::snippet{#aufgabe}
Ein Museum verlangt:

- freier Eintritt für Kinder unter 6 und für Personen ab 65
- ermäßigt (5 €) für alle unter 18 sowie für Personen mit Schülerausweis
- sonst 12 €

Schreibe ein Programm, das Alter und Schülerausweis abfragt und den Preis ausgibt.

Formuliere die Bedingungen mit logischen Operatoren.
:::

:::onlineide{height="470px"}

```java Main.java
void main() {
    int alter = Integer.parseInt(IO.readln("Alter: "));
    String antwort = IO.readln("Schülerausweis (ja/nein): ");
    boolean ausweis = antwort.equals("ja");

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp: Reihenfolge"}

Prüfe zuerst den freien Eintritt, dann die Ermäßigung, dann den vollen Preis. Sonst bekämen die Unter-Sechsjährigen den ermäßigten Tarif, weil sie ja auch unter 18 sind.

::::

:::protect{password="java-ef-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int alter = Integer.parseInt(IO.readln("Alter: "));
    String antwort = IO.readln("Schülerausweis (ja/nein): ");
    boolean ausweis = antwort.equals("ja");

    if (alter < 6 || alter >= 65) {
        IO.println("Eintritt frei");
    } else if (alter < 18 || ausweis) {
        IO.println("Ermäßigt: 5 Euro");
    } else {
        IO.println("Voller Preis: 12 Euro");
    }
}
```

:::

## Zusatzaufgabe

:::snippet{#brain}
Zeige mit einer Wahrheitstafel, dass die beiden folgenden Ausdrücke für alle Belegungen dasselbe Ergebnis liefern:

- `!(a && b)`
- `!a || !b`

Diese Regel heißt **Gesetz von De Morgan**. Formuliere sie in Worten und überlege, wofür sie beim Programmieren nützlich sein könnte.
:::

---

## Selbsttest

::::multievent

**1. Wann ist eine Und-Verknüpfung wahr?**

{r1{wenn mindestens eine Bedingung wahr ist}}

{r1{!wenn beide Bedingungen wahr sind}}

{r1{wenn genau eine Bedingung wahr ist}}

{h{Denk an die Wahrheitstafel: nur eine Zeile liefert wahr.}}
{H{Richtig!}}

**2. Wann ist eine Oder-Verknüpfung falsch?**

{r2{!nur wenn beide Bedingungen falsch sind}}

{r2{wenn eine Bedingung falsch ist}}

{r2{nie}}

{h{Das Oder der Informatik schließt den Fall beide wahr mit ein.}}
{H{Richtig!}}

**3. Welche Aussagen zur Rangfolge stimmen?** (Mehrfachauswahl)

{c1{!Die Negation bindet am stärksten.}}

{c1{!Und bindet stärker als Oder.}}

{c1{Oder bindet stärker als Und.}}

{c1{!Klammern heben die Rangfolge auf.}}

{h{Es ist wie bei Punkt vor Strich.}}
{H{Richtig! Und vor Oder, und die Negation zuerst.}}

**4. Warum lässt sich ein Zahlenbereich nicht als 1 kleinergleich x kleinergleich 6 schreiben?**

{r3{Weil Java keine Bereiche kennt.}}

{r3{!Weil der erste Vergleich einen Wahrheitswert liefert, der sich nicht mit einer Zahl vergleichen lässt.}}

{r3{Weil man dafür switch braucht.}}

{h{Java wertet von links nach rechts aus.}}
{H{Richtig! Man braucht zwei Vergleiche, verknüpft mit Und.}}

**5. Welchen Datentyp hat der Ausdruck alter größergleich 18?**

{r4{int}}

{r4{!boolean}}

{r4{String}}

{h{Das Ergebnis ist entweder wahr oder falsch.}}
{H{Richtig! Deshalb kann man es auch in einer Variablen speichern.}}

::::
