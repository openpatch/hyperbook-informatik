/* Prueft eingebettete Java-Bloecke auf Uebersetzungsfehler.

   Einrichtung: npm ci && npm run browser:install
   Aufruf bei laufendem Dev-Server: npm run check:java:browser -- [<pfad> ...]
   Ohne Pfade werden alle gebauten Seiten mit Java-Bloecken entdeckt.
   Nur Seiten auflisten (ohne Browser): node tools/java-lernpfad/pruefe_seiten.js --liste
   HYPERBOOK_URL setzt die Serveradresse; CHROMIUM_PATH waehlt einen Browser.
*/
const fs = require("fs");
const path = require("path");
const http = require("node:http");

const BASIS = process.env.HYPERBOOK_URL || "http://localhost:8080";
const OUT = path.join(__dirname, "..", "..", ".hyperbook", "out");

function findeChromium(chromium) {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const standard = chromium.executablePath();
  if (fs.existsSync(standard)) return standard;
  // Kompatibilitaet mit bereits vorhandenen lokalen Playwright-Installationen.
  const cache = path.join(process.env.HOME || "", ".cache", "ms-playwright");
  if (fs.existsSync(cache)) {
    const kandidaten = fs.readdirSync(cache).filter(n => n.startsWith("chromium-"))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).reverse();
    for (const k of kandidaten) {
      for (const ordner of ["chrome-linux64", "chrome-linux"]) {
        const exe = path.join(cache, k, ordner, "chrome");
        if (fs.existsSync(exe)) return exe;
      }
    }
  }
  throw new Error("Kein Chromium gefunden. Bitte npm run browser:install ausfuehren.");
}

/* Bloecke, die absichtlich Uebersetzungsfehler enthalten - dort ist das
   Finden des Fehlers die Aufgabe. Schluessel ist der Seitenpfad, Wert die
   Liste der Blockindizes. */
const ABSICHTLICH_FEHLERHAFT = {
  "oberstufe/oop/01-grundlagen/01-erste-schritte/01-das-erste-programm.html": [1],
  "oberstufe/oop/01-grundlagen/03-kontrollstrukturen/02-logische-ausdruecke.html": [3],
};

// HTML-Klassen pruefen, statt Projektordner von Hand aufzuzaehlen.
function alleSeiten(out = OUT) {
  if (!fs.existsSync(out)) throw new Error("Build fehlt. Bitte npm run build ausfuehren.");
  const seiten = [];
  const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (dir !== out || !e.name.startsWith("__hyperbook_")) lauf(p);
      }
      else if (e.isFile() && e.name.endsWith(".html")) {
        const html = fs.readFileSync(p, "utf8");
        const klassen = [...html.matchAll(/<[^>]+\bclass\s*=\s*(["'])(.*?)\1/g)];
        if (klassen.some(m => m[2].split(/\s+/).includes("java-online"))) {
          seiten.push(path.relative(out, p).split(path.sep).join("/"));
        }
      }
    }
  };
  lauf(out);
  if (!seiten.length) throw new Error("Keine eingebetteten Java-Seiten im Build gefunden.");
  return seiten.sort();
}

async function main(args = process.argv.slice(2)) {
  if (args.includes("--liste")) {
    console.log(alleSeiten().join("\n"));
    return;
  }
  const selbstStarten = args.includes("--serve");
  args = args.filter(arg => arg !== "--serve");
  const seiten = args.length ? args : alleSeiten();
  let server;
  let basis = BASIS;
  if (selbstStarten) {
    server = await starteServer();
    basis = `http://127.0.0.1:${server.address().port}`;
  }
  try {
    await pruefeSeiten(seiten, basis);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
  }
}

async function starteServer() {
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
    ".json": "application/json", ".wasm": "application/wasm", ".svg": "image/svg+xml" };
  const server = http.createServer((req, res) => {
    try {
      const name = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const file = path.resolve(OUT, `.${name.endsWith("/") ? name + "index.html" : name}`);
      if (!file.startsWith(OUT + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const data = fs.readFileSync(file);
      res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return server;
}

async function pruefeSeiten(seiten, basis) {
  let chromium;
  try {
    ({ chromium } = require("playwright-core"));
  } catch {
    throw new Error("playwright-core nicht gefunden. Bitte npm ci ausfuehren.");
  }

  const browser = await chromium.launch({
    executablePath: findeChromium(chromium),
    headless: true,
    args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });

  let fehlerhaft = 0;
  let bloeckeGesamt = 0;

  try {
    for (const [index, seite] of seiten.entries()) {
      console.log(`[${index + 1}/${seiten.length}] ${seite}`);
      const response = await page.goto(`${basis}/${seite}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      if (!response?.ok()) throw new Error(`${seite}: HTTP ${response?.status() ?? "keine Antwort"}`);

      const anzahl = await page.locator(".java-online").count();
      if (anzahl === 0) throw new Error(`${seite}: kein eingebetteter Java-Block geladen.`);
      bloeckeGesamt += anzahl;

      for (let i = 0; i < anzahl; i++) {
        const block = page.locator(".java-online").nth(i);
        await block.scrollIntoViewIfNeeded();
        // Ein leerer Fehler-Tab ist noch kein Compiler-Ergebnis. Erst nach
        // showErrors() gibt es eine Ergebniszeile oder "keine Fehler".
        try {
          await block.locator(".jo_errorsTab .jo_noErrorMessage, .jo_errorsTab .jo_error-line")
            .first().waitFor({ state: "attached", timeout: 30000 });
        } catch {
          throw new Error(`${seite}: Block ${i} liefert kein Compiler-Ergebnis.`);
        }
      }

      const meldungen = await page.evaluate(() =>
        [...document.querySelectorAll(".java-online")].map(el =>
          [...el.querySelectorAll(".jo_errorsTab .jo_error_category")]
            .map(category => category.closest(".jo_error-line").innerText.trim())
            .join(" | ")),
      );

      const erlaubt = ABSICHTLICH_FEHLERHAFT[seite] || [];

      meldungen.forEach((m, i) => {
        if (erlaubt.includes(i)) return;
        const echt = m;
        if (echt) {
          fehlerhaft++;
          console.log(`FEHLER  ${seite}  Block ${i}`);
          console.log(`        ${echt.slice(0, 400)}`);
        }
      });
    }

  } finally {
    await browser.close();
  }
  console.log(`\n${seiten.length} Seiten, ${bloeckeGesamt} Bloecke geprueft.`);
  if (fehlerhaft) {
    console.log(`${fehlerhaft} Block/Bloecke mit Uebersetzungsfehlern.`);
    process.exitCode = 1;
  }
  console.log("Keine Uebersetzungsfehler.");
}

module.exports = { alleSeiten };
if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
