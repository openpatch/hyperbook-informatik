class BitRows extends HTMLElement {
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
      console.error("Failed to load bit-rows state:", error);
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
      console.error("Failed to save bit-rows state:", error);
    }
  }

  async flipBit(rowIndex, bitIndex) {
    this.rows[rowIndex][bitIndex].flipped =
      !this.rows[rowIndex][bitIndex].flipped;
    this.render();
    await this.saveState();
  }

  async addBit(rowIndex) {
    this.rows[rowIndex].push({ flipped: false });
    this.render();
    await this.saveState();
  }

  async removeBit(rowIndex) {
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
          font-family: Arial, sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .row-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
          padding: 10px;
        }

        .bits {
          display: flex;
          gap: 10px;
          flex: 1;
          flex-wrap: wrap;
        }

        .bit {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 2.5em;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
        }

        .bit:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .bit:active {
          transform: scale(0.95);
        }

        .bit.flipped {
          background: linear-gradient(135deg, #6b7280 0%, #374151 100%);
        }

        .bit.flip-animation {
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
          background: #d1d5db;
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
          color: #374151;
          margin-bottom: 15px;
        }
      </style>

      <div class="container">
        ${this.rows
          .map(
            (row, rowIndex) => `
          <div class="row-container">
            <div class="bits">
              ${row
                .map(
                  (bit, bitIndex) => `
                <button 
                  class="bit ${bit.flipped ? "flipped" : ""} ${bit.justFlipped ? "flip-animation" : ""}" 
                  onclick="this.getRootNode().host.flipBit(${rowIndex}, ${bitIndex})"
                  title="Klicken zum Umschalten"
                >
                  ${bit.flipped ? "1" : "0"}
                </button>
              `,
                )
                .join("")}
            </div>
            <div class="controls">
              <button 
                class="btn btn-add" 
                onclick="this.getRootNode().host.addBit(${rowIndex})"
                title="Bit hinzufügen"
              >
                →
              </button>
              <button 
                class="btn btn-remove" 
                onclick="this.getRootNode().host.removeBit(${rowIndex})"
                ${row.length === 1 && this.rows.length === 1 ? "disabled" : ""}
                title="Bit entfernen"
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

customElements.define("bit-rows", BitRows);
