---
title: Eine Webseite untersuchen
index: 2
---

# Eine Webseite untersuchen

Jede Webseite, die du siehst, liegt vollständig auf deinem Gerät – sonst könntest du sie nicht sehen. Du kannst sie also auch aufmachen und nachsehen, woraus sie besteht.

## Die Entwicklerwerkzeuge

:::snippet{#merken}
Jeder Browser bringt Werkzeuge zum Untersuchen mit. Du öffnest sie mit **F12** oder über *Rechtsklick → Untersuchen*.

| Reiter | Was du dort siehst |
| --- | --- |
| **Elemente** (oder *Inspektor*) | den Aufbau der Seite als Baum, dazu die wirkenden :t[CSS]{#css}-Regeln |
| **Netzwerk** | jede einzelne Datei, die geladen wurde: Name, Typ, Größe, Statuscode |
| **Konsole** | Fehlermeldungen |

Mit *Rechtsklick → Seitenquelltext anzeigen* bekommst du außerdem die :t[HTML]{#html}-Datei so zu sehen, wie der Server sie geschickt hat.
:::

:::alert{info}
Was du in den Entwicklerwerkzeugen änderst, ändert **nur deine Ansicht** – nichts davon geht an den Server zurück. Du kannst also nichts kaputt machen. Beim nächsten Neuladen ist alles wieder wie vorher.

Genau deshalb sind Bildschirmfotos von so veränderten Seiten auch kein Beweis für gar nichts.
:::

## Aufgabe: eine echte Seite auseinandernehmen

:::snippet{#aufgabe}
Öffne diese Seite hier – die, die du gerade liest – und drücke **F12**.

a) Wechsle in den Reiter **Netzwerk** und lade die Seite neu. Wie viele Dateien werden geladen? Notiere die drei größten mit Name, Typ und Größe.

b) Sortiere nach Typ. Welche Arten von Dateien kommen vor?

c) Wechsle in den Reiter **Elemente** und suche die Überschrift dieser Seite im Baum. Welches HTML-Element ist es?

d) Klicke in den Elementen auf ein beliebiges Element und sieh rechts unter *Styles* nach. Woher kommen die Regeln, die auf dieses Element wirken?
:::

::::collapsible{title="Tipp: Der Netzwerk-Reiter bleibt leer?"}

Er zeichnet nur auf, was **nach dem Öffnen** geladen wird. Lade die Seite bei geöffnetem Reiter noch einmal neu – unter Windows mit F5, unter macOS mit Cmd+R.

::::

:::protect{password="web-1-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Die genauen Zahlen unterscheiden sich je nach Seite und Browser. Wichtig sind die Beobachtungen:

a) Es sind **viele** Dateien, meist mehrere Dutzend – obwohl du nur eine Adresse aufgerufen hast. Die größten sind fast immer Bilder oder Schriftdateien, nicht die HTML-Datei.

b) Typischerweise: `document` (die HTML-Datei), `stylesheet` (CSS), `script` (JavaScript), `image` (Bilder), `font` (Schriften).

c) Die Hauptüberschrift ist ein `<h1>`-Element.

d) Aus einer oder mehreren CSS-Dateien. Der Browser zeigt neben jeder Regel, aus welcher Datei und aus welcher Zeile sie stammt. Regeln, die von einer anderen Regel überschrieben wurden, sind durchgestrichen.

:::

## Was da eigentlich übertragen wird

Alle diese Dateien bestehen aus **Bytes** – Zahlen zwischen 0 und 255. Wie aus Bytes Buchstaben werden, legt die **Zeichencodierung** fest.

:::snippet{#definition}
Eine **Zeichencodierung** ordnet jedem Zeichen eine Zahl zu. Der Standard im Web heißt **UTF-8**. Er kann alle Zeichen aller Schriften darstellen – lateinische Buchstaben, Umlaute, kyrillische und chinesische Schrift, Emojis.

Ein Zeichen belegt in UTF-8 **unterschiedlich viele Bytes**:

| Zeichen | Bytes |
| --- | --- |
| `A`, `z`, `7`, Leerzeichen | 1 |
| `ä`, `ö`, `ü`, `ß`, `é` | 2 |
| `€`, `→` | 3 |
| 🙂 | 4 |
:::

:::snippet{#aufgabe}
a) Wie viele Bytes braucht der Text `Grüße!` in UTF-8? Rechne nach.

b) Wie viele Bytes bräuchte derselbe Text, wenn jedes Zeichen genau ein Byte belegte?

c) Eine Textdatei mit 1000 Zeichen ist 1240 Bytes groß. Was lässt sich daraus über ihren Inhalt sagen?
:::

:::protect{password="web-1-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `G`, `r` = je 1 Byte, `ü` = 2 Bytes, `ß` = 2 Bytes, `e` = 1 Byte, `!` = 1 Byte. Zusammen **8 Bytes** für 6 Zeichen.

b) 6 Bytes.

c) Die Datei enthält Zeichen, die mehr als ein Byte brauchen – vermutlich Umlaute oder ähnliche Sonderzeichen. Genauer: Es gibt mindestens 240 Bytes „Überhang". Wären alle Sonderzeichen zweibytig, wären es 240 davon.

