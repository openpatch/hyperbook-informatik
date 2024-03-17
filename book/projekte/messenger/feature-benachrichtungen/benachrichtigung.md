---
name: Benachrichtigung
index: 0
lang: de
---

# Benachrichtigung

Meistens wird man in einem Messenger benachrichtigt, wenn eine neue Nachricht eingetroffen ist. Auch in unserem Messenger möchten wir über neue Nachrichten informiert werden.

Das Feature soll wie folgt funktionieren:

## Anforderung

Im Hauptmenü soll der Benutzer den Menüpunkt "Neuste Nachricht" auswählen können. Tut er dies, erscheint entweder die neuste Nachricht oder es wird angezeigt, dass keine neuen Nachrichten mehr vorliegen.

1. Wenn eine Nachricht empfangen wird (siehe receive-Methode), dann soll die Nachricht zusätzlich in eine Warteschlange "newMessages" eingereiht werden.

2. Wenn eine Nachricht im Menüpunkt "Neuste Nachricht" angezeigt wurde, dann soll wie aus der Warteschlange "newMessages" ausgereiht werden.

### Aufgaben

1. Lade die das folgende Intellij Projekt zum Start herunter.
::archive[Intellij Projekt]{name="messenger-tui"}
2. Erweitere die Klasse App um das Attribut "newMessages".
3. Implementiere die 1. Anforderung.
4. Erweitere das Hauptmenü um einen Menüpunkt "Neuste Nachricht".
5. Implementiere die 2. Anforderung.

## Sonderanforderungen

1. Der Benutzer soll sehen können wie viele neue Nachrichten er hat. Dazu soll hinter dem Menüpunkt "Neuste Nachricht" noch die Anzahl der neuen Nachrichten angezeigt werden. Z.B.: "Neuste Nachricht (8), wenn acht neue Nachrichten vorliegen.

2. Außerdem soll der Benutzer die Möglichkeit haben alle neuen Nachrichten auf einmal zu "lesen" bzw. aus der Warteschlange zu entfernen.

### Aufgaben

1. Entwickle für das Bestimmen der Anzahl der neusten Nachrichten zunächst einen Algorithmus im :t[Pseudocode].

:::collapsible{title="Tipp" id="476543"}

Die Schwierigkeit liegt darin, dass du keinen direkten Zugriff auf Objekte der Queue (außer dem ersten) hast. Es müssen aber alle Objekte der Queue gezählt werden. Dein Algorithmus muss dazu Elemente vom Anfang der Queue entfernen. Am Ende des Algorithmus soll die Queue aber genau die gleiche Struktur haben wie zu Beginn des Algorithmus.

:::

2. Implementiere die erste Sonderanforderung
3. Implementiere die zweite Sonderanforderung