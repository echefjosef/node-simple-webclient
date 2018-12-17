'use strict';

let https = require('http');

// Factory Contrstructor
// Object Constructor
function RestCall () {
  if (!(this instanceof RestCall)) {
    return new RestCall();
  }
}

// Generic HTTPS Call for Rest Services
RestCall.prototype.execute = function (options, body) {
  return new Promise(function (resolve, reject) {
    let req = https.request(options, function (res) {
      try {
        res.setEncoding('utf-8');

        let responseString = '';

        res.on('data', function (data) {
          responseString += data;
        });

        res.on('end', function () {
          // console.log(responseString);
          resolve(JSON.parse(responseString));
        });

        res.on('error', function (err) {
          console.log('Error in data connection: ' + err);
          reject(err);
        });
      } catch (err) {
        log.error('Error making web service call: ' + err);
        reject(err);
      }
    });

    if (body !== null && body !== undefined) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
};

module.exports = RestCall;
