const api = require('./../api')

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
}

const createGame = function () {}
const getGame = function () {}

const deleteGame = function () {}
const watchGame = function () {}

const sendMove = function (move, over) {
  // use api functionality
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
