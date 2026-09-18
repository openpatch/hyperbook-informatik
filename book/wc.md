---
name: Web Components
hide: true
scripts:
  - /wc/binary-to-ascii.js
  - /wc/bit-rows.js
  - /wc/card-matching.js
  - /wc/category-drag.js
  - /wc/coin-rows.js
  - /wc/ki-bigramm.js
  - /wc/ki-konfusionsmatrix.js
  - /wc/ki-neuron.js
  - /wc/ki-punktwolke.js
  - /wc/memory-game.js
  - /wc/oop-aufrufbaum.js
  - /wc/oop-dispatch.js
  - /wc/oop-kapselung.js
  - /wc/oop-klassendiagramm.js
  - /wc/oop-nebenlaeufig.js
  - /wc/oop-objektkarten.js
  - /wc/oop-sortierung.js
  - /wc/oop-stapel-schlange.js
  - /wc/oop-suchbaum.js
  - /wc/oop-testfaelle.js
  - /wc/oop-wachstum.js
  - /wc/oop-wahrheitstabelle.js
  - /wc/oop-wertetabelle.js
  - /wc/pixel-editor.js
  - /wc/pixel-magnifier.js
  - /wc/pixel-minifier.js
  - /wc/rock-paper-scissors.js
---

# Web Components

## Binary to ASCII

Konvertiert Binärwerte in ASCII- oder Unicode-Zeichen. Die Komponente zeigt eine interaktive Bit-Darstellung, bei der Bits durch Klicken umgeschaltet werden können.

| Attribute | Type   | Description                                                    |
|-----------|--------|----------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands             |
| `mode`    | String | Modus: `"ascii"` (7 Bit, Standard) oder `"unicode"` (16 Bit)  |

**Beispiel:**
```html
<binary-to-ascii id="ascii-demo"></binary-to-ascii>
<binary-to-ascii id="unicode-demo" mode="unicode"></binary-to-ascii>
```

<binary-to-ascii id="wc-ascii-demo"></binary-to-ascii>

---

## Bit Rows

Zeigt interaktive Bit-Reihen an. Bits können zwischen 0 und 1 umgeschaltet werden. Reihen und Bits können dynamisch hinzugefügt oder entfernt werden.

| Attribute | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands |

**Beispiel:**
```html
<bit-rows id="bits-demo"></bit-rows>
```

<bit-rows id="wc-bits-demo"></bit-rows>

---

## Card Matching

Ein Zuordnungsspiel, bei dem Karten durch Ziehen miteinander verbunden werden. Die Verbindungen können durch Klicken auf das "Klebeband" wieder gelöst werden.

| Attribute | Type   | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands                          |
| `pairs`   | String | JSON-Array mit Kartenpaaren: `[{"blue": "text:...", "orange": "text:..."}]` |

**Format für `pairs`:**
- Text: `"text:Mein Text"`
- Bild: `"image:/pfad/zum/bild.png"`

**Beispiel:**
```html
<card-matching 
  id="matching-demo" 
  pairs='[
    {"blue": "text:Stein", "orange": "text:Rock"},
    {"blue": "text:Papier", "orange": "text:Paper"},
    {"blue": "image:/img/cat.png", "orange": "text:Katze"}
  ]'>
</card-matching>
```

---

## Category Drag

Drag-and-Drop-Spiel zum Zuordnen von Bildern zu Kategorien. Unterstützt bis zu 4 Kategorien und funktioniert auch auf Touch-Geräten.

| Attribute    | Type   | Description                                                           |
|--------------|--------|-----------------------------------------------------------------------|
| `id`         | String | Eindeutiger Bezeichner zum Speichern des Zustands                    |
| `items`      | String | Kommagetrennte Liste: `"bild1.png:kategorie1,bild2.png:kategorie2"`  |
| `categories` | String | Kategorien: `"id1:Label 1,id2:Label 2"`                               |

**Beispiel:**
```html
<category-drag 
  id="drag-demo"
  items="/img/apple.png:fruit,/img/carrot.png:vegetable"
  categories="fruit:Obst,vegetable:Gemüse">
</category-drag>
```

