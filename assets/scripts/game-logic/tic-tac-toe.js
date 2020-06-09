const store = require('./../store')

const tictactoe = {
  board: [0, 0, 0,
    0, 0, 0,
    0, 0, 0],
  turn: 1,
  playMove: function (id) {
    this.board[id] = this.turn
  },
  switchTurns: function () {
    this.turn *= -1
  },
  reset: function () {
    this.board = [0, 0, 0,
      0, 0, 0,
      0, 0, 0]
    this.turn = 1
  }
}

// Parse cells from game object
const parseCells = function (gameObject) {
  tictactoe.board = gameObject.game.cells.map(c => {
    return c ? c === 'x' ? 1 : -1 : 0 // Who would write this? Who would actually write this? Go to bed.
  })
}

// Assume player X is always the first player to start the game
const assignTurn = function () {
  tictactoe.turn = tictactoe.board.reduce((sum, spot) => sum + spot) % 2 === 0 ? 1 : 0 // redo this too
}

const getBoard = function () {
  return tictactoe.board
}

const startGame = function (gameObject) {
  tictactoe.reset()
  store.game = gameObject
}

const loadGame = function (gameObject) {
  parseCells(gameObject)
  assignTurn()
}

const playMove = function (move) {
  if (move >= 0 && move < tictactoe.board.length) {
    if (tictactoe.board[move] === 0) {
      tictactoe.playMove(move)
    }
  }
  return tictactoe.turn
}

const switchTurns = function () {
  tictactoe.switchTurns()
}

// rewrite for boardSize = config.size
const checkWin = function () {
  const board = tictactoe.board
  const turn = tictactoe.turn
  for (let i = 0; i < 3; i++) {
    if (board[i] + board[i + 3] + board[i + 6] === 3 * turn) { return true }
  }
  for (let i = 0; i < 3; i++) {
    if (board[3 * i] + board[3 * i + 1] + board[3 * i + 2] === 3 * turn) { return true }
  }
  if (board[0] + board[4] + board[8] === 3 * turn) { return true }
  if (board[2] + board[4] + board[6] === 3 * turn) { return true }

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
  checkWin,
  checkDraw,
  getBoard
}
