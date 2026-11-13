// Containerterminal: Container mit dem Kran zwischen Stapeln umsetzen und auf
// wartende Lkw verladen. Jede Kranbewegung kostet. Die Lernenden planen so
// eine Strategie, bevor sie sie programmieren.
//
// Über den Stapeln fährt ein Portalkran; der angehobene Container hängt am
// Haken. Rechts wartet der Lkw auf seinen Container, fährt nach dem Verladen
// ab, und der nächste rollt heran.
//
// Attribute:
//   stapel   "0815,4711,2001 | 1234,3003 | 5005"  Stapel 1 bis 3, jeweils unten -> oben
//   auftrag  "4711,1234,0815"                      Reihenfolge der wartenden Lkw
//   hoehe    4                                     höchstens so viele Container je Stapel
//   bestwert 160                                   (optional) günstigste mögliche Kosten
//   id       …                                     (optional) speichert das beste Ergebnis
//   abspielen                                      (optional) Eingabefeld für Kranbefehle aus Java,
//            z. B. "Kranbefehle: umsetzen(1,3); verladen(1)" – Stapel 1 bis 3, 0 = Freifläche
//   eigene                                         (optional) Lernende stellen eine eigene Startaufstellung
//            und Lkw-Reihenfolge ein; das Element zeigt den passenden Java-Code zum Aufbauen
//            des Terminals und berechnet die günstigsten Kosten selbst.
//
// Steht ein Container des Auftrags nicht im Terminal, fährt sein Lkw leer ab –
// wie in Java, wo hole() dann nichts verlädt.
//
// Preise wie in der Klasse Terminal der Hyperbook-Seite: verladen 20 Euro,
// umsetzen 50 Euro, von oder auf die Freifläche 80 Euro.

const PREIS_VERLADEN = 20;
const PREIS_UMSETZEN = 50;
const PREIS_FREIFLAECHE = 80;
const FREI = 3; // Index der Freifläche
const LKW = 4; // Position des Krans über der Lkw-Spur
const SEIL_LEER = 44; // Seillänge in Ruhe ohne Last (px)
const SEIL_LAST = 30; // Seillänge in Ruhe mit Container
const NUMMER = /^[A-Za-z0-9]{1,6}$/; // erlaubte Containernummern in eigenen Aufstellungen
const SUCHGRENZE = 60000; // so viele Zustände untersucht die Suche nach dem günstigsten Ablauf höchstens

