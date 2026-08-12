---
name: Rückblick
index: 4
lang: de
---

# Rückblick

Stapel, Warteschlange und Liste unterscheiden sich nicht darin, **was** sie speichern, sondern darin, **wer als Nächstes drankommt**. Genau diese Frage ist es, die man bei einer Anwendung stellen muss – nicht die nach dem Speicherplatz.

## Das kann ich jetzt

- [ ] Ich kann das **LIFO**-Prinzip des Stapels erklären und die Operationen benennen. ([Stapel](./stapel))
- [ ] Ich kann das **FIFO**-Prinzip der Warteschlange erklären und die Operationen benennen. ([Warteschlange](./warteschlange))
- [ ] Ich kann beschreiben, wie eine **verkettete Liste** aus Knoten aufgebaut ist. ([Liste](./liste))
- [ ] Ich kann zu einem Anwendungsfall die passende Struktur begründet auswählen.
- [ ] Ich kann die Operationen einer Struktur aus ihrer **Dokumentation** heraus benutzen, ohne ihre Implementierung zu kennen.

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Wer kommt als Nächstes dran?**

a) Auf einen leeren Stapel werden nacheinander `A`, `B`, `C` gelegt. Danach wird zweimal `pop` ausgeführt, dann `D` gelegt, dann einmal `pop`. Was liefert der letzte `pop`, und was liegt danach noch auf dem Stapel?

b) Dieselbe Folge mit einer Warteschlange: `enqueue A`, `enqueue B`, `enqueue C`, zweimal `dequeue`, `enqueue D`, einmal `dequeue`. Was liefert der letzte `dequeue`?

c) Warum liefert `top` beziehungsweise `front` einen Wert, ohne dass sich die Struktur ändert – und warum ist es trotzdem sinnvoll, dass es diese Operation zusätzlich zu `pop` gibt?

d) Welche Vorkehrung muss man treffen, bevor man `pop` aufruft? Was passiert sonst?
:::

:::protect{password="java-q-4-r-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a)

| Schritt | Stapel (oben zuerst) |
| --- | --- |
| push A, B, C | C, B, A |
| pop → C | B, A |
| pop → B | A |
| push D | D, A |
| pop → D | A |

Der letzte `pop` liefert **D**, danach liegt nur noch **A** auf dem Stapel. Das ist **LIFO**: Was zuletzt kam, geht zuerst.

b)

| Schritt | Schlange (vorne zuerst) |
| --- | --- |
| enqueue A, B, C | A, B, C |
| dequeue → A | B, C |
| dequeue → B | C |
| enqueue D | C, D |
| dequeue → C | D |

Der letzte `dequeue` liefert **C**. Das ist **FIFO**: Wer zuerst kam, geht zuerst. Dieselbe Folge von Operationen, ein anderes Ergebnis – nur wegen der Zugriffsregel.

c) `top` und `front` sind **Anfragen**: Sie liefern den Inhalt, ohne ihn zu entfernen. Nützlich ist das, wenn man erst **entscheiden** will, ob man ihn haben möchte – etwa bei der Klammerprüfung, wo man das oberste Zeichen ansehen muss, bevor man weiß, ob es passt. Ohne diese Operation müsste man `pop` aufrufen und im Zweifel wieder zurücklegen.

d) Man muss mit `isEmpty` prüfen, ob überhaupt etwas da ist. Ein `pop` auf einem leeren Stapel ist ein Fehler – je nach Implementierung liefert er `null` oder bricht ab. Der Fehler zeigt sich erst zur **Laufzeit**, deshalb gehört die Prüfung immer davor.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Welche Struktur passt?**

Wähle für jeden Fall die passende Struktur und begründe mit dem Zugriffsprinzip.

a) Die Rückgängig-Funktion eines Zeichenprogramms.

b) Die Warteschlange an einem Druckerserver.

c) Die Aufrufe eines rekursiven Programms – wer merkt sich, wohin zurückgesprungen wird?

d) Die Liste der Teilnehmerinnen einer AG, in die jederzeit an beliebiger Stelle jemand eingefügt werden soll.

e) Die Bearbeitung von Nachrichten in einem Messenger in der Reihenfolge des Eintreffens.

f) Ein Labyrinth so durchsuchen, dass zuerst der zuletzt betretene Weg weiterverfolgt wird.
:::

::::collapsible{title="Tipp"}

Stell für jeden Fall genau eine Frage: **Wer kommt als Nächstes dran – der Neueste oder der Älteste?**

