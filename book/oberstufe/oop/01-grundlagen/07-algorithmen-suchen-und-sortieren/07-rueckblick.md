---
title: Rückblick
index: 7
---

# Rückblick

Drei Sortierverfahren, die alle dasselbe leisten – warum lernt man sie dann alle? Weil sie zeigen, dass es zu **einem** Problem viele Lösungen gibt und dass man sie vergleichen kann. Genau das ist der Kern dieses Kapitels, nicht das Auswendiglernen der Verfahren.

## Das kann ich jetzt

- [ ] Ich kann die Eigenschaften eines Algorithmus nennen und an einem Beispiel prüfen. ([7.1](./01-was-ist-ein-algorithmus))
- [ ] Ich kann die **lineare Suche** implementieren und ihr Verhalten bei Misserfolg beschreiben. ([7.2](./02-lineare-suche))
- [ ] Ich kann **Sortieren durch Auswählen** erklären und umsetzen. ([7.3](./03-sortieren-durch-auswaehlen))
- [ ] Ich kann **Bubblesort** erklären und umsetzen. ([7.4](./04-bubblesort))
- [ ] Ich kann **Sortieren durch Einfügen** erklären und umsetzen. ([7.5](./05-sortieren-durch-einfuegen))
- [ ] Ich kann Verfahren nach der **Zahl der Operationen** vergleichen und Messungen deuten. ([7.6](./06-wie-schnell-ist-das))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Welches Verfahren war das?**

Ein Feld mit den Werten `5 3 8 1 9 2` wird sortiert. Nach jedem äußeren Durchlauf sieht es so aus:

**Protokoll A**

```
nach Durchlauf 1: 3 5 1 8 2 9
nach Durchlauf 2: 3 1 5 2 8 9
nach Durchlauf 3: 1 3 2 5 8 9
nach Durchlauf 4: 1 2 3 5 8 9
```

**Protokoll B**

```
nach Durchlauf 1: 1 3 8 5 9 2
nach Durchlauf 2: 1 2 8 5 9 3
nach Durchlauf 3: 1 2 3 5 9 8
nach Durchlauf 4: 1 2 3 5 9 8
```

**Protokoll C**

```
nach Durchlauf 1: 3 5 8 1 9 2
nach Durchlauf 2: 3 5 8 1 9 2
nach Durchlauf 3: 1 3 5 8 9 2
nach Durchlauf 4: 1 3 5 8 9 2
```

a) Ordne jedem Protokoll eines der drei Verfahren zu und begründe mit **einer** Beobachtung je Protokoll.

b) Bei einem Protokoll ändert sich nach Durchlauf 2 und nach Durchlauf 4 nichts. Erkläre, wie das sein kann.

c) In Protokoll B wandert die 9 erst ganz zum Schluss an ihren Platz, in Protokoll A ist sie schon nach dem ersten Durchlauf richtig. Woran liegt das?
:::

::::collapsible{title="Tipp: Worauf achten?"}

Achte auf die **linke** und die **rechte** Seite des Feldes:

- Bei welchem Verfahren ist nach `k` Durchläufen der **linke** Rand endgültig sortiert?
- Bei welchem der **rechte**?
- Bei welchem ist der linke Rand zwar sortiert, aber noch nicht endgültig – weil dort später noch Werte eingeschoben werden?

::::

