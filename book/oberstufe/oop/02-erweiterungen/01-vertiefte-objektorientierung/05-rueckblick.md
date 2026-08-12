---
title: Rückblick
index: 5
---

# Rückblick

In diesem Kapitel ging es nicht um neue Sprachmittel, sondern um **Entwurfsentscheidungen**: Wann zieht man Gemeinsames nach oben? Wann genügt eine Zusicherung, wann braucht es eine gemeinsame Oberklasse? Genau danach wird in der Qualifikationsphase gefragt.

## Das kann ich jetzt

- [ ] Ich kann ein **Implementationsdiagramm** lesen und in ein Klassengerüst übersetzen – und umgekehrt. ([1.1](./01-implementationsdiagramme))
- [ ] Ich kenne die Zeichen für die Sichtbarkeiten und weiß, was unterstrichen bedeutet. ([1.1](./01-implementationsdiagramme))
- [ ] Ich kann **Polymorphie** an einem Beispiel erklären und sagen, wann entschieden wird, welche Methode läuft. ([1.2](./02-polymorphie))
- [ ] Ich kann begründen, wann eine Klasse **abstrakt** sein sollte. ([1.3](./03-abstrakte-klassen))
- [ ] Ich kann eine **Schnittstelle** von einer abstrakten Klasse unterscheiden und beide einsetzen. ([1.4](./04-schnittstellen))

:::alert{info}
Aufgabe 3 gehört zum **Leistungskurs**, weil sie Schnittstellen verlangt.
:::

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Diagramm lesen und schreiben**

```
┌──────────────────────────────────┐
│         «abstract» Form          │
├──────────────────────────────────┤
│ # name : String                  │
├──────────────────────────────────┤
│ + Form(pName : String)           │
│ + gibName() : String             │
│ + berechneFlaeche() : double     │  ← abstrakt
│ + beschreibe() : void            │
└──────────────────────────────────┘
                 △
        ┌────────┴────────┐
┌───────────────┐  ┌──────────────────────┐
│    Kreis      │  │      Rechteck        │
├───────────────┤  ├──────────────────────┤
│ - radius:double│ │ - breite : double    │
│               │  │ - hoehe : double     │
└───────────────┘  └──────────────────────┘
```

a) Schreib das Klassengerüst zu `Form` und `Kreis` – ohne Methodenrümpfe, nur Köpfe, Sichtbarkeiten und Typen.

b) Warum ist `name` mit `#` gekennzeichnet und nicht mit `-`? Was wäre der Nachteil von `-`?

c) `berechneFlaeche` ist abstrakt. Was folgt daraus für `Form`, und was für jede Unterklasse?

d) `beschreibe()` ist **nicht** abstrakt, obwohl sie die Fläche ausgeben soll. Wie kann das funktionieren, wenn `Form` gar nicht weiß, wie man die Fläche berechnet?
:::

::::collapsible{title="Tipp zu d)"}

Eine nicht abstrakte Methode in der Oberklasse darf eine abstrakte Methode derselben Klasse aufrufen. Zur Laufzeit steht ja fest, welches Objekt gemeint ist – und damit auch, welche Fassung von `berechneFlaeche` gilt.

::::

:::protect{password="java-q-1-5-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

```java Form.java
public abstract class Form {

    protected String name;

    public Form(String pName) {
        name = pName;
    }

    public String gibName() {
        return name;
    }

    public abstract double berechneFlaeche();

    public void beschreibe() {
        IO.println(name + " hat die Flaeche " + berechneFlaeche());
    }
}
```

```java Kreis.java
public class Kreis extends Form {

    private double radius;

    public Kreis(double pRadius) {
        super("Kreis");
        radius = pRadius;
    }

    public double berechneFlaeche() {
        return Math.PI * radius * radius;
    }
}
```

b) `#` bedeutet `protected`: sichtbar in der Klasse **und in allen Unterklassen**, aber nicht von außen. Mit `-` käme keine Unterklasse an `name` heran; sie müsste über `gibName()` gehen. Das wäre nicht falsch – nur umständlicher. Die Frage „wie weit mache ich es auf?" ist hier eine echte Entwurfsentscheidung, und die vorsichtige Antwort `private` ist im Zweifel die bessere.

c) Für `Form`: Von ihr lassen sich **keine Objekte** erzeugen; `new Form("x")` ist ein Fehler. Für jede Unterklasse: Sie **muss** `berechneFlaeche` implementieren, sonst wäre sie selbst abstrakt.

d) Genau darin liegt der Nutzen: `beschreibe()` ruft `berechneFlaeche()` auf, ohne zu wissen, welche Fassung das sein wird. Erst zur **Laufzeit** steht fest, ob das Objekt ein Kreis oder ein Rechteck ist – und dann läuft die passende Methode. Das ist **Polymorphie**, und `beschreibe()` muss deshalb nur einmal geschrieben werden statt in jeder Unterklasse.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Wer wird aufgerufen?**

