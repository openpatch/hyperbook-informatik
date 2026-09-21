---
title: Komplexe Formeln testen
index: 2
permaid: mittelstufe-calc-komplexe-formeln
---

# Komplexe Formeln testen

Rabatt, Steuer, Versand und Wechselkurs in einer Formel: Calc rechnet das klaglos aus. Ob die Rechnung aber dein Problem richtig beschreibt, musst du entscheiden.

## Von Worten zur Formel

Ein Preis erhält zunächst 12 % Rabatt, danach kommen 20 % Steuer hinzu. Übersetze schrittweise:

1. Preis nach Rabatt: `Preis * (1 - Rabatt)`
2. mit Steuer: `Preis * (1 - Rabatt) * (1 + Steuer)`

:::snippet{#merken}
Baue komplexe Formeln **von innen nach außen** auf. Nutze Klammern für die fachliche Struktur und Parameterzellen für veränderliche Annahmen.
:::

:::snippet{#aufgabe}
Lege Preis, Rabatt, Steuer, Versand und Wechselkurs als Eingaben an. Berechne in einer Formel:

`((Preis nach Rabatt) + Versand) mit Steuer, anschließend umgerechnet`

Sage voraus, ob der Versand ebenfalls rabattiert wird. Teste die Formel mit Preis 0, Rabatt 0 und Wechselkurs 1. Was verraten diese Sonderfälle?
:::

::::collapsible{title="Tipp 1: Klammergerüst"}

Beginne mit `((Preis*(1-Rabatt))+Versand)` und ergänze danach Steuer und Wechselkurs.

::::

::::collapsible{title="Tipp 2: Bezüge"}

Nur der Preis kommt aus der jeweiligen Datenzeile. Alle Parameter erhalten absolute Bezüge.

::::

:::protect{password="calc-2-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-2-1.ods)

Bei einem Preis in `B2` und Parametern in `F1:F4` kann die Formel `=((B2*(1-$F$1)+$F$2)*(1+$F$3))*$F$4` lauten. Der Versand wird nicht rabattiert, aber versteuert. Preis 0 isoliert Versand und Steuer; Rabatt 0 entfernt den Rabatt; Wechselkurs 1 zeigt den Wert vor der Umrechnung.

:::

## Fehler systematisch eingrenzen

Klicke eine Ergebniszelle an: In der Eingabezeile siehst du die Formel, farbige Rahmen markieren oft die verwendeten Zellen. Prüfe Teilrechnungen vorübergehend in Hilfsspalten.

:::snippet{#aufgabe}
Eine kopierte Formel liefert nur in der ersten Zeile das richtige Ergebnis. Formuliere einen Prüfplan mit mindestens vier Schritten. Wende ihn auf eine eigene absichtlich fehlerhafte Formel an.
:::

:::snippet{#brain}
Eine lange Formel ist nicht automatisch „fortgeschritten“. Gute Modelle sind nachvollziehbar. Hilfsspalten können eine Rechnung transparenter und dadurch verlässlicher machen.
:::

---

## Selbsttest

::::multievent

**1. Was hilft beim Aufbau einer komplexen Formel?**
{r1{!Teilrechnungen und Klammern}}
{r1{möglichst viele feste Zahlen}}
{H{Richtig.}}

**2. Welcher Test neutralisiert einen Wachstums- oder Wechselkursfaktor?**
{r2{Faktor null}}
{r2{!Faktor eins}}
{r2{Faktor hundert}}
{H{Richtig. Multiplikation mit eins ändert nichts.}}

**3. Warum testet man Preis null?**
{r3{!Andere Bestandteile der Rechnung werden sichtbar.}}
{r3{Damit Calc die Datei speichert.}}
{H{Richtig.}}

**4. Was deutet auf einen fehlenden absoluten Bezug hin?**
{r4{!Nur die erste Zeile ist korrekt.}}
{r4{Alle Ergebnisse sind gleich.}}
{H{Richtig. Beim Kopieren ist vermutlich ein Parameter gewandert.}}

**5. Sind Hilfsspalten immer ein Zeichen für ein schlechtes Modell?**
{r5{ja}}
{r5{!nein, sie können Teilrechnungen prüfbar machen}}
{H{Richtig. Verständlichkeit ist wichtiger als Kürze.}}

::::
