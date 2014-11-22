'use strict';

module.exports = function(settings) {
  var settings = settings;
  var spawn = require('child_process').spawn;
  var Q = require('q');
  var fs = require('fs');
  var path = require('path');
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

  this.gameList = function() {
    return fs.readdirSync(settings.games_path);
  }

  this.startGame = function (gameName) {
    if(frotz) {
      frotz.kill();
    };

    var gamePath = path.join(settings.games_path, gameName);
    frotz = spawn(settings.bin_path, [gamePath]);
    frotz.stdout.on('data', handleOutput);
    frotz.stderr.on('data', handleOutput);
  };

  this.start = function(){
    var firstGame = this.gameList()[0];
    this.startGame(firstGame);
  }

  this.handleInput = function(input) {
    frotz.stdin.write(input + "\n");
  }

  return this;
}
