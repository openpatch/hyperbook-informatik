// Logische Schaltungen simulieren – mit Schaltzeichen nach DIN EN 60617 (Rechtecke mit
// &, ≥1, =1, 1). Eingänge werden durch Anklicken umgeschaltet, Leitungen mit Signal 1
// leuchten. Die Schaltung wird als Text beschrieben:
//
//   eingaenge="A, B"  schaltung="S = xor(A, B); C = und(A, B)"
//
// Gatter: und, oder, nicht, xor, nand, nor (und/oder/xor/nand/nor auch mit mehr als zwei
// Eingängen). Ausgänge sind die Gatter, die nicht weiterverwendet werden, oder die Liste
// in `ausgaenge`. Mit `waehlbar` werden Gatter zu Fragezeichen, deren Art die Lernenden
// selbst festlegen; `soll` gibt dann die gewünschte Wahrheitstabelle vor.
const LS_ARTEN = {
  und: { zeichen: "&", f: (xs) => xs.every(Boolean), neg: false, name: "UND" },
  oder: { zeichen: "≥1", f: (xs) => xs.some(Boolean), neg: false, name: "ODER" },
  nicht: { zeichen: "1", f: (xs) => !xs[0], neg: true, name: "NICHT" },
  xor: { zeichen: "=1", f: (xs) => xs.filter(Boolean).length % 2 === 1, neg: false, name: "XOR" },
  nand: { zeichen: "&", f: (xs) => !xs.every(Boolean), neg: true, name: "NAND" },
  nor: { zeichen: "≥1", f: (xs) => !xs.some(Boolean), neg: true, name: "NOR" },
};

