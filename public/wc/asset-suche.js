// Asset-Suche: eine durchsuchbare Übersicht über die Grafiken und Klänge der
// Spielwerkstatt. Zu jeder Datei zeigt sie den Java-Code, mit dem Scratch for
// Java sie lädt – im Buch wie auf dem Rechner, denn beide lesen den Pfad
// relativ zum Projekt. Bei einem Kachelbild wählt ein Klick die Kachel aus.
//
// Die Liste erzeugt tools/spielwerkstatt/erzeuge_assetliste.py.
//
//   <asset-suche liste="assets-liste.json"></asset-suche>
class AssetSuche extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.eintraege = [];
    this.suche = "";
    this.bereich = "";
    this.anzahl = AssetSuche.SEITE;
    this.gewaehlt = null;
    this.kachel = null; // [x, y] im Kachelbild, in Pixeln des Bildes
  }

  static SEITE = 96;

  async connectedCallback() {
    const liste = this.getAttribute("liste") || "assets-liste.json";
    // Die Pfade der Liste (assets/...) gelten relativ zu ihr selbst.
    this.listenUrl = new URL(liste, document.baseURI);
    this.renderGeruest();
    try {
      const antwort = await fetch(this.listenUrl);
      this.eintraege = await antwort.json();
    } catch (fehler) {
      this.shadowRoot.querySelector(".treffer").textContent =
        "Die Liste der Grafiken konnte nicht geladen werden.";
      return;
    }
    this.renderBereiche();
    this.renderTreffer();
  }

  url(pfad) {
    return new URL(pfad, this.listenUrl).href;
  }

  // Ein Name für Kostüm, Animation oder Klang. Allgemeine Dateinamen wie
  // sprite-sheet.png oder faceset.png bekommen den Ordner davor: Aus
  // actor/animal/cat/faceset.png wird "cat-faceset".
  name(eintrag) {
    const teile = eintrag.pfad.split("/");
    const datei = teile[teile.length - 1].replace(/\.[a-z0-9]+$/, "");
    let ordner = teile[teile.length - 2];
    if (/^separate/.test(ordner) && teile.length > 3) ordner = teile[teile.length - 3];
    if (datei === "sprite-sheet" || datei === ordner) return ordner;
    if (/^(sprite-sheet|faceset|preview|idle|walk|attack|jump|dead|item|special|hit|charge)/.test(datei)) {
      return `${ordner}-${datei}`;
    }
    return datei;
  }

  code(eintrag) {
    const pfad = eintrag.pfad;
    const name = this.name(eintrag);
    switch (eintrag.art) {
      case "figur": {
        const bilder = Math.floor(eintrag.hoehe / 16) >= 4 ? 4 : Math.floor(eintrag.hoehe / 16);
        return [
          `String bild = "${pfad}";`,
          `// je Blickrichtung eine Spalte, die Schritte untereinander`,
          `this.addAnimation("unten", bild, ${bilder}, 16, 16, 0, true);`,
          `this.addAnimation("oben", bild, ${bilder}, 16, 16, 1, true);`,
          `this.addAnimation("links", bild, ${bilder}, 16, 16, 2, true);`,
          `this.addAnimation("rechts", bild, ${bilder}, 16, 16, 3, true);`,
        ].join("\n");
      }
      case "streifen":
        return [
          `// ${eintrag.bilder} Bilder zu je ${eintrag.kachel} × ${eintrag.kachel} Pixeln nebeneinander`,
          `this.addAnimation("${name}", "${pfad}", ${eintrag.bilder}, ${eintrag.kachel}, ${eintrag.kachel});`,
          `this.playAnimation("${name}");   // in run()`,
        ].join("\n");
      case "kacheln": {
        if (!this.kachel) return `// Klicke im Bild auf eine Kachel.`;
        const [x, y] = this.kachel;
        return `this.addCostume("kachel", "${pfad}", ${x}, ${y}, 16, 16);`;
      }
      case "klang":
      case "musik":
        return [
          `this.addSound("${name}", "${pfad}");`,
          `this.playSound("${name}");`,
        ].join("\n");
      default:
        return `this.addCostume("${name}", "${pfad}");`;
    }
  }

  passend() {
    const woerter = this.suche.toLowerCase().split(/\s+/).filter(Boolean);
    return this.eintraege.filter(
      (e) =>
        (!this.bereich || e.bereich === this.bereich) &&
        woerter.every((w) => e.pfad.toLowerCase().includes(w)),
    );
  }

  renderGeruest() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: inherit; color: var(--color-text, #222); }
        .suche { width: 100%; box-sizing: border-box; padding: 8px 10px; font-size: 1rem;
          border: 1px solid var(--color-nav-border, #bbb); border-radius: 6px;
          background: var(--color-background, #fff); color: var(--color-text, #222); }
        .bereiche { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
        .bereiche button, .mehr { border: 1px solid var(--color-nav-border, #bbb);
          background: var(--color-nav, #f4f4f4); color: var(--color-text, #222);
          border-radius: 999px; padding: 3px 10px; cursor: pointer; font: inherit; font-size: 0.9rem; }
        .bereiche button[aria-pressed="true"] { background: var(--color-brand, #ba7720);
          color: var(--color-brand-text, #fff); border-color: var(--color-brand, #ba7720); }
        .treffer { font-size: 0.9rem; margin: 4px 0 8px; }
        .gitter { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; }
        .karte { border: 1px solid var(--color-spacer, #ddd); border-radius: 6px; padding: 6px;
          background: var(--color-nav, #f8f8f8); cursor: pointer; text-align: center;
          font: inherit; color: inherit; }
        .karte[aria-current="true"] { outline: 2px solid var(--color-brand, #ba7720); }
        .karte .bild { height: 64px; display: flex; align-items: center; justify-content: center; }
        .karte img { max-width: 100%; max-height: 64px; image-rendering: pixelated; }
        .karte .ton { font-size: 2rem; }
        .karte .name { font-size: 0.75rem; word-break: break-all; margin-top: 4px; }
        .mehr { display: block; margin: 10px auto; }
        .detail { border: 1px solid var(--color-spacer, #ddd); border-radius: 8px; padding: 12px;
          margin-bottom: 12px; background: var(--color-background, #fff); }
        .detail[hidden] { display: none; }
        .detail .kopf { display: flex; justify-content: space-between; gap: 8px; align-items: baseline; }
        .detail .pfad { font-family: monospace; font-size: 0.85rem; word-break: break-all; }
        .vorschau { margin: 10px 0; overflow: auto; max-height: 420px; }
        .vorschau .rahmen { position: relative; display: inline-block; line-height: 0;
          background: repeating-conic-gradient(#ccc 0 25%, #eee 0 50%) 0 0 / 16px 16px; }
        .vorschau img { image-rendering: pixelated; }
        .vorschau .markierung { position: absolute; border: 2px solid #e0245e; box-sizing: border-box;
          pointer-events: none; }
        pre { background: var(--color-nav, #f4f4f4); padding: 10px; border-radius: 6px; overflow-x: auto;
          font-size: 0.85rem; margin: 8px 0 4px; white-space: pre; }
        .knopf { border: 1px solid var(--color-nav-border, #bbb); background: var(--color-nav, #f4f4f4);
          color: var(--color-text, #222); border-radius: 6px; padding: 3px 10px; cursor: pointer; font: inherit; }
        .schliessen { font-size: 1.1rem; line-height: 1; }
      </style>
      <input class="suche" type="search" placeholder="Suchen, z. B. ninja, slime, coin, tree …" aria-label="Grafiken und Klänge durchsuchen">
      <div class="bereiche" role="group" aria-label="Bereich"></div>
      <div class="detail" hidden></div>
      <div class="treffer" aria-live="polite">Lade …</div>
      <div class="gitter"></div>
      <button class="mehr" hidden>Mehr anzeigen</button>`;

    const eingabe = this.shadowRoot.querySelector(".suche");
    eingabe.addEventListener("input", () => {
      this.suche = eingabe.value;
      this.anzahl = AssetSuche.SEITE;
      this.renderTreffer();
    });
    this.shadowRoot.querySelector(".mehr").addEventListener("click", () => {
      this.anzahl += AssetSuche.SEITE;
      this.renderTreffer();
    });
  }

  renderBereiche() {
    const bereiche = [...new Set(this.eintraege.map((e) => e.bereich))];
    const leiste = this.shadowRoot.querySelector(".bereiche");
    leiste.innerHTML = "";
    for (const name of ["", ...bereiche]) {
      const knopf = document.createElement("button");
      knopf.textContent = name || "Alles";
      knopf.setAttribute("aria-pressed", String(name === this.bereich));
      knopf.addEventListener("click", () => {
        this.bereich = name;
        this.anzahl = AssetSuche.SEITE;
        for (const k of leiste.children) k.setAttribute("aria-pressed", String(k === knopf));
        this.renderTreffer();
      });
      leiste.appendChild(knopf);
    }
  }

  renderTreffer() {
    const treffer = this.passend();
    this.shadowRoot.querySelector(".treffer").textContent =
      treffer.length === 1 ? "1 Treffer" : `${treffer.length} Treffer`;
    const gitter = this.shadowRoot.querySelector(".gitter");
    gitter.innerHTML = "";
    for (const eintrag of treffer.slice(0, this.anzahl)) {
      const karte = document.createElement("button");
      karte.className = "karte";
      karte.title = eintrag.pfad;
      karte.setAttribute("aria-current", String(eintrag === this.gewaehlt));
      const bild = document.createElement("div");
      bild.className = "bild";
      if (eintrag.art === "klang" || eintrag.art === "musik") {
        bild.innerHTML = `<span class="ton" aria-hidden="true">${eintrag.art === "musik" ? "🎵" : "🔊"}</span>`;
      } else {
        const img = document.createElement("img");
        img.loading = "lazy";
        img.alt = "";
        img.src = this.url(eintrag.vorschau || eintrag.pfad);
        bild.appendChild(img);
      }
      const name = document.createElement("div");
      name.className = "name";
      name.textContent = this.name(eintrag);
      karte.append(bild, name);
      karte.addEventListener("click", () => this.waehle(eintrag));
      gitter.appendChild(karte);
    }
    this.shadowRoot.querySelector(".mehr").hidden = treffer.length <= this.anzahl;
  }

  waehle(eintrag) {
    this.gewaehlt = eintrag;
    this.kachel = null;
    this.renderDetail();
    this.renderTreffer();
    this.shadowRoot.querySelector(".detail").scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  renderDetail() {
    const detail = this.shadowRoot.querySelector(".detail");
    const e = this.gewaehlt;
    if (!e) {
      detail.hidden = true;
      return;
    }
    detail.hidden = false;
    const groesse = e.breite ? `${e.breite} × ${e.hoehe} Pixel` : "";
    detail.innerHTML = `
      <div class="kopf">
        <span class="pfad"></span>
        <button class="knopf schliessen" aria-label="Schließen">×</button>
      </div>
      <div class="info"></div>
      <div class="vorschau"></div>
      <pre><code></code></pre>
      <button class="knopf kopieren">Code kopieren</button>`;
    detail.querySelector(".pfad").textContent = e.pfad;
    detail.querySelector(".info").textContent = [e.bereich, groesse].filter(Boolean).join(" · ");
    detail.querySelector(".schliessen").addEventListener("click", () => {
      this.gewaehlt = null;
      this.renderDetail();
      this.renderTreffer();
    });

    const vorschau = detail.querySelector(".vorschau");
    if (e.art === "klang" || e.art === "musik") {
      const ton = document.createElement("audio");
      ton.controls = true;
      ton.preload = "none";
      ton.src = this.url(e.pfad);
      vorschau.appendChild(ton);
    } else {
      // so groß, dass Pixel erkennbar sind, aber nicht breiter als der Platz
      const faktor = Math.max(1, Math.min(6, Math.floor(480 / Math.max(e.breite, e.hoehe))));
      const rahmen = document.createElement("div");
      rahmen.className = "rahmen";
      const img = document.createElement("img");
      img.alt = e.pfad;
      img.src = this.url(e.pfad);
      img.width = e.breite * faktor;
      img.height = e.hoehe * faktor;
      rahmen.appendChild(img);
      if (e.art === "kacheln") {
        rahmen.style.cursor = "crosshair";
        const markierung = document.createElement("div");
        markierung.className = "markierung";
        markierung.hidden = true;
        rahmen.appendChild(markierung);
        img.addEventListener("click", (ereignis) => {
          const k = e.kachel;
          const x = Math.floor(ereignis.offsetX / faktor / k) * k;
          const y = Math.floor(ereignis.offsetY / faktor / k) * k;
          this.kachel = [x, y];
          Object.assign(markierung.style, {
            left: `${x * faktor}px`, top: `${y * faktor}px`,
            width: `${k * faktor}px`, height: `${k * faktor}px`,
          });
          markierung.hidden = false;
          detail.querySelector("code").textContent = this.code(e);
        });
      }
      vorschau.appendChild(rahmen);
    }

    detail.querySelector("code").textContent = this.code(e);
    const kopieren = detail.querySelector(".kopieren");
    kopieren.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(this.code(e));
        kopieren.textContent = "Kopiert ✓";
      } catch (fehler) {
        kopieren.textContent = "Kopieren nicht möglich – bitte markieren";
      }
      setTimeout(() => (kopieren.textContent = "Code kopieren"), 1500);
    });
  }
}

customElements.define("asset-suche", AssetSuche);
