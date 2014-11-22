'use strict';

module.exports = function() {
  var prompt = require('prompt');
  prompt.message = '';
  prompt.delimiter = '';
  var Q = require('q');

  var deferredInput = Q.defer();

  this.setInputHandler = function(inputHandler) {
    deferredInput.resolve(inputHandler);
  }

  this.handleOutput = function(output) {
    console.log(output.toString());
    getConsoleInput();
  }

  var handleInput = function(result){
    if(result['>'] == 'quit'){
      process.exit(0);
    }
    return deferredInput.promise
      .then(function(inputHandler){
        return inputHandler(result['>']);
      });
  }

  var getConsoleInput = function() {
    Q.ninvoke(prompt, 'get', '>')
      .then(handleInput)
  }

  this.start = function() {
    prompt.start();
  }
}
