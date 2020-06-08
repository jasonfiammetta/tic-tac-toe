const api = require('./api.js')
const controller = require('./controller.js')

let gameAlive = false

const onStart = function () {
  api.createGame()
  // .then(controller.startGame)
  // .catch(console.log)

  controller.startGame()
  gameAlive = true
}

// load game from api
const onLoad = function (event) {
  // load data from api
  // const gameObject = api.getGame(event.data('id'))
  // Test if game does not exist, and if game is already over
  api.getGame(event.data('game-id'))
    .then(controller.loadGame) // load gameObject
    .catch(console.log)
}

const onPlay = function (event) {
  if (!gameAlive) { return }
  const move = event.target.id

  const movePlayed = controller.playMove(move)
  const over = controller.checkEnd()
  console.log('Game over?', over)
  api.sendMove(movePlayed, over)
  gameAlive = !over // This is sloppy
}

module.exports = {
  onStart,
  onLoad,
  onPlay
}
