---
name: Ereignisse analysieren
index: 3
lang: de
---

# Ereignisse analysieren

Wir nehmen an, dass unser Smart Home viele Ereignisse gesammelt hat. Nun wollen wir diese analysieren und etwas über unser Verhalten herausfinden – oder Daten für ein Dashboard abgreifen.

Zur Verwaltung der Ereignisse benutzen wir die lineare Datenstruktur des **Arrays**.

## Der Ausgangspunkt

Im Übungsbereich liegt das Projekt vollständig: die Klasse `Event` mit ihren drei Spezialisierungen und die Klasse `SmartHome` mit 23 Beispielereignissen aus einem Tag.

Die vier Methoden von `SmartHome` sind noch **leer** – die füllst du in den Aufgaben.

:::alert{info}
Du kannst hier im Browser arbeiten **oder** dir das Projekt herunterladen und in BlueJ öffnen. Der Quelltext ist derselbe; im Browser musst du nichts installieren.

::archive[BlueJ-Projekt: Ereignisse]{name="smart-home-ereignisse"}
:::

:::onlineide{height="720px" speed="1000000"}

<!-- aus archives/smart-home-ereignisse: Event.java, TemperatureChangedEvent.java, StateChangedEvent.java, AutomationTriggeredEvent.java, SmartHome.java -->

```java Main.java
void main() {
    SmartHome haus = new SmartHome();

    IO.println("--- Aufgabe 1: alle Ereignisse ---");
    haus.showBacklog();

    IO.println("--- Aufgabe 2: nur die Lampen ---");
    haus.showLights();

    IO.println("--- Aufgabe 3: hoechste Temperatur ---");
    IO.println(haus.getMaxTemperature());

    IO.println("--- Aufgabe 4: ausgeloeste Automationen ---");
    IO.println(haus.countAutomationTriggered());
}
```

```java Event.java
public class Event {
    private int id;
    private LocalDateTime timeFired;
    private String context;

    public Event(int pId, LocalDateTime pTimeFired, String pContext) {
        id = pId;
        timeFired = pTimeFired;
        context = pContext;
    }

    public int getId() {
        return id;
    }

    public LocalDateTime getTimeFired() {
        return timeFired;
    }

    public String getContext() {
        return context;
    }
}
```

```java TemperatureChangedEvent.java
public class TemperatureChangedEvent extends Event {
    private double oldTemperature;
    private double newTemperature;

    public TemperatureChangedEvent(int pId, LocalDateTime pTimeFired, String pContext, double pOldTemperature, double pNewTemperature) {
        super(pId, pTimeFired, pContext);
        oldTemperature = pOldTemperature;
        newTemperature = pNewTemperature;
    }

    public double getOldTemperature() {
        return oldTemperature;
    }

    public double getNewTemperature() {
        return newTemperature;
    }
}
```

```java StateChangedEvent.java
public class StateChangedEvent extends Event {
    private String oldState;
    private String newState;

    public StateChangedEvent(int pId, LocalDateTime pTimeFired, String pContext, String pOldState, String pNewState) {
        super(pId, pTimeFired, pContext);
        oldState = pOldState;
        newState = pNewState;
    }

    public String getOldState() {
        return oldState;
    }

    public String getNewState() {
        return newState;
    }
}
```

```java AutomationTriggeredEvent.java
public class AutomationTriggeredEvent extends Event {
    private String name;

    public AutomationTriggeredEvent(int pId, LocalDateTime pTimeFired, String pContext, String pName) {
        super(pId, pTimeFired, pContext);
        name = pName;
    }

    public String getName() {
        return name;
    }
}
```

