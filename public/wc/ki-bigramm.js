const BIGRAMM_STANDARD_KORPUS =
  "die Katze schläft die Katze jagt die Maus schläft die Maus jagt die Katze schläft die Maus schläft";

class KiBigramm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.korpus = BIGRAMM_STANDARD_KORPUS;
    this.sauber = false;
    this.zufall = true;
    this.erzeugt = [];
    this.gewaehlt = null;
    this.meldung = "";
  }

  async connectedCallback() {
    this.korpus = this.getAttribute("korpus") || BIGRAMM_STANDARD_KORPUS;
    this.startKorpus = this.korpus;
    this.sauber = this.hasAttribute("sauber");
    this.ansichten = (this.getAttribute("ansicht") || "alle")
      .split(",")
      .map((a) => a.trim().toLowerCase());
    await this.ladeZustand();
    this.baueModell();
    this.erzeugt = this.vokabular.length > 0 ? [this.vokabular[0]] : [];
    this.render();
  }

  zeigt(name) {
    return this.ansichten.includes("alle") || this.ansichten.includes(name);
  }

  // --- Zustand -----------------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (!daten) return;
      const zustand = JSON.parse(daten.payload);
      if (typeof zustand.korpus === "string") this.korpus = zustand.korpus;
      if (typeof zustand.sauber === "boolean") this.sauber = zustand.sauber;
    } catch (error) {
      console.error("Failed to load ki-bigramm state:", error);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({ korpus: this.korpus, sauber: this.sauber }),
      });
    } catch (error) {
      console.error("Failed to save ki-bigramm state:", error);
    }
  }

  // --- Modell ------------------------------------------------------------

  zerlege(text) {
    if (!this.sauber) {
      // Genau wie im Buch: split(" ") — leere Tokens bleiben erhalten.
      return text.split(" ");
    }
    return text
      .toLowerCase()
      .replace(/([.,!?;:])/g, " $1 ")
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }

  baueModell() {
    this.tokens = this.zerlege(this.korpus);

    this.vokabular = [];
    this.tokens.forEach((t) => {
      if (!this.vokabular.includes(t)) this.vokabular.push(t);
    });

    const n = this.vokabular.length;
    this.haeufigkeit = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < this.tokens.length - 1; i++) {
      const a = this.vokabular.indexOf(this.tokens[i]);
      const b = this.vokabular.indexOf(this.tokens[i + 1]);
      if (a >= 0 && b >= 0) this.haeufigkeit[a][b]++;
    }

    if (this.gewaehlt !== null && this.gewaehlt >= n) this.gewaehlt = null;
  }

  zeilenSumme(index) {
    if (index < 0 || !this.haeufigkeit[index]) return 0;
    return this.haeufigkeit[index].reduce((s, w) => s + w, 0);
  }

  verteilung(token) {
    const index = this.vokabular.indexOf(token);
    const summe = this.zeilenSumme(index);
    if (index < 0 || summe === 0) return [];
    return this.haeufigkeit[index]
      .map((anzahl, j) => ({
        token: this.vokabular[j],
        anzahl: anzahl,
        p: anzahl / summe,
      }))
      .filter((e) => e.anzahl > 0)
      .sort((a, b) => b.anzahl - a.anzahl);
  }

  waehleNaechstes(token) {
    const verteilung = this.verteilung(token);
    if (verteilung.length === 0) return null;
    if (!this.zufall) return verteilung[0].token;
    let wurf = Math.random();
    for (const eintrag of verteilung) {
      wurf -= eintrag.p;
      if (wurf <= 0) return eintrag.token;
    }
    return verteilung[verteilung.length - 1].token;
  }

  // --- Aktionen ----------------------------------------------------------

  async setzeKorpus(text) {
    this.korpus = text;
    this.baueModell();
    this.erzeugt = this.vokabular.length > 0 ? [this.vokabular[0]] : [];
    this.meldung = "";
    this.render();
    await this.speichereZustand();
  }

  async setzeSauber(wert) {
    this.sauber = wert;
    this.baueModell();
    this.erzeugt = this.vokabular.length > 0 ? [this.vokabular[0]] : [];
    this.meldung = "";
    this.render();
    await this.speichereZustand();
  }

  setzeZufall(wert) {
    this.zufall = wert;
    this.aktualisiere();
  }

  waehleZeile(index) {
    this.gewaehlt = this.gewaehlt === index ? null : index;
    this.aktualisiere();
  }

  setzeStart(token) {
    this.erzeugt = [token];
    this.meldung = "";
    this.aktualisiere();
  }

  einSchritt() {
    const aktuell = this.erzeugt[this.erzeugt.length - 1];
    const naechstes = this.waehleNaechstes(aktuell);
    if (naechstes === null) {
      this.meldung =
        "„" + aktuell + "“ hat im Korpus keinen Nachfolger — hier endet der Text.";
      this.aktualisiere();
      return false;
    }
    this.erzeugt.push(naechstes);
    this.meldung = "";
    this.aktualisiere();
    return true;
  }

  mehrereSchritte(anzahl) {
    for (let i = 0; i < anzahl; i++) {
      if (!this.einSchritt()) break;
    }
  }

  zuruecksetzen() {
    this.korpus = this.startKorpus;
    this.baueModell();
    this.erzeugt = this.vokabular.length > 0 ? [this.vokabular[0]] : [];
    this.meldung = "";
    this.render();
    this.speichereZustand();
  }

  // --- Ausgabe -----------------------------------------------------------

  sicher(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  prozent(p) {
    return (Math.round(p * 1000) / 10).toString().replace(".", ",") + " %";
  }

  tokensHTML() {
    const chips = this.tokens
      .map((t, i) =>
        t.length === 0
          ? `<span class="chip leer" title="leeres Token">∅</span>`
          : `<span class="chip"><span class="nummer">${i}</span>${this.sicher(t)}</span>`,
      )
      .join("");

    const leere = this.tokens.filter((t) => t.length === 0).length;

    return `
      <h4>Tokens</h4>
      <div class="chips">${chips}</div>
      <p class="hinweis">
        ${this.tokens.length} Tokens · ${this.vokabular.length} verschiedene (Vokabular)
        ${leere > 0 ? ` · <strong>${leere} leere Tokens</strong> (∅)` : ""}
      </p>
    `;
  }

  tabelleHTML() {
    const n = this.vokabular.length;
    if (n === 0) return "";
    const grenze = 24;
    const sichtbar = this.vokabular.slice(0, grenze);

    const kopf = sichtbar
      .map((t) => `<th class="dreh"><span>${this.sicher(t)}</span></th>`)
      .join("");

    const zeilen = sichtbar
      .map((t, i) => {
        const summe = this.zeilenSumme(i);
        const zellen = sichtbar
          .map((_, j) => {
            const anzahl = this.haeufigkeit[i][j];
            const p = summe > 0 ? anzahl / summe : 0;
            return `<td class="zelle ${anzahl > 0 ? "gefuellt" : ""}"
                        style="${anzahl > 0 ? `background:var(--color-nav, #f5f5f5);background:color-mix(in srgb, var(--color-brand, #007864) ${Math.round(p * 70) + 12}%, transparent)` : ""}"
                        title="${this.sicher(t)} → ${this.sicher(this.vokabular[j])}: ${anzahl}×${summe > 0 ? " = " + this.prozent(p) : ""}">${anzahl || ""}</td>`;
          })
          .join("");
        return `<tr class="${this.gewaehlt === i ? "gewaehlt" : ""}">
          <th class="zeilen-kopf" data-zeile="${i}">${this.sicher(t)}</th>
          ${zellen}
          <td class="summe">${summe}</td>
        </tr>`;
      })
      .join("");

    const detail =
      this.gewaehlt === null
        ? `<p class="hinweis">Klicke links auf ein Token, um seine Wahrscheinlichkeiten zu sehen.</p>`
        : this.verteilungHTML(this.vokabular[this.gewaehlt]);

    return `
      <h4>Häufigkeitstabelle der Bigramme</h4>
      <div class="tabelle-rahmen">
        <table class="matrix">
          <thead><tr><th class="ecke">auf ↓ folgt →</th>${kopf}<th class="summe">Σ</th></tr></thead>
          <tbody>${zeilen}</tbody>
        </table>
      </div>
      ${n > grenze ? `<p class="hinweis">Nur die ersten ${grenze} von ${n} Tokens werden angezeigt.</p>` : ""}
      ${detail}
    `;
  }

  verteilungHTML(token) {
    const verteilung = this.verteilung(token);
    if (verteilung.length === 0) {
      return `<p class="hinweis">Auf „${this.sicher(token)}“ folgt im Korpus nichts.</p>`;
    }
    const summe = this.zeilenSumme(this.vokabular.indexOf(token));
    const balken = verteilung
      .map(
        (e) => `
        <div class="balken-zeile">
          <span class="balken-label">${this.sicher(e.token)}</span>
          <span class="balken-spur"><span class="balken" style="width:${Math.round(e.p * 100)}%"></span></span>
          <span class="balken-wert">${e.anzahl}/${summe} = ${this.prozent(e.p)}</span>
        </div>`,
      )
      .join("");
    return `
      <p class="verteilung-titel">Nach „<strong>${this.sicher(token)}</strong>“ kommt:</p>
      <div class="balken-gruppe">${balken}</div>
    `;
  }

  erzeugenHTML() {
    const aktuell = this.erzeugt[this.erzeugt.length - 1];
    const chips = this.erzeugt
      .map(
        (t, i) =>
          `<span class="chip ${i === this.erzeugt.length - 1 ? "neu" : ""}">${this.sicher(t)}</span>`,
      )
      .join("");

    const optionen = this.vokabular
      .map(
        (t) =>
          `<option value="${this.sicher(t)}" ${t === this.erzeugt[0] ? "selected" : ""}>${this.sicher(t)}</option>`,
      )
      .join("");

    return `
      <h4>Text erzeugen</h4>
      <div class="knoepfe">
        <label class="feld">Start:
          <select class="start-wahl">${optionen}</select>
        </label>
        <button class="aktion schritt">Nächstes Token</button>
        <button class="aktion zehn">10 Tokens</button>
        <button class="aktion neustart">Neu</button>
        <label class="schalter">
          <input type="checkbox" class="zufall-schalter" ${this.zufall ? "checked" : ""} />
          zufällig nach Wahrscheinlichkeit
        </label>
      </div>
      <div class="chips ausgabe">${chips}</div>
      <p class="satz">${this.sicher(this.erzeugt.join(" "))}</p>
      ${this.meldung ? `<p class="meldung">${this.sicher(this.meldung)}</p>` : ""}
      ${this.verteilungHTML(aktuell)}
    `;
  }

  aktualisiere() {
    const tabelle = this.shadowRoot.querySelector(".tabelle-box");
    if (tabelle) {
      tabelle.innerHTML = this.tabelleHTML();
      this.bindeTabelle();
    }
    const erzeugen = this.shadowRoot.querySelector(".erzeugen-box");
    if (erzeugen) {
      erzeugen.innerHTML = this.erzeugenHTML();
      this.bindeErzeugen();
    }
  }

  bindeTabelle() {
    this.shadowRoot.querySelectorAll("[data-zeile]").forEach((kopf) => {
      kopf.addEventListener("click", () =>
        this.waehleZeile(parseInt(kopf.dataset.zeile, 10)),
      );
    });
  }

  bindeErzeugen() {
    const wurzel = this.shadowRoot;
    const binde = (wahl, ereignis, aktion) => {
      const element = wurzel.querySelector(wahl);
      if (element) element.addEventListener(ereignis, aktion);
    };
    binde(".schritt", "click", () => this.einSchritt());
    binde(".zehn", "click", () => this.mehrereSchritte(10));
    binde(".neustart", "click", () => this.setzeStart(this.erzeugt[0]));
    binde(".start-wahl", "change", (e) => this.setzeStart(e.target.value));
    binde(".zufall-schalter", "change", (e) => this.setzeZufall(e.target.checked));
  }

  render() {
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

        h4 { margin: 16px 0 8px; font-size: 1em; }
        h4:first-child { margin-top: 0; }

        textarea {
          width: 100%;
          min-height: 76px;
          font: inherit;
          font-size: 0.92em;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          color: var(--color-text, black);
          resize: vertical;
        }

        .knoepfe {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin: 8px 0;
        }

        button, select {
          font: inherit;
          font-size: 0.9em;
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          color: var(--color-text, black);
        }
        button { cursor: pointer; }
        button:hover { border-color: var(--color-brand, #007864); }
        .schritt {
          background: var(--color-brand, #007864);
          color: var(--color-background, white);
          border-color: var(--color-brand, #007864);
          font-weight: bold;
        }

        .schalter, .feld { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .schalter input { width: 16px; height: 16px; accent-color: var(--color-brand, #007864); }

        .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          font-size: 0.9em;
        }
        .chip .nummer {
          font-size: 0.75em;
          opacity: 0.6;
          font-variant-numeric: tabular-nums;
        }
        .chip.leer {
          border-style: dashed;
          color: var(--color-sync-error, #b91c1c);
          font-weight: bold;
        }
        .chip.neu {
          background: var(--color-brand, #007864);
          color: var(--color-background, white);
          border-color: var(--color-brand, #007864);
          font-weight: bold;
        }

        .hinweis, .meldung {
          font-size: 0.88em;
          color: var(--color-text-deactivated, #242428);
          margin: 6px 0;
        }
        .meldung { color: var(--color-sync-error, #b91c1c); }

        .satz {
          margin: 10px 0 4px;
          padding: 8px 10px;
          border-left: 4px solid var(--color-brand, #007864);
          background: var(--color-nav, #f5f5f5);
          border-radius: 0 8px 8px 0;
          font-size: 1.02em;
        }

        .tabelle-rahmen { overflow-x: auto; }
        table.matrix { border-collapse: collapse; font-size: 0.85em; }
        table.matrix th, table.matrix td {
          border: 1px solid var(--color-spacer, #a4a4a4);
          padding: 3px 7px;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        .dreh { white-space: nowrap; font-size: 0.92em; }
        .ecke { font-weight: normal; font-size: 0.85em; opacity: 0.7; white-space: nowrap; }
        .zeilen-kopf { cursor: pointer; text-align: right; white-space: nowrap; }
        .zeilen-kopf:hover { color: var(--color-brand, #007864); }
        tr.gewaehlt .zeilen-kopf { color: var(--color-brand, #007864); }
        tr.gewaehlt td { outline: 1px solid var(--color-brand, #007864); }
        .zelle { min-width: 2.2em; }
        .summe { opacity: 0.7; }

        .verteilung-titel { margin: 12px 0 6px; }
        .balken-gruppe { display: flex; flex-direction: column; gap: 5px; }
        .balken-zeile {
          display: grid;
          grid-template-columns: minmax(4em, 8em) 1fr minmax(7em, auto);
          gap: 10px;
          align-items: center;
          font-size: 0.9em;
        }
        .balken-label { text-align: right; font-weight: bold; }
        .balken-spur {
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 4px;
          height: 16px;
          overflow: hidden;
        }
        .balken {
          display: block;
          height: 100%;
          background: var(--color-brand, #007864);
        }
        .balken-wert { font-variant-numeric: tabular-nums; opacity: 0.85; }
      </style>

      <div class="container">
        <h4>Korpus</h4>
        <textarea class="korpus-feld" spellcheck="false">${this.sicher(this.korpus)}</textarea>
        <div class="knoepfe">
          <label class="schalter">
            <input type="checkbox" class="sauber-schalter" ${this.sauber ? "checked" : ""} />
            Satzzeichen abtrennen und klein schreiben
          </label>
          <button class="reset">Korpus zurücksetzen</button>
        </div>

        ${this.zeigt("tokens") ? `<div class="tokens-box">${this.tokensHTML()}</div>` : ""}
        ${this.zeigt("tabelle") ? `<div class="tabelle-box">${this.tabelleHTML()}</div>` : ""}
        ${this.zeigt("erzeugen") ? `<div class="erzeugen-box">${this.erzeugenHTML()}</div>` : ""}
      </div>
    `;

    const wurzel = this.shadowRoot;
    const feld = wurzel.querySelector(".korpus-feld");
    feld.addEventListener("change", () => this.setzeKorpus(feld.value));
    wurzel
      .querySelector(".sauber-schalter")
      .addEventListener("change", (e) => this.setzeSauber(e.target.checked));
    wurzel.querySelector(".reset").addEventListener("click", () => this.zuruecksetzen());

    this.bindeTabelle();
    this.bindeErzeugen();
  }
}

customElements.define("ki-bigramm", KiBigramm);
