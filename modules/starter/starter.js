'use strict';

exports.startFrotzbot = function(frotzWrapper, ioHandler) {
  frotzWrapper.setOutputHandler(ioHandler.handleOutput);
  ioHandler.setInputHandler(frotzWrapper.handleInput);
  frotzWrapper.start();
  ioHandler.start();
}
