'use strict';
const electron = require('electron');
const electronDebug = require('electron-debug');
const electronDetach = require('electron-detach');
const window = require('electron-window');

if (electronDetach({ requireCmdlineArg: false })) {
  electronDebug();
  electron.app.on('ready', () => {

    const listWindow = window.createWindow({
      width: 300,
      height: 400,
      frame: false,
      resizable: true,
      icon: __dirname + '/src/IconTemplate.png'
    });

    const indexPath = __dirname + '/src/index.html';
    listWindow.showUrl(indexPath);
  });
}

