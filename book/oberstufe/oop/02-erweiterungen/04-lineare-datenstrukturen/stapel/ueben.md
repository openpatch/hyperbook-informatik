---
name: Übungsstunde
index: 6
lang: de
permaid: java-stapel-ueben
scripts:
  - /wc/oop-stapel-schlange.js
---

# Übungsstunde

Aufbau und Handhabung des Stapels habt ihr gemeinsam erarbeitet. In dieser Stunde suchst du dir einen von zwei Wegen aus.

| Weg | Was du machst | Wohin |
| --- | --- | --- |
| **Sicher werden** | kleine Aufgaben ohne Projekt, Schritt für Schritt schwieriger, mit Tests zur Rückmeldung | weiter auf dieser Seite |
| **Im Spiel anwenden** | eine Mechanik mit einem Stapel in dein eigenes Spiel einbauen | [Spielwerkstatt: Kisten schieben und zurücknehmen](/projekte/spielwerkstatt/21-kisten) und die [Mechaniken mit einem Stapel](/projekte/spielwerkstatt/13-lineare-datenstrukturen#mechaniken-mit-einem-stapel) |

Beide Wege üben dasselbe: einen Stapel über seine vier Methoden benutzen. Du kannst sie auch wechseln.

## Stufe 1: Zustand verfolgen

:::snippet{#aufgabe}
Auf beiden Stapeln liegt schon etwas – das zuletzt Genannte oben. Sage für jede Folge voraus, was `top()` und `isEmpty()` liefern, trage es ein und lass die Folge ablaufen. Zeichne nach jedem Schritt den Stapel.
:::

<oop-stapel-schlange id="stapel-ueben-1" modus="stapel" inhalt="Anna, Ben" folge='push("Cem"); top(); pop(); top(); push("Dora"); pop(); top(); isEmpty()'></oop-stapel-schlange>

<oop-stapel-schlange id="stapel-ueben-2" modus="stapel" inhalt="Emil" folge='pop(); isEmpty(); top(); push("Fia"); push("Gus"); pop(); top(); pop(); isEmpty()'></oop-stapel-schlange>

::::protect{password="java-q-4-st-u-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Erste Folge:** `top()` liefert nacheinander **Cem**, **Ben** und **Ben**, `isEmpty()` am Ende **false**. Am Schluss liegen wieder Anna und Ben auf dem Stapel, Ben oben.

**Zweite Folge:** Nach dem ersten `pop()` ist der Stapel leer: `isEmpty()` liefert **true**, `top()` liefert **null**. Danach liefert `top()` **Fia**, und das letzte `isEmpty()` liefert wieder **true**.

::::

## Stufe 2: Code und Struktogramme lesen

:::snippet{#aufgabe}
Auf den Stapel wurden nacheinander `"a"`, `"b"` und `"c"` gelegt.

a) Was liefert `raten(stapel)`? Beschreibe in einem Satz, was die Methode allgemein tut.

b) Ist der Stapel nach dem Aufruf noch derselbe?

```java
String raten(Stack<String> pStapel) {
    String ergebnis = "";
    while (!pStapel.isEmpty()) {
        ergebnis = ergebnis + pStapel.top();
        pStapel.pop();
    }
    return ergebnis;
}
```

c) Auf einem Stapel liegen Anna, Ben und Cem, Cem oben. Wie sieht er aus, nachdem `tauscheOben` aus dem Struktogramm aufgerufen wurde?

d) Wozu dient der innere Sonst-Zweig?

e) Schreibe `tauscheOben` als Java-Methode `void tauscheOben(Stack<String> pStapel)`.
:::

:::struktolab{fontSize=15}
```
funktion tauscheOben(pStapel):
    falls nicht pStapel.isEmpty():
        erstes = pStapel.top()
        pStapel.pop()
        falls nicht pStapel.isEmpty():
            zweites = pStapel.top()
            pStapel.pop()
            pStapel.push(erstes)
            pStapel.push(zweites)
        sonst:
            pStapel.push(erstes)
    sonst:
```
:::

