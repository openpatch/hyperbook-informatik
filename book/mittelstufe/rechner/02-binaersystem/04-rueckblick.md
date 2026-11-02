---
title: Rückblick
index: 4
permaid: rechner-binaersystem-rueckblick
scripts:
  - /wc/binaer-stellenwert.js
---

# Rückblick

Du kannst jetzt Zahlen so darstellen und addieren, wie es ein Computer tut.

## Das kann ich jetzt

- [ ] Ich kann erklären, warum ein Computer mit zwei Zuständen arbeitet. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann berechnen, wie viele Muster sich mit n Bit bilden lassen. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann Speichergrößen in kB, MB, GB und TB einschätzen und umrechnen. ([2.1](./01-bits-und-bytes))
- [ ] Ich kann Binärzahlen in Dezimalzahlen umrechnen und umgekehrt. ([2.2](./02-stellenwertsysteme))
- [ ] Ich kann Binärzahlen schriftlich addieren. ([2.3](./03-binaer-rechnen))
- [ ] Ich kann erkennen und erklären, wann ein Überlauf entsteht. ([2.3](./03-binaer-rechnen))

## Training

Zufällige Zahlen zum Umrechnen – so lange du willst:

<binaer-stellenwert id="rechner-rb2-zufall" bits="8" ziel="zufall"></binaer-stellenwert>

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

:::protect{password="rechner-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

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

:::protect{password="rechner-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 1 000 · 1 000 · 3 Byte = 3 000 000 Byte = **3 MB** (ohne Kompression).
2. 3 Byte = 24 Bit. Mit 24 Bit gibt es 2²⁴ = **16 777 216** verschiedene Muster, also so viele Farben.

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

::::
