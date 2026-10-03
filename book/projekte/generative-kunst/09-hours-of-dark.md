---
name: Hours of Dark
index: 9
lang: de
permaid: genkunst-hours-of-dark
---

# Hours of Dark

*Hours of Dark* ist ein Druck des Londoner Designstudios Accept & Proceed aus
dem Jahr 2011. Auf den ersten Blick sieht man nur ein Gitter aus schwarzen
Strichen. Tatsächlich ist es ein **Kalender**: Jeder Strich ist ein Tag des
Jahres. Je **dicker** der Strich, desto länger war es an diesem Tag dunkel.
Und die **Richtung** des Strichs zeigt, wo am Horizont an diesem Tag die Sonne
untergegangen ist.

Ein Bild aus Daten – wie schon bei [Joy Division](./02-joy-division). Nur
dass man hier die Daten kennt und trotzdem ein Kunstwerk sieht.

:::snippet{#merken}
**Vorwissen:** Schleifen, Division mit Rest (`/` und `%` bei ganzen Zahlen)
und Sinus und Kosinus wie auf der Seite [Cubic Disarray](./03-cubic-disarray).
:::

## 365 Tage im Gitter

Das Gitter hat 23 Spalten mit je 16 Zeilen – das sind 368 Plätze für 365 Tage.
Die Tage laufen **spaltenweise**: Tag 0 bis 15 stehen in der ersten Spalte von
oben nach unten, Tag 16 bis 31 in der zweiten, und so weiter. Aus der Nummer
eines Tages bekommt man seine Stelle im Gitter mit ganzzahliger Division:

| Tag | Spalte `tag / 16` | Zeile `tag % 16` |
| --- | --- | --- |
| 0 | 0 | 0 |
| 15 | 0 | 15 |
| 16 | 1 | 0 |
| 100 | 6 | 4 |
| 364 | 22 | 12 |

Jeder Tag bekommt einen Strich durch die Mitte seiner Zelle. Damit er nicht in
die Nachbarzelle ragt, muss er rechtzeitig aufhören. Wie weit er von der Mitte
aus gehen darf, hängt von seiner Richtung ab: Ein waagerechter Strich stößt an
den linken und rechten Rand, ein senkrechter an den oberen und unteren. Die
Methode `strich` rechnet beides aus und nimmt das Kleinere.

:::onlineide{libraries="scratch" height="680px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new HoursOfDark());
}
```

```java HoursOfDark.java
public class HoursOfDark extends Stage {

   private static final int SPALTEN = 23;
   private static final int ZEILEN = 16;
   private static final int TAGE = 365;

   private Pen stift;

   public HoursOfDark() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);

      double gitterBreite = 400 * 0.9;
      double gitterHoehe = 400 * 0.7;
      double zellBreite = gitterBreite / SPALTEN;
      double zellHoehe = gitterHoehe / ZEILEN;

      for (int tag = 0; tag < TAGE; tag++) {
         int spalte = tag / ZEILEN;
         int zeile = tag % ZEILEN;

         double mx = -gitterBreite / 2 + spalte * zellBreite + zellBreite / 2;
         double my = gitterHoehe / 2 - zeile * zellHoehe - zellHoehe / 2;

         strich(mx, my, Math.PI / 2, 2, zellBreite, zellHoehe);
      }
   }

   /**
    * Zieht einen Strich durch die Mitte einer Zelle, der nicht über ihren Rand ragt.
    * @param pWinkel Richtung des Strichs im Bogenmaß
    * @param pDicke Dicke des Strichs
    */
   private void strich(double pMx, double pMy, double pWinkel, double pDicke,
                       double pZellBreite, double pZellHoehe) {
      double dx = Math.cos(pWinkel);
      double dy = Math.sin(pWinkel);
      double halbeLaenge = Math.min(pZellBreite / 2 / Math.abs(dx),
                                    pZellHoehe / 2 / Math.abs(dy));
      halbeLaenge = halbeLaenge - pDicke / 2;

      stift.setSize(pDicke);
      stift.up();
      stift.setPosition(pMx - dx * halbeLaenge, pMy - dy * halbeLaenge);
      stift.down();
      stift.setPosition(pMx + dx * halbeLaenge, pMy + dy * halbeLaenge);
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Prüfe die Tabelle oben für Tag 100 und Tag 364 nach. In welcher Zeile und
   Spalte steht dein Geburtstag? (Der 1. Januar ist Tag 0.)

b) Ändere die Reihenfolge so, dass die Tage **zeilenweise** laufen: von links
   nach rechts, dann die nächste Zeile.

c) Ersetze `Math.PI / 2` durch `0` und durch `Math.PI / 4`. Bleiben die Striche
   immer in ihrer Zelle?

d) Warum wird von `halbeLaenge` noch `pDicke / 2` abgezogen?
:::

::::collapsible{title="Tipp zu b)"}

Bei zeilenweiser Anordnung stehen in jeder Zeile `SPALTEN` Tage. Die Zeile ist
also `tag / SPALTEN`. Und die Spalte?

::::

::::collapsible{title="Tipp zu d)"}

Der Stift zeichnet runde Enden. Wie weit ragt ein Strich der Dicke 6 über
seinen Anfangs- und seinen Endpunkt hinaus?

::::

## Das Jahr als Welle

