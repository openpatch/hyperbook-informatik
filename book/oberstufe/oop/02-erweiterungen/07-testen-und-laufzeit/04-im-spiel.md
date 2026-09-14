---
title: "Im Spiel: was man nicht testen kann"
index: 4
keywords:
  - java
  - qphase
---

# Im Spiel: was man nicht testen kann

:::alert{info}
**Optional.** Diese Seite ist ein Zusatzangebot am Ende des Kapitels. Sie führt nichts Neues ein, und weder der [Rückblick](./03-rueckblick) noch die späteren Kapitel setzen sie voraus.
:::

Ein Spiel ist der ehrlichste Prüfstein für dieses Kapitel. Denn ein Spiel testet man normalerweise, indem man es **spielt** – und genau das ist kein Testen, sondern Hoffen.

:::snippet{#scratch-kurz}
:::

<!-- KLP QPh: testen Programme auch unter Beruecksichtigung von Sonderfaellen (I); entwickeln Testanwendungen zum systematischen Pruefen (I, LK); beurteilen Algorithmen unter Beruecksichtigung des Speicherbedarfs und der Zahl der Operationen (A). Wendet Kapitel 7 an, fuehrt nichts Neues ein. Optional. -->

## Woran es hakt

Hier ist eine Punkteregel, wie sie in jedem zweiten Spiel steht: Wer mehrere Gegenstände schnell hintereinander einsammelt, bekommt einen **Kombo-Bonus**. Ab dem dritten Treffer in Folge zählt jeder Treffer doppelt, ab dem sechsten dreifach. Eine Falle setzt die Kombo zurück.

In der ersten Fassung steht diese Regel dort, wo sie gebraucht wird – mitten im Sprite:

```java
public class Muenze extends Spielobjekt {

    public void beruehrtVon(Spieler pSpieler) {
        Spiel s = this.spiel();
        s.setKombo(s.getKombo() + 1);
        int faktor = 1;
        if (s.getKombo() >= 6) {
            faktor = 3;
        } else if (s.getKombo() >= 3) {
            faktor = 2;
        }
        s.zaehle(10 * faktor);
        this.remove();
    }
}
```

:::snippet{#brain}
Diese Regel hat mindestens vier Fälle und zwei Grenzen – genau die Sorte Code, die man testen will.

Aber wie? `beruehrtVon` braucht einen `Spieler`, der Spieler braucht eine Bühne, die Bühne braucht ein Fenster. Um zu prüfen, ob der dritte Treffer wirklich doppelt zählt, müsste ein Test ein ganzes Spiel starten und eine Figur steuern.

**Das ist der eigentliche Befund: Die Regel ist nicht zu kompliziert zum Testen – sie steht nur am falschen Ort.**
:::

## Die Trennung

Die Punkteregel braucht keine Grafik. Sie braucht nur zu wissen, was passiert ist. Also bekommt sie eine eigene Klasse ohne jede Verbindung zur Bühne:

:::snippet{#definition}
Eine Klasse, die nur rechnet und nichts anzeigt, heißt **Logik**. Sie ist ohne Umgebung lauffähig und deshalb ohne Umgebung prüfbar.

Der Sprite wird dadurch dumm – und das ist gewollt: Er meldet nur noch, dass etwas eingesammelt wurde, und fragt nicht mehr, was das bedeutet.
:::

Im Programmierbereich unten stehen beide Teile nebeneinander: `Punktestand` als reine Logik und `PunktestandTest` mit den Tests dazu. **Starte die Tests über den Reiter *Testrunner*** unter dem Editor.

:::onlineide{height="740px" speed="1000000"}

```java Main.java
void main() {
    Punktestand p = new Punktestand();
    p.treffer(10);
    p.treffer(10);
    p.treffer(10);
    IO.println("Drei Treffer: " + p.getPunkte() + " Punkte, Kombo " + p.getKombo());
    p.fehler();
    IO.println("Nach der Falle: Kombo " + p.getKombo());
    IO.println("");
    IO.println("Die Tests startest du über den Reiter Testrunner.");
}
```

```java Punktestand.java
/**
 * Die Punkteregel des Spiels - ohne Bühne, ohne Figur, ohne Grafik.
 *
 * Ab dem dritten Treffer in Folge zählt jeder Treffer doppelt,
 * ab dem sechsten dreifach. Ein Fehler setzt die Kombo zurück.
 */
public class Punktestand {

    public static final int KOMBO_DOPPELT = 3;
    public static final int KOMBO_DREIFACH = 6;

    private int punkte;
    private int kombo;

    public Punktestand() {
        punkte = 0;
        kombo = 0;
    }

    public int getPunkte() {
        return punkte;
    }

    public int getKombo() {
        return kombo;
    }

    /** Ein Gegenstand wurde eingesammelt. */
    public void treffer(int pGrundwert) {
        kombo = kombo + 1;
        punkte = punkte + pGrundwert * faktor();
    }

    /** Eine Falle wurde berührt: die Kombo ist dahin. */
    public void fehler() {
        kombo = 0;
    }

    /** Der Vervielfacher für den aktuellen Treffer. */
    public int faktor() {
        if (kombo >= KOMBO_DREIFACH) {
            return 3;
        }
        if (kombo >= KOMBO_DOPPELT) {
            return 2;
        }
        return 1;
    }
}
```

```java PunktestandTest.java
@Test
class PunktestandTest {

    @Test
    void testStart() {
        Punktestand p = new Punktestand();
        assertEquals(0, p.getPunkte(), "Am Anfang hat man 0 Punkte.");
        assertEquals(0, p.getKombo(), "Am Anfang ist die Kombo 0.");
    }

    @Test
    void testEinzelnerTreffer() {
        Punktestand p = new Punktestand();
        p.treffer(10);
        assertEquals(10, p.getPunkte(), "Der erste Treffer zählt einfach.");
    }

    @Test
    void testGrenzeZumDoppelten() {
        Punktestand p = new Punktestand();
        p.treffer(10);
        p.treffer(10);
        assertEquals(20, p.getPunkte(), "Der zweite Treffer zählt noch einfach.");
        p.treffer(10);
        assertEquals(40, p.getPunkte(), "Der dritte Treffer zählt doppelt.");
    }

    @Test
    void testGrenzeZumDreifachen() {
        Punktestand p = new Punktestand();
        for (int i = 0; i < 5; i++) {
            p.treffer(10);
        }
        assertEquals(80, p.getPunkte(),
            "Treffer 1 bis 5 ergeben 10+10+20+20+20 = 80.");
        p.treffer(10);
        assertEquals(110, p.getPunkte(),
            "Der sechste Treffer zählt dreifach: 80 + 30 = 110.");
    }

    @Test
    void testFehlerSetztZurueck() {
        Punktestand p = new Punktestand();
        p.treffer(10);
        p.treffer(10);
        p.treffer(10);
        p.fehler();
        assertEquals(0, p.getKombo(), "Nach einer Falle ist die Kombo 0.");
        p.treffer(10);
        assertEquals(50, p.getPunkte(), "Danach zählt wieder einfach: 40 + 10.");
    }

    @Test
    void testFehlerNimmtKeinePunkte() {
        Punktestand p = new Punktestand();
        p.treffer(10);
        p.fehler();
        assertEquals(10, p.getPunkte(),
            "Eine Falle kostet die Kombo, nicht die schon erreichten Punkte.");
    }
}
```

:::

Sechs Tests, in einer Sekunde durchgelaufen, ohne dass jemand eine Taste drücken musste. Dieselbe Sicherheit durch Spielen zu bekommen, würde Minuten dauern – und man müsste die Kombo von 5 auf 6 jedes Mal von Hand treffen.

:::snippet{#merken}
Die Grenzen sind der Kern: 2 → 3 und 5 → 6. Genau dort stehen die `>=`-Vergleiche, und genau dort passieren die Fehler. Ein Test, der nur „drei Treffer geben 40 Punkte" prüft, findet einen vertauschten Vergleich nicht.

**Teste immer beide Seiten einer Grenze** – den letzten Fall davor und den ersten danach.
:::

:::snippet{#aufgabe}
**Aufgabe 1: Fehler einbauen und finden**

a) Ändere in `faktor()` das erste `>=` in ein `>`. Welche Tests schlagen fehl, welche nicht? Was sagt dir das über die, die nicht fehlschlagen?

b) Vertausche die beiden `if`-Blöcke in `faktor()`. Schlägt ein Test fehl? Begründe.

c) Schreibe einen Test für den Fall, dass `fehler()` **vor** dem ersten Treffer kommt.

d) `treffer(0)` – ein Gegenstand ohne Wert. Erhöht er die Kombo? Entscheide, was richtig ist, und schreibe **zuerst** den Test dafür.
:::

:::protect{password="java-q-7-s-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Das erste `>=` ist die Prüfung auf `KOMBO_DREIFACH`. Mit `>` zählt der sechste Treffer nur noch doppelt, und es schlägt genau **ein** Test fehl: `testGrenzeZumDreifachen`, an der zweiten Behauptung (110 erwartet, 100 erhalten). Alle anderen laufen unverändert durch – sie kommen nie bis zu einer Kombo von 6.

Das ist die Lehre dieser Aufgabe: **Ein Test, der die Grenze nicht berührt, bemerkt einen Fehler an der Grenze nicht.** Er ist nicht falsch, er ist nur blind für diese Sorte Fehler. Fünf grüne Tests sind deshalb keine Aussage über den Code, sondern eine über die fünf geprüften Fälle.

b) Ja, `testGrenzeZumDreifachen` schlägt fehl. Steht die Prüfung auf 3 zuerst, greift sie auch bei einer Kombo von 6 – der Faktor 3 wird nie erreicht. Fallunterscheidungen mit `>=` müssen von der **schärfsten** Bedingung nach unten geordnet sein; die Reihenfolge ist Teil der Logik, nicht Geschmackssache.

c) Er muss 0 Punkte und Kombo 0 ergeben und darf nicht abstürzen – ein klassischer Sonderfall: eine Operation auf einem Objekt, an dem noch nichts passiert ist.

