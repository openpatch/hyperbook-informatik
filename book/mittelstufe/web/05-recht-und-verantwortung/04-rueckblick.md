---
title: Rückblick
index: 4
---

# Rückblick

In diesem Kapitel gab es keinen Quelltext zu schreiben – und trotzdem entscheidet es darüber, ob deine Seite überhaupt online gehen kann. Die Fragen hier haben selten eine einzige richtige Antwort. Verlangt ist deshalb nicht die Antwort, sondern die **Begründung**.

## Das kann ich jetzt

- [ ] Ich kann erklären, wann ein :t[Urheberrecht]{#urheberrecht} entsteht und warum „kein Hinweis" nicht „frei" bedeutet. ([5.1](./01-urheberrecht-und-lizenzen))
- [ ] Ich kann die Kürzel **BY, SA, NC, ND** und **CC0** deuten und daraus ableiten, was ich tun muss. ([5.1](./01-urheberrecht-und-lizenzen))
- [ ] Ich weiß, dass ein selbst gemachtes Foto von Menschen trotzdem eine Einwilligung braucht. ([5.1](./01-urheberrecht-und-lizenzen))
- [ ] Ich kann sagen, wozu ein **Impressum** da ist und was für Schulprojekte gilt. ([5.2](./02-impressum-und-datenschutz))
- [ ] Ich kann **personenbezogene Daten** erkennen – auch die, die man nicht sieht. ([5.2](./02-impressum-und-datenschutz))
- [ ] Ich kann erklären, warum eine eingebundene fremde Schriftart ein Datenschutzproblem ist. ([5.2](./02-impressum-und-datenschutz))
- [ ] Ich kann beurteilen, welche Inhalte über mich selbst ich veröffentlichen will – und welche nicht. ([5.3](./03-chancen-und-risiken))
- [ ] Ich kann eine Seite daraufhin prüfen, ob sie für **alle** benutzbar ist. ([5.3](./03-chancen-und-risiken))

## Gemischte Aufgaben

:::snippet{#aufgabe}
**Aufgabe 1: Der Fall**

Die Klasse 10c hat eine Seite über ihre Fahrt nach Berlin gebaut und will sie auf dem Schulserver veröffentlichen. Der Quelltext enthält unter anderem:

```html
<h1>Unsere Fahrt nach Berlin</h1>

<img src="brandenburger-tor.jpg" alt="Das Brandenburger Tor bei Nacht">
<p>Foto aus dem Netz</p>

<link rel="stylesheet" href="https://fonts.beispiel-anbieter.de/css?family=Roboto">

<h2>Unsere Gruppe</h2>
<img src="klassenfoto.jpg" alt="Die Klasse 10c vor dem Reichstag">
<p>Von links: Amira, Ben, Chiara, Deniz, Emre, Frieda ...</p>

<h2>Impressum</h2>
<p>Verantwortlich: Ben Sommer, Lindenweg 4, 45879 Gelsenkirchen, ben.sommer@beispiel.de</p>
```

Gehe den Quelltext durch und finde **fünf** Probleme. Notiere zu jedem:

1. Worin besteht das Problem?
2. Auf welche Regel oder welches Recht stützt du dich?
3. Was schlägst du stattdessen vor?
:::

::::collapsible{title="Tipp 1: Systematisch suchen"}

Geh die drei Lektionen als Raster durch:

- **Urheberrecht:** Woher kommen die Bilder? Was steht dabei?
- **Personen:** Wer ist zu sehen oder genannt – und wurde gefragt?
- **Daten:** Welche Daten fließen ab, ohne dass man es sieht?

::::

::::collapsible{title="Tipp 2: Die unsichtbare Zeile"}

Eine Zeile im Quelltext holt bei jedem Seitenaufruf etwas von einem **fremden** Server. Überlege, was dieser Server dabei zwangsläufig erfährt – auch ohne dass jemand etwas anklickt.

::::

:::protect{password="web-5-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

**1. „Foto aus dem Netz"**

Das ist keine Lizenzangabe, sondern das Eingeständnis, dass keine vorliegt. Ohne Angabe gilt der **volle Schutz** – das Bild darf nicht verwendet werden. Vorschlag: ein eigenes Foto nehmen oder eines von Wikimedia Commons mit vollständiger Angabe von Urheber, Lizenz und Link.

**2. Die eingebundene Schriftart**

`https://fonts.beispiel-anbieter.de/...` liegt auf einem **fremden** Server. Bei jedem Seitenaufruf holt der Browser diese Datei dort ab – und dabei erfährt der fremde Server die **IP-Adresse** jeder Besucherin, ohne dass jemand etwas anklickt. Eine IP-Adresse ist ein personenbezogenes Datum. Vorschlag: die Schriftdatei herunterladen und vom eigenen Server ausliefern, oder `system-ui` benutzen.

**3. Das Klassenfoto**

Jede abgebildete Person hat ein **Recht am eigenen Bild**. Für eine Veröffentlichung braucht es die Einwilligung aller – bei Minderjährigen zusätzlich die der Erziehungsberechtigten. Vorschlag: Einwilligungen einholen, ein Foto von hinten wählen oder auf das Bild verzichten.

**4. Die Namensliste**

Vollständige Namen sind personenbezogene Daten. Zusammen mit Foto, Schule und Klasse entsteht ein Datensatz, der Jahre später noch auffindbar ist. Nach dem Grundsatz der **Datenminimierung**: Vornamen genügen, oder man lässt die Liste ganz weg.

**5. Das Impressum**

Hier steht die **Privatanschrift einer Schülerin oder eines Schülers**. Bei einem Schulprojekt ist die Schule verantwortlich; ins Impressum gehören ihre Angaben, nicht die einer minderjährigen Person. Vorschlag: Impressum der Schule verwenden, vorher mit der Lehrkraft klären.

Wer ein sechstes Problem gefunden hat: Das `<p>Foto aus dem Netz</p>` ist auch handwerklich falsch – eine Bildunterschrift gehört in `<figure>` mit `<figcaption>`.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Vier Bilder, vier Entscheidungen**

Für eine Seite über deine Stadt hast du vier Bilder gefunden. Entscheide jeweils: Darfst du es verwenden? Was musst du dann tun?

a) Ein Luftbild auf Wikimedia Commons, Lizenz **CC BY-SA 4.0**.

b) Ein Foto des Bahnhofs, Lizenz **CC BY-NC**. Deine Seite ist ein Schulprojekt ohne Werbung.

c) Eine Zeichnung des Rathauses, Lizenz **CC BY-ND**. Du möchtest sie zuschneiden, damit sie ins Layout passt.

