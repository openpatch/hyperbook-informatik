// Testfälle auswählen statt raten: Die Lernenden stellen einen Testsatz
// zusammen und sehen erst danach, ob er den eingebauten Fehler überhaupt
// aufdecken kann und welche Äquivalenzklassen sie übersehen haben.
class OopTestfaelle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.gewaehlt = new Set();
    this.ausgefuehrt = false;
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
    this.spezifikation = this.getAttribute("spezifikation") || "";
    this.aufgabenText =
      this.getAttribute("aufgabe") ||
      "Wähle die Testfälle aus, mit denen du die Methode prüfen würdest.";
    this.faelle = this.leseFaelle();
    this.klassen = [];
    this.faelle.forEach((f) => {
      if (f.klasse && !this.klassen.includes(f.klasse)) this.klassen.push(f.klasse);
    });
    await this.ladeZustand();
    this.render();
  }

  // "eingabe | erwartet | tatsächlich | klasse | grenzwert"
  leseFaelle() {
    const roh =
      this.getAttribute("faelle") ||
      "5 | true | true | positiv | nein; 0 | false | true | null | ja; -3 | false | true | negativ | nein";
    return roh
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s, nr) => {
        const t = s.split("|").map((x) => x.trim());
        return {
          nr,
          eingabe: t[0] || "",
          erwartet: t[1] || "",
          tatsaechlich: t[2] !== undefined && t[2] !== "" ? t[2] : t[1] || "",
          klasse: t[3] || "",
          grenzwert: (t[4] || "nein").toLowerCase() === "ja",
        };
      });
  }

  deckt(f) {
    return f.erwartet !== f.tatsaechlich;
  }

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (daten) this.gewaehlt = new Set(JSON.parse(daten.payload).gewaehlt || []);
    } catch (fehler) {
      console.error("Zustand von oop-testfaelle konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({
        id,
        payload: JSON.stringify({ gewaehlt: Array.from(this.gewaehlt) }),
      });
    } catch (fehler) {
      console.error("Zustand von oop-testfaelle konnte nicht gespeichert werden:", fehler);
    }
  }

  // Beim Ankreuzen wird die Liste absichtlich nicht neu aufgebaut, damit die
  // Checkbox den Tastaturfokus behält.
  umschalten(nr) {
    if (this.gewaehlt.has(nr)) this.gewaehlt.delete(nr);
    else this.gewaehlt.add(nr);
    this.speichereZustand();

    if (this.ausgefuehrt) {
      this.ausgefuehrt = false;
      this.aktualisiere();
      return;
    }
    const zeile = this.shadowRoot.querySelector(`.fall input[data-nr="${nr}"]`);
    if (zeile) zeile.closest(".fall").classList.toggle("gewaehlt", this.gewaehlt.has(nr));
    this.zaehlerAktualisieren();
    this.shadowRoot.querySelector(".rueckmeldung-box").innerHTML = "";
  }

  zaehlerAktualisieren() {
    this.shadowRoot.querySelector(".auswahl-zaehler").textContent =
      `${this.gewaehlt.size} von ${this.faelle.length} Testfällen ausgewählt`;
  }

  ausfuehren() {
    this.ausgefuehrt = true;
    this.aktualisiere();
  }

  zuruecksetzen() {
    this.gewaehlt.clear();
    this.ausgefuehrt = false;
    this.speichereZustand();
    this.aktualisiere();
  }

  // --- Auswertung --------------------------------------------------------

  bewertung() {
    const gewaehlteFaelle = this.faelle.filter((f) => this.gewaehlt.has(f.nr));
    const aufdeckend = gewaehlteFaelle.filter((f) => this.deckt(f));
    const alleAufdeckenden = this.faelle.filter((f) => this.deckt(f));

    const abgedeckteKlassen = [];
    gewaehlteFaelle.forEach((f) => {
      if (f.klasse && !abgedeckteKlassen.includes(f.klasse)) abgedeckteKlassen.push(f.klasse);
    });
    const fehlendeKlassen = this.klassen.filter((k) => !abgedeckteKlassen.includes(k));
    const grenzwerte = this.faelle.filter((f) => f.grenzwert);
    const gewaehlteGrenzwerte = grenzwerte.filter((f) => this.gewaehlt.has(f.nr));

    return {
      gewaehlteFaelle,
      aufdeckend,
      alleAufdeckenden,
      abgedeckteKlassen,
      fehlendeKlassen,
      grenzwerte,
      gewaehlteGrenzwerte,
    };
  }

  rueckmeldungHTML() {
    if (!this.ausgefuehrt) return "";
    const b = this.bewertung();

    if (b.gewaehlteFaelle.length === 0) {
      return `<div class="rueckmeldung fehler">Du hast keinen einzigen Testfall ausgewählt. Ohne Tests bleibt jeder Fehler unentdeckt.</div>`;
    }

    const teile = [];
    if (b.aufdeckend.length === 0) {
      teile.push(
        `<strong>Alle deine Tests laufen durch – trotzdem ist die Methode fehlerhaft.</strong> Ein Testsatz, der nichts findet, beweist nicht, dass ein Programm richtig ist. Er beweist nur, dass er an der falschen Stelle gesucht hat.`,
      );
    } else {
      teile.push(
        `<strong>${b.aufdeckend.length} von ${b.gewaehlteFaelle.length} Tests schlagen fehl</strong> – dein Testsatz deckt den Fehler auf.`,
      );
    }

    if (b.fehlendeKlassen.length > 0) {
      teile.push(
        `Nicht geprüft hast du: ${b.fehlendeKlassen.map((k) => `<em>${k}</em>`).join(", ")}. Zu jeder Äquivalenzklasse gehört mindestens ein Test.`,
      );
    } else if (this.klassen.length > 0) {
      teile.push(`Du hast jede Äquivalenzklasse mindestens einmal geprüft.`);
    }

    if (b.grenzwerte.length > 0 && b.gewaehlteGrenzwerte.length === 0) {
      teile.push(
        `Keiner deiner Tests liegt auf einem <em>Grenzwert</em>. Genau dort stecken die meisten Fehler: an der Stelle, wo <code>&lt;</code> und <code>&lt;=</code> verwechselt werden.`,
      );
    }

    if (
      b.aufdeckend.length > 0 &&
      b.fehlendeKlassen.length === 0 &&
      (b.grenzwerte.length === 0 || b.gewaehlteGrenzwerte.length > 0)
    ) {
      return `<div class="rueckmeldung ok">${teile.join(" ")}</div>`;
    }
    return `<div class="rueckmeldung ${b.aufdeckend.length > 0 ? "teils" : "fehler"}">${teile.join(" ")}</div>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".faelle").innerHTML = this.faelle
      .map((f) => {
        const gewaehlt = this.gewaehlt.has(f.nr);
        const zeigen = this.ausgefuehrt && gewaehlt;
        const bestanden = f.erwartet === f.tatsaechlich;
        return `
          <label class="fall ${gewaehlt ? "gewaehlt" : ""} ${
            zeigen ? (bestanden ? "bestanden" : "gescheitert") : ""
          }">
            <input type="checkbox" data-nr="${f.nr}" ${gewaehlt ? "checked" : ""} />
            <code class="eingabe">${f.eingabe}</code>
            <span class="erwartet">erwartet: <code>${f.erwartet}</code></span>
            ${
              zeigen
                ? `<span class="ergebnis">geliefert: <code>${f.tatsaechlich}</code></span>
                   <span class="siegel">${bestanden ? "bestanden" : "FEHLGESCHLAGEN"}</span>`
                : ""
            }
            ${
              this.ausgefuehrt && f.klasse
                ? `<span class="klasse">${f.klasse}${f.grenzwert ? " · Grenzwert" : ""}</span>`
                : ""
            }
          </label>`;
      })
      .join("");

    this.shadowRoot.querySelector(".rueckmeldung-box").innerHTML = this.rueckmeldungHTML();

    this.zaehlerAktualisieren();

    this.shadowRoot.querySelectorAll(".fall input").forEach((box) => {
      box.onchange = () => this.umschalten(parseInt(box.dataset.nr, 10));
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
        .spezifikation {
          font-size: 0.88em; padding: 9px 11px; border-radius: 8px; margin-bottom: 12px;
          border: 1px dashed var(--color-spacer, #a4a4a4);
        }
        .spezifikation .titel {
          font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.04em;
          opacity: 0.6; font-weight: 700; display: block; margin-bottom: 3px;
        }
        pre {
          margin: 0 0 12px; padding: 10px; border-radius: 8px; overflow: auto;
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace; font-size: 0.8em; line-height: 1.5;
        }
        .faelle { display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px; }
        .fall {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          padding: 7px 10px; border-radius: 7px; cursor: pointer; font-size: 0.86em;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
        }
        .fall:hover { border-color: var(--color-brand, #007864); }
        .fall.gewaehlt { background: var(--color-nav, #f5f5f5); }
        .fall.bestanden {
          border-color: var(--color-sync-ok, #15803d);
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 12%, transparent);
        }
        .fall.gescheitert {
          border-color: var(--color-sync-error, #b91c1c);
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 12%, transparent);
        }
        .fall code {
          font-family: ui-monospace, monospace;
          background: var(--color-nav, #f5f5f5); padding: 1px 5px; border-radius: 4px;
        }
        .fall .eingabe { font-weight: 700; }
        .fall .erwartet, .fall .ergebnis { opacity: 0.85; }
        .fall .siegel {
          margin-left: auto; font-size: 0.78em; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.03em;
        }
        .fall.bestanden .siegel { color: var(--color-sync-ok, #15803d); }
        .fall.gescheitert .siegel { color: var(--color-sync-error, #b91c1c); }
        .fall .klasse {
          font-size: 0.78em; padding: 1px 7px; border-radius: 10px;
          background: var(--color-spacer, #a4a4a4); color: #fff; font-weight: 600;
        }

        .knopfleiste {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px;
        }
        .auswahl-zaehler { font-size: 0.82em; opacity: 0.7; }
        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }

        .rueckmeldung { font-size: 0.89em; padding: 10px 12px; border-radius: 8px; line-height: 1.55; }
        .rueckmeldung.ok {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent);
        }
        .rueckmeldung.teils {
          background: color-mix(in srgb, #b45309 16%, transparent);
        }
        .rueckmeldung.fehler {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent);
        }
        .rueckmeldung code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 3px; border-radius: 3px;
        }
        .rueckmeldung em { font-style: normal; font-weight: 700; }
      </style>

      <div class="container">
        <div class="aufgabe">${this.aufgabenText}</div>
        ${
          this.spezifikation
            ? `<div class="spezifikation"><span class="titel">Spezifikation</span>${this.spezifikation}</div>`
            : ""
        }
        ${this.quelltext ? `<pre>${this.quelltext.replace(/</g, "&lt;")}</pre>` : ""}
        <div class="faelle"></div>
        <div class="knopfleiste">
          <button class="btn btn-ausfuehren">Tests ausführen</button>
          <button class="btn sekundaer btn-reset">Auswahl löschen</button>
          <span class="auswahl-zaehler"></span>
        </div>
        <div class="rueckmeldung-box"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".btn-ausfuehren").addEventListener("click", () => this.ausfuehren());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());
    this.aktualisiere();
  }
}

customElements.define("oop-testfaelle", OopTestfaelle);
