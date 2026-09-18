// Stapel und Warteschlange im Vergleich. Im Vorhersagemodus notieren die
// Lernenden erst die erwartete Ausgabe einer Operationsfolge und lassen sie
// danach ablaufen.
class OopStapelSchlange extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.inhalt = [];
    this.protokoll = [];
    this.timer = null;
  }

  connectedCallback() {
    this.modus = (this.getAttribute("modus") || "stapel").toLowerCase();
    this.start = (this.getAttribute("inhalt") || "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    this.folge = (this.getAttribute("folge") || "")
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    this.vorhersage = this.folge.length > 0;
    this.inhalt = this.start.slice();
    this.folgeSchritt = 0;
    this.ausgaben = [];
    this.geprueft = null;
    this.render();
  }

  disconnectedCallback() {
    if (this.timer) clearTimeout(this.timer);
  }

  begriffe() {
    return this.modus === "schlange"
      ? {
          klasse: "Queue",
          rein: "enqueue",
          raus: "dequeue",
          spitze: "front",
          endeName: "hinten",
          anfangName: "vorne",
        }
      : {
          klasse: "Stack",
          rein: "push",
          raus: "pop",
          spitze: "top",
          endeName: "oben",
          anfangName: "unten",
        };
  }

  // --- Operationen -------------------------------------------------------

  // Beim Stapel liegt das zuletzt eingefügte Element am Ende des Feldes und
  // ist zugleich das, das als Nächstes herauskommt.
  fuehreAus(text) {
    const b = this.begriffe();
    const name = text.includes("(") ? text.slice(0, text.indexOf("(")).trim() : text.trim();
    const arg = text.includes("(")
      ? text.slice(text.indexOf("(") + 1, text.lastIndexOf(")")).trim()
      : "";

    if (name === b.rein) {
      if (arg === "" || arg === "null") {
        this.protokoll.push({ text: `${name}(null)`, ausgabe: null, hinweis: "null wird ignoriert – der Behälter bleibt unverändert." });
        return null;
      }
      this.inhalt.push(arg);
      this.protokoll.push({ text: `${name}(${arg})`, ausgabe: null });
      return null;
    }

    if (name === b.raus) {
      if (this.inhalt.length === 0) {
        this.protokoll.push({ text: `${name}()`, ausgabe: null, hinweis: "Der Behälter ist leer – der Aufruf bleibt wirkungslos." });
        return null;
      }
      const weg = this.modus === "schlange" ? this.inhalt.shift() : this.inhalt.pop();
      this.protokoll.push({ text: `${name}()`, ausgabe: null, hinweis: `${weg} wird entfernt.` });
      return null;
    }

    if (name === b.spitze) {
      const wert = this.inhalt.length === 0
        ? "null"
        : this.modus === "schlange"
          ? this.inhalt[0]
          : this.inhalt[this.inhalt.length - 1];
      this.protokoll.push({ text: `${name}()`, ausgabe: wert });
      return wert;
    }

    if (name === "isEmpty") {
      const wert = this.inhalt.length === 0 ? "true" : "false";
      this.protokoll.push({ text: "isEmpty()", ausgabe: wert });
      return wert;
    }

    this.protokoll.push({ text, ausgabe: null, hinweis: "Unbekannte Operation." });
    return null;
  }

  klickeOperation(name) {
    const b = this.begriffe();
    if (name === b.rein) {
      const feld = this.shadowRoot.querySelector(".eingabe");
      const wert = feld.value.trim();
      if (wert === "") {
        feld.focus();
        return;
      }
      feld.value = "";
      this.fuehreAus(`${b.rein}(${wert})`);
    } else {
      this.fuehreAus(`${name}()`);
    }
    this.aktualisiere();
  }

  // --- Vorhersagemodus ---------------------------------------------------

  abspielen() {
    if (this.timer) clearTimeout(this.timer);
    this.inhalt = this.start.slice();
    this.protokoll = [];
    this.ausgaben = [];
    this.folgeSchritt = 0;

    const schritt = () => {
      if (this.folgeSchritt >= this.folge.length) {
        this.pruefeVorhersage();
        return;
      }
      const wert = this.fuehreAus(this.folge[this.folgeSchritt]);
      if (wert !== null) this.ausgaben.push(wert);
      this.folgeSchritt++;
      this.aktualisiere();
      this.timer = setTimeout(schritt, 750);
    };
    schritt();
  }

  pruefeVorhersage() {
    const feld = this.shadowRoot.querySelector(".vorhersage-feld");
    const eingabe = (feld ? feld.value : "")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const richtig = this.ausgaben;

    if (eingabe.length === 0) {
      this.geprueft = {
        ok: null,
        text: `Die Ausgabe lautet: <code>${richtig.join(", ") || "(keine)"}</code>`,
      };
    } else if (eingabe.join("|").toLowerCase() === richtig.join("|").toLowerCase()) {
      this.geprueft = { ok: true, text: "Deine Vorhersage stimmt genau." };
    } else {
      this.geprueft = {
        ok: false,
        text: `Deine Vorhersage: <code>${eingabe.join(", ")}</code><br />Tatsächlich: <code>${richtig.join(", ") || "(keine)"}</code>`,
      };
    }
    this.aktualisiere();
  }

  zuruecksetzen() {
    if (this.timer) clearTimeout(this.timer);
    this.inhalt = this.start.slice();
    this.protokoll = [];
    this.ausgaben = [];
    this.folgeSchritt = 0;
    this.geprueft = null;
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  behaelterHTML() {
    const b = this.begriffe();
    if (this.inhalt.length === 0) {
      return `<div class="leer">leer</div>`;
    }
    const elemente = this.inhalt.map((wert, i) => {
      const istSpitze =
        this.modus === "schlange" ? i === 0 : i === this.inhalt.length - 1;
      return `<div class="element ${istSpitze ? "spitze" : ""}">
                ${wert}
                ${istSpitze ? `<span class="marke">${b.spitze}()</span>` : ""}
              </div>`;
    });
    // Beim Stapel wächst die Darstellung nach oben.
    return this.modus === "stapel" ? elemente.reverse().join("") : elemente.join("");
  }

  aktualisiere() {
    const b = this.begriffe();
    this.shadowRoot.querySelector(".behaelter").innerHTML = this.behaelterHTML();

    this.shadowRoot.querySelector(".protokoll").innerHTML = this.protokoll.length
      ? this.protokoll
          .slice(-8)
          .map(
            (e) => `
        <div class="zeile">
          <code>${e.text}</code>
          ${e.ausgabe !== null ? `<span class="ausgabe">→ ${e.ausgabe}</span>` : ""}
          ${e.hinweis ? `<span class="hinweis">${e.hinweis}</span>` : ""}
        </div>`,
          )
          .join("")
      : `<div class="zeile leer-zeile">Noch keine Operation ausgeführt.</div>`;

    const folgeBox = this.shadowRoot.querySelector(".folge");
    if (folgeBox) {
      folgeBox.innerHTML = this.folge
        .map(
          (op, i) =>
            `<span class="op ${i < this.folgeSchritt ? "erledigt" : ""} ${
              i === this.folgeSchritt && this.timer ? "aktuell" : ""
            }">${op}</span>`,
        )
        .join("");
    }

    const r = this.shadowRoot.querySelector(".rueckmeldung");
    if (r) {
      if (this.geprueft) {
        r.className = `rueckmeldung ${
          this.geprueft.ok === true ? "ok" : this.geprueft.ok === false ? "fehler" : "info"
        }`;
        r.innerHTML = this.geprueft.text;
      } else {
        r.className = "rueckmeldung leer";
        r.innerHTML = "";
      }
    }

    const zaehler = this.shadowRoot.querySelector(".zaehler");
    zaehler.innerHTML = `<span><strong>${this.inhalt.length}</strong> Element${
      this.inhalt.length === 1 ? "" : "e"
    }</span><span>isEmpty() = <strong>${this.inhalt.length === 0}</strong></span>`;
  }

  render() {
    const b = this.begriffe();
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
        .kopf {
          display: flex; justify-content: space-between; align-items: baseline;
          flex-wrap: wrap; gap: 10px; margin-bottom: 10px;
        }
        .kopf .name { font-weight: 700; font-family: ui-monospace, monospace; }
        .kopf .regel { font-size: 0.82em; opacity: 0.7; }
        .zaehler { display: flex; gap: 14px; font-size: 0.83em; }
        .zaehler strong { color: var(--color-brand, #007864); }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 12px; margin-bottom: 12px;
          min-height: 128px;
          display: flex; align-items: ${this.modus === "stapel" ? "flex-end" : "center"};
          justify-content: ${this.modus === "stapel" ? "center" : "flex-start"};
          overflow-x: auto;
        }
        .behaelter {
          display: flex;
          flex-direction: ${this.modus === "stapel" ? "column" : "row"};
          gap: 4px; align-items: ${this.modus === "stapel" ? "center" : "stretch"};
        }
        .element {
          position: relative;
          min-width: 62px; padding: 9px 14px; border-radius: 6px;
          background: var(--color-background, white);
          border: 2px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace; font-weight: 600;
          text-align: center; white-space: nowrap;
        }
        .element.spitze {
          border-color: var(--color-brand, #007864);
          background: color-mix(in srgb, var(--color-brand, #007864) 14%, var(--color-background, white));
        }
        .marke {
          position: absolute; font-size: 0.66em; font-weight: 700;
          color: var(--color-brand, #007864); white-space: nowrap;
          ${this.modus === "stapel" ? "right: calc(100% + 8px); top: 50%; transform: translateY(-50%);" : "bottom: calc(100% + 3px); left: 50%; transform: translateX(-50%);"}
        }
        .leer {
          opacity: 0.5; font-style: italic; font-size: 0.9em;
          border: 2px dashed var(--color-spacer, #a4a4a4);
          border-radius: 6px; padding: 14px 26px;
        }

        .steuerung { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 12px; }
        .eingabe {
          font: inherit; width: 5.5em; padding: 6px 8px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold; font-family: ui-monospace, monospace;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; font-family: system-ui, sans-serif; }

        .folge-box {
          padding: 10px; border-radius: 8px; margin-bottom: 12px;
          background: var(--color-nav, #f5f5f5);
        }
        .folge-titel { font-size: 0.8em; font-weight: 700; opacity: 0.75; margin-bottom: 6px; }
        .folge { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
        .op {
          font-family: ui-monospace, monospace; font-size: 0.8em;
          padding: 3px 8px; border-radius: 5px;
          background: var(--color-background, white);
          border: 1px solid var(--color-spacer, #a4a4a4);
        }
        .op.erledigt { opacity: 0.45; }
        .op.aktuell {
          border-color: var(--color-brand, #007864); font-weight: 700;
          background: color-mix(in srgb, var(--color-brand, #007864) 16%, var(--color-background, white));
        }
        .vorhersage-zeile { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .vorhersage-feld {
          font: inherit; flex: 1; min-width: 160px; padding: 6px 9px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
          font-family: ui-monospace, monospace; font-size: 0.9em;
        }

        .protokoll { display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px; }
        .zeile {
          display: flex; align-items: baseline; gap: 9px; flex-wrap: wrap;
          font-size: 0.85em; padding: 4px 8px; border-radius: 5px;
          background: var(--color-nav, #f5f5f5);
        }
        .zeile code { font-family: ui-monospace, monospace; font-weight: 600; }
        .zeile .ausgabe {
          font-family: ui-monospace, monospace; font-weight: 700;
          color: var(--color-brand, #007864);
        }
        .zeile .hinweis { opacity: 0.7; font-size: 0.92em; }
        .zeile.leer-zeile { opacity: 0.55; background: transparent; padding: 0; }

        .rueckmeldung { font-size: 0.9em; border-radius: 8px; }
        .rueckmeldung.ok, .rueckmeldung.fehler, .rueckmeldung.info { padding: 9px 11px; }
        .rueckmeldung.ok {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent);
          font-weight: 600;
        }
        .rueckmeldung.fehler {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent);
        }
        .rueckmeldung.info { background: var(--color-nav, #f5f5f5); }
        .rueckmeldung code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 4px; border-radius: 3px;
        }
      </style>

      <div class="container">
        <div class="kopf">
          <div>
            <span class="name">${b.klasse}</span>
            <span class="regel">${
              this.modus === "schlange"
                ? "– FIFO: wer zuerst kommt, wird zuerst bedient"
                : "– LIFO: wer zuletzt kommt, geht zuerst"
            }</span>
          </div>
          <div class="zaehler"></div>
        </div>

        <div class="buehne"><div class="behaelter"></div></div>

        <div class="steuerung">
          <input type="text" class="eingabe" placeholder="Wert" />
          <button class="btn" data-op="${b.rein}">${b.rein}(x)</button>
          <button class="btn" data-op="${b.raus}">${b.raus}()</button>
          <button class="btn" data-op="${b.spitze}">${b.spitze}()</button>
          <button class="btn" data-op="isEmpty">isEmpty()</button>
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
        </div>

        ${
          this.vorhersage
            ? `<div class="folge-box">
                 <div class="folge-titel">Operationsfolge</div>
                 <div class="folge"></div>
                 <div class="vorhersage-zeile">
                   <input type="text" class="vorhersage-feld"
                          placeholder="Erwartete Ausgaben, mit Komma getrennt" />
                   <button class="btn sekundaer btn-abspielen">Abspielen und prüfen</button>
                 </div>
               </div>`
            : ""
        }

        <div class="protokoll"></div>
        <div class="rueckmeldung leer"></div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-op]").forEach((knopf) => {
      knopf.addEventListener("click", () => this.klickeOperation(knopf.dataset.op));
    });
    this.shadowRoot.querySelector(".eingabe").addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.klickeOperation(b.rein);
    });
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());
    const abspielen = this.shadowRoot.querySelector(".btn-abspielen");
    if (abspielen) abspielen.addEventListener("click", () => this.abspielen());

    this.aktualisiere();
  }
}

customElements.define("oop-stapel-schlange", OopStapelSchlange);