Jetzt brauchen wir für jeden Tag die Dicke und die Richtung. Echte Messwerte
haben wir nicht – aber wir wissen, wie sich die Nacht im Laufe des Jahres
verändert: Im Winter ist sie lang, im Sommer kurz, und dazwischen ändert sie
sich gleichmäßig wie eine Welle. Eine solche Welle beschreibt man mit Sinus und
Kosinus.

Dafür rechnen wir den Tag in einen Winkel `phi` um, der im Laufe des Jahres von
0 bis π läuft:

| Zeitpunkt | `phi` | `Math.abs(Math.cos(phi))` | `Math.sin(phi)` |
| --- | --- | --- | --- |
| Januar | 0 | 1 (lange Nacht) | 0 |
| Juli | π/2 | 0 (kurze Nacht) | 1 |
| Dezember | fast π | fast 1 (lange Nacht) | fast 0 |

Der Betrag des Kosinus bestimmt die **Dicke**, der Sinus die **Richtung**.

:::onlineide{libraries="scratch" height="740px" speed="1000000"}

```java Main.java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new HoursOfDark());
}
```

```java HoursOfDark.java
public class HoursOfDark extends Stage {

   private static final int SPALTEN = 23;
   private static final int ZEILEN = 16;
   private static final int TAGE = 365;

   private Pen stift;

   public HoursOfDark() {
      this.setColor(245, 240, 230);
      stift = new Pen();
      this.add(stift);
      stift.setColor(30, 30, 30);

      double gitterBreite = 400 * 0.9;
      double gitterHoehe = 400 * 0.7;
      double zellBreite = gitterBreite / SPALTEN;
      double zellHoehe = gitterHoehe / ZEILEN;

      for (int tag = 0; tag < TAGE; tag++) {
         int spalte = tag / ZEILEN;
         int zeile = tag % ZEILEN;

         double mx = -gitterBreite / 2 + spalte * zellBreite + zellBreite / 2;
         double my = gitterHoehe / 2 - zeile * zellHoehe - zellHoehe / 2;

         double phi = (double) tag / TAGE * Math.PI;
         double winkel = Math.sin(phi) * Math.PI * 0.45 + 0.85;
         double dicke = 2 * (Math.abs(Math.cos(phi)) * 2 + 1);

         strich(mx, my, winkel, dicke, zellBreite, zellHoehe);
      }
   }

   /**
    * Zieht einen Strich durch die Mitte einer Zelle, der nicht über ihren Rand ragt.
    * @param pWinkel Richtung des Strichs im Bogenmaß
    * @param pDicke Dicke des Strichs
    */
   private void strich(double pMx, double pMy, double pWinkel, double pDicke,
                       double pZellBreite, double pZellHoehe) {
      double dx = Math.cos(pWinkel);
      double dy = Math.sin(pWinkel);
      double halbeLaenge = Math.min(pZellBreite / 2 / Math.abs(dx),
                                    pZellHoehe / 2 / Math.abs(dy));
      halbeLaenge = halbeLaenge - pDicke / 2;

      stift.setSize(pDicke);
      stift.up();
      stift.setPosition(pMx - dx * halbeLaenge, pMy - dy * halbeLaenge);
      stift.down();
      stift.setPosition(pMx + dx * halbeLaenge, pMy + dy * halbeLaenge);
      stift.up();
   }
}
```

:::

:::snippet{#aufgabe}
a) Wie dick ist der Strich am 1. Januar, wie dick Anfang Juli? Rechne mit der
   Formel für `dicke` nach.

b) Zwischen welchen Winkeln (in Grad) dreht sich der Strich im Laufe des
   Jahres? Rechne mit der Formel für `winkel` und `Math.toDegrees`.

c) Lass das `(double)` in der Berechnung von `phi` weg. Warum ist das Bild
   danach so eintönig?

d) Färbe die Striche nach Jahreszeit: Frühling grün, Sommer gelb, Herbst
   orange, Winter blau.
:::

::::collapsible{title="Tipp zu b)"}

`Math.sin(phi)` liegt zwischen 0 und 1. Der kleinste Winkel ist also
0 · π · 0.45 + 0.85, der größte 1 · π · 0.45 + 0.85 – beides im Bogenmaß.

::::

## Weiterspielen

:::snippet{#challenge}
**Echte Daten.** Such im Netz die Uhrzeiten von Sonnenaufgang und -untergang
für deinen Wohnort heraus, etwa für jeden Monatsersten. Lege sie in einem
Feld ab und berechne daraus die Länge der Nacht. Zwischen zwei Monatsersten
kannst du die Werte gleichmäßig verteilen.

*Wie sieht dein Bild aus, wenn du statt deines Wohnorts einen Ort am Äquator
oder nördlich des Polarkreises nimmst?*
:::

:::snippet{#challenge}
**Wochen sichtbar machen.** Ordne das Gitter so an, dass jede Spalte genau
eine Woche ist: 7 Zeilen, 53 Spalten. Lass die Wochenenden etwas heller.
:::

:::snippet{#challenge}
**Dein Jahr.** Statt Dunkelheit kannst du alles darstellen, was jeden Tag
anders ist: wie viele Schritte du gegangen bist, wie lange du geschlafen
hast, wie das Wetter war. Überlege dir, was Dicke, Richtung und Farbe des
Strichs jeweils bedeuten sollen.
:::

---

Nach dem Tutorial [Hours of Dark](https://generativeartistry.com/tutorials/hours-of-dark/)
von Generative Artistry.
