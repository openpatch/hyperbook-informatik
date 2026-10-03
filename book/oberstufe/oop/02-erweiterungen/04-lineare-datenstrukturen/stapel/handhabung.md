---
name: Mit dem Stapel arbeiten
index: 4
lang: de
permaid: java-stapel-handhabung
---

# Mit dem Stapel arbeiten

Wie bei der Schlange benutzt du den Stapel im Abitur nur über seine vier Methoden – `push`, `top`, `pop` und `isEmpty` aus der [Dokumentation](./dokumentation). In der Online-IDE steht die Abiturklasse `Stack` bereit, sobald ein Block die NRW-Bibliothek lädt.

:::snippet{#merken}
**Werkzeugkasten: zwei Muster**

Das **Abarbeiten** nimmt oben herunter, bis nichts mehr da ist. Danach ist der Stapel **leer**.

```java
while (!pStapel.isEmpty()) {
    String oben = pStapel.top();   // erst nachsehen ...
    pStapel.pop();                 // ... dann entfernen
    // oben verarbeiten
}
```

Das **Erhalten** legt jedes Element zusätzlich auf einen Hilfsstapel und schichtet am Ende zurück. Danach ist der Stapel **wie vorher**.

```java
Stack<String> hilf = new Stack<String>();
while (!pStapel.isEmpty()) {
    String oben = pStapel.top();
    pStapel.pop();
    // oben verarbeiten
    hilf.push(oben);
}
while (!hilf.isEmpty()) {
    pStapel.push(hilf.top());
    hilf.pop();
}
```

Auf dem Hilfsstapel liegt alles **verkehrt herum**. Erst das Zurückschichten dreht die Reihenfolge noch einmal um – und damit wieder richtig.
:::

## Aufgabe 1: Abarbeiten

:::snippet{#aufgabe}
a) Sage voraus, was das Programm ausgibt. Führe es dann aus.

b) Vertausche die beiden Zeilen in der Schleife, sodass `pop()` vor `top()` steht. Sage voraus, was nun ausgegeben wird, und prüfe.
:::

:::onlineide{libraries="nrw" height="420px" id="stapel-abarbeiten"}

```java Main.java
void main() {
    Stack<String> stapel = new Stack<String>();
    stapel.push("Anna");
    stapel.push("Ben");
    stapel.push("Cem");

    while (!stapel.isEmpty()) {
        IO.println("Oben liegt: " + stapel.top());
        stapel.pop();
    }
}
```

:::

::::protect{password="java-q-4-st-h-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `Oben liegt: Cem`, `Oben liegt: Ben`, `Oben liegt: Anna` – umgekehrt zur Reihenfolge des Auflegens. Danach ist der Stapel leer.

b) `Oben liegt: Ben`, `Oben liegt: Anna`, `Oben liegt: null`. Cem wird entfernt, bevor jemand nachgesehen hat, und beim letzten Durchlauf liefert `top()` auf dem leeren Stapel `null`. Die Regel: **erst `top`, dann `pop`.**

::::

## Aufgabe 2: Das unterste Element

Das Struktogramm beschreibt die Methode `unterstes`. Sie liefert das Element, das ganz unten liegt, bei einem leeren Stapel `null`. Der Stapel soll danach **unverändert** sein.

:::struktolab{fontSize=15}
```
funktion unterstes(pStapel):
    hilf = neuer Stapel
    unten = null
    wiederhole solange nicht pStapel.isEmpty():
        unten = pStapel.top()
        hilf.push(unten)
        pStapel.pop()
    wiederhole solange nicht hilf.isEmpty():
        pStapel.push(hilf.top())
        hilf.pop()
    gib unten zurück
```
:::

:::snippet{#aufgabe}
a) Verfolge das Struktogramm für einen Stapel, auf den nacheinander Anna, Ben und Cem gelegt wurden. Zeichne nach jeder Schleife, wie `pStapel` und `hilf` aussehen.

b) Setze das Struktogramm in der Klasse `Stapelwerkzeug` unten als Methode `String unterstes(Stack<String> pStapel)` in Java um. Prüfe mit dem Reiter **Testrunner**.
:::

## Aufgabe 3: Klammern prüfen – erst das Struktogramm

Ein Übersetzer muss feststellen, ob die Klammern eines Ausdrucks richtig gesetzt sind. Gültig sind `()`, `[]` und `{}`, beliebig geschachtelt: `(a + [b * c]) - {d}` ist in Ordnung, `(a + [b * c)]` nicht.

