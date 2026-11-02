---
title: Wie der Prozessor ein Programm ausführt
index: 2
permaid: rechner-prozessor
scripts:
  - /wc/mini-prozessor.js
---

# Wie der Prozessor ein Programm ausführt

Ein Programm ist für den Prozessor nichts als eine Folge von Bitmustern im Speicher. Wie wird aus diesen Bitmustern eine Rechnung? Das siehst du hier an einem stark vereinfachten Prozessor.

## Das Modell

:::snippet{#merken}
Ein :t[Prozessor]{#prozessor} besteht vereinfacht aus zwei Teilen:

- Das **Steuerwerk** holt die Befehle nacheinander aus dem Speicher und sorgt dafür, dass sie ausgeführt werden. Der **Befehlszähler** merkt sich, wo der nächste Befehl steht. Das **Befehlsregister** hält den aktuellen Befehl fest.
- Das **Rechenwerk** rechnet – mit Addierwerken wie dem aus [Kapitel 3](../03-schaltungen/03-addierer). Sein Ergebnis landet im **Akkumulator**, einem Register.

Befehle **und** Daten stehen im selben **Speicher**. Verbunden ist alles über Leitungen, den **Bus**.
:::

Der Prozessor arbeitet immer im selben Takt, dem **Befehlszyklus**:

1. **Holen** – den Befehl aus der Zelle holen, auf die der Befehlszähler zeigt; den Befehlszähler um 1 erhöhen
2. **Dekodieren** – das Bitmuster als Befehl entschlüsseln
3. **Ausführen** – den Befehl ausführen, zum Beispiel rechnen oder speichern

## Der Mini-Prozessor

Unser Mini-Prozessor kennt sechs Befehle. Jeder Befehl ist ein Bitmuster aus 8 Bit: Die ersten 3 Bit sagen, **was** zu tun ist, die letzten 5 Bit, **mit welcher Speicherzelle**.

| Befehl | Bits | Wirkung |
| --- | --- | --- |
| STOPP | 000 | Programm beenden |
| LADE n | 001 | Inhalt von Zelle n in den Akkumulator laden |
| ADDIERE n | 010 | Inhalt von Zelle n zum Akkumulator addieren |
| SUBTRAHIERE n | 011 | Inhalt von Zelle n vom Akkumulator abziehen |
| SPEICHERE n | 100 | Akkumulator in Zelle n schreiben |
| SPRINGE n | 101 | als Nächstes den Befehl in Zelle n ausführen |

:::snippet{#aufgabe}
Das Programm unten steht in den Zellen 0 bis 3, die Daten in den Zellen 5 bis 7.

1. **Sage voraus:** Welche Zahl steht nach dem Programm in Zelle 7?
2. Führe das Programm mit „Schritt“ aus. Beobachte bei jedem Schritt, welches Register sich ändert.
3. Wie viele Klicks auf „Schritt“ brauchst du insgesamt? Erkläre die Anzahl.
:::

<mini-prozessor speicher="LADE 5; ADDIERE 6; SPEICHERE 7; STOPP; 0; 3; 4; 0"></mini-prozessor>

::textinput{id="rechner-prozessor-programm1" placeholder="1. … 2. … 3. …" height="100px"}

::::collapsible{title="Tipp zu 3"}

Jeder Befehl braucht drei Phasen. Wie viele Befehle werden ausgeführt – STOPP mitgezählt?

::::

:::protect{password="rechner-4-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. In Zelle 7 steht danach 3 + 4 = **7**.
2. Holen ändert Befehlsregister und Befehlszähler. LADE und ADDIERE ändern den Akkumulator, SPEICHERE ändert Zelle 7.
3. Vier Befehle (LADE, ADDIERE, SPEICHERE, STOPP) mit je drei Phasen: **12 Klicks**.

:::

## Befehle und Daten sehen gleich aus

:::snippet{#aufgabe}
Schau dir die Spalte „Bitmuster“ an.

1. Zelle 5 enthält die Zahl 0. Welchen Befehl würde der Prozessor darin sehen?
2. Ändere Zelle 3 von STOPP (0) auf die Zahl **160**. Führe das Programm aus. Was passiert – und warum?
:::

::textinput{id="rechner-prozessor-daten" placeholder="1. … 2. …" height="100px"}

::::collapsible{title="Tipp zu 2"}

Rechne 160 ins Binärsystem um und teile das Bitmuster in 3 + 5 Bit auf.

::::

:::protect{password="rechner-4-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

1. 0 = 00000000 – der Prozessor würde darin **STOPP** sehen.
2. 160 = 101 00000 = **SPRINGE 0**. Statt anzuhalten springt der Prozessor zurück an den Anfang und führt das Programm immer wieder aus: Er rechnet erneut 3 + 4 und schreibt 7 in Zelle 7 – ohne Ende. Das ist eine **Endlosschleife**. Der Knopf „Schritt“ wird nie mehr grau.

Der Prozessor kann Befehle und Daten nicht unterscheiden. Was er als Befehl ausführt, entscheidet allein der Befehlszähler.

:::

:::snippet{#merken}
Weil Befehle und Daten im selben Speicher stehen und gleich aussehen, kann ein Computer **jedes beliebige Programm** ausführen – man lädt es einfach in den Speicher. Diese Idee geht auf den Mathematiker **John von Neumann** (1945) zurück. Fast alle heutigen Computer arbeiten nach ihr.
:::

## Selbst programmieren

:::snippet{#aufgabe}
Schreibe ein Programm, das **Zelle 5 + Zelle 6 − Zelle 4** berechnet und das Ergebnis in Zelle 7 speichert. Trage die Befehle als Zahlen in die Spalte „ändern“ ein. In Zelle 4 steht dazu schon die Zahl 2.

Berechne die Zahl für einen Befehl so: Befehlsnummer · 32 + Adresse. Zum Beispiel LADE 5 = 1 · 32 + 5 = 37.
:::

<mini-prozessor speicher="STOPP; STOPP; STOPP; STOPP; 2; 3; 4; 0"></mini-prozessor>

::::collapsible{title="Tipp"}

Du brauchst fünf Befehle: LADE, ADDIERE, SUBTRAHIERE, SPEICHERE, STOPP. Aber Zelle 4 enthält schon Daten! Wie viele Zellen hast du für Befehle?

::::

:::protect{password="rechner-4-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Für fünf Befehle sind nur die Zellen 0 bis 3 frei. Zum Glück muss der STOPP-Befehl nicht eigens eingetragen werden: Wenn die Zelle 4 erreicht wird, steht dort 2 = 000 00010, also **STOPP**. Das Programm lautet:

| Zelle | Befehl | Zahl |
| ---: | --- | ---: |
| 0 | LADE 5 | 37 |
| 1 | ADDIERE 6 | 70 |
| 2 | SUBTRAHIERE 4 | 100 |
| 3 | SPEICHERE 7 | 135 |

Ergebnis in Zelle 7: 3 + 4 − 2 = **5**. Dass ein Datenwert hier zufällig als STOPP passt, ist ein Trick – in echten Programmen trennt man Befehle und Daten sorgfältig.

:::

---

## Selbsttest

::::multievent

**1. Bringe die Phasen des Befehlszyklus in die richtige Reihenfolge.**

{S1{Holen}}

{S1{Dekodieren}}

{S1{Ausführen}}

{H{Richtig.}}

**2. Was speichert der Befehlszähler?**
{r2{!die Adresse des nächsten Befehls}}
{r2{wie viele Befehle schon ausgeführt wurden}}
{r2{das Ergebnis der letzten Rechnung}}
{H{Richtig.}}

**3. In welchem Teil des Prozessors sitzt das Addierwerk?**
{r3{!im Rechenwerk}}
{r3{im Steuerwerk}}
{H{Richtig.}}

**4. Woran erkennt der Prozessor, ob ein Bitmuster ein Befehl oder eine Zahl ist?**
{r4{!gar nicht – er führt aus, worauf der Befehlszähler zeigt}}
{r4{an einem besonderen Bit am Anfang}}
{H{Richtig.}}

**5. Welche Zahl hat im Mini-Prozessor der Befehl ADDIERE 3?**
{z{67}}
{h{Befehlsnummer · 32 + Adresse}}
{H{Richtig: 2 · 32 + 3.}}

::::
