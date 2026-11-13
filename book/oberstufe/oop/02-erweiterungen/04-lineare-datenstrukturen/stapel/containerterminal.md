---
name: "Containerterminal: Planen"
index: 8
lang: de
permaid: java-stapel-containerterminal
hide: true
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
::textinput{id="containerterminal-1b" height="120px" placeholder=" Meine Strategie: Einen Container, der im Weg steht, stelle ich ... – Gesamtkosten: ... Euro."}

::::collapsible{title="Tipp zu c)" id="container-tipp-planen"}

Schau auf die Reihe der Lkw: Von welchem Stapel wird heute **gar nichts** abgeholt?

::::

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
Wählt eine Strategie aus:

- **A – Freifläche:** Alles, was über dem gesuchten Container steht, kommt auf die Freifläche. Nach dem Verladen kommt es zurück.
- **B – Nachbarstapel:** Ein Container, der im Weg steht, kommt auf einen anderen Stapel mit Platz. Nur wenn keiner Platz hat, kommt er auf die Freifläche.

a) **Entwickelt** zu eurer Strategie einen Algorithmus `hole(pNummer)`, der **einen** Container verlädt, und **stellt** ihn als Struktogramm **dar**. Bedenkt die Grenzfälle: Der Container steht schon oben. Der Container ist gar nicht im Terminal.

b) **Kran-Test:** Wendet den Algorithmus in der Visualisierung an.
:::

:::struktolab{mode="edit" fontSize=15 id="containerterminal-struktogramm"}
```
funktion hole(pNummer):
```
:::

::textinput{id="containerterminal-2a" height="60px" placeholder="Unsere Strategie: A / B / C"}

<oop-containerterminal id="containerterminal-krantest" stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>

::textinput{id="containerterminal-2b" height="120px" placeholder="b) Rückmeldung aus dem Kran-Test: Kosten ... Euro. Raten mussten wir an dieser Stelle: ..."}

::::collapsible{title="Tipp 1: Das Gerüst" id="container-tipp-struktogramm-1"}

Jede der zwei Strategien hat dasselbe Gerüst: Stapel suchen – **solange** oben nicht der gesuchte Container steht, den obersten wegsetzen – verladen. Die Strategien unterscheiden sich nur darin, **wohin** der Kran den Container setzt. Strategie A braucht danach noch eine zweite Schleife.

::::

::::collapsible{title="Tipp 2: Wohin damit?" id="container-tipp-struktogramm-2"}

- **A:** immer Stapel 0.
- **B:** Für die Stapel 1, 2, 3 liefert `s % 3 + 1` den nächsten Stapel „im Kreis“: aus 1 wird 2, aus 2 wird 3, aus 3 wird 1. Ist er voll, nimm den übernächsten. Sind beide voll, bleibt nur 0.

::::

## Aufgabe 3: Der zweite Tag

:::snippet{#aufgabe}
Am nächsten Morgen sieht das Terminal anders aus – und Stapel 3 ist voll. Die Lkw wollen **6002**, **6004**, **6008** und **6001**.

a) **Führt** euer Struktogramm aus Aufgabe 2 hier **aus** und **gebt** die Kosten **an**.

b) **Ermittelt** einen Ablauf, der möglichst wenig kostet, und **gebt** die Kosten **an**.

c) **Beurteilt**, ob eure Strategie auch hier zum günstigsten Ergebnis führt. **Beschreibt**, wie man sie ändern müsste.
:::

<oop-containerterminal id="containerterminal-tag-2" stapel="6001,6002,6003 | 6004,6005 | 6006,6007,6008,6009" auftrag="6002,6004,6008,6001" hoehe="4" bestwert="290"></oop-containerterminal>

::textinput{id="containerterminal-3a" height="80px" placeholder="a) Mit unserem Struktogramm kostet der zweite Tag ... Euro."}

::textinput{id="containerterminal-3b" height="80px" placeholder="b) Mein Ablauf: ... – Kosten: ... Euro."}

::textinput{id="containerterminal-3c" height="120px" placeholder="c) Unsere Strategie führt hier (nicht) zum günstigsten Ergebnis, weil ... Ändern müsste man ..."}

::::collapsible{title="Tipp" id="container-tipp-tag-2"}

Setzt du 6003 auf Stapel 2, blockiert er dort 6004. Auf Stapel 3 ist kein Platz. Manchmal ist die teure Freifläche die günstigste Wahl – wenn du den Container dort einfach stehen lässt.

::::

---

Weiter geht es mit dem Programmieren: Aus deinem Struktogramm wird Java – [Containerterminal: Programmieren](./containerterminal-programmieren)

<!-- Versteckte Seite (hide: true) für die Übungsstunde Q1 GK G2 am 20.11.2026 (Planen und Struktogramm);
     programmiert wird am 24.11.2026.
     Lösungen bis zur Freigabe in entwuerfe/containerterminal-loesungen.md (die Seite
     loesungen listet die Passwörter auch versteckter Seiten). -->
