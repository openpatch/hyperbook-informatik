class RockPaperScissors extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.playerScore = 0;
    this.computerScore = 0;
    this.choices = ["rock", "paper", "scissors", "well"];
    this.history = [];
  }

  async connectedCallback() {
    await this.loadState();
    this.render();
    this.attachEventListeners();
    this.updateScores();
    if (this.hasAttribute("spielverlauf")) {
      this.updateHistory();
    }
  }

  async loadState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      const data = await store.custom.get(id);
      if (data) {
        const state = JSON.parse(data.payload);
        this.playerScore = state.playerScore || 0;
        this.computerScore = state.computerScore || 0;
        this.history = state.history || [];
      }
    } catch (error) {
      console.error("Failed to load rock-paper-scissors state:", error);
    }
  }

  async saveState() {
    const id = this.getAttribute("id");
    if (!id || typeof store === "undefined") return;

    try {
      await store.custom.put({
        id: id,
        payload: JSON.stringify({
          playerScore: this.playerScore,
          computerScore: this.computerScore,
          history: this.history,
        }),
      });
    } catch (error) {
      console.error("Failed to save rock-paper-scissors state:", error);
    }
  }

  async play(playerChoice) {
    const buttons = this.shadowRoot.querySelectorAll(".choice-btn");
    buttons.forEach((btn) => (btn.disabled = true));

    this.showShakeAnimation(async () => {
      const computerChoice = this.choices[Math.floor(Math.random() * 4)];
      const result = this.determineWinner(playerChoice, computerChoice);

      if (result === "win") {
        this.playerScore++;
      } else if (result === "lose") {
        this.computerScore++;
      }

      if (this.hasAttribute("spielverlauf")) {
        this.addToHistory(playerChoice, computerChoice, result);
      }
      this.updateResult(playerChoice, computerChoice, result);
      this.updateScores();
      await this.saveState();

      buttons.forEach((btn) => (btn.disabled = false));
    });
  }

  showShakeAnimation(callback) {
    const resultDiv = this.shadowRoot.querySelector("#result");
    let count = 0;
    const emojis = ["✊", "✋", "✌️", "👌"];

    resultDiv.innerHTML = '<div class="shake-animation">🤔</div>';

    const interval = setInterval(() => {
      const emoji = emojis[count % 4];
      resultDiv.innerHTML = `<div class="shake-animation">${emoji}</div>`;
      count++;
      if (count >= 8) {
        clearInterval(interval);
        callback();
      }
    }, 250);
  }

  determineWinner(player, computer) {
    if (player === computer) return "tie";

    const winConditions = {
      rock: ["scissors"],
      paper: ["rock", "well"],
      scissors: ["paper"],
      well: ["rock", "scissors"],
    };

    return winConditions[player].includes(computer) ? "win" : "lose";
  }

  updateResult(playerChoice, computerChoice, result) {
    const resultDiv = this.shadowRoot.querySelector("#result");
    const container = this.shadowRoot.querySelector(".container");
    const messages = {
      win: "🎉 Du gewinnst!",
      lose: "😢 Computer gewinnt!",
      tie: "🤝 Unentschieden!",
    };

    const choiceTranslations = {
      rock: "Stein",
      paper: "Papier",
      scissors: "Schere",
      well: "Brunnen",
    };

    const playerChoiceEmoji = {
      rock: "✊",
      paper: "✋",
      scissors: "✌️",
      well: "👌",
    };
    const computerChoiceEmoji = {
      rock: "✊",
      paper: "✋",
      scissors: "✌️",
      well: "👌",
    };

    container.className = "container";
    resultDiv.className = "";

    setTimeout(() => {
      container.classList.add(`result-bg-${result}`);
      resultDiv.classList.add(`result-card-${result}`);
    }, 50);

    resultDiv.innerHTML = `
      <div class="choices-display">
        <div class="choice-item ${result === "win" ? "winner" : result === "lose" ? "loser" : ""}">
          <div class="choice-emoji">${playerChoiceEmoji[playerChoice]}</div>
          <div class="choice-label">Du</div>
          <div class="choice-name">${choiceTranslations[playerChoice]}</div>
        </div>
        <div class="vs">VS</div>
        <div class="choice-item ${result === "lose" ? "winner" : result === "win" ? "loser" : ""}">
          <div class="choice-emoji">${computerChoiceEmoji[computerChoice]}</div>
          <div class="choice-label">Computer</div>
          <div class="choice-name">${choiceTranslations[computerChoice]}</div>
        </div>
      </div>
      <div class="result-${result}">${messages[result]}</div>
    `;
  }

  updateScores() {
    const playerScoreEl = this.shadowRoot.querySelector("#player-score");
    const computerScoreEl = this.shadowRoot.querySelector("#computer-score");

    playerScoreEl.textContent = this.playerScore;
    computerScoreEl.textContent = this.computerScore;

    playerScoreEl.classList.add("score-update");
    computerScoreEl.classList.add("score-update");

    setTimeout(() => {
      playerScoreEl.classList.remove("score-update");
      computerScoreEl.classList.remove("score-update");
    }, 500);
  }

  async reset() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.history = [];
    const container = this.shadowRoot.querySelector(".container");
    const resultDiv = this.shadowRoot.querySelector("#result");

    container.className = "container";
    resultDiv.className = "";
    resultDiv.innerHTML = "<div>Wähle deine Option!</div>";
    this.updateScores();
    if (this.hasAttribute("spielverlauf")) {
      this.updateHistory();
    }
    await this.saveState();
  }

  addToHistory(playerChoice, computerChoice, result) {
    const choiceEmoji = { rock: "✊", paper: "✋", scissors: "✌️", well: "👌" };
    this.history.unshift({
      player: playerChoice,
      computer: computerChoice,
      result: result,
      playerEmoji: choiceEmoji[playerChoice],
      computerEmoji: choiceEmoji[computerChoice],
    });
    if (this.history.length > 20) {
      this.history.pop();
    }
    this.updateHistory();
  }

  updateHistory() {
    const historyList = this.shadowRoot.querySelector("#history-list");
    if (!historyList) return;
    
    if (this.history.length === 0) {
      historyList.innerHTML =
        '<div class="history-empty">Noch keine Runden gespielt</div>';
      return;
    }

    historyList.innerHTML = this.history
      .map((item, index) => {
        const resultIcon =
          item.result === "win" ? "✅" : item.result === "lose" ? "❌" : "➖";
        const resultClass =
          item.result === "win"
            ? "win"
            : item.result === "lose"
              ? "lose"
              : "tie";
        return `
        <div class="history-item ${resultClass}">
          <span class="history-round">#${this.history.length - index}</span>
          <span class="history-choices">${item.playerEmoji} vs ${item.computerEmoji}</span>
          <span class="history-result">${resultIcon}</span>
        </div>
      `;
      })
      .join("");
  }

  attachEventListeners() {
    this.shadowRoot.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.play(btn.dataset.choice));
    });

    this.shadowRoot
      .querySelector("#reset-btn")
      .addEventListener("click", () => this.reset());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
        }

        .game-wrapper {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .main-game {
          width: 100%;
          flex: 1;
          min-width: 0;
        }

        .container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          color: white;
          transition: background 0.5s ease;
        }

        .container.result-bg-win {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .container.result-bg-lose {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .container.result-bg-tie {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        h1 {
          text-align: center;
          margin: 0 0 20px 0;
          margin-bottom: 0;
          font-size: 2em;
        }

        h2 {
          text-align: center;
          font-size: 1em;
        }

        .scoreboard {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
        }

        .score {
          text-align: center;
        }

        .score-label {
          font-size: 0.9em;
          opacity: 0.9;
          margin-bottom: 5px;
        }

        .score-value {
          font-size: 2.5em;
          font-weight: bold;
        }

        .choices {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .choice-btn {
          background: white;
          border: none;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          font-size: 2.5em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .choice-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .choice-btn:active {
          transform: scale(0.95);
        }

        .choice-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .choice-btn:disabled:hover {
          transform: none;
        }

        #result {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          margin-bottom: 20px;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 15px;
          transition: all 0.5s ease;
        }

        .result-card-win {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #059669 !important;
          border: 3px solid #10b981;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
        }

        .result-card-lose {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #dc2626 !important;
          border: 3px solid #ef4444;
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
        }

        .result-card-tie {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #d97706 !important;
          border: 3px solid #f59e0b;
          box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
        }

        .choices-display {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 10px;
        }

        .choice-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          padding: 10px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .choice-item.winner {
          background: rgba(16, 185, 129, 0.2);
          transform: scale(1.1);
        }

        .choice-item.loser {
          opacity: 0.6;
          transform: scale(0.9);
        }

        .choice-emoji {
          font-size: 2.5em;
        }

        .choice-label {
          font-size: 0.8em;
          font-weight: bold;
          text-transform: uppercase;
        }

        .choice-name {
          font-size: 0.9em;
        }

        .vs {
          font-size: 1.2em;
          font-weight: bold;
          opacity: 0.7;
        }

        #result strong {
          text-transform: capitalize;
          font-weight: bold;
        }

        .result-win {
          font-size: 1.5em;
          font-weight: bold;
          color: #059669;
          animation: bounceIn 0.6s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .result-lose {
          font-size: 1.5em;
          font-weight: bold;
          color: #dc2626;
          animation: shakeX 0.6s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .result-tie {
          font-size: 1.5em;
          font-weight: bold;
          color: #d97706;
          animation: pulse 0.6s ease;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .shake-animation {
          font-size: 3em;
          animation: shake 0.25s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }

        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        #result > div {
          animation: fadeInUp 0.4s ease;
        }

        .score-value {
          transition: all 0.3s ease;
        }

        .score-update {
          animation: scorePopup 0.5s ease;
        }

        @keyframes scorePopup {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); color: #fbbf24; }
          100% { transform: scale(1); }
        }

        #reset-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid white;
          border-radius: 8px;
          color: white;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        #reset-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        #reset-btn:active {
          transform: translateY(0);
        }

        .history-panel {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .history-content {
          padding: 15px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .history-header {
          font-size: 1.2em;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 15px;
          text-align: center;
        }

        #history-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        #history-list::-webkit-scrollbar {
          width: 6px;
        }

        #history-list::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }

        #history-list::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.3);
          border-radius: 3px;
        }

        #history-list::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.5);
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.02);
          border-left: 4px solid transparent;
          transition: all 0.2s ease;
        }

        .history-item:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: translateX(-3px);
        }

        .history-item.win {
          border-left-color: #10b981;
        }

        .history-item.lose {
          border-left-color: #ef4444;
        }

        .history-item.tie {
          border-left-color: #f59e0b;
        }

        .history-round {
          font-size: 0.75em;
          color: #666;
          min-width: 25px;
        }

        .history-choices {
          flex: 1;
          font-size: 1.1em;
        }

        .history-result {
          font-size: 1em;
        }

        .history-empty {
          text-align: center;
          color: #999;
          padding: 20px;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .game-wrapper {
            flex-direction: column;
          }

          .history-panel {
            width: 100%;
          }
        }
      </style>

      <div class="game-wrapper">
        <div class="main-game">
          <div class="container">
            <h1>✌️✊✋👌</h1>
            <h2>Schere Stein Papier Brunnen</h2>
            
            <div class="scoreboard">
              <div class="score">
                <div class="score-label">Du</div>
                <div class="score-value" id="player-score">0</div>
              </div>
              <div class="score">
                <div class="score-label">Computer</div>
                <div class="score-value" id="computer-score">0</div>
              </div>
            </div>

            <div class="choices">
              <button class="choice-btn" data-choice="rock" title="Stein">✊</button>
              <button class="choice-btn" data-choice="paper" title="Papier">✋</button>
              <button class="choice-btn" data-choice="scissors" title="Schere">✌️</button>
              <button class="choice-btn" data-choice="well" title="Brunnen">👌</button>
            </div>

            <div id="result">
              <div>Wähle deine Option!</div>
            </div>

            <button id="reset-btn">Spiel zurücksetzen</button>
          </div>
        </div>

        ${this.hasAttribute("spielverlauf") ? `
        <div class="history-panel">
          <div class="history-content">
            <div class="history-header">Spielverlauf</div>
            <div id="history-list">
              <div class="history-empty">Noch keine Runden gespielt</div>
            </div>
          </div>
        </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define("rock-paper-scissors", RockPaperScissors);
