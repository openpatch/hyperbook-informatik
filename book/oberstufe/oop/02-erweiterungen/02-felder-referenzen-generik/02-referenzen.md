---
title: Referenzen
index: 2
---

# Referenzen

In der Einführungsphase ist dir etwas Merkwürdiges begegnet: Die Methode `tausche(int[] pWerte, int pI, int pJ)` gab **nichts** zurück und veränderte trotzdem das Feld des Aufrufers.

Jetzt klären wir, warum.

<!-- KLP QPh, Daten und ihre Strukturierung: Datentypen - elementare Datentypen, Objekttypen -->

## Das Experiment

:::snippet{#aufgabe}
Sage **ohne Rechner** voraus, was ausgegeben wird. Nimm dir Zeit – die zweite Ausgabe überrascht die meisten.
:::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    int zahl = 10;
    veraendere(zahl);
    IO.println("zahl nach dem Aufruf:  " + zahl);

    int[] feld = {10, 20, 30};
    veraendere(feld);
    IO.println("feld[0] nach dem Aufruf: " + feld[0]);
}

/** Versucht, eine Zahl zu verändern. */
void veraendere(int pZahl) {
    pZahl = 99;
}

/** Versucht, ein Feld zu verändern. */
void veraendere(int[] pFeld) {
    pFeld[0] = 99;
}
```

:::

::::collapsible{title="Auflösung"}

```
zahl nach dem Aufruf:  10
feld[0] nach dem Aufruf: 99
```

Bei der Zahl bleibt alles beim Alten, beim Feld nicht. Und das, obwohl beide Methoden aussehen, als täten sie dasselbe.

::::

## Die Erklärung

:::snippet{#merken}
- Bei einem **elementaren Typ** (`int`, `double`, `boolean`, `char`) steht der Wert **direkt in der Variablen**. Beim Methodenaufruf bekommt der Parameter eine **Kopie** des Wertes. Ändert die Methode ihn, ändert sie nur ihre Kopie.
- Bei einem **Objekttyp** (Felder, `String`, alle eigenen Klassen) steht in der Variablen eine **Referenz** – ein Verweis auf das Objekt im Speicher. Beim Aufruf bekommt der Parameter eine Kopie **der Referenz**, nicht des Objekts. Beide Referenzen zeigen also auf **dasselbe Objekt**.

Java übergibt immer den **Wert** der Variablen. Bei Objekttypen ist dieser Wert eben eine Referenz.
:::

```
elementarer Typ                 Objekttyp
                                
zahl                            feld ──────┐
┌────┐                          ┌────┐     │
│ 10 │                          │  ● │     ▼
└────┘                          └────┘   ┌────┬────┬────┐
                                         │ 10 │ 20 │ 30 │
pZahl (Kopie)                   pFeld ───┘└────┴────┴────┘
┌────┐                          ┌────┐
│ 10 │                          │  ● │
└────┘                          └────┘
```

## Zwei Namen, ein Objekt

:::onlineide{height="560px" speed="1000000"}

```java Main.java
void main() {
    int[] erstes = {1, 2, 3};
    int[] zweites = erstes;

    zweites[0] = 99;

    IO.println("erstes[0]:  " + erstes[0]);
    IO.println("zweites[0]: " + zweites[0]);
    IO.println("erstes == zweites: " + (erstes == zweites));

    int[] drittes = {99, 2, 3};
    IO.println("erstes == drittes: " + (erstes == drittes));
    IO.println("gleicher Inhalt:   " + inhaltGleich(erstes, drittes));
}

