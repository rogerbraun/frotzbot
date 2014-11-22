'use strict';

exports.startFrotzbot = function(frotzWrapper, ioHandler) {
  frotzWrapper.setOutputHandler(ioHandler.handleOutput);
  ioHandler.setVM(frotzWrapper);
  frotzWrapper.start();
  ioHandler.start();
}
