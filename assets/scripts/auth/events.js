const api = require('./api.js')
// const ui = require('./ui.js')
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
    .then(response => console.log('Signed up!', response))
    .catch(response => console.log('failed sign up', response))
    // .then(ui.logIn)
    // .catch(ui.fail)

    // then Auto log in
}

const onLogIn = function (event) {
  const data = handleForm(event)

  api.logIn(data)
    .then(response => console.log('Signed in!', response))
    .catch(response => console.log('failed sign in', response))
    // .then(ui.logIn)
    // .catch(ui.fail)
}

const onChangePassword = function (event) {
  const data = handleForm(event)

  api.ChangePassword(data)
    .then(response => console.log('Changed password!', response))
    .catch(response => console.log('failed change password', response))
    // .then(ui.changePassword)
    // .catch(ui.fail)
}

const onLogOut = function (event) {
  api.logOut()
    .then(response => console.log('Signed out!', response))
    .catch(response => console.log('failed sign out', response))
    // .then(ui.logOut)
    // .catch(ui.fail)
}

module.exports = {
  onSignUp,
  onLogIn,
  onChangePassword,
  onLogOut
}
