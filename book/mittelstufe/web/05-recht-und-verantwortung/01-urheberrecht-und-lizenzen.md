---
title: Urheberrecht und Lizenzen
index: 1
---

# Urheberrecht und Lizenzen

Ein Bild aus der Bildersuche in die eigene Seite zu kopieren dauert zehn Sekunden. Es kann trotzdem eine schlechte Idee sein.

## Wem gehört ein Werk?

:::snippet{#definition}
Das **:t[Urheberrecht]{#urheberrecht}** entsteht **automatisch** in dem Moment, in dem jemand etwas Eigenes schafft – ein Foto, einen Text, eine Zeichnung, ein Musikstück. Man muss es nicht anmelden und auch kein © darunterschreiben.

Wer ein Werk nutzen will, braucht die **Erlaubnis** der Urheberin oder des Urhebers. Diese Erlaubnis heißt **Lizenz**.

Kein Vermerk bedeutet also nicht „frei", sondern das Gegenteil: **Ohne Angabe gilt der volle Schutz.**
:::

:::snippet{#aufgabe}
Beurteile jede dieser Aussagen. Richtig oder falsch – und warum?

a) „Das Bild stand ohne Hinweis im Netz, also darf ich es nehmen."

b) „Ich habe die Quelle angegeben, also ist es erlaubt."

c) „Ich verdiene nichts damit, also ist es erlaubt."

d) „Ich habe das Bild verändert, also ist es jetzt meins."

e) „Ich habe nicht kopiert, sondern nur das Bild von der fremden Seite eingebunden."
:::

::::collapsible{title="Tipp"}

Frage bei jeder Aussage: Hat die Urheberin dem zugestimmt?

::::

:::protect{password="web-5-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Falsch.** Das Urheberrecht entsteht automatisch. Ein fehlender Hinweis ist kein Verzicht.

b) **Falsch.** Eine Quellenangabe ersetzt keine Erlaubnis. Sie ist bei vielen Lizenzen zusätzlich **verlangt** – aber sie schafft die Erlaubnis nicht.

c) **Falsch.** Ob jemand Geld verdient, ändert an der Erlaubnis nichts. Manche Lizenzen erlauben ausdrücklich nur die nichtkommerzielle Nutzung – aber das ist eine Einschränkung, keine allgemeine Regel.

d) **Falsch.** Eine Bearbeitung ist selbst wieder eine Nutzung und braucht ebenfalls eine Erlaubnis. Erst wenn etwas so weit verändert ist, dass das Ursprungswerk darin verblasst, entsteht ein eigenes Werk – und das ist eine hohe Hürde.

e) **Kommt darauf an, aber Vorsicht.** Beim Einbinden über die fremde Adresse liegt die Datei zwar nicht bei dir. Rechtlich ist die Lage aber verwickelt, und praktisch handelst du dir zwei Probleme ein: Das Bild kann jederzeit verschwinden oder gegen ein anderes ausgetauscht werden, und die fremde Seite erfährt die IP-Adresse jedes deiner Besucher. Dazu mehr in [der nächsten Lektion](./02-impressum-und-datenschutz).

**Die einfache Regel:** Nimm nur, was du selbst gemacht hast oder was ausdrücklich zur Nutzung freigegeben ist.

:::

## Creative-Commons-Lizenzen

:::snippet{#definition}
**Creative Commons** ist ein Baukasten aus vorgefertigten Lizenzen. Wer sein Werk damit versieht, erlaubt anderen die Nutzung unter bestimmten Bedingungen.

| Kürzel | Bedeutung |
| --- | --- |
| **BY** | Namensnennung – du musst die Urheberin nennen |
| **SA** | Weitergabe unter gleichen Bedingungen – dein Ergebnis muss dieselbe Lizenz bekommen |
| **NC** | keine kommerzielle Nutzung |
| **ND** | keine Bearbeitung |
| **CC0** | alle Rechte freigegeben, keine Bedingungen |

Die Kürzel werden kombiniert: **CC BY-SA** heißt „Namensnennung, Weitergabe unter gleichen Bedingungen".
:::

:::snippet{#aufgabe}
Du baust eine Seite über deine Stadt und findest vier Bilder. Darfst du sie verwenden? Was musst du jeweils tun?

a) Ein Foto unter **CC BY** von *Jonas Brenner*.

b) Ein Foto unter **CC BY-NC**. Deine Seite ist eine private Schulseite ohne Werbung.

c) Ein Foto unter **CC BY-ND**. Du möchtest es zuschneiden.

d) Ein Foto ohne jede Angabe auf einer beliebigen Webseite.
:::

:::protect{password="web-5-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Ja.** Du musst *Jonas Brenner* als Urheber nennen, dazu die Lizenz und möglichst einen Link zum Original.

b) **Ja**, solange die Seite wirklich nichtkommerziell bleibt. Sobald Werbung darauf erscheint oder du etwas verkaufst, ist es nicht mehr erlaubt. Und Namensnennung ist wegen des BY trotzdem Pflicht.

c) **Nein**, jedenfalls nicht zugeschnitten. `ND` verbietet Bearbeitungen. Unverändert und mit Namensnennung darfst du es verwenden.

d) **Nein.** Ohne Angabe gilt der volle Schutz.

**So sieht eine ordentliche Angabe aus:**

