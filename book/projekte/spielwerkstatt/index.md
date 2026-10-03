---
name: Spielwerkstatt
index: 11
lang: de
permaid: spielwerkstatt
keywords:
  - java
  - scratch4j
  - spiel
  - rpg
  - level-0
---

# Spielwerkstatt

In der Spielwerkstatt entwickelst du **dein eigenes Spiel**, und zwar nicht in einer Doppelstunde, sondern über die ganze Einführungsphase und weiter in die Qualifikationsphase. Es ist ein Abenteuer von oben gesehen, ein 2D-Rollenspiel mit Figuren, Landschaften, Gegnern und Schätzen. Alle starten mit demselben kleinen Startgerüst. Was daraus wird, entscheidest du.

## Vorwissen

🥳 Du brauchst kein Vorwissen. Das Startgerüst kommt mit dem aus, was im ersten Kapitel der Grundlagen dran ist, und dein Spiel wächst mit jedem weiteren Kapitel.

## So arbeitest du

In den beiden Lernpfaden [Grundlagen der Programmierung mit Java](/oberstufe/oop/01-grundlagen) und [Erweiterungen der Programmierung mit Java](/oberstufe/oop/02-erweiterungen) lernst du die Ideen der Programmierung: Variablen, Verzweigungen, Felder, Klassen, Stapel, Bäume und vieles mehr. Dort kommen sie meist ohne Spiel vor. Nach jedem Kapitel kommst du hierher und baust das Neue in dein Spiel ein.

Zu jedem Kapitel gibt es hier eine Seite mit **Spielmechaniken**: Ideen, wo das Gelernte in einem Spiel steckt. Du **wählst eine davon** und überträgst sie in dein Spiel, oder du **erfindest eine eigene**. Es gibt keine Musterlösung, denn jedes Spiel ist anders.

