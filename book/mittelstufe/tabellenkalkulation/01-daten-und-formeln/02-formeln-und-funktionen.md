---
title: Formeln und Funktionen
index: 2
permaid: mittelstufe-calc-formeln-funktionen
---

# Formeln und Funktionen

Wenn sich ein Preis ändert, möchtest du nicht alle Summen von Hand neu ausrechnen. Eine Formel macht aus Eingaben automatisch neue Informationen.

## Rechnen mit Zellbezügen

Trage in `B2` die Teilnehmerzahl 24 und in `C2` den Preis pro Person 129,90 € ein. Schreibe in `D2` nicht das Ergebnis, sondern:

```text
=B2*C2
```

Ändere danach `B2`. Das Ergebnis folgt automatisch.

:::snippet{#definition}
Eine **Formel** beginnt mit `=` und verknüpft Werte oder Zellbezüge. Ein :t[Zellbezug]{#zellbezug} wie `B2` sorgt dafür, dass Calc bei Änderungen neu rechnet.
:::

:::snippet{#aufgabe}
Ergänze Fahrt, Unterkunft und Eintritt. Berechne für jede Position die Gesamtkosten. Berechne darunter mit einer einzigen Formel die Summe aller Kosten.

Sage vor dem Ändern voraus: Was passiert mit der Gesamtsumme, wenn die Teilnehmerzahl von 24 auf 25 steigt?
:::

## Funktionen statt langer Rechnungen

Eine :t[Funktion]{#funktion} verarbeitet Argumente nach einer festen Vorschrift.

| Zweck | Formel |
| --- | --- |
| Summe | `=SUMME(D2:D4)` |
| Mittelwert | `=MITTELWERT(C2:C4)` |
| kleinster Wert | `=MIN(C2:C4)` |
| größter Wert | `=MAX(C2:C4)` |
| Anzahl der Zahlen | `=ANZAHL(C2:C4)` |

:::snippet{#aufgabe}
Berechne für sechs europäische Reiseziele den kleinsten, größten und mittleren Preis. Formatiere die Ergebnisse als Währung. Prüfe jede Kennzahl durch Überschlagen.
:::

::::collapsible{title="Tipp: Funktionsassistent"}

Tippe `=` und die ersten Buchstaben der Funktion. Calc schlägt passende Funktionen vor. Der Bereich lässt sich mit der Maus markieren.

::::

:::protect{password="calc-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-1-2-1.ods)

Beispiel bei Preisen in `C2:C7`: `=MIN(C2:C7)`, `=MAX(C2:C7)` und `=MITTELWERT(C2:C7)`. Der Mittelwert muss zwischen Minimum und Maximum liegen; sonst stimmen Bereich oder Datentypen wahrscheinlich nicht.

:::

## Fehler sind Hinweise

`Err:509` weist etwa auf einen fehlenden Operator hin, `#WERT!` auf einen unpassenden Datentyp. Bei einem falschen, aber berechenbaren Bereich erscheint dagegen kein Fehler: Plausibilitätsprüfungen bleiben deine Aufgabe.

:::snippet{#merken}
Prüfe Ergebnisse mit drei Fragen: **Passt die Größenordnung? Liegt der richtige Bereich in der Formel? Sind alle verwendeten Werte Zahlen?**
:::

---

## Selbsttest

::::multievent

**1. Womit beginnt jede Formel?**

{r1{!mit einem Gleichheitszeichen}}
{r1{mit einem Doppelpunkt}}
{r1{mit einem Zellnamen}}

{h{So unterscheidet Calc Eingabe und Rechnung.}}
{H{Richtig.}}

**2. Welche Formel multipliziert B2 und C2?**

{r2{B2 mal C2}}
{r2{!gleich B2 Stern C2}}
{r2{gleich B2 Doppelpunkt C2}}

{h{Das Multiplikationszeichen ist der Stern.}}
{H{Richtig.}}

**3. Welche Funktion addiert den Bereich D2 bis D8? {t{SUMME(D2:D8)}}**

{h{Gesucht ist der deutsche Funktionsname.}}
{H{Genau.}}

**4. Ein Mittelwert liegt über dem größten Einzelwert. Was ist am wahrscheinlichsten?**

{r4{Das ist bei Mittelwerten normal.}}
{r4{!Bereich oder Daten sind fehlerhaft.}}
{r4{Die Zelle braucht Prozentformat.}}

{h{Überschlage, wo ein Mittelwert liegen muss.}}
{H{Richtig. Er muss zwischen Minimum und Maximum liegen.}}

**5. Warum ist ein Zellbezug besser als eine fest eingetippte Zahl?**

{r5{!Das Ergebnis wird bei Änderungen neu berechnet.}}
{r5{Die Datei wird kleiner.}}
{r5{Die Zelle wird automatisch formatiert.}}

{h{Ändere einen Eingangswert.}}
{H{Richtig. Genau das macht die Tabelle zum Modell.}}

::::
