---
title: Mini-Projekt – Reiseetat
index: 3
permaid: mittelstufe-calc-projekt-reiseetat
---

# Mini-Projekt: Reicht unser Reiseetat?

Eine Klasse plant drei Tage in einer europäischen Stadt. Dein Tabellenmodell soll zeigen, was die Fahrt insgesamt und pro Person kostet.

:::snippet{#aufgabe}
Erstelle eine übersichtliche Calc-Datei mit mindestens sechs Kostenpositionen, zum Beispiel Fahrt, Unterkunft, Nahverkehr, Eintritte und Verpflegung.

Dein Modell muss:

- Eingaben und berechnete Ergebnisse sichtbar unterscheiden,
- Anzahl, Einzelpreis und Gesamtpreis passend formatieren,
- jede Positionssumme per Formel berechnen,
- Gesamtkosten, Kosten pro Person sowie Minimum und Maximum der Einzelpreise ausgeben,
- bei geänderter Teilnehmerzahl vollständig neu rechnen,
- einen kurzen Plausibilitätscheck unter der Tabelle enthalten.

Teste drei Fälle: 20, 25 und 30 Teilnehmende. Notiere, welche Kosten pro Person sinken und welche gleich bleiben. Begründe den Unterschied.
:::

::::collapsible{title="Tipp 1: Fix oder pro Person?"}

Eine Busmiete fällt vielleicht einmal an, ein Museumsticket dagegen für jede Person. Ergänze eine Spalte `Abrechnung` oder trenne beide Arten sichtbar.

::::

::::collapsible{title="Tipp 2: Rechengerüst"}

Für Kosten pro Person eignet sich `Anzahl * Einzelpreis`. Fixkosten werden nur einmal addiert. Ganz am Ende teilst du die Gesamtkosten durch die Zahl der Teilnehmenden.

::::

:::protect{password="calc-1-3-1" description="Beispiel-Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-1-3-1.ods)

Eine mögliche Tabelle hat die Spalten `Position`, `Abrechnung`, `Anzahl`, `Einzelpreis` und `Gesamt`. In `Gesamt` steht bei personenbezogenen Kosten `=C2*D2`, bei Fixkosten `=D2`. Die Gesamtsumme lautet beispielsweise `=SUMME(E2:E7)`, die Kosten pro Person `=E8/C9`. Beim Test müssen nur Fixkosten pro Person sinken; personenbezogene Kosten bleiben je Person gleich.

:::

## Abgabe

Gib die Calc-Datei und einen Satz ab: **„Unser Modell ist brauchbar, solange …“** Nenne darin mindestens eine Annahme, etwa gleich teure Zimmer oder unveränderte Eintrittspreise.
