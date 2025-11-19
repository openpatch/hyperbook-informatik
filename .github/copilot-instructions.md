# Richtlinien für die Entwicklung von Web Components

Wenn du eine Web Component für unser Projekt entwickelst, beachte bitte die folgenden Richtlinien:

Lege sie im Ordner /public/wc ab. Verwende außerdem die folgenden Farbvariablen für das Styling, achte aber darauf, einen guten Kontrast zwischen Text und Hintergrund zu haben:

```css
--color-brand: "#007864";
--color-brand-text: "white";
--color-background: white;
--color-text: black;
--color-text-deactivated: #242428;
--color-nav: #f5f5f5;
--color-nav-border: #3c3c3c;
--color-author-background: #d6d6d6;
--color-author-color: #3c3c3c;
--color-spacer: #a4a4a4;
```

Du kannst auch Schattierungen dieser Farben verwenden. Versuche aber, diese aus den obigen Grundfarben zu berechnen, um Konsistenz sicherzustellen.

Diese Variablen ändern sich je nach Theme (hell oder dunkel). Oben siehst du ihre Standardwerte.

Die Web Component sollte auch auf Touch-Geräten funktionieren.

Erstelle keine demo.html. Aktualisiere stattdessen die Datei /book/wc.md, um die Web Component zu dokumentieren. Folge dem bestehenden Format in wc.md.

Manchmal werden die Web Components auf mobilen Geräten mit kleinen Bildschirmen verwendet. Stelle sicher, dass deine Komponente auch auf kleinen Bildschirmen gut funktioniert.

Setze keine eigene Schriftart. Die Web Component sollte die vom Hauptprojekt definierte Schriftart verwenden.

Verwende immer deutschen Text für alle Labels, Anweisungen oder Nachrichten in der Web Component.

# Inhalte

Dateien im Ordner "/book/unterstufe/" sind für die "Unterstufe" (Grundschule/Orientierungsstufe). Die Schüler sind zwischen 8 und 12 Jahre alt.

Dateien im Ordner "/book/mittelstufe/" sind für die "Mittelstufe" (Sekundarstufe I). Die Schüler sind zwischen 12 und 16 Jahre alt.

Dateien im Ordner "/book/oberstufe/" sind für die "Oberstufe" (Sekundarstufe II). Die Schüler sind zwischen 16 und 19 Jahre alt.

Versuche, die Sprache und Beispiele altersgerecht zu gestalten.

# Quiz

Verwende die multievent-Direktive für Quizzes

Hier ist die Dokumentation dazu:

Mit Multievent können 26 verschiedene interaktive Event-Formate auf einer Webseite implementiert werden. Dieses JavaScript durchsucht das Dokument nach Bereichen, die in doppelte geschweifte Klammern {{…}} eingeschlossen sind. Der eingeschlossene Inhalt wird in ein interaktives Element umgewandelt. Die Zeichen zwischen den öffnenden geschweiften Klammern bestimmen das Ergebnis. Unten ist eine Liste der Formate und der entsprechenden Zeichenfolgen. Zum Beispiel erzeugt ein kleines {r{…}} einen auswertbaren Radiobutton vor dem eingeschlossenen Begriff (siehe unten).

## Feedback

Für Aufgaben, die ausgewertet werden, können die folgenden Codierungen hinzugefügt werden:

```md
:::multievent
{H{Hinweis, der nach der Auswertung angezeigt wird, wenn die Aufgabe korrekt ausgewertet wurde.}}
{h{Hinweis, der nach der Auswertung angezeigt wird, wenn die Aufgabe falsch ausgewertet wurde.}}
:::
```

:::multievent
{H{Hinweis, der nach der Auswertung angezeigt wird, wenn die Aufgabe korrekt ausgewertet wurde.}}
{h{Hinweis, der nach der Auswertung angezeigt wird, wenn die Aufgabe falsch ausgewertet wurde.}}
:::

