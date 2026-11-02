// Ein stark vereinfachter Prozessor mit acht Speicherzellen, Befehlszähler, Befehlsregister
// und Akkumulator. Jeder Klick auf „Schritt“ führt eine Phase des Befehlszyklus aus:
// Holen → Dekodieren → Ausführen. Befehle und Daten stehen im selben Speicher und werden
// beide als 8-Bit-Muster angezeigt (3 Bit Befehl, 5 Bit Adresse).
//
//   speicher="LADE 5; ADDIERE 6; SPEICHERE 7; STOPP; 0; 3; 4; 0"
const MP_BEFEHLE = {
  STOPP: 0,
  LADE: 1,
  ADDIERE: 2,
  SUBTRAHIERE: 3,
  SPEICHERE: 4,
  SPRINGE: 5,
};
const MP_NAMEN = Object.fromEntries(Object.entries(MP_BEFEHLE).map(([k, v]) => [v, k]));
const MP_ERKLAERUNG = {
  STOPP: "Das Programm ist zu Ende.",
  LADE: (a) => `Lade den Inhalt von Zelle ${a} in den Akkumulator.`,
  ADDIERE: (a) => `Addiere den Inhalt von Zelle ${a} zum Akkumulator (Rechenwerk).`,
  SUBTRAHIERE: (a) => `Subtrahiere den Inhalt von Zelle ${a} vom Akkumulator (Rechenwerk).`,
  SPEICHERE: (a) => `Schreibe den Akkumulator in Zelle ${a}.`,
  SPRINGE: (a) => `Setze den Befehlszähler auf ${a}.`,
};