**Merke:** Die Zahl der Zeichen und die Größe einer Datei sind nicht dasselbe.

:::

## Wenn die Codierung nicht stimmt

:::snippet{#beispiel}
Vielleicht hast du so etwas schon gesehen:

> GrÃ¼ÃŸe aus MÃ¼nchen

Das ist kein Tippfehler. Der Text wurde in UTF-8 gespeichert, aber vom Browser als eine **andere** Codierung gelesen – eine, in der jedes Byte einem Zeichen entspricht. Die zwei Bytes des `ü` werden dabei zu zwei einzelnen Zeichen: `Ã` und `¼`.

Der Text ist dabei **nicht kaputt**. Nur die Vorschrift zum Lesen war die falsche. Mit der richtigen Codierung erscheint er wieder korrekt.
:::

:::snippet{#merken}
Damit das nicht passiert, sagt jede HTML-Datei gleich am Anfang, wie sie gelesen werden will:

```html
<meta charset="UTF-8">
```

Diese Zeile gehört in **jede** HTML-Datei, die du schreibst – und zwar möglichst weit oben, denn der Browser muss sie lesen, bevor er auf das erste Sonderzeichen trifft.
:::

:::snippet{#brain}
Nicht nur Text wird codiert. Auch ein Bild ist am Ende eine Folge von Zahlen – und wie diese Zahlen zu deuten sind, legt das **Dateiformat** fest.

| Format | Gut geeignet für | Besonderheit |
| --- | --- | --- |
| **JPEG** | Fotos | verlustbehaftet: spart viel Platz, verliert dabei Details |
| **PNG** | Grafiken, Screenshots, Logos | verlustfrei, kann durchsichtig sein |
| **SVG** | Symbole, Diagramme, Logos | keine Bildpunkte, sondern eine Beschreibung aus Linien und Flächen – beliebig vergrößerbar |
| **WebP**, **AVIF** | beides | neuere Formate, deutlich kleiner bei gleicher Qualität |

Überlege: Warum ist ein Foto als PNG oft zehnmal so groß wie als JPEG – und warum sollte man ein Logo trotzdem nie als JPEG speichern?
:::

<!--
UV 10.2, Inhaltsfeld Information und Daten: Information, Daten und ihre
Codierung. Konkretisierte Kompetenzerwartung: untersuchen Webseiten auf
Informationen, Daten und ihre Codierung hin (A/DI). Inhaltsfeld
Informatiksysteme: Anwendung von Informatiksystemen (Entwicklerwerkzeuge).
-->

---

## Selbsttest

::::multievent

**1. Was passiert, wenn du im Elemente-Reiter etwas an einer fremden Seite änderst?**

{r1{Die Änderung wird an den Server geschickt.}}

{r1{!Nur deine eigene Ansicht ändert sich, bis du neu lädst.}}

{r1{Die Seite ist danach für alle verändert.}}

{r1{Der Browser verweigert die Änderung.}}

{h{Woher hätte der Server die Erlaubnis, deine Änderung zu übernehmen?}}
{H{Richtig. Deshalb beweist ein Bildschirmfoto einer Webseite gar nichts.}}

**2. In welchem Reiter siehst du, wie groß die geladenen Dateien sind?**

{r2{Elemente}}

{r2{!Netzwerk}}

{r2{Konsole}}

{r2{Quelltext}}

{h{Dort steht jede einzelne Datei mit Name, Typ, Größe und Statuscode.}}
{H{Richtig.}}

**3. Wie viele Bytes belegt das Zeichen ü in UTF-8?**

{z{2}}

{h{Alles jenseits der einfachen lateinischen Buchstaben braucht mehr als ein Byte.}}
{H{Richtig. Deshalb sind Zeichenzahl und Dateigröße nicht dasselbe.}}

**4. Ein Text erscheint als GrÃ¼ÃŸe. Was ist passiert?**

{r3{Die Datei ist beschädigt.}}

{r3{!Die Datei wurde mit der falschen Zeichencodierung gelesen.}}

{r3{Der Server hat die Umlaute entfernt.}}

{r3{Der Text wurde verschlüsselt.}}

{h{Ist die Information verloren oder nur falsch gedeutet?}}
{H{Richtig. Mit der richtigen Codierung erscheint der Text wieder korrekt.}}

**5. Welche Zeile verhindert dieses Problem in einer HTML-Datei?**

{r4{das title-Element}}

{r4{!das meta-Element mit charset}}

{r4{die DOCTYPE-Zeile}}

{r4{das lang-Attribut}}

{h{Gemeint ist die Angabe der Zeichencodierung.}}
{H{Richtig, und sie muss möglichst weit oben stehen.}}

**6. Welche Aussagen über Bildformate stimmen?** (Mehrfachauswahl)

{c1{!JPEG eignet sich für Fotos und verliert dabei Details.}}

{c1{!PNG ist verlustfrei und kann durchsichtige Bereiche haben.}}

{c1{!SVG lässt sich beliebig vergrößern, ohne unscharf zu werden.}}

{c1{Alle Bildformate sind gleich groß, wenn das Bild gleich aussieht.}}

{h{Vergleiche einmal dasselbe Foto als JPEG und als PNG.}}
{H{Richtig. Das Format entscheidet mit über die Dateigröße.}}

::::