---

## Coin Rows

Zeigt Münzreihen an, die umgedreht werden können (Gold/Silber). Münzen und Reihen können dynamisch hinzugefügt oder entfernt werden.

| Attribute | Type   | Description                                    |
|-----------|--------|------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands |

**Beispiel:**
```html
<coin-rows id="coins-demo"></coin-rows>
```

<coin-rows id="wc-coins-demo"></coin-rows>

---

## Memory Game

Ein klassisches Memory-Spiel mit anpassbaren Bildern oder Standard-Emojis.

| Attribute | Type   | Description                                                                    |
|-----------|--------|--------------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands                             |
| `pairs`   | Number | Anzahl der Paare (nur für Emoji-Modus, Standard: 8)                           |
| `images`  | String | Kommagetrennte Bildliste: `"/img1.png,/img2.png,..."` (je 2 bilden ein Paar) |

**Beispiel:**
```html
<!-- Mit Emojis (Standard) -->
<memory-game id="memory-emoji" pairs="6"></memory-game>

<!-- Mit eigenen Bildern -->
<memory-game id="memory-custom" images="/img/cat1.png,/img/cat2.png,/img/dog1.png,/img/dog2.png"></memory-game>
```

---

## Pixel Editor

Interaktiver Editor für PBM/PGM/PPM-Bilddateien (Netpbm-Format). Unterstützt P1 (Bitmap), P2 (Graustufen) und P3 (RGB).

| Attribute  | Type   | Description                                             |
|------------|--------|---------------------------------------------------------|
| `id`       | String | Eindeutiger Bezeichner zum Speichern des Zustands      |
| `format`   | String | Bildformat: `"P1"`, `"P2"` oder `"P3"`                  |
| `data`     | String | Initiale Bilddaten im Netpbm-Format                     |
| `readonly` | Flag   | Deaktiviert das Anklicken von Pixeln (nur Anzeige)     |

**Beispiel:**
```html
<pixel-editor id="pixel-p1" format="P1"></pixel-editor>

<pixel-editor id="pixel-preset" data="P1
5 5
0 1 0 1 0
1 0 1 0 1
0 1 0 1 0
1 0 1 0 1
0 1 0 1 0"></pixel-editor>

<!-- Versteckte Header mit --- -->
<pixel-editor id="pixel-hidden" data="P1
5 5
---
0 1 0 1 0
1 0 1 0 1"></pixel-editor>
```

---

## Pixel Magnifier

Vergrößert ein Bild pixelgenau. Nützlich zur Demonstration von Pixelstrukturen.

| Attribute | Type   | Description                        |
|-----------|--------|------------------------------------|
| `src`     | String | Pfad zum zu vergrößernden Bild     |

**Beispiel:**
```html
<pixel-magnifier src="/img/small-icon.png"></pixel-magnifier>
```

---

## Pixel Minifier

Verkleinert ein Bild mit einem Schieberegler von 10% bis 100%.

| Attribute | Type   | Description                        |
|-----------|--------|------------------------------------|
| `src`     | String | Pfad zum zu verkleinernden Bild    |

**Beispiel:**
```html
<pixel-minifier src="/img/large-image.png"></pixel-minifier>
```

---

## Rock Paper Scissors

Schere-Stein-Papier-Brunnen-Spiel gegen den Computer mit optionalem Spielverlauf.

| Attribute       | Type   | Description                                          |
|----------------|--------|------------------------------------------------------|
| `id`           | String | Eindeutiger Bezeichner zum Speichern des Zustands   |
| `spielverlauf` | Flag   | Zeigt Spielverlauf-Panel an, wenn gesetzt           |

**Beispiel:**
```html
<!-- Ohne Spielverlauf -->
<rock-paper-scissors id="rps-simple"></rock-paper-scissors>

<!-- Mit Spielverlauf -->
<rock-paper-scissors id="rps-history" spielverlauf></rock-paper-scissors>
```

<rock-paper-scissors id="wc-rps-demo"></rock-paper-scissors>

---

## KI Punktwolke

