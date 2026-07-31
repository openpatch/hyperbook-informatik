---
title: Fehler finden und beurteilen
index: 2
---

# Fehler finden und beurteilen

Bei Java oder Python meldet sich der Übersetzer, wenn etwas nicht stimmt. **:t[HTML]{#html} kennt keine Fehlermeldung.** Der Browser nimmt, was er kriegt, rät den Rest und zeigt irgendetwas an.

Das ist bequem und gefährlich zugleich: Ein Fehler fällt nicht auf, wenn du danach suchst – sondern erst, wenn jemand anderes die Seite ganz anders sieht als du.

## Der Browser repariert

:::webide{id="web-3-2-repariert" height="300px"}

```html
<!-- Dieser Quelltext ist absichtlich fehlerhaft. -->
<p>Erster Absatz
<p>Zweiter Absatz</p>
<div><span>Text</div></span>
```

```css
* { outline: 1px solid hsl(0 60% 60%); }
```

:::

:::snippet{#aufgabe}
a) Zähle im Quelltext nach: Wie viele Fehler stecken darin?

b) Öffne die Entwicklerwerkzeuge und sieh im Reiter *Elemente* nach, was der Browser daraus gemacht hat. Schreibe den reparierten Quelltext ab.

c) Warum ist es trotzdem ein Problem, sich auf diese Reparatur zu verlassen?
:::

::::collapsible{title="Tipp 1"}

Achte auf Endtags, die fehlen, und auf Endtags, die in der falschen Reihenfolge stehen.

::::

::::collapsible{title="Tipp 2 zu b)"}

Im Elemente-Reiter siehst du **nicht** deinen Quelltext, sondern den Baum, den der Browser daraus gebaut hat. Genau darin liegt der Unterschied.

::::

:::protect{password="web-3-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Zwei:

1. Der erste `<p>` wird nicht geschlossen.
2. `<div>` und `<span>` überlappen sich – die Endtags stehen in der falschen Reihenfolge.

b) Der Browser macht daraus:

```html
<p>Erster Absatz</p>
<p>Zweiter Absatz</p>
<div><span>Text</span></div>
```

Er schließt den ersten Absatz selbst, weil ein `<p>` nicht in einem `<p>` stehen darf, und er sortiert die Endtags um.

c) Aus drei Gründen:

- **Die Reparatur ist nicht überall gleich.** Sie ist zwar seit Jahren standardisiert, aber ältere Browser, Vorleseprogramme und Werkzeuge, die HTML weiterverarbeiten, machen es teils anders.
- **Was der Browser rät, ist nicht immer, was du meinst.** Bei den Absätzen hat er richtig geraten. Bei einer fehlenden `</ul>` mitten in einer verschachtelten Liste hängen Einträge plötzlich an einer anderen Stelle.
- **Du siehst den Fehler nicht.** Und weil du ihn nicht siehst, findest du ihn auch nicht, wenn du später eine Zeile hinzufügst und plötzlich die halbe Seite verrutscht.
:::

## Eindeutig oder mehrdeutig?

:::snippet{#brain}
Aus der Programmierung kennst du die Forderung, dass eine Handlungsvorschrift **eindeutig** sein muss: Bei jedem Schritt muss klar sein, was als Nächstes zu tun ist.

Bei HTML gilt dasselbe – für den Quelltext als Beschreibung eines Baums. `<div><span>Text</div></span>` beschreibt **keinen** eindeutigen Baum: Steht das `span` im `div` oder das `div` im `span`? Beides ist ablesbar, und beides kann nicht stimmen.

Der Browser entscheidet sich für eine Deutung, weil er muss. Aber die Vorschrift war mehrdeutig – und damit fehlerhaft, auch wenn am Ende etwas Vernünftiges auf dem Bildschirm steht.
:::

## Wo dann der Fehler auffällt

:::webide{id="web-3-2-liste" height="310px"}

```html
<!-- Dieser Quelltext ist absichtlich fehlerhaft. -->
<h2>Einkaufsliste</h2>
<ul>
  <li>Mehl</li>
  <li>Eier
    <ul>
      <li>möglichst frisch</li>
  </li>
  <li>Milch</li>
</ul>
```

:::

:::snippet{#aufgabe}
a) Sag **vor** dem Ansehen voraus, wie die Liste aussehen sollte, wenn sie richtig wäre.

b) Sieh dir die Vorschau an. Wo steht *Milch*?

