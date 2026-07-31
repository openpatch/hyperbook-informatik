#!/usr/bin/env python3
"""Erzeugt die SQLite-Datenbanken fuer den Lernpfad "Datenbanken" (Oberstufe).

    python3 tools/datenbank-lernpfad/erzeuge_datenbanken.py

Ergebnis in public/datenbanken/:

  klangwiese.sqlite       Die Festivaldatenbank. Grundlage fast aller Aufgaben.
  klangwiese-roh.sqlite   Eine einzige, unnormalisierte Tabelle. Fuer das
                          Kapitel zur Normalisierung.
  klangwiese-leer.sqlite  Leere Datenbank fuer die CREATE-TABLE-Aufgaben.
  klangwiese-uebung.sqlite  Wie klangwiese.sqlite, aber ohne Fremdschluessel-
                          Bedingungen - fuer Aufgaben, in denen absichtlich
                          fehlerhafte Daten eingefuegt werden sollen.

Die Daten sind frei erfunden. Der Zufallsgenerator laeuft mit festem Startwert,
das Skript liefert also bei jedem Lauf byte-gleiche Datenbanken.
"""
import os
import random
import sqlite3

HIER = os.path.dirname(os.path.abspath(__file__))
ZIEL = os.path.join(HIER, "..", "..", "public", "datenbanken")

SCHEMA = """
CREATE TABLE genre (
    genre_id  INTEGER PRIMARY KEY,
    name      TEXT    NOT NULL UNIQUE
);

CREATE TABLE band (
    band_id        INTEGER PRIMARY KEY,
    name           TEXT    NOT NULL,
    gruendungsjahr INTEGER,
    herkunftsland  TEXT
);

CREATE TABLE band_genre (
    band_id  INTEGER NOT NULL REFERENCES band(band_id),
    genre_id INTEGER NOT NULL REFERENCES genre(genre_id),
    PRIMARY KEY (band_id, genre_id)
);

CREATE TABLE person (
    person_id   INTEGER PRIMARY KEY,
    vorname     TEXT    NOT NULL,
    nachname    TEXT    NOT NULL,
    geburtsjahr INTEGER,
    land        TEXT
);

CREATE TABLE mitgliedschaft (
    person_id  INTEGER NOT NULL REFERENCES person(person_id),
    band_id    INTEGER NOT NULL REFERENCES band(band_id),
    instrument TEXT,
    seit       INTEGER,
    PRIMARY KEY (person_id, band_id)
);

CREATE TABLE buehne (
    buehne_id  INTEGER PRIMARY KEY,
    name       TEXT    NOT NULL,
    kapazitaet INTEGER,
    ueberdacht INTEGER
);

CREATE TABLE auftritt (
    auftritt_id INTEGER PRIMARY KEY,
    band_id     INTEGER NOT NULL REFERENCES band(band_id),
    buehne_id   INTEGER NOT NULL REFERENCES buehne(buehne_id),
    datum       TEXT,
    beginn      TEXT,
    dauer_min   INTEGER,
    zuschauer   INTEGER
);

CREATE TABLE besucherin (
    besucher_id INTEGER PRIMARY KEY,
    vorname     TEXT NOT NULL,
    nachname    TEXT NOT NULL,
    geburtsjahr INTEGER,
    plz         TEXT,
    email       TEXT
);

CREATE TABLE ticket (
    ticket_id   INTEGER PRIMARY KEY,
    besucher_id INTEGER NOT NULL REFERENCES besucherin(besucher_id),
    kategorie   TEXT,
    preis       REAL,
    kaufdatum   TEXT
);

CREATE TABLE bewertung (
    besucher_id INTEGER NOT NULL REFERENCES besucherin(besucher_id),
    auftritt_id INTEGER NOT NULL REFERENCES auftritt(auftritt_id),
    punkte      INTEGER,
    PRIMARY KEY (besucher_id, auftritt_id)
);
"""

GENRES = [
    (1, "Indie"),
    (2, "Rock"),
    (3, "Metal"),
    (4, "Elektro"),
    (5, "HipHop"),
    (6, "Jazz"),
    (7, "Folk"),
    (8, "Punk"),
]

