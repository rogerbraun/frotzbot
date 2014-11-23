var nconf = require('nconf');

nconf
  .argv()
  .env()
  .file({ file: "./config/config.json" })
  .defaults({
    io: 'cmd',
    vm: 'frotz_wrapper',
    vm_settings: {
      games_path: './games',
      bin_path: './frotz_bin/dfrotz'
    }
  });

var starter = require('./modules/starter/starter.js');

var vm, io, VM, IO;

switch(nconf.get('vm')) {
  case 'frotz_wrapper':
    VM = require('./modules/vm/frotz_wrapper/frotz_wrapper.js');
    break;
  default:
    throw new Error("Invalid vm name");
}

switch(nconf.get('io')) {
  case 'irc':
    IO = require('./modules/irc/irc.js');
    break;
  case 'cmd':
    IO = require('./modules/cmd/cmd.js');
    break;
  default:
    throw new Error("Invalid io name");
}

vm = new VM(nconf.get('vm_settings'));
io = new IO(nconf.get('io_settings'));

starter.startFrotzbot(vm, io);
