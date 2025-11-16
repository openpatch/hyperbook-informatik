class PixelMinifier extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.scale = 100;
  }

  connectedCallback() {
    this.render();
  }

  setScale(value) {
    this.scale = value;
    this.updateScale();
  }

  updateScale() {
    const img = this.shadowRoot.querySelector("img");
    const label = this.shadowRoot.querySelector(".scale-label");

    if (img) {
      img.style.width = `${this.scale}%`;
    }

    if (label) {
      label.textContent = `Größe: ${this.scale}%`;
    }
  }

  render() {
    const imageSrc =
      this.getAttribute("src") ||
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2NkYGD4z4AHMDGQCIQ1MDAw/CcXI6kgugK8YYJPAQCu9AIa8fNVdwAAAABJRU5ErkJggg==";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
        }

        .container {
          margin: 0 auto;
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 12px;
          padding: 20px;
          background: var(--color-background, white);
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
          align-items: center;
        }

        .scale-control {
          display: flex;
          gap: 10px;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }

        .scale-label {
          font-weight: bold;
          min-width: 100px;
          color: var(--color-text, black);
        }

        input[type="range"] {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: var(--color-spacer, #a4a4a4);
          outline: none;
          -webkit-appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-brand, #007864);
          cursor: pointer;
          border: none;
        }

        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
          min-height: 300px;
          position: relative;
        }

        .image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        img {
          display: block;
          width: ${this.scale}%;
          border-radius: 8px;
          height: auto;
          border: 1px solid #9ca3af;
          transition: width 0.1s ease;
        }

      </style>

      <div class="container">
        <div class="controls">
          <div class="scale-control">
            <label class="scale-label">Größe: ${this.scale}%</label>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5" 
              value="${this.scale}"
              oninput="this.getRootNode().host.setScale(parseInt(this.value))"
            />
          </div>
        </div>

        <div class="image-container">
          <div class="image-wrapper">
            <img src="${imageSrc}" alt="Bild zum Verkleinern" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("pixel-minifier", PixelMinifier);
