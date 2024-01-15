---
name: Ereignisse analysieren
index: 3
lang: de
---

# Ereignisse analysieren

Wir nehmen an das unsere Smart Home viele Ereignisse gesammelt hat. Nun wollen wir diese analysieren und etwas über unser Verhalten herausfinden bzw. Daten für zum Beispiel ein Dashboard abgreifen.

Zur Verwaltung der Ereignisse benutzen wir die lineare Datenstruktur des Arrays.

## Aufgaben

1. Informiere dich über die lineare Datenstruktur des Arrays. Nutze dafür die Seite [Arrays](https://www.learnj.de/doku.php?id=types:arrays:start).
2. Lade das BlueJ-Projekt "Smart Home Ereignisse" herunter oder nutze die OnlineIDE (siehe unten).
3. Implementiere die Methode "showBacklog".
4. Informiere dich über den "instanceof"-Operator und Casting. Nutze dafür die Seite [instanceof](https://www.learnj.de/doku.php?id=klassen2:casting:start).
5. Implementiere die Methode "showLights".
6. Implementiere die Methode "getMaxTemperature".
7. Implementiere die Methode "countAutomationTriggered".


### BlueJ

::archive[BlueJ-Projekt: Smart Home Ereignisse]{name="smart-home-ereignisse"}


### Online-IDE

:::onlineide{id="smart-home-ereignisse"}

```java SmartHome.java
{{{file "/archives/smart-home-ereignisse/SmartHome.java"}}} 

new SmartHome().analyze();
```

```java Event.java
{{{file "/archives/smart-home-ereignisse/Event.java"}}} 
```

```java TemperatureChangedEvent.java
{{{file "/archives/smart-home-ereignisse/TemperatureChangedEvent.java"}}} 
```

```java StateChangedEvent.java
{{{file "/archives/smart-home-ereignisse/StateChangedEvent.java"}}} 
```

```java AutomationTriggeredEvent.java
{{{file "/archives/smart-home-ereignisse/AutomationTriggeredEvent.java"}}} 
```


:::