```html
<figure>
  <img src="rathaus.jpg" alt="Das Rathaus mit Vorplatz im Sommer">
  <figcaption>
    Foto: <a href="https://example.org/profil">Jonas Brenner</a>,
    <a href="https://creativecommons.org/licenses/by/4.0/deed.de">CC BY 4.0</a>
  </figcaption>
</figure>
```

:::

## Wo man Bilder findet, die man nehmen darf

:::snippet{#merken}
| Quelle | Was dort liegt |
| --- | --- |
| **Wikimedia Commons** | Millionen Bilder, überwiegend unter CC-Lizenzen; die Lizenz steht bei jedem Bild |
| **openclipart**, **unDraw** | freie Grafiken und Illustrationen |
| **Suchmaschinen mit Lizenzfilter** | in der Bildersuche lässt sich nach Nutzungsrechten filtern |
| **Selbst gemacht** | die einzige Quelle ohne jede Bedingung |

Prüfe die Lizenz **immer auf der Originalseite**, nicht in der Trefferliste. Und notiere dir Urheber, Lizenz und Link **sofort** – hinterher findet man sie nicht wieder.
:::

## Und Bilder von Menschen?

:::snippet{#definition}
Auch wenn du ein Foto selbst gemacht hast, darfst du es nicht immer veröffentlichen. Wer darauf zu erkennen ist, hat ein **Recht am eigenen Bild**: Für die Veröffentlichung braucht es die Einwilligung der abgebildeten Person – bei Minderjährigen zusätzlich die der Erziehungsberechtigten.

Das gilt auch für ein Klassenfoto, ein Bild vom Schulfest und einen Schnappschuss aus der Pause.
:::

:::snippet{#brain}
Ein Foto von dir ist auf einer Webseite gelandet, und du möchtest es dort nicht haben. Du kannst verlangen, dass es entfernt wird.

Aber: Es kann in dieser Zeit heruntergeladen, weitergeschickt und von Suchmaschinen und Archiven gespeichert worden sein. Das Löschen an der Quelle erreicht diese Kopien nicht.

Genau das meint der Satz „das Internet vergisst nicht". Er ist kein Naturgesetz, sondern eine Folge davon, wie Kopien entstehen. Und er ist der Grund, warum die Frage **vor** dem Hochladen gestellt werden muss.
:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartung: erläutern rechtliche
Rahmenbedingungen für die Veröffentlichung von Inhalten (A). Inhaltsfeld
Informatik, Mensch und Gesellschaft: Informatiksysteme im Kontext
gesellschaftlicher und rechtlicher Normen.

Hinweis: keine Rechtsberatung. Ziel ist die Fähigkeit, die richtigen Fragen zu
stellen und Fallbeispiele zu beurteilen.
-->

---

## Selbsttest

::::multievent

**1. Wann entsteht das Urheberrecht an einem Foto?**

{r1{wenn man es anmeldet}}

{r1{!automatisch beim Aufnehmen}}

{r1{wenn man ein Copyright-Zeichen daruntersetzt}}

{r1{wenn man es veröffentlicht}}

{h{Man muss dafür nichts tun.}}
{H{Richtig. Ein fehlender Hinweis bedeutet deshalb nicht „frei".}}

**2. Reicht eine Quellenangabe als Erlaubnis?**

{r2{ja, immer}}

{r2{!nein, sie ersetzt keine Lizenz}}

{r2{ja, wenn man kein Geld verdient}}

{r2{ja, wenn man das Bild verändert hat}}

{h{Die Quellenangabe sagt, woher etwas stammt – nicht, dass man es nehmen darf.}}
{H{Richtig. Bei vielen Lizenzen ist sie zusätzlich verlangt.}}

**3. Was bedeutet das Kürzel ND in einer CC-Lizenz?**

{r3{keine kommerzielle Nutzung}}

{r3{Namensnennung}}

{r3{!keine Bearbeitung}}

{r3{keine Weitergabe}}

{h{Es steht für „no derivatives".}}
{H{Richtig – zuschneiden oder einfärben ist damit ausgeschlossen.}}

**4. Was verlangt CC BY-SA?** (Mehrfachauswahl)

{c1{!die Urheberin zu nennen}}

{c1{!das Ergebnis unter dieselbe Lizenz zu stellen}}

{c1{auf jede Bearbeitung zu verzichten}}

{c1{kein Geld damit zu verdienen}}

{h{Die beiden Kürzel BY und SA stehen für je eine Bedingung.}}
{H{Richtig. NC und ND stehen nicht dabei.}}

**5. Du hast ein Foto vom Schulfest selbst gemacht. Darfst du es auf deine Seite stellen?**

{r4{ja, du bist der Urheber}}

{r4{!nur mit Einwilligung der abgebildeten Personen}}

{r4{ja, wenn du niemanden namentlich nennst}}

{r4{ja, wenn die Seite nicht öffentlich ist}}

{h{Es geht um das Recht am eigenen Bild.}}
{H{Richtig – bei Minderjährigen zusätzlich die der Erziehungsberechtigten.}}

**6. Warum hilft ein späteres Löschen oft wenig?**

{r5{Weil Löschen technisch unmöglich ist.}}

{r5{!Weil in der Zwischenzeit Kopien entstanden sein können, die das Löschen nicht erreicht.}}

{r5{Weil das Gesetz Löschen verbietet.}}

{r5{Weil Suchmaschinen sich weigern.}}

{h{Was passiert mit einer Datei, sobald sie öffentlich abrufbar ist?}}
{H{Richtig. Deshalb gehört die Frage vor das Hochladen.}}

::::
