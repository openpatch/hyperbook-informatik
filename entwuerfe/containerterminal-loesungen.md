# Containerterminal – Lösungen (Entwurf)

Gehört zu den versteckten Seiten (`hide: true`) `stapel/containerterminal.md` (Planen, Aufgaben 1–3) und `stapel/containerterminal-programmieren.md` (Programmieren, Aufgaben 4–5, Zusatz A–D und Weiterdenken) unter `book/oberstufe/oop/02-erweiterungen/04-lineare-datenstrukturen/`.

Die sichtbare Seite `stapel/containerterminal-kran.md` (Der Kran, 17.11.) trägt ihre Lösungen selbst (`java-q-4-st-c-9` bis `-11`); sie stehen deshalb nicht hier.

Die Lösungen stehen **vorerst außerhalb von `book/`**: Die Seite `loesungen` listet die Passwörter aller `protect`-Blöcke – auch die versteckter Seiten – mit Link. Bei der Freigabe der Seite werden die Blöcke wieder hinter die jeweilige Aufgabe gesetzt und `hide: true` entfernt.


## Planen – Aufgabe 1: Der erste Tag

::::protect{password="java-q-4-st-c-1" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) 80 + 20 + 80 = **180 Euro**. Danach stehen auf Stapel 1 wieder 0815 und 2001.

b) Für 4711 allein genügt: 2001 auf einen Nachbarstapel umsetzen und 4711 verladen: 50 + 20 = **70 Euro**. Stellt man 2001 auf Stapel 2, liegt er auf dem Container 1234, der als Nächstes abgeholt wird: Er muss gleich noch einmal bewegt werden. Auf Stapel 3 steht nur 5005, der heute nicht abgeholt wird. Wer **beide** Blocker (2001 und später 3003) auf Stapel 3 stellt, zahlt 2 · 50 + 3 · 20 = **160 Euro**. Mit der Freifläche kostet derselbe Auftrag 540 Euro. Strategie in einem Satz: „Einen Container, der im Weg steht, stelle ich auf den Stapel, von dem nichts mehr abgeholt wird.“

::::


## Planen – Aufgabe 2: Die Strategie als Struktogramm

::::protect{password="java-q-4-st-c-8" description="Mögliche Struktogramme. Erfrage das Passwort bei deiner Lehrkraft."}

Beide Strategien teilen dasselbe Gerüst – auch die vorausschauende aus Aufgabe 3b; sie unterscheiden sich nur darin, **wohin** der Kran einen Blocker setzt. Struktogramme in Worten sind richtig, solange sie eindeutig sind – genau das prüft der Kran-Test.

**A – Freifläche** (das Muster „Erhalten“ mit der Freifläche als Hilfsstapel), Auftrag am ersten Tag: **540 Euro**

:::struktolab{fontSize=15}
```
funktion hole(pNummer):
    s = finde(pNummer)
    falls s != -1:
        wiederhole solange oben(s).getNummer() != pNummer:
            umsetzen(s, 0)
        verladen(s)
        wiederhole solange oben(0) != null:
            umsetzen(0, s)
```
:::

**B – Nachbarstapel**, Auftrag am ersten Tag: **210 Euro**

:::struktolab{fontSize=15}
```
funktion hole(pNummer):
    s = finde(pNummer)
    falls s != -1:
        wiederhole solange oben(s).getNummer() != pNummer:
            ziel = s % 3 + 1
            falls istVoll(ziel):
                ziel = ziel % 3 + 1
            falls istVoll(ziel):
                ziel = 0
            umsetzen(s, ziel)
        verladen(s)
```
:::

Typische Stellen, an denen im Kran-Test geraten werden muss:

- **Was, wenn der gesuchte Container schon oben steht?** Steht die Bedingung „solange oben nicht der gesuchte“ im Kopf der Schleife, ist der Fall erledigt. Wer „nimm den obersten weg“ ohne Schleife schreibt, verlädt den falschen Container.
- **Welcher Nachbar?** „Auf einen anderen Stapel“ lässt offen, auf welchen – und was geschieht, wenn er voll ist.
- **Wohin kommen die Container von der Freifläche zurück?** Auf `s`, den Stapel, aus dem sie kamen.

::::

## Planen – Aufgabe 3: Der zweite Tag

