---
title: Systematisch testen
index: 1
---

# Systematisch testen

Bisher hast du Tests **benutzt** – jetzt schreibst du sie selbst und lernst, sie systematisch auszuwählen. „Ich habe es ausprobiert und es lief“ ist kein Test.

<!-- KLP QPh, Algorithmen: testen Programme anhand von Beispielen auch unter Berücksichtigung von Sonderfällen und Fehlermeldungen (I); LK: entwickeln Testanwendungen zum systematischen Prüfen der Funktionalität von Programmen (I) -->

## Was ein Test leisten muss

:::snippet{#merken}
Ein Test besteht immer aus drei Teilen:

1. **Vorbereiten:** einen Ausgangszustand herstellen.
2. **Ausführen:** die zu prüfende Methode aufrufen.
3. **Vergleichen:** das Ergebnis mit dem **vorher festgelegten** Sollwert vergleichen.

Der dritte Punkt ist der entscheidende. Wer erst das Programm laufen lässt und dann sagt „ja, sieht plausibel aus“, testet nicht – er bestätigt nur, was das Programm ohnehin tut.
:::

```java
@Test
void testMaximum() {
    Rechner r = new Rechner();               // vorbereiten
    int erg = r.maximum(new int[]{3, 9, 1}); // ausführen
    assertEquals(9, erg, "Das Maximum von 3, 9 und 1 ist 9.");  // vergleichen
}
```

:::snippet{#merken}
| Anweisung | prüft |
| --- | --- |
| `assertEquals(soll, ist, meldung)` | dass beide Werte gleich sind |
| `assertTrue(bedingung, meldung)` | dass die Bedingung wahr ist |
| `assertFalse(bedingung, meldung)` | dass sie falsch ist |
| `fail(meldung)` | schlägt immer fehl – für Stellen, die nie erreicht werden dürfen |

Die **Meldung** ist kein Beiwerk. Sie erscheint, wenn der Test fehlschlägt, und soll dann erklären, was erwartet wurde. „Fehler“ hilft niemandem, „Das Maximum von 3, 9 und 1 muss 9 sein“ schon.
:::

## Welche Testfälle braucht man?

Man kann nicht alles testen. Die Kunst besteht darin, wenige Fälle so zu wählen, dass sie viel abdecken.

:::snippet{#merken}
Vier Sorten von Testfällen gehören zu jeder Methode:

| Sorte | Frage | Beispiel bei einer Suche im Feld |
| --- | --- | --- |
| **Normalfall** | Was ist der typische Einsatz? | Wert steht irgendwo in der Mitte |
| **Randfall** | Was passiert an den Grenzen? | Wert steht ganz vorne oder ganz hinten |
| **Sonderfall** | Was ist die kleinstmögliche Eingabe? | leeres Feld, Feld mit einem Element |
| **Fehlerfall** | Was passiert bei unzulässiger Eingabe? | Wert kommt gar nicht vor, Index negativ |

Die meisten Fehler in Programmen stecken in den Rand- und Sonderfällen. Der Normalfall funktioniert fast immer – den hat man ja beim Schreiben vor Augen.
:::

## Testfälle finden

:::snippet{#aufgabe}
Gegeben ist die Beschreibung einer Methode:

> `int notenschnitt(int[] pPunkte)` liefert den auf ganze Punkte gerundeten Durchschnitt. Punktzahlen außerhalb von 0 bis 15 werden ignoriert. Enthält das Feld keine gültige Punktzahl, wird −1 geliefert.

Finde **ohne** den Quelltext zu kennen mindestens acht Testfälle. Ordne sie den vier Sorten zu.
:::

::::collapsible{title="Auflösung"}

| Sorte | Eingabe | erwartet | prüft |
| --- | --- | --- | --- |
| Normalfall | `{9, 10, 11}` | 10 | die Grundrechnung |
| Normalfall | `{9, 10}` | 10 (9,5 gerundet) | die Rundung nach oben |
| Randfall | `{0}` | 0 | die untere Grenze ist gültig |
| Randfall | `{15}` | 15 | die obere Grenze ist gültig |
| Randfall | `{16}` | −1 | knapp über der Grenze wird ignoriert |
| Randfall | `{-1}` | −1 | knapp unter der Grenze ebenso |
| Sonderfall | `{}` | −1 | leeres Feld |
| Sonderfall | `{7}` | 7 | ein einziger Wert |
| Fehlerfall | `{99, 8, -5}` | 8 | ungültige Werte werden übersprungen |
| Fehlerfall | `{99, -5}` | −1 | nur ungültige Werte |

Beachte die Randfälle 15 und 16: Sie liegen **direkt nebeneinander**, aber auf verschiedenen Seiten der Grenze. Genau dort stecken die Zaunpfahlfehler – etwa wenn jemand `pPunkte[i] < 15` statt `<= 15` schreibt.

Man nennt das **Grenzwertanalyse**: An jeder Bereichsgrenze testet man den letzten gültigen und den ersten ungültigen Wert.

::::

## Aufgabe 1: Fehler durch Tests finden

:::snippet{#aufgabe}
Die folgende Klasse enthält **drei** Fehler. Alle Testfälle sind bereits geschrieben.

a) Führe die Tests aus. Welche schlagen fehl?

b) Sage **anhand der Meldungen** voraus, wo die Fehler stecken – ohne den Quelltext genau zu lesen.

c) Repariere sie und prüfe, dass alle Tests grün werden.
:::

:::onlineide{height="760px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Noten.java
public class Noten {

    /**
     * Liefert den auf ganze Punkte gerundeten Durchschnitt.
     * Punktzahlen außerhalb von 0 bis 15 werden ignoriert.
     * Ohne gültige Punktzahl wird -1 geliefert.
     */
    public int notenschnitt(int[] pPunkte) {
        int summe = 0;
        int anzahl = 0;

        for (int i = 0; i < pPunkte.length; i++) {
            if (pPunkte[i] > 0 && pPunkte[i] < 15) {
                summe = summe + pPunkte[i];
                anzahl++;
            }
        }

        return summe / anzahl;
    }

    /** Liefert die Anzahl der Punktzahlen, die mindestens pGrenze betragen. */
    public int zaehleMindestens(int[] pPunkte, int pGrenze) {
        int anzahl = 0;
        for (int i = 0; i < pPunkte.length; i++) {
            if (pPunkte[i] > pGrenze) {
                anzahl++;
            }
        }
        return anzahl;
    }
}
```

```java NotenTest.java
@Test
class NotenTest {

    @Test
    void testNormalfall() {
        Noten n = new Noten();
        assertEquals(10, n.notenschnitt(new int[]{9, 10, 11}),
                     "Der Schnitt von 9, 10 und 11 ist 10.");
    }

    @Test
    void testGrenzeUnten() {
        Noten n = new Noten();
        assertEquals(0, n.notenschnitt(new int[]{0}),
                     "0 Punkte sind eine gültige Punktzahl.");
    }

    @Test
    void testGrenzeOben() {
        Noten n = new Noten();
        assertEquals(15, n.notenschnitt(new int[]{15}),
                     "15 Punkte sind eine gültige Punktzahl.");
    }

    @Test
    void testUngueltigeWerte() {
        Noten n = new Noten();
        assertEquals(8, n.notenschnitt(new int[]{99, 8, -5}),
                     "Ungültige Werte werden übersprungen.");
        assertEquals(-1, n.notenschnitt(new int[]{99, -5}),
                     "Ohne gültigen Wert kommt -1 heraus.");
    }

    @Test
    void testLeeresFeld() {
        Noten n = new Noten();
        assertEquals(-1, n.notenschnitt(new int[]{}),
                     "Beim leeren Feld kommt -1 heraus.");
    }

    @Test
    void testZaehleMindestens() {
        Noten n = new Noten();
        assertEquals(2, n.zaehleMindestens(new int[]{5, 10, 15}, 10),
                     "10 und 15 sind mindestens 10.");
        assertEquals(3, n.zaehleMindestens(new int[]{5, 10, 15}, 5),
                     "Alle drei sind mindestens 5.");
        assertEquals(0, n.zaehleMindestens(new int[]{}, 5),
                     "Im leeren Feld ist nichts.");
    }
}
```

:::

::::collapsible{title="Tipp: Die Meldungen lesen"}

Schlägt der Test „0 Punkte sind eine gültige Punktzahl“ fehl, weißt du sofort: Die Bereichsprüfung schließt die untere Grenze fälschlich aus. Die Meldung führt dich direkt zur Zeile.

Deshalb lohnt sich der Aufwand, gute Meldungen zu schreiben.

::::

::::collapsible{title="Auflösung: die drei Fehler"}

1. **`pPunkte[i] > 0` schließt die 0 aus.** Richtig ist `>= 0`. Ein klassischer Zaunpfahlfehler an der unteren Grenze.
2. **`pPunkte[i] < 15` schließt die 15 aus.** Richtig ist `<= 15`. Derselbe Fehler an der oberen Grenze.
3. **`return summe / anzahl;` teilt bei leerem Feld durch null.** Der Sonderfall `anzahl == 0` fehlt – dort müsste −1 zurückgegeben werden.

Der dritte Fehler ist der schlimmste: Er lässt das Programm **abstürzen**, während die ersten beiden nur falsche Werte liefern. Falsche Werte fallen manchmal jahrelang nicht auf.

Bei `zaehleMindestens` steckt derselbe Fehlertyp noch einmal: `> pGrenze` statt `>= pGrenze`. Der Test deckt ihn auf, weil er ausdrücklich die Grenze selbst mitprüft.

::::

:::protect{password="java-q-7-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Noten.java
public class Noten {

    public int notenschnitt(int[] pPunkte) {
        int summe = 0;
        int anzahl = 0;

        for (int i = 0; i < pPunkte.length; i++) {
            if (pPunkte[i] >= 0 && pPunkte[i] <= 15) {
                summe = summe + pPunkte[i];
                anzahl++;
            }
        }

        if (anzahl == 0) {
            return -1;
        }
        return summe / anzahl;
    }

    public int zaehleMindestens(int[] pPunkte, int pGrenze) {
        int anzahl = 0;
        for (int i = 0; i < pPunkte.length; i++) {
            if (pPunkte[i] >= pGrenze) {
                anzahl++;
            }
        }
        return anzahl;
    }
}
```

Alle drei Fehler waren **an Grenzen**. Das ist kein Zufall – Grenzen sind der mit Abstand häufigste Ort für Programmfehler.

:::

## Aufgabe 2: Testfälle selbst entwerfen

:::snippet{#aufgabe}
Zu dieser Beschreibung ist die Implementierung bereits fertig. **Die Tests fehlen.**

> `boolean istGueltigesDatum(int pTag, int pMonat, int pJahr)` prüft, ob die drei Zahlen ein gültiges Datum ergeben. Berücksichtigt werden Monate mit 30 und 31 Tagen sowie Schaltjahre.

a) Entwerfe **auf Papier** mindestens zwölf Testfälle nach den vier Sorten. Notiere zu jedem, was er prüfen soll.

b) Schreibe sie als Testmethoden.

c) Die Implementierung enthält genau einen Fehler. Finde ihn mit deinen Tests.
:::

:::onlineide{height="760px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Kalender.java
public class Kalender {

    /** Prüft, ob die drei Zahlen ein gültiges Datum ergeben. */
    public boolean istGueltigesDatum(int pTag, int pMonat, int pJahr) {
        if (pMonat < 1 || pMonat > 12) {
            return false;
        }
        if (pTag < 1) {
            return false;
        }
        return pTag <= tageImMonat(pMonat, pJahr);
    }

    /** Liefert die Anzahl der Tage im angegebenen Monat. */
    public int tageImMonat(int pMonat, int pJahr) {
        if (pMonat == 2) {
            if (istSchaltjahr(pJahr)) {
                return 29;
            }
            return 28;
        }
        if (pMonat == 4 || pMonat == 6 || pMonat == 9 || pMonat == 11) {
            return 30;
        }
        return 31;
    }

    /** Prüft, ob das Jahr ein Schaltjahr ist. */
    public boolean istSchaltjahr(int pJahr) {
        return pJahr % 4 == 0 && pJahr % 100 != 0;
    }
}
```

```java KalenderTest.java
@Test
class KalenderTest {

    @Test
    void testNormalfaelle() {
        Kalender k = new Kalender();
        assertTrue(k.istGueltigesDatum(15, 6, 2026), "Der 15.6.2026 ist gültig.");
        // Ergänze weitere Normalfälle.
    }

    @Test
    void testRandfaelle() {
        Kalender k = new Kalender();
        // Ergänze Randfälle: erster und letzter Tag eines Monats,
        // erster und letzter Monat, jeweils auch knapp daneben.
        assertTrue(true, "Ersetze diesen Platzhalter.");
    }

    @Test
    void testSchaltjahre() {
        Kalender k = new Kalender();
        // Ergänze Tests für 2024, 2023, 1900 und 2000.
        assertTrue(true, "Ersetze diesen Platzhalter.");
    }

    @Test
    void testFehlerfaelle() {
        Kalender k = new Kalender();
        // Ergänze Fehlerfälle: Monat 0, Monat 13, Tag 0, Tag 32.
        assertTrue(true, "Ersetze diesen Platzhalter.");
    }
}
```

:::

::::collapsible{title="Tipp: Wo lohnt sich das Suchen?"}

Die Schaltjahrregel hat drei Teile. Prüfe alle vier interessanten Jahre: 2024 (durch 4), 2023 (nicht durch 4), 1900 (durch 100) und 2000 (durch 400).

::::

:::protect{password="java-q-7-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Der Fehler steckt in `istSchaltjahr`: Die Ausnahme der Ausnahme fehlt. Richtig ist

```java
public boolean istSchaltjahr(int pJahr) {
    return (pJahr % 4 == 0 && pJahr % 100 != 0) || pJahr % 400 == 0;
}
```

Ohne den letzten Teil gilt das Jahr 2000 fälschlich als normales Jahr – und der 29.2.2000 als ungültiges Datum.

Ein Satz von Testfällen, der ihn findet:

```java
@Test
void testSchaltjahre() {
    Kalender k = new Kalender();
    assertTrue(k.istSchaltjahr(2024), "2024 ist durch 4 teilbar.");
    assertFalse(k.istSchaltjahr(2023), "2023 nicht.");
    assertFalse(k.istSchaltjahr(1900), "1900 ist durch 100 teilbar.");
    assertTrue(k.istSchaltjahr(2000), "2000 ist durch 400 teilbar.");

    assertTrue(k.istGueltigesDatum(29, 2, 2024), "2024 hat einen 29. Februar.");
    assertFalse(k.istGueltigesDatum(29, 2, 2023), "2023 nicht.");
    assertFalse(k.istGueltigesDatum(29, 2, 1900), "1900 auch nicht.");
    assertTrue(k.istGueltigesDatum(29, 2, 2000), "2000 aber schon.");
}

@Test
void testRandfaelle() {
    Kalender k = new Kalender();
    assertTrue(k.istGueltigesDatum(1, 1, 2026), "Der erste Tag des Jahres.");
    assertTrue(k.istGueltigesDatum(31, 12, 2026), "Der letzte Tag des Jahres.");
    assertTrue(k.istGueltigesDatum(30, 4, 2026), "Der April hat 30 Tage.");
    assertFalse(k.istGueltigesDatum(31, 4, 2026), "Aber keinen 31.");
    assertTrue(k.istGueltigesDatum(31, 3, 2026), "Der März hat 31 Tage.");
}

@Test
void testFehlerfaelle() {
    Kalender k = new Kalender();
    assertFalse(k.istGueltigesDatum(15, 0, 2026), "Monat 0 gibt es nicht.");
    assertFalse(k.istGueltigesDatum(15, 13, 2026), "Monat 13 auch nicht.");
    assertFalse(k.istGueltigesDatum(0, 6, 2026), "Tag 0 gibt es nicht.");
    assertFalse(k.istGueltigesDatum(32, 6, 2026), "Tag 32 auch nicht.");
}
```

Beachte, wie in `testRandfaelle` jeweils der **letzte gültige** und der **erste ungültige** Wert nebeneinanderstehen. Das ist Grenzwertanalyse in Reinform.

:::

## Zusatzaufgabe

:::snippet{#brain}
Nimm dir eine der Datenstrukturen aus dem nächsten Kapitel vor – Stapel, Schlange oder Liste.

a) Entwirf **vor** dem Programmieren eine vollständige Testklasse. Denk an: leere Struktur, ein Element, mehrere Elemente, Entfernen aus einer leeren Struktur, Zugriff auf ein nicht vorhandenes Element.

b) Implementiere die Datenstruktur erst danach.

c) Beurteile: Hat das Schreiben der Tests vorher deine Implementierung verändert? Diese Arbeitsweise heißt **testgetriebene Entwicklung** und ist in der Praxis weit verbreitet.
:::

---

## Selbsttest

::::multievent

**1. Aus welchen drei Teilen besteht ein Test?** (Mehrfachauswahl)

{c1{!einen Ausgangszustand herstellen}}

{c1{!die zu prüfende Methode aufrufen}}

{c1{!das Ergebnis mit einem vorher festgelegten Sollwert vergleichen}}

{c1{das Ergebnis auf Plausibilität ansehen}}

{h{Der Sollwert muss vorher feststehen, nicht erst nach dem Lauf.}}
{H{Richtig!}}

**2. Wo stecken die meisten Programmfehler?**

{r1{im Normalfall}}

{r1{!in den Rand- und Sonderfällen}}

{r1{in den Kommentaren}}

{h{Den Normalfall hat man beim Programmieren ja vor Augen.}}
{H{Richtig!}}

**3. Was prüft die Grenzwertanalyse?**

{r2{den Mittelwert eines Bereichs}}

{r2{!den letzten gültigen und den ersten ungültigen Wert an jeder Grenze}}

{r2{alle möglichen Eingaben}}

{h{Bei 0 bis 15 wären das etwa 15 und 16.}}
{H{Richtig! Genau dort stecken die Zaunpfahlfehler.}}

**4. Wozu dient die Meldung in einer Zusicherung?**

{r3{sie wird immer ausgegeben}}

{r3{!sie erklärt beim Fehlschlag, was erwartet wurde}}

{r3{sie benennt die Testmethode}}

{h{Sie erscheint nur, wenn der Test fehlschlägt.}}
{H{Richtig! Deshalb sollte sie die Erwartung nennen, nicht nur Fehler sagen.}}

**5. Welcher der drei Fehler in der Notenklasse war der gefährlichste?**

{r4{die falsche untere Grenze}}

{r4{die falsche obere Grenze}}

{r4{!die fehlende Behandlung des leeren Feldes}}

{h{Zwei lieferten falsche Werte, einer ließ das Programm abstürzen.}}
{H{Richtig! Wobei falsche Werte oft länger unentdeckt bleiben.}}

::::
