const store = require('./../store.js')
const config = require('./../config.js')
const game = require(config.gamePath)
const api = require('./api.js')



// load game
const onLoad = function (event) {
  // load data from api
  // const gameObject = api.getGame(event.data('id'))
  // Test if game does not exist, and if game is already over
  // game.loadGame(gameObject)
  api.getGame(event.data('id'))
    .then(game.loadGame) // Actually, make it a promise
}

const onPlay = function (event) {
  if (game.play(event.game)) {
    api.sendMove({
      index: event.game.id,
      value: store.turn
    }, game.checkWin())
  }
}

const onRestart = function (event) {
  // api do stuff
  game.restart()
}

module.exports = {
  onLoad,
  onPlay,
  onRestart
}