Kommt es dagegen auf eine Reihenfolge an, in die man an beliebiger Stelle eingreifen können muss, ist keins von beiden gemeint.

::::

:::protect{password="java-q-4-r-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Stapel.** Rückgängig macht immer den **zuletzt** ausgeführten Schritt – LIFO in Reinform.

b) **Warteschlange.** Wer zuerst gedruckt hat, bekommt zuerst sein Blatt. Alles andere empfänden die Benutzerinnen als ungerecht.

c) **Stapel** – der Aufrufstapel. Bei jedem Aufruf wird die Rücksprungstelle abgelegt, bei jeder Rückkehr die oberste geholt. Genau deshalb heißt der Absturz bei fehlendem Basisfall *Stapelüberlauf*.

d) **Liste.** Weder LIFO noch FIFO passen: Verlangt ist der Zugriff an **beliebiger** Stelle, und genau dafür ist die Liste da.

e) **Warteschlange.** Auch hier zählt die Reihenfolge des Eintreffens.

f) **Stapel.** Der zuletzt betretene Weg wird zuerst weiterverfolgt – das ergibt die Tiefensuche. Nimmt man stattdessen eine Warteschlange, entsteht die Breitensuche, die zuerst alle Nachbarn absucht. Dieselbe Suche, andere Struktur, anderes Verhalten: eines der schönsten Beispiele dafür, dass die Wahl der Datenstruktur den Algorithmus bestimmt.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Klammern prüfen**

Ein Übersetzer muss feststellen, ob die Klammern eines Ausdrucks richtig gesetzt sind. Gültig sind `()`, `[]` und `{}`, beliebig geschachtelt.

a) Warum ist ein Stapel dafür genau die richtige Struktur? Begründe mit der Schachtelung.

b) Beschreib das Verfahren in Worten, bevor du programmierst: Was tust du bei einer öffnenden, was bei einer schließenden Klammer?

c) Woran erkennst du am **Ende**, dass der Ausdruck gültig war? Zwei Fehlerfälle sind zu unterscheiden.

d) Vervollständige das Programm im Übungsbereich.

e) Teste mit: `(a + [b * c]) - {d}`, `(a + [b * c)]`, `((a)` und `a)`. Welcher Fehlerfall tritt jeweils ein?
:::

::::collapsible{title="Tipp 1: Das Verfahren"}

- Öffnende Klammer: auf den Stapel legen.
- Schließende Klammer: oberste vom Stapel holen und prüfen, ob sie zur schließenden passt.
- Am Ende: Der Stapel muss **leer** sein.

::::

::::collapsible{title="Tipp 2: Die zwei Fehlerfälle"}

1. Es kommt eine schließende Klammer, aber der Stapel ist leer – oder oben liegt die falsche Sorte.
2. Der Text ist zu Ende, aber auf dem Stapel liegt noch etwas: Es wurde mehr geöffnet als geschlossen.

::::

:::onlineide{height="720px" speed="1000000"}

```java Main.java
void main() {
    IO.println(pruefe("(a + [b * c]) - {d}"));
    IO.println(pruefe("(a + [b * c)]"));
    IO.println(pruefe("((a)"));
    IO.println(pruefe("a)"));
}

boolean pruefe(String pText) {
    ZeichenStapel stapel = new ZeichenStapel(pText.length() + 1);

    // Deine Loesung:

    return false;
}
```

```java ZeichenStapel.java
public class ZeichenStapel {

    private char[] inhalt;
    private int anzahl;

    public ZeichenStapel(int pMax) {
        inhalt = new char[pMax];
        anzahl = 0;
    }

    public void push(char pZeichen) {
        inhalt[anzahl] = pZeichen;
        anzahl = anzahl + 1;
    }

    public char pop() {
        anzahl = anzahl - 1;
        return inhalt[anzahl];
    }

    public char top() {
        return inhalt[anzahl - 1];
    }

    public boolean isEmpty() {
        return anzahl == 0;
    }
}
```

:::

:::protect{password="java-q-4-r-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Weil Klammern **geschachtelt** sind: Die zuletzt geöffnete muss als erste wieder geschlossen werden. Das ist wörtlich das LIFO-Prinzip. Bei einer Warteschlange käme die **erste** Klammer zuerst heraus – und `([)]` würde fälschlich als gültig durchgehen.

b) und d)

