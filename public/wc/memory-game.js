class MemoryGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.cards = [];
    this.flippedCards = [];
    this.matchedCards = [];
    this.moves = 0;
    this.gameStarted = false;
  }

  async connectedCallback() {
    await this.loadState();
    this.initializeGame();
    this.render();
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.cards = state.cards || [];
        this.matchedCards = state.matchedCards || [];
        this.moves = state.moves || 0;
        this.gameStarted = state.gameStarted || false;
      }
    } catch (error) {
      console.error("Failed to load memory game state:", error);
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
          matchedCards: this.matchedCards,
          moves: this.moves,
          gameStarted: this.gameStarted,
        }),
      });
    } catch (error) {
      console.error("Failed to save memory game state:", error);
    }
  }

  initializeGame() {
    if (this.cards.length > 0) return; // Already initialized

    const imagesAttr = this.getAttribute("images");

    let cardContent = [];

    if (imagesAttr) {
      // Use custom images - every two images form a pair
      const imageUrls = imagesAttr.split(",").map((url) => url.trim());

      // Group images in pairs (image 0+1, 2+3, 4+5, etc.)
      for (let i = 0; i < imageUrls.length - 1; i += 2) {
        const pairId = Math.floor(i / 2);
        cardContent.push(
          { type: "image", value: imageUrls[i], pairId },
          { type: "image", value: imageUrls[i + 1], pairId },
        );
      }
    } else {
      // Use default emoji symbols
      const symbols = [
        "🍎",
        "🍌",
        "🍇",
        "🍊",
        "🍓",
        "🍒",
        "🍑",
        "🍍",
        "🥝",
        "🥥",
        "🍉",
        "🍋",
        "🥭",
        "🍏",
        "🫐",
        "🍈",
      ];
      const pairs = this.getAttribute("pairs") || 8;
      const numPairs = Math.min(parseInt(pairs), symbols.length);

      // For emojis, duplicate each symbol to form pairs
      for (let i = 0; i < numPairs; i++) {
        cardContent.push(
          { type: "emoji", value: symbols[i], pairId: i },
          { type: "emoji", value: symbols[i], pairId: i },
        );
      }
    }

    // Shuffle
    this.cards = cardContent
      .map((content, index) => ({ id: index, content, matched: false }))
      .sort(() => Math.random() - 0.5);
  }

  async flipCard(index) {
    if (this.flippedCards.length >= 2) return;
    if (this.flippedCards.includes(index)) return;
    if (this.matchedCards.includes(index)) return;

    this.gameStarted = true;
    this.flippedCards.push(index);
    this.render();

    if (this.flippedCards.length === 2) {
      this.moves++;
      await this.saveState();

      const [firstIndex, secondIndex] = this.flippedCards;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      // Check if the pair IDs match
      if (firstCard.content.pairId === secondCard.content.pairId) {
        // Match found
        setTimeout(() => {
          this.matchedCards.push(firstIndex, secondIndex);
          this.flippedCards = [];
          this.render();
          this.saveState();

          if (this.matchedCards.length === this.cards.length) {
            this.showVictory();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          this.flippedCards = [];
          this.render();
        }, 1000);
      }
    }
  }

  showVictory() {
    setTimeout(() => {
      const container = this.shadowRoot.querySelector(".victory-message");
      if (container) {
        container.style.display = "block";
      }
    }, 300);
  }

  async resetGame() {
    this.cards = [];
    this.flippedCards = [];
    this.matchedCards = [];
    this.moves = 0;
    this.gameStarted = false;
    this.initializeGame();
    await this.saveState();
    this.render();
  }

  render() {
    const gridSize = Math.ceil(Math.sqrt(this.cards.length));

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

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .stats {
          font-size: 1.1em;
          font-weight: bold;
          color: var(--color-text, black);
        }

        .btn-reset {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1em;
          font-weight: bold;
          transition: all 0.2s ease;
          background: var(--color-brand, #007864);
          color: var(--color-brand-text, white);
        }

        .btn-reset:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .btn-reset:active {
          transform: translateY(0);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(${gridSize}, 1fr);
          margin: 0 auto;
          gap: 10px;
          margin-bottom: 20px;
          max-width: ${gridSize * 190}px;
          justify-items: center;
        }

        .card {
          aspect-ratio: 1 / 1;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          min-height: 60px;
          width: 100%;
          max-width: 180px;
          perspective: 1000px;
          background: transparent;
          padding: 0;
          margin: 0 auto;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .card.flipped .card-inner,
        .card.matched .card-inner {
          transform: rotateY(180deg);
        }

        .card-front, .card-back-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2em;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .card-front {
          background: var(--color-brand, #007864);
          color: var(--color-brand-text, white);
        }

        .card-back-face {
          background: var(--color-background, white);
          color: var(--color-text, black);
          transform: rotateY(180deg);
          border: 1px solid var(--color-spacer, #a4a4a4);
        }

        .card:hover:not(.flipped):not(.matched) .card-inner {
          transform: scale(1.05);
        }

        .card:hover:not(.flipped):not(.matched) .card-front {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .card.matched .card-back-face {
          opacity: 0.6;
        }

        .card.matched {
          cursor: default;
        }

        .card-image {
          width: 90%;
          height: 90%;
          object-fit: contain;
        }

        .card-icon {
          font-size: 1.5em;
        }

        .victory-message {
          display: none;
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 8px;
          font-size: 1.2em;
          font-weight: bold;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .card {
            font-size: 1.5em;
            min-height: 50px;
          }
        }
      </style>

      <div class="container">
        <div class="header">
          <div class="stats">Züge: ${this.moves}</div>
          <button class="btn-reset" onclick="this.getRootNode().host.resetGame()">
            Neues Spiel
          </button>
        </div>

        <div class="grid">
          ${this.cards
            .map((card, index) => {
              const isFlipped = this.flippedCards.includes(index);
              const isMatched = this.matchedCards.includes(index);

              let cardBackContent;
              if (card.content.type === "image") {
                cardBackContent = `<img class="card-image" src="${card.content.value}" alt="Card" />`;
              } else {
                cardBackContent = card.content.value;
              }

              return `
                <button
                  class="card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}"
                  onclick="this.getRootNode().host.flipCard(${index})"
                  ${isMatched ? "disabled" : ""}
                >
                  <div class="card-inner">
                    <div class="card-front">
                      <span class="card-icon">?</span>
                    </div>
                    <div class="card-back-face">
                      ${cardBackContent}
                    </div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>

        <div class="victory-message">
          🎉 Gewonnen! Du hast das Spiel in ${this.moves} Zügen geschafft! 🎉
        </div>
      </div>
    `;
  }
}

customElements.define("memory-game", MemoryGame);
