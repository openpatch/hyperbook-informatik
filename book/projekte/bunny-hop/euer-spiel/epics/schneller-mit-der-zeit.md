---
name: 🥉 Schneller mit der Zeit
lang: de
---

# Epic: Schneller mit der Zeit

Das Spiel soll alle paar Sekunden schneller werden.

:::collapsible{title="Hilfe: Globale Geschwindigkeit" id="570315"}

Zunächst wollen wir ein :t[Attribut]{#attribut} "geschwindigkeit" in der Level haben, welches die Geschwindigkeit des Spiels repräsentiert. Dieses :t[Attribut]{#attribut} verändern wir alle 5000 Millisekunden (5 Sekunden).

```java
public class Level extends Stage {
    private float geschwindigkeit = 1;

    // ...

    public void run() {
        if (this.getTimer().everyMillis(5000)) {
            geschwindigkeit += 0.5;
        }
    }
}
```

:::

:::collapsible{title="Hilfe: Geschwindigkeit nutzen" id="330385"}

Damit wir die Geschwindigkeit in anderen :t[Klassen]{#klasse} nutzen können, müssen zunächst einen :t[Methode]{#methode} in der Klasse Level hinzufügen.

```java
public float getGeschwindigkeit() {
    return geschwindigkeit;
}
```

Jetzt können wir die :t[Methode]{#methode} in anderen :t[Klassen]{#klasse} nutzen.

:::

:::collapsible{title="Hilfe: Beispiel Implementierung" id="967234"}

::archive[BlueJ Projekt: Schneller mit der Zeit]{name="bunny-hop-epic-schneller-mit-der-zeit"}

:::