```java
Form[] formen = new Form[3];
formen[0] = new Kreis(2.0);
formen[1] = new Rechteck(3.0, 4.0);
formen[2] = new Quadrat(5.0);

for (int i = 0; i < formen.length; i++) {
    formen[i].beschreibe();
}
```

`Quadrat` ist dabei eine Unterklasse von `Rechteck`.

a) Der Feldtyp ist `Form`, gespeichert sind drei verschiedene Klassen. Warum ist das erlaubt?

b) Welche `berechneFlaeche`-Fassung läuft in jedem der drei Durchläufe? Wann wird das entschieden?

c) Was passierte, wenn `Quadrat` die Methode `berechneFlaeche` **nicht** überschreibt?

d) Ergänze im Feld einen vierten Eintrag `formen[3] = new Form("etwas");`. Was meldet der Übersetzer, und warum ist das gut so?

e) Formuliere in einem Satz, was du mit Polymorphie gewinnst – gemessen an dem, was du ohne sie schreiben müsstest.
:::

:::protect{password="java-q-1-5-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Weil jede Unterklasse **auch** vom Typ der Oberklasse ist: Ein Kreis *ist eine* Form. Eine Variable vom Typ `Form` darf deshalb auf jedes Objekt einer Unterklasse zeigen. Man nennt das *Zuweisungskompatibilität*.

b) Der Reihe nach die Fassungen aus `Kreis`, aus `Rechteck` und – falls vorhanden – aus `Quadrat`. Entschieden wird das zur **Laufzeit** anhand des tatsächlichen Objekts, nicht zur Übersetzungszeit anhand des Variablentyps. Deshalb heißt es *dynamische Bindung*.

c) Dann erbt `Quadrat` die Fassung von `Rechteck`. Das ist kein Fehler, sondern der Normalfall – und bei einem Quadrat, das intern Breite und Höhe auf denselben Wert setzt, sogar richtig. Vererbt wird immer die nächstgelegene Fassung von unten nach oben.

d) Der Übersetzer meldet, dass sich von einer abstrakten Klasse keine Objekte erzeugen lassen. Gut ist das, weil eine „Form ohne nähere Bestimmung" keine Fläche hat – das Programm könnte `berechneFlaeche()` gar nicht ausführen. Der Fehler kommt beim Übersetzen statt zur Laufzeit, also so früh wie möglich.

e) Ohne Polymorphie bräuchte die Schleife eine Fallunterscheidung für jede Form – und **jede neue Form** verlangte eine Änderung an dieser Stelle. Mit Polymorphie bleibt die Schleife unverändert, ganz gleich, wie viele Formen dazukommen.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Abstrakte Klasse oder Schnittstelle?** *(LK)*

Entscheide für jeden Fall und begründe mit einem Kriterium aus der Vergleichstabelle.

a) `Girokonto` und `Sparkonto` haben beide einen Kontostand, eine Kontonummer und die Methoden `einzahlen` und `abheben`. Nur die Zinsberechnung unterscheidet sich.

b) Ein Programm soll `Angestellter`, `Stromrechnung` und `Mietvertrag` in einer gemeinsamen Liste verarbeiten, um daraus die monatlichen Ausgaben zu addieren. Gemeinsam ist ihnen nur, dass jedes einen Betrag liefern kann.

c) Alle Objekte, die sich der Größe nach ordnen lassen sollen, brauchen eine Methode `istGroesserAls`.

d) Warum ist es in Java ausgeschlossen, dass `Angestellter` von `Mitarbeiter` **und** von `Bezahlbar` erbt, wenn beides Klassen wären? Und wieso ist das mit einer Schnittstelle kein Problem?
:::

:::protect{password="java-q-1-5-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Abstrakte Klasse** `Konto`. Es gibt gemeinsame **Attribute** (Kontostand, Kontonummer) und gemeinsame **Methodenrümpfe** (`einzahlen`, `abheben` funktionieren überall gleich). Beides kann eine Schnittstelle nicht. Abstrakt ist die Klasse, weil ein „Konto ohne nähere Bestimmung" nicht vorkommen soll.

b) **Schnittstelle**, etwa `Bezahlbar` mit `double gibBetrag()`. Die drei Klassen haben inhaltlich nichts miteinander zu tun; eine gemeinsame Oberklasse wäre eine Erfindung ohne Bedeutung. Eine Schnittstelle ist trotzdem ein **Typ**, also geht `Bezahlbar[] posten` – und genau das war verlangt.

