const api = require('./api.js')
const controller = require('./controller.js')

const onStart = function () {
  api.createGame()
    .then(controller.startGame)
    .catch(console.log)
}

const onGetAll = function () {
  console.log(api.getGames())
}

const onLoad = function (event) {
  api.getGame(event.data('game-id'))
    .then(controller.loadGame) // load gameObject
    .catch(console.log)
}

const onPlay = function (event) {
  if (!controller.currentGame.alive) { return } // sloppy
  const gameID = controller.currentGame.game._id
  const move = event.target.id
  const movePlayed = controller.playMove(move)
  const over = controller.checkEnd()
  console.log('Game over?', over)
  const moveObject = {
    cell: movePlayed,
    over: over
  }
  // console.log(controller.currentGame)
  api.sendMove(gameID, moveObject)
  controller.currentGame.alive = !over // This is sloppy
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onPlay
}
