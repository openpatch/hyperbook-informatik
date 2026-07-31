/* Prueft alle webide-Bloecke des Lernpfads "Webentwicklung" im Browser.

   Aufruf (Dev-Server muss laufen):

       NODE_PATH=/tmp/pw/node_modules node tools/web-lernpfad/pruefe_seiten.js
       NODE_PATH=/tmp/pw/node_modules node tools/web-lernpfad/pruefe_seiten.js \
           mittelstufe/web/04-css-gestalten/01-css-einbinden.html

   Gemeldet wird je Block:

   1. **Bilder, die nicht laden.** Ein Tippfehler im src faellt beim Lesen
      nicht auf, im Browser schon.
   2. **CSS-Deklarationen, die der Browser verwirft.** Geprueft mit
      CSS.supports(eigenschaft, wert) - das findet vertippte Eigenschaften
      (colour) und ungueltige Werte, die sonst stillschweigend verschwinden.
   3. **CSS-Regeln ohne jede Deklaration.** Meist ein Hinweis auf eine
      vergessene Klammer.
   4. **Leere Vorschau**, obwohl der Block HTML enthaelt.

   Anders als die Java- und SQL-IDE zeigt der Browser bei fehlerhaftem HTML
   *keine* Fehlermeldung, sondern repariert still. Die Wohlgeformtheit des
   HTML prueft deshalb check_lernpfad.py, nicht dieses Skript.

   Braucht playwright-core und einen Chromium aus dem Playwright-Cache:

       mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
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

/* Bloecke, in denen ein Fehler zur Aufgabe gehoert. Schluessel ist der
   Seitenpfad, Wert die Liste der Blockindizes. */
const ABSICHTLICH_FEHLERHAFT = {};

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

function alleSeiten() {
  const seiten = [];
  const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) lauf(p);
      else if (e.name.endsWith(".html")) seiten.push(path.relative(OUT, p));
    }
  };
  lauf(path.join(OUT, "mittelstufe", "web"));
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

    const anzahl = await page.locator(".directive-webide").count();
    if (anzahl === 0) continue;
    bloeckeGesamt += anzahl;

    for (let i = 0; i < anzahl; i++) {
      await page.locator(".directive-webide").nth(i).scrollIntoViewIfNeeded();
      await schlaf(900);
    }
    await schlaf(3500);

    const erlaubt = ABSICHTLICH_FEHLERHAFT[seite] || [];

    for (let i = 0; i < anzahl; i++) {
      if (erlaubt.includes(i)) continue;
      const block = page.locator(".directive-webide").nth(i);

      // Der CSS-Quelltext steht im Editor, nicht im Rahmen - von dort holen
      // wir ihn und pruefen jede Deklaration einzeln.
      // innerText des Editors enthaelt auch die Zeilennummern am Rand. Der
      // reine Quelltext steht in den .cm-line-Elementen.
      const quelle = await block.evaluate((el) => {
        const lies = (klasse) => {
          const ed = el.querySelector(`.editor.${klasse}`);
          if (!ed) return null;
          return [...ed.querySelectorAll(".cm-line")]
            .map((z) => z.textContent)
            .join("\n");
        };
        return { css: lies("css") || "", html: lies("html") };
      });
      const cssQuelle = quelle.css;
      // Ein leeres html-Fence ist Absicht: Dort soll etwas hineingeschrieben
      // werden. Eine leere Vorschau ist dann kein Fehler.
      const hatHtml = quelle.html !== null && quelle.html.trim() !== "";

      const rahmen = await (await block.locator("iframe").elementHandle()).contentFrame();
      let befund;
      try {
        befund = await rahmen.evaluate((css) => {
          const meldungen = [];
          for (const bild of document.images) {
            if (!bild.complete || bild.naturalWidth === 0) {
              meldungen.push(`Bild laedt nicht: ${bild.getAttribute("src")}`);
            }
          }
          // Deklarationen aus dem Quelltext einzeln pruefen.
          const ohneKommentare = css.replace(/\/\*[\s\S]*?\*\//g, "");
          for (const block of ohneKommentare.split("}")) {
            const teil = block.split("{")[1];
            if (!teil) continue;
            for (const decl of teil.split(";")) {
              const doppelpunkt = decl.indexOf(":");
              if (doppelpunkt < 0) continue;
              const eigenschaft = decl.slice(0, doppelpunkt).trim();
              const wert = decl.slice(doppelpunkt + 1).trim();
              if (!eigenschaft || !wert) continue;
              if (!CSS.supports(eigenschaft, wert)) {
                meldungen.push(`CSS verworfen: ${eigenschaft}: ${wert}`);
              }
            }
          }
          for (const sheet of document.styleSheets) {
            let regeln;
            try {
              regeln = [...sheet.cssRules];
            } catch (e) {
              continue;
            }
            for (const regel of regeln) {
              if (regel.style && regel.style.length === 0 && regel.selectorText) {
                meldungen.push(`Regel ohne Deklaration: ${regel.selectorText}`);
              }
            }
          }
          return {
            meldungen,
            leer: document.body.innerText.trim() === "" && document.images.length === 0,
          };
        }, cssQuelle);
      } catch (e) {
        befund = { meldungen: [`Vorschau nicht lesbar: ${e.message}`], leer: false };
      }

      if (hatHtml && befund.leer) {
        befund.meldungen.push("Vorschau ist leer, obwohl der Block HTML enthaelt");
      }
      if (befund.meldungen.length) {
        fehlerhaft++;
        console.log(`FEHLER  ${seite}  Block ${i}`);
        for (const m of befund.meldungen.slice(0, 6)) console.log(`        ${m}`);
      }
    }
  }

  await browser.close();
  console.log(`\n${seiten.length} Seiten, ${bloeckeGesamt} Bloecke geprueft.`);
  if (fehlerhaft) {
    console.log(`${fehlerhaft} Block/Bloecke mit Problemen.`);
    process.exit(1);
  }
  console.log("Keine Probleme.");
})();
