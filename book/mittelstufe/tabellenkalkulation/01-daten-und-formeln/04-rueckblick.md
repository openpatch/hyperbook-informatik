---
title: Rückblick
index: 4
permaid: mittelstufe-calc-daten-rueckblick
---

# Rückblick

Du kannst Daten so erfassen, dass Calc sie verarbeiten kann, und aus Eingaben mit Formeln neue Informationen gewinnen.

## Das kann ich jetzt

- [ ] Ich kann Zellen und Bereiche adressieren. ([1.1](./01-zellen-und-datentypen))
- [ ] Ich kann passende Datentypen und Zahlenformate wählen. ([1.1](./01-zellen-und-datentypen))
- [ ] Ich kann Formeln mit Zellbezügen erstellen und prüfen. ([1.2](./02-formeln-und-funktionen))
- [ ] Ich kann SUMME, MITTELWERT, MIN und MAX sinnvoll einsetzen. ([1.2](./02-formeln-und-funktionen))
- [ ] Ich kann Annahmen und Grenzen eines Kostenmodells benennen. ([Mini-Projekt](./03-mini-projekt-reiseetat))

## Gemischte Aufgaben

:::snippet{#aufgabe}
Eine Tabelle enthält `24 Personen`, `18 €`, `=24*18` und einen Mittelwert, der größer als das Maximum ist. Finde mindestens vier Modellierungs- oder Eingabefehler und verbessere sie so, dass Änderungen automatisch weitergerechnet werden.

[Fehlerhafte Calc-Datei herunterladen](./aufgabe-calc-1-4-1.ods)
:::

::::collapsible{title="Tipp"}

Trenne Wert und Einheit, ersetze feste Zahlen in Formeln durch Zellbezüge und prüfe den Bereich des Mittelwerts.

::::

:::protect{password="calc-1-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-1-4-1.ods)

`24 Personen` und `18 €` dürfen nicht als Text eingegeben werden: Wert und Einheit werden getrennt, `18` erhält ein Währungsformat. Statt der beiden fest eingetragenen Werte in `=24*18` verweist die Formel mit `=A2*B2` auf die Eingabezellen. Der Mittelwert bezog außerdem die falschen Spalten und das Gesamtergebnis ein. Mit `=MITTELWERT(B5:B7)` liegt er wieder zwischen Minimum und Maximum.

:::

---

## Selbsttest

::::multievent

**1. Was beschreibt C3?**
{r1{!Spalte C, Zeile 3}}
{r1{Zeile C, Spalte 3}}
{H{Richtig.}}

**2. Welche Eingabe ist für einen Geldbetrag geeignet?**
{r2{!eine Zahl mit Währungsformat}}
{r2{eine Zahl mit angehängtem Wort Euro}}
{H{Richtig.}}

**3. Welche Funktion liefert den größten Wert? {t{MAX}}**
{H{Genau.}}

**4. Was macht ein Modell veränderbar?**
{r4{!Formeln verwenden Zellbezüge.}}
{r4{Ergebnisse werden von Hand eingetragen.}}
{H{Richtig.}}

**5. Warum braucht ein Ergebnis einen Plausibilitätscheck?**
{r5{!Calc erkennt logisch falsche Bereiche nicht immer.}}
{r5{Calc kann keine Summen bilden.}}
{H{Richtig.}}

::::
