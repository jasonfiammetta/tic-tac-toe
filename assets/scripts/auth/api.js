const api = require('./../api')
const store = require('./../store')

const signUp = function (data) {
  return api.createCall('POST', '/sign-up')
    .addBody('credentials', data.credentials)
    // .addSuccess(logIn, data)
    .callAjax()
}

const logIn = function (data) {
  return api.createCall('POST', '/sign-in')
    .addBody('credentials', data.credentials)
    .callAjax()
}

const changePassword = function (data) {
  return api.createCall('PATCH', '/change-password')
    .addHeader(store.user.token)
    .addBody('passwords', data.passwords)
    .callAjax()
}

const logOut = function (data) {
  return api.createCall('DELETE', '/sign-out')
    .addHeader(store.user.token)
    .callAjax()
}

module.exports = {
  signUp,
  logIn,
  changePassword,
  logOut
}