:::snippet{#aufgabe}
a) Begründe, warum ein Stapel dafür genau die richtige Struktur ist.

b) Beschreibe das Verfahren in Worten: Was tust du bei einer öffnenden, was bei einer schließenden Klammer? Woran erkennst du am **Ende**, dass der Ausdruck gültig war?

c) Entwirf im Editor ein Struktogramm für `klammernOk(pText)`.

d) Setze es in der Klasse `Stapelwerkzeug` als `boolean klammernOk(String pText)` um, bis die Tests zu `klammernOk` grün sind.
:::

:::struktolab{mode="edit" fontSize=15 id="stapel-struktogramm-klammern"}
```
funktion klammernOk(pText):
```
:::

::::collapsible{title="Tipp 1: Das Verfahren" id="stapel-tipp-klammern-verfahren"}

- Öffnende Klammer: auf den Stapel legen.
- Schließende Klammer: Der Stapel darf nicht leer sein, und oben muss die passende öffnende Klammer liegen. Dann wird sie heruntergenommen.
- Alle anderen Zeichen: nichts tun.
- Am Ende: Der Stapel muss **leer** sein.

::::

::::collapsible{title="Tipp 2: Einzelne Zeichen" id="stapel-tipp-klammern-zeichen"}

`pText.substring(i, i + 1)` liefert das Zeichen an der Stelle `i` als `String`. So kann es direkt auf einen `Stack<String>` gelegt und mit `equals` verglichen werden.

Eine kleine Hilfsmethode macht den Vergleich übersichtlich:

```java
boolean passt(String pOffen, String pZu) {
    return pOffen.equals("(") && pZu.equals(")")
        || pOffen.equals("[") && pZu.equals("]")
        || pOffen.equals("{") && pZu.equals("}");
}
```

::::

:::snippet{#brain}
**Weiterdenken:**

e) `Stack<String> umgedreht(Stack<String> pStapel)` liefert einen **neuen** Stapel mit denselben Elementen in umgekehrter Reihenfolge. Der übergebene Stapel bleibt unverändert.

f) `void einfuegenUnten(Stack<String> pStapel, String pWert)` legt `pWert` ganz **unten** in den Stapel.
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="stapel-werkzeug"}

```java Main.java
void main() {
    Stack<String> stapel = new Stack<String>();
    stapel.push("Anna");
    stapel.push("Ben");
    stapel.push("Cem");

    Stapelwerkzeug werkzeug = new Stapelwerkzeug();
    IO.println("Unten liegt: " + werkzeug.unterstes(stapel));
    IO.println("Oben liegt noch: " + stapel.top());
    IO.println("(a + [b * c]) - {d}: " + werkzeug.klammernOk("(a + [b * c]) - {d}"));
}
```

```java Stapelwerkzeug.java
public class Stapelwerkzeug {

    /** Liefert das unterste Element oder null. Der Stapel bleibt unveraendert. */
    public String unterstes(Stack<String> pStapel) {
        return null; // ersetze diese Zeile
    }

    /** Liefert true, wenn alle Klammern in pText richtig gesetzt sind. */
    public boolean klammernOk(String pText) {
        return false; // ersetze diese Zeile
    }

    /** Weiterdenken: liefert einen neuen Stapel in umgekehrter Reihenfolge. */
    public Stack<String> umgedreht(Stack<String> pStapel) {
        return new Stack<String>(); // ersetze diese Zeile
    }

    /** Weiterdenken: legt pWert ganz unten in den Stapel. */
    public void einfuegenUnten(Stack<String> pStapel, String pWert) {

    }
}
```

