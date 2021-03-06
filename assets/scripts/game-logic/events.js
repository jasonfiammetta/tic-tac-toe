const api = require('./api.js')
const controller = require('./controller.js')
const ui = require('./ui.js') // shouldn't need this--
// AND WON'T once non-game-logic ui is pulled into its own folder
const getFormFields = require('./../../../lib/get-form-fields.js')

// shouldn't need this twice, but if I put it in ./../api.js then event.preventDefault doesn't trigger
const handleForm = function (event) {
  event.preventDefault()
  return getFormFields(event.target)
}

const onStart = function () {
  api.createGame()
    .then(response => controller.startGame(response.game._id))
    .catch(controller.failed)
}

// Parse cells from game object
const parseCells = function (cells) {
  return cells.map(c => c ? c === 'x' ? 1 : -1 : 0)
}

const onGetAll = function () {
  ui.clearOldGames() // maybe check if api can get games first
  api.getGames()
    .then(ui.addOldGames)
    .catch(ui.failed)
}

const onLoad = function (event) {
  const data = handleForm(event)

  api.getGame(data.game.id)
    .then(response => {
      return {
        id: response.game[0]._id,
        board: parseCells(response.game[0].cells),
        over: response.game[0].over
      }
    })
    .then(controller.loadGame)
    .catch(controller.failed)
}

const onPlay = function (event) {
  const move = event.target.id
  const moved = controller.playMove(move)
  if (moved) {
    // console.log('moved', moved)
    api.sendMove(moved.gameID, moved.move, moved.turn, moved.over)
      .then(() => controller.afterMove(moved.over, moved.winner))
      .catch(controller.failed)
  }
  // else {
  // // should distinguish between moving on a taken square and moving on a completed board
  //   controller.failed('Could not play move')
  // }

  // controller.playMove(move)
  //   .then(moved => api.sendMove(moved.id, moved.move, moved.turn, moved.over))
  //   .then(game => controller.afterMove(game.over))
  //   .catch(controller.failed)
}

const onDelete = function (event) {
  const data = handleForm(event)
  // console.log(data)

  api.deleteGame(data.game.id)
    .then((response) => controller.deleteGame(data.game.id))
    .catch(controller.failed)
}

const onGameList = function (event) {
  // fix this, don't call the api again
  if ($(event.target).hasClass('load')) {
    // $('#old-games').find() ... $(event.target).data('gameid'); return {id, cells, over}
    api.getGame($(event.target).data('gameid'))
      .then(response => {
        return {
          id: response.game[0]._id,
          board: parseCells(response.game[0].cells),
          over: response.game[0].over
        }
      })
      .then(controller.loadGame)
      .catch(controller.failed)
  }

  if ($(event.target).hasClass('delete')) {
    api.deleteGame($(event.target).data('gameid'))
      .then(controller.deleteGame)
      .then(onGetAll)
      .catch(controller.failed)
  }
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onPlay,
  onDelete,
  onGameList
}
