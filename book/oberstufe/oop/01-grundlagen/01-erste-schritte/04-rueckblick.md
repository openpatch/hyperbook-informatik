---
title: Rückblick
index: 4
---

# Rückblick

Drei Lektionen, und du hast bereits alles beisammen, was ein Programm im Kern ausmacht: Anweisungen, die der Reihe nach abgearbeitet werden. Prüfe zum Abschluss, ob die Grundlagen sitzen – alles Weitere baut darauf auf.

## Das kann ich jetzt

- [ ] Ich kann ein Hauptprogramm mit `void main()` schreiben und weiß, wo die Ausführung beginnt. ([1.1](./01-das-erste-programm))
- [ ] Ich kann eine Fehlermeldung der IDE lesen und weiß, dass ich beim **obersten** Fehler anfange. ([1.1](./01-das-erste-programm))
- [ ] Ich kann erklären, was ein guter Kommentar leistet. ([1.1](./01-das-erste-programm))
- [ ] Ich kann mit `+`, `-`, `*`, `/` und `%` rechnen und weiß, was **Punkt vor Strich** bedeutet. ([1.2](./02-rechnen))
- [ ] Ich kann die **Ganzzahldivision** von der Kommadivision unterscheiden. ([1.2](./02-rechnen))
- [ ] Ich kann erklären, wozu **Modulo** gut ist. ([1.2](./02-rechnen))
- [ ] Ich kann eine Figur auf eine Bühne stellen, ihr ein Kostüm geben und sie bewegen. ([1.3](./03-die-erste-grafik))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Was gibt das Programm aus?**

Schreib die Ausgabe **auf Papier** auf, bevor du das Programm ausführst. Genau diese Vorhersage ist die Übung – wer nur auf *Start* drückt, lernt nichts.

```java
void main() {
    int a = 17;
    int b = 5;

    IO.println(a + b);
    IO.println(a - b * 2);
    IO.println(a / b);
    IO.println(a % b);
    IO.println((a + b) / 2);
    IO.println(a / 5.0);
    IO.println("a / b");
    IO.println("Ergebnis: " + a / b);
    IO.println("Ergebnis: " + a + b);
}
```

Die letzten beiden Zeilen unterscheiden sich nur durch die Klammern in Zeile 8. Erkläre, warum dabei etwas völlig anderes herauskommt.
:::

::::collapsible{title="Tipp zu den letzten beiden Zeilen"}

Das Pluszeichen bedeutet zweierlei: **Addition** bei Zahlen und **Aneinanderhängen** bei Texten. Sobald links ein Text steht, wird alles Weitere angehängt statt gerechnet – und Java arbeitet von links nach rechts.

::::

:::onlineide{height="440px"}

```java Main.java
void main() {
    int a = 17;
    int b = 5;

    IO.println(a + b);
    IO.println(a - b * 2);
    IO.println(a / b);
    IO.println(a % b);
    IO.println((a + b) / 2);
    IO.println(a / 5.0);
    IO.println("a / b");
    IO.println("Ergebnis: " + a / b);
    IO.println("Ergebnis: " + a + b);
}
```

:::

