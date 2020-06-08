'use strict'

const store = {
}

const getToken = function () {
  if (store.user) { return store.user.token }
  if (store.token) {
    console.log('store.js: Token found in wrong place')
    return store.token
  }
  return 'No token found'
}

module.exports = {
  store,
  getToken
}
