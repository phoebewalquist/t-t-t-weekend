document.addEventListener("DOMContentLoaded", function() {
    // ----- constants -----
  
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    // ----- state variables -----
  
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = false;
  
    // ----- cached elements -----
  
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector("#statusText");
    const restartBtn = document.querySelector("#restartBtn");
  
    // ----- event listeners -----
  
    initializeGame();
  
    // ----- functions -----
  
    function initializeGame() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", cellClicked);
    }
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
  
    running = true;
  }
  
    function cellClicked() {
      const cellIndex = this.getAttribute("cellIndex");
  
      if (options[cellIndex] != "" || !running) {
        return;
      }
  
      updateCell(this, cellIndex);
      checkWinner();
    }
  
    function updateCell(cell, index) {
      options[index] = currentPlayer;
      cell.textContent = currentPlayer;
    }
  
    function changePlayer() {
      currentPlayer = currentPlayer == "X" ? "O" : "X";
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  
   function checkWinner() {
    const winningConditions = winConditions.map((condition) =>
      condition.map((index) => options[index])
    );
  
    const winningCondition = winningConditions.find(
      ([a, b, c]) => a && a === b && b === c
    );
  
    if (winningCondition) {
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
      return true;
    }
  
    if (!options.includes("")) {
      statusText.textContent = `Tie!`;
      running = false;
      return true;
    }
  
    changePlayer();
    return false;
  }
  
    
  
    function restartGame() {
      currentPlayer = "X";
      options = ["", "", "", "", "", "", "", "", ""];
      statusText.textContent = `${currentPlayer}'s turn`;
      cells.forEach((resetCell) => (resetCell.textContent = ""));
      running = true;
    }
  });
  