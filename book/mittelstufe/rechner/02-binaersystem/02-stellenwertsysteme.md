---
title: Stellenwertsysteme
index: 2
permaid: rechner-stellenwertsysteme
scripts:
  - /wc/binaer-stellenwert.js
---

# Stellenwertsysteme

In der Zahl 333 steht dreimal dieselbe Ziffer – und doch bedeutet jede 3 etwas anderes. Genau dieser Trick erlaubt es dem Computer, mit nur zwei Ziffern jede Zahl darzustellen.

## Das Dezimalsystem

Im **Dezimalsystem** gibt es zehn Ziffern (0 bis 9). Jede Stelle ist **zehnmal** so viel wert wie die Stelle rechts von ihr:

| Stellenwert | 1000 | 100 | 10 | 1 |
| --- | ---: | ---: | ---: | ---: |
| Ziffer | 2 | 0 | 2 | 6 |

2026 = 2 · 1000 + 0 · 100 + 2 · 10 + 6 · 1

## Das Binärsystem

Im :t[Binärsystem]{#binaersystem} (auch **Dualsystem**) gibt es nur die Ziffern 0 und 1. Jede Stelle ist **doppelt** so viel wert wie die Stelle rechts von ihr.

:::snippet{#aufgabe}
Schalte die Karten an und aus. Beobachte, wie sich die Dezimalzahl unten verändert.

1. Welche Zahl ergibt sich, wenn **alle** Karten an sind?
2. Welche Karte musst du einschalten, damit eine Zahl **ungerade** wird?
:::

<binaer-stellenwert id="rechner-stellenwert-frei" bits="8"></binaer-stellenwert>

::textinput{id="rechner-stellenwert-beobachtung" placeholder="1. … 2. …" height="80px"}

:::snippet{#merken}
Im Binärsystem hat jede Stelle den doppelten Wert der Stelle rechts von ihr: 1, 2, 4, 8, 16, 32, 64, 128, …

Um eine Binärzahl in eine Dezimalzahl umzurechnen, **addierst du die Stellenwerte aller Stellen mit einer 1**:

1011₍₂₎ = 8 + 2 + 1 = 11₍₁₀₎

Die kleine Zahl in Klammern gibt das Zahlensystem an.
:::

## Dezimal → Binär

:::snippet{#aufgabe}
Stelle die Zahlen mit den Karten dar. Die nächste Zahl erscheint, wenn du richtig liegst.
:::

<binaer-stellenwert id="rechner-stellenwert-ziel" bits="8" ziel="5, 12, 19, 32, 63, 100, 170, 255"></binaer-stellenwert>

:::snippet{#beispiel}
**Verfahren 1: Größte passende Stelle zuerst.** So rechnest du 77 um:

| Stellenwert | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| passt in den Rest? | 77 − 64 = 13 ✔ | nein | nein | 13 − 8 = 5 ✔ | 5 − 4 = 1 ✔ | nein | 1 − 1 = 0 ✔ |
| Ziffer | 1 | 0 | 0 | 1 | 1 | 0 | 1 |

77₍₁₀₎ = 1001101₍₂₎
:::

:::snippet{#beispiel}
**Verfahren 2: Fortgesetzte Division durch 2.** Teile immer wieder durch 2 und schreibe den Rest auf. Die Reste **von unten nach oben** gelesen ergeben die Binärzahl:

| Rechnung | Ergebnis | Rest |
| --- | ---: | ---: |
| 77 : 2 | 38 | 1 |
| 38 : 2 | 19 | 0 |
| 19 : 2 | 9 | 1 |
| 9 : 2 | 4 | 1 |
| 4 : 2 | 2 | 0 |
| 2 : 2 | 1 | 0 |
| 1 : 2 | 0 | 1 |

Von unten gelesen: 1001101₍₂₎
:::

:::snippet{#aufgabe}
Rechne **ohne die Karten** um. Prüfe danach mit den Karten oben.

1. 1101₍₂₎ in eine Dezimalzahl
2. 10110010₍₂₎ in eine Dezimalzahl
3. 42₍₁₀₎ in eine Binärzahl
4. 200₍₁₀₎ in eine Binärzahl
:::

::textinput{id="rechner-stellenwert-umrechnen" placeholder="1. … 2. … 3. … 4. …" height="100px"}

::::collapsible{title="Tipp 1: Binär → dezimal"}

Schreibe die Stellenwerte über die Ziffern – von rechts beginnend mit 1, 2, 4, 8, … – und addiere nur die Werte über den Einsen.

::::

::::collapsible{title="Tipp 2: Dezimal → binär"}

Welcher ist der größte Stellenwert, der noch in die Zahl passt? Bei 42 ist es 32. Es bleibt ein Rest von 10. Welcher Stellenwert passt in 10?

::::

:::protect{password="rechner-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 1101₍₂₎ = 8 + 4 + 1 = **13**
2. 10110010₍₂₎ = 128 + 32 + 16 + 2 = **178**
3. 42 = 32 + 8 + 2 = **101010₍₂₎**
4. 200 = 128 + 64 + 8 = **11001000₍₂₎**

:::

:::snippet{#brain}
**Hexadezimalsystem.** Lange Binärzahlen sind schwer zu lesen. Deshalb fasst man oft 4 Bit zu einer Ziffer zusammen. Mit 4 Bit gibt es 16 Muster, also braucht man 16 Ziffern: 0–9 und dann A (10), B (11), C (12), D (13), E (14), F (15).

1011 0010₍₂₎ = B2₍₁₆₎

Farben auf Webseiten werden so angegeben: `#FF8800` steht für Rot = FF = 255, Grün = 88 = 136, Blau = 00 = 0. Welche Farbe ist das wohl?
:::

<!-- Kooperation Mathematik (SILP, verbindlich): Stellenwertsystem und Binärsystem – hier als Wiederholung aus Jg. 6 (UV 6.3). -->

---

## Selbsttest

::::multievent

**1. Welchen Wert hat 101₍₂₎ im Dezimalsystem?**
{z{5}}
{H{Richtig: 4 + 1.}}

**2. Welchen Wert hat 11111111₍₂₎?**
{z{255}}
{h{128 + 64 + 32 + 16 + 8 + 4 + 2 + 1}}
{H{Richtig. Das ist die größte Zahl, die in ein Byte passt.}}

**3. Wie lautet 9 im Binärsystem?**
{r3{!1001}}
{r3{1100}}
{r3{0110}}
{H{Richtig: 8 + 1.}}

**4. Woran erkennst du, dass eine Binärzahl gerade ist?**
{r4{!Die letzte Ziffer ist 0.}}
{r4{Die erste Ziffer ist 1.}}
{r4{Sie hat eine gerade Anzahl von Einsen.}}
{H{Richtig. Nur die Stelle mit dem Wert 1 ist ungerade.}}

**5. Was passiert mit einer Binärzahl, wenn du hinten eine 0 anhängst?**
{r5{!Sie verdoppelt sich.}}
{r5{Sie verzehnfacht sich.}}
{r5{Sie bleibt gleich.}}
{H{Richtig. Jede Ziffer rückt eine Stelle nach links und ist dann doppelt so viel wert.}}

::::
