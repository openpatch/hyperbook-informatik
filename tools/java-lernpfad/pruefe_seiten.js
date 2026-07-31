/* Prueft alle onlineide-Bloecke der uebergebenen Seiten auf Uebersetzungsfehler.

   Aufruf (Dev-Server muss laufen):

       node tools/java-lernpfad/pruefe_seiten.js <pfad> [<pfad> ...]

   Beispiel:

       node tools/java-lernpfad/pruefe_seiten.js \
           oberstufe/oop/02-erweiterungen/01-vertiefte-objektorientierung/03-abstrakte-klassen.html

   Ohne Argumente werden alle gebauten Seiten der beiden Java-Lernpfade
   geprueft. Reine Infomeldungen ("wird nie lesend zugegriffen") werden
   ausgefiltert - die stehen erwartungsgemaess in jedem Aufgabengeruest.

   Braucht playwright-core und einen Chromium aus dem Playwright-Cache.
   Da das Repository kein package.json hat, am einfachsten so:

       mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
       cd -
       NODE_PATH=/tmp/pw/node_modules node tools/java-lernpfad/pruefe_seiten.js
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

/* Bloecke, die absichtlich Uebersetzungsfehler enthalten - dort ist das
   Finden des Fehlers die Aufgabe. Schluessel ist der Seitenpfad, Wert die
   Liste der Blockindizes. */
const ABSICHTLICH_FEHLERHAFT = {
  "oberstufe/oop/01-grundlagen/01-erste-schritte/01-das-erste-programm.html": [1],
  "oberstufe/oop/01-grundlagen/03-kontrollstrukturen/02-logische-ausdruecke.html": [3],
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
  lauf(path.join(OUT, "oberstufe", "oop"));
  return seiten;
}

(async () => {
  const seiten = process.argv.slice(2).length ? process.argv.slice(2) : alleSeiten();

  const browser = await chromium.launch({
    executablePath: findeChromium(),
    headless: true,
    args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const schlaf = (ms) => new Promise((r) => setTimeout(r, ms));

  let fehlerhaft = 0;
  let bloeckeGesamt = 0;

  for (const seite of seiten) {
    await page.goto(`${BASIS}/${seite}`, { waitUntil: "networkidle", timeout: 120000 });

    const anzahl = await page.locator(".java-online").count();
    if (anzahl === 0) continue;
    bloeckeGesamt += anzahl;

    await schlaf(4000);
    for (let i = 0; i < anzahl; i++) {
      await page.locator(".java-online").nth(i).scrollIntoViewIfNeeded();
      await schlaf(2000);
    }
    await schlaf(2000);

    const meldungen = await page.evaluate(() =>
      [...document.querySelectorAll(".java-online")].map((el) => {
        const tab = el.querySelector(".jo_errorsTab");
        return tab ? tab.innerText.trim() : "";
      }),
    );

    const erlaubt = ABSICHTLICH_FEHLERHAFT[seite] || [];

    meldungen.forEach((m, i) => {
      if (erlaubt.includes(i)) return;
      // Infomeldungen zu ungenutzten Parametern stehen in jedem Geruest.
      const echt = m
        .split("\n")
        .filter((z) => z.includes("Fehler:"))
        .join(" | ");
      if (echt) {
        fehlerhaft++;
        console.log(`FEHLER  ${seite}  Block ${i}`);
        console.log(`        ${echt.slice(0, 400)}`);
      }
    });
  }

  await browser.close();
  console.log(`\n${seiten.length} Seiten, ${bloeckeGesamt} Bloecke geprueft.`);
  if (fehlerhaft) {
    console.log(`${fehlerhaft} Block/Bloecke mit Uebersetzungsfehlern.`);
    process.exit(1);
  }
  console.log("Keine Uebersetzungsfehler.");
})();