```java SmartHome.java
public class SmartHome {

    private Event[] eventBacklog;

    public SmartHome() {
        eventBacklog = new Event[100];
        // Beispieldaten
        eventBacklog[0] = new TemperatureChangedEvent(0, LocalDateTime.of(2026, 3, 17, 1, 0, 0), "wohnzimmer.sensor1", 20, 19);
        eventBacklog[1] = new TemperatureChangedEvent(1, LocalDateTime.of(2026, 3, 17, 2, 0, 0), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[2] = new TemperatureChangedEvent(2, LocalDateTime.of(2026, 3, 17, 3, 0, 0), "wohnzimmer.sensor1", 19, 17.5);
        eventBacklog[3] = new TemperatureChangedEvent(3, LocalDateTime.of(2026, 3, 17, 4, 0, 0), "wohnzimmer.sensor1", 17.5, 16);
        eventBacklog[4] = new TemperatureChangedEvent(4, LocalDateTime.of(2026, 3, 17, 5, 0, 0), "wohnzimmer.sensor1", 16, 16.2);
        eventBacklog[5] = new TemperatureChangedEvent(5, LocalDateTime.of(2026, 3, 17, 6, 0, 0), "wohnzimmer.sensor1", 16.2, 14.5);
        eventBacklog[6] = new TemperatureChangedEvent(6, LocalDateTime.of(2026, 3, 17, 7, 0, 0), "wohnzimmer.sensor1", 14.5, 15.1);
        eventBacklog[7] = new TemperatureChangedEvent(7, LocalDateTime.of(2026, 3, 17, 8, 0, 0), "wohnzimmer.sensor1", 15.1, 17.3);
        eventBacklog[8] = new TemperatureChangedEvent(8, LocalDateTime.of(2026, 3, 17, 9, 0, 0), "wohnzimmer.sensor1", 17.3, 18.4);
        eventBacklog[9] = new TemperatureChangedEvent(9, LocalDateTime.of(2026, 3, 17, 10, 0, 0), "wohnzimmer.sensor1", 18.4, 19.2);
        eventBacklog[10] = new TemperatureChangedEvent(10, LocalDateTime.of(2026, 3, 17, 11, 0, 0), "wohnzimmer.sensor1", 19.2, 20);
        eventBacklog[11] = new TemperatureChangedEvent(11, LocalDateTime.of(2026, 3, 17, 12, 0, 0), "wohnzimmer.sensor1", 20, 21.2);
        eventBacklog[12] = new TemperatureChangedEvent(12, LocalDateTime.of(2026, 3, 17, 13, 0, 0), "wohnzimmer.sensor1", 21.2, 20.2);
        eventBacklog[13] = new TemperatureChangedEvent(13, LocalDateTime.of(2026, 3, 17, 14, 0, 0), "wohnzimmer.sensor1", 20.2, 19);
        eventBacklog[14] = new TemperatureChangedEvent(14, LocalDateTime.of(2026, 3, 17, 15, 0, 0), "wohnzimmer.sensor1", 19, 19);
        eventBacklog[15] = new TemperatureChangedEvent(15, LocalDateTime.of(2026, 3, 17, 16, 0, 0), "wohnzimmer.sensor1", 19, 18.3);
        eventBacklog[16] = new StateChangedEvent(16, LocalDateTime.of(2026, 3, 17, 17, 0, 0), "wohnzimmer.lampe1", "on", "off");
        eventBacklog[17] = new StateChangedEvent(17, LocalDateTime.of(2026, 3, 17, 18, 0, 0), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[18] = new StateChangedEvent(18, LocalDateTime.of(2026, 3, 17, 19, 0, 0), "wohnzimmer.lampe3", "on", "off");
        eventBacklog[19] = new StateChangedEvent(19, LocalDateTime.of(2026, 3, 17, 20, 0, 0), "wohnzimmer.lampe3", "off", "on");
        eventBacklog[20] = new StateChangedEvent(20, LocalDateTime.of(2026, 3, 17, 21, 0, 0), "wohnzimmer.lampe2", "off", "on");
        eventBacklog[21] = new StateChangedEvent(21, LocalDateTime.of(2026, 3, 17, 22, 0, 0), "wohnzimmer.lampe2", "on", "off");
        eventBacklog[22] = new StateChangedEvent(22, LocalDateTime.of(2026, 3, 17, 23, 0, 0), "wohnzimmer.lampe1", "off", "on");
    }

    /**
     * Diese Methode soll alle Events im Array eventBacklog ausgeben.
     * Die Ausgabe soll die folgende Form haben
     * 
     * 1. id, timeFired, context
     * 2. id, timeFired, context
     * 3. id, timeFired, context
     */
    public void showBacklog() {

    }

    /**
     * Diese Methode soll alle Lampe ausgeben.
     * Die Ausgabe soll die folgende Form haben:
     * context, state
     */
    public void showLights() {

    }

    /**
     * Diese Methode soll die maximal gemessene Temperature zurückgeben.
     * 
     * @return maximale Temperatur
     */
    public double getMaxTemperature() {
        return 0;
    }

    /**
     * Diese Methode soll die Anzahl der AutomationTriggeredEvents zurückgeben.
     * 
     * @return Anzahl der AutomationTriggeredEvents
     */
    public int countAutomationTriggered() {
        return 0;
    }

    /**
     * Diese Methode soll das übergebene Ereignis an die letzte verfügbare Stelle im Array eventBacklog legen.
     * Wenn keine Stelle mehr frei ist, dann soll das älteste (erste) Ereignis entfernt werden, alle Ereignis einen Platz nach vorrücken
     * und dann an die letzte verfügbare Stelle das neue Ereignis gelegt werden.
     */
     public void receiveEvent(Event pEvent) {

     }
}
```
:::

## Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Den Verlauf ausgeben**

Fülle die Methode `showBacklog()`. Sie soll alle Ereignisse ausgeben, eines je Zeile:

```
1. 0, 2026-03-17T01:00, wohnzimmer.sensor1
2. 1, 2026-03-17T02:00, wohnzimmer.sensor1
3. 2, 2026-03-17T03:00, wohnzimmer.sensor1
```

Achte darauf, dass das Array **100 Plätze** hat, aber nur 23 davon belegt sind.
:::

::::collapsible{title="Tipp 1: Wie komme ich an die Werte?"}

Die Attribute von `Event` sind `private`. Von außen kommst du über die Anfragen heran:

```java
eventBacklog[i].getId()
eventBacklog[i].getTimeFired()
eventBacklog[i].getContext()
```

::::

::::collapsible{title="Tipp 2: Was ist mit den leeren Plätzen?"}

Ein Array von Objekten ist nach `new Event[100]` mit `null` gefüllt – dort liegt **kein** Objekt. Ein Aufruf wie `eventBacklog[50].getId()` bricht deshalb ab.

Brich die Schleife ab oder überspringe die leeren Plätze:

```java
for (int i = 0; i < eventBacklog.length; i++) {
    if (eventBacklog[i] == null) {
        break;
    }
    // ...
}
```

::::

:::protect{password="sh-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public void showBacklog() {
    for (int i = 0; i < eventBacklog.length; i++) {
        if (eventBacklog[i] == null) {
            break;
        }
        IO.println((i + 1) + ". " + eventBacklog[i].getId() + ", "
                   + eventBacklog[i].getTimeFired() + ", "
                   + eventBacklog[i].getContext());
    }
}
```

Die Zählung beginnt bei 1, der Index bei 0 – daher `i + 1` in der Ausgabe.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Nur die Lampen**

Fülle `showLights()`. Ausgegeben werden sollen nur die Zustandsänderungen, mit Kontext und neuem Zustand:

```
wohnzimmer.lampe1, off
wohnzimmer.lampe2, off
```

Das Array enthält aber **alle** Ereignisarten. Wie erkennst du die richtigen?
:::

::::collapsible{title="Tipp: Woran erkenne ich den Typ?"}

Mit `instanceof` fragst du, ob ein Objekt von einer bestimmten Klasse ist:

```java
if (eventBacklog[i] instanceof StateChangedEvent) {
    // ...
}
```

Danach brauchst du noch eine **Typumwandlung**, denn `getNewState()` gibt es nur bei der Spezialisierung:

```java
StateChangedEvent e = (StateChangedEvent) eventBacklog[i];
```

::::

:::protect{password="sh-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public void showLights() {
    for (int i = 0; i < eventBacklog.length; i++) {
        if (eventBacklog[i] == null) {
            break;
        }
        if (eventBacklog[i] instanceof StateChangedEvent) {
            StateChangedEvent e = (StateChangedEvent) eventBacklog[i];
            IO.println(e.getContext() + ", " + e.getNewState());
        }
    }
}
```

**Warum die Umwandlung?** Im Array steht der Typ `Event`. Der Übersetzer weiß dort nur, was jedes Ereignis kann – `getNewState()` gehört nicht dazu. Erst die Umwandlung sagt ihm: „Dieses Ereignis ist in Wahrheit ein `StateChangedEvent`."

Die Prüfung mit `instanceof` **vor** der Umwandlung ist Pflicht. Ohne sie bricht das Programm ab, sobald ein Temperaturereignis an die Reihe kommt.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Die höchste Temperatur**

Fülle `getMaxTemperature()`. Zurückgegeben werden soll die höchste **neue** Temperatur, die in einem `TemperatureChangedEvent` vorkommt.

a) Welchen Startwert nimmst du – und warum ist 0 hier eine schlechte Wahl?

b) Schreib die Methode.

c) Prüf dein Ergebnis: In den Beispieldaten sollte 21.2 herauskommen.
:::

::::collapsible{title="Tipp zum Startwert"}

Ein Startwert von 0 behauptet stillschweigend: „Keine Temperatur ist kleiner als 0." Im Winter im Garten stimmt das nicht.

Sicher ist der **erste passende Wert** aus den Daten – oder ein Startwert, der garantiert kleiner ist als alles, was vorkommen kann.

