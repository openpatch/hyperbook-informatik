---
title: Rückblick
index: 6
permaid: rechner-binaersystem-rueckblick
scripts:
  - /wc/binaer-stellenwert.js
  - /wc/binaer-shift.js
  - /wc/zweierkomplement.js
---

# Rückblick

Du kannst jetzt Zahlen so darstellen, verschieben und addieren, wie es ein Computer tut – auch negative Zahlen.

## Das kann ich jetzt

- [ ] Ich kann erklären, warum ein Computer mit zwei Zuständen arbeitet. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann berechnen, wie viele Muster sich mit n Bit bilden lassen. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann Speichergrößen in kB, MB, GB und TB einschätzen und umrechnen. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann Binärzahlen in Dezimalzahlen umrechnen und umgekehrt. ([2.2](./02-stellenwertsysteme))
- [ ] Ich kann Binärzahlen schriftlich addieren. ([2.3](./03-binaer-rechnen))
- [ ] Ich kann erkennen und erklären, wann ein Überlauf entsteht. ([2.3](./03-binaer-rechnen))
- [ ] Ich kann Zahlen durch Bitshift verdoppeln und halbieren. ([2.4](./04-bitshift))
- [ ] Ich kann erklären, was beim Schieben mit herausfallenden Bits passiert. ([2.4](./04-bitshift))
- [ ] Ich kann negative Zahlen als Zweierkomplement darstellen. ([2.5](./05-zweierkomplement))
- [ ] Ich kann durch Addieren des Zweierkomplements subtrahieren. ([2.5](./05-zweierkomplement))

## Training

Zufällige Zahlen zum Umrechnen – so lange du willst:

<binaer-stellenwert id="rechner-rb2-zufall" bits="8" ziel="zufall"></binaer-stellenwert>

Zufällige Zielwerte – erreiche sie nur durch Verschieben:

<binaer-shift id="rechner-rb2-shift-zufall" bits="8" modus="ziel"></binaer-shift>

Zufällige Aufgaben zum Zweierkomplement – stelle negative Zahlen dar und prüfe:

<zweierkomplement id="rechner-rb2-komplement-zufall" bits="8" richtung="darstellen"></zweierkomplement>

## Gemischte Aufgaben

