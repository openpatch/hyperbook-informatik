class PixelMagnifier extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.zoom = 1;
  }

  connectedCallback() {
    this.render();
  }

  setZoom(value) {
    this.zoom = value;
    this.updateZoom();
  }

  updateZoom() {
    const img = this.shadowRoot.querySelector("img");
    const label = this.shadowRoot.querySelector(".zoom-label");

    if (img) {
      img.style.transform = `scale(${this.zoom})`;
    }

    if (label) {
      label.textContent = `Vergrößerung: ${this.zoom}x`;
    }
  }

  render() {
    const imageSrc =
      this.getAttribute("src") ||
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2NkYGD4z4AHMDGQCIQ1MDAw/CcXI6kgugK8YYJPAQCu9AIa8fNVdwAAAABJRU5ErkJggg==";
    const maxSize = 200;

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

        .zoom-control {
          display: flex;
          gap: 10px;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }

        .zoom-label {
          font-weight: bold;
          min-width: 120px;
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
          background: var(--color-nav, #f5f5f5);
          border-radius: 8px;
          border: 1px solid var(--color-spacer, #a4a4a4);
          padding: 20px;
          min-height: 300px;
          position: relative;
        }

        .image-wrapper {
          position: relative;
          display: inline-block;
        }

        img {
          display: block;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          transform: scale(${this.zoom});
          transform-origin: center center;
        }

      </style>

      <div class="container">
        <div class="controls">
          <div class="zoom-control">
            <label class="zoom-label">Vergrößerung: ${this.zoom}x</label>
            <input 
              type="range" 
              min="1" 
              max="20" 
              step="1" 
              value="${this.zoom}"
              oninput="this.getRootNode().host.setZoom(parseInt(this.value))"
            />
          </div>
        </div>

        <div class="image-container">
          <div class="image-wrapper">
            <img src="${imageSrc}" alt="Bild zum Vergrößern" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("pixel-magnifier", PixelMagnifier);
