'use strict';

module.exports = function() {
  var spawn = require('child_process').spawn;
  var Q = require('q');
  var frotz;
  var deferedOutput = Q.defer();

  var handleOutput = function(rawOutput){
    deferedOutput.promise.then(function(output) {
      output(rawOutput.toString());
    });
  }

  this.setOutputHandler = function(handler) {
    deferedOutput.resolve(handler);
  }

  this.start = function(){
    frotz = spawn('./frotz_bin/dfrotz', ['./games/zork1.z1']);
    frotz.stdout.on('data', handleOutput);
    frotz.stderr.on('data', handleOutput);
  }

  this.handleInput = function(input) {
    frotz.stdin.write(input + "\n");
  }

  return this;
}
