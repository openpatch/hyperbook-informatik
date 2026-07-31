// Extrahiert die Java-Klassenbibliothek der Online-IDE aus dem gebauten Bundle.
const fs = require("fs");

const BUNDLE =
  "/home/mike/Sources/openpatch/hyperbook-informatik/.hyperbook/out/__hyperbook_assets/directive-onlineide/include/online-ide-embedded.js";
const src = fs.readFileSync(BUNDLE, "utf8");

// Alle __javaDeclarations-Bloecke einsammeln: [{type:"declaration",signature:"..."},{type:"method",...}]
const entries = [];
const re = /type:"(declaration|method|field)",signature:"((?:[^"\\]|\\.)*)"/g;
let m;
while ((m = re.exec(src)) !== null) {
  entries.push({ kind: m[1], sig: m[2].replace(/\\"/g, '"'), pos: m.index });
}

// Gruppieren: jede declaration eroeffnet eine Klasse, alle folgenden methods/fields gehoeren dazu
const classes = [];
let current = null;
for (const e of entries) {
  if (e.kind === "declaration") {
    current = { decl: e.sig, members: [] };
    classes.push(current);
  } else if (current) {
    current.members.push(e.kind === "field" ? "[F] " + e.sig : e.sig);
  }
}

const wanted = process.argv.slice(2);
for (const c of classes) {
  if (wanted.length && !wanted.some((w) => c.decl.includes(w))) continue;
  console.log("\n### " + c.decl);
  for (const s of c.members) console.log("  " + s);
}
if (!wanted.length) console.log("\n// " + classes.length + " Deklarationen");
