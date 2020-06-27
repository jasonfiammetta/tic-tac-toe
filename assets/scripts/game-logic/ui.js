const $boardMessage = $('#board-message')
const $board = $('.board')
const $allForms = $('form')
const $oldGames = $('#old-games')

const displayBoard = function (board) {
  for (let id = 0; id < board.length; id++) {
    $('#' + id).text(xo(board[id]))
  }
}

const clearBoard = function () {
  displayBoard(
    [0, 0, 0,
      0, 0, 0,
      0, 0, 0]
  )
}

const xo = function (val) {
  return ['o', ' ', 'x'][val + 1]
}

// Really consider just using gameLoad
const gameStart = function () {
  $boardMessage.text('New Game!') // Would have to find a way to pass the right message if I did
  clearBoard()
  $board.show()
}

const playMove = function (move, turn) {
  console.log('ui playMove', move)
  const xoturn = xo(turn)
  $('#' + move).text(xoturn)
  $boardMessage.text(`Played ${xoturn} in spot ${move}!`)
}

const gameOver = function (winner) {
  // cross line for winner if there is one
  let winString
  if (winner === 'x') {
    winString = 'X wins!'
  } else if (winner === 'o') {
    winString = 'O wins!'
  } else {
    winString = 'It\'s a draw!'
  }
  $boardMessage.text('Game over! ') // + winString)
}

const loadGame = function (board) {
  displayBoard(board)
  $board.show()
  $boardMessage.text('Game loaded!')
  $allForms.trigger('reset')
}

const deleteGame = function () {
  clearBoard()
  $boardMessage.text('Game deleted!')
  $allForms.trigger('reset')
}

const clearOldGames = function () {
  $oldGames.html('')
}

const addOldGame = function (game) {
  $oldGames.append(`<li class="old-game">
    <p>${game.updatedAt}</p>
    <button type="button" class="load btn" data-gameID="${game._id}">Load game</button>
    <button type="button" class="delete btn" data-gameID="${game._id}">Delete game</button>
  </li>`)
}

const addOldGames = function (gameObject) {
  console.log(gameObject)
  console.log(gameObject.games)
  gameObject.games.forEach(addOldGame)
}

const switchTurns = function () {
  // flip a switch
  // $switch.toggleclass('flip')
}

const failed = function (message) {
  $allForms.trigger('reset')
  $boardMessage.text(message)
}

module.exports = {
  displayBoard,
  gameStart,
  playMove,
  gameOver,
  loadGame,
  deleteGame,
  clearOldGames,
  addOldGames,
  switchTurns,
  failed
}
