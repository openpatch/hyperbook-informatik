---
name: "Containerterminal: Programmieren"
index: 9
lang: de
permaid: java-stapel-containerterminal-programmieren
hide: true
scripts:
  - /wc/oop-containerterminal.js
---

# Containerterminal: Programmieren

Auf der Seite [Containerterminal: Planen](./containerterminal) habt ihr zu eurer Strategie (A, B oder C) ein Struktogramm `hole(pNummer)` entwickelt und im Kran-Test überprüft. Jetzt wird daraus Java. Startzustand und Auftrag sind die vom ersten Tag: Die Lkw holen **4711**, **1234** und **0815**.

:::snippet{#merken}
**Vom Struktogramm zu Java**

Die Befehle des Krans heißen in Java genauso – du schreibst nur `terminal.` davor.

| im Struktogramm | in Java |
| --- | --- |
| `finde(pNummer)` | `terminal.finde(pNummer)` |
| `oben(s)` | `terminal.oben(s)` |
| `istVoll(s)` | `terminal.istVoll(s)` |
| `naechsteAbholung(s)` | `terminal.naechsteAbholung(s)` |
| `umsetzen(pVon, pNach)` | `terminal.umsetzen(pVon, pNach)` |
| `verladen(s)` | `terminal.verladen(s)` |
| oben steht der gesuchte Container | `terminal.oben(s).getNummer().equals(pNummer)` |
| Stapel `s` ist leer | `terminal.oben(s) == null` |
:::

Du programmierst nur in der Klasse **`Disponent`**. Die anderen Klassen sind fertig – ihre Reiter musst du nicht lesen.

:::onlineide{libraries="nrw" height="680px" speed="1000000" id="stapel-containerterminal"}

```java Main.java
void main() {
    Terminal terminal = new Terminal();
    Disponent disponent = new Disponent(terminal);

    disponent.hole("4711");
    disponent.hole("1234");
    disponent.hole("0815");

    IO.println(terminal.bericht());
    IO.println(terminal.getKranbefehle());

    // Zusatz D: das ganze Spiel mit drei Wellen
    // IO.println("");
    // IO.println("Gesamtkosten im Spiel: " + new Spiel().spiele() + " Euro");
}
```

```java Disponent.java
public class Disponent {

    private Terminal terminal;

    public Disponent(Terminal pTerminal) {
        terminal = pTerminal;
    }

    /** Verlaedt einen Container. Rufe hier die Methode eurer Strategie auf. */
    public void hole(String pNummer) {
        holeMitFreiflaeche(pNummer);
    }

    /** Strategie A: Blocker auf die Freiflaeche, verladen, Blocker zurueck. */
    public void holeMitFreiflaeche(String pNummer) {

    }

    /** Strategie B: Blocker auf einen anderen Stapel mit Platz, sonst auf die Freiflaeche. */
    public void holeMitNachbar(String pNummer) {

    }

    /** Strategie C: Blocker auf den Stapel, der am laengsten ungestoert bleibt. */
    public void holeVorausschauend(String pNummer) {

    }

    /** Erst fuer Zusatz D: Ein neuer Container kommt vom Schiff. Bisher: auf den ersten Stapel mit Platz. */
    public void lagereEin(Container pContainer) {
        for (int i = 1; i <= 3; i++) {
            if (!terminal.istVoll(i)) {
                terminal.einlagern(pContainer, i);
                return;
            }
        }
    }
}
```

```java Container.java
public class Container {

    private String nummer;
    private int abholung;

    /** pAbholung: an welcher Stelle der Container abgeholt wird (1, 2, 3, ...), 0 = bleibt im Terminal. */
    public Container(String pNummer, int pAbholung) {
        nummer = pNummer;
        abholung = pAbholung;
    }

    public String getNummer() {
        return nummer;
    }

    public int getAbholung() {
        return abholung;
    }
}
```

```java Terminal.java
/**
 * Das Containerterminal: Stapel 1 bis 3 (je hoechstens 4 Container) und die
 * Freiflaeche (Stapel 0, unbegrenzt). Container bewegt nur der Kran - jede
 * Bewegung kostet:
 *   verladen auf den Lkw ............... 20 Euro
 *   einlagern vom Schiff ............... 20 Euro
 *   umsetzen zwischen zwei Stapeln ..... 50 Euro
 *   umsetzen von/auf die Freiflaeche ... 80 Euro
 * Diese Klasse wird nicht veraendert.
 */
public class Terminal {

    private Stack<Container> frei;
    private Stack<Container> s1;
    private Stack<Container> s2;
    private Stack<Container> s3;
    private int kosten;
    private int fehler;
    private String verladen;
    private String befehle;

    /** Startzustand: Stapel 1: 0815, 4711, 2001 - Stapel 2: 1234, 3003 - Stapel 3: 5005 (jeweils unten -> oben). */
    public Terminal() {
        leeren();
        aufbauen(1, "0815", 3);
        aufbauen(1, "4711", 1);
        aufbauen(1, "2001", 0);
        aufbauen(2, "1234", 2);
        aufbauen(2, "3003", 5);
        aufbauen(3, "5005", 0);
    }

    /** Leert das Terminal (fuer eigene Versuche). */
    public void leeren() {
        frei = new Stack<Container>();
        s1 = new Stack<Container>();
        s2 = new Stack<Container>();
        s3 = new Stack<Container>();
        kosten = 0;
        fehler = 0;
        verladen = "";
        befehle = "";
    }

    /** Stellt kostenlos einen Container auf - nur zum Aufbauen eines Startzustands. */
    public void aufbauen(int pStapel, String pNummer, int pAbholung) {
        gib(pStapel).push(new Container(pNummer, pAbholung));
    }

    // ---------- Nachsehen (kostenlos) ----------

    /** Liefert eine KOPIE des Stapels. Was du mit der Kopie machst, aendert das Terminal nicht. */
    public Stack<Container> stapel(int pStapel) {
        Stack<Container> original = gib(pStapel);
        Stack<Container> hilf = new Stack<Container>();
        Stack<Container> kopie = new Stack<Container>();
        while (!original.isEmpty()) {
            hilf.push(original.top());
            original.pop();
        }
        while (!hilf.isEmpty()) {
            original.push(hilf.top());
            kopie.push(hilf.top());
            hilf.pop();
        }
        return kopie;
    }

    /** Der oberste Container des Stapels oder null. */
    public Container oben(int pStapel) {
        return gib(pStapel).top();
    }

    public int hoehe(int pStapel) {
        Stack<Container> k = stapel(pStapel);
        int anzahl = 0;
        while (!k.isEmpty()) {
            anzahl++;
            k.pop();
        }
        return anzahl;
    }

    public boolean istVoll(int pStapel) {
        return pStapel != 0 && hoehe(pStapel) >= 4;
    }

    /** In welchem Stapel steht der Container? 1 bis 3, 0 = Freiflaeche, -1 = nicht im Terminal. */
    public int finde(String pNummer) {
        for (int i = 0; i <= 3; i++) {
            Stack<Container> k = stapel(i);
            while (!k.isEmpty()) {
                if (k.top().getNummer().equals(pNummer)) {
                    return i;
                }
                k.pop();
            }
        }
        return -1;
    }

    /** Wann wird von dem Stapel als Naechstes etwas abgeholt? Kleinste Abholung > 0, 0 = nie. */
    public int naechsteAbholung(int pStapel) {
        Stack<Container> k = stapel(pStapel);
        int naechste = 0;
        while (!k.isEmpty()) {
            int a = k.top().getAbholung();
            if (a > 0 && (naechste == 0 || a < naechste)) {
                naechste = a;
            }
            k.pop();
        }
        return naechste;
    }

    // ---------- Kranbewegungen (kosten Geld) ----------

    public void umsetzen(int pVon, int pNach) {
        if (pVon == pNach || gib(pVon).isEmpty() || istVoll(pNach)) {
            fehlversuch("umsetzen(" + pVon + ", " + pNach + ")");
            return;
        }
        gib(pNach).push(gib(pVon).top());
        gib(pVon).pop();
        merke("umsetzen(" + pVon + "," + pNach + ")");
        if (pVon == 0 || pNach == 0) {
            kosten = kosten + 80;
        } else {
            kosten = kosten + 50;
        }
    }

    public void verladen(int pVon) {
        if (gib(pVon).isEmpty()) {
            fehlversuch("verladen(" + pVon + ")");
            return;
        }
        if (!verladen.equals("")) {
            verladen = verladen + ", ";
        }
        verladen = verladen + gib(pVon).top().getNummer();
        gib(pVon).pop();
        merke("verladen(" + pVon + ")");
        kosten = kosten + 20;
    }

    public void einlagern(Container pContainer, int pNach) {
        if (pNach < 1 || pNach > 3 || istVoll(pNach)) {
            fehlversuch("einlagern(" + pContainer.getNummer() + ", " + pNach + ")");
            return;
        }
        gib(pNach).push(pContainer);
        kosten = kosten + 20;
        merke("einlagern(" + pContainer.getNummer() + "," + pNach + ")");
    }

    // ---------- Auswertung ----------

    public int getKosten() {
        return kosten;
    }

    public int getFehler() {
        return fehler;
    }

    /** Die verladenen Container in der Reihenfolge des Verladens. */
    public String getVerladen() {
        return verladen;
    }

    /** Ein Stapel als Text, unten -> oben, z. B. "0815 4711 2001". */
    public String beschreibung(int pStapel) {
        Stack<Container> k = stapel(pStapel);
        String text = "";
        while (!k.isEmpty()) {
            if (text.equals("")) {
                text = k.top().getNummer();
            } else {
                text = k.top().getNummer() + " " + text;
            }
            k.pop();
        }
        return text;
    }

    public String bericht() {
        return "Stapel 1: " + beschreibung(1) + " | Stapel 2: " + beschreibung(2)
            + " | Stapel 3: " + beschreibung(3) + " | Freiflaeche: " + beschreibung(0)
            + "\nVerladen: " + verladen + "\nKosten: " + kosten + " Euro, Fehlversuche: " + fehler;
    }

    /** Alle Kranbewegungen als eine Zeile - zum Abspielen in der Simulation. */
    public String getKranbefehle() {
        return "Kranbefehle: " + befehle;
    }

    private void merke(String pBefehl) {
        if (!befehle.equals("")) {
            befehle = befehle + "; ";
        }
        befehle = befehle + pBefehl;
    }

    private void fehlversuch(String pText) {
        fehler++;
        IO.println("Nicht moeglich: " + pText);
    }

    private Stack<Container> gib(int pStapel) {
        if (pStapel == 1) {
            return s1;
        }
        if (pStapel == 2) {
            return s2;
        }
        if (pStapel == 3) {
            return s3;
        }
        return frei;
    }
}
```

```java Spiel.java
/**
 * Drei Wellen: Lkw holen ab, ein Schiff liefert, wieder holen Lkw ab.
 * Diese Klasse wird nicht veraendert.
 */
public class Spiel {

    public int spiele() {
        Terminal terminal = new Terminal();
        Disponent disponent = new Disponent(terminal);
        int vorher = 0;

        IO.println("Welle 1: Drei Lkw holen ab.");
        disponent.hole("4711");
        disponent.hole("1234");
        disponent.hole("0815");
        IO.println("  Kosten der Welle: " + (terminal.getKosten() - vorher) + " Euro");
        vorher = terminal.getKosten();

        IO.println("Welle 2: Ein Schiff liefert vier Container.");
        disponent.lagereEin(new Container("7001", 6));
        disponent.lagereEin(new Container("7002", 4));
        disponent.lagereEin(new Container("7003", 0));
        disponent.lagereEin(new Container("7004", 7));
        IO.println("  Kosten der Welle: " + (terminal.getKosten() - vorher) + " Euro");
        vorher = terminal.getKosten();

        IO.println("Welle 3: Vier Lkw holen ab.");
        disponent.hole("7002");
        disponent.hole("3003");
        disponent.hole("7001");
        disponent.hole("7004");
        IO.println("  Kosten der Welle: " + (terminal.getKosten() - vorher) + " Euro");

        IO.println(terminal.bericht());
        if (!terminal.getVerladen().equals("4711, 1234, 0815, 7002, 3003, 7001, 7004") || terminal.getFehler() > 0) {
            IO.println("Achtung: Der Auftrag ist nicht vollständig oder nicht fehlerfrei erledigt - das zählt nicht für die Rangliste.");
        }
        return terminal.getKosten();
    }
}
```

```java DisponentTest.java
@Test
class DisponentTest {

    // Summe der Hoehen aller Stapel und der Freiflaeche.
    int anzahl(Terminal pTerminal) {
        return pTerminal.hoehe(0) + pTerminal.hoehe(1) + pTerminal.hoehe(2) + pTerminal.hoehe(3);
    }

    @Test
    void testFreiflaeche() {
        Terminal t = new Terminal();
        Disponent d = new Disponent(t);
        d.holeMitFreiflaeche("4711");
        assertEquals("4711", t.getVerladen(), "4711 muss verladen sein.");
        assertEquals(0, t.getFehler(), "Der Kran darf keine unmoeglichen Bewegungen versuchen.");
        assertEquals("0815 2001", t.beschreibung(1), "Auf Stapel 1 stehen danach wieder 0815 und darueber 2001.");
        assertEquals("", t.beschreibung(0), "Die Freiflaeche ist am Ende wieder leer.");
        assertEquals(180, t.getKosten(), "80 + 20 + 80 = 180 Euro");
    }

    @Test
    void testFreiflaecheGrenzfaelle() {
        Terminal t = new Terminal();
        Disponent d = new Disponent(t);
        d.holeMitFreiflaeche("2001");
        assertEquals(20, t.getKosten(), "2001 steht oben: nur verladen, 20 Euro.");
        d.holeMitFreiflaeche("9999");
        assertEquals("2001", t.getVerladen(), "Einen Container, den es nicht gibt, kann man nicht verladen.");
        assertEquals(0, t.getFehler(), "Auch dann versucht der Kran nichts Unmoegliches.");
    }

    @Test
    void testNachbar() {
        Terminal t = new Terminal();
        Disponent d = new Disponent(t);
        d.holeMitNachbar("4711");
        d.holeMitNachbar("1234");
        d.holeMitNachbar("0815");
        assertEquals("4711, 1234, 0815", t.getVerladen(), "Alle drei Container sind in der richtigen Reihenfolge verladen.");
        assertEquals(0, t.getFehler(), "Der Kran darf keine unmoeglichen Bewegungen versuchen.");
        assertEquals("", t.beschreibung(0), "Die teure Freiflaeche wird nicht gebraucht.");
        assertEquals(3, anzahl(t), "Drei Container bleiben im Terminal.");
    }

    @Test
    void testNachbarVoll() {
        Terminal t = new Terminal();
        t.leeren();
        t.aufbauen(1, "A", 1);
        t.aufbauen(1, "B", 0);
        t.aufbauen(2, "C", 0);
        t.aufbauen(2, "D", 0);
        t.aufbauen(2, "E", 0);
        t.aufbauen(2, "F", 0);
        Disponent d = new Disponent(t);
        d.holeMitNachbar("A");
        assertEquals("A", t.getVerladen(), "Stapel 2 ist voll - B muss auf Stapel 3.");
        assertEquals(0, t.getFehler(), "Auf einen vollen Stapel kann der Kran nichts setzen.");
    }

    @Test
    void testVorausschauend() {
        Terminal t = new Terminal();
        Disponent d = new Disponent(t);
        d.holeVorausschauend("4711");
        d.holeVorausschauend("1234");
        d.holeVorausschauend("0815");
        assertEquals("4711, 1234, 0815", t.getVerladen(), "Alle drei Container sind in der richtigen Reihenfolge verladen.");
        assertEquals(0, t.getFehler(), "Der Kran darf keine unmoeglichen Bewegungen versuchen.");
        assertEquals(160, t.getKosten(), "Zwei Umsetzungen und drei Verladungen: 160 Euro.");
    }

    @Test
    void testLagereEin() {
        Terminal t = new Terminal();
        Disponent d = new Disponent(t);
        d.lagereEin(new Container("7001", 6));
        d.lagereEin(new Container("7002", 4));
        d.lagereEin(new Container("7003", 0));
        d.lagereEin(new Container("7004", 7));
        d.lagereEin(new Container("7005", 0));
        d.lagereEin(new Container("7006", 0));
        assertEquals(0, t.getFehler(), "Jeder Container findet einen Stapel, der nicht voll ist.");
        assertEquals(12, anzahl(t), "Sechs alte und sechs neue Container stehen im Terminal.");
        assertEquals("", t.beschreibung(0), "Neue Container kommen auf die Stapel, nicht auf die Freiflaeche.");
    }
}
```

:::

## Aufgabe 4: Eure Strategie in Java

:::snippet{#aufgabe}
a) **Implementiert** die Methode eurer Strategie, indem ihr euer überarbeitetes Struktogramm aus Aufgabe 2 übersetzt:

- Strategie A: `holeMitFreiflaeche`
- Strategie B: `holeMitNachbar`
- Strategie C: `holeVorausschauend`

Tragt den Aufruf eurer Methode in `hole` ein. Euer Programm ist fertig, wenn im Reiter **Testrunner** die Tests zu eurer Strategie grün sind – die Tests der anderen Strategien dürfen rot bleiben.

b) **Startet** `main` und **gebt** die Kosten **an**. **Vergleicht** sie mit den Kosten aus dem Kran-Test.
:::

