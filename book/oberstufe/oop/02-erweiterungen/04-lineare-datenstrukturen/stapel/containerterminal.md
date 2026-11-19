---
name: "Containerterminal: Planen"
index: 8
lang: de
permaid: java-stapel-containerterminal
scripts:
  - /wc/oop-containerterminal.js
---

# Containerterminal: Planen

Im Hafen stehen die Container in Stapeln. Der Kran kommt immer nur an den **obersten** Container eines Stapels heran – jeder Stapel ist also ein Stapel im Sinne der Informatik. Du bist die Disponentin oder der Disponent: Du entscheidest, wohin der Kran die Container setzt. Und jede Kranbewegung kostet Geld.

:::snippet{#merken}
**Preisliste des Kranbetriebs**

| Kranbewegung | Preis |
| --- | --- |
| Container auf einen Lkw **verladen** | 20 Euro |
| Container vom Schiff auf einen Stapel **einlagern** | 20 Euro |
| Container auf einen anderen Stapel **umsetzen** | 50 Euro |
| Container auf die **Freifläche** stellen oder von dort zurückholen | 80 Euro |

Die Stapel 1 bis 3 tragen höchstens **vier** Container. Die Freifläche liegt weiter weg, dafür passt dort beliebig viel hin.
:::

## Aufgabe 1: Der erste Tag

Heute holen nacheinander drei Lkw Container ab: zuerst **4711**, dann **1234**, dann **0815**. Klicke auf einen Stapel, um seinen obersten Container an den Kran zu hängen. Klicke dann auf einen anderen Stapel – oder auf „Auf den Lkw“.

<oop-containerterminal id="containerterminal-tag-1" stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>


:::snippet{#aufgabe}
a) **Wende** für den ersten Lkw die folgende Abfolge **an** und **ermittle** die Kosten:
   1. 2001 auf die Freifläche stellen,
   2. 4711 auf den Lkw verladen,
   3. 2001 zurück auf Stapel 1 stellen.
:::
::textinput{id="containerterminal-1a" height="80px" placeholder="Mit dieser Abfolge kostet 4711 ... Euro."}

:::snippet{#aufgabe}
b) **Entwickle** einen Ablauf für den **ganzen Auftrag**, der möglichst wenig kostet. **Beschreibe** deine Strategie in einem Satz: Wohin stellst du einen Container, der im Weg steht? **Gib** die Gesamtkosten **an**.
:::
::textinput{id="containerterminal-1b" height="120px" placeholder="Meine Strategie: Einen Container, der im Weg steht, stelle ich ... – Gesamtkosten: ... Euro."}

## Aufgabe 2: Die Strategie als Struktogramm

Damit der Kran deine Strategie ohne dich ausführen kann, muss sie als **Algorithmus** dastehen – so genau, dass jemand anderes sie Schritt für Schritt abarbeiten kann, ohne nachzufragen. Dafür stehen dir die Befehle des Krans zur Verfügung – die meisten kennst du schon von der Seite [Der Kran](./containerterminal-kran). Neu ist `naechsteAbholung`. Die Stapel heißen 1, 2 und 3, die Freifläche heißt **0**.

:::snippet{#merken}
**Die Befehle des Krans**

| Befehl | Bedeutung | Kosten |
| --- | --- | --- |
| `finde(pNummer)` | Stapel, in dem der Container steht: 1 bis 3, 0 = Freifläche, -1 = nicht im Terminal | – |
| `oben(s)` | der oberste Container auf Stapel `s`, `null` bei einem leeren Stapel | – |
| `istVoll(s)` | Stehen auf Stapel `s` schon vier Container? | – |
| `naechsteAbholung(s)` | Wann wird von Stapel `s` als Nächstes etwas abgeholt? 1 = vom ersten Lkw des Auftrags, 2 = vom zweiten …, 0 = nie | – |
| `umsetzen(pVon, pNach)` | setzt den obersten Container um | 50 / 80 |
| `verladen(s)` | verlädt den obersten Container auf den Lkw | 20 |

Die Nummer eines Containers liefert `oben(s).getNummer()`. Was sich nicht mit einem Befehl sagen lässt, darfst du in Worten schreiben – aber eindeutig.
:::

:::snippet{#aufgabe}
Wählt eine Strategie aus und öffnet ihren Reiter unten. Dort findet ihr euer Struktogramm und die Tipps zu eurer Strategie:

- **A – Freifläche:** Alles, was über dem gesuchten Container steht, kommt auf die Freifläche. Nach dem Verladen kommt es zurück.
- **B – Nachbarstapel:** Ein Container, der im Weg steht, kommt auf einen anderen Stapel mit Platz. Nur wenn keiner Platz hat, kommt er auf die Freifläche.

a) **Entwickelt** zu eurer Strategie einen Algorithmus `hole(pNummer)`, der **einen** Container verlädt, und **stellt** ihn als Struktogramm oder als Java-Quelltext **dar**. Bedenkt die Grenzfälle: Der Container steht schon oben. Der Container ist gar nicht im Terminal.

b) **Kran-Test:** **Führt** euer Struktogramm in der Simulation unten für alle drei Lkw **aus** – wörtlich, so wie es dasteht, auch wenn ihr wisst, was gemeint war. **Notiert** die Kosten und jede Stelle, an der ihr raten musstet, und **verbessert** das Struktogramm.
:::

::::::tabs{id="containerterminal-strategie"}

:::::tab{title="Strategie A – Freifläche" id="containerterminal-strategie-a"}

Alles, was über dem gesuchten Container steht, kommt auf die Freifläche. Nach dem Verladen kommt es zurück.

:::struktolab{mode="edit" fontSize=15 id="containerterminal-struktogramm-a" dock="Struktogramm: Strategie A" embedded="true"}
```java
void hole(String pNummer) {

}
```
:::

::::collapsible{title="Tipp 1: Das Gerüst" id="container-tipp-a-1"}

Stapel suchen – **solange** oben nicht der gesuchte Container steht, den obersten auf die Freifläche setzen – verladen. Danach räumt eine **zweite Schleife** die Freifläche wieder ab.

::::

::::collapsible{title="Tipp 2: Wohin damit – und zurück?" id="container-tipp-a-2"}

Ein Container, der im Weg steht, kommt immer auf Stapel **0**. Nach dem Verladen holt eine zweite Schleife alles zurück: **Solange** auf der Freifläche noch ein Container steht, kommt der oberste zurück auf den Stapel, aus dem er kam.

::::

::::collapsible{title="Tipp 3: Ein Struktogramm mit Lücken" id="container-tipp-a-3"}

Das Gerüst steht schon. Übertragt es in euer Struktogramm oben und füllt die Lücken `???`.

:::struktolab{fontSize=15}
```java
void hole(String pNummer) {
    int s = finde(pNummer);
    if (s != -1) {
        while (!oben(s).getNummer().equals(pNummer)) {
            umsetzen(s, ???);
        }
        verladen(s);
        while (???) {
            umsetzen(???, ???);
        }
    }
}
```
:::

::::

::::collapsible{title="Tipp 4: Struktogramm-Puzzle" id="container-tipp-a-4"}

Alle Bausteine sind da – nur an der falschen Stelle. Zieht sie in die richtige Reihenfolge und schiebt die Anweisungen in die passende Schleife oder Verzweigung.

:::struktolab{mode="edit" fontSize=15 id="containerterminal-puzzle-a" dock="Struktogramm: Strategie A Puzzle"}
```java
void hole(String pNummer) {
    umsetzen(0, s);
    while (oben(0) != null) {
    }
    verladen(s);
    if (s != -1) {
    }
    umsetzen(s, 0);
    int s = finde(pNummer);
    while (!oben(s).getNummer().equals(pNummer)) {
    }
}
```
:::

::::

:::::

:::::tab{title="Strategie B – Nachbarstapel" id="containerterminal-strategie-b"}

Ein Container, der im Weg steht, kommt auf einen anderen Stapel mit Platz. Nur wenn keiner Platz hat, kommt er auf die Freifläche.

:::struktolab{mode="edit" fontSize=15 id="containerterminal-struktogramm-b" dock="Struktogramm: Strategie B"}
```java
void hole(String pNummer) {

}
```
:::

::::collapsible{title="Tipp 1: Das Gerüst" id="container-tipp-b-1"}

Stapel suchen – **solange** oben nicht der gesuchte Container steht, den obersten auf einen anderen Stapel setzen – verladen. Die eigentliche Arbeit steckt in der Frage, **wohin** der Container kommt.

::::

::::collapsible{title="Tipp 2: Wohin damit?" id="container-tipp-b-2"}

Ein Container, der im Weg steht, kommt auf den nächsten Stapel „im Kreis“: von 1 auf 2, von 2 auf 3, von 3 auf 1. Ist der voll, nehmt den übernächsten. Sind beide voll, bleibt nur die Freifläche 0.

Das dürft ihr in Worten schreiben. Kürzer geht es mit `s % 3 + 1`: Für die Stapel 1, 2, 3 liefert das genau den nächsten Stapel im Kreis.

::::

::::collapsible{title="Tipp 3: Ein Struktogramm mit Lücken" id="container-tipp-b-3"}

Das Gerüst steht schon. Übertragt es in euer Struktogramm oben und füllt die Lücken `???`.

:::struktolab{fontSize=15}
```java
void hole(String pNummer) {
    int s = finde(pNummer);
    if (s != -1) {
        while (!oben(s).getNummer().equals(pNummer)) {
            int ziel = ???;
            if (istVoll(ziel)) {
                ziel = ???;
            }
            if (istVoll(ziel)) {
                ziel = ???;
            }
            umsetzen(s, ziel);
        }
        verladen(s);
    }
}
```
:::

::::

::::collapsible{title="Tipp 4: Struktogramm-Puzzle" id="container-tipp-b-4"}

Alle Bausteine sind da – nur an der falschen Stelle. Zieht sie in die richtige Reihenfolge und schiebt die Anweisungen in die passende Schleife oder Verzweigung.

:::struktolab{mode="edit" fontSize=15 id="containerterminal-puzzle-b" dock="Struktogramm: Strategie B Puzzle"}
```java
void hole(String pNummer) {
    ziel = 0;
    verladen(s);
    if (istVoll(ziel)) {
    }
    int ziel = s % 3 + 1;
    while (!oben(s).getNummer().equals(pNummer)) {
    }
    ziel = ziel % 3 + 1;
    umsetzen(s, ziel);
    if (s != -1) {
    }
    int s = finde(pNummer);
    if (istVoll(ziel)) {
    }
}
```
:::

::::

:::::

::::::

<oop-containerterminal id="containerterminal-krantest" stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>

::textinput{id="containerterminal-2b" height="120px" placeholder="Kran-Test: Unser Struktogramm kostet ... Euro. Raten mussten wir an dieser Stelle: ..."}

## Aufgabe 3: Der zweite Tag

Am nächsten Morgen sieht das Terminal anders aus – und Stapel 3 ist voll. Die Lkw wollen **6002**, **6004**, **6008** und **6001**.

<oop-containerterminal id="containerterminal-tag-2" stapel="6001,6002,6003 | 6004,6005 | 6006,6007,6008,6009" auftrag="6002,6004,6008,6001" hoehe="4" bestwert="290"></oop-containerterminal>

:::snippet{#aufgabe}
a) **Führt** euer Struktogramm aus Aufgabe 2 hier **aus** und **gebt** die Kosten **an**.
:::

::textinput{id="containerterminal-3a" height="80px" placeholder="Mit unserem Struktogramm kostet der zweite Tag ... Euro."}

:::snippet{#aufgabe}
b) **Vergleicht** die Kosten eures Struktogramms am ersten Tag mit euren Kosten aus Aufgabe 1b: Von Hand wart ihr vermutlich günstiger. **Erstellt** ein Struktogramm `hole(pNummer)` zu eurer Strategie aus 1b. **Führt** es für beide Tage **aus** und **gebt** die Kosten **an**.
:::

:::struktolab{mode="edit" fontSize=15 id="containerterminal-struktogramm-3b" dock="Struktogramm: Aufgabe 3b"}
```java
void hole(String pNummer) {
  
}
```
:::

::textinput{id="containerterminal-3b" height="80px" placeholder="Mit unserer Strategie aus 1b kostet der erste Tag ... Euro, der zweite Tag ... Euro."}

::::collapsible{title="Tipp 1 zu b): Was wisst ihr beim Planen?" id="container-tipp-3b-1"}

Beim Planen von Hand schaut ihr auf die Reihe der Lkw: Von welchem Stapel wird heute gar nichts mehr abgeholt? Euer Algorithmus aus Aufgabe 2 schaut nicht hin. Mit `naechsteAbholung(s)` kann er es. Am Gerüst ändert sich nichts – nur das Ziel von `umsetzen`.

::::

::::collapsible{title="Tipp 2 zu b): Welcher Stapel ist der beste Platz?" id="container-tipp-3b-2"}

Vergleiche `naechsteAbholung` der beiden anderen Stapel. Ein Stapel mit 0 ist der beste Platz, sonst der mit der **größeren** Zahl. Ein voller Stapel scheidet aus. Haben beide Stapel keinen Platz, bleibt nur die Freifläche.

::::

:::snippet{#aufgabe}
c) **Für Knobelnde:** Am zweiten Tag zeigt die Simulation **290 Euro** als günstigsten Ablauf. Euer Struktogramm aus b) liegt vermutlich darüber. Das ist kein Fehler: Die Regel „Blocker auf den Stapel, von dem am spätesten etwas abgeholt wird“ findet den Ablauf für 290 Euro nicht.

