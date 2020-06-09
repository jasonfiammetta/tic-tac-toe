// const store = require('./../store.js')
// const config = require('./../config.js')
// const game = require(config.gamePath) // Can't make a require statement an expression?
const ui = require('./ui.js') // move this into controller.js
const game = require('./tic-tac-toe.js') // Replace this with ./controller.js
const api = require('./api.js')

const onStart = function () {
  // Do API stuff
  game.startGame()
}

const onGetAll = function () {
  console.log(api.getGames())
}

// load game from api
const onLoad = function (event) {
  // load data from api
  // const gameObject = api.getGame(event.data('id'))
  // Test if game does not exist, and if game is already over
  // game.loadGame(gameObject)
  api.getGame(event.data('game-id'))
    .then(game.loadGame) // Actually, make it a promise
    .then(ui.displayBoard)
}

const onPlay = function (event) {
  console.log('onPlay', event)
  const move = game.playMove(event.target)
  let over
  if (move) {
    over = game.checkWin()
    api.sendMove(move, over)
    ui.playMove(event.target)
  }
  if (over) {
    // tell controller the game is over, disallow more button presses

    // make ui say it's over
    ui.gameOver()
  }
}

const onRestart = function (event) {
  // api do stuff
  game.restart()
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onPlay,
  onRestart
}