::textinput{id="containerterminal-4b" height="80px" placeholder="b) Unser Programm kostet ... Euro, im Kran-Test waren es ... Euro, weil ..."}

Unmögliche Bewegungen – etwa auf einen vollen Stapel – führt der Kran nicht aus. Er meldet sie mit „Nicht moeglich: …“ und zählt einen Fehlversuch.

::::collapsible{title="Tipp 1: Das Gerüst in Java" id="container-tipp-geruest"}

Jede der drei Strategien beginnt gleich. Den Grenzfall „nicht im Terminal“ fängst du vor der Schleife ab – sonst liefert `terminal.oben(s)` irgendwann `null`.

```java
int s = terminal.finde(pNummer);
if (s == -1) {
    return;
}
while (!terminal.oben(s).getNummer().equals(pNummer)) {
    // den obersten Container wegsetzen – aber wohin?
}
terminal.verladen(s);
```

::::

::::collapsible{title="Tipp 2 für A: Zurückstellen" id="container-tipp-frei"}

Das ist das Muster **Erhalten** aus [Mit dem Stapel arbeiten](./handhabung): Die Freifläche ist der Hilfsstapel. Zurückgestellt wird, solange auf der Freifläche (Stapel 0) noch etwas steht: `terminal.oben(0) != null`.

