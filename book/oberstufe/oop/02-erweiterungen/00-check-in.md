---
title: Check-in
index: 0
---

# Check-in: Wo stehst du?

Zwischen den [Grundlagen der Programmierung mit Java](../01-grundlagen) und dieser Seite liegen die Sommerferien. Sechs Wochen ohne Java – das merkt man, und das ist völlig normal. Bevor es mit Polymorphie, Rekursion und dynamischen Datenstrukturen weitergeht, sortierst du deshalb einmal, was noch sitzt.

:::snippet{#merken}
**Der Check-in wird nicht bewertet.** Er ist kein Test, sondern eine Standortbestimmung: Danach weißt du, welche zwei oder drei Seiten aus dem Grundlagen-Lernpfad du noch einmal aufschlagen solltest – und deine Lehrkraft weiß es auch.

Nichts zu können ist hier kein Problem. **Nicht zu wissen, was man nicht kann**, ist eines: Die Erweiterungen bauen ohne Umweg auf den Grundlagen auf. Wer jetzt eine Lücke findet, schließt sie in einer halben Stunde. Wer sie erst im Halbjahr findet, schleppt sie mit.
:::

:::snippet{#brain}
Die Regel aus dem Grundlagen-Lernpfad gilt weiter: **Erst denken, dann Rechner.** In Teil 1 sagst du auf Papier voraus, was passiert, und führst das Programm erst danach aus. Wenn Vorhersage und Ergebnis auseinandergehen, hast du gerade die wichtigste Information des ganzen Check-ins bekommen.
:::

## So gehst du vor

1. **Teil 1 – Lesen** (drei Aufgaben, auf Papier). Programme verstehen, ohne sie laufen zu lassen.
2. **Teil 2 – Schreiben** (drei Aufgaben, in der Online-IDE). Für jede Aufgabe liegen Tests bereit: Über den Reiter *Testrunner* siehst du selbst, ob deine Lösung stimmt.
3. **Teil 3 – Auswerten.** Du trägst ein, was geklappt hat, und findest die Seite, auf der das Fehlende steht.
4. **Selbsttest** am Ende – zehn kurze Fragen quer durch alles.

Die Lösungen stehen unter einem Passwort. Sieh dort erst nach, wenn du die Aufgabe wirklich versucht hast – sonst misst der Check-in nichts.

<!--
Fuer Lehrkraefte: Diese Seite ist als Diagnose zu Beginn der Qualifikationsphase
gedacht, nach den Sommerferien und vor Kapitel 1. Sie prueft ausschliesslich
Inhalte des EF-Lernpfads; nichts davon ist neu. Zeitbedarf: eine Doppelstunde,
Teil 1 in Einzelarbeit auf Papier, Teil 2 am Rechner.

Drei Aufgaben enthalten bewusst einen Brueckenpunkt zum kommenden Kapitel
(Aufgabe 3b und 3d, Aufgabe 6, letzter Test): Dort verhaelt sich geerbter Code
polymorph, ohne dass der Begriff schon gefallen waere. Die Loesungen benennen
das und verweisen auf 1.2 Polymorphie - so hat der Check-in nicht nur eine
Rueckschau, sondern auch einen Anknuepfungspunkt.

Die Auswertungstabelle in Teil 3 ist so gebaut, dass jede Zeile auf genau eine
Seite des EF-Lernpfads zeigt. Wer eine Zeile nicht ankreuzen kann, hat damit
einen konkreten Arbeitsauftrag und keine diffuse Luecke.
-->

---

## Teil 1: Lesen

### Aufgabe 1: Was gibt das Programm aus?

:::snippet{#aufgabe}
**Ohne Rechner.** Führ eine Tabelle mit den Spalten `zahl` und `summe` und trag für jeden Schleifendurchlauf ein, welche Werte darin stehen.

```java
void main() {
    int zahl = 2708;
    int summe = 0;

    while (zahl > 0) {
        summe = summe + zahl % 10;
        zahl = zahl / 10;
    }

    IO.println(summe);
}
```

a) Was gibt das Programm aus?

b) Was berechnet es allgemein – also für eine beliebige positive Zahl?

c) Was passiert, wenn `zahl` zu Beginn den Wert `0` hat?

d) Jemand vertauscht die beiden Zeilen im Schleifenrumpf. Was wird dann ausgegeben? Sag es voraus, **bevor** du es ausprobierst.
:::

::::collapsible{title="Tipp: die beiden Rechenzeichen"}

`zahl % 10` liefert den Rest bei der Division durch 10 – also die **letzte Ziffer**. `zahl / 10` ist eine Ganzzahldivision: Sie schneidet die letzte Ziffer **ab**. Zusammen ergeben die beiden Zeilen ein Verfahren, das eine Zahl Ziffer für Ziffer abbaut.

::::

:::onlineide{height="420px" speed="1000000"}

```java Main.java
void main() {
    int zahl = 2708;
    int summe = 0;

    while (zahl > 0) {
        summe = summe + zahl % 10;
        zahl = zahl / 10;
    }

    IO.println(summe);
}
```

:::

