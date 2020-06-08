
const xo = function (val) {
  return ['o', '', 'x'][val + 1]
}

const displayBoard = function (board) {
  for (let id = 0; id < board.length; id++) {
    $('#' + id).text(xo(board[id]))
  }
}

const gameStart = function () {
  $('#board-message').text('New Game!')
}

const playMove = function (move) {
  $('#' + move.index).text(move.value)
  $('#board-message').text(`Played move in spot ${move.index}!`)
}

const gameOver = function () {
  $('#board-message').text('Game over!')
}

module.exports = {
  displayBoard,
  gameStart,
  playMove,
  gameOver
}