::::

:::protect{password="sh-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public double getMaxTemperature() {
    double max = -1000;
    for (int i = 0; i < eventBacklog.length; i++) {
        if (eventBacklog[i] == null) {
            break;
        }
        if (eventBacklog[i] instanceof TemperatureChangedEvent) {
            TemperatureChangedEvent e = (TemperatureChangedEvent) eventBacklog[i];
            if (e.getNewTemperature() > max) {
                max = e.getNewTemperature();
            }
        }
    }
    return max;
}
```

Ergebnis: **21.2**

a) Sauberer als `-1000` ist es, den ersten gefundenen Wert als Startwert zu nehmen und erst ab dem zweiten zu vergleichen. `-1000` ist eine Annahme über die Wirklichkeit – und Annahmen dieser Art halten selten.

:::

:::snippet{#aufgabe}
**Aufgabe 4: Automationen zählen**

Fülle `countAutomationTriggered()`. Zurückgegeben wird, wie viele `AutomationTriggeredEvent` im Verlauf stehen.

In den Beispieldaten sind es **null** – das ist kein Fehler, sondern die Vorlage für die nächste Seite.
:::

:::protect{password="sh-3-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public int countAutomationTriggered() {
    int anzahl = 0;
    for (int i = 0; i < eventBacklog.length; i++) {
        if (eventBacklog[i] == null) {
            break;
        }
        if (eventBacklog[i] instanceof AutomationTriggeredEvent) {
            anzahl++;
        }
    }
    return anzahl;
}
```

Hier braucht es **keine** Typumwandlung: Gezählt wird nur, es wird nichts abgefragt, was es allein bei der Spezialisierung gibt.

:::

:::snippet{#aufgabe}
**Aufgabe 5: Neue Ereignisse annehmen**

Fülle `receiveEvent(Event pEvent)`. Das neue Ereignis kommt an die erste freie Stelle.

Ist **kein** Platz mehr frei, rückt alles um eins nach vorn: Das älteste Ereignis fällt heraus, und das neue kommt ans Ende.

a) Schreib die Methode.

b) Was passiert mit dem ältesten Ereignis? Kann man es zurückholen?

c) Diese Datenstruktur hat einen Namen. Welchen?
:::

::::collapsible{title="Tipp: Das Nachrücken"}

Beim Nachrücken läufst du von vorne nach hinten und ziehst jedes Element einen Platz nach vorn:

```java
for (int i = 0; i < eventBacklog.length - 1; i++) {
    eventBacklog[i] = eventBacklog[i + 1];
}
```

Danach ist der letzte Platz doppelt belegt – dort kommt das neue Ereignis hin.

::::

:::protect{password="sh-3-5" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft oder sieh auf der Seite Lösungspasswörter nach."}

```java
public void receiveEvent(Event pEvent) {
    for (int i = 0; i < eventBacklog.length; i++) {
        if (eventBacklog[i] == null) {
            eventBacklog[i] = pEvent;
            return;
        }
    }

    // kein Platz mehr: alles rueckt einen nach vorne
    for (int i = 0; i < eventBacklog.length - 1; i++) {
        eventBacklog[i] = eventBacklog[i + 1];
    }
    eventBacklog[eventBacklog.length - 1] = pEvent;
}
```

b) Es ist **weg**. Nichts hält es fest, es lässt sich nicht zurückholen. Genau deshalb speichern echte Systeme ihre Ereignisse zusätzlich auf der Festplatte – im Arbeitsspeicher ist immer irgendwann Schluss.

c) Eine **Warteschlange** (englisch *Queue*): Wer zuerst kam, geht zuerst. Hier ist sie mit einem Array gebaut und hat eine feste Größe; das Nachrücken kostet bei jedem Überlauf 99 Zuweisungen. Wie man das besser macht, steht im Lernpfad unter [Lineare Datenstrukturen](/oberstufe/oop/02-erweiterungen/04-lineare-datenstrukturen).

:::

## Und wenn es schiefgeht

:::snippet{#merken}
Zwei Fehlermeldungen wirst du hier fast sicher sehen:

| Meldung | Bedeutung |
| --- | --- |
| `NullPointerException` | Du hast auf einem leeren Platz eine Methode aufgerufen. Prüfe auf `null`, bevor du zugreifst. |
| `ClassCastException` | Du hast ein Ereignis in eine Klasse umgewandelt, zu der es nicht gehört. Frag vorher mit `instanceof`. |

Beide kommen **erst beim Ausführen** – der Übersetzer kann sie nicht finden.
:::
