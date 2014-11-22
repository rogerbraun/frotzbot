'use strict';

module.exports = function(settings) {
  var settings = settings;
  var irc = require('irc');
  var Q = require('q');
  var client = new irc.Client(settings.server, settings.nickname, { channels: [settings.channel] });

  client.addListener('error', function(message) {
    console.log('error: ', message);
  });

  var deferredOutput = Q.defer();

  var deferredVM = Q.defer();

  this.setVM = function(VM) {
    deferredVM.resolve(VM);
  }

  var handleInput = function(input) {
    deferredVM.promise.then(function(VM) {
      VM.handleInput(input);
    });
  }

  var handleOutput = function(output) {
    deferredOutput.promise.then(function(client){
      client.say(settings.channel, output);
    });
  }

  this.handleOutput = handleOutput;

  var gameListPromise = function() {
    return deferredVM.promise.then(function(VM) {
      return VM.gameList().join(", ");
    });
  }

  var startGame = function(gameName) {
    return deferredVM.promise.then(function(VM) {
      VM.startGame(gameName);
    });
  }

  var greetUser = function(nick) {
    client.say(settings.channel, "Hi " + nick + "! If you want to play zork, start your message with a '!'.");
  };

  var messageHandler = function(message) {
    if(message.charAt(0) === '!') {
      switch(true){
        case /^!gamelist/.test(message):
          gameListPromise().then(handleOutput);
          break;
        case /^!startgame/.test(message):
          var gameName = message.split(" ").pop();
          startGame(gameName);
          break;
        default:
          handleInput(message.substring(1));
      }
    }
  };

  var addInputListener = function() {
    client.addListener('message' + settings.channel, function(from, message) {
      messageHandler(message);
    });
  };

  var addJoinListener = function() {
    client.addListener('join' + settings.channel, function(joined_nick) {
      // We have joined the channel, so we are ready to output.
      deferredOutput.resolve(client);

      // Someone else joined, let's say hello.
      if(joined_nick != settings.nickname) {
        greetUser(joined_nick);
      }
    });
  };

  this.start = function(){
    addInputListener();
    addJoinListener();
  }

  return this;
}