:::protect{password="java-ef-7-7-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

- **Protokoll A: Bubblesort.** Nach dem ersten Durchlauf steht die größte Zahl (9) ganz rechts, nach dem zweiten die zweitgrößte (8). Der **rechte** Rand wächst. Außerdem bewegen sich alle Werte nur um jeweils einen Platz – typisch für das Vertauschen benachbarter Elemente.
- **Protokoll B: Sortieren durch Auswählen.** Der **linke** Rand ist nach `k` Durchläufen endgültig fertig (1; 1 2; 1 2 3). Rechts davon herrscht Unordnung, weil jeweils nur zwei Werte getauscht wurden.
- **Protokoll C: Sortieren durch Einfügen.** Der linke Teil ist zwar sortiert, aber **nicht endgültig**: Nach Durchlauf 3 steht dort `1 3 5 8`, und die 2 wird später noch mitten hineingeschoben.

b) In Protokoll C ändert sich nichts, wenn das gerade betrachtete Element bereits an der richtigen Stelle steht: 8 gehört hinter 5, 9 hinter 8. Dann bricht die innere Schleife sofort ab – ein Zeichen dafür, dass das Verfahren bei vorsortierten Daten sehr schnell ist. In Protokoll B ändert sich nach Durchlauf 4 nichts, weil der kleinste Rest bereits an seinem Platz steht und das Verfahren ein Element mit sich selbst tauscht.

c) Bubblesort vergleicht **benachbarte** Elemente und schiebt große Werte in jedem Durchlauf so weit nach rechts, wie es geht – die 9 wandert in einem Durchlauf ganz durch. Das Auswahlverfahren sucht dagegen jeweils nur das **Minimum** und lässt alles andere liegen; große Werte kommen deshalb erst dran, wenn nichts mehr übrig ist.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Suchen mit Auskunft**

a) Schreib eine Methode `int suche(int[] pWerte, int pGesucht)`, die den **Index** des ersten Vorkommens liefert – und `-1`, wenn der Wert nicht vorkommt.

b) Warum ist `-1` ein sinnvoller Rückgabewert und nicht etwa `0`?

c) Schreib eine zweite Methode `int zaehle(int[] pWerte, int pGesucht)`, die zählt, wie oft der Wert vorkommt.

d) Wie viele Vergleiche braucht `suche` im günstigsten, wie viele im ungünstigsten Fall bei einem Feld mit 1000 Elementen? Wovon hängt der ungünstigste Fall ab?

e) Kann `suche` abbrechen, sobald sie fündig wird? Kann `zaehle` das auch? Begründe.
:::

::::collapsible{title="Tipp zu a)"}

Sobald der Wert gefunden ist, gibt es nichts mehr zu tun:

```java
for (int i = 0; i < pWerte.length; i++) {
    if (pWerte[i] == pGesucht) {
        return i;
    }
}
return -1;
```

Das `return -1` steht **nach** der Schleife – es wird nur erreicht, wenn die Schleife ohne Treffer durchgelaufen ist.

::::

:::onlineide{height="520px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {4, 8, 15, 8, 23, 42};

    IO.println(suche(werte, 15));
    IO.println(suche(werte, 99));
    IO.println(zaehle(werte, 8));
}

// Deine Methoden:
```

:::

:::protect{password="java-ef-7-7-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
int suche(int[] pWerte, int pGesucht) {
    for (int i = 0; i < pWerte.length; i++) {
        if (pWerte[i] == pGesucht) {
            return i;
        }
    }
    return -1;
}

int zaehle(int[] pWerte, int pGesucht) {
    int anzahl = 0;
    for (int i = 0; i < pWerte.length; i++) {
        if (pWerte[i] == pGesucht) {
            anzahl++;
        }
    }
    return anzahl;
}
```

Ausgabe: `2`, `-1`, `2`.

b) Weil `0` ein **gültiger Index** ist – nämlich der des ersten Elements. Ein Rückgabewert, der „nicht gefunden" bedeuten soll, muss von jedem möglichen richtigen Ergebnis unterscheidbar sein. `-1` kann niemals ein Index sein und eignet sich deshalb.

d) Im günstigsten Fall **1** Vergleich: Der Gesuchte steht ganz vorn. Im ungünstigsten Fall **1000**. Der ungünstigste Fall tritt ein, wenn der Wert am Ende steht **oder gar nicht vorkommt** – der zweite Fall wird oft vergessen und ist der eigentlich teure, weil er immer das ganze Feld kostet.

