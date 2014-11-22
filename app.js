var FrotzWrapper = require('./modules/frotz_wrapper/frotz_wrapper.js');
var CMD = require('./modules/cmd/cmd.js');
var IRC = require('./modules/irc/irc.js');
var starter = require('./modules/starter/starter.js');


var frotz = new FrotzWrapper();
var irc = new IRC();

starter.startFrotzbot(frotz, irc);