d) Ein Foto, das du selbst auf dem Wochenmarkt gemacht hast. Im Vordergrund ist eine Verkäuferin gut zu erkennen.
:::

:::protect{password="web-5-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) **Ja.** BY heißt: Urheberin nennen, Lizenz nennen, möglichst mit Link. SA heißt: Wenn du das Bild bearbeitest und weitergibst, muss das Ergebnis dieselbe Lizenz tragen. Verwendest du es unverändert, betrifft dich SA nicht.

b) **Ja**, solange die Seite tatsächlich nicht kommerziell ist. Vorsicht: Schon ein Werbebanner oder ein Spendenknopf kann diese Grenze überschreiten. Namensnennung ist trotzdem Pflicht, denn NC steht nie allein – hier ist es CC BY-NC.

c) **Nein**, jedenfalls nicht zugeschnitten. ND verbietet die **Bearbeitung**, und ein Ausschnitt ist eine. Möglichkeiten: das Bild unverändert einbauen und das Layout anpassen, ein anderes Bild suchen oder die Urheberin um Erlaubnis fragen – eine Lizenz ist eine Voreinstellung, keine Grenze für eine persönliche Absprache.

d) **Nicht ohne Weiteres.** Das Urheberrecht liegt zwar bei dir, aber die Verkäuferin hat ein Recht am eigenen Bild. Du brauchst ihre Einwilligung. Alternativen: aus größerem Abstand fotografieren, sodass niemand erkennbar ist, oder den Ausschnitt so wählen, dass es um den Marktstand geht.