e) `suche` darf abbrechen: Gesucht ist das **erste** Vorkommen, und mehr gibt es nicht zu erfahren. `zaehle` darf **nicht** abbrechen – sie muss jedes Element ansehen, weil sonst spätere Vorkommen fehlten. Dieselbe Datenstruktur, dieselbe Schleife, und trotzdem ein Unterschied, der aus der Frage folgt, nicht aus dem Feld.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Wie teuer ist das?**

a) Ein Sortierverfahren vergleicht bei `n` Elementen ungefähr `n · n / 2`-mal. Wie viele Vergleiche sind das bei 100, bei 1000 und bei 10 000 Elementen?

b) Die Zahl der Elemente wird verzehnfacht. Um welchen Faktor wächst die Zahl der Vergleiche? Begründe mit deiner Rechnung aus a).

c) Ein Rechner schafft 100 Millionen Vergleiche je Sekunde. Wie lange braucht er ungefähr für eine Million Elemente?

d) Zähle im Programm unten mit, wie viele **Vergleiche** und wie viele **Vertauschungen** die drei Verfahren für dasselbe Feld brauchen. Welches Verfahren tauscht am wenigsten, welches vergleicht am wenigsten?

e) Ist das Verfahren mit den wenigsten Vertauschungen automatisch das schnellste? Begründe.
:::

::::collapsible{title="Tipp zu d)"}

Leg zwei Zählvariablen an und erhöhe sie an genau den Stellen, an denen verglichen beziehungsweise getauscht wird:

```java
vergleiche++;
if (pWerte[j] < pWerte[minIndex]) {
    minIndex = j;
}
```

Achte darauf, dass das `vergleiche++` **vor** dem `if` steht – der Vergleich findet ja auch dann statt, wenn die Bedingung falsch ist.

::::

:::onlineide{height="600px" speed="1000000"}

```java Main.java
void main() {
    int[] werte = {5, 3, 8, 1, 9, 2, 7, 4, 6};

    // Baue hier eines der Sortierverfahren ein
    // und zaehle Vergleiche und Vertauschungen mit.

}
```

:::

:::protect{password="java-ef-7-7-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| n | Vergleiche |
| --- | --- |
| 100 | 5 000 |
| 1 000 | 500 000 |
| 10 000 | 50 000 000 |

b) Um den Faktor **100**. Wird `n` verzehnfacht, verhundertfacht sich `n · n`. Das ist der entscheidende Satz über diese Verfahren: Der Aufwand wächst **quadratisch**. Bei doppelter Datenmenge braucht man nicht doppelt, sondern viermal so lange.

c) 1 000 000 · 1 000 000 / 2 = 5 · 10¹¹ Vergleiche. Bei 10⁸ Vergleichen je Sekunde sind das **5000 Sekunden**, also rund **anderthalb Stunden**. Genau deshalb gibt es die besseren Verfahren aus dem Lernpfad [Erweiterungen](../../02-erweiterungen/06-suchen-und-sortieren).

d) Für das Feld `5 3 8 1 9 2 7 4 6` mit neun Elementen ergibt sich:

| Verfahren | Vergleiche | Vertauschungen |
| --- | --- | --- |
| Auswählen | 36 | 8 |
| Bubblesort | 36 | 17 |
| Einfügen | 23 | 17 |

Auswählen und Bubblesort vergleichen **immer** 9 · 8 / 2 = 36-mal, ganz gleich, wie das Feld aussieht. Das Auswahlverfahren tauscht dabei am wenigsten: genau einmal je Durchlauf, also achtmal. **Einfügen** vergleicht deutlich seltener, weil die innere Schleife abbricht, sobald der Platz gefunden ist – bei vorsortierten Daten wird der Unterschied noch größer.

Deine Zahlen können leicht abweichen, je nachdem, ob du den Tausch auch dann mitzählst, wenn ein Element mit sich selbst getauscht wird. Wichtig ist nicht die Zahl, sondern dass du **sagen kannst, was du gezählt hast**.

