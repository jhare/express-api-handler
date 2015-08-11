'use strict';

var rsvp = require('rsvp');
var express = require('express');

//var DumbAPI = require('express-dumb-api-handler');
// Use the commented line above in the real world, dummy.
var DumbAPI = require('./index');

var myApp = express();

function succeedAtWork() {
  return new rsvp.Promise(function succeed(resolve) {
    var withSomeData = {
      'i': 'am',
      'successful': 'data'
    };

    resolve(withSomeData);
  });
}

function failAtWork() {
  return new rsvp.Promise(function succeed(resolve) {
    var withAnErrorMessage = 'You failed';

    resolve(withAnErrorMessage); // This could be an object; whatever, doesn't matter.
  });
}

myApp.get('/success', function success(request, response) {
  var dumbAPI = new DumbAPI(response);

  // See, now it's simple when your function resolves or rejects the thing
  // you want your API to return
  succeedAtWork().then(dumbAPI.sendSuccess, dumbAPI.sendError);
});

myApp.get('/failure', function failure(request, response) {
  var dumbAPI = new DumbAPI(response);
  failAtWork().then(dumbAPI.sendSuccess, dumbAPI.sendFailure);
});

var port = 8080;
myApp.listen(port);
console.log('Listening on port ' + port);