/** Prüft, ob zwei Felder dieselben Werte in derselben Reihenfolge enthalten. */
boolean inhaltGleich(int[] pA, int[] pB) {
    if (pA.length != pB.length) {
        return false;
    }
    for (int i = 0; i < pA.length; i++) {
        if (pA[i] != pB[i]) {
            return false;
        }
    }
    return true;
}
```

:::

:::snippet{#aufgabe}
a) Erkläre, warum `erstes[0]` sich mitverändert, obwohl nur `zweites` beschrieben wurde.

b) `erstes` und `drittes` haben genau denselben Inhalt. Warum ist `erstes == drittes` trotzdem `false`?

c) Was müsste man tun, damit `zweites` eine **unabhängige** Kopie ist?
:::

::::collapsible{title="Auflösung"}

a) `int[] zweites = erstes;` kopiert nur die **Referenz**, nicht das Feld. Danach gibt es zwei Namen für dasselbe Objekt. Man nennt das **Aliasing**.

b) `==` vergleicht bei Objekttypen die Referenzen – also die Frage „ist es **dasselbe** Objekt?“. Es sind zwei verschiedene Objekte, die zufällig dasselbe enthalten.

Genau derselbe Punkt wie bei den Zeichenketten in der Einführungsphase: `==` prüft Identität, nicht Gleichheit.

c) Man muss ein neues Feld anlegen und die Werte einzeln kopieren:

```java
int[] zweites = new int[erstes.length];
for (int i = 0; i < erstes.length; i++) {
    zweites[i] = erstes[i];
}
```

::::

:::snippet{#merken}
In dieser Umgebung gibt es **kein** `Arrays.equals` und **kein** `Arrays.copyOf`. Beides musst du selbst schreiben – was didaktisch kein Verlust ist: Wer es einmal geschrieben hat, weiß, was dahintersteckt.
:::

## Objekte in Feldern

Bei Feldern von Objekten wird es doppelt referenziell.

:::onlineide{height="640px" speed="1000000"}

```java Main.java
void main() {
    Punkt[] punkte = new Punkt[2];
    punkte[0] = new Punkt(1, 1);
    punkte[1] = punkte[0];

    punkte[1].verschiebe(5, 5);

    IO.println("punkte[0]: " + punkte[0].alsText());
    IO.println("punkte[1]: " + punkte[1].alsText());

    Punkt[] kopie = flacheKopie(punkte);
    kopie[0].verschiebe(100, 100);
    IO.println("nach flacher Kopie, Original: " + punkte[0].alsText());
}

/** Legt ein neues Feld an, das auf dieselben Objekte verweist. */
Punkt[] flacheKopie(Punkt[] pPunkte) {
    Punkt[] neu = new Punkt[pPunkte.length];
    for (int i = 0; i < pPunkte.length; i++) {
        neu[i] = pPunkte[i];
    }
    return neu;
}
```

```java Punkt.java
public class Punkt {

    private int x;
    private int y;

    public Punkt(int pX, int pY) {
        x = pX;
        y = pY;
    }

    public void verschiebe(int pDx, int pDy) {
        x = x + pDx;
        y = y + pDy;
    }

    public String alsText() {
        return "(" + x + ", " + y + ")";
    }
}
```

:::

:::snippet{#merken}
Man unterscheidet zwei Arten des Kopierens:

- Eine **flache Kopie** legt ein neues Feld an, das auf **dieselben** Objekte verweist. Ändert man ein Objekt, sieht man die Änderung in beiden Feldern.
- Eine **tiefe Kopie** legt zusätzlich für jedes Objekt ein neues an. Beide Felder sind dann vollständig unabhängig.

Bei Feldern elementarer Typen fallen beide zusammen – dort gibt es keine Objekte, die man teilen könnte.
:::

## Aufgabe: Kopieren und vergleichen

:::snippet{#aufgabe}
Ergänze die Methoden so, dass alle Tests grün werden. Achte besonders auf den Unterschied zwischen flacher und tiefer Kopie.
:::

:::onlineide{height="740px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Punkt.java
public class Punkt {

    private int x;
    private int y;

    public Punkt(int pX, int pY) {
        x = pX;
        y = pY;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public void verschiebe(int pDx, int pDy) {
        x = x + pDx;
        y = y + pDy;
    }

    /** Liefert einen neuen Punkt mit denselben Koordinaten. */
    public Punkt kopie() {
        return null; // ersetze diese Zeile
    }

    /** Prüft, ob der andere Punkt dieselben Koordinaten hat. */
    public boolean istGleich(Punkt pAnderer) {
        return false; // ersetze diese Zeile
    }
}
```

