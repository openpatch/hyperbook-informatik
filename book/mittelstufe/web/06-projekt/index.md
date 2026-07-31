---
name: Projekt
index: 6
---

# Projekt: Deine eigene Homepage

Jetzt kommt alles zusammen. Du baust eine Homepage aus **drei Seiten**, die auf jedem Bildschirm funktioniert und die man auch veröffentlichen dürfte.

Gearbeitet wird allein oder zu zweit.

## Ein Thema wählen

:::snippet{#aufgabe}
Such dir ein Thema, über das du etwas zu sagen hast. Es muss genug hergeben für drei Seiten mit je einem eigenen Schwerpunkt.
:::

:::snippet{#beispiel}
**Vorschläge, falls dir nichts einfällt:**

| Thema | Die drei Seiten |
| --- | --- |
| Dein Hobby | Was ist das? · Wie fängt man an? · Meine Ausrüstung |
| Deine Stadt | Übersicht · Sehenswürdigkeiten · Geheimtipps |
| Ein Verein oder eine AG | Wer wir sind · Was wir machen · Mitmachen |
| Ein Rezeptbuch | Übersicht · Ein Rezept ausführlich · Was in die Küche gehört |
| Ein Spiel, das du magst | Worum geht es? · Regeln · Taktiktipps |
| Ein Tier oder eine Pflanze | Steckbrief · Lebensraum · Warum es gefährdet ist |
| Ein Buch oder eine Serie | Worum geht es? · Die Figuren · Meine Meinung |
:::

## Die Bausteine

### 1. Planen

:::snippet{#aufgabe}
Bevor du eine Zeile tippst:

a) Skizziere auf Papier, wie jede der drei Seiten aussehen soll. Zeichne die Bereiche als Kästen ein und beschrifte sie mit den :t[HTML]{#html}-Elementen, die du dafür nehmen willst.

b) Zeichne dazu eine zweite Skizze für ein **schmales** Handydisplay. Was rutscht dort untereinander?

c) Lege deine Dateistruktur fest. Bewährt hat sich:

```
meine-seite/
├── index.html
├── seite2.html
├── seite3.html
├── impressum.html
├── stil.css
└── bilder/
```

d) Notiere zu jedem Bild, das du verwenden willst: Woher stammt es? Unter welcher Lizenz? Wen musst du nennen?
:::

::::collapsible{title="Warum erst zeichnen?"}

Eine Skizze auf Papier ist in zwei Minuten geändert. Ein fertiges Layout in :t[CSS]{#css} nicht.

Und die zweite Skizze für das Handy erspart dir später die unangenehme Entdeckung, dass dein dreispaltiges Raster auf einem schmalen Bildschirm nicht funktioniert.

::::

### 2. HTML schreiben

:::snippet{#aufgabe}
Baue alle drei Seiten **ohne jedes CSS** auf. Sie sollen erst inhaltlich fertig sein.

Pflicht auf jeder Seite:

- vollständiges Grundgerüst mit `lang`, `charset`, `viewport` und einem aussagekräftigen `title`
- die Bereiche `header`, `nav`, `main` und `footer`
- genau ein `h1`, darunter sinnvolle `h2`
- eine Navigation, die zu **allen** Seiten führt, mit relativen Adressen

Verteilt über das Projekt außerdem:

- mindestens eine Liste
- mindestens eine Tabelle mit `caption` und `th`
- mindestens zwei Bilder mit ordentlichem `alt`, davon eines in einer `figure` mit `figcaption`
- mindestens ein externer Link mit sprechendem Linktext
:::

::::collapsible{title="Die Prüfung ohne CSS"}

Sieh dir die Seiten in diesem Zustand genau an. **Sind sie verständlich?** Erkennt man die Gliederung allein an den Überschriften?

Wenn ja, ist dein HTML gut. Wenn nein, hilft auch das schönste CSS nicht – dann fehlt Struktur, keine Farbe.

::::

### 3. CSS schreiben

:::snippet{#aufgabe}
Lege **eine** Datei `stil.css` an und binde sie in alle drei Seiten ein.

Pflicht:

- die Regel `* { box-sizing: border-box; }` ganz oben
- mindestens drei eigene Eigenschaften in `:root` – etwa Hauptfarbe, helle Variante, Standardabstand
- eine Schriftart, ein Zeilenabstand und eine Höchstbreite für den Text
- die Regel `img { max-width: 100%; height: auto; }`
- eine Navigation, deren Einträge nebeneinander stehen (Flexbox)
- irgendwo im Projekt ein Raster mit Grid
- höchstens **zwei** Media Queries – alles andere soll sich von selbst anpassen
:::

::::collapsible{title="Tipp: Reihenfolge"}

Bewährt hat sich diese Reihenfolge in der CSS-Datei:

```css
/* 1 Grundeinstellungen */
* { box-sizing: border-box; }
:root { --haupt: …; --abstand: …; }

/* 2 Grundlegende Elemente */
body { … }
h1, h2 { … }
img { … }

/* 3 Bereiche der Seite */
header { … }
nav { … }
main { … }
footer { … }

/* 4 Einzelne Bausteine */
.karte { … }
.hinweis { … }

/* 5 Anpassungen für größere Bildschirme */
@media (min-width: 45rem) { … }
```

Von allgemein nach speziell. So kommt man selten in die Lage, etwas zurücknehmen zu müssen.

::::

### 4. Prüfen

:::snippet{#aufgabe}
a) **Wohlgeformtheit:** Lade jede Seite beim [Validator des W3C](https://validator.w3.org) hoch. Behebe alle Meldungen.

b) **Verschiedene Breiten:** Verkleinere das Browserfenster bis auf Handybreite. Steht irgendwo etwas über den Rand hinaus? Muss man seitlich scrollen?

c) **Ohne Maus:** Drücke wiederholt die Tabulatortaste. Erreichst du jeden Link? Sieht man immer, wo man gerade ist?

d) **Ohne CSS:** Schalte in den Entwicklerwerkzeugen das Stylesheet ab. Ist die Seite noch verständlich?

e) **Ladezeit:** Sieh im Reiter *Netzwerk* nach, wie groß deine Seite insgesamt ist. Über 2 MB? Dann verkleinere die Bilder.
:::