:::protect{password="java-q-0-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ausgegeben wird **17**.

| Durchlauf | `zahl` vorher | `zahl % 10` | `summe` danach | `zahl` danach |
| --- | --- | --- | --- | --- |
| 1 | 2708 | 8 | 8 | 270 |
| 2 | 270 | 0 | 8 | 27 |
| 3 | 27 | 7 | 15 | 2 |
| 4 | 2 | 2 | 17 | 0 |

Danach ist `zahl > 0` falsch, die Schleife endet.

b) Es berechnet die **Quersumme**: 2 + 7 + 0 + 8 = 17.

c) Der Rumpf wird **kein einziges Mal** ausgeführt, denn `0 > 0` ist von Anfang an falsch. Ausgegeben wird die 0, mit der `summe` initialisiert wurde. Das ist die typische Eigenschaft einer kopfgesteuerten Schleife: Sie kann null Durchläufe haben. Eine fußgesteuerte `do-while`-Schleife würde hier eine 0 addieren und ebenfalls 0 ausgeben – aus einem anderen Grund.

d) Vertauscht lautet der Rumpf:

```java
zahl = zahl / 10;
summe = summe + zahl % 10;
```

Dann wird zuerst abgeschnitten und **danach** die letzte Ziffer geholt – die 8 kommt nie vor:

| Durchlauf | `zahl` danach | addiert | `summe` |
| --- | --- | --- | --- |
| 1 | 270 | 0 | 0 |
| 2 | 27 | 7 | 7 |
| 3 | 2 | 2 | 9 |
| 4 | 0 | 0 | 9 |

Ausgegeben wird **9**. Bei zwei Anweisungen, die dieselbe Variable benutzen, entscheidet die Reihenfolge über das Ergebnis – hier verschiebt sie die ganze Rechnung um eine Ziffer.

:::

### Aufgabe 2: Vier Ausschnitte, vier Fehler

:::snippet{#aufgabe}
In jedem Ausschnitt steckt genau ein Fehler. Beschreibe für jeden: **Was ist falsch, was passiert dadurch, und wie berichtigst du es?**

```java
// a)
String eingabe = IO.readln("Passwort: ");
if (eingabe == "geheim") {
    IO.println("Willkommen!");
}

// b)
int[] werte = {3, 7, 2, 9};
for (int i = 0; i <= werte.length; i++) {
    IO.println(werte[i]);
}

// c)
int mittelwert(int[] pWerte) {
    int summe = 0;
    for (int wert : pWerte) {
        summe = summe + wert;
    }
}

// d)
int rest = 10;
while (rest > 0) {
    IO.println("Noch " + rest);
    rest = rest + 1;
}
```

Und die eigentliche Frage: **Welche der vier Fehler meldet die IDE – und wann?** Sortiere sie in drei Gruppen: beim Übersetzen, beim Ausführen, gar nicht.
:::

:::protect{password="java-q-0-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `==` vergleicht bei Objekten nicht den Inhalt, sondern ob es **dasselbe Objekt** ist. Die eingelesene Zeichenkette ist ein neues Objekt, also ist der Vergleich falsch – auch wenn „geheim" eingetippt wurde. Berichtigung:

```java
if (eingabe.equals("geheim")) {
```

Merke: Zeichenketten **immer** mit `equals` vergleichen. Der Fehler ist besonders tückisch, weil `==` bei zwei direkt hingeschriebenen Literalen zufällig doch stimmen kann – nur bei einer Eingabe eben nicht.

b) Der **Zaunpfahlfehler**. Ein Feld mit 4 Plätzen hat die Indizes 0 bis 3. `i <= werte.length` läuft bis einschließlich 4, und `werte[4]` gibt es nicht. Berichtigung: `i < werte.length`.

c) Die Methode hat den Rückgabetyp `int`, aber **keine `return`-Anweisung**. Berichtigung:

```java
return summe / pWerte.length;
```

Zwei Fallen stecken noch darin: Die Division ist eine **Ganzzahldivision** – für einen echten Mittelwert braucht es `(double) summe / pWerte.length`. Und bei einem leeren Feld wird durch 0 geteilt.

d) **Endlosschleife.** `rest` wird größer statt kleiner, die Bedingung `rest > 0` bleibt für immer wahr. Berichtigung: `rest = rest - 1;`.

Die Sortierung:

| Wann | Ausschnitt |
| --- | --- |
| beim Übersetzen | c) – die fehlende Rückgabe ist ein Syntax- bzw. Typfehler |
| beim Ausführen | b) – der Zugriff auf `werte[4]` bricht das Programm ab |
| gar nicht | a) und d) – beide laufen fehlerfrei und tun das Falsche |

Das ist die eigentliche Lehre: Die Hälfte der Fehler bemerkt die IDE nicht. Ein Programm, das startet, ist noch lange nicht richtig – dafür gibt es Tests.

:::

### Aufgabe 3: Objekte und Vererbung lesen

:::snippet{#aufgabe}
**Ohne Rechner.** Lies die vier Dateien und beantworte:

a) Was gibt das Programm aus? Schreib die drei Zeilen auf.

b) Die Methode `stelleVor` steht **nur** in `Tier`. Warum erscheint bei Bello trotzdem „Wuff"?

c) Warum kann `Hund` nicht einfach `this.name` schreiben?