```java Werkzeug.java
public class Werkzeug {

    /** Liefert ein neues Feld mit denselben Zahlen. */
    public int[] kopiere(int[] pWerte) {
        return new int[0]; // ersetze diese Zeile
    }

    /** Prüft, ob zwei Felder gleich lang sind und dieselben Werte enthalten. */
    public boolean inhaltGleich(int[] pA, int[] pB) {
        return false; // ersetze diese Zeile
    }

    /**
     * Liefert ein neues Feld, das auf dieselben Punkte verweist.
     */
    public Punkt[] flacheKopie(Punkt[] pPunkte) {
        return new Punkt[0]; // ersetze diese Zeile
    }

    /**
     * Liefert ein neues Feld mit neuen, gleichwertigen Punkten.
     */
    public Punkt[] tiefeKopie(Punkt[] pPunkte) {
        return new Punkt[0]; // ersetze diese Zeile
    }
}
```

```java WerkzeugTest.java
@Test
class WerkzeugTest {

    @Test
    void testKopiereZahlen() {
        Werkzeug w = new Werkzeug();
        int[] a = {1, 2, 3};
        int[] b = w.kopiere(a);

        assertEquals(3, b.length, "Die Kopie ist gleich lang.");
        assertEquals(2, b[1], "Und enthält dieselben Werte.");

        b[0] = 99;
        assertEquals(1, a[0], "Eine Änderung an der Kopie lässt das Original in Ruhe.");
    }

    @Test
    void testInhaltGleich() {
        Werkzeug w = new Werkzeug();
        assertTrue(w.inhaltGleich(new int[]{1, 2}, new int[]{1, 2}), "Gleicher Inhalt.");
        assertFalse(w.inhaltGleich(new int[]{1, 2}, new int[]{2, 1}), "Andere Reihenfolge.");
        assertFalse(w.inhaltGleich(new int[]{1, 2}, new int[]{1, 2, 3}), "Andere Länge.");
        assertTrue(w.inhaltGleich(new int[]{}, new int[]{}), "Zwei leere Felder sind gleich.");
    }

    @Test
    void testPunktKopie() {
        Punkt p = new Punkt(3, 4);
        Punkt q = p.kopie();

        assertEquals(3, q.getX(), "Die Kopie hat dieselbe x-Koordinate.");
        assertEquals(4, q.getY(), "Und dieselbe y-Koordinate.");

        q.verschiebe(10, 10);
        assertEquals(3, p.getX(), "Das Original bleibt unverändert.");
    }

    @Test
    void testIstGleich() {
        assertTrue(new Punkt(3, 4).istGleich(new Punkt(3, 4)), "Gleiche Koordinaten.");
        assertFalse(new Punkt(3, 4).istGleich(new Punkt(4, 3)), "Vertauschte Koordinaten.");
    }

    @Test
    void testFlacheKopie() {
        Werkzeug w = new Werkzeug();
        Punkt[] a = new Punkt[2];
        a[0] = new Punkt(1, 1);
        a[1] = new Punkt(2, 2);

        Punkt[] b = w.flacheKopie(a);
        assertEquals(2, b.length, "Die Kopie ist gleich lang.");

        b[0].verschiebe(10, 10);
        assertEquals(11, a[0].getX(),
                     "Bei einer flachen Kopie wirkt die Änderung auch im Original.");
    }

    @Test
    void testTiefeKopie() {
        Werkzeug w = new Werkzeug();
        Punkt[] a = new Punkt[2];
        a[0] = new Punkt(1, 1);
        a[1] = new Punkt(2, 2);

        Punkt[] b = w.tiefeKopie(a);
        assertEquals(2, b.length, "Die Kopie ist gleich lang.");
        assertEquals(1, b[0].getX(), "Und enthält gleichwertige Punkte.");

        b[0].verschiebe(10, 10);
        assertEquals(1, a[0].getX(),
                     "Bei einer tiefen Kopie bleibt das Original unberührt.");
    }
}
```

:::

::::collapsible{title="Tipp: Der Unterschied in einer Zeile"}

Flache Kopie: `neu[i] = pPunkte[i];` – dieselbe Referenz.

Tiefe Kopie: `neu[i] = pPunkte[i].kopie();` – ein neues Objekt.

Genau diese eine Zeile macht den ganzen Unterschied. Deshalb ist es wichtig, sich beim Programmieren immer bewusst zu machen, welche der beiden man gerade baut.

::::

