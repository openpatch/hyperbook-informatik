---
title: Rückblick
index: 6
---

# Rückblick

Objektorientierung ist kein neues Werkzeug, sondern eine neue **Sichtweise**: Daten und die Handlungen darauf gehören zusammen. Wer das verinnerlicht hat, schreibt von selbst besseren Code – auch außerhalb von Java.

## Das kann ich jetzt

- [ ] Ich kann eine Klasse mit Attributen, Konstruktor und Methoden schreiben. ([6.1](./01-klassen-und-objekte))
- [ ] Ich kann **Klasse** und **Objekt** sicher auseinanderhalten. ([6.1](./01-klassen-und-objekte))
- [ ] Ich kann erklären, warum Attribute `private` sind, und den Zugriff über Methoden regeln. ([6.2](./02-geheimnisprinzip))
- [ ] Ich kann eine **Assoziation** umsetzen: ein Objekt, das ein anderes kennt. ([6.3](./03-assoziation))
- [ ] Ich kann mit `extends` eine Unterklasse bilden und eine Methode überschreiben. ([6.4](./04-vererbung))
- [ ] Ich kann eine eigene Sprite-Klasse schreiben und damit Vererbung sichtbar machen. ([6.5](./05-eigene-sprites))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Klasse oder Objekt?**

a) Erkläre den Unterschied zwischen Klasse und Objekt an einem Beispiel aus dem Alltag, das **nicht** aus dem Unterricht stammt.

b) Wie viele Objekte entstehen in diesem Ausschnitt, und wie viele Klassen sind beteiligt?

```java
Auto ersterWagen = new Auto("VW", 84000, 7500.0);
Auto zweiterWagen = new Auto("Fiat", 12000, 14900.0);
Auto[] flotte = new Auto[3];
flotte[0] = ersterWagen;
```

c) Was steht nach der letzten Zeile in `flotte[0]` – eine Kopie des Autos oder etwas anderes? Was folgt daraus, wenn jemand `flotte[0].aenderePreisUm(-500.0)` aufruft?

d) Wie viele der drei Plätze in `flotte` enthalten danach ein Auto?
:::

::::collapsible{title="Tipp zu c)"}

`Auto` ist ein Objekttyp. Erinnere dich an [Kapitel 2](../02-variablen-und-datentypen/02-datentypen): Was steht bei einem Objekttyp in der Variablen?

::::

:::protect{password="java-ef-6-6-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zum Beispiel: *Hausschlüssel* ist die Klasse – der Bauplan sagt, dass ein Schlüssel eine Form und ein Schloss hat, zu dem er passt. Dein Schlüssel in der Tasche ist ein Objekt davon, der deiner Nachbarin ein anderes. Beide sind nach demselben Bauplan gemacht und haben doch verschiedene Werte.

Gut ist jede Antwort, in der die Klasse den **Bauplan** und das Objekt das **einzelne Ding mit eigenen Werten** bezeichnet.

b) Es entstehen **drei** Objekte: zwei Autos und ein Feld. Beteiligt sind zwei Klassen – `Auto` und die Klasse des Feldes. Wer nur die zwei Autos gezählt hat, liegt bei der üblichen Sprechweise richtig; wichtig ist die Einsicht, dass auch `new Auto[3]` etwas erzeugt, nämlich einen Behälter mit drei leeren Plätzen.

c) Eine **Referenz** auf dasselbe Auto, keine Kopie. `flotte[0]` und `ersterWagen` bezeichnen dasselbe Objekt. Ein `aenderePreisUm(-500.0)` über den einen Namen ist deshalb auch über den anderen sichtbar – es gibt nur ein Auto.

d) **Einen.** Die Plätze 1 und 2 sind leer; sie enthalten `null`, also gar keinen Verweis. Ein Aufruf wie `flotte[1].schreibeInfos()` bricht deshalb ab.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Eine Klasse aufbauen**

Schreib die Klasse `Schueler` mit:

- den Attributen `name` (String), `punkte` (int) und `fehltage` (int), alle `private`,
- einem Konstruktor, der Name und Punkte setzt und die Fehltage auf 0,
- einer Methode `double gibNote()`, die nach der Formel aus [Kapitel 4](../04-methoden-und-modularisierung/04-rueckblick) rechnet,
- einer Methode `void fehlt()`, die die Fehltage um eins erhöht,
- einer Methode `void schreibeInfos()`, die alles ausgibt.

Leg im Hauptprogramm zwei Objekte an, lass eines zweimal fehlen und gib beide aus.
:::

