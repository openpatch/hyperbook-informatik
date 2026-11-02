// Stellenwertkarten für das Binärsystem: Jede Karte ist ein Bit, darüber steht ihr
// Stellenwert. Darunter wird die Summe der eingeschalteten Stellenwerte gebildet.
// Mit `ziel` wird daraus ein Training: Stelle die Zahl … dar.
class BinaerStellenwert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.bits = [];
    this.zielIndex = 0;
    this.zufallsZiel = null;
    this.geschafft = 0;
  }

  async connectedCallback() {
    this.anzahl = Math.min(16, Math.max(1, parseInt(this.getAttribute("bits") || "8", 10)));
    this.bits = new Array(this.anzahl).fill(0);
    const ziel = (this.getAttribute("ziel") || "").trim();
    this.zufall = ziel === "zufall";
    this.ziele = this.zufall || !ziel ? [] : ziel.split(",").map((z) => parseInt(z.trim(), 10)).filter((z) => !isNaN(z));
    this.summeAnzeigen = (this.getAttribute("summe") || "ja") !== "nein";
    this.kartenAnzeigen = (this.getAttribute("werte") || "ja") !== "nein";
    await this.ladeZustand();
    if (this.zufall && this.zufallsZiel === null) this.neuesZufallsziel();
    this.render();
  }

  get max() {
    return 2 ** this.anzahl - 1;
  }

  get wert() {
    return this.bits.reduce((s, b, i) => s + b * 2 ** (this.anzahl - 1 - i), 0);
  }

  get aktuellesZiel() {
    if (this.zufall) return this.zufallsZiel;
    if (this.ziele.length === 0) return null;
    return this.ziele[this.zielIndex] ?? null;
  }

  neuesZufallsziel() {
    let z;
    do {
      z = 1 + Math.floor(Math.random() * this.max);
    } while (z === this.zufallsZiel && this.max > 1);
    this.zufallsZiel = z;
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const data = await store.custom.get(id);
      if (!data) return;
      const z = JSON.parse(data.payload);
      if (Array.isArray(z.bits) && z.bits.length === this.anzahl) this.bits = z.bits;
      if (typeof z.zielIndex === "number") this.zielIndex = z.zielIndex;
      if (typeof z.zufallsZiel === "number") this.zufallsZiel = z.zufallsZiel;
      if (typeof z.geschafft === "number") this.geschafft = z.geschafft;
    } catch (e) {
      console.error("binaer-stellenwert: Zustand nicht lesbar", e);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({
        id,
        payload: JSON.stringify({
          bits: this.bits,
          zielIndex: this.zielIndex,
          zufallsZiel: this.zufallsZiel,
          geschafft: this.geschafft,
        }),
      });
    } catch (e) {
      console.error("binaer-stellenwert: Zustand nicht speicherbar", e);
    }
  }

  async kippe(i) {
    this.bits[i] = this.bits[i] ? 0 : 1;
    this.render();
    await this.speichereZustand();
  }

  async weiter() {
    if (this.zufall) {
      this.neuesZufallsziel();
      this.geschafft++;
    } else if (this.zielIndex < this.ziele.length) {
      this.zielIndex++;
    }
    this.bits = this.bits.map(() => 0);
    this.render();
    await this.speichereZustand();
  }

  async vonVorn() {
    this.zielIndex = 0;
    this.geschafft = 0;
    this.bits = this.bits.map(() => 0);
    if (this.zufall) this.neuesZufallsziel();
    this.render();
    await this.speichereZustand();
  }

  render() {
    const ziel = this.aktuellesZiel;
    const fertig = !this.zufall && this.ziele.length > 0 && ziel === null;
    const getroffen = ziel !== null && this.wert === ziel;
    const summanden = this.bits
      .map((b, i) => (b ? 2 ** (this.anzahl - 1 - i) : null))
      .filter((x) => x !== null);
    const summe =
      summanden.length === 0
        ? "0"
        : summanden.length === 1
          ? `${summanden[0]}`
          : `${summanden.join(" + ")} = ${this.wert}`;

    let zielZeile = "";
    if (fertig) {
      zielZeile = `<div class="ziel ok">Alle ${this.ziele.length} Zahlen geschafft! <button class="knopf" data-aktion="neu">Noch einmal</button></div>`;
    } else if (ziel !== null) {
      const fortschritt = this.zufall
        ? this.geschafft > 0 ? ` <span class="klein">(${this.geschafft} geschafft)</span>` : ""
        : ` <span class="klein">(${this.zielIndex + 1} von ${this.ziele.length})</span>`;
      zielZeile = `<div class="ziel ${getroffen ? "ok" : ""}">
        Stelle die Zahl <strong>${ziel}</strong> dar.${fortschritt}
        ${getroffen ? `<span>✔ Richtig!</span><button class="knopf" data-aktion="weiter">Nächste Zahl</button>` : ""}
      </div>`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin: 1em 0; }
        .rahmen {
          border: 2px solid var(--color-nav-border, #ccc);
          border-radius: 12px;
          padding: 16px;
          background: var(--color-background, #fff);
          color: var(--color-text, #000);
          font-family: inherit;
        }
        .karten { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .karte { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .wert { font-size: 0.85em; color: var(--color-text, #000); opacity: 0.75; min-height: 1.2em; }
        button.bit {
          width: 52px; height: 52px; border-radius: 8px; border: 2px solid var(--color-brand, #ba7720);
          font-size: 1.6em; font-weight: bold; cursor: pointer; touch-action: manipulation;
          background: var(--color-background, #fff); color: var(--color-text, #000);
          transition: transform 0.1s ease;
        }
        button.bit.an { background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff); }
        button.bit:active { transform: scale(0.94); }
        .summe { text-align: center; margin-top: 12px; font-size: 1.15em; font-variant-numeric: tabular-nums; }
        .binaer { font-family: monospace; }
        .ziel { text-align: center; margin-bottom: 12px; font-size: 1.1em; display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap; }
        .ziel.ok { color: #15803d; }
        .klein { font-size: 0.8em; opacity: 0.7; }
        .knopf {
          border: none; border-radius: 6px; padding: 6px 14px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff);
        }
        @media (max-width: 480px) {
          button.bit { width: 38px; height: 38px; font-size: 1.2em; }
          .karten { gap: 4px; }
          .wert { font-size: 0.7em; }
        }
      </style>
      <div class="rahmen">
        ${zielZeile}
        <div class="karten">
          ${this.bits
            .map(
              (b, i) => `
            <div class="karte">
              <div class="wert">${this.kartenAnzeigen ? 2 ** (this.anzahl - 1 - i) : ""}</div>
              <button class="bit ${b ? "an" : ""}" data-i="${i}" aria-label="Bit mit Stellenwert ${2 ** (this.anzahl - 1 - i)}: ${b}">${b}</button>
            </div>`,
            )
            .join("")}
        </div>
        ${
          this.summeAnzeigen
            ? `<div class="summe"><span class="binaer">${this.bits.join("")}</span><sub>(2)</sub> → ${summe}<sub>(10)</sub></div>`
            : ""
        }
      </div>`;

    this.shadowRoot.querySelectorAll("button.bit").forEach((k) =>
      k.addEventListener("click", () => this.kippe(parseInt(k.dataset.i, 10))),
    );
    this.shadowRoot.querySelectorAll("[data-aktion]").forEach((k) =>
      k.addEventListener("click", () => (k.dataset.aktion === "weiter" ? this.weiter() : this.vonVorn())),
    );
  }
}

customElements.define("binaer-stellenwert", BinaerStellenwert);
