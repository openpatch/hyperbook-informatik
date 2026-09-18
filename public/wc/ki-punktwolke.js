const PUNKTWOLKE_FARBEN_HELL = [
  "#2563eb",
  "#ea580c",
  "#16a34a",
  "#9333ea",
  "#dc2626",
];
const PUNKTWOLKE_FARBEN_DUNKEL = [
  "#60a5fa",
  "#fb923c",
  "#4ade80",
  "#c084fc",
  "#f87171",
];

class KiPunktwolke extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.punkte = [];
    this.labels = [];
    this.testpunkt = null;
    this.k = 3;
    this.normiert = false;
    this.zeigeGrenze = true;
    this.werkzeug = "test";
    this.zentren = [];
    this.zuordnung = [];
    this.iteration = 0;
    this.naechsterSchritt = "zuordnen";
    this.status = "";
    this.ziehIndex = -1;
    this.gezogen = false;
  }

  async connectedCallback() {
    this.modus = (this.getAttribute("modus") || "knn").toLowerCase();
    this.bearbeitbar = this.hasAttribute("bearbeitbar");
    this.xLabel = this.getAttribute("x-label") || "Gewicht (g)";
    this.yLabel = this.getAttribute("y-label") || "Süßigkeit";
    this.hoehe = Math.max(
      240,
      parseInt(this.getAttribute("hoehe") || "340", 10),
    );
    this.startPunkte = this.leseAttributPunkte();
    this.testdaten = this.lesePunktliste(this.getAttribute("testdaten"));
    this.punkte = this.startPunkte.map((p) => ({ ...p }));
    this.k = parseInt(
      this.getAttribute("k") || (this.modus === "kmeans" ? "2" : "3"),
      10,
    );
    if (this.getAttribute("grenze") === "aus") this.zeigeGrenze = false;
    if (this.hasAttribute("normiert")) this.normiert = true;
    if (this.hasAttribute("testpunkt")) {
      const t = this.getAttribute("testpunkt").split(",");
      this.testpunkt = { x: parseFloat(t[0]), y: parseFloat(t[1]) };
    }

    this.berechneBereich();
    await this.ladeZustand();
    this.sammleLabels();
    if (this.modus === "kmeans") this.starteKMeans();

    this.render();

    this.beobachter = new ResizeObserver(() => this.zeichne());
    this.beobachter.observe(this);
  }

  disconnectedCallback() {
    if (this.beobachter) this.beobachter.disconnect();
  }

  // --- Daten -------------------------------------------------------------

  lesePunktliste(roh) {
    if (!roh) return [];
    return roh
      .split(";")
      .map((eintrag) => eintrag.trim())
      .filter((eintrag) => eintrag.length > 0)
      .map((eintrag) => {
        const teile = eintrag.split(",");
        return {
          x: parseFloat(teile[0]),
          y: parseFloat(teile[1]),
          label: (teile[2] || "").trim(),
        };
      })
      .filter((p) => !isNaN(p.x) && !isNaN(p.y));
  }

  leseAttributPunkte() {
    const roh = this.getAttribute("punkte");
    if (!roh) {
      return [
        { x: 150, y: 7, label: "Apfel" },
        { x: 180, y: 8, label: "Apfel" },
        { x: 200, y: 6, label: "Apfel" },
        { x: 120, y: 4, label: "Birne" },
        { x: 100, y: 3, label: "Birne" },
        { x: 110, y: 5, label: "Birne" },
      ];
    }
    return this.lesePunktliste(roh);
  }

  berechneBereich() {
    const alle = this.startPunkte.concat(this.testdaten);
    const xs = alle.map((p) => p.x);
    const ys = alle.map((p) => p.y);
    const rand = (werte) => {
      const min = Math.min(...werte);
      const max = Math.max(...werte);
      const spanne = max - min || 1;
      return [min - spanne * 0.18, max + spanne * 0.18];
    };
    const [xa, xb] = rand(xs);
    const [ya, yb] = rand(ys);
    this.xMin = parseFloat(this.getAttribute("x-min") ?? xa);
    this.xMax = parseFloat(this.getAttribute("x-max") ?? xb);
    this.yMin = parseFloat(this.getAttribute("y-min") ?? ya);
    this.yMax = parseFloat(this.getAttribute("y-max") ?? yb);
  }

  sammleLabels() {
    const gesehen = [];
    this.punkte.forEach((p) => {
      if (p.label && !gesehen.includes(p.label)) gesehen.push(p.label);
    });
    this.labels = gesehen;
  }

  labelIndex(label) {
    const i = this.labels.indexOf(label);
    return i < 0 ? 0 : i;
  }

  // --- Zustand speichern -------------------------------------------------

  async ladeZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      const daten = await store.custom.get(id);
      if (!daten) return;
      const zustand = JSON.parse(daten.payload);
      if (Array.isArray(zustand.punkte) && zustand.punkte.length > 0) {
        this.punkte = zustand.punkte;
      }
      if (typeof zustand.k === "number") this.k = zustand.k;
      if (typeof zustand.normiert === "boolean") this.normiert = zustand.normiert;
      if (zustand.testpunkt) this.testpunkt = zustand.testpunkt;
    } catch (error) {
      console.error("Failed to load ki-punktwolke state:", error);
    }
  }

  async speichereZustand() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;
    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          punkte: this.punkte,
          k: this.k,
          normiert: this.normiert,
          testpunkt: this.testpunkt,
        }),
      });
    } catch (error) {
      console.error("Failed to save ki-punktwolke state:", error);
    }
  }

  // --- k-NN --------------------------------------------------------------

  skalierung() {
    if (!this.normiert) return { sx: 1, sy: 1 };
    return {
      sx: 1 / (this.xMax - this.xMin),
      sy: 1 / (this.yMax - this.yMin),
    };
  }

  distanz(ax, ay, bx, by) {
    const { sx, sy } = this.skalierung();
    const dx = (bx - ax) * sx;
    const dy = (by - ay) * sy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  klassifiziere(x, y, ausschluss = -1) {
    const nachbarn = this.punkte
      .map((p, i) => ({ punkt: p, index: i, d: this.distanz(x, y, p.x, p.y) }))
      .filter((n) => n.index !== ausschluss)
      .sort((a, b) => a.d - b.d);

    const k = Math.min(this.k, nachbarn.length);
    const naechste = nachbarn.slice(0, k);
    const stimmen = {};
    naechste.forEach((n) => {
      const label = n.punkt.label || "?";
      stimmen[label] = (stimmen[label] || 0) + 1;
    });

    let sieger = null;
    let beste = -1;
    // Bei Gleichstand gewinnt das Label des näheren Nachbarn.
    naechste.forEach((n) => {
      const label = n.punkt.label || "?";
      if (stimmen[label] > beste) {
        beste = stimmen[label];
        sieger = label;
      }
    });

    return { label: sieger, stimmen, naechste, radius: k > 0 ? naechste[k - 1].d : 0 };
  }

  // Wie im Buch: jeder Punkt wird gegen den vollen Datensatz klassifiziert,
  // er selbst eingeschlossen. Nur so ergibt k = 1 die erwarteten 100 %.
  quoteFuer(menge) {
    if (!menge || menge.length === 0) return null;
    let treffer = 0;
    menge.forEach((p) => {
      if (this.klassifiziere(p.x, p.y).label === p.label) treffer++;
    });
    return { treffer, gesamt: menge.length };
  }

  // --- k-Means -----------------------------------------------------------

  starteKMeans() {
    const anzahl = Math.min(this.k, this.punkte.length);
    const indizes = this.punkte.map((_, i) => i);
    for (let i = indizes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indizes[i], indizes[j]] = [indizes[j], indizes[i]];
    }
    this.zentren = indizes.slice(0, anzahl).map((i) => ({
      x: this.punkte[i].x,
      y: this.punkte[i].y,
    }));
    this.zuordnung = this.punkte.map(() => -1);
    this.iteration = 0;
    this.naechsterSchritt = "zuordnen";
    this.konvergiert = false;
    this.status = "Die Zentren stehen zufällig auf Datenpunkten.";
  }

  naechstesZentrum(x, y) {
    let beste = 0;
    let besteD = Infinity;
    this.zentren.forEach((z, i) => {
      const d = this.distanz(x, y, z.x, z.y);
      if (d < besteD) {
        besteD = d;
        beste = i;
      }
    });
    return beste;
  }

  schrittKMeans() {
    if (this.konvergiert) return;

    if (this.naechsterSchritt === "zuordnen") {
      let veraendert = 0;
      this.punkte.forEach((p, i) => {
        const neu = this.naechstesZentrum(p.x, p.y);
        if (neu !== this.zuordnung[i]) veraendert++;
        this.zuordnung[i] = neu;
      });
      this.naechsterSchritt = "verschieben";
      if (veraendert === 0) {
        this.konvergiert = true;
        this.status =
          "Keine Zuordnung hat sich geändert — k-Means ist fertig.";
      } else {
        this.status =
          veraendert === 1
            ? "1 Punkt hat das Cluster gewechselt."
            : veraendert + " Punkte haben das Cluster gewechselt.";
      }
    } else {
      this.zentren.forEach((z, i) => {
        const eigene = this.punkte.filter((_, j) => this.zuordnung[j] === i);
        if (eigene.length === 0) return;
        z.x = eigene.reduce((s, p) => s + p.x, 0) / eigene.length;
        z.y = eigene.reduce((s, p) => s + p.y, 0) / eigene.length;
      });
      this.naechsterSchritt = "zuordnen";
      this.iteration++;
      this.status = "Die Zentren sind in die Mitte ihrer Punkte gewandert.";
    }
  }

  laufeKMeans() {
    let schutz = 0;
    while (!this.konvergiert && schutz < 100) {
      this.schrittKMeans();
      schutz++;
    }
  }

  // --- Farben ------------------------------------------------------------

  leseFarbe(name, ersatz) {
    const wert = getComputedStyle(this).getPropertyValue(name).trim();
    if (!wert) return ersatz;
    const ctx = this.kontext();
    if (!ctx) return wert;
    try {
      ctx.fillStyle = wert;
      return ctx.fillStyle;
    } catch (error) {
      return ersatz;
    }
  }

  istDunkel() {
    const hg = this.leseFarbe("--color-background", "#ffffff");
    const treffer = /^#([0-9a-f]{6})$/i.exec(hg);
    if (!treffer) return false;
    const zahl = parseInt(treffer[1], 16);
    const r = (zahl >> 16) & 255;
    const g = (zahl >> 8) & 255;
    const b = zahl & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
  }

  farbe(index) {
    const palette =
      this.palette ||
      (this.istDunkel() ? PUNKTWOLKE_FARBEN_DUNKEL : PUNKTWOLKE_FARBEN_HELL);
    return palette[index % palette.length];
  }

  // --- Zeichnen ----------------------------------------------------------

  kontext() {
    const canvas = this.shadowRoot && this.shadowRoot.querySelector("canvas");
    return canvas ? canvas.getContext("2d") : null;
  }

  zeichne() {
    const canvas = this.shadowRoot.querySelector("canvas");
    if (!canvas) return;
    const breite = Math.max(240, canvas.parentElement.clientWidth);
    const hoehe = this.hoehe;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = breite * dpr;
    canvas.height = hoehe * dpr;
    canvas.style.width = breite + "px";
    canvas.style.height = hoehe + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, breite, hoehe);

    this.rand = { l: 54, r: 14, o: 14, u: 40 };
    this.plotB = breite - this.rand.l - this.rand.r;
    this.plotH = hoehe - this.rand.o - this.rand.u;

    this.palette = null;
    const text = this.leseFarbe("--color-text", "#000000");
    const linie = this.leseFarbe("--color-spacer", "#a4a4a4");
    const hintergrund = this.leseFarbe("--color-background", "#ffffff");
    this.palette = this.istDunkel()
      ? PUNKTWOLKE_FARBEN_DUNKEL
      : PUNKTWOLKE_FARBEN_HELL;

    if (this.zeigeGrenze) this.zeichneGrenze(ctx);
    this.zeichneAchsen(ctx, text, linie);

    ctx.save();
    ctx.beginPath();
    ctx.rect(this.rand.l, this.rand.o, this.plotB, this.plotH);
    ctx.clip();

    if (this.modus === "knn" && this.testpunkt) {
      this.zeichneNachbarschaft(ctx, text);
    }
    this.punkte.forEach((p, i) => {
      const farbe =
        this.modus === "kmeans"
          ? this.zuordnung[i] >= 0
            ? this.farbe(this.zuordnung[i])
            : linie
          : this.farbe(this.labelIndex(p.label));
      this.zeichneForm(
        ctx,
        this.zuPixelX(p.x),
        this.zuPixelY(p.y),
        this.labels.length > 1 ? this.labelIndex(p.label) : 0,
        7,
        farbe,
        hintergrund,
      );
    });

    if (this.modus === "knn") {
      this.testdaten.forEach((p) => {
        this.zeichneForm(
          ctx,
          this.zuPixelX(p.x),
          this.zuPixelY(p.y),
          this.labels.length > 1 ? this.labelIndex(p.label) : 0,
          7,
          hintergrund,
          this.farbe(this.labelIndex(p.label)),
          3,
        );
      });
    }

    if (this.modus === "kmeans") this.zeichneZentren(ctx, hintergrund);

    if (this.modus === "knn" && this.testpunkt) {
      this.zeichneTestpunkt(ctx, text, hintergrund);
    }

    ctx.restore();
  }

  zuPixelX(x) {
    return (
      this.rand.l + ((x - this.xMin) / (this.xMax - this.xMin)) * this.plotB
    );
  }

  zuPixelY(y) {
    return (
      this.rand.o +
      (1 - (y - this.yMin) / (this.yMax - this.yMin)) * this.plotH
    );
  }

  zuDatenX(px) {
    return (
      this.xMin + ((px - this.rand.l) / this.plotB) * (this.xMax - this.xMin)
    );
  }

  zuDatenY(py) {
    return (
      this.yMin +
      (1 - (py - this.rand.o) / this.plotH) * (this.yMax - this.yMin)
    );
  }

  zeichneGrenze(ctx) {
    if (this.punkte.length === 0) return;
    const zelle = 7;
    ctx.save();
    ctx.globalAlpha = 0.16;
    for (let px = this.rand.l; px < this.rand.l + this.plotB; px += zelle) {
      for (let py = this.rand.o; py < this.rand.o + this.plotH; py += zelle) {
        const x = this.zuDatenX(px + zelle / 2);
        const y = this.zuDatenY(py + zelle / 2);
        let index;
        if (this.modus === "kmeans") {
          if (this.zentren.length === 0) continue;
          index = this.naechstesZentrum(x, y);
        } else {
          const e = this.klassifiziere(x, y);
          if (e.label === null) continue;
          index = this.labelIndex(e.label);
        }
        ctx.fillStyle = this.farbe(index);
        const b = Math.min(zelle, this.rand.l + this.plotB - px);
        const h = Math.min(zelle, this.rand.o + this.plotH - py);
        ctx.fillRect(px, py, b, h);
      }
    }
    ctx.restore();
  }

  zeichneAchsen(ctx, text, linie) {
    const l = this.rand.l;
    const o = this.rand.o;
    const u = o + this.plotH;
    const r = l + this.plotB;

    ctx.save();
    ctx.strokeStyle = linie;
    ctx.fillStyle = text;
    ctx.lineWidth = 1;
    ctx.font = "11px system-ui, sans-serif";

    for (let i = 0; i <= 4; i++) {
      const x = l + (this.plotB * i) / 4;
      const y = o + (this.plotH * i) / 4;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(x, o);
      ctx.lineTo(x, u);
      ctx.moveTo(l, y);
      ctx.lineTo(r, y);
      ctx.stroke();

      ctx.globalAlpha = 0.75;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        this.kompakt(this.xMin + ((this.xMax - this.xMin) * i) / 4),
        x,
        u + 6,
      );
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(
        this.kompakt(this.yMax - ((this.yMax - this.yMin) * i) / 4),
        l - 8,
        y,
      );
    }

    ctx.globalAlpha = 1;
    ctx.strokeStyle = linie;
    ctx.beginPath();
    ctx.moveTo(l, o);
    ctx.lineTo(l, u);
    ctx.lineTo(r, u);
    ctx.stroke();

    ctx.globalAlpha = 0.9;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText(this.xLabel, r, u + 36);
    ctx.save();
    ctx.translate(12, o + 4);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(this.yLabel, 0, 0);
    ctx.restore();
    ctx.restore();
  }

  zeichneNachbarschaft(ctx, text) {
    const e = this.klassifiziere(this.testpunkt.x, this.testpunkt.y);
    const tx = this.zuPixelX(this.testpunkt.x);
    const ty = this.zuPixelY(this.testpunkt.y);
    const { sx, sy } = this.skalierung();
    const rx = (e.radius / sx / (this.xMax - this.xMin)) * this.plotB;
    const ry = (e.radius / sy / (this.yMax - this.yMin)) * this.plotH;

    ctx.save();
    ctx.strokeStyle = text;
    ctx.globalAlpha = 0.35;
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    const passt =
      rx > 0 &&
      ry > 0 &&
      isFinite(rx) &&
      isFinite(ry) &&
      rx <= this.plotB * 1.6 &&
      ry <= this.plotH * 1.6;
    if (passt) {
      ctx.beginPath();
      ctx.ellipse(tx, ty, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.globalAlpha = 0.65;
    e.naechste.forEach((n) => {
      ctx.strokeStyle = this.farbe(this.labelIndex(n.punkt.label));
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(this.zuPixelX(n.punkt.x), this.zuPixelY(n.punkt.y));
      ctx.stroke();
    });
    ctx.restore();
  }

  zeichneTestpunkt(ctx, text, hintergrund) {
    const e = this.klassifiziere(this.testpunkt.x, this.testpunkt.y);
    const tx = this.zuPixelX(this.testpunkt.x);
    const ty = this.zuPixelY(this.testpunkt.y);
    const farbe = e.label ? this.farbe(this.labelIndex(e.label)) : text;

    ctx.save();
    ctx.beginPath();
    ctx.arc(tx, ty, 11, 0, Math.PI * 2);
    ctx.fillStyle = farbe;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = hintergrund;
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = text;
    ctx.stroke();

    ctx.fillStyle = hintergrund;
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", tx, ty + 1);
    ctx.restore();
  }

  zeichneZentren(ctx, hintergrund) {
    ctx.save();
    ctx.lineCap = "round";
    this.zentren.forEach((z, i) => {
      const px = this.zuPixelX(z.x);
      const py = this.zuPixelY(z.y);
      const kreuz = () => {
        ctx.beginPath();
        ctx.moveTo(px - 11, py - 11);
        ctx.lineTo(px + 11, py + 11);
        ctx.moveTo(px + 11, py - 11);
        ctx.lineTo(px - 11, py + 11);
        ctx.stroke();
      };
      // Heller Rand, damit das Kreuz auch auf einem Punkt sichtbar bleibt.
      ctx.lineWidth = 9;
      ctx.strokeStyle = hintergrund;
      kreuz();
      ctx.lineWidth = 4;
      ctx.strokeStyle = this.farbe(i);
      kreuz();
    });
    ctx.restore();
  }

  zeichneForm(ctx, px, py, form, r, farbe, rahmen, rahmenBreite = 1.5) {
    ctx.save();
    ctx.beginPath();
    if (form === 1) {
      ctx.rect(px - r, py - r, r * 2, r * 2);
    } else if (form === 2) {
      ctx.moveTo(px, py - r * 1.2);
      ctx.lineTo(px + r * 1.1, py + r * 0.8);
      ctx.lineTo(px - r * 1.1, py + r * 0.8);
      ctx.closePath();
    } else if (form === 3) {
      ctx.moveTo(px, py - r * 1.2);
      ctx.lineTo(px + r * 1.2, py);
      ctx.lineTo(px, py + r * 1.2);
      ctx.lineTo(px - r * 1.2, py);
      ctx.closePath();
    } else {
      ctx.arc(px, py, r, 0, Math.PI * 2);
    }
    ctx.fillStyle = farbe;
    ctx.fill();
    ctx.lineWidth = rahmenBreite;
    ctx.strokeStyle = rahmen;
    ctx.stroke();
    ctx.restore();
  }

  // --- Interaktion -------------------------------------------------------

  positionAusEvent(event) {
    const canvas = this.shadowRoot.querySelector("canvas");
    const box = canvas.getBoundingClientRect();
    return { px: event.clientX - box.left, py: event.clientY - box.top };
  }

  punktBei(px, py) {
    for (let i = 0; i < this.punkte.length; i++) {
      const dx = this.zuPixelX(this.punkte[i].x) - px;
      const dy = this.zuPixelY(this.punkte[i].y) - py;
      if (dx * dx + dy * dy <= 169) return i;
    }
    return -1;
  }

  begrenze(punkt) {
    punkt.x = Math.min(this.xMax, Math.max(this.xMin, punkt.x));
    punkt.y = Math.min(this.yMax, Math.max(this.yMin, punkt.y));
    return punkt;
  }

  zeigerStart(event) {
    const { px, py } = this.positionAusEvent(event);
    this.gezogen = false;
    if (this.bearbeitbar && this.werkzeug !== "loeschen") {
      const index = this.punktBei(px, py);
      if (index >= 0) {
        this.ziehIndex = index;
        event.target.setPointerCapture(event.pointerId);
        return;
      }
    }
    this.ziehIndex = -1;
  }

  zeigerBewegung(event) {
    if (this.ziehIndex < 0) return;
    event.preventDefault();
    this.gezogen = true;
    const { px, py } = this.positionAusEvent(event);
    const punkt = this.punkte[this.ziehIndex];
    punkt.x = this.zuDatenX(px);
    punkt.y = this.zuDatenY(py);
    this.begrenze(punkt);
    if (this.modus === "kmeans") this.zuordnung[this.ziehIndex] = -1;
    this.aktualisiere(false);
  }

  async zeigerEnde(event) {
    if (this.ziehIndex >= 0) {
      this.ziehIndex = -1;
      if (this.gezogen) {
        if (this.modus === "kmeans") this.starteKMeans();
        this.aktualisiere();
        await this.speichereZustand();
        return;
      }
    }

    const { px, py } = this.positionAusEvent(event);
    if (
      px < this.rand.l ||
      px > this.rand.l + this.plotB ||
      py < this.rand.o ||
      py > this.rand.o + this.plotH
    ) {
      return;
    }

    const x = this.zuDatenX(px);
    const y = this.zuDatenY(py);

    if (this.werkzeug === "loeschen") {
      const index = this.punktBei(px, py);
      if (index >= 0 && this.punkte.length > 2) {
        this.punkte.splice(index, 1);
        this.sammleLabels();
        this.k = Math.min(this.k, this.punkte.length);
        if (this.modus === "kmeans") this.starteKMeans();
      }
    } else if (this.werkzeug.startsWith("neu:")) {
      const label = this.werkzeug.slice(4);
      this.punkte.push(this.begrenze({ x, y, label }));
      if (this.modus === "kmeans") this.starteKMeans();
    } else if (this.modus === "knn") {
      this.testpunkt = this.begrenze({ x, y });
    }

    this.aktualisiere();
    await this.speichereZustand();
  }

  async setzeK(wert) {
    this.k = wert;
    if (this.modus === "kmeans") this.starteKMeans();
    this.aktualisiere();
    await this.speichereZustand();
  }

  async setzeNormiert(wert) {
    this.normiert = wert;
    if (this.modus === "kmeans") this.starteKMeans();
    this.aktualisiere();
    await this.speichereZustand();
  }

  setzeGrenze(wert) {
    this.zeigeGrenze = wert;
    this.aktualisiere();
  }

  setzeWerkzeug(wert) {
    this.werkzeug = wert;
    this.aktualisiere();
  }

  async zuruecksetzen() {
    this.punkte = this.startPunkte.map((p) => ({ ...p }));
    this.testpunkt = null;
    this.sammleLabels();
    if (this.modus === "kmeans") this.starteKMeans();
    this.aktualisiere();
    await this.speichereZustand();
  }

  schritt() {
    this.schrittKMeans();
    this.aktualisiere();
  }

  bisEnde() {
    this.laufeKMeans();
    this.aktualisiere();
  }

  neuStarten() {
    this.starteKMeans();
    this.aktualisiere();
  }

  // --- Ausgabe -----------------------------------------------------------

  zahl(wert, stellen = 2) {
    if (!isFinite(wert)) return "—";
    return wert.toFixed(stellen).replace(".", ",");
  }

  kompakt(wert) {
    const gerundet =
      Math.abs(wert) >= 100 ? Math.round(wert) : Math.round(wert * 10) / 10;
    return String(gerundet).replace(".", ",");
  }

  infoHTML() {
    if (this.modus === "kmeans") return this.infoKMeans();
    return this.infoKNN();
  }

  infoKNN() {
    const teile = [];
    if (this.testpunkt) {
      const e = this.klassifiziere(this.testpunkt.x, this.testpunkt.y);
      const zeilen = e.naechste
        .map(
          (n, i) =>
            `<tr><td>${i + 1}.</td><td><span class="punkt" style="background:${this.farbe(
              this.labelIndex(n.punkt.label),
            )}"></span>${n.punkt.label || "?"}</td><td>(${this.kompakt(
              n.punkt.x,
            )} | ${this.kompakt(n.punkt.y)})</td><td>${this.zahl(
              n.d,
              2,
            )}</td></tr>`,
        )
        .join("");
      const stimmen = Object.entries(e.stimmen)
        .map(([label, anzahl]) => `${label}: ${anzahl}`)
        .join(" · ");
      teile.push(`
        <p class="ergebnis">Testpunkt (${this.kompakt(this.testpunkt.x)} | ${this.kompakt(
          this.testpunkt.y,
        )}) → <strong style="color:${this.farbe(
          this.labelIndex(e.label),
        )}">${e.label}</strong></p>
        <p class="stimmen">Stimmen der ${e.naechste.length} nächsten Nachbarn: ${stimmen}</p>
        <table>
          <thead><tr><th>#</th><th>Label</th><th>Position</th><th>Distanz</th></tr></thead>
          <tbody>${zeilen}</tbody>
        </table>
      `);
    } else {
      teile.push(
        `<p class="hinweis">Klicke in die Fläche, um einen Testpunkt zu setzen.</p>`,
      );
    }

    const zeile = (titel, quote) => {
      const prozent = Math.round((quote.treffer / quote.gesamt) * 100);
      return `<p class="quote">Trefferquote auf den ${titel}: <strong>${quote.treffer} von ${quote.gesamt} = ${prozent} %</strong></p>`;
    };
    const training = this.quoteFuer(this.punkte);
    if (training) teile.push(zeile("Trainingsdaten", training));
    const test = this.quoteFuer(this.testdaten);
    if (test) {
      teile.push(zeile("Testdaten", test));
      teile.push(
        `<p class="hinweis">Testdaten sind hohl gezeichnet. Sie gehören nicht zu den Trainingsdaten und stimmen nie mit ab.</p>`,
      );
    }
    return teile.join("");
  }

  infoKMeans() {
    const mitLabels = this.labels.length > 0;
    const gruppen = this.zentren.map((z, i) => {
      const eigene = this.punkte.filter((_, j) => this.zuordnung[j] === i);
      const zusammensetzung = {};
      eigene.forEach((p) => {
        const label = p.label || "ohne Label";
        zusammensetzung[label] = (zusammensetzung[label] || 0) + 1;
      });
      const text = Object.entries(zusammensetzung)
        .map(([label, anzahl]) => `${anzahl}× ${label}`)
        .join(", ");
      return `<tr>
        <td><span class="punkt" style="background:${this.farbe(i)}"></span>Cluster ${i + 1}</td>
        <td>${eigene.length}</td>
        <td>(${this.kompakt(z.x)} | ${this.kompakt(z.y)})</td>
        ${mitLabels ? `<td>${text || "—"}</td>` : ""}
      </tr>`;
    });

    const naechste = this.konvergiert
      ? "fertig"
      : this.naechsterSchritt === "zuordnen"
        ? "Punkte den Zentren zuordnen"
        : "Zentren in die Mitte verschieben";

    return `
      <p class="ergebnis">Durchlauf ${this.iteration} · Als Nächstes: <strong>${naechste}</strong></p>
      <p class="stimmen">${this.status}</p>
      ${mitLabels ? `<p class="hinweis">Die <em>Farbe</em> zeigt das Cluster, die <em>Form</em> das wahre Label — k-Means kennt die Labels nicht.</p>` : ""}
      <table>
        <thead><tr><th>Cluster</th><th>Punkte</th><th>Zentrum</th>${mitLabels ? "<th>Enthält</th>" : ""}</tr></thead>
        <tbody>${gruppen.join("")}</tbody>
      </table>
    `;
  }

  aktualisiere(infoNeu = true) {
    if (infoNeu) {
      const info = this.shadowRoot.querySelector(".info");
      if (info) info.innerHTML = this.infoHTML();
      const kWert = this.shadowRoot.querySelector(".k-wert");
      if (kWert) kWert.textContent = this.k;
      this.shadowRoot.querySelectorAll(".werkzeug").forEach((btn) => {
        btn.classList.toggle("aktiv", btn.dataset.werkzeug === this.werkzeug);
      });
    }
    this.zeichne();
  }

  render() {
    const maxK =
      this.modus === "kmeans"
        ? Math.min(5, Math.max(2, this.punkte.length))
        : Math.min(15, this.punkte.length);
    const kBeschriftung =
      this.modus === "kmeans" ? "Anzahl Cluster k" : "Nachbarn k";

    const werkzeuge = this.bearbeitbar
      ? `
      <div class="werkzeuge">
        <span class="label">Werkzeug:</span>
        ${
          this.modus === "knn"
            ? `<button class="werkzeug aktiv" data-werkzeug="test">Testpunkt</button>`
            : ""
        }
        ${this.labels
          .map(
            (label, i) =>
              `<button class="werkzeug" data-werkzeug="neu:${label}"><span class="punkt" style="background:${this.farbe(
                i,
              )}"></span>+ ${label}</button>`,
          )
          .join("")}
        <button class="werkzeug" data-werkzeug="loeschen">Löschen</button>
      </div>`
      : "";

    const kmeansKnoepfe =
      this.modus === "kmeans"
        ? `
      <div class="knoepfe">
        <button class="aktion schritt">Nächster Schritt</button>
        <button class="aktion ende">Bis zum Ende</button>
        <button class="aktion neu">Neu starten</button>
      </div>`
        : "";

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
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
          align-items: center;
          margin-bottom: 12px;
        }

        .regler { display: flex; align-items: center; gap: 10px; flex: 1 1 220px; }
        .regler .label { font-weight: bold; white-space: nowrap; }
        .k-wert {
          font-weight: bold;
          min-width: 1.6em;
          text-align: center;
          color: var(--color-brand, #007864);
        }

        input[type="range"] {
          flex: 1;
          min-width: 90px;
          height: 6px;
          border-radius: 3px;
          background: var(--color-spacer, #a4a4a4);
          outline: none;
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
          border: none;
        }

        .schalter { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .schalter input { width: 16px; height: 16px; accent-color: var(--color-brand, #007864); }

        .werkzeuge, .knoepfe {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 12px;
        }
        .werkzeuge .label { font-weight: bold; }

        button {
          font: inherit;
          font-size: 0.9em;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          background: var(--color-nav, #f5f5f5);
          color: var(--color-text, black);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        button:hover { border-color: var(--color-brand, #007864); }
        button.aktiv {
          background: var(--color-brand, #007864);
          color: var(--color-background, white);
          border-color: var(--color-brand, #007864);
        }

        .buehne {
          border: 1px solid var(--color-spacer, #a4a4a4);
          border-radius: 8px;
          background: var(--color-nav, #f5f5f5);
          overflow: hidden;
        }
        canvas { display: block; touch-action: none; cursor: crosshair; }

        .info { margin-top: 12px; font-size: 0.92em; }
        .info p { margin: 4px 0; }
        .ergebnis { font-size: 1.05em; }
        .hinweis, .stimmen, .quote { color: var(--color-text-deactivated, #242428); }

        .punkt {
          display: inline-block;
          width: 11px; height: 11px;
          border-radius: 50%;
          margin-right: 5px;
          vertical-align: -1px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          font-size: 0.95em;
        }
        th, td {
          text-align: left;
          padding: 4px 8px;
          border-bottom: 1px solid var(--color-spacer, #a4a4a4);
        }
        th { font-weight: bold; }
      </style>

      <div class="container">
        <div class="steuerung">
          <div class="regler">
            <span class="label">${kBeschriftung}:</span>
            <input type="range" min="${this.modus === "kmeans" ? 2 : 1}" max="${maxK}" step="1" value="${this.k}" class="k-regler" />
            <span class="k-wert">${this.k}</span>
          </div>
          <label class="schalter">
            <input type="checkbox" class="grenze-schalter" ${this.zeigeGrenze ? "checked" : ""} />
            Grenze zeigen
          </label>
          <label class="schalter">
            <input type="checkbox" class="norm-schalter" ${this.normiert ? "checked" : ""} />
            Merkmale normieren
          </label>
          <button class="reset">Zurücksetzen</button>
        </div>
        ${werkzeuge}
        ${kmeansKnoepfe}
        <div class="buehne"><canvas></canvas></div>
        <div class="info">${this.infoHTML()}</div>
      </div>
    `;

    const wurzel = this.shadowRoot;
    wurzel
      .querySelector(".k-regler")
      .addEventListener("input", (e) => this.setzeK(parseInt(e.target.value, 10)));
    wurzel
      .querySelector(".grenze-schalter")
      .addEventListener("change", (e) => this.setzeGrenze(e.target.checked));
    wurzel
      .querySelector(".norm-schalter")
      .addEventListener("change", (e) => this.setzeNormiert(e.target.checked));
    wurzel
      .querySelector(".reset")
      .addEventListener("click", () => this.zuruecksetzen());

    wurzel.querySelectorAll(".werkzeug").forEach((btn) => {
      btn.addEventListener("click", () => this.setzeWerkzeug(btn.dataset.werkzeug));
    });

    const schritt = wurzel.querySelector(".schritt");
    if (schritt) schritt.addEventListener("click", () => this.schritt());
    const ende = wurzel.querySelector(".ende");
    if (ende) ende.addEventListener("click", () => this.bisEnde());
    const neu = wurzel.querySelector(".neu");
    if (neu) neu.addEventListener("click", () => this.neuStarten());

    const canvas = wurzel.querySelector("canvas");
    canvas.addEventListener("pointerdown", (e) => this.zeigerStart(e));
    canvas.addEventListener("pointermove", (e) => this.zeigerBewegung(e));
    canvas.addEventListener("pointerup", (e) => this.zeigerEnde(e));

    requestAnimationFrame(() => this.zeichne());
  }
}

customElements.define("ki-punktwolke", KiPunktwolke);
