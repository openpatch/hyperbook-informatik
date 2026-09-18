// Der Aufrufbaum einer rekursiven Methode. Er zeigt, wie viele Aufrufe wirklich
// entstehen, wie tief der Kellerstapel dabei wird und welche Teilaufrufe
// mehrfach berechnet werden.
class OopAufrufbaum extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.schritt = 0;
    this.timer = null;
  }

  connectedCallback() {
    this.verfahren = (this.getAttribute("verfahren") || "fib").toLowerCase();
    this.argument = parseInt(this.getAttribute("argument") || "5", 10);
    this.argument2 = parseInt(this.getAttribute("argument2") || "0", 10);
    this.mehrfachZeigen = this.getAttribute("mehrfach") !== "nein";
    this.baueBaum();
    this.render();
  }

  disconnectedCallback() {
    if (this.timer) clearInterval(this.timer);
  }

  grenzen() {
    switch (this.verfahren) {
      case "fib": return { min: 0, max: 8, start: 5 };
      case "fakultaet": return { min: 0, max: 12, start: 5 };
      case "hanoi": return { min: 1, max: 5, start: 3 };
      case "summe": return { min: 0, max: 12, start: 5 };
      default: return { min: 0, max: 8, start: 5 };
    }
  }

  // --- Baum aufbauen -----------------------------------------------------

  baueBaum() {
    const g = this.grenzen();
    this.argument = Math.min(Math.max(this.argument, g.min), g.max);
    this.aufrufe = [];
    this.reihenfolge = [];
    this.maxTiefe = 0;

    const neu = (beschriftung, tiefe) => {
      const k = {
        nr: this.aufrufe.length,
        beschriftung,
        kinder: [],
        tiefe,
        ergebnis: null,
      };
      this.aufrufe.push(k);
      this.reihenfolge.push({ art: "aufruf", knoten: k });
      this.maxTiefe = Math.max(this.maxTiefe, tiefe + 1);
      return k;
    };
    const fertig = (k, ergebnis) => {
      k.ergebnis = ergebnis;
      this.reihenfolge.push({ art: "rueckgabe", knoten: k });
      return ergebnis;
    };

    const fib = (n, tiefe) => {
      const k = neu(`fib(${n})`, tiefe);
      if (n <= 1) return fertig(k, n);
      const ersteNr = this.aufrufe.length;
      const a = fib(n - 1, tiefe + 1);
      k.kinder.push(this.aufrufe[ersteNr]);
      const zweiteNr = this.aufrufe.length;
      const b = fib(n - 2, tiefe + 1);
      k.kinder.push(this.aufrufe[zweiteNr]);
      return fertig(k, a + b);
    };

    const fakultaet = (n, tiefe) => {
      const k = neu(`fakultaet(${n})`, tiefe);
      if (n <= 1) return fertig(k, 1);
      const naechste = this.aufrufe.length;
      const r = fakultaet(n - 1, tiefe + 1);
      k.kinder.push(this.aufrufe[naechste]);
      return fertig(k, n * r);
    };

    const summe = (n, tiefe) => {
      const k = neu(`summe(${n})`, tiefe);
      if (n <= 0) return fertig(k, 0);
      const naechste = this.aufrufe.length;
      const r = summe(n - 1, tiefe + 1);
      k.kinder.push(this.aufrufe[naechste]);
      return fertig(k, n + r);
    };

    const hanoi = (n, tiefe) => {
      const k = neu(`hanoi(${n})`, tiefe);
      if (n <= 0) return fertig(k, 0);
      const ersteNr = this.aufrufe.length;
      const a = hanoi(n - 1, tiefe + 1);
      k.kinder.push(this.aufrufe[ersteNr]);
      const zweiteNr = this.aufrufe.length;
      const b = hanoi(n - 1, tiefe + 1);
      k.kinder.push(this.aufrufe[zweiteNr]);
      return fertig(k, a + b + 1);
    };

    switch (this.verfahren) {
      case "fakultaet": fakultaet(this.argument, 0); break;
      case "summe": summe(this.argument, 0); break;
      case "hanoi": hanoi(this.argument, 0); break;
      default: fib(this.argument, 0);
    }

    this.wurzel = this.aufrufe[0];
    this.schritt = 0;

    // Mehrfach berechnete Teilaufrufe zählen.
    const zaehlung = {};
    this.aufrufe.forEach((k) => {
      zaehlung[k.beschriftung] = (zaehlung[k.beschriftung] || 0) + 1;
    });
    this.mehrfach = Object.keys(zaehlung).filter((b) => zaehlung[b] > 1);
    this.zaehlung = zaehlung;
  }

  // --- Ablauf ------------------------------------------------------------

  sichtbar(knoten) {
    return this.reihenfolge
      .slice(0, this.schritt)
      .some((e) => e.art === "aufruf" && e.knoten.nr === knoten.nr);
  }

  zurueckgekehrt(knoten) {
    return this.reihenfolge
      .slice(0, this.schritt)
      .some((e) => e.art === "rueckgabe" && e.knoten.nr === knoten.nr);
  }

  stapel() {
    const offen = [];
    this.reihenfolge.slice(0, this.schritt).forEach((e) => {
      if (e.art === "aufruf") offen.push(e.knoten);
      else {
        const i = offen.findIndex((k) => k.nr === e.knoten.nr);
        if (i >= 0) offen.splice(i, 1);
      }
    });
    return offen;
  }

  weiter() {
    if (this.schritt < this.reihenfolge.length) this.schritt++;
    this.aktualisiere();
  }

  zurueck() {
    if (this.schritt > 0) this.schritt--;
    this.aktualisiere();
  }

  alles() {
    this.schritt = this.reihenfolge.length;
    this.aktualisiere();
  }

  abspielen() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.aktualisiere();
      return;
    }
    this.timer = setInterval(() => {
      if (this.schritt >= this.reihenfolge.length) {
        clearInterval(this.timer);
        this.timer = null;
        this.aktualisiere();
        return;
      }
      this.weiter();
    }, 420);
    this.aktualisiere();
  }

  zuruecksetzen() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.schritt = 0;
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  layout() {
    let spalte = 0;
    const plaetze = {};
    const gehe = (k) => {
      if (k.kinder.length === 0) {
        plaetze[k.nr] = { spalte: spalte++, tiefe: k.tiefe };
        return plaetze[k.nr].spalte;
      }
      const kinderSpalten = k.kinder.map((kind) => gehe(kind));
      const mitte = (Math.min(...kinderSpalten) + Math.max(...kinderSpalten)) / 2;
      plaetze[k.nr] = { spalte: mitte, tiefe: k.tiefe };
      return mitte;
    };
    gehe(this.wurzel);

    const spaltenBreite = 62;
    const ebenenHoehe = 58;
    const randX = 40;
    const randY = 26;
    Object.keys(plaetze).forEach((nr) => {
      plaetze[nr].x = randX + plaetze[nr].spalte * spaltenBreite;
      plaetze[nr].y = randY + plaetze[nr].tiefe * ebenenHoehe;
    });
    return {
      plaetze,
      breite: randX * 2 + Math.max(0, spalte - 1) * spaltenBreite,
      hoehe: randY * 2 + Math.max(0, this.maxTiefe - 1) * ebenenHoehe,
      radius: 22,
    };
  }

  svg() {
    const l = this.layout();
    const aktuell =
      this.schritt > 0 ? this.reihenfolge[this.schritt - 1] : null;

    const kanten = this.aufrufe
      .flatMap((k) =>
        k.kinder.map((kind) => {
          const a = l.plaetze[k.nr];
          const b = l.plaetze[kind.nr];
          const sichtbar = this.sichtbar(kind);
          return `<line x1="${a.x}" y1="${a.y + l.radius}" x2="${b.x}" y2="${b.y - l.radius}"
                        class="kante ${sichtbar ? "" : "blass"}" />`;
        }),
      )
      .join("");

    const knoten = this.aufrufe
      .map((k) => {
        const p = l.plaetze[k.nr];
        const klassen = ["aufruf"];
        if (!this.sichtbar(k)) klassen.push("blass");
        else if (this.zurueckgekehrt(k)) klassen.push("zurueck");
        else klassen.push("offen");
        if (aktuell && aktuell.knoten.nr === k.nr) klassen.push("aktuell");
        if (this.mehrfachZeigen && this.mehrfach.includes(k.beschriftung)) klassen.push("mehrfach");

        return `
          <g class="${klassen.join(" ")}">
            <circle cx="${p.x}" cy="${p.y}" r="${l.radius}" />
            <text x="${p.x}" y="${p.y + 1}" class="ruf">${k.beschriftung.replace(/^[a-z]+/, "")}</text>
            ${
              this.zurueckgekehrt(k)
                ? `<text x="${p.x}" y="${p.y + 13}" class="erg">= ${k.ergebnis}</text>`
                : ""
            }
          </g>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${l.breite} ${l.hoehe}" class="baum" role="img"
           aria-label="Aufrufbaum der rekursiven Methode">
        ${kanten}
        ${knoten}
      </svg>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".buehne").innerHTML = this.svg();

    const st = this.stapel();
    this.shadowRoot.querySelector(".stapel").innerHTML = st.length
      ? st
          .slice()
          .reverse()
          .map(
            (k, i) =>
              `<div class="rahmen ${i === 0 ? "oben" : ""}">${k.beschriftung}</div>`,
          )
          .join("")
      : `<div class="rahmen leer">Der Kellerstapel ist leer.</div>`;

    const fertige = this.aufrufe.filter((k) => this.zurueckgekehrt(k)).length;
    this.shadowRoot.querySelector(".zahlen").innerHTML = `
      <span>Aufrufe insgesamt <strong>${this.aufrufe.length}</strong></span>
      <span>davon zurückgekehrt <strong>${fertige}</strong></span>
      <span>aktuelle Stapeltiefe <strong>${st.length}</strong></span>
      <span>maximale Tiefe <strong>${this.maxTiefe}</strong></span>`;

    const aktuell = this.schritt > 0 ? this.reihenfolge[this.schritt - 1] : null;
    this.shadowRoot.querySelector(".erklaerung").innerHTML = aktuell
      ? aktuell.art === "aufruf"
        ? `<code>${aktuell.knoten.beschriftung}</code> wird aufgerufen – ein neuer Kellerrahmen entsteht.`
        : `<code>${aktuell.knoten.beschriftung}</code> gibt <strong>${aktuell.knoten.ergebnis}</strong> zurück – der Kellerrahmen wird abgeräumt.`
      : `Noch nichts passiert. Der erste Aufruf ist <code>${this.wurzel.beschriftung}</code>.`;

    const mehrfachBox = this.shadowRoot.querySelector(".mehrfach-hinweis");
    if (this.mehrfachZeigen && this.mehrfach.length > 0 && this.schritt >= this.reihenfolge.length) {
      const schlimmster = this.mehrfach
        .slice()
        .sort((a, b) => this.zaehlung[b] - this.zaehlung[a])[0];
      mehrfachBox.className = "mehrfach-hinweis sichtbar";
      mehrfachBox.innerHTML = `Die eingefärbten Knoten werden mehrfach berechnet – <code>${schlimmster}</code> allein ${this.zaehlung[schlimmster]}-mal. Genau hier liegt der Grund, warum dieses Verfahren so schnell so teuer wird.`;
    } else {
      mehrfachBox.className = "mehrfach-hinweis";
      mehrfachBox.innerHTML = "";
    }

    this.shadowRoot.querySelector(".btn-weiter").disabled = this.schritt >= this.reihenfolge.length;
    this.shadowRoot.querySelector(".btn-zurueck").disabled = this.schritt === 0;
    this.shadowRoot.querySelector(".btn-abspielen").textContent = this.timer ? "Anhalten" : "Abspielen";
    this.shadowRoot.querySelector(".fortschritt").textContent =
      `Schritt ${this.schritt} von ${this.reihenfolge.length}`;
  }

  render() {
    const g = this.grenzen();
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
        .steuerung {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px;
        }
        label.feld { display: flex; align-items: center; gap: 6px; font-size: 0.88em; }
        select, input[type="number"] {
          font: inherit; padding: 5px 8px; border-radius: 6px; width: 5em;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }
        select { width: auto; }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .fortschritt { font-size: 0.82em; opacity: 0.7; font-variant-numeric: tabular-nums; }

        .zahlen {
          display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.83em; margin-bottom: 8px;
        }
        .zahlen strong {
          color: var(--color-brand, #007864); font-variant-numeric: tabular-nums;
        }

        .haupt { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 10px; }
        @media (min-width: 640px) { .haupt { grid-template-columns: 1fr 150px; } }
        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 6px; overflow-x: auto;
        }
        .baum { width: 100%; min-width: 300px; height: auto; display: block; }

        .aufruf circle {
          fill: var(--color-background, white);
          stroke: var(--color-text, black); stroke-width: 1.6;
          transition: opacity 0.2s ease;
        }
        .aufruf.blass { opacity: 0.18; }
        .aufruf.offen circle {
          fill: color-mix(in srgb, #b45309 26%, var(--color-background, white));
          stroke: #b45309;
        }
        .aufruf.zurueck circle {
          fill: color-mix(in srgb, var(--color-sync-ok, #15803d) 22%, var(--color-background, white));
          stroke: var(--color-sync-ok, #15803d);
        }
        .aufruf.mehrfach circle { stroke-dasharray: 4 3; stroke-width: 2.4; }
        .aufruf.aktuell circle { stroke-width: 3.4; stroke: var(--color-brand, #007864); }
        text { fill: var(--color-text, black); font-family: system-ui, sans-serif; }
        .ruf {
          text-anchor: middle; font-size: 11px; font-weight: 700;
          font-family: ui-monospace, monospace;
        }
        .erg { text-anchor: middle; font-size: 9.5px; opacity: 0.85; }
        .kante { stroke: var(--color-text, black); stroke-width: 1.5; opacity: 0.55; }
        .kante.blass { opacity: 0.12; }

        .stapel-box {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; padding: 8px;
          background: var(--color-nav, #f5f5f5);
          display: flex; flex-direction: column; gap: 3px;
        }
        .stapel-titel {
          font-size: 0.75em; text-transform: uppercase; letter-spacing: 0.04em;
          opacity: 0.6; font-weight: 700; margin-bottom: 3px;
        }
        .rahmen {
          font-family: ui-monospace, monospace; font-size: 0.8em;
          padding: 4px 7px; border-radius: 5px;
          background: var(--color-background, white);
          border: 1px solid var(--color-spacer, #a4a4a4);
        }
        .rahmen.oben {
          border-color: #b45309; font-weight: 700;
          background: color-mix(in srgb, #b45309 14%, var(--color-background, white));
        }
        .rahmen.leer {
          opacity: 0.5; font-style: italic; font-family: system-ui, sans-serif;
          border-style: dashed; text-align: center;
        }

        .erklaerung {
          font-size: 0.88em; padding: 8px 10px; border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          border-left: 4px solid var(--color-brand, #007864);
          margin-bottom: 8px;
        }
        .erklaerung code, .mehrfach-hinweis code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 3px; border-radius: 3px;
        }
        .mehrfach-hinweis { font-size: 0.87em; border-radius: 8px; }
        .mehrfach-hinweis.sichtbar {
          padding: 9px 11px;
          background: color-mix(in srgb, #b45309 15%, transparent);
        }
      </style>

      <div class="container">
        <div class="steuerung">
          <label class="feld">
            <span>Verfahren</span>
            <select class="wahl-verfahren">
              <option value="fib">fib(n) – Fibonacci</option>
              <option value="fakultaet">fakultaet(n)</option>
              <option value="summe">summe(n)</option>
              <option value="hanoi">hanoi(n) – Türme von Hanoi</option>
            </select>
          </label>
          <label class="feld">
            <span>n =</span>
            <input type="number" class="wahl-n" min="${g.min}" max="${g.max}" value="${this.argument}" />
          </label>
          <button class="btn btn-weiter">Nächster Schritt</button>
          <button class="btn btn-abspielen">Abspielen</button>
          <button class="btn sekundaer btn-zurueck">Zurück</button>
          <button class="btn sekundaer btn-alles">Ganz ausführen</button>
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
          <span class="fortschritt"></span>
        </div>

        <div class="zahlen"></div>

        <div class="haupt">
          <div class="buehne"></div>
          <div class="stapel-box">
            <div class="stapel-titel">Kellerstapel</div>
            <div class="stapel"></div>
          </div>
        </div>

        <div class="erklaerung"></div>
        <div class="mehrfach-hinweis"></div>
      </div>
    `;

    const verfahrenWahl = this.shadowRoot.querySelector(".wahl-verfahren");
    verfahrenWahl.value = this.verfahren;
    verfahrenWahl.addEventListener("change", (e) => {
      this.verfahren = e.target.value;
      const neu = this.grenzen();
      this.argument = neu.start;
      const feld = this.shadowRoot.querySelector(".wahl-n");
      feld.min = neu.min;
      feld.max = neu.max;
      feld.value = neu.start;
      this.zuruecksetzen();
      this.baueBaum();
      this.aktualisiere();
    });
    this.shadowRoot.querySelector(".wahl-n").addEventListener("change", (e) => {
      this.argument = parseInt(e.target.value, 10) || 0;
      this.zuruecksetzen();
      this.baueBaum();
      e.target.value = this.argument;
      this.aktualisiere();
    });

    this.shadowRoot.querySelector(".btn-weiter").addEventListener("click", () => this.weiter());
    this.shadowRoot.querySelector(".btn-zurueck").addEventListener("click", () => this.zurueck());
    this.shadowRoot.querySelector(".btn-alles").addEventListener("click", () => this.alles());
    this.shadowRoot.querySelector(".btn-abspielen").addEventListener("click", () => this.abspielen());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());

    this.aktualisiere();
  }
}

customElements.define("oop-aufrufbaum", OopAufrufbaum);