1. **Ermittelt** in der Simulation zum zweiten Tag einen Ablauf, der nur 290 Euro kostet.
2. Euer Ablauf benutzt die Freifläche, obwohl sie teurer ist als Umsetzen. **Erklärt**, warum sie sich hier trotzdem lohnt.
3. **Formuliert** eine Regel, wann ein Blocker auf die Freifläche kommt, und **ergänzt** euer Struktogramm aus b). **Prüft**, ob es an beiden Tagen den günstigsten Ablauf erreicht.
:::

::textinput{id="containerterminal-3c" height="120px" placeholder="Ablauf für 290 Euro: ... – Die Freifläche lohnt sich, weil ... – Unsere Regel: ..."}

::::collapsible{title="Tipp zu c): Was kostet ein Blocker insgesamt?" id="container-tipp-3c"}

Rechnet für einen Blocker beide Wege durch – bis zum Ende des Tages:

- Er kommt auf einen Stapel, von dem noch etwas abgeholt wird. Was passiert später mit ihm?
- Er kommt auf die Freifläche. Muss er von dort überhaupt zurück?

::::

:::collapsible{title="Eigene Containerkonfigurationen"}

Trage unter **Eigene Startaufstellung** Stapel und Lkw ein und probiere dein Struktogramm an einer eigenen Lage aus.

<oop-containerterminal id="containerterminal-eigen" eigene hoehe="4"></oop-containerterminal>

:::

<!-- Versteckte Seite (hide: true) für die Übungsstunde Q1 GK G2 am 20.11.2026 (Planen und Struktogramm);
     programmiert wird am 24.11.2026 auf der Seite containerterminal-programmieren.
     Lösungen bis zur Freigabe in entwuerfe/containerterminal-loesungen.md (die Seite
     loesungen listet die Passwörter auch versteckter Seiten). -->