::::protect{password="java-q-4-st-c-7" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Mit den Struktogrammen aus Aufgabe 2 (Musterlösung) kostet der zweite Tag: Freifläche **720 Euro**, Nachbarstapel **430 Euro**. Eigene Struktogramme können davon abweichen – entscheidend ist, dass das Ergebnis zum Struktogramm passt.

b) Von Hand (Aufgabe 1b) waren es 160 Euro, mit A 540 Euro, mit B 210 Euro: Beim Planen schaut man auf die Reihe der Lkw, der Algorithmus nicht. Mit `naechsteAbholung` kann er es; am Gerüst ändert sich nur das Ziel von `umsetzen`.

**Vorausschauend**, erster Tag **160 Euro**, zweiter Tag **380 Euro**

:::struktolab{fontSize=15}
```
funktion hole(pNummer):
    s = finde(pNummer)
    falls s != -1:
        wiederhole solange oben(s).getNummer() != pNummer:
            ziel = 0
            wiederhole für i = 1 bis 3:
                falls i != s und nicht istVoll(i):
                    falls ziel == 0 oder ruhe(i) > ruhe(ziel):
                        ziel = i
            umsetzen(s, ziel)
        verladen(s)
```
:::

Dabei ist `ruhe(i)` die nächste Abholung von Stapel `i`, wobei 0 („nie“) als sehr große Zahl zählt. In Worten genügt: „ziel = der andere Stapel mit Platz, von dem am spätesten etwas abgeholt wird; ein Stapel, von dem nichts abgeholt wird, ist der beste“.

Im Kran-Test unklar bleibt oft: **Was, wenn zwei Stapel gleich gut sind?** Haben beide dieselbe nächste Abholung, braucht es eine Regel (etwa: der erste).

*Zum Weiterdenken:* Der günstigste Ablauf am zweiten Tag kostet **290 Euro**: 6003 auf die Freifläche (80), 6002 verladen (20), 6005 auf die Freifläche (80), 6004 verladen (20), 6009 auf Stapel 2 (50), 6008 verladen (20), 6001 verladen (20). Keine der drei Strategien erreicht ihn. Die Regel aus Aufgabe 1 („Blocker auf den Stapel, von dem nichts mehr abgeholt wird“) greift hier nicht: Stapel 3 ist voll, und auf Stapel 1 und 2 wartet jeweils noch ein Container. Ein Blocker auf dem Nachbarstapel müsste später ein zweites Mal bewegt werden (50 + 50 = 100 Euro) – die Freifläche kostet nur 80 Euro, **wenn der Container dort stehen bleibt**. Teuer wird die Freifläche erst durch das Zurückholen. Eine bessere Regel: Würde ein Blocker auf jedem freien Stapel wieder im Weg stehen, kommt er auf die Freifläche und bleibt dort.

::::

## Programmieren – Aufgabe 4: Eure Strategie in Java

::::protect{password="java-q-4-st-c-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Strategie A – Freifläche**

```java
public void holeMitFreiflaeche(String pNummer) {
    int s = terminal.finde(pNummer);
    if (s == -1) {
        return;
    }
    while (!terminal.oben(s).getNummer().equals(pNummer)) {
        terminal.umsetzen(s, 0);
    }
    terminal.verladen(s);
    while (terminal.oben(0) != null) {
        terminal.umsetzen(0, s);
    }
}
```

**Strategie B – Nachbarstapel**

```java
public void holeMitNachbar(String pNummer) {
    int s = terminal.finde(pNummer);
    if (s == -1) {
        return;
    }
    while (!terminal.oben(s).getNummer().equals(pNummer)) {
        int ziel = s % 3 + 1;
        if (terminal.istVoll(ziel)) {
            ziel = ziel % 3 + 1;
        }
        if (terminal.istVoll(ziel)) {
            ziel = 0;
        }
        terminal.umsetzen(s, ziel);
    }
    terminal.verladen(s);
}
```

**Aufgabe 4c – Vorausschauend** (Struktogramm aus Aufgabe 3b)

```java
// Wie lange bleibt ein Stapel ungestört? Ohne Abholung: sehr lange.
private int ruhe(int pStapel) {
    int n = terminal.naechsteAbholung(pStapel);
    if (n == 0) {
        return 1000;
    }
    return n;
}

public void holeVorausschauend(String pNummer) {
    int s = terminal.finde(pNummer);
    if (s == -1) {
        return;
    }
    while (!terminal.oben(s).getNummer().equals(pNummer)) {
        int ziel = 0;
        for (int i = 1; i <= 3; i++) {
            if (i != s && !terminal.istVoll(i) && (ziel == 0 || ruhe(i) > ruhe(ziel))) {
                ziel = i;
            }
        }
        terminal.umsetzen(s, ziel);
    }
    terminal.verladen(s);
}
```

`hole` ruft die Methode der eigenen Strategie auf, z. B. `holeVorausschauend(pNummer);`.

b) Kosten für den ganzen Auftrag: A **540 Euro**, B **210 Euro**; c) vorausschauend **160 Euro**. Weichen sie vom Kran-Test ab, wurde das Struktogramm beim Test anders gelesen als programmiert – genau die Stellen, an denen geraten werden musste.

