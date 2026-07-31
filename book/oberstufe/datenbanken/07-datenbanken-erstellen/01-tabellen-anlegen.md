---
title: Tabellen anlegen
index: 1
---

# Tabellen anlegen

:::alert{info}
Dieses Kapitel gehört zum **Leistungskurs**.
:::

## CREATE TABLE

:::sqlide{db="/datenbanken/klangwiese-leer.sqlite" height="610px"}

```mysql Anlegen.sql
CREATE TABLE verein (
    verein_id  INTEGER PRIMARY KEY,
    name       TEXT    NOT NULL,
    ort        TEXT,
    gegruendet INTEGER
);
```

:::

:::snippet{#aufgabe}
Führe die Anweisung aus. Sieh dir danach den Datenbankbaum links an.

a) Was hat sich dort verändert?

b) Führe die Anweisung ein zweites Mal aus. Was passiert?

c) Drücke *Datenbank Reset*. Ist die Tabelle noch da?
:::

:::protect{password="db-7-1-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Die Tabelle `verein` erscheint mit ihren vier Spalten und deren Datentypen. Sie hat 0 Datensätze.

b) `table verein already exists` – eine Tabelle mit diesem Namen gibt es schon.

c) Nein. Der Reset stellt den Ausgangszustand der Datenbank wieder her. Alles, was du hier anlegst, lebt nur in deinem Browser.

:::

## Datentypen wählen

:::snippet{#merken}
| Datentyp | wofür | Beispiel |
| --- | --- | --- |
| `INTEGER` | ganze Zahlen, auch für Schlüssel und Wahrheitswerte | `kapazitaet INTEGER` |
| `REAL` | Kommazahlen | `gewicht REAL` |
| `DECIMAL(p,s)` | Kommazahlen mit fester Stellenzahl – für Geldbeträge | `preis DECIMAL(6,2)` |
| `TEXT` | Text beliebiger Länge | `beschreibung TEXT` |
| `VARCHAR(n)` | Text bis `n` Zeichen | `name VARCHAR(80)` |
| `CHAR(n)` | Text mit genau `n` Zeichen | `laendercode CHAR(2)` |
| `DATE` | Datum | `gruendungstag DATE` |
| `DATETIME` | Datum mit Uhrzeit | `gekauft_am DATETIME` |
| `BOOLEAN` | Wahrheitswert | `ueberdacht BOOLEAN` |
:::

:::snippet{#brain}
SQLite nimmt es mit Datentypen ungewöhnlich locker: Es speichert in einer `INTEGER`-Spalte klaglos einen Text. Andere Systeme weisen das zurück.

Verlass dich also nicht darauf, dass die Datenbank dich vor falschen Werten schützt – aber schreibe trotzdem den richtigen Typ hin. Er dokumentiert deine Absicht, er wird auf anderen Systemen durchgesetzt, und er entscheidet darüber, wie sortiert wird: `'10'` steht als Text **vor** `'9'`, als Zahl dahinter.
:::

:::snippet{#aufgabe}
Welchen Datentyp würdest du wählen? Begründe kurz.

a) eine Postleitzahl

b) ein Geldbetrag in Euro

c) eine Telefonnummer

d) die Angabe, ob ein Kurs ausgebucht ist

e) eine ISBN

f) die Zahl der Teilnehmenden
:::

::::collapsible{title="Tipp"}

Die Prüffrage lautet nicht „sind das Ziffern?", sondern: **Rechnet man damit?** Was man nicht addiert und nicht sortiert wie eine Zahl, ist Text.

::::

:::protect{password="db-7-1-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) `CHAR(5)` oder `VARCHAR(5)`. **Kein** `INTEGER` – sonst verschwindet die führende Null von `01067 Dresden`. Und man rechnet nicht mit Postleitzahlen.

b) `DECIMAL(8,2)`. `REAL` ist bei Geld heikel: Rundungsfehler summieren sich, und `0.1 + 0.2` ist im Binärsystem nicht genau `0.3`.

c) `VARCHAR(30)`. Wegen der führenden Null, wegen `+49`, wegen Leerzeichen und Bindestrichen. Und weil man Telefonnummern nicht addiert.

d) `BOOLEAN`, in SQLite als `INTEGER` mit 0 und 1.

e) `CHAR(13)` oder `VARCHAR(17)` – letzteres, wenn die Bindestriche mitgespeichert werden. Auch hier: keine Zahl, obwohl es wie eine aussieht.

f) `INTEGER`. Hier rechnet man tatsächlich damit.

:::

## Ein vollständiges Schema umsetzen

:::snippet{#beispiel}
Der Fahrradverleih aus [Kapitel 5](../05-datenbanken-modellieren/04-vom-diagramm-zum-schema):

```
station(station_id, name, adresse, stellplaetze)
fahrrad(rahmennummer, typ, anschaffungsjahr, station_id→station)
kundin(kundin_id, name, geburtsdatum, email)
ausleihe(ausleih_id, rahmennummer→fahrrad, kundin_id→kundin, start, ende, preis)
```

Die Reihenfolge ist wichtig: Eine Tabelle kann nur auf eine Tabelle verweisen, die es **schon gibt**. Also erst `station`, dann `fahrrad`.
:::

:::sqlide{db="/datenbanken/klangwiese-leer.sqlite" height="760px"}

```mysql Verleih.sql
CREATE TABLE station (
    station_id    INTEGER PRIMARY KEY,
    name          VARCHAR(60) NOT NULL,
    adresse       VARCHAR(120),
    stellplaetze  INTEGER
);

CREATE TABLE fahrrad (
    rahmennummer     VARCHAR(20) PRIMARY KEY,
    typ              VARCHAR(20) NOT NULL,
    anschaffungsjahr INTEGER,
    station_id       INTEGER NOT NULL,
    FOREIGN KEY (station_id) REFERENCES station(station_id)
);
```

:::

:::alert{info}
Die IDE prüft deinen Text gegen die Tabellen, die es **im Moment** gibt. Solange `station` noch nicht angelegt ist, markiert sie die `FOREIGN KEY`-Zeile in `fahrrad` als Fehler.

Führe die Anweisungen der Reihe nach aus – nach dem ersten `CREATE TABLE` verschwindet die Meldung von selbst.
:::

:::snippet{#aufgabe}
a) Führe beide Anweisungen nacheinander aus.

b) Ergänze die beiden fehlenden Tabellen `kundin` und `ausleihe`. Wähle für jedes Attribut einen passenden Datentyp.

