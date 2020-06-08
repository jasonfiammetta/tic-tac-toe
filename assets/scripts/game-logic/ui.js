
const displayBoard = function (board) {
  for (let id = 0; id < board.length; id++) {
    $('#' + id).text(board[id])
  }
}

const gameStart = function () {
  $('#board-message').text('New Game!')
}

const playMove = function (move, xo) {
  console.log('ui playMove', move)
  $('#' + move).text(xo)
  $('#board-message').text(`Played move in spot ${move}!`)
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
