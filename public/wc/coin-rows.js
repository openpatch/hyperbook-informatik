class CoinRows extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.rows = [[{ flipped: false }]];
  }

  async connectedCallback() {
    await this.loadState();
    this.render();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.rows = state.rows || [[{ flipped: false }]];
      }
    } catch (error) {
      console.error("Failed to load coin-rows state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({ rows: this.rows }),
      });
    } catch (error) {
      console.error("Failed to save coin-rows state:", error);
    }
  }

  async flipCoin(rowIndex, coinIndex) {
    this.rows[rowIndex][coinIndex].flipped =
      !this.rows[rowIndex][coinIndex].flipped;
    this.render();
    await this.saveState();
  }

  async addCoin(rowIndex) {
    this.rows[rowIndex].push({ flipped: false });
    this.render();
    await this.saveState();
  }

  async removeCoin(rowIndex) {
    if (this.rows[rowIndex].length > 1 || this.rows.length > 1) {
      this.rows[rowIndex].pop();
      this.render();
      await this.saveState();
    }
  }

  async addRow() {
    this.rows.push([{ flipped: false }]);
    this.render();
    await this.saveState();
  }

  async removeRow(rowIndex) {
    if (this.rows.length > 1 || this.rows[0].length > 1) {
      this.rows.splice(rowIndex, 1);
      if (this.rows.length === 0) {
        this.rows = [[{ flipped: false }]];
      }
      this.render();
      await this.saveState();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          box-sizing: border-box;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 12px;
          padding: 20px;
          background: var(--color-background, white);
        }

        .row-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 10px;
          padding: 10px;
        }

        .coins {
          display: flex;
          gap: 10px;
          flex: 1;
          flex-wrap: nowrap;
          min-width: 0;
          align-items: center;
        }

        .coin {
          flex: 1 1 0;
          aspect-ratio: 1 / 1;
          max-width: 60px;
          max-height: 60px;
          min-width: 30px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          font-size: clamp(1em, 2vw, 2em);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        }

        .coin:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .coin:active {
          transform: scale(0.95);
        }

        .coin.flipped {
          background: linear-gradient(135deg, #C0C0C0 0%, #808080 100%);
        }

        .coin.flip-animation {
          animation: flip 0.6s ease;
        }

        @keyframes flip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(360deg); }
        }

        .controls {
          display: flex;
          gap: 8px;
          flex-direction: row;
          justify-content: center;
        }

        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          font-weight: bold;
          transition: all 0.2s ease;
          white-space: nowrap;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-add {
          background: #10b981;
          color: white;
        }

        .btn-add:hover {
          background: #059669;
        }

        .btn-remove {
          background: #ef4444;
          color: white;
        }

        .btn-remove:hover {
          background: #dc2626;
        }

        .btn-remove:disabled {
          background: var(--color-spacer, #a4a4a4);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .btn-remove:disabled:hover {
          transform: none;
          box-shadow: none;
        }

        .global-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }

        .btn-large {
          padding: 12px 24px;
          font-size: 1em;
          min-width: 150px;
        }

        h1 {
          text-align: center;
          color: var(--color-text, black);
          margin-bottom: 15px;
        }
      </style>

      <div class="container">
        ${this.rows
          .map(
            (row, rowIndex) => `
          <div class="row-container">
            <div class="controls">
              <button 
                class="btn btn-add" 
                onclick="this.getRootNode().host.addCoin(${rowIndex})"
                title="Münze hinzufügen"
              >
                →
              </button>
              <button 
                class="btn btn-remove" 
                onclick="this.getRootNode().host.removeCoin(${rowIndex})"
                ${row.length === 1 && this.rows.length === 1 ? "disabled" : ""}
                title="Münze entfernen"
              >
                ←
              </button>
              <button 
                class="btn btn-remove" 
                onclick="this.getRootNode().host.removeRow(${rowIndex})"
                ${this.rows.length === 1 && row.length === 1 ? "disabled" : ""}
                title="Reihe löschen"
              >
                ✕
              </button>
            </div>
            <div class="coins">
              ${row
                .map(
                  (coin, coinIndex) => `
                <button 
                  class="coin ${coin.flipped ? "flipped" : ""} ${coin.justFlipped ? "flip-animation" : ""}" 
                  onclick="this.getRootNode().host.flipCoin(${rowIndex}, ${coinIndex})"
                  title="Klicken zum Umdrehen"
                >
                  ${coin.flipped ? "⚪" : "🟡"}
                </button>
              `,
                )
                .join("")}
            </div>
          </div>
        `,
          )
          .join("")}

        <div class="global-controls">
          <button 
            class="btn btn-add btn-large" 
            onclick="this.getRootNode().host.addRow()"
          >
            ➕ Neue Reihe
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("coin-rows", CoinRows);
