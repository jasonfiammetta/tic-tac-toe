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
  // console.log(api.getGames().games)
  // api.getGames().games.forEach(ui.addOldGame) // pass to controller instead of ui directly
  // <li class="old-game">
  //   <p>Time or date created, or number'th game</p>
  //   <button type="button" class="btn">Load game</button>
  //   <button type="button" class="btn">Delete game</button>
  // </li>
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
    .then((response) => controller.deleteGame(response, data.game.id)) // Need to send the id too because the docs lied again
    .catch(console.log)
}

module.exports = {
  onStart,
  onGetAll,
  onLoad,
  onDelete,
  onPlay
}