### 5. Rechtliches

:::snippet{#aufgabe}
Lege eine vierte Seite `impressum.html` an. Sie enthält:

- die Angaben zur verantwortlichen Stelle – im Schulprojekt die **Schule**, nicht deine private Anschrift
- eine Liste aller verwendeten Bilder mit Urheber und Lizenz
- einen Satz dazu, ob deine Seite Daten von Besuchern verarbeitet

Verlinke das Impressum aus dem `footer` **jeder** Seite.

Geh danach die Prüfliste aus [Kapitel 5](../05-recht-und-verantwortung/02-impressum-und-datenschutz) Punkt für Punkt durch.
:::

## Abgabe

:::snippet{#merken}
Du gibst ab:

1. die **Skizzen** von Baustein 1 (Papier oder Foto)
2. den **Ordner** mit allen HTML-Dateien, der CSS-Datei und den Bildern
3. das **Prüfprotokoll**: die fünf Punkte aus Baustein 4, jeweils mit dem Ergebnis
4. eine **kurze Begründung** (etwa eine halbe Seite): Warum hast du die Seite so aufgebaut? Welche HTML-Elemente hast du wofür gewählt und warum?
:::

## Bewertungskriterien

:::snippet{#merken}
| Kriterium | Worauf geachtet wird |
| --- | --- |
| **HTML-Struktur** | Grundgerüst vollständig, semantische Elemente statt div, Überschriftenstufen richtig, wohlgeformt |
| **Inhalt** | Die drei Seiten haben je einen eigenen Schwerpunkt, die Navigation funktioniert überall |
| **CSS** | eine gemeinsame Datei, eigene Eigenschaften, sinnvolle Selektoren, sprechende Klassennamen |
| **Anpassungsfähigkeit** | funktioniert von Handy- bis Bildschirmbreite, nichts steht über |
| **Zugänglichkeit** | alt-Texte, sprechende Linktexte, Bedienung mit der Tastatur, ausreichender Kontrast |
| **Recht** | Impressum vorhanden, alle Bilder geklärt und belegt, keine fremden Einbindungen |
| **Begründung** | Entscheidungen werden erklärt, nicht nur getroffen |

Eine schlichte Seite mit sauberem HTML ist mehr wert als eine bunte, deren Quelltext aus fünfzig `div` besteht.
:::

## Wenn du noch Zeit hast

:::snippet{#brain}
- Baue einen **dunklen Modus** mit `prefers-color-scheme` ein. Wenn du in `:root` mit eigenen Eigenschaften gearbeitet hast, sind es wenige Zeilen.
- Gestalte eine **Druckansicht** mit `@media print`: Navigation ausblenden, Schrift schwarz auf weiß, Adressen von Links sichtbar machen.
- Setze `prefers-reduced-motion` um, falls du irgendwo etwas bewegst.
- Baue eine Seite so um, dass sie **ohne einzige Media Query** auskommt – nur mit `clamp`, `minmax` und `auto-fit`.
:::

<!--
UV 10.2, Konkretisierte Kompetenzerwartungen: erstellen HTML-Quelltexte (MI);
formatieren Webseiten mit CSS (MI); erstellen eine eigene Homepage (MI);
erläutern rechtliche Rahmenbedingungen für die Veröffentlichung von
Inhalten (A) - Baustein 5.

Übergeordnet MI: strukturieren und zerlegen (Baustein 1); analysieren und
testen (Baustein 4).

Zeitbedarf etwa 2 Unterrichtsstunden zuzüglich Hausarbeit. Bausteine 1 und 2
lassen sich gut in einer Doppelstunde erledigen, 3 bis 5 in der zweiten.

Die Bausteine 4 und 5 sind erfahrungsgemäß die, die ohne ausdrückliche
Aufforderung nicht stattfinden - deshalb sind sie Teil der Abgabe.
-->
