---
title: Datensicherheit
index: 2
---

# Datensicherheit

Datenschutz sagt, **welche** Daten verarbeitet werden dürfen. Datensicherheit sorgt dafür, dass mit den Daten, die man haben darf, auch nichts schiefgeht.

## Die drei Schutzziele

:::snippet{#definition}
| Schutzziel | Bedeutung | Verletzt, wenn … |
| --- | --- | --- |
| **Vertraulichkeit** | Nur Befugte können die Daten lesen. | jemand Unbefugtes die Besucherliste einsehen kann |
| **Integrität** | Die Daten sind unverfälscht und vollständig. | jemand Zuschauerzahlen ändern kann, ohne dass es auffällt |
| **Verfügbarkeit** | Befugte können auf die Daten zugreifen, wenn sie sie brauchen. | der Einlassrechner am Festivaltag ausfällt |

Man kürzt sie oft mit **VIV** ab. Alle drei sind gleich wichtig – welches im Einzelfall am schwersten wiegt, hängt vom Anwendungsfall ab.
:::

:::snippet{#brain}
Die drei Ziele stehen häufig **im Konflikt**:

- Eine Datenbank, auf die niemand zugreifen kann, ist maximal vertraulich und völlig unbrauchbar.
- Eine tägliche Sicherungskopie erhöht die Verfügbarkeit und schafft eine weitere Kopie, die vertraulich bleiben muss.
- Ein Protokoll aller Änderungen schützt die Integrität und speichert dabei, wer wann was getan hat – selbst wieder personenbezogene Daten.

Sicherheit ist deshalb nie ein Zustand, sondern immer eine **Abwägung**. Wer behauptet, ein System sei „sicher", hat die Frage nicht verstanden: sicher wogegen, für wen, um welchen Preis?
:::

## Was eine Datenbank technisch anbietet

:::snippet{#merken}
| Schutzziel | Mittel im Datenbanksystem |
| --- | --- |
| Vertraulichkeit | Benutzerkonten, Rechtevergabe (`GRANT`), Sichten, Verschlüsselung der Dateien und der Verbindung |
| Integrität | Integritätsbedingungen ([Kapitel 7](../07-datenbanken-erstellen/02-integritaetsbedingungen)), Transaktionen, Änderungsprotokolle |
| Verfügbarkeit | Sicherungskopien, Wiederherstellungsverfahren, Spiegelung auf mehrere Rechner |
:::

## Rechte und Sichten

Im SQL-Standard vergibt man Rechte so:

```sql
GRANT SELECT ON spielplan TO helfer;
REVOKE SELECT ON besucherin FROM helfer;
```

:::snippet{#merken}
Die eingebaute IDE dieses Lernpfads kennt weder Benutzerkonten noch `GRANT` – sie läuft ja allein in deinem Browser. Das Prinzip solltest du trotzdem kennen, denn es ist der praktisch wichtigste Baustein der Vertraulichkeit.

Die Grundregel heißt **Prinzip der geringsten Rechte**: Jedes Konto bekommt genau die Rechte, die es für seine Aufgabe braucht – und keines mehr.
:::

Wo man Rechte nicht auf Spalten vergeben kann, hilft eine **Sicht**:

:::alert{info}
Der Editor kennt die Sichten noch nicht, solange du sie nicht angelegt hast, und markiert die `SELECT`-Anweisungen darauf als Fehler. Führe die Anweisungen der Reihe nach aus – danach ist der Reiter *Fehler* leer.
:::

:::sqlide{db="/datenbanken/klangwiese-uebung.sqlite" height="760px"}

```mysql Sichten.sql
-- Was die Einlasskontrolle braucht
CREATE VIEW einlassliste AS
SELECT t.ticket_id, t.kategorie, p.vorname, p.nachname
  FROM ticket AS t
  JOIN besucherin AS p ON p.besucher_id = t.besucher_id;

-- Was die Auswertung braucht
CREATE VIEW verkaufsstatistik AS
SELECT kategorie, COUNT(*) AS anzahl, SUM(preis) AS umsatz
  FROM ticket
 GROUP BY kategorie;

SELECT * FROM einlassliste LIMIT 10;

SELECT * FROM verkaufsstatistik;
```

:::

:::snippet{#aufgabe}
a) Welche Angaben aus `besucherin` sind in `einlassliste` **nicht** enthalten? Warum ist das gut?

b) In `verkaufsstatistik` steckt gar keine Angabe zu einzelnen Personen mehr. Welches Prinzip aus der letzten Lektion setzt diese Sicht um?

c) Das Organisationsteam möchte wissen, welche Bands bei den unter 30-Jährigen am besten ankommen. Entwirf eine Sicht, die das beantwortet, ohne einzelne Personen erkennbar zu machen.
:::

::::collapsible{title="Tipp zu c)"}

Du brauchst `bewertung`, `auftritt`, `band` und `besucherin` – letztere nur, um nach dem Geburtsjahr zu filtern, nicht um etwas davon auszugeben.

::::

:::protect{password="db-8-2-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Geburtsjahr, Postleitzahl und E-Mail-Adresse fehlen. Die Einlasskontrolle braucht nur den Namen auf dem Ticket – alles andere geht sie nichts an. Wer die Sicht sieht, kann keine Adressliste anlegen.

b) Die **Datenminimierung**, hier in ihrer technischen Form: Die Sicht gibt nur aggregierte Zahlen aus. Selbst wer vollen Zugriff auf sie hat, erfährt nichts über einzelne Menschen.

c)

```sql Jung.sql
CREATE VIEW bewertung_jung AS
SELECT b.name AS band,
       COUNT(*) AS stimmen,
       ROUND(AVG(w.punkte), 2) AS schnitt
  FROM bewertung AS w
  JOIN besucherin AS p ON p.besucher_id = w.besucher_id
  JOIN auftritt AS a ON a.auftritt_id = w.auftritt_id
  JOIN band AS b ON b.band_id = a.band_id
 WHERE 2026 - p.geburtsjahr < 30
 GROUP BY b.name
HAVING COUNT(*) >= 5;

SELECT * FROM bewertung_jung ORDER BY schnitt DESC;
```

Das `HAVING COUNT(*) >= 5` ist hier kein Schönheitsfehler, sondern **Teil des Schutzes**: Eine Gruppe aus einer einzigen Stimme würde die Bewertung dieser einen Person offenlegen. Man nennt das eine **Mindestgruppengröße**.

:::

## Sicherungskopien und Wiederherstellung

:::snippet{#merken}
Eine Sicherungskopie ist erst dann eine, wenn man sie **zurückgespielt** hat. Drei Fragen, die man beantworten können muss:

1. **Wie alt darf der Stand höchstens sein?** Bei einer Ticketkasse ist ein Datenverlust von einer Stunde untragbar, bei einer Notensammlung vielleicht ein Tag.
2. **Wie lange darf die Wiederherstellung dauern?** Am Festivaltag zählt jede Minute.
3. **Liegt die Kopie woanders?** Eine Sicherung auf derselben Festplatte hilft gegen einen Bedienfehler, nicht gegen Brand oder Diebstahl.

Der klassische Fehler ist, Sicherungen jahrelang zu erzeugen und nie zu prüfen, ob sie sich zurückspielen lassen.
:::

## Transaktionen

:::snippet{#definition}
Eine **Transaktion** ist eine Folge von Anweisungen, die **entweder ganz oder gar nicht** ausgeführt wird.

Klassisches Beispiel: eine Überweisung. Der Betrag wird beim einen Konto abgezogen und beim anderen gutgeschrieben. Fällt der Rechner dazwischen aus, darf keinesfalls der erste Schritt allein gelten.
:::

:::snippet{#brain}
Auf der Klangwiese: Ein Ticketkauf besteht aus dem Anlegen der Besucherin und dem Anlegen des Tickets. Bricht es dazwischen ab, steht eine Person ohne Ticket in der Datenbank – die Datenbank ist dann zwar nicht kaputt, aber sie enthält etwas, das es in der Wirklichkeit nicht gibt.

Datenbanksysteme lösen das mit `BEGIN TRANSACTION`, `COMMIT` und `ROLLBACK`. Damit ist die **Integrität** auch bei Abstürzen und bei gleichzeitigen Zugriffen mehrerer Personen gewährleistet – dasselbe Problem, das dir bei der [Nebenläufigkeit](/oberstufe/oop/02-erweiterungen/08-nebenlaeufigkeit) in Java begegnet.
:::

<!--
KLP QPh, Informatik, Mensch und Gesellschaft: beurteilen Fallbeispiele auf
Grundlage der Grundprinzipien der Datensicherheit und des Datenschutzes (A).
Inhaltlicher Schwerpunkt: Vertraulichkeit, Integrität, Verfügbarkeit.
-->

---

## Selbsttest

::::multievent

**1. Welche drei Schutzziele umfasst die Datensicherheit?**

{r1{Datenschutz, Datensparsamkeit, Transparenz}}

{r1{!Vertraulichkeit, Integrität, Verfügbarkeit}}

{r1{Verschlüsselung, Sicherung, Zugriffsschutz}}

{r1{Richtigkeit, Vollständigkeit, Aktualität}}

{h{Die Abkürzung lautet VIV.}}
{H{Richtig.}}

**2. Der Einlassrechner fällt am Festivaltag aus. Welches Schutzziel ist verletzt?**

{r2{Vertraulichkeit}}

{r2{Integrität}}

{r2{!Verfügbarkeit}}

{h{Die Daten sind unversehrt und geheim – nur kommt niemand an sie heran.}}
{H{Richtig.}}

**3. Jemand ändert unbemerkt Zuschauerzahlen in der Datenbank. Welches Schutzziel ist verletzt?**

{r3{Vertraulichkeit}}

{r3{!Integrität}}

{r3{Verfügbarkeit}}

{h{Die Daten sind da und lesbar – aber stimmen sie noch?}}
{H{Richtig. Dagegen helfen Integritätsbedingungen und Änderungsprotokolle.}}

**4. Was besagt das Prinzip der geringsten Rechte?**

{r4{Alle bekommen dieselben Rechte.}}

{r4{!Jedes Konto bekommt genau die Rechte, die es für seine Aufgabe braucht.}}

{r4{Rechte werden nur an Administratoren vergeben.}}

{r4{Rechte werden regelmäßig entzogen.}}

{h{Was passiert, wenn ein Konto mit zu vielen Rechten übernommen wird?}}
{H{Richtig – und keines mehr.}}

**5. Warum steht in der Sicht bewertung_jung ein HAVING COUNT(*) >= 5?**

{r5{Um die Abfrage zu beschleunigen.}}

{r5{!Damit aus einer Gruppe nicht die Bewertung einer einzelnen Person ablesbar ist.}}

{r5{Weil GROUP BY immer ein HAVING braucht.}}

{r5{Um Bands ohne Auftritt auszuschließen.}}

{h{Wie aussagekräftig – und wie anonym – ist ein Durchschnitt aus einer einzigen Stimme?}}
{H{Richtig. Das nennt man eine Mindestgruppengröße.}}

**6. Wann ist eine Sicherungskopie tatsächlich eine?**

{r6{wenn sie automatisch erzeugt wird}}

{r6{wenn sie verschlüsselt ist}}

{r6{!wenn man sie schon einmal erfolgreich zurückgespielt hat}}

{r6{wenn sie täglich erneuert wird}}

{h{Woher weiß man sonst, dass sie funktioniert?}}
{H{Richtig. Ungeprüfte Sicherungen sind der klassische Fehler.}}

::::