**Der Merksatz aus beiden Aufgaben:** Es sind immer **zwei** Fragen. Erstens: Darf ich das Werk verwenden? Zweitens: Sind Personen darauf einverstanden? Die zweite Frage vergisst fast jeder, weil das eigene Foto sich so eindeutig anfühlt.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Stellung nehmen**

Deine Gruppe streitet. Eine Person sagt:

> „Das ist doch übertrieben. Alle stellen Fotos ins Netz, und niemandem passiert etwas. Wir machen die Seite eh nur für unsere Klasse."

Schreibe eine begründete Stellungnahme von etwa einer halben Seite. Geh dabei auf drei Dinge ein:

a) Was an der Aussage stimmt – nimm das Argument ernst.

b) Welche zwei Einwände du hast. Benutze dabei mindestens zwei Fachbegriffe aus diesem Kapitel.

c) Welchen konkreten Vorschlag du der Gruppe machst, mit dem die Seite trotzdem gut wird.
:::

::::collapsible{title="Tipp: Woran denken?"}

Für b) lohnen sich zwei Richtungen:

- **„Nur für unsere Klasse"** – trifft das auf eine Seite im Netz überhaupt zu? Wer kann sie sonst noch aufrufen, und was tun Suchmaschinen?
- **„Niemandem passiert etwas"** – wann zeigt sich der Schaden? Denk an Bewerbungen in einigen Jahren und daran, wie schwer etwas wieder verschwindet, das einmal veröffentlicht war.

::::

:::protect{password="web-5-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

Es gibt keine Musterlösung – aber eine gute Antwort erkennt man an diesen Merkmalen:

**a) Das Argument wird ernst genommen.** Zum Beispiel: Es stimmt, dass eine Klassenseite eine kleine Sache ist und dass rechtliche Schritte unwahrscheinlich sind. Wer nur mit erhobenem Zeigefinger antwortet, überzeugt niemanden.

**b) Zwei tragfähige Einwände**, etwa:

- „Nur für unsere Klasse" trifft nicht zu: Eine Seite im Netz ist **öffentlich**, sobald sie erreichbar ist. Suchmaschinen finden sie, und Inhalte werden von Archiven gespeichert. Ein Link, den man weitergibt, ist keine Zugangsbeschränkung.
- Der Schaden zeigt sich **später**: Namen und Fotos bleiben auffindbar, auch wenn die Seite längst gelöscht ist. Wer sich in fünf Jahren bewirbt, hat auf die Reihenfolge der Treffer keinen Einfluss.
- Es geht nicht nur um dich: Beim Klassenfoto entscheidest du über **andere** mit – und deren Einwilligung liegt nicht vor.

**c) Ein konkreter Vorschlag**, zum Beispiel: Fotos ohne erkennbare Gesichter, nur Vornamen, Schrift vom eigenen Server, Impressum der Schule, und vor der Veröffentlichung die Checkliste aus Lektion 5.2 gemeinsam durchgehen.

**Bewertet wird die Begründung, nicht die Meinung.** Eine Antwort, die zu dem Schluss kommt „wir veröffentlichen die Seite trotzdem, aber ohne Klassenfoto und ohne Nachnamen", ist eine gute Antwort.

:::

<!--
Rückblick zu UV 10.2, Inhaltsfeld Informatik, Mensch und Gesellschaft.
Bündelt die konkretisierte Kompetenzerwartung "Erläutern rechtliche
Rahmenbedingungen für die Veröffentlichung von Inhalten" (A). Aufgabe 3 ist
die Beurteilungsaufgabe des Kapitels und eignet sich als Leistungsnachweis.
-->

