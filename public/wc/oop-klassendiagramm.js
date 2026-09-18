// Klassendiagramm selbst bauen: Die Klassen sind vorgegeben, die Beziehungen
// zwischen ihnen müssen aus dem Quelltext erschlossen werden.
class OopKlassendiagramm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.beziehungen = [];
    this.rueckmeldung = null;
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
    this.klassen = this.leseKlassen();
    this.loesung = this.leseLoesung();
    this.aufgabenText =
      this.getAttribute("aufgabe") ||
      "Trage die Beziehungen ein, die im Quelltext stecken.";
    await this.ladeZustand();
    this.render();
  }

  // "Kunde: name:String | Konto: nummer:int, stand:double | Sparkonto:"
  leseKlassen() {
    const roh = this.getAttribute("klassen") || "Kunde: name:String | Konto: nummer:int, stand:double";
    return roh
      .split("|")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s, i) => {
        const doppel = s.indexOf(":");
        const name = (doppel >= 0 ? s.slice(0, doppel) : s).trim();
        const attribute = (doppel >= 0 ? s.slice(doppel + 1) : "")
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a.length > 0);
        return { name, attribute, x: 0, y: 0, nr: i };
      });
  }

  // "Kunde -> Konto : besitzt : 1 : * ; Sparkonto --|> Konto"
  leseLoesung() {
    const roh = this.getAttribute("loesung") || "";
    return roh
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        if (s.includes("--|>")) {
          const [von, nach] = s.split("--|>").map((t) => t.trim());
          return { art: "vererbung", von, nach, bezeichnung: "", kardVon: "", kardNach: "" };
        }
        const teile = s.split(":").map((t) => t.trim());
        const [von, nach] = teile[0].split("->").map((t) => t.trim());
        return {
          art: "assoziation",
          von,
          nach,
          bezeichnung: teile[1] || "",
          kardVon: teile[2] || "",
          kardNach: teile[3] || "",
        };
      });
  }

  // --- Zustand -----------------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (daten) {
        const z = JSON.parse(daten.payload);
        this.beziehungen = z.beziehungen || [];
        if (z.positionen) {
          this.klassen.forEach((k) => {
            if (z.positionen[k.name]) {
              k.x = z.positionen[k.name].x;
              k.y = z.positionen[k.name].y;
              k.gesetzt = true;
            }
          });
        }
      }
    } catch (fehler) {
      console.error("Zustand von oop-klassendiagramm konnte nicht geladen werden:", fehler);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    const positionen = {};
    this.klassen.forEach((k) => (positionen[k.name] = { x: k.x, y: k.y }));
    try {
      await store.custom.put({
        id,
        payload: JSON.stringify({ beziehungen: this.beziehungen, positionen }),
      });
    } catch (fehler) {
      console.error("Zustand von oop-klassendiagramm konnte nicht gespeichert werden:", fehler);
    }
  }

  // --- Geometrie ---------------------------------------------------------

  masse(k) {
    const zeilen = Math.max(1, k.attribute.length);
    const laengen = [k.name.length + 2].concat(k.attribute.map((a) => a.length + 2));
    return {
      breite: Math.max(120, Math.ceil(Math.max(...laengen) * 7.4) + 18),
      hoehe: 26 + zeilen * 17 + 8,
    };
  }

  ordneAn() {
    let x = 24;
    const proZeile = Math.max(1, Math.min(3, this.klassen.length));
    this.klassen.forEach((k, i) => {
      if (k.gesetzt) return;
      const spalte = i % proZeile;
      const reihe = Math.floor(i / proZeile);
      k.x = 24 + spalte * 210;
      k.y = 24 + reihe * 130;
    });
  }

  leinwandMasse() {
    let maxX = 0;
    let maxY = 0;
    this.klassen.forEach((k) => {
      const m = this.masse(k);
      maxX = Math.max(maxX, k.x + m.breite);
      maxY = Math.max(maxY, k.y + m.hoehe);
    });
    return { breite: Math.max(480, maxX + 40), hoehe: Math.max(260, maxY + 40) };
  }

  // Schnittpunkt der Verbindungslinie mit dem Rand des Kastens.
  randpunkt(k, zielX, zielY) {
    const m = this.masse(k);
    const mx = k.x + m.breite / 2;
    const my = k.y + m.hoehe / 2;
    const dx = zielX - mx;
    const dy = zielY - my;
    if (dx === 0 && dy === 0) return { x: mx, y: my };
    const skalaX = dx !== 0 ? m.breite / 2 / Math.abs(dx) : Infinity;
    const skalaY = dy !== 0 ? m.hoehe / 2 / Math.abs(dy) : Infinity;
    const s = Math.min(skalaX, skalaY);
    return { x: mx + dx * s, y: my + dy * s };
  }

  // --- Beziehungen -------------------------------------------------------

  hinzufuegen() {
    const w = (klasse) => this.shadowRoot.querySelector(klasse).value.trim();
    const von = w(".f-von");
    const nach = w(".f-nach");
    const art = w(".f-art");
    if (von === nach) {
      this.rueckmeldung = { ok: false, text: "Eine Beziehung braucht zwei verschiedene Klassen." };
      this.aktualisiere();
      return;
    }
    const neu = {
      art,
      von,
      nach,
      bezeichnung: art === "vererbung" ? "" : w(".f-bez"),
      kardVon: art === "vererbung" ? "" : w(".f-kard-von"),
      kardNach: art === "vererbung" ? "" : w(".f-kard-nach"),
    };
    const schonDa = this.beziehungen.some(
      (b) => b.art === neu.art && b.von === neu.von && b.nach === neu.nach,
    );
    if (schonDa) {
      this.rueckmeldung = { ok: false, text: "Diese Beziehung gibt es schon." };
      this.aktualisiere();
      return;
    }
    this.beziehungen.push(neu);
    this.rueckmeldung = null;
    this.shadowRoot.querySelector(".f-bez").value = "";
    this.speichereZustand();
    this.aktualisiere();
  }

  entferne(nr) {
    this.beziehungen.splice(nr, 1);
    this.rueckmeldung = null;
    this.speichereZustand();
    this.aktualisiere();
  }

  pruefe() {
    if (this.loesung.length === 0) {
      this.rueckmeldung = { ok: true, text: "Zu dieser Aufgabe ist keine Lösung hinterlegt." };
      this.aktualisiere();
      return;
    }

    const passt = (a, b) =>
      a.art === b.art &&
      a.von === b.von &&
      a.nach === b.nach &&
      (b.kardVon === "" || a.kardVon === b.kardVon) &&
      (b.kardNach === "" || a.kardNach === b.kardNach);

    const getroffen = this.loesung.filter((s) => this.beziehungen.some((b) => passt(b, s)));
    const falsch = this.beziehungen.filter((b) => !this.loesung.some((s) => passt(b, s)));
    const fehlend = this.loesung.filter((s) => !this.beziehungen.some((b) => passt(b, s)));

    if (getroffen.length === this.loesung.length && falsch.length === 0) {
      this.rueckmeldung = { ok: true, text: "Alle Beziehungen stimmen." };
    } else {
      const teile = [`${getroffen.length} von ${this.loesung.length} Beziehungen stimmen.`];
      if (falsch.length > 0) {
        teile.push(
          `${falsch.length} Beziehung${falsch.length === 1 ? "" : "en"} passt so nicht: ${falsch
            .map((b) => `${b.von} → ${b.nach}`)
            .join(", ")}.`,
        );
      }
      if (fehlend.length > 0) {
        const fehlt = fehlend[0];
        teile.push(
          `Schau im Quelltext noch einmal bei <strong>${fehlt.von}</strong> nach: Welche Klasse taucht dort als Attributtyp oder hinter <code>extends</code> auf?`,
        );
      }
      this.rueckmeldung = { ok: false, text: teile.join(" ") };
    }
    this.aktualisiere();
  }

  // --- Darstellung -------------------------------------------------------

  svg() {
    this.ordneAn();
    const l = this.leinwandMasse();

    const linien = this.beziehungen
      .map((b, nr) => {
        const von = this.klassen.find((k) => k.name === b.von);
        const nach = this.klassen.find((k) => k.name === b.nach);
        if (!von || !nach) return "";
        const mVon = this.masse(von);
        const mNach = this.masse(nach);
        const p1 = this.randpunkt(von, nach.x + mNach.breite / 2, nach.y + mNach.hoehe / 2);
        const p2 = this.randpunkt(nach, von.x + mVon.breite / 2, von.y + mVon.hoehe / 2);
        const mitteX = (p1.x + p2.x) / 2;
        const mitteY = (p1.y + p2.y) / 2;
        const marker =
          b.art === "vererbung" ? `url(#dreieck-${this.pfadId})` : `url(#pfeil-${this.pfadId})`;

        const beschriftung =
          b.art === "vererbung"
            ? ""
            : `
            <text x="${mitteX}" y="${mitteY - 6}" class="bez">${b.bezeichnung}</text>
            ${b.kardVon ? `<text x="${p1.x + (p2.x > p1.x ? 10 : -10)}" y="${p1.y - 6}" class="kard">${b.kardVon}</text>` : ""}
            ${b.kardNach ? `<text x="${p2.x + (p1.x > p2.x ? 10 : -10)}" y="${p2.y - 6}" class="kard">${b.kardNach}</text>` : ""}`;

        return `
          <g class="beziehung ${b.art}" data-nr="${nr}">
            <line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"
                  class="linie" marker-end="${marker}" />
            ${beschriftung}
          </g>`;
      })
      .join("");

    const kaesten = this.klassen
      .map((k) => {
        const m = this.masse(k);
        return `
          <g class="klasse" data-name="${k.name}">
            <rect x="${k.x}" y="${k.y}" width="${m.breite}" height="${m.hoehe}" rx="5" />
            <line x1="${k.x}" y1="${k.y + 26}" x2="${k.x + m.breite}" y2="${k.y + 26}" class="trenner" />
            <text x="${k.x + m.breite / 2}" y="${k.y + 18}" class="klassenname">${k.name}</text>
            ${
              k.attribute.length
                ? k.attribute
                    .map(
                      (a, i) =>
                        `<text x="${k.x + 9}" y="${k.y + 26 + 17 * (i + 1) - 4}" class="attribut">− ${a}</text>`,
                    )
                    .join("")
                : `<text x="${k.x + 9}" y="${k.y + 39}" class="attribut leer">(keine)</text>`
            }
          </g>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${l.breite} ${l.hoehe}" class="leinwand" role="img"
           aria-label="Klassendiagramm">
        <defs>
          <marker id="dreieck-${this.pfadId}" viewBox="0 0 12 12" refX="11" refY="6"
                  markerWidth="11" markerHeight="11" orient="auto-start-reverse">
            <path d="M 1 1 L 11 6 L 1 11 z" class="dreieck" />
          </marker>
          <marker id="pfeil-${this.pfadId}" viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="9" markerHeight="9" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10" class="pfeil" />
          </marker>
        </defs>
        ${linien}
        ${kaesten}
      </svg>`;
  }

  listeHTML() {
    if (this.beziehungen.length === 0) {
      return `<div class="hinweis">Noch keine Beziehung eingetragen.</div>`;
    }
    return this.beziehungen
      .map(
        (b, nr) => `
        <div class="bez-zeile">
          <code>${
            b.art === "vererbung"
              ? `${b.von} ist ein ${b.nach}`
              : `${b.von} ${b.kardVon || ""} → ${b.kardNach || ""} ${b.nach}${b.bezeichnung ? ` („${b.bezeichnung}“)` : ""}`
          }</code>
          <button class="weg" data-nr="${nr}" title="Beziehung entfernen">×</button>
        </div>`,
      )
      .join("");
  }

  aktualisiere() {
    this.shadowRoot.querySelector(".buehne").innerHTML = this.svg();
    this.shadowRoot.querySelector(".liste").innerHTML = this.listeHTML();

    const r = this.shadowRoot.querySelector(".rueckmeldung");
    if (this.rueckmeldung) {
      r.className = `rueckmeldung ${this.rueckmeldung.ok ? "ok" : "fehler"}`;
      r.innerHTML = this.rueckmeldung.text;
    } else {
      r.className = "rueckmeldung leer";
      r.innerHTML = "";
    }

    const art = this.shadowRoot.querySelector(".f-art").value;
    this.shadowRoot.querySelectorAll(".nur-assoziation").forEach((el) => {
      el.style.display = art === "vererbung" ? "none" : "";
    });

    this.shadowRoot.querySelectorAll(".weg").forEach((b) => {
      b.onclick = () => this.entferne(parseInt(b.dataset.nr, 10));
    });
    this.verbindeZiehen();
  }

  verbindeZiehen() {
    const svg = this.shadowRoot.querySelector(".leinwand");
    if (!svg) return;
    svg.querySelectorAll(".klasse").forEach((gruppe) => {
      gruppe.addEventListener("pointerdown", (e) => {
        const klasse = this.klassen.find((k) => k.name === gruppe.dataset.name);
        if (!klasse) return;
        const rechteck = svg.getBoundingClientRect();
        const l = this.leinwandMasse();
        const skala = l.breite / rechteck.width;
        const startX = e.clientX;
        const startY = e.clientY;
        const ursprungX = klasse.x;
        const ursprungY = klasse.y;
        gruppe.setPointerCapture(e.pointerId);

        const bewege = (ev) => {
          klasse.x = Math.max(4, ursprungX + (ev.clientX - startX) * skala);
          klasse.y = Math.max(4, ursprungY + (ev.clientY - startY) * skala);
          klasse.gesetzt = true;
          this.shadowRoot.querySelector(".buehne").innerHTML = this.svg();
          this.verbindeZiehen();
        };
        const los = () => {
          svg.removeEventListener("pointermove", bewege);
          svg.removeEventListener("pointerup", los);
          this.speichereZustand();
        };
        svg.addEventListener("pointermove", bewege);
        svg.addEventListener("pointerup", los);
        e.preventDefault();
      });
    });
  }

  render() {
    this.pfadId = Math.random().toString(36).slice(2, 8);
    const optionen = this.klassen
      .map((k) => `<option value="${k.name}">${k.name}</option>`)
      .join("");

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
        @media (min-width: 720px) { .oben.mit-code { grid-template-columns: 3fr 2fr; } }
        pre {
          margin: 0; padding: 10px; border-radius: 8px; overflow: auto;
          background: var(--color-nav, #f5f5f5);
          border: 1px solid var(--color-spacer, #a4a4a4);
          font-family: ui-monospace, monospace; font-size: 0.78em; line-height: 1.45;
          max-height: 300px;
        }
        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px; background: var(--color-nav, #f5f5f5);
          padding: 6px; overflow-x: auto;
        }
        .leinwand { width: 100%; min-width: 420px; height: auto; display: block; touch-action: none; }

        .klasse { cursor: grab; }
        .klasse rect {
          fill: var(--color-background, white);
          stroke: var(--color-text, black); stroke-width: 1.5;
        }
        .trenner { stroke: var(--color-text, black); stroke-width: 1; opacity: 0.6; }
        text { fill: var(--color-text, black); font-family: system-ui, sans-serif; }
        .klassenname { text-anchor: middle; font-size: 13px; font-weight: 700; }
        .attribut { font-size: 11px; font-family: ui-monospace, monospace; }
        .attribut.leer { opacity: 0.45; font-style: italic; font-family: system-ui, sans-serif; }
        .linie { stroke: var(--color-text, black); stroke-width: 1.6; }
        .beziehung.vererbung .linie { stroke-width: 1.8; }
        .dreieck { fill: var(--color-background, white); stroke: var(--color-text, black); stroke-width: 1.5; }
        .pfeil { fill: none; stroke: var(--color-text, black); stroke-width: 1.5; }
        .bez {
          text-anchor: middle; font-size: 11px; font-style: italic;
          paint-order: stroke; stroke: var(--color-nav, #f5f5f5); stroke-width: 4px;
        }
        .kard {
          font-size: 11px; font-weight: 700; text-anchor: middle;
          paint-order: stroke; stroke: var(--color-nav, #f5f5f5); stroke-width: 4px;
        }

        .formular {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-end;
          padding: 10px; border-radius: 8px; margin: 12px 0;
          background: var(--color-nav, #f5f5f5);
        }
        .formular label { display: flex; flex-direction: column; gap: 3px; font-size: 0.78em; }
        .formular label > span { font-weight: 600; opacity: 0.8; }
        select, .formular input {
          font: inherit; font-size: 0.88em; padding: 5px 7px; border-radius: 6px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-background, white);
          color: var(--color-text, black);
        }
        .formular input { width: 6.5em; }
        .formular input.schmal { width: 3.5em; }

        .btn {
          padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;
          font-size: 0.9em; font-weight: bold;
          background: var(--color-brand, #007864); color: #fff;
        }
        .btn.sekundaer { background: #6b7280; }
        .knopfleiste { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }

        .liste { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
        .bez-zeile {
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          padding: 5px 9px; border-radius: 6px; font-size: 0.85em;
          background: var(--color-nav, #f5f5f5);
        }
        .bez-zeile code { font-family: ui-monospace, monospace; }
        .weg {
          border: none; background: none; cursor: pointer; color: inherit;
          font-size: 1.1em; line-height: 1; opacity: 0.5;
        }
        .weg:hover { opacity: 1; color: var(--color-sync-error, #b91c1c); }
        .hinweis { font-size: 0.85em; opacity: 0.6; }

        .rueckmeldung { font-size: 0.9em; border-radius: 8px; }
        .rueckmeldung.ok, .rueckmeldung.fehler { padding: 9px 11px; }
        .rueckmeldung.ok {
          background: color-mix(in srgb, var(--color-sync-ok, #15803d) 18%, transparent);
          font-weight: 600;
        }
        .rueckmeldung.fehler {
          background: color-mix(in srgb, var(--color-sync-error, #b91c1c) 15%, transparent);
        }
        .rueckmeldung code {
          font-family: ui-monospace, monospace;
          background: var(--color-background, white); padding: 0 3px; border-radius: 3px;
        }
      </style>

      <div class="container">
        <div class="aufgabe">${this.aufgabenText}</div>

        <div class="oben ${this.quelltext ? "mit-code" : ""}">
          <div class="buehne"></div>
          ${this.quelltext ? `<pre>${this.quelltext.replace(/</g, "&lt;")}</pre>` : ""}
        </div>

        <div class="formular">
          <label><span>Von</span><select class="f-von">${optionen}</select></label>
          <label><span>Art</span>
            <select class="f-art">
              <option value="assoziation">hat ein (Assoziation)</option>
              <option value="vererbung">ist ein (Vererbung)</option>
            </select>
          </label>
          <label><span>Nach</span><select class="f-nach">${optionen}</select></label>
          <label class="nur-assoziation"><span>Bezeichnung</span><input type="text" class="f-bez" placeholder="besitzt" /></label>
          <label class="nur-assoziation"><span>Kard. von</span><input type="text" class="f-kard-von schmal" value="1" /></label>
          <label class="nur-assoziation"><span>Kard. nach</span><input type="text" class="f-kard-nach schmal" value="*" /></label>
          <button class="btn btn-add">Hinzufügen</button>
        </div>

        <div class="liste"></div>

        <div class="knopfleiste">
          <button class="btn btn-pruefen">Prüfen</button>
          <button class="btn sekundaer btn-reset">Alle Beziehungen löschen</button>
        </div>

        <div class="rueckmeldung leer"></div>
      </div>
    `;

    const nachSelect = this.shadowRoot.querySelector(".f-nach");
    if (this.klassen.length > 1) nachSelect.selectedIndex = 1;

    this.shadowRoot.querySelector(".btn-add").addEventListener("click", () => this.hinzufuegen());
    this.shadowRoot.querySelector(".btn-pruefen").addEventListener("click", () => this.pruefe());
    this.shadowRoot.querySelector(".btn-reset").addEventListener("click", () => {
      this.beziehungen = [];
      this.rueckmeldung = null;
      this.speichereZustand();
      this.aktualisiere();
    });
    this.shadowRoot.querySelector(".f-art").addEventListener("change", () => this.aktualisiere());

    this.aktualisiere();
  }
}

customElements.define("oop-klassendiagramm", OopKlassendiagramm);