e) Nein. Was zählt, ist die **Summe aller** Operationen, nicht eine einzelne Sorte davon. Das Auswahlverfahren tauscht wenig, vergleicht dafür immer maximal viel. Welche Operation schwerer wiegt, hängt zudem von den Daten ab: Beim Sortieren großer Objekte kostet ein Tausch viel, beim Sortieren von `int` fast nichts. Deshalb misst man nach – und deshalb ist das Zählen von Operationen aussagekräftiger als eine einzelne Stoppuhrmessung, die auch vom Rechner und von der Tagesform des Systems abhängt.

:::

<!--
Rückblick zu KLP EF, Algorithmen: Suchen und Sortieren erläutern und
implementieren (A/I); Beurteilung nach der Zahl der Operationen. Aufgabe 3
bereitet die Komplexitätsbetrachtung der Qualifikationsphase vor.
-->

---

## Selbsttest

::::multievent

**1. Nach dem ersten Durchlauf steht die größte Zahl ganz rechts. Welches Verfahren ist das?**

{r1{Sortieren durch Auswählen}}

{r1{!Bubblesort}}

{r1{Sortieren durch Einfügen}}

{r1{lineare Suche}}

{r1{das lässt sich nicht entscheiden}}

{h{Bei welchem Verfahren wandert ein großer Wert in einem Durchlauf ganz nach rechts?}}
{H{Richtig – benachbarte Elemente werden getauscht, dabei blubbert das Größte nach oben.}}

**2. Was liefert eine lineare Suche zurück, wenn der Wert nicht vorkommt?**

{r2{0}}

{r2{!minus 1}}

{r2{die Länge des Feldes}}

{r2{einen Fehler}}

{h{Der Rückgabewert muss von jedem gültigen Index unterscheidbar sein.}}
{H{Richtig – und 0 ist ein gültiger Index.}}

**3. Wie viele Vergleiche braucht die lineare Suche bei 1000 Elementen im ungünstigsten Fall?**

{z{1000}}

{h{Der ungünstigste Fall ist nicht das letzte Element, sondern ein Wert, der gar nicht vorkommt – gekostet hat er dasselbe.}}
{H{Richtig.}}

**4. Ein Verfahren braucht ungefähr n mal n halbe Vergleiche. Was passiert bei zehnfacher Datenmenge?**

{r3{Der Aufwand verzehnfacht sich.}}

{r3{!Der Aufwand verhundertfacht sich.}}

{r3{Der Aufwand verdoppelt sich.}}

{r3{Der Aufwand bleibt gleich.}}

{h{Rechne mit 100 und mit 1000 nach.}}
{H{Richtig – quadratisches Wachstum.}}

**5. Warum darf eine zählende Suche nicht beim ersten Treffer abbrechen?**

{r4{Weil das Feld sonst unsortiert bleibt.}}

{r4{!Weil weitere Vorkommen sonst nicht mitgezählt würden.}}

{r4{Weil return in Schleifen verboten ist.}}

{r4{Sie darf abbrechen.}}

{h{Was ist die Frage – wo steht er, oder wie oft kommt er vor?}}
{H{Richtig. Die Frage entscheidet, nicht die Datenstruktur.}}

**6. Welche Aussagen über den Vergleich von Verfahren treffen zu? Wähle alle zutreffenden aus.**

{c1{!Die Zahl der Operationen ist aussagekräftiger als eine einzelne Zeitmessung.}}

{c1{!Wie viel ein Tausch kostet, hängt von der Art der Daten ab.}}

{c1{Das Verfahren mit den wenigsten Vertauschungen ist immer das schnellste.}}

{c1{Eine Zeitmessung auf einem Rechner gilt für alle Rechner.}}

{h{Zwei Aussagen sind zu absolut formuliert, um zu stimmen.}}
{H{Richtig – entscheidend ist die Summe aller Operationen.}}

::::