d) Beides ist begründbar, aber man muss sich entscheiden. Zählt `treffer(0)` für die Kombo, kann man sich mit wertlosen Gegenständen eine Kombo aufbauen – meist unerwünscht. Wichtiger als die Entscheidung ist, dass sie **irgendwo festgehalten** wird: Der Test ist der Ort, an dem sie steht und an dem sie nicht verloren geht.

:::

## Der zweite Teil: was das Spiel kostet

Die Kollisionsprüfung sieht harmlos aus:

```java
Spielobjekt getroffen = this.getTouchingSprite(Spielobjekt.class);
```

Eine Zeile, ein Aufruf. Nur muss die Bibliothek dafür **jedes** Spielobjekt auf der Bühne prüfen. Bei einem Spieler und n Gegenständen sind das n Prüfungen pro Bild.

Solange nur der Spieler prüft, wächst der Aufwand linear. Sobald auch Gegner untereinander prüfen, prüft jeder gegen jeden: **n · (n−1) / 2** Paare – quadratisch.

:::snippet{#aufgabe}
**Aufgabe 2: den Aufwand abschätzen**

a) 20 Gegenstände, 60 Bilder pro Sekunde, nur der Spieler prüft. Wie viele Prüfungen pro Sekunde?

b) Dieselbe Rechnung, aber jeder gegen jeden bei 20 Objekten. Und bei 200?

