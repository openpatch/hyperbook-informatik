---
name: Übungsstunde
index: 6
lang: de
permaid: java-liste-uebungen
---

# Übungsstunde

Aufbau und Handhabung der Liste habt ihr gemeinsam erarbeitet. In dieser Stunde suchst du dir einen von zwei Wegen aus.

| Weg | Was du machst | Wohin |
| --- | --- | --- |
| **Sicher werden** | kleine Aufgaben ohne Projekt, Schritt für Schritt schwieriger, mit Tests zur Rückmeldung | weiter auf dieser Seite |
| **Im Spiel anwenden** | eine Mechanik mit einer Liste in dein eigenes Spiel einbauen | [Spielwerkstatt: ein Inventar](/projekte/spielwerkstatt/22-inventar) und die [Mechaniken mit einer Liste](/projekte/spielwerkstatt/13-lineare-datenstrukturen#mechaniken-mit-einer-liste) |

Beide Wege üben dasselbe: eine Liste über ihre Methoden benutzen. Du kannst sie auch wechseln.

## Stufe 1: Zustand verfolgen

:::snippet{#aufgabe}
Das Programm erzeugt eine Liste und verändert sie. Setze die Schritte im Objektdiagramm unter dem Programm um. Achte besonders darauf, wohin `current` zeigt.
:::

```java
List<String> farbenListe = new List<String>();
// 1. Diagramm

farbenListe.append("Rot");
farbenListe.append("Blau");
farbenListe.append("Gelb");
// 2. Diagramm

farbenListe.toFirst();
farbenListe.next();
farbenListe.remove();
farbenListe.next();
farbenListe.insert("Grün");
farbenListe.append("Orange");
// 3. Diagramm
```

::jmp{id="liste-uebung-2" src="vorlage.jmp"}

## Stufe 2: Code und Struktogramme lesen

:::snippet{#aufgabe}
In der Liste stehen Anna, Ben, Cem und Dora.

a) Was liefert `raten(liste)`? Beschreibe in einem Satz, was die Methode allgemein tut.

```java
int raten(List<String> pListe) {
    int ergebnis = 0;
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().length() > 3) {
            ergebnis++;
        }
        pListe.next();
    }
    return ergebnis;
}
```

b) In der Liste stehen Anna und Ben. Wie sieht sie aus, nachdem `verdoppeln` aus dem Struktogramm aufgerufen wurde?

c) Schreibe `verdoppeln` als Java-Methode `void verdoppeln(List<String> pListe)`.
:::

:::struktolab{fontSize=15}
```
funktion verdoppeln(pListe):
    pListe.toFirst()
    wiederhole solange pListe.hasAccess():
        pListe.insert(pListe.getContent())
        pListe.next()
```
:::

::::protect{password="java-q-4-l-u-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `2`. Die Methode zählt, wie viele Einträge länger als drei Zeichen sind – hier Anna und Dora.

b) Anna, Anna, Ben, Ben. `insert` fügt **vor** dem aktuellen Element ein, das aktuelle Element bleibt dasselbe. Das folgende `next` springt deshalb über das Original hinweg zum nächsten noch nicht verdoppelten Element.

c)

```java
void verdoppeln(List<String> pListe) {
    pListe.toFirst();
    while (pListe.hasAccess()) {
        pListe.insert(pListe.getContent());
        pListe.next();
    }
}
```

::::

## Stufe 3: Fehler finden

:::snippet{#aufgabe}
Jede der drei Methoden enthält genau einen Fehler. Beschreibe, was beim Aufruf mit der Liste Anna, Anna, Ben passiert, und verbessere die Methode.

a) Die Methode soll alle Namen ausgeben.

```java
void ausgeben(List<String> pListe) {
    pListe.toFirst();
    while (pListe.hasAccess()) {
        IO.println(pListe.getContent());
    }
}
```

b) Die Methode soll jedes Vorkommen von `pWert` entfernen.

```java
void entferneAlle(List<String> pListe, String pWert) {
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().equals(pWert)) {
            pListe.remove();
        }
        pListe.next();
    }
}
```

c) Die Methode soll das erste Element liefern. Direkt nach dem Füllen der Liste liefert sie `null`. Warum?

```java
String erstes(List<String> pListe) {
    return pListe.getContent();
}
```
:::

::::protect{password="java-q-4-l-u-2" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es fehlt `pListe.next();` in der Schleife. Das aktuelle Element bewegt sich nie, das Programm gibt endlos `Anna` aus.

b) Nach `remove` ist schon der Nachfolger aktuell, das `next` überspringt ihn. Bei Anna, Anna, Ben wird die erste Anna entfernt, die zweite übersprungen – sie bleibt stehen. Richtig ist `next` im `else`-Zweig.

