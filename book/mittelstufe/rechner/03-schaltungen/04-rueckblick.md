---
title: Rückblick
index: 4
permaid: rechner-schaltungen-rueckblick
scripts:
  - /wc/logik-schaltung.js
---

# Rückblick

Du hast aus einfachen Schaltern eine Schaltung gebaut, die Zahlen addiert – so arbeitet das Rechenwerk jedes Prozessors.

## Das kann ich jetzt

- [ ] Ich kann die Gatter UND, ODER und NICHT an ihren Schaltzeichen erkennen und ihre Wahrheitstabellen angeben. ([3.1](./01-logikgatter))
- [ ] Ich kann für eine Schaltung die Wahrheitstabelle aufstellen. ([3.1](./01-logikgatter))
- [ ] Ich kann eine Schaltung simulieren und prüfen, ob sie eine Vorgabe erfüllt. ([3.2](./02-schaltungen-entwerfen))
- [ ] Ich kann eine einfache Schaltung zu einer Beschreibung entwerfen. ([3.2](./02-schaltungen-entwerfen))
- [ ] Ich kann erklären, wie ein Halbaddierer und ein Volladdierer zwei bzw. drei Bits addieren. ([3.3](./03-addierer))
- [ ] Ich kann erklären, wie aus Volladdierern ein Addierwerk entsteht. ([3.3](./03-addierer))

## Gemischte Aufgaben

:::snippet{#aufgabe}
Analysiere die Schaltung.

1. Stelle die Wahrheitstabelle auf – zuerst **ohne** die Schalter, dann prüfe.
2. Beschreibe in einem Satz, wann Y = 1 ist.
3. Durch welches einzelne Gatter könnte man die ganze Schaltung ersetzen?
:::

<logik-schaltung id="rechner-rb3-analyse" eingaenge="A, B" schaltung="NA = nicht(A); NB = nicht(B); Y = und(NA, NB)" tabelle="ausfuellen"></logik-schaltung>

::textinput{id="rechner-rb3-analyse-text" placeholder="2. Y ist 1, wenn … 3. …" height="80px"}

::::collapsible{title="Tipp"}

Y ist nur dann 1, wenn beide NICHT-Gatter 1 liefern. Wann ist das der Fall?

::::

:::protect{password="rechner-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Y: 1 0 0 0
2. Y ist 1, wenn **weder A noch B** 1 ist.
3. Durch ein **NOR-Gatter** (ODER mit Kreis am Ausgang): Es liefert 1 genau dann, wenn kein Eingang 1 ist.

:::

:::snippet{#aufgabe}
Ein Kopierer darf nur starten, wenn die **Klappe geschlossen** ist (K = 1), **Papier** eingelegt ist (P = 1) und **entweder** eine **Karte** steckt (C = 1) **oder** ein **Code** eingegeben wurde (D = 1) – beides gleichzeitig ist auch in Ordnung.

1. Lege die Gatter fest und prüfe die Schaltung.
2. Begründe, warum für C und D kein XOR-Gatter passt, obwohl im Text „entweder – oder“ steht.
:::

<logik-schaltung id="rechner-rb3-kopierer" eingaenge="K, P, C, D" schaltung="Bereit = ?(K, P); Bezahlt = ?(C, D); Start = ?(Bereit, Bezahlt)" arten="und, oder, xor" soll="Start: 0000000000000111"></logik-schaltung>

::textinput{id="rechner-rb3-kopierer-text" placeholder="2. XOR passt nicht, weil …" height="80px"}

:::protect{password="rechner-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. Bereit = UND(K, P), Bezahlt = ODER(C, D), Start = UND(Bereit, Bezahlt).
2. Wer Karte **und** Code benutzt, soll trotzdem kopieren dürfen. Ein XOR-Gatter würde dann 0 liefern und den Start verhindern. Das Alltags-„entweder – oder“ ist hier ein ODER der Informatik.

:::

---

## Selbsttest

::::multievent

**1. Ordne zu.**

Ausgang 1 nur, wenn alle Eingänge 1 sind: {S1{UND}}

Ausgang 1, wenn mindestens ein Eingang 1 ist: {S1{ODER}}

Ausgang 1, wenn genau ein Eingang 1 ist: {S1{XOR}}

Ausgang ist das Gegenteil des Eingangs: {S1{NICHT}}

{H{Richtig.}}

**2. Wie viele Zeilen hat die Wahrheitstabelle einer Schaltung mit 4 Eingängen?**
{z{16}}
{H{Richtig.}}

**3. Ein Halbaddierer bekommt A = 1 und B = 1. Was liefert er?**
{r3{!S = 0, C = 1}}
{r3{S = 1, C = 1}}
{r3{S = 1, C = 0}}
{H{Richtig.}}

**4. Wohin geht der Übertrag eines Volladdierers im Addierwerk?**
{r4{!in den Volladdierer der nächsten Stelle links}}
{r4{zurück in denselben Volladdierer}}
{H{Richtig.}}

**5. Welche Aussage stimmt?**
{r5{!Ein Prozessor rechnet mit Schaltungen aus Logikgattern.}}
{r5{Ein Prozessor speichert für jede mögliche Rechnung das Ergebnis in einer Tabelle.}}
{H{Richtig.}}

::::
