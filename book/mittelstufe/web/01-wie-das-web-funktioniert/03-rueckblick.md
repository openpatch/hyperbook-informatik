---
title: Rückblick
index: 3
---

# Rückblick

Dieses Kapitel hat kein neues Werkzeug gebracht, sondern eine Vorstellung davon, was beim Aufruf einer Seite passiert. Prüfe zum Abschluss, ob diese Vorstellung trägt.

## Das kann ich jetzt

Geh die Liste ehrlich durch. Hinter jedem Punkt steht die Lektion, in der er erklärt wird – wenn du zögerst, lies dort noch einmal nach.

- [ ] Ich kann erklären, was **Client** und **Server** beim Aufruf einer Seite jeweils tun. ([1.1](./01-vom-klick-zur-seite))
- [ ] Ich kann sagen, wozu das **DNS** gebraucht wird und warum die erste Anfrage dorthin geht. ([1.1](./01-vom-klick-zur-seite))
- [ ] Ich kann begründen, warum aus **einem** Seitenaufruf **viele** Anfragen werden. ([1.1](./01-vom-klick-zur-seite))
- [ ] Ich kann eine :t[URL]{#url} in ihre Bestandteile zerlegen und sagen, welcher Teil nicht an den Server geht. ([1.1](./01-vom-klick-zur-seite))
- [ ] Ich kann die Statuscodes 200, 301, 403, 404 und 500 deuten. ([1.1](./01-vom-klick-zur-seite))
- [ ] Ich kann mit den **Entwicklerwerkzeugen** nachsehen, welche Dateien eine Seite lädt und wie groß sie sind. ([1.2](./02-eine-webseite-untersuchen))
- [ ] Ich kann erklären, was eine **Zeichencodierung** ist und warum `ü` mehr Platz braucht als `u`. ([1.2](./02-eine-webseite-untersuchen))
- [ ] Ich weiß, welche Zeile in einer HTML-Datei die Codierung festlegt. ([1.2](./02-eine-webseite-untersuchen))

## Gemischte Aufgaben

Anders als die Aufgaben in den Lektionen greifen diese hier auf **beides** zurück. Genau das wird in einer Klassenarbeit verlangt.

:::snippet{#aufgabe}
**Aufgabe 1: Ein Ladevorgang unter der Lupe**

Eine Besucherin ruft `https://verein-essen.de/team.html` auf. Der Netzwerk-Reiter zeichnet auf:

| # | Adresse | Typ | Code | Größe |
| --- | --- | --- | --- | --- |
| 1 | `/team.html` | document | 200 | 4,1 kB |
| 2 | `/stil.css` | stylesheet | 200 | 12,8 kB |
| 3 | `/logo.svg` | image | 200 | 3,2 kB |
| 4 | `/bilder/mannschaft.jpg` | image | 404 | – |
| 5 | `/schrift/inter.woff2` | font | 200 | 48,0 kB |

a) Die Besucherin hat **eine** Adresse eingetippt. Woher weiß der Browser von den Dateien 2 bis 5?

b) Was bekommt die Besucherin an der Stelle von Datei 4 zu sehen? Bricht die Seite deshalb ab?

c) Die eigentliche Seite ist 4,1 kB groß, die Schriftdatei 48 kB. Wieso ist das ein Problem für jemanden mit langsamer Verbindung – und was heißt das für eigene Seiten?

d) Datei 4 existiert auf dem Server, ist aber für Fremde gesperrt. Welcher Code stünde dann in Zeile 4?
:::

::::collapsible{title="Tipp zu a)"}

Sieh dir die Reihenfolge an. Datei 1 ist die HTML-Datei – und die kommt zuerst. Was steht darin?

::::

:::protect{password="web-1-3-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Aus Datei 1. Der Browser liest die HTML-Datei und findet darin die Verweise auf CSS-Datei, Bilder und Schrift. Erst dadurch erfährt er, dass es diese Dateien gibt, und fordert sie einzeln nach. Deshalb steht die HTML-Datei immer an erster Stelle.

b) Nichts oder einen Platzhalter mit dem Alternativtext. Die Seite bricht **nicht** ab – Text, Gestaltung und Logo sind ja da. Das ist die abgestufte Verschlechterung: Fehlt ein Teil, fällt nur dieser Teil aus.

