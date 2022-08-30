const { Requester, Validator } = require('@goplugin/external-adapter')
require("dotenv").config();

const customError = (data) => {
  if (data.Response === 'Error') return true
  return false
}

const customParams = {
}
const createRequest = (input, callback) => {
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${input.data.fsyms}&tsyms=${input.data.tsyms}`
  
  console.log(input.data.endpoint)
  const config = {
    url
  }
  if (process.env.API_KEY) {
    config.headers = {
      Authorization: process.env.API_KEY
    }
  }
  console.log("config value is", config);
  Requester.request(config, customError)
    .then(response => {
      const res = {
        data: {
          "result": response.data[`${input.data.fsyms}`][`${input.data.tsyms}`].toString()
        }
      }
      callback(response.status, Requester.success(input.id, res));
    })
    .catch(error => {
      callback(500, Requester.errored(input.id, error))
    })
}

module.exports.createRequest = createRequest
