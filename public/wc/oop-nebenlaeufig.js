// Zwei Fäden, eine gemeinsame Variable. Die Lernenden verschränken die Schritte
// selbst und erzeugen die Wettlaufsituation, statt sie erklärt zu bekommen.
class OopNebenlaeufig extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.protokoll = [];
  }

  connectedCallback() {
    this.variablenName = this.getAttribute("variable") || "zaehler";
    this.startWert = parseInt(this.getAttribute("start") || "0", 10);
    this.faeden = [
      {
        name: this.getAttribute("name-a") || "Faden A",
        kurz: "A",
        schritte: this.leseSchritte(this.getAttribute("faden-a") || "lies; +1; schreib"),
        zeiger: 0,
        register: null,
      },
      {
        name: this.getAttribute("name-b") || "Faden B",
        kurz: "B",
        schritte: this.leseSchritte(this.getAttribute("faden-b") || "lies; +1; schreib"),
        zeiger: 0,
        register: null,
      },
    ];
    this.zielWert = this.getAttribute("ziel") !== null ? parseInt(this.getAttribute("ziel"), 10) : null;
    this.schalterText =
      this.getAttribute("schalter-text") ||
      "Kritischen Abschnitt mit einem Schloss sichern";
    this.aufgabenText =
      this.getAttribute("aufgabe") ||
      (this.zielWert !== null
        ? `Finde eine Reihenfolge, bei der am Ende <code>${this.variablenName} = ${this.zielWert}</code> herauskommt.`
        : "Führe die Schritte in beliebiger Reihenfolge aus und beobachte das Ergebnis.");

    this.grundzustand();
    this.render();
  }

  leseSchritte(roh) {
    return roh
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        const klein = s.toLowerCase();
        if (klein.startsWith("lies")) return { art: "lies", text: `register ← ${this.variablenName}` };
        if (klein.startsWith("schreib"))
          return { art: "schreib", text: `${this.variablenName} ← register` };
        if (klein.startsWith("sperre")) return { art: "sperre", text: "Sperre anfordern" };
        if (klein.startsWith("entsperre")) return { art: "entsperre", text: "Sperre freigeben" };
        const zahl = parseInt(klein.replace(/[^-0-9]/g, ""), 10) || 0;
        return { art: "rechne", betrag: zahl, text: `register ← register ${zahl >= 0 ? "+" : "−"} ${Math.abs(zahl)}` };
      });
  }

  grundzustand() {
    this.wert = this.startWert;
    this.faeden.forEach((f) => {
      f.zeiger = 0;
      f.register = null;
    });
    this.sperreBei = null;
    this.protokoll = [];
    this.geprueft = null;
  }

  // --- Ablauf ------------------------------------------------------------

  synchronisiert() {
    const box = this.shadowRoot && this.shadowRoot.querySelector(".sync-schalter");
    return box ? box.checked : false;
  }

  blockiert(index) {
    const f = this.faeden[index];
    if (f.zeiger >= f.schritte.length) return "fertig";
    if (!this.synchronisiert()) return null;
    if (this.sperreBei === null || this.sperreBei === index) return null;
    return "gesperrt";
  }

  schritt(index) {
    const f = this.faeden[index];
    if (this.blockiert(index)) return;
    const s = f.schritte[f.zeiger];
    if (!s) return;

    // Bei synchronized hält der Faden die Sperre, bis er fertig ist.
    if (this.synchronisiert() && this.sperreBei === null) this.sperreBei = index;

    let meldung = "";
    switch (s.art) {
      case "lies":
        f.register = this.wert;
        meldung = `liest ${this.variablenName} = ${this.wert} in sein Register.`;
        break;
      case "rechne":
        f.register = (f.register === null ? 0 : f.register) + s.betrag;
        meldung = `rechnet im Register: ${f.register - s.betrag} ${s.betrag >= 0 ? "+" : "−"} ${Math.abs(s.betrag)} = ${f.register}.`;
        break;
      case "schreib":
        this.wert = f.register === null ? this.wert : f.register;
        meldung = `schreibt ${this.wert} zurück nach ${this.variablenName}.`;
        break;
      case "sperre":
        this.sperreBei = index;
        meldung = "fordert die Sperre an und bekommt sie.";
        break;
      case "entsperre":
        this.sperreBei = null;
        meldung = "gibt die Sperre frei.";
        break;
      default:
        break;
    }

    f.zeiger++;
    if (this.synchronisiert() && f.zeiger >= f.schritte.length && this.sperreBei === index) {
      this.sperreBei = null;
    }

    this.protokoll.push({ faden: f.kurz, text: meldung, wert: this.wert });
    this.pruefeEnde();
    this.aktualisiere();
  }

  fertig() {
    return this.faeden.every((f) => f.zeiger >= f.schritte.length);
  }

  pruefeEnde() {
    if (!this.fertig()) {
      this.geprueft = null;
      return;
    }
    if (this.zielWert === null) {
      this.geprueft = {
        art: "info",
        text: `Beide Fäden sind fertig. Ergebnis: <code>${this.variablenName} = ${this.wert}</code>.`,
      };
    } else if (this.wert === this.zielWert) {
      this.geprueft = {
        art: "ok",
        text: `Geschafft: <code>${this.variablenName} = ${this.wert}</code>. Beide Fäden haben erhöht – aber einer hat den Wert des anderen überschrieben. Genau das ist eine Wettlaufsituation.`,
      };
    } else {
      this.geprueft = {
        art: "fehler",
        text: `Ergebnis: <code>${this.variablenName} = ${this.wert}</code>. Gesucht war ${this.zielWert}. Tipp: Beide Fäden müssen lesen, <em>bevor</em> einer schreibt.`,
      };
    }
  }

  zufall() {
    const offen = this.faeden
      .map((f, i) => i)
      .filter((i) => !this.blockiert(i));
    if (offen.length === 0) return;
    this.schritt(offen[Math.floor(Math.random() * offen.length)]);
  }

  bisEnde() {
    let schutz = 0;
    while (!this.fertig() && schutz++ < 100) this.zufall();
  }

  zuruecksetzen() {
    this.grundzustand();
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  fadenHTML(f, index) {
    const zustand = this.blockiert(index);
    return `
      <div class="faden ${zustand === "gesperrt" ? "gesperrt" : ""} ${
        zustand === "fertig" ? "fertig" : ""
      }">
        <div class="faden-kopf">
          <span class="faden-name">${f.name}</span>
          ${
            this.sperreBei === index && this.synchronisiert()
              ? `<span class="sperre-marke">🔒 hält die Sperre</span>`
              : zustand === "gesperrt"
                ? `<span class="sperre-marke wartet">wartet</span>`
                : ""
          }
        </div>
        <div class="register">
          <span class="register-label">register</span>
          <span class="register-wert">${f.register === null ? "—" : f.register}</span>
        </div>
        <ol class="schritte">
          ${f.schritte
            .map(
              (s, i) => `
            <li class="${i < f.zeiger ? "erledigt" : ""} ${i === f.zeiger ? "naechster" : ""}">
              <code>${s.text}</code>
            </li>`,
            )
            .join("")}
        </ol>
        <button class="btn ausfuehren" data-faden="${index}" ${zustand ? "disabled" : ""}>
          ${
            zustand === "fertig"
              ? "fertig"
              : zustand === "gesperrt"
                ? "blockiert"
                : `${f.kurz}: nächsten Schritt`
          }
        </button>
      </div>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".faeden").innerHTML = this.faeden
      .map((f, i) => this.fadenHTML(f, i))
      .join("");

    this.shadowRoot.querySelector(".gemeinsam").innerHTML = `
      <span class="gemeinsam-label">gemeinsame Variable</span>
      <code class="gemeinsam-name">${this.variablenName}</code>
      <span class="gemeinsam-wert">${this.wert}</span>`;

    this.shadowRoot.querySelector(".protokoll").innerHTML = this.protokoll.length
      ? this.protokoll
          .map(
            (e, i) => `
        <div class="zeile">
          <span class="nr">${i + 1}</span>
          <span class="marke marke-${e.faden}">${e.faden}</span>
          <span class="was">${e.text}</span>
          <code class="stand">${this.variablenName} = ${e.wert}</code>
        </div>`,
          )
          .join("")
      : `<div class="zeile leer">Noch kein Schritt ausgeführt. Du bestimmst die Reihenfolge.</div>`;

    const r = this.shadowRoot.querySelector(".rueckmeldung");
    if (this.geprueft) {
      r.className = `rueckmeldung ${this.geprueft.art}`;
      r.innerHTML = this.geprueft.text;
    } else {
      r.className = "rueckmeldung leer";
      r.innerHTML = "";
    }

    this.shadowRoot.querySelectorAll(".ausfuehren").forEach((b) => {
      b.onclick = () => this.schritt(parseInt(b.dataset.faden, 10));
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
        .aufgabe code, .rueckmeldung code, .zeile code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 4px; border-radius: 3px;
        }

        .gemeinsam {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; flex-wrap: wrap;
          padding: 12px; border-radius: 10px; margin-bottom: 12px;
          border: 2px solid var(--color-brand, #007864);
          background: color-mix(in srgb, var(--color-brand, #007864) 8%, transparent);
        }
        .gemeinsam-label {
          font-size: 0.74em; text-transform: uppercase; letter-spacing: 0.05em;
          opacity: 0.7; font-weight: 700;
        }
        .gemeinsam-name { font-family: ui-monospace, monospace; font-size: 0.95em; }
        .gemeinsam-wert {
          font-size: 1.7em; font-weight: 700;
          color: var(--color-brand, #007864); font-variant-numeric: tabular-nums;
        }

        .faeden { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        @media (max-width: 560px) { .faeden { grid-template-columns: 1fr; } }
        .faden {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 9px; padding: 10px;
          background: var(--color-nav, #f5f5f5);
          display: flex; flex-direction: column; gap: 8px;
        }
        .faden.gesperrt { opacity: 0.55; }
        .faden.fertig { border-color: var(--color-sync-ok, #15803d); }
        .faden-kopf {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 8px; flex-wrap: wrap;
        }
        .faden-name { font-weight: 700; font-size: 0.92em; }
        .sperre-marke { font-size: 0.74em; font-weight: 700; color: var(--color-brand, #007864); }
        .sperre-marke.wartet { color: #b45309; }
        .register {
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; padding: 5px 9px; border-radius: 6px;
          background: var(--color-background, white);
          border: 1px solid var(--color-spacer, #a4a4a4);
        }
        .register-label { font-size: 0.78em; font-family: ui-monospace, monospace; opacity: 0.7; }
        .register-wert {
          font-weight: 700; font-family: ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
        }
        ol.schritte { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; }
        ol.schritte li {
          font-size: 0.8em; padding: 4px 8px; border-radius: 5px;
          background: var(--color-background, white);
          border-left: 3px solid transparent;
        }
        ol.schritte li code { font-family: ui-monospace, monospace; }
        ol.schritte li.erledigt { opacity: 0.4; text-decoration: line-through; }
        ol.schritte li.naechster {
          border-left-color: var(--color-brand, #007864); font-weight: 600;
        }

        .btn {
          padding: 7px 12px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.86em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .knopfleiste {
          display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 12px;
        }
        .schalter { display: flex; align-items: center; gap: 6px; font-size: 0.86em; cursor: pointer; }
        .schalter code {
          font-family: ui-monospace, monospace;
          background: var(--color-nav, #f5f5f5); padding: 1px 5px; border-radius: 4px;
        }

        .protokoll { display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px; }
        .zeile {
          display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
          font-size: 0.84em; padding: 4px 8px; border-radius: 5px;
          background: var(--color-nav, #f5f5f5);
        }
        .zeile .nr { opacity: 0.45; min-width: 1.4em; font-variant-numeric: tabular-nums; }
        .zeile .marke {
          font-weight: 700; font-size: 0.85em; padding: 1px 7px; border-radius: 10px; color: #fff;
        }
        .zeile .marke-A { background: var(--color-brand, #007864); }
        .zeile .marke-B { background: #b45309; }
        .zeile .stand { margin-left: auto; font-size: 0.92em; }
        .zeile.leer { opacity: 0.6; background: transparent; padding: 0; }

        .rueckmeldung { font-size: 0.9em; border-radius: 8px; line-height: 1.55; }
        .rueckmeldung.ok, .rueckmeldung.fehler, .rueckmeldung.info { padding: 10px 12px; }
        .rueckmeldung.ok {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent);
        }
        .rueckmeldung.fehler {
          background: color-mix(in srgb, #b45309 16%, transparent);
        }
        .rueckmeldung.info { background: var(--color-nav, #f5f5f5); }
        .rueckmeldung em { font-style: normal; font-weight: 700; }
      </style>

      <div class="container">
        <div class="aufgabe">${this.aufgabenText}</div>
        <div class="gemeinsam"></div>
        <div class="faeden"></div>
        <div class="knopfleiste">
          <label class="schalter">
            <input type="checkbox" class="sync-schalter" />
            <span>${this.schalterText}</span>
          </label>
          <button class="btn sekundaer btn-zufall">Zufälliger Schritt</button>
          <button class="btn sekundaer btn-ende">Bis zum Ende</button>
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
        </div>
        <div class="protokoll"></div>
        <div class="rueckmeldung leer"></div>
      </div>
    `;

    this.shadowRoot.querySelector(".sync-schalter").addEventListener("change", () => {
      this.zuruecksetzen();
    });
    this.shadowRoot.querySelector(".btn-zufall").addEventListener("click", () => this.zufall());
    this.shadowRoot.querySelector(".btn-ende").addEventListener("click", () => this.bisEnde());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());

    this.aktualisiere();
  }
}

customElements.define("oop-nebenlaeufig", OopNebenlaeufig);
