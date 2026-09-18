// Wahrheitstabelle zum Ausfüllen – mit einer Spalte, die zeigt, welche
// Teilausdrücke Java wegen der Kurzschlussauswertung gar nicht erst ansieht.
class OopWahrheitstabelle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.eingaben = {};
    this.geprueft = false;
  }

  async connectedCallback() {
    this.ausdruckText = this.getAttribute("ausdruck") || "a && (b || !c)";
    this.baum = this.parse(this.ausdruckText);
    this.variablen = this.getAttribute("variablen")
      ? this.getAttribute("variablen").split(",").map((s) => s.trim())
      : this.sammleVariablen(this.baum);
    this.modus = (this.getAttribute("modus") || "ausfuellen").toLowerCase();
    this.kurzschluss = (this.getAttribute("kurzschluss") || "ja").toLowerCase() === "ja";
    this.aufgabenText = this.getAttribute("aufgabe") || "";
    await this.ladeZustand();
    this.render();
  }

  // --- Ausdruck ----------------------------------------------------------

  parse(text) {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (/\s/.test(c)) i++;
      else if (text.startsWith("&&", i) || text.startsWith("||", i)) {
        tokens.push(text.slice(i, i + 2));
        i += 2;
      } else if (/[a-zA-Z_]/.test(c)) {
        let n = "";
        while (i < text.length && /[a-zA-Z0-9_]/.test(text[i])) n += text[i++];
        if (n === "und") tokens.push("&&");
        else if (n === "oder") tokens.push("||");
        else if (n === "nicht") tokens.push("!");
        else tokens.push({ name: n });
      } else if ("!()".includes(c)) {
        tokens.push(c);
        i++;
      } else i++;
    }

    let pos = 0;
    let idZaehler = 0;
    const schau = () => tokens[pos];
    const nimm = () => tokens[pos++];

    const oder = () => {
      let l = und();
      while (schau() === "||") {
        nimm();
        l = { art: "oder", links: l, rechts: und(), id: idZaehler++ };
      }
      return l;
    };
    const und = () => {
      let l = nicht();
      while (schau() === "&&") {
        nimm();
        l = { art: "und", links: l, rechts: nicht(), id: idZaehler++ };
      }
      return l;
    };
    const nicht = () => {
      if (schau() === "!") {
        nimm();
        return { art: "nicht", wert: nicht(), id: idZaehler++ };
      }
      return einfach();
    };
    const einfach = () => {
      const t = nimm();
      if (t === "(") {
        const a = oder();
        if (schau() === ")") nimm();
        return a;
      }
      if (t && t.name !== undefined) {
        if (t.name === "true") return { art: "konstante", wert: true, id: idZaehler++ };
        if (t.name === "false") return { art: "konstante", wert: false, id: idZaehler++ };
        return { art: "variable", name: t.name, id: idZaehler++ };
      }
      return { art: "konstante", wert: false, id: idZaehler++ };
    };
    return oder();
  }

  sammleVariablen(k, aus = []) {
    if (!k) return aus;
    if (k.art === "variable" && !aus.includes(k.name)) aus.push(k.name);
    if (k.links) this.sammleVariablen(k.links, aus);
    if (k.rechts) this.sammleVariablen(k.rechts, aus);
    if (k.wert && typeof k.wert === "object") this.sammleVariablen(k.wert, aus);
    return aus;
  }

  // Auswertung mit Protokoll der tatsächlich gelesenen Variablen.
  auswerten(k, belegung, gelesen) {
    switch (k.art) {
      case "variable":
        if (!gelesen.includes(k.name)) gelesen.push(k.name);
        return Boolean(belegung[k.name]);
      case "konstante":
        return k.wert;
      case "nicht":
        return !this.auswerten(k.wert, belegung, gelesen);
      case "und": {
        const l = this.auswerten(k.links, belegung, gelesen);
        if (!l) return false; // rechte Seite wird nicht mehr angesehen
        return this.auswerten(k.rechts, belegung, gelesen);
      }
      case "oder": {
        const l = this.auswerten(k.links, belegung, gelesen);
        if (l) return true;
        return this.auswerten(k.rechts, belegung, gelesen);
      }
      default:
        return false;
    }
  }

  vollAuswerten(k, belegung) {
    switch (k.art) {
      case "variable":
        return Boolean(belegung[k.name]);
      case "konstante":
        return k.wert;
      case "nicht":
        return !this.vollAuswerten(k.wert, belegung);
      case "und":
        return this.vollAuswerten(k.links, belegung) && this.vollAuswerten(k.rechts, belegung);
      case "oder":
        return this.vollAuswerten(k.links, belegung) || this.vollAuswerten(k.rechts, belegung);
      default:
        return false;
    }
  }

  belegungen() {
    const n = this.variablen.length;
    const zeilen = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
      const b = {};
      this.variablen.forEach((v, k) => {
        b[v] = Boolean((i >> (n - 1 - k)) & 1);
      });
      zeilen.push(b);
    }
    return zeilen;
  }

  // --- Zustand -----------------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (daten) this.eingaben = JSON.parse(daten.payload).eingaben || {};
    } catch (fehler) {
      console.error("Zustand von oop-wahrheitstabelle konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({ id, payload: JSON.stringify({ eingaben: this.eingaben }) });
    } catch (fehler) {
      console.error("Zustand von oop-wahrheitstabelle konnte nicht gespeichert werden:", fehler);
    }
  }

  setze(zeile, wert) {
    this.eingaben[zeile] = this.eingaben[zeile] === wert ? undefined : wert;
    this.geprueft = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  pruefe() {
    this.geprueft = true;
    this.aktualisiere();
  }

  leeren() {
    this.eingaben = {};
    this.geprueft = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  wahr(b) {
    return b ? "wahr" : "falsch";
  }

  aktualisiere() {
    const zeilen = this.belegungen();
    const zeigen = this.modus === "zeigen" || this.geprueft;
    let richtig = 0;

    const koerper = zeilen
      .map((belegung, nr) => {
        const gelesen = [];
        const ergebnis = this.auswerten(this.baum, belegung, gelesen);
        const uebersprungen = this.variablen.filter((v) => !gelesen.includes(v));
        const eingabe = this.eingaben[nr];
        const stimmt = eingabe !== undefined && eingabe === ergebnis;
        if (stimmt) richtig++;

        const ergebnisZelle =
          this.modus === "zeigen"
            ? `<td class="ergebnis ${ergebnis ? "w" : "f"}">${this.wahr(ergebnis)}</td>`
            : `<td class="wahl ${this.geprueft ? (stimmt ? "richtig" : eingabe === undefined ? "leer" : "falsch") : ""}">
                 <button class="w-knopf ${eingabe === true ? "aktiv" : ""}" data-zeile="${nr}" data-wert="wahr">wahr</button>
                 <button class="w-knopf ${eingabe === false ? "aktiv" : ""}" data-zeile="${nr}" data-wert="falsch">falsch</button>
                 ${zeigen && !stimmt ? `<span class="soll">${this.wahr(ergebnis)}</span>` : ""}
               </td>`;

        return `
          <tr>
            ${this.variablen
              .map(
                (v) =>
                  `<td class="var ${belegung[v] ? "w" : "f"}">${this.wahr(belegung[v])}</td>`,
              )
              .join("")}
            ${ergebnisZelle}
            ${
              this.kurzschluss
                ? `<td class="kurz">${
                    uebersprungen.length === 0
                      ? "<span class='alle'>alle</span>"
                      : `<span class='uebersprungen'>${uebersprungen.join(", ")} nicht angesehen</span>`
                  }</td>`
                : ""
            }
          </tr>`;
      })
      .join("");

    this.shadowRoot.querySelector(".tabelle").innerHTML = `
      <table>
        <thead>
          <tr>
            ${this.variablen.map((v) => `<th>${v}</th>`).join("")}
            <th class="formel">${this.ausdruckText}</th>
            ${this.kurzschluss ? `<th>tatsächlich ausgewertet</th>` : ""}
          </tr>
        </thead>
        <tbody>${koerper}</tbody>
      </table>`;

    const r = this.shadowRoot.querySelector(".rueckmeldung");
    if (this.geprueft && this.modus !== "zeigen") {
      const alles = richtig === zeilen.length;
      r.className = `rueckmeldung ${alles ? "ok" : "fehler"}`;
      r.innerHTML = alles
        ? "Alle Zeilen stimmen."
        : `${richtig} von ${zeilen.length} Zeilen stimmen. Die richtigen Werte stehen jetzt neben den falschen Zellen.`;
    } else {
      r.className = "rueckmeldung leer";
      r.innerHTML = "";
    }

    this.shadowRoot.querySelectorAll(".w-knopf").forEach((b) => {
      b.onclick = () => this.setze(parseInt(b.dataset.zeile, 10), b.dataset.wert === "wahr");
    });
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
        .aufgabe {
          font-size: 0.92em; margin-bottom: 12px; padding: 8px 10px; border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          border-left: 4px solid var(--color-brand, #007864);
        }
        .tabelle { overflow-x: auto; }
        table { border-collapse: collapse; width: 100%; font-size: 0.88em; }
        th, td {
          border: 1px solid var(--color-spacer, #a4a4a4);
          padding: 6px 9px; text-align: center;
        }
        thead th { background: var(--color-nav, #f5f5f5); font-size: 0.92em; }
        th.formel { font-family: ui-monospace, monospace; font-weight: 700; }
        td.var { font-family: ui-monospace, monospace; }
        td.var.w, td.ergebnis.w { color: var(--color-sync-ok, #15803d); font-weight: 600; }
        td.var.f, td.ergebnis.f { color: var(--color-sync-error, #b91c1c); font-weight: 600; }
        td.ergebnis { font-family: ui-monospace, monospace; font-weight: 700; }
        td.wahl { white-space: nowrap; }
        td.wahl.richtig {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 20%, transparent);
        }
        td.wahl.falsch, td.wahl.leer {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 18%, transparent);
        }
        .w-knopf {
          font: inherit; font-size: 0.85em; padding: 3px 8px; margin: 0 1px;
          border-radius: 5px; cursor: pointer;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .w-knopf.aktiv {
          background: var(--color-brand, #007864);
          color: var(--color-brand-text, #fff);
          border-color: var(--color-brand, #007864);
        }
        .soll {
          display: block; font-size: 0.78em; margin-top: 3px; font-weight: 700;
          color: var(--color-sync-ok, #15803d);
        }
        td.kurz { font-size: 0.82em; }
        td.kurz .alle { opacity: 0.5; }
        td.kurz .uebersprungen { color: #b45309; font-weight: 600; font-family: ui-monospace, monospace; }

        .knopfleiste { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 10px; }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .rueckmeldung { font-size: 0.9em; border-radius: 8px; }
        .rueckmeldung.ok, .rueckmeldung.fehler { padding: 9px 11px; font-weight: 600; }
        .rueckmeldung.ok {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent);
        }
        .rueckmeldung.fehler {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent);
        }
        .fussnote { font-size: 0.8em; opacity: 0.7; margin-top: 10px; }
      </style>

      <div class="container">
        ${this.aufgabenText ? `<div class="aufgabe">${this.aufgabenText}</div>` : ""}
        <div class="tabelle"></div>
        ${
          this.modus === "zeigen"
            ? ""
            : `<div class="knopfleiste">
                 <button class="btn btn-pruefen">Prüfen</button>
                 <button class="btn sekundaer btn-leeren">Leeren</button>
               </div>`
        }
        <div class="rueckmeldung leer"></div>
        ${
          this.kurzschluss
            ? `<div class="fussnote">Java wertet <code>&amp;&amp;</code> und <code>||</code> <strong>verkürzt</strong> aus: Steht das Ergebnis nach der linken Seite schon fest, wird die rechte gar nicht mehr betrachtet.</div>`
            : ""
        }
      </div>
    `;

    const pruefen = this.shadowRoot.querySelector(".btn-pruefen");
    if (pruefen) pruefen.addEventListener("click", () => this.pruefe());
    const leeren = this.shadowRoot.querySelector(".btn-leeren");
    if (leeren) leeren.addEventListener("click", () => this.leeren());

    this.aktualisiere();
  }
}

customElements.define("oop-wahrheitstabelle", OopWahrheitstabelle);