Zweidimensionale Punktwolke für die Verfahren des maschinellen Lernens. Im Modus `knn` klassifiziert ein Klick einen Testpunkt und zeigt die k nächsten Nachbarn samt Entscheidungsgrenze; im Modus `kmeans` lässt sich die Clusterbildung Schritt für Schritt verfolgen.

| Attribute     | Type   | Description                                                             |
|---------------|--------|-------------------------------------------------------------------------|
| `id`          | String | Eindeutiger Bezeichner zum Speichern des Zustands                       |
| `modus`       | String | `"knn"` (Standard) oder `"kmeans"`                                      |
| `punkte`      | String | Trainingsdaten: `"x,y,Label;x,y,Label;…"` (Standard: Äpfel und Birnen)   |
| `k`           | Number | Startwert für k (Standard: 3 bzw. 2 bei k-Means)                        |
| `testpunkt`   | String | Vorgesetzter Testpunkt: `"x,y"`                                         |
| `x-label`     | String | Beschriftung der x-Achse (Standard: `"Gewicht (g)"`)                    |
| `y-label`     | String | Beschriftung der y-Achse (Standard: `"Süßigkeit"`)                      |
| `x-min`, `x-max`, `y-min`, `y-max` | Number | Achsenbereich (Standard: automatisch aus den Daten) |
| `hoehe`       | Number | Höhe der Zeichenfläche in Pixeln (Standard: 340)                        |
| `grenze`      | String | `"aus"` blendet die Entscheidungsgrenze anfangs aus                     |
| `normiert`    | Flag   | Startet mit normierten Merkmalen                                        |
| `bearbeitbar` | Flag   | Erlaubt Hinzufügen, Verschieben und Löschen von Trainingspunkten        |

**Beispiel:**
```html
<ki-punktwolke id="knn-demo"></ki-punktwolke>

<ki-punktwolke id="knn-bias" bearbeitbar k="1"></ki-punktwolke>

<ki-punktwolke id="kmeans-demo" modus="kmeans" k="2"></ki-punktwolke>
```

<ki-punktwolke id="wc-knn-demo" bearbeitbar testpunkt="140,6"></ki-punktwolke>

<ki-punktwolke id="wc-kmeans-demo" modus="kmeans" k="2"></ki-punktwolke>

---

## KI Neuron

Zeigt ein einzelnes Neuron oder ein Netz aus drei Schichten. Gewichte, Bias und Eingaben sind einstellbar, die Rechnung lässt sich Schritt für Schritt nachvollziehen. Die Wahrheitstabelle prüft, ob die eingestellten Gewichte eine logische Funktion berechnen.

| Attribute     | Type   | Description                                                        |
|---------------|--------|--------------------------------------------------------------------|
| `modus`       | String | `"neuron"` (Standard) oder `"netz"` (2-3-1 wie im Buch)            |
| `aktivierung` | String | `"sigmoid"` (Standard), `"relu"`, `"stufe"` oder `"keine"` (nur die gewichtete Summe, wie in Lektion 4.1) |
| `gewichte`    | String | Startgewichte des Neurons: `"w1,w2"`                               |
| `bias`        | Number | Start-Bias des Neurons                                             |
| `eingabe`     | String | Startwerte der Eingaben: `"x1,x2"`                                 |
| `ziel`        | String | Zielfunktion für die Wahrheitstabelle: `"und"`, `"oder"`, `"xor"`. Ohne Angabe wird keine Wahrheitstabelle gezeigt. |

**Beispiel:**
```html
<ki-neuron gewichte="4,4" bias="-6" ziel="und"></ki-neuron>

<ki-neuron modus="netz"></ki-neuron>
```

<ki-neuron gewichte="4,4" bias="-6" ziel="und"></ki-neuron>

<ki-neuron modus="netz"></ki-neuron>

---

## KI Bigramm

Tokenisiert einen Korpus, zählt die Bigramme und erzeugt daraus neuen Text. Die Tokenisierung entspricht standardmäßig dem `split(" ")` aus dem Buch — leere Tokens werden sichtbar gemacht.