::::protect{password="java-q-4-st-u-2" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `"cba"`. Die Methode hängt die Elemente von oben nach unten aneinander – also in umgekehrter Reihenfolge des Auflegens.

b) Nein. Die Methode arbeitet den Stapel ab, danach ist er leer.

c) Von oben nach unten: Ben, Cem, Anna. Die beiden obersten Elemente haben die Plätze getauscht.

d) Liegt nur **ein** Element auf dem Stapel, gibt es nichts zu tauschen. Das schon heruntergenommene Element muss dann wieder zurück, sonst ginge es verloren.

e)

```java
void tauscheOben(Stack<String> pStapel) {
    if (!pStapel.isEmpty()) {
        String erstes = pStapel.top();
        pStapel.pop();
        if (!pStapel.isEmpty()) {
            String zweites = pStapel.top();
            pStapel.pop();
            pStapel.push(erstes);
            pStapel.push(zweites);
        } else {
            pStapel.push(erstes);
        }
    }
}
```

::::

## Stufe 3: Fehler finden

:::snippet{#aufgabe}
Jede der drei Methoden enthält genau einen Fehler. Beschreibe, was beim Aufruf mit dem Stapel Anna, Ben, Cem (Cem oben) passiert, und verbessere die Methode.

a) Die Methode soll alle Namen ausgeben.

```java
void ausgeben(Stack<String> pStapel) {
    while (!pStapel.isEmpty()) {
        IO.println(pStapel.top());
    }
}
```

b) Die Methode soll die Anzahl liefern und den Stapel erhalten.

```java
int anzahl(Stack<String> pStapel) {
    Stack<String> hilf = new Stack<String>();
    int zaehler = 0;
    while (!pStapel.isEmpty()) {
        hilf.push(pStapel.top());
        pStapel.pop();
        zaehler++;
    }
    return zaehler;
}
```

c) Die Methode soll liefern, ob oben `pWert` liegt. Mit Anna, Ben, Cem funktioniert sie. Wann nicht?

```java
boolean obenIst(Stack<String> pStapel, String pWert) {
    return pStapel.top().equals(pWert);
}
```
:::

::::protect{password="java-q-4-st-u-3" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es fehlt `pStapel.pop();` in der Schleife. Der Stapel wird nie leer, das Programm gibt endlos `Cem` aus.

b) Die Zahl stimmt, aber das Zurückschichten fehlt. Danach ist `pStapel` leer, alle Namen liegen auf `hilf` – und `hilf` verschwindet mit dem Ende der Methode. Nach der Schleife gehört die zweite Schleife aus dem Werkzeugkasten hinein.

c) Bei einem **leeren** Stapel liefert `top()` den Wert `null`, und `null.equals(...)` bricht mit einer `NullPointerException` ab. Richtig ist:

```java
boolean obenIst(Stack<String> pStapel, String pWert) {
    return !pStapel.isEmpty() && pStapel.top().equals(pWert);
}
```

Weil `&&` von links nach rechts ausgewertet wird und bei `false` aufhört, wird `top()` bei einem leeren Stapel gar nicht erst aufgerufen.

::::

## Stufe 4: Methoden schreiben

:::snippet{#aufgabe}
Implementiere die Methoden der Klasse `Uebungen`, bis alle Tests im Reiter **Testrunner** grün sind. Fang oben an – die Aufgaben werden nach unten schwieriger.

a) `int summe(Stack<Integer> pZahlen)` liefert die Summe aller Zahlen. Der Stapel darf dabei leer werden.

b) `int zaehle(Stack<String> pStapel, String pGesucht)` liefert, wie oft `pGesucht` vorkommt. Der Stapel bleibt unverändert.

c) `int maximum(Stack<Integer> pZahlen)` liefert die größte Zahl. Der Stapel enthält mindestens eine Zahl und bleibt unverändert.

d) `void entferneAlle(Stack<String> pStapel, String pWert)` entfernt jedes Vorkommen von `pWert`. Die übrigen Elemente behalten ihre Reihenfolge.

e) `Stack<String> kopie(Stack<String> pStapel)` liefert einen neuen Stapel mit denselben Elementen **in derselben Reihenfolge**. Der übergebene Stapel bleibt unverändert.
:::