# band_id, Name, Gruendungsjahr, Herkunftsland, Genre-IDs
BANDS = [
    (1, "Nordlicht", 2011, "Deutschland", [1, 2]),
    (2, "Blechkapelle Ost", 2004, "Deutschland", [2, 8]),
    (3, "Salzwasser", 2016, "Niederlande", [1]),
    (4, "Grauwacke", 1998, "Deutschland", [3]),
    (5, "Kupferkabel", 2019, "Deutschland", [4]),
    (6, "Marlene und die Kraniche", 2013, "Oesterreich", [7, 1]),
    (7, "Zwoelf Grad", 2015, "Deutschland", [1, 4]),
    (8, "Halde", 2009, "Deutschland", [3, 2]),
    (9, "Sonar Kids", 2020, "Schweden", [4]),
    (10, "Reeperbahn Royal", 2007, "Deutschland", [5]),
    (11, "Frau Holunder", 2017, "Deutschland", [7]),
    (12, "Static Garden", 2012, "Irland", [1, 2]),
    (13, "Beton & Bass", 2018, "Deutschland", [5, 4]),
    (14, "Die Ruhrpott-Philharmoniker", 2001, "Deutschland", [6]),
    (15, "Nachtschicht", 2014, "Deutschland", [8, 2]),
    (16, "Elster", 2021, "Deutschland", [1]),
    (17, "Ohrwurm Orchester", 2006, "Schweiz", [6, 7]),
    (18, "Kaltfront", 2010, "Norwegen", [3]),
    (19, "Papierflieger", 2022, "Deutschland", [1, 7]),
    (20, "Bergwerk", 1995, "Deutschland", [2, 3]),
    (21, "Lumen", 2019, "Frankreich", [4, 1]),
    (22, "Schotterpiste", 2008, "Deutschland", [8]),
]

BUEHNEN = [
    (1, "Hauptbuehne", 8000, 0),
    (2, "Waldbuehne", 2500, 1),
    (3, "Zeltbuehne", 1200, 1),
    (4, "Seebuehne", 600, 0),
]

# person_id, Vorname, Nachname, Geburtsjahr, Land
PERSONEN = [
    (1, "Amira", "Yildiz", 1989, "Deutschland"),
    (2, "Jonas", "Brenner", 1985, "Deutschland"),
    (3, "Lea", "Hoffmann", 1992, "Deutschland"),
    (4, "Tobias", "Krause", 1979, "Deutschland"),
    (5, "Sanne", "de Vries", 1994, "Niederlande"),
    (6, "Pieter", "Bakker", 1991, "Niederlande"),
    (7, "Marlene", "Gruber", 1988, "Oesterreich"),
    (8, "Felix", "Wagner", 1983, "Deutschland"),
    (9, "Nadja", "Petrov", 1996, "Deutschland"),
    (10, "Sven", "Larsson", 1997, "Schweden"),
    (11, "Ida", "Lindqvist", 1999, "Schweden"),
    (12, "Karim", "Haddad", 1990, "Deutschland"),
    (13, "Rebecca", "Stein", 1987, "Deutschland"),
    (14, "Milan", "Novak", 1993, "Deutschland"),
    (15, "Hannah", "Kellner", 1995, "Deutschland"),
    (16, "Aoife", "O'Brien", 1990, "Irland"),
    (17, "Declan", "Murphy", 1986, "Irland"),
    (18, "Jasmin", "Roth", 1998, "Deutschland"),
    (19, "Bastian", "Ehlers", 1981, "Deutschland"),
    (20, "Clara", "Wildner", 1984, "Schweiz"),
    (21, "Nils", "Hagemann", 1992, "Deutschland"),
    (22, "Ruth", "Sander", 1975, "Deutschland"),
    (23, "Tarek", "Mansour", 1994, "Deutschland"),
    (24, "Vivien", "Bruns", 2000, "Deutschland"),
    (25, "Oskar", "Falk", 1978, "Norwegen"),
    (26, "Ingrid", "Nordvik", 1982, "Norwegen"),
    (27, "Emilia", "Baumgart", 2001, "Deutschland"),
    (28, "Levin", "Scholz", 1999, "Deutschland"),
    (29, "Gerd", "Sczepanski", 1972, "Deutschland"),
    (30, "Yara", "Benali", 1997, "Frankreich"),
    (31, "Theo", "Marchand", 1995, "Frankreich"),
    (32, "Britta", "Ohlsen", 1980, "Deutschland"),
    (33, "Simon", "Reiter", 1991, "Deutschland"),
    (34, "Paula", "Grimm", 1993, "Deutschland"),
    (35, "Anton", "Wiese", 1986, "Deutschland"),
]

