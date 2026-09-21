---
title: Rückblick
index: 4
permaid: mittelstufe-calc-wenn-rueckblick
---

# Rückblick

Du kannst Regeln so formulieren, dass Calc abhängig von Daten unterschiedliche Ergebnisse liefert. Dabei bleiben Grenzen und Kriterien sichtbar und überprüfbar.

## Das kann ich jetzt

- [ ] Ich kann Vergleichsoperatoren passend auswählen. ([5.1](./01-die-wenn-funktion))
- [ ] Ich kann WENN aus Bedingung, Wahr-Wert und Falsch-Wert aufbauen. ([5.1](./01-die-wenn-funktion))
- [ ] Ich kann Grenzfälle systematisch testen. ([5.1](./01-die-wenn-funktion))
- [ ] Ich kann Bedingungen mit UND und ODER verknüpfen. ([5.2](./02-bedingungen-verknuepfen))
- [ ] Ich kann eine einfache verschachtelte WENN-Funktion erklären. ([5.2](./02-bedingungen-verknuepfen))
- [ ] Ich kann automatische Entscheidungen begründen und kritisch beurteilen. ([Mini-Projekt](./03-mini-projekt-reiseampel))

## Gemischte Aufgaben

:::snippet{#aufgabe}
Ein Schwimmbad gibt Jugendlichen bis einschließlich 17 Jahren Rabatt, wenn sie zusätzlich eine gültige Schülerkarte besitzen.

1. Formuliere die Bedingung mit UND.
2. Erstelle eine WENN-Formel, die „Rabatt“ oder „Normalpreis“ ausgibt.
3. Lege mindestens fünf Testfälle fest, darunter Grenz- und Fehlerfälle.
4. Erkläre, welche Information das Modell nicht prüfen kann.
:::

::::collapsible{title="Tipp"}

Prüfe Alter 16, 17 und 18 jeweils mit geeigneten Kartenwerten. Für den Rabatt müssen beide Teilbedingungen wahr sein.

::::

:::protect{password="calc-5-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-5-4-1.ods)

Bei Alter in `B2` und Kartenstatus in `C2` kann die Formel `=WENN(UND(B2<=17;C2="ja");"Rabatt";"Normalpreis")` lauten. Sinnvolle Tests sind 16/ja, 17/ja, 18/ja, 17/nein sowie eine leere oder falsch geschriebene Kartenangabe. Das Modell kann nicht feststellen, ob die vorgelegte Karte echt und gültig ist; es verarbeitet nur die eingegebenen Daten.

:::

---

## Selbsttest

::::multievent

**1. Welches Argument von WENN wird zuerst ausgewertet?**
{r1{!die Bedingung}}
{r1{der Wahr-Wert}}
{r1{der Falsch-Wert}}
{H{Richtig.}}

**2. Welcher Operator bedeutet ungleich?**
{r2{!=}}
{r2{!<>}}
{r2{><}}
{H{Richtig.}}

**3. Wann eignet sich UND?**
{r3{!wenn alle Kriterien erfüllt sein müssen}}
{r3{wenn ein beliebiges Kriterium genügt}}
{H{Richtig.}}

**4. Was gehört zu einem guten Grenztest?**
{r4{!Werte knapp unter, auf und über der Grenze}}
{r4{nur ein weit entfernter Wert}}
{H{Richtig.}}

**5. Warum müssen Entscheidungsregeln dokumentiert werden?**
{r5{!Damit Ergebnisse nachvollzogen und kritisiert werden können.}}
{r5{Damit keine Tests mehr nötig sind.}}
{H{Richtig.}}

::::
