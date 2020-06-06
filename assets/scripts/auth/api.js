const config = require('./../config')
const store = require('./../store')

const apiCall = function (method, path) {
  return {
    method: method,
    path: config.apiUrl + path
  }
}

const addHeader = function (call, token) {
  call['headers'] = 'Authorization: Token token=' + token
}

const addBody = function (call, body, data) {
  call['data'] = { [body]: data }
}

const ajaxCall = function (call) {
  console.log('ajax call', call)
  return $.ajax(call)
}

// const signUp = function (data) {
//   const call = apiCall('POST', '/sign-up')
//   addBody(call, 'credentials', data.credentials) // this is a workaround
//
//   // Handle ajax call for signUp then send ajax call for log in instead
//   // return logIn()
//   return ajaxCall(call)
//
//   // I'd love to be able to write:
//   // newCall().addMethod('POST').addPath('sign-up').addBody(data).call()
//   // Where newCall() creates a call object, which can allow methods to be chained onto it
//   // and then be executed in ajax by .call()
//   // I think I can write an object with the functions to do this? But how do I make sure
//   // I do a new call every time and forget any data from the old one?
//   // Maybe .call() can wipe the object's own data, in addition to doing the ajax call.
// }
const signUp = function (creds) {
  const call = {
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: {
      credentials: {
        email: creds.email,
        password: creds.password,
        password_confirmation: creds.password_confirmation
      }
    }
  }
  console.log(call)
  return $.ajax(call)
}

const logIn = function (data) {
  const call = apiCall('POST', '/sign-in')
  addBody(call, 'credentials', data.credentials)
  return ajaxCall(call)
}

const changePassword = function (data) {
  const call = apiCall('PATCH', 'change-password')
  addHeader(call, store.user.token)
  addBody(call, 'passwords', data.passwords)
  return ajaxCall(call)
}

const logOut = function (data) {
  const call = apiCall('DELETE', 'sign-out')
  addHeader(call, store.user.token)
  return ajaxCall(call)
}

module.exports = {
  signUp,
  logIn,
  changePassword,
  logOut
}