c) Es fehlt `pListe.toFirst();`. Nach `append` gibt es noch kein aktuelles Element, `getContent()` liefert deshalb `null`. Richtig ist:

```java
String erstes(List<String> pListe) {
    pListe.toFirst();
    return pListe.getContent();
}
```

Bei einer leeren Liste liefert die Methode dann `null` – wie die Dokumentation es für `getContent` festlegt.

::::

## Stufe 4: Methoden schreiben

:::snippet{#aufgabe}
Implementiere die Methoden der Klasse `Uebungen`, bis alle Tests im Reiter **Testrunner** grün sind. Fang oben an – die Aufgaben werden nach unten schwieriger.

a) `int summe(List<Integer> pZahlen)` liefert die Summe aller Zahlen.

b) `int zaehle(List<String> pListe, String pGesucht)` liefert, wie oft `pGesucht` vorkommt.

c) `int maximum(List<Integer> pZahlen)` liefert die größte Zahl. Die Liste enthält mindestens eine Zahl.

d) `String letztes(List<String> pListe)` liefert das letzte Element, bei einer leeren Liste `null`. Es geht ohne Schleife.

e) `void vertauschen(List<String> pListe, int pPos1, int pPos2)` vertauscht die Elemente an den Stellen `pPos1` und `pPos2`, gezählt ab 0. Hat die Liste nicht genügend Elemente, passiert nichts.
:::

:::snippet{#aufgabe}
f) Bevor du `vertauschen` programmierst: Entwirf im Editor zuerst ein Struktogramm. Setze es danach um.
:::

:::struktolab{mode="edit" fontSize=15 id="liste-struktogramm-vertauschen"}
```
funktion vertauschen(pListe, pPos1, pPos2):
```
:::

:::onlineide{libraries="nrw" height="640px" speed="1000000" id="liste-uebungen"}

```java Main.java
void main() {
    List<Integer> zahlen = new List<Integer>();
    zahlen.append(3);
    zahlen.append(8);
    zahlen.append(5);

    Uebungen u = new Uebungen();
    IO.println("Summe: " + u.summe(zahlen));
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Uebungen.java
public class Uebungen {

    public int summe(List<Integer> pZahlen) {
        return 0; // ersetze diese Zeile
    }

    public int zaehle(List<String> pListe, String pGesucht) {
        return 0; // ersetze diese Zeile
    }

    public int maximum(List<Integer> pZahlen) {
        return 0; // ersetze diese Zeile
    }

    public String letztes(List<String> pListe) {
        return null; // ersetze diese Zeile
    }

    public void vertauschen(List<String> pListe, int pPos1, int pPos2) {

    }
}
```

```java UebungenTest.java
@Test
class UebungenTest {

    List<String> baue(String[] pNamen) {
        List<String> liste = new List<String>();
        for (int i = 0; i < pNamen.length; i++) {
            liste.append(pNamen[i]);
        }
        return liste;
    }

    // Liest die Liste von vorne nach hinten als Text aus.
    String inhalt(List<String> pListe) {
        String text = "";
        pListe.toFirst();
        while (pListe.hasAccess()) {
            if (!text.equals("")) {
                text = text + ", ";
            }
            text = text + pListe.getContent();
            pListe.next();
        }
        return text;
    }

    List<Integer> zahlen() {
        List<Integer> z = new List<Integer>();
        z.append(3);
        z.append(8);
        z.append(5);
        return z;
    }

    @Test
    void testSumme() {
        Uebungen u = new Uebungen();
        assertEquals(16, u.summe(zahlen()), "3 + 8 + 5 = 16");
        assertEquals(0, u.summe(new List<Integer>()), "Die Summe der leeren Liste ist 0.");
    }

    @Test
    void testZaehle() {
        Uebungen u = new Uebungen();
        List<String> liste = baue(new String[]{"Anna", "Ben", "Anna", "Cem", "Anna"});
        assertEquals(3, u.zaehle(liste, "Anna"), "Anna steht dreimal in der Liste.");
        assertEquals(0, u.zaehle(liste, "Dora"), "Dora kommt nicht vor.");
        assertEquals(0, u.zaehle(new List<String>(), "Anna"), "In der leeren Liste kommt niemand vor.");
    }

    @Test
    void testMaximum() {
        Uebungen u = new Uebungen();
        assertEquals(8, u.maximum(zahlen()), "Die groesste Zahl ist 8.");
        List<Integer> eine = new List<Integer>();
        eine.append(-4);
        assertEquals(-4, u.maximum(eine), "Bei nur einer Zahl ist sie das Maximum - auch wenn sie negativ ist.");
    }

    @Test
    void testLetztes() {
        Uebungen u = new Uebungen();
        assertEquals("Cem", u.letztes(baue(new String[]{"Anna", "Ben", "Cem"})), "Cem steht am Ende.");
        assertEquals(null, u.letztes(new List<String>()), "Die leere Liste hat kein letztes Element.");
    }

    @Test
    void testVertauschen() {
        Uebungen u = new Uebungen();
        List<String> liste = baue(new String[]{"Rot", "Blau", "Gelb", "Grün"});
        u.vertauschen(liste, 1, 3);
        assertEquals("Rot, Grün, Gelb, Blau", inhalt(liste), "Blau und Grün haben die Plätze getauscht.");
        u.vertauschen(liste, 2, 0);
        assertEquals("Gelb, Grün, Rot, Blau", inhalt(liste), "Die Reihenfolge der Positionen spielt keine Rolle.");
        u.vertauschen(liste, 1, 7);
        assertEquals("Gelb, Grün, Rot, Blau", inhalt(liste), "Eine Stelle 7 gibt es nicht - nichts passiert.");
    }
}
```

