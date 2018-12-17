'use strict'

let RestCall = require('./rest-call')

// Make a web call
function callUrl () {
  return new Promise(function (resolve, reject) {
    let reqHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.8',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
    }

    // update destination here
    let reqOptions = {
      hostname: "localhost",
      port: 80,
      path: "/api/healthcheck",
      method: 'GET',
      headers: reqHeaders
    }

    let authCall = new RestCall();
    authCall.execute(reqOptions)
      .then(function (results) {
        resolve(results)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}

callUrl().then(function(results) {
    console.log(results)
})
