'use strict';
const electron = require('electron');
const ipc = electron.ipcMain;

const window = require('electron-window');
const path = require('path');
const menubar = require('menubar');
const electronDebug = require('electron-debug');
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
    }])
  );
  mb.window.webContents.executeJavaScript('require("./app.js");');


});

let editWindow;

ipc.on('edit-tunnel', (ev, tunnelId) => {
  if (editWindow) {
    editWindow.focus();
    return;
  }
  editWindow = window.createWindow({
    width: 300, height: 600, frame: false
  });
  const indexPath = path.resolve(__dirname, 'src/index.html');
  editWindow.showUrl(indexPath, { tunnelId }, () => {
    editWindow.webContents.executeJavaScript('require("./edit.js");');
  });


  editWindow.once('closed', () => {
    editWindow = null;
  });

  ipc.once('saved', () => {
    mb.window.webContents.send('tunnel-saved');
  });
});
