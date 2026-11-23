// Zweierkomplement-Trainer in zwei Richtungen:
// - richtung="darstellen": Eine Dezimalzahl (meist negativ) ist gegeben. Die Lernenden
//   stellen sie im n-Bit-Register dar, indem sie die Bits anklicken. „Schritte“ zeigt
//   den Rechenweg +|x| → umdrehen → +1. „Prüfen“ vergleicht Bit für Bit.
// - richtung="lesen": Ein Registermuster ist gegeben. Die Lernenden geben den
//   Dezimalwert (mit Vorzeichen) ein.
// Mit `aufgaben="-6,-10"` werden feste Aufgaben übergeben, sonst zufällige Werte.
class Zweierkomplement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.geprueft = false;
    this.schritte = false;
  }

  async connectedCallback() {
    this.anzahl = Math.min(16, Math.max(4, parseInt(this.getAttribute("bits") || "8", 10)));
    this.richtung = this.getAttribute("richtung") === "lesen" ? "lesen" : "darstellen";
    const aufgaben = (this.getAttribute("aufgaben") || "")
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((z) => !isNaN(z) && this.imBereich(z));
    this.feste = this.richtung === "darstellen" ? aufgaben : [];
    this.index = 0;
    this.bits = new Array(this.anzahl).fill(0);
    this.antwort = "";
    this.zielWert = null;
    await this.ladeZustand();
    if (this.zielWert === null) this.neueAufgabe();
    this.render();
  }

  imBereich(z) {
    return z >= -(2 ** (this.anzahl - 1)) && z <= 2 ** (this.anzahl - 1) - 1;
  }

  get muster() {
    return this.bits.join("");
  }

  aufBits(zahl) {
    const u = ((zahl % 2 ** this.anzahl) + 2 ** this.anzahl) % 2 ** this.anzahl;
    return u.toString(2).padStart(this.anzahl, "0").split("").map(Number);
  }

  get wertAusMuster() {
    // Zweierkomplement: oberstes Bit zählt negativ.
    const u = parseInt(this.muster, 2);
    return u >= 2 ** (this.anzahl - 1) ? u - 2 ** this.anzahl : u;
  }

  neueAufgabe() {
    this.geprueft = false;
    this.schritte = false;
    this.antwort = "";
    if (this.richtung === "darstellen") {
      this.zielWert = this.feste.length
        ? this.feste[this.index % this.feste.length]
        : this.zufaelligWert();
      this.bits = new Array(this.anzahl).fill(0);
    } else {
      const z = this.zufaelligWert();
      this.zielWert = z; // nur für die Kontrolle der Eingabe
      this.bits = this.aufBits(z);
    }
  }

  zufaelligWert() {
    // überwiegend negative Werte üben, gelegentlich eine positive Zahl zur Sicherung
    if (Math.random() < 0.2) {
      return Math.floor(Math.random() * (2 ** (this.anzahl - 1) - 1)) + 1;
    }
    return -(Math.floor(Math.random() * (2 ** (this.anzahl - 1) - 1)) + 1);
  }

  async klick(i) {
    this.bits[i] = 1 - this.bits[i];
    this.geprueft = false;
    this.render();
    await this.speichereZustand();
  }

  async pruefe() {
    this.geprueft = true;
    this.render();
    await this.speichereZustand();
  }

  async neu() {
    this.index++;
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
      if (typeof z.zielWert === "number" && this.imBereich(z.zielWert)) {
        this.zielWert = z.zielWert;
        this.antwort = z.antwort || "";
        this.geprueft = !!z.geprueft;
        this.schritte = !!z.schritte;
        this.index = z.index || 0;
      }
    } catch (e) {
      console.error("zweierkomplement: Zustand nicht lesbar", e);
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
          zielWert: this.zielWert,
          antwort: this.antwort,
          geprueft: this.geprueft,
          schritte: this.schritte,
          index: this.index,
        }),
      });
    } catch (e) {
      console.error("zweierkomplement: Zustand nicht speicherbar", e);
    }
  }

  render() {
    const negativ = this.zielWert < 0;
    const betrag = Math.abs(this.zielWert);
    const betragBits = betrag.toString(2).padStart(this.anzahl, "0");
    const invertiert = betragBits
      .split("")
      .map((c) => (c === "0" ? "1" : "0"))
      .join("");
    // Erwartete Bits: aufBits arbeitet mit Restklassen und stimmt für positive und negative Ziele.
    const sollBits = this.aufBits(this.zielWert);
    const komplement = sollBits.join("");

    const stellenwerte = this.bits.map((_, i) =>
      i === 0 ? -(2 ** (this.anzahl - 1)) : 2 ** (this.anzahl - 1 - i),
    );

    let kopf = "";
    let eingabe = "";
    let rückmeldung = "";

    if (this.richtung === "darstellen") {
      kopf = `<div class="aufgabe">Stelle <strong>${this.zielWert}</strong> dar (${this.anzahl} Bit, Zweierkomplement).</div>`;
      eingabe = this.bits
        .map(
          (b, i) =>
            `<button class="karte ${b ? "an" : ""} ${
              this.geprueft ? (b === sollBits[i] ? "richtig" : "falsch") : ""
            }" data-i="${i}" aria-label="Bit an Stelle ${i}">${b}</button>`,
        )
        .join("");
      if (this.geprueft) {
        const ok = this.muster === komplement;
        rückmeldung = ok
          ? `<div class="meldung ok">✔ Richtig! ${this.zielWert} = ${komplement}₍₂₎.</div>`
          : negativ
            ? `<div class="meldung falsch">Rot markierte Bits stimmen noch nicht. Der Weg: +${betrag} = ${betragBits}₍₂₎ → umdrehen: ${invertiert}₍₂₎ → +1 → <strong>${komplement}</strong>.</div>`
            : `<div class="meldung falsch">Rot markierte Bits stimmen noch nicht. Richtig ist +${betrag} = <strong>${betragBits}</strong>₍₂₎.</div>`;
      }
    } else {
      kopf = `<div class="aufgabe">Welchen Dezimalwert hat das Muster <strong>${this.muster}</strong> im ${this.anzahl}-Bit-Register (Zweierkomplement)?</div>`;
      eingabe = this.bits
        .map((b) => `<div class="karte statisch ${b ? "an" : ""}">${b}</div>`)
        .join("");
      const erwartet = this.wertAusMuster;
      if (this.geprueft) {
        const ok = parseInt(this.antwort.trim(), 10) === erwartet;
        rückmeldung = ok
          ? `<div class="meldung ok">✔ Richtig! ${this.muster}₍₂₎ = ${erwartet}.</div>`
          : `<div class="meldung falsch">Noch nicht. Tipp: Das Muster beginnt mit ${
              this.bits[0] === 1 ? "1 – es ist also negativ. Umdrehen und 1 addieren ergibt den Betrag" : "0 – es ist also positiv"
            }.</div>`;
      }
    }

    let schritteHtml = "";
    if (this.richtung === "darstellen" && this.schritte) {
      schritteHtml = negativ
        ? `
        <div class="schritte">
          <div>+${betrag}: &nbsp;&nbsp;&nbsp;${betragBits}</div>
          <div>umdrehen: ${invertiert}</div>
          <div>+1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${komplement}</strong> &nbsp;(= −${betrag})</div>
        </div>`
        : `
        <div class="schritte">
          <div>+${betrag} (positiv, einfach binär): <strong>${betragBits}</strong></div>
        </div>`;
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
          display: grid; grid-template-columns: repeat(${this.anzahl}, 40px); gap: 4px;
          justify-content: center; font-family: monospace; font-size: 1.4em; text-align: center;
        }
        .karte {
          height: 46px; border: 2px solid var(--color-nav-border, #999); border-radius: 6px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
          cursor: pointer; font: inherit; touch-action: manipulation;
        }
        .karte.an { border-color: var(--color-brand, #ba7720); background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff); }
        .karte.statisch { cursor: default; }
        .karte.richtig { border-color: #15803d; border-style: solid; background: #dcfce7; color: #000; }
        .karte.richtig.an { background: #dcfce7; color: #000; }
        .karte.falsch { border-color: #b91c1c; border-style: solid; background: #fee2e2; color: #000; }
        .werte { font-size: 0.62em; opacity: 0.65; height: 18px; display: flex; align-items: flex-end; justify-content: center; }
        .werte.neg { color: #b91c1c; opacity: 1; }
        .knoepfe { display: flex; gap: 10px; justify-content: center; margin-top: 14px; flex-wrap: wrap; align-items: center; }
        .knopf {
          border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff);
        }
        .knopf.zweit { background: var(--color-spacer, #a4a4a4); color: var(--color-text, #000); }
        .eingabefeld {
          margin-top: 12px; text-align: center;
        }
        .eingabefeld input {
          font: inherit; padding: 6px 10px; width: 120px; text-align: center;
          border: 2px solid var(--color-nav-border, #999); border-radius: 6px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
        }
        .schritte {
          margin-top: 12px; font-family: monospace; text-align: center; line-height: 1.7;
          border-top: 1px dashed var(--color-nav-border, #ccc); padding-top: 10px;
        }
        .meldung { text-align: center; margin-top: 12px; }
        .meldung.ok { color: #15803d; }
        .meldung.falsch { color: #b91c1c; }
        @media (max-width: 520px) {
          .raster { grid-template-columns: repeat(${this.anzahl}, 28px); font-size: 1em; }
          .karte { height: 32px; }
        }
      </style>
      <div class="rahmen">
        ${kopf}
        <div class="raster">
          ${stellenwerte.map((w, i) => `<div class="werte ${i === 0 ? "neg" : ""}">${w}</div>`).join("")}
          ${eingabe}
        </div>
        ${
          this.richtung === "lesen"
            ? `<div class="eingabefeld"><input type="text" inputmode="numeric" placeholder="z. B. -75" value="${this.antwort}" aria-label="Dezimalwert eingeben"></div>`
            : ""
        }
        <div class="knoepfe">
          <button class="knopf" data-aktion="pruefen">Prüfen</button>
          ${
            this.richtung === "darstellen"
              ? `<button class="knopf zweit" data-aktion="schritte">${this.schritte ? "Schritte ausblenden" : "Schritte zeigen"}</button>`
              : ""
          }
          <button class="knopf zweit" data-aktion="neu">Neue Aufgabe</button>
        </div>
        ${schritteHtml}
        ${rückmeldung}
      </div>`;

    this.shadowRoot.querySelectorAll("button.karte[data-i]").forEach((k) =>
      k.addEventListener("click", () => this.klick(parseInt(k.dataset.i, 10))),
    );
    const feld = this.shadowRoot.querySelector("input");
    if (feld) {
      feld.addEventListener("input", async () => {
        this.antwort = feld.value;
        this.geprueft = false;
        await this.speichereZustand();
      });
      feld.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.pruefe();
      });
    }
    this.shadowRoot.querySelector("[data-aktion=pruefen]").addEventListener("click", () => this.pruefe());
    const schThere = this.shadowRoot.querySelector("[data-aktion=schritte]");
    if (schThere) {
      schThere.addEventListener("click", async () => {
        this.schritte = !this.schritte;
        this.render();
        await this.speichereZustand();
      });
    }
    this.shadowRoot.querySelector("[data-aktion=neu]").addEventListener("click", () => this.neu());
  }
}

customElements.define("zweierkomplement", Zweierkomplement);
