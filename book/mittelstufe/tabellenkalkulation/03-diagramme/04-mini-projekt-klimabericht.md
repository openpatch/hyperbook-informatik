---
title: Mini-Projekt für Fortgeschrittene – Klimabericht Düsseldorf
index: 4
permaid: mittelstufe-calc-projekt-klimabericht
---

# Mini-Projekt für Fortgeschrittene: Klimabericht Düsseldorf 2024

Wie warm war 2024 in Düsseldorf wirklich? Wann hat es am meisten geregnet, und wie viele heiße Tage gab es? Die Stadt misst das Wetter an eigenen Wetterstationen und stellt die Messwerte jedes Tages frei zur Verfügung. In diesem Projekt arbeitest du mit **echten Daten**: 366 Tage, zwölf Messgrößen – und ein paar Lücken, wie sie in echten Messreihen vorkommen.

Dein Ziel ist ein **Klimabericht für das Jahr 2024** mit Tabellen, passenden Diagrammen und belegten Aussagen. Wie du ihn gestaltest und welche Fragen du vertiefst, entscheidest du selbst.

:::alert{info}
**Eigene Datei:** Dieses Projekt verlangt ausdrücklich eine neue Datei. Speichere die importierten Daten als `Klimabericht-Duesseldorf.ods`. Deine Arbeitsmappe `Klassenfahrt.ods` bleibt unverändert.
:::

## Open Data: Daten, die allen gehören

