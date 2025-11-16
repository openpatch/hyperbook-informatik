class CategoryDrag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.items = [];
    this.categories = [];
    this.placements = {};
    this.checked = false;
    this.touchDraggedItem = null;
    this.touchDraggedElement = null;
  }

  async connectedCallback() {
    await this.loadState();
    this.initializeGame();
    this.render();
    this.setupTouchHandlers();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.placements = state.placements || {};
        this.checked = state.checked || false;
      }
    } catch (error) {
      console.error("Failed to load category drag state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          placements: this.placements,
          checked: this.checked,
        }),
      });
    } catch (error) {
      console.error("Failed to save category drag state:", error);
    }
  }

  initializeGame() {
    // Parse items: format "image1.png:category1,image2.png:category2"
    const itemsAttr = this.getAttribute("items");
    if (itemsAttr) {
      const itemPairs = itemsAttr.split(",").map((s) => s.trim());
      this.items = itemPairs.map((pair, index) => {
        const [image, category] = pair.split(":").map((s) => s.trim());
        return {
          id: `item-${index}`,
          image,
          correctCategory: category,
        };
      });
    }

    // Parse categories: format "category1:Category 1,category2:Category 2"
    const categoriesAttr = this.getAttribute("categories");
    if (categoriesAttr) {
      const categoryPairs = categoriesAttr.split(",").map((s) => s.trim());
      this.categories = categoryPairs.map((pair, index) => {
        const parts = pair.split(":");
        const id = parts[0].trim();
        const label = parts[1] ? parts[1].trim() : id;
        return { id, label };
      });
    }

    // Limit to 4 categories
    this.categories = this.categories.slice(0, 4);
  }

  handleDragStart(e, itemId) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", itemId);
    e.target.style.opacity = "0.5";
  }

  handleDragEnd(e) {
    e.target.style.opacity = "1";
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  handleDragEnter(e) {
    const dropZone = e.currentTarget;
    if (dropZone.classList.contains("drop-zone")) {
      dropZone.classList.add("drag-over");
    }
  }

  handleDragLeave(e) {
    const dropZone = e.currentTarget;
    if (dropZone.classList.contains("drop-zone")) {
      dropZone.classList.remove("drag-over");
    }
  }

  handleDrop(e, categoryId) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    dropZone.classList.remove("drag-over");

    const itemId = e.dataTransfer.getData("text/plain");
    this.moveItemToCategory(itemId, categoryId);
  }

  handleCheck() {
    this.checked = true;
    this.saveState();
    this.render();
  }

  async handleReset() {
    this.placements = {};
    this.checked = false;
    await this.saveState();
    this.render();
  }

  isCorrectPlacement(itemId, categoryId) {
    const item = this.items.find((i) => i.id === itemId);
    return item && item.correctCategory === categoryId;
  }

  getItemsInCategory(categoryId) {
    return this.placements[categoryId] || [];
  }

  getUnplacedItems() {
    const placedIds = Object.values(this.placements).flat();
    return this.items.filter((item) => !placedIds.includes(item.id));
  }

  setupTouchHandlers() {
    const container = this.shadowRoot.querySelector('.container');
    if (!container) return;

    container.addEventListener('touchstart', (e) => {
      const item = e.target.closest('.item');
      if (!item) return;

      this.touchDraggedItem = item.dataset?.itemId || item.getAttribute('data-item-id');
      this.touchDraggedElement = item;
      item.style.opacity = '0.5';
      e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchmove', (e) => {
      if (!this.touchDraggedItem || !this.touchDraggedElement) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      
      // Remove all drag-over classes
      this.shadowRoot.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
      });
      
      // Add drag-over class to current drop zone
      if (elementBelow) {
        const dropZone = elementBelow.closest('.drop-zone');
        if (dropZone) {
          dropZone.classList.add('drag-over');
        }
      }
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      if (!this.touchDraggedItem || !this.touchDraggedElement) return;

      this.touchDraggedElement.style.opacity = '1';
      
      const touch = e.changedTouches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      
      // Remove all drag-over classes
      this.shadowRoot.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('drag-over');
      });
      
      if (elementBelow) {
        const dropZone = elementBelow.closest('.drop-zone');
        if (dropZone) {
          const categoryId = dropZone.dataset?.categoryId || dropZone.getAttribute('data-category-id');
          if (categoryId) {
            this.moveItemToCategory(this.touchDraggedItem, categoryId);
          }
        }
      }
      
      this.touchDraggedItem = null;
      this.touchDraggedElement = null;
    });
  }

  moveItemToCategory(itemId, categoryId) {
    // Remove item from any previous placement
    Object.keys(this.placements).forEach((catId) => {
      this.placements[catId] = this.placements[catId].filter(
        (id) => id !== itemId,
      );
    });

    // Add to new category
    if (!this.placements[categoryId]) {
      this.placements[categoryId] = [];
    }
    this.placements[categoryId].push(itemId);

    this.checked = false;
    this.saveState();
    this.render();
    this.setupTouchHandlers();
  }

  render() {
    const unplacedItems = this.getUnplacedItems();
    let totalCorrect = 0;
    let totalPlaced = 0;

    if (this.checked) {
      Object.keys(this.placements).forEach((categoryId) => {
        this.placements[categoryId].forEach((itemId) => {
          totalPlaced++;
          if (this.isCorrectPlacement(itemId, categoryId)) {
            totalCorrect++;
          }
        });
      });
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          margin: 0 auto;
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 12px;
          padding: 20px;
          background: var(--color-background, white);
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
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

        .btn-check {
          background: var(--color-brand, #3b82f6);
          color: white;
        }

        .btn-reset {
          background: #6b7280;
          color: white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
          transform: translateY(0);
        }

        .feedback {
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 8px;
          text-align: center;
          font-weight: bold;
          display: ${this.checked ? "block" : "none"};
          background: ${totalCorrect === totalPlaced && totalPlaced > 0 ? "#10b981" : "#f59e0b"};
          color: white;
        }

        .items-pool {
          margin-bottom: 20px;
          padding: 15px;
          background: var(--color-nav, #f5f5f5);
          border-radius: 8px;
          min-height: 100px;
        }

        .items-pool-title {
          font-weight: bold;
          margin-bottom: 10px;
          color: var(--color-text, black);
        }

        .items-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .item {
          cursor: move;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-background, white);
          border: 2px solid var(--color-spacer, #a4a4a4);
          transition: all 0.2s ease;
        }

        .item:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .item img {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .category {
          border: 2px solid var(--color-nav-border, #3c3c3c);
          border-radius: 8px;
          padding: 15px;
          background: var(--color-nav, #f5f5f5);
        }

        .category-title {
          font-weight: bold;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--color-spacer, #a4a4a4);
          color: var(--color-text, black);
        }

        .drop-zone {
          min-height: 120px;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-content: flex-start;
          border: 2px solid transparent;
          border-radius: 8px;
        }

        .drop-zone.drag-over {
          background: var(--color-nav, #f5f5f5);
          border-color: var(--color-brand, #007864);
          border-style: dashed;
        }

        .placed-item {
          position: relative;
        }

        .placed-item.correct::after {
          content: '✓';
          position: absolute;
          top: 5px;
          right: 5px;
          background: #10b981;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        .placed-item.incorrect::after {
          content: '✗';
          position: absolute;
          top: 5px;
          right: 5px;
          background: #ef4444;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .categories {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="container">

        <div class="feedback">
          ${
            totalCorrect === totalPlaced && totalPlaced > 0
              ? "🎉 Perfekt! Alle Bilder sind richtig zugeordnet!"
              : `${totalCorrect} von ${totalPlaced} richtig zugeordnet`
          }
        </div>

        <div class="items-pool">
          <div class="items-pool-title">Verfügbare Bilder:</div>
          <div class="items-grid">
            ${unplacedItems
              .map(
                (item) => `
              <div
                class="item"
                draggable="true"
                data-item-id="${item.id}"
                ondragstart="this.getRootNode().host.handleDragStart(event, '${item.id}')"
                ondragend="this.getRootNode().host.handleDragEnd(event)"
              >
                <img src="${item.image}" alt="Item" />
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="categories">
          ${this.categories
            .map(
              (category) => `
            <div class="category">
              <div class="category-title">${category.label}</div>
              <div
                class="drop-zone"
                data-category-id="${category.id}"
                ondragover="this.getRootNode().host.handleDragOver(event)"
                ondragenter="this.getRootNode().host.handleDragEnter(event)"
                ondragleave="this.getRootNode().host.handleDragLeave(event)"
                ondrop="this.getRootNode().host.handleDrop(event, '${category.id}')"
              >
                ${this.getItemsInCategory(category.id)
                  .map((itemId) => {
                    const item = this.items.find((i) => i.id === itemId);
                    const isCorrect = this.isCorrectPlacement(
                      itemId,
                      category.id,
                    );
                    const statusClass = this.checked
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : "";
                    return `
                      <div
                        class="item placed-item ${statusClass}"
                        draggable="true"
                        data-item-id="${itemId}"
                        ondragstart="this.getRootNode().host.handleDragStart(event, '${itemId}')"
                        ondragend="this.getRootNode().host.handleDragEnd(event)"
                      >
                        <img src="${item.image}" alt="Item" />
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="actions">
          <button class="btn btn-check" onclick="this.getRootNode().host.handleCheck()">
            Überprüfen
          </button>
          <button class="btn btn-reset" onclick="this.getRootNode().host.handleReset()">
            Zurücksetzen
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("category-drag", CategoryDrag);
