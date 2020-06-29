const ui = require('./ui.js')
const game = require('./tic-tac-toe.js')

const controller = {
  gameID: null,
  over: true,
  start: function (id) {
    this.gameID = id
    this.over = false
    game.startGame()
  },
  load: function (id, board, over) {
    this.gameID = id
    this.over = over
    game.loadGame(board)
  },
  end: function () {
    this.gameID = null
    this.over = true
  }
}

const startGame = function (id) {
  controller.start(id)
  ui.gameStart()
}

const playMove = function (move) {
  if (controller.over || game.tictactoe.board[move] !== 0) { return }
  game.playMove(move)
  ui.playMove(move, game.tictactoe.turn)
  const end = checkEnd()
  return {
    gameID: controller.gameID,
    move: move,
    turn: game.tictactoe.turn,
    over: end.over,
    winner: end.gameWon ? game.tictactoe.turn : false
  }
}

const loadGame = function (gameState) {
  controller.load(gameState.id, gameState.board, gameState.over)
  ui.loadGame(gameState.board)
}

const deleteGame = function (id) {
  if (id === controller.gameID) {
    endGame('Game deleted.')
    ui.deleteGame()
  }
  // ui.refresh()
}

const checkEnd = function () {
  const gameWon = game.checkWin()
  const allSquaresFilled = game.checkDraw()

  return {
    over: gameWon || allSquaresFilled,
    gameWon: gameWon
  }
}

const afterMove = function (over, winner) {
  over ? endGame(winner) : switchTurns()
}

const switchTurns = function () {
  game.switchTurns()
  ui.switchTurns()
}

const endGame = function (winner) {
  controller.end()
  ui.gameOver(winner)
}

const failed = function (message) {
  ui.failed(message)
}

module.exports = {
  startGame,
  playMove,
  loadGame,
  deleteGame,
  checkEnd,
  afterMove,
  endGame,
  failed
}