::::

::::collapsible{title="Tipp 2 für B: Wer ist der Nachbar?" id="container-tipp-nachbar"}

Für die Stapel 1, 2, 3 liefert `s % 3 + 1` den nächsten Stapel „im Kreis“: aus 1 wird 2, aus 2 wird 3, aus 3 wird 1. Ist er voll, nimm den übernächsten. Sind beide voll, bleibt nur die Freifläche (0).

::::

::::collapsible{title="Tipp 2 für C: Welcher Stapel bleibt am längsten ungestört?" id="container-tipp-voraus"}

Ein Stapel, von dem nichts abgeholt wird (`terminal.naechsteAbholung(i)` liefert 0), ist der beste Platz. Sonst gilt: Je **größer** die nächste Abholung, desto länger stört der Blocker dort niemanden. Eine kleine Hilfsmethode, die für „nichts wird abgeholt“ eine sehr große Zahl liefert, macht den Vergleich einfach. Gehe mit einer Schleife über die Stapel 1 bis 3 und überspringe den eigenen Stapel und volle Stapel.

::::

## Aufgabe 5: Abspielen und vergleichen

:::snippet{#aufgabe}
a) `main` gibt eine Zeile `Kranbefehle: …` aus. Kopiert sie in das Feld unten und drückt **Abspielen**: Der Kran führt genau die Bewegungen aus, die euer Programm gemacht hat. **Erläutert**, wie die Kosten zustande kommen.

