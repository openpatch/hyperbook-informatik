// Foto-Gitter: Ein kleiner, echter Ausschnitt aus dem Fotofilter-Foto als
// Graustufen-Gitter. Fahren mit der Maus (oder Tippen) zeigt
// bild[zeile][spalte] samt Zeile-und-Spalte-Kreuz, ein Klick hält den
// Bildpunkt fest. Filter-Regeln als Java-Code zum Ausprobieren – inclusive
// sichtbarer Begrenzung auf 0 bis 255. Ziel: Das int[][] begreifbar machen,
// bevor in der IDE geschachtelte Schleifen geschrieben werden.
class FotoGitter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.bild = [];
    this.filter = "original";
    this.indizes = true;
    this.markiert = null; // [zeile, spalte], per Klick festgehalten
  }

  // Steht das Skript im <head>, läuft connectedCallback schon beim Parsen des
  // Start-Tags – die Kindknoten mit den Zahlen gibt es dann noch nicht.
  async warteAufInhalt() {
    if ((this.textContent || "").trim().length > 0) return;
    if (document.readyState === "loading") {
      await new Promise((fertig) =>
        document.addEventListener("DOMContentLoaded", fertig, { once: true }),
      );
    } else {
      await new Promise((fertig) => requestAnimationFrame(fertig));
    }
  }

  parseInhalt(text) {
    const zeilen = text
      .trim()
      .split(/\n+/)
      .map((zeile) => zeile.trim().split(/\s+/).map(Number))
      .filter((zeile) => zeile.length > 0 && !zeile.some(Number.isNaN));
    if (zeilen.length === 0 || zeilen.some((z) => z.length !== zeilen[0].length)) {
      this.bild = [];
      return;
    }
    this.bild = zeilen.map((zeile) =>
      zeile.map((wert) => Math.max(0, Math.min(255, Math.round(wert)))),
    );
  }

  async connectedCallback() {
    await this.warteAufInhalt();
    this.parseInhalt(this.textContent);
    this.aufgabenText =
      this.getAttribute("aufgabe") ||
      "Fahre über das Gitter und lies bild[zeile][spalte] ab. Klicke auf einen Bildpunkt, um ihn festzuhalten.";
    this.zellGröße = Math.max(18, Math.min(56, parseInt(this.getAttribute("zelle") || "34", 10)));
    await this.ladeZustand();
    this.render();
  }

  // Der Speicher liegt je nach Hyperbook-Version an anderer Stelle: aktuell
  // unter hyperbook.store.db (Dexie), früher als globales store-Objekt.
  datenbank() {
    if (typeof hyperbook !== "undefined" && hyperbook.store && hyperbook.store.db) {
      return hyperbook.store.db;
    }
    if (typeof store !== "undefined") {
      return store.db || (store.custom ? store : null);
    }
    return null;
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    const db = this.datenbank();
    if (!id || !db) return;
    try {
      const daten = await db.custom.get(id);
      if (daten) {
        const z = JSON.parse(daten.payload);
        if (typeof z.filter === "string") this.filter = z.filter;
        if (typeof z.indizes === "boolean") this.indizes = z.indizes;
        if (Array.isArray(z.markiert) && z.markiert.length === 2) this.markiert = z.markiert;
      }
    } catch (fehler) {
      console.error("Zustand von foto-gitter konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    const db = this.datenbank();
    if (!id || !db) return;
    try {
      await db.custom.put({
        id,
        payload: JSON.stringify({
          filter: this.filter,
          indizes: this.indizes,
          markiert: this.markiert,
        }),
      });
    } catch (fehler) {
      console.error("Zustand von foto-gitter konnte nicht gespeichert werden:", fehler);
    }
  }

  // Die Filter-Regeln, jeweils als Java-Code, wie ihn die Schüler später
  // schreiben. heller und dunkler begrenzen afterwards – genau das, was das
  // Kreuz über den begrenzten Zellen sichtbar macht.
  regeln() {
    return {
      original: {
        name: "Original",
        code: "// kein Filter: die Werte aus dem Foto",
        anwenden: (w) => [w, false],
      },
      heller: {
        name: "+40",
        code: "wert = wert + 40;\nif (wert > 255) {\n    wert = 255;\n}",
        anwenden: (w) => {
          const roh = w + 40;
          return roh > 255 ? [255, true] : [roh, false];
        },
      },
      dunkler: {
        name: "−40",
        code: "wert = wert - 40;\nif (wert < 0) {\n    wert = 0;\n}",
        anwenden: (w) => {
          const roh = w - 40;
          return roh < 0 ? [0, true] : [roh, false];
        },
      },
      invertieren: {
        name: "Invertieren",
        code: "wert = 255 - wert;",
        anwenden: (w) => [255 - w, false],
      },
      schwelle: {
        name: "Schwarzweiß",
        code: "if (wert > 127) {\n    wert = 255;\n} else {\n    wert = 0;\n}",
        anwenden: (w) => [w > 127 ? 255 : 0, false],
      },
    };
  }

  abstand() {
    const regeln = this.regeln();
    const regel = regeln[this.filter] || regeln.original;
    const werte = this.bild.map((zeile) => zeile.map((w) => regel.anwenden(w)));
    return { regel, werte };
  }

  // Was der Kasten unter dem Gitter gerade zeigt.
  leseText(zeile, spalte) {
    if (this.bild.length === 0) return "";
    const { werte } = this.abstand();
    const alt = this.bild[zeile][spalte];
    const [neu, begrenzt] = werte[zeile][spalte];
    if (this.filter === "original" || (neu === alt && !begrenzt)) {
      return `bild[${zeile}][${spalte}] = ${alt}`;
    }
    if (begrenzt) {
      const grenze = this.filter === "dunkler" ? "0" : "255";
      return `bild[${zeile}][${spalte}] = ${alt} → ${neu} (auf ${grenze} begrenzt)`;
    }
    return `bild[${zeile}][${spalte}] = ${alt} → ${neu}`;
  }

  zeige(zeile, spalte) {
    const lese = this.shadowRoot.querySelector(".lesezeile");
    if (lese) lese.textContent = this.leseText(zeile, spalte);
    this.kreuzHervorheben([zeile, spalte]);
  }

  zeigeRuhe() {
    const lese = this.shadowRoot.querySelector(".lesezeile");
    if (lese) {
      if (this.markiert) {
        lese.textContent = this.leseText(this.markiert[0], this.markiert[1]);
      } else {
        lese.textContent = "Fahre über einen Bildpunkt …";
      }
    }
    this.kreuzHervorheben(null);
  }

  kreuzHervorheben(ziel) {
    this.shadowRoot.querySelectorAll(".zelle").forEach((zelle) => {
      const z = parseInt(zelle.dataset.z, 10);
      const s = parseInt(zelle.dataset.s, 10);
      const inZeile = ziel !== null && z === ziel[0];
      const inSpalte = ziel !== null && s === ziel[1];
      const getroffen = inZeile && inSpalte;
      zelle.classList.toggle("in-zeile", inZeile && !getroffen);
      zelle.classList.toggle("in-spalte", inSpalte && !getroffen);
      zelle.classList.toggle("getroffen", getroffen);
    });
    if (ziel === null && this.markiert) {
      const fest = this.shadowRoot.querySelector(
        `.zelle[data-z="${this.markiert[0]}"][data-s="${this.markiert[1]}"]`,
      );
      if (fest) fest.classList.add("fest");
    }
    this.shadowRoot.querySelectorAll(".zelle.fest").forEach((zelle) => {
      const z = parseInt(zelle.dataset.z, 10);
      const s = parseInt(zelle.dataset.s, 10);
      if (!this.markiert || this.markiert[0] !== z || this.markiert[1] !== s) {
        zelle.classList.remove("fest");
      }
    });
  }

  aktualisiere() {
    const gitter = this.shadowRoot.querySelector(".gitter");
    if (!gitter) return;
    const { regel, werte } = this.abstand();
    const zeilen = this.bild.length;
    const spalten = this.bild.length > 0 ? this.bild[0].length : 0;

    gitter.style.gridTemplateColumns = `auto repeat(${spalten}, ${this.zellGröße}px)`;

    const kopf = `<span class="ecke"></span>${Array.from({ length: spalten }, (_, s) =>
      `<span class="label spalte-label" data-s="${s}" data-info="Spalte ${s}: der zweite Index in bild[zeile][${s}]">${this.indizes ? s : ""}</span>`,
    ).join("")}`;

    const koerper = this.bild
      .map((zeileWerte, z) => {
        const zLabel = `<span class="label zeile-label" data-z="${z}" data-info="Zeile ${z}: bild[${z}] ist ein Feld mit ${spalten} Werten">${this.indizes ? z : ""}</span>`;
        const zellen = zeileWerte
          .map((_, s) => {
            const [neu] = werte[z][s];
            const begrenzt = werte[z][s][1];
            const klassen = ["zelle"];
            if (begrenzt && this.filter !== "original") klassen.push("begrenzt");
            if (
              this.markiert &&
              this.markiert[0] === z &&
              this.markiert[1] === s
            ) {
              klassen.push("fest");
            }
            return `<button class="${klassen.join(" ")}" data-z="${z}" data-s="${s}"
              style="background: rgb(${neu}, ${neu}, ${neu})"
              aria-label="bild[${z}][${s}], Wert ${neu}"
              title="bild[${z}][${s}] = ${neu}"></button>`;
          })
          .join("");
        return zLabel + zellen;
      })
      .join("");

    gitter.innerHTML = kopf + koerper;

    const regelKasten = this.shadowRoot.querySelector(".regel");
    if (regelKasten) regelKasten.textContent = regel.code;

    this.shadowRoot.querySelectorAll("button[data-filter]").forEach((knopf) => {
      knopf.setAttribute("aria-pressed", knopf.dataset.filter === this.filter ? "true" : "false");
    });

    const abmessung = this.shadowRoot.querySelector(".abmessung");
    if (abmessung) {
      abmessung.textContent = `bild.length = ${zeilen} · bild[0].length = ${spalten}`;
    }

    const checkbox = this.shadowRoot.querySelector(".indizes-umschalter");
    if (checkbox) checkbox.checked = this.indizes;

    this.ereignisse();
    this.zeigeRuhe();
  }

  ereignisse() {
    this.shadowRoot.querySelectorAll(".zelle").forEach((zelle) => {
      zelle.onmouseenter = () =>
        this.zeige(parseInt(zelle.dataset.z, 10), parseInt(zelle.dataset.s, 10));
      zelle.onfocus = () =>
        this.zeige(parseInt(zelle.dataset.z, 10), parseInt(zelle.dataset.s, 10));
      zelle.onclick = () => {
        const z = parseInt(zelle.dataset.z, 10);
        const s = parseInt(zelle.dataset.s, 10);
        if (
          this.markiert &&
          this.markiert[0] === z &&
          this.markiert[1] === s
        ) {
          this.markiert = null; // zweiter Klick löst die Markierung
        } else {
          this.markiert = [z, s];
        }
        this.speichereZustand();
        this.aktualisiere();
        this.zeige(z, s);
      };
      zelle.onmouseleave = () => this.zeigeRuhe();
      zelle.onblur = () => this.zeigeRuhe();
    });

    this.shadowRoot.querySelectorAll(".zeile-label").forEach((label) => {
      label.onmouseenter = () => {
        const z = parseInt(label.dataset.z, 10);
        const lese = this.shadowRoot.querySelector(".lesezeile");
        if (lese) {
          lese.textContent = `bild[${z}] ist ein Feld mit ${this.bild[z].length} Werten · bild[${z}].length = ${this.bild[z].length}`;
        }
      };
    });

    this.shadowRoot.querySelectorAll("button[data-filter]").forEach((knopf) => {
      knopf.onclick = () => {
        this.filter = knopf.dataset.filter;
        this.speichereZustand();
        this.aktualisiere();
      };
    });

    const checkbox = this.shadowRoot.querySelector(".indizes-umschalter");
    if (checkbox) {
      checkbox.onchange = () => {
        this.indizes = checkbox.checked;
        this.speichereZustand();
        this.aktualisiere();
      };
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; box-sizing: border-box;
        margin-bottom: var(--element-gap);
        }
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
          border-left: 4px solid var(--color-brand, #ba7720);
        }
        .gitter {
          display: grid; gap: 2px; margin: 6px 0 10px;
          width: max-content;
        }
        .label {
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78em; font-family: ui-monospace, monospace; opacity: 0.65;
          cursor: default; border-radius: 4px;
        }
        .zeile-label { padding-right: 6px; }
        .spalte-label { padding-bottom: 2px; }
        .zelle {
          width: 100%; aspect-ratio: 1; padding: 0; border: 1px solid transparent;
          border-radius: 3px; cursor: pointer; position: relative;
        }
        .zelle:focus { outline: 2px solid var(--color-brand, #ba7720); outline-offset: 1px; }
        .zelle.in-zeile { border-color: color-mix(in srgb, var(--color-brand, #ba7720) 55%, transparent); }
        .zelle.in-spalte { border-color: color-mix(in srgb, var(--color-brand, #ba7720) 55%, transparent); }
        .zelle.getroffen { outline: 2px solid var(--color-brand, #ba7720); outline-offset: 1px; }
        .zelle.fest { outline: 2px solid var(--color-brand, #ba7720); outline-offset: 1px; }
        .zelle.begrenzt::after {
          content: ""; position: absolute; right: 2px; bottom: 2px;
          width: 7px; height: 7px; border-radius: 50%;
          background: #b45309; outline: 1px solid white;
        }
        .lesezeile {
          font-family: ui-monospace, monospace; font-size: 0.95em;
          min-height: 1.6em; padding: 7px 10px; margin-bottom: 10px;
          border-radius: 8px; border: 1px dashed var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
        }
        .regel-zeile {
          display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
          margin: 10px 0 0;
        }
        .knopfleiste { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 10px; }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold;
          background: var(--color-nav, #f5f5f5); color: inherit;
          border: 1px solid var(--color-spacer, #a4a4a4);
        }
        .btn[aria-pressed="true"] {
          background: var(--color-brand, #ba7720); color: #fff; border-color: transparent;
        }
        .indizes-umschalten {
          display: flex; align-items: center; gap: 6px; font-size: 0.88em; opacity: 0.85;
        }
        .regel {
          margin: 0; padding: 10px 12px; border-radius: 8px; overflow: auto;
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace; font-size: 0.82em; line-height: 1.5;
          flex: 1 1 220px;
        }
        .abmessung {
          font-family: ui-monospace, monospace; font-size: 0.82em; opacity: 0.75;
          margin-top: 8px;
        }
        .legende { font-size: 0.85em; opacity: 0.85; margin-top: 6px; }
        .legende .punkt {
          display: inline-block; width: 8px; height: 8px; border-radius: 50%;
          background: #b45309; outline: 1px solid var(--color-text, black);
          margin-right: 4px; vertical-align: baseline;
        }
        .fehler { color: var(--color-sync-error, #b91c1c); font-weight: 600; }
      </style>

      <div class="container">
        <div class="aufgabe">${this.aufgabenText.replace(/</g, "&lt;")}</div>
        ${
          this.bild.length === 0
            ? '<p class="fehler">Das Gitter konnte nicht gelesen werden: Erwartet werden Zeilen aus Zahlen zwischen 0 und 255.</p>'
            : `
        <div class="lesezeile" aria-live="polite"></div>
        <div class="gitter" role="group" aria-label="Graustufen-Gitter mit ${this.bild.length} Zeilen und ${this.bild[0].length} Spalten"></div>
        <div class="knopfleiste">
          <button class="btn" data-filter="original">Original</button>
          <button class="btn" data-filter="heller">+40</button>
          <button class="btn" data-filter="dunkler">−40</button>
          <button class="btn" data-filter="invertieren">Invertieren</button>
          <button class="btn" data-filter="schwelle">Schwarzweiß</button>
          <label class="indizes-umschalten">
            <input type="checkbox" class="indizes-umschalter" /> Indizes anzeigen
          </label>
        </div>
        <div class="regel-zeile">
          <pre class="regel"></pre>
        </div>
        <div class="abmessung"></div>
        <div class="legende">
          <span class="punkt"></span> Punkt bedeutet: der neue Wert wäre unter bzw. über
          die Grenze geraten und wurde auf 0 bzw. 255 begrenzt.
        </div>`
        }
      </div>
    `;
    this.aktualisiere();
  }
}

customElements.define("foto-gitter", FotoGitter);
