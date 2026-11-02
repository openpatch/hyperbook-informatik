---
title: Logikgatter
index: 1
permaid: rechner-logikgatter
scripts:
  - /wc/logik-schaltung.js
---

# Logikgatter

Eine Lampe soll nur leuchten, wenn **beide** Schalter an sind. Eine andere soll leuchten, wenn **mindestens einer** an ist. Mit solchen einfachen Regeln fängt alles an, was ein Prozessor tut.

## Schalter in Reihe und parallel

Aus dem Physikunterricht kennst du zwei Arten, Schalter zu verbinden:

- **In Reihe:** Strom fließt nur, wenn Schalter A **und** Schalter B geschlossen sind.
- **Parallel:** Strom fließt, wenn Schalter A **oder** Schalter B (oder beide) geschlossen sind.

Im Computer sind die Schalter Transistoren, und statt „Strom fließt“ sagt man **1**, statt „kein Strom“ **0**. Eine Schaltung, die aus Eingangsbits nach einer festen Regel ein Ausgangsbit macht, heißt :t[Logikgatter]{#logikgatter}.

## Das UND-Gatter

:::snippet{#aufgabe}
Probiere alle Kombinationen der Schalter aus und fülle die :t[Wahrheitstabelle]{#wahrheitstabelle} aus. Prüfe dann.
:::

<logik-schaltung id="rechner-gatter-und" eingaenge="A, B" schaltung="Y = und(A, B)" tabelle="ausfuellen"></logik-schaltung>

## Das ODER-Gatter

:::snippet{#aufgabe}
**Sage voraus**, wie die Tabelle des ODER-Gatters aussieht. Fülle sie aus, bevor du die Schalter benutzt. Prüfe dann mit den Schaltern.
:::

<logik-schaltung id="rechner-gatter-oder" eingaenge="A, B" schaltung="Y = oder(A, B)" tabelle="ausfuellen"></logik-schaltung>

## Das NICHT-Gatter

<logik-schaltung id="rechner-gatter-nicht" eingaenge="A" schaltung="Y = nicht(A)" tabelle="ausfuellen"></logik-schaltung>

:::snippet{#merken}
| Gatter | Zeichen im Rechteck | Ausgang ist 1, wenn … |
| --- | --- | --- |
| **UND** | & | **alle** Eingänge 1 sind |
| **ODER** | ≥1 | **mindestens ein** Eingang 1 ist |
| **NICHT** | 1 mit Kreis am Ausgang | der Eingang 0 ist – es kehrt um |

Der kleine **Kreis** am Ausgang bedeutet immer: Das Ergebnis wird umgekehrt (negiert).

Eine **Wahrheitstabelle** listet für **jede** Kombination der Eingänge den Ausgang auf. Bei 2 Eingängen hat sie 4 Zeilen, bei 3 Eingängen 8 Zeilen – wie die Muster aus 2 und 3 Bit.
:::

:::alert{info}
Das ODER der Informatik bedeutet „das eine oder das andere **oder beide**“. Im Alltag meinen wir mit „oder“ manchmal „entweder – oder“: „Willst du Pizza oder Pasta?“ Dafür gibt es ein eigenes Gatter, das du in der nächsten Lektion kennenlernst.
:::

## Gatter verbinden

Der Ausgang eines Gatters kann der Eingang eines anderen sein.

:::snippet{#aufgabe}
Eine Alarmanlage soll Alarm geben, wenn sie **scharf** geschaltet ist **und** das **Fenster** **oder** die **Tür** geöffnet wird.

1. **Sage voraus:** In wie vielen der acht Fälle gibt es Alarm?
2. Fülle die Wahrheitstabelle aus. Nutze die Schalter, wenn du unsicher bist.
:::

<logik-schaltung id="rechner-gatter-alarm" eingaenge="Scharf, Fenster, Tuer" schaltung="Offen = oder(Fenster, Tuer); Alarm = und(Scharf, Offen)" tabelle="ausfuellen"></logik-schaltung>

::::collapsible{title="Tipp: Wie gehe ich systematisch vor?"}

Ist die Anlage nicht scharf (Scharf = 0), kann das UND-Gatter keine 1 liefern – egal, was die anderen Schalter tun. Damit sind die ersten vier Zeilen schon erledigt.

::::

:::protect{password="rechner-3-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

In **drei** Fällen gibt es Alarm: Scharf = 1 und mindestens eines von Fenster und Tür ist 1. Die Spalte Alarm lautet von oben nach unten: 0 0 0 0 0 1 1 1.

:::

:::snippet{#brain}
Eine Schaltung lässt sich auch als **Formel** schreiben: Alarm = Scharf UND (Fenster ODER Tür). Wo stehen in dieser Formel die Klammern – und was passiert, wenn man sie weglässt und „Scharf UND Fenster ODER Tür“ liest?
:::

---

## Selbsttest

::::multievent

**1. Ein UND-Gatter mit zwei Eingängen liefert 1, wenn …**
{r1{!beide Eingänge 1 sind}}
{r1{mindestens ein Eingang 1 ist}}
{r1{genau ein Eingang 1 ist}}
{H{Richtig.}}

**2. Ein ODER-Gatter liefert 0, wenn …**
{r2{!beide Eingänge 0 sind}}
{r2{beide Eingänge 1 sind}}
{H{Richtig. Nur dann.}}

**3. Wie viele Zeilen hat die Wahrheitstabelle einer Schaltung mit 3 Eingängen?**
{z{8}}
{H{Richtig: 2 · 2 · 2.}}

**4. Was bedeutet der kleine Kreis am Ausgang eines Gatters?**
{r4{!Das Ergebnis wird umgekehrt.}}
{r4{Das Gatter ist ausgeschaltet.}}
{H{Richtig.}}

**5. Ordne zu.**

Zeichen &: {S5{UND}}

Zeichen ≥1: {S5{ODER}}

Zeichen 1 mit Kreis: {S5{NICHT}}

{H{Richtig.}}

**6. Zwei Schalter in Reihe entsprechen welchem Gatter?**
{r6{!UND}}
{r6{ODER}}
{H{Richtig.}}

::::
