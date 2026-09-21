---
title: Rückblick
index: 4
permaid: mittelstufe-calc-wachstum-rueckblick
---

# Rückblick

Du kannst Wachstumsregeln in Tabellenmodelle übersetzen, Szenarien sichtbar vergleichen und begründen, warum eine berechnete Zukunft keine Gewissheit ist.

## Das kann ich jetzt

- [ ] Ich kann lineares und exponentielles Wachstum an Regel, Tabelle und Diagramm unterscheiden. ([4.1](./01-wachstumsmodelle))
- [ ] Ich kann quadratisches Wachstum über Differenzen erkennen. ([4.1](./01-wachstumsmodelle))
- [ ] Ich kann Wachstumsparameter mit absoluten Bezügen steuern. ([4.1](./01-wachstumsmodelle))
- [ ] Ich kann Szenarien simulieren und vergleichen. ([4.2](./02-szenarien-und-prognosen))
- [ ] Ich kann Prognosen als bedingte Aussagen formulieren und Grenzen benennen. ([4.2](./02-szenarien-und-prognosen))
- [ ] Ich kann mögliche gesellschaftliche Folgen einer Fehlprognose beurteilen. ([Mini-Projekt](./03-mini-projekt-glaskugel))

## Gemischte Aufgaben

:::snippet{#aufgabe}
Modell A startet bei 500 und wächst pro Jahr um 50. Modell B startet ebenfalls bei 500 und wächst jährlich um 8 %.

1. Notiere beide Formeln für den nächsten Zeitschritt mit Parameterzellen.
2. Sage voraus, welches Modell nach einem Jahr größer ist und ob das dauerhaft so bleibt.
3. Plane ein Diagramm zum Vergleich über 20 Jahre.
4. Formuliere eine Prognose und drei Grenzen dieser Prognose.
:::

::::collapsible{title="Tipp"}

Im ersten Jahr wächst A um 50, B um 40. Bei B wächst aber auch der jährliche Zuwachs mit.

::::

:::protect{password="calc-4-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

[Calc-Lösung herunterladen](./loesung-calc-4-4-1.ods)

Bei aktuellem Wert in B2/C2 und Parametern F1/F2 lauten die nächsten Werte `=B2+$F$1` und `=C2*(1+$F$2)`. Nach einem Jahr liegt A mit 550 vor B mit 540; später überholt B. Ein Liniendiagramm mit Jahr auf der x-Achse zeigt den Schnittpunkt. Die Aussage gilt nur bei konstanten Regeln, zuverlässigem Startwert und ohne begrenzende äußere Faktoren.

:::

---

## Selbsttest

::::multievent

**1. Welches Modell addiert stets denselben Betrag?**
{r1{!linear}}
{r1{exponentiell}}
{H{Richtig.}}

**2. Welches Modell besitzt einen konstanten Faktor?**
{r2{linear}}
{r2{!exponentiell}}
{H{Richtig.}}

**3. Was bleibt bei einer quadratischen Folge konstant?**
{r3{!die zweite Differenz}}
{r3{der Quotient}}
{H{Richtig.}}

**4. Was ist ein Szenario?**
{r4{!eine mögliche Entwicklung unter festgelegten Annahmen}}
{r4{eine sichere Vorhersage}}
{H{Richtig.}}

**5. Was muss jede Prognose nennen?**
{r5{!ihre Annahmen und Grenzen}}
{r5{nur einen Endwert}}
{H{Richtig.}}

::::
