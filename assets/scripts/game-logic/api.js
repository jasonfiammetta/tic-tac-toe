const api = require('./../api')
const store = require('./../store')

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

const deleteGame = function (id) {
  return api.createCall('DELETE', '/games/' + id)
    .addHeader(store.user.token)
    .callAjax()
}

const sendMove = function (id, move, turn, over) {
  return api.createCall('PATCH', '/games/' + id)
    .addHeader(store.user.token)
    .addBody('game', buildMove(move, turn, over))
    .callAjax()
}

const buildMove = function (move, turn, over) {
  return {
    cell: {
      index: move,
      value: xo(turn)
    },
    over: over
  }
}

const xo = function (val) {
  return ['o', ' ', 'x'][val + 1]
}

module.exports = {
  getGames,
  createGame,
  getGame,
  sendMove,
  deleteGame
}
