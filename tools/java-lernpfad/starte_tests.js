/* Startet den Testrunner jedes onlineide-Blocks einer Seite und gibt sein
   Ergebnis aus.

   Aufruf (Dev-Server muss laufen):

       NODE_PATH=/tmp/pw/node_modules node tools/java-lernpfad/starte_tests.js <url> [blockindizes]

   Beispiel - nur der zweite Block einer Seite:

       NODE_PATH=/tmp/pw/node_modules node tools/java-lernpfad/starte_tests.js \
           http://localhost:8080/_probe/meine-probe.html 1

   Wozu: `pruefe_seiten.js` findet nur Uebersetzungsfehler. Ob eine
   **Musterloesung** die beigelegten Tests wirklich gruen macht und ob eine
   **Vorhersage** im Loesungstext stimmt, sagt nur ein Lauf. Dafuer legt man die
   Loesung mit den Tests voruebergehend in eine Seite unter `book/_probe/` und
   laesst dieses Skript darauf los.

   Die Ausgabe zeigt je Test drei Zahlen (gruen / gelb / rot) und darunter das
   Protokoll des Laeufers mit den Meldungen der fehlgeschlagenen Zusicherungen.

   Der **erste** Block einer Seite braucht manchmal einen zweiten Anlauf: Wenn
   der Testrunner beim Klick noch nicht fertig aufgebaut ist, meldet er nur
   "Klicke auf die Test-Buttons". Dann das Skript noch einmal mit der
   Blocknummer starten.

   Heisst bewusst nicht `pruefe_*`: `pruefe-alles.py` soll es nicht mitlaufen
   lassen. Es ist ein Werkzeug fuer die Arbeit an einer Lektion, keine
   Dauerpruefung - die Aufgabengeruste im Buch sind ja absichtlich rot.

   Braucht playwright-core und einen Chromium aus dem Playwright-Cache:

       mkdir -p /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright-core
       npx playwright install chromium
*/
const fs=require("fs"),path=require("path"),{chromium}=require("playwright-core");
function fc(){const c=path.join(process.env.HOME,".cache","ms-playwright");for(const k of fs.readdirSync(c).filter(n=>n.startsWith("chromium-")).sort().reverse()){const e=path.join(c,k,"chrome-linux64","chrome");if(fs.existsSync(e))return e;}throw new Error("x");}
const url=process.argv[2];
const only=process.argv[3]?process.argv[3].split(",").map(Number):null;
(async()=>{const b=await chromium.launch({executablePath:fc(),headless:true,args:["--no-sandbox","--use-gl=swiftshader","--enable-unsafe-swiftshader"]});
const p=await b.newPage({viewport:{width:1400,height:1400}});
await p.goto(url,{waitUntil:"networkidle",timeout:180000});
await p.waitForTimeout(4000);
const n=await p.locator(".java-online").count();
for(let i=0;i<n;i++){await p.locator(".java-online").nth(i).scrollIntoViewIfNeeded();await p.waitForTimeout(1500);}
await p.waitForTimeout(2000);
for(let i=0;i<n;i++){
  if(only&&!only.includes(i))continue;
  await p.locator(".java-online").nth(i).scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  const ok=await p.evaluate((idx)=>{
    const el=document.querySelectorAll(".java-online")[idx];
    const t=[...el.querySelectorAll(".jo_tabheading")].find(e=>e.innerText.trim()==="Testrunner");
    if(!t)return "kein Testrunner-Reiter";
    t.click();
    return "ok";
  },i);
  if(ok!=="ok"){console.log(`===== Block ${i}: ${ok}`);continue;}
  await p.waitForTimeout(1500);
  const gestartet=await p.evaluate((idx)=>{
    const el=document.querySelectorAll(".java-online")[idx];
    const c=el.querySelector(".jo_junitTestrunnerLeft");
    const cand=[...c.querySelectorAll("*")].filter(e=>/test-start|start-test/.test(e.className));
    if(!cand.length) return JSON.stringify([...c.querySelectorAll("[class]")].map(e=>e.className).slice(0,30));
    cand[0].click(); return true;
  },i);
  if(!gestartet){console.log(`===== Block ${i}: kein Startknopf im Testrunner`);continue;}
  await p.waitForTimeout(9000);
  const out=await p.evaluate((idx)=>{
    const el=document.querySelectorAll(".java-online")[idx];
    const l=el.querySelector(".jo_junitTestrunnerLeft");
    const r=el.querySelector(".jo_junitTestrunnerOutput")||el.querySelector(".jo_junitTestrunnerRight");
    return ((l?l.innerText:"")+"\n---\n"+(r?r.innerText:"")).trim();
  },i);
  console.log(`===== Block ${i} =====\n${out.slice(0,2500)}`);
}
await b.close();})();
