---
title: Bedingungen verknüpfen
index: 2
permaid: mittelstufe-calc-bedingungen
---

# Bedingungen verknüpfen

Ein Reiseziel ist nur dann geeignet, wenn Preis **und** Fahrtdauer passen. Manchmal genügt dagegen eines von mehreren Kriterien.

## UND: Alles muss stimmen

`UND` ist nur wahr, wenn alle enthaltenen Bedingungen wahr sind:

```text
=WENN(UND(B2<=$H$1; C2<=$H$2); "geeignet"; "prüfen")
```

Hier muss der Preis in `B2` im Budget **und** die Fahrtdauer in `C2` unter der Grenze liegen.

## ODER: Mindestens eines genügt

`ODER` ist wahr, sobald mindestens eine Bedingung wahr ist:

```text
=WENN(ODER(D2="Bahn"; D2="Bus"); "Landweg"; "andere Anreise")
```

:::snippet{#aufgabe}
Vervollständige vor dem Ausprobieren die Wahrheitstabelle:

| Bedingung A | Bedingung B | UND | ODER |
| --- | --- | --- | --- |
| wahr | wahr | ? | ? |
| wahr | falsch | ? | ? |
| falsch | wahr | ? | ? |
| falsch | falsch | ? | ? |

Prüfe anschließend jede Zeile mit zwei Eingabezellen und Formeln in Calc.
:::

:::protect{password="calc-5-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-5-2-1.ods)

| A | B | UND | ODER |
| --- | --- | --- | --- |
| wahr | wahr | wahr | wahr |
| wahr | falsch | falsch | wahr |
| falsch | wahr | falsch | wahr |
| falsch | falsch | falsch | falsch |

:::

## Mehr als zwei Ausgaben

Eine zweite WENN-Funktion kann als Falsch-Wert dienen:

```text
=WENN(B2<100; "günstig"; WENN(B2<=150; "mittel"; "teuer"))
```

:::snippet{#aufgabe}
1. Zeichne die Entscheidung als Flussdiagramm.
2. Sage die Ausgaben für 99 €, 100 €, 150 € und 151 € voraus.
3. Prüfe die Werte in Calc.
4. Formuliere die Preisbereiche in Worten. Gibt es Lücken oder Überschneidungen?
:::

::::collapsible{title="Tipp: Von außen nach innen"}

Zuerst wird geprüft, ob der Preis unter 100 € liegt. Nur wenn das falsch ist, wird die innere WENN-Funktion ausgewertet.

::::

:::protect{password="calc-5-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-5-2-2.ods)

99 € ist „günstig“. 100 € und 150 € sind „mittel“. 151 € ist „teuer“. Die Bereiche lauten: kleiner als 100; von 100 bis einschließlich 150; größer als 150. Sie sind lückenlos und überschneiden sich nicht.

:::

:::snippet{#brain}
Viele verschachtelte WENN-Funktionen werden schnell unlesbar. Bei zahlreichen Grenzwerten ist eine separate Zuordnungstabelle oft die bessere Modellierung. Für dieses Kapitel genügen höchstens zwei ineinander geschachtelte WENN-Funktionen.
:::

---

## Selbsttest

::::multievent

**1. Wann ist UND wahr?**

{r1{wenn mindestens eine Bedingung wahr ist}}
{r1{!wenn alle Bedingungen wahr sind}}
{H{Richtig.}}

**2. Wann ist ODER falsch?**

{r2{wenn eine Bedingung falsch ist}}
{r2{!wenn alle Bedingungen falsch sind}}
{H{Richtig.}}

**3. Welche Funktion passt, wenn Preis und Fahrtdauer eingehalten werden müssen?**

{r3{!UND}}
{r3{ODER}}
{H{Richtig.}}

**4. Was ermöglicht eine WENN-Funktion als drittes Argument?**

{r4{!mehr als zwei mögliche Ausgaben}}
{r4{einen absoluten Zellbezug}}
{H{Richtig.}}

**5. Welche Werte testen die Grenzen 100 und 150 vollständig?**

{c5{!99}}
{c5{!100}}
{c5{!101}}
{c5{!149}}
{c5{!150}}
{c5{!151}}

{h{Prüfe jeweils darunter, genau darauf und darüber.}}
{H{Richtig. Damit werden beide Grenzen von beiden Seiten geprüft.}}

::::
