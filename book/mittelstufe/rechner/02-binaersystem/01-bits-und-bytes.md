---
title: Bits und Bytes
index: 1
permaid: rechner-bits-bytes
scripts:
  - /wc/binaer-stellenwert.js
---

# Bits und Bytes

Im Prozessor arbeiten Milliarden winziger Schalter, die **Transistoren**. Jeder kennt nur zwei Zustände: Strom fließt oder Strom fließt nicht. Wie soll man damit Fotos, Musik und Nachrichten speichern?

## Warum nur zwei Zustände?

Man könnte auch zehn verschiedene Spannungen verwenden – für jede Ziffer eine. Das wäre aber störanfällig: Schon kleine Schwankungen würden aus einer 6 eine 7 machen. Zwei Zustände dagegen lassen sich sicher auseinanderhalten: *an* oder *aus*, *hoch* oder *niedrig*.

:::snippet{#merken}
- Ein :t[Bit]{#bit} ist die kleinste Informationseinheit. Es kann genau zwei Werte haben: **0** oder **1**.
- 8 Bit bilden ein **Byte**.
- Mit **n** Bit lassen sich **2ⁿ** verschiedene Muster bilden.
:::

## Wie viele Muster?

:::snippet{#aufgabe}
**Sage voraus:** Wie viele verschiedene Muster kannst du mit 3 Bit bilden? Schreibe deine Vermutung auf. Probiere es dann mit den Karten aus und schreibe alle Muster auf.
:::

<binaer-stellenwert id="rechner-bits-drei" bits="3" summe="nein" werte="nein"></binaer-stellenwert>

::textinput{id="rechner-bits-muster" placeholder="Vermutung: … · Muster: 000, 001, …" height="80px"}

::::collapsible{title="Tipp: Wie findest du alle Muster, ohne eines zu vergessen?"}

Gehe systematisch vor: Halte das erste Bit auf 0 und schreibe alle Möglichkeiten für die beiden anderen auf. Dann dasselbe mit dem ersten Bit auf 1.

::::

:::protect{password="rechner-2-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Es gibt **8** Muster: 000, 001, 010, 011, 100, 101, 110, 111. Jedes zusätzliche Bit verdoppelt die Anzahl, denn alle bisherigen Muster gibt es einmal mit 0 und einmal mit 1 davor: 2 · 2 · 2 = 2³ = 8.

:::

| Bit | Muster | Beispiel |
| ---: | ---: | --- |
| 1 | 2 | Licht an oder aus |
| 3 | 8 | – |
| 8 (1 Byte) | 256 | ein Buchstabe im ASCII-Code |
| 24 | 16 777 216 | eine Farbe eines Bildpunkts |

## Speichergrößen

Ein Foto, ein Song oder ein Film besteht aus sehr vielen Bytes. Deshalb gibt es größere Einheiten:

| Einheit | Abkürzung | Größe | ungefähr so viel wie … |
| --- | --- | --- | --- |
| Kilobyte | kB | 1 000 Byte | eine Seite Text |
| Megabyte | MB | 1 000 kB | ein Handyfoto (2–5 MB) |
| Gigabyte | GB | 1 000 MB | ein Spielfilm in HD |
| Terabyte | TB | 1 000 GB | eine große Festplatte |

:::alert{info}
Manchmal wird auch mit 1 024 statt mit 1 000 gerechnet, weil 1 024 = 2¹⁰ ist. Dann heißen die Einheiten genau genommen **Kibibyte (KiB)**, **Mebibyte (MiB)** und so weiter. Deshalb zeigt dein Computer bei einer „1-TB-Festplatte“ nur etwa 931 GB an.
:::

:::snippet{#aufgabe}
Dein Handy hat 128 GB Speicher. Davon sind 40 GB durch Apps und das Betriebssystem belegt. Ein Foto ist etwa 4 MB groß.

Schätze: Wie viele Fotos passen noch auf das Handy?
:::

::textinput{id="rechner-bits-fotos" placeholder="Freier Speicher: … GB = … MB · Anzahl Fotos: …" height="80px"}

:::protect{password="rechner-2-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Frei sind 128 GB − 40 GB = 88 GB = 88 000 MB. 88 000 MB : 4 MB = **22 000 Fotos**.

:::

---

## Selbsttest

::::multievent

**1. Wie viele Werte kann ein Bit annehmen?**
{z{2}}
{H{Richtig: 0 oder 1.}}

**2. Wie viele Bit hat ein Byte?**
{z{8}}
{H{Richtig.}}

**3. Wie viele verschiedene Muster gibt es mit 4 Bit?**
{z{16}}
{h{Jedes Bit verdoppelt die Anzahl: 2 · 2 · 2 · 2.}}
{H{Richtig.}}

**4. Warum arbeiten Computer mit nur zwei Zuständen?**
{r4{!Zwei Zustände lassen sich auch bei Störungen sicher unterscheiden.}}
{r4{Weil man mit zwei Zuständen nur kleine Zahlen darstellen kann.}}
{H{Richtig.}}

**5. Was ist größer?**
{r5{!2 GB}}
{r5{1 500 MB}}
{H{Richtig. 2 GB sind 2 000 MB.}}

::::
