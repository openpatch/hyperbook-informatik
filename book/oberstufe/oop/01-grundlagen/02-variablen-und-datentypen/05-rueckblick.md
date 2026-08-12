---
title: Rückblick
index: 5
---

# Rückblick

Variablen und Datentypen sind die Bausteine, mit denen alles Weitere gebaut wird. Die Fehler, die hier entstehen, sind besonders zäh: Sie erzeugen keine Fehlermeldung, sondern falsche Werte.

## Das kann ich jetzt

- [ ] Ich kann **Deklaration** und **Wertzuweisung** unterscheiden und weiß, dass `=` von rechts nach links gelesen wird. ([2.1](./01-variablen))
- [ ] Ich benutze sprechende Bezeichner in `camelCase`. ([2.1](./01-variablen))
- [ ] Ich kann die vier elementaren Datentypen nennen und den passenden auswählen. ([2.2](./02-datentypen))
- [ ] Ich kann erklären, was bei einer **Typumwandlung** in beide Richtungen passiert. ([2.2](./02-datentypen))
- [ ] Ich kann eine Eingabe einlesen und in eine Zahl umwandeln. ([2.3](./03-eingaben))
- [ ] Ich kann mit Zeichenketten arbeiten und vergleiche sie **immer** mit `equals`. ([2.4](./04-zeichenketten))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Werte verfolgen**

Führ eine Tabelle auf Papier: eine Spalte je Variable, eine Zeile je Anweisung. Trag nach jeder Zeile ein, was in den Variablen steht.

```java
void main() {
    int a = 4;
    int b = 10;

    a = a + b;
    b = a - b;
    a = a - b;

    IO.println("a = " + a + ", b = " + b);

    int c = 7;
    c += 3;
    c *= 2;
    c--;
    c /= 4;

    IO.println("c = " + c);
}
```

a) Was steht am Ende in `a` und `b`? Was hat der erste Block bewirkt?

b) Was steht in `c`? Rechne jeden Schritt einzeln.

c) Der zweite Block endet mit `c /= 4`. Erkläre, warum das Ergebnis keine Kommazahl ist.
:::

::::collapsible{title="Tipp zu a)"}

Rechne stur von rechts nach links: Erst wird die rechte Seite ausgewertet, dann steht das Ergebnis links. Nach der ersten Zeile hat `a` schon einen neuen Wert – und mit **diesem** wird in Zeile 2 weitergerechnet.

::::

:::onlineide{height="500px"}

```java Main.java
void main() {
    int a = 4;
    int b = 10;

    a = a + b;
    b = a - b;
    a = a - b;

    IO.println("a = " + a + ", b = " + b);

    int c = 7;
    c += 3;
    c *= 2;
    c--;
    c /= 4;

    IO.println("c = " + c);
}
```

:::

:::protect{password="java-ef-2-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Ausgabe: `a = 10, b = 4`. Die drei Zeilen **vertauschen** die beiden Werte, ganz ohne Hilfsvariable:

| Anweisung | a | b |
| --- | --- | --- |
| Anfang | 4 | 10 |
| `a = a + b` | 14 | 10 |
| `b = a - b` | 14 | 4 |
| `a = a - b` | 10 | 4 |

Ein hübscher Trick – aber schlechter Stil. Mit einer Hilfsvariablen sieht jeder sofort, was gemeint ist.

b) `c = 4`.

| Anweisung | c |
| --- | --- |
| Anfang | 7 |
| `c += 3` | 10 |
| `c *= 2` | 20 |
| `c--` | 19 |
| `c /= 4` | 4 |

c) Weil `c` vom Typ `int` ist. 19 / 4 wäre 4.75, aber in einer `int`-Variablen ist dafür kein Platz – der Rest fällt weg. Die Variable bestimmt, was gespeichert werden kann, nicht die Rechnung.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Welcher Typ passt?**

Nenne für jede Angabe den passenden Datentyp und begründe kurz.

a) die Anzahl der Schülerinnen in einem Kurs

b) der Durchschnitt einer Klassenarbeit

