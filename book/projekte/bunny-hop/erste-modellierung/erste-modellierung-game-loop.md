---
name: 🖊 Erste Modellierung des Game-Loops
index: 4
lang: de
permaid: bunny-hop-game-loop-modellieren
---

# Erste Modellierung des Game-Loops

Die [Modellierung von Klassen](/projekte/bunny-hop/erste-modellierungen/erste-modellierung-von-klassen) legt die Grundlage für die weitere Arbeit am Spiel. Die wahrscheinlich wichtigste Komponente im Spiel ist der sogenannte [Game Loop](/projekte/bunn-hop/erste-modellierungen/der-game-loop).

Diesen werden wir jetzt für unser Spiel Bunny Hop modellieren.

## Eingabe

In dieser Phase werden zu Beginn des Game-Loop-Durchlaufs alle Eingaben verarbeitet, die ein Benutzer seit dem letzten Durchlauf getätigt hat.

### 🖊 Aufgabe

Lest euch nochmal die [Spielidee](/projekte/bunny-hop/die-spielidee) durch und formuliert welche Eingabe auf einer Tastatur einen Effekt auf unser Spiel haben sollen.

## Simulation

In dieser Phase werden auf Grundlage der eventuellen Eingaben des Benutzers sowie des alten Zustands der Objekte neue Zustände der Objekte berechnet. Diese Phase wird auch ausgeführt, wenn keine Benutzereingaben getätigt worden sind.

### 🖊 Aufgabe

Gegeben sind die Objektdiagramme (Zustände) der Objekte im Spiel:

::excalidraw{src="/images/bunny-hop/game-loop-simulation.excalidraw" aspectRatio="4/3" autoZoom=true center=true}

Formuliert wie sich die Objektdiagramme (Zustände) der Objekte verändern sollen, wenn der Benutzer bestimmte Eingaben getätigt hat oder wenn keine Eingabe registriert wurde.

## Ausgabe

In der dritten Phase werden die neuen Zustände der Objekte grafisch dargestellt.

### 🖊 Aufgabe

Zeichne das Spiel für die folgenden Zustände der Objekte.

::excalidraw{src="/images/bunny-hop/game-loop-simulation.excalidraw" aspectRatio="4/3" autoZoom=true center=true}

Nutzt dazu diese Vorlage: [Excalidraw](https://excalidraw.com/#json=zfDczD_y173juwVFxjf7i,lpv40HUWlo-JnN54BvdteQ)