d) Was bewirkt `super(pName)` – und was passiert, wenn man die Zeile streicht?

Führ das Programm erst danach aus.
:::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    Tier[] tiere = { new Tier("Rex"), new Hund("Bello"), new Katze("Minka") };

    for (Tier t : tiere) {
        t.stelleVor();
    }
}
```

```java Tier.java
public class Tier {

    private String name;

    public Tier(String pName) {
        this.name = pName;
    }

    public String getName() {
        return this.name;
    }

    public String laut() {
        return "irgendetwas";
    }

    public void stelleVor() {
        IO.println(this.getName() + " macht " + this.laut());
    }
}
```

```java Hund.java
public class Hund extends Tier {

    public Hund(String pName) {
        super(pName);
    }

    public String laut() {
        return "Wuff";
    }
}
```

```java Katze.java
public class Katze extends Tier {

    public Katze(String pName) {
        super(pName);
    }

    public String laut() {
        return "Miau";
    }

    public void stelleVor() {
        IO.println(this.getName() + " sagt lieber nichts.");
    }
}
```

:::

::::collapsible{title="Tipp zu b)"}

`stelleVor` ruft `this.laut()` auf. Die Frage ist nicht, in welcher **Klasse die Methode steht**, sondern welches **Objekt** hinter `this` steckt.

::::

:::protect{password="java-q-0-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```
Rex macht irgendetwas
Bello macht Wuff
Minka sagt lieber nichts.
```

b) `stelleVor` wird von `Hund` geerbt und ruft `this.laut()` auf. `this` ist das **Hund-Objekt** – und dort ist `laut` überschrieben. Java entscheidet erst zur Laufzeit, welche Methode genommen wird, und zwar anhand des Objekts, nicht anhand der Klasse, in der der Aufruf steht.

Genau das heißt **Polymorphie**, und genau deshalb steht im Hauptprogramm ein `Tier[]`, in dem auch Hunde und Katzen liegen: Der Aufruf sieht überall gleich aus, das Verhalten ist verschieden. Du hast das in [Vererbung](../01-grundlagen/06-objektorientierung/04-vererbung) schon benutzt – der Begriff dafür kommt in [1.2 Polymorphie](./01-vertiefte-objektorientierung/02-polymorphie).

c) `name` ist `private`. Das gilt auch gegenüber Unterklassen: `private` heißt „nur innerhalb **dieser** Klasse". `Hund` kommt an den Namen nur über die öffentliche Methode `getName()`. Das ist das **Geheimnisprinzip** – die Klasse `Tier` behält die Hoheit darüber, wie der Name gespeichert wird.

d) `super(pName)` ruft den **Konstruktor der Oberklasse** auf und lässt ihn das Attribut `name` setzen. Streicht man die Zeile, versucht Java automatisch `super()` – einen parameterlosen Konstruktor also, den `Tier` nicht hat. Ergebnis: ein **Übersetzungsfehler**. Der Aufruf muss außerdem die **erste** Anweisung im Konstruktor sein.

:::

---

## Teil 2: Schreiben

Ab hier arbeitest du am Rechner. Jede Aufgabe bringt Tests mit: Schreib deine Lösung, öffne den Reiter **Testrunner** und starte ihn. Die Meldung neben einem roten Test sagt dir, was erwartet wurde.

### Aufgabe 4: Zahlenspiele

:::snippet{#aufgabe}
Ergänze die drei Methoden in `Zahlenspiele`, bis alle Tests grün sind. Die Kommentare über den Methoden sagen genau, was sie leisten sollen – auch für die Sonderfälle.
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Zahlenspiele.java
public class Zahlenspiele {

    /** Liefert die Quersumme von pZahl. Für 0 ist sie 0. */
    public int quersumme(int pZahl) {
        return 0; // ersetze diese Zeile
    }

    /**
     * Liefert true, wenn pZahl eine Primzahl ist.
     * Zahlen kleiner als 2 sind keine Primzahlen.
     */
    public boolean istPrimzahl(int pZahl) {
        return false; // ersetze diese Zeile
    }

    /**
     * Liefert eine Treppe aus Sternen mit pHoehe Zeilen.
     * Für 3 also die Zeichenkette "*\n**\n***\n" - jede Zeile
     * endet mit einem Zeilenumbruch, auch die letzte.
     */
    public String treppe(int pHoehe) {
        return ""; // ersetze diese Zeile
    }
}
```

