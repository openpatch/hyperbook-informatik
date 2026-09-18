const NEURON_POSITIV_HELL = "#2563eb";
const NEURON_NEGATIV_HELL = "#dc2626";
const NEURON_POSITIV_DUNKEL = "#60a5fa";
const NEURON_NEGATIV_DUNKEL = "#f87171";

class KiNeuron extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.x = [0, 0];
    this.gewichte = [1, 1];
    this.bias = -0.5;
    this.funktion = "sigmoid";
    this.ziel = "keine";
    // 0 = nur Eingaben, 1 = Summe, 2 = Aktivierung. Start: alles sichtbar.
    this.phase = 2;
    // Netz 2-3-1: Gewichte der verdeckten Schicht und der Ausgabeschicht.
    this.verdeckt = [
      { w: [0.5, -0.3], b: 0.1 },
      { w: [0.8, 0.2], b: -0.5 },
      { w: [-0.4, 0.9], b: 0.3 },
    ];
    this.ausgabe = { w: [0.6, -0.7, 0.4], b: -0.2 };
  }

  connectedCallback() {
    this.modus = (this.getAttribute("modus") || "neuron").toLowerCase();
    this.funktion = (this.getAttribute("aktivierung") || "sigmoid").toLowerCase();
    if (this.hasAttribute("gewichte")) {
      const teile = this.getAttribute("gewichte").split(",").map(parseFloat);
      if (teile.length >= 2) this.gewichte = [teile[0], teile[1]];
    }
    if (this.hasAttribute("bias")) {
      this.bias = parseFloat(this.getAttribute("bias"));
    }
    if (this.hasAttribute("ziel")) {
      this.ziel = this.getAttribute("ziel").toLowerCase();
    }
    if (this.hasAttribute("eingabe")) {
      const teile = this.getAttribute("eingabe").split(",").map(parseFloat);
      if (teile.length >= 2) this.x = [teile[0], teile[1]];
    }
    this.render();
  }

  // --- Rechnen -----------------------------------------------------------

  // "keine" bildet die Neuron-Klasse aus Lektion 4.1 ab: dort endet die
  // Berechnung bei der gewichteten Summe.
  ohneAktivierung() {
    return this.funktion === "keine";
  }

  maxPhase() {
    return this.ohneAktivierung() && this.modus !== "netz" ? 1 : 2;
  }

  aktiviere(z) {
    if (this.funktion === "keine") return z;
    if (this.funktion === "relu") return z < 0 ? 0 : z;
    if (this.funktion === "stufe") return z < 0 ? 0 : 1;
    return 1 / (1 + Math.exp(-z));
  }

  summe(x, gewichte, bias) {
    let s = bias;
    for (let i = 0; i < gewichte.length; i++) s += gewichte[i] * x[i];
    return s;
  }

  berechneNeuron(x) {
    const z = this.summe(x, this.gewichte, this.bias);
    return { z: z, a: this.aktiviere(z) };
  }

  berechneNetz(x) {
    const hz = this.verdeckt.map((n) => this.summe(x, n.w, n.b));
    const h = hz.map((z) => this.aktiviere(z));
    const yz = this.summe(h, this.ausgabe.w, this.ausgabe.b);
    return { hz: hz, h: h, yz: yz, y: this.aktiviere(yz) };
  }

  zielWert(x1, x2) {
    const a = x1 >= 0.5 ? 1 : 0;
    const b = x2 >= 0.5 ? 1 : 0;
    if (this.ziel === "und") return a && b ? 1 : 0;
    if (this.ziel === "oder") return a || b ? 1 : 0;
    if (this.ziel === "xor") return a !== b ? 1 : 0;
    return null;
  }

  // --- Farben ------------------------------------------------------------

  istDunkel() {
    const wert = getComputedStyle(this)
      .getPropertyValue("--color-background")
      .trim();
    if (!wert) return false;
    if (!KiNeuron.messKontext) {
      KiNeuron.messKontext = document.createElement("canvas").getContext("2d");
    }
    const ctx = KiNeuron.messKontext;
    try {
      ctx.fillStyle = "#ffffff";
      ctx.fillStyle = wert;
      const treffer = /^#([0-9a-f]{6})$/i.exec(ctx.fillStyle);
      if (!treffer) return false;
      const zahl = parseInt(treffer[1], 16);
      const r = (zahl >> 16) & 255;
      const g = (zahl >> 8) & 255;
      const b = zahl & 255;
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
    } catch (error) {
      return false;
    }
  }

  kantenFarbe(gewicht) {
    const dunkel = this.istDunkel();
    if (gewicht >= 0) {
      return dunkel ? NEURON_POSITIV_DUNKEL : NEURON_POSITIV_HELL;
    }
    return dunkel ? NEURON_NEGATIV_DUNKEL : NEURON_NEGATIV_HELL;
  }

  kantenBreite(gewicht) {
    return Math.min(9, 1 + Math.abs(gewicht) * 1.4);
  }

  // Baut "4,0 · 0,00 + 4,0 · 0,00 − 6,0" statt "… + -6,0".
  formelSumme(terme, bias) {
    let text = "";
    terme.forEach((t, i) => {
      const betrag = this.zahl(Math.abs(t.w), 1) + " · " + t.x;
      if (i === 0) text = (t.w < 0 ? "−" : "") + betrag;
      else text += (t.w < 0 ? " − " : " + ") + betrag;
    });
    return text + (bias < 0 ? " − " : " + ") + this.zahl(Math.abs(bias), 1);
  }

  zahl(wert, stellen = 2) {
    if (!isFinite(wert)) return "—";
    // Typografisches Minus, damit es zu den Formeln oben passt.
    return wert.toFixed(stellen).replace(".", ",").replace(/^-/, "−");
  }

  // --- SVG ---------------------------------------------------------------

  kante(x1, y1, x2, y2, gewicht, beschriftung, versatz = -8) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const laenge = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = (-dy / laenge) * versatz;
    const ny = (dx / laenge) * versatz;
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
            stroke="${this.kantenFarbe(gewicht)}"
            stroke-width="${this.kantenBreite(gewicht)}"
            stroke-linecap="round" opacity="0.85" />
      ${
        beschriftung
          ? `<text class="kante" x="${mx + nx}" y="${my + ny}">${beschriftung}</text>`
          : ""
      }
    `;
  }

  knoten(cx, cy, r, oben, wert, farbe) {
    return `
      <circle cx="${cx}" cy="${cy}" r="${r}" class="knoten" ${
        farbe ? `style="stroke:${farbe}"` : ""
      } />
      <text class="knoten-titel" x="${cx}" y="${cy - r + 16}">${oben}</text>
      <text class="knoten-wert" x="${cx}" y="${cy + 8}">${wert}</text>
    `;
  }

  svgNeuron() {
    const e = this.berechneNeuron(this.x);
    const zeigeSumme = this.phase >= 1;
    const zeigeAktiv = this.phase >= 2;

    return `
      <svg viewBox="0 0 520 260" class="diagramm" role="img"
           aria-label="Diagramm eines Neurons mit zwei Eingaben">
        ${this.kante(68, 50, 190, 112, this.bias, "b = " + this.zahl(this.bias, 1))}
        ${this.kante(72, 130, 190, 130, this.gewichte[0], "w₁ = " + this.zahl(this.gewichte[0], 1))}
        ${this.kante(72, 210, 190, 148, this.gewichte[1], "w₂ = " + this.zahl(this.gewichte[1], 1), 10)}
        <line x1="256" y1="130" x2="300" y2="130" class="pfeil" marker-end="url(#spitze-${this.pfeilId})" />
        ${
          this.ohneAktivierung()
            ? ""
            : `<line x1="372" y1="130" x2="416" y2="130" class="pfeil" marker-end="url(#spitze-${this.pfeilId})" />`
        }

        <circle cx="50" cy="50" r="18" class="knoten eingabe" />
        <text class="knoten-wert" x="50" y="56">1</text>
        <text class="knoten-titel" x="50" y="22">Bias</text>

        ${this.knoten(50, 130, 22, "x₁", this.zahl(this.x[0], 2))}
        ${this.knoten(50, 210, 22, "x₂", this.zahl(this.x[1], 2))}

        ${this.knoten(
          222,
          130,
          34,
          "Σ",
          zeigeSumme ? this.zahl(e.z) : "?",
        )}
        ${
          this.ohneAktivierung()
            ? ""
            : this.knoten(
                338,
                130,
                34,
                this.funktionName(),
                zeigeAktiv ? this.zahl(e.a) : "?",
              )
        }
        ${this.knoten(
          this.ohneAktivierung() ? 340 : 456,
          130,
          30,
          "y",
          this.phase >= this.maxPhase() ? this.zahl(e.a) : "?",
        )}
        <defs>
          <marker id="spitze-${this.pfeilId}" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" class="spitze" />
          </marker>
        </defs>
      </svg>
    `;
  }

  svgKurve() {
    const breite = 240;
    const hoehe = 170;
    const e0 = this.berechneNeuron(this.x);
    const spanne = Math.max(6, Math.ceil(Math.abs(e0.z)) + 1);
    const xMin = -spanne;
    const xMax = spanne;
    const yMin = this.funktion === "relu" ? 0 : -0.1;
    const yMax = this.funktion === "relu" ? spanne : 1.1;
    const px = (x) => 34 + ((x - xMin) / (xMax - xMin)) * (breite - 44);
    const py = (y) => hoehe - 28 - ((y - yMin) / (yMax - yMin)) * (hoehe - 44);

    let pfad = "";
    for (let i = 0; i <= 120; i++) {
      const x = xMin + ((xMax - xMin) * i) / 120;
      const y = this.aktiviere(x);
      pfad += (i === 0 ? "M" : "L") + px(x) + " " + py(Math.min(y, yMax));
    }

    const e = this.berechneNeuron(this.x);
    const zGeklemmt = Math.max(xMin, Math.min(xMax, e.z));
    const aGeklemmt = Math.max(yMin, Math.min(yMax, e.a));

    return `
      <svg viewBox="0 0 ${breite} ${hoehe}" class="kurve" role="img"
           aria-label="Verlauf der Aktivierungsfunktion">
        <line x1="${px(xMin)}" y1="${py(0)}" x2="${px(xMax)}" y2="${py(0)}" class="achse" />
        <line x1="${px(0)}" y1="${py(yMin)}" x2="${px(0)}" y2="${py(yMax)}" class="achse" />
        <path d="${pfad}" class="funktion" />
        ${
          this.phase >= 2
            ? `
        <line x1="${px(zGeklemmt)}" y1="${py(yMin)}" x2="${px(zGeklemmt)}" y2="${py(aGeklemmt)}" class="hilfe" />
        <line x1="${px(xMin)}" y1="${py(aGeklemmt)}" x2="${px(zGeklemmt)}" y2="${py(aGeklemmt)}" class="hilfe" />
        <circle cx="${px(zGeklemmt)}" cy="${py(aGeklemmt)}" r="6" class="arbeitspunkt" />`
            : ""
        }
        <text class="achsen-text" x="${px(xMax)}" y="${py(0) + 16}" text-anchor="end">Σ</text>
        <text class="achsen-text" x="${px(0) - 6}" y="${py(yMax) + 10}" text-anchor="end">${this.funktionName()}</text>
      </svg>
    `;
  }

  svgNetz() {
    const e = this.berechneNetz(this.x);
    const hy = [70, 155, 240];
    let kanten = "";

    this.verdeckt.forEach((n, j) => {
      kanten += this.kante(82, 115, 224, hy[j], n.w[0], "", 0);
      kanten += this.kante(82, 195, 224, hy[j], n.w[1], "", 0);
    });
    this.verdeckt.forEach((n, j) => {
      kanten += this.kante(276, hy[j], 412, 155, this.ausgabe.w[j], "", 0);
    });

    const knotenH = this.verdeckt
      .map((n, j) =>
        this.knoten(
          250,
          hy[j],
          26,
          "h" + (j + 1),
          this.phase >= 1 ? this.zahl(e.h[j]) : "?",
        ),
      )
      .join("");

    return `
      <svg viewBox="0 0 520 310" class="diagramm" role="img"
           aria-label="Netz mit zwei Eingaben, drei verdeckten Neuronen und einer Ausgabe">
        ${kanten}
        ${this.knoten(60, 115, 24, "x₁", this.zahl(this.x[0], 2))}
        ${this.knoten(60, 195, 24, "x₂", this.zahl(this.x[1], 2))}
        ${knotenH}
        ${this.knoten(440, 155, 28, "y", this.phase >= 2 ? this.zahl(e.y) : "?")}
        <text class="schicht-titel" x="60" y="35">Eingabe</text>
        <text class="schicht-titel" x="250" y="35">Verdeckt</text>
        <text class="schicht-titel" x="440" y="35">Ausgabe</text>
      </svg>
    `;
  }

  funktionName() {
    if (this.funktion === "keine") return "id";
    if (this.funktion === "relu") return "ReLU";
    if (this.funktion === "stufe") return "Stufe";
    return "σ";
  }

  // --- Rechenweg ---------------------------------------------------------

  rechnungNeuron() {
    const e = this.berechneNeuron(this.x);
    const zeilen = [];
    zeilen.push(
      `<li class="${this.phase >= 1 ? "" : "blass"}">Gewichtete Summe: Σ = ${this.formelSumme(
        [
          { w: this.gewichte[0], x: this.zahl(this.x[0], 2) },
          { w: this.gewichte[1], x: this.zahl(this.x[1], 2) },
        ],
        this.bias,
      )} = <strong>${this.phase >= 1 ? this.zahl(e.z) : "?"}</strong></li>`,
    );
    if (!this.ohneAktivierung()) {
      zeilen.push(
        `<li class="${this.phase >= 2 ? "" : "blass"}">Aktivierung: ${this.funktionName()}(${
          this.phase >= 1 ? this.zahl(e.z) : "Σ"
        }) = <strong>${this.phase >= 2 ? this.zahl(e.a) : "?"}</strong></li>`,
      );
    }
    return `<ol class="rechnung">${zeilen.join("")}</ol>`;
  }

  rechnungNetz() {
    const e = this.berechneNetz(this.x);
    const zeilen = this.verdeckt.map(
      (n, j) =>
        `<li class="${this.phase >= 1 ? "" : "blass"}">h${j + 1}: ${this.funktionName()}(${this.formelSumme(
          [
            { w: n.w[0], x: this.zahl(this.x[0], 2) },
            { w: n.w[1], x: this.zahl(this.x[1], 2) },
          ],
          n.b,
        )}) = ${this.funktionName()}(${
          this.phase >= 1 ? this.zahl(e.hz[j]) : "?"
        }) = <strong>${this.phase >= 1 ? this.zahl(e.h[j]) : "?"}</strong></li>`,
    );
    zeilen.push(
      `<li class="${this.phase >= 2 ? "" : "blass"}">y: ${this.funktionName()}(${this.formelSumme(
        this.ausgabe.w.map((w, j) => ({
          w: w,
          x: this.phase >= 1 ? this.zahl(e.h[j]) : "h" + (j + 1),
        })),
        this.ausgabe.b,
      )}) = <strong>${this.phase >= 2 ? this.zahl(e.y) : "?"}</strong></li>`,
    );
    return `<ol class="rechnung">${zeilen.join("")}</ol>`;
  }

  tabelleHTML() {
    // Ohne Zielfunktion ist die Spalte "gerundet" irreführend: sie setzt eine
    // Schwelle von 0,5 voraus, die an dieser Stelle noch gar nicht eingeführt ist.
    if (this.ziel === "keine") return "";
    const faelle = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const zeilen = faelle.map(([a, b]) => {
      const ergebnis =
        this.modus === "netz"
          ? this.berechneNetz([a, b]).y
          : this.berechneNeuron([a, b]).a;
      const gerundet = ergebnis >= 0.5 ? 1 : 0;
      const soll = this.zielWert(a, b);
      const passt = soll === null ? null : soll === gerundet;
      return `<tr class="${passt === false ? "falsch" : ""}">
        <td>${a}</td><td>${b}</td>
        <td>${this.zahl(ergebnis)}</td>
        <td>${gerundet}</td>
        ${soll === null ? "" : `<td>${soll}</td><td>${passt ? "✓" : "✗"}</td>`}
      </tr>`;
    });

    const alleRichtig =
      this.ziel !== "keine" &&
      faelle.every(([a, b]) => {
        const ergebnis =
          this.modus === "netz"
            ? this.berechneNetz([a, b]).y
            : this.berechneNeuron([a, b]).a;
        return (ergebnis >= 0.5 ? 1 : 0) === this.zielWert(a, b);
      });

    return `
      <table>
        <thead>
          <tr>
            <th>x₁</th><th>x₂</th><th>Ausgabe</th><th>gerundet</th>
            ${this.ziel === "keine" ? "" : "<th>soll</th><th></th>"}
          </tr>
        </thead>
        <tbody>${zeilen.join("")}</tbody>
      </table>
      ${
        alleRichtig
          ? `<p class="erfolg">Geschafft — ${
              this.modus === "netz" ? "das Netz" : "das Neuron"
            } berechnet ${this.ziel.toUpperCase()} für alle vier Fälle.</p>`
          : ""
      }
    `;
  }

  // --- Steuerung ---------------------------------------------------------

  setzeEingabe(index, wert) {
    this.x[index] = wert;
    this.aktualisiere();
  }

  setzeGewicht(index, wert) {
    this.gewichte[index] = wert;
    this.aktualisiere();
  }

  setzeBias(wert) {
    this.bias = wert;
    this.aktualisiere();
  }

  setzeFunktion(wert) {
    this.funktion = wert;
    this.phase = Math.min(this.phase, this.maxPhase());
    this.aktualisiere();
  }

  setzeZiel(wert) {
    this.ziel = wert;
    this.aktualisiere();
  }

  setzeNetzGewicht(schicht, neuron, index, wert) {
    if (schicht === "verdeckt") {
      if (index === "b") this.verdeckt[neuron].b = wert;
      else this.verdeckt[neuron].w[index] = wert;
    } else {
      if (index === "b") this.ausgabe.b = wert;
      else this.ausgabe.w[index] = wert;
    }
    this.aktualisiere();
  }

  weiter() {
    this.phase = Math.min(this.maxPhase(), this.phase + 1);
    this.aktualisiere();
  }

  umschalten() {
    this.phase = this.phase >= this.maxPhase() ? 0 : this.maxPhase();
    this.aktualisiere();
  }

  vorgabe(name) {
    if (name === "und") {
      this.gewichte = [4, 4];
      this.bias = -6;
    } else if (name === "oder") {
      this.gewichte = [4, 4];
      this.bias = -2;
    } else if (name === "null") {
      this.gewichte = [0, 0];
      this.bias = 0;
    } else if (name === "xor-netz") {
      this.verdeckt = [
        { w: [4, 4], b: -2 },
        { w: [4, 4], b: -6 },
        { w: [0, 0], b: 0 },
      ];
      this.ausgabe = { w: [6, -6, 0], b: -3 };
    } else if (name === "buch") {
      this.verdeckt = [
        { w: [0.5, -0.3], b: 0.1 },
        { w: [0.8, 0.2], b: -0.5 },
        { w: [-0.4, 0.9], b: 0.3 },
      ];
      this.ausgabe = { w: [0.6, -0.7, 0.4], b: -0.2 };
    } else if (name === "zufall") {
      const z = () => Math.round((Math.random() * 4 - 2) * 10) / 10;
      this.verdeckt = this.verdeckt.map(() => ({ w: [z(), z()], b: z() }));
      this.ausgabe = { w: [z(), z(), z()], b: z() };
    }
    this.render();
  }

  // --- Ausgabe -----------------------------------------------------------

  aktualisiere() {
    const wurzel = this.shadowRoot;
    const buehne = wurzel.querySelector(".buehne");
    if (buehne) {
      buehne.innerHTML =
        this.modus === "netz"
          ? this.svgNetz()
          : this.svgNeuron() + (this.ohneAktivierung() ? "" : this.svgKurve());
    }
    const rechnung = wurzel.querySelector(".rechnung-box");
    if (rechnung) {
      rechnung.innerHTML =
        this.modus === "netz" ? this.rechnungNetz() : this.rechnungNeuron();
    }
    const tabelle = wurzel.querySelector(".tabelle-box");
    if (tabelle) tabelle.innerHTML = this.tabelleHTML();

    wurzel.querySelectorAll("[data-anzeige]").forEach((span) => {
      const schluessel = span.dataset.anzeige;
      if (schluessel === "x0") span.textContent = this.zahl(this.x[0], 2);
      if (schluessel === "x1") span.textContent = this.zahl(this.x[1], 2);
      if (schluessel === "w0") span.textContent = this.zahl(this.gewichte[0], 1);
      if (schluessel === "w1") span.textContent = this.zahl(this.gewichte[1], 1);
      if (schluessel === "b") span.textContent = this.zahl(this.bias, 1);
    });

    const weiter = wurzel.querySelector(".weiter");
    if (weiter) {
      weiter.textContent =
        this.phase === 0
          ? this.modus === "netz"
            ? "Verdeckte Schicht berechnen"
            : "Summe berechnen"
          : this.modus === "netz"
            ? "Ausgabe berechnen"
            : "Aktivierung anwenden";
      weiter.hidden = this.phase >= this.maxPhase();
    }
    const neu = wurzel.querySelector(".neu");
    if (neu) {
      neu.textContent =
        this.phase >= this.maxPhase() ? "Schritt für Schritt" : "Alles zeigen";
    }
  }

  reglerHTML(klasse, beschriftung, wert, min, max, schritt, anzeige) {
    return `
      <div class="regler">
        <span class="label">${beschriftung}</span>
        <input type="range" class="${klasse}" min="${min}" max="${max}"
               step="${schritt}" value="${wert}" />
        <span class="wert" data-anzeige="${anzeige}">${this.zahl(
          wert,
          schritt < 0.1 ? 2 : 1,
        )}</span>
      </div>
    `;
  }

  netzGewichteHTML() {
    const feld = (schicht, neuron, index, wert) =>
      `<input type="number" class="zahl-feld" step="0.1" min="-9" max="9"
              value="${wert}" data-schicht="${schicht}" data-neuron="${neuron}"
              data-index="${index}" />`;

    const verdeckt = this.verdeckt
      .map(
        (n, j) => `<tr>
          <th>h${j + 1}</th>
          <td>${feld("verdeckt", j, 0, n.w[0])}</td>
          <td>${feld("verdeckt", j, 1, n.w[1])}</td>
          <td>${feld("verdeckt", j, "b", n.b)}</td>
        </tr>`,
      )
      .join("");

    return `
      <details class="gewichte">
        <summary>Gewichte des Netzes</summary>
        <table class="gewichte-tabelle">
          <thead><tr><th>Neuron</th><th>von x₁</th><th>von x₂</th><th>Bias</th></tr></thead>
          <tbody>${verdeckt}</tbody>
        </table>
        <table class="gewichte-tabelle">
          <thead><tr><th>Neuron</th><th>von h1</th><th>von h2</th><th>von h3</th><th>Bias</th></tr></thead>
          <tbody>
            <tr>
              <th>y</th>
              <td>${feld("ausgabe", 0, 0, this.ausgabe.w[0])}</td>
              <td>${feld("ausgabe", 0, 1, this.ausgabe.w[1])}</td>
              <td>${feld("ausgabe", 0, 2, this.ausgabe.w[2])}</td>
              <td>${feld("ausgabe", 0, "b", this.ausgabe.b)}</td>
            </tr>
          </tbody>
        </table>
        <div class="knoepfe">
          <button class="aktion" data-vorgabe="buch">Werte aus dem Buch</button>
          <button class="aktion" data-vorgabe="xor-netz">XOR-Lösung</button>
          <button class="aktion" data-vorgabe="zufall">Zufällig</button>
        </div>
      </details>
    `;
  }

  render() {
    this.pfeilId = Math.random().toString(36).slice(2, 8);

    const eingaben = `
      ${this.reglerHTML("x0-regler", "x₁", this.x[0], 0, 1, 0.05, "x0")}
      ${this.reglerHTML("x1-regler", "x₂", this.x[1], 0, 1, 0.05, "x1")}
      <div class="knoepfe">
        <span class="label">Eingabe setzen:</span>
        <button class="aktion" data-eingabe="0,0">0 | 0</button>
        <button class="aktion" data-eingabe="0,1">0 | 1</button>
        <button class="aktion" data-eingabe="1,0">1 | 0</button>
        <button class="aktion" data-eingabe="1,1">1 | 1</button>
      </div>
    `;

    const neuronSteuerung = `
      ${this.reglerHTML("w0-regler", "Gewicht w₁", this.gewichte[0], -6, 6, 0.1, "w0")}
      ${this.reglerHTML("w1-regler", "Gewicht w₂", this.gewichte[1], -6, 6, 0.1, "w1")}
      ${this.reglerHTML("b-regler", "Bias b", this.bias, -10, 10, 0.1, "b")}
      <div class="knoepfe">
        <span class="label">Vorgabe:</span>
        <button class="aktion" data-vorgabe="und">UND</button>
        <button class="aktion" data-vorgabe="oder">ODER</button>
        <button class="aktion" data-vorgabe="null">Alles auf 0</button>
      </div>
    `;

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

        .steuerung {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 10px 20px;
          margin-bottom: 12px;
        }

        .regler { display: flex; align-items: center; gap: 10px; }
        .regler .label { font-weight: bold; min-width: 5.5em; }
        .regler .wert {
          font-weight: bold;
          min-width: 3em;
          text-align: right;
          color: var(--color-brand, #007864);
          font-variant-numeric: tabular-nums;
        }

        input[type="range"] {
          flex: 1;
          min-width: 80px;
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

        .knoepfe {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .knoepfe .label { font-weight: bold; }

        button, select, .zahl-feld {
          font: inherit;
          font-size: 0.9em;
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          color: var(--color-text, black);
        }
        button { cursor: pointer; }
        button:hover:not(:disabled) { border-color: var(--color-brand, #007864); }
        button:disabled { opacity: 0.5; cursor: default; }
        button[hidden] { display: none; }
        .weiter {
          background: var(--color-brand, #007864);
          color: var(--color-background, white);
          border-color: var(--color-brand, #007864);
          font-weight: bold;
        }
        .zahl-feld { width: 5.2em; padding: 4px 6px; }

        .schritte {
          display: flex;
          gap: 8px;
          align-items: center;
          margin: 10px 0;
          flex-wrap: wrap;
        }

        .buehne {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          padding: 8px;
        }
        .diagramm { flex: 3 1 320px; max-width: 100%; height: auto; }
        .kurve { flex: 1 1 200px; max-width: 260px; height: auto; }

        .knoten {
          fill: var(--color-background, white);
          stroke: var(--color-nav-border, #3c3c3c);
          stroke-width: 2;
        }
        .knoten.eingabe { stroke-dasharray: 4 3; }
        text {
          fill: var(--color-text, black);
          font-family: system-ui, sans-serif;
          text-anchor: middle;
        }
        .knoten-titel { font-size: 13px; font-weight: 600; }
        .knoten-wert { font-size: 16px; font-weight: 700; font-variant-numeric: tabular-nums; }
        .kante { font-size: 12px; font-weight: 600; }
        .schicht-titel { font-size: 13px; font-weight: 700; opacity: 0.7; }
        .pfeil { stroke: var(--color-text, black); stroke-width: 2; opacity: 0.6; }
        .spitze { fill: var(--color-text, black); opacity: 0.6; }
        .achse { stroke: var(--color-text, black); opacity: 0.35; stroke-width: 1; }
        .funktion {
          fill: none;
          stroke: var(--color-brand, #007864);
          stroke-width: 2.5;
        }
        .hilfe {
          stroke: var(--color-text, black);
          stroke-dasharray: 3 3;
          opacity: 0.5;
        }
        .arbeitspunkt {
          fill: var(--color-brand, #007864);
          stroke: var(--color-background, white);
          stroke-width: 2;
        }
        .achsen-text { font-size: 11px; opacity: 0.7; }

        .rechnung { margin: 12px 0 0; padding-left: 1.4em; font-size: 0.92em; }
        .rechnung li { margin: 4px 0; font-variant-numeric: tabular-nums; }
        .rechnung li.blass { opacity: 0.4; }

        table { border-collapse: collapse; margin-top: 10px; font-size: 0.92em; }
        th, td {
          padding: 4px 10px;
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        tr.falsch td { color: var(--color-sync-error, #b91c1c); }
        .erfolg {
          margin: 8px 0 0;
          font-weight: bold;
          color: var(--color-sync-ok, #15803d);
        }

        .gewichte { margin-top: 12px; }
        .gewichte summary { cursor: pointer; font-weight: bold; }
        .gewichte-tabelle th { text-align: right; }
        .tabelle-box { margin-top: 4px; }
      </style>

      <div class="container">
        <div class="steuerung">
          ${eingaben}
          ${this.modus === "netz" ? "" : neuronSteuerung}
        </div>

        <div class="schritte">
          <button class="weiter">Summe berechnen</button>
          <button class="neu">Schritt für Schritt</button>
          <label class="knoepfe">
            <span class="label">Aktivierung:</span>
            <select class="funktion-wahl">
              <option value="keine">keine (nur die Summe)</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="relu">ReLU</option>
              <option value="stufe">Stufe</option>
            </select>
          </label>
          <label class="knoepfe">
            <span class="label">Ziel:</span>
            <select class="ziel-wahl">
              <option value="keine">frei erkunden</option>
              <option value="und">UND</option>
              <option value="oder">ODER</option>
              <option value="xor">XOR</option>
            </select>
          </label>
        </div>

        <div class="buehne"></div>
        <div class="rechnung-box"></div>
        ${this.modus === "netz" ? this.netzGewichteHTML() : ""}
        <div class="tabelle-box"></div>
      </div>
    `;

    const wurzel = this.shadowRoot;
    const binde = (wahl, ereignis, aktion) => {
      const element = wurzel.querySelector(wahl);
      if (element) element.addEventListener(ereignis, aktion);
    };

    binde(".x0-regler", "input", (e) =>
      this.setzeEingabe(0, parseFloat(e.target.value)),
    );
    binde(".x1-regler", "input", (e) =>
      this.setzeEingabe(1, parseFloat(e.target.value)),
    );
    binde(".w0-regler", "input", (e) =>
      this.setzeGewicht(0, parseFloat(e.target.value)),
    );
    binde(".w1-regler", "input", (e) =>
      this.setzeGewicht(1, parseFloat(e.target.value)),
    );
    binde(".b-regler", "input", (e) => this.setzeBias(parseFloat(e.target.value)));
    binde(".weiter", "click", () => this.weiter());
    binde(".neu", "click", () => this.umschalten());

    const funktionWahl = wurzel.querySelector(".funktion-wahl");
    if (funktionWahl) {
      funktionWahl.value = this.funktion;
      funktionWahl.addEventListener("change", (e) =>
        this.setzeFunktion(e.target.value),
      );
    }
    const zielWahl = wurzel.querySelector(".ziel-wahl");
    if (zielWahl) {
      zielWahl.value = this.ziel;
      zielWahl.addEventListener("change", (e) => this.setzeZiel(e.target.value));
    }

    wurzel.querySelectorAll("[data-eingabe]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const teile = btn.dataset.eingabe.split(",").map(parseFloat);
        this.x = teile;
        this.render();
      });
    });
    wurzel.querySelectorAll("[data-vorgabe]").forEach((btn) => {
      btn.addEventListener("click", () => this.vorgabe(btn.dataset.vorgabe));
    });
    wurzel.querySelectorAll(".zahl-feld").forEach((feld) => {
      feld.addEventListener("input", () => {
        const wert = parseFloat(feld.value);
        if (isNaN(wert)) return;
        const index =
          feld.dataset.index === "b" ? "b" : parseInt(feld.dataset.index, 10);
        this.setzeNetzGewicht(
          feld.dataset.schicht,
          parseInt(feld.dataset.neuron, 10),
          index,
          wert,
        );
      });
    });

    this.aktualisiere();
  }
}

customElements.define("ki-neuron", KiNeuron);
