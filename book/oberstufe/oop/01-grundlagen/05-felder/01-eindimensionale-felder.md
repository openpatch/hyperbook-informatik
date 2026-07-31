---
title: Eindimensionale Felder
index: 1
---

# Eindimensionale Felder

Am Ende des letzten Kapitels hattest du eine Methode mit fünf einzelnen Parametern – und ein schlechtes Gefühl dabei. Zu Recht. Was fehlt, ist ein Datentyp für **viele gleichartige Werte**.

Er heißt **Feld** – auf Englisch **Array**.

<!-- KLP EF, Daten und ihre Strukturierung: Datenstrukturen - statische Datenstrukturen in Form von eindimensionalen Feldern -->

## Das Problem

:::snippet{#aufgabe}
Stell dir vor, du sollst die Notenpunkte von 30 Personen speichern und daraus den Durchschnitt berechnen.

Schreibe **auf Papier** die ersten Zeilen des Programms, wenn du dafür einzelne Variablen benutzt. Wie viele Zeilen wären es insgesamt? Und wie sähe die Berechnung des Durchschnitts aus?
:::

::::collapsible{title="Auflösung"}

```java
int punkte1 = 11;
int punkte2 = 8;
int punkte3 = 14;
// ... 27 weitere Zeilen
```

Und der Durchschnitt:

```java
double schnitt = (punkte1 + punkte2 + punkte3 + ... + punkte30) / 30.0;
```

Das ist nicht nur mühsam. Es ist prinzipiell falsch gedacht: Sobald 31 Personen im Kurs sind, muss das **Programm** geändert werden. Die Anzahl gehört aber zu den **Daten**, nicht zum Programm.

::::

## Ein Feld anlegen

:::onlineide{height="470px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = new int[5];

    punkte[0] = 11;
    punkte[1] = 8;
    punkte[2] = 14;
    punkte[3] = 6;
    punkte[4] = 12;

    IO.println("Erster Wert:  " + punkte[0]);
    IO.println("Letzter Wert: " + punkte[4]);
    IO.println("Anzahl:       " + punkte.length);
}
```

:::

:::snippet{#merken}
| Schreibweise | Bedeutung |
| --- | --- |
| `int[] punkte` | deklariert eine Variable für ein Feld von `int`-Werten |
| `new int[5]` | legt ein Feld mit **5 Plätzen** an |
| `punkte[2]` | greift auf den Platz mit dem **Index** 2 zu |
| `punkte.length` | liefert die Anzahl der Plätze – **ohne** Klammern |

Der Index beginnt bei **0**. Ein Feld mit 5 Plätzen hat die Indizes 0, 1, 2, 3 und 4.

Ein frisch angelegtes Feld ist nicht leer: Bei `int` stehen überall Nullen, bei `double` 0.0, bei `boolean` überall `false`, bei Objekttypen `null`.
:::

Ein Bild dazu – ein Feld ist wie eine **Kiste mit nummerierten Fächern**:

```
punkte
┌────┬────┬────┬────┬────┐
│ 11 │  8 │ 14 │  6 │ 12 │
└────┴────┴────┴────┴────┘
   0    1    2    3    4     ← Index
```

## Kürzer anlegen

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12};
    String[] namen = {"Ada", "Alan", "Grace"};
    double[] messwerte = {1.5, 2.25, 0.75};

    IO.println(punkte.length + " Punktzahlen");
    IO.println(namen.length + " Namen, der zweite ist " + namen[1]);
    IO.println(messwerte.length + " Messwerte");
}
```

:::

:::snippet{#merken}
Bei der Kurzform bestimmt die Anzahl der Werte in den geschweiften Klammern die Länge des Feldes. Ein `new` brauchst du dann nicht.

Diese Form geht nur bei der **Deklaration**. Später kannst du einem Feld nicht mehr einfach `{1, 2, 3}` zuweisen.
:::

## Die häufigste Fehlermeldung

:::snippet{#aufgabe}
Sage voraus, was das Programm macht. Führe es dann aus und lies die Fehlermeldung genau.
:::

:::onlineide{height="400px" speed="1000000"}

```java Main.java
void main() {
    int[] punkte = {11, 8, 14, 6, 12};

    IO.println(punkte[4]);
    IO.println(punkte[5]);
}
```

:::

::::collapsible{title="Auflösung"}

Die erste Ausgabe liefert 12. Die zweite bricht mit einem **Laufzeitfehler** ab: Der Index 5 liegt außerhalb des Feldes.

Ein Feld der Länge 5 hat die Indizes 0 bis **4**. Diesen Fehler machst du garantiert noch oft – deshalb lohnt es sich, die Meldung zu kennen.

Merke: Der größte gültige Index ist immer `length - 1`.

::::

## Erst denken, dann Rechner

:::snippet{#aufgabe}
Verfolge das Programm **auf Papier**. Zeichne die Kiste mit den vier Fächern und trage nach jeder Zeile ein, was wo steht.
:::

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    int[] zahlen = new int[4];

    zahlen[1] = 12;
    zahlen[2] = 8;
    zahlen[0] = zahlen[2] * 3;
    zahlen[3] = zahlen[1] + zahlen[0];

    for (int i = 0; i < 4; i++) {
        IO.println(i + ": " + zahlen[i]);
    }
}
```

:::

::::collapsible{title="Auflösung"}

```
0: 24
1: 12
2: 8
3: 36
```

| Zeile | Feld danach |
| --- | --- |
| `new int[4]` | `[0, 0, 0, 0]` |
| `zahlen[1] = 12` | `[0, 12, 0, 0]` |
| `zahlen[2] = 8` | `[0, 12, 8, 0]` |
| `zahlen[0] = zahlen[2] * 3` | `[24, 12, 8, 0]` |
| `zahlen[3] = zahlen[1] + zahlen[0]` | `[24, 12, 8, 36]` |

Die Zuweisungen erfolgen **nicht** in Indexreihenfolge – das macht die Aufgabe aus.

::::

## Aufgabe: Wochentage

:::snippet{#aufgabe}
Schreibe ein Programm, das eine Zahl von 1 bis 7 einliest und den zugehörigen Wochentag ausgibt.

Löse es **ohne** `if` und **ohne** `switch` – nur mit einem Feld.
:::

:::onlineide{height="440px" speed="1000000"}

```java Main.java
void main() {
    String[] tage = {"Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"};

    int nummer = Integer.parseInt(IO.readln("Tag (1 bis 7): "));

    // Dein Code hier

}
```

:::

::::collapsible{title="Tipp: Der Versatz"}

Der Montag ist der Tag Nummer **1**, steht im Feld aber an Index **0**. Du musst also umrechnen.

::::

:::protect{password="java-ef-5-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    String[] tage = {"Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"};

    int nummer = Integer.parseInt(IO.readln("Tag (1 bis 7): "));

    if (nummer >= 1 && nummer <= 7) {
        IO.println("Das ist ein " + tage[nummer - 1]);
    } else {
        IO.println("Es gibt keinen Tag mit dieser Nummer.");
    }
}
```

Ohne die Bereichsprüfung stürzt das Programm bei der Eingabe 0 oder 8 ab. Ein Feld ersetzt die Fallunterscheidung – aber die **Gültigkeitsprüfung** bleibt deine Aufgabe.

:::

## Zusatzaufgabe

:::snippet{#brain}
Ein Feld kann auch die Bühne füllen. Lege ein Feld mit fünf verschiedenen Kostümnamen an – etwa `coin_gold`, `gemBlue`, `gemRed`, `keyGreen`, `star` – und stelle die fünf Figuren nebeneinander auf die Bühne.

Du brauchst dafür noch keine Schleife, aber mit einer wird es deutlich kürzer. Wie das geht, siehst du in der nächsten Lektion.
:::

---

## Selbsttest

::::multievent

**1. Welchen Index hat der erste Platz eines Feldes?**

{z{0}}

{h{Java zählt bei Feldern genauso wie bei Zeichenketten.}}
{H{Richtig!}}

**2. Welchen größten Index darf ein Feld mit 8 Plätzen haben?**

{z{7}}

{h{Der größte Index ist immer um eins kleiner als die Länge.}}
{H{Richtig!}}

**3. Wie fragst du die Anzahl der Plätze eines Feldes ab?**

{r1{mit length und runden Klammern}}

{r1{!mit length ohne Klammern}}

{r1{mit size}}

{h{Bei Zeichenketten ist es anders als bei Feldern.}}
{H{Richtig! Zeichenketten haben length mit Klammern, Felder ohne.}}

**4. Was steht in einem frisch mit new angelegten Feld von ganzen Zahlen?**

{r2{nichts, es ist leer}}

{r2{!überall Nullen}}

{r2{zufällige Werte}}

{h{Java belegt jeden Platz mit einem Standardwert vor.}}
{H{Richtig! Bei Wahrheitswerten wäre es überall falsch.}}

**5. Welche Aussagen stimmen?** (Mehrfachauswahl)

{c1{!Ein Feld speichert viele Werte desselben Typs.}}

{c1{!Der Zugriff erfolgt über einen Index in eckigen Klammern.}}

{c1{!Ein Zugriff außerhalb des Feldes ist ein Laufzeitfehler.}}

{c1{Die Länge eines Feldes lässt sich nachträglich ändern.}}

{h{Deshalb heißt es eine statische Datenstruktur.}}
{H{Richtig! Die Länge steht beim Anlegen fest.}}

::::
