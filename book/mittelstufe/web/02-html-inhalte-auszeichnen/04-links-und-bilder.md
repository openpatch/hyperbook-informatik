---
title: Links und Bilder
index: 4
---

# Links und Bilder

Links sind das, was aus einzelnen Seiten ein **Netz** macht. Bilder sind das, was die meisten Daten verbraucht. Beide haben ihre eigenen Fallstricke.

## Links

:::webide{id="web-2-4-links" height="350px"}

```html
<h1 id="oben">Über den Rhein</h1>

<p>Mehr steht in der
   <a href="https://de.wikipedia.org/wiki/Rhein">Wikipedia</a>.</p>

<p>Weiter zur <a href="quellen.html">Quellenseite</a>.</p>

<p>Und ein Bild liegt in <a href="bilder/karte.png">bilder/karte.png</a>.</p>

<p>Schreib mir: <a href="mailto:info@example.org">info@example.org</a></p>

<p>Nach oben: <a href="#oben">zum Seitenanfang</a></p>
```

:::

:::snippet{#definition}
Ein Link ist ein `<a>`-Element (*anchor*, Anker). Das `href`-Attribut sagt, wohin es geht.

| Form | Bedeutung | Beispiel |
| --- | --- | --- |
| **absolut** | vollständige Adresse mit Protokoll und Server | `https://de.wikipedia.org/wiki/Rhein` |
| **relativ** | vom Ordner der aktuellen Datei aus | `quellen.html`, `bilder/karte.png` |
| **wurzelrelativ** | vom obersten Ordner der Seite aus, beginnt mit `/` | `/impressum.html` |
| **Sprungziel** | eine Stelle **in** der aktuellen Seite, beginnt mit `#` | `#oben` |
| **andere Protokolle** | E-Mail, Telefon | `mailto:…`, `tel:…` |
:::

:::snippet{#merken}
Für Links **innerhalb deines eigenen Projekts** nimmst du relative Adressen. Nur so funktioniert deine Seite sowohl auf deinem Rechner als auch später auf dem Server.

Mit `..` gehst du einen Ordner nach oben: `../index.html`.
:::

:::snippet{#aufgabe}
Deine Dateien liegen so:

```
meine-seite/
├── index.html
├── impressum.html
├── seiten/
│   ├── hobbys.html
│   └── kontakt.html
└── bilder/
    └── ich.jpg
```

Schreibe die relativen Adressen auf:

a) von `index.html` zu `seiten/hobbys.html`

b) von `seiten/hobbys.html` zu `index.html`

c) von `seiten/hobbys.html` zu `seiten/kontakt.html`

d) von `seiten/kontakt.html` zum Bild `bilder/ich.jpg`
:::

:::protect{password="web-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `seiten/hobbys.html`

b) `../index.html`

c) `kontakt.html` – beide liegen im selben Ordner.

d) `../bilder/ich.jpg` – erst einen Ordner hoch, dann in `bilder` hinein.

:::

:::alert{warn}
**Ein Linktext muss auch allein verständlich sein.**

Vorleseprogramme können sich alle Links einer Seite als Liste ausgeben lassen. Eine Liste aus fünfmal *hier klicken* ist wertlos.