c) Die Schrift ist mehr als zehnmal so groß wie der Inhalt, den sie darstellen soll. Über eine langsame Verbindung wartet die Besucherin also vor allem auf Zierrat. Für eigene Seiten heißt das: sparsam mit großen Dateien umgehen und im Netzwerk-Reiter nachsehen, was tatsächlich Zeit kostet.

d) **403** – verboten. Die Datei gibt es, aber der Zugriff ist nicht erlaubt. 404 hieße dagegen: gibt es nicht.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Merkwürdige Zeichen**

Auf einer fertigen Seite steht im Browser:

> GrÃ¼ÃŸe aus MÃ¼nchen

Die Datei auf dem Server ist in Ordnung; im Texteditor steht dort „Grüße aus München".

a) Woran liegt es? Erkläre mit den Begriffen *Byte* und *Codierung*.

b) Welche Zeile fehlt vermutlich in der HTML-Datei, und wo gehört sie hin?

c) Warum fällt dem Server dieser Fehler nie auf?

d) Der ursprüngliche Text „Grüße aus München" hat 17 Zeichen. Wie viele Bytes belegt er in UTF-8?
:::

:::protect{password="web-1-3-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Datei ist in UTF-8 gespeichert, wird vom Browser aber nach einer anderen Vorschrift gelesen – einer, in der **jedes Byte genau ein Zeichen** ergibt. Das `ü` besteht in UTF-8 aus zwei Bytes; werden diese einzeln gedeutet, erscheinen daraus zwei Zeichen (`Ã` und `¼`). Die Datei ist dabei nicht beschädigt, nur die Leseanweisung war falsch.

b) `<meta charset="UTF-8">`, und zwar möglichst weit oben im `<head>` – der Browser muss sie gelesen haben, bevor das erste Sonderzeichen kommt.

c) Weil der Server die Datei nur weiterreicht. Er schickt Bytes; was diese bedeuten, entscheidet allein der Browser. Ein Server „liest" die Seite nicht.

d) Drei der 17 Zeichen belegen zwei Bytes: `ü`, `ß` und noch einmal `ü`. Also 14 · 1 + 3 · 2 = **20 Bytes**.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Behauptungen prüfen**

Entscheide für jede Aussage, ob sie stimmt, und begründe in einem Satz.

a) „Wenn eine Seite im Browser erscheint, liegt sie als fertiges Bild auf dem Server."

b) „Ich habe in den Entwicklerwerkzeugen die Überschrift geändert – jetzt sieht das jeder so."

c) „`https` bedeutet, dass die Seite vertrauenswürdig ist."

d) „Eine Datei mit 1000 Zeichen ist immer 1000 Bytes groß."
:::

:::protect{password="web-1-3-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Falsch.** Der Server schickt Dateien – Text, Bilder, Schriften. Das Bild auf dem Bildschirm entsteht erst im Browser, der alles zusammensetzt. Deshalb kann dieselbe Seite auf zwei Geräten verschieden aussehen.

b) **Falsch.** Die Entwicklerwerkzeuge ändern nur die eigene Ansicht. Nichts davon geht zurück an den Server, beim Neuladen ist alles wie vorher. Deshalb beweist ein Bildschirmfoto aus den Entwicklerwerkzeugen gar nichts.

c) **Falsch.** `https` heißt nur, dass die Übertragung **verschlüsselt** ist – niemand dazwischen kann mitlesen. Über den Inhalt sagt das nichts; auch eine Betrugsseite kann https verwenden.

d) **Falsch.** Nur wenn ausschließlich Zeichen vorkommen, die in UTF-8 ein Byte belegen. Umlaute brauchen zwei, ein Emoji vier.

:::

<!--
Rückblick zu UV 10.2, Inhaltsfelder Informatiksysteme sowie Information und
Daten. Bündelt die konkretisierte Kompetenzerwartung "untersuchen Webseiten auf
Informationen, Daten und ihre Codierung hin (A/DI)" über beide Lektionen hinweg.
-->

---

## Selbsttest

::::multievent

**1. Ein Seitenaufruf löst 42 Anfragen aus. Woran liegt das?**

{r1{Der Browser fragt sicherheitshalber mehrfach nach.}}

{r1{!In der HTML-Datei stehen Verweise auf weitere Dateien, die einzeln geholt werden.}}

