---
name: Bugs tut sich weh
index: 4
lang: de
---

# Bugs tut sich weh

Der Stachelfeind und Bugs interagieren im Moment noch nicht. Das wollen wir ändern.

Die Scratch for Java Bibliothek stellt Möglichkeiten bereit, um eine Kollisionsabfrage zu realisieren.

## Eine erste Kollisionsabfrage

Mit der Methode `this.isTouchingSprite(einSprite)` kann überprüft werden, ob das aktuelle Objekt ein anderes Objekt berührt.

Wir wollen im Folgenden den nachfolgenden Pseudocode umsetzen.

```
Wenn ein Stachelfeind den Spieler berührt, dann
    verletzt sich der Spieler

Wenn der Spieler verletzt ist, dann
    ändert sich sein Kostum
    und er kann sich nicht mehr bewegen
```

### Aufgaben

1. Modifiziere die Klasse `StachelFeind` so, dass ein `StachelFeind` das Spieler-Objekt `bugs` kennt. Füge dazu ein Attribut vom Datentyp `Spieler` der Klasse `StachelFeind` hinzu und verändere den Konstruktor der Klasse `StachelFeind` so, dass das Attribut belegt wird.
2. Modifiziere die Methode `run()` der Klasse `StachelFeind` so, dass überprüft wird, ob ein StachelFeind den Spieler berührt (`isTouchingSprite`). Wenn dies der Fall ist, soll die `verletzten()`-Methode der Spieler-Klasse aufgerufen werden.
3. Implementiere die `verletzten`-Methode der Klasse `Spieler`

## Verfeinerung der Kollisionsabfrage

Jedes Sprite-Objekt hat eine Hitbox. Wenn du den Debug-Modus aktivierst `setDebug(true)`, dann kannst du die Hitboxen sehen. Manchmal passen die Hitboxen nicht so gut zum Kostüm des Sprites. Mit der Methode `setHitbox` können wir die Hitbox anpassen.

`setHitbox` bekommt eine beliebige Anzahl an Koordinaten der folgenden Form: `setHitbox(x1, y1, x2, y2, x3, y3, ...)`. Diese Koordinaten sind relative zu der linken oberen Ecke. Sie verwenden der Reihe nach verarbeitet und Bilden ein Polygon (Vieleck).

![Hitboxen](/images/bunny-hop/bugs-tut-sich-weh/hitboxen.png)

### Aufgaben

1. Modifiziere die Hitbox des Stachelfeinds so, dass diese besser zu seinem Kostüm passt.
2. Modifiziere die Hitbox des Spielers so, dass diese besser zu seinem Kostüm passt.
