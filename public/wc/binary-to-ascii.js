class BinaryToAscii extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.mode = "ascii"; // "ascii" or "unicode"
    this.bits = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  async connectedCallback() {
    const modeAttr = this.getAttribute("mode");
    if (modeAttr === "unicode") {
      this.mode = "unicode";
      this.bits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    await this.loadState();
    this.render();
    this.attachEventListeners();
    this.updateDisplay();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        if (state.bits) {
          // Ensure bits array matches current mode
          if (this.mode === "unicode" && state.bits.length === 16) {
            this.bits = state.bits;
          } else if (this.mode === "ascii" && state.bits.length === 8) {
            this.bits = state.bits;
          }
        }
      }
    } catch (error) {
      console.error("Failed to load binary-to-ascii state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          bits: this.bits,
        }),
      });
    } catch (error) {
      console.error("Failed to save binary-to-ascii state:", error);
    }
  }

  async toggleBit(index) {
    // In ASCII mode, first bit is locked. In Unicode mode, all bits are clickable
    if (this.mode === "ascii" && index === 0) return;
    
    this.bits[index] = this.bits[index] === 0 ? 1 : 0;
    this.updateDisplay();
    await this.saveState();
  }

  binaryToDecimal() {
    const bitLength = this.bits.length;
    return this.bits.reduce((acc, bit, index) => {
      return acc + bit * Math.pow(2, bitLength - 1 - index);
    }, 0);
  }

  getCharacter() {
    const decimal = this.binaryToDecimal();
    if (decimal === 0) return "";
    
    // In ASCII mode, show control characters
    if (this.mode === "ascii" && (decimal < 32 || decimal === 127)) {
      return `[${this.getControlCharName(decimal)}]`;
    }
    
    return String.fromCharCode(decimal);
  }

  getControlCharName(code) {
    const controlChars = {
      0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
      8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
      16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB",
      24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US",
      127: "DEL"
    };
    return controlChars[code] || "?";
  }

  updateDisplay() {
    this.bits.forEach((bit, index) => {
      const bitElement = this.shadowRoot.querySelector(`[data-bit="${index}"]`);
      bitElement.textContent = bit;
      const isDisabled = this.mode === "ascii" && index === 0;
      bitElement.className = `bit ${bit === 1 ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
    });

    const decimal = this.binaryToDecimal();
    this.shadowRoot.querySelector("#decimal-value").textContent = decimal;
    this.shadowRoot.querySelector("#char-display").textContent = this.getCharacter();
    
    // Update hex display for unicode mode
    if (this.mode === "unicode") {
      const hexValue = decimal.toString(16).toUpperCase().padStart(4, '0');
      this.shadowRoot.querySelector("#hex-value").textContent = `U+${hexValue}`;
    }
  }

  attachEventListeners() {
    this.shadowRoot.querySelectorAll(".bit").forEach((bitElement, index) => {
      bitElement.addEventListener("click", () => this.toggleBit(index));
    });
  }

  render() {
    const isUnicode = this.mode === "unicode";
    const title = isUnicode ? "Binär zu Unicode" : "Binär zu ASCII";
    const bitCount = this.bits.length;
    
    // Generate bit labels
    const labels = [];
    for (let i = bitCount - 1; i >= 0; i--) {
      const superscript = i.toString().split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]).join('');
      labels.push(`2${superscript}`);
    }
    
    const infoText = isUnicode 
      ? "💡 Alle 16 Bits können angeklickt werden. Unicode unterstützt über 143.000 Zeichen."
      : "💡 Das erste Bit (2⁷) ist fixiert auf 0, da ASCII nur 7 Bit verwendet.<br>Klicke auf die anderen Bits, um sie zu ändern.";
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: ${isUnicode ? '900px' : '600px'};
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
        }

        .container {
          background: var(--color-brand, #007864);
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          color: var(--color-brand-text, white);
        }

        h2 {
          text-align: center;
          margin: 0 0 25px 0;
          font-size: 1.5em;
        }

        .binary-display {
          display: flex;
          justify-content: center;
          gap: ${isUnicode ? '4px' : '8px'};
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .bit {
          width: ${isUnicode ? '40px' : '50px'};
          min-width: ${isUnicode ? '40px' : '50px'};
          height: ${isUnicode ? '40px' : '50px'};
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 8px;
          font-size: ${isUnicode ? '1.2em' : '1.5em'};
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          user-select: none;
          flex-shrink: 0;
        }

        .bit:hover:not(.disabled) {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .bit.active {
          background: rgba(255, 255, 255, 0.9);
          color: var(--color-brand, #007864);
          border-color: white;
        }

        .bit.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(0, 0, 0, 0.2);
        }

        .bit:active:not(.disabled) {
          transform: scale(0.95);
        }

        .results {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .result-box {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .result-label {
          font-size: 0.9em;
          opacity: 0.9;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .result-value {
          font-size: 2.5em;
          font-weight: bold;
          font-family: 'Courier New', monospace;
        }

        #char-display {
          min-height: 1.2em;
        }

        .info-text {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 15px;
          font-size: 0.9em;
          text-align: center;
          margin-top: 20px;
          line-height: 1.5;
        }

        .bit-labels {
          display: flex;
          justify-content: center;
          gap: ${isUnicode ? '4px' : '8px'};
          margin-bottom: 5px;
          font-size: ${isUnicode ? '0.65em' : '0.75em'};
          opacity: 0.8;
          flex-wrap: wrap;
        }

        .bit-label {
          width: ${isUnicode ? '40px' : '50px'};
          min-width: ${isUnicode ? '40px' : '50px'};
          text-align: center;
          font-family: 'Courier New', monospace;
          flex-shrink: 0;
        }

        .results-grid {
          display: grid;
          grid-template-columns: ${isUnicode ? '1fr 1fr' : '1fr'};
          gap: 15px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          :host {
            max-width: 100%;
          }

          .bit {
            width: ${isUnicode ? '30px' : '40px'};
            min-width: ${isUnicode ? '30px' : '40px'};
            height: ${isUnicode ? '30px' : '40px'};
            font-size: ${isUnicode ? '1em' : '1.2em'};
          }

          .bit-label {
            width: ${isUnicode ? '30px' : '40px'};
            min-width: ${isUnicode ? '30px' : '40px'};
            font-size: 0.6em;
          }

          .result-value {
            font-size: 2em;
          }

          .results-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="container">
        <h2>${title}</h2>
        
        <div class="bit-labels">
          ${labels.map(label => `<div class="bit-label">${label}</div>`).join('')}
        </div>

        <div class="binary-display">
          ${this.bits.map((bit, index) => {
            const isDisabled = this.mode === "ascii" && index === 0;
            return `<div class="bit ${isDisabled ? 'disabled' : ''}" data-bit="${index}">${bit}</div>`;
          }).join('')}
        </div>

        <div class="results">
          <div class="results-grid">
            <div class="result-box">
              <div class="result-label">Dezimalwert</div>
              <div class="result-value" id="decimal-value">0</div>
            </div>
            ${isUnicode ? `
            <div class="result-box">
              <div class="result-label">Hexadezimal</div>
              <div class="result-value" id="hex-value">U+0000</div>
            </div>
            ` : ''}
          </div>

          <div class="result-box">
            <div class="result-label">${isUnicode ? 'Unicode-Zeichen' : 'ASCII-Zeichen'}</div>
            <div class="result-value" id="char-display"></div>
          </div>
        </div>

        <div class="info-text">
          ${infoText}
        </div>
      </div>
    `;
  }
}

customElements.define("binary-to-ascii", BinaryToAscii);