{r1{Der Server schickt jede Datei in mehreren Teilen.}}

{r1{Das DNS muss für jede Datei neu gefragt werden.}}

{h{Eine Seite besteht nicht aus einer einzigen Datei.}}
{H{Richtig. Erst die HTML-Datei verrät, was sonst noch gebraucht wird.}}

**2. Welche Reihenfolge stimmt?**

{S1{Browser fragt den DNS-Server nach der IP-Adresse}}

{S1{Browser fordert die HTML-Datei an}}

{S1{Browser liest die HTML-Datei und findet Verweise}}

{S1{Browser fordert CSS-Datei und Bilder nach}}

{S1{Browser setzt alles zusammen und zeigt die Seite}}

{h{Ohne Adresse keine Verbindung, ohne HTML-Datei kein Wissen über den Rest.}}
{H{Genau diese Reihenfolge steht im Ablaufdiagramm.}}

**3. Ein Server antwortet mit 403. Was bedeutet das?**

{r2{Die Datei gibt es nicht.}}

{r2{!Die Datei gibt es, der Zugriff ist aber nicht erlaubt.}}

{r2{Die Datei ist umgezogen.}}

{r2{Der Server hat einen Fehler.}}

{h{Die 4 sagt: Das Problem liegt bei der Anfrage, nicht beim Server.}}
{H{Richtig. 404 wäre "gibt es nicht", 403 ist "gibt es, darfst du aber nicht".}}

**4. Welche Teile hat die Adresse https://stadt.de/rat/termine?jahr=2026#mai — wähle alle vorkommenden aus.**

{c1{!Protokoll}}

{c1{!Servername}}

{c1{!Pfad}}

{c1{!Abfrage}}

{c1{!Sprungziel}}

{c1{Zeichencodierung}}

{c1{Statuscode}}

{h{Zähle nach: vor dem Doppelpunkt, vor dem ersten Schrägstrich, danach, nach dem Fragezeichen, nach der Raute. Zwei der Angebote stehen überhaupt nicht in einer Adresse.}}
{H{Richtig – diese Adresse hat tatsächlich alle fünf Bestandteile. Codierung und Statuscode stehen dagegen im Kopf der Antwort, nicht in der Adresse.}}

**5. Wie viele Bytes belegt das Wort Fußball in UTF-8?**

{z{8}}

{h{Sieben Zeichen, davon eines mit zwei Bytes.}}
{H{Richtig: sechs einbytige Zeichen plus das zweibytige ß.}}

**6. Auf einer Seite erscheint statt Übung die Zeichenfolge Ãbung. Was ist die Ursache?**

{r3{Die Datei wurde beim Hochladen beschädigt.}}

{r3{Der Server unterstützt keine Umlaute.}}

{r3{!Die Datei wird mit einer anderen Codierung gelesen, als sie gespeichert wurde.}}

{r3{Der Browser ist zu alt.}}

{h{Die Bytes stimmen – nur die Vorschrift zum Lesen nicht.}}
{H{Richtig. Deshalb gehört die charset-Angabe in jede HTML-Datei.}}

**7. Was ändert sich am Server, wenn du in den Entwicklerwerkzeugen eine Überschrift umschreibst?**

{r4{Die Seite ist für alle geändert.}}

{r4{Die Änderung gilt bis zum nächsten Neustart des Servers.}}

{r4{!Nichts – die Änderung betrifft nur deine eigene Ansicht.}}

{r4{Der Server speichert die Änderung als Vorschlag.}}

{h{Woher sollte der Server davon erfahren? Es wurde nichts hingeschickt.}}
{H{Richtig – deshalb taugen solche Bildschirmfotos nicht als Beleg.}}

**8. Welche Aussage über den Teil einer Adresse nach der Raute stimmt?**

{r5{Er wird als Suchbegriff an den Server geschickt.}}

{r5{!Er bleibt im Browser und bestimmt, wohin innerhalb der Seite gesprungen wird.}}

{r5{Er gibt die Zeichencodierung an.}}

{r5{Er ist Teil des Pfades.}}

{h{Der Sprung passiert erst, wenn die Seite schon da ist.}}
{H{Richtig. Der Server erfährt diesen Teil gar nicht.}}

::::
