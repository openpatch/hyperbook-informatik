---
title: Mittelwerte berechnen und prüfen
index: 1
permaid: mittelstufe-calc-zwischencheck-mittelwerte
---

# Mittelwerte berechnen und prüfen

Die Klasse vergleicht, was eine Nacht im Hostel in fünf europäischen Städten kostet – im März, im Mai und im Juli.

| Stadt | März | Mai | Juli | Mittelwert |
| --- | ---: | ---: | ---: | ---: |
| Kopenhagen | 38 | 45 | 62 | |
| Prag | 18 | 24 | 31 | |
| Lissabon | 22 | 30 | 41 | |
| Wien | 28 | 33 | 39 | |
| Amsterdam | 42 | 55 | 74 | |
| Mittelwert | | | | |

Alle Preise sind Euro pro Nacht (erfundene Beispielwerte). Die Kopfzeile steht in Calc in Zeile 1, `Kopenhagen` also in Zeile 2.

## Wer hat recht?

Drei Personen berechnen den Mittelwert für **Kopenhagen**:

- Ali erhält `145`.
- Ben erhält `36,33`.
- Cem erhält `48,33`.

:::snippet{#aufgabe}
Entscheide **ohne Calc**, wer recht hat. Gib für die beiden anderen an, welche Formel sie vermutlich geschrieben haben.

::textinput{id="calc-zwischencheck-wer-hat-recht" placeholder="Recht hat …, weil … Ali hat vermutlich … Ben hat vermutlich …" height="120px"}
:::

::::collapsible{title="Tipp: Die Min-Max-Probe"}

Ein Mittelwert liegt immer zwischen dem kleinsten und dem größten Wert. Für Kopenhagen also zwischen 38 und 62.

::::

## Am Rechner

:::snippet{#aufgabe}
1. Lege in `Klassenfahrt.ods` das Blatt `Hostels` an und übernimm die Tabelle ab `A1`.
2. Schreibe in `E2` eine Formel für den Mittelwert von Kopenhagen und kopiere sie bis `E6`.
3. Schreibe in `B7` eine Formel für den Mittelwert im März und kopiere sie bis `D7`.
4. Prüfe jedes Ergebnis mit der Min-Max-Probe.
5. Welche Stadt ist im Schnitt am günstigsten? Schreibe in `E8` eine Formel, die den kleinsten Mittelwert findet.
6. Klicke `E6` und `D7` an: Welche Bezüge sind beim Kopieren gewandert? Warum ist das hier richtig?

::textinput{id="calc-zwischencheck-hostels" placeholder="In E6 steht … In D7 steht … Die Bezüge wandern, weil …" height="120px"}
:::

:::protect{password="calc-z-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-z-1-1.ods)

**Wer hat recht?** Cem: `=MITTELWERT(B2:D2)` ergibt 145 : 3 ≈ 48,33 €. Ali hat `=SUMME(B2:D2)` verwendet – 145 ist größer als der teuerste Monat (62 €). Ben hat vermutlich `=MITTELWERT(B2:D3)` geschrieben und Prag mitgenommen: (145 + 73) : 6 ≈ 36,33 € – das ist kleiner als der billigste Monat (38 €). Beide Fehler fallen mit der Min-Max-Probe auf; Calc selbst meldet keinen Fehler.

**Am Rechner:** `E2` enthält `=MITTELWERT(B2:D2)`, in `E6` steht nach dem Kopieren `=MITTELWERT(B6:D6)`. Ergebnisse: Kopenhagen 48,33 · Prag 24,33 · Lissabon 31,00 · Wien 33,33 · Amsterdam 57,00. `B7` enthält `=MITTELWERT(B2:B6)`, in `D7` steht `=MITTELWERT(D2:D6)`: März 29,60 · Mai 37,40 · Juli 49,40. `E8` enthält `=MIN(E2:E6)` = 24,33 (Prag).

Relative Bezüge sind hier richtig: Jede Kopie soll die Werte **ihrer eigenen** Zeile bzw. Spalte verwenden.

:::

:::snippet{#merken}
Bei einem falschen, aber berechenbaren Bereich meldet Calc **keinen Fehler**. Prüfe jeden Mittelwert: Liegt er zwischen Minimum und Maximum? Stimmt der Bereich?
:::

---

## Selbsttest

::::multievent

**1. Die Werte 38, 45 und 62 haben den Mittelwert …**

{r1{!48,33}}

{r1{145}}

{r1{36,33}}

{H{Richtig. 145 : 3 ≈ 48,33.}}

**2. Ein Mittelwert ist größer als der größte Wert. Was ist wahrscheinlich passiert?**

{r2{!Es wurde SUMME statt MITTELWERT verwendet oder der Bereich ist falsch.}}

{r2{Das kommt bei Mittelwerten vor.}}

{H{Richtig. Ein Mittelwert liegt immer zwischen Minimum und Maximum.}}

**3. `=MITTELWERT(B2:D2)` wird eine Zeile nach unten kopiert. Was steht dann hinter dem Gleichheitszeichen?**

{r3{!MITTELWERT(B3:D3)}}

{r3{MITTELWERT(B2:D2)}}

{r3{MITTELWERT(C2:E2)}}

{H{Richtig. Relative Bezüge wandern mit.}}

**4. Meldet Calc einen Fehler, wenn der Bereich eine Zeile zu viel enthält?**

{r4{ja}}

{r4{!nein}}

{H{Richtig. Calc rechnet einfach – prüfen musst du selbst.}}

::::
