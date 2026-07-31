---
title: Eigenes Spiel
index: 3
---

# Eigenes Spiel

Das Abschlussprojekt. Ihr entwickelt in Gruppen ein eigenes kleines Spiel mit Scratch for Java – und durchlauft dabei einmal den vollständigen Problemlöseprozess: analysieren, modellieren, implementieren, testen, beurteilen.

## Was das Spiel können muss

:::snippet{#merken}
Vereinbart als Mindestanforderungen:

1. Mindestens **drei eigene Klassen**, die von `Sprite` erben.
2. Mindestens **eine Vererbungsbeziehung** zwischen zwei eurer Klassen – also eine gemeinsame Oberklasse.
3. Mindestens **eine Assoziation** – ein Objekt, das ein anderes kennt.
4. Ein **Feld**, in dem gleichartige Objekte verwaltet werden.
5. Eine **Punktzahl** oder ein anderer Spielstand, der angezeigt wird.
6. Eine **Endbedingung**: Wann ist das Spiel gewonnen oder verloren?
:::

## Ideen

:::snippet{#beispiel}
| Spiel | Klassen | Vererbung | Assoziation |
| --- | --- | --- | --- |
| **Fangspiel** | Spieler, Gegner, Bonus | `Gegner` und `Bonus` erben von `Beweglich` | `Spieler` kennt sein `Ziel` |
| **Weltraum** | Schiff, Schuss, Asteroid | `Asteroid` und `Schuss` erben von `Flugobjekt` | `Schiff` kennt seinen letzten `Schuss` |
| **Labyrinth** | Spieler, Wand, Schlüssel, Tür | `Wand` und `Tür` erben von `Hindernis` | `Tür` kennt ihren `Schlüssel` |
| **Sortierspiel** | Karte, Ablage, Stapel | `Zahlenkarte` und `Jokerkarte` erben von `Karte` | `Stapel` kennt seine `Karte`-Objekte im Feld |
| **Reaktionstest** | Ziel, Störer, Anzeige | `Störer` erbt von `Ziel` | `Anzeige` kennt das aktuelle `Ziel` |

Ihr dürft euch auch etwas ganz anderes ausdenken. Wichtig ist nur, dass die sechs Mindestanforderungen erfüllt sind.
:::

## Der Ablauf

:::snippet{#aufgabe}
**Phase 1 – Analyse und Modellierung**

a) Beschreibt euer Spiel in **fünf Sätzen**: Was sieht man, was tut die spielende Person, wie gewinnt man?

b) Ermittelt die beteiligten Objekte, ihre Eigenschaften, ihre Operationen und ihre Beziehungen.

c) Zeichnet das Implementationsdiagramm. Prüft jede Vererbungsbeziehung mit dem Satztest „ist ein“.

d) **Legt das Diagramm der Lehrkraft vor, bevor ihr programmiert.** Ein Modellierungsfehler kostet in Phase 2 ein Vielfaches der Zeit.

**Phase 2 – Implementierung**

e) Verteilt die Klassen in der Gruppe. Vereinbart vorher die **Schnittstellen**: Wie heißen die Konstruktoren, welche Methoden ruft wer auf?

f) Baut zuerst ein **lauffähiges Minimalspiel**: eine steuerbare Figur, ein Gegenstand, eine Punktzahl. Erweitert erst danach.

g) Testet jede Klasse einzeln, bevor ihr sie zusammensetzt.

**Phase 3 – Testen**

h) Legt eine Testliste an. Was muss funktionieren? Denkt besonders an die **Sonderfälle**: Was passiert am Bildschirmrand? Bei gleichzeitigem Drücken zweier Tasten? Wenn alle Gegenstände weg sind?

i) Lasst eine **andere Gruppe** euer Spiel testen. Notiert, was sie findet.

**Phase 4 – Beurteilung**

j) Beurteilt euren eigenen Entwurf: Was würdet ihr rückblickend anders modellieren? Wo habt ihr Code kopiert, statt eine Oberklasse zu bauen?

k) Stellt euer Spiel und euer Diagramm der Lerngruppe vor.
:::

## Das Startgerüst

:::onlineide{libraries="scratch" height="720px"}

```java Main.java
void main() {
    new Spiel();
}
```

