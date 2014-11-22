'use strict';

module.exports = function() {
  var irc = require('irc');
  var Q = require('q');
  var nickname = 'zorkbot2';
  var channel = '#zork2';
  var client = new irc.Client('irc.psigenix.net', nickname, { channels: [channel] });

  client.addListener('error', function(message) {
    console.log('error: ', message);
  });

  var deferredInput = Q.defer();
  var deferredOutput = Q.defer();

  this.setInputHandler = function(inputHandler) {
    deferredInput.resolve(inputHandler);
  }

  this.handleOutput = function(output) {
    deferredOutput.promise.then(function(client){
      client.say(channel, output);
    });
  }

  var greetUser = function(nick) {
    client.say(channel, "Hi " + nick + "! If you want to play zork, start your message with a '!'.");
  };

  this.start = function(){
    client.addListener('message' + channel, function(from, message) {
      if(message.charAt(0) === '!') {
        return deferredInput.promise
          .then(function(inputHandler){
            return inputHandler(message.substring(1));
          });
      }
    });

    client.addListener('join' + channel, function(joined_nick) {
      deferredOutput.resolve(client);
      if(joined_nick != nickname) {
        greetUser(joined_nick);
      }
    });
  }

  return this;
}