c) Warum muss `ausleihe` als Letztes angelegt werden?
:::

::::collapsible{title="Tipp 1: Gerüst für kundin"}

```sql
CREATE TABLE kundin (
    kundin_id    INTEGER PRIMARY KEY,
    name         VARCHAR(80) NOT NULL,
    geburtsdatum DATE,
    email        VARCHAR(120)
);
```

::::

::::collapsible{title="Tipp 2: Zwei :t[Fremdschlüssel]{#fremdschluessel} in einer Tabelle"}

Es dürfen mehrere `FOREIGN KEY`-Zeilen untereinander stehen. Jede bekommt ihre eigene Zeile am Ende der Tabellendefinition.

::::

:::protect{password="db-7-1-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rest.sql
CREATE TABLE kundin (
    kundin_id    INTEGER PRIMARY KEY,
    name         VARCHAR(80) NOT NULL,
    geburtsdatum DATE,
    email        VARCHAR(120)
);

CREATE TABLE ausleihe (
    ausleih_id   INTEGER PRIMARY KEY,
    rahmennummer VARCHAR(20) NOT NULL,
    kundin_id    INTEGER     NOT NULL,
    start        DATETIME    NOT NULL,
    ende         DATETIME,
    preis        DECIMAL(6,2),
    FOREIGN KEY (rahmennummer) REFERENCES fahrrad(rahmennummer),
    FOREIGN KEY (kundin_id) REFERENCES kundin(kundin_id)
);
```

c) `ausleihe` verweist auf `fahrrad` **und** auf `kundin`. Beide müssen vorher existieren.

Beachte auch: `ende` hat kein `NOT NULL`. Eine laufende Ausleihe hat noch kein Ende – das ist genau die Minimalangabe `(0,1)` aus der Modellierung, hier in SQL übersetzt.

:::

## Von der Kardinalität zur Tabellendefinition

:::snippet{#merken}
Die Angaben aus dem ER-Diagramm landen an ganz bestimmten Stellen:

| im Modell | in `CREATE TABLE` |
| --- | --- |
| Entitätstyp | eine `CREATE TABLE`-Anweisung |
| Schlüsselattribut | `PRIMARY KEY` |
| 1:n-Beziehung | `FOREIGN KEY` auf der n-Seite |
| n:m-Beziehung | eigene Tabelle mit zusammengesetztem `PRIMARY KEY` |
| Minimalangabe 1 | `NOT NULL` auf dem Fremdschlüssel |
| Minimalangabe 0 | kein `NOT NULL` |
| Attribut mit eindeutigen Werten | `UNIQUE (spalte)` |
:::

<!--
KLP QPh (nur LK), Daten und ihre Strukturierung: setzen ein relationales
Datenbankschema mit geeigneten Datentypen in einem Datenbanksystem um (I).
-->

---

## Selbsttest

::::multievent

**1. Welchen Datentyp nimmt man für eine Postleitzahl?**

{r1{INTEGER}}

{r1{!CHAR oder VARCHAR}}

{r1{REAL}}

{r1{DECIMAL}}

{h{Was passiert mit der 01067 aus Dresden?}}
{H{Richtig. Führende Nullen und keine Rechenoperationen – das ist Text.}}

**2. Warum ist REAL für Geldbeträge ungeeignet?**

{r2{Weil REAL zu wenig Stellen hat.}}

{r2{!Weil sich Rundungsfehler summieren.}}

{r2{Weil REAL nicht sortierbar ist.}}

{r2{Weil SQLite kein REAL kennt.}}

{h{Ist 0.1 + 0.2 im Binärsystem genau 0.3?}}
{H{Richtig. Für Geld nimmt man DECIMAL mit fester Stellenzahl.}}

**3. In welcher Reihenfolge müssen Tabellen angelegt werden?**

{r3{alphabetisch}}

{r3{!zuerst die, auf die verwiesen wird}}

{r3{zuerst die, die verweist}}

{r3{die Reihenfolge ist beliebig}}

{h{Ein Fremdschlüssel muss auf etwas Vorhandenes zeigen.}}
{H{Richtig. Deshalb kam station vor fahrrad.}}

**4. Woraus wird beim Umsetzen aus einer Minimalangabe von 1?**

{r4{PRIMARY KEY}}

{r4{UNIQUE}}

{r4{!NOT NULL}}

{r4{FOREIGN KEY}}

{h{„Mindestens einer" heißt: Der Wert darf nicht fehlen.}}
{H{Richtig.}}

**5. Warum hat die Spalte ende der Ausleihe kein NOT NULL?**

{r5{Weil DATETIME kein NOT NULL erlaubt.}}

{r5{!Weil eine laufende Ausleihe noch kein Ende hat.}}

{r5{Weil sie kein Fremdschlüssel ist.}}

{r5{Das ist ein Fehler im Entwurf.}}

{h{Die Minimalangabe im ER-Diagramm war (0,1).}}
{H{Richtig. Modellentscheidungen zeigen sich hier ganz konkret.}}

::::
