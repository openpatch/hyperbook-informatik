// Sortierverfahren zum Mitmachen: Die Lernenden wählen selbst das nächste zu
// vergleichende Paar und entscheiden über den Tausch. Quicksort und Mergesort
// laufen im Vorführmodus Schritt für Schritt ab.
class OopSortierung extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.verfahren = (this.getAttribute("verfahren") || "bubblesort").toLowerCase();
    this.startWerte = (this.getAttribute("werte") || "5,3,8,1,9,2")
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    this.ereignisse = this.baueEreignisse(this.startWerte);
    const hatInteraktive = this.ereignisse.some((e) => e.interaktiv);
    const gewuenscht = (this.getAttribute("modus") || "aktiv").toLowerCase();
    this.modus = hatInteraktive && gewuenscht === "aktiv" ? "aktiv" : "vorfuehrung";

    this.grundzustand();
    this.render();
  }

  // --- Ereignisse erzeugen ----------------------------------------------

  baueEreignisse(werte) {
    const a = werte.slice();
    switch (this.verfahren) {
      case "auswahl":
        return this.ereignisseAuswahl(a);
      case "einfuegen":
        return this.ereignisseEinfuegen(a);
      case "quicksort":
        return this.ereignisseQuicksort(a);
      case "mergesort":
        return this.ereignisseMergesort(a);
      default:
        return this.ereignisseBubblesort(a);
    }
  }

  ereignisseBubblesort(a) {
    const ev = [];
    const n = a.length;
    for (let runde = 0; runde < n - 1; runde++) {
      for (let i = 0; i < n - 1 - runde; i++) {
        const tauschen = a[i] > a[i + 1];
        ev.push({
          interaktiv: true,
          art: "paar",
          erwartet: [i, i + 1],
          frage: "Vergleiche die beiden Nachbarn. Was passiert?",
          optionen: [
            { id: "tauschen", text: "Tauschen" },
            { id: "weiter", text: "Nicht tauschen" },
          ],
          richtig: tauschen ? "tauschen" : "weiter",
          begruendung: tauschen
            ? `${a[i]} > ${a[i + 1]} – das größere Element muss nach rechts.`
            : `${a[i]} ≤ ${a[i + 1]} – die beiden stehen schon richtig.`,
          folge: tauschen ? [{ op: "tausch", i, j: i + 1 }] : [],
        });
        if (tauschen) {
          const h = a[i];
          a[i] = a[i + 1];
          a[i + 1] = h;
        }
      }
      ev.push({
        interaktiv: false,
        beschreibung: `Runde ${runde + 1} beendet: Position ${n - 1 - runde} steht endgültig.`,
        folge: [{ op: "fixiert", index: n - 1 - runde }],
      });
    }
    ev.push({
      interaktiv: false,
      beschreibung: "Fertig – das Feld ist sortiert.",
      folge: [{ op: "fixiert", index: 0 }],
    });
    return ev;
  }

  ereignisseAuswahl(a) {
    const ev = [];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      ev.push({
        interaktiv: false,
        beschreibung: `Neue Runde: Position ${i} soll besetzt werden. Vorläufiges Minimum ist ${a[i]} (Position ${i}).`,
        folge: [{ op: "minimum", index: i }],
      });
      for (let j = i + 1; j < n; j++) {
        const neuesMin = a[j] < a[min];
        ev.push({
          interaktiv: true,
          art: "paar",
          erwartet: [min, j],
          frage: "Vergleiche mit dem bisherigen Minimum. Was passiert?",
          optionen: [
            { id: "neuesMin", text: "Neues Minimum merken" },
            { id: "weiter", text: "Minimum behalten" },
          ],
          richtig: neuesMin ? "neuesMin" : "weiter",
          begruendung: neuesMin
            ? `${a[j]} < ${a[min]} – Position ${j} ist das neue Minimum.`
            : `${a[j]} ≥ ${a[min]} – das Minimum bleibt bei Position ${min}.`,
          folge: neuesMin ? [{ op: "minimum", index: j }] : [],
        });
        if (neuesMin) min = j;
      }
      if (min !== i) {
        ev.push({
          interaktiv: false,
          beschreibung: `Das Minimum ${a[min]} wird an Position ${i} getauscht.`,
          folge: [{ op: "tausch", i, j: min }, { op: "fixiert", index: i }],
        });
        const h = a[i];
        a[i] = a[min];
        a[min] = h;
      } else {
        ev.push({
          interaktiv: false,
          beschreibung: `Das Minimum steht schon an Position ${i} – kein Tausch nötig.`,
          folge: [{ op: "fixiert", index: i }],
        });
      }
    }
    ev.push({
      interaktiv: false,
      beschreibung: "Das letzte Element ist automatisch das größte – fertig.",
      folge: [{ op: "fixiert", index: n - 1 }, { op: "minimum", index: -1 }],
    });
    return ev;
  }

  ereignisseEinfuegen(a) {
    const ev = [];
    const n = a.length;
    ev.push({
      interaktiv: false,
      beschreibung: "Das erste Element allein gilt als sortiert.",
      folge: [{ op: "fixiert", index: 0 }],
    });
    for (let i = 1; i < n; i++) {
      const merker = a[i];
      ev.push({
        interaktiv: false,
        beschreibung: `merker ← ${merker}. Die Position ${i} ist jetzt eine Lücke.`,
        folge: [{ op: "luecke", pos: i }],
      });
      let j = i - 1;
      while (j >= 0) {
        const schieben = a[j] > merker;
        ev.push({
          interaktiv: true,
          art: "einzel",
          erwartet: [j],
          frage: `Vergleiche den merker (${merker}) mit dem angeklickten Element. Was passiert?`,
          optionen: [
            { id: "schieben", text: "Nach rechts schieben" },
            { id: "ablegen", text: "merker hier ablegen" },
          ],
          richtig: schieben ? "schieben" : "ablegen",
          begruendung: schieben
            ? `${a[j]} > ${merker} – das Element muss Platz machen.`
            : `${a[j]} ≤ ${merker} – links davon ist alles kleiner, der merker gehört rechts daneben.`,
          folge: schieben
            ? [{ op: "schieben", von: j, nach: j + 1 }]
            : [{ op: "ablegen", pos: j + 1 }, { op: "fixiert", index: i }],
        });
        if (!schieben) break;
        a[j + 1] = a[j];
        j--;
      }
      if (j < 0) {
        ev.push({
          interaktiv: false,
          beschreibung: `Der linke Rand ist erreicht – der merker ${merker} gehört ganz nach vorn.`,
          folge: [{ op: "ablegen", pos: 0 }, { op: "fixiert", index: i }],
        });
      }
      a[j + 1] = merker;
    }
    return ev;
  }

  ereignisseQuicksort(a) {
    const ev = [];
    const zerlege = (lo, hi) => {
      if (lo > hi) return;
      if (lo === hi) {
        ev.push({
          interaktiv: false,
          beschreibung: `Der Bereich [${lo}] hat nur ein Element und ist damit sortiert.`,
          folge: [{ op: "bereich", lo, hi }, { op: "fixiert", index: lo }],
        });
        return;
      }
      ev.push({
        interaktiv: false,
        beschreibung: `Bereich [${lo}…${hi}] wird zerlegt. Pivot ist das letzte Element ${a[hi]}.`,
        folge: [{ op: "bereich", lo, hi }, { op: "pivot", index: hi }],
      });
      const pivot = a[hi];
      let i = lo - 1;
      for (let j = lo; j < hi; j++) {
        const kleiner = a[j] <= pivot;
        const folge = [{ op: "vergleich", i: j, j: hi }];
        let text = `${a[j]} ${kleiner ? "≤" : ">"} ${pivot} – bleibt ${kleiner ? "links" : "rechts"}.`;
        if (kleiner) {
          i++;
          if (i !== j) {
            folge.push({ op: "tausch", i, j });
            text += ` Tausch der Positionen ${i} und ${j}.`;
            const h = a[i];
            a[i] = a[j];
            a[j] = h;
          }
        }
        ev.push({ interaktiv: false, beschreibung: text, folge });
      }
      i++;
      if (i !== hi) {
        const h = a[i];
        a[i] = a[hi];
        a[hi] = h;
      }
      ev.push({
        interaktiv: false,
        beschreibung: `Das Pivot ${pivot} kommt an Position ${i} – dort steht es endgültig.`,
        folge: [
          ...(i !== hi ? [{ op: "tausch", i, j: hi }] : []),
          { op: "pivot", index: -1 },
          { op: "fixiert", index: i },
        ],
      });
      zerlege(lo, i - 1);
      zerlege(i + 1, hi);
    };
    zerlege(0, a.length - 1);
    ev.push({
      interaktiv: false,
      beschreibung: "Alle Bereiche sind zerlegt – fertig.",
      folge: [{ op: "bereich", lo: -1, hi: -1 }],
    });
    return ev;
  }

  ereignisseMergesort(a) {
    const ev = [];
    const sortiere = (lo, hi) => {
      if (lo >= hi) return;
      const mitte = Math.floor((lo + hi) / 2);
      ev.push({
        interaktiv: false,
        beschreibung: `Teile [${lo}…${hi}] in [${lo}…${mitte}] und [${mitte + 1}…${hi}].`,
        folge: [{ op: "bereich", lo, hi }],
      });
      sortiere(lo, mitte);
      sortiere(mitte + 1, hi);

      ev.push({
        interaktiv: false,
        beschreibung: `Mische [${lo}…${mitte}] und [${mitte + 1}…${hi}].`,
        folge: [{ op: "bereich", lo, hi }],
      });
      const links = a.slice(lo, mitte + 1);
      const rechts = a.slice(mitte + 1, hi + 1);
      let i = 0;
      let j = 0;
      let k = lo;
      while (i < links.length && j < rechts.length) {
        const nimmLinks = links[i] <= rechts[j];
        const wert = nimmLinks ? links[i] : rechts[j];
        ev.push({
          interaktiv: false,
          beschreibung: `${links[i]} ${nimmLinks ? "≤" : ">"} ${rechts[j]} – ${wert} kommt an Position ${k}.`,
          folge: [{ op: "zaehleVergleich" }, { op: "setze", pos: k, wert }],
        });
        a[k] = wert;
        if (nimmLinks) i++;
        else j++;
        k++;
      }
      while (i < links.length) {
        ev.push({
          interaktiv: false,
          beschreibung: `Rest aus der linken Hälfte: ${links[i]} kommt an Position ${k}.`,
          folge: [{ op: "setze", pos: k, wert: links[i] }],
        });
        a[k] = links[i];
        i++;
        k++;
      }
      while (j < rechts.length) {
        ev.push({
          interaktiv: false,
          beschreibung: `Rest aus der rechten Hälfte: ${rechts[j]} kommt an Position ${k}.`,
          folge: [{ op: "setze", pos: k, wert: rechts[j] }],
        });
        a[k] = rechts[j];
        j++;
        k++;
      }
    };
    sortiere(0, a.length - 1);
    ev.push({
      interaktiv: false,
      beschreibung: "Alle Teilfolgen sind gemischt – fertig.",
      folge: [
        { op: "bereich", lo: -1, hi: -1 },
        ...a.map((_, i) => ({ op: "fixiert", index: i })),
      ],
    });
    return ev;
  }

  // --- Zustand -----------------------------------------------------------

  grundzustand() {
    this.feld = this.startWerte.slice();
    this.fixiert = new Set();
    this.pos = 0;
    this.phase = "waehlen";
    this.gewaehlt = [];
    this.merker = null;
    this.luecke = -1;
    this.minIndex = -1;
    this.pivotIndex = -1;
    this.bereich = null;
    this.hervor = [];
    this.vergleiche = 0;
    this.bewegungen = 0;
    this.meldung = null;
    this.log = [];
    this.verlauf = [];
  }

  wendeAn(ops) {
    ops.forEach((o) => {
      switch (o.op) {
        case "tausch": {
          const h = this.feld[o.i];
          this.feld[o.i] = this.feld[o.j];
          this.feld[o.j] = h;
          this.bewegungen++;
          break;
        }
        case "setze":
          this.feld[o.pos] = o.wert;
          this.bewegungen++;
          break;
        case "luecke":
          this.merker = this.feld[o.pos];
          this.luecke = o.pos;
          this.feld[o.pos] = null;
          break;
        case "schieben":
          this.feld[o.nach] = this.feld[o.von];
          this.feld[o.von] = null;
          this.luecke = o.von;
          this.bewegungen++;
          break;
        case "ablegen":
          this.feld[o.pos] = this.merker;
          this.merker = null;
          this.luecke = -1;
          this.bewegungen++;
          break;
        case "fixiert":
          if (o.index >= 0) this.fixiert.add(o.index);
          break;
        case "minimum":
          this.minIndex = o.index;
          break;
        case "pivot":
          this.pivotIndex = o.index;
          break;
        case "bereich":
          this.bereich = o.lo < 0 ? null : { lo: o.lo, hi: o.hi };
          break;
        case "vergleich":
          this.hervor = [o.i, o.j];
          this.vergleiche++;
          break;
        case "zaehleVergleich":
          this.vergleiche++;
          break;
        default:
          break;
      }
    });
  }

  // Alle nicht-interaktiven Ereignisse bis zum nächsten Halt abarbeiten.
  laufeBisHalt() {
    while (this.pos < this.ereignisse.length) {
      const e = this.ereignisse[this.pos];
      if (e.interaktiv && this.modus === "aktiv") break;
      this.wendeAn(e.folge);
      if (e.beschreibung) this.log.push(e.beschreibung);
      else if (e.interaktiv) {
        this.vergleiche++;
        this.hervor = e.erwartet;
        this.log.push(e.begruendung);
      }
      this.pos++;
      if (this.modus === "vorfuehrung") break;
    }
    if (this.modus === "aktiv") {
      this.phase = "waehlen";
      this.gewaehlt = [];
      this.hervor = [];
    }
  }

  fertig() {
    return this.pos >= this.ereignisse.length;
  }

  aktuellesEreignis() {
    return this.ereignisse[this.pos];
  }

  // --- Interaktion -------------------------------------------------------

  klickeBalken(index) {
    if (this.modus !== "aktiv" || this.fertig() || this.phase !== "waehlen") return;
    const e = this.aktuellesEreignis();
    const anzahl = e.art === "einzel" ? 1 : 2;

    if (this.gewaehlt.includes(index)) {
      this.gewaehlt = this.gewaehlt.filter((i) => i !== index);
    } else if (this.gewaehlt.length < anzahl) {
      this.gewaehlt.push(index);
    }

    if (this.gewaehlt.length === anzahl) {
      const erwartet = e.erwartet.slice().sort((x, y) => x - y);
      const gewaehlt = this.gewaehlt.slice().sort((x, y) => x - y);
      if (erwartet.join(",") === gewaehlt.join(",")) {
        this.vergleiche++;
        this.phase = "entscheiden";
        this.hervor = this.gewaehlt.slice();
        this.meldung = null;
      } else {
        this.meldung = {
          art: "fehler",
          text: this.hinweisZurWahl(e),
        };
        this.gewaehlt = [];
      }
    } else {
      this.meldung = null;
    }
    this.aktualisiere();
  }

  hinweisZurWahl(e) {
    switch (this.verfahren) {
      case "bubblesort":
        return "Bubblesort vergleicht immer direkte Nachbarn und wandert dabei von links nach rechts durch den unsortierten Teil.";
      case "auswahl":
        return "Sortieren durch Auswählen vergleicht jedes noch nicht geprüfte Element mit dem bisherigen Minimum (dunkel umrandet).";
      case "einfuegen":
        return "Der merker wandert von seiner Lücke aus nach links. Verglichen wird mit dem Element direkt links der Lücke.";
      default:
        return "Das ist nicht der nächste Vergleich des Verfahrens.";
    }
  }

  entscheide(id) {
    if (this.phase !== "entscheiden") return;
    const e = this.aktuellesEreignis();
    if (id === e.richtig) {
      this.wendeAn(e.folge);
      this.log.push(e.begruendung);
      this.pos++;
      this.meldung = null;
      this.laufeBisHalt();
    } else {
      this.meldung = { art: "fehler", text: `Nicht ganz: ${e.begruendung}` };
    }
    this.aktualisiere();
  }

  weiter() {
    if (this.fertig()) return;
    this.verlauf.push({
      feld: this.feld.slice(),
      fixiert: new Set(this.fixiert),
      pos: this.pos,
      vergleiche: this.vergleiche,
      bewegungen: this.bewegungen,
      log: this.log.slice(),
      hervor: this.hervor.slice(),
      bereich: this.bereich ? { ...this.bereich } : null,
      pivotIndex: this.pivotIndex,
      minIndex: this.minIndex,
      merker: this.merker,
      luecke: this.luecke,
    });
    this.laufeBisHalt();
    this.aktualisiere();
  }

  zurueck() {
    const z = this.verlauf.pop();
    if (!z) return;
    Object.assign(this, z);
    this.fixiert = z.fixiert;
    this.aktualisiere();
  }

  zuruecksetzen() {
    this.grundzustand();
    if (this.modus === "aktiv") this.laufeBisHalt();
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  balken() {
    const max = Math.max(...this.startWerte, 1);
    const e = !this.fertig() && this.modus === "aktiv" ? this.aktuellesEreignis() : null;
    const klickbar = this.modus === "aktiv" && this.phase === "waehlen" && e;

    return this.feld
      .map((wert, i) => {
        const klassen = ["balken"];
        if (this.fixiert.has(i)) klassen.push("fixiert");
        if (this.hervor.includes(i)) klassen.push("hervor");
        if (this.gewaehlt.includes(i)) klassen.push("gewaehlt");
        if (i === this.minIndex) klassen.push("minimum");
        if (i === this.pivotIndex) klassen.push("pivot");
        if (this.bereich && (i < this.bereich.lo || i > this.bereich.hi)) klassen.push("ausserhalb");
        if (wert === null) klassen.push("luecke");

        const hoehe = wert === null ? 6 : Math.round((wert / max) * 100);
        return `
          <div class="saeule ${klickbar ? "klickbar" : ""}" data-index="${i}">
            <div class="${klassen.join(" ")}" style="height: ${hoehe}%">
              <span class="wert">${wert === null ? "" : wert}</span>
            </div>
            <div class="index">${i}</div>
          </div>`;
      })
      .join("");
  }

  frageHTML() {
    if (this.fertig()) {
      return `<div class="frage fertig">Fertig! ${this.vergleiche} Vergleiche und ${this.bewegungen} Bewegungen.</div>`;
    }
    if (this.modus !== "aktiv") return "";
    const e = this.aktuellesEreignis();
    if (this.phase === "waehlen") {
      const anzahl = e.art === "einzel" ? "das nächste Element" : "die beiden nächsten Elemente";
      return `<div class="frage">Klicke ${anzahl}, ${e.art === "einzel" ? "das" : "die"} das Verfahren jetzt vergleicht.</div>`;
    }
    return `
      <div class="frage">
        ${e.frage}
        <div class="optionen">
          ${e.optionen
            .map((o) => `<button class="btn klein" data-wahl="${o.id}">${o.text}</button>`)
            .join("")}
        </div>
      </div>`;
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".feld").innerHTML = this.balken();
    this.shadowRoot.querySelector(".merker-box").innerHTML =
      this.merker !== null
        ? `<span class="merker-label">merker</span><span class="merker-wert">${this.merker}</span>`
        : "";
    this.shadowRoot.querySelector(".frage-box").innerHTML = this.frageHTML();

    const meldung = this.shadowRoot.querySelector(".meldung");
    meldung.className = `meldung ${this.meldung ? this.meldung.art : "leer"}`;
    meldung.textContent = this.meldung ? this.meldung.text : "";

    this.shadowRoot.querySelector(".zaehler").innerHTML = `
      <span><strong>${this.vergleiche}</strong> Vergleiche</span>
      <span><strong>${this.bewegungen}</strong> Bewegungen</span>`;

    const log = this.shadowRoot.querySelector(".log");
    log.innerHTML = this.log
      .slice(-6)
      .map((t) => `<div class="log-zeile">${t}</div>`)
      .join("");

    const weiter = this.shadowRoot.querySelector(".btn-weiter");
    if (weiter) weiter.disabled = this.fertig();
    const zurueck = this.shadowRoot.querySelector(".btn-zurueck");
    if (zurueck) zurueck.disabled = this.verlauf.length === 0;

    this.shadowRoot.querySelectorAll(".saeule").forEach((s) => {
      s.onclick = () => this.klickeBalken(parseInt(s.dataset.index, 10));
    });
    this.shadowRoot.querySelectorAll("[data-wahl]").forEach((b) => {
      b.onclick = () => this.entscheide(b.dataset.wahl);
    });
  }

  titel() {
    const namen = {
      bubblesort: "Bubblesort",
      auswahl: "Sortieren durch Auswählen",
      einfuegen: "Sortieren durch Einfügen",
      quicksort: "Quicksort",
      mergesort: "Mergesort",
    };
    return namen[this.verfahren] || this.verfahren;
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
        .kopf {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 10px; flex-wrap: wrap; margin-bottom: 10px;
        }
        .kopf .name { font-weight: 700; }
        .kopf .modus { font-size: 0.82em; opacity: 0.7; }
        .zaehler { display: flex; gap: 14px; font-size: 0.85em; }
        .zaehler strong {
          color: var(--color-brand, #007864);
          font-variant-numeric: tabular-nums;
        }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 10px; margin-bottom: 12px;
        }
        .merker-box {
          height: 30px; display: flex; align-items: center; gap: 8px;
          margin-bottom: 4px; font-size: 0.85em;
        }
        .merker-label { opacity: 0.7; font-family: ui-monospace, monospace; }
        .merker-wert {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 32px; padding: 2px 8px; border-radius: 6px;
          font-weight: 700;
          background: var(--color-brand, #007864);
          color: var(--color-brand-text, #fff);
        }
        .feld {
          display: flex; align-items: flex-end; gap: 6px;
          height: 170px; padding-top: 10px;
        }
        .saeule {
          flex: 1; display: flex; flex-direction: column;
          justify-content: flex-end; align-items: stretch; height: 100%;
        }
        .saeule.klickbar { cursor: pointer; }
        .balken {
          border-radius: 5px 5px 0 0;
          background: var(--color-spacer, #a4a4a4);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: 3px; min-height: 18px;
          transition: height 0.25s ease, background 0.15s ease;
          border: 2px solid transparent;
        }
        .balken .wert { font-size: 0.8em; font-weight: 700; color: #fff; }
        .balken.fixiert { background: var(--color-sync-ok, #15803d); }
        .balken.hervor { background: #b45309; }
        .balken.gewaehlt { border-color: var(--color-text, black); }
        .balken.minimum { border-color: var(--color-text, black); border-style: dashed; }
        .balken.pivot { background: var(--color-brand, #007864); }
        .balken.ausserhalb { opacity: 0.35; }
        .balken.luecke {
          background: transparent;
          border: 2px dashed var(--color-spacer, #a4a4a4);
        }
        .saeule.klickbar:hover .balken { filter: brightness(1.15); }
        .index { text-align: center; font-size: 0.7em; opacity: 0.55; margin-top: 3px; }

        .frage-box { margin-bottom: 10px; }
        .frage {
          font-size: 0.92em; padding: 9px 11px; border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          border-left: 4px solid var(--color-brand, #007864);
        }
        .frage.fertig {
          border-left-color: var(--color-sync-ok, #15803d);
          font-weight: 600;
        }
        .optionen { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }

        .knopfleiste { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
        .btn {
          padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.95em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.klein { padding: 6px 12px; font-size: 0.88em; }
        .btn.sekundaer { background: #6b7280; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .meldung { font-size: 0.9em; border-radius: 8px; }
        .meldung.fehler {
          padding: 8px 10px;
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent);
        }
        .log { margin-top: 10px; display: flex; flex-direction: column; gap: 3px; }
        .log-zeile { font-size: 0.83em; opacity: 0.75; }
        .log-zeile:last-child { opacity: 1; font-weight: 600; }
      </style>

      <div class="container">
        <div class="kopf">
          <div>
            <span class="name">${this.titel()}</span>
            <span class="modus">${
              this.modus === "aktiv" ? "– du führst das Verfahren aus" : "– Vorführung Schritt für Schritt"
            }</span>
          </div>
          <div class="zaehler"></div>
        </div>

        <div class="buehne">
          <div class="merker-box"></div>
          <div class="feld"></div>
        </div>

        <div class="frage-box"></div>

        <div class="knopfleiste">
          ${this.modus === "vorfuehrung" ? `<button class="btn btn-weiter">Nächster Schritt</button>` : ""}
          ${this.modus === "vorfuehrung" ? `<button class="btn sekundaer btn-zurueck">Zurück</button>` : ""}
          <button class="btn sekundaer btn-reset">Zurücksetzen</button>
        </div>

        <div class="meldung leer"></div>
        <div class="log"></div>
      </div>
    `;

    const weiter = this.shadowRoot.querySelector(".btn-weiter");
    if (weiter) weiter.addEventListener("click", () => this.weiter());
    const zurueck = this.shadowRoot.querySelector(".btn-zurueck");
    if (zurueck) zurueck.addEventListener("click", () => this.zurueck());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => this.zuruecksetzen());

    if (this.modus === "aktiv") this.laufeBisHalt();
    this.aktualisiere();
  }
}

customElements.define("oop-sortierung", OopSortierung);