class MiniProzessor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.anzahl = Math.min(16, Math.max(4, parseInt(this.getAttribute("zellen") || "8", 10)));
    this.zuruecksetzen();
  }

  leseSpeicher() {
    const teile = (this.getAttribute("speicher") || "LADE 5; ADDIERE 6; SPEICHERE 7; STOPP; 0; 3; 4; 0")
      .split(";")
      .map((s) => s.trim());
    const zellen = new Array(this.anzahl).fill(0);
    teile.forEach((t, i) => {
      if (i >= this.anzahl || t === "") return;
      const m = t.toUpperCase().match(/^([A-ZÄÖÜ]+)\s*(\d+)?$/);
      if (m && MP_BEFEHLE[m[1]] !== undefined) {
        zellen[i] = (MP_BEFEHLE[m[1]] << 5) | (parseInt(m[2] || "0", 10) & 31);
      } else if (/^\d+$/.test(t)) {
        zellen[i] = parseInt(t, 10) & 255;
      }
    });
    return zellen;
  }

  zuruecksetzen() {
    this.speicher = this.leseSpeicher();
    this.bz = 0;
    this.br = null;
    this.akku = 0;
    this.phase = "holen";
    this.meldung = "Bereit. Klicke auf „Schritt“.";
    this.aktiv = { zelle: null, teil: null };
    this.angehalten = false;
    this.render();
  }

  dekodiere(wert) {
    const op = wert >> 5;
    const adr = wert & 31;
    const name = MP_NAMEN[op] || "?";
    return { op, adr, name };
  }

  schritt() {
    if (this.angehalten) return;
    if (this.phase === "holen") {
      if (this.bz >= this.anzahl) {
        this.meldung = "Der Befehlszähler zeigt hinter den Speicher – der Prozessor hält an.";
        this.angehalten = true;
      } else {
        this.br = this.speicher[this.bz];
        this.aktiv = { zelle: this.bz, teil: "br" };
        this.meldung = `<b>Holen:</b> Das Steuerwerk holt den Inhalt von Zelle ${this.bz} ins Befehlsregister und erhöht den Befehlszähler auf ${this.bz + 1}.`;
        this.bz++;
        this.phase = "dekodieren";
      }
    } else if (this.phase === "dekodieren") {
      const b = this.dekodiere(this.br);
      const text = typeof MP_ERKLAERUNG[b.name] === "function" ? MP_ERKLAERUNG[b.name](b.adr) : MP_ERKLAERUNG[b.name] || "Unbekannter Befehl.";
      this.aktiv = { zelle: null, teil: "br" };
      this.meldung = `<b>Dekodieren:</b> ${this.bin(this.br).slice(0, 3)} bedeutet <b>${b.name}</b>${b.name === "STOPP" ? "" : `, ${this.bin(this.br).slice(3)} ist die Adresse ${b.adr}`}. ${text}`;
      this.phase = "ausfuehren";
    } else {
      const b = this.dekodiere(this.br);
      const zelle = b.adr < this.anzahl ? b.adr : null;
      switch (b.name) {
        case "LADE":
          this.akku = this.speicher[zelle] ?? 0;
          this.aktiv = { zelle, teil: "akku" };
          this.meldung = `<b>Ausführen:</b> Der Akkumulator enthält jetzt ${this.akku}.`;
          break;
        case "ADDIERE":
          this.akku = (this.akku + (this.speicher[zelle] ?? 0)) & 255;
          this.aktiv = { zelle, teil: "akku" };
          this.meldung = `<b>Ausführen:</b> Das Rechenwerk addiert. Der Akkumulator enthält jetzt ${this.akku}.`;
          break;
        case "SUBTRAHIERE":
          this.akku = (this.akku - (this.speicher[zelle] ?? 0) + 256) & 255;
          this.aktiv = { zelle, teil: "akku" };
          this.meldung = `<b>Ausführen:</b> Das Rechenwerk subtrahiert. Der Akkumulator enthält jetzt ${this.akku}.`;
          break;
        case "SPEICHERE":
          if (zelle !== null) this.speicher[zelle] = this.akku;
          this.aktiv = { zelle, teil: "speicher" };
          this.meldung = `<b>Ausführen:</b> Zelle ${b.adr} enthält jetzt ${this.akku}.`;
          break;
        case "SPRINGE":
          this.bz = b.adr;
          this.aktiv = { zelle: null, teil: "bz" };
          this.meldung = `<b>Ausführen:</b> Der Befehlszähler steht jetzt auf ${b.adr}.`;
          break;
        default:
          this.angehalten = true;
          this.aktiv = { zelle: null, teil: null };
          this.meldung = `<b>STOPP:</b> Das Programm ist beendet.`;
      }
      this.phase = "holen";
    }
    this.render();
  }

  bin(w) {
    return w.toString(2).padStart(8, "0");
  }

  render() {
    const zeile = (w, i) => {
      const b = this.dekodiere(w);
      const istBz = i === this.bz && !this.angehalten;
      const aktiv = this.aktiv.zelle === i;
      return `<tr class="${aktiv ? "aktiv" : ""}">
        <td class="adr">${istBz ? "▶ " : ""}${i}</td>
        <td class="bits"><span class="op">${this.bin(w).slice(0, 3)}</span>${this.bin(w).slice(3)}</td>
        <td>${b.name}${b.name === "STOPP" ? "" : " " + b.adr}</td>
        <td>${w}</td>
        <td><input type="number" min="0" max="255" value="${w}" data-zelle="${i}" aria-label="Zelle ${i} als Zahl"></td>
      </tr>`;
    };
    const brText = this.br === null ? "–" : `${this.bin(this.br)} (${this.dekodiere(this.br).name}${this.dekodiere(this.br).name === "STOPP" ? "" : " " + this.dekodiere(this.br).adr})`;
    const phasen = ["holen", "dekodieren", "ausfuehren"]
      .map((p) => `<span class="phase ${this.phase === p && !this.angehalten ? "jetzt" : ""}">${{ holen: "Holen", dekodieren: "Dekodieren", ausfuehren: "Ausführen" }[p]}</span>`)
      .join(" → ");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin: 1em 0; }
        .rahmen { border: 2px solid var(--color-nav-border, #ccc); border-radius: 12px; padding: 16px;
          background: var(--color-background, #fff); color: var(--color-text, #000); }
        .oben { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
        .kasten { border: 2px solid var(--color-text, #000); border-radius: 8px; padding: 8px 12px; min-width: 220px; }
        .kasten h4 { margin: 0 0 6px; font-size: 0.95em; }
        .reg { font-family: monospace; display: flex; justify-content: space-between; gap: 12px; padding: 3px 4px; border-radius: 4px; }
        .reg.aktiv { background: color-mix(in srgb, var(--color-brand, #ba7720) 30%, transparent); }
        table { border-collapse: collapse; font-family: monospace; margin: 12px auto 0; }
        th, td { border: 1px solid var(--color-nav-border, #ccc); padding: 3px 8px; text-align: center; }
        td.adr { min-width: 3em; }
        tr.aktiv td { background: color-mix(in srgb, var(--color-brand, #ba7720) 30%, transparent); }
        .op { color: var(--color-brand, #ba7720); font-weight: bold; }
        input { width: 4.5em; font: inherit; background: var(--color-background, #fff); color: var(--color-text, #000); border: 1px solid var(--color-nav-border, #ccc); border-radius: 4px; }
        .phasen { text-align: center; margin: 10px 0 4px; }
        .phase { padding: 2px 8px; border-radius: 10px; }
        .phase.jetzt { background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff); }
        .meldung { text-align: center; min-height: 3em; margin: 6px 0; }
        .knoepfe { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .knopf { border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff); }
        .knopf:disabled { opacity: 0.5; cursor: not-allowed; }
        .knopf.zweit { background: var(--color-spacer, #a4a4a4); color: var(--color-text, #000); }
        .klein { font-size: 0.8em; opacity: 0.75; text-align: center; margin-top: 6px; }
      </style>
      <div class="rahmen">
        <div class="oben">
          <div class="kasten">
            <h4>Steuerwerk</h4>
            <div class="reg ${this.aktiv.teil === "bz" ? "aktiv" : ""}"><span>Befehlszähler</span><span>${this.bz}</span></div>
            <div class="reg ${this.aktiv.teil === "br" ? "aktiv" : ""}"><span>Befehlsregister</span><span>${brText}</span></div>
          </div>
          <div class="kasten">
            <h4>Rechenwerk</h4>
            <div class="reg ${this.aktiv.teil === "akku" ? "aktiv" : ""}"><span>Akkumulator</span><span>${this.bin(this.akku)} = ${this.akku}</span></div>
          </div>
        </div>
        <div class="phasen">${phasen}</div>
        <div class="meldung">${this.meldung}</div>
        <div class="knoepfe">
          <button class="knopf" data-aktion="schritt" ${this.angehalten ? "disabled" : ""}>Schritt</button>
          <button class="knopf" data-aktion="befehl" ${this.angehalten ? "disabled" : ""}>Ganzer Befehl</button>
          <button class="knopf zweit" data-aktion="reset">Zurücksetzen</button>
        </div>
        <table>
          <thead><tr><th>Zelle</th><th>Bitmuster</th><th>als Befehl</th><th>als Zahl</th><th>ändern</th></tr></thead>
          <tbody>${this.speicher.map(zeile).join("")}</tbody>
        </table>
        <div class="klein">Speicher: Befehle und Daten stehen im selben Speicher. Die ersten 3 Bit (farbig) sind der Befehl, die letzten 5 Bit die Adresse. ▶ markiert die Zelle, auf die der Befehlszähler zeigt.</div>
      </div>`;

    const r = this.shadowRoot;
    r.querySelector("[data-aktion=schritt]").addEventListener("click", () => this.schritt());
    r.querySelector("[data-aktion=befehl]").addEventListener("click", () => {
      do this.schritt();
      while (this.phase !== "holen" && !this.angehalten);
    });
    r.querySelector("[data-aktion=reset]").addEventListener("click", () => this.zuruecksetzen());
    r.querySelectorAll("input[data-zelle]").forEach((inp) =>
      inp.addEventListener("change", () => {
        const v = Math.max(0, Math.min(255, parseInt(inp.value || "0", 10)));
        this.speicher[parseInt(inp.dataset.zelle, 10)] = v;
        this.render();
      }),
    );
  }
}

customElements.define("mini-prozessor", MiniProzessor);
