---
title: Rückblick
index: 4
---

# Rückblick

Ab hier wird SQL erst richtig nützlich: Die interessanten Fragen betreffen fast nie eine einzelne Tabelle. Dieses Kapitel hat dafür ein einziges Werkzeug geliefert – den :t[Verbund]{#verbund} – und drei Formen, in denen er auftritt.

## Das kann ich jetzt

- [ ] Ich kann erklären, was ein **Kreuzprodukt** ist und warum es fast nie das gewünschte Ergebnis liefert. ([3.1](./01-kreuzprodukt-und-verbund))
- [ ] Ich kann zwei Tabellen über eine Fremdschlüsselbeziehung verbinden – in beiden Schreibweisen. ([3.1](./01-kreuzprodukt-und-verbund))
- [ ] Ich kann Tabellen mit einem **Alias** abkürzen und weiß, wann das nötig ist. ([3.1](./01-kreuzprodukt-und-verbund))
- [ ] Ich kann über eine **Zuordnungstabelle** hinweg verbinden, also drei Tabellen in einer Abfrage. ([3.2](./02-viele-zu-viele))
- [ ] Ich kann begründen, warum eine n:m-Beziehung eine eigene Tabelle braucht. ([3.2](./02-viele-zu-viele))
- [ ] Ich kann einen **Selbstverbund** schreiben und erklären, wozu die dritte Bedingung dient. ([3.3](./03-selbstverbund))

## Gemischte Aufgaben

:::sqlide{db="/datenbanken/klangwiese.sqlite" height="760px"}

```mysql Uebung.sql
-- UNGEPRUEFT: Platz für deine Lösungen.
-- a)

-- b)

-- c)

-- d)

```

:::

:::snippet{#aufgabe}
**Aufgabe 1: Vier Verbünde**

a) Welche Band spielt am 17. Juli 2026 wann auf welcher Bühne? Ausgabe: Bandname, Bühnenname, Beginn – nach Beginn sortiert.

b) Welche Bands gehören zum Genre *Indie*? Nur die Namen, alphabetisch.

c) Wer spielt in einer Band mit wem? Gib für die Band *Nordlicht* alle Paare von Bandmitgliedern aus, jedes Paar nur einmal.

d) Welche Auftritte fanden auf der *Seebuehne* statt? Ausgabe: Bandname, Datum, Beginn.
:::

::::collapsible{title="Tipp 1: Welche Tabellen brauche ich?"}

Schreib dir vor jeder Abfrage auf, welche Angaben verlangt sind, und such für jede die Tabelle:

- Bandname → `band`
- Bühnenname → `buehne`
- Datum, Beginn, Zuschauer → `auftritt`

Kommen zwei Tabellen vor, die nicht direkt aufeinander verweisen, brauchst du die Tabelle **dazwischen**. Von `band` nach `buehne` führt kein direkter Weg – nur über `auftritt`.

::::

::::collapsible{title="Tipp 2: zu b)"}

Drei Tabellen, zwei Verbindungsbedingungen:

```sql
FROM band b
  JOIN band_genre bg ON b.band_id = bg.band_id
  JOIN genre g ON g.genre_id = bg.genre_id
```

Die Zuordnungstabelle steht in der Mitte – sie ist der einzige Weg von der einen zur anderen Seite.

::::

::::collapsible{title="Tipp 3: zu c)"}

Der Selbstverbund braucht **zwei Aliasnamen für dieselbe Tabelle** und drei Bedingungen:

1. beide in derselben Band,
2. die richtige Band,
3. `m1.person_id < m2.person_id` – sonst bekommst du jedes Paar zweimal und jede Person mit sich selbst.

::::

:::protect{password="db-3-4-1" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

```sql Rueckblick-3-1.sql
-- a) 12 Auftritte
SELECT b.name AS band, bu.name AS buehne, a.beginn
  FROM auftritt a
  JOIN band b ON b.band_id = a.band_id
  JOIN buehne bu ON bu.buehne_id = a.buehne_id
 WHERE a.datum = '2026-07-17'
 ORDER BY a.beginn;

-- b) 8 Bands
SELECT b.name
  FROM band b
  JOIN band_genre bg ON bg.band_id = b.band_id
  JOIN genre g ON g.genre_id = bg.genre_id
 WHERE g.name = 'Indie'
 ORDER BY b.name;

-- c) 3 Paare
SELECT p1.vorname AS erste, p2.vorname AS zweite
  FROM mitgliedschaft m1
  JOIN mitgliedschaft m2 ON m1.band_id = m2.band_id
                        AND m1.person_id < m2.person_id
  JOIN person p1 ON p1.person_id = m1.person_id
  JOIN person p2 ON p2.person_id = m2.person_id
  JOIN band b ON b.band_id = m1.band_id
 WHERE b.name = 'Nordlicht';

-- d) 7 Auftritte
SELECT b.name, a.datum, a.beginn
  FROM auftritt a
  JOIN band b ON b.band_id = a.band_id
  JOIN buehne bu ON bu.buehne_id = a.buehne_id
 WHERE bu.name = 'Seebuehne'
 ORDER BY a.datum, a.beginn;
```

Bei a) und d) fällt auf: Beide verbinden dieselben drei Tabellen. Nur die Bedingung im `WHERE` und die ausgegebenen Spalten unterscheiden sich. Das ist typisch – der Verbund ist das Gerüst, die Frage steckt im `WHERE`.

