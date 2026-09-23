---
title: Relative und absolute Bezüge
index: 1
permaid: mittelstufe-calc-zellbezuege
---

# Relative und absolute Bezüge

Eine Formel kann für viele Zeilen kopiert werden. Dabei muss Calc wissen: **Welche Zelladresse soll mitwandern und welche soll gleich bleiben?**

## Was ist ein Zellbezug?

Ein :t[Zellbezug]{#zellbezug} ist die Adresse einer Zelle. `B2` bedeutet: Spalte B, Zeile 2.

Angenommen, in Spalte B stehen Preise und in `F1` steht ein Wechselkurs. In `C2` soll der erste Preis umgerechnet werden:

```text
=B2*$F$1
```

Kopierst du die Formel eine Zeile nach unten, passiert Folgendes:

| Formel in C2 | Formel in C3 | Warum? |
| --- | --- | --- |
| `=B2*$F$1` | `=B3*$F$1` | Der Preis wandert von B2 zu B3. Der Wechselkurs bleibt in F1. |


:::snippet{#definition}
- Ein **relativer Bezug** wie `B2` wandert beim Kopieren mit.
- Ein **absoluter Bezug** wie `$F$1` bleibt immer bei derselben Zelle.
:::

:::alert{info}
Das Dollarzeichen hat hier **nichts mit einer Währung** zu tun. Es ist ein Feststeller: `$F` hält die Spalte F fest, `$1` hält die Zeile 1 fest.
:::

## Warum reicht `=B2*F1` nicht?

Calc verschiebt beim Kopieren jeden relativen Bezug um denselben Weg wie die Formel. Aus `=B2*F1` in C2 wird deshalb eine Zeile tiefer `=B3*F2`.

Der Bezug auf den nächsten Preis ist richtig. Der Wechselkurs steht aber weiterhin in F1 und darf nicht zu F2 wandern. Deshalb lautet die Formel `=B2*$F$1`.

:::snippet{#merken}
Frage dich vor dem Kopieren bei jedem Zellbezug:

- Soll die Formel in der nächsten Zeile den **nächsten Wert** verwenden? Dann ohne $.
- Soll sie immer **dieselbe Zelle** verwenden? Dann Spalte und Zeile mit $ festhalten.
:::

## Zwei Feststeller – vier Möglichkeiten

Kopierst du eine Formel von C2 nach D4, liegt die Kopie eine Spalte weiter rechts und zwei Zeilen tiefer.

| Bezug in C2 | Bezug in D4 | Was ist fest? |
| --- | --- | --- |
| `B2` | `C4` | nichts |
| `$B$2` | `$B$2` | Spalte und Zeile |
| `$B2` | `$B4` | nur Spalte B |
| `B$2` | `C$2` | nur Zeile 2 |

Die letzten beiden heißen **gemischte Bezüge**. Du brauchst sie vor allem, wenn du Formeln nicht nur nach unten, sondern auch nach rechts kopierst.

:::snippet{#aufgabe}
Schreibe die vier Bezüge aus der Tabelle in Calc. Sage jeweils zuerst voraus, was beim Kopieren von C2 nach D4 entsteht. Kopiere dann und vergleiche.
:::

:::protect{password="calc-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-1-1.ods)

Die Ergebnisse sind `C4`, `$B$2`, `$B4` und `C$2`. Die Dollarzeichen bleiben immer direkt vor dem Teil, den sie festhalten.

:::

## Ein Beispiel mit zwei festen Werten

In `F1` steht der Wechselkurs und in `F2` ein Rabatt. Beide Werte gelten für alle Angebote. Nur der Preis in Spalte B soll beim Kopieren wandern.

```text
=B2*(1-$F$2)*$F$1
```

Lies die Formel von links nach rechts: **Preis aus dieser Zeile · Anteil nach Rabatt · fester Wechselkurs**.

![In C2 ist die kopierbare Formel ausgewählt. B2 ist relativ; Rabatt in F2 und Wechselkurs in F1 sind absolut.](./calc-bezuege.png)

:::snippet{#aufgabe}
1. Trage sechs Preise in `B2:B7`, den Wechselkurs in `F1` und den Rabatt in `F2` ein.
2. Schreibe die Formel nur in `C2` und sage voraus, welche Bezüge beim Kopieren wandern.
3. Ziehe die Formel nach unten. Klicke anschließend `C7` an und kontrolliere die Formel in der Eingabezeile.
4. Ändere den Rabatt. Alle Endpreise müssen sich ändern.
:::

:::protect{password="calc-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-1-2.ods)

In Zeile 2 lautet die Formel etwa `=B2*(1-$F$2)*$F$1`. In Zeile 7 muss daraus `=B7*(1-$F$2)*$F$1` geworden sein. Nur der Preisbezug wandert.

:::

---

## Selbsttest

::::multievent

**1. Was passiert mit einem relativen Bezug beim Kopieren?**
{r1{!Er passt sich an die neue Position an.}}
{r1{Er bleibt immer unverändert.}}
{H{Richtig.}}

**2. Welcher Bezug hält F1 vollständig fest?**
{r2{F1}}
{r2{!Dollar F Dollar 1}}
{r2{F Dollar 1}}
{H{Richtig. Vor Spalte und Zeile steht ein Dollarzeichen.}}

**3. Was wird aus B2 beim Kopieren eine Zeile nach unten? {t{B3}}**
{H{Genau.}}

**4. In welchem Bezug bleibt nur die Zeile 2 fest?**
{r4{Dollar B 2}}
{r4{!B Dollar 2}}
{r4{Dollar B Dollar 2}}
{H{Richtig.}}

**5. Die Formel `=B2*$F$1` wird eine Zeile nach unten kopiert. Welche Formel entsteht?**
{r5{!gleich B3 * $F$1}}
{r5{gleich B2 * $F$1}}
{r5{gleich B3 * $F$2}}
{H{Richtig. B2 wandert zu B3; F1 bleibt fest.}}

::::
