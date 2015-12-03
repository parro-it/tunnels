'use strict';
const electron = require('electron');
const menubar = require('menubar');
const electronDebug = require('electron-debug');
const electronDetach = require('electron-detach');

if (electronDetach({ requireCmdlineArg: false })) {
  electronDebug();

  const mb = menubar({
    dir: __dirname + '/src/',
    preloadWindow: true,
    'window-position': 'trayBottomLeft'
  });

  mb.on('ready', () => {
    mb.tray.setContextMenu(
      electron.Menu.buildFromTemplate([{
        label: 'Edit tunnels',
        click: () => mb.showWindow()
      }, {
        label: 'Exit',
        click: () => electron.app.quit()
      }])
    );
    mb.window.setSkipTaskbar(true);
    mb.window.webContents.executeJavaScript('require("./app.js");');
  });
}

