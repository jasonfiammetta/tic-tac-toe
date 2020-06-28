const store = require('./../store')

const $auth = $('#auth-message')
const $changePass = $('#password-message')
const $loggedIn = $('.logged-in')
const $loggedOut = $('.not-logged-in')
const $board = $('.board')
const $allForms = $('form')

const authMessage = function (message, fail) {
  $auth.text(message).removeClass()
  !fail ? $auth.addClass('success') : $auth.addClass('failure')
}

const signUp = function () {
  authMessage(`Welcome to Tic Tac Toe, ${store.user.email}!`)
  $loggedIn.show()
  $loggedOut.hide()
  $allForms.trigger('reset')
}

const logIn = function () {
  if (!$auth.text().includes('Welcome')) {
    authMessage(`Welcome back, ${store.user.email}!`)
  }
  $loggedIn.show()
  $loggedOut.hide()
  $allForms.trigger('reset')
}

const changePassword = function () {
  $allForms.trigger('reset')
  $changePass.text('Password change confirmed!')
}

const logOut = function () {
  authMessage('Signed out! Come back soon!')
  $loggedOut.show()
  $loggedIn.hide()
  $board.hide()
  $allForms.trigger('reset')
}

const fail = function (message) {
  console.log('auth ui failed', message)
  message.includes('password') ? $changePass.text(message) : authMessage(message, true)
  $allForms.trigger('reset')
}

module.exports = {
  signUp,
  logIn,
  changePassword,
  logOut,
  fail
}
