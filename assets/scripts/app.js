'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events.js')
const gameEvents = require('./game-logic/events.js')

$(() => {
  $('.logged-in').hide()
  $('.game').hide()

  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#log-in').on('submit', authEvents.onLogIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#log-out').on('submit', authEvents.onLogOut)

  $('#start-game').on('click', gameEvents.onStart)
  $('.board-square').on('click', gameEvents.onPlay)
})
