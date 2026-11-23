// Bitshift-Register: Bits per Klick setzen (freier Modus) und mit Pfeil-Knöpfen
// um eine Stelle nach links (×2) bzw. rechts (÷2) verschieben. Zeigt den Wert und
// das Bit, das beim Schieben herausfällt. Im Modus `ziel` gilt es, einen Zielwert
// nur durch Verschieben zu erreichen (`<<`/`>>` wie im Programmcode).
class BinaerShift extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.anzahl = Math.min(16, Math.max(2, parseInt(this.getAttribute("bits") || "8", 10)));
    this.zielModus = this.getAttribute("modus") === "ziel";
    const startWert = parseInt(this.getAttribute("wert") || "0", 10);
    this.bits = this.aufBits(isNaN(startWert) ? 0 : startWert);
    this.letzteAktion = null;
    await this.ladeZustand();
    if (this.zielModus && this.zielWert === null) this.neueAufgabe();
    this.render();
  }

  get max() {
    return 2 ** this.anzahl - 1;
  }

  aufBits(wert) {
    return wert.toString(2).padStart(this.anzahl, "0").split("").map(Number);
  }

  get wert() {
    return this.bits.reduce((s, b, i) => s + b * 2 ** (this.anzahl - 1 - i), 0);
  }

  setzeBits(wert) {
    this.bits = this.aufBits(((Math.floor(wert) % 2 ** this.anzahl) + 2 ** this.anzahl) % 2 ** this.anzahl);
  }

  neueAufgabe() {
    // Ziel = Start · 2ᵏ mit k ∈ {1, 2, 3}. Ungerader Start, damit genau k Shifts nötig sind.
    let k = 1 + Math.floor(Math.random() * 3);
    let obergrenze = Math.floor(this.max / 2 ** k); // größte erlaubte Startzahl
    if (obergrenze < 1) {
      k = 1;
      obergrenze = Math.floor(this.max / 2);
    }
    const start = 1 + 2 * Math.floor(Math.random() * Math.ceil(obergrenze / 2)); // ungerade ≤ obergrenze
    this.startWert = start;
    this.zielWert = start * 2 ** k;
    this.minShifts = k;
    this.setzeBits(start);
    this.shifts = 0;
    this.geschafft = false;
    this.letzteAktion = null;
  }

  async klick(i) {
    this.bits[i] = 1 - this.bits[i];
    this.letzteAktion = null;
    this.render();
    await this.speichereZustand();
  }

  async schiebe(richtung) {
    const vorher = this.wert;
    let heraus;
    if (richtung === "links") {
      heraus = this.bits[0];
      this.bits = [...this.bits.slice(1), 0];
    } else {
      heraus = this.bits[this.bits.length - 1];
      this.bits = [0, ...this.bits.slice(0, -1)];
    }
    const nachher = this.wert;
    this.shifts = (this.shifts || 0) + 1;
    this.letzteAktion = { richtung, vorher, nachher, heraus };
    if (this.zielModus && this.wert === this.zielWert) this.geschafft = true;
    this.render();
    await this.speichereZustand();
  }

  async zuruecksetzen() {
    if (this.zielModus) {
      this.setzeBits(this.startWert);
      this.shifts = 0;
      this.geschafft = false;
    } else {
      this.bits = new Array(this.anzahl).fill(0);
    }
    this.letzteAktion = null;
    this.render();
    await this.speichereZustand();
  }

  async neu() {
    this.neueAufgabe();
    this.render();
    await this.speichereZustand();
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const data = await store.custom.get(id);
      if (!data) return;
      const z = JSON.parse(data.payload);
      if (Array.isArray(z.bits) && z.bits.length === this.anzahl) this.bits = z.bits;
      if (this.zielModus && typeof z.zielWert === "number") {
        this.startWert = z.startWert;
        this.zielWert = z.zielWert;
        this.minShifts = Math.round(Math.log2(z.zielWert / z.startWert));
        this.shifts = z.shifts || 0;
        this.geschafft = !!z.geschafft;
      }
    } catch (e) {
      console.error("binaer-shift: Zustand nicht lesbar", e);
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
          startWert: this.startWert,
          zielWert: this.zielWert,
          shifts: this.shifts,
          geschafft: this.geschafft,
        }),
      });
    } catch (e) {
      console.error("binaer-shift: Zustand nicht speicherbar", e);
    }
  }

  render() {
    const stellenwerte = this.bits.map((_, i) => 2 ** (this.anzahl - 1 - i));
    const wert = this.wert;
    const karten = this.bits
      .map(
        (b, i) =>
          `<button class="karte ${b ? "an" : ""}" data-i="${i}" ${
            this.zielModus ? "disabled" : ""
          } aria-label="Bit an Stelle ${i}">${b}</button>`,
      )
      .join("");

    let aktion = "";
    if (this.letzteAktion) {
      const a = this.letzteAktion;
      const wie = a.richtung === "links" ? "nach links" : "nach rechts";
      aktion = `<div class="meldung ${a.heraus === 1 ? "verlust" : ""}">Geschoben ${wie}: ${a.vorher} → ${a.nachher}` +
        `. Herausgefallen: <strong>${a.heraus}</strong>` +
        (a.heraus === 1
          ? a.richtung === "links"
            ? " – die 1 ist verloren: der Registerwert stimmt nicht mehr mit „mal 2“ überein."
            : " – die 1 ist verloren: der Rest wurde abgeschnitten."
          : "") +
        `</div>`;
    }

    let zielInfo = "";
    if (this.zielModus) {
      zielInfo = `<div class="aufgabe">Start: <strong>${this.startWert}</strong> → Ziel: <strong>${this.zielWert}</strong> &nbsp;·&nbsp; Shifts: ${
        this.shifts || 0
      }</div>`;
    }
    let erfolg = "";
    if (this.geschafft) {
      erfolg = `<div class="meldung ok">✔ Ziel erreicht! Du hast ${this.shifts} Shifts gebraucht – mindestens nötig waren ${
        this.minShifts
      }.</div>`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin: 1em 0; }
        .rahmen {
          border: 2px solid var(--color-nav-border, #ccc); border-radius: 12px; padding: 16px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
        }
        .aufgabe { text-align: center; margin-bottom: 12px; }
        .raster {
          display: grid; grid-template-columns: repeat(${this.anzahl}, 44px); gap: 4px;
          justify-content: center; font-family: monospace; font-size: 1.4em; text-align: center;
        }
        .karte {
          height: 48px; border: 2px solid var(--color-nav-border, #999); border-radius: 6px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
          cursor: pointer; font: inherit; touch-action: manipulation;
        }
        .karte.an { border-color: var(--color-brand, #ba7720); background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff); }
        .karte:disabled { cursor: default; }
        .werte { font-size: 0.72em; opacity: 0.65; height: 20px; display: flex; align-items: flex-end; justify-content: center; }
        .summe { grid-column: 1 / -1; padding-top: 8px; font-size: 0.9em; }
        .knoepfe { display: flex; gap: 10px; justify-content: center; margin-top: 14px; flex-wrap: wrap; align-items: center; }
        .knopf {
          border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff);
        }
        .knopf.zweit { background: var(--color-spacer, #a4a4a4); color: var(--color-text, #000); }
        .knopf.richtung { font-family: monospace; font-size: 1.1em; min-width: 84px; }
        .meldung { text-align: center; margin-top: 12px; }
        .meldung.ok { color: #15803d; }
        .meldung.verlust { color: #b91c1c; }
        .hinweis { text-align: center; font-size: 0.85em; opacity: 0.75; margin-bottom: 10px; }
        @media (max-width: 520px) {
          .raster { grid-template-columns: repeat(${this.anzahl}, 30px); font-size: 1em; }
          .karte { height: 34px; }
        }
      </style>
      <div class="rahmen">
        ${
          this.zielModus
            ? `<div class="hinweis">Erreiche den Zielwert nur mit den beiden Schiebe-Knöpfen. Die Bit-Karten sind dafür gesperrt.</div>`
            : `<div class="hinweis">Klicke die Karten, um Bits zu setzen. <code>⇐</code> schiebt nach links (mal 2), <code>⇒</code> nach rechts (geteilt durch 2).</div>`
        }
        ${zielInfo}
        <div class="raster">
          ${stellenwerte.map((w) => `<div class="werte">${w}</div>`).join("")}
          ${karten}
          <div class="summe">Wert im Register: <strong>${wert}</strong></div>
        </div>
        <div class="knoepfe">
          <button class="knopf richtung" data-aktion="links" title="alle Bits nach links schieben (mal 2)">⇐ 1</button>
          <button class="knopf richtung" data-aktion="rechts" title="alle Bits nach rechts schieben (durch 2)">1 ⇒</button>
          <button class="knopf zweit" data-aktion="zurueck">${this.zielModus ? "Zurück zum Start" : "Alles auf 0"}</button>
          ${this.zielModus ? `<button class="knopf zweit" data-aktion="neu">Neue Aufgabe</button>` : ""}
        </div>
        ${aktion}
        ${erfolg}
      </div>`;

    if (!this.zielModus) {
      this.shadowRoot.querySelectorAll("button.karte").forEach((k) =>
        k.addEventListener("click", () => this.klick(parseInt(k.dataset.i, 10))),
      );
    }
    this.shadowRoot.querySelector("[data-aktion=links]").addEventListener("click", () => this.schiebe("links"));
    this.shadowRoot.querySelector("[data-aktion=rechts]").addEventListener("click", () => this.schiebe("rechts"));
    this.shadowRoot.querySelector("[data-aktion=zurueck]").addEventListener("click", () => this.zuruecksetzen());
    const neuK = this.shadowRoot.querySelector("[data-aktion=neu]");
    if (neuK) neuK.addEventListener("click", () => this.neu());
  }
}

customElements.define("binaer-shift", BinaerShift);
