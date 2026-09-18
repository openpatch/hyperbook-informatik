// Vergleicht Wachstumsfunktionen. Der Schieberegler zeigt, dass Vorfaktoren
// bei kleinen n entscheiden und die Wachstumsklasse erst bei großen n gewinnt.
const WACHSTUM_FARBEN = ["#007864", "#b45309", "#7c3aed", "#b91c1c", "#0369a1"];

class OopWachstum extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.funktionen = (this.getAttribute("funktionen") || "100*n | n^2/2 | 5*n*log2(n)")
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 5)
      .map((text, i) => ({
        text,
        farbe: WACHSTUM_FARBEN[i % WACHSTUM_FARBEN.length],
        sichtbar: true,
        knoten: this.parse(text),
      }))
      .filter((f) => f.knoten !== null);

    this.nMax = parseInt(this.getAttribute("nmax") || "300", 10);
    this.n = Math.min(parseInt(this.getAttribute("n") || "50", 10), this.nMax);
    this.logSkala = (this.getAttribute("skala") || "linear").toLowerCase() === "log";
    this.render();
  }

  // --- Ausdrücke ---------------------------------------------------------

  parse(text) {
    const tokens = this.zerlege(text);
    if (!tokens) return null;
    let pos = 0;

    const schau = () => tokens[pos];
    const nimm = () => tokens[pos++];

    const ausdruck = () => {
      let links = term();
      while (schau() && (schau().wert === "+" || schau().wert === "-")) {
        const op = nimm().wert;
        links = { art: "binaer", op, links, rechts: term() };
      }
      return links;
    };

    const term = () => {
      let links = potenz();
      while (schau() && (schau().wert === "*" || schau().wert === "/")) {
        const op = nimm().wert;
        links = { art: "binaer", op, links, rechts: potenz() };
      }
      return links;
    };

    const potenz = () => {
      const basis = vorzeichen();
      if (schau() && schau().wert === "^") {
        nimm();
        return { art: "binaer", op: "^", links: basis, rechts: potenz() };
      }
      return basis;
    };

    const vorzeichen = () => {
      if (schau() && schau().wert === "-") {
        nimm();
        return { art: "negativ", wert: vorzeichen() };
      }
      return einfach();
    };

    const einfach = () => {
      const t = nimm();
      if (!t) return { art: "zahl", wert: 0 };
      if (t.art === "zahl") return { art: "zahl", wert: t.wert };
      if (t.art === "name") {
        if (schau() && schau().wert === "(") {
          nimm();
          const arg = ausdruck();
          if (schau() && schau().wert === ")") nimm();
          return { art: "funktion", name: t.wert, arg };
        }
        return { art: "variable", name: t.wert };
      }
      if (t.wert === "(") {
        const a = ausdruck();
        if (schau() && schau().wert === ")") nimm();
        return a;
      }
      return { art: "zahl", wert: 0 };
    };

    try {
      return ausdruck();
    } catch (fehler) {
      return null;
    }
  }

  zerlege(text) {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (/\s/.test(c)) {
        i++;
      } else if (/[0-9.]/.test(c)) {
        let zahl = "";
        while (i < text.length && /[0-9.]/.test(text[i])) zahl += text[i++];
        tokens.push({ art: "zahl", wert: parseFloat(zahl) });
      } else if (/[a-zA-Z_]/.test(c)) {
        let name = "";
        while (i < text.length && /[a-zA-Z0-9_]/.test(text[i])) name += text[i++];
        tokens.push({ art: "name", wert: name });
      } else if ("+-*/^()".includes(c)) {
        tokens.push({ art: "op", wert: c });
        i++;
      } else {
        i++;
      }
    }
    return tokens;
  }

  werte(knoten, n) {
    switch (knoten.art) {
      case "zahl":
        return knoten.wert;
      case "variable":
        return n;
      case "negativ":
        return -this.werte(knoten.wert, n);
      case "funktion": {
        const a = this.werte(knoten.arg, n);
        switch (knoten.name.toLowerCase()) {
          case "log2":
            return a > 0 ? Math.log2(a) : 0;
          case "log":
          case "log10":
            return a > 0 ? Math.log10(a) : 0;
          case "ln":
            return a > 0 ? Math.log(a) : 0;
          case "sqrt":
          case "wurzel":
            return a >= 0 ? Math.sqrt(a) : 0;
          default:
            return a;
        }
      }
      case "binaer": {
        const l = this.werte(knoten.links, n);
        const r = this.werte(knoten.rechts, n);
        switch (knoten.op) {
          case "+":
            return l + r;
          case "-":
            return l - r;
          case "*":
            return l * r;
          case "/":
            return r === 0 ? 0 : l / r;
          case "^":
            return Math.pow(l, r);
          default:
            return 0;
        }
      }
      default:
        return 0;
    }
  }

  wert(f, n) {
    const w = this.werte(f.knoten, n);
    return isFinite(w) ? w : 0;
  }

  // --- Schnittpunkte -----------------------------------------------------

  schnittpunkte() {
    const sichtbar = this.funktionen.filter((f) => f.sichtbar);
    const treffer = [];
    for (let a = 0; a < sichtbar.length; a++) {
      for (let b = a + 1; b < sichtbar.length; b++) {
        const f = sichtbar[a];
        const g = sichtbar[b];
        let vorher = this.wert(f, 1) - this.wert(g, 1);
        for (let n = 2; n <= this.nMax; n++) {
          const jetzt = this.wert(f, n) - this.wert(g, n);
          if (vorher !== 0 && Math.sign(jetzt) !== Math.sign(vorher)) {
            treffer.push({
              n,
              f,
              g,
              text: `Ab n = ${n} ist <em>${jetzt > 0 ? g.text : f.text}</em> kleiner als <em>${
                jetzt > 0 ? f.text : g.text
              }</em>.`,
            });
            break;
          }
          vorher = jetzt;
        }
      }
    }
    return treffer;
  }

  // --- Diagramm ----------------------------------------------------------

  diagramm() {
    const breite = 640;
    const hoehe = 320;
    const links = 62;
    const unten = 40;
    const oben = 28;
    const rechts = 16;

    const sichtbar = this.funktionen.filter((f) => f.sichtbar);
    let maxY = 1;
    sichtbar.forEach((f) => {
      for (let n = 1; n <= this.nMax; n++) maxY = Math.max(maxY, this.wert(f, n));
    });

    const px = (n) => links + ((n - 1) / Math.max(1, this.nMax - 1)) * (breite - links - rechts);
    const py = (w) => {
      if (this.logSkala) {
        const obergrenze = Math.log10(Math.max(maxY, 10));
        const wert = w > 0 ? Math.log10(w) : 0;
        return hoehe - unten - (wert / obergrenze) * (hoehe - unten - oben);
      }
      return hoehe - unten - (w / maxY) * (hoehe - unten - oben);
    };

    const kurven = sichtbar
      .map((f) => {
        const punkte = [];
        const schritt = Math.max(1, Math.round(this.nMax / 240));
        for (let n = 1; n <= this.nMax; n += schritt) {
          punkte.push(`${px(n).toFixed(1)},${py(this.wert(f, n)).toFixed(1)}`);
        }
        punkte.push(`${px(this.nMax).toFixed(1)},${py(this.wert(f, this.nMax)).toFixed(1)}`);
        return `<polyline points="${punkte.join(" ")}" class="kurve" style="stroke: ${f.farbe}" />`;
      })
      .join("");

    const punkteBeiN = sichtbar
      .map(
        (f) =>
          `<circle cx="${px(this.n)}" cy="${py(this.wert(f, this.n))}" r="4.5"
                   class="marke" style="fill: ${f.farbe}" />`,
      )
      .join("");

    const yTicks = [];
    const anzahlTicks = 4;
    for (let i = 0; i <= anzahlTicks; i++) {
      const w = this.logSkala
        ? Math.pow(10, (Math.log10(Math.max(maxY, 10)) * i) / anzahlTicks)
        : (maxY * i) / anzahlTicks;
      yTicks.push(
        `<line x1="${links}" y1="${py(w)}" x2="${breite - rechts}" y2="${py(w)}" class="gitter" />
         <text x="${links - 8}" y="${py(w) + 4}" class="tick y">${this.kurz(w)}</text>`,
      );
    }

    const xTicks = [0, 0.25, 0.5, 0.75, 1]
      .map((t) => {
        const n = Math.round(1 + t * (this.nMax - 1));
        return `<text x="${px(n)}" y="${hoehe - unten + 18}" class="tick x">${n}</text>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${breite} ${hoehe}" class="plot" role="img"
           aria-label="Vergleich der Wachstumsfunktionen">
        ${yTicks.join("")}
        <line x1="${links}" y1="${oben}" x2="${links}" y2="${hoehe - unten}" class="achse" />
        <line x1="${links}" y1="${hoehe - unten}" x2="${breite - rechts}" y2="${hoehe - unten}" class="achse" />
        <line x1="${px(this.n)}" y1="${oben}" x2="${px(this.n)}" y2="${hoehe - unten}" class="n-linie" />
        ${kurven}
        ${punkteBeiN}
        ${xTicks}
        <text x="${breite - rechts}" y="${hoehe - 6}" class="achsen-titel">n</text>
        <text x="${links - 58}" y="14" class="achsen-titel">Operationen</text>
      </svg>`;
  }

  kurz(w) {
    if (w >= 1e9) return (w / 1e9).toFixed(1).replace(".", ",") + " Mrd";
    if (w >= 1e6) return (w / 1e6).toFixed(1).replace(".", ",") + " Mio";
    if (w >= 1000) return Math.round(w / 1000) + "k";
    if (w >= 10) return Math.round(w).toString();
    return (Math.round(w * 10) / 10).toString().replace(".", ",");
  }

  tabelle() {
    const sichtbar = this.funktionen.filter((f) => f.sichtbar);
    const stellen = [10, 100, 1000, 10000].filter((n) => n <= Math.max(this.nMax, 10000));
    const spalten = [this.n].concat(stellen.filter((s) => s !== this.n)).sort((a, b) => a - b);

    return `
      <table>
        <thead>
          <tr><th>n</th>${spalten
            .map((n) => `<th class="${n === this.n ? "aktiv" : ""}">${n}</th>`)
            .join("")}</tr>
        </thead>
        <tbody>
          ${sichtbar
            .map(
              (f) => `
            <tr>
              <th><span class="punkt" style="background:${f.farbe}"></span>${f.text}</th>
              ${spalten
                .map((n) => {
                  const werte = sichtbar.map((g) => this.wert(g, n));
                  const best = Math.min(...werte);
                  const w = this.wert(f, n);
                  return `<td class="${n === this.n ? "aktiv" : ""} ${w === best ? "best" : ""}">${this.kurz(w)}</td>`;
                })
                .join("")}
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".buehne").innerHTML = this.diagramm();
    this.shadowRoot.querySelector(".tabelle").innerHTML = this.tabelle();
    this.shadowRoot.querySelector(".n-anzeige").textContent = this.n;

    const schnitte = this.schnittpunkte();
    this.shadowRoot.querySelector(".schnitte").innerHTML = schnitte.length
      ? schnitte.map((s) => `<div class="schnitt">${s.text}</div>`).join("")
      : `<div class="schnitt leer">Im Bereich bis n = ${this.nMax} kreuzen sich die Kurven nicht.</div>`;
  }

  render() {
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
        .legende { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 10px; }
        .legende label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.88em; cursor: pointer;
          font-family: ui-monospace, monospace;
        }
        .punkt {
          display: inline-block; width: 11px; height: 11px;
          border-radius: 50%; flex: none;
        }
        .regler { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
        .regler .label { font-size: 0.88em; font-weight: 600; }
        .n-anzeige {
          font-weight: 700; min-width: 3.5em; text-align: right;
          color: var(--color-brand, #007864); font-variant-numeric: tabular-nums;
        }
        input[type="range"] {
          flex: 1; min-width: 150px; height: 6px; border-radius: 3px;
          background: var(--color-spacer, #a4a4a4); outline: none; -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--color-brand, #007864); cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--color-brand, #007864); cursor: pointer; border: none;
        }
        .schalter {
          display: flex; align-items: center; gap: 6px; font-size: 0.85em; cursor: pointer;
        }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 6px; margin-bottom: 12px;
        }
        .plot { width: 100%; height: auto; display: block; }
        .kurve { fill: none; stroke-width: 2.4; }
        .marke { stroke: var(--color-background, white); stroke-width: 1.5; }
        .achse { stroke: var(--color-text, black); opacity: 0.55; stroke-width: 1.2; }
        .gitter { stroke: var(--color-text, black); opacity: 0.12; }
        .n-linie {
          stroke: var(--color-text, black); opacity: 0.45;
          stroke-width: 1.5; stroke-dasharray: 4 4;
        }
        text { fill: var(--color-text, black); font-family: system-ui, sans-serif; }
        .tick { font-size: 11px; opacity: 0.7; }
        .tick.y { text-anchor: end; }
        .tick.x { text-anchor: middle; }
        .achsen-titel { font-size: 11px; opacity: 0.6; font-style: italic; }

        table { border-collapse: collapse; width: 100%; font-size: 0.85em; margin-bottom: 10px; }
        th, td {
          border: 1px solid var(--color-spacer, #a4a4a4);
          padding: 5px 8px; text-align: right;
          font-variant-numeric: tabular-nums;
        }
        thead th { background: var(--color-nav, #f5f5f5); text-align: center; }
        tbody th {
          text-align: left; font-family: ui-monospace, monospace; font-weight: 600;
          display: flex; align-items: center; gap: 6px; border-right: none;
        }
        td.aktiv, th.aktiv {
          background: color-mix(in srgb, var(--color-brand, #007864) 12%, transparent);
        }
        td.best { font-weight: 700; color: var(--color-sync-ok, #15803d); }

        .schnitte { display: flex; flex-direction: column; gap: 4px; }
        .schnitt {
          font-size: 0.87em; padding: 6px 9px; border-radius: 6px;
          background: var(--color-nav, #f5f5f5);
        }
        .schnitt.leer { opacity: 0.65; background: transparent; padding: 0; }
        .schnitt em { font-family: ui-monospace, monospace; font-style: normal; font-weight: 600; }
      </style>

      <div class="container">
        <div class="legende">
          ${this.funktionen
            .map(
              (f, i) => `
            <label>
              <input type="checkbox" data-nr="${i}" ${f.sichtbar ? "checked" : ""} />
              <span class="punkt" style="background: ${f.farbe}"></span>
              ${f.text}
            </label>`,
            )
            .join("")}
        </div>

        <div class="regler">
          <span class="label">n =</span>
          <input type="range" class="n-regler" min="1" max="${this.nMax}" value="${this.n}" />
          <span class="n-anzeige">${this.n}</span>
          <label class="schalter">
            <input type="checkbox" class="log-schalter" ${this.logSkala ? "checked" : ""} />
            logarithmische y-Achse
          </label>
        </div>

        <div class="buehne"></div>
        <div class="tabelle"></div>
        <div class="schnitte"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".n-regler").addEventListener("input", (e) => {
      this.n = parseInt(e.target.value, 10);
      this.aktualisiere();
    });
    this.shadowRoot.querySelector(".log-schalter").addEventListener("change", (e) => {
      this.logSkala = e.target.checked;
      this.aktualisiere();
    });
    this.shadowRoot.querySelectorAll(".legende input").forEach((box) => {
      box.addEventListener("change", () => {
        this.funktionen[parseInt(box.dataset.nr, 10)].sichtbar = box.checked;
        this.aktualisiere();
      });
    });

    this.aktualisiere();
  }
}

customElements.define("oop-wachstum", OopWachstum);
