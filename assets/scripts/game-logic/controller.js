const ui = require('./ui.js')
const game = require('./tic-tac-toe.js')

const currentGame = {
  boardState: null,
  turn: null,
  gameID: null,
  alive: false,
  start: function (gameObject) { // Consider deleting and only using load
    this.boardState = parseCells(gameObject.cells)
    this.gameID = gameObject._id
    this.alive = true
  },
  load: function (gameObject) {
    this.boardState = parseCells(gameObject.cells)
    this.gameID = gameObject._id
    this.alive = !gameObject.over
  },
  getGame: function (tictactoe) {
    this.boardState = tictactoe.board
    this.turn = tictactoe.turn
  },
  moveResponse: function (move, over) {
    return {
      gameID: this.gameID,
      moveObject: {
        cell: {
          index: move,
          value: xo(this.turn)
        },
        over: over
      }
    }
  },
  end: function () {
    this.game = null
    this.gameID = null
    this.alive = false
  }
}

// Parse cells from game object
const parseCells = function (cells) {
  return cells.map(c => {
    return c ? c === 'x' ? 1 : -1 : 0
  })
}

const startGame = function (response) {
  // Start game
  console.log('starting game')
  console.log('response game', response.game)
  currentGame.start(response.game)
  game.startGame()
  ui.gameStart()
}

// check that this function is only in one file later
const xo = function (val) {
  return ['o', ' ', 'x'][val + 1]
}

const playMove = function (move) {
  if (!currentGame.alive || currentGame.boardState[move] !== 0) { return }
  currentGame.getGame(game.playMove(move))
  ui.playMove(move, xo(currentGame.turn))
  return currentGame.moveResponse(move, checkEnd())
}

const loadGame = function (response) {
  console.log('loading game')
  if (!response.game[0]) { return ui.failed('Could not find game.') }
  // console.log('response game', response.game)
  // console.log('response game [0]', response.game[0]) // This one
  currentGame.load(response.game[0])
  game.loadGame(currentGame.boardState)
  ui.loadGame(currentGame.boardState)
}

const deleteGame = function (response, id) {
  console.log('deleting game') // , response) // response is undefined
  if (id === currentGame.gameID) {
    endGame()
  }
  ui.deleteGame()
}

const checkEnd = function () {
  return game.checkWin() || game.checkDraw()
}

const afterMove = function (over) {
  over ? endGame() : switchTurns()
}

const switchTurns = function () {
  game.switchTurns()
  // ui.switchTurns ?
}

const endGame = function () {
  // distinguish between win loss and draw
  currentGame.end()
  ui.gameOver()
}

module.exports = {
  startGame,
  playMove,
  loadGame,
  deleteGame,
  checkEnd,
  afterMove,
  endGame
}