b) Tragt eure Kosten in der Klasse zusammen. **Vergleicht** die drei Strategien und **erläutert**, wodurch die Unterschiede entstehen.
:::

<oop-containerterminal id="containerterminal-abspielen" abspielen stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>

::textinput{id="containerterminal-5a" height="100px" placeholder="a) Unser Kran setzt ... um und verlädt ... Das kostet ..."}

::textinput{id="containerterminal-5b" height="120px" placeholder="b) Freifläche: ... Euro, Nachbarstapel: ... Euro, vorausschauend: ... Euro. Der Unterschied entsteht, weil ..."}

---

## Zusatz

Fertig? Sucht euch eine der Aufgaben aus.

### Zusatz A: Eine zweite Strategie

:::snippet{#aufgabe}
a) **Implementiert** eine zweite Strategie und lasst sie über `hole` laufen.

b) Spielt die Kranbefehle ab. **Bestimmt** eine Kranbewegung, die bei dieser Strategie noch vermeidbar wäre.
:::

::textinput{id="containerterminal-za" height="80px" placeholder="b) Vermeidbar wäre ..., weil ..."}

### Zusatz B: Eigene Testfälle

:::snippet{#aufgabe}
Der erste Tag ist nur **ein** Testfall. Unter **Eigene Startaufstellung** denkst du dir selbst einen aus: Stapel und Lkw eintragen, **Übernehmen** – die Simulation rechnet aus, was der günstigste Ablauf kostet. Darunter steht der Java-Code, der dasselbe Terminal aufbaut. Füge ihn am Ende von `main` ein, starte das Programm und spiele die Kranbefehle ab.

**Entwickle** Testfälle, die die Grenzen prüfen: ein voller Nachbarstapel, ein Container, der schon oben steht, ein Container, den es gar nicht gibt. **Beschreibe**, wo deine Strategie versagt oder teuer wird.
:::

<oop-containerterminal id="containerterminal-eigene" abspielen eigene stapel="0815,4711,2001 | 1234,3003 | 5005" auftrag="4711,1234,0815" hoehe="4" bestwert="160"></oop-containerterminal>

::textinput{id="containerterminal-zb" height="100px" placeholder="Mein Testfall: ... – Meine Strategie kostet ... Euro, günstiger wären ... Euro, weil ..."}

### Zusatz C: `naechsteAbholung` selbst bauen

:::snippet{#aufgabe}
Bisher hat `Terminal` dir `naechsteAbholung` fertig geliefert. **Implementiere** in `Disponent` eine eigene Methode `public int naechsteAbholung(int pStapel)`, ohne in `Terminal.java` nachzusehen. Sie liefert die kleinste Abholung größer als 0 auf dem Stapel, 0 heißt „nichts wird abgeholt“. Ein `Container` kennt seine Abholung: `getAbholung()`.

Arbeite mit `terminal.stapel(pStapel)`: Die Methode liefert eine **Kopie** des Stapels – nachsehen kostet nichts. Prüfe in `main`, ob deine Methode für die Stapel 1, 2 und 3 dasselbe liefert wie die von `Terminal`.
:::

::::collapsible{title="Tipp: Nachsehen in der Kopie" id="container-tipp-kopie"}

Baue die Kopie ab wie beim Muster **Abarbeiten**. Merke dir dabei die kleinste Abholung, die größer als 0 ist. Die Kopie darfst du leeren – das Terminal merkt davon nichts.

::::

### Zusatz D: Drei Wellen

:::snippet{#aufgabe}
Nach den drei Lkw legt ein Schiff an und liefert vier neue Container, danach holen vier Lkw ab. Die Klasse `Spiel` spielt alle drei Wellen und zählt die Kosten. Sie benutzt deine Methode `hole`.

a) Entferne in `main` die Kommentarzeichen vor den letzten beiden Zeilen und starte das Spiel.

b) Bisher stellt `lagereEin` jeden neuen Container auf den ersten Stapel mit Platz. **Entwickle** eine bessere Regel zum Einlagern und **implementiere** sie: Wohin gehört ein Container, der bald abgeholt wird? Und wohin einer, der bleibt?

c) **Beschreibe** deine Regel und **gib** deine Gesamtkosten **an**.

