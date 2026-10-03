---
name: Generative Kunst
index: 4
lang: de
permaid: genkunst
keywords:
    - java
    - level-1
    - generative-kunst
---

# Generative Kunst

## Ziel

Bei **generativer Kunst** malt nicht der Mensch das Bild, sondern er schreibt
die **Regeln**, nach denen ein Programm es malt. Meist steckt in den Regeln
ein bisschen Zufall – deshalb sieht jedes Bild anders aus, obwohl alle aus
demselben Programm stammen.

Das klingt nach etwas Neuem, ist aber älter als der Heimcomputer. In den
1960er Jahren haben Leute wie Georg Nees und Vera Molnár Großrechner mit
Zeichenmaschinen verbunden und so die ersten Computerbilder geschaffen.
In diesem Projekt baust du neun berühmte Werke nach – vom
Ein-Zeilen-Programm auf dem Commodore 64 bis zu einem Jahreskalender aus
Sonnenuntergängen.

Grundlage ist die Webseite [Generative Artistry](https://generativeartistry.com/tutorials/)
von Tim Holman. Dort sind die Tutorials in JavaScript
geschrieben. Hier übersetzen wir sie nach Java und zeichnen mit dem **Stift**
(`Pen`) aus Scratch for Java – direkt im Browser.

:::alert{info}
Fühle dich frei, in jedes Werk deine eigenen Ideen einfließen zu lassen.
Die Seiten sind eine Orientierungshilfe, keine strenge Vorschrift. Am Ende
jeder Seite stehen Ideen, wie du das Bild weitertreiben kannst – dazu gibt es
**keine Musterlösung**, denn es gibt kein richtiges Ergebnis.
:::

## Vorwissen

Du solltest programmieren können, was im Lernpfad
[Grundlagen der Programmierung mit Java](/oberstufe/oop/01-grundlagen) steht.
Die ersten Werke brauchen nur Schleifen und Methoden, die späteren mehr. Jede
Seite sagt dir am Anfang, was du kennen solltest:

| Werk | Das brauchst du |
| --- | --- |
| [Tiled Lines](./01-tiled-lines) | [verschachtelte Schleifen](/oberstufe/oop/01-grundlagen/03-kontrollstrukturen/06-verschachtelte-schleifen), [Methoden](/oberstufe/oop/01-grundlagen/04-methoden-und-modularisierung) |
| [Joy Division](./02-joy-division) | [zweidimensionale Felder](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik/01-zweidimensionale-felder) |
| [Cubic Disarray](./03-cubic-disarray) | Methoden mit Rückgabewert, ein wenig Trigonometrie |
| [Triangular Mesh](./04-triangular-mesh) | zweidimensionale Felder, Objekte |
| [Un Deux Trois](./05-un-deux-trois) | [eindimensionale Felder](/oberstufe/oop/01-grundlagen/05-felder) als Parameter |
| [Circle Packing](./06-circle-packing) | [eigene Klassen](/oberstufe/oop/01-grundlagen/06-objektorientierung), Felder von Objekten |
| [Hypnotic Squares](./07-hypnotic-squares) | [Rekursion](/oberstufe/oop/02-erweiterungen/03-rekursion-und-problemloesestrategien/01-rekursion) |
| [Piet Mondrian](./08-piet-mondrian) | eigene Klassen, Felder von Objekten |
| [Hours of Dark](./09-hours-of-dark) | Schleifen, Trigonometrie |

Die Seiten bauen nicht aufeinander auf. Nur zwei Dinge lernst du einmal und
benutzt sie danach immer wieder: die Methode `linie` auf der ersten Seite und
das Drehen eines Punktes auf der Seite [Cubic Disarray](./03-cubic-disarray).

<!-- Fuer Lehrkraefte: einsetzbar ab Ende EF (Seiten 1, 3, 5, 9) bzw. in der Q1 (zweidimensionale Felder auf den Seiten 2 und 4, Rekursion auf Seite 7). Die Seiten 6 und 8 verwalten Objekte in Feldern mit Fuellstandszaehler und eignen sich als Vorstufe zu den linearen Datenstrukturen. -->

## So arbeitest du damit

:::snippet{#merken}
- Alle Programmierbereiche laufen **im Browser**. Du musst nichts installieren.
- Jeder Bereich enthält das vollständige Programm. Du kannst darin herumändern,
  ohne etwas kaputtzumachen – ein Neuladen der Seite stellt den Ursprung wieder her.
- Gestartet wird mit dem kleinen Pfeil **neben `Main.java`** in der Dateiliste links.
- Starte ein Programm **mehrmals**. Weil Zufall im Spiel ist, entsteht jedes Mal
  ein neues Bild.
- Die Einstellungen eines Bildes stehen als Konstanten in GROSSBUCHSTABEN ganz
  oben in der Klasse. Dreh daran!
:::

## Die Leinwand

Alle Bilder entstehen auf einer quadratischen Bühne mit **400 × 400** Bildpunkten.
Wie immer bei Scratch for Java liegt der Punkt (0, 0) in der **Mitte**, die
x-Achse zeigt nach rechts und die y-Achse nach **oben**. Die Leinwand reicht
also von −200 bis 200 – in beide Richtungen.

```java
void main() {
   Window fenster = new Window(400, 400);
   fenster.setStage(new TiledLines());
}
```

`new Window(400, 400)` legt die Größe fest, `setStage` stellt das Kunstwerk
hinein. Das Kunstwerk selbst ist eine Unterklasse von `Stage` und zeichnet im
Konstruktor.

## Die Werke

| Seite | Darum geht es |
| --- | --- |
| [Tiled Lines](./01-tiled-lines) | Ein Gitter aus Schrägstrichen – das berühmte „10 PRINT“ |
| [Joy Division](./02-joy-division) | Gebirge aus Linien wie auf dem Plattencover „Unknown Pleasures“ |
| [Cubic Disarray](./03-cubic-disarray) | Ordnung, die nach unten hin zerfällt – nach Georg Nees |
| [Triangular Mesh](./04-triangular-mesh) | Ein Netz aus grauen Dreiecken |
| [Un Deux Trois](./05-un-deux-trois) | Ein, zwei, drei Striche in jeder Zelle – nach Vera Molnár |
| [Circle Packing](./06-circle-packing) | Kreise, die wachsen, bis sie anstoßen |
| [Hypnotic Squares](./07-hypnotic-squares) | Quadrate in Quadraten in Quadraten – nach William Kolomyjec |
| [Piet Mondrian](./08-piet-mondrian) | Rechtecke teilen und einfärben |
| [Hours of Dark](./09-hours-of-dark) | Ein Jahr Dunkelheit als Bild |

:::alert{info}
**Warum füllt der Stift keine Flächen?** Der `Pen` kann nur Linien ziehen.
Eine Fläche entsteht deshalb so, wie man sie auch mit einem Filzstift ausmalt:
aus vielen Linien dicht nebeneinander. Auf den Seiten
[Joy Division](./02-joy-division), [Triangular Mesh](./04-triangular-mesh) und
[Piet Mondrian](./08-piet-mondrian) siehst du, wie das geht.
:::
