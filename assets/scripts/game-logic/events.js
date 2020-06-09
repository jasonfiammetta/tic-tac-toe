const api = require('./api.js')
const controller = require('./controller.js')

// let gameAlive = false

const currentGame = {
  game: null,
  alive: false
}

const onStart = function () {
  api.createGame()
    .then(controller.startGame)
    .catch(console.log)
  // Gotta get the game into currentGame somehow
  currentGame.alive = true
}

const onGetAll = function () {
  console.log(api.getGames())
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
  if (!currentGame.alive) { return } // sloppy
  const move = event.target.id

  const movePlayed = controller.playMove(move)
  const over = controller.checkEnd()
  console.log('Game over?', over)
  const moveObject = {
    cell: movePlayed,
    over: over
  }
  api.sendMove(currentGame, moveObject)
  currentGame.alive = !over // This is sloppy
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onPlay
}