:::

:::snippet{#aufgabe}
**Aufgabe 2: Wenn die Verbindungsbedingung fehlt**

```sql
SELECT b.name, bu.name
  FROM band b, buehne bu;
```

a) Wie viele Zeilen liefert diese Abfrage? Rechne es aus, **bevor** du sie ausführst. In `band` stehen 22 Zeilen, in `buehne` 4.

b) Führe sie aus und prüfe.

c) Was steht inhaltlich in diesen Zeilen? Ist das eine sinnvolle Auskunft?

d) Ergänze die Abfrage so, dass sie beantwortet, welche Band tatsächlich auf welcher Bühne gespielt hat. Wie viele Zeilen sind es dann?

e) Erkläre, warum ein vergessenes `ON` besonders tückisch ist: Was passiert bei zwei Tabellen mit je 100 000 Zeilen?
:::

:::protect{password="db-3-4-2" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) und b) 22 · 4 = **88 Zeilen**. Das Kreuzprodukt kombiniert **jede** Zeile der einen Tabelle mit **jeder** Zeile der anderen.

c) Jede denkbare Paarung aus Band und Bühne – auch alle, die es nie gegeben hat. Die Abfrage beantwortet die Frage „Welche Kombinationen wären möglich?", nicht „Welche gab es?". Als Auskunft über das Festival ist sie wertlos.

d) Über die Tabelle `auftritt`, in der beide Fremdschlüssel zusammenkommen:

```sql
SELECT DISTINCT b.name, bu.name
  FROM auftritt a
  JOIN band b ON b.band_id = a.band_id
  JOIN buehne bu ON bu.buehne_id = a.buehne_id;
```

Ohne `DISTINCT` sind es 46 Zeilen – eine je Auftritt. Mit `DISTINCT` bleiben **35** übrig: die tatsächlich vorgekommenen Paarungen.

e) 100 000 · 100 000 = 10 Milliarden Zeilen. Das Datenbanksystem versucht das ernsthaft und blockiert für lange Zeit. Und weil ein Kreuzprodukt **syntaktisch korrekt** ist, gibt es keine Fehlermeldung – nur eine Abfrage, die nicht zurückkommt. Faustregel: Bei `n` Tabellen im `FROM` gehören `n − 1` Verbindungsbedingungen dazu.

:::

:::snippet{#aufgabe}
**Aufgabe 3: Beziehungen unterscheiden**

Sieh dir das Schema der Klangwiese an.

a) Welche Art von Beziehung besteht zwischen `band` und `auftritt`? Woran erkennst du das im Schema?

b) Welche zwischen `band` und `genre`? Woran erkennst du das?

c) Warum hat `mitgliedschaft` zusätzlich die Attribute `instrument` und `seit`, während `band_genre` nur aus zwei Fremdschlüsseln besteht?

d) Jemand schlägt vor, die Tabelle `band_genre` abzuschaffen und stattdessen in `band` eine Spalte `genres` einzuführen, in der die Genres durch Kommas getrennt stehen. Nenne zwei Gründe, die dagegen sprechen.
:::

:::protect{password="db-3-4-3" description="Lösung. Erfrage das Passwort bei deiner Lehrkraft."}

a) Eine **1:n-Beziehung**: Eine Band hat viele Auftritte, ein Auftritt gehört zu genau einer Band. Erkennbar daran, dass der Fremdschlüssel `band_id` in `auftritt` steht – also auf der n-Seite.

b) Eine **n:m-Beziehung**: Eine Band kann mehreren Genres angehören, ein Genre hat viele Bands. Erkennbar an der eigenen Tabelle `band_genre`, deren Primärschlüssel aus beiden Fremdschlüsseln zusammengesetzt ist.

