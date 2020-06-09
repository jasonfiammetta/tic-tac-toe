const store = require('./../store.js')

const $auth = $('#auth-message')
const $loggedIn = $('.logged-in')
const $loggedOut = $('.not-logged-in')
const $allForms = $('form')
const authMessage = function (message, fail) {
  $auth.text(message)
    .removeClass()
  !fail ? $auth.addClass('success') : $auth.addClass('fail')
}

const logIn = function (response) {
  console.log('Signed in!', response)
  authMessage('Signed in!')
  store.user = response.user
  console.log('store token', store.user.token)
  $loggedIn.show()
  $loggedOut.hide()
  $allForms.trigger('reset')
}

const logOut = function () {
  console.log('Signed out!')
  $('#auth-message').text('Signed out!')
    .removeClass()
    .addClass('success')
  store.user = null
  console.log('empty user', store.user)
  $loggedOut.show()
  $loggedIn.hide()
  $allForms.trigger('reset')
}

const fail = function (message) {
  console.log('auth ui failed', message)
  authMessage('failed', true)
}

module.exports = {
  logIn,
  logOut,
  fail
}