:::

::::collapsible{title="Tipp: vertauschen" id="liste-ueben-tipp-vertauschen"}

Geh die Liste zweimal durch und zähle dabei die Stelle mit.

1. Beim ersten Durchlauf merkst du dir die beiden Inhalte an `pPos1` und `pPos2`. Hast du danach nicht beide gefunden, ist die Liste zu kurz.
2. Beim zweiten Durchlauf setzt du mit `setContent` an `pPos1` den zweiten und an `pPos2` den ersten Inhalt.

::::

::::protect{password="java-q-4-l-u-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Struktogramm zu `vertauschen`:**

:::struktolab{fontSize=15}
```
funktion vertauschen(pListe, pPos1, pPos2):
    erster = null
    zweiter = null
    stelle = 0
    pListe.toFirst()
    wiederhole solange pListe.hasAccess():
        falls stelle == pPos1:
            erster = pListe.getContent()
        sonst:
        falls stelle == pPos2:
            zweiter = pListe.getContent()
        sonst:
        stelle = stelle + 1
        pListe.next()
    falls erster != null und zweiter != null:
        stelle = 0
        pListe.toFirst()
        wiederhole solange pListe.hasAccess():
            falls stelle == pPos1:
                pListe.setContent(zweiter)
            sonst:
                falls stelle == pPos2:
                    pListe.setContent(erster)
                sonst:
            stelle = stelle + 1
            pListe.next()
    sonst:
```
:::

**Quelltext:**

```java
public int summe(List<Integer> pZahlen) {
    int summe = 0;
    pZahlen.toFirst();
    while (pZahlen.hasAccess()) {
        summe = summe + pZahlen.getContent();
        pZahlen.next();
    }
    return summe;
}

public int zaehle(List<String> pListe, String pGesucht) {
    int anzahl = 0;
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().equals(pGesucht)) {
            anzahl++;
        }
        pListe.next();
    }
    return anzahl;
}

public int maximum(List<Integer> pZahlen) {
    pZahlen.toFirst();
    int max = pZahlen.getContent();
    while (pZahlen.hasAccess()) {
        if (pZahlen.getContent() > max) {
            max = pZahlen.getContent();
        }
        pZahlen.next();
    }
    return max;
}

public String letztes(List<String> pListe) {
    pListe.toLast();
    return pListe.getContent();
}

public void vertauschen(List<String> pListe, int pPos1, int pPos2) {
    String erster = null;
    String zweiter = null;
    int stelle = 0;
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (stelle == pPos1) {
            erster = pListe.getContent();
        }
        if (stelle == pPos2) {
            zweiter = pListe.getContent();
        }
        stelle++;
        pListe.next();
    }
    if (erster != null && zweiter != null) {
        stelle = 0;
        pListe.toFirst();
        while (pListe.hasAccess()) {
            if (stelle == pPos1) {
                pListe.setContent(zweiter);
            } else if (stelle == pPos2) {
                pListe.setContent(erster);
            }
            stelle++;
            pListe.next();
        }
    }
}
```

- **`letztes` braucht keine Schleife.** `toLast` setzt das aktuelle Element direkt ans Ende. Bei einer leeren Liste gibt es keins, und `getContent` liefert `null`.
- **`vertauschen` tauscht nur die Inhalte**, die Knoten bleiben, wo sie sind. Ohne `setContent` müsste man Elemente entfernen und an anderer Stelle wieder einfügen – das geht auch, ist aber deutlich aufwendiger.

::::

## Stufe 5: Knobelaufgabe

:::snippet{#aufgabe}
**Doppelte entfernen.** Implementiere `void entferneDoppelte(List<String> pListe)`. Jeder Name soll danach nur noch einmal vorkommen, und zwar an der Stelle seines **ersten** Auftretens. Aus Anna, Ben, Anna, Cem, Ben wird Anna, Ben, Cem.

Die Schwierigkeit: Die Liste hat nur **ein** aktuelles Element. Wer beim Prüfen „kam der Name schon vor?“ in derselben Liste sucht, verliert die Stelle, an der er gerade steht.
:::

:::onlineide{libraries="nrw" height="560px" speed="1000000" id="liste-doppelte"}

```java Main.java
void main() {
    List<String> liste = new List<String>();
    liste.append("Anna");
    liste.append("Ben");
    liste.append("Anna");
    liste.append("Cem");
    liste.append("Ben");

    entferneDoppelte(liste);

    // Erwartet: Anna, Ben, Cem
    liste.toFirst();
    while (liste.hasAccess()) {
        IO.println(liste.getContent());
        liste.next();
    }
}

void entferneDoppelte(List<String> pListe) {

}
```

:::

::::collapsible{title="Tipp" id="liste-doppelte-tipp"}

Lege eine **zweite** Liste `gesehen` an. Darin sammelst du jeden Namen, der dir zum ersten Mal begegnet. Steht der aktuelle Name schon in `gesehen`, wird er entfernt. Das Suchen in `gesehen` bewegt nur deren aktuelles Element – deine Stelle in `pListe` bleibt erhalten.

::::

::::protect{password="java-q-4-l-u-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
void entferneDoppelte(List<String> pListe) {
    List<String> gesehen = new List<String>();
    pListe.toFirst();
    while (pListe.hasAccess()) {
        String aktuell = pListe.getContent();
        if (enthaelt(gesehen, aktuell)) {
            pListe.remove();
        } else {
            gesehen.append(aktuell);
            pListe.next();
        }
    }
}

boolean enthaelt(List<String> pListe, String pWert) {
    pListe.toFirst();
    while (pListe.hasAccess()) {
        if (pListe.getContent().equals(pWert)) {
            return true;
        }
        pListe.next();
    }
    return false;
}
```

Hier kommen zwei Muster zusammen: das **Entfernen beim Durchlaufen** in `pListe` und das **Durchlaufen** einer zweiten Liste zum Suchen.

::::

<!-- KLP QPh GK: "implementieren Algorithmen ... unter Verwendung von Datenstrukturen (Liste) (I)".
     Differenzierung: Übungsweg "Sicher werden" neben dem Spielwerkstatt-Weg. -->

---

## Selbsttest

::::multievent

**1. Wie löscht man das zweite Element einer Liste?**

{r1{mit remove allein}}

{r1{!mit toFirst, dann next, dann remove}}

{r1{mit insert}}

{h{Zuerst muss das zu löschende Element aktuelles Element werden.}}
{H{Richtig!}}

**2. Warum kann man mit insert kein Element am Ende anhängen?**

{r2{weil insert nur einmal aufgerufen werden darf}}

{r2{!weil insert immer vor dem aktuellen Element einfügt und es hinter dem letzten kein aktuelles Element gibt}}

{r2{weil insert nur bei leeren Listen funktioniert}}

{h{Dafür gibt es append.}}
{H{Richtig!}}

**3. In welchen Fällen liefert hasAccess den Wert false?** (Mehrfachauswahl)

{c1{!wenn die Liste leer ist}}

{c1{!nach next am letzten Element}}

{c1{!bevor zum ersten Mal toFirst aufgerufen wurde}}

{c1{wenn die Liste genau ein Element hat}}

{h{Bei genau einem Element gibt es nach toFirst sehr wohl ein aktuelles Element.}}
{H{Richtig!}}

**4. Warum ist das Vertauschen zweier Elemente ohne setContent schwieriger?**

{r3{weil getContent nicht funktioniert}}

{r3{!weil man dann Elemente entfernen und neu einfügen muss, statt nur Inhalte auszutauschen}}

{r3{weil die Liste sonst leer wird}}

{h{Mit setContent tauscht man nur die Inhalte, die Knoten bleiben stehen.}}
{H{Richtig!}}

::::
