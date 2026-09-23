---
title: Längere Formeln aufbauen und prüfen
index: 2
permaid: mittelstufe-calc-komplexe-formeln
---

# Längere Formeln aufbauen und prüfen

Eine längere Formel verbindet mehrere Rechenschritte. Hier sind es Rabatt, Versand, Steuer und Wechselkurs. **Prüfen** bedeutet: Du setzt bewusst einfache Testwerte ein und kontrollierst, ob sich das Ergebnis so verändert, wie du es erwartest.

Calc prüft nur, ob es die Formel ausrechnen kann. Ob die Formel zur Aufgabe passt, musst du selbst prüfen.

## Erst die Rechenidee klären

Für ein Angebot gelten diese Regeln:

1. Ziehe den Rabatt vom Preis ab.
2. Addiere danach den Versand. Der Versand wird also nicht rabattiert.
3. Berechne anschließend die Steuer. Der Versand wird mitversteuert.
4. Rechne zuletzt mit dem Wechselkurs in Euro um.

Lege eine Tabelle mit Preisen in Spalte A und Ergebnissen in Spalte B bis F an. Schreibe die gemeinsamen Einstellungen rechts daneben:

| Zelle | Inhalt | Beispielwert |
| --- | --- | ---: |
| A2 | Preis | 100 |
| A3 | zweiter Preis zum Kopieren | 80 |
| H2 | Rabatt | 12 % |
| H3 | Versand | 8 |
| H4 | Steuer | 20 % |
| H5 | Wechselkurs | 1,16 |

Beschrifte `B1:F1` mit „nach Rabatt“, „mit Versand“, „mit Steuer“, „in Euro“ und „alles in einer Formel“. So siehst du die einzelnen Ergebnisse nebeneinander.

## Schritt für Schritt zur Formel

Baue die Rechnung von links nach rechts auf. Tippe jede Formel in die angegebene Zelle und prüfe den angezeigten Wert.

| Zelle | Rechenschritt | Formel |
| --- | --- | --- |
| B2 | Preis nach Rabatt | `=A2*(1-$H$2)` |
| C2 | danach Versand | `=B2+$H$3` |
| D2 | danach Steuer | `=C2*(1+$H$4)` |
| E2 | danach Umrechnung | `=D2*$H$5` |
| F2 | dieselbe Rechnung in einer Formel | `=((A2*(1-$H$2)+$H$3)*(1+$H$4))*$H$5` |

Die Ergebnisse in B2 bis E2 zeigen jeden Schritt. F2 rechnet dasselbe direkt aus den Eingaben. Die Klammer um `A2*(1-$H$2)+$H$3` zeigt: Erst werden Rabatt und Versand berechnet, dann wird auf diese Zwischensumme die Steuer angewendet.