c) Ab welcher Zahl von Objekten wird das zum Problem, wenn der Rechner etwa eine Million Prüfungen pro Sekunde schafft? Rechne, statt zu schätzen.

d) Ein gängiger Ausweg: Die Bühne wird in Kacheln von 50 × 50 Pixeln eingeteilt, und geprüft wird nur gegen Objekte in derselben und den acht angrenzenden Kacheln. Wie ändert sich der Aufwand – und welchen Preis zahlt man dafür?
:::

:::protect{password="java-q-7-s-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 20 · 60 = **1 200** Prüfungen pro Sekunde. Das merkt kein Rechner.

b) Bei 20 Objekten: 20 · 19 / 2 = 190 Paare, mal 60 = **11 400** pro Sekunde – immer noch nichts. Bei 200 Objekten: 200 · 199 / 2 = 19 900 Paare, mal 60 = **1 194 000** pro Sekunde. Die Zahl der Objekte ist verzehnfacht, der Aufwand aber **verhundertfacht**. Das ist quadratisches Wachstum, an Zahlen statt an einer Formel.

c) Gesucht ist n mit 60 · n · (n−1) / 2 ≈ 1 000 000, also n² ≈ 33 000 und n ≈ **180**. Genau in dieser Größenordnung liegt die Zahl der Objekte, ab der ein Spiel anfängt zu ruckeln – nicht bei 20 und nicht bei 20 000.