| Attribute | Type   | Description                                                                    |
|-----------|--------|--------------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern des Zustands                              |
| `korpus`  | String | Trainingstext (Standard: der Katzen-Korpus aus dem Buch)                        |
| `ansicht` | String | Kommaliste aus `"tokens"`, `"tabelle"`, `"erzeugen"` oder `"alle"` (Standard)   |
| `sauber`  | Flag   | Startet mit abgetrennten Satzzeichen und Kleinschreibung                        |

**Beispiel:**
```html
<ki-bigramm id="tokens-demo" ansicht="tokens"></ki-bigramm>

<ki-bigramm id="bigramm-demo" ansicht="tabelle,erzeugen"></ki-bigramm>
```

<ki-bigramm id="wc-bigramm-demo"></ki-bigramm>

---

## KI Konfusionsmatrix

Zeigt den Zusammenhang zwischen Schwellwert, Konfusionsmatrix und den Kennzahlen Präzision, Spezifität, Sensitivität und Trefferquote. Im Modus `eingabe` dient die Komponente als Rechner für eigene Zahlen.

| Attribute      | Type   | Description                                                             |
|----------------|--------|-------------------------------------------------------------------------|
| `modus`        | String | `"schwelle"` (Standard) oder `"eingabe"`                                |
| `daten`        | String | Beispiele als `"bewertung,label;…"` mit Label `1` (positiv) oder `0`    |
| `schwelle`     | Number | Startwert des Schwellwerts zwischen 0 und 1 (Standard: 0,5)             |
| `werte`        | String | Nur im Modus `eingabe`: Startwerte als `"TP,FP,FN,TN"`                  |
| `positiv-name` | String | Name der positiven Klasse (Standard: `"Spam"`)                          |
| `negativ-name` | String | Name der negativen Klasse (Standard: `"kein Spam"`)                     |
| `einheit`      | String | Bezeichnung der Datenpunkte in den Erklärungen (Standard: `"E-Mails"`)  |

**Beispiel:**
```html
<ki-konfusionsmatrix></ki-konfusionsmatrix>

<ki-konfusionsmatrix modus="eingabe" werte="90,10,10,990"
  positiv-name="krank" negativ-name="gesund" einheit="Personen">
</ki-konfusionsmatrix>
```

<ki-konfusionsmatrix></ki-konfusionsmatrix>

<ki-konfusionsmatrix modus="eingabe" werte="90,10,10,990" positiv-name="krank" negativ-name="gesund" einheit="Personen"></ki-konfusionsmatrix>

---

# OOP-Lernpfad

Die folgenden Komponenten gehören zum Lernpfad Objektorientierte Programmierung. Alle Attributnamen sind deutsch, alle Komponenten funktionieren ohne `id` – mit `id` merken sich diejenigen ihren Zustand, bei denen das sinnvoll ist.

---

## OOP Dispatch

Zeigt, wie Java einen Methodenaufruf auflöst: Der Compiler prüft am **statischen** Typ, die Laufzeit sucht ab dem **dynamischen** Typ die Klassenhierarchie nach oben. Jeder Schritt wird einzeln ausgelöst und erklärt.

| Attribute  | Type   | Description                                                                                  |
|------------|--------|----------------------------------------------------------------------------------------------|
| `klassen`  | String | Hierarchie als `"Ober: m1, m2 \| Unter < Ober: m1"`. Ein `*` hinter dem Namen macht die Klasse abstrakt |
| `methode`  | String | Vorausgewählte Methode                                                                        |
| `statisch` | String | Vorausgewählter statischer Typ                                                                |
| `objekt`   | String | Vorausgewählter dynamischer Typ (nur nicht-abstrakte Klassen)                                 |

**Beispiel:**
```html
<oop-dispatch klassen="Fahrzeug: maut, mautSumme | Pkw < Fahrzeug | Lkw < Fahrzeug: maut"
  statisch="Fahrzeug" objekt="Lkw" methode="maut"></oop-dispatch>
```

<oop-dispatch id="wc-dispatch" klassen="Fahrzeug*: mautSumme, fahre | Pkw < Fahrzeug: mautSumme | Lkw < Fahrzeug: mautSumme | Motorrad < Fahrzeug"></oop-dispatch>

