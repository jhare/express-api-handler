# express-api-handler
A really dumb API handler to make your responses consistent.

## Example
(click [here](/theOnlyExample.js) for the full example)

```js

// ....

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

    reject(withAnErrorMessage); // This could be an object; whatever, doesn't matter.
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


// ...

```
