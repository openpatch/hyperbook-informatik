class CardMatching extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cards = [];
    this.connections = [];
    this.draggedCard = null;
    this.dragOffset = { x: 0, y: 0 };
    this.wasDragging = false;
  }

  async connectedCallback() {
    await this.loadState();
    if (this.cards.length === 0) {
      this.parseCards();
    }
    this.render();
    this.setupEventListeners();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.cards = state.cards || [];
        this.connections = state.connections || [];
      }
    } catch (error) {
      console.error("Failed to load card matching state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          cards: this.cards,
          connections: this.connections,
        }),
      });
    } catch (error) {
      console.error("Failed to save card matching state:", error);
    }
  }

  parseCards() {
    const pairs = this.getAttribute("pairs") || "[]";
    try {
      const parsedPairs = JSON.parse(pairs);
      this.cards = [];

      const cardHeight = 100;
      const cardSpacing = 20;
      const containerHeight = 600;
      const totalCardsHeight =
        parsedPairs.length * cardHeight +
        (parsedPairs.length - 1) * cardSpacing;
      const startY = Math.max(50, (containerHeight - totalCardsHeight) / 2);

      const bluePositions = [];
      const orangePositions = [];

      for (let i = 0; i < parsedPairs.length; i++) {
        bluePositions.push({
          x: 50,
          y: startY + i * (cardHeight + cardSpacing),
        });
        orangePositions.push({
          x: 450,
          y: startY + i * (cardHeight + cardSpacing),
        });
      }

      const shuffledOrange = [...orangePositions].sort(
        () => Math.random() - 0.5,
      );

      parsedPairs.forEach((pair, index) => {
        const blueData = this.parseContent(pair.blue);
        const orangeData = this.parseContent(pair.orange);

        this.cards.push({
          id: `blue-${index}`,
          type: "blue",
          content: blueData.content,
          image: blueData.image,
          correctMatch: `orange-${index}`,
          position: bluePositions[index],
          connectedTo: null,
        });

        this.cards.push({
          id: `orange-${index}`,
          type: "orange",
          content: orangeData.content,
          image: orangeData.image,
          correctMatch: `blue-${index}`,
          position: shuffledOrange[index],
          connectedTo: null,
        });
      });
    } catch (e) {
      console.error("Error parsing pairs:", e);
    }
  }

  parseContent(value) {
    if (!value) return { content: null, image: null };

    if (value.startsWith("text:")) {
      return { content: value.substring(5), image: null };
    } else if (value.startsWith("image:")) {
      return { content: null, image: value.substring(6) };
    } else {
      return { content: value, image: null };
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-height: 500px;
        }

        .container {
          position: relative;
          width: 100%;
          height: 600px;
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          user-select: none;
        }

        svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .card {
          position: absolute;
          width: 150px;
          padding: 20px 15px 15px 15px;
          background: white;
          border: 2px solid #333;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          cursor: move;
          z-index: 2;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card.dragging {
          opacity: 0.8;
          z-index: 1000;
        }

        .card.connecting {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .pin {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          transition: transform 0.3s;
        }

        .pin.blue {
          background: #2196F3;
        }

        .pin.orange {
          background: #FF9800;
        }

        .card-content {
          font-size: 14px;
          word-wrap: break-word;
          text-align: center;
        }

        .card-image {
          width: 100%;
          max-height: 80px;
          object-fit: contain;
          margin-bottom: 5px;
          cursor: pointer;
        }

        .card-image:hover {
          opacity: 0.8;
        }

        .lightbox {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 3000;
          justify-content: center;
          align-items: center;
        }

        .lightbox.show {
          display: flex;
        }

        .lightbox-content {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 40px;
          color: white;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          background: none;
          border: none;
          padding: 10px;
        }

        .lightbox-close:hover {
          color: #ccc;
        }

        .tape {
          cursor: pointer;
          pointer-events: all;
          transition: opacity 0.2s, fill 0.2s;
        }

        .tape:hover {
          opacity: 0.9;
          fill: rgba(255, 200, 80, 0.8);
        }

        .tape:active {
          fill: rgba(255, 180, 60, 0.9);
        }

        .tape-lines {
          pointer-events: none;
        }

        .check-button {
          position: relative;
          display: block;
          padding: 10px 20px;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
          transition: all 0.3s;
        }

        .check-button:hover {
          background: linear-gradient(135deg, #45a049 0%, #4CAF50 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5);
        }

        .check-button:active {
          transform: translateY(0) scale(0.95);
          box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3);
        }

        .button-container {
          display: flex;
          gap: 15px;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .reset-button {
          position: relative;
          padding: 8px 20px;
          height: 100%;
          background: #e0e0e0;
          color: #666;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
        }

        .reset-button:hover {
          background: #d0d0d0;
          color: #555;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .reset-button:active {
          transform: translateY(0) scale(0.95);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 30px 50px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border: 3px solid #FF8C00;
          border-radius: 15px;
          font-size: 28px;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          box-shadow: 0 8px 30px rgba(255, 165, 0, 0.5);
          z-index: 2000;
          display: none;
        }

        .message.show {
          display: block;
          animation: celebrationPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes celebrationPop {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.3) rotate(-10deg); 
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1) rotate(0deg); 
          }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #f0f;
          animation: confettiFall 3s linear;
        }

        @keyframes confettiFall {
          to {
            transform: translateY(600px) rotate(360deg);
            opacity: 0;
          }
        }

        .connection-line {
          pointer-events: none;
        }
      </style>

      <div class="container">
        <svg id="connections"></svg>
        <div id="cards"></div>
        <div class="message" id="message">Glückwunsch! Alle Zuordnungen sind richtig!</div>
      </div>
      <div class="button-container">
        <button class="check-button">Prüfen</button>
        <button class="reset-button">Zurücksetzen</button>
      </div>
      <div class="lightbox" id="lightbox">
        <button class="lightbox-close" id="lightbox-close">&times;</button>
        <img class="lightbox-content" id="lightbox-image">
      </div>
    `;

    this.updateCards();
  }

  updateCards() {
    const cardsContainer = this.shadowRoot.getElementById("cards");
    cardsContainer.innerHTML = "";

    this.cards.forEach((card) => {
      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.dataset.id = card.id;
      cardEl.style.left = `${card.position.x}px`;
      cardEl.style.top = `${card.position.y}px`;

      let contentHTML = "";
      if (card.image) {
        contentHTML = `<img src="${card.image}" class="card-image" data-image="${card.image}" alt="${card.content || ""}">`;
      }
      if (card.content) {
        contentHTML += `<div class="card-content">${card.content}</div>`;
      }

      cardEl.innerHTML = `
        <div class="pin ${card.type}"></div>
        ${contentHTML}
      `;

      cardsContainer.appendChild(cardEl);

      card.height = cardEl.offsetHeight || 80;
    });

    this.updateConnections();
    this.saveState();
  }

  updateConnections() {
    const svg = this.shadowRoot.getElementById("connections");
    svg.innerHTML = "";

    this.connections.forEach((conn, index) => {
      const card1 = this.cards.find((c) => c.id === conn.card1);
      const card2 = this.cards.find((c) => c.id === conn.card2);

      if (card1 && card2) {
        const blueCard = card1.type === "blue" ? card1 : card2;
        const orangeCard = card1.type === "blue" ? card2 : card1;

        const blueHeight = blueCard.height || 80;
        const orangeHeight = orangeCard.height || 80;

        const tapeOverlap = 15;
        const x = blueCard.position.x + 40;
        const y = blueCard.position.y + blueHeight - tapeOverlap;
        const width = 100;
        const height =
          orangeCard.position.y -
          (blueCard.position.y + blueHeight) +
          2 * tapeOverlap;

        const tape = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect",
        );
        tape.setAttribute("x", x);
        tape.setAttribute("y", y);
        tape.setAttribute("width", width);
        tape.setAttribute("height", height);
        tape.setAttribute("fill", "rgba(255, 220, 100, 0.7)");
        tape.setAttribute("stroke", "rgba(200, 160, 50, 0.5)");
        tape.setAttribute("stroke-width", "2");
        tape.setAttribute("rx", "3");
        tape.setAttribute("class", "tape");
        tape.dataset.connectionIndex = index;
        svg.appendChild(tape);

        const tapeLines = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g",
        );
        tapeLines.setAttribute("class", "tape-lines");
        const numLines = Math.max(3, Math.floor(height / 15));
        for (let i = 0; i < numLines; i++) {
          const tapeLine = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
          );
          const lineSpacing = width / (numLines + 1);
          tapeLine.setAttribute("x1", x + 15 + i * lineSpacing);
          tapeLine.setAttribute("y1", y);
          tapeLine.setAttribute("x2", x + 15 + i * lineSpacing);
          tapeLine.setAttribute("y2", y + height);
          tapeLine.setAttribute("stroke", "rgba(200, 160, 50, 0.2)");
          tapeLine.setAttribute("stroke-width", "1");
          tapeLines.appendChild(tapeLine);
        }
        svg.appendChild(tapeLines);
      }
    });
  }

  setupEventListeners() {
    const cardsContainer = this.shadowRoot.getElementById("cards");
    const container = this.shadowRoot.querySelector(".container");
    const svg = this.shadowRoot.getElementById("connections");
    const checkButton = this.shadowRoot.querySelector(".check-button");
    const resetButton = this.shadowRoot.querySelector(".reset-button");
    const lightbox = this.shadowRoot.getElementById("lightbox");
    const lightboxImage = this.shadowRoot.getElementById("lightbox-image");
    const lightboxClose = this.shadowRoot.getElementById("lightbox-close");

    resetButton.addEventListener("click", () => {
      this.resetGame();
    });

    cardsContainer.addEventListener("click", (e) => {
      const image = e.target.closest(".card-image");
      if (image && !this.wasDragging) {
        e.stopPropagation();
        lightboxImage.src = image.dataset.image;
        lightbox.classList.add("show");
      }
      this.wasDragging = false;
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("show");
      }
    });

    cardsContainer.addEventListener("mousedown", (e) => {
      const cardEl = e.target.closest(".card");
      if (!cardEl) return;

      this.wasDragging = false;
      this.draggedCard = this.cards.find((c) => c.id === cardEl.dataset.id);
      const rect = cardEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      this.dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      cardEl.classList.add("dragging");
    });

    container.addEventListener("mousemove", (e) => {
      if (!this.draggedCard) return;

      this.wasDragging = true;
      const containerRect = container.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - this.dragOffset.x;
      const newY = e.clientY - containerRect.top - this.dragOffset.y;

      const deltaX = newX - this.draggedCard.position.x;
      const deltaY = newY - this.draggedCard.position.y;

      this.draggedCard.position.x = newX;
      this.draggedCard.position.y = newY;

      if (this.draggedCard.connectedTo) {
        const connectedCard = this.cards.find(
          (c) => c.id === this.draggedCard.connectedTo,
        );
        if (connectedCard) {
          connectedCard.position.x += deltaX;
          connectedCard.position.y += deltaY;
        }
      }

      this.updateCards();
    });

    container.addEventListener("mouseup", (e) => {
      if (!this.draggedCard) return;

      const cardEl = this.shadowRoot.querySelector(
        `[data-id="${this.draggedCard.id}"]`,
      );
      if (cardEl) {
        cardEl.classList.remove("dragging");
      }

      const targetCard = this.cards.find((card) => {
        if (card.id === this.draggedCard.id) return false;
        if (card.type === this.draggedCard.type) return false;
        if (this.draggedCard.connectedTo) return false;
        if (card.connectedTo) return false;

        const dx1 = this.draggedCard.position.x;
        const dy1 = this.draggedCard.position.y;
        const dw1 = 180;
        const dh1 = 60;

        const dx2 = card.position.x;
        const dy2 = card.position.y;
        const dw2 = 180;
        const dh2 = 60;

        return !(
          dx1 + dw1 < dx2 ||
          dx1 > dx2 + dw2 ||
          dy1 + dh1 < dy2 ||
          dy1 > dy2 + dh2
        );
      });

      if (targetCard) {
        this.createConnection(this.draggedCard.id, targetCard.id);

        const cardEl1 = this.shadowRoot.querySelector(
          `[data-id="${this.draggedCard.id}"]`,
        );
        const cardEl2 = this.shadowRoot.querySelector(
          `[data-id="${targetCard.id}"]`,
        );
        cardEl1?.classList.add("connecting");
        cardEl2?.classList.add("connecting");
        setTimeout(() => {
          cardEl1?.classList.remove("connecting");
          cardEl2?.classList.remove("connecting");
        }, 500);
      }

      this.draggedCard = null;
    });

    svg.addEventListener("click", (e) => {
      const tape = e.target.closest(".tape");
      if (tape) {
        const index = parseInt(tape.dataset.connectionIndex);
        this.removeConnection(index);
      }
    });

    checkButton.addEventListener("click", () => {
      this.checkConnections();
    });
  }

  createConnection(card1Id, card2Id) {
    const card1 = this.cards.find((c) => c.id === card1Id);
    const card2 = this.cards.find((c) => c.id === card2Id);

    if (card1.connectedTo || card2.connectedTo) return;

    this.connections.push({ card1: card1Id, card2: card2Id });
    card1.connectedTo = card2Id;
    card2.connectedTo = card1Id;

    const blueCard = card1.type === "blue" ? card1 : card2;
    const orangeCard = card1.type === "blue" ? card2 : card1;

    const centerX = (blueCard.position.x + orangeCard.position.x) / 2 + 90;
    const centerY = (blueCard.position.y + orangeCard.position.y) / 2;

    const blueHeight = blueCard.height || 80;
    const orangeHeight = orangeCard.height || 80;
    const tapeGap = 10;
    const totalHeight = blueHeight + tapeGap + orangeHeight;

    blueCard.position.x = centerX - 90;
    blueCard.position.y = centerY - totalHeight / 2;

    orangeCard.position.x = centerX - 90;
    orangeCard.position.y = centerY - totalHeight / 2 + blueHeight + tapeGap;

    this.updateCards();
  }

  removeConnection(index) {
    const conn = this.connections[index];
    const card1 = this.cards.find((c) => c.id === conn.card1);
    const card2 = this.cards.find((c) => c.id === conn.card2);

    card1.connectedTo = null;
    card2.connectedTo = null;

    this.connections.splice(index, 1);
    this.updateConnections();
    this.saveState();
  }

  checkConnections() {
    const correctConnections = [];

    this.connections = this.connections.filter((conn, index) => {
      const card1 = this.cards.find((c) => c.id === conn.card1);
      const card2 = this.cards.find((c) => c.id === conn.card2);

      const isCorrect = card1.correctMatch === card2.id;

      if (isCorrect) {
        correctConnections.push(conn);
        return false;
      }
      return true;
    });

    const removedCards = [];
    this.cards = this.cards.filter((card) => {
      const isInCorrectConnection = correctConnections.some(
        (conn) => conn.card1 === card.id || conn.card2 === card.id,
      );

      if (isInCorrectConnection) {
        card.connectedTo = null;
        removedCards.push(card);
      }

      return !isInCorrectConnection;
    });

    this.updateCards();

    if (this.cards.length === 0) {
      const message = this.shadowRoot.getElementById("message");
      const container = this.shadowRoot.querySelector(".container");

      this.createConfetti(container);

      message.classList.add("show");
      setTimeout(() => {
        message.classList.remove("show");
        this.cards = removedCards;
        correctConnections.forEach((conn) => {
          const card1 = this.cards.find((c) => c.id === conn.card1);
          const card2 = this.cards.find((c) => c.id === conn.card2);
          card1.connectedTo = conn.card2;
          card2.connectedTo = conn.card1;
        });
        this.connections = correctConnections;
        this.updateCards();
      }, 3000);
    }
  }

  createConfetti(container) {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#FFD93D",
      "#6BCF7F",
    ];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = "-10px";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  }

  resetGame() {
    this.connections = [];
    this.cards = [];
    this.parseCards();
    this.updateCards();
  }
}

customElements.define("card-matching", CardMatching);
