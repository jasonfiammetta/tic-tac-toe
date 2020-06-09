const $boardMessage = $('#board-message')

const displayBoard = function (board) {
  for (let id = 0; id < board.length; id++) {
    $('#' + id).text(board[id])
  }
}

const gameStart = function () {
  $boardMessage.text('New Game!')
  $('.board').show()
}

const playMove = function (move, xo) {
  console.log('ui playMove', move)
  $('#' + move).text(xo)
  $boardMessage.text(`Played ${xo} in spot ${move}!`)
}

const gameOver = function () {
  $boardMessage.text('Game over!')
}

module.exports = {
  displayBoard,
  gameStart,
  playMove,
  gameOver
}