# person_id, band_id, Instrument, seit
MITGLIEDSCHAFTEN = [
    (1, 1, "Gesang", 2011), (2, 1, "Gitarre", 2011), (3, 1, "Schlagzeug", 2014),
    (4, 2, "Trompete", 2004), (8, 2, "Bass", 2005), (19, 2, "Schlagzeug", 2004),
    (5, 3, "Gesang", 2016), (6, 3, "Gitarre", 2016),
    (4, 4, "Gitarre", 1998), (29, 4, "Gesang", 1998), (22, 4, "Bass", 2003),
    (9, 5, "Synthesizer", 2019), (12, 5, "Gesang", 2020),
    (7, 6, "Gesang", 2013), (20, 6, "Geige", 2015), (33, 6, "Gitarre", 2013),
    (13, 7, "Gesang", 2015), (14, 7, "Bass", 2015), (21, 7, "Synthesizer", 2018),
    (8, 8, "Gitarre", 2009), (19, 8, "Gesang", 2009), (35, 8, "Schlagzeug", 2011),
    (10, 9, "Synthesizer", 2020), (11, 9, "Gesang", 2020),
    (12, 10, "Gesang", 2007), (23, 10, "Turntables", 2009),
    (15, 11, "Gesang", 2017), (34, 11, "Akkordeon", 2019),
    (16, 12, "Gesang", 2012), (17, 12, "Gitarre", 2012), (28, 12, "Bass", 2020),
    (23, 13, "Gesang", 2018), (18, 13, "Synthesizer", 2018),
    (22, 14, "Klarinette", 2001), (29, 14, "Kontrabass", 2001), (32, 14, "Klavier", 2004),
    (24, 15, "Gesang", 2014), (28, 15, "Gitarre", 2016), (27, 15, "Schlagzeug", 2019),
    (27, 16, "Gesang", 2021), (24, 16, "Gitarre", 2021),
    (20, 17, "Geige", 2006), (32, 17, "Klavier", 2006), (25, 17, "Kontrabass", 2012),
    (25, 18, "Gesang", 2010), (26, 18, "Gitarre", 2010),
    (18, 19, "Gesang", 2022), (34, 19, "Gitarre", 2022),
    (29, 20, "Gesang", 1995), (35, 20, "Gitarre", 1997), (2, 20, "Bass", 2013),
    (30, 21, "Gesang", 2019), (31, 21, "Synthesizer", 2019),
    (33, 22, "Gesang", 2008), (21, 22, "Schlagzeug", 2011), (15, 22, "Bass", 2012),
]

TAGE = ["2026-07-16", "2026-07-17", "2026-07-18", "2026-07-19"]

# datum-Index, buehne_id, beginn, dauer_min, band_id
SPIELPLAN = [
    # Donnerstag
    (0, 1, "18:00", 60, 16), (0, 1, "20:00", 75, 7), (0, 1, "22:00", 90, 1),
    (0, 2, "17:30", 45, 19), (0, 2, "19:30", 60, 11), (0, 2, "21:30", 60, 6),
    (0, 3, "18:30", 45, 9), (0, 3, "20:30", 60, 5), (0, 3, "22:30", 90, 13),
    (0, 4, "19:00", 60, 17),
    # Freitag
    (1, 1, "16:00", 45, 3), (1, 1, "18:00", 60, 12), (1, 1, "20:00", 75, 10),
    (1, 1, "22:00", 90, 20),
    (1, 2, "17:00", 45, 22), (1, 2, "19:00", 60, 15), (1, 2, "21:00", 75, 2),
    (1, 3, "18:00", 60, 21), (1, 3, "20:00", 60, 9), (1, 3, "22:00", 75, 13),
    (1, 4, "17:30", 60, 14), (1, 4, "19:30", 60, 11),
    # Samstag
    (2, 1, "15:00", 45, 19), (2, 1, "17:00", 60, 16), (2, 1, "19:00", 75, 8),
    (2, 1, "21:30", 105, 4),
    (2, 2, "16:00", 45, 3), (2, 2, "18:00", 60, 7), (2, 2, "20:00", 75, 12),
    (2, 2, "22:00", 60, 18),
    (2, 3, "16:30", 45, 5), (2, 3, "18:30", 60, 21), (2, 3, "20:30", 75, 10),
    (2, 4, "17:00", 60, 17), (2, 4, "19:00", 60, 6),
    # Sonntag
    (3, 1, "14:00", 45, 11), (3, 1, "16:00", 60, 6), (3, 1, "18:00", 75, 1),
    (3, 2, "15:00", 45, 16), (3, 2, "17:00", 60, 22), (3, 2, "19:00", 75, 15),
    (3, 3, "15:30", 45, 19), (3, 3, "17:30", 60, 2), (3, 3, "19:30", 60, 5),
    (3, 4, "16:00", 60, 14), (3, 4, "18:00", 60, 20),
]

