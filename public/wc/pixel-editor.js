class PixelEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.format = "P1"; // P1, P2, or P3
    this.width = 5;
    this.height = 5;
    this.maxValue = 1; // For P2 and P3
    this.pixels = [];
    this.cellSize = 30;
    this.initialData = null; // Store initial slotted content
    this.hiddenLines = []; // Lines to hide in the editor
    this.readonly = false; // Disable pixel clicking if true
    this.paddingWidth = 1; // Track max number of digits for leading zeros
  }

  async connectedCallback() {
    await this.loadState();
    this.initializeEditor();
    this.render();
    this.attachEventListeners();
    this.updateTextareaWidth();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.format = state.format || "P1";
        this.width = state.width || 5;
        this.height = state.height || 5;
        this.maxValue = state.maxValue || 1;
        this.pixels = state.pixels || [];
        this.hiddenLines = state.hiddenLines || [];
        this.paddingWidth = state.paddingWidth || 1;
      }
    } catch (error) {
      console.error("Failed to load pixel editor state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          format: this.format,
          width: this.width,
          height: this.height,
          maxValue: this.maxValue,
          pixels: this.pixels,
          hiddenLines: this.hiddenLines,
          paddingWidth: this.paddingWidth,
        }),
      });
    } catch (error) {
      console.error("Failed to save pixel editor state:", error);
    }
  }

  initializeEditor() {
    // Check for initial format attribute
    const formatAttr = this.getAttribute("format");
    if (formatAttr) {
      this.format = formatAttr.toUpperCase();
    }

    // Check for readonly attribute
    this.readonly = this.hasAttribute("readonly");

    // Check for initial data in attribute
    const dataAttr = this.getAttribute("data");

    // Check for slotted content (default source code)
    const slotContent = this.textContent.trim();

    // Always store initial data for reset functionality
    if (dataAttr) {
      this.initialData = dataAttr;
    } else if (slotContent) {
      this.initialData = slotContent;
    }

    // Only parse if no saved state was loaded
    if (this.pixels.length === 0) {
      if (dataAttr) {
        this.parseImageData(dataAttr);
      } else if (slotContent) {
        this.parseImageData(slotContent);
      } else {
        // Initialize empty grid
        this.initializeEmptyGrid();
      }
    }
  }

  initializeEmptyGrid() {
    this.pixels = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.format === "P1") {
          this.pixels.push(this.padNumber(0));
        } else if (this.format === "P2") {
          this.pixels.push(this.padNumber(0));
        } else if (this.format === "P3") {
          this.pixels.push([
            this.padNumber(0),
            this.padNumber(0),
            this.padNumber(0),
          ]);
        }
      }
    }
  }

  parseImageData(data) {
    const allLines = data
      .trim()
      .split("\n")
      .map((line) => line.trim());

    // Check for separator ---
    const separatorIndex = allLines.findIndex((line) => line === "---");

    let lines;
    if (separatorIndex !== -1) {
      // Store hidden lines
      this.hiddenLines = allLines.slice(0, separatorIndex);
      // Only parse visible lines after separator
      lines = allLines.slice(separatorIndex + 1);
    } else {
      this.hiddenLines = [];
      lines = allLines;
    }

    // Parse format from hidden lines or first line
    const formatLine =
      this.hiddenLines.length > 0 ? this.hiddenLines[0] : lines[0];
    this.format = formatLine;

    // Parse dimensions from hidden lines or appropriate line
    let dimensionLine;
    let lineOffset = 0;
    if (this.hiddenLines.length > 1) {
      dimensionLine = this.hiddenLines[1];
    } else if (this.hiddenLines.length === 0) {
      dimensionLine = lines[1];
      lineOffset = 2;
    } else {
      dimensionLine = lines[0];
      lineOffset = 1;
    }

    const [width, height] = dimensionLine.split(/\s+/).map(Number);
    this.width = width;
    this.height = height;

    let dataStartIndex = 0;
    if (this.format === "P2" || this.format === "P3") {
      // Parse max value
      if (this.hiddenLines.length > 2) {
        this.maxValue = parseInt(this.hiddenLines[2]);
        dataStartIndex = 0;
      } else if (this.hiddenLines.length === 0) {
        this.maxValue = parseInt(lines[2]);
        dataStartIndex = 3;
      } else if (this.hiddenLines.length === 2) {
        this.maxValue = parseInt(lines[0]);
        dataStartIndex = 1;
      } else {
        this.maxValue = parseInt(lines[1]);
        dataStartIndex = 2;
      }
    } else {
      // P1 format - no max value
      if (this.hiddenLines.length >= 2) {
        dataStartIndex = 0;
      } else if (this.hiddenLines.length === 0) {
        dataStartIndex = 2;
      } else {
        dataStartIndex = 1;
      }
    }

    // Parse pixel data
    const pixelData = lines
      .slice(dataStartIndex)
      .join(" ")
      .split(/\s+/)
      .filter((s) => s.length > 0);

    // Calculate expected number of pixels based on header dimensions
    const expectedPixelCount = this.width * this.height;

    // Detect padding width from existing data
    this.paddingWidth = 1;
    if (this.format === "P1" || this.format === "P2") {
      for (let i = 0; i < expectedPixelCount && i < pixelData.length; i++) {
        this.paddingWidth = Math.max(this.paddingWidth, pixelData[i].length);
      }
    } else if (this.format === "P3") {
      const maxDataIndex = expectedPixelCount * 3;
      for (let i = 0; i < maxDataIndex && i < pixelData.length; i++) {
        this.paddingWidth = Math.max(this.paddingWidth, pixelData[i].length);
      }
    }

    this.pixels = [];
    if (this.format === "P1" || this.format === "P2") {
      // Store original string format to preserve leading zeros
      for (let i = 0; i < expectedPixelCount && i < pixelData.length; i++) {
        this.pixels.push(pixelData[i]);
      }
      // Fill missing pixels with undefined
      while (this.pixels.length < expectedPixelCount) {
        this.pixels.push(undefined);
      }
    } else if (this.format === "P3") {
      // For P3, store as array of strings to preserve leading zeros
      const maxDataIndex = expectedPixelCount * 3;
      for (let i = 0; i < maxDataIndex && i < pixelData.length; i += 3) {
        this.pixels.push([pixelData[i], pixelData[i + 1], pixelData[i + 2]]);
      }
      // Fill missing pixels with undefined
      while (this.pixels.length < expectedPixelCount) {
        this.pixels.push(undefined);
      }
    }
  }

  exportImageData() {
    let output = "";

    // Add hidden lines if they exist
    if (this.hiddenLines.length > 0) {
      output = this.hiddenLines.join("\n") + "\n---\n";
    } else {
      output = `${this.format}\n${this.width} ${this.height}\n`;

      if (this.format === "P2" || this.format === "P3") {
        output += `${this.maxValue}\n`;
      }
    }

    if (this.format === "P1" || this.format === "P2") {
      for (let y = 0; y < this.height; y++) {
        const row = [];
        for (let x = 0; x < this.width; x++) {
          const index = y * this.width + x;
          row.push(this.pixels[index]);
        }
        output += row.join(" ") + "\n";
      }
    } else if (this.format === "P3") {
      for (let y = 0; y < this.height; y++) {
        const row = [];
        for (let x = 0; x < this.width; x++) {
          const index = y * this.width + x;
          const [r, g, b] = this.pixels[index];
          row.push(`${r} ${g} ${b}`);
        }
        output += row.join("   ") + "\n";
      }
    }

    return output.trim();
  }

  padNumber(num) {
    return String(num).padStart(this.paddingWidth, "0");
  }

  handlePixelClick(index) {
    // Don't allow clicking if readonly
    if (this.readonly) {
      return;
    }

    if (this.format === "P1") {
      const newValue = parseInt(this.pixels[index]) === 1 ? 0 : 1;
      this.pixels[index] = this.padNumber(newValue);
    } else if (this.format === "P2") {
      // Cycle through grayscale values
      const currentValue = parseInt(this.pixels[index]);
      const newValue = (currentValue + 1) % (this.maxValue + 1);
      this.pixels[index] = this.padNumber(newValue);
    } else if (this.format === "P3") {
      // For P3, we'll need a color picker - for now toggle between black and white
      const current = this.pixels[index];
      if (
        parseInt(current[0]) === 0 &&
        parseInt(current[1]) === 0 &&
        parseInt(current[2]) === 0
      ) {
        this.pixels[index] = [
          this.padNumber(this.maxValue),
          this.padNumber(this.maxValue),
          this.padNumber(this.maxValue),
        ];
      } else {
        this.pixels[index] = [
          this.padNumber(0),
          this.padNumber(0),
          this.padNumber(0),
        ];
      }
    }

    this.saveState();
    this.updateSourceCode();
    this.updatePixelVisual(index);
  }

  updatePixelVisual(index) {
    const pixel = this.shadowRoot.querySelectorAll(".pixel")[index];
    if (!pixel) return;

    const color = this.getPixelColor(index);
    const value = this.getPixelValue(index);
    pixel.style.backgroundColor = color;
    pixel.title = value;
  }

  updateSourceCode() {
    const textarea = this.shadowRoot.querySelector("#source-code");
    if (textarea) {
      // Only show editable lines (after ---)
      const fullData = this.exportImageData();
      if (this.hiddenLines.length > 0) {
        const separatorIndex = fullData.indexOf("---");
        if (separatorIndex !== -1) {
          // Show only content after the separator
          textarea.value = fullData.substring(separatorIndex + 4).trim();
        } else {
          textarea.value = fullData;
        }
      } else {
        textarea.value = fullData;
      }

      // Update textarea width based on longest line
      this.updateTextareaWidth();
    }
  }

  updateTextareaWidth() {
    const textarea = this.shadowRoot.querySelector("#source-code");
    if (!textarea) return;

    const lines = textarea.value.split("\n");
    const maxLineLength = Math.max(...lines.map((line) => line.length), 1);

    // Calculate width based on character count
    // Use monospace font metrics: approximately 0.6em per character
    const charWidth = 9.6; // pixels per character for 16px monospace font
    const contentWidth = maxLineLength * charWidth + 20; // +20 for padding

    // Calculate minimum width based on grid dimensions
    const gridWidth = this.width * this.cellSize;

    // Use the larger of the two
    const calculatedWidth = Math.max(contentWidth, gridWidth);

    textarea.style.width = `${calculatedWidth}px`;
  }

  handleSourceChange() {
    const textarea = this.shadowRoot.querySelector("#source-code");
    const data = textarea.value.trim();

    // Always update width based on current content
    this.updateTextareaWidth();

    if (data) {
      try {
        // Reconstruct full data with hidden lines if they exist
        let fullData = data;
        if (this.hiddenLines.length > 0) {
          fullData = this.hiddenLines.join("\n") + "\n---\n" + data;
        }
        this.parseImageData(fullData);

        this.saveState();
        this.updateGrid();
      } catch (error) {
        // Silently ignore parse errors while typing
        console.log("Parse error:", error.message);
      }
    }
  }

  updateGrid() {
    const grid = this.shadowRoot.querySelector(".grid");
    if (!grid) return;

    // Update CSS variables that depend on width and height
    this.updateDimensionCSS();

    // Update grid template
    grid.style.gridTemplateColumns = `repeat(${this.width}, ${this.cellSize}px)`;

    // Update format info
    const formatInfo = this.shadowRoot.querySelector(".format-info");
    if (formatInfo) {
      formatInfo.textContent = `Format: ${this.format} | Größe: ${this.width}x${this.height}${this.format !== "P1" ? ` | Max: ${this.maxValue}` : ""}`;
    }

    // Update pixels
    grid.innerHTML = this.pixels
      .map((pixel, index) => {
        const color = this.getPixelColor(index);
        const value = this.getPixelValue(index);
        const isUndefined = pixel === undefined;
        const classes = ["pixel"];
        if (isUndefined) classes.push("undefined");
        if (this.readonly) classes.push("readonly");
        return `
          <div class="${classes.join(" ")}" style="background-color: ${color};" title="${value}">
          </div>
        `;
      })
      .join("");

    // Reattach pixel click listeners
    const pixels = this.shadowRoot.querySelectorAll(".pixel");
    pixels.forEach((pixel, index) => {
      pixel.onclick = () => this.handlePixelClick(index);
    });
  }

  updateDimensionCSS() {
    const sourceCode = this.shadowRoot.querySelector(".source-code");
    if (sourceCode) {
      let sourceCodeHeight = this.height * this.cellSize + 2 * this.cellSize;
      if (this.format === "P2" || this.format === "P3") {
        sourceCodeHeight += this.cellSize; // Extra line for max value
      }
      sourceCodeHeight -= this.hiddenLines.length * this.cellSize;
      sourceCode.style.height = `${sourceCodeHeight}px`;
    }

    // Update textarea width based on content
    this.updateTextareaWidth();

    const gridContainer = this.shadowRoot.querySelector(".grid-container");
    if (gridContainer) {
      gridContainer.style.alignItems =
        this.hiddenLines.length > 0 ? "start" : "end";
    }

    const pixels = this.shadowRoot.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
      pixel.style.width = `${this.cellSize}px`;
      pixel.style.height = `${this.cellSize}px`;
    });
  }

  handleClear() {
    this.initializeEmptyGrid();
    this.saveState();
    this.render();
    this.attachEventListeners();
  }

  handleReset() {
    if (this.initialData) {
      this.parseImageData(this.initialData);
    } else {
      this.initializeEmptyGrid();
    }
    this.saveState();
    this.updateGrid();
    this.updateSourceCode();
  }

  getPixelColor(index) {
    // Check if pixel is undefined
    if (this.pixels[index] === undefined) {
      return "#ffffff"; // White background for undefined pixels
    }

    if (this.format === "P1") {
      return parseInt(this.pixels[index]) === 1 ? "#000000" : "#ffffff";
    } else if (this.format === "P2") {
      const value = parseInt(this.pixels[index]);
      const gray = Math.floor((value / this.maxValue) * 255);
      return `rgb(${gray}, ${gray}, ${gray})`;
    } else if (this.format === "P3") {
      const [r, g, b] = this.pixels[index];
      const rNorm = Math.floor((parseInt(r) / this.maxValue) * 255);
      const gNorm = Math.floor((parseInt(g) / this.maxValue) * 255);
      const bNorm = Math.floor((parseInt(b) / this.maxValue) * 255);
      return `rgb(${rNorm}, ${gNorm}, ${bNorm})`;
    }
    return "#ffffff";
  }

  getPixelValue(index) {
    if (this.pixels[index] === undefined) {
      return "undefined";
    }

    if (this.format === "P1" || this.format === "P2") {
      return this.pixels[index];
    } else if (this.format === "P3") {
      return this.pixels[index].join(",");
    }
    return "";
  }

  attachEventListeners() {
    const pixels = this.shadowRoot.querySelectorAll(".pixel");
    pixels.forEach((pixel, index) => {
      pixel.onclick = () => this.handlePixelClick(index);
    });

    const sourceCode = this.shadowRoot.querySelector("#source-code");
    if (sourceCode) {
      sourceCode.oninput = () => this.handleSourceChange();
    }

    const resetBtn = this.shadowRoot.querySelector("#reset-btn");
    if (resetBtn) {
      resetBtn.onclick = () => this.handleReset();
    }
  }

  render() {
    let sourceCodeHeight = this.height * this.cellSize + 2 * this.cellSize;
    if (this.format === "P2" || this.format === "P3") {
      sourceCodeHeight += this.cellSize; // Extra line for max value
    }
    // remove hidden lines height
    sourceCodeHeight -= this.hiddenLines.length * this.cellSize;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          margin: 0 auto;
          padding: 20px;
        }

        .footer {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .format-info {
          font-size: 0.9em;
          color: #6b7280;
          padding: 5px 10px;
          background: #f3f4f6;
          border-radius: 4px;
        }

        .editor-area {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .source-code {
          height:${sourceCodeHeight}px;
          text-align: right;
        }

        .source-code textarea {
          border: 2px solid #e5e7eb;
          height: 100%;
          border-radius: 8px;
          font-family: monospace;
          font-size: 16px;
          line-height: 30px;
          resize: none;
          padding: 0;
        }

        .grid-container {
          display: flex;
          flex-direction: row;
          align-items: ${this.hiddenLines.length > 0 ? "start" : "end"};
        }

        .grid {
          display: inline-grid;
          grid-template-columns: repeat(${this.width}, ${this.cellSize}px);
          background: #d1d5db;
        }

        .pixel {
          box-sizing: border-box;
          width: ${this.cellSize}px;
          height: ${this.cellSize}px;
          cursor: ${this.readonly ? "default" : "pointer"};
          transition: transform 0.1s ease;
          border: 1px solid #d1d5db;
          position: relative;
        }

        .pixel.undefined::before,
        .pixel.undefined::after {
          content: '';
          position: absolute;
          background-color: #ef4444;
          top: 50%;
          left: 50%;
        }

        .pixel.undefined::before {
          width: 70%;
          height: 2px;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .pixel.undefined::after {
          width: 70%;
          height: 2px;
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .pixel:not(.readonly):hover {
          transform: scale(1.1);
          z-index: 1;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1em;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .btn-secondary {
          font-size: 0.9em;
          color: #6b7280;
          padding: 5px 10px;
          background: #f3f4f6;
          border-radius: 4px;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
          transform: translateY(0);
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: repeat(${this.width}, ${Math.min(this.cellSize, 25)}px);
          }
          
          .pixel {
            width: ${Math.min(this.cellSize, 25)}px;
            height: ${Math.min(this.cellSize, 25)}px;
          }
        }
      </style>

      <div class="container">
        <div class="editor-area">
          <div class="source-code">
            <textarea id="source-code" spellcheck="false">${this.hiddenLines.length > 0 ? this.exportImageData().split("---")[1]?.trim() || "" : this.exportImageData()}</textarea>
          </div>
          
          <div class="grid-container">
            <div class="grid">
              ${this.pixels
                .map((pixel, index) => {
                  const color = this.getPixelColor(index);
                  const value = this.getPixelValue(index);
                  const isUndefined = pixel === undefined;
                  const classes = ["pixel"];
                  if (isUndefined) classes.push("undefined");
                  if (this.readonly) classes.push("readonly");
                  return `
                    <div class="${classes.join(" ")}" style="background-color: ${color};" title="${value}">
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="format-info">
            Format: ${this.format} | Größe: ${this.width}x${this.height}
            ${this.format !== "P1" ? ` | Max: ${this.maxValue}` : ""}
          </div>
          <button id="reset-btn" class="btn btn-secondary">Reset</button>
        </div>
      </div>
    `;
  }
}

customElements.define("pixel-editor", PixelEditor);