Statt „Mehr Informationen findest du [hier](#)" schreibe „Mehr Informationen stehen in der [Wikipedia](#)".
:::

## Bilder

:::webide{id="web-2-4-bilder" height="390px"}

```html
<h2>Ein Bild</h2>

<img src="/images/willkommen-banner.jpg"
     alt="Bunte Kabel auf einer Steckplatine"
     width="600" height="164">

<h2>Ein Bild mit Unterschrift</h2>

<figure>
  <img src="/images/scratch-fangspiel.png"
       alt="Bildschirmfoto eines Fangspiels mit fallenden Orangen"
       width="300" loading="lazy">
  <figcaption>Ein Fangspiel, entstanden im Unterricht.</figcaption>
</figure>
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

:::

:::snippet{#merken}
| Attribut | Wozu |
| --- | --- |
| `src` | Wo die Bilddatei liegt. **Pflicht.** |
| `alt` | Ein Text, der das Bild ersetzt. **Pflicht.** |
| `width`, `height` | Die Maße in Bildpunkten. Der Browser hält damit schon vor dem Laden Platz frei, sodass die Seite nicht springt. |
| `loading="lazy"` | Lädt das Bild erst, wenn man in seine Nähe scrollt. Sinnvoll für alles unterhalb des ersten Bildschirms. |

`<figure>` mit `<figcaption>` ist die richtige Wahl, wenn ein Bild eine sichtbare Unterschrift bekommen soll.
:::

## Der Alternativtext

:::snippet{#definition}
Der **Alternativtext** ist das, was an die Stelle des Bildes tritt, wenn es nicht zu sehen ist – weil es nicht geladen wurde, weil jemand blind ist oder weil eine Suchmaschine die Seite liest.

Er beschreibt **was auf dem Bild zu sehen ist**, und zwar so, dass jemand ohne das Bild dasselbe versteht.
:::

:::snippet{#aufgabe}
Beurteile diese vier Alternativtexte für ein Foto, das eine Schülerin beim Löten einer Platine zeigt:

a) `alt="Bild"`

b) `alt="IMG_20260314_112233.jpg"`

c) `alt="Eine Schülerin lötet ein Bauteil auf eine grüne Platine."`

d) `alt=""`

Welcher ist der beste? Und gibt es einen Fall, in dem d) richtig wäre?
:::

::::collapsible{title="Tipp"}

Stell dir vor, jemand lässt sich die Seite vorlesen. Was hilft dieser Person – und was ist nur Lärm?

::::

:::protect{password="web-2-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Nutzlos. „Bild" weiß man auch so.

b) Noch schlechter. Der Dateiname wird Zeichen für Zeichen vorgelesen und sagt gar nichts.

c) **Der beste.** Er beschreibt, was zu sehen ist, in einem Satz.

d) `alt=""` ist ein **leerer, aber vorhandener** Alternativtext. Er bedeutet: „Dieses Bild trägt keine Information, überspring es." Das ist richtig bei reiner Zierde – einer Trennlinie, einem Muster im Hintergrund.

**Wichtig:** `alt=""` ist etwas anderes als **gar kein** `alt`. Fehlt das Attribut ganz, weiß das Vorleseprogramm nicht, ob das Bild wichtig ist, und liest im Zweifel den Dateinamen vor. Schreibe also immer ein `alt` – notfalls ein leeres.

:::

:::snippet{#brain}
Sieh dir die :t[CSS]{#css}-Regel im Übungsbereich an:

```css
img { max-width: 100%; height: auto; }
```

Sie sorgt dafür, dass ein Bild nie breiter wird als der Platz, den es hat, und dabei sein Seitenverhältnis behält. Ohne sie ragt ein 2000 Pixel breites Foto auf dem Handy weit über den Bildschirmrand hinaus.

Diese zwei Zeilen gehören in praktisch jedes Projekt. Warum sie funktionieren, verstehst du nach [Kapitel 4](../04-css-gestalten/04-das-boxmodell).
:::

## Aufgabe

:::snippet{#aufgabe}
Baue eine kleine Seite über deinen Lieblingsort:

- eine Überschrift
- ein Absatz mit einem Link auf eine Seite, die mehr darüber erzählt – mit **sprechendem** Linktext
- ein Bild mit gutem Alternativtext, in einer `<figure>` mit Unterschrift

Als Bild kannst du `/images/willkommen-banner.jpg` verwenden.
:::

:::webide{id="web-2-4-uebung" height="460px"}

```html


```

```css
img {
  max-width: 100%;
  height: auto;
}
```

:::

:::protect{password="web-2-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```html
<h1>Der Baldeneysee</h1>

<p>Der Baldeneysee liegt im Süden von Essen. Wie er entstanden ist, steht
   im <a href="https://de.wikipedia.org/wiki/Baldeneysee">Artikel der
   Wikipedia</a>.</p>

<figure>
  <img src="/images/willkommen-banner.jpg"
       alt="Bunte Kabel auf einer Steckplatine"
       width="600" height="164">
  <figcaption>Ein Bild vom See wäre hier passender – dieses ist nur ein Platzhalter.</figcaption>
</figure>
```

Beachte den Linktext: *Artikel der Wikipedia* sagt, wohin es geht. *Hier* hätte es nicht getan.

:::

<!--
UV 10.2, Inhaltsfeld Formale Sprachen: Erstellung von Quelltexten.
Konkretisierte Kompetenzerwartung: erstellen HTML-Quelltexte (MI).
Der Alternativtext bereitet zugleich Kapitel 5 vor (Barrierefreiheit als
Teil der Verantwortung beim Veröffentlichen).
-->

---

## Selbsttest

::::multievent

**1. Welche Adresse ist relativ?**

{r1{https://example.org/seite.html}}

{r1{!../bilder/ich.jpg}}

{r1{mailto:info@example.org}}

{r1{/impressum.html}}

{h{Relativ heißt: vom Ordner der aktuellen Datei aus gerechnet.}}
{H{Richtig. Zwei Punkte bedeuten einen Ordner nach oben.}}

**2. Wohin führt ein href, das mit einer Raute beginnt?**

{r2{auf eine andere Webseite}}

{r2{!zu einer Stelle innerhalb derselben Seite}}

{r2{zum Seitenanfang eines anderen Servers}}

{r2{an eine E-Mail-Adresse}}

{h{Der Teil nach der Raute wird nie an den Server geschickt.}}
{H{Richtig – gemeint ist das Element mit dieser id.}}

**3. Wozu dient das alt-Attribut?**

{r3{Es zeigt einen Text an, wenn man mit der Maus über das Bild fährt.}}

{r3{!Es ersetzt das Bild für alle, die es nicht sehen können.}}

{r3{Es gibt dem Bild einen Namen für CSS.}}

{r3{Es bestimmt die Größe.}}

{h{Denk an ein Vorleseprogramm oder an ein Bild, das nicht lädt.}}
{H{Richtig.}}

**4. Wann ist alt="" richtig?**

{r4{nie}}

{r4{immer, wenn man keine Zeit hat}}

{r4{!wenn das Bild reine Zierde ist und keine Information trägt}}

{r4{bei Fotos von Personen}}

{h{Ein leeres alt sagt: Überspring dieses Bild.}}
{H{Richtig – aber gar kein alt ist trotzdem falsch.}}

**5. Wozu gibt man width und height am img-Element an?**

{r5{Damit das Bild kleiner geladen wird.}}

{r5{!Damit der Browser schon vor dem Laden Platz freihält und die Seite nicht springt.}}

{r5{Weil das Attribut Pflicht ist.}}

{r5{Damit das Bild scharf bleibt.}}

{h{Was passiert, wenn beim Nachladen eines Bildes plötzlich Platz gebraucht wird?}}
{H{Richtig – ohne die Angaben verrutscht der Text unter dem Bild.}}

**6. Was ist an dem Linktext „hier klicken" schlecht?**

{r6{Er ist zu kurz.}}

{r6{!Aus einer Liste aller Links einer Seite lässt sich nichts erkennen.}}

{r6{Er funktioniert nicht auf dem Handy.}}

{r6{Suchmaschinen mögen keine Verben.}}

{h{Vorleseprogramme können alle Links einer Seite als Liste ausgeben.}}
{H{Richtig. Der Linktext soll sagen, wohin es geht.}}

::::
