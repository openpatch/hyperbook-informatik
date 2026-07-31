---
name: DOM
lang: de
---

# DOM

Das **DOM** (Document Object Model) ist die Baumdarstellung einer Webseite. Der Browser baut sie beim Laden aus dem :t[HTML]{#html}-Quelltext auf.

Für die Verwandtschaft gilt: Ein **Kind** steht direkt unter einem Element, ein **Nachfahre** irgendwo darunter. Elemente auf derselben Ebene sind **Geschwister**.

Drei Dinge folgen daraus: Elemente müssen sich sauber schachteln, :t[CSS]{#css} vererbt sich entlang des Baums nach unten, und ein Klick trifft immer alle umschließenden Elemente mit.

Den Baum siehst du im Reiter *Elemente* der Entwicklerwerkzeuge (**F12**).
