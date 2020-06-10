
const ui = require('./ui.js')
const game = require('./tic-tac-toe.js')

const currentGame = {
  game: null,
  alive: false,
  start: function (gameObject) {
    this.game = gameObject
    this.alive = true
  },
  end: function () {
    this.game = null
    this.alive = false
  }
}

const startGame = function (response) {
  // Start game
  console.log('starting game')
  console.log('response game', response.game)
  currentGame.start(game.startGame(response.game))
  ui.gameStart()
  ui.displayBoard(game.getBoard().map(xo))
}

const xo = function (val) {
  return ['o', '', 'x'][val + 1]
}

const playMove = function (move) {
  if (game.getBoard()[move] !== 0) { return }
  const turn = game.playMove(move) // this is also a work around. Return an object representing the whole move instead.
  ui.playMove(move, xo(turn))
  if (checkEnd()) {
    return { cell: move, over: true }
  } else {
    game.switchTurns()
    return { cell: move, over: false }
  }
}

const checkEnd = function () {
  if (game.checkWin() || game.checkDraw()) {
    endGame()
    return true
  }
  return false
}

const endGame = function () {
  // should disallow board button presses here instead of in events
  // distinguish between win loss and draw
  currentGame.end()
  ui.gameOver()
}

module.exports = {
  startGame,
  playMove,
  checkEnd,
  endGame,
  currentGame
}
