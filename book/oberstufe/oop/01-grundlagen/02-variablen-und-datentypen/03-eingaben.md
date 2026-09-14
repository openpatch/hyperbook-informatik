---
title: Eingaben
index: 3
---

# Eingaben

Bisher standen alle Werte fest im Quelltext. Ein Programm wird erst dann richtig nützlich, wenn es mit den Daten arbeitet, die **beim Ausführen** hereinkommen.

## Text einlesen

:::onlineide{height="360px"}

```java Main.java
void main() {
    String name = IO.readln("Wie heißt du? ");
    IO.println("Hallo " + name + "!");
}
```

:::

`IO.readln` schreibt die Frage in den Ausgabebereich und wartet dort auf deine Eingabe. Was du eintippst, kommt als **Zeichenkette** zurück.

## Zahlen einlesen

Weil `IO.readln` immer eine Zeichenkette liefert, musst du sie in eine Zahl **umwandeln**, bevor du damit rechnen kannst.

:::onlineide{height="400px"}

```java Main.java
void main() {
    String eingabe = IO.readln("Gib eine ganze Zahl ein: ");
    int zahl = Integer.parseInt(eingabe);

    IO.println("Das Doppelte ist " + (zahl * 2));
    IO.println("Das Quadrat ist " + (zahl * zahl));
}
```

:::

:::snippet{#merken}
| Anweisung | Wirkung |
| --- | --- |
| `IO.readln("Frage")` | zeigt die Frage an und liefert die Eingabe als `String` |
| `Integer.parseInt(text)` | wandelt eine Zeichenkette in einen `int` um |
| `Double.parseDouble(text)` | wandelt eine Zeichenkette in einen `double` um |

Ohne Umwandlung würde `eingabe * 2` gar nicht übersetzen – mit einer Zeichenkette kann Java nicht multiplizieren.
:::

:::snippet{#aufgabe}
Was passiert, wenn du beim obigen Programm statt einer Zahl das Wort `hallo` eingibst?

Sage es zuerst voraus, probiere es dann aus und lies die Fehlermeldung.
:::

::::collapsible{title="Auflösung"}

Das Programm bricht mit einem Fehler ab: `Integer.parseInt` kann aus `hallo` keine Zahl machen.

Das ist kein **Übersetzungsfehler** – der Quelltext ist völlig korrekt. Es ist ein **Laufzeitfehler**: Er tritt erst auf, wenn das Programm läuft, und nur bei bestimmten Eingaben.

Diesen Unterschied solltest du dir merken:

| | wann? | Beispiel |
| --- | --- | --- |
| Übersetzungsfehler | vor dem Start, die IDE zeigt ihn rot an | fehlendes Semikolon |
| Laufzeitfehler | erst beim Ausführen, oft nur bei bestimmten Eingaben | `parseInt("hallo")` |

Wie man Programme gegen solche Eingaben absichert, lernst du in Kapitel 3.

::::

## Aufgabe 1: Rechteck

:::snippet{#aufgabe}
Schreibe ein Programm, das nach Länge und Breite eines Rechtecks fragt und dann Flächeninhalt und Umfang ausgibt.

Beispielablauf:

```
Länge in cm: 7
Breite in cm: 4
Fläche:  28 cm²
Umfang:  22 cm
```
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp: Zwei Eingaben"}

Du brauchst zweimal `IO.readln` und zweimal `Integer.parseInt` – und dafür sinnvoll benannte Variablen wie `laenge` und `breite`.

::::

:::protect{password="java-ef-2-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int laenge = Integer.parseInt(IO.readln("Länge in cm: "));
    int breite = Integer.parseInt(IO.readln("Breite in cm: "));

    IO.println("Fläche:  " + (laenge * breite) + " cm²");
    IO.println("Umfang:  " + (2 * laenge + 2 * breite) + " cm");
}
```

Hier sind Einlesen und Umwandeln in eine Zeile gezogen. Wenn dir das zu dicht ist, schreib ruhig zwei Zeilen – beides ist richtig.

:::

## Aufgabe 2: Zeitrechner

:::snippet{#aufgabe}
Baue die Sekundenumrechnung aus Kapitel 1 so um, dass die Anzahl der Sekunden **eingegeben** wird statt fest im Quelltext zu stehen.

Teste dein Programm mit 7385, mit 60 und mit 0. Notiere, ob die Ausgabe in allen drei Fällen sinnvoll ist.
:::

:::onlineide{height="420px"}

```java Main.java
void main() {
    // Dein Code hier

}
```

:::

:::protect{password="java-ef-2-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    int gesamt = Integer.parseInt(IO.readln("Anzahl Sekunden: "));

    int stunden = gesamt / 3600;
    int rest = gesamt % 3600;
    int minuten = rest / 60;
    int sekunden = rest % 60;

    IO.println(gesamt + " Sekunden sind " + stunden + " h " + minuten + " min " + sekunden + " s");
}
```

Bei 0 kommt „0 h 0 min 0 s“ heraus – formal richtig, sprachlich unschön. Solche Randfälle sauber zu behandeln, lernst du mit den Verzweigungen im nächsten Kapitel.

:::

## Zusatzaufgabe

:::snippet{#brain}
Schreibe einen kleinen **Trinkgeldrechner**: Er fragt nach dem Rechnungsbetrag und nach dem gewünschten Trinkgeld in Prozent und gibt aus, wie viel Trinkgeld anfällt und wie hoch der Gesamtbetrag ist.

Achte darauf, mit welchem Datentyp du hier arbeiten musst.
:::

---

## Selbsttest

::::multievent

**1. Welchen Datentyp liefert das Einlesen mit readln zurück?**

{r1{int}}

{r1{double}}

{r1{!String}}

{r1{boolean}}

{h{Der Rechner weiß beim Einlesen noch nicht, ob du eine Zahl meinst.}}
{H{Richtig! Deshalb muss man danach umwandeln.}}

**2. Womit wandelst du eine Zeichenkette in eine ganze Zahl um?**

{r2{!mit Integer.parseInt}}

{r2{mit Integer.toString}}

{r2{mit einem Cast in Klammern}}

{h{Gesucht ist der Weg von Text zu Zahl, nicht umgekehrt.}}
{H{Genau. Für Kommazahlen gibt es entsprechend Double.parseDouble.}}

**3. Wann tritt ein Laufzeitfehler auf?**

{r3{schon beim Tippen}}

{r3{beim Übersetzen, die IDE zeigt ihn rot an}}

{r3{!erst beim Ausführen, oft nur bei bestimmten Eingaben}}

{h{Denk an das Beispiel mit der Eingabe hallo.}}
{H{Richtig! Der Quelltext war dabei völlig korrekt.}}

**4. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Ein fehlendes Semikolon ist ein Übersetzungsfehler.}}

{c1{!Ein Laufzeitfehler kann von der Eingabe abhängen.}}

{c1{Die IDE findet alle Laufzeitfehler vor dem Start.}}

{h{Wenn die IDE alle Fehler vorher fände, gäbe es keine Abstürze.}}
{H{Richtig! Laufzeitfehler zeigen sich erst beim Ausführen.}}

**5. Ergänze: Mit {t{Double.parseDouble}} machst du aus der Zeichenkette 3.5 eine Kommazahl.**

::::
