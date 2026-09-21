---
title: Rückblick
index: 4
permaid: mittelstufe-calc-bezuege-rueckblick
---

# Rückblick

Du kannst aus einer geprüften Formel viele korrekte Berechnungen erzeugen und entscheidest dabei bewusst, welche Bezüge wandern und welche feststehen.

## Das kann ich jetzt

- [ ] Ich kann Formeln kopieren und ihre Bezüge vorhersagen. ([2.1](./01-relative-und-absolute-bezuege))
- [ ] Ich kann relative, absolute und gemischte Bezüge funktional einsetzen. ([2.1](./01-relative-und-absolute-bezuege))
- [ ] Ich kann komplexe Formeln schrittweise aufbauen. ([2.2](./02-komplexe-formeln-testen))
- [ ] Ich kann Formeln mit Sonderfällen testen. ([2.2](./02-komplexe-formeln-testen))
- [ ] Ich kann veränderliche Annahmen als Parameter sichtbar machen. ([Mini-Projekt](./03-mini-projekt-preisvergleich))

## Gemischte Aufgaben

:::snippet{#aufgabe}
In `D4` steht `=B4*(1-$H$2)+$H3`. Die Formel wird zwei Spalten nach rechts und drei Zeilen nach unten kopiert.

1. Sage die neue Formel voraus.
2. Erkläre für jeden Bezug, was fest bleibt.
3. Entscheide, ob `$H3` für einen einzigen globalen Versandpreis sinnvoll ist, und verbessere ihn gegebenenfalls.
:::

:::protect{password="calc-2-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-2-4-1.ods)

Die Formel wird `=D7*(1-$H$2)+$H6`. `B4` wandert in beide Richtungen, `$H$2` bleibt vollständig fest, bei `$H3` bleibt nur Spalte H fest. Für einen einzigen globalen Versandpreis wäre `$H$3` richtig.

:::

---

## Selbsttest

::::multievent

**1. Welcher Bezug bleibt vollständig fest?**
{r1{!Dollar A Dollar 1}}
{r1{A1}}
{H{Richtig.}}

**2. Was bleibt bei Dollar A 1 fest?**
{r2{!die Spalte A}}
{r2{die Zeile 1}}
{H{Richtig.}}

**3. Was sollte eine Parameterzelle besitzen?**
{r3{!eine klare Beschriftung}}
{r3{eine versteckte Formel}}
{H{Richtig.}}

**4. Wann kopiert man eine Formel am besten?**
{r4{!nachdem die erste Zeile geprüft wurde}}
{r4{vor dem ersten Test}}
{H{Richtig.}}

**5. Was ist ein guter Sonderfall für einen Rabatt?**
{r5{!null Prozent}}
{r5{ein unbekannter Text}}
{H{Richtig. Dann muss der Ausgangspreis erhalten bleiben.}}

::::