VORNAMEN = [
    "Mia", "Ben", "Emma", "Noah", "Sofia", "Leon", "Lina", "Elias", "Ella",
    "Paul", "Maja", "Finn", "Ida", "Luis", "Frieda", "Jakob", "Nele", "Matteo",
    "Zoe", "Henry", "Marie", "Emil", "Lotte", "Oscar", "Greta", "Theo",
    "Johanna", "Malik", "Selin", "Arda", "Dilara", "Kian", "Nora", "Jost",
]
NACHNAMEN = [
    "Berger", "Schuster", "Lang", "Weiss", "Kuehn", "Vogel", "Sommer", "Haas",
    "Ritter", "Fuchs", "Bauer", "Winter", "Kaiser", "Arslan", "Demir", "Yilmaz",
    "Kowalski", "Nguyen", "Oezdemir", "Schaefer", "Pohl", "Brandt", "Seidel",
    "Engel", "Kuhn", "Adler", "Baum", "Wolter",
]
PLZ = [
    "45127", "45259", "44135", "46045", "47051", "40210", "50667", "48143",
    "33602", "59065", "58095", "42103", "41061", "52062", "53111", "44787",
]
KATEGORIEN = [
    ("Tagesticket", 79.0),
    ("Wochenendticket", 189.0),
    ("Wochenendticket mit Camping", 229.0),
    ("Foerderticket", 39.0),
]


def erzeuge_hauptdatenbank(pfad, mit_fremdschluesseln=True):
    if os.path.exists(pfad):
        os.remove(pfad)
    con = sqlite3.connect(pfad)
    schema = SCHEMA
    if not mit_fremdschluesseln:
        # Fuer die Uebungsdatenbank die REFERENCES-Klauseln entfernen.
        schema = "\n".join(
            zeile.split(" REFERENCES ")[0].rstrip() + ("," if zeile.rstrip().endswith(",") else "")
            if " REFERENCES " in zeile else zeile
            for zeile in schema.splitlines()
        )
    con.executescript(schema)

    con.executemany("INSERT INTO genre VALUES (?, ?)", GENRES)
    con.executemany(
        "INSERT INTO band VALUES (?, ?, ?, ?)",
        [(b[0], b[1], b[2], b[3]) for b in BANDS],
    )
    con.executemany(
        "INSERT INTO band_genre VALUES (?, ?)",
        [(b[0], g) for b in BANDS for g in b[4]],
    )
    con.executemany("INSERT INTO person VALUES (?, ?, ?, ?, ?)", PERSONEN)
    con.executemany("INSERT INTO mitgliedschaft VALUES (?, ?, ?, ?)", MITGLIEDSCHAFTEN)
    con.executemany("INSERT INTO buehne VALUES (?, ?, ?, ?)", BUEHNEN)

    zufall = random.Random(20260716)

    kapazitaet = {b[0]: b[2] for b in BUEHNEN}
    auftritte = []
    for nr, (tag, buehne_id, beginn, dauer, band_id) in enumerate(SPIELPLAN, start=1):
        # Spaete Auftritte auf der Hauptbuehne ziehen mehr Publikum.
        anteil = 0.35 + 0.55 * (int(beginn[:2]) - 14) / 9
        anteil = min(0.98, max(0.25, anteil + zufall.uniform(-0.12, 0.12)))
        zuschauer = int(kapazitaet[buehne_id] * anteil / 10) * 10
        auftritte.append((nr, band_id, buehne_id, TAGE[tag], beginn, dauer, zuschauer))
    con.executemany("INSERT INTO auftritt VALUES (?, ?, ?, ?, ?, ?, ?)", auftritte)

    besucher = []
    for i in range(1, 121):
        vorname = VORNAMEN[zufall.randrange(len(VORNAMEN))]
        nachname = NACHNAMEN[zufall.randrange(len(NACHNAMEN))]
        jahr = zufall.randint(1968, 2010)
        plz = PLZ[zufall.randrange(len(PLZ))]
        mail = f"{vorname}.{nachname}{i}@example.org".lower()
        besucher.append((i, vorname, nachname, jahr, plz, mail))
    con.executemany("INSERT INTO besucherin VALUES (?, ?, ?, ?, ?, ?)", besucher)

    tickets = []
    ticket_id = 1
    for (bid, _v, _n, jahr, _p, _m) in besucher:
        anzahl = 1 if zufall.random() < 0.75 else 2
        for _ in range(anzahl):
            if 2026 - jahr < 27 and zufall.random() < 0.3:
                kat, preis = KATEGORIEN[3]
            else:
                kat, preis = KATEGORIEN[zufall.randrange(3)]
            tag = zufall.randint(1, 28)
            monat = zufall.choice([3, 4, 5, 6])
            tickets.append(
                (ticket_id, bid, kat, preis, f"2026-{monat:02d}-{tag:02d}")
            )
            ticket_id += 1
    con.executemany("INSERT INTO ticket VALUES (?, ?, ?, ?, ?)", tickets)

    bewertungen = []
    for (bid, *_rest) in besucher:
        gesehen = zufall.sample(range(1, len(auftritte) + 1), zufall.randint(2, 8))
        for auftritt_id in gesehen:
            bewertungen.append((bid, auftritt_id, zufall.randint(1, 5)))
    con.executemany("INSERT INTO bewertung VALUES (?, ?, ?)", bewertungen)

    con.commit()
    con.close()


