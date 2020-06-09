const store = require('./../store.js')
let board

// Parse cells from game object
const parseCells = function (gameObject) {
  board = gameObject.game.cells.map(c => {
    return c ? c === 'x' ? 1 : -1 : 0 // Who would write this? Who would actually write this? Go to bed.
  })
}

// Assume player X is always the first player to start the game
const assignTurn = function () {
  store.turn = board.reduce((sum, spot) => sum + spot) % 2 === 0 ? 1 : 0
}

// const startGame = function (playerOne, playerTwo) {
const startGame = function () {
  board = [0, 0, 0, // rewrite for boardSize = config.size
           0, 0, 0, /* eslint-disable-line indent */ // This linter is incredibly annoying.
           0, 0, 0] /* eslint-disable-line indent */ // Also, this should probably be a function based on board size.
  store.turn = 1
}

const loadGame = function (gameObject) {
  parseCells(gameObject)
  assignTurn()
}

const playMove = function (button) {
  if (typeof button.id === 'number' && button.id < board.length && button.id >= 0) {
    board[button.id] = store.turn
    // return {index, value}
    return {
      index: button.id,
      value: store.turn
    }
  }
  return false
}

const switchTurns = function () { store.turn *= -1 }

// No longer necessary?
const restart = function () {
  startGame()
}

// rewrite for boardSize = config.size
const checkWin = function () {
  for (let i = 0; i < 3; i++) {
    if (board[i] + board[i + 3] + board[i + 6] === 3 * store.turn) { return true }
  }
  for (let i = 0; i < 3; i++) {
    if (board[3 * i] + board[3 * i + 3] + board[3 * i + 6] === 3 * store.turn) { return true }
  }
  if (board[0] + board[4] + board[8] === 3 * store.turn) { return true }
  if (board[2] + board[4] + board[6] === 3 * store.turn) { return true }

  // No winner
  return false
}

const checkDraw = function () {
  return tictactoe.board.reduce((sum, xo) => Math.abs(xo) + sum, 0) === tictactoe.board.length
}

module.exports = {
  startGame,
  loadGame,
  playMove,
  switchTurns,
  restart,
  checkWin
}
