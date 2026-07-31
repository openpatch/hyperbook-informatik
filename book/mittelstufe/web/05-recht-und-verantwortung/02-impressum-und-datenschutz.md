---
title: Impressum und Datenschutz
index: 2
---

# Impressum und Datenschutz

Eine Webseite ist keine Privatsache, sobald sie öffentlich erreichbar ist. Zwei Pflichten kommen dann ins Spiel.

## Das Impressum

:::snippet{#definition}
Ein **Impressum** sagt, **wer** für eine Seite verantwortlich ist. Der Zweck: Wer sich durch eine Veröffentlichung verletzt sieht, soll wissen, an wen er sich wenden kann.

Bei einer rein privaten Seite ohne geschäftlichen Zweck ist es in Deutschland nicht zwingend vorgeschrieben – die Grenze ist aber unscharf, und schon ein Werbebanner kann sie überschreiten.

Hinein gehören mindestens:

- Vor- und Nachname
- eine ladungsfähige Anschrift
- eine E-Mail-Adresse
:::

:::alert{warn}
**Für ein Schulprojekt gilt eine eigene Regel:** Veröffentlicht wird über die Schule, und verantwortlich ist die Schule.

Sprich mit deiner Lehrkraft, bevor du irgendetwas ins Netz stellst. Deine private Anschrift gehört **nicht** auf eine Schulseite.
:::

:::snippet{#aufgabe}
Beurteile, ob die Seiten ein Impressum brauchen. Begründe jeweils.

a) Eine Seite, die nur auf deinem eigenen Rechner liegt.

b) Eine Seite über deine Hobbys, öffentlich erreichbar, ohne Werbung.

c) Dieselbe Seite, aber mit einem Werbebanner.

d) Die Seite der Schülervertretung auf dem Schulserver.
:::

:::protect{password="web-5-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Nein.** Sie ist nicht veröffentlicht. Ohne Öffentlichkeit keine Pflicht.

b) **Wahrscheinlich nicht** – eine rein private Seite ohne geschäftlichen Zweck. Sicher ist das aber nicht, und ein Impressum schadet nie.

c) **Ja.** Mit Werbung verfolgt die Seite einen geschäftlichen Zweck.

d) **Ja**, aber es ist das Impressum der **Schule**. Die Schule ist der Anbieter der Seite. Als Schülerin trägst du dort nicht deine eigene Adresse ein.

:::

## Personenbezogene Daten

:::snippet{#definition}
**Personenbezogene Daten** sind Angaben, mit denen sich ein Mensch bestimmen lässt: Name, Anschrift, E-Mail-Adresse, Fotos, aber auch die **IP-Adresse** eines Geräts.

Für ihre Verarbeitung gilt die Datenschutz-Grundverordnung (DSGVO). Drei Grundsätze davon reichen für den Anfang:

| Grundsatz | Bedeutung |
| --- | --- |
| **Erlaubnisvorbehalt** | Verarbeiten ist grundsätzlich verboten – erlaubt nur mit Rechtsgrundlage oder Einwilligung. |
| **Datenminimierung** | Nur erheben, was für den Zweck wirklich nötig ist. |
| **Transparenz** | Betroffene müssen wissen, was mit ihren Daten geschieht. |
:::

:::snippet{#brain}
Die dritte Zeile überrascht die meisten: Eine **IP-Adresse** ist ein personenbezogenes Datum.

Der Grund: Der Anschlussinhaber lässt sich über den Anbieter zuordnen. Und jedes Mal, wenn dein Browser eine Datei von einem Server holt, erfährt dieser Server deine IP-Adresse – er muss sie kennen, sonst kann er nicht antworten.

Daraus folgt etwas Praktisches: **Jede Datei, die von einem fremden Server kommt, verrät diesem Server, wer deine Seite besucht.** Das gilt für ein eingebundenes Bild genauso wie für eine Schriftart oder eine Landkarte.
:::

## Der unsichtbare Datenabfluss

:::webide{id="web-5-2-fremd" height="300px"}

```html
<h1>Meine Seite</h1>

<!-- Bild vom eigenen Server: kein fremder Server erfährt etwas -->
<img src="/images/willkommen-banner.jpg" alt="Kabel auf einer Steckplatine"
     width="400">

<p>Ein normaler Absatz.</p>
```

```css
body {
  font-family: system-ui, sans-serif;
  padding: 1rem;
}
img { max-width: 100%; height: auto; }
```

:::

:::snippet{#aufgabe}
Beurteile, welche der folgenden Zeilen dazu führen, dass ein **fremder** Server die IP-Adresse deiner Besucher erfährt.

a) `<img src="bilder/ich.jpg" alt="…">`

b) `<img src="https://cdn.example.com/logo.png" alt="…">`

c) `<link rel="stylesheet" href="https://fonts.example.com/schrift.css">`