class LogikSchaltung extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.werte = {};
    this.gewaehlt = {};
    this.tabellenEingabe = {};
    this.geprueft = null;
    this.fehler = "";
  }

  async connectedCallback() {
    this.eingaengeText = this.getAttribute("eingaenge") || "A, B";
    this.schaltungText = this.getAttribute("schaltung") || "Y = und(A, B)";
    this.ausgaengeText = this.getAttribute("ausgaenge") || "";
    this.waehlbarListe = (this.getAttribute("waehlbar") || "")
      .split(",").map((s) => s.trim()).filter(Boolean);
    this.artenAuswahl = (this.getAttribute("arten") || "und,oder,nicht,xor,nand,nor")
      .split(",").map((s) => s.trim().toLowerCase()).filter((a) => LS_ARTEN[a]);
    this.tabelle = (this.getAttribute("tabelle") || "aus").toLowerCase();
    this.sollText = this.getAttribute("soll") || "";
    this.editierbar = this.hasAttribute("editierbar");
    this.aufgabe = this.getAttribute("aufgabe") || "";
    await this.ladeZustand();
    this.baue();
    this.render();
  }

  // --- Zustand ------------------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const data = await store.custom.get(id);
      if (!data) return;
      const z = JSON.parse(data.payload);
      this.werte = z.werte || {};
      this.gewaehlt = z.gewaehlt || {};
      this.tabellenEingabe = z.tabellenEingabe || {};
      if (this.editierbar && z.eingaengeText) {
        this.eingaengeText = z.eingaengeText;
        this.schaltungText = z.schaltungText;
        this.ausgaengeText = z.ausgaengeText || "";
      }
    } catch (e) {
      console.error("logik-schaltung: Zustand nicht lesbar", e);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    const z = { werte: this.werte, gewaehlt: this.gewaehlt, tabellenEingabe: this.tabellenEingabe };
    if (this.editierbar) {
      Object.assign(z, {
        eingaengeText: this.eingaengeText,
        schaltungText: this.schaltungText,
        ausgaengeText: this.ausgaengeText,
      });
    }
    try {
      await store.custom.put({ id, payload: JSON.stringify(z) });
    } catch (e) {
      console.error("logik-schaltung: Zustand nicht speicherbar", e);
    }
  }

  // --- Schaltung einlesen -------------------------------------------------

  baue() {
    this.fehler = "";
    this.eingaenge = this.eingaengeText.split(",").map((s) => s.trim()).filter(Boolean);
    this.gatter = [];
    const namen = new Set(this.eingaenge);
    const zeilen = this.schaltungText.split(/[;\n]/).map((s) => s.trim()).filter(Boolean);
    for (const zeile of zeilen) {
      const m = zeile.match(/^([A-Za-z_][\wäöüÄÖÜ]*)\s*=\s*([a-zA-Z?]+)\s*\(([^)]*)\)$/);
      if (!m) {
        this.fehler = `Diese Zeile verstehe ich nicht: „${zeile}“. Schreibe zum Beispiel: Y = und(A, B)`;
        break;
      }
      const [, name, artRoh, argText] = m;
      const art = artRoh.toLowerCase();
      if (art !== "?" && !LS_ARTEN[art]) {
        this.fehler = `Unbekanntes Gatter „${artRoh}“. Erlaubt: ${Object.keys(LS_ARTEN).join(", ")}.`;
        break;
      }
      const args = argText.split(",").map((s) => s.trim()).filter(Boolean);
      for (const a of args) {
        if (!namen.has(a)) {
          this.fehler = `„${a}“ in „${zeile}“ ist weder ein Eingang noch ein Gatter weiter oben.`;
          break;
        }
      }
      if (this.fehler) break;
      if (art === "nicht" && args.length !== 1) {
        this.fehler = `Ein NICHT-Gatter hat genau einen Eingang („${zeile}“).`;
        break;
      }
      if (art !== "nicht" && art !== "?" && args.length < 2) {
        this.fehler = `Ein ${LS_ARTEN[art].name}-Gatter braucht mindestens zwei Eingänge („${zeile}“).`;
        break;
      }
      if (namen.has(name)) {
        this.fehler = `Der Name „${name}“ ist doppelt vergeben.`;
        break;
      }
      namen.add(name);
      this.gatter.push({ name, art, args, waehlbar: this.waehlbarListe.includes(name) || art === "?" });
    }
    if (this.eingaenge.length === 0) this.fehler = "Die Schaltung braucht mindestens einen Eingang.";
    if (this.eingaenge.length > 5) this.fehler = "Höchstens fünf Eingänge, sonst wird die Tabelle zu lang.";
    if (this.fehler) {
      this.gatter = [];
      this.ausgaenge = [];
      return;
    }
    const benutzt = new Set(this.gatter.flatMap((g) => g.args));
    const ausgabe = this.ausgaengeText.split(",").map((s) => s.trim()).filter(Boolean);
    this.ausgaenge = ausgabe.length
      ? ausgabe.filter((a) => namen.has(a))
      : this.gatter.filter((g) => !benutzt.has(g.name)).map((g) => g.name);
    for (const e of this.eingaenge) if (this.werte[e] === undefined) this.werte[e] = 0;
    this.soll = this.leseSoll();
    this.layout();
  }

  leseSoll() {
    // "S: 0110; C: 0001" – Zeilen der Tabelle in der Reihenfolge 00…0 bis 11…1.
    const soll = {};
    for (const teil of this.sollText.split(/[;\n]/)) {
      const m = teil.trim().match(/^([\wäöüÄÖÜ]+)\s*:\s*([01\s]+)$/);
      if (m) soll[m[1]] = m[2].replace(/\s/g, "");
    }
    return soll;
  }

  artVon(g) {
    if (!g.waehlbar) return g.art;
    return this.gewaehlt[g.name] || null;
  }

  // Werte aller Knoten für eine Belegung der Eingänge; null = unbestimmt (Gatter ohne Art).
  rechne(belegung) {
    const w = { ...belegung };
    for (const g of this.gatter) {
      const art = this.artVon(g);
      const xs = g.args.map((a) => w[a]);
      if (!art || xs.some((x) => x === null)) w[g.name] = null;
      else w[g.name] = LS_ARTEN[art].f(xs.map(Boolean)) ? 1 : 0;
    }
    return w;
  }

  belegungen() {
    const n = this.eingaenge.length;
    const zeilen = [];
    for (let k = 0; k < 2 ** n; k++) {
      const b = {};
      this.eingaenge.forEach((e, i) => (b[e] = (k >> (n - 1 - i)) & 1));
      zeilen.push(b);
    }
    return zeilen;
  }

  // --- Layout -------------------------------------------------------------

  layout() {
    const tiefe = {};
    this.eingaenge.forEach((e) => (tiefe[e] = 0));
    for (const g of this.gatter) tiefe[g.name] = 1 + Math.max(...g.args.map((a) => tiefe[a]));
    this.maxTiefe = Math.max(0, ...this.gatter.map((g) => tiefe[g.name]));
    this.tiefe = tiefe;

    const rand = 50 + 11 * Math.max(1, ...this.eingaenge.map((e) => e.length));
    const spalteX = (t) => rand + t * 150;
    const pos = {};
    const abstand = 78;
    // Eingänge gleichmäßig verteilen.
    const hoeheEingaenge = Math.max(1, this.eingaenge.length) * abstand;
    this.eingaenge.forEach((e, i) => (pos[e] = { x: spalteX(0), y: 50 + i * abstand }));

    // Gatter je Spalte: Wunschhöhe = Mittel der Quellen, dann Kollisionen auflösen.
    for (let t = 1; t <= this.maxTiefe; t++) {
      const spalte = this.gatter.filter((g) => tiefe[g.name] === t);
      spalte.forEach((g) => {
        const ys = g.args.map((a) => pos[a].y);
        g.wunsch = ys.reduce((s, y) => s + y, 0) / ys.length;
      });
      spalte.sort((a, b) => a.wunsch - b.wunsch);
      let letztes = -Infinity;
      for (const g of spalte) {
        const y = Math.max(g.wunsch, letztes + abstand);
        pos[g.name] = { x: spalteX(t), y };
        letztes = y;
      }
    }
    this.pos = pos;
    this.ausgabeX = spalteX(this.maxTiefe + 1) - 40;
    // Lampen nach Höhe sortieren und Mindestabstand erzwingen.
    this.lampeY = {};
    let letzte = -Infinity;
    const reihenfolge = this.ausgaengeText.trim()
      ? [...this.ausgaenge]
      : [...this.ausgaenge].sort((a, b) => pos[a].y - pos[b].y);
    reihenfolge.forEach((a) => {
        const y = Math.max(pos[a].y, letzte + 48);
        this.lampeY[a] = y;
        letzte = y;
      });
    const alleY = [...Object.values(pos).map((p) => p.y), ...Object.values(this.lampeY)];
    this.hoehe = Math.max(hoeheEingaenge, ...alleY.map((y) => y + 50)) + 20;
    // Ausgangsleitungen, die waagerecht durch ein Gatter laufen würden, führen unter der
    // Schaltung entlang.
    const unterkante = Math.max(...this.gatter.map((g) => pos[g.name].y + 26), 0);
    this.umweg = {};
    let kanal = 0;
    this.ausgaenge.forEach((a) => {
      const y = pos[a].y;
      const xStart = pos[a].x + 40;
      const kreuzt = this.gatter.some((g) => {
        const p = pos[g.name];
        return g.name !== a && p.x - 30 > xStart && Math.abs(p.y - y) < 30;
      });
      if (kreuzt) this.umweg[a] = unterkante + 18 + 10 * kanal++;
    });
    if (kanal) this.hoehe = Math.max(this.hoehe, unterkante + 18 + 10 * kanal + 20);
    this.breite = this.ausgabeX + 90;
  }

  // --- Zeichnen -----------------------------------------------------------

  svg() {
    const w = this.rechne(this.werte);
    const G = 26; // halbe Gatterhöhe
    const teile = [];
    const farbe = (v) => (v === 1 ? "var(--ls-an)" : v === 0 ? "var(--ls-aus)" : "var(--ls-unbestimmt)");
    const ausgangX = (name) => (this.eingaenge.includes(name) ? this.pos[name].x + 22 : this.pos[name].x + 30 + (this.istNegiert(name) ? 8 : 0));

    // Leitungen zuerst, damit Gatter darüber liegen.
    const leitungen = [];
    // Je Spalte bekommt jede Quelle eine eigene senkrechte Spur.
    const spuren = {};
    this.gatter.forEach((g) => {
      const t = this.tiefe[g.name];
      spuren[t] = spuren[t] || [];
      g.args.forEach((a) => {
        if (!spuren[t].includes(a)) spuren[t].push(a);
      });
    });
    this.gatter.forEach((g) => {
      const p = this.pos[g.name];
      const n = g.args.length;
      g.args.forEach((a, i) => {
        const q = this.pos[a];
        const x1 = ausgangX(a);
        const y1 = q.y;
        const x2 = p.x - 30;
        const y2 = n === 1 ? p.y : p.y - G + 10 + (i * (2 * G - 20)) / (n - 1);
        const spur = spuren[this.tiefe[g.name]].indexOf(a);
        const xm = x2 - 14 - (spur % 7) * 9;
        leitungen.push({ d: `M ${x1} ${y1} H ${xm} V ${y2} H ${x2}`, v: w[a] });
      });
    });
    this.ausgaenge.forEach((a, i) => {
      const q = this.pos[a];
      const ly = this.lampeY[a];
      const xm = this.ausgabeX - 30 - i * 9;
      const d = this.umweg[a] !== undefined
        ? `M ${ausgangX(a)} ${q.y} H ${ausgangX(a) + 14 + i * 6} V ${this.umweg[a]} H ${xm} V ${ly} H ${this.ausgabeX - 16}`
        : `M ${ausgangX(a)} ${q.y} H ${xm} V ${ly} H ${this.ausgabeX - 16}`;
      leitungen.push({ d, v: w[a] });
    });
    for (const l of leitungen) {
      teile.push(`<path d="${l.d}" fill="none" stroke="${farbe(l.v)}" stroke-width="${l.v === 1 ? 4 : 2.5}" stroke-linejoin="round"/>`);
    }
    // Abzweigpunkte an Quellen mit mehreren Zielen.
    const ziele = {};
    this.gatter.forEach((g) => g.args.forEach((a) => (ziele[a] = (ziele[a] || 0) + 1)));
    this.ausgaenge.forEach((a) => (ziele[a] = (ziele[a] || 0) + 1));

    // Eingänge als Schalter.
    this.eingaenge.forEach((e) => {
      const p = this.pos[e];
      const v = w[e];
      teile.push(`
        <g class="schalter" data-eingang="${e}" tabindex="0" role="switch" aria-checked="${v === 1}" aria-label="Eingang ${e}">
          <rect x="${p.x - 40}" y="${p.y - 18}" width="62" height="36" rx="18" fill="${v ? "var(--ls-an)" : "var(--ls-aus-flaeche)"}" stroke="var(--ls-rand)" stroke-width="2"/>
          <circle cx="${v ? p.x + 4 : p.x - 22}" cy="${p.y}" r="13" fill="var(--ls-knopf)" stroke="var(--ls-rand)" stroke-width="1.5"/>
          <text x="${v ? p.x - 22 : p.x + 4}" y="${p.y + 6}" text-anchor="middle" class="bit">${v}</text>
          <text x="${p.x - 50}" y="${p.y + 6}" text-anchor="end" class="name">${e}</text>
        </g>`);
    });

    // Gatter als Rechtecke.
    this.gatter.forEach((g) => {
      const p = this.pos[g.name];
      const art = this.artVon(g);
      const info = art ? LS_ARTEN[art] : null;
      const zeichen = info ? info.zeichen : "?";
      const klickbar = g.waehlbar;
      teile.push(`
        <g class="gatter ${klickbar ? "waehlbar" : ""}" ${klickbar ? `data-gatter="${g.name}" tabindex="0" role="button" aria-label="Gatter ${g.name}: ${info ? info.name : "noch nicht festgelegt"}. Klicken zum Ändern."` : ""}>
          <rect x="${p.x - 30}" y="${p.y - G}" width="60" height="${2 * G}" rx="3" fill="${klickbar ? "var(--ls-waehlbar)" : "var(--ls-flaeche)"}" stroke="var(--ls-rand)" stroke-width="2" ${klickbar ? 'stroke-dasharray="6 3"' : ""}/>
          <text x="${p.x}" y="${p.y + 7}" text-anchor="middle" class="zeichen">${zeichen}</text>
          ${info && info.neg ? `<circle cx="${p.x + 34}" cy="${p.y}" r="4.5" fill="var(--ls-flaeche)" stroke="var(--ls-rand)" stroke-width="2"/>` : ""}
          <text x="${p.x}" y="${p.y - G - 6}" text-anchor="middle" class="gname">${g.name}</text>
        </g>`);
    });

    // Abzweigpunkte
    Object.entries(ziele).forEach(([a, z]) => {
      if (z > 1) teile.push(`<circle cx="${ausgangX(a) + 8}" cy="${this.pos[a].y}" r="4" fill="${farbe(w[a])}"/>`);
    });

    // Ausgänge als Lampen.
    this.ausgaenge.forEach((a) => {
      const y = this.lampeY[a];
      const v = w[a];
      teile.push(`
        <g aria-label="Ausgang ${a}: ${v === null ? "unbestimmt" : v}">
          <circle cx="${this.ausgabeX}" cy="${y}" r="16" fill="${v === 1 ? "var(--ls-lampe)" : "var(--ls-aus-flaeche)"}" stroke="var(--ls-rand)" stroke-width="2"/>
          <text x="${this.ausgabeX}" y="${y + 6}" text-anchor="middle" class="bit">${v === null ? "?" : v}</text>
          <text x="${this.ausgabeX + 24}" y="${y + 6}" class="name">${a}</text>
        </g>`);
    });

    return `<svg viewBox="0 0 ${this.breite} ${this.hoehe}" width="${this.breite}" style="max-width:100%;height:auto" role="img" aria-label="Schaltung">${teile.join("")}</svg>`;
  }

  istNegiert(name) {
    const g = this.gatter.find((x) => x.name === name);
    if (!g) return false;
    const art = this.artVon(g);
    return !!(art && LS_ARTEN[art].neg);
  }

  tabelleHtml() {
    if (this.tabelle === "aus" || this.fehler) return "";
    const zeilen = this.belegungen();
    const aktuell = this.eingaenge.map((e) => this.werte[e]).join("");
    const ausfuellen = this.tabelle === "ausfuellen";
    const kopf = `<tr>${this.eingaenge.map((e) => `<th>${e}</th>`).join("")}${this.ausgaenge
      .map((a, i) => `<th class="${i === 0 ? "trenn" : ""}">${a}</th>`)
      .join("")}</tr>`;
    const koerper = zeilen
      .map((b) => {
        const schluessel = this.eingaenge.map((e) => b[e]).join("");
        const w = this.rechne(b);
        const zellen = this.ausgaenge
          .map((a, i) => {
            const trenn = i === 0 ? "trenn" : "";
            if (!ausfuellen) return `<td class="${trenn}">${w[a] === null ? "?" : w[a]}</td>`;
            const eingabe = this.tabellenEingabe[`${a}:${schluessel}`] ?? "";
            let zustand = "";
            if (this.geprueft === "tabelle") zustand = String(w[a]) === eingabe ? "richtig" : "falsch";
            return `<td class="${trenn}"><button class="tz ${zustand}" data-zelle="${a}:${schluessel}" aria-label="${a} bei ${schluessel}">${eingabe}</button></td>`;
          })
          .join("");
        return `<tr class="${schluessel === aktuell ? "aktiv" : ""}" data-zeile="${schluessel}">${this.eingaenge
          .map((e) => `<td>${b[e]}</td>`)
          .join("")}${zellen}</tr>`;
      })
      .join("");
    return `
      <div class="tabelle">
        <table><thead>${kopf}</thead><tbody>${koerper}</tbody></table>
        <div class="klein">${ausfuellen ? "Klicke in die Ausgabespalte: leer → 0 → 1. Ein Klick auf die Eingänge einer Zeile stellt sie in der Schaltung ein." : "Ein Klick auf eine Zeile stellt diese Eingänge in der Schaltung ein."}</div>
        ${ausfuellen ? `<button class="knopf" data-aktion="tabelle-pruefen">Tabelle prüfen</button>` : ""}
      </div>`;
  }

  meldungHtml() {
    if (this.geprueft === "tabelle") {
      const alle = this.belegungen().every((b) => {
        const s = this.eingaenge.map((e) => b[e]).join("");
        const w = this.rechne(b);
        return this.ausgaenge.every((a) => String(w[a]) === (this.tabellenEingabe[`${a}:${s}`] ?? ""));
      });
      return alle
        ? `<div class="meldung ok">✔ Die Tabelle stimmt.</div>`
        : `<div class="meldung falsch">Rot markierte Felder stimmen nicht. Stelle die Eingänge in der Schaltung ein und lies die Lampe ab.</div>`;
    }
    if (this.geprueft === "soll") {
      const offen = this.gatter.filter((g) => g.waehlbar && !this.artVon(g));
      if (offen.length) return `<div class="meldung falsch">Lege zuerst für jedes Fragezeichen ein Gatter fest.</div>`;
      const fehlerhaft = [];
      this.belegungen().forEach((b, k) => {
        const w = this.rechne(b);
        for (const [a, bits] of Object.entries(this.soll)) {
          if (bits[k] !== undefined && String(w[a]) !== bits[k]) {
            fehlerhaft.push(this.eingaenge.map((e) => `${e}=${b[e]}`).join(", ") + ` → ${a} soll ${bits[k]} sein`);
          }
        }
      });
      return fehlerhaft.length === 0
        ? `<div class="meldung ok">✔ Die Schaltung erfüllt die Vorgabe.</div>`
        : `<div class="meldung falsch">Noch nicht. Zum Beispiel: ${fehlerhaft[0]}.</div>`;
    }
    return "";
  }

  render() {
    const hatSoll = Object.keys(this.soll || {}).length > 0;
    const sollTabelle = hatSoll && !this.fehler ? this.sollTabelleHtml() : "";
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block; margin: 1em 0;
          --ls-an: var(--color-brand, #ba7720);
          --ls-aus: #9ca3af;
          --ls-unbestimmt: #d1d5db;
          --ls-rand: var(--color-text, #222);
          --ls-flaeche: var(--color-background, #fff);
          --ls-aus-flaeche: var(--color-nav, #eee);
          --ls-waehlbar: color-mix(in srgb, var(--color-brand, #ba7720) 15%, var(--color-background, #fff));
          --ls-knopf: var(--color-background, #fff);
          --ls-lampe: #facc15;
        }
        .rahmen {
          border: 2px solid var(--color-nav-border, #ccc); border-radius: 12px; padding: 16px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
        }
        .aufgabe { margin-bottom: 10px; }
        .flaeche { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; justify-content: center; }
        .zeichnung { overflow-x: auto; max-width: 100%; }
        svg text { fill: var(--color-text, #000); font-family: inherit; }
        svg .zeichen { font-size: 20px; font-weight: bold; }
        svg .name { font-size: 18px; font-weight: bold; }
        svg .gname { font-size: 12px; opacity: 0.65; }
        svg .bit { font-size: 15px; font-weight: bold; }
        svg .schalter, svg .waehlbar { cursor: pointer; }
        svg .schalter:focus, svg .waehlbar:focus { outline: none; }
        svg .schalter:focus rect, svg .waehlbar:focus rect { stroke-width: 4; }
        table { border-collapse: collapse; font-family: monospace; font-size: 1.05em; }
        th, td { border: 1px solid var(--color-nav-border, #ccc); padding: 4px 12px; text-align: center; }
        th.trenn, td.trenn { border-left: 3px solid var(--color-text, #000); }
        tbody tr { cursor: pointer; }
        tr.aktiv td { background: color-mix(in srgb, var(--color-brand, #ba7720) 25%, transparent); }
        button.tz {
          width: 30px; height: 26px; border: 2px dashed var(--color-brand, #ba7720); border-radius: 4px;
          background: var(--color-background, #fff); color: var(--color-text, #000); font: inherit; cursor: pointer;
        }
        button.tz.richtig { border-style: solid; border-color: #15803d; background: #dcfce7; color: #000; }
        button.tz.falsch { border-style: solid; border-color: #b91c1c; background: #fee2e2; color: #000; }
        .klein { font-size: 0.8em; opacity: 0.75; margin: 6px 0; max-width: 22em; }
        .knopf {
          border: none; border-radius: 6px; padding: 7px 14px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff);
        }
        .knopf.zweit { background: var(--color-spacer, #a4a4a4); color: var(--color-text, #000); }
        .knoepfe { display: flex; gap: 10px; justify-content: center; margin-top: 10px; flex-wrap: wrap; }
        .meldung { text-align: center; margin-top: 10px; }
        .meldung.ok { color: #15803d; }
        .meldung.falsch { color: #b91c1c; }
        .legende { font-size: 0.8em; opacity: 0.8; text-align: center; margin-top: 8px; }
        .editor { margin-top: 14px; display: grid; gap: 6px; }
        .editor label { font-size: 0.85em; font-weight: bold; }
        .editor input, .editor textarea {
          font-family: monospace; font-size: 1em; padding: 6px; border-radius: 6px;
          border: 1px solid var(--color-nav-border, #ccc); background: var(--color-background, #fff); color: var(--color-text, #000);
        }
        .fehler { color: #b91c1c; margin-top: 8px; }
        .soll caption { font-size: 0.85em; font-weight: bold; padding-bottom: 4px; }
      </style>
      <div class="rahmen">
        ${this.aufgabe ? `<div class="aufgabe">${this.aufgabe}</div>` : ""}
        ${
          this.fehler
            ? `<div class="fehler">⚠ ${this.fehler}</div>`
            : `<div class="flaeche">
                <div class="zeichnung">${this.svg()}</div>
                ${this.tabelleHtml()}
                ${sollTabelle}
              </div>
              <div class="legende">Klicke auf einen Schalter, um den Eingang umzuschalten.${
                this.gatter.some((g) => g.waehlbar) ? " Klicke auf ein gestricheltes Gatter, um seine Art zu wechseln." : ""
              }</div>`
        }
        ${hatSoll && !this.fehler ? `<div class="knoepfe"><button class="knopf" data-aktion="soll-pruefen">Schaltung prüfen</button></div>` : ""}
        ${this.meldungHtml()}
        ${
          this.editierbar
            ? `<div class="editor">
                <label for="ein">Eingänge (durch Komma getrennt)</label>
                <input id="ein" value="${this.eingaengeText.replace(/"/g, "&quot;")}">
                <label for="sch">Schaltung – eine Zeile je Gatter, z. B. <code>Y = und(A, B)</code></label>
                <textarea id="sch" rows="5">${this.schaltungText.replace(/;\s*/g, "\n").replace(/</g, "&lt;")}</textarea>
                <div class="knoepfe">
                  <button class="knopf" data-aktion="uebernehmen">Schaltung zeichnen</button>
                  <button class="knopf zweit" data-aktion="zuruecksetzen">Zurücksetzen</button>
                </div>
              </div>`
            : ""
        }
      </div>`;
    this.verbinde();
  }

  sollTabelleHtml() {
    const zeilen = this.belegungen();
    const namen = Object.keys(this.soll);
    return `<table class="soll"><caption>Vorgabe</caption>
      <thead><tr>${this.eingaenge.map((e) => `<th>${e}</th>`).join("")}${namen
        .map((a, i) => `<th class="${i === 0 ? "trenn" : ""}">${a}</th>`)
        .join("")}</tr></thead>
      <tbody>${zeilen
        .map(
          (b, k) =>
            `<tr data-zeile="${this.eingaenge.map((e) => b[e]).join("")}">${this.eingaenge
              .map((e) => `<td>${b[e]}</td>`)
              .join("")}${namen.map((a, i) => `<td class="${i === 0 ? "trenn" : ""}">${this.soll[a][k] ?? ""}</td>`).join("")}</tr>`,
        )
        .join("")}</tbody></table>`;
  }

  verbinde() {
    const root = this.shadowRoot;
    const aktiviere = (el, f) => {
      el.addEventListener("click", f);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          f();
        }
      });
    };
    root.querySelectorAll("[data-eingang]").forEach((el) =>
      aktiviere(el, async () => {
        const e = el.dataset.eingang;
        this.werte[e] = this.werte[e] ? 0 : 1;
        this.render();
        this.shadowRoot.querySelector(`[data-eingang="${e}"]`)?.focus();
        await this.speichereZustand();
      }),
    );
    root.querySelectorAll("[data-gatter]").forEach((el) =>
      aktiviere(el, async () => {
        const name = el.dataset.gatter;
        const g = this.gatter.find((x) => x.name === name);
        const erlaubt = this.artenAuswahl.filter((a) => (g.args.length === 1 ? a === "nicht" : a !== "nicht"));
        const jetzt = this.gewaehlt[name];
        const i = erlaubt.indexOf(jetzt);
        this.gewaehlt[name] = i === -1 ? erlaubt[0] : i === erlaubt.length - 1 ? null : erlaubt[i + 1];
        this.geprueft = null;
        this.render();
        this.shadowRoot.querySelector(`[data-gatter="${name}"]`)?.focus();
        await this.speichereZustand();
      }),
    );
    root.querySelectorAll("tr[data-zeile]").forEach((tr) =>
      tr.addEventListener("click", (ev) => {
        if (ev.target.closest("button")) return;
        const s = tr.dataset.zeile;
        this.eingaenge.forEach((e, i) => (this.werte[e] = Number(s[i])));
        this.render();
        this.speichereZustand();
      }),
    );
    root.querySelectorAll("button.tz").forEach((b) =>
      b.addEventListener("click", async () => {
        const k = b.dataset.zelle;
        const w = this.tabellenEingabe[k] ?? "";
        this.tabellenEingabe[k] = w === "" ? "0" : w === "0" ? "1" : "";
        this.geprueft = null;
        this.render();
        await this.speichereZustand();
      }),
    );
    root.querySelector("[data-aktion=tabelle-pruefen]")?.addEventListener("click", () => {
      this.geprueft = "tabelle";
      this.render();
    });
    root.querySelector("[data-aktion=soll-pruefen]")?.addEventListener("click", () => {
      this.geprueft = "soll";
      this.render();
    });
    root.querySelector("[data-aktion=uebernehmen]")?.addEventListener("click", async () => {
      this.eingaengeText = root.getElementById("ein").value;
      this.schaltungText = root.getElementById("sch").value;
      this.ausgaengeText = "";
      this.geprueft = null;
      this.baue();
      this.render();
      await this.speichereZustand();
    });
    root.querySelector("[data-aktion=zuruecksetzen]")?.addEventListener("click", async () => {
      this.eingaengeText = this.getAttribute("eingaenge") || "A, B";
      this.schaltungText = this.getAttribute("schaltung") || "Y = und(A, B)";
      this.ausgaengeText = this.getAttribute("ausgaenge") || "";
      this.werte = {};
      this.geprueft = null;
      this.baue();
      this.render();
      await this.speichereZustand();
    });
  }
}

customElements.define("logik-schaltung", LogikSchaltung);
