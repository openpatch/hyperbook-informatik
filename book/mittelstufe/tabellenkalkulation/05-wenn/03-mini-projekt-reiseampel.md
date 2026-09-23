---
title: Mini-Projekt – Reiseampel
index: 3
permaid: mittelstufe-calc-projekt-reiseampel
---

# Mini-Projekt: Welche Reise passt?

Eine Klasse vergleicht europäische Reiseziele. Deine Tabelle bewertet jedes Angebot nach offengelegten Regeln und gibt eine Ampelfarbe aus.

Arbeite in `Klassenfahrt.ods` auf dem Blatt `Reiseampel` weiter. Führe dort die Ergebnisse deiner bisherigen Blätter zusammen. Übernimm Werte nach Möglichkeit mit blattübergreifenden Zellbezügen, damit Änderungen am Reiseetat oder an den Angeboten automatisch in der Ampel ankommen.

:::snippet{#aufgabe}
Bewerte mindestens sechs bereits untersuchte Reiseangebote oder Kombinationen aus Reiseziel, Anreise und Unterkunft. Verwende Preis pro Person, Fahrtdauer, CO₂-Wert und mindestens ein weiteres sinnvolles Merkmal aus deiner Arbeitsmappe. Falls ein Wert noch fehlt, recherchiere und dokumentiere ihn auf dem fachlich passenden Blatt.

Lege die Grenzwerte in beschrifteten Parameterzellen ab. Die Ampel soll ausgeben:

- **grün**, wenn alle Muss-Kriterien erfüllt sind,
- **gelb**, wenn genau ein Kriterium geprüft werden muss,
- **rot**, wenn das Angebot zu teuer ist oder mindestens zwei Kriterien verfehlt.

Anforderungen:

- Verwende WENN sowie mindestens einmal UND oder ODER.
- Nutze relative und absolute Bezüge funktional richtig.
- Dokumentiere die Entscheidungsregel vor der Tabelle in Worten.
- Teste jeden Grenzwert darunter, darauf und darüber.
- Begründe abschließend, welches Angebot du empfiehlst.
- Nenne eine Schwäche automatischer Ampelentscheidungen.

Abgabe ist die vollständige Datei `Klassenfahrt.ods` mit allen fünf Projektblättern. Die Reiseampel ist der Abschluss dieser Arbeitsmappe, keine neue Datei.
:::

::::collapsible{title="Tipp 1: Erst Hilfsspalten"}

Lass Calc zunächst je Kriterium `1` bei erfüllt und `0` bei nicht erfüllt ausgeben. Die Summe zeigt, wie viele Kriterien erfüllt sind. So bleibt die Regel nachvollziehbar.

::::

::::collapsible{title="Tipp 2: Ampelregel"}

Prüfe zuerst das harte Ausschlusskriterium „zu teuer“. Danach kann eine zweite WENN-Funktion anhand der Zahl erfüllter Kriterien zwischen Grün, Gelb und Rot unterscheiden.

::::

:::protect{password="calc-5-3-1" description="Bewertungsraster. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-5-3-1.ods)

Je zwei Punkte gibt es für: nachvollziehbare Kriterien und Parameter, korrekte Bedingungen, richtige Bezüge beim Kopieren, vollständige Grenztests, begründete Empfehlung sowie reflektierte Modellgrenze. Farben allein genügen nicht; die Wörter Grün, Gelb und Rot müssen auch ohne Farbwahrnehmung lesbar sein.

:::
