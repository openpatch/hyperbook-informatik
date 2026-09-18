// Binärer Suchbaum zum Anfassen: einfügen, suchen, löschen. Im AVL-Modus
// werden Balancefaktoren angezeigt und Rotationen protokolliert.
class OopSuchbaum extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.wurzel = null;
    this.pfad = [];
    this.markiert = null;
    this.protokoll = [];
    this.timer = null;
  }

  connectedCallback() {
    this.modus = (this.getAttribute("modus") || "bst").toLowerCase();
    this.startWerte = (this.getAttribute("werte") || "50,30,70,20,40,60,80")
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    this.baueAuf();
    this.render();
  }

  disconnectedCallback() {
    if (this.timer) clearTimeout(this.timer);
  }

  baueAuf() {
    this.wurzel = null;
    this.protokoll = [];
    this.pfad = [];
    this.markiert = null;
    this.startWerte.forEach((w) => {
      this.wurzel = this.fuegeEin(this.wurzel, w, []);
    });
    this.protokoll = [];
  }

  // --- Baumoperationen ---------------------------------------------------

  knoten(wert) {
    return { wert, links: null, rechts: null };
  }

  hoehe(k) {
    if (!k) return 0;
    return 1 + Math.max(this.hoehe(k.links), this.hoehe(k.rechts));
  }

  anzahl(k) {
    if (!k) return 0;
    return 1 + this.anzahl(k.links) + this.anzahl(k.rechts);
  }

  balance(k) {
    if (!k) return 0;
    return this.hoehe(k.links) - this.hoehe(k.rechts);
  }

  rechtsRotation(k, log) {
    const neu = k.links;
    k.links = neu.rechts;
    neu.rechts = k;
    log.push(`Rechtsrotation um ${k.wert}: ${neu.wert} wird neue Wurzel dieses Teilbaums.`);
    return neu;
  }

  linksRotation(k, log) {
    const neu = k.rechts;
    k.rechts = neu.links;
    neu.links = k;
    log.push(`Linksrotation um ${k.wert}: ${neu.wert} wird neue Wurzel dieses Teilbaums.`);
    return neu;
  }

  balanciere(k, log) {
    if (this.modus !== "avl" || !k) return k;
    const b = this.balance(k);
    if (b > 1) {
      if (this.balance(k.links) < 0) {
        log.push(`Der linke Teilbaum von ${k.wert} hängt nach rechts – erst links rotieren.`);
        k.links = this.linksRotation(k.links, log);
      }
      return this.rechtsRotation(k, log);
    }
    if (b < -1) {
      if (this.balance(k.rechts) > 0) {
        log.push(`Der rechte Teilbaum von ${k.wert} hängt nach links – erst rechts rotieren.`);
        k.rechts = this.rechtsRotation(k.rechts, log);
      }
      return this.linksRotation(k, log);
    }
    return k;
  }

  fuegeEin(k, wert, log) {
    if (!k) {
      log.push(`${wert} wird als neues Blatt eingehängt.`);
      return this.knoten(wert);
    }
    if (wert < k.wert) {
      log.push(`${wert} < ${k.wert} – nach links.`);
      k.links = this.fuegeEin(k.links, wert, log);
    } else if (wert > k.wert) {
      log.push(`${wert} > ${k.wert} – nach rechts.`);
      k.rechts = this.fuegeEin(k.rechts, wert, log);
    } else {
      log.push(`${wert} ist bereits enthalten – der Baum bleibt unverändert.`);
      return k;
    }
    return this.balanciere(k, log);
  }

  kleinster(k) {
    while (k.links) k = k.links;
    return k;
  }

  loesche(k, wert, log) {
    if (!k) {
      log.push(`${wert} ist nicht im Baum enthalten.`);
      return null;
    }
    if (wert < k.wert) {
      k.links = this.loesche(k.links, wert, log);
    } else if (wert > k.wert) {
      k.rechts = this.loesche(k.rechts, wert, log);
    } else {
      if (!k.links && !k.rechts) {
        log.push(`${wert} ist ein Blatt und wird einfach entfernt.`);
        return null;
      }
      if (!k.links || !k.rechts) {
        const kind = k.links || k.rechts;
        log.push(`${wert} hat genau ein Kind – ${kind.wert} rückt an seine Stelle.`);
        return kind;
      }
      const nachfolger = this.kleinster(k.rechts);
      log.push(
        `${wert} hat zwei Kinder – der kleinste Wert des rechten Teilbaums (${nachfolger.wert}) rückt nach.`,
      );
      k.wert = nachfolger.wert;
      k.rechts = this.loesche(k.rechts, nachfolger.wert, []);
    }
    return this.balanciere(k, log);
  }

  suchPfad(wert) {
    const pfad = [];
    let k = this.wurzel;
    while (k) {
      pfad.push({ wert: k.wert, treffer: k.wert === wert });
      if (wert === k.wert) return { pfad, gefunden: true };
      k = wert < k.wert ? k.links : k.rechts;
    }
    return { pfad, gefunden: false };
  }

  // --- Aktionen ----------------------------------------------------------

  eingabe() {
    const feld = this.shadowRoot.querySelector(".eingabe");
    const wert = parseInt(feld.value, 10);
    if (isNaN(wert)) {
      this.protokoll = [{ art: "fehler", text: "Bitte zuerst eine Zahl eingeben." }];
      this.aktualisiere();
      return null;
    }
    feld.value = "";
    feld.focus();
    return wert;
  }

  aktionEinfuegen() {
    const wert = this.eingabe();
    if (wert === null) return;
    const log = [];
    this.wurzel = this.fuegeEin(this.wurzel, wert, log);
    this.protokoll = log.map((t) => ({ art: "info", text: t }));
    this.markiert = wert;
    this.pfad = [];
    this.aktualisiere();
  }

  aktionLoeschen() {
    const wert = this.eingabe();
    if (wert === null) return;
    const log = [];
    this.wurzel = this.loesche(this.wurzel, wert, log);
    this.protokoll = log.map((t) => ({ art: "info", text: t }));
    this.markiert = null;
    this.pfad = [];
    this.aktualisiere();
  }

  aktionSuchen() {
    const wert = this.eingabe();
    if (wert === null) return;
    const { pfad, gefunden } = this.suchPfad(wert);
    this.pfad = [];
    this.markiert = null;
    this.protokoll = [];

    let i = 0;
    const schritt = () => {
      if (i < pfad.length) {
        this.pfad.push(pfad[i].wert);
        const k = pfad[i];
        this.protokoll.push({
          art: "info",
          text: k.treffer
            ? `${wert} = ${k.wert} – gefunden nach ${i + 1} Vergleich${i === 0 ? "" : "en"}.`
            : `${wert} ${wert < k.wert ? "<" : ">"} ${k.wert} – weiter nach ${wert < k.wert ? "links" : "rechts"}.`,
        });
        i++;
        this.aktualisiere();
        this.timer = setTimeout(schritt, 700);
      } else {
        if (gefunden) this.markiert = wert;
        else
          this.protokoll.push({
            art: "fehler",
            text: `Hier müsste ${wert} stehen – der Teilbaum ist leer. ${wert} ist nicht enthalten.`,
          });
        this.aktualisiere();
      }
    };
    schritt();
  }

  aktionZufall() {
    const wert = Math.floor(Math.random() * 99) + 1;
    const log = [];
    this.wurzel = this.fuegeEin(this.wurzel, wert, log);
    this.protokoll = log.map((t) => ({ art: "info", text: t }));
    this.markiert = wert;
    this.pfad = [];
    this.aktualisiere();
  }

  aktionLeeren() {
    this.wurzel = null;
    this.protokoll = [{ art: "info", text: "Der Baum ist jetzt leer." }];
    this.pfad = [];
    this.markiert = null;
    this.aktualisiere();
  }

  aktionZuruecksetzen() {
    this.baueAuf();
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  layout() {
    const knoten = [];
    const kanten = [];
    let spalte = 0;

    const gehe = (k, tiefe, eltern) => {
      if (!k) return null;
      const links = gehe(k.links, tiefe + 1, k);
      const x = spalte++;
      const eintrag = { knoten: k, spalte: x, tiefe };
      knoten.push(eintrag);
      const rechts = gehe(k.rechts, tiefe + 1, k);
      if (links) kanten.push([eintrag, links]);
      if (rechts) kanten.push([eintrag, rechts]);
      return eintrag;
    };
    gehe(this.wurzel, 0, null);

    const spaltenBreite = 54;
    const ebenenHoehe = 62;
    const radius = 20;
    const randX = 30;
    const randY = 30;

    knoten.forEach((e) => {
      e.x = randX + e.spalte * spaltenBreite;
      e.y = randY + e.tiefe * ebenenHoehe;
    });

    return {
      knoten,
      kanten,
      radius,
      breite: Math.max(240, randX * 2 + Math.max(0, spalte - 1) * spaltenBreite),
      hoehe: randY * 2 + Math.max(0, this.hoehe(this.wurzel) - 1) * ebenenHoehe,
    };
  }

  svg() {
    if (!this.wurzel) {
      return `<div class="leer">Der Baum ist leer. Füge einen Wert ein.</div>`;
    }
    const l = this.layout();

    const kanten = l.kanten
      .map(
        ([von, nach]) =>
          `<line x1="${von.x}" y1="${von.y + l.radius}" x2="${nach.x}" y2="${nach.y - l.radius}"
                 class="kante ${
                   this.pfad.includes(von.knoten.wert) && this.pfad.includes(nach.knoten.wert)
                     ? "aktiv"
                     : ""
                 }" />`,
      )
      .join("");

    const kreise = l.knoten
      .map((e) => {
        const klassen = ["knoten"];
        if (this.pfad.includes(e.knoten.wert)) klassen.push("pfad");
        if (this.markiert === e.knoten.wert) klassen.push("treffer");
        const b = this.balance(e.knoten);
        const unwucht = this.modus === "avl" && Math.abs(b) > 1;
        if (unwucht) klassen.push("unwucht");
        return `
          <g class="${klassen.join(" ")}">
            <circle cx="${e.x}" cy="${e.y}" r="${l.radius}" />
            <text x="${e.x}" y="${e.y + 5}" class="wert">${e.knoten.wert}</text>
            ${
              this.modus === "avl"
                ? `<text x="${e.x + l.radius + 3}" y="${e.y - l.radius + 6}" class="bf">${
                    b > 0 ? "+" : ""
                  }${b}</text>`
                : ""
            }
          </g>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${l.breite} ${l.hoehe}" class="baum" role="img"
           aria-label="Binärer Suchbaum">
        ${kanten}
        ${kreise}
      </svg>`;
  }

  statistik() {
    const n = this.anzahl(this.wurzel);
    const h = this.hoehe(this.wurzel);
    const minimal = n === 0 ? 0 : Math.floor(Math.log2(n)) + 1;
    const entartet = n > 2 && h === n;
    return `
      <span><strong>${n}</strong> Knoten</span>
      <span>Höhe <strong>${h}</strong></span>
      <span>minimal möglich <strong>${minimal}</strong></span>
      ${entartet ? `<span class="warnung">zur Liste entartet</span>` : ""}`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".buehne").innerHTML = this.svg();
    this.shadowRoot.querySelector(".statistik").innerHTML = this.statistik();
    this.shadowRoot.querySelector(".protokoll").innerHTML = this.protokoll.length
      ? this.protokoll.map((e) => `<div class="zeile ${e.art}">${e.text}</div>`).join("")
      : `<div class="zeile leer">Gib eine Zahl ein und wähle eine Operation.</div>`;
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
        .steuerung {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
          margin-bottom: 12px;
        }
        .eingabe {
          font: inherit; width: 5.5em; padding: 6px 8px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.92em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }

        .statistik {
          display: flex; flex-wrap: wrap; gap: 14px;
          font-size: 0.85em; margin-bottom: 8px;
        }
        .statistik strong {
          color: var(--color-brand, #007864);
          font-variant-numeric: tabular-nums;
        }
        .statistik .warnung {
          color: var(--color-sync-error, #b91c1c); font-weight: 700;
        }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 8px; margin-bottom: 12px; overflow-x: auto;
          min-height: 120px;
        }
        .baum { width: 100%; min-width: 260px; height: auto; display: block; }
        .leer {
          display: flex; align-items: center; justify-content: center;
          height: 104px; opacity: 0.6; font-size: 0.9em;
        }

        .knoten circle {
          fill: var(--color-background, white);
          stroke: var(--color-text, black);
          stroke-width: 1.8;
          transition: fill 0.2s ease;
        }
        .knoten.pfad circle {
          fill: color-mix(in srgb, #b45309 30%, var(--color-background, white));
          stroke: #b45309;
        }
        .knoten.treffer circle {
          fill: color-mix(in srgb, var(--color-sync-ok, #15803d) 34%, var(--color-background, white));
          stroke: var(--color-sync-ok, #15803d);
          stroke-width: 3;
        }
        .knoten.unwucht circle {
          stroke: var(--color-sync-error, #b91c1c); stroke-width: 3;
        }
        text { fill: var(--color-text, black); font-family: system-ui, sans-serif; }
        .wert { text-anchor: middle; font-size: 13px; font-weight: 700; }
        .bf { font-size: 10px; opacity: 0.75; font-weight: 700; }
        .kante { stroke: var(--color-text, black); stroke-width: 1.6; opacity: 0.5; }
        .kante.aktiv { stroke: #b45309; stroke-width: 2.6; opacity: 1; }

        .protokoll { display: flex; flex-direction: column; gap: 3px; }
        .zeile { font-size: 0.87em; }
        .zeile.fehler { color: var(--color-sync-error, #b91c1c); font-weight: 600; }
        .zeile.leer { opacity: 0.6; }
      </style>

      <div class="container">
        <div class="steuerung">
          <input type="number" class="eingabe" placeholder="Zahl" />
          <button class="btn btn-einfuegen">Einfügen</button>
          <button class="btn btn-suchen">Suchen</button>
          <button class="btn btn-loeschen">Löschen</button>
          <button class="btn sekundaer btn-zufall">Zufallszahl</button>
          <button class="btn sekundaer btn-leeren">Leeren</button>
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
        </div>
        <div class="statistik"></div>
        <div class="buehne"></div>
        <div class="protokoll"></div>
      </div>
    `;

    const feld = this.shadowRoot.querySelector(".eingabe");
    feld.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.aktionEinfuegen();
    });
    this.shadowRoot.querySelector(".btn-einfuegen").addEventListener("click", () => this.aktionEinfuegen());
    this.shadowRoot.querySelector(".btn-suchen").addEventListener("click", () => this.aktionSuchen());
    this.shadowRoot.querySelector(".btn-loeschen").addEventListener("click", () => this.aktionLoeschen());
    this.shadowRoot.querySelector(".btn-zufall").addEventListener("click", () => this.aktionZufall());
    this.shadowRoot.querySelector(".btn-leeren").addEventListener("click", () => this.aktionLeeren());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.aktionZuruecksetzen());

    this.aktualisiere();
  }
}

customElements.define("oop-suchbaum", OopSuchbaum);