## Aufgabe 1

Klicke auf das schnellste Landtier der Welt.

Syntax: {r1{, {r2{, {r3{ (kleines r mit Nummer)

Ergebnis: Radiobutton auf der linken Seite (Das Ausrufezeichen ! kennzeichnet den korrekten Begriff. Zusammengehörige Buttons teilen sich dieselbe Nummer.)

```md
:::multievent
{r1{Leopard}}   {r1{!Gepard}}   {r1{Gazelle}}   {r1{Strauß}}   {r1{Windhund}}
:::
```

:::multievent
{r1{Leopard}}   {r1{!Gepard}}   {r1{Gazelle}}   {r1{Strauß}}   {r1{Windhund}}
:::

## Aufgabe 2

Klicke auf das größte Meerestier.

Syntax: {R1{, {R2{, {R3{ (großes R mit Nummer)

Ergebnis: Radiobutton auf der rechten Seite (Das Ausrufezeichen ! kennzeichnet den korrekten Begriff. Zusammengehörige Buttons teilen sich dieselbe Nummer.)

```md
:::multievent
{R1{!Blauwal}}   {R1{Pottwal}}   {R1{Riesenkalmar}}   {R1{Riesenhai}}   {R1{Walhai}}
:::
```

:::multievent
{R1{!Blauwal}}   {R1{Pottwal}}   {R1{Riesenkalmar}}   {R1{Riesenhai}}   {R1{Walhai}}
:::

## Aufgabe 3

Klicke auf alle Säugetiere. Solange nicht alle Kästchen korrekt angekreuzt sind, erscheinen nach der Auswertung Lupen neben den Kästchen.

Syntax: {c{ (kleines c) Zum Gruppieren von Aufgaben: {c1{; {c2{ ...

Ergebnis: Checkbox auf der linken Seite (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff.)

```md
:::multievent
{c{!Gazelle}}   {c{!Maus}}   {c{Riesenkalmar}}   {c{Strauß}}   {c{!Windhund}}
:::
```

:::multievent
{c{!Gazelle}}   {c{!Maus}}   {c{Riesenkalmar}}   {c{Strauß}}   {c{!Windhund}}
:::

## Aufgabe 4

Klicke auf alle Süßwasserfische. Solange nicht alle Kästchen korrekt angekreuzt sind, erscheinen nach der Auswertung Lupen neben den Kästchen.

Syntax: {C{ (großes C) Zum Gruppieren von Aufgaben: {C1{; {C2{ ...

Ergebnis: Checkbox auf der rechten Seite (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff.)

```md
:::multievent
{C{Kabeljau}}   {C{!Forelle}}   {C{!Karpfen}}   {C{Hering}}   {C{!Zander}}
:::
```

:::multievent
{C{Kabeljau}}   {C{!Forelle}}   {C{!Karpfen}}   {C{Hering}}   {C{!Zander}}
:::

## Aufgabe 5

Ordne das Sprichwort richtig an.

Syntax: {a{ (kleines a)

Ergebnis: Dropdown ohne leere Auswahl (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff. Der senkrechte Strich | trennt die Dropdown-Optionen.)

```md
:::multievent
Eine {a{Ente|Meise|Möwe|!Schwalbe|Taube}} macht noch keinen Sommer.
:::
```

:::multievent
Eine {a{Ente|Meise|Möwe|!Schwalbe|Taube}} macht noch keinen Sommer.
:::

## Aufgabe 6

Klicke auf den Vogel mit der größten Flügelspannweite.

Syntax: {A{ (großes A)

Ergebnis: Dropdown mit leerer Auswahl (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff. Der senkrechte Strich | trennt die Dropdown-Optionen.)

```md
:::multievent
{A{Andenkondor|Krauskopfpelikan|Marabu|Trompeterschwan|!Wanderalbatros}}
:::
```

:::multievent
{A{Andenkondor|Krauskopfpelikan|Marabu|Trompeterschwan|!Wanderalbatros}}
:::

## Aufgabe 7

Klicke auf das richtige Tier.

Syntax: {S1{ (großes S mit Nummer S1, S2, S3 ...)

Ergebnis: Dropdown (Alle Bereiche mit derselben Nummer werden im Dropdown zusammengefasst.)

```md
:::multievent
Der {S1{Kuckuck}} und der {S1{Esel}}, die hatten einen Streit ...
:::
```

:::multievent
Der {S1{Kuckuck}} und der {S1{Esel}}, die hatten einen Streit ...
:::

## Aufgabe 8

Klicke auf alle Säugetiere.

Syntax: {k{ (kleines k) Zum Gruppieren von Aufgaben: {k1{; {k2{ ...

Ergebnis: Anklickbarer Button (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff. Nach korrekter Auswertung verschwinden überschüssige Begriffe.)

```md
:::multievent
{k{Kuckuck}} {k{!Esel}} {k{!Kuh}} {k{Fisch}}
:::
```

:::multievent
{k{Kuckuck}} {k{!Esel}} {k{!Kuh}} {k{Fisch}}
:::

## Aufgabe 9

Klicke auf alle Säugetiere.

Syntax: {K{ (großes K) Zum Gruppieren von Aufgaben: {K1{; {K2{ ...

Ergebnis: Anklickbarer Button (Das Ausrufezeichen ! kennzeichnet einen korrekten Begriff. Nach korrekter Auswertung bleiben überschüssige Begriffe sichtbar.)

```md
:::multievent
{K{Kuckuck}}, {K{!Esel}}, {K{!Kuh}}, {K{Fisch}}
:::
```

:::multievent
{K{Kuckuck}}, {K{!Esel}}, {K{!Kuh}}, {K{Fisch}}
:::

## Aufgabe 10

Gib das richtige Tier ein.

Syntax: {l{ (kleines l)

Ergebnis: Textfeld mit durcheinander gewürfeltem Wort als Hinweis (Groß-/Kleinschreibung wird nicht beachtet.)

```md
:::multievent
Alle meine {l{Entchen}} schwimmen auf dem See, ...
:::
```

:::multievent
Alle meine {l{Entchen}} schwimmen auf dem See, ...
:::

## Aufgabe 11

Gib das richtige Tier ein.

Syntax: {L{ (großes L)

Ergebnis: Textfeld mit durcheinander gewürfeltem Wort als Hinweis (Groß-/Kleinschreibung wird beachtet.)

```md
:::multievent
An der Wand, an der Wand liegt ein kleiner {L{Käfer}} ...
:::
```

:::multievent
An der Wand, an der Wand liegt ein kleiner {L{Käfer}} ...
:::

## Aufgabe 12

Gib das richtige Tier ein.

Syntax: {t{ (kleines t)

Ergebnis: Leeres Textfeld (Groß-/Kleinschreibung wird nicht beachtet.)

```md
:::multievent
Der Kuckuck und der {t{Esel}}, die hatten einen Streit ...
:::
```

:::multievent
Der Kuckuck und der {t{Esel}}, die hatten einen Streit ...
:::

## Aufgabe 13

Gib das richtige Tier ein.

Syntax: {T{ (großes T)

Ergebnis: Leeres Textfeld (Groß-/Kleinschreibung wird beachtet.)

```md
:::multievent
Fuchs, du hast die {T{Gans}} gestohlen, gib sie wieder her ...
:::
```

:::multievent
Fuchs, du hast die {T{Gans}} gestohlen, gib sie wieder her ...
:::

## Aufgabe 14

Wie viele Beine haben ein Bauer, 2 Kühe und 3 Enten zusammen?

Syntax: {z{ (kleines z)

Ergebnis: Leeres Textfeld für Zahleneingabe (Im Beispiel sind 16; 16,0 und 16,00 korrekt.)

```md
:::multievent
Antwort: Sie haben {z{16}} Beine.
:::
```

:::multievent
Antwort: Sie haben {z{16}} Beine.
:::

## Aufgabe 15

Gib eine ungerade Zahl < 10 ein.

Syntax: {z{ (kleines z)

Ergebnis: Leeres Textfeld für Zahleneingabe aus einer Gruppe von Zahlen (Der senkrechte Strich | trennt die Alternativen. Im Beispiel sind die Zahlen 1, 3, 5, 7 und 9 korrekt.)

```md
:::multievent
Antwort: {z{1|3|5|7|9}}
:::
```

:::multievent
Antwort: {z{1|3|5|7|9}}
:::

## Aufgabe 16

Wie viele Beine haben ein Bauer, x Kühe und y Enten zusammen?

Syntax: {X{ mit {Z{ (großes X mit großem Z)

Ergebnis: Unterschiedlich gefüllte Textabschnitte {X{ mit angepassten Zahleneingabewerten {Z{ (Der senkrechte Strich | trennt die Werte, die nacheinander aufgerufen werden, wenn auf den quadratischen "Eingabe"-Pfeil ↵ neben der Auswertung geklickt wird.)

```md
:::multievent
Wie viele Beine haben ein Bauer, {X{4|2|3|5}} Kühe und {X{2|4|5|3}} Enten zusammen?

Antwort: Sie haben {Z{22|18|24|28}} Beine.
:::
```

:::multievent
Wie viele Beine haben ein Bauer, {X{4|2|3|5}} Kühe und {X{2|4|5|3}} Enten zusammen?

Antwort: Sie haben {Z{22|18|24|28}} Beine.
:::

## Aufgabe 17

Gib den deutschen Begriff ein.

Syntax: {X{ mit {y{ (großes X mit kleinem y)

Ergebnis: Unterschiedlich gefüllte Textabschnitte {X{ mit angepassten Texteingabewerten {y{ (Der senkrechte Strich | trennt die Werte, die nacheinander aufgerufen werden, wenn auf den quadratischen "Eingabe"-Pfeil ↵ neben der Auswertung geklickt wird. Groß-/Kleinschreibung wird nicht beachtet.)

```md
:::multievent
Englisch: {X{cat|cow|dog|horse|pig}} → Deutsch: {y{Katze|Kuh|Hund|Pferd|Schwein}}
:::
```

:::multievent
Englisch: {X{cat|cow|dog|horse|pig}} → Deutsch: {y{Katze|Kuh|Hund|Pferd|Schwein}}
:::

## Aufgabe 18

Gib den deutschen Begriff ein.

Syntax: {X{ mit {Y{ (großes X mit großem Y)

Ergebnis: Unterschiedlich gefüllte Textabschnitte {X{ mit angepassten Texteingabewerten {Y{ (Der senkrechte Strich | trennt die Werte, die nacheinander aufgerufen werden, wenn auf den quadratischen "Eingabe"-Pfeil ↵ neben der Auswertung geklickt wird. Groß-/Kleinschreibung wird beachtet.)

```md
:::multievent
Englisch: {X{bee|dolphin|eagle|shark|spider}} → Deutsch: {Y{Biene|Delfin|Adler|Hai|Spinne}}
:::
```

:::multievent
Englisch: {X{bee|dolphin|eagle|shark|spider}} → Deutsch: {Y{Biene|Delfin|Adler|Hai|Spinne}}
:::

## Aufgabe 19

Mache dir Notizen.

Syntax: {n{ (kleines n)

Ergebnis: Textbereich für Notizen. (Für die Dauer der Browser-Sitzung können Hilfstexte im Browser eingegeben werden.)

```md
:::multievent
{n{200|22|Notizen}} {n{Feldbreite|Feldhöhe|Text}}
:::
```

:::multievent
{n{200|22|Notizen}} {n{Feldbreite|Feldhöhe|Text}}
:::

## Aufgabe 20

Klicke auf das Auge für weitere Informationen.

Syntax: {b{ (kleines b)

Ergebnis: Umschaltung für versteckte Hilfeangebote. (Durch Klicken auf das Auge wird die Hilfe ein- oder ausgeblendet.)

```md
:::multievent
{b{ Hilfe 1, Hilfe 2, ...}}
:::
```

:::multievent
{b{ Hilfe 1, Hilfe 2, ...}}
:::

## Aufgabe 21

Klicke auf das Auge für weitere Informationen.

Syntax: {B{ (großes B)

Ergebnis: Eingerückte Umschaltung für versteckte Hilfeangebote. (Durch Klicken auf das Auge wird die Hilfe ein- oder ausgeblendet.)

```md
:::multievent
{B{ Hilfe 1, Hilfe 2, ...}}
:::
```

:::multievent
{B{ Hilfe 1, Hilfe 2, ...}}
:::

## Aufgabe 22

Klicke in das Eingabefenster und drücke die richtigen Buchstaben für den gesuchten Vogel.

Syntax: {v{ (kleines v)

Ergebnis: Wortsuche (Der senkrechte Strich | trennt die Begriffe.)

```md
:::multievent
{v{Specht|Adler|Fasan}}
:::
```

:::multievent
{v{Specht|Adler|Fasan}}
:::

## Aufgabe 23

Klicke auf die Buchstaben der Tiere in der Wortsuche.

Syntax: {w{ (kleines w)

Ergebnis: Wortsuche (Der senkrechte Strich | trennt die Zellen. Die doppelte Tilde ~~ trennt die Zeilen. Großbuchstaben - korrekt; Kleinbuchstaben - falsch.)

```md
:::multievent
{w{
a|M|p|b~~
H|A|H|N~~
d|U|g|d~~
E|S|E|L}}
:::
```

:::multievent
{w{
a|M|p|b~~
H|A|H|N~~
d|U|g|d~~
E|S|E|L}}
:::

## Aufgabe 24

Löse das Kreuzworträtsel.

Syntax: {W{ (großes W)

Ergebnis: Kreuzworträtsel (Der senkrechte Strich | trennt die Zellen. Die doppelte Tilde ~~ trennt die Zeilen.)

```md
:::multievent
{W{ 
    | | |1| ~~
   2|E|N|T|E~~
    | | |U| ~~
    | | |B| ~~
    | | |E| }}
:::
```

:::multievent
{W{ 
    | | |1| ~~
   2|E|N|T|E~~
    | | |U| ~~
    | | |B| ~~
    | | |E| }}
:::

## Kombinieren

Die verschiedenen Events können frei kombiniert werden.

```md
:::multievent
- a) {r1{!richtig}} {r1{falsch}}
- b) {R1{!richtig}} {R1{falsch}}
- c) {c{!richtig}} {c{falsch}}
- d) {C{!richtig}} {C{falsch}}
- e) {a{!richtig|falsch}}
- f) {A{!richtig|falsch}}
:::
```

:::multievent
- a) {r1{!richtig}} {r1{falsch}}
- b) {R1{!richtig}} {R1{falsch}}
- c) {c{!richtig}} {c{falsch}}
- d) {C{!richtig}} {C{falsch}}
- e) {a{!richtig|falsch}}
- f) {A{!richtig|falsch}}
:::

## Mathematische Formeln

Mathematische Formeln können auch in den Events verwendet werden. Diese werden in geschweifte Klammern eingeschlossen.

Wähle alle irrationalen Zahlen aus.

```md
:::multievent
{c{!$\sqrt{2}$}} {c{!$\pi$}} {c{$\frac{1}{2}$}}
:::
```

:::multievent
{c{!$\sqrt{2}$}} {c{!$\pi$}} {c{$\frac{1}{2}$}}
:::

Wähle den richtigen Exponenten aus.

:::multievent
2^{{a{2|3|!4|8}}}=16
:::