c) **Schnittstelle**, denn „vergleichbar sein" ist eine Zusicherung, die Klassen aus ganz verschiedenen Ecken abgeben können sollen. Genau nach diesem Muster ist die eingebaute Schnittstelle `ComparableContent` der NRW-Bibliothek gebaut, die im Kapitel über [Suchbäume](../05-nichtlineare-datenstrukturen/binaerer-suchbaum) gebraucht wird.

d) Java erlaubt nur **eine** Oberklasse. Der Grund ist die Mehrdeutigkeit: Erbte eine Klasse von zweien, die beide eine Methode `zahle()` mit Rumpf mitbringen, wäre nicht entscheidbar, welche gilt. Bei Schnittstellen gibt es keine Rümpfe, also auch nichts zu entscheiden – nur Signaturen, die erfüllt werden müssen. Deshalb sind beliebig viele Schnittstellen erlaubt.

**Die Faustregel:** Gemeinsame Daten und gemeinsames Verhalten → abstrakte Klasse. Gemeinsame **Zusicherung** über sonst unverwandte Klassen hinweg → Schnittstelle.

:::

<!--
Rückblick zu KLP QPh, Daten und ihre Strukturierung: Implementationsdiagramme,
Generalisierung/Spezialisierung, Polymorphie, abstrakte Klassen; Schnittstellen
nur LK. Aufgabe 3 ist die Beurteilungsaufgabe (A).
-->

---

## Selbsttest

::::multievent

**1. Was bedeutet das Zeichen # vor einem Attribut im Implementationsdiagramm?**

{r1{private}}

{r1{public}}

{r1{!protected}}

{r1{static}}

{h{Sichtbar auch in den Unterklassen, aber nicht von außen.}}
{H{Richtig.}}

**2. Wann wird entschieden, welche Fassung einer überschriebenen Methode ausgeführt wird?**

{r2{beim Übersetzen, anhand des Variablentyps}}

{r2{!zur Laufzeit, anhand des tatsächlichen Objekts}}

{r2{beim Anlegen des Feldes}}

{r2{das ist zufällig}}

{h{Man nennt es dynamische Bindung.}}
{H{Richtig – deshalb funktioniert Polymorphie überhaupt.}}

**3. Was gilt für eine abstrakte Klasse? Wähle alle zutreffenden Aussagen aus.**

{c1{!Von ihr lassen sich keine Objekte erzeugen.}}

{c1{!Sie darf Attribute und einen Konstruktor haben.}}

{c1{!Sie darf Methoden mit Rumpf haben.}}

{c1{Sie darf keine abstrakten Methoden haben.}}

{c1{Eine Klasse darf von beliebig vielen abstrakten Klassen erben.}}

{h{Zwei Aussagen kehren gerade das um, was eine abstrakte Klasse ausmacht.}}
{H{Richtig – erben kann eine Klasse nur von genau einer.}}

**4. Was darf eine Schnittstelle NICHT enthalten?**

{r3{Methodensignaturen}}

{r3{!Attribute mit veränderlichen Werten}}

{r3{Konstanten}}

{r3{den Namen der Schnittstelle}}

{h{Sieh in der Vergleichstabelle nach, was in der Spalte Schnittstelle mit nein steht.}}
{H{Richtig – Zustand gehört in eine Klasse, nicht in eine Schnittstelle.}}

**5. Warum erlaubt Java mehrere Schnittstellen, aber nur eine Oberklasse?**

{r4{Weil Schnittstellen kürzer sind.}}

{r4{!Weil Schnittstellen keine Methodenrümpfe mitbringen und deshalb nichts mehrdeutig werden kann.}}

{r4{Weil Oberklassen abstrakt sein müssen.}}

{r4{Aus historischen Gründen ohne Bedeutung.}}

{h{Was wäre, wenn zwei Oberklassen dieselbe Methode mit Rumpf mitbrächten?}}
{H{Richtig.}}

**6. Eine Unterklasse überschreibt eine geerbte Methode nicht. Was passiert beim Aufruf?**

{r5{Ein Fehler beim Übersetzen.}}

{r5{!Es läuft die geerbte Fassung der Oberklasse.}}

{r5{Es passiert nichts.}}

{r5{Die Methode muss immer überschrieben werden.}}

{h{Vererbt wird die nächstgelegene Fassung von unten nach oben.}}
{H{Richtig – außer bei abstrakten Methoden, die muss die Unterklasse liefern.}}

**7. Was gewinnt man durch Polymorphie in einer Schleife über ein Feld von Oberklassen-Typ?**

{r6{Das Programm läuft schneller.}}

{r6{!Man braucht keine Fallunterscheidung, und neue Unterklassen erfordern keine Änderung der Schleife.}}

{r6{Man spart Speicherplatz.}}

{r6{Die Objekte werden automatisch sortiert.}}

{h{Überleg, was du ohne Polymorphie in die Schleife schreiben müsstest.}}
{H{Richtig.}}

::::