::::collapsible{title="Tipp 1: Der Aufbau einer Klasse"}

Immer dieselbe Reihenfolge:

```java
public class Schueler {

    // 1. Attribute
    private String name;

    // 2. Konstruktor - heißt wie die Klasse, hat keinen Rückgabetyp
    public Schueler(String pName, int pPunkte) {
        name = pName;
    }

    // 3. Methoden
}
```

::::

::::collapsible{title="Tipp 2: Wo bleiben die Parameter?"}

Der Konstruktor bekommt die Werte von außen und schreibt sie in die Attribute. Deshalb die `p`-Vorsilbe bei Parametern: `name = pName;` ist eindeutig, `name = name;` wäre es nicht.

::::

:::onlineide{height="600px"}

```java Main.java
void main() {
    // Deine Objekte:

}
```

```java Schueler.java
public class Schueler {

    // Deine Klasse:

}
```

:::

:::protect{password="java-ef-6-6-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java Main.java
void main() {
    Schueler amira = new Schueler("Amira", 88);
    Schueler ben = new Schueler("Ben", 64);

    ben.fehlt();
    ben.fehlt();

    amira.schreibeInfos();
    ben.schreibeInfos();
}
```

```java Schueler.java
public class Schueler {

    private String name;
    private int punkte;
    private int fehltage;

    public Schueler(String pName, int pPunkte) {
        name = pName;
        punkte = pPunkte;
        fehltage = 0;
    }

    public double gibNote() {
        return 1.0 + 5.0 * (100 - punkte) / 100.0;
    }

    public void fehlt() {
        fehltage = fehltage + 1;
    }

    public void schreibeInfos() {
        IO.println(name + ": " + punkte + " Punkte, Note " + gibNote()
                   + ", Fehltage: " + fehltage);
    }
}
```

Ausgabe:

```
Amira: 88 Punkte, Note 1.6, Fehltage: 0
Ben: 64 Punkte, Note 2.8, Fehltage: 2
```

Beachte, dass `schreibeInfos` die Methode `gibNote()` aufruft, statt die Formel noch einmal hinzuschreiben – dieselbe Regel wie bei den Methoden in Kapitel 4. Und beachte, dass **kein** Objekt übergeben werden muss: Innerhalb der Klasse arbeiten die Methoden selbstverständlich mit den Attributen des eigenen Objekts.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Geheimnisprinzip und Vererbung**

a) `punkte` ist `private`. Was passiert bei `amira.punkte = 200;` im Hauptprogramm – und warum ist es gut, dass es passiert?

b) Ergänze eine Methode, mit der sich die Punktzahl **kontrolliert** ändern lässt und die Werte über 100 oder unter 0 zurückweist. Welchen Vorteil hat das gegenüber einem öffentlichen Attribut?

c) Schreib eine Unterklasse `Austauschschueler`, die zusätzlich das Attribut `herkunftsland` hat und `schreibeInfos` so überschreibt, dass das Land mit ausgegeben wird.

d) Nenne den Fachbegriff für die Beziehung zwischen `Schueler` und `Austauschschueler` und formuliere sie als Satz mit „ist ein".
:::

::::collapsible{title="Tipp zu c)"}

Zwei Dinge sind nötig, die es bisher nicht gab:

```java
public class Austauschschueler extends Schueler {

    private String herkunftsland;

    public Austauschschueler(String pName, int pPunkte, String pLand) {
        super(pName, pPunkte);
        herkunftsland = pLand;
    }
}
```

`super(...)` ruft den Konstruktor der Oberklasse auf – sie muss ihre eigenen Attribute ja selbst füllen können. In der überschriebenen Methode kommt man mit `super.schreibeInfos()` an die ursprüngliche Fassung.

::::

:::protect{password="java-ef-6-6-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Es gibt einen **Übersetzungsfehler**: Von außen ist `punkte` nicht sichtbar. Gut ist das, weil 200 Punkte in einer Arbeit mit 100 erreichbaren Punkten unsinnig sind. Ein Objekt soll seine eigenen Daten in einem sinnvollen Zustand halten können – dafür muss es kontrollieren, was hineingeschrieben wird. Das ist das **Geheimnisprinzip**.

b)

```java
public void setzePunkte(int pPunkte) {
    if (pPunkte >= 0 && pPunkte <= 100) {
        punkte = pPunkte;
    } else {
        IO.println("Ungültige Punktzahl: " + pPunkte);
    }
}
```

Der Vorteil: Die Prüfung steht an **einer** Stelle und gilt für jeden Zugriff. Bei einem öffentlichen Attribut müsste jede aufrufende Stelle selbst daran denken – und eine wird es vergessen.

c)

```java Austauschschueler.java
public class Austauschschueler extends Schueler {

    private String herkunftsland;

    public Austauschschueler(String pName, int pPunkte, String pLand) {
        super(pName, pPunkte);
        herkunftsland = pLand;
    }

    public void schreibeInfos() {
        super.schreibeInfos();
        IO.println("   Herkunftsland: " + herkunftsland);
    }
}
```

d) Es ist eine **Vererbung** oder *Generalisierung/Spezialisierung*. Der Satz lautet: „Ein Austauschschüler **ist ein** Schüler." Genau dieser Satz ist die Probe: Wo er sich nicht sinnvoll bilden lässt, ist Vererbung die falsche Wahl. „Ein Schüler ist ein Stundenplan" – also keine Vererbung, sondern eine Assoziation.

:::

<!--
Rückblick zu KLP EF, Daten und ihre Strukturierung: Klassenmodellierungen mit
Attributen, Methoden, Sichtbarkeitsbereichen; Klassenbeziehungen Assoziation
und Vererbung. Aufgabe 3d) zielt auf die Beurteilung der Modellierung (A).
-->

---

## Selbsttest

::::multievent

**1. Was ist eine Klasse?**

{r1{ein einzelnes Ding mit eigenen Werten}}

{r1{!ein Bauplan, nach dem Objekte erzeugt werden}}

{r1{eine Sammlung von Variablen}}

{r1{ein anderes Wort für Methode}}

{h{Das einzelne Ding ist das Objekt.}}
{H{Richtig.}}

**2. Was leistet der Konstruktor?**

{c1{!Er wird beim Erzeugen eines Objekts ausgeführt.}}

{c1{!Er füllt die Attribute mit Anfangswerten.}}

{c1{Er gibt einen Wert zurück.}}

{c1{Er muss in jeder Klasse selbst geschrieben werden.}}

{h{Zwei Aussagen treffen zu. Sieh dir insbesondere an, ob ein Konstruktor einen Rückgabetyp hat.}}
{H{Richtig – er heißt wie die Klasse und hat keinen Rückgabetyp.}}

**3. Warum sind Attribute private?**

{r2{Damit sie weniger Speicher brauchen.}}

{r2{!Damit das Objekt selbst kontrollieren kann, welche Werte hineinkommen.}}

{r2{Weil Java das verlangt.}}

{r2{Damit sie schneller sind.}}

{h{Denk an die Punktzahl 200 in einer Arbeit mit 100 erreichbaren Punkten.}}
{H{Richtig – das ist das Geheimnisprinzip.}}

**4. Zwei Variablen verweisen auf dasselbe Objekt. Was gilt?**

{r3{Es gibt zwei Objekte mit gleichen Werten.}}

{r3{!Es gibt ein Objekt; eine Änderung über den einen Namen ist über den anderen sichtbar.}}

{r3{Die zweite Variable ist eine Kopie.}}

{r3{Das ist in Java nicht möglich.}}

{h{Bei Objekttypen steht in der Variablen ein Verweis, nicht das Objekt.}}
{H{Richtig.}}

**5. Was steht in einem Feld von Objekten auf einem Platz, dem noch nichts zugewiesen wurde?**

{r4{ein leeres Objekt}}

{r4{!null, also gar kein Verweis}}

{r4{der Wert 0}}

{r4{eine leere Zeichenkette}}

{h{Das Feld anzulegen erzeugt die Objekte nicht mit.}}
{H{Richtig – deshalb bricht ein Methodenaufruf darauf ab.}}

**6. Wozu dient super in einem Konstruktor einer Unterklasse?**

{r5{Es erzeugt ein zweites Objekt.}}

{r5{!Es ruft den Konstruktor der Oberklasse auf, damit diese ihre Attribute setzen kann.}}

{r5{Es überschreibt eine Methode.}}

{r5{Es macht die Klasse öffentlich.}}

{h{Die Oberklasse hat eigene, private Attribute – wer soll sie füllen?}}
{H{Richtig.}}

**7. Welche Beziehung gehört zu Vererbung?**

{r6{hat ein}}

{r6{!ist ein}}

{r6{benutzt ein}}

{r6{kennt ein}}

{h{Ein Austauschschüler ... ein Schüler.}}
{H{Richtig – wo dieser Satz unsinnig klingt, gehört keine Vererbung hin, sondern eine Assoziation.}}

::::
