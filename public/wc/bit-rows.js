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

        .bits {
          display: flex;
          gap: 10px;
          flex: 1;
          flex-wrap: wrap;
          min-width: 0;
          align-items: center;
          justify-content: center;
        }

        .bit {
          flex: 1 1 0;
          aspect-ratio: 1 / 1;
          max-width: 60px;
          max-height: 60px;
          min-width: 40px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: clamp(1.2em, 2.5vw, 2.5em);
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          background: var(--color-brand, #007864);
          color: var(--color-brand-text, white);
          touch-action: manipulation;
        }

        .bit:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .bit:active {
          transform: scale(0.95);
        }

        .bit.flipped {
          background: var(--color-spacer, #a4a4a4);
          color: var(--color-text, black);
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
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          font-weight: bold;
          transition: all 0.2s ease;
          white-space: nowrap;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-add {
          background: #10b981;
          color: white;
        }

        .btn-add:hover:not(:disabled) {
          background: #059669;
        }

        .btn-remove {
          background: #ef4444;
          color: white;
        }

        .btn-remove:hover:not(:disabled) {
          background: #dc2626;
        }

        .btn-remove:disabled {
          background: var(--color-text-deactivated, #242428);
          cursor: not-allowed;
          opacity: 0.5;
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
          width: auto;
          height: auto;
        }

        @media (max-width: 768px) {
          :host {
            padding: 10px;
          }

          .container {
            padding: 15px;
          }

          .bit {
            min-width: 35px;
            max-width: 50px;
            max-height: 50px;
          }

          .btn {
            width: 36px;
            height: 36px;
            font-size: 1em;
          }

          .btn-large {
            padding: 10px 20px;
            font-size: 0.9em;
            min-width: 120px;
          }
        }

        @media (max-width: 480px) {
          .bit {
            min-width: 30px;
            max-width: 40px;
            max-height: 40px;
            font-size: 1em;
          }

          .bits {
            gap: 5px;
          }

          .controls {
            gap: 5px;
          }
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
