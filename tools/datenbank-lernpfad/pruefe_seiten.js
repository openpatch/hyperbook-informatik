/* Prueft alle sqlide-Bloecke des Lernpfads "Datenbanken" auf Fehlermeldungen
   der eingebauten SQL-IDE.

   Aufruf (Dev-Server muss laufen):

       NODE_PATH=/tmp/pw/node_modules node tools/datenbank-lernpfad/pruefe_seiten.js
       NODE_PATH=/tmp/pw/node_modules node tools/datenbank-lernpfad/pruefe_seiten.js \
           oberstufe/datenbanken/02-abfragen-mit-sql/01-select.html

   pruefe_sql.py findet, was SQLite ablehnt. Dieses Skript findet, was
   zusaetzlich der Uebersetzer der IDE ablehnt - und das ist einiges mehr,
   siehe NOTIZEN.md.

   Braucht playwright-core und einen Chromium aus dem Playwright-Cache. Da das
   Repository kein package.json hat, am einfachsten so:

       mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
       cd -
       NODE_PATH=/tmp/pw/node_modules node tools/datenbank-lernpfad/pruefe_seiten.js
*/
const fs = require("fs");
const path = require("path");

let chromium;
try {
  ({ chromium } = require("playwright-core"));
} catch (e) {
  console.error(
    "playwright-core nicht gefunden. Siehe Kommentar am Anfang dieser Datei.",
  );
  process.exit(2);
}

const BASIS = process.env.HYPERBOOK_URL || "http://localhost:8080";
const OUT = path.join(__dirname, "..", "..", ".hyperbook", "out");

function findeChromium() {
  const cache = path.join(process.env.HOME, ".cache", "ms-playwright");
  const kandidaten = fs
    .readdirSync(cache)
    .filter((n) => n.startsWith("chromium-"))
    .sort()
    .reverse();
  for (const k of kandidaten) {
    const exe = path.join(cache, k, "chrome-linux64", "chrome");
    if (fs.existsSync(exe)) return exe;
  }
  throw new Error("Kein Chromium im Playwright-Cache gefunden.");
}

/* Bloecke, in denen eine Meldung im Fehlerreiter erwartet wird. Schluessel ist
   der Seitenpfad, Wert die Liste der Blockindizes.

   Zwei Faelle kommen vor:

   1. Die Anweisung ist absichtlich fehlerhaft, das Lesen der Meldung ist die
      Aufgabe (Kapitel 2, Lektion 1).
   2. Der Block legt eine Spalte, Tabelle oder Sicht an und benutzt sie in
      derselben Datei. Der Editor prueft gegen das Schema, wie es *vor* dem
      Ausfuehren aussieht, und meldet die noch nicht vorhandenen Objekte. Nach
      dem Ausfuehren der ersten Anweisung verschwindet die Meldung. Auf den
      betroffenen Seiten steht dazu jeweils ein alert-Hinweis. */
const ABSICHTLICH_FEHLERHAFT = {
  "oberstufe/datenbanken/02-abfragen-mit-sql/01-select-und-from.html": [2],
  "oberstufe/datenbanken/07-datenbanken-erstellen/02-integritaetsbedingungen.html": [0],
  "oberstufe/datenbanken/07-datenbanken-erstellen/04-schema-veraendern-und-sichten.html": [0, 1, 2],
  "oberstufe/datenbanken/08-datenschutz-und-datensicherheit/02-datensicherheit.html": [0],
};

function alleSeiten() {
  const seiten = [];
  const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) lauf(p);
      else if (e.name.endsWith(".html")) seiten.push(path.relative(OUT, p));
    }
  };
  lauf(path.join(OUT, "oberstufe", "datenbanken"));
  return seiten;
}

(async () => {
  const seiten = process.argv.slice(2).length
    ? process.argv.slice(2)
    : alleSeiten();

  const browser = await chromium.launch({
    executablePath: findeChromium(),
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const schlaf = (ms) => new Promise((r) => setTimeout(r, ms));

  let fehlerhaft = 0;
  let bloeckeGesamt = 0;

  for (const seite of seiten) {
    await page.goto(`${BASIS}/${seite}`, {
      waitUntil: "networkidle",
      timeout: 120000,
    });

    const anzahl = await page.locator(".sql-online").count();
    if (anzahl === 0) continue;
    bloeckeGesamt += anzahl;

    // Die IDEs bauen sich erst auf, wenn sie sichtbar werden.
    for (let i = 0; i < anzahl; i++) {
      await page.locator(".sql-online").nth(i).scrollIntoViewIfNeeded();
      await schlaf(2000);
    }
    await schlaf(3000);

    const meldungen = await page.evaluate(() =>
      [...document.querySelectorAll(".sql-online")].map((el) => {
        const tab = el.querySelector(".jo_errorsTab");
        return tab ? tab.innerText.replace(/\s+/g, " ").trim() : "";
      }),
    );

    const erlaubt = ABSICHTLICH_FEHLERHAFT[seite] || [];

    meldungen.forEach((m, i) => {
      if (erlaubt.includes(i)) return;
      if (!m || m.startsWith("Keine Fehler gefunden")) return;
      fehlerhaft++;
      console.log(`FEHLER  ${seite}  Block ${i}`);
      console.log(`        ${m.slice(0, 400)}`);
    });
  }

  await browser.close();
  console.log(`\n${seiten.length} Seiten, ${bloeckeGesamt} Bloecke geprueft.`);
  if (fehlerhaft) {
    console.log(`${fehlerhaft} Block/Bloecke mit Fehlermeldungen.`);
    process.exit(1);
  }
  console.log("Keine Fehlermeldungen.");
})();