```java
boolean pruefe(String pText) {
    ZeichenStapel stapel = new ZeichenStapel(pText.length() + 1);

    for (int i = 0; i < pText.length(); i++) {
        char zeichen = pText.charAt(i);

        if (zeichen == '(' || zeichen == '[' || zeichen == '{') {
            stapel.push(zeichen);
        } else if (zeichen == ')' || zeichen == ']' || zeichen == '}') {
            if (stapel.isEmpty()) {
                return false;
            }
            char offen = stapel.pop();
            if (zeichen == ')' && offen != '(') {
                return false;
            }
            if (zeichen == ']' && offen != '[') {
                return false;
            }
            if (zeichen == '}' && offen != '{') {
                return false;
            }
        }
    }

    return stapel.isEmpty();
}
```

c) Der Ausdruck ist gültig, wenn die Schleife durchgelaufen ist **und** der Stapel danach leer ist. Die zwei Fehlerfälle: eine schließende Klammer ohne passende offene (mitten im Text erkennbar) und eine offene Klammer, die nie geschlossen wurde (erst am Ende erkennbar).

e)

| Eingabe | Ergebnis | Fehlerfall |
| --- | --- | --- |
| `(a + [b * c]) - {d}` | `true` | – |
| `(a + [b * c)]` | `false` | falsche Sorte oben auf dem Stapel |
| `((a)` | `false` | am Ende liegt noch eine Klammer auf dem Stapel |
| `a)` | `false` | schließende Klammer bei leerem Stapel |

Beachte, dass alle drei Fehler **verschiedene** Ursachen haben und trotzdem dasselbe Ergebnis liefern. Wollte man dem Benutzer sagen, *was* falsch ist, müsste man statt `false` eine Meldung zurückgeben – ein Übersetzer tut genau das.

:::

<!--
Rückblick zum Inhaltsfeld Daten und ihre Strukturierung: Stapel, Schlange,
Liste; Operationen dynamischer Datenstrukturen anwenden (I) und die passende
Struktur begründet auswählen (A/M).
-->

---

## Selbsttest

::::multievent

**1. Was bedeutet LIFO?**

{r1{Wer zuerst kommt, geht zuerst.}}

{r1{!Was zuletzt hineinkam, kommt zuerst heraus.}}

{r1{Die Elemente sind sortiert.}}

{r1{Jedes Element kennt seinen Nachfolger.}}

{h{Last in, first out.}}
{H{Richtig – das ist der Stapel.}}

**2. Auf einen leeren Stapel kommen A, B und C. Was liefert der erste pop?**

{r2{A}}

{r2{B}}

{r2{!C}}

{r2{das lässt sich nicht sagen}}

{h{Das zuletzt Gelegte liegt oben.}}
{H{Richtig.}}

**3. Dieselbe Folge bei einer Warteschlange. Was liefert das erste dequeue?**

{r3{!A}}

{r3{B}}

{r3{C}}

{r3{das lässt sich nicht sagen}}

{h{Wer zuerst kam, geht zuerst.}}
{H{Richtig – dieselben Eingaben, ein anderes Ergebnis.}}

**4. Welche Struktur verwaltet die Rücksprungstellen rekursiver Aufrufe?**

{r4{!ein Stapel}}

{r4{eine Warteschlange}}

{r4{eine Liste}}

{r4{ein Baum}}

{h{Warum heißt der Absturz bei fehlendem Basisfall wohl Stapelüberlauf?}}
{H{Richtig.}}

**5. Wozu dient die Anfrage top beziehungsweise front?**

{r5{Sie entfernt das oberste Element.}}

{r5{!Sie liefert das Element, ohne es zu entfernen.}}

{r5{Sie zählt die Elemente.}}

{r5{Sie leert die Struktur.}}

{h{Manchmal will man erst hinsehen und dann entscheiden.}}
{H{Richtig – genau das braucht die Klammerprüfung.}}

**6. Was muss vor jedem pop geprüft werden?**

{r6{ob die Struktur sortiert ist}}

{r6{!ob sie überhaupt ein Element enthält}}

{r6{ob genug Speicher frei ist}}

{r6{nichts}}

{h{Was soll ein pop auf einer leeren Struktur liefern?}}
{H{Richtig – dafür gibt es isEmpty.}}

**7. Für welche Aufgabe passt eine Liste, aber weder Stapel noch Warteschlange?**

{r7{die Rückgängig-Funktion}}

{r7{der Druckauftrag}}

{r7{!eine Reihenfolge, in die an beliebiger Stelle eingefügt werden soll}}

{r7{der Aufrufstapel}}

{h{Stapel und Schlange lassen nur an einem Ende zu.}}
{H{Richtig.}}

::::