:::snippet{#aufgabe}
Ein Taschenrechner rechnet intern mit einem **6-Bit-Register**.

1. Gib die größte Zahl an, die er darstellen kann – binär und dezimal.
2. Berechne schriftlich im Binärsystem 101101₍₂₎ + 010110₍₂₎.
3. Prüfe dein Ergebnis im Dezimalsystem.
4. Entscheide, ob ein Überlauf entsteht. Falls ja: Welche Zahl zeigt der Taschenrechner an?
:::

::textinput{id="rechner-rb2-register" placeholder="1. … 2. … 3. … 4. …" height="140px"}

::::collapsible{title="Tipp 1"}

Die größte Zahl hat an allen sechs Stellen eine 1.

::::

::::collapsible{title="Tipp 2"}

101101₍₂₎ = 32 + 8 + 4 + 1. Rechne 010110₍₂₎ genauso um.

::::

:::protect{password="rechner-2-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 111111₍₂₎ = 63
2. 101101 + 010110 = **1000011₍₂₎** (sieben Stellen)
3. 45 + 22 = 67 = 64 + 2 + 1 ✔
4. Das Ergebnis braucht 7 Bit, das Register hat nur 6 → **Überlauf**. Im Register bleibt 000011₍₂₎ = **3** stehen.

:::

:::snippet{#aufgabe}
Ein Bild hat 1 000 × 1 000 Bildpunkte. Für jeden Bildpunkt werden 3 Byte gespeichert (je eines für Rot, Grün und Blau).

1. Berechne die Dateigröße in MB.
2. Wie viele verschiedene Farben kann ein Bildpunkt annehmen? Begründe mit der Anzahl der Bits.
:::

::textinput{id="rechner-rb2-bild" placeholder="1. … 2. …" height="100px"}

:::protect{password="rechner-2-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 1 000 · 1 000 · 3 Byte = 3 000 000 Byte = **3 MB** (ohne Kompression).
2. 3 Byte = 24 Bit. Mit 24 Bit gibt es 2²⁴ = **16 777 216** verschiedene Muster, also so viele Farben.

:::

:::snippet{#aufgabe}
Ein Wettergrafik-Programm speichert Temperaturen in einem **8-Bit-Register mit Zweierkomplement**. Die Berechnung ist in drei Schritten gefragt:

1. Der Wert −75 soll gespeichert werden. Bilde das Zweierkomplement – schreibe alle Zwischenschritte auf.
2. Im Register steht später das Muster 10110101₍₂₎. Welchen Temperaturwert zeigt das Programm an?
3. Das Programm addiert 127 + 1. Welchen Wert enthält das Register danach – und wie heißt dieser Fehler?
:::

::textinput{id="rechner-rb2-komplement" placeholder="1. … 2. … 3. …" height="120px"}

::::collapsible{title="Tipp 1"}

Zuerst +75 binär aufschreiben, dann alle Bits umdrehen, dann 1 addieren.

::::

::::collapsible{title="Tipp 2"}

Das Muster beginnt mit 1 – es ist also negativ. Umdrehen und 1 addieren ergibt den Betrag.

::::

:::protect{password="rechner-2-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. +75 = 01001011₍₂₎ → umdrehen: 10110100 → +1: **10110101₍₂₎**
2. Zufällig genau das gleiche Muster wie in Aufgabe 1: **−75**. Probe über umgekehrten Weg: umdrehen 01001010 + 1 = 01001011 = 75 ✔
3. 01111111 + 00000001 = 10000000₍₂₎ = **−128**. Der Überlauf hat das Vorzeichen gedreht – das ist ein **Ganzzahlüberlauf** (integer overflow).

:::

:::snippet{#aufgabe}
Ein Rechner muss 45 · 8 berechnen. Er multipliziert nicht, sondern schiebt die Zahl im 8-Bit-Register um drei Stellen nach links.

1. Erkläre, warum drei Linksshifts dasselbe bewirken wie „mal 8“.
2. Schreibe 45 binär und schiebe dreimal – notiere bei jedem Schritt, welches Bit herausfällt.
3. Welchen Wert enthält das Register am Ende, und warum ist er falsch?
:::

::textinput{id="rechner-rb2-shift" placeholder="1. … 2. … 3. …" height="120px"}

::::collapsible{title="Tipp zu 1"}

Jeder Linksshift verdoppelt den Wert. Was machen drei Shifts hintereinander?

::::

:::protect{password="rechner-2-6-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Jeder Linksshift verdoppelt den Wert. Drei Shifts hintereinander: ×2 · ×2 · ×2 = **mal 8**.
2. 45 = 00101101₍₂₎ → nach Shift 1: 01011010₍₂₎ (90, herausgefallen: 0) → nach Shift 2: 10110100₍₂₎ (180, herausgefallen: 0) → nach Shift 3: 01101000₍₂₎, herausgefallen: **1**.
3. Im Register steht 01101000₍₂₎ = **104** – statt 360. Die führende 1 des Zwischenschritts 10110100₍₂₎ ist beim dritten Shift herausgefallen. Kontrolle: 360 − 256 = **104** – genau der „verlorene" Anteil 256.

:::

---

## Selbsttest

::::multievent

**1. Wie lautet 23 im Binärsystem?**
{r1{!10111}}
{r1{11011}}
{r1{10011}}
{H{Richtig: 16 + 4 + 2 + 1.}}

**2. Welchen Dezimalwert hat 1100100₍₂₎?**
{z{100}}
{h{64 + 32 + 4}}
{H{Richtig.}}

**3. Berechne 1001₍₂₎ + 0111₍₂₎ binär (mit allen Stellen).**
{z{10000}}
{h{9 + 7 = 16}}
{H{Richtig.}}

**4. Entsteht bei 1001₍₂₎ + 0111₍₂₎ in einem 4-Bit-Register ein Überlauf?**
{r4{!ja}}
{r4{nein}}
{H{Richtig: 16 passt nicht in 4 Bit.}}

**5. Wie viele Byte sind 4 kB?**
{z{4000}}
{H{Richtig.}}

**6. Berechne 0110₍₂₎ `<< 2` und gib das Ergebnis binär an.**
{z{11000}}
{h{2 Stellen schieben heißt mal 4.}}
{H{Richtig: 6 · 4 = 24.}}

**7. Wie sieht −4 in einem 4-Bit-Register mit Zweierkomplement aus?**
{r7{!1100}}
{r7{1011}}
{r7{0100}}
{H{Richtig: 0100 → umdrehen 1011 → +1 = 1100.}}

**8. Was passiert, wenn in einem 8-Bit-Register mit Zweierkomplement zu 01111111 der Wert 1 addiert wird?**
{r8{!Das Ergebnis ist 10000000, also −128}}
{r8{Das Ergebnis ist 10000000, also +128}}
{r8{Es entsteht ein Fehler und das Register bleibt unverändert}}
{H{Richtig: 127 ist der größte darstellbare Wert – der Überlauf dreht das Vorzeichen um.}}

::::