Viele Städte und Behörden veröffentlichen Daten, die sie ohnehin erheben, als **Open Data**: frei zugänglich, in offenen Dateiformaten und mit einer Lizenz, die die Weiterverwendung erlaubt. Düsseldorf betreibt dafür das Portal [opendata.duesseldorf.de](https://opendata.duesseldorf.de). Dort findest du zum Beispiel Verkehrszählungen, Einwohnerzahlen – und Wetterdaten.

Für dieses Projekt brauchst du den Datensatz **„Wetterstationen der Landeshauptstadt Düsseldorf“**:

[Datensatz im Open-Data-Portal Düsseldorf öffnen](https://opendata.duesseldorf.de/dataset/c53352bf-1a65-46f3-a5dc-d35fe0c7f965/resource/7750eeaf-620c-4b22-b438-87fcb0fba3c5)

Lade dort die Datei **„Wetterstationen der Landeshauptstadt Düsseldorf 2024“** im Format `csv` herunter. Sie heißt `City_Wetter_2024.csv` und enthält die Messwerte der Wetterstation in der Innenstadt. Falls das Portal nicht erreichbar ist, nutze diese Kopie: [City_Wetter_2024.csv herunterladen](./City_Wetter_2024.csv)

:::snippet{#merken}
Die Daten stehen unter der Lizenz **Datenlizenz Deutschland – Zero – Version 2.0**. Du darfst sie frei verwenden, verändern und weitergeben. Eine Quellenangabe ist nicht vorgeschrieben – in einem Bericht gehört sie trotzdem dazu, damit andere deine Aussagen prüfen können: *Landeshauptstadt Düsseldorf, Open-Data-Portal, Datensatz „Wetterstationen der Landeshauptstadt Düsseldorf“, Datei City_Wetter_2024.csv.*
:::

## Was ist eine CSV-Datei?

**CSV** steht für *comma-separated values*, also „durch Kommas getrennte Werte“. Eine CSV-Datei ist eine reine Textdatei, die eine Tabelle enthält:

- Jede **Zeile** ist ein Datensatz – hier ein Messtag.
- Die **erste Zeile** enthält die Spaltenüberschriften.
- Ein **Trennzeichen** trennt die Spalten voneinander.

Weil im Deutschen das Komma schon als Dezimalzeichen dient, verwenden deutsche CSV-Dateien meist das **Semikolon** als Trennzeichen. So sehen die ersten Zeilen der Datei aus, wenn du sie mit einem Texteditor öffnest:

```text
Datum;Tmin;Tmit;Tmax;Sges;Rges;Tbod;RFmin;RFmit;RFmax;Wmit;WBmax
01.01.2024;6,9;7,9;9,4;-;-;-;-;-;-;-;-
02.01.2024;6,8;9,9;12,3;-;-;-;-;-;-;-;-
```

Ein `-` bedeutet: **An diesem Tag gibt es keinen Messwert.** Für die ersten Januartage fehlen zum Beispiel Regen und Sonnenschein – die Temperaturen sind dagegen vorhanden.

CSV-Dateien haben keine Formatierung, keine Formeln und keine Diagramme. Gerade deshalb kann fast jedes Programm sie lesen. Sie sind das typische Austauschformat für Open Data.

## Der Aufbau der Datei

Die Datei enthält **366 Zeilen mit Messwerten** – 2024 war ein Schaltjahr – und zwölf Spalten. Die Bedeutung der Abkürzungen steht auf der Seite des Datensatzes:

| Spalte | Abkürzung | Bedeutung | Einheit |
| --- | --- | --- | --- |
| A | `Datum` | Tag der Messung | – |
| B | `Tmin` | niedrigste Temperatur | °C |
| C | `Tmit` | mittlere Temperatur | °C |
| D | `Tmax` | höchste Temperatur | °C |
| E | `Sges` | Gesamtdauer Sonnenschein | Stunden |
| F | `Rges` | Gesamtregenmenge | mm (= Liter pro m²) |
| G | `Tbod` | niedrigste Temperatur am Boden | °C |
| H | `RFmin` | niedrigste Luftfeuchtigkeit | % |
| I | `RFmit` | mittlere Luftfeuchtigkeit | % |
| J | `RFmax` | höchste Luftfeuchtigkeit | % |
| K | `Wmit` | mittlere Windgeschwindigkeit | km/h |
| L | `WBmax` | stärkste Windböe | km/h |

Die Temperaturspalten B bis D sind **vollständig**. In allen anderen Spalten fehlen an einigen Tagen Werte – im Januar besonders viele.

## Die CSV-Datei in Calc öffnen

1. Wähle in Calc **Datei → Öffnen** und dann `City_Wetter_2024.csv`. Es erscheint der Dialog **Textimport**.
2. Stelle bei **Sprache** `Deutsch (Deutschland)` ein. Nur dann erkennt Calc `6,9` als Zahl und `01.01.2024` als Datum.
3. Wähle unter **Trennoptionen** `Getrennt` und setze nur den Haken bei **Semikolon**.
4. Kontrolliere die Vorschau unten im Dialog: Jede Messgröße muss in einer eigenen Spalte stehen. Klicke dann auf **OK**.
5. Speichere sofort mit **Datei → Speichern unter** als `Klimabericht-Duesseldorf.ods` im Format *ODF-Tabellendokument*.

Prüfe danach: Zahlen und Daten stehen in der Zelle **rechtsbündig**. Steht ein Wert linksbündig, hat Calc ihn als Text gelesen – dann stimmen Sprache oder Trennzeichen im Importdialog nicht.

:::snippet{#merken}
Fehlende Werte (`-`) liest Calc als **Text**. Funktionen wie `SUMME`, `MITTELWERT` und `MAX` überspringen Text einfach, ohne eine Fehlermeldung. Das ist bequem, aber gefährlich: Eine Regensumme für den Januar enthält dann nur die Tage, an denen gemessen wurde, und ist deshalb **zu klein**. Prüfe mit `ANZAHL`, wie viele Messwerte ein Bereich wirklich enthält, und nenne Lücken in deinem Bericht.
:::

## Dein Auftrag: ein Klimabericht für 2024

:::snippet{#aufgabe}
Erstelle einen Klimabericht für Düsseldorf im Jahr 2024. Dein Bericht muss mindestens enthalten:

1. **Eine Monatsübersicht** auf einem eigenen Tabellenblatt: für jeden Monat die mittlere Temperatur, die höchste und die niedrigste Temperatur, die Regensumme und die Sonnenstunden. Berechne alles mit Formeln aus den Tageswerten.
2. **Jahreskennzahlen**: Jahresmitteltemperatur, heißester und kältester Tag mit Datum, Jahresniederschlag und Sonnenstunden.
3. **Mindestens drei Diagramme** mit unterschiedlichen Aussagen. Wähle zu jedem den passenden Diagrammtyp und begründe die Wahl in einem Satz. Jeder Titel ist eine Aussage.
4. **Mindestens fünf Aussagen**, die du mit deinen Tabellen oder Diagrammen belegst – zum Beispiel „Der August war mit … °C der wärmste Monat.“
5. **Einen Abschnitt „Datenqualität“**: In welchen Spalten und Monaten fehlen Werte? Welche deiner Ergebnisse sind deshalb unsicher?
6. **Die Quellenangabe** für die Daten.

Darüber hinaus hast du **freie Wahl**. Vertiefe mindestens eine eigene Frage, zum Beispiel:

- Wie viele Sommertage (höchste Temperatur mindestens 25 °C), heiße Tage (mindestens 30 °C) und Frosttage (niedrigste Temperatur unter 0 °C) gab es?
- War es in der Innenstadt wärmer als an der Universität? Der Datensatz enthält auch die Datei `Universität_Wetter_2024.csv`.
- Wie unterscheidet sich 2024 von einem früheren Jahr? Im Portal gibt es die Daten ab 2012.
- Wie groß war der Unterschied zwischen Tageshöchst- und Tagestiefstwert im Sommer und im Winter?
- Hängen Sonnenschein und Luftfeuchtigkeit zusammen? Denk an Kapitel 3.2: Ein Zusammenhang ist noch keine Ursache.
:::

::::collapsible{title="Tipp 1: Monatswerte ohne neue Funktionen"}

Die Tage stehen der Reihe nach in den Zeilen 2 bis 367. Für jeden Monat kannst du den passenden Zeilenbereich direkt angeben, zum Beispiel für die mittlere Temperatur im Januar `=MITTELWERT(Daten.C2:C32)`, wenn das Blatt mit den Tageswerten `Daten` heißt.

| Monat | Zeilen | Monat | Zeilen |
| --- | --- | --- | --- |
| Januar | 2–32 | Juli | 184–214 |
| Februar | 33–61 | August | 215–245 |
| März | 62–92 | September | 246–275 |
| April | 93–122 | Oktober | 276–306 |
| Mai | 123–153 | November | 307–336 |
| Juni | 154–183 | Dezember | 337–367 |

Kontrolliere mit `=ANZAHL(Daten.F2:F32)`, wie viele Regenwerte der Januar tatsächlich hat.

::::

::::collapsible{title="Tipp 2: Für Profis – eine Formel für alle Monate"}

Ergänze auf dem Blatt `Daten` eine Hilfsspalte M mit der Monatsnummer: `=MONAT(A2)`, nach unten bis Zeile 367 kopiert. Schreibe auf dein Übersichtsblatt die Zahlen 1 bis 12 in Spalte A. Dann berechnet eine einzige Formel die mittlere Temperatur jedes Monats:

```text
=MITTELWERTWENNS(Daten.$C$2:$C$367; Daten.$M$2:$M$367; $A2)
```

Für Summen gibt es `SUMMEWENNS`, für Extremwerte `MAXWENNS` und `MINWENNS`. Überlege genau, welche Bezüge beim Kopieren wandern dürfen – das kennst du aus Kapitel 2.

::::

::::collapsible{title="Tipp 3: Tage zählen"}

`ZÄHLENWENN` zählt die Zellen eines Bereichs, die eine Bedingung erfüllen. Sommertage im ganzen Jahr:

```text
=ZÄHLENWENN(Daten.D2:D367; ">=25")
```

::::

::::collapsible{title="Tipp 4: Ein Klimadiagramm"}

Ein klassisches Klimadiagramm zeigt die Monatstemperatur als **Linie** und den Niederschlag als **Säulen** in einem gemeinsamen Diagramm. In Calc heißt dieser Typ **Säulen und Linien**. Weil °C und mm verschiedene Größen sind, braucht jede Reihe eine eigene y-Achse: Klicke die Linie doppelt an und wähle unter **Optionen → Datenreihe ausrichten an** die **Sekundäre Y-Achse**. Beschrifte beide Achsen mit Größe und Einheit.

::::

:::protect{password="calc-3-5-1" description="Kontrollwerte. Erfrage das Passwort bei deiner Lehrkraft."}

Diese Werte hat Calc aus `City_Wetter_2024.csv` berechnet. Vergleiche sie mit deinen Ergebnissen. Kleine Abweichungen in der letzten Stelle entstehen durch Runden.

| Monat | mittlere Temperatur | höchste | niedrigste | Regen | Sonne | Tage ohne Regenwert |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Januar | 3,9 °C | 13,9 °C | −6,3 °C | 17,6 mm | 54,4 h | 13 |
| Februar | 8,6 °C | 16,4 °C | 1,1 °C | 89,7 mm | 40,7 h | 2 |
| März | 9,8 °C | 19,6 °C | 0,7 °C | 70,4 mm | 131,0 h | 0 |
| April | 11,5 °C | 26,1 °C | 0,4 °C | 74,8 mm | 135,1 h | 2 |
| Mai | 16,1 °C | 28,3 °C | 7,8 °C | 96,8 mm | 168,0 h | 3 |
| Juni | 17,4 °C | 31,5 °C | 8,4 °C | 71,9 mm | 220,7 h | 0 |
| Juli | 19,6 °C | 32,5 °C | 10,8 °C | 63,6 mm | 217,5 h | 1 |
| August | 20,9 °C | 35,6 °C | 12,0 °C | 64,1 mm | 256,5 h | 0 |
| September | 16,6 °C | 32,1 °C | 5,9 °C | 74,8 mm | 161,0 h | 2 |
| Oktober | 12,6 °C | 20,6 °C | 4,6 °C | 65,1 mm | 114,4 h | 0 |
| November | 7,4 °C | 17,6 °C | −0,2 °C | 62,8 mm | 63,2 h | 3 |
| Dezember | 5,2 °C | 13,9 °C | −1,0 °C | 65,3 mm | 34,3 h | 1 |

**Jahreskennzahlen**

- Jahresmitteltemperatur: 12,5 °C
- heißester Tag: 13.08.2024 mit 35,6 °C
- kältester Tag: 09.01.2024 mit −6,3 °C
- nassester Tag: 09.10.2024 mit 31,4 mm
- Jahresniederschlag: 816,9 mm, Sonnenstunden: 1 596,8 h – beide **ohne** die Tage ohne Messwert
- Sommertage (Höchsttemperatur mindestens 25 °C): 54 · heiße Tage (mindestens 30 °C): 13 · Frosttage (Tiefsttemperatur unter 0 °C): 15

**Datenqualität**

Die Temperaturen sind für alle 366 Tage vorhanden. Beim Regen fehlen 27 Tage, beim Sonnenschein 26 – im Januar allein 13. Die Januar-Regensumme von 17,6 mm beruht deshalb nur auf 18 Messtagen und ist sicher zu klein; die Aussage „Der Januar war der trockenste Monat“ lässt sich mit diesen Daten **nicht** belegen. Luftfeuchte, Bodentemperatur und Wind haben noch mehr Lücken.

**Passende Diagramme**

- Temperaturverlauf über das Jahr: Liniendiagramm, gern mit drei Reihen für niedrigste, mittlere und höchste Temperatur.
- Regen je Monat: Säulendiagramm – zwölf Monatssummen sind Kategorien, keine fortlaufende Größe.
- Klimadiagramm: Säulen und Linien mit zwei y-Achsen.
- Sommer-, heiße und Frosttage: Säulendiagramm.

:::

## Abgabe

Gib `Klimabericht-Duesseldorf.ods` ab. Der Bericht selbst kann ein eigenes Tabellenblatt mit Textfeldern und Diagrammen sein oder ein Textdokument, in das du deine Diagramme einfügst. Prüfe vor der Abgabe:

- Stammen alle Zahlen aus Formeln, nicht aus abgetippten Ergebnissen?
- Hat jedes Diagramm einen Aussagetitel, beschriftete Achsen mit Einheit und eine Quelle?
- Hast du Lücken in den Daten genannt und deine Aussagen darauf geprüft?