c) Finde den Fehler und behebe ihn.
:::

::::collapsible{title="Tipp"}

Zähle die `<ul>` und die `</ul>`. Und zähle sie noch einmal.

::::

:::protect{password="web-3-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Drei Einträge auf der ersten Ebene – Mehl, Eier, Milch – und unter *Eier* ein eingerückter Eintrag *möglichst frisch*.

b) *Milch* steht **eingerückt**, auf derselben Ebene wie *möglichst frisch*. Es sieht so aus, als wäre Milch eine Eigenschaft der Eier.

c) Die innere Liste wird nie geschlossen. Richtig ist:

```html
<h2>Einkaufsliste</h2>
<ul>
  <li>Mehl</li>
  <li>Eier
    <ul>
      <li>möglichst frisch</li>
    </ul>
  </li>
  <li>Milch</li>
</ul>
```

**Das ist der typische Fall:** keine Fehlermeldung, aber eine falsche Aussage. Wer die Liste nur überfliegt, hält Milch für eine Anmerkung zu den Eiern.

Deshalb ist die Vorschau deine Fehlermeldung – und deshalb lohnt es sich, vorher vorherzusagen, wie sie aussehen soll.

:::

## Werkzeuge, die doch meckern

:::snippet{#merken}
Es gibt Programme, die HTML **prüfen**, statt es zu reparieren. Der bekannteste ist der **Validator** des W3C unter <https://validator.w3.org>. Man gibt eine Adresse ein oder lädt eine Datei hoch und bekommt eine Liste aller Verstöße mit Zeilennummer.

Er findet:

- fehlende und falsch geschachtelte Endtags
- Attribute, die es nicht gibt oder die an diesem Element nichts zu suchen haben
- ein `img` ohne `alt`
- doppelt vergebene `id`-Attribute

Er findet **nicht**, ob deine Auszeichnung sinnvoll ist. Eine Seite aus lauter `<div>` ist gültiges HTML.
:::

## Quelltexte beurteilen

:::snippet{#aufgabe}
Drei Gruppen haben denselben Inhalt ausgezeichnet. Alle drei sind gültiges HTML und sehen im Browser fast gleich aus.

Beurteile jede Fassung. Nenne jeweils mindestens einen konkreten Nachteil oder Vorteil.

**Fassung A**

```html
<div class="gross">Schulgarten</div>
<div>Wir treffen uns dienstags.</div>
<div class="fett">Alle dürfen mitmachen!</div>
```

**Fassung B**

```html
<h1>Schulgarten</h1>
<p>Wir treffen uns dienstags.</p>
<p><b>Alle dürfen mitmachen!</b></p>
```

**Fassung C**

```html
<article>
  <h1>Schulgarten</h1>
  <p>Wir treffen uns <time datetime="2026-03-17">dienstags</time>.</p>
  <p><strong>Alle dürfen mitmachen!</strong></p>
</article>
```
:::

::::collapsible{title="Tipp"}

Prüfe jede Fassung an drei Fragen:

1. Erkennt ein Vorleseprogramm die Überschrift?
2. Erkennt eine Suchmaschine, worum es geht?
3. Wenn du die Schriftgröße der Überschrift ändern willst – wo musst du hin?

::::

:::protect{password="web-3-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**Fassung A – schlecht.** Alles ist ein `<div>`. Für jedes Programm, das die Seite nicht sieht, gibt es hier keine Überschrift, sondern drei gleichrangige Kisten.

Zusätzlich verraten die Klassennamen: `gross` und `fett` beschreiben das **Aussehen**. Wenn die Überschrift später klein sein soll, heißt die Klasse `gross` und ist klein – oder man benennt sie überall um.

**Fassung B – brauchbar.** Überschrift und Absätze sind richtig ausgezeichnet. Ein Vorleseprogramm findet die Überschrift, eine Suchmaschine auch.

Schwächen: `<b>` sagt nur „fett", nicht „wichtig". Und die drei Teile sind nicht als zusammengehörig erkennbar.

**Fassung C – am besten.** Die drei Teile bilden einen zusammenhängenden Beitrag. `<strong>` sagt, dass die Aussage wichtig ist, nicht wie sie aussieht. Und `<time datetime="…">` macht die Zeitangabe zusätzlich maschinenlesbar – ein Kalenderprogramm könnte damit etwas anfangen.

**Die Prüffrage, die immer funktioniert:** Wenn ich das :t[CSS]{#css} wegnehme – bleibt die Seite verständlich? Bei A wird aus einer Seite ein Textblock ohne Gliederung. Bei C bleibt eine gegliederte, lesbare Seite.

:::

:::snippet{#merken}
**So beurteilst du einen HTML-Quelltext:**

| Frage | Woran man es sieht |
| --- | --- |
| Ist er **wohlgeformt**? | Alle Tags geschlossen, sauber geschachtelt |
| Ist er **gültig**? | Der Validator meckert nicht |
| Ist er **sinnvoll ausgezeichnet**? | Es stehen semantische Elemente da, wo es welche gibt |
| Ist er **zugänglich**? | `alt` bei Bildern, sprechende Linktexte, `lang`, richtige Überschriftenstufen |
| Ist er **wartbar**? | Klassennamen beschreiben die Bedeutung, nicht das Aussehen; sinnvoll eingerückt |

Die ersten beiden sind hart – da gibt es richtig und falsch. Die letzten drei sind Beurteilungen, die man begründen muss.
:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: analysieren HTML-Quelltexte (A/DI).
Übergeordnet A: überprüfen Handlungsvorschriften auf Eindeutigkeit - hier
übertragen auf die Frage, ob ein Quelltext einen eindeutigen Baum beschreibt.
Übergeordnet MI: analysieren und testen.
-->

---

## Selbsttest

::::multievent

**1. Was macht ein Browser mit fehlerhaftem HTML?**

{r1{Er zeigt eine Fehlermeldung.}}

{r1{Er zeigt eine leere Seite.}}

{r1{!Er repariert still und zeigt irgendetwas an.}}

{r1{Er bricht das Laden ab.}}

{h{Anders als ein Übersetzer für Java meldet er sich nie.}}
{H{Richtig – deshalb ist die Vorschau deine einzige Rückmeldung.}}

**2. Warum ist die stille Reparatur ein Problem?** (Mehrfachauswahl)

{c1{!Der Browser rät, und er rät nicht immer richtig.}}

{c1{!Andere Programme reparieren womöglich anders.}}

{c1{!Man bemerkt den Fehler nicht und findet ihn später schwer.}}

{c1{Die Seite lädt dadurch langsamer.}}

{h{An der Ladezeit ändert die Reparatur praktisch nichts.}}
{H{Richtig.}}

**3. Wo findest du den Baum, den der Browser tatsächlich gebaut hat?**

{r2{im Seitenquelltext}}

{r2{!im Reiter Elemente der Entwicklerwerkzeuge}}

{r2{im Reiter Netzwerk}}

{r2{in der Adresszeile}}

{h{Der Seitenquelltext zeigt die Datei, wie der Server sie geschickt hat.}}
{H{Richtig – und der Unterschied zwischen beiden verrät die Reparatur.}}

**4. Was findet der Validator des W3C nicht?**

{r3{fehlende Endtags}}

{r3{ein img ohne alt}}

{r3{doppelte id-Attribute}}

{r3{!ob die Auszeichnung inhaltlich sinnvoll ist}}

{h{Eine Seite aus lauter div ist gültiges HTML.}}
{H{Richtig. Gültig und gut sind zwei verschiedene Dinge.}}

**5. Was ist an dem Klassennamen „gross" problematisch?**

{r4{Klassennamen dürfen keine Umlaute enthalten.}}

{r4{!Er beschreibt das Aussehen; wenn sich das ändert, passt der Name nicht mehr.}}

{r4{Er ist zu kurz.}}

{r4{Er funktioniert nur mit div.}}

{h{Was, wenn die Überschrift später klein sein soll?}}
{H{Richtig. Klassennamen sollen die Bedeutung beschreiben.}}

**6. Welche Prüffrage verrät am schnellsten, ob eine Seite gut ausgezeichnet ist?**

{r5{Lädt sie schnell?}}

{r5{!Bleibt sie ohne CSS verständlich?}}

{r5{Hat sie viele Elemente?}}

{r5{Funktioniert sie in allen Browsern?}}

{h{Nimm gedanklich die gesamte Gestaltung weg. Was bleibt übrig?}}
{H{Richtig. Bleibt eine gegliederte, lesbare Seite, stimmt die Auszeichnung.}}

::::