```java Spiel.java
/**
 * Die Bühne des Spiels. Sie verwaltet den Spielstand.
 */
public class Spiel extends Stage {

    private int punkte;
    private boolean laeuft;
    private Text anzeige;

    public Spiel() {
        punkte = 0;
        laeuft = true;

        anzeige = new Text("Punkte: 0", -230, 155, 460);
        this.add(anzeige);

        this.add(new Spieler());

        for (int i = 0; i < 6; i++) {
            this.add(new Ziel(this.pickRandom(-200, 200), this.pickRandom(-120, 120)));
        }
    }

    /** Erhöht den Spielstand und aktualisiert die Anzeige. */
    public void zaehle(int pWert) {
        punkte = punkte + pWert;
        anzeige.showText("Punkte: " + punkte);
    }

    /** Beendet das Spiel mit einer Schlussmeldung. */
    public void beende(String pMeldung) {
        laeuft = false;
        anzeige.showText(pMeldung + " Endstand: " + punkte);
    }

    public boolean laeuft() {
        return laeuft;
    }

    /** Prüft in jedem Bild, ob das Spielziel erreicht ist. */
    public void run() {
        if (laeuft && this.count(Ziel.class) == 0) {
            beende("Geschafft!");
        }
    }
}
```

```java Spieler.java
/**
 * Die vom Menschen gesteuerte Figur.
 */
public class Spieler extends Sprite {

    private int tempo;

    public Spieler() {
        this.addCostume("bunny1_stand");
        this.setPosition(0, -140);
        tempo = 4;
    }

    public void run() {
        Spiel s = (Spiel) this.getStage();
        if (!s.laeuft()) {
            return;
        }

        if (this.isKeyPressed(KeyCode.RIGHT)) {
            this.changeX(tempo);
        }
        if (this.isKeyPressed(KeyCode.LEFT)) {
            this.changeX(-tempo);
        }
        if (this.isKeyPressed(KeyCode.UP)) {
            this.changeY(tempo);
        }
        if (this.isKeyPressed(KeyCode.DOWN)) {
            this.changeY(-tempo);
        }
        this.ifOnEdgeBounce();

        Ziel getroffen = this.getTouchingSprite(Ziel.class);
        if (getroffen != null) {
            s.zaehle(getroffen.getWert());
            getroffen.remove();
        }
    }
}
```

```java Ziel.java
/**
 * Ein einzusammelnder Gegenstand.
 * Erweitert diese Klasse zu einer Oberklasse mit mehreren Unterklassen.
 */
public class Ziel extends Sprite {

    private int wert;

    public Ziel(int pX, int pY) {
        this.addCostume("coin_gold");
        this.setPosition(pX, pY);
        wert = 10;
    }

    public int getWert() {
        return wert;
    }
}
```

:::

:::snippet{#merken}
Das Gerüst erfüllt noch **nicht** alle Mindestanforderungen – es fehlen die Vererbung und die Assoziation. Genau das ist eure Aufgabe.

Ihr dürft es beliebig umbauen oder ganz verwerfen. Es zeigt nur, wie die Teile zusammenspielen:

- Die Bühne kennt den Spielstand und die Endbedingung.
- Die Figuren melden ihr an, was passiert ist.
- `this.count(Ziel.class)` zählt, wie viele Objekte einer Art noch auf der Bühne sind.
:::

## Beurteilungskriterien

:::snippet{#merken}
Vereinbart die Kriterien **vor** Projektbeginn – dann wisst ihr, worauf es ankommt.

| Bereich | Kriterium |
| --- | --- |
| **Modellieren** | Sind die Klassen sinnvoll geschnitten? Passt jede Vererbung zum Satztest „ist ein“? |
| **Darstellen** | Stimmt das Diagramm mit dem Programm überein? Sind Sichtbarkeiten, Datentypen und Kardinalitäten eingetragen? |
| **Implementieren** | Läuft das Spiel? Steht jede Zuständigkeit an genau einer Stelle? |
| **Testen** | Gibt es eine Testliste? Sind Sonderfälle bedacht? |
| **Kommunizieren** | Ist der Quelltext kommentiert? Könnt ihr eure Entwurfsentscheidungen begründen? |
| **Kooperieren** | Waren die Schnittstellen vorher vereinbart? Hat der Zusammenbau funktioniert? |

Der letzte Punkt ist der, an dem Gruppenprojekte am häufigsten scheitern – und der, aus dem man am meisten lernt.
:::

## Zum Schluss

:::snippet{#brain}
Wenn euer Spiel fertig ist, schaut euch die Projektseiten dieses Hyperbooks an: [Bunny Hop](../../../../projekte/bunny-hop), [Donut IO](../../../../projekte/donut-io) oder das [RPG](../../../../projekte/rpg). Dort findet ihr größere Spiele mit derselben Bibliothek – mit Animationen, Kacheln, Sound und Kameraführung.

Und im Lernpfad [Erweiterungen der Programmierung mit Java](../../02-erweiterungen) geht es weiter: mit abstrakten Klassen, Rekursion und Datenstrukturen, die mitwachsen.
:::
