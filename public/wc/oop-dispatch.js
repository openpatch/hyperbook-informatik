// Zeigt, wie Java einen Methodenaufruf auflöst: Der Compiler prüft am
// statischen Typ, die Laufzeit sucht ab dem dynamischen Typ nach oben.
class OopDispatch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.schritte = [];
    this.schrittNr = -1;
  }

  connectedCallback() {
    this.klassen = this.leseKlassen();
    this.wurzel = this.klassen.find((k) => !k.oberklasse) || this.klassen[0];
    this.methode = this.getAttribute("methode") || this.alleMethoden()[0] || "";
    this.statischerTyp = this.getAttribute("statisch") || this.wurzel.name;
    const konkret = this.klassen.filter((k) => !k.abstrakt);
    this.dynamischerTyp =
      this.getAttribute("objekt") ||
      (konkret.length > 0 ? konkret[konkret.length - 1].name : this.wurzel.name);
    this.render();
  }

  // --- Modell ------------------------------------------------------------

  // Format: "Fahrzeug*: mautSumme, fahre | Pkw < Fahrzeug: mautSumme"
  // Der Stern markiert eine abstrakte Klasse.
  leseKlassen() {
    const roh =
      this.getAttribute("klassen") ||
      "Fahrzeug*: mautSumme, fahre | Pkw < Fahrzeug: mautSumme | Lkw < Fahrzeug: mautSumme | Motorrad < Fahrzeug";

    return roh
      .split("|")
      .map((teil) => teil.trim())
      .filter((teil) => teil.length > 0)
      .map((teil) => {
        const doppelpunkt = teil.indexOf(":");
        const kopf = (doppelpunkt >= 0 ? teil.slice(0, doppelpunkt) : teil).trim();
        const rumpf = doppelpunkt >= 0 ? teil.slice(doppelpunkt + 1) : "";

        let name = kopf;
        let oberklasse = null;
        if (kopf.includes("<")) {
          const stuecke = kopf.split("<");
          name = stuecke[0].trim();
          oberklasse = stuecke[1].trim();
        }

        const abstrakt = name.endsWith("*");
        if (abstrakt) name = name.slice(0, -1).trim();

        const methoden = rumpf
          .split(",")
          .map((m) => m.trim().replace(/\(\)$/, ""))
          .filter((m) => m.length > 0);

        return { name, oberklasse, abstrakt, methoden, kinder: [] };
      });
  }

  klasse(name) {
    return this.klassen.find((k) => k.name === name);
  }

  alleMethoden() {
    const namen = [];
    this.klassen.forEach((k) =>
      k.methoden.forEach((m) => {
        if (!namen.includes(m)) namen.push(m);
      }),
    );
    return namen;
  }

  // Kette vom Typ aufwaerts bis zur Wurzel.
  kette(name) {
    const liste = [];
    let aktuell = this.klasse(name);
    while (aktuell) {
      liste.push(aktuell);
      aktuell = aktuell.oberklasse ? this.klasse(aktuell.oberklasse) : null;
    }
    return liste;
  }

  istUnterklasseVon(unten, oben) {
    return this.kette(unten).some((k) => k.name === oben);
  }

  // --- Schritte berechnen ------------------------------------------------

  baueSchritte() {
    const schritte = [];
    const stat = this.statischerTyp;
    const dyn = this.dynamischerTyp;
    const m = this.methode;

    if (!this.istUnterklasseVon(dyn, stat)) {
      schritte.push({
        art: "fehler",
        klasse: dyn,
        titel: "Compilerfehler: inkompatible Typen",
        text: `Ein Objekt der Klasse ${dyn} ist kein ${stat}. Die Zuweisung <code>${stat} x = new ${dyn}();</code> wird vom Compiler abgelehnt.`,
      });
      return schritte;
    }

    // Phase 1: Der Compiler schaut nur auf den statischen Typ.
    const statKette = this.kette(stat);
    const gefundenStatisch = statKette.find((k) => k.methoden.includes(m));
    if (!gefundenStatisch) {
      schritte.push({
        art: "fehler",
        klasse: stat,
        titel: "Compilerfehler: Methode nicht gefunden",
        text: `Der Compiler kennt nur den statischen Typ <code>${stat}</code>. Weder ${stat} noch eine seiner Oberklassen deklariert <code>${m}()</code> &ndash; also lehnt er den Aufruf ab, obwohl ${dyn} die Methode besitzt.`,
      });
      return schritte;
    }

    schritte.push({
      art: "compiler",
      klasse: gefundenStatisch.name,
      titel: "Der Compiler prüft",
      text: `Statischer Typ ist <code>${stat}</code>. Die Deklaration von <code>${m}()</code> steht in <strong>${gefundenStatisch.name}</strong> &ndash; der Aufruf ist erlaubt. Welche Implementierung genommen wird, entscheidet der Compiler <em>nicht</em>.`,
    });

    // Phase 2: Zur Laufzeit wird ab dem dynamischen Typ nach oben gesucht.
    const dynKette = this.kette(dyn);
    for (let i = 0; i < dynKette.length; i++) {
      const k = dynKette[i];
      if (k.methoden.includes(m)) {
        schritte.push({
          art: "treffer",
          klasse: k.name,
          titel: `Gefunden in ${k.name}`,
          text: `<strong>${k.name}</strong> implementiert <code>${m}()</code>. Diese Implementierung wird ausgeführt &ndash; die Suche endet hier.`,
        });
        return schritte;
      }
      schritte.push({
        art: "suche",
        klasse: k.name,
        titel: `Suche in ${k.name}`,
        text:
          i === 0
            ? `Zur Laufzeit zählt der dynamische Typ <code>${dyn}</code>. ${k.name} implementiert <code>${m}()</code> nicht &ndash; weiter zur Oberklasse.`
            : `Auch ${k.name} implementiert <code>${m}()</code> nicht &ndash; weiter zur Oberklasse.`,
      });
    }

    schritte.push({
      art: "fehler",
      klasse: dyn,
      titel: "Keine Implementierung",
      text: `Keine Klasse der Kette implementiert <code>${m}()</code>. In Java kann das nicht passieren: Entweder ist die Methode abstrakt und jede konkrete Unterklasse muss sie implementieren, oder es gibt eine Implementierung in der Oberklasse.`,
    });
    return schritte;
  }

  // --- Layout ------------------------------------------------------------

  layout() {
    this.klassen.forEach((k) => (k.kinder = []));
    this.klassen.forEach((k) => {
      if (k.oberklasse) {
        const eltern = this.klasse(k.oberklasse);
        if (eltern) eltern.kinder.push(k);
      }
    });

    const zeichenBreite = 7.6;
    const kopfHoehe = 26;
    const zeilenHoehe = 18;

    const masse = (k) => {
      const laengen = [k.name.length + (k.abstrakt ? 12 : 0)].concat(
        k.methoden.map((m) => m.length + 2),
      );
      const breite = Math.max(110, Math.ceil(Math.max(...laengen) * zeichenBreite) + 24);
      const hoehe = kopfHoehe + Math.max(1, k.methoden.length) * zeilenHoehe + 8;
      return { breite, hoehe };
    };

    const ebenen = [];
    const tiefe = (k) => this.kette(k.name).length - 1;
    this.klassen.forEach((k) => {
      const t = tiefe(k);
      if (!ebenen[t]) ebenen[t] = [];
      ebenen[t].push(k);
    });

    const abstand = 26;
    let y = 10;
    const boxen = {};
    ebenen.forEach((ebene) => {
      const hoehen = ebene.map((k) => masse(k).hoehe);
      const maxHoehe = Math.max(...hoehen);
      let x = 10;
      ebene.forEach((k) => {
        const m = masse(k);
        boxen[k.name] = { x, y, breite: m.breite, hoehe: m.hoehe, klasse: k };
        x += m.breite + abstand;
      });
      // Ebene horizontal zentrieren geschieht spaeter ueber die Gesamtbreite.
      ebene.gesamtBreite = x - abstand - 10;
      y += maxHoehe + 54;
    });

    const gesamtBreite = Math.max(...ebenen.map((e) => e.gesamtBreite)) + 20;
    ebenen.forEach((ebene) => {
      const versatz = (gesamtBreite - 20 - ebene.gesamtBreite) / 2;
      ebene.forEach((k) => (boxen[k.name].x += versatz));
    });

    return { boxen, breite: gesamtBreite, hoehe: y - 34 };
  }

  svg() {
    const { boxen, breite, hoehe } = this.layout();
    const aktiv = this.schrittNr >= 0 ? this.schritte[this.schrittNr] : null;

    const kanten = this.klassen
      .filter((k) => k.oberklasse && boxen[k.oberklasse])
      .map((k) => {
        const kind = boxen[k.name];
        const eltern = boxen[k.oberklasse];
        const x1 = kind.x + kind.breite / 2;
        const y1 = kind.y;
        const x2 = eltern.x + eltern.breite / 2;
        const y2 = eltern.y + eltern.hoehe;
        const mitte = (y1 + y2) / 2;
        return `<path d="M ${x1} ${y1} L ${x1} ${mitte} L ${x2} ${mitte} L ${x2} ${y2 + 11}"
                      class="kante" marker-end="url(#dreieck-${this.pfadId})" />`;
      })
      .join("");

    const kaesten = Object.values(boxen)
      .map((b) => {
        const k = b.klasse;
        const klassen = ["kasten"];
        if (k.abstrakt) klassen.push("abstrakt");
        if (aktiv && aktiv.klasse === k.name) klassen.push("aktiv", aktiv.art);
        if (k.name === this.dynamischerTyp) klassen.push("objekt");

        const methoden = k.methoden.length
          ? k.methoden
              .map(
                (m, i) =>
                  `<text x="${b.x + 12}" y="${b.y + 26 + 18 * (i + 1) - 5}"
                         class="methode ${m === this.methode ? "gesucht" : ""}">+ ${m}()</text>`,
              )
              .join("")
          : `<text x="${b.x + 12}" y="${b.y + 26 + 13}" class="methode leer">(keine eigene)</text>`;

        return `
          <g class="${klassen.join(" ")}">
            <rect x="${b.x}" y="${b.y}" width="${b.breite}" height="${b.hoehe}" rx="7" />
            <line x1="${b.x}" y1="${b.y + 26}" x2="${b.x + b.breite}" y2="${b.y + 26}" class="trenner" />
            <text x="${b.x + b.breite / 2}" y="${b.y + 18}" class="name">${k.name}${
              k.abstrakt ? " (abstrakt)" : ""
            }</text>
            ${methoden}
          </g>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${breite} ${hoehe}" class="hierarchie" role="img"
           aria-label="Klassenhierarchie mit Methodensuche">
        <defs>
          <marker id="dreieck-${this.pfadId}" viewBox="0 0 12 12" refX="6" refY="6"
                  markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 1 1 L 11 6 L 1 11 z" class="pfeilspitze" />
          </marker>
        </defs>
        ${kanten}
        ${kaesten}
      </svg>`;
  }

  // --- Interaktion -------------------------------------------------------

  weiter() {
    if (this.schrittNr < this.schritte.length - 1) this.schrittNr++;
    this.aktualisiere();
  }

  starte() {
    this.schritte = this.baueSchritte();
    this.schrittNr = 0;
    this.aktualisiere();
  }

  zuruecksetzen() {
    this.schritte = [];
    this.schrittNr = -1;
    this.aktualisiere();
  }

  aktualisiere() {
    const buehne = this.shadowRoot.querySelector(".buehne");
    if (buehne) buehne.innerHTML = this.svg();
    this.zeichneProtokoll();
    this.zeichneKnoepfe();
  }

  zeichneProtokoll() {
    const box = this.shadowRoot.querySelector(".protokoll");
    if (!box) return;
    if (this.schrittNr < 0) {
      box.innerHTML = `<p class="hinweis">Wähle einen statischen Typ, ein Objekt und eine Methode &ndash; dann starte den Aufruf.</p>`;
      return;
    }
    box.innerHTML = this.schritte
      .slice(0, this.schrittNr + 1)
      .map(
        (s, i) => `
        <div class="eintrag ${s.art} ${i === this.schrittNr ? "letzter" : ""}">
          <div class="titel">${i + 1}. ${s.titel}</div>
          <div class="text">${s.text}</div>
        </div>`,
      )
      .join("");
  }

  zeichneKnoepfe() {
    const start = this.shadowRoot.querySelector(".btn-start");
    if (!start) return;
    const fertig = this.schrittNr >= this.schritte.length - 1;
    if (this.schrittNr < 0) {
      start.textContent = "Aufruf ausführen";
      start.disabled = false;
    } else if (fertig) {
      start.textContent = "Fertig";
      start.disabled = true;
    } else {
      start.textContent = "Nächster Schritt";
      start.disabled = false;
    }
  }

  aufrufText() {
    return `${this.statischerTyp} x = new ${this.dynamischerTyp}();  x.${this.methode}();`;
  }

  render() {
    this.pfadId = Math.random().toString(36).slice(2, 8);
    const konkret = this.klassen.filter((k) => !k.abstrakt);

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
        .steuerung {
          display: flex; flex-wrap: wrap; gap: 10px 14px;
          align-items: center; margin-bottom: 12px;
        }
        label.feld { display: flex; align-items: center; gap: 6px; font-size: 0.9em; }
        label.feld > span { font-weight: 600; }
        select {
          font: inherit; padding: 5px 8px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }
        .btn {
          padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.95em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .aufruf {
          font-family: ui-monospace, monospace;
          font-size: 0.95em;
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          padding: 8px 10px;
          margin-bottom: 12px;
          overflow-x: auto;
        }
        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          padding: 6px; margin-bottom: 12px;
        }
        .hierarchie { width: 100%; height: auto; display: block; }

        .kasten rect {
          fill: var(--color-background, white);
          stroke: var(--color-spacer, #a4a4a4);
          stroke-width: 1.5;
        }
        .kasten.abstrakt rect { stroke-dasharray: 6 4; }
        .kasten.objekt rect { stroke-width: 2.5; stroke: var(--color-text, black); }
        .kasten.aktiv rect { stroke-width: 3; }
        .kasten.aktiv.suche rect {
          stroke: #b45309;
          fill: color-mix(in srgb, #b45309 12%, var(--color-background, white));
        }
        .kasten.aktiv.treffer rect {
          stroke: var(--color-sync-ok, #15803d);
          fill: color-mix(in srgb, var(--color-sync-ok, #15803d) 16%, var(--color-background, white));
        }
        .kasten.aktiv.compiler rect {
          stroke: var(--color-brand, #007864);
          fill: color-mix(in srgb, var(--color-brand, #007864) 12%, var(--color-background, white));
        }
        .kasten.aktiv.fehler rect {
          stroke: var(--color-sync-error, #b91c1c);
          fill: color-mix(in srgb, var(--color-sync-error, #b91c1c) 14%, var(--color-background, white));
        }
        .trenner { stroke: var(--color-spacer, #a4a4a4); stroke-width: 1; }
        text { fill: var(--color-text, black); font-family: system-ui, sans-serif; }
        .name { text-anchor: middle; font-size: 13px; font-weight: 700; }
        .methode { font-size: 12px; font-family: ui-monospace, monospace; }
        .methode.gesucht { font-weight: 700; fill: var(--color-brand, #007864); }
        .methode.leer { opacity: 0.5; font-style: italic; font-family: system-ui, sans-serif; }
        .kante { fill: none; stroke: var(--color-text, black); stroke-width: 1.5; opacity: 0.6; }
        .pfeilspitze {
          fill: var(--color-background, white);
          stroke: var(--color-text, black);
          stroke-width: 1.5;
        }

        .protokoll { display: flex; flex-direction: column; gap: 8px; }
        .eintrag {
          border-left: 4px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          border-radius: 0 8px 8px 0;
          padding: 8px 10px;
          font-size: 0.9em;
          opacity: 0.65;
        }
        .eintrag.letzter { opacity: 1; }
        .eintrag.suche { border-left-color: #b45309; }
        .eintrag.treffer { border-left-color: var(--color-sync-ok, #15803d); }
        .eintrag.compiler { border-left-color: var(--color-brand, #007864); }
        .eintrag.fehler { border-left-color: var(--color-sync-error, #b91c1c); }
        .eintrag .titel { font-weight: 700; margin-bottom: 2px; }
        .eintrag code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white);
          padding: 0 3px; border-radius: 3px;
        }
        .hinweis { margin: 0; font-size: 0.9em; opacity: 0.7; }
      </style>

      <div class="container">
        <div class="steuerung">
          <label class="feld">
            <span>Statischer Typ</span>
            <select class="wahl-statisch">
              ${this.klassen
                .map(
                  (k) =>
                    `<option value="${k.name}" ${k.name === this.statischerTyp ? "selected" : ""}>${k.name}</option>`,
                )
                .join("")}
            </select>
          </label>
          <label class="feld">
            <span>Erzeugtes Objekt</span>
            <select class="wahl-objekt">
              ${konkret
                .map(
                  (k) =>
                    `<option value="${k.name}" ${k.name === this.dynamischerTyp ? "selected" : ""}>new ${k.name}()</option>`,
                )
                .join("")}
            </select>
          </label>
          <label class="feld">
            <span>Aufruf</span>
            <select class="wahl-methode">
              ${this.alleMethoden()
                .map(
                  (m) =>
                    `<option value="${m}" ${m === this.methode ? "selected" : ""}>${m}()</option>`,
                )
                .join("")}
            </select>
          </label>
          <button class="btn btn-start">Aufruf ausführen</button>
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
        </div>

        <div class="aufruf"></div>
        <div class="buehne"></div>
        <div class="protokoll"></div>
      </div>
    `;

    const neuZeichnen = () => {
      this.shadowRoot.querySelector(".aufruf").textContent = this.aufrufText();
      this.zuruecksetzen();
    };

    this.shadowRoot.querySelector(".wahl-statisch").addEventListener("change", (e) => {
      this.statischerTyp = e.target.value;
      neuZeichnen();
    });
    this.shadowRoot.querySelector(".wahl-objekt").addEventListener("change", (e) => {
      this.dynamischerTyp = e.target.value;
      neuZeichnen();
    });
    this.shadowRoot.querySelector(".wahl-methode").addEventListener("change", (e) => {
      this.methode = e.target.value;
      neuZeichnen();
    });
    this.shadowRoot.querySelector(".btn-start").addEventListener("click", () => {
      if (this.schrittNr < 0) this.starte();
      else this.weiter();
    });
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => {
      this.zuruecksetzen();
    });

    neuZeichnen();
  }
}

customElements.define("oop-dispatch", OopDispatch);
