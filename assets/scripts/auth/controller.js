const ui = require('./ui.js')
const store = require('./../store')

const currentUser = {
  user: null,
  loggedIn: false,
  getToken: function () { return this.user.token },
  signUp: function (userResponse) {
    // console.log('Signed up!', userResponse)
    this.user = userResponse.user
    store.user = this.user
  },
  logIn: function (userResponse) {
    // console.log('Signed in!', userResponse)
    this.user = userResponse.user
    store.user = this.user
    // console.log('stored token', this.getToken())
    this.loggedIn = true
  },
  logOut: function () {
    this.user = null
    store.user = this.user
    this.loggedIn = false
    // console.log('Signed out!')
    // console.log('empty user', this.user)
  }
}

const signUp = function (response) {
  currentUser.signUp(response)
  ui.signUp()
}

const logIn = function (response) {
  currentUser.logIn(response)
  ui.logIn()
}

const changePassword = function () {
  ui.changePassword()
}

const logOut = function () {
  currentUser.logOut()
  ui.logOut()
}

const failed = function (message, error) {
  console.error('api controller error: ' + message, error)
  ui.fail(message)
}

module.exports = {
  signUp,
  logIn,
  changePassword,
  logOut,
  failed
}
