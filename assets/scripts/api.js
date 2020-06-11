const config = require('./config')
// const getFormFields = require('./../../lib/get-form-fields.js')

// Build new call object
const apiCall = {
  call: {},
  clear: function () {
    this.call = {}
  },
  addHeader: function (token) {
    this.call.headers = {
      Authorization: 'Token token=' + token
    }
    return this
  },
  addBody: function (bodyName, data) {
    this.call.data = {
      [bodyName]: data
    }
    return this
  },
  callAjax: function () {
    console.log('apiCall', this.call)
    return $.ajax(this.call)
  }
}

const createCall = function (method, path) {
  apiCall.clear()
  apiCall.call.method = method
  apiCall.call.url = config.apiUrl + path
  return apiCall
}

// const handleForm = function (event) {
//   // console.log('epd', event.preventDefault())
//
//   console.log(event)
//   const formFields = getFormFields(event.target)
//   console.log('form', formFields)
//
//   return formFields
// }

module.exports = {
  createCall
  // handleForm
}
