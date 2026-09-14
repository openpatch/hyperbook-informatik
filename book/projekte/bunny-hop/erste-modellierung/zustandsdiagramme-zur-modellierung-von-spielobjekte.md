---
name: 📃 Zustandsdiagramme zur Modellierung von Spielobjekten
index: 5
lang: de
permaid: bunny-hop-zustandsdiagramme
---

# Zustandsdiagramme zur Modellierung von Spielobjekten

Zustandsdiagramme sind ein hervorragendes Mittel um die Zustände von Spielobjekten modellieren zu können. Im Folgenden werden wir uns Zustandsdiagramme im Allgemeinen anschauen und anschließend auf unser [Spiel übertragen](/projekte/bunny-hop/erste-modellierungen/zustandsdiagramm-fuer-bugs).

## Zustandsdiagramme

Ein Zustandsdiagramm besteht aus Zuständen (Kreisen) und Übergängen (Pfeilen). Der Startzustand wird durch einen Extrapfeil und die Endzustände mit einem Doppelkreis gekennzeichnet.

Im Folgenden ist ein Zustandsdiagramm zu sehen, welches die Zustände für Objekte der Klasse Lehrer modelliert:

::excalidraw{src="/images/bunny-hop/zustandsdiagramm.excalidraw" aspectRatio="4/3" autoZoom=true center=true}


### Aufgaben

Beantwortet die folgenden Fragen

In welchem Zustand startet ein Lehrerobjekt?

:::collapsible{title="Lösung" id="972789"}

Start

:::

In welche Zustände kann das Lehrerobjekt aus dem Zustand Beantworten wechseln?

:::collapsible{title="Lösung" id="744467"}

Warten

:::

In welche Zustände kann das Lehrerobjekt aus dem Zustand Warten wechseln?

:::collapsible{title="Lösung" id="305415"}

Beantworten, Besprechen

:::

Ist die Abfolge von Methodenaufrufen zulässig? aufgabe stellen -> frage empfangen -> beantworten -> beantworten -> alle fertig

:::collapsible{title="Lösung" id="560403"}

Nein, da man aus dem Zustand Warten nicht die Methode beantworten aufrufen darf.

:::

Ist die Abfolge von Methodenaufrufen zulässig? aufgabe stellen -> frage empfangen -> beantworten

:::collapsible{title="Lösung" id="659347"}

Nein, da sich das Lehrerobjekt nicht in einem Endzustand befindet.

:::
