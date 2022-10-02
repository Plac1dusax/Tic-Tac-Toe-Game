const X = "turn-x"
const O = "turn-o"
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
const restartButton = gameResultScreen.querySelector("button")
let turn = false
let currentTurn = "x"

gameTable.classList.add("turn-x")

cells.forEach(cell => {
  cell.addEventListener("click", handleTurn, { once: true })
})

function handleTurn(e) {
  turn ? e.target.classList.add("o") : e.target.classList.add("x")
  if (drawGame()) return drawGame()
  if (checkGame(currentTurn)) return restartGame()

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