d) `<a href="https://de.wikipedia.org/wiki/Rhein">Wikipedia</a>`

e) `<iframe src="https://www.youtube.com/embed/abc123"></iframe>`
:::

::::collapsible{title="Tipp"}

Frage bei jeder Zeile: Holt der Browser dabei **von selbst** etwas von einem fremden Server – oder erst, wenn jemand klickt?

::::

:::protect{password="web-5-2-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Nein.** Das Bild liegt auf demselben Server wie die Seite.

b) **Ja.** Der Browser holt das Bild beim Aufbau der Seite automatisch von `cdn.example.com`. Dieser Server erfährt die IP-Adresse, den Zeitpunkt und über den *Referer* meist auch, von welcher Seite aus.

c) **Ja**, und zwar bei jedem Seitenaufruf. Eingebundene Schriften sind der häufigste Fall dieses Problems – und ein Gericht in München hat 2022 deshalb Schadenersatz zugesprochen.

d) **Nein.** Ein Link wird erst beim Anklicken verfolgt. Bis dahin passiert nichts.

e) **Ja**, und hier fließt am meisten: Ein eingebettetes Video lädt beim Seitenaufbau Skripte nach und kann Cookies setzen.

**Die Regel für dein Projekt:** Lade alles, was du brauchst, **auf deinen eigenen Server**. Bilder, Schriften, Symbole. Das ist datenschutzfreundlicher, schneller und funktioniert auch dann noch, wenn der fremde Server abgeschaltet wird.

:::

## Was auf eine Seite gehört – und was nicht

:::snippet{#merken}
Bevor du etwas veröffentlichst, geh diese Liste durch:

| Frage | Wenn nein … |
| --- | --- |
| Sind alle Bilder von mir oder ausdrücklich freigegeben? | Bild ersetzen |
| Ist jede abgebildete Person einverstanden? | Bild ersetzen oder Gesichter unkenntlich machen |
| Lade ich alles vom eigenen Server? | fremde Einbindungen ersetzen |
| Stehen dort personenbezogene Daten anderer? | löschen |
| Stehen dort personenbezogene Daten **von mir**, die ich in fünf Jahren noch dort haben will? | überdenken |
| Weiß meine Lehrkraft, was ich veröffentliche? | fragen |
:::

:::snippet{#aufgabe}
Eine Gruppe hat eine Klassenseite gebaut. Beurteile jeden Punkt und schlage eine bessere Lösung vor.

a) Auf der Startseite steht ein Klassenfoto mit allen Namen darunter.

b) Unter *Kontakt* stehen die Handynummern der drei Gruppenmitglieder.

c) Die Schriftart wird von einem großen Anbieter nachgeladen.

d) Das Hintergrundbild stammt aus der Bildersuche.

e) Ein Video ist per `iframe` von einer Videoplattform eingebettet.

f) Im Impressum steht: „Verantwortlich: Klasse 10b".
:::

:::protect{password="web-5-2-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Problematisch.** Foto und Namensliste zusammen sind besonders heikel, weil sie Gesicht und Name verknüpfen. Nötig wäre die Einwilligung aller Abgebildeten und ihrer Erziehungsberechtigten. *Besser:* ein Foto ohne erkennbare Gesichter, oder gar keines.

b) **Nicht in Ordnung.** Handynummern sind personenbezogene Daten und für den Zweck nicht erforderlich. *Besser:* eine gemeinsame Adresse der Schule oder ein Hinweis auf das Sekretariat.

c) **Vermeidbar.** Bei jedem Aufruf erfährt der Anbieter die IP-Adresse der Besucher. *Besser:* die Schriftdatei herunterladen und selbst ausliefern – oder `system-ui` nehmen, das ohnehin schon auf dem Gerät ist.

