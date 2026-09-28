---
title: Eine Formel für die ganze Tabelle
index: 2
permaid: mittelstufe-calc-zwischencheck-gruppenrabatt
---

# Eine Formel für die ganze Tabelle

Für Gruppen gibt es auf der Klassenfahrt Rabatt – je nach Gruppengröße 10 %, 20 % oder 25 %. Gesucht ist für jeden Programmpunkt der Preis **nach Rabatt**.

| Programmpunkt | Preis | 10 % | 20 % | 25 % |
| --- | ---: | ---: | ---: | ---: |
| Museum | 12,00 | | | |
| Zoo | 24,50 | | | |
| Hafenrundfahrt | 18,00 | | | |
| Freizeitpark | 36,00 | | | |
| Stadtführung | 8,00 | | | |

Die Preise sind Euro pro Person (erfundene Beispielwerte). Die Rabatte stehen in `C1:E1`, die Preise in `B2:B6`.

:::snippet{#aufgabe}
Gib **eine einzige Formel** für `C2` an, die man in den ganzen Bereich `C2:E6` kopieren kann. Überlege zuerst: Wo steht der Preis? Wo steht der Rabatt?

::textinput{id="calc-zwischencheck-rabatt-idee" placeholder="Der Preis steht immer in …, der Rabatt immer in … Meine Formel: = …" height="100px"}
:::

## Am Rechner

:::snippet{#aufgabe}
1. Lege in `Klassenfahrt.ods` das Blatt `Gruppenrabatt` an und übernimm die Tabelle ab `A1`. Formatiere die Preise als Währung.
2. Probiere zuerst `=B2*(1-C1)` in `C2` und kopiere sie in den ganzen Bereich. Was siehst du in `C3`? Klicke die Zelle an und erkläre.
3. Verbessere die Formel mit `$`, bis alle Werte stimmen.
4. **Teste mit Sonderfällen:** Trage in `C1` erst `0 %`, dann `100 %` ein. Sage vorher voraus, was in Spalte C stehen muss. Setze den Wert danach auf `10 %` zurück.
5. Ergänze in Zeile 7 den günstigsten Preis jeder Spalte – mit einer Formel in `C7`, die du nach rechts kopierst.

::textinput{id="calc-zwischencheck-rabatt" placeholder="In C3 steht … Das ist falsch, weil … Richtig ist = …" height="120px"}
:::

::::collapsible{title="Tipp 1: Welche Bezüge wandern?"}

Kopierst du nach **rechts**, soll der Preis in Spalte B bleiben, der Rabatt aber zur nächsten Spalte wandern. Kopierst du nach **unten**, soll der Rabatt in Zeile 1 bleiben, der Preis aber zur nächsten Zeile wandern.

::::

::::collapsible{title="Tipp 2: Wo steht das Dollarzeichen?"}

`$B2` hält die Spalte B fest, `C$1` hält die Zeile 1 fest. Vergleiche mit der Umrechnungstabelle in [2.1](../02-bezuege/01-relative-und-absolute-bezuege).

::::

:::protect{password="calc-z-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-z-2-1.ods)

Die Formel lautet `=$B2*(1-C$1)`. Der Preis steht immer in Spalte B (`$B`), der Rabatt immer in Zeile 1 (`$1`). In `E6` steht nach dem Kopieren `=$B6*(1-E$1)`.

Mit `=B2*(1-C1)` wird `C3` zu `=B3*(1-C2)`: Calc rechnet mit dem Ergebnis aus `C2` statt mit dem Rabatt, also 24,50 · (1 − 10,80) = −240,10 €. Eine Fehlermeldung gibt es nicht.

| Programmpunkt | 10 % | 20 % | 25 % |
| --- | ---: | ---: | ---: |
| Museum | 10,80 € | 9,60 € | 9,00 € |
| Zoo | 22,05 € | 19,60 € | 18,38 € |
| Hafenrundfahrt | 16,20 € | 14,40 € | 13,50 € |
| Freizeitpark | 32,40 € | 28,80 € | 27,00 € |
| Stadtführung | 7,20 € | 6,40 € | 6,00 € |

Sonderfälle: Bei `0 %` steht in Spalte C der unveränderte Preis, bei `100 %` überall 0,00 €. In `C7` steht `=MIN(C2:C6)`, nach rechts kopiert `=MIN(D2:D6)` und `=MIN(E2:E6)`: 7,20 € · 6,40 € · 6,00 €.

:::

:::snippet{#merken}
Frage dich bei **jedem** Bezug: Wo steht der Wert?

- in **einer festen Spalte** (alle Preise in B) → `$B2`
- in **einer festen Zeile** (alle Rabatte in Zeile 1) → `C$1`
- in **einer einzigen Zelle** → `$F$1`
:::

---

## Selbsttest

::::multievent

**1. `=$B2*(1-C$1)` wird von C2 nach E6 kopiert. Was steht dann hinter dem Gleichheitszeichen?**

{r1{!\$B6*(1-E\$1)}}

{r1{\$B2*(1-E\$1)}}

{r1{D6*(1-E5)}}

{H{Richtig. Bei \$B2 wandert nur die Zeile, bei C\$1 nur die Spalte.}}

**2. Warum liefert `=B2*(1-C1)` nach dem Kopieren falsche Werte?**

{r2{!Der Rabattbezug wandert in Zeilen mit Ergebnissen.}}

{r2{Calc kann nicht mit Prozent rechnen.}}

{H{Richtig. Der Rabatt steht nur in Zeile 1 – diese Zeile muss fest bleiben.}}

**3. Welcher Sonderfall prüft, ob der Rabatt richtig eingebaut ist?**

{r3{!Rabatt 0 % – der Preis muss unverändert bleiben.}}

{r3{Ein beliebiger Rabatt wie 17 %.}}

{H{Richtig. Ein Sonderfall macht einen Teil der Formel wirkungslos.}}

**4. `=MIN(C2:C6)` wird nach rechts kopiert. Braucht die Formel ein Dollarzeichen?**

{r4{ja}}

{r4{!nein}}

{H{Richtig. Jede Spalte soll ihren eigenen Bereich verwenden – der Bezug darf wandern.}}

::::
