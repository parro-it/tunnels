'use strict';
const electron = require('electron');
const electronDebug = require('electron-debug');
const electronDetach = require('electron-detach');
const window = require('electron-window');

if (electronDetach({ requireCmdlineArg: false })) {
  electronDebug();
  electron.app.on('ready', () => {

    const listWindow = window.createWindow({
      width: 750,
      height: 450,
      frame: false,
      resizable: false,
      icon: __dirname + '/src/IconTemplate.png'
    });

    listWindow.setMenu(null);
    const indexPath = __dirname + '/src/index.html';
    listWindow.showUrl(indexPath);
  });
}

