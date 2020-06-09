const api = require('./../api')
const store = require('./../store')

const signUp = function (data) {
  return api.createCall('POST', '/sign-up')
    .addBody('credentials', data.credentials)
    .callAjax()
}

// const config = require('./../config')
// const signUp = function (data) {
//   console.log('credentials', data)
//   const call = {
//     url: config.apiUrl + '/sign-up',
//     method: 'POST',
//     data: {
//       credentials: {
//         email: data.credentials.email,
//         password: data.credentials.password,
//         password_confirmation: data.credentials.password_confirmation
//       }
//     }
//   }
//   console.log('call', call)
//   return $.ajax(call)
// }

const logIn = function (data) {
  return api.createCall('POST', '/sign-in')
    .addBody('credentials', data.credentials)
    .callAjax()
}

// const logIn = function (data) {
//   console.log('credentials', data)
//   const call = {
//     url: config.apiUrl + '/sign-in',
//     method: 'POST',
//     data: {
//       credentials: {
//         email: data.credentials.email,
//         password: data.credentials.password
//       }
//     }
//   }
//   console.log('call', call)
//   return $.ajax(call)
// }

const changePassword = function (data) {
  return api.createCall('PATCH', '/change-password')
    .addHeader(store.user.token)
    .addBody('passwords', data.passwords)
    .callAjax()
}
// const changePassword = function (data) {
//   console.log('passwords', data)
//   console.log('token', store.token)
//   const call = {
//     url: config.apiUrl + '/change-password',
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: {
//       passwords: {
//         old: data.passwords.old,
//         new: data.passwords.new
//       }
//     }
//   }
//   console.log('call', call)
//   return $.ajax(call)
// }

const logOut = function (data) {
  return api.createCall('DELETE', '/sign-out')
    .addHeader(store.user.token)
    .callAjax()
}
// const logOut = function () {
//   const call = {
//     url: config.apiUrl + '/sign-out',
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   }
//   console.log('call', call)
//   return $.ajax(call)
// }

module.exports = {
  signUp,
  logIn,
  changePassword,
  logOut
}