c) die Antwort auf die Frage, ob eine Aufgabe gelöst wurde

d) der Buchstabe, mit dem ein Wort beginnt

e) eine Postleitzahl

f) ein Kaufpreis in Euro und Cent

Zu e) und f) gehört jeweils eine Überlegung, bei der die naheliegende Antwort **nicht** die beste ist.
:::

::::collapsible{title="Tipp zu e)"}

Rechnest du je mit einer Postleitzahl? Und was passiert mit der Postleitzahl `01067`, wenn du sie als Zahl speicherst?

::::

:::protect{password="java-ef-2-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `int` – eine Anzahl ist immer eine ganze Zahl.

b) `double` – ein Durchschnitt hat Nachkommastellen.

c) `boolean` – zwei mögliche Werte, mehr braucht es nicht.

d) `char` – genau ein Zeichen, in einfachen Anführungszeichen.

e) **`String`**, nicht `int`. Mit Postleitzahlen wird nie gerechnet, und als Zahl gespeichert verliert `01067` die führende Null. Faustregel: Eine Ziffernfolge, mit der man nicht rechnet, ist keine Zahl, sondern ein Text. Dasselbe gilt für Telefonnummern und Kontonummern.

f) Nahe liegt `double`. Für Geld ist das trotzdem heikel, weil `double` in Zweierpotenzen rechnet und Beträge wie 0.10 nicht exakt darstellen kann; über viele Rechnungen hinweg entstehen Cent-Abweichungen. Sauberer: **in Cent rechnen** und `int` nehmen. Für den Schulgebrauch ist `double` in Ordnung – man sollte den Grund aber kennen.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Ein Namensschild**

Schreib ein Programm, das einen Namen einliest und daraus ein Namensschild baut.

Aus der Eingabe `Amira` soll werden:

```
Hallo AMIRA!
Dein Name hat 5 Buchstaben.
Anfangsbuchstabe: A
Kürzel: Am.
```

a) Lies den Namen mit `IO.readln` ein.

b) Erzeuge die vier Ausgabezeilen. Das Kürzel besteht aus den ersten beiden Buchstaben und einem Punkt.

c) Ergänze eine Ausgabe, die prüft, ob der eingegebene Name `Amira` lautet, und `stimmt` oder `stimmt nicht` ausgibt. Benutze dafür **nicht** `==`.

d) Probier c) auch mit der Eingabe `amira` aus. Was passiert, und warum?
:::

::::collapsible{title="Tipp 1: Welche Methoden brauche ich?"}

| Verlangt | Methode |
| --- | --- |
| Anzahl der Buchstaben | `length()` |
| ein einzelnes Zeichen | `charAt(0)` |
| die ersten beiden Zeichen | `substring(0, 2)` |
| alles groß | `toUpperCase()` |

Denk daran, dass gezählt wird ab **0**.

::::

::::collapsible{title="Tipp 2: zu c)"}

Zeichenketten vergleicht man mit `equals`:

```java
if (name.equals("Amira")) {
    IO.println("stimmt");
} else {
    IO.println("stimmt nicht");
}
```

Verzweigungen kommen erst im nächsten Kapitel – hier darfst du das Muster einfach übernehmen.

::::

:::onlineide{height="420px"}

```java Main.java
void main() {
    String name = IO.readln("Wie heisst du? ");

    // Deine Ausgaben:

}
```

:::

