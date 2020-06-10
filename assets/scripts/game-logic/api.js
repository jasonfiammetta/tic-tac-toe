const api = require('./../api')
const store = require('./../store')

// const signUp = function (data) {
//   return api.createCall('POST', '/sign-up')
//     .addBody('credentials', data.credentials)
//     .callAjax()
// }

const getGames = function (over) {
  let overPath = ''
  if (arguments.length === 1) {
    over ? overPath = '?over=true' : overPath = '?over=false'
  }
  return api.createCall('GET', '/games' + overPath)
    .addHeader(store.user.token)
    .callAjax()
}

const createGame = function () {
  return api.createCall('POST', '/games')
    .addHeader(store.user.token)
    .callAjax()
}
const getGame = function (id) {
  return api.createCall('GET', '/games/' + id)
    .addHeader(store.user.token)
    .callAjax()
}

const deleteGame = function (id) {}
const watchGame = function (id) {}

const sendMove = function (id, moveObject) {
  return api.createCall('PATCH', '/games/' + id)
    .addHeader(store.user.token)
    .addBody('game', moveObject)
    .callAjax()
}

// {
//   "game": {
//     "cell": {
//       "index": 0,
//       "value": "x"
//     },
//     "over": false
//   }
// }

module.exports = {
  getGames,
  createGame,
  getGame,
  sendMove,
  deleteGame,
  watchGame
}
