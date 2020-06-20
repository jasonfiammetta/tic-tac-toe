const api = require('./api.js')
const controller = require('./controller.js')
const ui = require('./ui.js') // shouldn't need this
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
  // console.log(api.getGames())
  ui.clearOldGames() // Maybe check if api can even get the games first
  api.getGames()
    .then(ui.addOldGames)
}

const onLoad = function (event) {
  const data = handleForm(event)
  console.log(data)

  api.getGame(data.game.id)
    .then(controller.loadGame)
    // .catch(ui.loadFailed)
}

const onPlay = function (event) {
  const move = event.target.id
  const moveResponse = controller.playMove(move)
  if (moveResponse) {
    api.sendMove(moveResponse.gameID, moveResponse.moveObject)
    controller.afterMove(moveResponse.moveObject.over)
  }
}

const onDelete = function (event) {
  const data = handleForm(event)
  console.log(data)

  api.deleteGame(data.game.id)
    .then((response) => controller.deleteGame(data.game.id))
    .catch(console.log)
}

const onGameList = function (event) {
  console.log('gameList event', event)
  console.log('gameList event target', event.target)
  // console.log('gameList gameID', event.target.data('gameID'))
  // console.log('has class load?', event.target.hasClass('load'))
  // console.log('has class delete?', event.target.hasClass('delete'))
  console.log(event.target.getAttribute('data-gameid'))
  console.log(event.target.getAttribute('class'))

  // fix thisss Don't call the api again. Maybe we should just be passing game data to the controller.
  if (event.target.getAttribute('class') === 'load btn') {
    api.getGame(event.target.getAttribute('data-gameid'))
      .then(controller.loadGame)
  }
  // This is so brittle, fix iiit
  if (event.target.getAttribute('class') === 'delete btn') {
    api.deleteGame(event.target.getAttribute('data-gameid'))
      .then(controller.deleteGame)
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
