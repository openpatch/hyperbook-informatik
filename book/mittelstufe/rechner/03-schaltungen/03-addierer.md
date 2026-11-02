---
title: Vom Halbaddierer zum Addierwerk
index: 3
permaid: rechner-addierer
scripts:
  - /wc/logik-schaltung.js
  - /wc/binaer-addition.js
---

# Vom Halbaddierer zum Addierwerk

Jetzt kommen beide Hälften dieses Lernpfads zusammen: das Rechnen im Binärsystem und die Logikgatter. Am Ende dieser Lektion steht eine Schaltung, die zwei Zahlen addiert – nur aus UND, ODER und XOR.

## Zwei Bits addieren

Schau dir noch einmal die Additionstabelle aus [Kapitel 2](../02-binaersystem/03-binaer-rechnen) an. Für zwei Bits A und B gibt es ein Ergebnisbit **S** (Summe) und einen **Übertrag C** (von englisch *carry*):

| A | B | C | S |
| ---: | ---: | ---: | ---: |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

:::snippet{#aufgabe}
Vergleiche die Spalten S und C mit den Wahrheitstabellen der Gatter, die du kennst. Lege dann für beide Gatter fest, welche Art sie haben müssen, und prüfe.
:::

<logik-schaltung id="rechner-halbaddierer-bauen" eingaenge="A, B" schaltung="S = ?(A, B); C = ?(A, B)" arten="und, oder, xor" soll="S: 0110; C: 0001" tabelle="zeigen"></logik-schaltung>

::::collapsible{title="Tipp"}

Die Spalte S kennst du vom Treppenhauslicht. Die Spalte C ist nur in der letzten Zeile 1.

::::

:::snippet{#merken}
Ein **Halbaddierer** addiert zwei Bits A und B:

- **Summe S = A XOR B**
- **Übertrag C = A UND B**

Er heißt *halb*, weil er einen Übertrag von der Stelle rechts davon nicht berücksichtigen kann.
:::

## Drei Bits addieren: der Volladdierer

Bei der schriftlichen Addition kommt ab der zweiten Stelle von rechts immer ein **Übertrag** von rechts dazu. Dann müssen **drei** Bits addiert werden: A, B und der eingehende Übertrag **Cin**.

Ein **Volladdierer** besteht aus zwei Halbaddierern und einem ODER-Gatter:

<logik-schaltung id="rechner-volladdierer" eingaenge="A, B, Cin" schaltung="X = xor(A, B); S = xor(X, Cin); U1 = und(A, B); U2 = und(X, Cin); Cout = oder(U1, U2)" ausgaenge="S, Cout" tabelle="ausfuellen"></logik-schaltung>

:::snippet{#aufgabe}
1. **Sage voraus:** Was müssen S und Cout bei A = 1, B = 1, Cin = 1 sein? Denk an die schriftliche Addition: 1 + 1 + 1 = ?
2. Fülle die Wahrheitstabelle aus. Stelle dazu die Schalter ein und lies die Lampen ab.
3. Prüfe in jeder Zeile: Ist **Cout S**, als Binärzahl gelesen, die Anzahl der Einsen in A, B und Cin?
:::

::::collapsible{title="Tipp zu 1"}

1 + 1 + 1 = 3 = 11₍₂₎. Welche Stelle ist S, welche ist Cout?

::::

:::protect{password="rechner-3-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 1 + 1 + 1 = 11₍₂₎, also S = 1 und Cout = 1.
2. S: 0 1 1 0 1 0 0 1 · Cout: 0 0 0 1 0 1 1 1
3. Ja. Zum Beispiel A = 1, B = 0, Cin = 1: zwei Einsen, Cout S = 10₍₂₎ = 2.

:::

## Volladdierer hintereinander: das Addierwerk

Für eine Zahl mit mehreren Stellen setzt man für jede Stelle einen Addierer ein. Der **Übertrag** einer Stelle wird zum **Cin** der nächsten Stelle links – genau wie bei der schriftlichen Addition. Für die rechte Stelle genügt ein Halbaddierer.

Die Schaltung unten addiert zwei **2-Bit-Zahlen** A1 A0 und B1 B0. Das Ergebnis ist C2 S1 S0.

<logik-schaltung id="rechner-addierwerk" eingaenge="A1, A0, B1, B0" schaltung="S0 = xor(A0, B0); C1 = und(A0, B0); X = xor(A1, B1); S1 = xor(X, C1); U1 = und(A1, B1); U2 = und(X, C1); C2 = oder(U1, U2)" ausgaenge="C2, S1, S0"></logik-schaltung>

:::snippet{#aufgabe}
1. Stelle 3 + 1 ein, also A1 A0 = 11 und B1 B0 = 01. Lies das Ergebnis C2 S1 S0 ab und rechne es ins Dezimalsystem um.
2. Rechne dieselbe Aufgabe schriftlich im Raster unten. Vergleiche: Welches Gatter in der Schaltung erzeugt den Übertrag, den du über die zweite Stelle schreibst?
3. Wie viele Volladdierer bräuchte man, um zwei **8-Bit-Zahlen** zu addieren? Begründe.
:::

<binaer-addition id="rechner-addierwerk-vergleich" bits="2" aufgaben="11+01, 10+11, 11+11"></binaer-addition>

::textinput{id="rechner-addierwerk-antworten" placeholder="1. … 2. … 3. …" height="120px"}

::::collapsible{title="Tipp zu 2"}

Der Übertrag aus der rechten Stelle heißt in der Schaltung C1. Welches Gatter hat den Ausgang C1?

::::

:::protect{password="rechner-3-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. C2 S1 S0 = 100₍₂₎ = 4 ✔
2. Schriftlich: 1 + 1 = 10, schreibe 0, übertrage 1. Diesen Übertrag erzeugt das **UND-Gatter C1** des Halbaddierers der rechten Stelle. Er geht in den Volladdierer der linken Stelle.
3. Für die rechte Stelle genügt ein Halbaddierer, für die sieben anderen Stellen braucht man je einen Volladdierer: **7 Volladdierer und 1 Halbaddierer** (oder einfach 8 Volladdierer, wenn der erste Cin fest auf 0 steht). Der Übertrag aus der höchsten Stelle zeigt einen Überlauf an.

:::

:::snippet{#merken}
Ein **Addierwerk** für n-Bit-Zahlen besteht aus n hintereinandergeschalteten Addierern. Der Übertrag jeder Stelle wird an die nächste Stelle weitergereicht. Der Übertrag aus der höchsten Stelle zeigt einen **Überlauf** an.

Das Addierwerk ist das Herz des **Rechenwerks** im Prozessor. Mit ihm lässt sich auch subtrahieren und – durch Verschieben und Addieren – multiplizieren.
:::

:::snippet{#brain}
Ein moderner Prozessor addiert 64-Bit-Zahlen. Bei einem Addierwerk wie diesem muss der Übertrag nacheinander durch alle 64 Stellen „durchklappern“, bevor das Ergebnis feststeht. Ingenieure haben deshalb Schaltungen erfunden, die die Überträge vorausberechnen (englisch *carry lookahead*). Was meinst du: Kostet das mehr oder weniger Gatter?
:::

---

## Selbsttest

::::multievent

**1. Welches Gatter liefert beim Halbaddierer die Summe S?**
{r1{!XOR}}
{r1{UND}}
{r1{ODER}}
{H{Richtig.}}

**2. Welches Gatter liefert beim Halbaddierer den Übertrag C?**
{r2{!UND}}
{r2{XOR}}
{r2{NICHT}}
{H{Richtig.}}

**3. Wie viele Eingänge hat ein Volladdierer?**
{z{3}}
{H{Richtig: A, B und der eingehende Übertrag.}}

**4. Was liefert ein Volladdierer bei A = 1, B = 1, Cin = 0?**
{r4{!S = 0, Cout = 1}}
{r4{S = 1, Cout = 0}}
{r4{S = 1, Cout = 1}}
{H{Richtig: 1 + 1 = 10₍₂₎.}}

**5. Warum heißt der Halbaddierer „halb“?**
{r5{!Er kann keinen Übertrag von rechts aufnehmen.}}
{r5{Er addiert nur halb so große Zahlen.}}
{H{Richtig.}}

**6. Woraus besteht ein Addierwerk für 4-Bit-Zahlen?**
{r6{!aus vier hintereinandergeschalteten Addierern}}
{r6{aus einem einzigen sehr großen Gatter}}
{H{Richtig.}}

::::