:::snippet{#aufgabe}
f) Bevor du `kopie` programmierst: Entwirf im Editor zuerst ein Struktogramm. Setze es danach um.
:::

:::struktolab{mode="edit" fontSize=15 id="stapel-struktogramm-kopie"}
```
funktion kopie(pStapel):
```
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="stapel-uebungen"}

```java Main.java
void main() {
    Stack<Integer> zahlen = new Stack<Integer>();
    zahlen.push(3);
    zahlen.push(8);
    zahlen.push(5);

    Uebungen u = new Uebungen();
    IO.println("Maximum: " + u.maximum(zahlen));
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Uebungen.java
public class Uebungen {

    public int summe(Stack<Integer> pZahlen) {
        return 0; // ersetze diese Zeile
    }

    public int zaehle(Stack<String> pStapel, String pGesucht) {
        return 0; // ersetze diese Zeile
    }

    public int maximum(Stack<Integer> pZahlen) {
        return 0; // ersetze diese Zeile
    }

    public void entferneAlle(Stack<String> pStapel, String pWert) {

    }

    public Stack<String> kopie(Stack<String> pStapel) {
        return new Stack<String>(); // ersetze diese Zeile
    }
}
```

```java UebungenTest.java
@Test
class UebungenTest {

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

    Stack<Integer> zahlen() {
        Stack<Integer> z = new Stack<Integer>();
        z.push(3);
        z.push(8);
        z.push(5);
        return z;
    }

    @Test
    void testSumme() {
        Uebungen u = new Uebungen();
        assertEquals(16, u.summe(zahlen()), "3 + 8 + 5 = 16");
        assertEquals(0, u.summe(new Stack<Integer>()), "Die Summe des leeren Stapels ist 0.");
    }

    @Test
    void testZaehle() {
        Uebungen u = new Uebungen();
        Stack<String> stapel = baue(new String[]{"Anna", "Ben", "Anna", "Cem", "Anna"});
        assertEquals(3, u.zaehle(stapel, "Anna"), "Anna liegt dreimal auf dem Stapel.");
        assertEquals("Anna, Cem, Anna, Ben, Anna", inhalt(stapel), "Nach zaehle muss der Stapel unveraendert sein.");
        assertEquals(0, u.zaehle(new Stack<String>(), "Anna"), "Auf dem leeren Stapel liegt niemand.");
    }

    @Test
    void testMaximum() {
        Uebungen u = new Uebungen();
        Stack<Integer> z = zahlen();
        assertEquals(8, u.maximum(z), "Die groesste Zahl ist 8.");
        assertEquals(5, z.top(), "Nach maximum muss die 5 wieder oben liegen.");
        Stack<Integer> eine = new Stack<Integer>();
        eine.push(-4);
        assertEquals(-4, u.maximum(eine), "Bei nur einer Zahl ist sie das Maximum - auch wenn sie negativ ist.");
    }

    @Test
    void testEntferneAlle() {
        Uebungen u = new Uebungen();
        Stack<String> stapel = baue(new String[]{"Anna", "Ben", "Anna", "Cem", "Anna"});
        u.entferneAlle(stapel, "Anna");
        assertEquals("Cem, Ben", inhalt(stapel), "Alle Annas sind weg, Cem liegt weiter ueber Ben.");
        stapel = baue(new String[]{"Ben", "Cem"});
        u.entferneAlle(stapel, "Dora");
        assertEquals("Cem, Ben", inhalt(stapel), "Ohne Treffer bleibt der Stapel unveraendert.");
    }

    @Test
    void testKopie() {
        Uebungen u = new Uebungen();
        Stack<String> original = baue(new String[]{"Anna", "Ben", "Cem"});
        Stack<String> kopie = u.kopie(original);
        assertEquals("Cem, Ben, Anna", inhalt(kopie), "Die Kopie hat dieselbe Reihenfolge.");
        assertEquals("Cem, Ben, Anna", inhalt(original), "Das Original ist unveraendert.");
        kopie.pop();
        assertEquals("Cem, Ben, Anna", inhalt(original), "Die Kopie ist ein eigener Stapel: Entfernen aus der Kopie aendert das Original nicht.");
    }
}
```

