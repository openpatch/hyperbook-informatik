// Geheimnisprinzip zum Ausprobieren: Dieselben Zugriffe werden einmal auf ein
// gekapseltes und einmal auf ein offenes Objekt angewendet. Erst der Vergleich
// zeigt, wozu private gut ist – die Invariante bleibt erhalten.
class OopKapselung extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.protokoll = [];
  }

  connectedCallback() {
    this.klassenName = this.getAttribute("klasse") || "Konto";
    this.objektName =
      this.getAttribute("objekt") ||
      this.klassenName.charAt(0).toLowerCase() + this.klassenName.slice(1);

    const attr = (this.getAttribute("attribut") || "stand:int:100").split(":");
    this.attribut = { name: attr[0].trim(), typ: (attr[1] || "int").trim() };
    this.startWert = parseFloat(attr[2] || "0");

    this.invarianteText =
      this.getAttribute("invariante") || `${this.attribut.name} >= 0`;
    this.invariante = this.parse(this.invarianteText);
    this.invarianteErklaerung =
      this.getAttribute("invariante-text") || "Der Kontostand darf nie negativ werden.";

    this.methoden = this.leseMethoden();
    this.versuche = this.leseVersuche();
    this.offen = false;
    this.wert = this.startWert;
    this.render();
  }

  // "einzahlen(betrag): stand = stand + betrag : betrag > 0 | gibStand(): return stand :"
  leseMethoden() {
    return (
      this.getAttribute("methoden") ||
      "einzahlen(betrag): stand = stand + betrag : betrag > 0 | abheben(betrag): stand = stand - betrag : betrag > 0 && stand - betrag >= 0 | gibStand(): return stand :"
    )
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        const teile = s.split(":");
        const kopf = teile[0].trim();
        const wirkung = (teile[1] || "").trim();
        const bedingung = (teile[2] || "").trim();
        const klammerAuf = kopf.indexOf("(");
        const name = kopf.slice(0, klammerAuf).trim();
        const parameter = kopf
          .slice(klammerAuf + 1, kopf.indexOf(")"))
          .split(",")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        const anfrage = wirkung.startsWith("return");
        return {
          name,
          parameter,
          anfrage,
          ausdruck: this.parse(anfrage ? wirkung.slice(6).trim() : wirkung.split("=")[1].trim()),
          ziel: anfrage ? null : wirkung.split("=")[0].trim(),
          bedingung: bedingung ? this.parse(bedingung) : null,
          bedingungText: bedingung,
        };
      });
  }

  // "konto.stand = 500 | konto.einzahlen(500) | konto.abheben(1000)"
  leseVersuche() {
    const standard = [
      `${this.objektName}.${this.attribut.name} = 500`,
      `${this.objektName}.${this.attribut.name} = -500`,
      `${this.objektName}.einzahlen(500)`,
      `${this.objektName}.einzahlen(-500)`,
      `${this.objektName}.abheben(50)`,
      `${this.objektName}.abheben(9999)`,
      `${this.objektName}.gibStand()`,
    ];
    const roh = this.getAttribute("versuche");
    const liste = roh
      ? roh.split("|").map((s) => s.trim()).filter((s) => s.length > 0)
      : standard;
    return liste.map((text) => this.zerlegeVersuch(text));
  }

  zerlegeVersuch(text) {
    const punkt = text.indexOf(".");
    const rest = text.slice(punkt + 1);
    if (rest.includes("(")) {
      const name = rest.slice(0, rest.indexOf("(")).trim();
      const argumente = rest
        .slice(rest.indexOf("(") + 1, rest.lastIndexOf(")"))
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0)
        .map((a) => parseFloat(a));
      return { text, art: "methode", name, argumente };
    }
    const gleich = rest.indexOf("=");
    return {
      text,
      art: "direkt",
      name: rest.slice(0, gleich).trim(),
      wert: parseFloat(rest.slice(gleich + 1).trim()),
    };
  }

  // --- Ausdrücke (Arithmetik, Vergleiche, und/oder) ----------------------

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
        if (n === "und") tokens.push({ art: "op", wert: "&&" });
        else if (n === "oder") tokens.push({ art: "op", wert: "||" });
        else tokens.push({ art: "name", wert: n });
      } else if (text.startsWith(">=", i) || text.startsWith("<=", i) ||
                 text.startsWith("==", i) || text.startsWith("!=", i) ||
                 text.startsWith("&&", i) || text.startsWith("||", i)) {
        tokens.push({ art: "op", wert: text.slice(i, i + 2) });
        i += 2;
      } else if ("+-*/()<>".includes(c)) {
        tokens.push({ art: "op", wert: c });
        i++;
      } else i++;
    }

    let pos = 0;
    const schau = () => tokens[pos];
    const nimm = () => tokens[pos++];

    const oder = () => {
      let l = und();
      while (schau() && schau().wert === "||") {
        nimm();
        l = { art: "binaer", op: "||", links: l, rechts: und() };
      }
      return l;
    };
    const und = () => {
      let l = vergleich();
      while (schau() && schau().wert === "&&") {
        nimm();
        l = { art: "binaer", op: "&&", links: l, rechts: vergleich() };
      }
      return l;
    };
    const vergleich = () => {
      let l = summe();
      while (schau() && [">=", "<=", "==", "!=", "<", ">"].includes(schau().wert)) {
        const op = nimm().wert;
        l = { art: "binaer", op, links: l, rechts: summe() };
      }
      return l;
    };
    const summe = () => {
      let l = produkt();
      while (schau() && (schau().wert === "+" || schau().wert === "-")) {
        const op = nimm().wert;
        l = { art: "binaer", op, links: l, rechts: produkt() };
      }
      return l;
    };
    const produkt = () => {
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
        const a = oder();
        if (schau() && schau().wert === ")") nimm();
        return a;
      }
      return { art: "zahl", wert: 0 };
    };
    return oder();
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
        switch (knoten.op) {
          case "+": return l + r;
          case "-": return l - r;
          case "*": return l * r;
          case "/": return r === 0 ? 0 : Math.round(l / r);
          case ">": return l > r;
          case "<": return l < r;
          case ">=": return l >= r;
          case "<=": return l <= r;
          case "==": return l === r;
          case "!=": return l !== r;
          case "&&": return Boolean(l) && Boolean(r);
          case "||": return Boolean(l) || Boolean(r);
          default: return 0;
        }
      }
      default:
        return 0;
    }
  }

  invarianteGilt() {
    return Boolean(this.werte(this.invariante, { [this.attribut.name]: this.wert }));
  }

  // --- Zugriffe ausführen ------------------------------------------------

  fuehreAus(versuch) {
    if (versuch.art === "direkt") {
      if (!this.offen) {
        this.protokoll.push({
          art: "compilerfehler",
          code: versuch.text + ";",
          text: `<code>${this.attribut.name} has private access in ${this.klassenName}</code> – der Compiler lehnt den Zugriff ab. Von außen kommt niemand an das Attribut heran.`,
        });
      } else {
        this.wert = versuch.wert;
        this.protokoll.push({
          art: this.invarianteGilt() ? "ok" : "kaputt",
          code: versuch.text + ";",
          text: this.invarianteGilt()
            ? `Der Zugriff ist erlaubt, weil das Attribut public ist. ${this.attribut.name} = ${this.wert}.`
            : `Der Zugriff ist erlaubt – und zerstört die Invariante: ${this.attribut.name} = ${this.wert}. Niemand hat den Wert geprüft.`,
        });
      }
      this.aktualisiere();
      return;
    }

    const methode = this.methoden.find((m) => m.name === versuch.name);
    if (!methode) {
      this.protokoll.push({
        art: "compilerfehler",
        code: versuch.text + ";",
        text: `<code>cannot find symbol: method ${versuch.name}</code> – diese Methode gibt es nicht.`,
      });
      this.aktualisiere();
      return;
    }

    const umgebung = { [this.attribut.name]: this.wert };
    methode.parameter.forEach((p, i) => {
      umgebung[p] = versuch.argumente[i] !== undefined ? versuch.argumente[i] : 0;
    });

    if (methode.anfrage) {
      const ergebnis = this.werte(methode.ausdruck, umgebung);
      this.protokoll.push({
        art: "ok",
        code: versuch.text + ";",
        text: `Die Anfrage liefert <strong>${ergebnis}</strong>. Lesen ist erlaubt – ändern nicht.`,
      });
    } else if (methode.bedingung && !this.werte(methode.bedingung, umgebung)) {
      this.protokoll.push({
        art: "abgewiesen",
        code: versuch.text + ";",
        text: `Die Methode prüft <code>${methode.bedingungText}</code> – die Bedingung ist verletzt. Der Auftrag wird abgewiesen, ${this.attribut.name} bleibt ${this.wert}.`,
      });
    } else {
      this.wert = this.werte(methode.ausdruck, umgebung);
      this.protokoll.push({
        art: "ok",
        code: versuch.text + ";",
        text: `Die Methode prüft den Wert und führt die Änderung aus: ${this.attribut.name} = ${this.wert}.`,
      });
    }
    this.aktualisiere();
  }

  zuruecksetzen() {
    this.wert = this.startWert;
    this.protokoll = [];
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  aktualisiere() {
    const gilt = this.invarianteGilt();

    this.shadowRoot.querySelector(".objekt-box").innerHTML = `
      <div class="objekt ${this.offen ? "offen" : "gekapselt"} ${gilt ? "" : "kaputt"}">
        <div class="objekt-kopf">
          <span class="objekt-name">${this.objektName}: ${this.klassenName}</span>
          <span class="schloss">${this.offen ? "🔓 offen" : "🔒 gekapselt"}</span>
        </div>
        <div class="objekt-attribut">
          <code>${this.offen ? "public" : "private"} ${this.attribut.typ} ${this.attribut.name}</code>
          <span class="attribut-wert">${this.wert}</span>
        </div>
        <div class="objekt-methoden">
          ${this.methoden
            .map((m) => `<code>public ${m.name}(${m.parameter.join(", ")})</code>`)
            .join("")}
        </div>
      </div>
      <div class="invariante ${gilt ? "gilt" : "verletzt"}">
        <strong>${gilt ? "Invariante gilt" : "Invariante verletzt"}</strong>
        <code>${this.invarianteText}</code>
        <span>${this.invarianteErklaerung}</span>
      </div>`;

    this.shadowRoot.querySelector(".protokoll").innerHTML = this.protokoll.length
      ? this.protokoll
          .slice(-6)
          .map(
            (e) => `
        <div class="eintrag ${e.art}">
          <code class="code">${e.code}</code>
          <div class="erklaerung">${e.text}</div>
        </div>`,
          )
          .join("")
      : `<div class="hinweis">Klicke einen Zugriff an, um ihn auszuführen.</div>`;
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
        .schalter-zeile {
          display: flex; flex-wrap: wrap; gap: 14px; align-items: center;
          margin-bottom: 12px;
        }
        .schalter { display: flex; align-items: center; gap: 7px; cursor: pointer; font-size: 0.9em; }
        .schalter code {
          font-family: ui-monospace, monospace;
          background: var(--color-nav, #f5f5f5); padding: 1px 5px; border-radius: 4px;
        }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold; background: #6b7280; color: #fff;
          margin-left: auto;
        }

        .objekt-box { display: grid; gap: 10px; margin-bottom: 14px; }
        .objekt {
          border: 2px solid var(--color-brand, #007864);
          border-radius: 10px; overflow: hidden;
        }
        .objekt.offen { border-color: #b45309; border-style: dashed; }
        .objekt.kaputt { border-color: var(--color-sync-error, #b91c1c); }
        .objekt-kopf {
          display: flex; justify-content: space-between; align-items: center;
          padding: 7px 10px; background: var(--color-nav, #f5f5f5);
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
        }
        .objekt-name { font-family: ui-monospace, monospace; font-weight: 700; font-size: 0.9em; }
        .schloss { font-size: 0.82em; }
        .objekt-attribut {
          display: flex; justify-content: space-between; align-items: center;
          gap: 10px; padding: 9px 10px;
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
        }
        .objekt-attribut code { font-family: ui-monospace, monospace; font-size: 0.86em; }
        .attribut-wert {
          font-weight: 700; font-size: 1.25em;
          color: var(--color-brand, #007864); font-variant-numeric: tabular-nums;
        }
        .objekt.kaputt .attribut-wert { color: var(--color-sync-error, #b91c1c); }
        .objekt-methoden {
          display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 10px;
        }
        .objekt-methoden code {
          font-family: ui-monospace, monospace; font-size: 0.78em;
          background: var(--color-nav, #f5f5f5); padding: 2px 6px; border-radius: 4px;
        }

        .invariante {
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
          padding: 8px 10px; border-radius: 8px; font-size: 0.86em;
        }
        .invariante.gilt {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 16%, transparent);
        }
        .invariante.verletzt {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 16%, transparent);
        }
        .invariante code { font-family: ui-monospace, monospace; }
        .invariante span { opacity: 0.8; }

        .versuche { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
        .versuch {
          font-family: ui-monospace, monospace; font-size: 0.83em;
          padding: 6px 10px; border-radius: 6px; cursor: pointer;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white); color: var(--color-text, black);
        }
        .versuch:hover { border-color: var(--color-brand, #007864); }

        .protokoll { display: flex; flex-direction: column; gap: 6px; }
        .eintrag {
          border-left: 4px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          border-radius: 0 8px 8px 0; padding: 7px 10px; font-size: 0.86em;
        }
        .eintrag.ok { border-left-color: var(--color-sync-ok, #15803d); }
        .eintrag.abgewiesen { border-left-color: #b45309; }
        .eintrag.compilerfehler { border-left-color: var(--color-brand, #007864); }
        .eintrag.kaputt { border-left-color: var(--color-sync-error, #b91c1c); }
        .eintrag .code {
          display: block; font-family: ui-monospace, monospace;
          font-weight: 700; margin-bottom: 3px;
        }
        .eintrag .erklaerung code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 3px; border-radius: 3px;
        }
        .hinweis { font-size: 0.86em; opacity: 0.6; }
      </style>

      <div class="container">
        <div class="schalter-zeile">
          <label class="schalter">
            <input type="checkbox" class="offen-schalter" />
            <span>Attribut <code>${this.attribut.name}</code> auf <code>public</code> stellen</span>
          </label>
          <button class="btn btn-reset">Zurücksetzen</button>
        </div>

        <div class="objekt-box"></div>

        <div class="versuche">
          ${this.versuche
            .map((v, i) => `<button class="versuch" data-nr="${i}">${v.text};</button>`)
            .join("")}
        </div>

        <div class="protokoll"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".offen-schalter").addEventListener("change", (e) => {
      this.offen = e.target.checked;
      this.protokoll.push({
        art: "compilerfehler",
        code: `${this.offen ? "public" : "private"} ${this.attribut.typ} ${this.attribut.name};`,
        text: this.offen
          ? "Das Attribut ist jetzt von außen erreichbar. Probiere dieselben Zugriffe noch einmal."
          : "Das Attribut ist wieder gekapselt – nur die Methoden der Klasse kommen daran.",
      });
      this.aktualisiere();
    });
    this.shadowRoot.querySelectorAll(".versuch").forEach((b) => {
      b.addEventListener("click", () =>
        this.fuehreAus(this.versuche[parseInt(b.dataset.nr, 10)]),
      );
    });
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());

    this.aktualisiere();
  }
}

customElements.define("oop-kapselung", OopKapselung);