```java StapelwerkzeugTest.java
@Test
class StapelwerkzeugTest {

    // Legt die Namen der Reihe nach auf - der letzte liegt oben.
    Stack<String> baue(String[] pNamen) {
        Stack<String> stapel = new Stack<String>();
        for (int i = 0; i < pNamen.length; i++) {
            stapel.push(pNamen[i]);
        }
        return stapel;
    }

    // Liest den Stapel von oben nach unten als Text aus und stellt ihn wieder her.
    String inhalt(Stack<String> pStapel) {
        Stack<String> hilf = new Stack<String>();
        String text = "";
        while (!pStapel.isEmpty()) {
            if (!text.equals("")) {
                text = text + ", ";
            }
            text = text + pStapel.top();
            hilf.push(pStapel.top());
            pStapel.pop();
        }
        while (!hilf.isEmpty()) {
            pStapel.push(hilf.top());
            hilf.pop();
        }
        return text;
    }

    @Test
    void testUnterstes() {
        Stapelwerkzeug w = new Stapelwerkzeug();
        Stack<String> stapel = baue(new String[]{"Anna", "Ben", "Cem"});
        assertEquals("Anna", w.unterstes(stapel), "Anna wurde zuerst aufgelegt und liegt unten.");
        assertEquals("Cem, Ben, Anna", inhalt(stapel), "Nach unterstes muss der Stapel unveraendert sein.");
        assertEquals("Anna", w.unterstes(baue(new String[]{"Anna"})), "Ein einziges Element liegt oben und unten zugleich.");
        assertEquals(null, w.unterstes(new Stack<String>()), "Der leere Stapel hat kein unterstes Element.");
    }

    @Test
    void testKlammernOk() {
        Stapelwerkzeug w = new Stapelwerkzeug();
        assertTrue(w.klammernOk("(a + [b * c]) - {d}"), "(a + [b * c]) - {d} ist richtig geklammert.");
        assertTrue(w.klammernOk("abc"), "Ohne Klammern ist nichts falsch.");
        assertTrue(w.klammernOk(""), "Der leere Text ist richtig geklammert.");
        assertFalse(w.klammernOk("(a + [b * c)]"), "In (a + [b * c)] passt die zweite schliessende Klammer nicht.");
        assertFalse(w.klammernOk("((a)"), "In ((a) bleibt eine Klammer offen.");
        assertFalse(w.klammernOk("a)"), "In a) wird eine Klammer geschlossen, die nie geoeffnet wurde.");
    }

    @Test
    void testUmgedreht() {
        Stapelwerkzeug w = new Stapelwerkzeug();
        Stack<String> stapel = baue(new String[]{"Anna", "Ben", "Cem"});
        Stack<String> neu = w.umgedreht(stapel);
        assertEquals("Anna, Ben, Cem", inhalt(neu), "Im neuen Stapel liegt Anna oben.");
        assertEquals("Cem, Ben, Anna", inhalt(stapel), "Der uebergebene Stapel ist unveraendert.");
    }

    @Test
    void testEinfuegenUnten() {
        Stapelwerkzeug w = new Stapelwerkzeug();
        Stack<String> stapel = baue(new String[]{"Anna", "Ben", "Cem"});
        w.einfuegenUnten(stapel, "Zoe");
        assertEquals("Cem, Ben, Anna, Zoe", inhalt(stapel), "Zoe liegt jetzt ganz unten.");
        stapel = new Stack<String>();
        w.einfuegenUnten(stapel, "Zoe");
        assertEquals("Zoe", inhalt(stapel), "Auf dem leeren Stapel liegt Zoe allein.");
    }
}
```

:::

::::protect{password="java-q-4-st-h-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Aufgabe 2 a)** Nach der ersten Schleife ist `pStapel` leer, auf `hilf` liegen von oben nach unten Anna, Ben, Cem – verkehrt herum. In `unten` steht Anna, das zuletzt heruntergenommene Element. Nach der zweiten Schleife liegen auf `pStapel` wieder Cem, Ben, Anna, und `hilf` ist leer.

**Aufgabe 3 a)** Klammern sind **geschachtelt**: Die zuletzt geöffnete muss als erste wieder geschlossen werden – wörtlich das LIFO-Prinzip. Mit einer Schlange käme die **erste** Klammer zuerst heraus, und `([)]` ginge fälschlich als gültig durch.

**Aufgabe 3 b)** Öffnende Klammern werden aufgelegt. Bei einer schließenden muss oben die passende öffnende liegen; dann wird sie heruntergenommen. Gültig ist der Ausdruck, wenn kein Fehler aufgetreten ist **und** der Stapel am Ende leer ist. Es gibt drei Fehlerfälle: eine schließende Klammer bei leerem Stapel, eine schließende Klammer, die nicht zur obersten passt, und offene Klammern, die am Ende übrig bleiben.

**Aufgabe 3 c)** Ein mögliches Struktogramm:

:::struktolab{fontSize=15}
```
funktion klammernOk(pText):
    stapel = neuer Stapel
    wiederhole für i = 0 bis pText.length() - 1:
        zeichen = pText.substring(i, i + 1)
        falls zeichen ist "(", "[" oder "{":
            stapel.push(zeichen)
        sonst:
            falls zeichen ist ")", "]" oder "}":
                falls stapel.isEmpty() oder nicht passt(stapel.top(), zeichen):
                    gib falsch zurück
                sonst:
                stapel.pop()
            sonst:
    gib stapel.isEmpty() zurück
```
:::

