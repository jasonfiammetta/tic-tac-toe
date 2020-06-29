const ui = require('./ui.js')
const game = require('./tic-tac-toe.js')

const controller = {
  // game: game.tictactoe,
  gameID: null,
  over: true,
  start: function (id) {
    this.gameID = id
    this.over = false
    // this.game.reset()
    game.startGame()
  },
  load: function (id, board, over) {
    this.gameID = id
    this.over = over
    game.loadGame(board)
  },
  end: function () {
    // this.game = null
    this.gameID = null
    this.over = true
    console.log('controller.end', this.over)
  }
}

const startGame = function (id) {
  console.log('starting game')
  controller.start(id)
  // game.startGame()
  ui.gameStart()
}

const playMove = function (move) {
  console.log(controller.over)
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
  console.log('loading game', gameState)
  controller.load(gameState.id, gameState.board, gameState.over)
  ui.loadGame(gameState.board)
}

const deleteGame = function (id) {
  console.log('deleting game')
  if (id === controller.gameID) {
    endGame('Game deleted.')
    ui.deleteGame()
  }
  // ui.refresh()
}

const checkEnd = function () {
  const gameWon = game.checkWin()
  const allSquaresFilled = game.checkDraw()

  console.log('checkEnd gameWon draw', gameWon, allSquaresFilled)
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
  // distinguish between win loss and draw
  console.log('end game', winner)
  controller.end()
  ui.gameOver(winner)
}

const failed = function (error) {
  if (typeof error === 'string') {
    console.error('controller fail, string', error) // probably delete this
  } else {
    ui.failed(error)
  }
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
