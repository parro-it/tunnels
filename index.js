'use strict';
const electron = require('electron');
const ipc = electron.ipcMain;

const window = require('electron-window');
const path = require('path');
const menubar = require('menubar');
const electronDebug = require('electron-debug');
const openTunnel = require('./src/ssh');

electronDebug();

const mb = menubar({
  dir: __dirname + '/src/',
  preloadWindow: true
});

mb.on('ready', () => {
  mb.window.webContents.executeJavaScript('require("./app.js");');
});

ipc.once('exit', () => {
  electron.app.quit();
});

ipc.on('confirm-delete', (e, tunnelName) => {
  e.returnValue = electron.dialog.showMessageBox({
    buttons: ['Yes', 'No'],
    type: 'question',
    title: 'confirm deletion',
    message: `Delete tunnel ${tunnelName}?`

  }) === 0;
});

ipc.on('test-tunnel', (ev, t) => {
  openTunnel(t);
});

let editWindow;

ipc.on('edit-tunnel', (ev, tunnelId) => {
  if (editWindow) {
    editWindow.focus();
    return;
  }
  editWindow = window.createWindow({width: 300, height: 600});
  const indexPath = path.resolve(__dirname, 'src/index.html');
  editWindow.showUrl(indexPath, { tunnelId }, () => {
    editWindow.webContents.executeJavaScript('require("./edit.js");');
  });


  editWindow.once('closed', () => {
    editWindow = null;
  });

  ipc.once('close', () => {
    editWindow.close();
    editWindow = null;
  });

  ipc.once('saved', () => {
    mb.window.webContents.send('tunnel-saved');
  });
});
