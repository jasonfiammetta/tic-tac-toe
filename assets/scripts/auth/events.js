const api = require('./api.js')
// const store = require('./../store.js')
const ui = require('./ui.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

const handleForm = function (event) {
  event.preventDefault()

  console.log(event)
  const formFields = getFormFields(event.target)
  console.log('form', formFields)

  return formFields
}

const onSignUp = function (event) {
  const data = handleForm(event)

  api.signUp(data)
    .then(response => {
      console.log('Signed up!', response)
    })
    .catch(response => console.log('failed sign up', response))
    // .then(controller.logIn) // Auto log in
    // .then(ui.signUp, ui.logIn) // Say welcome new user, you're logged in now
    // .catch(ui.fail)
}

const onLogIn = function (event) {
  const data = handleForm(event)

  api.logIn(data)
    .then(ui.logIn)
    .catch(response => console.log('failed sign in', response))
    // .then(controller.logIn)
    // .then(ui.logIn)
    // .catch(ui.fail)
}

const onChangePassword = function (event) {
  const data = handleForm(event)

  api.changePassword(data)
    .then(response => {
      console.log('Changed password!', response)
    })
    .catch(response => console.log('failed change password', response))
    // .then(ui.changePassword)
    // .catch(ui.fail)
}

const onLogOut = function (event) {
  event.preventDefault()

  api.logOut()
    .then(ui.logOut)
    .catch(response => console.log('failed sign out', response))
}

module.exports = {
  onSignUp,
  onLogIn,
  onChangePassword,
  onLogOut
}