---

## OOP Sortierung

Sortierverfahren zum Mitmachen: Die Lernenden wählen das nächste zu vergleichende Paar selbst und entscheiden über den Tausch. Quicksort und Mergesort laufen als Vorführung Schritt für Schritt ab. Vergleiche und Bewegungen werden mitgezählt.

| Attribute   | Type   | Description                                                                        |
|-------------|--------|------------------------------------------------------------------------------------|
| `verfahren` | String | `"bubblesort"` (Standard), `"auswahl"`, `"einfuegen"`, `"quicksort"`, `"mergesort"` |
| `werte`     | String | Startfeld als Kommaliste (Standard: `"5,3,8,1,9,2"`)                               |
| `modus`     | String | `"aktiv"` (Standard) oder `"vorfuehrung"`. Quicksort und Mergesort können nur vorführen |

**Beispiel:**
```html
<oop-sortierung verfahren="bubblesort" werte="5,2,4,1,8"></oop-sortierung>

<oop-sortierung verfahren="quicksort" werte="5,2,8,1,9,3,7"></oop-sortierung>
```

<oop-sortierung id="wc-sortierung" verfahren="bubblesort" werte="5,2,4,1,8"></oop-sortierung>

---

## OOP Suchbaum

Binärer Suchbaum zum Anfassen: einfügen, suchen, löschen. Bei der Suche wird der Weg eingefärbt. Im Modus `avl` zeigt die Komponente Balancefaktoren an und protokolliert jede Rotation.

| Attribute | Type   | Description                                             |
|-----------|--------|---------------------------------------------------------|
| `modus`   | String | `"bst"` (Standard) oder `"avl"`                         |
| `werte`   | String | Startwerte als Kommaliste, in Einfügereihenfolge        |

**Beispiel:**
```html
<oop-suchbaum modus="bst" werte="50,30,70,20,40"></oop-suchbaum>

<oop-suchbaum modus="avl" werte="100,90,80"></oop-suchbaum>
```

<oop-suchbaum id="wc-suchbaum" modus="avl" werte="100,90,80"></oop-suchbaum>

---

## OOP Wachstum

Vergleicht Wachstumsfunktionen als Kurven und als Wertetabelle. Der Regler für n zeigt, dass bei kleinen Eingaben die Vorfaktoren entscheiden und erst bei großen die Wachstumsklasse. Schnittpunkte werden automatisch bestimmt.

| Attribute    | Type   | Description                                                                     |
|--------------|--------|---------------------------------------------------------------------------------|
| `funktionen` | String | Bis zu fünf Terme, getrennt durch `\|`. Erlaubt: `n`, `+ - * / ^`, Klammern, `log2()`, `log()`, `ln()`, `sqrt()` |
| `nmax`       | Number | Obergrenze der x-Achse (Standard: 300)                                          |
| `n`          | Number | Startwert des Reglers                                                           |
| `skala`      | String | `"linear"` (Standard) oder `"log"` für eine logarithmische y-Achse              |

**Beispiel:**
```html
<oop-wachstum funktionen="100*n | n^2/2 | 5*n*log2(n)" nmax="400" n="50"></oop-wachstum>
```

<oop-wachstum id="wc-wachstum" funktionen="100*n | n^2/2 | 5*n*log2(n)" nmax="400" n="50"></oop-wachstum>

---

## OOP Objektkarten

Bauplan und Exemplare nebeneinander: Aus einer Klasse lassen sich mehrere Objekte erzeugen, die alle eigene Attributwerte haben. Methodenaufrufe wirken sichtbar nur auf ein Objekt.

| Attribute   | Type   | Description                                                                        |
|-------------|--------|------------------------------------------------------------------------------------|
| `klasse`    | String | Name der Klasse (Standard: `"Auto"`)                                               |
| `attribute` | String | `"name:Typ:Startwert, …"`. Alles außer `String` wird als Zahl behandelt            |
| `methoden`  | String | Aufträge als `"name(p:int) -> attribut = ausdruck"`, Anfragen als `"name():int = ausdruck"`, getrennt durch `\|` |
| `max`       | Number | Höchstzahl gleichzeitiger Objekte (Standard: 4)                                    |

