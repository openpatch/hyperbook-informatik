// Bauplan und Objekte nebeneinander: Aus einer Klasse lassen sich beliebig
// viele Objekte erzeugen, die alle eigene Attributwerte besitzen.
class OopObjektkarten extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.objekte = [];
    this.zaehler = 0;
    this.protokoll = [];
  }

  connectedCallback() {
    this.klassenName = this.getAttribute("klasse") || "Auto";
    this.attribute = this.leseAttribute();
    this.methoden = this.leseMethoden();
    this.maxObjekte = parseInt(this.getAttribute("max") || "4", 10);
    this.render();
  }

  // "marke:String:VW, tank:int:0" – Name, Typ, Startwert
  leseAttribute() {
    return (this.getAttribute("attribute") || "marke:String:VW, tank:int:0")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        const [name, typ, start] = s.split(":").map((t) => (t || "").trim());
        const zahl = typ !== "String";
        return {
          name,
          typ: typ || "int",
          start: zahl ? parseFloat(start || "0") : start || "",
          zahl,
        };
      });
  }

  // "tanken(menge:int) -> tank = tank + menge | gibTank():int = tank"
  leseMethoden() {
    return (
      this.getAttribute("methoden") ||
      "tanken(menge:int) -> tank = tank + menge | fahren(km:int) -> tank = tank - km | gibTank():int = tank"
    )
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        const anfrage = s.includes("):") && !s.includes("->");
        const klammerAuf = s.indexOf("(");
        const klammerZu = s.indexOf(")");
        const name = s.slice(0, klammerAuf).trim();
        const parameter = s
          .slice(klammerAuf + 1, klammerZu)
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
          .map((p) => {
            const [pName, pTyp] = p.split(":").map((t) => (t || "").trim());
            return { name: pName, typ: pTyp || "int" };
          });

        if (anfrage) {
          const rest = s.slice(klammerZu + 1);
          const gleich = rest.indexOf("=");
          const typ = rest.slice(1, gleich).trim();
          return {
            name,
            parameter,
            art: "anfrage",
            typ,
            ausdruck: this.parse(rest.slice(gleich + 1).trim()),
            quelltext: rest.slice(gleich + 1).trim(),
          };
        }

        const rumpf = s.slice(s.indexOf("->") + 2).trim();
        const zuweisungen = rumpf
          .split(";")
          .map((z) => z.trim())
          .filter((z) => z.length > 0)
          .map((z) => {
            const gleich = z.indexOf("=");
            return {
              ziel: z.slice(0, gleich).trim(),
              ausdruck: this.parse(z.slice(gleich + 1).trim()),
              quelltext: z,
            };
          });
        return { name, parameter, art: "aktion", typ: "void", zuweisungen };
      });
  }

  // --- Ausdrücke ---------------------------------------------------------

  parse(text) {
    const tokens = [];
    let i = 0;
    while (i < text.length) {
      const c = text[i];
      if (/\s/.test(c)) i++;
      else if (/[0-9.]/.test(c)) {
        let z = "";
        while (i < text.length && /[0-9.]/.test(text[i])) z += text[i++];
        tokens.push({ art: "zahl", wert: parseFloat(z) });
      } else if (/[a-zA-Z_]/.test(c)) {
        let n = "";
        while (i < text.length && /[a-zA-Z0-9_]/.test(text[i])) n += text[i++];
        tokens.push({ art: "name", wert: n });
      } else if ("+-*/()".includes(c)) {
        tokens.push({ art: "op", wert: c });
        i++;
      } else i++;
    }

    let pos = 0;
    const schau = () => tokens[pos];
    const nimm = () => tokens[pos++];

    const ausdruck = () => {
      let l = term();
      while (schau() && (schau().wert === "+" || schau().wert === "-")) {
        const op = nimm().wert;
        l = { art: "binaer", op, links: l, rechts: term() };
      }
      return l;
    };
    const term = () => {
      let l = einfach();
      while (schau() && (schau().wert === "*" || schau().wert === "/")) {
        const op = nimm().wert;
        l = { art: "binaer", op, links: l, rechts: einfach() };
      }
      return l;
    };
    const einfach = () => {
      const t = nimm();
      if (!t) return { art: "zahl", wert: 0 };
      if (t.art === "zahl") return { art: "zahl", wert: t.wert };
      if (t.art === "name") return { art: "variable", name: t.wert };
      if (t.wert === "-") return { art: "negativ", wert: einfach() };
      if (t.wert === "(") {
        const a = ausdruck();
        if (schau() && schau().wert === ")") nimm();
        return a;
      }
      return { art: "zahl", wert: 0 };
    };
    return ausdruck();
  }

  werte(knoten, umgebung) {
    if (!knoten) return 0;
    switch (knoten.art) {
      case "zahl":
        return knoten.wert;
      case "variable":
        return umgebung[knoten.name] !== undefined ? umgebung[knoten.name] : 0;
      case "negativ":
        return -this.werte(knoten.wert, umgebung);
      case "binaer": {
        const l = this.werte(knoten.links, umgebung);
        const r = this.werte(knoten.rechts, umgebung);
        if (knoten.op === "+") return l + r;
        if (knoten.op === "-") return l - r;
        if (knoten.op === "*") return l * r;
        if (knoten.op === "/") return r === 0 ? 0 : Math.round(l / r);
        return 0;
      }
      default:
        return 0;
    }
  }

  // --- Objekte -----------------------------------------------------------

  erzeuge() {
    if (this.objekte.length >= this.maxObjekte) return;
    this.zaehler++;
    const werte = {};
    this.attribute.forEach((a) => {
      const feld = this.shadowRoot.querySelector(`.konstruktor [data-attr="${a.name}"]`);
      if (feld && feld.value !== "") {
        werte[a.name] = a.zahl ? parseFloat(feld.value) : feld.value;
      } else {
        werte[a.name] = a.start;
      }
    });
    const name = this.klassenName.charAt(0).toLowerCase() + this.klassenName.slice(1) + this.zaehler;
    this.objekte.push({ name, werte, ausgabe: {} });
    this.protokoll.push(
      `<code>${this.klassenName} ${name} = new ${this.klassenName}(${this.attribute
        .map((a) => (a.zahl ? werte[a.name] : `"${werte[a.name]}"`))
        .join(", ")});</code> – ein neues Objekt entsteht auf der Halde.`,
    );
    this.aktualisiere();
  }

  rufeAuf(objektName, methodenName) {
    const objekt = this.objekte.find((o) => o.name === objektName);
    const methode = this.methoden.find((m) => m.name === methodenName);
    if (!objekt || !methode) return;

    const umgebung = { ...objekt.werte };
    const argumente = [];
    methode.parameter.forEach((p) => {
      const feld = this.shadowRoot.querySelector(
        `[data-objekt="${objektName}"][data-param="${methode.name}-${p.name}"]`,
      );
      const wert = feld && feld.value !== "" ? parseFloat(feld.value) : 0;
      umgebung[p.name] = wert;
      argumente.push(wert);
    });

    if (methode.art === "anfrage") {
      const ergebnis = this.werte(methode.ausdruck, umgebung);
      objekt.ausgabe[methode.name] = ergebnis;
      this.protokoll.push(
        `<code>${objektName}.${methode.name}()</code> liefert <strong>${ergebnis}</strong>.`,
      );
    } else {
      methode.zuweisungen.forEach((z) => {
        const neu = this.werte(z.ausdruck, umgebung);
        umgebung[z.ziel] = neu;
        objekt.werte[z.ziel] = neu;
      });
      this.protokoll.push(
        `<code>${objektName}.${methode.name}(${argumente.join(", ")})</code> ändert nur die Attribute von <strong>${objektName}</strong>.`,
      );
    }
    this.aktualisiere();
  }

  entferne(objektName) {
    this.objekte = this.objekte.filter((o) => o.name !== objektName);
    this.protokoll.push(
      `Die Variable <code>${objektName}</code> zeigt nicht mehr auf das Objekt – der Speicherbereiniger kann es aufräumen.`,
    );
    this.aktualisiere();
  }

  zuruecksetzen() {
    this.objekte = [];
    this.zaehler = 0;
    this.protokoll = [];
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  baublanHTML() {
    return `
      <div class="karte bauplan">
        <div class="kopf">
          <span class="stempel">Bauplan</span>
          <span class="titel">${this.klassenName}</span>
        </div>
        <div class="abschnitt">
          ${this.attribute
            .map(
              (a) =>
                `<div class="zeile"><code>${a.name}: ${a.typ}</code><span class="kein-wert">kein Wert</span></div>`,
            )
            .join("")}
        </div>
        <div class="abschnitt">
          ${this.methoden
            .map(
              (m) =>
                `<div class="zeile"><code>${m.name}(${m.parameter
                  .map((p) => `${p.name}: ${p.typ}`)
                  .join(", ")})${m.art === "anfrage" ? `: ${m.typ}` : ""}</code></div>`,
            )
            .join("")}
        </div>
        <div class="fussnote">Die Klasse beschreibt nur, <em>welche</em> Attribute es gibt – nicht, welche Werte sie haben.</div>
      </div>`;
  }

  objektHTML(o) {
    return `
      <div class="karte objekt">
        <div class="kopf">
          <span class="stempel objekt-stempel">Objekt</span>
          <span class="titel">${o.name}</span>
          <button class="weg" data-weg="${o.name}" title="Referenz löschen">×</button>
        </div>
        <div class="abschnitt">
          ${this.attribute
            .map(
              (a) =>
                `<div class="zeile"><code>${a.name}</code><span class="wert">${
                  a.zahl ? o.werte[a.name] : `"${o.werte[a.name]}"`
                }</span></div>`,
            )
            .join("")}
        </div>
        <div class="abschnitt methoden">
          ${this.methoden
            .map(
              (m) => `
            <div class="methoden-zeile">
              ${m.parameter
                .map(
                  (p) =>
                    `<input type="number" class="param" value="10"
                            data-objekt="${o.name}" data-param="${m.name}-${p.name}"
                            title="${p.name}" />`,
                )
                .join("")}
              <button class="ruf" data-objekt="${o.name}" data-methode="${m.name}">
                ${m.name}()
              </button>
              ${
                o.ausgabe[m.name] !== undefined
                  ? `<span class="ergebnis">→ ${o.ausgabe[m.name]}</span>`
                  : ""
              }
            </div>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".objekte").innerHTML =
      this.objekte.length > 0
        ? this.objekte.map((o) => this.objektHTML(o)).join("")
        : `<div class="keine-objekte">Noch kein Objekt erzeugt. Die Klasse allein hat keine Werte.</div>`;

    this.shadowRoot.querySelector(".protokoll").innerHTML = this.protokoll
      .slice(-5)
      .map((t) => `<div class="log-zeile">${t}</div>`)
      .join("");

    const knopf = this.shadowRoot.querySelector(".btn-neu");
    knopf.disabled = this.objekte.length >= this.maxObjekte;

    this.shadowRoot.querySelectorAll(".ruf").forEach((b) => {
      b.onclick = () => this.rufeAuf(b.dataset.objekt, b.dataset.methode);
    });
    this.shadowRoot.querySelectorAll(".weg").forEach((b) => {
      b.onclick = () => this.entferne(b.dataset.weg);
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
        .konstruktor {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
          margin-bottom: 14px; padding: 9px 11px; border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
        }
        .konstruktor .aufruf { font-family: ui-monospace, monospace; font-size: 0.9em; }
        input {
          font: inherit; padding: 5px 7px; border-radius: 6px; width: 6em;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }
        input.param { width: 4.2em; padding: 3px 5px; font-size: 0.85em; }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.92em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .buehne {
          display: grid; grid-template-columns: minmax(200px, 1fr) 2fr;
          gap: 14px; margin-bottom: 12px;
        }
        @media (max-width: 620px) { .buehne { grid-template-columns: 1fr; } }
        .objekte { display: flex; flex-wrap: wrap; gap: 10px; align-content: flex-start; }

        .karte {
          border: 2px solid var(--color-spacer, #a4a4a4);
          border-radius: 10px; overflow: hidden;
          background: var(--color-background, white);
          min-width: 178px; flex: 1 1 178px;
        }
        .karte.bauplan { border-style: dashed; }
        .karte.objekt { border-color: var(--color-brand, #007864); }
        .kopf {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 9px; background: var(--color-nav, #f5f5f5);
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
        }
        .stempel {
          font-size: 0.68em; text-transform: uppercase; letter-spacing: 0.05em;
          padding: 2px 6px; border-radius: 4px; font-weight: 700;
          background: var(--color-spacer, #a4a4a4); color: #fff;
        }
        .stempel.objekt-stempel { background: var(--color-brand, #007864); }
        .titel { font-weight: 700; font-family: ui-monospace, monospace; font-size: 0.92em; }
        .weg {
          margin-left: auto; border: none; background: none; cursor: pointer;
          font-size: 1.1em; line-height: 1; opacity: 0.5; color: inherit;
        }
        .weg:hover { opacity: 1; color: var(--color-sync-error, #b91c1c); }

        .abschnitt {
          padding: 7px 9px;
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
        }
        .abschnitt:last-of-type { border-bottom: none; }
        .zeile {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 8px; font-size: 0.84em; padding: 2px 0;
        }
        .zeile code { font-family: ui-monospace, monospace; }
        .kein-wert { opacity: 0.4; font-style: italic; font-size: 0.9em; }
        .wert {
          font-weight: 700; font-family: ui-monospace, monospace;
          color: var(--color-brand, #007864); font-variant-numeric: tabular-nums;
        }
        .methoden-zeile {
          display: flex; align-items: center; gap: 5px; flex-wrap: wrap; padding: 3px 0;
        }
        .ruf {
          font: inherit; font-size: 0.8em; font-family: ui-monospace, monospace;
          padding: 3px 8px; border-radius: 5px; cursor: pointer;
          border: 1px solid var(--color-brand, #007864);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .ruf:hover { background: color-mix(in srgb, var(--color-brand, #007864) 14%, transparent); }
        .ergebnis {
          font-size: 0.8em; font-weight: 700;
          color: var(--color-brand, #007864); font-family: ui-monospace, monospace;
        }
        .fussnote { padding: 7px 9px; font-size: 0.76em; opacity: 0.7; }
        .keine-objekte {
          display: flex; align-items: center; justify-content: center;
          width: 100%; min-height: 100px; opacity: 0.6;
          font-size: 0.88em; text-align: center; padding: 10px;
        }
        .protokoll { display: flex; flex-direction: column; gap: 3px; }
        .log-zeile { font-size: 0.83em; opacity: 0.85; }
        .log-zeile code {
          font-family: ui-monospace, monospace;
          background: var(--color-nav, #f5f5f5); padding: 0 3px; border-radius: 3px;
        }
      </style>

      <div class="container">
        <div class="konstruktor">
          <span class="aufruf">new ${this.klassenName}(</span>
          ${this.attribute
            .map(
              (a) =>
                `<input type="${a.zahl ? "number" : "text"}" data-attr="${a.name}"
                        value="${a.start}" title="${a.name}: ${a.typ}" />`,
            )
            .join("")}
          <span class="aufruf">)</span>
          <button class="btn btn-neu">Objekt erzeugen</button>
          <button class="btn sekundaer btn-reset">Alle löschen</button>
        </div>

        <div class="buehne">
          ${this.baublanHTML()}
          <div class="objekte"></div>
        </div>

        <div class="protokoll"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".btn-neu").addEventListener("click", () => this.erzeuge());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());
    this.aktualisiere();
  }
}

customElements.define("oop-objektkarten", OopObjektkarten);
