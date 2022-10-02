const cells = document.querySelectorAll(".cell")
const gameTable = document.querySelector(".game-table")
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const gameResultScreen = document.querySelector(".game-result-screen")
const gameResultText = document.querySelector(".game-result-text")
const restartButton = gameResultScreen.querySelector("button")
let turn = false
let currentTurn = "x"

gameTable.classList.add("turn-x")

restartButton.addEventListener("click", () => {
  cells.forEach(cell => {
    cell.classList.remove("x")
    cell.classList.remove("o")
  })
  gameTable.classList.remove("turn-x")
  gameTable.classList.remove("turn-o")

  gameTable.classList.add("turn-x")
  turn = false
  currentTurn = "x"

  gameResultScreen.style.display = "none"
})

function handleClick(cells) {
  cells.forEach(cell => {
    cell.addEventListener("click", handleTurn, { once: true })
  })
}

handleClick(cells)

function handleTurn(e) {
  turn ? e.target.classList.add("o") : e.target.classList.add("x")

  if (checkGame(currentTurn)) {
    return handleWin(currentTurn)
  }

  if (drawGame()) return handleDraw()

  if (turn === false) {
    turn = true
    currentTurn = "o"
    gameTable.classList.remove("turn-x")
    gameTable.classList.add("turn-o")
  } else {
    turn = false
    currentTurn = "x"
    gameTable.classList.remove("turn-o")
    gameTable.classList.add("turn-x")
  }
}

function checkGame(currentTurn) {
  return winningConditions.some(condition => {
    return condition.every(index => {
      if (cells[index].classList.contains(currentTurn)) return true
    })
  })
}

function drawGame() {
  let sum = 0

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("x") || cells[i].classList.contains("o")) {
      sum++
    }
  }

  if (sum === 9) return true
}

function handleWin(currentTurn) {
  gameResultText.textContent = `Winner: ${currentTurn.toUpperCase()}!`
  gameResultScreen.style.display = "flex"

  handleClick(cells)
}

function handleDraw() {
  gameResultText.textContent = "Draw !"
  gameResultScreen.style.display = "flex"

  handleClick(cells)
}
