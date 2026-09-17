---
name: Speichermodell Java
lang: de
---

# Speichermodell Java

Java teilt den Arbeitsspeicher eines laufenden Programms in zwei Bereiche, die sich unterschiedlich verhalten: den **Kellerstapel** und die **Halde**.

- Der **Kellerstapel** (englisch *call stack*, auch *Aufrufstapel*) verwaltet die Methodenaufrufe. Für jeden laufenden Aufruf liegt dort ein **Kellerrahmen** (englisch *stack frame*) mit den Parametern und lokalen :t[Variablen]{#variable} dieses Aufrufs und der Stelle, an die nach dem `return` zurückgesprungen wird.
- Die **Halde** (englisch *heap*) verwaltet die :t[Objekte]{#objekt}. Alles, was mit `new` entsteht, liegt dort – auch jedes Feld.

Eine Variable von einem Objekttyp liegt also im Kellerrahmen; das Objekt, auf das sie verweist, liegt auf der Halde. Bei einem elementaren :t[Datentyp]{#datentyp} wie `int` steht der Wert dagegen direkt im Kellerrahmen.

## Die beiden Bereiche im Vergleich

| | Kellerstapel | Halde |
| --- | --- | --- |
| Was liegt dort? | Kellerrahmen: Parameter, lokale Variablen, Rücksprungstelle | Objekte, also alles aus `new` |
| Wer legt an? | jeder Aufruf einer :t[Methode]{#methode} | jedes `new` |
| Wann wird aufgeräumt? | beim `return`, sofort | wenn keine Referenz mehr zeigt, durch die Speicherbereinigung |
| Reihenfolge | streng: zuletzt angelegt, zuerst abgeräumt | beliebig |
| Größe | begrenzt, daher der Stapelüberlauf | wesentlich größer |

## Im Java Memory Playground nachbauen

Das folgende Programm legt einen Punkt in einer Methode an und gibt ihn zurück:

```java
void main() {
    Punkt p = erzeuge(3, 4);
}

Punkt erzeuge(int pX, int pY) {
    Punkt neuer = new Punkt(pX, pY);
    return neuer;
}
```

Baue die Schritte nach. Entscheidend ist der letzte: Der Kellerrahmen von `erzeuge` verschwindet samt seiner lokalen Variable `neuer`, das Objekt auf der Halde bleibt.

::jmp{id="glossar-speichermodell" src="jmp/speichermodell.jmp" height="620px"}

## Speicherbereinigung

Die Halde läuft nicht voll, weil Java erkennt, auf welche Objekte **keine Referenz mehr** zeigt, und deren Platz wieder freigibt. Man nennt das **Speicherbereinigung** (englisch *garbage collection*). Entscheidend ist allein die Erreichbarkeit: Zu einem Objekt, zu dem kein Verweis mehr führt, kommt das Programm nie wieder hin.

## Stapelüberlauf

Der Kellerstapel ist begrenzt. Jeder noch nicht zurückgekehrte Aufruf belegt einen Rahmen; passt keiner mehr darauf, bricht das Programm mit einem **Stapelüberlauf** ab (`StackOverflowError`). Typischer Auslöser ist eine Rekursion ohne Basisfall: Kein Aufruf kehrt zurück, also wird kein Rahmen abgeräumt.

:::alert{info}
Ausführlich behandelt wird das Modell in der Lektion [Kellerstapel und Halde](/oberstufe/oop/02-erweiterungen/02-felder-referenzen-generik/03-kellerstapel-und-halde).
:::