:::protect{password="java-q-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Punkt.java
public Punkt kopie() {
    return new Punkt(x, y);
}

public boolean istGleich(Punkt pAnderer) {
    return x == pAnderer.getX() && y == pAnderer.getY();
}
```

```java Werkzeug.java
public class Werkzeug {

    public int[] kopiere(int[] pWerte) {
        int[] neu = new int[pWerte.length];
        for (int i = 0; i < pWerte.length; i++) {
            neu[i] = pWerte[i];
        }
        return neu;
    }

    public boolean inhaltGleich(int[] pA, int[] pB) {
        if (pA.length != pB.length) {
            return false;
        }
        for (int i = 0; i < pA.length; i++) {
            if (pA[i] != pB[i]) {
                return false;
            }
        }
        return true;
    }

    public Punkt[] flacheKopie(Punkt[] pPunkte) {
        Punkt[] neu = new Punkt[pPunkte.length];
        for (int i = 0; i < pPunkte.length; i++) {
            neu[i] = pPunkte[i];
        }
        return neu;
    }

    public Punkt[] tiefeKopie(Punkt[] pPunkte) {
        Punkt[] neu = new Punkt[pPunkte.length];
        for (int i = 0; i < pPunkte.length; i++) {
            neu[i] = pPunkte[i].kopie();
        }
        return neu;
    }
}
```

:::

## Warum das wichtig wird

:::snippet{#merken}
Referenzen sind kein Detail für Fortgeschrittene. Sie sind die Grundlage der nächsten Kapitel:

- Eine **verkettete Liste** besteht aus Knoten, von denen jeder eine Referenz auf den nächsten hält.
- Ein **Baum** ist ein Knoten mit Referenzen auf zwei Teilbäume.
- Ein **Graph** ist eine Menge von Knoten mit Referenzen aufeinander.

Ohne Referenzen gäbe es keine dynamischen Datenstrukturen. Und dass `null` bedeutet „hier geht es nicht weiter“, ist dort die zentrale Abbruchbedingung.
:::

## Zusatzaufgabe

:::snippet{#brain}
Die Klasse `Punkt` hat jetzt eine Methode `istGleich`. In echtem Java heißt so eine Methode üblicherweise `equals`.

a) Benenne sie um und schreibe die Tests entsprechend.

b) Probiere aus, was passiert, wenn du zwei gleiche Punkte mit `==` vergleichst, obwohl du `equals` definiert hast.

c) Erkläre, warum das Umbenennen allein nicht ausreicht, damit `==` plötzlich Inhalte vergleicht – und warum das gut so ist.
:::

---

## Selbsttest

::::multievent

**1. Was steht bei einem Objekttyp in der Variablen?**

{r1{das Objekt selbst}}

{r1{!eine Referenz auf das Objekt}}

{r1{eine Kopie des Objekts}}

{h{Deshalb konnte die Methode das Feld des Aufrufers verändern.}}
{H{Richtig!}}

**2. Warum verändert eine Methode ein übergebenes Feld, eine übergebene Zahl aber nicht?**

{r2{weil Felder größer sind}}

{r2{!weil bei Objekttypen die Referenz kopiert wird und beide auf dasselbe Objekt zeigen}}

{r2{weil Java Felder immer zurückgibt}}

{h{Kopiert wird in beiden Fällen - die Frage ist, was kopiert wird.}}
{H{Richtig!}}

**3. Wie nennt man es, wenn zwei Variablen auf dasselbe Objekt verweisen?**

{r3{Vererbung}}

{r3{!Aliasing}}

{r3{Polymorphie}}

{h{Es sind zwei Namen für dieselbe Sache.}}
{H{Richtig!}}

**4. Was unterscheidet eine tiefe von einer flachen Kopie?**

{r4{die Länge des Feldes}}

{r4{!bei der tiefen Kopie werden auch die enthaltenen Objekte neu angelegt}}

{r4{die tiefe Kopie ist schneller}}

{h{Bei der flachen zeigen beide Felder auf dieselben Objekte.}}
{H{Richtig!}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Bei Objekttypen vergleicht das doppelte Gleichheitszeichen die Identität.}}

{c1{!Zwei verschiedene Objekte können denselben Inhalt haben.}}

{c1{!Bei Feldern elementarer Typen fallen flache und tiefe Kopie zusammen.}}

{c1{Eine Zuweisung zwischen zwei Feldvariablen kopiert die Werte.}}

{h{Sie kopiert nur die Referenz.}}
{H{Richtig!}}

::::
