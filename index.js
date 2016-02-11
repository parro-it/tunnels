'use strict';
const electron = require('electron');
const electronDebug = require('electron-debug');
const electronDetach = require('electron-detach');
const window = require('electron-window');
const debug = require('debug')('tunnels');


if (electronDetach({ requireCmdlineArg: false })) {
  let listWindow;
  let closingApp = false;

  const focusMainWindow = () => {
    debug('focusMainWindow - listWindow is null:', listWindow === null);

    if (listWindow) {
      listWindow.show();
    }
  };

  if (electron.app.makeSingleInstance(focusMainWindow)) {
    debug('second app instance called. Exit');
    electron.app.exit(0);
    return;
  }

  electronDebug();

  electron.app.on('activate', focusMainWindow);

  electron.app.on('ready', () => {
    debug('app ready');

    listWindow = window.createWindow({
      width: 750,
      height: 530,
      minimizable: false,
      maximizable: false,
      resizable: false,
      fullscreenable: false,
      icon: __dirname + '/src/IconTemplate.png'
    });

    electron.app.on('before-quit', () => {
      debug('app before-quit');
      closingApp = true;
      listWindow.close();
    });

    listWindow.on('close', e => {
      if (closingApp) {
        return;
      }
      debug('preventing window close');
      e.preventDefault();
      listWindow.hide();
    });

    listWindow.setMenu(null);
    const indexPath = __dirname + '/src/index.html';
    listWindow.showUrl(indexPath);
  });


}