**Quelltext zu allen Methoden:**

```java
public String unterstes(Stack<String> pStapel) {
    Stack<String> hilf = new Stack<String>();
    String unten = null;
    while (!pStapel.isEmpty()) {
        unten = pStapel.top();
        hilf.push(unten);
        pStapel.pop();
    }
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        hilf.pop();
    }
    return unten;
}

public boolean klammernOk(String pText) {
    Stack<String> stapel = new Stack<String>();
    for (int i = 0; i < pText.length(); i++) {
        String zeichen = pText.substring(i, i + 1);
        if (zeichen.equals("(") || zeichen.equals("[") || zeichen.equals("{")) {
            stapel.push(zeichen);
        } else if (zeichen.equals(")") || zeichen.equals("]") || zeichen.equals("}")) {
            if (stapel.isEmpty() || !passt(stapel.top(), zeichen)) {
                return false;
            }
            stapel.pop();
        }
    }
    return stapel.isEmpty();
}

public boolean passt(String pOffen, String pZu) {
    return pOffen.equals("(") && pZu.equals(")")
        || pOffen.equals("[") && pZu.equals("]")
        || pOffen.equals("{") && pZu.equals("}");
}

public Stack<String> umgedreht(Stack<String> pStapel) {
    Stack<String> hilf = new Stack<String>();
    Stack<String> ergebnis = new Stack<String>();
    while (!pStapel.isEmpty()) {
        String oben = pStapel.top();
        pStapel.pop();
        hilf.push(oben);
        ergebnis.push(oben);
    }
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        hilf.pop();
    }
    return ergebnis;
}

public void einfuegenUnten(Stack<String> pStapel, String pWert) {
    Stack<String> hilf = new Stack<String>();
    while (!pStapel.isEmpty()) {
        hilf.push(pStapel.top());
        pStapel.pop();
    }
    pStapel.push(pWert);
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        hilf.pop();
    }
}
```

Worauf es ankam:

- **`return false` mitten in der Schleife ist hier in Ordnung.** Anders als bei `enthaelt` gehört der Stapel der Methode selbst – niemand braucht ihn danach noch.
- **`umgedreht` füllt den Ergebnisstapel schon in der ersten Schleife.** Dort kommt das oberste Element zuerst heraus und landet damit ganz unten im Ergebnis.
- **`einfuegenUnten` legt den neuen Wert auf den leeren Stapel**, bevor zurückgeschichtet wird – so landet er unter allen anderen.

::::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Stapel) (I)".
     Aufgabenformat wie im Zentralabitur: Methode mit übergebener Struktur, Struktur soll unverändert bleiben. -->

---

## Selbsttest

::::multievent

**1. In welcher Reihenfolge ruft man die Methoden auf, um das oberste Element zu verarbeiten?**

{r1{erst pop, dann top}}

{r1{!erst top, dann pop}}

{r1{nur pop}}

{h{Nach dem Entfernen kommt man an das Element nicht mehr heran.}}
{H{Richtig!}}

**2. Auf einen Hilfsstapel werden nacheinander alle Elemente eines Stapels gelegt. Wie liegen sie dort?**

{r2{in derselben Reihenfolge}}

{r2{!in umgekehrter Reihenfolge}}

{r2{sortiert}}

{h{Was oben lag, kommt zuerst herunter und landet unten.}}
{H{Richtig! Erst das Zurückschichten stellt die Reihenfolge wieder her.}}

**3. Warum passt ein Stapel zur Klammerprüfung?**

{r3{weil Klammern sortiert sein müssen}}

{r3{!weil die zuletzt geöffnete Klammer als erste geschlossen werden muss}}

{r3{weil man die Klammern zählen muss}}

{h{Denk an die Schachtelung.}}
{H{Richtig! Das ist LIFO.}}

**4. Wann ist ein Ausdruck bei der Klammerprüfung gültig?**

{r4{wenn gleich viele öffnende wie schließende Klammern vorkommen}}

{r4{!wenn jede schließende Klammer zur obersten passt und der Stapel am Ende leer ist}}

{r4{wenn der Stapel nie leer wird}}

{h{)( hat gleich viele Klammern – ist es gültig?}}
{H{Richtig!}}

::::
