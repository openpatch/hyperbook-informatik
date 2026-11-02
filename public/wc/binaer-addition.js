// Schriftliche Addition im Binärsystem zum Ausfüllen: Überträge und Ergebnisbits werden
// durch Anklicken gesetzt (leer → 0 → 1 → leer). Mit `register` wird die Breite fest,
// ein Übertrag aus der höchsten Stelle ist dann ein Überlauf.
class BinaerAddition extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.geprueft = false;
  }

  async connectedCallback() {
    this.anzahl = Math.min(12, Math.max(2, parseInt(this.getAttribute("bits") || "4", 10)));
    this.register = this.hasAttribute("register");
    this.feste = this.getAttribute("aufgaben")
      ? this.getAttribute("aufgaben")
          .split(",")
          .map((p) => p.trim().split("+").map((s) => s.trim()))
          .filter((p) => p.length === 2 && /^[01]+$/.test(p[0]) && /^[01]+$/.test(p[1]))
      : [];
    if (this.feste.length) {
      this.anzahl = Math.max(this.anzahl, ...this.feste.flat().map((s) => s.length));
    }
    this.index = 0;
    this.a = null;
    this.b = null;
    await this.ladeZustand();
    if (this.a === null) this.setzeAufgabe();
    this.render();
  }

  // Ergebnis hat eine Stelle mehr als die Summanden (Übertrag aus der höchsten Stelle).
  get breite() {
    return this.anzahl + 1;
  }

  setzeAufgabe() {
    if (this.feste.length) {
      const [x, y] = this.feste[this.index % this.feste.length];
      this.a = x.padStart(this.anzahl, "0");
      this.b = y.padStart(this.anzahl, "0");
    } else {
      const max = 2 ** this.anzahl;
      const zahl = () => Math.floor(Math.random() * max);
      this.a = zahl().toString(2).padStart(this.anzahl, "0");
      this.b = zahl().toString(2).padStart(this.anzahl, "0");
    }
    this.uebertrag = new Array(this.breite).fill("");
    this.ergebnis = new Array(this.breite).fill("");
    this.ueberlaufAntwort = "";
    this.geprueft = false;
  }

  get summe() {
    return parseInt(this.a, 2) + parseInt(this.b, 2);
  }

  get sollErgebnis() {
    return this.summe.toString(2).padStart(this.breite, "0").split("");
  }

  // Übertrag, der in Spalte i (von links, Breite = anzahl+1) hineingeschrieben wird.
  get sollUebertrag() {
    const soll = new Array(this.breite).fill("0");
    let c = 0;
    for (let k = this.anzahl - 1; k >= 0; k--) {
      const s = Number(this.a[k]) + Number(this.b[k]) + c;
      c = s >= 2 ? 1 : 0;
      // Spalte k im Raster ist k+1 (Spalte 0 ist die Überlaufstelle).
      soll[k] = String(c);
    }
    return soll;
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const data = await store.custom.get(id);
      if (!data) return;
      const z = JSON.parse(data.payload);
      if (z.a && z.a.length === this.anzahl) {
        Object.assign(this, {
          a: z.a,
          b: z.b,
          index: z.index || 0,
          uebertrag: z.uebertrag,
          ergebnis: z.ergebnis,
          ueberlaufAntwort: z.ueberlaufAntwort || "",
        });
      }
    } catch (e) {
      console.error("binaer-addition: Zustand nicht lesbar", e);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({
        id,
        payload: JSON.stringify({
          a: this.a,
          b: this.b,
          index: this.index,
          uebertrag: this.uebertrag,
          ergebnis: this.ergebnis,
          ueberlaufAntwort: this.ueberlaufAntwort,
        }),
      });
    } catch (e) {
      console.error("binaer-addition: Zustand nicht speicherbar", e);
    }
  }

  naechster(w) {
    return w === "" ? "0" : w === "0" ? "1" : "";
  }

  async klick(zeile, i) {
    this[zeile][i] = this.naechster(this[zeile][i]);
    this.geprueft = false;
    this.render();
    await this.speichereZustand();
  }

  async neu() {
    this.index++;
    this.setzeAufgabe();
    this.render();
    await this.speichereZustand();
  }

  pruefe() {
    this.geprueft = true;
    this.render();
  }

  render() {
    const sollE = this.sollErgebnis;
    const sollU = this.sollUebertrag;
    const ueberlauf = this.summe >= 2 ** this.anzahl;
    // Ergebnisbits: vergleichen ab erster Stelle; führende leere Stelle 0 gilt als 0.
    const ergebnisOk = this.ergebnis.map((w, i) => (w === "" ? "0" : w) === sollE[i]);
    // Überträge: Spalte i im Raster (1..anzahl) erhält Übertrag aus Spalte i+1 → sollU[i]
    // Rasterspalte 0 erhält den Übertrag aus der höchsten Stelle → sollU[0]. Wir zeigen
    // Überträge über den Spalten 0..anzahl-1 an; Spalte anzahl (ganz rechts) hat keinen.
    const uebertragOk = this.uebertrag.map((w, i) => {
      if (i === this.breite - 1) return true;
      return (w === "" ? "0" : w) === sollU[i];
    });
    const alleOk = ergebnisOk.every(Boolean) && uebertragOk.every(Boolean) &&
      (!this.register || this.ueberlaufAntwort === (ueberlauf ? "ja" : "nein"));

    const zelle = (inhalt, klasse = "") => `<div class="z ${klasse}">${inhalt}</div>`;
    const knopfZelle = (zeile, i, w, ok) => {
      const zustand = this.geprueft ? (ok ? "richtig" : "falsch") : "";
      return `<button class="z eingabe ${zeile} ${zustand} ${i === 0 && this.register ? "ueber" : ""}" data-zeile="${zeile}" data-i="${i}" aria-label="${zeile === "uebertrag" ? "Übertrag" : "Ergebnis"} Stelle ${i}">${w}</button>`;
    };

    const zeileA = [zelle("", "op"), zelle(""), ...this.a.split("").map((c) => zelle(c))];
    const zeileB = [zelle("+", "op"), zelle(""), ...this.b.split("").map((c) => zelle(c))];
    const zeileU = [
      zelle("Ü", "op klein"),
      ...this.uebertrag.map((w, i) =>
        i === this.breite - 1 ? zelle("") : knopfZelle("uebertrag", i, w, uebertragOk[i]),
      ),
    ];
    const zeileE = [zelle("=", "op"), ...this.ergebnis.map((w, i) => knopfZelle("ergebnis", i, w, ergebnisOk[i]))];

    let meldung = "";
    if (this.geprueft) {
      meldung = alleOk
        ? `<div class="meldung ok">✔ Richtig! ${parseInt(this.a, 2)} + ${parseInt(this.b, 2)} = ${this.summe}${
            this.register && ueberlauf
              ? ` – das passt nicht in ${this.anzahl} Bit. Im Register bleibt nur ${(this.summe % 2 ** this.anzahl).toString(2).padStart(this.anzahl, "0")}<sub>(2)</sub> = ${this.summe % 2 ** this.anzahl} stehen.`
              : ""
          }</div>`
        : `<div class="meldung falsch">Rot markierte Felder stimmen noch nicht. Rechne die Spalte von rechts nach links: 1 + 1 = 10, also 0 schreiben und 1 übertragen.</div>`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin: 1em 0; }
        .rahmen {
          border: 2px solid var(--color-nav-border, #ccc); border-radius: 12px; padding: 16px;
          background: var(--color-background, #fff); color: var(--color-text, #000);
        }
        .raster {
          display: grid; grid-template-columns: repeat(${this.breite + 1}, 44px);
          gap: 4px; justify-content: center; font-family: monospace; font-size: 1.5em;
        }
        .z { height: 44px; display: flex; align-items: center; justify-content: center; }
        .op { opacity: 0.7; }
        .klein { font-size: 0.6em; }
        .linie { grid-column: 1 / -1; border-top: 3px solid var(--color-text, #000); height: 0; }
        button.eingabe {
          border: 2px dashed var(--color-brand, #ba7720); border-radius: 6px; cursor: pointer;
          background: var(--color-background, #fff); color: var(--color-text, #000);
          font: inherit; touch-action: manipulation;
        }
        button.uebertrag { font-size: 0.65em; height: 30px; align-self: end; }
        button.ueber { border-color: #b91c1c; }
        button.richtig { border-style: solid; border-color: #15803d; background: #dcfce7; color: #000; }
        button.falsch { border-style: solid; border-color: #b91c1c; background: #fee2e2; color: #000; }
        .knoepfe { display: flex; gap: 10px; justify-content: center; margin-top: 14px; flex-wrap: wrap; align-items: center; }
        .knopf {
          border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; font: inherit;
          background: var(--color-brand, #ba7720); color: var(--color-brand-text, #fff);
        }
        .knopf.zweit { background: var(--color-spacer, #a4a4a4); color: var(--color-text, #000); }
        .meldung { text-align: center; margin-top: 12px; }
        .meldung.ok { color: #15803d; }
        .meldung.falsch { color: #b91c1c; }
        .hinweis { text-align: center; font-size: 0.85em; opacity: 0.75; margin-bottom: 10px; }
        .frage { display: flex; gap: 8px; align-items: center; justify-content: center; margin-top: 10px; flex-wrap: wrap; }
        @media (max-width: 480px) {
          .raster { grid-template-columns: repeat(${this.breite + 1}, 30px); font-size: 1.1em; }
          .z { height: 32px; }
        }
      </style>
      <div class="rahmen">
        <div class="hinweis">Klicke auf die gestrichelten Felder: leer → 0 → 1.${
          this.register ? ` Das Register ist <strong>${this.anzahl} Bit</strong> breit – das rote Feld ganz links liegt außerhalb.` : ""
        }</div>
        <div class="raster">
          ${zeileA.join("")}
          ${zeileB.join("")}
          ${zeileU.join("")}
          <div class="linie"></div>
          ${zeileE.join("")}
        </div>
        ${
          this.register
            ? `<div class="frage">Gibt es einen Überlauf?
                <label><input type="radio" name="ue" value="ja" ${this.ueberlaufAntwort === "ja" ? "checked" : ""}> ja</label>
                <label><input type="radio" name="ue" value="nein" ${this.ueberlaufAntwort === "nein" ? "checked" : ""}> nein</label>
              </div>`
            : ""
        }
        <div class="knoepfe">
          <button class="knopf" data-aktion="pruefen">Prüfen</button>
          <button class="knopf zweit" data-aktion="neu">${this.feste.length ? "Nächste Aufgabe" : "Neue Aufgabe"}</button>
        </div>
        ${meldung}
      </div>`;

    this.shadowRoot.querySelectorAll("button.eingabe").forEach((k) =>
      k.addEventListener("click", () => this.klick(k.dataset.zeile, parseInt(k.dataset.i, 10))),
    );
    this.shadowRoot.querySelectorAll("input[name=ue]").forEach((r) =>
      r.addEventListener("change", async () => {
        this.ueberlaufAntwort = r.value;
        this.geprueft = false;
        await this.speichereZustand();
      }),
    );
    this.shadowRoot.querySelector("[data-aktion=pruefen]").addEventListener("click", () => this.pruefe());
    this.shadowRoot.querySelector("[data-aktion=neu]").addEventListener("click", () => this.neu());
  }
}

customElements.define("binaer-addition", BinaerAddition);