---

## Selbsttest

::::multievent

**1. Ein Bild im Netz trägt keinerlei Lizenzhinweis. Was folgt daraus?**

{r1{Es ist gemeinfrei und darf verwendet werden.}}

{r1{!Es ist voll geschützt – ohne Erlaubnis darf man es nicht verwenden.}}

{r1{Es darf verwendet werden, wenn man die Quelle angibt.}}

{r1{Es darf verwendet werden, solange man kein Geld verdient.}}

{h{Das Urheberrecht entsteht automatisch, ganz ohne Vermerk.}}
{H{Richtig. Kein Hinweis heißt: keine Erlaubnis.}}

**2. Was bedeutet das Kürzel SA in einer Creative-Commons-Lizenz?**

{r2{Man darf das Werk nicht bearbeiten.}}

{r2{Man darf kein Geld damit verdienen.}}

{r2{!Ein bearbeitetes Ergebnis muss unter derselben Lizenz weitergegeben werden.}}

{r2{Man muss die Urheberin nennen.}}

{h{SA steht für share alike – Weitergabe unter gleichen Bedingungen.}}
{H{Richtig.}}

**3. Du hast ein Foto selbst gemacht, auf dem eine Freundin gut zu erkennen ist. Was gilt?**

{r3{Du bist Urheberin, also darfst du es veröffentlichen.}}

{r3{!Du brauchst zusätzlich ihre Einwilligung, denn sie hat ein Recht am eigenen Bild.}}

{r3{Du darfst es veröffentlichen, wenn du ihren Namen weglässt.}}

{r3{Du darfst es nur ausgedruckt weitergeben.}}

{h{Es gibt zwei getrennte Fragen: Wem gehört das Werk, und wer ist darauf zu sehen?}}
{H{Richtig – die zweite Frage wird am häufigsten vergessen.}}

**4. Welche davon sind personenbezogene Daten? Wähle alle aus.**

{c1{!der vollständige Name}}

{c1{!die E-Mail-Adresse}}

{c1{!die IP-Adresse eines Geräts}}

{c1{!ein Foto, auf dem jemand erkennbar ist}}

{c1{die Farbe des Hintergrundbildes}}

{h{Personenbezogen heißt: Man kann damit einen bestimmten Menschen ermitteln.}}
{H{Richtig – die IP-Adresse überrascht die meisten, sie führt aber über den Anbieter zum Anschluss.}}

**5. Warum ist eine von einem fremden Server eingebundene Schriftart heikel?**

{r4{Sie lädt langsamer als eine eigene.}}

{r4{!Der fremde Server erfährt bei jedem Aufruf die IP-Adresse der Besucherin.}}

{r4{Sie funktioniert nicht in allen Browsern.}}

{r4{Sie ist immer kostenpflichtig.}}

{h{Der Browser muss die Datei ja irgendwo abholen – und dafür eine Verbindung aufbauen.}}
{H{Richtig. Deshalb legt man solche Dateien auf den eigenen Server.}}

**6. Wer ist bei einer über die Schule veröffentlichten Projektseite verantwortlich?**

{r5{die Schülerin, die den Quelltext geschrieben hat}}

{r5{!die Schule}}

{r5{niemand, weil es ein Schulprojekt ist}}

{r5{der Anbieter des Servers}}

{h{Veröffentlicht wird über die Schule.}}
{H{Richtig – und deshalb gehört keine private Anschrift ins Impressum.}}

**7. Welcher Grundsatz der DSGVO besagt, dass man nur die Daten erheben darf, die wirklich nötig sind?**

{r6{Erlaubnisvorbehalt}}

{r6{!Datenminimierung}}

{r6{Transparenz}}

{r6{Zweckbindung}}

{h{Der Name sagt es schon: so wenig wie möglich.}}
{H{Richtig.}}

::::