```java ZahlenspieleTest.java
@Test
class ZahlenspieleTest {

    @Test
    void testQuersumme() {
        Zahlenspiele z = new Zahlenspiele();
        assertEquals(17, z.quersumme(2708), "Die Quersumme von 2708 ist 2+7+0+8 = 17.");
        assertEquals(9, z.quersumme(9), "Eine einstellige Zahl ist ihre eigene Quersumme.");
        assertEquals(1, z.quersumme(1000), "Bei 1000 zählen die Nullen nichts.");
        assertEquals(0, z.quersumme(0), "Die Quersumme von 0 ist 0.");
    }

    @Test
    void testIstPrimzahl() {
        Zahlenspiele z = new Zahlenspiele();
        assertTrue(z.istPrimzahl(2), "2 ist die kleinste Primzahl.");
        assertTrue(z.istPrimzahl(97), "97 ist eine Primzahl.");
        assertFalse(z.istPrimzahl(91), "91 ist 7 mal 13, also keine Primzahl.");
        assertFalse(z.istPrimzahl(1), "1 ist keine Primzahl.");
        assertFalse(z.istPrimzahl(0), "0 ist keine Primzahl.");
    }

    @Test
    void testTreppe() {
        Zahlenspiele z = new Zahlenspiele();
        assertEquals("*\n**\n***\n", z.treppe(3), "Drei Zeilen mit 1, 2 und 3 Sternen.");
        assertEquals("*\n", z.treppe(1), "Eine Zeile mit einem Stern.");
        assertEquals("", z.treppe(0), "Die Höhe 0 ergibt die leere Zeichenkette.");
    }
}
```

:::

::::collapsible{title="Tipp 1: quersumme"}

Das Verfahren steht in Aufgabe 1. Lass die übergebene Zahl unangetastet und arbeite mit einer eigenen Variablen:

```java
int rest = pZahl;
```

::::

::::collapsible{title="Tipp 2: istPrimzahl"}

Fang die Zahlen unter 2 mit einem eigenen `if` ab und gib sofort `false` zurück. Danach probierst du in einer Zählschleife alle Teiler von 2 bis `pZahl - 1` durch. Findest du einen, der `pZahl % teiler == 0` erfüllt, kannst du sofort `return false;` schreiben – der Rest der Schleife bringt nichts mehr. Erst **nach** der Schleife steht `return true;`.

::::

::::collapsible{title="Tipp 3: treppe"}

Zwei verschachtelte Schleifen: Die äußere zählt die Zeilen von 1 bis `pHoehe`, die innere hängt so viele Sterne an, wie die Zeilennummer angibt. Nach der inneren Schleife kommt der Umbruch:

```java
ergebnis = ergebnis + "\n";
```

::::