:::protect{password="java-ef-1-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```
22
7
3
2
11
3.4
a / b
Ergebnis: 3
Ergebnis: 175
```

Der Reihe nach:

- `a - b * 2` ist 17 − 10 = 7. Punkt vor Strich.
- `a / b` ist **3**, nicht 3.4: Zwei ganze Zahlen ergeben eine ganze Zahl, der Rest fällt weg.
- `a % b` ist der weggefallene Rest: 2.
- `a / 5.0` ist 3.4, weil eine der beiden Zahlen eine Kommazahl ist.
- `"a / b"` steht in Anführungszeichen und ist damit ein **Text**, keine Rechnung.
- `"Ergebnis: " + a / b`: Punkt vor Strich gilt auch hier – erst wird 17 / 5 = 3 gerechnet, dann angehängt.
- `"Ergebnis: " + a + b`: Java arbeitet von links nach rechts. `"Ergebnis: " + 17` ergibt den Text `Ergebnis: 17`, und daran wird die 5 angehängt: `Ergebnis: 175`.

Dieser letzte Fall ist der häufigste Anfängerfehler bei Ausgaben. Wer die Summe will, muss klammern: `"Ergebnis: " + (a + b)`.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Fehler auf Papier**

In diesem Programm stecken vier Fehler. Finde sie **auf Papier**, bevor du es in die IDE überträgst – dort werden sie dir sofort angezeigt, und die Übung wäre erledigt, bevor sie beginnt.

```java
void main() {
    int anzahl = 12
    int preis = 3;
    IO.println("Gesamt: " + anzahl * preis)
    IO.println(Danke für den Einkauf!);
    IO.printLn("Bis bald.");
}
```

a) Notiere zu jedem Fehler die Zeile und was fehlt oder falsch ist.

b) Schreib das Programm richtig auf und übertrag es dann in den Übungsbereich.

c) Ein fünfter Punkt fällt der IDE gar nicht auf, ist aber ungeschickt. Welcher?
:::

::::collapsible{title="Tipp zu c)"}

Sieh dir die Variable `preis` an. Was passiert, wenn ein Artikel 3,50 Euro kostet?

::::

:::onlineide{height="400px"}

```java Main.java
void main() {
    // Uebertrage hier deine berichtigte Fassung.

}
```

:::

:::protect{password="java-ef-1-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

1. Zeile 2: Semikolon fehlt hinter `int anzahl = 12`.
2. Zeile 4: Semikolon fehlt am Ende der Ausgabezeile.
3. Zeile 5: Der Text steht nicht in Anführungszeichen. Ohne sie hält Java `Danke` für einen Variablennamen.
4. Zeile 6: `printLn` mit großem L gibt es nicht. Java unterscheidet Groß- und Kleinschreibung – es heißt `println`.

b)

```java
void main() {
    int anzahl = 12;
    int preis = 3;
    IO.println("Gesamt: " + anzahl * preis);
    IO.println("Danke für den Einkauf!");
    IO.println("Bis bald.");
}
```

c) `preis` ist als `int` angelegt und kann deshalb keine Centbeträge aufnehmen. Bei 3,50 Euro müsste `double` stehen – oder man rechnet in Cent mit ganzen Zahlen, was bei Geld sogar die bessere Wahl ist. Der Übersetzer beanstandet das nicht: Das Programm ist **syntaktisch** in Ordnung, es rechnet nur mit falschen Werten.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Sekunden umrechnen**

Schreib ein Programm, das eine Anzahl Sekunden in Stunden, Minuten und Sekunden zerlegt.

Aus `gesamt = 9045` soll werden:

```
9045 Sekunden sind 2 Stunden, 30 Minuten und 45 Sekunden.
```

a) Überleg zuerst auf Papier: Welche Rechnung liefert die Stunden, welche die Minuten, welche die restlichen Sekunden?

b) Schreib das Programm.

c) Probiere es mit 60, mit 3600 und mit 59 aus. Stimmt die Ausgabe in allen drei Fällen?
:::

::::collapsible{title="Tipp 1: Welche Operatoren?"}

Du brauchst beide aus dieser Lektion: `/` liefert, **wie oft** etwas hineinpasst, `%` liefert, **was übrig bleibt**.

Eine Stunde hat 3600 Sekunden, eine Minute 60.

::::

::::collapsible{title="Tipp 2: Der Rest ist der Schlüssel"}

Rechne in dieser Reihenfolge:

1. Stunden: wie oft passen 3600 hinein?
2. Was bleibt übrig, nachdem die vollen Stunden abgezogen sind? Das ist `gesamt % 3600`.
3. Aus diesem Rest ergeben sich Minuten und Sekunden nach demselben Muster.

::::

:::onlineide{height="440px"}

```java Main.java
void main() {
    int gesamt = 9045;

    // Deine Rechnung:

    IO.println(gesamt + " Sekunden sind ...");
}
```

:::

:::protect{password="java-ef-1-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
void main() {
    int gesamt = 9045;

    int stunden = gesamt / 3600;
    int rest = gesamt % 3600;
    int minuten = rest / 60;
    int sekunden = rest % 60;

    IO.println(gesamt + " Sekunden sind " + stunden + " Stunden, "
               + minuten + " Minuten und " + sekunden + " Sekunden.");
}
```

Die Hilfsvariable `rest` ist der Kern der Lösung. Ohne sie geht es zwar auch:

```java
int minuten = (gesamt % 3600) / 60;
```

Mit ihr ist aber viel besser zu lesen, was passiert – und genau das ist der Sinn von Variablennamen.

c) Bei 60 kommt „0 Stunden, 1 Minuten und 0 Sekunden" heraus, bei 59 „0 Stunden, 0 Minuten und 59 Sekunden", bei 3600 „1 Stunden, 0 Minuten und 0 Sekunden". Rechnerisch stimmt alles. Sprachlich stört das „1 Minuten" – dafür bräuchte man eine Verzweigung, und die kommt in [Kapitel 3](../03-kontrollstrukturen/01-verzweigungen).

