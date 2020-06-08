
const ui = require('./ui.js')
const game = require('./tic-tac-toe.js')

const startGame = function () {
  // Start game
  console.log('starting game')
  game.startGame()
  ui.displayBoard(game.getBoard().map(xo))
}

const xo = function (val) {
  return ['o', '', 'x'][val + 1]
}

const playMove = function (move) {
  const val = game.playMove(move)
  ui.playMove(move, xo(val))
  if (game.checkWin()) {
    return true
  } else {
    game.switchTurns()
  }
}

const checkWin = function () {
  return game.checkWin()
}

const endGame = function () {
  // disallow board button presses
  ui.gameOver()
}

module.exports = {
  startGame,
  playMove,
  checkWin,
  endGame
}
