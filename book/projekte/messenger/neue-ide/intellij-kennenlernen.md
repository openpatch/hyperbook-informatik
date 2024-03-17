---
name: Intellij kennenlernen
lang: de
---

Ab jetzt möchten wir Intellij benutzen, um unseren Messenger zu entwickeln. Dazu wurde der Messenger um eine TUI erweitert, da wir anders als in BlueJ nicht von Hand Objekte erzeugen und ihre Methoden aufrufen können.

Im Folgenden wirst du anhand kleiner Aufgaben dich mit Intellij vertraut machen können.

1. Lade dir das Projekt herunter und öffne es in Intellij

::archive[Intellij Projekt]{name="messenger-tui"}

2. Starte die Anwendung. Gehe dazu in die Klasse "App" und drücke den Playbutton neben der main-Methode.

:::collapsible{title="Hinweis: main-Methode" id="131166"}

Die main()-Methode ist der Startpunkt jeder Java-Anwendung. Sie stellt den Einstiegspunkt in die Ausführung einer Java-Anwendung dar und muss die Signatur public static void main(String[] args) besitzen.

:::

3. Probiere die Menüpunkte der Anwendung aus.
4. Setze einen Breakpoint in Zeile 51 und führe die Anwendung im Debugmodus aus. 
    1. Mache dazu einen Rechtsklick auf den Playbutton und führe "Debug App" aus. 
    2. Gehe anschließend schrittweise "Step Over" durch die Zeilen und schaue welche Variablen sich verändern.
    3. Schreibe in die Zeile "Evaluate expression" this.username.toUpperCase() und beschreibe was passiert.