:::protect{password="java-ef-2-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
void main() {
    String name = IO.readln("Wie heisst du? ");

    IO.println("Hallo " + name.toUpperCase() + "!");
    IO.println("Dein Name hat " + name.length() + " Buchstaben.");
    IO.println("Anfangsbuchstabe: " + name.charAt(0));
    IO.println("Kürzel: " + name.substring(0, 2) + ".");

    if (name.equals("Amira")) {
        IO.println("stimmt");
    } else {
        IO.println("stimmt nicht");
    }
}
```

d) Bei der Eingabe `amira` kommt `stimmt nicht` heraus. `equals` vergleicht Zeichen für Zeichen, und `a` ist nicht `A`. Wer die Schreibweise ignorieren will, nimmt `equalsIgnoreCase` – oder vergleicht beide Seiten in Großbuchstaben.

**Zwei Fallen in dieser Aufgabe:**

- `charAt(0)` liefert den **ersten** Buchstaben, nicht `charAt(1)`. Gezählt wird ab null.
- `substring(0, 2)` liefert die Zeichen an den Positionen 0 und 1 – die zweite Zahl ist die erste, die **nicht** mehr dazugehört. Genau deshalb ist die Länge des Ergebnisses gerade die Differenz beider Zahlen.

:::

<!--
Rückblick zu KLP EF, Daten und ihre Strukturierung: elementare Datentypen und
Objekttypen, Wertzuweisungen. Aufgabe 2 zielt auf das begründete Zuordnen (M).
-->

---

## Selbsttest

::::multievent

**1. Wie wird die Anweisung a gleich a plus 1 gelesen?**

{r1{a ist gleich a plus 1, also eine Gleichung}}

{r1{!a bekommt den Wert, der sich aus dem alten a plus 1 ergibt}}

{r1{a und a plus 1 werden verglichen}}

{r1{die Anweisung ist unsinnig}}

{h{Das Gleichheitszeichen bedeutet in Java nicht Gleichheit.}}
{H{Richtig – immer von rechts nach links lesen.}}

**2. Welcher Datentyp passt für eine Postleitzahl?**

{r2{int}}

{r2{double}}

{r2{!String}}

{r2{char}}

{h{Rechnest du je mit einer Postleitzahl? Und was wird aus der führenden Null?}}
{H{Richtig. Eine Ziffernfolge, mit der man nicht rechnet, ist ein Text.}}

**3. Was ergibt die Umwandlung von 3.99 in einen int?**

{z{3}}

{h{Die Nachkommastellen werden abgeschnitten, nicht gerundet.}}
{H{Richtig – zum Runden gibt es Math.round.}}

**4. Womit vergleicht man zwei Zeichenketten auf gleichen Inhalt?**

{r3{mit dem doppelten Gleichheitszeichen}}

{r3{!mit equals}}

{r3{mit compareTo gleich null}}

{r3{mit einem einfachen Gleichheitszeichen}}

{h{Das doppelte Gleichheitszeichen vergleicht Verweise, nicht Inhalte.}}
{H{Richtig. Bei int ist es dagegen genau richtig.}}

**5. Welche Bezeichner sind gültig UND guter Stil? Wähle alle zutreffenden aus.**

{c1{!anzahlSchueler}}

{c1{!mittlereNote}}

{c1{x}}

{c1{anzahl schueler}}

{c1{2teNote}}

{h{Zwei Angebote sind schon syntaktisch falsch, eines ist erlaubt, aber nichtssagend.}}
{H{Richtig – ein Bezeichner sagt, was drinsteht.}}

**6. Was liefert charAt mit dem Wert 0 bei der Zeichenkette Amira?**

{r4{m}}

{r4{!A}}

{r4{Am}}

{r4{einen Fehler}}

{h{Gezählt wird ab null.}}
{H{Richtig.}}

**7. Was liefert substring mit 0 und 2 bei Amira?**

{r5{A}}

{r5{!Am}}

{r5{Ami}}

{r5{mi}}

{h{Die zweite Zahl ist die erste Position, die nicht mehr dazugehört.}}
{H{Richtig – die Länge des Ergebnisses ist gerade die Differenz.}}

**8. Warum muss eine Eingabe umgewandelt werden, bevor man mit ihr rechnet?**

{r6{Weil IO.readln nur Großbuchstaben liefert.}}

{r6{!Weil IO.readln eine Zeichenkette liefert, und mit einer Zeichenkette kann Java nicht rechnen.}}

{r6{Weil Eingaben immer Kommazahlen sind.}}

{r6{Das ist nicht nötig.}}

{h{Sieh dir den Typ an, den IO.readln zurückgibt.}}
{H{Richtig – dafür gibt es Integer.parseInt und Double.parseDouble.}}

::::
