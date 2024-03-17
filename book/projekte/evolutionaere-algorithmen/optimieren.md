---
name: Optimieren
lang: de
index: 3
---

# Optimieren

Im nächsten Schritt werden wir unseren evolutionären Algorithmus optimieren. Dazu reduzieren wir zunächst das Problem auf mehrere Münzwürfe - das sogenannte One-Max-Problem.

Unser Algorithmus ist blind und soll solange "raten" bis alle Münzen Zahl zeigen. In unserem Programm entspricht das dem Zeichen 1. Kopf entspricht dem Zeichen 0.

Für wenige Münzen findet unser Algorithmus eine Lösung (z.B. 10). Für viele Münzen (z.B. 10000) kommt er nicht zum Ziel.

In den folgenden Aufgaben werden wir uns zunächst mit der Veränderung des Shakespears-Projekt vertraut machen und danach den Algorithmus optimieren.

![Vorschau One-Max-Projekt](/images/evolutionaere-algorithmen/one-max.gif)

## Aufgabe 1 (Veränderungen)

Öffne das OneMax-Projekt und das Shakespeare-Projekt nebeneinander und finde stellen im Quelltext, die sich geändert haben.

Beschreibe, was diese Veränderungen bewirken.

::archive[One Max Projekt]{name="one-max"}

::archive[Shakespeare Projekt]{name="shakespeare"}

## Aufgabe 2 (Ausprobieren)

Führe das Programm mit unterschiedlichen Werten für das Attribut target aus. Verändere dazu den Parameter der repeat-Methode. Halte dabei die Attribute populationsize und mutationrate konstant.

Halte für unterschiedliche Werte fest, wie viele Generation benötigt wurden, um das Ziel zu erreichen.

:::alert{info}
"1".repeat(1000) erzeugt einen String mit 1000 Einsen.
:::

## Aufgabe 3 (Problem finden)

Verändere das Attribut target so, dass 10000 Einsen gesucht werden.

Leider kommt unser Algorithmus jetzt nicht mehr so schnell zum Ergebnis.

Untersuche die mutate-Methode der Klasse DNA. Beschreibe warum diese dazu führt das der Algorithmus keine Lösung findet.

## Aufgabe 4 (Optimieren)

Beschreibe wie man die Methode mutate verändern müsste, damit wir uns der Lösung nähern und nicht wieder entfernen.

Implementiere deine Veränderung.