const esc = (t) => String(t).replace(/[&<>"']/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[z]);

// Günstigste Kosten für einen Auftrag (A*-Suche). stapel: Stapel 1 bis 3 und
// Freifläche als Arrays unten -> oben. Liefert null, wenn die Suche zu groß wird.
// Die Stapel 1 bis 3 sind gleichwertig, deshalb zählen Zustände, die sich nur in
// der Reihenfolge dieser Stapel unterscheiden, als gleich.
function guenstigsteKosten(stapel, auftrag, hoehe) {
  const imTerminal = new Set(stapel.flat());
  const a = auftrag.filter((c) => imTerminal.has(c));
  const schaetzung = (s, k) => {
    if (k >= a.length) return 0;
    let darueber = 0;
    for (const st of s) {
      const p = st.indexOf(a[k]);
      if (p >= 0) darueber = st.length - 1 - p;
    }
    return PREIS_VERLADEN * (a.length - k) + PREIS_UMSETZEN * darueber;
  };
  const schluessel = (s, k) => s.slice(0, 3).map((st) => st.join(",")).sort().join("|") + "|" + s[3].join(",") + "#" + k;

  // Binärer Min-Heap nach f = g + h.
  const heap = [];
  const rein = (e) => {
    heap.push(e);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p].f <= heap[i].f) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const raus = () => {
    const oben = heap[0];
    const letztes = heap.pop();
    if (heap.length > 0) {
      heap[0] = letztes;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < heap.length && heap[l].f < heap[m].f) m = l;
        if (r < heap.length && heap[r].f < heap[m].f) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return oben;
  };

  const start = stapel.map((st) => st.slice());
  rein({ s: start, k: 0, g: 0, f: schaetzung(start, 0) });
  const erledigt = new Set();
  while (heap.length > 0) {
    const { s, k, g } = raus();
    if (k >= a.length) return g;
    const key = schluessel(s, k);
    if (erledigt.has(key)) continue;
    erledigt.add(key);
    if (erledigt.size > SUCHGRENZE) return null;
    // Steht der gesuchte Container oben, ist Verladen immer der beste Zug.
    const quelle = s.findIndex((st) => st[st.length - 1] === a[k]);
    if (quelle >= 0) {
      const n = s.map((st) => st.slice());
      n[quelle].pop();
      rein({ s: n, k: k + 1, g: g + PREIS_VERLADEN, f: g + PREIS_VERLADEN + schaetzung(n, k + 1) });
      continue;
    }
    for (let von = 0; von < 4; von++) {
      if (s[von].length === 0) continue;
      for (let nach = 0; nach < 4; nach++) {
        if (nach === von || (nach !== FREI && s[nach].length >= hoehe)) continue;
        const n = s.map((st) => st.slice());
        n[nach].push(n[von].pop());
        const preis = von === FREI || nach === FREI ? PREIS_FREIFLAECHE : PREIS_UMSETZEN;
        rein({ s: n, k, g: g + preis, f: g + preis + schaetzung(n, k) });
      }
    }
  }
  return null;
}

class OopContainerterminal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.bestes = null;
    this.kranX = null; // zuletzt gezeichnete Position der Laufkatze in px
    this.beschaeftigt = false; // während der Kran arbeitet, zählen keine Klicks
    this.lastBreite = null; // Breite eines Containers in px, für die Last am Haken
    this.befehlsText = "";
    this.tempo = 1; // Faktor für die Animationsdauer beim Abspielen
    this.eigene = null; // eigene Startaufstellung {stapel, auftrag} oder null
    this.entwurf = null; // Inhalt der Eingabefelder für die eigene Aufstellung
    this.eigeneOffen = false;
    this.eigeneMeldung = null;
    this.kopiert = false;
  }

  async connectedCallback() {
    this.hoehe = parseInt(this.getAttribute("hoehe") || "4", 10);
    this.abspielModus = this.hasAttribute("abspielen");
    this.eigeneModus = this.hasAttribute("eigene");
    const liste = (t) => (t || "").split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    const teile = (this.getAttribute("stapel") || "").split("|");
    this.original = {
      stapel: [0, 1, 2].map((i) => liste(teile[i])),
      auftrag: liste(this.getAttribute("auftrag")),
      bestwert: this.hasAttribute("bestwert") ? parseInt(this.getAttribute("bestwert"), 10) : null,
    };
    this.aufstellen(this.original);
    this.neuStarten(false);
    await this.ladeZustand();
    this.neuStarten(false);
    this.render();
    // Nach einer Größenänderung die Laufkatze ohne Animation neu ausrichten.
    this.beobachter = new ResizeObserver(() => this.kranSetzen());
    this.beobachter.observe(this);
  }

  disconnectedCallback() {
    if (this.beobachter) this.beobachter.disconnect();
  }

  // --- Zustand -----------------------------------------------------------

  // Übernimmt eine Aufstellung {stapel: [3 Arrays], auftrag, bestwert}.
  aufstellen(a) {
    this.startStapel = a.stapel.map((s) => s.slice());
    this.startStapel.push([]);
    this.auftrag = a.auftrag.slice();
    this.bestwert = a.bestwert;
    const imTerminal = new Set(this.startStapel.flat());
    this.fehlend = new Set(this.auftrag.filter((c) => !imTerminal.has(c)));
  }

  // Lkw, deren Container nicht im Terminal steht, fahren leer ab.
  ueberspringen() {
    while (!this.fertig() && this.fehlend.has(this.auftrag[this.erledigt])) this.erledigt++;
  }

  neuStarten(zeichnen = true) {
    this.stapel = this.startStapel.map((s) => s.slice());
    this.erledigt = 0;
    this.kosten = 0;
    this.protokoll = [];
    this.verlauf = []; // für „Rückgängig“ – natürlich ein Stapel
    this.auswahl = null;
    this.meldung = null;
    this.kranPos = 1;
    this.abfahrt = null;
    this.ueberspringen();
    if (zeichnen) this.render();
  }

  sichern() {
    this.verlauf.push({
      stapel: this.stapel.map((s) => s.slice()),
      erledigt: this.erledigt,
      kosten: this.kosten,
      protokoll: this.protokoll.slice(),
      kranPos: this.kranPos,
    });
  }

  rueckgaengig() {
    if (this.verlauf.length === 0 || this.beschaeftigt) return;
    const z = this.verlauf.pop();
    this.stapel = z.stapel;
    this.erledigt = z.erledigt;
    this.kosten = z.kosten;
    this.protokoll = z.protokoll;
    this.kranPos = z.kranPos;
    this.auswahl = null;
    this.meldung = null;
    this.render();
  }

  name(i) {
    return i === FREI ? "Freifläche" : `Stapel ${i + 1}`;
  }

  fertig() {
    return this.erledigt >= this.auftrag.length;
  }

  oben(i) {
    return this.stapel[i][this.stapel[i].length - 1];
  }

  // --- Kranbewegungen ----------------------------------------------------

  async klickStapel(i) {
    if (this.fertig() || this.beschaeftigt) return;
    this.meldung = null;
    if (this.auswahl === null) {
      if (this.stapel[i].length === 0) {
        this.meldung = { art: "fehler", text: i === FREI ? "Auf der Freifläche steht kein Container." : `Auf ${this.name(i)} steht kein Container.` };
        this.render();
        return;
      }
      await this.arbeite(() => this.anheben(i));
    } else if (this.auswahl === i) {
      await this.arbeite(() => this.absetzen(i, () => { this.auswahl = null; }));
    } else if (i !== FREI && this.stapel[i].length >= this.hoehe) {
      this.meldung = { art: "fehler", text: `${this.name(i)} ist voll – höchstens ${this.hoehe} Container.` };
      this.render();
    } else {
      const von = this.auswahl;
      await this.arbeite(() => this.absetzen(i, () => this.umsetzen(von, i)));
    }
  }

  // Führt einen Kranablauf aus und sperrt solange weitere Klicks.
  async arbeite(ablauf) {
    this.beschaeftigt = true;
    try {
      await ablauf();
    } finally {
      this.beschaeftigt = false;
    }
  }

  // Laufkatze fährt hin, Seil senkt sich, Container hängt sich an, Seil zieht hoch.
  async anheben(i) {
    const spalte = this.shadowRoot.querySelector(`.spalte[data-i="${i}"]`);
    const oberste = spalte.querySelector(".box:not(.leer)");
    await this.fahreZu(spalte);
    const l = this.lage(oberste);
    await this.senkeAuf(l.y);
    this.lastBreite = l.w;
    const last = document.createElement("div");
    last.className = oberste.className;
    last.textContent = oberste.textContent;
    last.style.width = `${l.w}px`;
    this.shadowRoot.querySelector(".katze").appendChild(last);
    oberste.className = "box leer";
    oberste.textContent = "";
    await this.seilAuf(SEIL_LAST);
    this.auswahl = i;
    this.kranPos = i;
    this.render();
  }

  // Laufkatze fährt mit der Last zur Spalte nach, senkt den Container auf den
  // freien Platz, übernimmt den neuen Zustand und zieht den leeren Haken hoch.
  async absetzen(nach, uebernehmen) {
    const spalte = this.shadowRoot.querySelector(`.spalte[data-i="${nach}"]`);
    const plaetze = spalte.querySelectorAll(".plaetze .box");
    const belegt = spalte.querySelectorAll(".plaetze .box:not(.leer)").length;
    const platz = plaetze[plaetze.length - 1 - belegt];
    await this.fahreZu(spalte);
    await this.senkeAuf(this.lage(platz).y);
    uebernehmen();
    await this.leerHoch();
  }

  umsetzen(von, nach) {
    this.sichern();
    const c = this.stapel[von].pop();
    this.stapel[nach].push(c);
    const preis = von === FREI || nach === FREI ? PREIS_FREIFLAECHE : PREIS_UMSETZEN;
    this.kosten += preis;
    this.protokoll.push({ text: `${c}: ${this.name(von)} → ${this.name(nach)}`, preis });
    this.auswahl = null;
    this.kranPos = nach;
  }

  async verladen() {
    if (this.auswahl === null || this.fertig() || this.beschaeftigt) return;
    const c = this.oben(this.auswahl);
    const gesucht = this.auftrag[this.erledigt];
    if (c !== gesucht) {
      this.meldung = { art: "fehler", text: `Der Lkw wartet auf ${gesucht}, nicht auf ${c}.` };
      this.render();
      return;
    }
    await this.arbeite(() => this.aufLkw());
  }

  // Laufkatze fährt mit der Last zum Lkw, senkt sie auf die Ladefläche,
  // der Lkw fährt ab, der leere Haken geht hoch.
  async aufLkw() {
    const i = this.auswahl;
    const c = this.oben(i);
    const spur = this.shadowRoot.querySelector(".lkw-spur");
    const bild = spur.querySelector(".lkw:not(.faehrt-ab) .lkw-bild");
    await this.fahreZu(spur);
    const l = this.lage(bild);
    await this.senkeAuf(l.y + l.h * (6 / 52)); // Oberkante der Ladefläche im SVG
    this.sichern();
    this.stapel[i].pop();
    this.erledigt++;
    this.ueberspringen();
    this.kosten += PREIS_VERLADEN;
    this.protokoll.push({ text: `${c}: ${this.name(i)} → Lkw`, preis: PREIS_VERLADEN });
    this.auswahl = null;
    this.kranPos = LKW;
    this.abfahrt = c;
    this.meldung = null;
    if (this.fertig() && !this.abspielend) this.auswerten();
    await this.leerHoch();
    this.abfahrt = null; // die Abfahrt wird nur einmal gezeigt
  }

  // --- Abspielen ---------------------------------------------------------

  // "Kranbefehle: umsetzen(1,3); verladen(1)" -> [{art, von, nach}], Stapel als Index.
  // In Java sind die Stapel 1 bis 3 und die Freifläche 0.
  zerlege(text) {
    const index = (n) => (n === 0 ? FREI : n - 1);
    const rumpf = text.replace(/^\s*Kranbefehle:\s*/i, "");
    const befehle = [];
    const teile = rumpf.split(";").map((t) => t.trim()).filter((t) => t.length > 0);
    for (let k = 0; k < teile.length; k++) {
      const u = teile[k].match(/^umsetzen\(\s*([0-3])\s*,\s*([0-3])\s*\)$/);
      const v = teile[k].match(/^verladen\(\s*([0-3])\s*\)$/);
      if (u) befehle.push({ art: "umsetzen", von: index(+u[1]), nach: index(+u[2]), text: teile[k] });
      else if (v) befehle.push({ art: "verladen", von: index(+v[1]), text: teile[k] });
      else return { fehler: `Befehl ${k + 1} verstehe ich nicht: „${teile[k]}“` };
    }
    if (befehle.length === 0) return { fehler: "Füge zuerst die Zeile „Kranbefehle: …“ aus der Ausgabe ein." };
    return { befehle };
  }

  // Spielt die Befehle mit denselben Kranabläufen ab wie beim Klicken.
  // Ein unmöglicher Befehl beendet das Abspielen mit einer Meldung.
  async abspielen() {
    if (this.beschaeftigt) return;
    const feld = this.shadowRoot.querySelector(".befehle");
    this.befehlsText = feld.value;
    const z = this.zerlege(this.befehlsText);
    this.neuStarten();
    if (z.fehler) {
      this.meldung = { art: "fehler", text: z.fehler };
      this.render();
      return;
    }
    this.abspielend = true;
    await this.arbeite(async () => {
      for (let k = 0; k < z.befehle.length; k++) {
        const b = z.befehle[k];
        const nr = `Befehl ${k + 1} (${b.text})`;
        this.laufend = `Befehl ${k + 1} von ${z.befehle.length}: ${b.text}`;
        if (b.art === "verladen" && this.fertig()) {
          this.melde(`${nr}: Alle Lkw sind schon abgefertigt.`);
          return;
        }
        if (this.stapel[b.von].length === 0) {
          this.melde(`${nr}: Auf ${this.name(b.von)} steht kein Container.`);
          return;
        }
        if (b.art === "umsetzen") {
          if (b.von === b.nach) {
            this.melde(`${nr}: Start und Ziel sind gleich.`);
            return;
          }
          if (b.nach !== FREI && this.stapel[b.nach].length >= this.hoehe) {
            this.melde(`${nr}: ${this.name(b.nach)} ist voll.`);
            return;
          }
          await this.anheben(b.von);
          await this.absetzen(b.nach, () => this.umsetzen(b.von, b.nach));
        } else {
          const gesucht = this.auftrag[this.erledigt];
          if (this.oben(b.von) !== gesucht) {
            this.melde(`${nr}: Der Lkw wartet auf ${gesucht}, nicht auf ${this.oben(b.von)}.`);
            return;
          }
          await this.anheben(b.von);
          await this.aufLkw();
        }
      }
      if (this.fertig()) {
        this.auswerten();
        this.render();
      } else {
        this.melde(`Die Befehle sind abgespielt, aber es warten noch Lkw: ${this.auftrag.slice(this.erledigt).join(", ")}.`);
      }
    }).finally(() => {
      this.abspielend = false;
      this.laufend = null;
      this.render();
    });
  }

  melde(text) {
    this.meldung = { art: "fehler", text };
    this.render();
  }

  // Zeichnet den neuen Zustand mit dem Haken noch unten und zieht ihn leer hoch.
  async leerHoch() {
    const unten = this.shadowRoot.querySelector(".seil").offsetHeight;
    this.render();
    this.shadowRoot.querySelector(".seil").style.height = `${unten}px`;
    await this.seilAuf(SEIL_LEER);
  }

  auswerten() {
    if (!this.eigene && (this.bestes === null || this.kosten < this.bestes)) {
      this.bestes = this.kosten;
      this.speichereZustand();
    }
    let text = `Auftrag erledigt: ${this.kosten} Euro.`;
    let art = "info";
    if (this.bestwert !== null) {
      if (this.kosten <= this.bestwert) {
        text += " Günstiger geht es nicht!";
        art = "ok";
      } else {
        text += " Es geht noch günstiger – wo hat der Kran mehr bewegt als nötig?";
      }
    }
    this.meldung = { art, text };
  }

  // --- Speichern ---------------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (!daten) return;
      const p = JSON.parse(daten.payload);
      this.bestes = p.bestes ?? null;
      if (this.eigeneModus && p.eigene) {
        const z = this.pruefen({ stapel: p.eigene.stapel.map((s) => s.join(", ")), auftrag: p.eigene.auftrag.join(", ") });
        if (!z.fehler) this.eigeneSetzen(z);
      }
    } catch (fehler) {
      console.error("Zustand von oop-containerterminal konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const eigene = this.eigene ? { stapel: this.eigene.stapel, auftrag: this.eigene.auftrag } : null;
      await store.custom.put({ id, payload: JSON.stringify({ bestes: this.bestes, eigene }) });
    } catch (fehler) {
      console.error("Zustand von oop-containerterminal konnte nicht gespeichert werden:", fehler);
    }
  }

  // --- Eigene Aufstellung -------------------------------------------------

  entwurfAus(a) {
    return { stapel: a.stapel.map((s) => s.join(", ")), auftrag: a.auftrag.join(", ") };
  }

  // Prüft einen Entwurf aus Texten. Liefert {stapel, auftrag, hinweise} oder {fehler}.
  pruefen(entwurf) {
    const liste = (t) => t.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    const stapel = entwurf.stapel.map(liste);
    const auftrag = liste(entwurf.auftrag);
    const alle = stapel.flat().concat(auftrag);
    const falsch = alle.find((c) => !NUMMER.test(c));
    if (falsch !== undefined) {
      return { fehler: `„${esc(falsch)}“ ist keine gültige Containernummer: höchstens 6 Buchstaben oder Ziffern, getrennt durch Kommas.` };
    }
    for (let i = 0; i < 3; i++) {
      if (stapel[i].length > this.hoehe) {
        return { fehler: `Auf Stapel ${i + 1} stehen ${stapel[i].length} Container – höchstens ${this.hoehe}.` };
      }
    }
    const gesehen = new Set();
    for (const c of stapel.flat()) {
      if (gesehen.has(c)) return { fehler: `${c} steht zweimal im Terminal – jede Nummer gibt es nur einmal.` };
      gesehen.add(c);
    }
    if (auftrag.length === 0) return { fehler: "Trage ein, welche Container die Lkw abholen." };
    const geholt = new Set();
    for (const c of auftrag) {
      if (geholt.has(c)) return { fehler: `${c} wird zweimal abgeholt – jeder Container fährt nur einmal weg.` };
      geholt.add(c);
    }
    const hinweise = auftrag.filter((c) => !gesehen.has(c))
      .map((c) => `${c} steht nicht im Terminal: Dieser Lkw fährt leer ab.`);
    return { stapel, auftrag, hinweise };
  }

  eigeneSetzen(z) {
    const bestwert = guenstigsteKosten(z.stapel.concat([[]]), z.auftrag, this.hoehe);
    this.eigene = { stapel: z.stapel, auftrag: z.auftrag, bestwert };
    this.aufstellen(this.eigene);
    const zeilen = z.hinweise.slice();
    if (bestwert === null) {
      zeilen.push("Die günstigsten Kosten konnten nicht berechnet werden – die Aufstellung ist zu groß.");
    } else {
      zeilen.push(`Günstigster Ablauf: ${bestwert} Euro.`);
    }
    this.eigeneMeldung = { art: "info", text: "Aufstellung übernommen. " + zeilen.join(" ") };
  }

  uebernehmen() {
    if (this.beschaeftigt) return;
    const z = this.pruefen(this.entwurf);
    if (z.fehler) {
      this.eigeneMeldung = { art: "fehler", text: z.fehler };
      this.render();
      return;
    }
    this.eigeneSetzen(z);
    this.speichereZustand();
    this.neuStarten();
  }

  zurueckZumOriginal() {
    if (this.beschaeftigt) return;
    this.eigene = null;
    this.aufstellen(this.original);
    this.entwurf = this.entwurfAus(this.original);
    this.eigeneMeldung = null;
    this.speichereZustand();
    this.neuStarten();
  }

  // Java-Code, der dieselbe Aufstellung im Terminal aufbaut.
  javaCode() {
    const abholung = (c) => this.auftrag.indexOf(c) + 1;
    const zeilen = [
      "// Eigener Testfall – aufbauen(Stapel, Nummer, Abholung), 0 = bleibt im Terminal",
      `String[] meinAuftrag = {${this.auftrag.map((c) => `"${c}"`).join(", ")}};`,
      "Terminal t = new Terminal();",
      "t.leeren();",
    ];
    for (let i = 0; i < 3; i++) {
      for (const c of this.startStapel[i]) zeilen.push(`t.aufbauen(${i + 1}, "${c}", ${abholung(c)});`);
    }
    zeilen.push(
      "Disponent d = new Disponent(t);",
      "for (int i = 0; i < meinAuftrag.length; i++) {",
      "    d.holeVorausschauend(meinAuftrag[i]); // oder holeMitFreiflaeche, holeMitNachbar",
      "}",
      "IO.println(t.bericht());",
      "IO.println(t.getKranbefehle());"
    );
    return zeilen.join("\n");
  }

  async kopieren() {
    try {
      await navigator.clipboard.writeText(this.javaCode());
      this.kopiert = true;
    } catch (fehler) {
      const pre = this.shadowRoot.querySelector(".java pre");
      const r = document.createRange();
      r.selectNodeContents(pre);
      const auswahl = this.shadowRoot.getSelection ? this.shadowRoot.getSelection() : window.getSelection();
      auswahl.removeAllRanges();
      auswahl.addRange(r);
      return;
    }
    this.render();
    setTimeout(() => {
      this.kopiert = false;
      if (!this.beschaeftigt) this.render();
    }, 1500);
  }

  eigeneHtml() {
    if (!this.entwurf) this.entwurf = this.entwurfAus(this.eigene || this.original);
    const feld = (label, key, wert, platzhalter) => `
      <label>${label}
        <input type="text" data-feld="${key}" value="${esc(wert)}" placeholder="${platzhalter}" spellcheck="false" autocomplete="off">
      </label>`;
    const m = this.eigeneMeldung;
    return `
      <details class="eigene" ${this.eigeneOffen ? "open" : ""}>
        <summary>Eigene Startaufstellung${this.eigene ? " <b>(aktiv)</b>" : ""}</summary>
        <p class="klein">Trage die Container von <b>unten nach oben</b> ein, getrennt durch Kommas – höchstens ${this.hoehe} je Stapel.
        So testest du deine Strategie an Fällen, die du dir selbst ausdenkst: ein voller Stapel, ein Container, der schon oben steht, einer, den es gar nicht gibt …</p>
        <div class="felder">
          ${feld("Stapel 1", "0", this.entwurf.stapel[0], "z. B. 0815, 4711")}
          ${feld("Stapel 2", "1", this.entwurf.stapel[1], "unten, …, oben")}
          ${feld("Stapel 3", "2", this.entwurf.stapel[2], "leer lassen = leerer Stapel")}
          ${feld("Die Lkw holen nacheinander ab", "auftrag", this.entwurf.auftrag, "z. B. 4711, 0815")}
        </div>
        <div class="aktionen">
          <button class="btn haupt btn-uebernehmen" ${this.beschaeftigt ? "disabled" : ""}>Übernehmen</button>
          <button class="btn btn-original" ${this.eigene && !this.beschaeftigt ? "" : "disabled"}>Zurück zur Aufstellung der Aufgabe</button>
        </div>
        ${m ? `<div class="rueckmeldung ${m.art}">${m.text}</div>` : ""}
        <div class="java">
          <div class="klein">Dieselbe Aufstellung in Java – füge den Code am Ende von <code>main</code> ein:</div>
          <pre>${esc(this.javaCode())}</pre>
          <button class="btn btn-kopieren">${this.kopiert ? "Kopiert ✓" : "Code kopieren"}</button>
        </div>
      </details>`;
  }

  // --- Kran ----------------------------------------------------------------

  dauer(ms) {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms * this.tempo;
  }

  // Lage eines Elements relativ zur Innenkante der Bühne.
  lage(el) {
    const buehne = this.shadowRoot.querySelector(".buehne");
    const b = buehne.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    return { x: e.left - b.left - buehne.clientLeft, y: e.top - b.top - buehne.clientTop, w: e.width, h: e.height };
  }

  zielX(el) {
    const katze = this.shadowRoot.querySelector(".katze");
    const l = this.lage(el);
    return l.x + l.w / 2 - katze.offsetWidth / 2;
  }

  // Stellt die Laufkatze ohne Animation über die Spalte kranPos.
  // Während eines Ablaufs bleibt sie dort, wo die Animation sie hingefahren hat.
  kranSetzen() {
    const katze = this.shadowRoot.querySelector(".katze");
    const ziel = this.shadowRoot.querySelector(`[data-pos="${this.kranPos}"]`);
    if (!katze) return;
    if (!this.beschaeftigt && ziel) this.kranX = this.zielX(ziel);
    if (this.kranX !== null) katze.style.transform = `translateX(${this.kranX}px)`;
  }

  async fahreZu(ziel) {
    const katze = this.shadowRoot.querySelector(".katze");
    const x = this.zielX(ziel);
    const von = this.kranX === null ? x : this.kranX;
    const d = this.dauer(Math.min(900, 250 + Math.abs(x - von) * 1.3));
    if (d > 0 && von !== x) {
      await katze.animate(
        [{ transform: `translateX(${von}px)` }, { transform: `translateX(${x}px)` }],
        { duration: d, easing: "ease-in-out" }
      ).finished;
    }
    katze.style.transform = `translateX(${x}px)`;
    this.kranX = x;
  }

  async seilAuf(h) {
    const seil = this.shadowRoot.querySelector(".seil");
    const von = seil.offsetHeight;
    const d = this.dauer(150 + Math.abs(h - von) * 2.5);
    if (d > 0 && von !== h) {
      await seil.animate([{ height: `${von}px` }, { height: `${h}px` }], { duration: d, easing: "ease-in-out" }).finished;
    }
    seil.style.height = `${h}px`;
  }

  // Senkt den Haken so weit, dass eine Last am Haken mit ihrer Oberkante auf y steht
  // (ohne Last greift der Haken an der Oberkante eines Containers bei y).
  async senkeAuf(y) {
    const seil = this.shadowRoot.querySelector(".seil");
    const haken = this.shadowRoot.querySelector(".haken");
    const l = this.lage(haken);
    await this.seilAuf(seil.offsetHeight + (y + 2 - (l.y + l.h)));
  }

  // --- Darstellung -------------------------------------------------------

  lkwSvg(ladung, schild) {
    const container = ladung
      ? `<rect x="6" y="6" width="64" height="26" rx="2" class="ladung"/>
         <text x="38" y="23.5" text-anchor="middle" class="ladung-text">${ladung}</text>`
      : "";
    const tafel = schild
      ? `<rect x="10" y="12" width="56" height="16" rx="3" class="schild"/>
         <text x="38" y="24" text-anchor="middle" class="schild-text">${schild}</text>`
      : "";
    return `
      <svg viewBox="0 0 112 52" class="lkw-bild" aria-hidden="true">
        <rect x="2" y="32" width="74" height="6" class="rahmen"/>
        ${container}${tafel}
        <path d="M78 14 h18 l12 12 v12 h-30 z" class="kabine"/>
        <path d="M82 18 h12 l8 8 h-20 z" class="fenster"/>
        <circle cx="16" cy="42" r="6" class="rad"/>
        <circle cx="34" cy="42" r="6" class="rad"/>
        <circle cx="96" cy="42" r="6" class="rad"/>
      </svg>`;
  }

  render() {
    const gesucht = this.fertig() ? null : this.auftrag[this.erledigt];
    const haken = this.auswahl === null ? null : this.oben(this.auswahl);

    const spalte = (i) => {
      const s = this.stapel[i];
      // Der Container am Haken steht nicht mehr im Stapel.
      const sichtbar = this.auswahl === i ? s.slice(0, -1) : s;
      // Die Freifläche hat immer einen freien Platz mehr, als belegt ist.
      const plaetze = i === FREI ? Math.max(this.hoehe, s.length + 1) : this.hoehe;
      let html = "";
      for (let p = plaetze - 1; p >= 0; p--) {
        if (p < sichtbar.length) {
          const klasse = sichtbar[p] === gesucht ? "box gesucht" : "box";
          html += `<div class="${klasse}">${sichtbar[p]}</div>`;
        } else {
          html += `<div class="box leer"></div>`;
        }
      }
      const voll = i !== FREI && s.length >= this.hoehe;
      return `
        <button class="spalte ${i === FREI ? "frei" : ""} ${this.auswahl === i ? "aktiv" : ""}"
                data-i="${i}" data-pos="${i}" ${this.fertig() ? "disabled" : ""}
                aria-label="${this.name(i)}, ${s.length} Container${s.length ? ", oben " + this.oben(i) : ""}">
          <div class="plaetze">${html}</div>
          <div class="boden"></div>
          <div class="beschriftung">${this.name(i)}${voll ? " · voll" : ""}</div>
        </button>`;
    };

    // Lkw-Spur: abfahrender Lkw (mit Ladung) und der wartende Lkw mit Schild.
    let spur = "";
    if (this.abfahrt) {
      spur += `<div class="lkw faehrt-ab">${this.lkwSvg(this.abfahrt, null)}</div>`;
    }
    if (gesucht) {
      spur += `<div class="lkw ${this.abfahrt ? "kommt" : ""}">${this.lkwSvg(null, gesucht)}</div>`;
    } else if (!this.abfahrt) {
      spur += `<div class="alle-weg">Alle Lkw abgefertigt ✓</div>`;
    }
    const lkwSpalte = `
      <button class="spalte lkw-spur" data-pos="${LKW}" ${this.fertig() ? "disabled" : ""}
              aria-label="${gesucht ? "Lkw wartet auf " + gesucht : "Alle Lkw abgefertigt"}">
        <div class="spur">${spur}</div>
        <div class="boden strasse"></div>
        <div class="beschriftung">${gesucht ? `wartet auf <b>${gesucht}</b>` : "Lkw"}</div>
      </button>`;

    const warteschlange = this.auftrag.map((c, k) => {
      if (this.fehlend.has(c)) {
        return `<span class="chip fehlt" title="${c} steht nicht im Terminal – der Lkw fährt leer ab">🚚 ${c} ✗</span>`;
      }
      const klasse = k < this.erledigt ? "chip weg" : k === this.erledigt ? "chip wartet" : "chip";
      return `<span class="${klasse}">🚚 ${c}</span>`;
    }).join("");

    const hinweis = this.abspielend && this.laufend
      ? `▶ ${this.laufend}`
      : this.fertig()
      ? ""
      : haken === null
        ? "Klicke auf einen Stapel: Der Kran hebt den obersten Container an."
        : `${haken} hängt am Kran: Klicke auf einen anderen Stapel oder auf den Lkw – oder noch einmal auf ${this.name(this.auswahl)}, um ihn wieder abzusetzen.`;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; box-sizing: border-box; }
        * { box-sizing: border-box; }
        .container {
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 12px; padding: 16px;
          background: var(--color-background, white);
          color: var(--color-text, black);
          font-family: system-ui, sans-serif;
        }
        .kopf {
          display: flex; justify-content: space-between; align-items: baseline;
          flex-wrap: wrap; gap: 10px; margin-bottom: 10px;
        }
        .preise { font-size: 0.82em; opacity: 0.75; }
        .zaehler { display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.95em; }
        .zaehler strong { color: var(--color-brand, #007864); }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; font-size: 0.9em; }
        .chip {
          padding: 4px 10px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace;
        }
        .chip.wartet {
          border: 2px solid var(--color-brand, #007864); font-weight: 700;
          background: color-mix(in srgb, var(--color-brand, #007864) 14%, var(--color-background, white));
        }
        .chip.weg { opacity: 0.45; text-decoration: line-through; }
        .chip.fehlt { opacity: 0.6; border-style: dashed; }

        .rahmen-buehne { overflow-x: auto; margin-bottom: 12px; }
        .buehne {
          position: relative; min-width: 470px;
          display: grid; grid-template-columns: repeat(4, minmax(64px, 1fr)) minmax(118px, 1.5fr);
          gap: 10px; align-items: end;
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 104px 12px 12px 12px;
        }

        /* Portalkran: Träger über die ganze Breite, Laufkatze mit Seil und Haken. */
        .traeger {
          position: absolute; left: 6px; right: 6px; top: 10px; height: 10px;
          background: repeating-linear-gradient(45deg, #f2b705 0 10px, #3c3c3c 10px 20px);
          border-radius: 2px;
        }
        .stuetze { position: absolute; top: 10px; bottom: 0; width: 6px; background: #3c3c3c; opacity: 0.55; }
        .stuetze.links { left: 6px; }
        .stuetze.rechts { right: 6px; }
        .katze {
          position: absolute; top: 4px; left: 0; width: 70px;
          display: flex; flex-direction: column; align-items: center;
          z-index: 2; pointer-events: none;
        }
        .wagen { width: 40px; height: 16px; background: #3c3c3c; border-radius: 3px; }
        .seil { width: 2px; background: #3c3c3c; }
        .haken {
          width: 14px; height: 10px; border: 3px solid #3c3c3c; border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .katze .box { flex: none; max-width: none; margin-top: -2px; box-shadow: 0 6px 10px rgba(0,0,0,0.25); }

        .spalte {
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
          background: none; border: 2px solid transparent; border-radius: 8px;
          padding: 6px 4px; cursor: pointer; color: inherit; font: inherit; height: 100%;
        }
        .spalte:hover:not([disabled]) { border-color: var(--color-spacer, #a4a4a4); }
        .spalte.aktiv { border-color: var(--color-brand, #007864); }
        .spalte[disabled] { cursor: default; }
        .spalte.frei { border-left: 2px dashed var(--color-spacer, #a4a4a4); border-radius: 0 8px 8px 0; }
        .plaetze { display: flex; flex-direction: column; gap: 3px; width: 100%; align-items: center; }
        .box {
          width: 100%; max-width: 86px; height: 30px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-family: ui-monospace, monospace; font-size: 0.9em;
          background: color-mix(in srgb, #d97706 18%, var(--color-background, white));
          border: 1px solid color-mix(in srgb, #d97706 60%, var(--color-text, black));
          color: var(--color-text, black);
        }
        .box.leer { background: none; border: 1px dashed var(--color-spacer, #a4a4a4); opacity: 0.6; }
        .box.gesucht { outline: 3px solid var(--color-brand, #007864); outline-offset: -1px; font-weight: 700; }
        .boden { width: 100%; max-width: 100px; border-bottom: 3px solid var(--color-text, black); margin-top: 3px; }
        .beschriftung { font-size: 0.8em; margin-top: 4px; text-align: center; }

        /* Lkw-Spur */
        .lkw-spur { overflow: hidden; }
        .spur { position: relative; width: 100%; height: 66px; }
        .lkw { position: absolute; left: 0; right: 0; bottom: 0; }
        .lkw-bild { width: 100%; max-width: 130px; display: block; margin: 0 auto; }
        .rahmen { fill: #3c3c3c; }
        .kabine { fill: var(--color-brand, #007864); }
        .fenster { fill: #dbeafe; }
        .rad { fill: #222; stroke: #888; stroke-width: 2; }
        .ladung { fill: color-mix(in srgb, #d97706 30%, white); stroke: #9a5a06; }
        .ladung-text { font: 700 11px ui-monospace, monospace; fill: #222; }
        .schild { fill: white; stroke: var(--color-brand, #007864); stroke-width: 2; }
        .schild-text { font: 700 11px ui-monospace, monospace; fill: var(--color-brand, #007864); }
        .strasse { max-width: none; border-bottom-style: dashed; }
        .alle-weg { position: absolute; bottom: 14px; width: 100%; text-align: center; font-size: 0.85em; opacity: 0.8; }
        .faehrt-ab { animation: abfahrt 1.1s ease-in forwards; }
        .kommt { animation: ankunft 0.8s ease-out 0.5s both; }
        @keyframes abfahrt { to { transform: translateX(160%); } }
        @keyframes ankunft { from { transform: translateX(160%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .faehrt-ab { display: none; }
          .kommt { animation: none; }
        }

        .abspielen { margin-bottom: 12px; }
        .abspielen label { font-size: 0.88em; }
        .befehle {
          display: block; width: 100%; margin: 4px 0 6px 0; padding: 6px 8px;
          font: 0.85em ui-monospace, monospace; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .abspiel-leiste { display: flex; gap: 12px; align-items: center; }
        .aktionen { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; align-items: center; }
        .btn {
          padding: 7px 14px; border-radius: 6px; cursor: pointer; font: inherit;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .btn.haupt { background: var(--color-brand, #007864); color: var(--color-background, #fff); border-color: transparent; }
        .btn[disabled] { opacity: 0.45; cursor: default; }
        .hinweis { font-size: 0.85em; opacity: 0.8; margin-bottom: 8px; }
        .rueckmeldung { padding: 8px 12px; border-radius: 6px; margin-bottom: 10px; }
        .rueckmeldung.ok { background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent); }
        .rueckmeldung.fehler { background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent); }
        .rueckmeldung.info { background: var(--color-nav, #f5f5f5); }
        details { font-size: 0.88em; }
        ol { margin: 6px 0 0 0; padding-left: 1.6em; }
        li span { opacity: 0.7; }
        .eigene { margin-top: 10px; }
        .eigene summary { cursor: pointer; }
        .klein { font-size: 0.92em; opacity: 0.85; margin: 8px 0; }
        .felder { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; margin-bottom: 10px; }
        .felder label { display: flex; flex-direction: column; gap: 3px; font-size: 0.95em; }
        .felder label:last-child { grid-column: 1 / -1; }
        .felder input {
          padding: 6px 8px; border-radius: 6px; font: 0.95em ui-monospace, monospace;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .java pre {
          margin: 4px 0 8px 0; padding: 8px 10px; overflow-x: auto; border-radius: 6px;
          background: var(--color-nav, #f5f5f5); font: 0.92em ui-monospace, monospace;
        }
      </style>
      <div class="container">
        <div class="kopf">
          <div class="zaehler">
            <span>Kosten: <strong>${this.kosten} €</strong></span>
            <span>Kranbewegungen: <strong>${this.protokoll.length}</strong></span>
            ${this.eigene ? `<span>eigene Aufstellung${this.bestwert !== null ? ` · günstigster Ablauf <strong>${this.bestwert} €</strong>` : ""}</span>` : ""}
            ${this.bestes !== null && !this.eigene ? `<span>Dein Bestes: <strong>${this.bestes} €</strong></span>` : ""}
          </div>
          <div class="preise">verladen ${PREIS_VERLADEN} € · umsetzen ${PREIS_UMSETZEN} € · Freifläche ${PREIS_FREIFLAECHE} € · höchstens ${this.hoehe} je Stapel</div>
        </div>
        ${this.abspielModus ? `
        <div class="abspielen">
          <label for="befehle">Kranbefehle aus deinem Programm:</label>
          <textarea id="befehle" class="befehle" rows="2" spellcheck="false"
            placeholder="Kranbefehle: umsetzen(1,3); verladen(1); …">${this.befehlsText}</textarea>
          <div class="abspiel-leiste">
            <button class="btn haupt btn-abspielen" ${this.beschaeftigt ? "disabled" : ""}>▶ Abspielen</button>
            <label><input type="checkbox" class="schnell" ${this.tempo < 1 ? "checked" : ""}> schneller</label>
          </div>
        </div>` : ""}
        <div class="chips">${warteschlange}</div>
        <div class="rahmen-buehne">
          <div class="buehne">
            <div class="stuetze links"></div><div class="stuetze rechts"></div>
            <div class="traeger"></div>
            <div class="katze">
              <div class="wagen"></div><div class="seil" style="height: ${haken !== null ? SEIL_LAST : SEIL_LEER}px"></div><div class="haken"></div>
              ${haken !== null ? `<div class="box ${haken === gesucht ? "gesucht" : ""}" style="width: ${this.lastBreite || 66}px">${haken}</div>` : ""}
            </div>
            ${[0, 1, 2, FREI].map(spalte).join("")}
            ${lkwSpalte}
          </div>
        </div>
        <div class="hinweis">${hinweis}</div>
        <div class="aktionen">
          <button class="btn haupt btn-verladen" ${haken === null || this.abspielend ? "disabled" : ""}>🚚 Auf den Lkw</button>
          <button class="btn btn-zurueck" ${this.verlauf.length === 0 || this.abspielend ? "disabled" : ""}>↶ Rückgängig</button>
          <button class="btn btn-neu" ${this.abspielend ? "disabled" : ""}>Neu starten</button>
        </div>
        ${this.meldung ? `<div class="rueckmeldung ${this.meldung.art}">${this.meldung.text}</div>` : ""}
        <details ${this.fertig() ? "open" : ""}>
          <summary>Protokoll (${this.protokoll.length})</summary>
          <ol>${this.protokoll.map((p) => `<li>${p.text} <span>(${p.preis} €)</span></li>`).join("")}</ol>
        </details>
        ${this.eigeneModus ? this.eigeneHtml() : ""}
      </div>`;

    this.shadowRoot.querySelectorAll(".spalte[data-i]").forEach((b) =>
      b.addEventListener("click", () => this.klickStapel(parseInt(b.dataset.i, 10)))
    );
    this.shadowRoot.querySelector(".lkw-spur").addEventListener("click", () => this.verladen());
    this.shadowRoot.querySelector(".btn-verladen").addEventListener("click", () => this.verladen());
    this.shadowRoot.querySelector(".btn-zurueck").addEventListener("click", () => this.rueckgaengig());
    this.shadowRoot.querySelector(".btn-neu").addEventListener("click", () => {
      if (!this.beschaeftigt) this.neuStarten();
    });
    if (this.abspielModus) {
      const feld = this.shadowRoot.querySelector(".befehle");
      feld.addEventListener("input", () => { this.befehlsText = feld.value; });
      this.shadowRoot.querySelector(".btn-abspielen").addEventListener("click", () => this.abspielen());
      this.shadowRoot.querySelector(".schnell").addEventListener("change", (e) => {
        this.tempo = e.target.checked ? 0.4 : 1;
      });
    }
    if (this.eigeneModus) {
      const details = this.shadowRoot.querySelector(".eigene");
      details.addEventListener("toggle", () => { this.eigeneOffen = details.open; });
      this.shadowRoot.querySelectorAll(".eigene input").forEach((f) =>
        f.addEventListener("input", () => {
          if (f.dataset.feld === "auftrag") this.entwurf.auftrag = f.value;
          else this.entwurf.stapel[parseInt(f.dataset.feld, 10)] = f.value;
        })
      );
      this.shadowRoot.querySelector(".eigene .felder").addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.uebernehmen();
      });
      this.shadowRoot.querySelector(".btn-uebernehmen").addEventListener("click", () => this.uebernehmen());
      this.shadowRoot.querySelector(".btn-original").addEventListener("click", () => this.zurueckZumOriginal());
      this.shadowRoot.querySelector(".btn-kopieren").addEventListener("click", () => this.kopieren());
    }
    this.kranSetzen();
  }
}

customElements.define("oop-containerterminal", OopContainerterminal);