Wer schafft die niedrigsten Gesamtkosten? Ein Ergebnis zählt nur, wenn alle Container in der richtigen Reihenfolge und ohne Fehlversuch verladen wurden.
:::

::textinput{id="containerterminal-7c" height="120px" placeholder="c) Meine Regel: Ein neuer Container kommt auf den Stapel, ... – Gesamtkosten im Spiel: ... Euro."}

::::collapsible{title="Tipp: Gut einlagern" id="container-tipp-einlagern"}

Ein neuer Container stört, wenn er auf einem Container steht, der **früher** abgeholt wird als er selbst. Suche deshalb einen Stapel, dessen nächste Abholung **nach** der Abholung des neuen Containers liegt. Gibt es mehrere, nimm den, bei dem es am knappsten passt – die ganz ruhigen Stapel brauchst du noch für Container, die bleiben.

::::

### Weiterdenken: Warum eine Kopie?

:::snippet{#brain}
a) `terminal.stapel(pStapel)` liefert eine **Kopie**. **Erläutere**, was schiefgehen könnte, wenn die Methode den Stapel selbst liefern würde.

b) Die Kopie ist **flach**: Es gibt zwei Stapel, aber dieselben `Container`-Objekte. Angenommen, `Container` hätte `setGesperrt(boolean pGesperrt)`, und eine Planung sperrt in der Kopie einen Container. **Stelle** die Situation in einem Objektdiagramm **dar** und **erläutere**, was im Terminal passiert.

c) **Beschreibe**, wie eine **tiefe** Kopie erzeugt werden müsste.
:::

::textinput{id="containerterminal-w-a" height="100px" placeholder="a) Würde stapel() das Original liefern, dann ..."}

::textinput{id="containerterminal-w-b" height="100px" placeholder="b) Im Terminal ist der Container danach ..., weil Kopie und Original ..."}

::textinput{id="containerterminal-w-c" height="100px" placeholder="c) Für eine tiefe Kopie muss beim Kopieren ..."}

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von dynamischen Datenstrukturen (Stapel) (I)",
     "testen Programme systematisch anhand von Beispielen (I)". Vorgriff auf Q1-III: Kosten von Strategien vergleichen.
     Pflicht sind Aufgabe 4 und 5: Jedes Paar programmiert seine Strategie aus Aufgabe 2, verglichen wird in der Klasse.
     Versteckte Seite (hide: true) für Q1 GK G2: Struktogramme am 20.11.2026, programmiert am 24.11.2026. -->
