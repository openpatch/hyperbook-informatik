const KONFUSION_STANDARD_DATEN = [
  [0.95, 1], [0.92, 1], [0.89, 1], [0.86, 1], [0.83, 1],
  [0.78, 1], [0.74, 1], [0.69, 1], [0.62, 1], [0.55, 1],
  [0.48, 1], [0.41, 1], [0.33, 1], [0.27, 1], [0.18, 1],
  [0.72, 0], [0.66, 0], [0.58, 0], [0.51, 0], [0.44, 0],
  [0.38, 0], [0.35, 0], [0.31, 0], [0.28, 0], [0.24, 0],
  [0.22, 0], [0.19, 0], [0.17, 0], [0.15, 0], [0.13, 0],
  [0.11, 0], [0.10, 0], [0.09, 0], [0.08, 0], [0.07, 0],
  [0.06, 0], [0.05, 0], [0.04, 0], [0.03, 0], [0.02, 0],
];

class KiKonfusionsmatrix extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.schwelle = 0.5;
    this.werte = { tp: 12, fp: 3, fn: 8, tn: 77 };
  }

  connectedCallback() {
    this.modus = (this.getAttribute("modus") || "schwelle").toLowerCase();
    this.positivName = this.getAttribute("positiv-name") || "Spam";
    this.negativName = this.getAttribute("negativ-name") || "kein Spam";
    this.einheit = this.getAttribute("einheit") || "E-Mails";
    this.schwelle = parseFloat(this.getAttribute("schwelle") || "0.5");
    this.daten = this.leseDaten();
    if (this.hasAttribute("werte")) {
      const teile = this.getAttribute("werte").split(",").map(Number);
      if (teile.length === 4) {
        this.werte = { tp: teile[0], fp: teile[1], fn: teile[2], tn: teile[3] };
      }
    }
    this.render();
  }

  leseDaten() {
    const roh = this.getAttribute("daten");
    if (!roh) return KONFUSION_STANDARD_DATEN.map((d) => [d[0], d[1]]);
    return roh
      .split(";")
      .map((e) => e.trim())
      .filter((e) => e.length > 0)
      .map((e) => {
        const teile = e.split(",");
        return [parseFloat(teile[0]), parseInt(teile[1], 10)];
      })
      .filter((d) => !isNaN(d[0]));
  }

  // --- Rechnen -----------------------------------------------------------

  matrix() {
    if (this.modus === "eingabe") return { ...this.werte };
    const m = { tp: 0, fp: 0, fn: 0, tn: 0 };
    this.daten.forEach(([wert, label]) => {
      const vorhersage = wert >= this.schwelle ? 1 : 0;
      if (label === 1 && vorhersage === 1) m.tp++;
      else if (label === 0 && vorhersage === 1) m.fp++;
      else if (label === 1 && vorhersage === 0) m.fn++;
      else m.tn++;
    });
    return m;
  }

  art(wert, label) {
    const vorhersage = wert >= this.schwelle ? 1 : 0;
    if (label === 1) return vorhersage === 1 ? "tp" : "fn";
    return vorhersage === 1 ? "fp" : "tn";
  }

  prozent(zaehler, nenner) {
    if (nenner === 0) return "—";
    const p = (zaehler / nenner) * 100;
    // Zwei Nachkommastellen, damit Werte wie 96,25 % dem Buch entsprechen.
    return (Math.round(p * 100) / 100).toString().replace(".", ",") + " %";
  }

  // --- Ausgabe -----------------------------------------------------------

  svgVerteilung() {
    const links = 124;
    const rechts = 20;
    const breite = 540;
    const spanne = breite - links - rechts;
    const px = (wert) => links + wert * spanne;
    const reihe = { 1: 58, 0: 120 };

    const punkte = this.daten
      .map(([wert, label]) => {
        const art = this.art(wert, label);
        return `<circle cx="${px(wert).toFixed(1)}" cy="${reihe[label]}" r="6.5"
                  class="punkt ${art}">
                  <title>Bewertung ${wert.toString().replace(".", ",")} — ${
                    art === "tp"
                      ? "Richtig-Positiv"
                      : art === "fp"
                        ? "Falsch-Positiv"
                        : art === "fn"
                          ? "Falsch-Negativ"
                          : "Richtig-Negativ"
                  }</title>
                </circle>`;
      })
      .join("");

    const skala = [0, 0.25, 0.5, 0.75, 1]
      .map(
        (w) =>
          `<text class="skala" x="${px(w)}" y="168">${w.toString().replace(".", ",")}</text>`,
      )
      .join("");

    return `
      <svg viewBox="0 0 ${breite} 180" class="verteilung" role="img"
           aria-label="Bewertungen der Beispiele mit Schwellwert">
        <line x1="${links}" y1="150" x2="${breite - rechts}" y2="150" class="achse" />
        <line x1="${px(this.schwelle)}" y1="24" x2="${px(this.schwelle)}" y2="150"
              class="schwelle-linie" />
        <text class="schwelle-text" x="${px(this.schwelle)}" y="18">Schwelle</text>
        <text class="reihen-text" x="${links - 12}" y="${reihe[1] + 5}">echt ${this.positivName}</text>
        <text class="reihen-text" x="${links - 12}" y="${reihe[0] + 5}">echt ${this.negativName}</text>
        <text class="bereich" x="${links + 4}" y="${150 - 6}">als ${this.negativName} eingestuft</text>
        <text class="bereich rechts" x="${breite - rechts - 4}" y="${150 - 6}">als ${this.positivName} eingestuft</text>
        ${punkte}
        ${skala}
      </svg>
    `;
  }

  matrixHTML(m) {
    const zelle = (art, wert, kurz, name) =>
      this.modus === "eingabe"
        ? `<td class="zelle ${art}">
             <input type="number" min="0" class="zahl-feld" data-feld="${art}" value="${wert}" />
             <span class="kurz">${kurz} — ${name}</span>
           </td>`
        : `<td class="zelle ${art}">
             <span class="anzahl">${wert}</span>
             <span class="kurz">${kurz} — ${name}</span>
           </td>`;

    return `
      <table class="matrix">
        <thead>
          <tr>
            <th></th>
            <th>echt ${this.positivName}</th>
            <th>echt ${this.negativName}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>als ${this.positivName} eingestuft</th>
            ${zelle("tp", m.tp, "TP", "Richtig-Positiv")}
            ${zelle("fp", m.fp, "FP", "Falsch-Positiv")}
          </tr>
          <tr>
            <th>als ${this.negativName} eingestuft</th>
            ${zelle("fn", m.fn, "FN", "Falsch-Negativ")}
            ${zelle("tn", m.tn, "TN", "Richtig-Negativ")}
          </tr>
        </tbody>
      </table>
    `;
  }

  kennzahlenHTML(m) {
    const gesamt = m.tp + m.fp + m.fn + m.tn;
    const eintrag = (name, formel, zaehler, nenner, erklaerung) => `
      <div class="kennzahl">
        <div class="kopf">
          <span class="name">${name}</span>
          <span class="ergebnis">${this.prozent(zaehler, nenner)}</span>
        </div>
        <div class="formel">${formel} = ${zaehler} / ${nenner}</div>
        <div class="erklaerung">${erklaerung}</div>
      </div>
    `;

    return `
      ${eintrag(
        "Präzision",
        "TP / (TP + FP)",
        m.tp,
        m.tp + m.fp,
        `Von allen als „${this.positivName}“ eingestuften ${this.einheit}: wie viele waren es wirklich?`,
      )}
      ${eintrag(
        "Spezifität",
        "TN / (TN + FP)",
        m.tn,
        m.tn + m.fp,
        `Von allen echten „${this.negativName}“-${this.einheit}: wie viele wurden richtig erkannt?`,
      )}
      ${eintrag(
        "Sensitivität",
        "TP / (TP + FN)",
        m.tp,
        m.tp + m.fn,
        `Von allen echten „${this.positivName}“-${this.einheit}: wie viele wurden gefunden?`,
      )}
      ${eintrag(
        "Trefferquote",
        "(TP + TN) / alle",
        m.tp + m.tn,
        gesamt,
        "Anteil aller richtigen Entscheidungen.",
      )}
    `;
  }

  aktualisiere() {
    const m = this.matrix();
    const buehne = this.shadowRoot.querySelector(".buehne");
    if (buehne) buehne.innerHTML = this.svgVerteilung();
    const matrix = this.shadowRoot.querySelector(".matrix-box");
    if (matrix && this.modus !== "eingabe") matrix.innerHTML = this.matrixHTML(m);
    const kennzahlen = this.shadowRoot.querySelector(".kennzahlen");
    if (kennzahlen) kennzahlen.innerHTML = this.kennzahlenHTML(m);
    const anzeige = this.shadowRoot.querySelector(".schwelle-wert");
    if (anzeige) {
      anzeige.textContent = this.schwelle.toFixed(2).replace(".", ",");
    }
  }

  setzeSchwelle(wert) {
    this.schwelle = wert;
    this.aktualisiere();
  }

  setzeWert(feld, wert) {
    this.werte[feld] = Math.max(0, wert);
    this.aktualisiere();
  }

  render() {
    const m = this.matrix();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; box-sizing: border-box; }
        * { box-sizing: border-box; }

        .container {
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 12px;
          padding: 16px;
          background: var(--color-background, white);
          color: var(--color-text, black);
          font-family: system-ui, sans-serif;
        }

        .regler {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .regler .label { font-weight: bold; }
        .schwelle-wert {
          font-weight: bold;
          min-width: 3em;
          text-align: right;
          color: var(--color-brand, #007864);
          font-variant-numeric: tabular-nums;
        }

        input[type="range"] {
          flex: 1;
          min-width: 140px;
          height: 6px;
          border-radius: 3px;
          background: var(--color-spacer, #a4a4a4);
          outline: none;
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
          border: none;
        }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          padding: 6px;
          margin-bottom: 14px;
        }
        .verteilung { width: 100%; height: auto; display: block; }

        text {
          fill: var(--color-text, black);
          font-family: system-ui, sans-serif;
          font-size: 12px;
        }
        .reihen-text { text-anchor: end; font-weight: 600; }
        .skala { text-anchor: middle; font-size: 11px; opacity: 0.7; }
        .bereich { font-size: 11px; opacity: 0.55; }
        .bereich.rechts { text-anchor: end; }
        .achse { stroke: var(--color-text, black); opacity: 0.3; }
        .schwelle-linie {
          stroke: var(--color-brand, #007864);
          stroke-width: 2.5;
          stroke-dasharray: 5 4;
        }
        .schwelle-text {
          text-anchor: middle;
          font-size: 11px;
          font-weight: 700;
          fill: var(--color-brand, #007864);
        }
        .punkt { stroke: var(--color-background, white); stroke-width: 1.5; }
        .punkt.tp, .punkt.tn { fill: var(--color-sync-ok, #15803d); }
        .punkt.fp, .punkt.fn { fill: var(--color-sync-error, #b91c1c); }

        table.matrix { border-collapse: collapse; width: 100%; }
        table.matrix th, table.matrix td {
          border: 1px solid var(--color-spacer, #a4a4a4);
          padding: 8px 10px;
          text-align: center;
          font-size: 0.9em;
        }
        table.matrix thead th { background: var(--color-nav, #f5f5f5); }
        table.matrix tbody th { text-align: right; font-weight: 600; }
        .zelle .anzahl {
          display: block;
          font-size: 1.5em;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }
        .zelle .kurz { display: block; font-size: 0.8em; opacity: 0.75; }
        .zelle.tp, .zelle.tn {
          background: var(--color-nav, #f5f5f5);
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 16%, transparent);
        }
        .zelle.fp, .zelle.fn {
          background: var(--color-nav, #f5f5f5);
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 16%, transparent);
        }
        .zahl-feld {
          font: inherit;
          width: 5em;
          padding: 4px 6px;
          text-align: center;
          border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }

        .kennzahlen {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          margin-top: 14px;
        }
        .kennzahl {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          padding: 8px 10px;
          background: var(--color-nav, #f5f5f5);
        }
        .kennzahl .kopf {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }
        .kennzahl .name { font-weight: 700; }
        .kennzahl .ergebnis {
          font-weight: 700;
          font-size: 1.15em;
          color: var(--color-brand, #007864);
          font-variant-numeric: tabular-nums;
        }
        .kennzahl .formel {
          font-family: ui-monospace, monospace;
          font-size: 0.85em;
          margin: 2px 0 4px;
        }
        .kennzahl .erklaerung {
          font-size: 0.82em;
          color: var(--color-text-deactivated, #242428);
        }
      </style>

      <div class="container">
        ${
          this.modus === "eingabe"
            ? ""
            : `<div class="regler">
                 <span class="label">Schwellwert:</span>
                 <input type="range" class="schwelle-regler" min="0" max="1" step="0.01"
                        value="${this.schwelle}" />
                 <span class="schwelle-wert">${this.schwelle
                   .toFixed(2)
                   .replace(".", ",")}</span>
               </div>
               <div class="buehne">${this.svgVerteilung()}</div>`
        }
        <div class="matrix-box">${this.matrixHTML(m)}</div>
        <div class="kennzahlen">${this.kennzahlenHTML(m)}</div>
      </div>
    `;

    const regler = this.shadowRoot.querySelector(".schwelle-regler");
    if (regler) {
      regler.addEventListener("input", (e) =>
        this.setzeSchwelle(parseFloat(e.target.value)),
      );
    }
    this.shadowRoot.querySelectorAll(".zahl-feld").forEach((feld) => {
      feld.addEventListener("input", () => {
        const wert = parseInt(feld.value, 10);
        if (isNaN(wert)) return;
        this.setzeWert(feld.dataset.feld, wert);
      });
    });
  }
}

customElements.define("ki-konfusionsmatrix", KiKonfusionsmatrix);
