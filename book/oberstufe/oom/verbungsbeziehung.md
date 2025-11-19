---
name: Vererbungsbeziehung
lang: de
---

# Vererbungsbeziehung

Die Vererbung ist eines der grundlegenden Konzepte der Objektorientierung und hat große Bedeutung in der Softwareentwicklung. Die Vererbung dient dazu, aufbauend auf existierenden Klassen (Oberklasse) neue :t[Klassen]{#klasse} (Unterklassen) zu schaffen, wobei die Beziehung zwischen ursprünglicher und neuer Klasse dauerhaft ist. Die Vererbung dient der Dokumentation von Ähnlichkeiten zwischen Klassen, was insbesondere in den frühen Phasen des Softwareentwurfs von Bedeutung ist.

Das folgende :t[Entwurfsdiagramm] zeigt eine Vererbungssituation, bei der die Unterklasse Sportauto und SUV Erweiterungen einer Basisklasse Auto darstellen.

```mermaid
classDiagram

    SUV --|> Auto
    Sportauto --|> Auto

    class Auto {
        geschwindigkeit: Zahl
        farbe: Farbe
        anzahlTueren: Zahl
        kennzeichen: Text

        beschleunigen()
        bremsen()
        umlackieren(neueFarbe: Farbe)
        gibGeschwindigkeit(): Zahl
    }

    class SUV {
        kofferraumOffen: Wahrheitswert
        kofferraumOeffnen()
        kofferraumSchliessen()
    }

    class Sportauto {
        tiefergelegt: Wahrheitswert
        tunen()
        beschleunigen()
    }
```

## Übernehmen, ergänzen und überschreiben

Bei der Vererbung übernimmt die Unterklasse die Attribute und Methoden der Oberklasse.

Eine übernommene Methode kann dabei neu definiert (überschrieben) werden. Im Klassendiagramm ist zum Beispiel gezeigt, dass die Klasse `Sportauto` die Methode `beschleunigen` neu definiert.

Die Unterklasse kann um zusätzliche Attribute und Methoden erweitert werden. Im Klassendiagramm ist zum Beispiel gezeigt, dass die Klasse `SUV` ein neues Attribut `kofferraumOffen` besitzt.

## Spezialisierung und Generalisierung

Wenn eine neue Oberklasse definiert wird, dann sprechen wir von einer Generalisierung.

Wird hingegen eine neue Unterklasse definiert, dann sprechen wir von einer Spezialisierung.

## Überprüfe dich

1. Gegeben ist folgendes Klassendiagramm ([Link zum Mermaid-Live Editor](https://mermaid.live/edit#pako:eNqtkU1LxDAQhv9KmJNCEetK3c1N8eppD8KSy9BON4E0KcmE_Sj976Yfoix4cy55efIO7zAzQO0bAgm1xRjfDR4DdsqJXDMRr31LVgwLmuoYPMVIUhxQ21-YTqbWfIv7QCbeQhN5j4mCFJ-ogybD8USBlfuxTBHu7n4B4_fPMtIbOnT0TzP9FQkFdBQ6NE1ezhylgDV1pEBm2VCLybIC5SYrJvb7i6tBckhUQOobZFrXCbJFGzPt0YEc4Ayyqgq4gCyfq4fd9rF6Kjebl-0ui7GAq_e5pZzth1mv7dQY9uFjvdf0jF8tZody)). Modifiziere das Klassendiagramm so, dass das Konzept der Vererbung sinnvoll genutzt ist.

```mermaid
classDiagram
    class Apfel {
        groesse: Zahl
        gewicht: Zahl
        preis: Zahl
        istSauer: Wahrheitswert

        essen()
    }

    class Banane {
        groesse: Zahl
        gewicht: Zahl
        preis: Zahl
        herkunfsland: Wahrheitswert

        essen()
    }
```

:::collapsible{id="loesung1" title="Lösung"}
```mermaid
classDiagram
    Apfel --|> Frucht
    Banane --|> Frucht
    class Frucht {
        groesse: Zahl
        gewicht: Zahl
        preis: Zahl

        essen()
    }
    class Apfel {
        istSauer: Wahrheitswert
    }

    class Banane {
        herkunfsland: Text
    }
```
:::
 

2. Es existieren die Klassen Fussballer, Turnerin und Judoka. Eine neue Klasse Sportlerin wird angelegt. Handlet es sich um eine Spezialisierung oder Generalisierung?

:::collapsible{id="loesung2" title="Lösung"}
Generalisierung
:::