d) **Nicht in Ordnung.** Ohne geklärte Lizenz. *Besser:* ein selbst gemachtes Foto oder ein Bild von Wikimedia Commons mit Nennung.

e) **Problematisch.** Beim Seitenaufbau fließen Daten zur Plattform, oft mit Cookies. *Besser:* ein Vorschaubild, das erst auf Klick zum Video verlinkt. Dann fließt nichts, bevor jemand sich dafür entscheidet.

f) **Unzureichend.** Eine Klasse ist niemand, den man anschreiben kann. *Besser:* das Impressum der Schule, mit einer verantwortlichen Person.

**Der gemeinsame Nenner aller sechs Punkte:** Es geht nicht darum, was technisch geht, sondern darum, welche Folgen es für andere Menschen hat.

:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: erläutern rechtliche
Rahmenbedingungen für die Veröffentlichung von Inhalten (A). Inhaltsfeld
Information und Daten: Erfassung, Verarbeitung und Verwaltung von Daten.
Inhaltsfeld Informatik, Mensch und Gesellschaft: Informatiksysteme im Kontext
gesellschaftlicher und rechtlicher Normen.

Hinweis: keine Rechtsberatung. Die genannte Entscheidung ist LG München I,
Urteil vom 20.01.2022, Az. 3 O 17493/20 (Google Fonts).
-->

---

## Selbsttest

::::multievent

**1. Wozu dient ein Impressum?**

{r1{zur Werbung}}

{r1{!damit erkennbar ist, wer für die Seite verantwortlich ist}}

{r1{zur Angabe der verwendeten Technik}}

{r1{um Suchmaschinen zu helfen}}

{h{Wer sich verletzt sieht, soll wissen, an wen er sich wenden kann.}}
{H{Richtig.}}

**2. Ist eine IP-Adresse ein personenbezogenes Datum?**

{r2{nein, sie gehört zum Gerät}}

{r2{!ja, weil sich der Anschluss darüber zuordnen lässt}}

{r2{nur bei festen IP-Adressen}}

{r2{nur in Verbindung mit einem Namen}}

{h{Über den Anbieter lässt sich der Anschlussinhaber ermitteln.}}
{H{Richtig – und jeder Server, von dem du etwas lädst, erfährt sie.}}

**3. Welche Einbindungen führen dazu, dass ein fremder Server die IP-Adresse deiner Besucher erfährt?** (Mehrfachauswahl)

{c1{!ein Bild von einer fremden Adresse}}

{c1{!eine Schriftart von einem fremden Anbieter}}

{c1{!ein eingebettetes Video}}

{c1{ein Link auf eine fremde Seite}}

{h{Ein Link wird erst beim Anklicken verfolgt.}}
{H{Richtig. Alles andere lädt der Browser beim Seitenaufbau von selbst.}}

**4. Was besagt der Grundsatz der Datenminimierung?**

{r3{Daten sollen komprimiert werden.}}

{r3{!Es soll nur erhoben werden, was für den Zweck wirklich nötig ist.}}

{r3{Daten sollen nach einem Jahr gelöscht werden.}}

{r3{Es sollen möglichst wenige Menschen Zugriff haben.}}

{h{Es geht um die Menge der erhobenen Daten, nicht um Speicherplatz.}}
{H{Richtig – und was man nicht hat, kann auch niemand missbrauchen.}}

**5. Ein Video soll auf die Seite. Was ist die datenschutzfreundlichste Lösung?**

{r4{das Video direkt per iframe einbetten}}

{r4{!ein Vorschaubild zeigen, das erst auf Klick zum Video führt}}

{r4{das Video in einem neuen Tab öffnen lassen}}

{r4{einen Hinweistext schreiben}}

{h{Wann soll frühestens etwas zur Plattform fließen?}}
{H{Richtig. Erst wenn jemand sich dafür entscheidet.}}

**6. Was gehört im Schulprojekt ins Impressum?**

{r5{deine private Anschrift}}

{r5{!die Angaben der Schule als verantwortlicher Anbieterin}}

{r5{nur der Klassenname}}

{r5{gar nichts}}

{h{Wer ist der Anbieter der Seite?}}
{H{Richtig – und sprich vorher mit deiner Lehrkraft.}}

::::