:::snippet{#merken}
- **Ein Spiel, ein Arbeitsbereich.** Dein Spiel liegt auf der Seite [Deine Werkstatt](./00-werkstatt). Öffne sie in einem eigenen Tab, während du die anderen Seiten liest. Was du dort änderst, bleibt in deinem Browser gespeichert.
- **Sichere deinen Stand** mit dem Knopf „Workspace in Datei speichern“. So geht er nicht verloren und kommt mit auf einen anderen Rechner.
- **Im Buch oder auf deinem Rechner.** Das Projekt läuft hier im Browser und genauso in einer Java-Entwicklungsumgebung auf deinem Rechner. Der Quelltext ist derselbe.
- **Grafiken und Klänge** stammen aus dem Ninja Adventure Asset Pack und liegen im Ordner `assets`. Dein Programm findet sie über Pfade wie `assets/actor/character/boy/sprite-sheet.png`, im Buch wie auf dem Rechner.
:::

## Dein Entwicklertagebuch

Führe neben dem Spiel ein kurzes Tagebuch. Zu jeder Mechanik, die du einbaust, schreibst du drei Sätze:

1. **Was** kann mein Spiel jetzt?
2. **Welche Idee aus dem Lernpfad** steckt dahinter?
3. **Warum** passt genau diese Idee, und was wäre mit einer anderen schiefgegangen?

Der dritte Satz ist der wichtigste. An ihm zeigst du, dass du die Idee verstanden hast und sie nicht nur abgeschrieben hast.

## Die Seiten der Werkstatt

| Nach dem Kapitel im Lernpfad | Seite in der Werkstatt |
| --- | --- |
| Erste Schritte | [Das Startgerüst](./01-startgeruest) und [Grafiken und Klänge](./02-grafiken-und-klaenge), gebaut wird in [Deine Werkstatt](./00-werkstatt) |
| Variablen und Datentypen | [Variablen und Datentypen im Spiel](./03-variablen) |
| Kontrollstrukturen | [Kontrollstrukturen im Spiel](./04-kontrollstrukturen) |
| Methoden und Modularisierung | [Methoden im Spiel](./05-methoden) |
| Felder | [Felder im Spiel](./06-felder) |
| Objektorientierung | [Objektorientierung im Spiel](./07-objektorientierung) |
| Algorithmen: Suchen und Sortieren | [Suchen und Sortieren im Spiel](./08-suchen-und-sortieren) |
| Ende der Einführungsphase | [Projektrahmen](./09-projektrahmen) |
| **Qualifikationsphase** | |
| Vertiefte Objektorientierung | [Vertiefte Objektorientierung im Spiel](./10-vertiefte-objektorientierung) |
| Felder, Referenzen und Generik | [Felder, Referenzen und Generik im Spiel](./11-felder-referenzen-generik) |
| Rekursion und Problemlösestrategien | [Rekursion im Spiel](./12-rekursion) |
| Lineare Datenstrukturen | [Lineare Datenstrukturen im Spiel](./13-lineare-datenstrukturen), mit ausführlichen Beispielen zu [Schlange](./20-meldungen), [Stapel](./21-kisten) und [Liste](./22-inventar) |
| Nichtlineare Datenstrukturen | [Bäume und Graphen im Spiel](./14-baeume-und-graphen) |
| Suchen und Sortieren | [Effizient sortieren im Spiel](./15-sortieren) |
| Testen und Laufzeit | [Testen und Laufzeit im Spiel](./16-testen-und-laufzeit) |
| Nebenläufigkeit (LK) | [Nebenläufigkeit im Spiel](./17-nebenlaeufigkeit) |

## Checkpoints

Wer länger gefehlt hat, zum Beispiel wegen eines Auslandsaufenthalts, muss nicht alles nachholen. Zu jedem Kapitel beider Lernpfade gibt es einen **Checkpoint**: einen Stand des Beispielspiels, der nur benutzt, was bis dahin im Lernpfad dran war. Damit steigst du wieder ein und baust von dort mit eigenen Ideen weiter.

:::alert{warn}
**Ein Checkpoint ersetzt deinen ganzen Arbeitsbereich.** Speichere deinen eigenen Stand vorher mit „Workspace in Datei speichern“, falls du ihn noch brauchst.
:::

**Im Buch:** Lade die Checkpoint-Datei herunter. Gehe dann auf die Seite [Deine Werkstatt](./00-werkstatt) und klicke in der Entwicklungsumgebung auf „Workspace aus Datei laden“. Wähle die Datei aus.

**Auf deinem Rechner:** Lade das Archiv herunter und entpacke es. Es enthält das ganze Projekt mit Grafiken, Klängen und Bibliotheken.

| Nach dem Kapitel | Was das Beispielspiel dann kann | Im Buch | Auf deinem Rechner |
| --- | --- | --- | --- |
| Erste Schritte | Figur, Hindernisse, Münzen | :download[Start]{src="./checkpoints/spielwerkstatt.json"} | :archive[Start]{name="spielwerkstatt"} |
| Variablen und Datentypen | Münzzähler, Countdown | :download[Variablen]{src="./checkpoints/spielwerkstatt-ef-02-variablen.json"} | :archive[Variablen]{name="spielwerkstatt-ef-02-variablen"} |
| Kontrollstrukturen | Steinrahmen per Schleife, Gewinnen und Verlieren | :download[Kontrollstrukturen]{src="./checkpoints/spielwerkstatt-ef-03-kontrollstrukturen.json"} | :archive[Kontrollstrukturen]{name="spielwerkstatt-ef-03-kontrollstrukturen"} |
| Methoden und Modularisierung | dasselbe, in Methoden zerlegt | :download[Methoden]{src="./checkpoints/spielwerkstatt-ef-04-methoden.json"} | :archive[Methoden]{name="spielwerkstatt-ef-04-methoden"} |
| Felder | die Welt aus einem Plan | :download[Felder]{src="./checkpoints/spielwerkstatt-ef-05-felder.json"} | :archive[Felder]{name="spielwerkstatt-ef-05-felder"} |
| Objektorientierung | eigene Klassen, Gegner, Leben | :download[Objektorientierung]{src="./checkpoints/spielwerkstatt-ef-06-objektorientierung.json"} | :archive[Objektorientierung]{name="spielwerkstatt-ef-06-objektorientierung"} |
| Algorithmen: Suchen und Sortieren | neue Runde, sortierte Bestenliste | :download[Suchen und Sortieren]{src="./checkpoints/spielwerkstatt-ef-07-suchen-und-sortieren.json"} | :archive[Suchen und Sortieren]{name="spielwerkstatt-ef-07-suchen-und-sortieren"} |
| Vertiefte Objektorientierung | Gegenstände und Gegner mit abstrakter Oberklasse | :download[Vertiefte OOP]{src="./checkpoints/spielwerkstatt-q-01-objektorientierung.json"} | :archive[Vertiefte OOP]{name="spielwerkstatt-q-01-objektorientierung"} |
| Felder, Referenzen und Generik | Gitter neben der Bühne, versteckte Fallen | :download[Felder und Referenzen]{src="./checkpoints/spielwerkstatt-q-02-felder-und-referenzen.json"} | :archive[Felder und Referenzen]{name="spielwerkstatt-q-02-felder-und-referenzen"} |
| Rekursion | Flutfüllung findet eingemauerte Münzen | :download[Rekursion]{src="./checkpoints/spielwerkstatt-q-03-rekursion.json"} | :archive[Rekursion]{name="spielwerkstatt-q-03-rekursion"} |
| Lineare Datenstrukturen | Meldungen in einer Schlange, Spur auf einem Stapel | :download[Lineare Datenstrukturen]{src="./checkpoints/spielwerkstatt-q-04-lineare-datenstrukturen.json"} | :archive[Lineare Datenstrukturen]{name="spielwerkstatt-q-04-lineare-datenstrukturen"} |
| Nichtlineare Datenstrukturen | Wache mit Entscheidungsbaum | :download[Bäume]{src="./checkpoints/spielwerkstatt-q-05-baeume.json"} | :archive[Bäume]{name="spielwerkstatt-q-05-baeume"} |
| Suchen und Sortieren (Q) | Tiefensortierung in jedem Bild | :download[Sortieren]{src="./checkpoints/spielwerkstatt-q-06-sortieren.json"} | :archive[Sortieren]{name="spielwerkstatt-q-06-sortieren"} |
| Testen und Laufzeit | Punkteregel mit Kombo und Tests | :download[Testen]{src="./checkpoints/spielwerkstatt-q-07-testen.json"} | :archive[Testen]{name="spielwerkstatt-q-07-testen"} |

<!--
Für Lehrkräfte: Die Spielwerkstatt begleitet beide Lernpfade von EF-Kapitel 1
an. Die Lernpfade selbst bleiben spielfrei: Ein Konzept wird dort allgemein
eingeführt, die Anwendung im eigenen Spiel geschieht nur hier. Je Kapitel gibt
es eine Seite mit einem Pool von Spielmechaniken; die Lernenden übertragen eine
davon oder entwickeln eine eigene. Bewertbar ist vor allem die Begründung im
Entwicklertagebuch (dritte Frage).

Genre: 2D-Top-down-RPG mit dem Ninja Adventure Asset Pack (Pixel-boy, AAA),
CC0. Siehe assets/lizenz.txt.

Das Startgerüst kommt mit dem Wissen aus EF-Kapitel 1 aus. run() und die
Tastensteuerung stecken in fertigen Klassen (Spieler, Muenze), weil sie im
Lernpfad erst in Kapitel 6 eingeführt werden.

Die früheren optionalen Seiten "Im Spiel" am Ende der Q-Kapitel sind in die
Q-Seiten dieser Werkstatt aufgegangen (Polymorphie an Gegenständen, Gitter und
Referenzfehler, Flutfüllung, Entscheidungsbaum, Tiefensortierung,
Kombo-Punkteregel mit Tests). Die Beispiele zu Schlange, Stapel und Liste
(20-22) bauen auf einem Kachelraum auf (archives/spielwerkstatt-raumplan), nicht
auf dem Referenzspiel der Checkpoints.

Checkpoints: Die Archive heißen archives/spielwerkstatt*. Die Workspace-Dateien
in checkpoints/ erzeugt tools/spielwerkstatt/erzeuge_checkpoints.py aus den
Archiven; tools/spielwerkstatt/check_desktop.py meldet, wenn eine veraltet ist.

Technisch gibt es genau einen Arbeitsbereich: den onlineide-Block mit
id="spielwerkstatt" auf der Seite 00-werkstatt (layout: wide). Die anderen
Seiten verlinken nur dorthin. Damit relative Pfade wie assets/... aufgelöst
werden, liegen alle Seiten mit onlineide-Block direkt in diesem Ordner.
-->