**Beispiel:**
```html
<oop-objektkarten klasse="Auto" attribute="marke:String:VW, tank:int:20"
  methoden="tanken(menge:int) -> tank = tank + menge | gibTank():int = tank"></oop-objektkarten>
```

<oop-objektkarten id="wc-objektkarten" klasse="Auto" attribute="marke:String:VW, tank:int:20" methoden="tanken(menge:int) -> tank = tank + menge | fahren(km:int) -> tank = tank - km | gibTank():int = tank"></oop-objektkarten>

---

## OOP Kapselung

Dieselben Zugriffe auf ein gekapseltes und auf ein offenes Objekt. Die Komponente unterscheidet drei Ausgänge: Compilerfehler, Abweisung durch die Methode und erlaubte Änderung – und zeigt an, ob die **Invariante** des Objekts noch gilt.

| Attribute          | Type   | Description                                                                 |
|--------------------|--------|-----------------------------------------------------------------------------|
| `klasse`           | String | Name der Klasse (Standard: `"Konto"`)                                       |
| `objekt`           | String | Name der Objektvariablen                                                    |
| `attribut`         | String | `"name:Typ:Startwert"`                                                      |
| `invariante`       | String | Bedingung, etwa `"stand >= 0"`. Erlaubt sind `+ - * /`, Vergleiche, `&&`/`und`, `\|\|`/`oder` |
| `invariante-text`  | String | Erklärung der Invariante in Worten                                          |
| `methoden`         | String | `"name(param): attribut = ausdruck : bedingung"`, Anfragen mit `return`, getrennt durch `\|` |
| `versuche`         | String | Anklickbare Zugriffe, getrennt durch `\|`                                    |

**Beispiel:**
```html
<oop-kapselung klasse="Konto" attribut="stand:int:100" invariante="stand >= 0"
  invariante-text="Der Kontostand darf nie negativ werden."></oop-kapselung>
```

<oop-kapselung id="wc-kapselung" klasse="Konto" attribut="stand:int:100"></oop-kapselung>

---

## OOP Klassendiagramm

Klassendiagramm selbst bauen: Die Klassen sind vorgegeben, die Beziehungen müssen aus dem Quelltext erschlossen werden. Die Kästen lassen sich verschieben. Der Quelltext steht **als Inhalt** im Element.

| Attribute | Type   | Description                                                                              |
|-----------|--------|------------------------------------------------------------------------------------------|
| `id`      | String | Eindeutiger Bezeichner zum Speichern von Beziehungen und Positionen                      |
| `klassen` | String | `"Name: attribut:Typ, … \| Name2: …"`                                                    |
| `loesung` | String | Beziehungen, getrennt durch `;`. Assoziation: `"A -> B : bezeichnung : kardVon : kardNach"`, Vererbung: `"A --\|> B"` |
| `aufgabe` | String | Aufgabentext über dem Diagramm                                                           |

Leere Kardinalitäten in der Lösung werden beim Prüfen nicht verlangt.

**Beispiel:**
```html
<oop-klassendiagramm klassen="Kunde: name:String | Konto: nummer:int"
  loesung="Kunde -> Konto : besitzt : 1 : *">
public class Kunde { private Konto[] konten; }
</oop-klassendiagramm>
```

<oop-klassendiagramm id="wc-klassendiagramm" klassen="Kunde: name:String | Konto: nummer:int | Sparkonto: zins:double" loesung="Kunde -> Konto : besitzt : 1 : * ; Sparkonto --|> Konto">
public class Kunde {
    private String name;
    private Konto[] konten;
}
public class Sparkonto extends Konto {
    private double zins;
}
</oop-klassendiagramm>

---

## OOP Wertetabelle

Ablaufverfolgung von Hand: Die Lernenden füllen die Wertetabelle zu einem Programmstück aus und bekommen zellengenaue Rückmeldung. Der Quelltext steht **als Inhalt** im Element.