d) Bei gleichmäßiger Verteilung liegen in jeder Kachel nur wenige Objekte, und die Zahl der Nachbarn ist unabhängig von n. Der Aufwand wird damit im Mittel **linear** statt quadratisch. Der Preis: Man muss die Kacheln führen und bei jeder Bewegung aktualisieren – mehr Speicher, mehr Code, mehr Stellen, an denen etwas nicht mehr stimmen kann. Und im schlechtesten Fall, wenn alle Objekte in **einer** Kachel liegen, ist man wieder bei n².

Das ist das Muster hinter fast jeder Beschleunigung: **Man bezahlt Rechenzeit mit Speicher und mit Komplexität.**

:::

## Und ohne Spiel?

| Im Spiel | Dieselbe Einsicht woanders |
| --- | --- |
| Punkteregel aus dem Sprite herauslösen | Geschäftslogik von der Benutzeroberfläche trennen |
| Grenzen 2→3 und 5→6 prüfen | Notengrenzen, Rabattstufen, Altersgrenzen |
| „das teste ich, indem ich es spiele" | „das teste ich, indem ich es benutze" |
| jeder gegen jeden | jeder Datensatz gegen jeden anderen beim Abgleich |

Die Einsicht dieser Seite ist keine über Spiele: **Schlecht testbarer Code ist fast immer schlecht entworfener Code.** Wenn ein Test unmöglich erscheint, liegt es selten am Test.

---

## Selbsttest

::::multievent

**1. Warum ließ sich die Punkteregel in der ersten Fassung kaum testen?**

{r1{weil sie zu viele Fälle hatte}}

{r1{!weil sie im Sprite stand und damit eine Bühne und ein Fenster voraussetzte}}

{r1{weil Punkte Kommazahlen sind}}

{h{Nicht die Regel war das Problem, sondern ihr Ort.}}
{H{Richtig!}}

**2. Welche Testfälle sind bei einer Regel mit Grenzen die wichtigsten?**

{r2{möglichst viele zufällige Werte}}

{r2{!der letzte Wert vor der Grenze und der erste danach}}

{r2{nur der Normalfall in der Mitte}}

{h{Dort stehen die Vergleichsoperatoren.}}
{H{Richtig!}}

**3. Ein Test schlägt nach einer Änderung nicht fehl, obwohl ein Fehler eingebaut wurde. Was heißt das?**

{r3{der Fehler ist harmlos}}

{r3{!der Test berührt diese Stelle nicht - es fehlt ein Testfall}}

{r3{der Test ist falsch geschrieben}}

{h{Ein Test prüft nur, was er ausführt.}}
{H{Richtig!}}

**4. Die Zahl der Objekte wird verzehnfacht. Was passiert bei jeder-gegen-jeden?**

{r4{der Aufwand verzehnfacht sich}}

{r4{!der Aufwand verhundertfacht sich}}

{r4{der Aufwand bleibt gleich}}

{h{n mal n.}}
{H{Richtig - quadratisches Wachstum.}}

**5. Was kostet die Einteilung in Kacheln?** (Mehrfachauswahl)

{c1{!zusätzlichen Speicher für die Kacheln}}

{c1{!mehr Code, der bei jeder Bewegung stimmen muss}}

{c1{!im schlechtesten Fall bringt sie gar nichts}}

{c1{Genauigkeit - manche Berührungen werden übersehen}}

{h{Übersehen wird nichts, solange die Nachbarkacheln mitgeprüft werden.}}
{H{Richtig!}}

::::