:::snippet{#merken}
Eine Formel muss nicht sofort in einer einzigen Zelle entstehen. **Hilfsspalten sind sinnvoll**, wenn du dadurch jeden Rechenschritt sehen und prüfen kannst. Erst wenn alle Teile stimmen, kannst du sie zu einer Formel verbinden.
:::

## Was heißt „die Formel testen“?

Verwende nacheinander Werte, bei denen du die Wirkung schon vorher kennst:

| Testwert | Erwartung | Was du damit prüfst |
| --- | --- | --- |
| Rabatt = 0 % | Es wird nichts abgezogen. | Ist der Rabatt richtig eingebaut? |
| Versand = 0 | Es kommen keine Versandkosten hinzu. | Steht der Versand an der richtigen Stelle? |
| Steuer = 0 % | Die Zwischensumme bleibt unverändert. | Ist der Steuerfaktor richtig? |
| Wechselkurs = 1 | Das Ergebnis bleibt in der Ausgangswährung gleich. | Funktioniert die Umrechnung? |
| Preis = 0 | Nur Versand, Steuer und Umrechnung bleiben übrig. | Wird der Versand versehentlich rabattiert? |

Das sind **Sonderfälle**. Sie machen jeweils einen Teil der Formel unwirksam und helfen dir dadurch, Fehler einzugrenzen.

:::snippet{#aufgabe}
1. Baue die Formel aus der Tabelle schrittweise auf.
2. Vergleiche das Ergebnis in F2 mit E2. Beide sollten gleich sein.
3. Notiere vor jedem Test, welches Ergebnis oder welche Veränderung du erwartest. Ändere dazu jeweils einen Wert in H2 bis H5 oder den Preis in A2.
4. Kopiere die Formeln aus B2:F2 nach unten in Zeile 3. Kontrolliere: A2 wird zu A3; die Parameter H2 bis H5 bleiben fest.
:::

::::collapsible{title="Tipp: Wenn nur die erste Zeile stimmt"}

Klicke F3 an und vergleiche die Zellbezüge mit F2. Preis `A2` soll zu `A3` werden. Die Parameter in H2 bis H5 müssen durch ihre Dollarzeichen fest bleiben.

::::

:::protect{password="calc-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-2-1.ods)

Die vollständige Formel in F2 lautet `=((A2*(1-$H$2)+$H$3)*(1+$H$4))*$H$5`. Mit den Beispielwerten ergibt sich 133,632. Auch E2 zeigt 133,632.

Bei Preis 0 bleiben Versand, Steuer und Wechselkurs übrig. Bei Rabatt 0 wird der volle Preis verwendet. Bei Wechselkurs 1 siehst du das Ergebnis vor der Umrechnung. Diese Ergebnisse sind keine Zufälle, sondern vorhergesagte Kontrollen.

:::

## Wenn das Ergebnis trotzdem falsch ist

Gehe nicht die ganze Formel auf einmal durch, sondern prüfe in dieser Reihenfolge:

1. Stimmen die Eingabewerte und ihre Formate, zum Beispiel `12 %` statt `12`?
2. Stimmt die Reihenfolge der Rechenschritte?
3. Stehen die Klammern an den richtigen Stellen?
4. Wandert beim Kopieren nur der Preisbezug?
5. Besteht die Formel die einfachen Tests von oben?

:::snippet{#brain}
Eine kurze Formel ist nicht automatisch eine gute Formel. Eine nachvollziehbare Rechnung mit Hilfsspalten ist oft leichter zu erklären, zu kontrollieren und zu verbessern.
:::

---

## Selbsttest

::::multievent

**1. Was bedeutet es, eine Formel zu testen?**
{r1{!Einfache Werte einsetzen und das Ergebnis mit einer Vorhersage vergleichen.}}
{r1{Nur prüfen, ob Calc eine Fehlermeldung zeigt.}}
{H{Richtig. Auch eine berechenbare Formel kann inhaltlich falsch sein.}}

**2. Welcher Test macht einen Wechselkurs als Faktor wirkungslos?**
{r2{Wechselkurs null}}
{r2{!Wechselkurs eins}}
{r2{Wechselkurs hundert}}
{H{Richtig. Eine Multiplikation mit eins verändert den Wert nicht.}}

**3. Warum testet man Preis null?**
{r3{!Dann werden die übrigen Bestandteile der Rechnung sichtbar.}}
{r3{Damit Calc die Datei speichert.}}
{H{Richtig. So kannst du insbesondere Versand, Steuer und Wechselkurs prüfen.}}

**4. Was deutet auf einen fehlenden absoluten Bezug hin?**
{r4{!Nur die erste Zeile ist korrekt.}}
{r4{Alle Ergebnisse sind gleich.}}
{H{Richtig. Beim Kopieren ist vermutlich ein Parameter gewandert.}}

**5. Sind Hilfsspalten immer ein Zeichen für eine schlechte Formel?**
{r5{ja}}
{r5{!nein, sie machen Teilrechnungen prüfbar}}
{H{Richtig. Verständlichkeit ist wichtiger als Kürze.}}

::::