:::

<!--
Rückblick zu KLP EF, Algorithmen: implementieren iterative Algorithmen (I);
Daten und ihre Strukturierung: elementare Datentypen. Aufgabe 2c) zielt auf
die Unterscheidung von Syntax- und Semantikfehler.
-->

---

## Selbsttest

::::multievent

**1. Wo beginnt die Ausführung eines Programms?**

{r1{bei der ersten Zeile der Datei}}

{r1{!im Hauptprogramm, also in void main}}

{r1{bei der ersten Ausgabe}}

{r1{bei der letzten Methode}}

{h{Es gibt genau eine Stelle, an der ein Programm startet.}}
{H{Richtig.}}

**2. Was ergibt 17 geteilt durch 5 in Java, wenn beide Zahlen ganze Zahlen sind?**

{z{3}}

{h{Der Rest fällt weg.}}
{H{Richtig – das ist die Ganzzahldivision.}}

**3. Was ergibt 17 modulo 5?**

{z{2}}

{h{Modulo liefert genau das, was bei der Ganzzahldivision übrig bleibt.}}
{H{Richtig.}}

**4. Was gibt die Anweisung mit dem Text Summe, dann Plus, dann 3, dann Plus, dann 4 aus?**

{r2{Summe 7}}

{r2{!Summe 34}}

{r2{Summe 3 4}}

{r2{einen Fehler}}

{h{Sobald links ein Text steht, wird angehängt statt gerechnet – und Java arbeitet von links nach rechts.}}
{H{Richtig. Wer die Summe will, muss klammern.}}

**5. Bei welchem Fehler meldet sich der Übersetzer NICHT?**

{r3{ein fehlendes Semikolon}}

{r3{ein Text ohne Anführungszeichen}}

{r3{println mit großem L geschrieben}}

{r3{!ein Preis, der als ganze Zahl statt als Kommazahl angelegt ist}}

{r3{eine fehlende schließende Klammer}}

{h{Drei davon sind Verstöße gegen die Regeln der Sprache. Einer ist nur inhaltlich falsch.}}
{H{Richtig – ein Semantikfehler. Den findet nur, wer das Ergebnis prüft.}}

**6. Womit fängst du an, wenn die IDE fünf Fehler meldet?**

{r4{mit dem letzten}}

{r4{!mit dem obersten}}

{r4{mit dem, der am kürzesten beschrieben ist}}

{r4{mit einem beliebigen}}

{h{Ein Tippfehler erzeugt oft mehrere Folgemeldungen.}}
{H{Richtig – die verschwinden dann von selbst.}}

**7. Was passiert, wenn eine Figur zwar erzeugt, aber nicht mit this.add hinzugefügt wird?**

{r5{Das Programm bricht mit einem Fehler ab.}}

{r5{!Die Figur bleibt unsichtbar.}}

{r5{Die Figur erscheint in der linken oberen Ecke.}}

{r5{Die Bühne bleibt schwarz.}}

{h{Erzeugen und Aufstellen sind zwei verschiedene Dinge.}}
{H{Richtig – einer der häufigsten Anfängerfehler bei der Grafik.}}

::::
