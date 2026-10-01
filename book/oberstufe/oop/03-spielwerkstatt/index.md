---
name: Spielwerkstatt
index: 3
lang: de
permaid: java-spielwerkstatt
keywords:
  - java
  - scratch4j
  - spiel
---

# Spielwerkstatt

In der Spielwerkstatt baust du **ein eigenes Spiel**, und zwar nicht in einer Doppelstunde, sondern über Wochen. Alle starten mit demselben kleinen Abenteuer: eine Figur, ein Raum, ein paar Münzen. Was daraus wird, entscheidest du.

Die beiden Lernpfade liefern dir dafür das Werkzeug. Wann immer du dort etwas Neues gelernt hast, findest du hier eine Anregung, wie es in deinem Spiel Platz findet.

## So arbeitest du

:::snippet{#merken}
- **Ein Spiel, ein Arbeitsbereich.** Auf jeder Seite der Werkstatt steht derselbe Programmierbereich. Was du dort änderst, bleibt in deinem Browser gespeichert und taucht auf allen Werkstatt-Seiten wieder auf.
- **Im Buch oder auf deinem Rechner.** Das Projekt läuft hier im Browser und genauso in einer Java-Entwicklungsumgebung auf deinem Rechner. Der Quelltext ist derselbe.
- **Grafiken und Klänge** liegen im Ordner `assets`. Dein Programm findet sie über Pfade wie `assets/actor/character/boy/sprite-sheet.png`, im Buch wie auf dem Rechner.
:::

## Meilensteine

Dein Spiel wächst mit dem Unterricht. Jeder Meilenstein gehört zu einem Kapitel der Lernpfade.

| Meilenstein | Was dein Spiel dann kann | Dazu passt |
| --- | --- | --- |
| Startgerüst | eine Figur läuft durch einen Raum und sammelt Münzen | [Das Startgerüst](./01-startgeruest) |
| eigenes Aussehen | eigene Figuren, Kacheln und Klänge aus über 2000 Dateien | [Grafiken und Klänge](./02-grafiken-und-klaenge) |
| eigene Klassen | eigene Gegenstände und Hindernisse, mit gemeinsamer Oberklasse | [Objektorientierung](../01-grundlagen/06-objektorientierung), [Vertiefte Objektorientierung](../02-erweiterungen/01-vertiefte-objektorientierung) |
| eigene Räume | Räume als Plan aus Zeichen, also als Feld | [Felder, Referenzen, Generik](../02-erweiterungen/02-felder-referenzen-generik) |
| Schlange | Meldungen erscheinen der Reihe nach | [Meldungen der Reihe nach](./03-meldungen), [Warteschlange](../02-erweiterungen/04-lineare-datenstrukturen/warteschlange) |
| Stapel | Kisten schieben und Züge zurücknehmen | [Kisten schieben und zurücknehmen](./04-kisten), [Stapel](../02-erweiterungen/04-lineare-datenstrukturen/stapel) |
| Liste | ein Inventar mit Auswahl | [Ein Inventar](./05-inventar), [Liste](../02-erweiterungen/04-lineare-datenstrukturen/liste) |
| Bäume | Gespräche mit Figuren, ein Nachschlagewerk der Gegner | [Nichtlineare Datenstrukturen](../02-erweiterungen/05-nichtlineare-datenstrukturen) |

<!--
Für Lehrkräfte: Die Spielwerkstatt begleitet beide Lernpfade. Sie kann mit dem
Projekt "Eigenes Spiel" am Ende der Einführungsphase beginnen und wächst in der
Qualifikationsphase mit den Kapiteln zu Datenstrukturen weiter.

Technisch teilen sich alle Werkstatt-Seiten einen Arbeitsbereich: Die
onlineide-Blöcke tragen alle id="spielwerkstatt". Damit relative Pfade wie
assets/... überall gleich aufgelöst werden, müssen alle Seiten mit diesem Block
direkt in diesem Ordner liegen, nicht in Unterordnern.

Grafik und Klang: Ninja Adventure Asset Pack (Pixel-boy, AAA), CC0.
Siehe assets/lizenz.txt.
-->
