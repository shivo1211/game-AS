let currentPlayer = 'S'; // 'S' represents Shivam
let board = ['', '', '', '', '', '', '', '', ''];
let scoreS = 0; // Score for Shivam
let scoreA = 0; // Score for Amisha
let ties = 0;
let gameOver = false; // Flag to track game state

function cellClicked(index) {
  const cell = document.getElementById(index);
  if (!gameOver && board[index] === '') {
    cell.innerText = currentPlayer;
    cell.classList.add('cell-clicked'); // Add animation class
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'S' ? 'A' : 'S'; // Switch players between Shivam and Amisha
    updatePlayerTurn();
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === 'S') {
        scoreS++;
      } else {
        scoreA++;
      }
      showWinner(`${board[a]} wins!`); // Show winner message
      updateScore();
      gameOver = true; // Set game over flag
      return;
    }
  }

  if (!board.includes('')) {
    ties++;
    updateScore();
    showWinner("It's a tie!"); // Show tie message
    gameOver = true; // Set game over flag
  }
}

function updateScore() {
  document.getElementById('score-s').innerText = scoreS;
  document.getElementById('score-a').innerText = scoreA;
  document.getElementById('ties').innerText = ties;
}

function updatePlayerTurn() {
  const playerTurnElement = document.getElementById('player-turn');
  const currentPlayerColor = currentPlayer === 'S' ? '#536dfe' : '#ff4081'; // Pink for Shivam, Blue for Amisha
  playerTurnElement.innerText = `${currentPlayer === 'S' ? 'Shivam' : 'Amisha'}'s Turn`;
  playerTurnElement.style.color = currentPlayerColor;
}


function resetBoard() {
  for (let i = 0; i < 9; i++) {
    board[i] = ''; // Clear the board array
  }
  currentPlayer = 'S'; // Reset the current player to 'S'
  updatePlayerTurn(); // Update the player turn display
  gameOver = false; // Reset game over flag
}

function showWinner(message) {
  const resultMessageElement = document.getElementById('result-message');
  const winnerMessageElement = document.getElementById('winner-message');
  if (currentPlayer === 'S') {
    winnerMessageElement.innerText = 'Shivam wins!';
  } else {
    winnerMessageElement.innerText = 'Amisha wins!';
  }
  resultMessageElement.classList.add('show');
}



function startNewRound() {
  resetBoard();
  resetGrid();
  hideWinner(); // Added to hide the winner message
}

function resetGrid() {
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(i);
    cell.innerText = '';
    cell.classList.remove('cell-clicked'); // Remove any animation classes
  }
}

function hideWinner() {
  const resultMessageElement = document.getElementById('result-message');
  resultMessageElement.classList.remove('show');
}