| Attribute        | Type   | Description                                                                |
|------------------|--------|----------------------------------------------------------------------------|
| `id`             | String | Eindeutiger Bezeichner zum Speichern der Eingaben                          |
| `spalten`        | String | Spaltenköpfe, getrennt durch `\|`                                          |
| `loesung`        | String | Zeilen getrennt durch `;`, Zellen durch `\|`. Leere Zelle heißt „bleibt leer“ |
| `zeilen`         | String | `"fest"` (Standard) oder `"frei"` – dann bestimmen die Lernenden die Zeilenzahl selbst |
| `aufgabe`        | String | Aufgabentext                                                               |
| `loesung-zeigen` | String | `"ja"` blendet einen Knopf ein, der die Lösung einträgt                     |

Beim Vergleich sind Leerzeichen, Groß-/Kleinschreibung und Komma statt Punkt egal.

**Beispiel:**
```html
<oop-wertetabelle spalten="i | summe" loesung="1|1; 2|3; 3|6">
int summe = 0;
for (int i = 1; i &lt;= 3; i++) { summe = summe + i; }
</oop-wertetabelle>
```

<oop-wertetabelle id="wc-wertetabelle" spalten="i | summe | Ausgabe" loesung="1|1|; 2|3|; 3|6|6">
int summe = 0;
for (int i = 1; i &lt;= 3; i++) {
    summe = summe + i;
}
IO.println(summe);
</oop-wertetabelle>

---

## OOP Wahrheitstabelle

Wahrheitstabelle zum Ausfüllen. Die letzte Spalte zeigt, welche Variablen Java wegen der **verkürzten Auswertung** gar nicht erst ansieht.

| Attribute     | Type   | Description                                                            |
|---------------|--------|------------------------------------------------------------------------|
| `id`          | String | Eindeutiger Bezeichner zum Speichern der Eingaben                      |
| `ausdruck`    | String | Boolescher Ausdruck mit `&&`/`und`, `\|\|`/`oder`, `!`/`nicht`, Klammern |
| `variablen`   | String | Reihenfolge der Spalten; ohne Angabe aus dem Ausdruck abgeleitet       |
| `modus`       | String | `"ausfuellen"` (Standard) oder `"zeigen"`                              |
| `kurzschluss` | String | `"ja"` (Standard) blendet die Spalte zur verkürzten Auswertung ein     |
| `aufgabe`     | String | Aufgabentext                                                           |

**Beispiel:**
```html
<oop-wahrheitstabelle ausdruck="a && (b || !c)"></oop-wahrheitstabelle>

<oop-wahrheitstabelle ausdruck="kino oder joggen" modus="zeigen" kurzschluss="nein"></oop-wahrheitstabelle>
```

<oop-wahrheitstabelle id="wc-wahrheitstabelle" ausdruck="a && (b || !c)"></oop-wahrheitstabelle>

---

## OOP Aufrufbaum

Der Aufrufbaum einer rekursiven Methode. Er zeigt, wie viele Aufrufe entstehen, wie tief der Kellerstapel wird und welche Teilaufrufe mehrfach berechnet werden.

| Attribute   | Type   | Description                                                              |
|-------------|--------|--------------------------------------------------------------------------|
| `verfahren` | String | `"fib"` (Standard), `"fakultaet"`, `"summe"`, `"hanoi"`                  |
| `argument`  | Number | Startwert für n; wird auf den sinnvollen Bereich des Verfahrens begrenzt |
| `mehrfach`  | String | `"nein"` schaltet die Hervorhebung mehrfach berechneter Aufrufe ab       |

**Beispiel:**
```html
<oop-aufrufbaum verfahren="fib" argument="5"></oop-aufrufbaum>
```

<oop-aufrufbaum id="wc-aufrufbaum" verfahren="fib" argument="5"></oop-aufrufbaum>

---

## OOP Stapel und Warteschlange

Stapel und Warteschlange mit den Methodennamen der Abiturklassen (`push`/`pop`/`top` bzw. `enqueue`/`dequeue`/`front`). Ist `folge` gesetzt, entsteht eine Vorhersageaufgabe: erst die erwartete Ausgabe notieren, dann ablaufen lassen.

