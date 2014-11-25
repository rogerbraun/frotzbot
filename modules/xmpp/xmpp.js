// All stolen from https://gist.github.com/powdahound/940969
// Thanks, powdahound!

module.exports = function(settings) {
  var settings = settings;
  var Q = require('q');
  var xmpp = require('node-xmpp');

// Config (get details from https://www.hipchat.com/account/xmpp)
  var jid = settings.jid;
  var password = settings.password;
  var room_jid = settings.room_jid;
  var room_nick = settings.room_nick;

  var client = new xmpp.Client({
    jid: jid + '/bot',
    password: password
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
      client.send(new xmpp.Element('message', { to: room_jid+'/'+room_nick, type: 'groupchat' }).
          c('body').t(output)
          );
    });
  }

  this.handleOutput = handleOutput;

  var messageHandler = function(message) {
    if(message.charAt(0) === '!') {
      handleInput(message.substring(1));
    }
  };

  var addInputListener = function() {
    client.on('stanza', function(stanza) {
      // always log error stanzas
      if (stanza.attrs.type == 'error') {
        console.log('[error] ' + stanza);
        return;
      }

      if (stanza.is('presence')) {
        if (stanza.attrs.from == room_jid+'/'+room_nick) {
          // We joined and are ready to talk
          deferredOutput.resolve(client);
          return;
        }
      }

      // ignore everything that isn't a room message
      if (!stanza.is('message') || !stanza.attrs.type == 'groupchat') {
        return;
      }

      // ignore messages we sent
      if (stanza.attrs.from == room_jid+'/'+room_nick) {
        return;
      }

      var body = stanza.getChild('body');
      // message without body is probably a topic change
      if (body) {
        var message = body.getText();
        messageHandler(message);
      }
    });
  };

  var addPresenceListener = function(){
    client.on('online', function() {

      client.send(new xmpp.Element('presence', { type: 'available' }).
          c('show').t('chat')
          );

      client.send(new xmpp.Element('presence', { to: room_jid+'/'+room_nick }).
          c('x', { xmlns: 'http://jabber.org/protocol/muc' })
          );

      // Keepalive
      setInterval(function() {
        client.send(' ');
      }, 30000);
    });
  };


  this.start = function(){
    addPresenceListener();
    addInputListener();
  }

  return this;
}
