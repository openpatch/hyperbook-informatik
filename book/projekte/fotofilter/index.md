---
name: Fotofilter
index: 2
lang: de
permaid: fotofilter
keywords:
    - java
    - level-1
    - bildverarbeitung
---

# Fotofilter

## Ziel

Jede Kamera-App kann es: ein Bild heller machen, es in Schwarzweiß verwandeln,
es weichzeichnen, die Umrisse hervorheben. In diesem Projekt baust du diese
Filter selbst – und dabei lernst du die Datenstruktur kennen, ohne die
Bildverarbeitung nicht funktioniert: das **zweidimensionale Feld**. Du
brauchst es noch nicht zu kennen. Es reicht, wenn du mit eindimensionalen
Feldern umgehen kannst.

Ein Foto ist nämlich nichts anderes als eine Tabelle aus Zahlen. 96 Spalten,
72 Zeilen, in jeder Zelle eine Helligkeit. Ein Filter ist eine Vorschrift,
die aus dieser Tabelle eine neue macht. Mehr steckt nicht dahinter.

Am Ende hast du ein gutes Dutzend Filter geschrieben, sie zu einer Kette
zusammengesteckt und dabei gesehen, warum man dafür Klassen und Vererbung
gebrauchen kann.

![Das Foto, mit dem du arbeitest](/images/fotofilter.png)

## Vorwissen

Du solltest programmieren können, was im Lernpfad
[Grundlagen der Programmierung mit Java](/oberstufe/oop/01-grundlagen) steht:

- [Variablen und Datentypen](/oberstufe/oop/01-grundlagen/02-variablen-und-datentypen)
- [Kontrollstrukturen](/oberstufe/oop/01-grundlagen/03-kontrollstrukturen), vor allem **geschachtelte Schleifen**
- [Methoden](/oberstufe/oop/01-grundlagen/04-methoden-und-modularisierung)
- [Eindimensionale Felder](/oberstufe/oop/01-grundlagen/05-felder) – anlegen, durchlaufen, `length`
- [Objektorientierung](/oberstufe/oop/01-grundlagen/06-objektorientierung) – Klassen, Objekte, Attribute

**Zweidimensionale Felder musst du nicht kennen.** Du lernst sie in diesem
Projekt kennen, und zwar Schritt für Schritt am Foto. Jede Seite bringt einen
Baustein dazu:

| Seite | Das lernst du über zweidimensionale Felder |
| --- | --- |
| [Das Bild als Gitter](./01-das-bild-als-gitter) | ein Feld von Feldern, `bild[zeile][spalte]`, `length`, Zeilen durchlaufen mit geschachtelten Schleifen |
| [Punktfilter](./02-punktfilter) | ein neues Gitter mit `new int[zeilen][spalten]` anlegen und hineinschreiben |
| [Farbe und Kanäle](./03-farbe-und-kanaele) | mehrere gleich große Gitter mit denselben Indizes gemeinsam durchlaufen |
| [Spiegeln und Drehen](./04-spiegeln-und-drehen) | mit Indizes rechnen, Gitter mit anderer Form anlegen |
| [Weichzeichnen](./05-weichzeichnen) | Nachbarn ansprechen, Ränder behandeln, Original und Kopie trennen |
| [Kanten finden](./06-kanten-finden) | Unterschiede zwischen Nachbarn, Gitter miteinander verrechnen |

Für die letzten beiden Seiten hilft es, wenn du
[Vererbung und abstrakte Klassen](/oberstufe/oop/02-erweiterungen/01-vertiefte-objektorientierung)
schon kennst. Nötig ist es nicht – die Seiten führen das ein, was sie brauchen.

<!-- Fuer Lehrkraefte: gedacht fuer die Q1 nach Q1-I (abstrakte Klassen, Zeigervariablen). Vorausgesetzt werden nur eindimensionale Felder aus EF-V; zweidimensionale Felder werden im Projekt eingefuehrt (KLP-Entwurf QPh GK, Daten und ihre Strukturierung: "statische Datenstrukturen in Form von ein- und zweidimensionalen Feldern"). Das Speicherdiagramm auf Seite 1 greift die im SILP zu Q1-I geforderte Darstellung von Zeigern in Diagrammen auf; Seite 7 nutzt Polymorphie (KLP GK, Objekte und Klassen). -->

## So arbeitest du damit

:::snippet{#merken}
- Alle Programmierbereiche laufen **im Browser**. Du musst nichts installieren.
- Jeder Bereich enthält das vollständige Programm. Du kannst darin herumändern,
  ohne etwas kaputtzumachen – ein Neuladen der Seite stellt den Ursprung wieder her.
- Gestartet wird mit dem kleinen Pfeil **neben `Main.java`** in der Dateiliste links.
- Tipps sind gestuft: Der erste gibt einen Denkanstoß, der letzte ein Gerüst.
- Die Lösungen sind mit einem Passwort geschützt. Frag deine Lehrkraft oder sieh
  auf der Seite [Lösungspasswörter](/loesungen) nach.
:::

## Die Seiten

| Seite | Darum geht es |
| --- | --- |
| [Das Bild als Gitter](./01-das-bild-als-gitter) | Vom eindimensionalen Feld zum Gitter – und das Foto zum ersten Mal auf dem Schirm |
| [Punktfilter](./02-punktfilter) | Ein Gitter anlegen, dann heller, dunkler, invertiert, schwarzweiß: jeder Bildpunkt für sich |
| [Farbe und Kanäle](./03-farbe-und-kanaele) | Drei Gitter statt einem – Sepia, Farbstiche, Kanaltausch |
| [Spiegeln und Drehen](./04-spiegeln-und-drehen) | Nicht die Werte ändern sich, sondern die Indizes |
| [Weichzeichnen](./05-weichzeichnen) | Der Nachbarschaftsfilter – und warum er eine Kopie braucht |
| [Kanten finden](./06-kanten-finden) | Wo sich die Helligkeit schnell ändert, ist ein Umriss |
| [Filter als Klassen](./07-filter-als-klassen) | Aus acht Methoden wird eine Filterkette |
| [Dein eigener Filter](./08-dein-eigener-filter) | Freies Arbeiten, ohne Musterlösung |

:::alert{info}
**Woher kommt das Foto?** Die Online-IDE legt die Bilddatei als
`fotofilter.png` im Programm ab. Die Klasse `Foto` lädt sie in ein `Bitmap`
und liest daraus die Farbwerte der 96 × 72 Bildpunkte. Du findest die Klasse
in jedem Programmierbereich – du musst sie nie anfassen, nur benutzen.
:::
