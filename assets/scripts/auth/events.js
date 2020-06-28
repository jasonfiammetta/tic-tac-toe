const api = require('./api.js')
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
    .then(response => {
      console.log('events.js sign up response', response)
      controller.signUp(response)
    })
    .then(response => {
      delete data.credentials.password_confirmation
      return api.logIn(data)
    })
    .then(controller.logIn)
    .catch(error => controller.failed('Could not sign up with those credentials.', error))
}

const onLogIn = function (event) {
  const data = handleForm(event)

  api.logIn(data)
    .then(controller.logIn)
    .catch(error => controller.failed('Could not log in with those credentials.', error))
}

const onChangePassword = function (event) {
  const data = handleForm(event)

  api.changePassword(data)
    .then(controller.changePassword)
    .catch(error => controller.failed('Could not change password with those credentials.', error))
}

const onLogOut = function (event) {
  handleForm(event)

  api.logOut()
    .then(controller.logOut)
    .catch(error => controller.failed('Could not sign out.', error))
}

module.exports = {
  onSignUp,
  onLogIn,
  onChangePassword,
  onLogOut
}
