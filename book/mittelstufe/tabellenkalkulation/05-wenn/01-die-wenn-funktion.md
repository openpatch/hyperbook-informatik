---
title: Die WENN-Funktion
index: 1
permaid: mittelstufe-calc-wenn-funktion
---

# Die WENN-Funktion

Ein Angebot kostet 148 €, das Budget liegt bei 150 €. Calc soll nicht nur die Differenz berechnen, sondern sofort melden: **im Budget**.

## Eine Frage mit zwei Ausgängen

Eine Bedingung kann wahr oder falsch sein. In Calc vergleichst du Werte beispielsweise mit:

| Operator | Bedeutung |
| --- | --- |
| `=` | gleich |
| `<>` | ungleich |
| `<` und `>` | kleiner und größer |
| `<=` und `>=` | kleiner/gleich und größer/gleich |

:::snippet{#definition}
Die Funktion **WENN** hat drei Argumente:

```text
=WENN(Bedingung; Wert_wenn_wahr; Wert_wenn_falsch)
```

Für einen Preis in `B2` und ein festes Budget in `F1`:

```text
=WENN(B2<=$F$1; "im Budget"; "zu teuer")
```
:::

:::alert{info}
In der deutschsprachigen Calc-Oberfläche trennt ein Semikolon die Argumente. Textausgaben stehen in Anführungszeichen. Bei einer englisch eingestellten Oberfläche können Funktionsname und Trennzeichen abweichen.
:::

:::snippet{#aufgabe}
Sage jeweils zuerst das Ergebnis voraus und teste dann in Calc:

1. Preis 148 €, Budget 150 €
2. Preis 150 €, Budget 150 €
3. Preis 151 €, Budget 150 €

Warum ist hier `<=` sinnvoller als `<`? Kopiere die Formel anschließend für fünf Angebote nach unten.
:::

::::collapsible{title="Tipp: Die Grenze gehört dazu"}

Ein Angebot, das genau 150 € kostet, hält das Budget noch ein. Die Bedingung muss deshalb „kleiner **oder gleich**“ lauten.

::::

:::protect{password="calc-5-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-5-1-1.ods)

148 € und 150 € ergeben „im Budget“, 151 € ergibt „zu teuer“. Der Preisbezug `B2` wandert beim Kopieren, das Budget `$F$1` bleibt fest.

:::

## Zahlen statt Text ausgeben

WENN kann auch rechnen. Bei mindestens 10 Teilnehmenden soll der Preis um 8 % sinken:

```text
=WENN(B2>=10; C2*(1-$F$2); C2)
```

:::snippet{#aufgabe}
Berechne den Endpreis für 9, 10 und 11 Teilnehmende. Teste zusätzlich Rabatt 0 %. Erkläre, weshalb 9, 10 und 11 besonders gute Testwerte sind.
:::

:::snippet{#merken}
Teste eine Entscheidungsregel immer **knapp unter der Grenze, genau auf der Grenze und knapp darüber**. So findest du vertauschte Operatoren besonders schnell.
:::

---

## Selbsttest

::::multievent

**1. Aus wie vielen Argumenten besteht WENN?**

{r1{zwei}}
{r1{!drei}}
{r1{vier}}

{h{Bedingung und zwei mögliche Ergebnisse.}}
{H{Richtig: Bedingung, Wahr-Wert und Falsch-Wert.}}

**2. Welcher Operator bedeutet kleiner oder gleich?**

{r2{<}}
{r2{!<=}}
{r2{<>}}

{h{Die Grenze soll eingeschlossen sein.}}
{H{Richtig.}}

**3. Was liefert WENN bei einer falschen Bedingung?**

{r3{immer null}}
{r3{!das dritte Argument}}
{r3{das zweite Argument}}

{h{Zähle die Argumente von links.}}
{H{Richtig. Das dritte Argument ist der Falsch-Wert.}}

**4. Warum steht das Budget als absoluter Bezug in der Formel?**

{r4{!Es soll beim Kopieren fest bleiben.}}
{r4{Es soll in jeder Zeile wechseln.}}

{H{Richtig.}}

**5. Welche drei Testwerte prüfen eine Grenze von 10 besonders gut?**

{r5{!9, 10 und 11}}
{r5{1, 5 und 100}}
{r5{10, 20 und 30}}

{H{Richtig: direkt unter, auf und über der Grenze.}}

::::