::::

## Programmieren – Aufgabe 5: Abspielen und vergleichen

::::protect{password="java-q-4-st-c-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**A – Freifläche, 540 Euro:** Bei jedem der drei Lkw steht genau ein Blocker im Weg (2001, 3003, dann wieder 2001). Jeder fährt zur Freifläche und zurück (2 · 80 Euro), dazu kommt das Verladen (20 Euro): 3 · 180 = 540 Euro. 2001 steht nach dem Zurückstellen wieder auf 0815, der noch abgeholt wird.

**B – Nachbarstapel, 210 Euro:** Kein Blocker fährt zur Freifläche, keiner wird zurückgestellt. Vermeidbar ist noch eine Bewegung: 2001 landet auf Stapel 2 – genau über 1234, der als Nächstes abgeholt wird – und muss deshalb ein zweites Mal umgesetzt werden (50 Euro).

**Vorausschauend (4c), 160 Euro:** 2001 und 3003 kommen auf Stapel 3, von dem nichts abgeholt wird; jeder Blocker wird nur einmal bewegt (2 · 50 Euro), dazu dreimal verladen (3 · 20 Euro). Günstiger geht es für diesen Auftrag nicht.

Die Unterschiede entstehen durch das Ziel der Blocker: Die Freifläche ist teuer und zwingt zum Zurückstellen; ein beliebiger Nachbarstapel kann einen späteren Container blockieren; erst der Blick auf die nächste Abholung vermeidet doppelte Bewegungen.

::::

## Programmieren – Zusatz A: Eine zweite Strategie

::::protect{password="java-q-4-st-c-12" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Code wie in der Lösung zu Aufgabe 4; in `hole` wird die zweite Methode aufgerufen.

b) Vermeidbare Kranbewegungen im Auftrag des ersten Tages:

- **A – Freifläche (540 Euro):** Jedes Zurückstellen ist vermeidbar. 2001 fährt zweimal zur Freifläche und zurück, 3003 einmal – insgesamt sechs Fahrten zu je 80 Euro. Nötig wäre je Blocker nur **eine** Bewegung, am günstigsten auf einen Nachbarstapel (50 Euro).
- **B – Nachbarstapel (210 Euro):** Das zweite Umsetzen von 2001. Er landet zuerst auf Stapel 2, genau über 1234, der als Nächstes abgeholt wird, und muss dort noch einmal weg (50 Euro).
- **Vorausschauend (160 Euro):** keine. Jeder Blocker wird genau einmal bewegt; das ist für diesen Auftrag das Minimum.

::::

## Programmieren – Zusatz B: Eigene Testfälle

::::protect{password="java-q-4-st-c-13" description="Mögliche Testfälle. Erfrage das Passwort bei deiner Lehrkraft."}

Mögliche Testfälle mit den Kosten der Musterlösungen (nachgerechnet):

| Testfall | A Freifläche | B Nachbarstapel | vorausschauend | Bestwert |
| --- | --- | --- | --- | --- |
| Container steht schon oben (`hole("2001")` am ersten Tag) | 20 € | 20 € | 20 € | 20 € |
| Container gibt es nicht (`hole("9999")`) | 0 €, nichts bewegt | 0 €, nichts bewegt | 0 €, nichts bewegt | – |
| Nachbarstapel voll: Stapel 1 = A, B · Stapel 2 = C, D, E, F (voll) · Stapel 3 leer; Lkw holt A | 180 € | 70 € (B weicht auf Stapel 3 aus) | 70 € | 70 € |
| Zweiter Tag (Planen, Aufgabe 3): 6002, 6004, 6008, 6001 | 720 € | 430 € | 380 € | 290 € |

Wo die Strategien versagen oder teuer werden:

- **A** ist immer korrekt, aber teuer: Jeder Blocker kostet zweimal 80 Euro.
- **B** achtet nicht darauf, was unter dem Ziel steht. Am zweiten Tag setzt die Strategie Blocker auf Container, die bald abgeholt werden, und muss sie erneut bewegen.
- **Vorausschauend** benutzt die Freifläche nur, wenn kein Stapel Platz hat. Am zweiten Tag wäre es günstiger, einen Blocker auf der Freifläche **stehen zu lassen** (80 Euro einmal) – jeder Stapel mit Platz liegt dort über einem Container, der noch gebraucht wird. Das zeigt der Bestwert von 290 Euro.

Ein Grenzfall für Fortgeschrittene: Steht der gesuchte Container auf der **Freifläche** unter anderen Containern, versucht Strategie A `umsetzen(0, 0)`. Der Kran meldet einen Fehlversuch, nichts bewegt sich – und die Schleife läuft endlos. Mit A allein entsteht diese Lage nie, wohl aber, wenn Strategien gemischt werden.

::::

## Programmieren – Zusatz C: `naechsteAbholung` selbst bauen

::::protect{password="java-q-4-st-c-4" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```java
public int naechsteAbholung(int pStapel) {
    Stack<Container> kopie = terminal.stapel(pStapel);
    int naechste = 0;
    while (!kopie.isEmpty()) {
        int a = kopie.top().getAbholung();
        if (a > 0 && (naechste == 0 || a < naechste)) {
            naechste = a;
        }
        kopie.pop();
    }
    return naechste;
}
```

Erwartet: Stapel 1 liefert 1 (4711), Stapel 2 liefert 2 (1234), Stapel 3 liefert 0.

`naechsteAbholung` darf die Kopie leeren. Würde `stapel` das Original liefern, wäre nach dem Nachsehen der Stapel im Terminal leer – ohne dass der Kran einen Container bewegt hat.

::::


## Programmieren – Zusatz D: Drei Wellen

::::protect{password="java-q-4-st-c-5" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Benutzt die Hilfsmethode `ruhe` aus der Lösung zu Aufgabe 4c.

```java
public void hole(String pNummer) {
    holeVorausschauend(pNummer);
}

public void lagereEin(Container pContainer) {
    int a = pContainer.getAbholung();
    if (a == 0) {
        a = 1000;
    }
    int ziel = 0;
    // passender Stapel: wird erst nach dem neuen Container gebraucht, möglichst knapp
    for (int i = 1; i <= 3; i++) {
        if (!terminal.istVoll(i) && ruhe(i) >= a && (ziel == 0 || ruhe(i) < ruhe(ziel))) {
            ziel = i;
        }
    }
    // sonst: der ruhigste Stapel mit Platz
    if (ziel == 0) {
        for (int i = 1; i <= 3; i++) {
            if (!terminal.istVoll(i) && (ziel == 0 || ruhe(i) > ruhe(ziel))) {
                ziel = i;
            }
        }
    }
    terminal.einlagern(pContainer, ziel);
}
```

| `hole` | `lagereEin` | Gesamtkosten |
| --- | --- | --- |
| Freifläche | erster Stapel mit Platz | 1180 Euro |
| Nachbar | erster Stapel mit Platz | 520 Euro |
| vorausschauend | erster Stapel mit Platz | 470 Euro |
| vorausschauend | wie oben | **320 Euro** |

c) Mögliche Regel: Ein neuer Container kommt auf einen Stapel, von dem erst **nach** ihm etwas abgeholt wird; gibt es mehrere, auf den, bei dem es am knappsten passt. Container, die bleiben, kommen auf ruhige Stapel.

320 Euro ist das Minimum: In Welle 2 und 3 fällt dann nur noch an, was ohnehin bezahlt werden muss – einlagern und verladen.

::::


## Programmieren – Weiterdenken: Warum eine Kopie?

::::protect{password="java-q-4-st-c-6" description="Auflösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Wer nachsieht, muss den Stapel abbauen. Mit dem Original stünden die Container danach auf einem Hilfsstapel oder wären ganz verschwunden – im Terminal hätte sich etwas bewegt, ohne dass der Kran gefahren ist und ohne Kosten.

b) Kopie und Original verweisen auf **dieselben** Container-Objekte. Wird in der Kopie ein Container gesperrt, ist er auch im Terminal gesperrt.

c) Beim Kopieren wird für jeden Container ein **neues** Objekt erzeugt: `kopie.push(new Container(c.getNummer(), c.getAbholung()));` Dann sind auch die Container unabhängig.

::::