| Attribute | Type   | Description                                                          |
|-----------|--------|----------------------------------------------------------------------|
| `modus`   | String | `"stapel"` (Standard) oder `"schlange"`                              |
| `inhalt`  | String | Startinhalt als Kommaliste, vom ältesten zum jüngsten Element        |
| `folge`   | String | Operationsfolge für den Vorhersagemodus, getrennt durch `;`          |

**Beispiel:**
```html
<oop-stapel-schlange modus="stapel" folge="push(A); push(B); top(); pop(); isEmpty()"></oop-stapel-schlange>

<oop-stapel-schlange modus="schlange" inhalt="A,B"></oop-stapel-schlange>
```

<oop-stapel-schlange id="wc-stapel" modus="stapel" folge="push(Anna); push(Ben); top(); pop(); push(Cem); top(); isEmpty()"></oop-stapel-schlange>

---

## OOP Testfälle

Testfälle auswählen statt raten. Nach dem Ausführen zeigt die Komponente, welche Tests fehlschlagen, welche Äquivalenzklassen abgedeckt sind und ob Grenzwerte dabei waren. Der Quelltext steht **als Inhalt** im Element.

| Attribute        | Type   | Description                                                                  |
|------------------|--------|------------------------------------------------------------------------------|
| `id`             | String | Eindeutiger Bezeichner zum Speichern der Auswahl                             |
| `faelle`         | String | Fälle getrennt durch `;`, Felder durch `\|`: `eingabe \| erwartet \| tatsächlich \| klasse \| grenzwert` |
| `spezifikation`  | String | Beschreibung der Methode                                                     |
| `aufgabe`        | String | Aufgabentext                                                                 |

Ein Fall deckt den Fehler auf, wenn `erwartet` und `tatsächlich` sich unterscheiden. `grenzwert` ist `ja` oder `nein`.

**Beispiel:**
```html
<oop-testfaelle faelle="5 | true | true | positiv | nein; 0 | false | true | null | ja"
  spezifikation="istPositiv(n) liefert true, wenn n größer als 0 ist."></oop-testfaelle>
```

<oop-testfaelle id="wc-testfaelle" spezifikation="istPositiv(n) liefert true, wenn n größer als 0 ist." faelle="5 | true | true | positiv | nein; 1 | true | true | positiv | ja; 0 | false | true | null | ja; -3 | false | false | negativ | nein"></oop-testfaelle>

---

## OOP Nebenläufigkeit

Zwei Fäden, eine gemeinsame Variable. Die Lernenden verschränken die Schritte selbst und erzeugen die Wettlaufsituation, statt sie erklärt zu bekommen. Ein Schalter sichert den kritischen Abschnitt ab.

| Attribute       | Type   | Description                                                                |
|-----------------|--------|----------------------------------------------------------------------------|
| `variable`      | String | Name der gemeinsamen Variablen (Standard: `"zaehler"`)                     |
| `start`         | Number | Startwert                                                                  |
| `faden-a`       | String | Schritte, getrennt durch `;`: `lies`, `+1`, `-1`, `schreib`, `sperre`, `entsperre` |
| `faden-b`       | String | dito                                                                       |
| `name-a`        | String | Beschriftung des ersten Fadens                                             |
| `name-b`        | String | Beschriftung des zweiten Fadens                                            |
| `ziel`          | Number | Gesuchtes Endergebnis; ohne Angabe wird nur das Ergebnis gemeldet          |
| `schalter-text` | String | Beschriftung des Absicherungsschalters                                     |
| `aufgabe`       | String | Aufgabentext                                                               |

**Beispiel:**
```html
<oop-nebenlaeufig variable="stand" start="0" ziel="1"
  faden-a="lies; +1; schreib" faden-b="lies; +1; schreib"></oop-nebenlaeufig>
```

<oop-nebenlaeufig id="wc-nebenlaeufig" variable="stand" start="0" ziel="1" faden-a="lies; +1; schreib" faden-b="lies; +1; schreib"></oop-nebenlaeufig>
