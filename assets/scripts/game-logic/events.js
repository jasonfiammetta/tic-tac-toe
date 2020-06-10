const api = require('./api.js')
const controller = require('./controller.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

// shouldn't need this twice, but if I put it in ./../api.js then event.preventDefault doesn't trigger
const handleForm = function (event) {
  event.preventDefault()

  console.log(event)
  const formFields = getFormFields(event.target)
  console.log('form', formFields)

  return formFields
}

const onStart = function () {
  api.createGame()
    .then(controller.startGame)
    .catch(console.log)
}

const onGetAll = function () {
  console.log(api.getGames())
}

const onLoad = function (event) {
  const data = handleForm(event)
  console.log(data)

  api.getGame(data.game.id)
    .then(controller.loadGame)
    .catch(console.log)
}

const onPlay = function (event) {
  const move = event.target.id
  const moveResponse = controller.playMove(move)
  if (moveResponse) {
    api.sendMove(moveResponse.gameID, moveResponse.moveObject)
    // This line should really be in controller somehow
    moveResponse.moveObject.over ? controller.endGame() : controller.switchTurns()
  }
}

const onDelete = function (event) {
  const data = handleForm(event)
  console.log(data)

  api.deleteGame(data.game.id)
    .then(ui.deleteGame)
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onDelete,
  onPlay
}
