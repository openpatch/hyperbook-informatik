// Ablaufverfolgung von Hand: Die Lernenden füllen die Wertetabelle zu einem
// Programmstück aus und bekommen zellengenaue Rückmeldung.
class OopWertetabelle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.eingaben = [];
    this.geprueft = false;
  }

  // Steht das Skript im <head>, läuft connectedCallback schon beim Parsen des
  // Start-Tags – die Kindknoten mit dem Quelltext gibt es dann noch nicht.
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

  async connectedCallback() {
    await this.warteAufInhalt();
    this.quelltext = (this.textContent || "").trim();
    this.spalten = (this.getAttribute("spalten") || "i | summe | Ausgabe")
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    this.loesung = (this.getAttribute("loesung") || "")
      .split(";")
      .map((z) => z.trim())
      .filter((z) => z.length > 0)
      .map((z) => z.split("|").map((c) => c.trim()));

    this.frei = (this.getAttribute("zeilen") || "fest").toLowerCase() === "frei";
    this.aufgabenText =
      this.getAttribute("aufgabe") ||
      "Verfolge den Ablauf Schritt für Schritt und trage die Werte ein.";

    const zeilen = this.frei ? Math.max(1, this.loesung.length - 2) : this.loesung.length;
    this.eingaben = Array.from({ length: Math.max(1, zeilen) }, () =>
      this.spalten.map(() => ""),
    );

    await this.ladeZustand();
    this.render();
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (daten) {
        const z = JSON.parse(daten.payload);
        if (Array.isArray(z.eingaben) && z.eingaben.length > 0) this.eingaben = z.eingaben;
      }
    } catch (fehler) {
      console.error("Zustand von oop-wertetabelle konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({ id, payload: JSON.stringify({ eingaben: this.eingaben }) });
    } catch (fehler) {
      console.error("Zustand von oop-wertetabelle konnte nicht gespeichert werden:", fehler);
    }
  }

  // Vergleich toleriert Leerzeichen, Komma statt Punkt und Groß-/Kleinschreibung.
  gleich(a, b) {
    const norm = (s) =>
      (s || "").toString().trim().toLowerCase().replace(/\s+/g, " ").replace(",", ".");
    return norm(a) === norm(b);
  }

  zustandZelle(zeile, spalte) {
    if (!this.geprueft) return "";
    const soll = this.loesung[zeile] ? this.loesung[zeile][spalte] : undefined;
    if (soll === undefined) return "zuviel";
    return this.gleich(this.eingaben[zeile][spalte], soll) ? "richtig" : "falsch";
  }

  pruefe() {
    this.geprueft = true;
    this.speichereZustand();
    this.aktualisiere();
  }

  zeileHinzu() {
    this.eingaben.push(this.spalten.map(() => ""));
    this.geprueft = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  zeileWeg() {
    if (this.eingaben.length > 1) this.eingaben.pop();
    this.geprueft = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  leeren() {
    this.eingaben = this.eingaben.map(() => this.spalten.map(() => ""));
    this.geprueft = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  loesungZeigen() {
    this.eingaben = this.loesung.map((z) => this.spalten.map((_, s) => z[s] || ""));
    this.geprueft = true;
    this.aktualisiere();
  }

  bilanz() {
    if (!this.geprueft) return null;
    let richtig = 0;
    let gesamt = 0;
    this.loesung.forEach((zeile, z) => {
      zeile.forEach((soll, s) => {
        if (s >= this.spalten.length) return;
        gesamt++;
        if (this.eingaben[z] && this.gleich(this.eingaben[z][s], soll)) richtig++;
      });
    });
    const zeilenFehlen = this.loesung.length - this.eingaben.length;
    return { richtig, gesamt, zeilenFehlen };
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".tabelle").innerHTML = `
      <table>
        <thead>
          <tr><th class="nr">#</th>${this.spalten.map((s) => `<th>${s}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${this.eingaben
            .map(
              (zeile, z) => `
            <tr>
              <th class="nr">${z + 1}</th>
              ${zeile
                .map(
                  (wert, s) => `
                <td class="${this.zustandZelle(z, s)}">
                  <input type="text" value="${(wert || "").replace(/"/g, "&quot;")}"
                         data-zeile="${z}" data-spalte="${s}"
                         aria-label="${this.spalten[s]}, Zeile ${z + 1}" />
                </td>`,
                )
                .join("")}
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>`;

    const b = this.bilanz();
    const r = this.shadowRoot.querySelector(".rueckmeldung");
    if (b) {
      const alles = b.richtig === b.gesamt && b.zeilenFehlen <= 0;
      r.className = `rueckmeldung ${alles ? "ok" : "fehler"}`;
      r.innerHTML = alles
        ? "Alle Werte stimmen."
        : `${b.richtig} von ${b.gesamt} Zellen stimmen.${
            b.zeilenFehlen > 0
              ? ` Es fehlen noch ${b.zeilenFehlen} Zeile${b.zeilenFehlen === 1 ? "" : "n"} – der Durchlauf ist länger, als du gedacht hast.`
              : ""
          }`;
    } else {
      r.className = "rueckmeldung leer";
      r.innerHTML = "";
    }

    this.shadowRoot.querySelectorAll("tbody input").forEach((feld) => {
      feld.oninput = () => {
        this.eingaben[parseInt(feld.dataset.zeile, 10)][parseInt(feld.dataset.spalte, 10)] =
          feld.value;
        this.speichereZustand();
      };
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
        .oben { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
        @media (min-width: 680px) { .oben.mit-code { grid-template-columns: 1fr 1fr; } }
        pre {
          margin: 0; padding: 10px; border-radius: 8px; overflow: auto;
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace; font-size: 0.8em; line-height: 1.5;
        }
        table { border-collapse: collapse; width: 100%; }
        th, td {
          border: 1px solid var(--color-spacer, #a4a4a4); padding: 0;
        }
        thead th {
          background: var(--color-nav, #f5f5f5); padding: 6px 8px;
          font-size: 0.85em; font-family: ui-monospace, monospace;
        }
        th.nr {
          width: 2.4em; text-align: center; padding: 4px;
          background: var(--color-nav, #f5f5f5); font-size: 0.8em; opacity: 0.7;
        }
        td input {
          width: 100%; border: none; background: transparent; color: inherit;
          font: inherit; font-size: 0.88em; font-family: ui-monospace, monospace;
          padding: 6px 8px; text-align: center;
        }
        td input:focus { outline: 2px solid var(--color-brand, #007864); outline-offset: -2px; }
        td.richtig {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 20%, transparent);
        }
        td.falsch {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 18%, transparent);
        }
        td.zuviel {
          background: color-mix(in srgb, #b45309 16%, transparent);
        }
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
      </style>

      <div class="container">
        <div class="aufgabe">${this.aufgabenText}</div>
        <div class="oben ${this.quelltext ? "mit-code" : ""}">
          ${this.quelltext ? `<pre>${this.quelltext.replace(/</g, "&lt;")}</pre>` : ""}
          <div class="tabelle"></div>
        </div>
        <div class="knopfleiste">
          <button class="btn btn-pruefen">Prüfen</button>
          ${this.frei ? `<button class="btn sekundaer btn-plus">Zeile mehr</button>` : ""}
          ${this.frei ? `<button class="btn sekundaer btn-minus">Zeile weniger</button>` : ""}
          <button class="btn sekundaer btn-leeren">Leeren</button>
          ${
            this.getAttribute("loesung-zeigen") === "ja"
              ? `<button class="btn sekundaer btn-loesung">Lösung zeigen</button>`
              : ""
          }
        </div>
        <div class="rueckmeldung leer"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".btn-pruefen").addEventListener("click", () => this.pruefe());
    this.shadowRoot.querySelector(".btn-leeren").addEventListener("click", () => this.leeren());
    const plus = this.shadowRoot.querySelector(".btn-plus");
    if (plus) plus.addEventListener("click", () => this.zeileHinzu());
    const minus = this.shadowRoot.querySelector(".btn-minus");
    if (minus) minus.addEventListener("click", () => this.zeileWeg());
    const loesung = this.shadowRoot.querySelector(".btn-loesung");
    if (loesung) loesung.addEventListener("click", () => this.loesungZeigen());

    this.aktualisiere();
  }
}

customElements.define("oop-wertetabelle", OopWertetabelle);
