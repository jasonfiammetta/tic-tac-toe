const $boardMessage = $('#board-message')
const $board = $('.board')
const $allForms = $('form')

const displayBoard = function (board) {
  for (let id = 0; id < board.length; id++) {
    $('#' + id).text(xo(board[id]))
  }
}

const xo = function (val) {
  return ['O', ' ', 'X'][val + 1]
}

// Really consider just using gameLoad
const gameStart = function () {
  $boardMessage.text('New Game!') // Would have to find a way to pass the right message if I did
  displayBoard([0, 0, 0, // bit sloppy
    0, 0, 0,
    0, 0, 0])
  $board.show()
}

const playMove = function (move, xo) {
  console.log('ui playMove', move)
  $('#' + move).text(xo)
  $boardMessage.text(`Played ${xo} in spot ${move}!`)
}

const gameOver = function () {
  // cross line for winner if there is one
  $boardMessage.text('Game over!')
}

const loadGame = function (board) {
  displayBoard(board)
  $board.show()
  $boardMessage.text('Game loaded!')
  $allForms.trigger('reset')
}

const deleteGame = function () {
  $boardMessage.text('Game deleted!')
  $allForms.trigger('reset')
}

const failed = function (message) {
  $boardMessage.text(message)
}

module.exports = {
  displayBoard,
  gameStart,
  playMove,
  gameOver,
  loadGame,
  deleteGame,
  failed
}