c) Weil bei einer Mitgliedschaft etwas über die **Beziehung selbst** auszusagen ist: In welcher Band spielt die Person seit wann, und was? Diese Angaben passen weder zur Person allein noch zur Band allein. Bei der Zuordnung Band–Genre gibt es dagegen nichts weiter zu sagen.

d) Zum Beispiel:

- **Suchen wird unmöglich oder unzuverlässig.** Wer alle Indie-Bands sucht, müsste in einem Text nach Teilzeichenketten suchen – und fände dabei auch „Indie-Rock" oder verpasste einen Eintrag wegen eines Leerzeichens.
- **Die erste Normalform ist verletzt.** In einem Feld steht mehr als ein Wert. Genau das ist der Fall, den [Kapitel 6](../06-normalisierung/02-erste-normalform) behandelt.
- Außerdem: Ein Tippfehler erzeugt lautlos ein neues „Genre", und die Datenbank kann nicht mehr sicherstellen, dass nur bekannte Genres vorkommen. Der Fremdschlüssel leistet genau das.

:::

<!--
Rückblick zum Inhaltsfeld Daten und ihre Strukturierung sowie Formale Sprachen:
Verbund über 1:n und n:m, Selbstverbund. Aufgabe 2e) greift die Beurteilung
nach Zahl der Operationen vor.
-->

---

## Selbsttest

::::multievent

**1. Wie viele Zeilen liefert ein Kreuzprodukt aus einer Tabelle mit 20 und einer mit 5 Zeilen?**

{z{100}}

{h{Jede Zeile der einen wird mit jeder der anderen kombiniert.}}
{H{Richtig.}}

**2. Wie viele Verbindungsbedingungen braucht eine Abfrage über vier Tabellen?**

{z{3}}

{h{Immer eine weniger als die Zahl der Tabellen.}}
{H{Richtig – fehlt eine, entsteht unbemerkt ein Kreuzprodukt.}}

**3. Woran erkennt man im Schema eine 1:n-Beziehung?**

{r1{an einer eigenen Zuordnungstabelle}}

{r1{!an einem Fremdschlüssel auf der n-Seite}}

{r1{an einem zusammengesetzten Primärschlüssel}}

{r1{an einer NOT-NULL-Bedingung}}

{h{Der Verweis steht dort, wo es viele gibt.}}
{H{Richtig.}}

**4. Wozu dient beim Selbstverbund die Bedingung mit dem Kleinerzeichen zwischen den beiden Schlüsseln?**

{r2{Sie sortiert das Ergebnis.}}

{r2{!Sie verhindert Paare einer Zeile mit sich selbst und jedes Paar in doppelter Ausführung.}}

{r2{Sie beschleunigt die Abfrage.}}

{r2{Sie ist nur eine Gewohnheit ohne Wirkung.}}

{h{Überleg, was ohne sie im Ergebnis stünde: Amira und Amira – und danach Amira und Jonas sowie Jonas und Amira.}}
{H{Richtig.}}

**5. Welche Tabellen braucht eine Abfrage nach den Genres einer bestimmten Band? Wähle alle aus.**

{c1{!band}}

{c1{!band_genre}}

{c1{!genre}}

{c1{auftritt}}

{c1{mitgliedschaft}}

{h{Der Weg führt über die Zuordnungstabelle in der Mitte.}}
{H{Richtig – drei Tabellen, zwei Verbindungsbedingungen.}}

**6. Wozu dient ein Alias wie band b?**

{r3{Er benennt eine Spalte um.}}

{r3{!Er kürzt den Tabellennamen ab und macht ihn bei mehrfacher Verwendung unterscheidbar.}}

{r3{Er legt eine neue Tabelle an.}}

{r3{Er sortiert die Ausgabe.}}

{h{Beim Selbstverbund kommt dieselbe Tabelle zweimal vor – wie spricht man die zwei Vorkommen an?}}
{H{Richtig. Dort ist ein Alias sogar zwingend.}}

**7. Ein Verbund über auftritt liefert 46 Zeilen, mit DISTINCT nur 35. Was bedeutet das?**

{r4{Elf Auftritte sind fehlerhaft gespeichert.}}

{r4{!Manche Paarungen aus Band und Bühne kommen mehrfach vor, weil dieselbe Band dort mehrmals gespielt hat.}}

{r4{DISTINCT hat Zeilen gelöscht.}}

{r4{Der Verbund hat eine Bedingung zu viel.}}

{h{Eine Zeile im Ergebnis steht für einen Auftritt, nicht für eine Band.}}
{H{Richtig.}}

::::
