const api = require('./api.js')
// const ui = require('./ui.js')
const controller = require('./controller.js')
const getFormFields = require('./../../../lib/get-form-fields.js')

// shouldn't need this twice, but if I put it in ./../api.js then event.preventDefault doesn't trigger
const handleForm = function (event) {
  event.preventDefault()

  console.log(event)
  const formFields = getFormFields(event.target)
  console.log('form', formFields)

  return formFields
}

const onSignUp = function (event) {
  const data = handleForm(event)
  console.log(data)
  api.signUp(data)
    .then(controller.signUp)
    .then(response => {
      delete data.credentials.password_confirmation
      return api.logIn(data)
    })
    .then(controller.logIn)
    .catch(response => console.log('failed sign up and log in combined', response))
}

const onLogIn = function (event) {
  const data = handleForm(event)

  api.logIn(data)
    .then(controller.logIn)
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
  // event.preventDefault()
  handleForm(event)

  api.logOut()
    .then(controller.logOut)
    .catch(response => console.log('failed sign out', response))
}

module.exports = {
  onSignUp,
  onLogIn,
  onChangePassword,
  onLogOut
}