ROH_SCHEMA = """
CREATE TABLE auftrittsliste (
    band              TEXT,
    herkunftsland     TEXT,
    genres            TEXT,
    buehne            TEXT,
    buehnen_kapazitaet INTEGER,
    datum             TEXT,
    beginn            TEXT,
    dauer_min         INTEGER
);
"""


def erzeuge_rohdatenbank(pfad):
    """Eine einzige Tabelle, bewusst unnormalisiert.

    - genres enthaelt mehrere Werte in einer Zelle  -> verletzt die 1. Normalform
    - band -> herkunftsland haengt nur von einem Teil des Schluessels ab
      (Schluessel ist band, datum, beginn)          -> verletzt die 2. Normalform
    - buehne -> buehnen_kapazitaet ist transitiv abhaengig
                                                    -> verletzt die 3. Normalform
    """
    if os.path.exists(pfad):
        os.remove(pfad)
    con = sqlite3.connect(pfad)
    con.executescript(ROH_SCHEMA)

    name_von_band = {b[0]: b[1] for b in BANDS}
    land_von_band = {b[0]: b[3] for b in BANDS}
    genre_name = dict(GENRES)
    genres_von_band = {b[0]: ", ".join(genre_name[g] for g in b[4]) for b in BANDS}
    buehne_name = {b[0]: b[1] for b in BUEHNEN}
    buehne_kap = {b[0]: b[2] for b in BUEHNEN}

    zeilen = [
        (
            name_von_band[band_id],
            land_von_band[band_id],
            genres_von_band[band_id],
            buehne_name[buehne_id],
            buehne_kap[buehne_id],
            TAGE[tag],
            beginn,
            dauer,
        )
        for (tag, buehne_id, beginn, dauer, band_id) in SPIELPLAN
    ]
    con.executemany(
        "INSERT INTO auftrittsliste VALUES (?, ?, ?, ?, ?, ?, ?, ?)", zeilen
    )
    con.commit()
    con.close()


def erzeuge_leere_datenbank(pfad):
    """Leere Datenbank. Die eine Tabelle dient nur als Lebenszeichen -
    ohne sie zeigt die IDE einen leeren Datenbankbaum ohne jeden Hinweis."""
    if os.path.exists(pfad):
        os.remove(pfad)
    con = sqlite3.connect(pfad)
    con.executescript(
        """
        CREATE TABLE hinweis (
            text TEXT
        );
        INSERT INTO hinweis VALUES
            ('Diese Datenbank ist leer. Lege deine Tabellen mit CREATE TABLE selbst an.');
        """
    )
    con.commit()
    con.close()


def main():
    os.makedirs(ZIEL, exist_ok=True)
    haupt = os.path.join(ZIEL, "klangwiese.sqlite")
    erzeuge_hauptdatenbank(haupt)
    erzeuge_hauptdatenbank(
        os.path.join(ZIEL, "klangwiese-uebung.sqlite"), mit_fremdschluesseln=False
    )
    erzeuge_rohdatenbank(os.path.join(ZIEL, "klangwiese-roh.sqlite"))
    erzeuge_leere_datenbank(os.path.join(ZIEL, "klangwiese-leer.sqlite"))

    con = sqlite3.connect(haupt)
    print("klangwiese.sqlite")
    for (name,) in con.execute(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    ):
        anzahl = con.execute(f'SELECT COUNT(*) FROM "{name}"').fetchone()[0]
        print(f"  {name:<16} {anzahl:>6} Zeilen")
    con.close()


if __name__ == "__main__":
    main()
