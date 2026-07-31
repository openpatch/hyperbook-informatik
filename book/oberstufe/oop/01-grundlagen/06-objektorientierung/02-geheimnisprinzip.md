---
title: Geheimnisprinzip
index: 2
---

# Geheimnisprinzip

In der Zusatzaufgabe der letzten Lektion hast du `macheProbefahrt` gegen negative Werte abgesichert. Die Frage war: Reicht das?

## Der Angriff

:::snippet{#aufgabe}
Betrachte die Klasse `AutoOffen`. Ihre Attribute sind `public` statt `private`.

Sage voraus, was das Hauptprogramm ausgibt. Beurteile danach, ob die Absicherung in `macheProbefahrt` überhaupt etwas nützt.
:::

:::onlineide{height="580px" speed="1000000"}

```java Main.java
void main() {
    AutoOffen wagen = new AutoOffen("VW", 84000, 7500.0);
    wagen.schreibeInfos();

    wagen.macheProbefahrt(-20000);
    wagen.schreibeInfos();

    wagen.kilometerstand = 12000;
    wagen.schreibeInfos();
}
```

```java AutoOffen.java
public class AutoOffen {

    public String marke;
    public int kilometerstand;
    public double preis;

    public AutoOffen(String pMarke, int pKm, double pPreis) {
        marke = pMarke;
        kilometerstand = pKm;
        preis = pPreis;
    }

    /** Erhöht den Kilometerstand. Negative Angaben werden ignoriert. */
    public void macheProbefahrt(int pKm) {
        if (pKm > 0) {
            kilometerstand = kilometerstand + pKm;
        }
    }

    public void schreibeInfos() {
        IO.println(marke + ", " + kilometerstand + " km, " + preis + " Euro");
    }
}
```

:::

::::collapsible{title="Auflösung"}

```
VW, 84000 km, 7500.0 Euro
VW, 84000 km, 7500.0 Euro
VW, 12000 km, 7500.0 Euro
```

Die Prüfung in `macheProbefahrt` funktioniert – die Probefahrt mit -20000 wird ignoriert.

Und sie nützt trotzdem **nichts**. Denn `wagen.kilometerstand = 12000;` schreibt direkt in das Attribut und umgeht die Methode vollständig. Die Regel „der Kilometerstand darf nur steigen“ steht zwar im Programm, ist aber nicht durchsetzbar.

::::

## Die Lösung: private

:::snippet{#definition}
Das **Geheimnisprinzip** (auch: Datenkapselung) besagt: Ein Objekt verbirgt seine Attribute nach außen. Zugriff gibt es nur über Methoden, die das Objekt selbst anbietet.

Damit kann das Objekt jede Änderung an seinen Daten prüfen – und sicherstellen, dass es niemals in einen unsinnigen Zustand gerät.
:::

:::snippet{#merken}
Die Schlüsselwörter `private` und `public` heißen :t[Zugriffsmodifikatoren]{#zugriffsmodifikator}.

| Sichtbarkeit | Zeichen im Diagramm | bedeutet |
| --- | --- | --- |
| `private` | `-` | nur innerhalb der eigenen Klasse sichtbar |
| `public` | `+` | von überall sichtbar |

**Faustregel:** Attribute sind `private`. Methoden, die andere benutzen sollen, sind `public`.
:::

:::onlineide{height="620px" speed="1000000"}

```java Main.java
void main() {
    Auto wagen = new Auto("VW", 84000, 7500.0);
    wagen.schreibeInfos();

    wagen.macheProbefahrt(-20000);
    wagen.macheProbefahrt(35);
    wagen.schreibeInfos();

    // Die folgende Zeile lässt sich nicht mehr übersetzen.
    // Entferne die beiden Schrägstriche und sieh dir die Fehlermeldung an.
    // wagen.kilometerstand = 12000;

    IO.println("Kilometerstand abfragen geht weiterhin: " + wagen.getKilometerstand());
}
```

```java Auto.java
public class Auto {

    private String marke;
    private int kilometerstand;
    private double preis;

    public Auto(String pMarke, int pKm, double pPreis) {
        marke = pMarke;
        kilometerstand = pKm;
        preis = pPreis;
    }

    /** Erhöht den Kilometerstand. Negative Angaben werden ignoriert. */
    public void macheProbefahrt(int pKm) {
        if (pKm > 0) {
            kilometerstand = kilometerstand + pKm;
        }
    }

    /** Liefert den aktuellen Kilometerstand. */
    public int getKilometerstand() {
        return kilometerstand;
    }

    /** Liefert die Marke. */
    public String getMarke() {
        return marke;
    }

    public void schreibeInfos() {
        IO.println(marke + ", " + kilometerstand + " km, " + preis + " Euro");
    }
}
```

:::

:::snippet{#aufgabe}
Entferne im Hauptprogramm die beiden Schrägstriche vor `wagen.kilometerstand = 12000;` und lies die Fehlermeldung.

Beurteile: Ist es ein Vorteil oder ein Nachteil, dass dieser Fehler jetzt schon beim **Übersetzen** auffällt und nicht erst beim Ausführen?
:::

::::collapsible{title="Auflösung"}

Ein klarer Vorteil. Ein Übersetzungsfehler wird **immer** gefunden – ein Laufzeitfehler nur, wenn der betroffene Programmweg zufällig getestet wird.

Je mehr Fehler die Sprache schon beim Übersetzen abfängt, desto weniger können sich im laufenden System verstecken.

::::

## Getter und Setter

:::snippet{#merken}
- Eine **Getter**-Methode liefert einen Attributwert nach außen: `getKilometerstand()`.
- Eine **Setter**-Methode ändert einen Attributwert – und prüft dabei: `setPreis(double pPreis)`.

Ein Setter ist **kein** Ersatz für `public`. Der Unterschied ist, dass der Setter die Änderung **kontrollieren** kann:

```java
public void setPreis(double pPreis) {
    if (pPreis >= 0) {
        preis = pPreis;
    }
}
```

Und nicht jedes Attribut braucht beides. Für den Kilometerstand gibt es bewusst **nur** einen Getter – geändert wird er ausschließlich durch `macheProbefahrt`.
:::

## Aufgabe 1: Bankkonto

:::snippet{#aufgabe}
Ein Bankkonto ist das Musterbeispiel für das Geheimnisprinzip: Niemand darf den Kontostand einfach überschreiben.

Setze die Klasse so um, dass alle Tests grün werden. Achte besonders auf die Regeln:

- Einzahlen geht nur mit positiven Beträgen.
- Auszahlen geht nur mit der richtigen PIN **und** nur, wenn genug Geld da ist.
- Der Kontostand darf nie negativ werden.
- Die PIN wird **niemals** nach außen gegeben.
:::

:::onlineide{height="680px" speed="1000000"}

```java Main.java
void main() {
    IO.println("Führe die Tests über den Reiter Testrunner aus.");
}
```

```java Bankkonto.java
public class Bankkonto {

    private String besitzer;
    private String pin;
    private double kontostand;

    /**
     * Erzeugt ein neues Konto mit Kontostand 0.
     * @param pBesitzer der Name des Besitzers
     * @param pPin die vierstellige PIN
     */
    public Bankkonto(String pBesitzer, String pPin) {
        // Dein Code hier
    }

    /** Liefert den Namen des Besitzers. */
    public String getBesitzer() {
        return ""; // ersetze diese Zeile
    }

    /** Liefert den aktuellen Kontostand. */
    public double getKontostand() {
        return 0; // ersetze diese Zeile
    }

    /**
     * Zahlt einen Betrag ein. Nicht positive Beträge werden ignoriert.
     */
    public void zahleEin(double pBetrag) {
        // Dein Code hier
    }

    /**
     * Hebt einen Betrag ab, wenn die PIN stimmt, der Betrag positiv ist
     * und genug Geld auf dem Konto liegt.
     * @return true, wenn die Auszahlung geklappt hat
     */
    public boolean hebeAb(String pPin, double pBetrag) {
        return false; // ersetze diese Zeile
    }
}
```

```java BankkontoTest.java
@Test
class BankkontoTest {

    @Test
    void testNeuesKonto() {
        Bankkonto k = new Bankkonto("Ada", "1234");
        assertEquals("Ada", k.getBesitzer(), "Der Besitzer muss Ada sein.");
        assertEquals(0.0, k.getKontostand(), "Ein neues Konto startet bei 0.");
    }

    @Test
    void testEinzahlen() {
        Bankkonto k = new Bankkonto("Ada", "1234");
        k.zahleEin(100.50);
        assertEquals(100.50, k.getKontostand(), "Nach 100,50 Euro Einzahlung.");
        k.zahleEin(-50.0);
        assertEquals(100.50, k.getKontostand(), "Negative Einzahlungen werden ignoriert.");
        k.zahleEin(0.0);
        assertEquals(100.50, k.getKontostand(), "Eine Einzahlung von 0 ändert nichts.");
    }

    @Test
    void testAbhebenMitRichtigerPin() {
        Bankkonto k = new Bankkonto("Ada", "1234");
        k.zahleEin(100.0);
        assertTrue(k.hebeAb("1234", 30.0), "Mit richtiger PIN und Deckung klappt es.");
        assertEquals(70.0, k.getKontostand(), "Danach sind noch 70 Euro da.");
    }

    @Test
    void testAbhebenScheitert() {
        Bankkonto k = new Bankkonto("Ada", "1234");
        k.zahleEin(100.0);

        assertFalse(k.hebeAb("9999", 30.0), "Mit falscher PIN klappt es nicht.");
        assertEquals(100.0, k.getKontostand(), "Der Kontostand bleibt unverändert.");

        assertFalse(k.hebeAb("1234", 200.0), "Ohne Deckung klappt es nicht.");
        assertEquals(100.0, k.getKontostand(), "Der Kontostand bleibt unverändert.");

        assertFalse(k.hebeAb("1234", -10.0), "Negative Beträge werden abgelehnt.");
        assertEquals(100.0, k.getKontostand(), "Der Kontostand bleibt unverändert.");
    }
}
```

:::

::::collapsible{title="Tipp 1: Die PIN vergleichen"}

`pPin` und `pin` sind Zeichenketten. Also `pPin.equals(pin)` – **nicht** `pPin == pin`.

::::

::::collapsible{title="Tipp 2: Drei Bedingungen"}

Für eine erfolgreiche Auszahlung müssen **alle drei** Bedingungen gleichzeitig gelten. Verknüpfe sie mit `&&`.

::::

::::collapsible{title="Tipp 3: Warum gibt hebeAb einen Wahrheitswert zurück?"}

Damit das aufrufende Programm erfährt, ob es geklappt hat. Eine `void`-Methode könnte höchstens etwas ausgeben – und wäre damit für ein Programm ohne Konsole nutzlos.

::::

:::protect{password="java-ef-6-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Bankkonto.java
public class Bankkonto {

    private String besitzer;
    private String pin;
    private double kontostand;

    public Bankkonto(String pBesitzer, String pPin) {
        besitzer = pBesitzer;
        pin = pPin;
        kontostand = 0.0;
    }

    public String getBesitzer() {
        return besitzer;
    }

    public double getKontostand() {
        return kontostand;
    }

    public void zahleEin(double pBetrag) {
        if (pBetrag > 0) {
            kontostand = kontostand + pBetrag;
        }
    }

    public boolean hebeAb(String pPin, double pBetrag) {
        if (pPin.equals(pin) && pBetrag > 0 && pBetrag <= kontostand) {
            kontostand = kontostand - pBetrag;
            return true;
        }
        return false;
    }
}
```

Beachte: Es gibt **keinen** Getter für die PIN und **keinen** Setter für den Kontostand. Das ist Absicht – jede zusätzliche Methode wäre ein Loch in der Kapselung.

:::

## Aufgabe 2: Beurteilen

:::snippet{#aufgabe}
Eine Mitschülerin schlägt vor, die Klasse `Bankkonto` um diese Methode zu ergänzen:

```java
public void setKontostand(double pNeuerStand) {
    kontostand = pNeuerStand;
}
```

Sie begründet das damit, dass man sonst bei der Kontoeröffnung kein Startguthaben eintragen kann.

a) Beurteile den Vorschlag.

b) Schlage eine Lösung vor, die ihr Problem löst, ohne die Kapselung aufzugeben.
:::

::textinput{placeholder="a) ... b) ..."}

::::collapsible{title="Auflösung"}

a) Der Vorschlag hebt die Kapselung vollständig auf. Mit `setKontostand` kann jeder den Kontostand auf jeden beliebigen Wert setzen – alle Prüfungen in `zahleEin` und `hebeAb` sind damit wertlos. Es ist genau der Zustand, den wir am Anfang der Lektion abgeschafft haben.

b) Zwei saubere Wege:

1. Einen **zweiten Konstruktor** ergänzen, der ein Startguthaben entgegennimmt. Das Guthaben wird dann genau einmal gesetzt, bei der Erzeugung, und kann geprüft werden.
2. Nach der Erzeugung einfach `zahleEin(startguthaben)` aufrufen. Das ist sachlich sogar richtiger – eine Kontoeröffnung mit Guthaben *ist* eine Einzahlung.

::::

## Zusatzaufgabe

:::snippet{#brain}
Nimm deine eigene Klasse aus der letzten Lektion noch einmal vor.

a) Prüfe: Sind alle Attribute `private`?

b) Gibt es Attribute, die von außen gar nicht sichtbar sein müssen? Streiche deren Getter.

c) Gibt es Regeln über die Werte, die dein Objekt einhalten sollte – etwa „der Akkustand liegt zwischen 0 und 100“? Setze sie in den Methoden durch und schreibe Tests dafür.
:::

---

## Selbsttest

::::multievent

**1. Was bedeutet das Schlüsselwort private bei einem Attribut?**

{r1{Das Attribut kann nicht verändert werden.}}

{r1{!Das Attribut ist nur innerhalb der eigenen Klasse sichtbar.}}

{r1{Das Attribut wird nicht gespeichert.}}

{h{Innerhalb der Klasse darf man weiterhin darauf zugreifen.}}
{H{Richtig!}}

**2. Welches Zeichen steht im Implementationsdiagramm für private?**

{r2{ein Pluszeichen}}

{r2{!ein Minuszeichen}}

{r2{eine Raute}}

{h{Das Pluszeichen ist für die öffentliche Sichtbarkeit reserviert.}}
{H{Richtig!}}

**3. Warum reicht eine Prüfung in einer Methode nicht aus, wenn das Attribut öffentlich ist?**

{r3{weil Methoden langsamer sind}}

{r3{!weil der direkte Zugriff auf das Attribut die Methode umgeht}}

{r3{weil Java das verbietet}}

{h{Denk an die Zeile, die den Kilometerstand direkt überschrieben hat.}}
{H{Richtig!}}

**4. Welche Aussagen zum Geheimnisprinzip stimmen?** (Mehrfachauswahl)

{c1{!Attribute sind in der Regel private.}}

{c1{!Ein Setter kann die Änderung prüfen, ein öffentliches Attribut nicht.}}

{c1{!Nicht jedes Attribut braucht einen Getter.}}

{c1{Zu jedem Attribut gehören immer ein Getter und ein Setter.}}

{h{Beim Bankkonto gab es bewusst keinen Getter für die PIN.}}
{H{Richtig! Jede zusätzliche Methode ist ein Loch in der Kapselung.}}

**5. Ist es besser, wenn ein unerlaubter Zugriff schon beim Übersetzen auffällt oder erst beim Ausführen?**

{r4{!beim Übersetzen}}

{r4{beim Ausführen}}

{r4{das ist gleichwertig}}

{h{Ein Übersetzungsfehler wird immer gefunden.}}
{H{Richtig! Laufzeitfehler zeigen sich nur auf den Wegen, die man auch testet.}}

::::
