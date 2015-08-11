'use strict';

function ApiHandler(response) {

  function ApiSuccess(data) {
    var errorResponseBody = {
      'status': 'success',
      'data': data
    };

    response.send(errorResponseBody);
  }

  function ApiError(err) {
    var errorResponseBody = {
      'status': 'error',
      'error': err
    };

    response.send(500, errorResponseBody);
  }
  
  this.sendSuccess = ApiSuccess;
  this.sendError = ApiError;
}

module.exports = ApiHandler;
