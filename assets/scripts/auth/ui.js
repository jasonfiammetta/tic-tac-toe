const $auth = $('#auth-message')
const $loggedIn = $('.logged-in')
const $loggedOut = $('.not-logged-in')
const $board = $('.board')
const $allForms = $('form')
const authMessage = function (message, fail) {
  $auth.text(message)
    .removeClass()
  !fail ? $auth.addClass('success') : $auth.addClass('fail')
}

const logIn = function () {
  authMessage('Signed in!')
  $loggedIn.show()
  $loggedOut.hide()
  $allForms.trigger('reset')
}

const logOut = function () {
  $('#auth-message').text('Signed out!')
    .removeClass()
    .addClass('success')
  $loggedOut.show()
  $loggedIn.hide()
  $board.hide()
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
