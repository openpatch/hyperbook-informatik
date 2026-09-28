---
title: Mini-Projekt – Preisvergleich
index: 3
permaid: mittelstufe-calc-projekt-preisvergleich
---

# Mini-Projekt: Europaschnäppchen?

Reiseangebote können eine andere Währung, Rabatt, Zusatzkosten und Steuer enthalten. Dein Modell macht den Vergleich fair. Hier setzt du alles aus diesem Kapitel zusammen: Parameterzellen, relative und absolute Bezüge, eine längere Formel, die du testest, bevor du sie kopierst.

Arbeite in `Klassenfahrt.ods` auf dem Blatt `Angebote` weiter. Übernimm Ziel, Zeitraum und Gruppengröße aus `Reiseetat` mit Zellbezügen. Die dort dokumentierten Preise bleiben erhalten; dieses Kapitel ergänzt sie um vergleichbare Alternativen.

:::snippet{#aufgabe}
Vergleiche mindestens fünf reale Angebote für passende Bestandteile deiner Klassenfahrt, etwa Anreise oder Unterkunft. Verwende diese Spalten: Angebot, Listenpreis, Währung, Rabatt, Zusatzkosten, Endpreis in Euro und Quelle.

- Lege Wechselkurs und Steuersatz als beschriftete Parameter ab.
- Nutze relative und absolute Bezüge funktional richtig.
- Kopiere eine Formel über alle Angebote.
- Markiere das günstigste und teuerste Angebot mit MIN und MAX.
- Teste ein Szenario mit verändertem Wechselkurs und eines ohne Rabatt.
- Schreibe unter die Tabelle eine Kaufempfehlung samt Einschränkung.

Prüfkriterium: Eine andere Person darf nur die Parameter ändern; alle Ergebnisse müssen folgen.

Speichere das Ergebnis im vorhandenen Dokument. Das Blatt `Reiseetat` darf dabei nicht gelöscht oder durch eine Lösung ersetzt werden.
:::

So könnte der Aufbau aussehen – mit Beispielwerten, ohne die Spalte `Quelle`. Deine Tabelle enthält echte, recherchierte Angebote:

![Calc: Fünf Angebote A bis E mit Listenpreis in GBP, Rabatt, Zusatzkosten und Endpreis in Euro. Steuer 20 % und Wechselkurs 1,16 stehen beschriftet in G2:H3. F2 ist ausgewählt und zeigt =((B2*(1-D2))+E2)*(1+$H$2)*$H$3. Darunter stehen das günstigste Angebot mit 114,76 € und das teuerste mit 123,33 €.](./calc-preisvergleich.png)

:::snippet{#aufgabe}
Schreibe deine Kaufempfehlung zusätzlich hier auf. Nenne das Angebot, den Endpreis und mindestens eine Einschränkung, unter der deine Empfehlung gilt.

::textinput{id="calc-preisvergleich-empfehlung" placeholder="Ich empfehle …, weil … Das gilt allerdings nur, solange …" height="150px"}
:::

::::collapsible{title="Wenn du weitergehen willst"}

Wähle eine Erweiterung, die dich interessiert:

- **Verschiedene Währungen:** Vergleiche Angebote in Pfund, Złoty und Kronen. Jede Währung braucht eine eigene beschriftete Kurszelle – oder eine kleine Kurstabelle.
- **Kurs-Szenarien:** Lege eine Tabelle an, die den Endpreis jedes Angebots für drei verschiedene Wechselkurse zeigt. Mit einem gemischten Bezug genügt dafür eine einzige Formel – wie bei der Umrechnungstabelle in Lektion 2.1.
- **Gruppenpreis:** Rechne aus, was die ganze Klasse bezahlt. Übernimm die Teilnehmerzahl mit einem Bezug aus `Reiseetat`, statt sie abzutippen.

::::

::::collapsible{title="Tipp: Erst ein Angebot prüfen"}

Baue die Formel für eine Zeile auf, teste Sonderfälle und kopiere sie erst dann. Kontrolliere in der letzten Zeile, ob Parameterbezüge noch auf dieselben Zellen zeigen.

::::

:::protect{password="calc-2-3-1" description="Beispiel-Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-3-1.ods)

Eine mögliche Formel ist `=((B2*(1-D2))+E2)*(1+$H$2)*$H$3`, wenn der Listenpreis in B, die Währung in C, der Rabatt in D, die Zusatzkosten in E, der Steuersatz in H2 und der Wechselkurs in H3 stehen. B2, D2 und E2 wandern; H2 und H3 bleiben fest. Die Formel setzt voraus, dass alle Angebote dieselbe Ausgangswährung besitzen. Bei verschiedenen Währungen braucht jede Währung eine eigene klar beschriftete Kurszelle oder eine Zuordnungstabelle.

:::
