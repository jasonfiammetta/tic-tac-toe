const config = require('./../config')

// Build new call object
const createCall = function (method, path) {
  return {
    method: method,
    path: config.apiUrl + path
  }
}

const addHeader = function (call, token) {
  call['headers'] = 'Authorization: Token token=' + token
}

const addBody = function (call, body, data) {
  call['data'] = { [body]: data }
}

// Use ajax call on gameObject
const apiCall = function (call) {
  return $.ajax(apiCall)
}

module.exports = {
  createCall,
  addHeader,
  addBody,
  apiCall
}