:::protect{password="java-q-0-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Zahlenspiele.java
public class Zahlenspiele {

    public int quersumme(int pZahl) {
        int rest = pZahl;
        int summe = 0;
        while (rest > 0) {
            summe = summe + rest % 10;
            rest = rest / 10;
        }
        return summe;
    }

    public boolean istPrimzahl(int pZahl) {
        if (pZahl < 2) {
            return false;
        }
        for (int teiler = 2; teiler < pZahl; teiler++) {
            if (pZahl % teiler == 0) {
                return false;
            }
        }
        return true;
    }

    public String treppe(int pHoehe) {
        String ergebnis = "";
        for (int zeile = 1; zeile <= pHoehe; zeile++) {
            for (int i = 0; i < zeile; i++) {
                ergebnis = ergebnis + "*";
            }
            ergebnis = ergebnis + "\n";
        }
        return ergebnis;
    }
}
```

Drei Dinge, auf die es hier ankam:

- Bei `treppe(0)` läuft die äußere Schleife **null**-mal. Wer die Startbedingung richtig hinschreibt, bekommt den Sonderfall geschenkt – man muss ihn nicht extra abfangen. Das ist der Normalfall bei Schleifen: Sonderfälle löst man am besten dadurch, dass man sie gar nicht erst zum Sonderfall macht.
- `return false;` mitten in der Schleife bricht die Methode sofort ab. Das ist kein schlechter Stil, sondern spart alle weiteren Teiler.
- Wer bis `pZahl` statt bis `pZahl - 1` prüft, bekommt für **jede** Zahl `false` – denn jede Zahl teilt sich selbst.

Zum Weiterdenken: Es genügt, bis zur Wurzel von `pZahl` zu prüfen, denn ein Teiler oberhalb der Wurzel hat immer einen Partner darunter. Warum das die Zahl der Operationen drastisch senkt, ist Thema von [7.2 Laufzeit und Komplexität](./07-testen-und-laufzeit/02-laufzeit-und-komplexitaet).

:::

### Aufgabe 5: Statistik über einem Feld

:::snippet{#aufgabe}
Ergänze die vier Methoden der Klasse `Statistik`, bis alle Tests grün sind.

Bei `mittelwert` lohnt sich ein zweiter Blick auf den Rückgabetyp.
:::

:::onlineide{height="700px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Statistik.java
public class Statistik {

    /** Liefert die Summe aller Werte. Für ein leeres Feld 0. */
    public int summe(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert den größten Wert. Das Feld ist garantiert nicht leer. */
    public int maximum(int[] pWerte) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert die Anzahl der Werte, die größer als pGrenze sind. */
    public int anzahlUeber(int[] pWerte, int pGrenze) {
        return 0; // ersetze diese Zeile
    }

    /** Liefert den Mittelwert. Das Feld ist garantiert nicht leer. */
    public double mittelwert(int[] pWerte) {
        return 0.0; // ersetze diese Zeile
    }
}
```

```java StatistikTest.java
@Test
class StatistikTest {

    @Test
    void testSumme() {
        Statistik s = new Statistik();
        assertEquals(24, s.summe(new int[]{3, 7, 2, 12}), "3+7+2+12 sind 24.");
        assertEquals(-1, s.summe(new int[]{-4, 3}), "Auch negative Werte zählen mit.");
        assertEquals(0, s.summe(new int[]{}), "Die Summe eines leeren Feldes ist 0.");
    }

    @Test
    void testMaximum() {
        Statistik s = new Statistik();
        assertEquals(12, s.maximum(new int[]{3, 7, 2, 12}), "Das Maximum steht hier am Ende.");
        assertEquals(12, s.maximum(new int[]{12, 7, 2, 3}), "Das Maximum steht hier am Anfang.");
        assertEquals(-2, s.maximum(new int[]{-9, -2, -7}), "Auch bei lauter negativen Werten gibt es ein Maximum.");
        assertEquals(5, s.maximum(new int[]{5}), "Bei einem einzigen Wert ist dieser das Maximum.");
    }

    @Test
    void testAnzahlUeber() {
        Statistik s = new Statistik();
        assertEquals(2, s.anzahlUeber(new int[]{3, 7, 2, 12}, 5), "Über 5 liegen 7 und 12.");
        assertEquals(0, s.anzahlUeber(new int[]{3, 7, 2, 12}, 100), "Über 100 liegt keiner.");
        assertEquals(0, s.anzahlUeber(new int[]{5, 5, 5}, 5), "Größer als 5 ist die 5 selbst nicht.");
    }

    @Test
    void testMittelwert() {
        Statistik s = new Statistik();
        assertEquals(6.0, s.mittelwert(new int[]{3, 7, 2, 12}), "24 geteilt durch 4 ergibt 6.");
        assertEquals(1.5, s.mittelwert(new int[]{1, 2}), "1 und 2 haben den Mittelwert 1,5.");
        assertEquals(-1.0, s.mittelwert(new int[]{-3, 1}), "Auch negative Mittelwerte kommen vor.");
    }
}
```

:::

::::collapsible{title="Tipp 1: maximum"}

Der beliebteste Fehler ist, mit `int groesstes = 0;` zu starten. Bei lauter negativen Werten kommt dann 0 heraus – ein Wert, der im Feld gar nicht vorkommt. Nimm stattdessen den **ersten Wert des Feldes** als Startwert und vergleiche ab Index 1.

::::

::::collapsible{title="Tipp 2: mittelwert"}

`summe(pWerte) / pWerte.length` sind zwei `int`-Werte – Java rechnet dann eine **Ganzzahldivision** und wirft den Rest weg. Aus 3 geteilt durch 2 wird 1, nicht 1,5. Eine der beiden Zahlen muss vorher zur Kommazahl werden:

```java
(double) summe(pWerte) / pWerte.length
```

::::

:::protect{password="java-q-0-5" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Statistik.java
public class Statistik {

    public int summe(int[] pWerte) {
        int summe = 0;
        for (int wert : pWerte) {
            summe = summe + wert;
        }
        return summe;
    }

    public int maximum(int[] pWerte) {
        int groesstes = pWerte[0];
        for (int i = 1; i < pWerte.length; i++) {
            if (pWerte[i] > groesstes) {
                groesstes = pWerte[i];
            }
        }
        return groesstes;
    }

    public int anzahlUeber(int[] pWerte, int pGrenze) {
        int anzahl = 0;
        for (int wert : pWerte) {
            if (wert > pGrenze) {
                anzahl++;
            }
        }
        return anzahl;
    }

    public double mittelwert(int[] pWerte) {
        return (double) this.summe(pWerte) / pWerte.length;
    }
}
```

Worauf es ankam:

- **Die erweiterte for-Schleife** genügt bei `summe` und `anzahlUeber`: Dort braucht man nur die Werte. Bei `maximum` will man ab Index 1 beginnen – da geht sie nicht, weil sie keinen Index kennt. Genau daran erkennt man, welche der beiden Schleifen passt.
- **Der Startwert bei `maximum`** muss aus dem Feld kommen, nicht aus der Luft.
- **Die Typumwandlung bei `mittelwert`.** Ohne sie ist der Test mit `{1, 2}` rot: Es käme 1.0 statt 1.5 heraus. Der Test mit `{3, 7, 2, 12}` wäre trotzdem grün – 24 geht glatt durch 4. Ein Testfall, der nur den glatten Fall prüft, hätte den Fehler durchgelassen. Wie man Testfälle so wählt, dass so etwas auffällt, ist Thema von [7.1 Systematisch testen](./07-testen-und-laufzeit/01-systematisch-testen).
- `mittelwert` ruft `this.summe(...)` auf, statt die Schleife ein zweites Mal hinzuschreiben. Das ist **Modularisierung**: Was einmal richtig ist, bleibt an einer Stelle.

:::

### Aufgabe 6: Eine Klasse und eine Unterklasse

:::snippet{#aufgabe}
`Spielstand` merkt sich, wie viele Punkte jemand gesammelt hat. `Profistand` ist ein Spielstand, bei dem jeder Punkt doppelt zählt.

Ergänze beide Klassen, bis alle Tests grün sind. Denk an das Geheimnisprinzip: Die Attribute sind `private`, und `Profistand` kommt nur über die öffentlichen Methoden an sie heran.

Der Konstruktor von `Profistand` ist schon fertig – er besteht aus einer einzigen Zeile. Beantworte nebenbei: **Warum steht dort keine Zuweisung, und warum ist das kein Versehen?**
:::

:::onlineide{height="760px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Spielstand.java
public class Spielstand {

    // ergänze hier die Attribute

    /** Legt einen Spielstand für pName mit 0 Punkten an. */
    public Spielstand(String pName) {
        // ergänze diesen Konstruktor
    }

    public String getName() {
        return ""; // ersetze diese Zeile
    }

    public int getPunkte() {
        return 0; // ersetze diese Zeile
    }

    /** Zählt pAnzahl Punkte dazu. Negative Werte werden ignoriert. */
    public void punkteDazu(int pAnzahl) {
        // ergänze diese Methode
    }

    /** Zieht pAnzahl Punkte ab, aber nie unter 0. */
    public void punkteWeg(int pAnzahl) {
        // ergänze diese Methode
    }
}
```

```java Profistand.java
public class Profistand extends Spielstand {

    public Profistand(String pName) {
        super(pName);
    }

    /** Im Profimodus zählt jeder Punkt doppelt. */
    public void punkteDazu(int pAnzahl) {
        // ergänze diese Methode
    }
}
```

```java SpielstandTest.java
@Test
class SpielstandTest {

    @Test
    void testNeuerStand() {
        Spielstand s = new Spielstand("Alex");
        assertEquals("Alex", s.getName(), "Der Name kommt aus dem Konstruktor.");
        assertEquals(0, s.getPunkte(), "Ein neuer Spielstand beginnt bei 0 Punkten.");
    }

    @Test
    void testPunkteDazu() {
        Spielstand s = new Spielstand("Alex");
        s.punkteDazu(30);
        s.punkteDazu(12);
        assertEquals(42, s.getPunkte(), "30 und 12 ergeben 42 Punkte.");
        s.punkteDazu(-5);
        assertEquals(42, s.getPunkte(), "Negative Werte werden ignoriert.");
    }

    @Test
    void testPunkteWeg() {
        Spielstand s = new Spielstand("Alex");
        s.punkteDazu(50);
        s.punkteWeg(20);
        assertEquals(30, s.getPunkte(), "Von 50 bleiben nach 20 noch 30 übrig.");
        s.punkteWeg(100);
        assertEquals(0, s.getPunkte(), "Der Punktestand fällt nie unter 0.");
    }

    @Test
    void testProfistand() {
        Profistand p = new Profistand("Kim");
        assertEquals("Kim", p.getName(), "Den Namen erbt Profistand von Spielstand.");
        p.punkteDazu(15);
        assertEquals(30, p.getPunkte(), "Im Profimodus zählen 15 Punkte doppelt.");
        p.punkteWeg(10);
        assertEquals(20, p.getPunkte(), "punkteWeg wird unverändert geerbt.");
    }

    @Test
    void testAlleGleichBehandeln() {
        Spielstand[] staende = { new Spielstand("Alex"), new Profistand("Kim") };
        for (Spielstand s : staende) {
            s.punkteDazu(10);
        }
        assertEquals(10, staende[0].getPunkte(), "Der normale Stand bekommt 10 Punkte.");
        assertEquals(20, staende[1].getPunkte(), "Der Profistand bekommt 20 - obwohl er hier als Spielstand angesprochen wird.");
    }
}
```

:::

::::collapsible{title="Tipp 1: nie unter 0"}

Zwei Wege führen zum Ziel. Entweder du prüfst vorher, ob genug Punkte da sind, oder du ziehst ab und korrigierst danach nach oben:

```java
if (this.punkte < 0) {
    this.punkte = 0;
}
```

::::

::::collapsible{title="Tipp 2: Profistand"}

Der fertige Konstruktor reicht den Namen an die Oberklasse weiter – dort steht das Attribut. Und `punkteDazu` muss das Zählen nicht neu schreiben: Es kann die geerbte Fassung mit dem doppelten Wert aufrufen.

```java
super.punkteDazu(...);
```

::::

:::protect{password="java-q-0-6" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Spielstand.java
public class Spielstand {

    private String name;
    private int punkte;

    public Spielstand(String pName) {
        this.name = pName;
        this.punkte = 0;
    }

    public String getName() {
        return this.name;
    }

    public int getPunkte() {
        return this.punkte;
    }

    public void punkteDazu(int pAnzahl) {
        if (pAnzahl > 0) {
            this.punkte = this.punkte + pAnzahl;
        }
    }

    public void punkteWeg(int pAnzahl) {
        this.punkte = this.punkte - pAnzahl;
        if (this.punkte < 0) {
            this.punkte = 0;
        }
    }
}
```

```java Profistand.java
public class Profistand extends Spielstand {

    public Profistand(String pName) {
        super(pName);
    }

    public void punkteDazu(int pAnzahl) {
        super.punkteDazu(pAnzahl * 2);
    }
}
```

Vier Punkte:

- **Die Attribute stehen nur in `Spielstand`.** `Profistand` deklariert kein eigenes `punkte` – täte es das, gäbe es zwei Punktestände, und `getPunkte()` läse den falschen. Das ist der häufigste Fehler bei Vererbung.
- **`super(pName)` als erste Anweisung** im Konstruktor – und sonst nichts. Das war die Nebenfrage: Eine Zuweisung wäre gar nicht möglich, weil `name` `private` ist und `Profistand` nicht hineinschreiben darf. Der Konstruktor der Oberklasse ist der einzige Weg, und er erledigt bereits alles. Ohne die Zeile sucht Java einen parameterlosen Konstruktor in `Spielstand`, findet keinen und meldet einen Übersetzungsfehler.
- **`super.punkteDazu(pAnzahl * 2)`** statt einer eigenen Rechnung. Die Regel „negative Werte werden ignoriert" gilt damit automatisch weiter – bei −5 wird `super.punkteDazu(-10)` aufgerufen und dort verworfen. Wer die Regel in `Profistand` noch einmal hinschreibt, hat sie an zwei Stellen zu pflegen.
- **`punkteWeg` fehlt in `Profistand` mit Absicht.** Was nicht überschrieben wird, wird geerbt.

Der letzte Test ist der interessante: Im `Spielstand[]` liegen beide Objekte, und beide werden über eine `Spielstand`-Variable angesprochen. Trotzdem bekommt Kim 20 Punkte. Der Typ der Variablen entscheidet, was man **aufrufen darf**; das Objekt entscheidet, **was passiert**. Damit stehst du mit einem Fuß schon in [1.2 Polymorphie](./01-vertiefte-objektorientierung/02-polymorphie).

:::

---

## Teil 3: Wo stehe ich?

Geh die Tabelle Zeile für Zeile durch und kreuze ehrlich an. Für jede Zeile, die du **nicht** ankreuzen kannst, steht rechts die Seite, auf der es steht – ein bis zwei davon aufzuarbeiten, ist ein realistisches Programm für diese Woche.

| | Das kann ich | Wenn nicht: hier steht es |
| --- | --- | --- |
| ☐ | Ich kann ein Programm auf Papier Schritt für Schritt verfolgen. | [1.4 Rückblick](../01-grundlagen/01-erste-schritte/04-rueckblick) |
| ☐ | Ich kenne den Unterschied zwischen Ganzzahldivision und Kommadivision und weiß, wozu Modulo gut ist. | [1.2 Rechnen](../01-grundlagen/01-erste-schritte/02-rechnen) |
| ☐ | Ich wähle den passenden Datentyp und weiß, was eine Typumwandlung bewirkt. | [2.2 Datentypen](../01-grundlagen/02-variablen-und-datentypen/02-datentypen) |
| ☐ | Ich vergleiche Zeichenketten immer mit `equals`. | [2.4 Zeichenketten](../01-grundlagen/02-variablen-und-datentypen/04-zeichenketten) |
| ☐ | Ich schreibe Verzweigungen und logische Ausdrücke sicher. | [3.1 Verzweigungen](../01-grundlagen/03-kontrollstrukturen/01-verzweigungen) |
| ☐ | Ich wähle zwischen `while` und `for` und erkenne eine drohende Endlosschleife. | [3.4 Zählschleifen](../01-grundlagen/03-kontrollstrukturen/04-zaehlschleifen) |
| ☐ | Ich kann verschachtelte Schleifen lesen und schreiben. | [3.6 Verschachtelte Schleifen](../01-grundlagen/03-kontrollstrukturen/06-verschachtelte-schleifen) |
| ☐ | Ich schreibe Methoden mit Parametern und Rückgabewert. | [4.2 Rückgabewerte](../01-grundlagen/04-methoden-und-modularisierung/02-rueckgabewerte) |
| ☐ | Ich zerlege ein Problem in Methoden, statt alles in eine zu schreiben. | [4.3 Modularisierung](../01-grundlagen/04-methoden-und-modularisierung/03-modularisierung) |
| ☐ | Ich durchlaufe ein Feld richtig und kenne den Zaunpfahlfehler. | [5.2 Felder durchlaufen](../01-grundlagen/05-felder/02-felder-durchlaufen) |
| ☐ | Ich bestimme Summe, Maximum und Anzahl in einem Durchlauf. | [5.3 Felder verändern](../01-grundlagen/05-felder/03-felder-veraendern) |
| ☐ | Ich schreibe eine Klasse mit Attributen, Konstruktor und Methoden. | [6.1 Klassen und Objekte](../01-grundlagen/06-objektorientierung/01-klassen-und-objekte) |
| ☐ | Ich kann erklären, warum Attribute `private` sind. | [6.2 Geheimnisprinzip](../01-grundlagen/06-objektorientierung/02-geheimnisprinzip) |
| ☐ | Ich bilde mit `extends` eine Unterklasse, rufe `super(...)` auf und überschreibe eine Methode. | [6.4 Vererbung](../01-grundlagen/06-objektorientierung/04-vererbung) |
| ☐ | Ich kann die lineare Suche und ein Sortierverfahren erklären und umsetzen. | [7.2 Lineare Suche](../01-grundlagen/07-algorithmen-suchen-und-sortieren/02-lineare-suche) |

:::snippet{#merken}
**Zwei Dinge zum Mitnehmen, egal wie es gelaufen ist.**

Die Hälfte der Fehler in Aufgabe 2 meldet die IDE **nicht**. Ein Programm, das startet, ist nicht dasselbe wie ein Programm, das stimmt – deshalb liegen in diesem Lernpfad bei fast jeder Aufgabe Tests dabei.

Und in Aufgabe 3 und 6 hast du schon gesehen, worum es gleich in Kapitel 1 geht: Ein geerbtes Verfahren ruft die **überschriebene** Methode auf, und derselbe Aufruf tut bei verschiedenen Objekten Verschiedenes. Das hat einen Namen, und den lernst du in [1.2 Polymorphie](./01-vertiefte-objektorientierung/02-polymorphie).
:::

Wenn du magst, kannst du direkt weitermachen: [1. Vertiefte Objektorientierung](./01-vertiefte-objektorientierung).

---

## Selbsttest

::::multievent

**1. Was ergibt 17 geteilt durch 5, wenn beide Zahlen vom Typ int sind?**

{z{3}}

{h{Java wirft bei zwei ganzen Zahlen den Rest weg.}}
{H{Richtig – die Ganzzahldivision schneidet ab, sie rundet nicht.}}

**2. Womit vergleicht man zwei Zeichenketten auf gleichen Inhalt?**

{r1{mit dem Operator ==}}

{r1{!mit der Methode equals}}

{r1{mit dem Operator >}}

{r1{mit der Methode length}}

{h{Bei Objekten prüft der eine Operator nur, ob es dasselbe Objekt ist.}}
{H{Richtig. Der Operator == vergleicht bei Objekten die Identität, nicht den Inhalt.}}

**3. Ein Feld hat 4 Plätze. Welchen Index hat der letzte Platz?**

{z{3}}

{h{Der erste Platz hat den Index 0.}}
{H{Richtig – die Indizes laufen von 0 bis length minus 1.}}

**4. Was liefert eine Methode mit dem Rückgabetyp void?**

{r2{immer die Zahl 0}}

{r2{!nichts – sie tut etwas, statt einen Wert zu liefern}}

{r2{den zuletzt berechneten Wert}}

{r2{eine leere Zeichenkette}}

{h{Das Wort bedeutet leer.}}
{H{Richtig. Wer einen Wert braucht, gibt der Methode einen Rückgabetyp und eine return-Anweisung.}}

**5. Warum macht man Attribute private?**

{r3{weil der Quelltext dann kürzer wird}}

{r3{!weil die Klasse selbst bestimmen soll, wie und wann ihre Werte verändert werden}}

{r3{weil Java das verlangt}}

{r3{damit die Attribute schneller gefunden werden}}

{h{Denk an die Methode, die verhindert, dass der Punktestand unter 0 fällt.}}
{H{Richtig – das ist das Geheimnisprinzip. Ohne es könnte jede Regel von außen umgangen werden.}}

**6. Eine Unterklasse überschreibt eine Methode der Oberklasse. Welche Fassung wird ausgeführt?**

{r4{immer die der Oberklasse}}

{r4{!die der Klasse, zu der das Objekt gehört}}

{r4{die der Klasse, in der der Aufruf steht}}

{r4{beide nacheinander}}

{h{Entscheidend ist das Objekt, nicht die Stelle im Quelltext.}}
{H{Richtig – und genau das heißt Polymorphie. Mehr dazu in Kapitel 1.}}

**7. Was bewirkt super(pName) als erste Zeile eines Konstruktors?**

{r5{es legt ein zweites Objekt an}}

{r5{!es ruft den Konstruktor der Oberklasse auf}}

{r5{es überschreibt eine Methode}}

{r5{es macht ein Attribut öffentlich}}

{h{Die Oberklasse muss ihre eigenen Attribute setzen können.}}
{H{Richtig. Fehlt die Zeile, sucht Java einen parameterlosen Konstruktor in der Oberklasse.}}

**8. Ein Feld enthält 100 Werte, der gesuchte kommt nicht vor. Wie viele Werte sieht sich die lineare Suche an?**

{z{100}}

{h{Wann darf die Suche aufhören, wenn sie nichts findet?}}
{H{Richtig – der ungünstigste Fall zwingt zum vollständigen Durchlauf.}}

**9. Welche Schleife nimmt man, wenn die Zahl der Durchläufe vorher feststeht?**

{r6{die fußgesteuerte Schleife}}

{r6{!die Zählschleife}}

{r6{eine Schleife mit der Bedingung true}}

{r6{eine verschachtelte Schleife}}

{h{Zähler, Bedingung und Schrittweite stehen dort in einer Zeile.}}
{H{Richtig. Sie hält alles zusammen, was zum Zählen gehört, und wird dadurch seltener falsch.}}

**10. Was ist der Unterschied zwischen einer Klasse und einem Objekt?**

{r7{es gibt keinen, das sind zwei Wörter für dasselbe}}

{r7{!die Klasse ist der Bauplan, das Objekt das danach gebaute Exemplar}}

{r7{die Klasse hat Methoden, das Objekt nur Attribute}}

{r7{ein Objekt kann nur einmal pro Programm entstehen}}

{h{Von einer Klasse kann man beliebig viele Exemplare anlegen.}}
{H{Richtig – jedes Objekt hat eigene Attributwerte, die Methoden stehen einmal in der Klasse.}}

::::
