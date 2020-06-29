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

// Assume player X is always the first player to start the game
const assignTurn = function () {
  tictactoe.turn = tictactoe.board.reduce((sum, spot) => sum + spot, 0) % 2 === 0 ? 1 : -1
}

const startGame = function () {
  tictactoe.reset()
}

const loadGame = function (board) {
  tictactoe.board = board
  assignTurn()
}

const playMove = function (move) {
  if (move >= 0 && move < tictactoe.board.length &&
      tictactoe.board[move] === 0) {
    tictactoe.playMove(move)
  }
}

const switchTurns = function () {
  tictactoe.switchTurns()
}

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

  // const winArray = [
  //   [0, 1, 2], [3, 4, 5], [6, 7, 8],
  //   [0, 3, 6], [1, 4, 7], [2, 5, 8],
  //   [0, 4, 8], [2, 4, 6]
  // ]
  // winArray.map(threeInARow => board[])

  // No winner
  return false
}

const checkDraw = function () {
  // return tictactoe.board.reduce((sum, xo) => Math.abs(xo) + sum, 0) === tictactoe.board.length
  return tictactoe.board.every(xo => xo !== 0)
}

module.exports = {
  tictactoe,
  startGame,
  loadGame,
  playMove,
  switchTurns,
  checkWin,
  checkDraw
}