:::

::::collapsible{title="Tipp: Welches Muster brauche ich?" id="stapel-ueben-tipp-muster"}

Schau im [Werkzeugkasten](./handhabung) nach.

- **summe** darf den Stapel leeren – das Muster **Abarbeiten** genügt.
- **zaehle** und **maximum** sollen den Stapel erhalten – das Muster **Erhalten**. Beim Maximum startest du mit dem obersten Element, nicht mit 0.
- **entferneAlle** ist das Muster **Erhalten** mit einer Bedingung: Was entfernt werden soll, kommt nicht auf den Hilfsstapel.
- **kopie**: Auf dem Hilfsstapel liegt alles verkehrt herum. Lege die Elemente deshalb erst beim **Zurückschichten** zusätzlich auf die Kopie.

::::

::::protect{password="java-q-4-st-u-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Struktogramm zu `kopie`:**

:::struktolab{fontSize=15}
```
funktion kopie(pStapel):
    hilf = neuer Stapel
    kopie = neuer Stapel
    wiederhole solange nicht pStapel.isEmpty():
        hilf.push(pStapel.top())
        pStapel.pop()
    wiederhole solange nicht hilf.isEmpty():
        pStapel.push(hilf.top())
        kopie.push(hilf.top())
        hilf.pop()
    gib kopie zurück
```
:::

**Quelltext:**

```java
public int summe(Stack<Integer> pZahlen) {
    int summe = 0;
    while (!pZahlen.isEmpty()) {
        summe = summe + pZahlen.top();
        pZahlen.pop();
    }
    return summe;
}

public int zaehle(Stack<String> pStapel, String pGesucht) {
    Stack<String> hilf = new Stack<String>();
    int anzahl = 0;
    while (!pStapel.isEmpty()) {
        String oben = pStapel.top();
        pStapel.pop();
        if (oben.equals(pGesucht)) {
            anzahl++;
        }
        hilf.push(oben);
    }
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        hilf.pop();
    }
    return anzahl;
}

public int maximum(Stack<Integer> pZahlen) {
    Stack<Integer> hilf = new Stack<Integer>();
    int max = pZahlen.top();
    while (!pZahlen.isEmpty()) {
        int oben = pZahlen.top();
        pZahlen.pop();
        if (oben > max) {
            max = oben;
        }
        hilf.push(oben);
    }
    while (!hilf.isEmpty()) {
        pZahlen.push(hilf.top());
        hilf.pop();
    }
    return max;
}

public void entferneAlle(Stack<String> pStapel, String pWert) {
    Stack<String> hilf = new Stack<String>();
    while (!pStapel.isEmpty()) {
        String oben = pStapel.top();
        pStapel.pop();
        if (!oben.equals(pWert)) {
            hilf.push(oben);
        }
    }
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        hilf.pop();
    }
}

public Stack<String> kopie(Stack<String> pStapel) {
    Stack<String> hilf = new Stack<String>();
    Stack<String> kopie = new Stack<String>();
    while (!pStapel.isEmpty()) {
        hilf.push(pStapel.top());
        pStapel.pop();
    }
    while (!hilf.isEmpty()) {
        pStapel.push(hilf.top());
        kopie.push(hilf.top());
        hilf.pop();
    }
    return kopie;
}
```

- **`maximum` startet mit dem obersten Element.** Wer mit `0` startet, liefert bei lauter negativen Zahlen ein falsches Ergebnis.
- **`kopie` legt erst beim Zurückschichten auf.** Wer schon in der ersten Schleife auf die Kopie legt, bekommt sie verkehrt herum – das ist `umgedreht` aus [Mit dem Stapel arbeiten](./handhabung).

::::

## Stufe 5: Knobelaufgabe

:::snippet{#aufgabe}
**Rechnen ohne Klammern.** In der *umgekehrten polnischen Notation* (UPN) steht das Rechenzeichen **hinter** den beiden Zahlen: `34+` bedeutet 3 + 4, und `34+2*` bedeutet (3 + 4) · 2 = 14. Klammern braucht man nie.

Ausgewertet wird mit einem Stapel: Eine Zahl wird aufgelegt. Ein Rechenzeichen nimmt die beiden obersten Zahlen herunter, rechnet und legt das Ergebnis auf. Am Ende liegt das Ergebnis allein auf dem Stapel.

Implementiere `int upn(String pAusdruck)` für einstellige Zahlen und die Zeichen `+`, `-` und `*`. Beispiele: `34+2*` ergibt 14, `52-` ergibt 3, `234*+` ergibt 14.
:::

:::onlineide{libraries="nrw" height="560px" speed="1000000" id="stapel-upn"}

```java Main.java
void main() {
    IO.println("34+2*  = " + upn("34+2*"));
    IO.println("52-    = " + upn("52-"));
    IO.println("234*+  = " + upn("234*+"));
}

int upn(String pAusdruck) {
    return 0; // ersetze diese Zeile
}
```

:::

::::collapsible{title="Tipp" id="stapel-upn-tipp"}

- `pAusdruck.substring(i, i + 1)` liefert das Zeichen an der Stelle `i`, `Integer.parseInt(...)` macht daraus eine Zahl.
- Bei `52-` liegt die 2 oben. Die zuerst heruntergenommene Zahl ist also die **rechte**: 5 − 2, nicht 2 − 5.

::::

::::protect{password="java-q-4-st-u-5" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
int upn(String pAusdruck) {
    Stack<Integer> stapel = new Stack<Integer>();
    for (int i = 0; i < pAusdruck.length(); i++) {
        String zeichen = pAusdruck.substring(i, i + 1);
        if (zeichen.equals("+") || zeichen.equals("-") || zeichen.equals("*")) {
            int rechts = stapel.top();
            stapel.pop();
            int links = stapel.top();
            stapel.pop();
            if (zeichen.equals("+")) {
                stapel.push(links + rechts);
            } else if (zeichen.equals("-")) {
                stapel.push(links - rechts);
            } else {
                stapel.push(links * rechts);
            }
        } else {
            stapel.push(Integer.parseInt(zeichen));
        }
    }
    return stapel.top();
}
```

Taschenrechner und viele Übersetzer gehen genau so vor: Sie übersetzen einen Ausdruck mit Klammern zuerst in UPN und werten ihn dann mit einem Stapel aus.

::::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Stapel) (I)".
     Differenzierung: Übungsweg "Sicher werden" neben dem Spielwerkstatt-Weg. -->

---

## Selbsttest

::::multievent

**1. Auf einem Stapel liegen Anna, Ben und Cem, Cem oben. Es wird einmal pop und einmal push mit Dora ausgeführt. Was liefert top?**

{r1{Anna}}

{r1{Cem}}

{r1{!Dora}}

{h{Entfernt und aufgelegt wird oben.}}
{H{Richtig!}}

**2. Was liefert top bei einem leeren Stapel?**

{r2{einen Fehler}}

{r2{!den Wert null}}

{r2{das zuletzt entfernte Element}}

{h{Die Dokumentation legt das ausdrücklich fest.}}
{H{Richtig! Wer danach equals aufruft, bekommt allerdings eine NullPointerException.}}

**3. Eine Methode soll einen Stapel erhalten und schichtet ihn auf einen Hilfsstapel um. Was fehlt, wenn der Stapel danach leer ist?**

{r3{eine Zählvariable}}

{r3{!das Zurückschichten vom Hilfsstapel}}

{r3{ein Aufruf von isEmpty}}

{h{Wo liegen die Elemente nach der ersten Schleife?}}
{H{Richtig!}}

**4. In welcher Reihenfolge liegen die Elemente auf einem Hilfsstapel, auf den ein Stapel komplett umgeschichtet wurde?**

{r4{in derselben Reihenfolge}}

{r4{!in umgekehrter Reihenfolge}}

{r4{das hängt vom Inhalt ab}}

{h{Was oben lag, landet unten.}}
{H{Richtig!}}

::::
