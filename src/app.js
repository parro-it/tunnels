'use strict';

const join = require('path').join;
const nunjucks = require('nunjucks');
const domDelegate = require('dom-delegate');
const electron = require('electron');
const ipc = electron.ipcRenderer;
const model = require('./model');
const path = require('path');
const electronWindow = electron.remote.require('electron-window');

let editWindow;

function refreshList() {
  const tunnels = model.allTunnels();
  const template = nunjucks.render(
    join(__dirname, 'menu.html'),
    { tunnels }
  );

  document.body.innerHTML = template;
}


function editTunnel(ev, tunnelId) {
  if (editWindow) {
    editWindow.focus();
    return;
  }
  editWindow = electronWindow.createWindow({
    width: 300, height: 600, frame: false
  });
  const indexPath = path.resolve(__dirname, 'index.html');
  editWindow.showUrl(indexPath, { tunnelId }, () => {
    editWindow.webContents.executeJavaScript('require("./edit.js");');
  });


  editWindow.once('closed', () => {
    editWindow = null;
  });

  ipc.once('saved', () => {
    refreshList();
  });
}


function setup() {
  const delegate = domDelegate(document.body);

  refreshList();


  delegate.on('click', '.new-tunnel', () => {
    const tunnel = model.createTunnel();
    editTunnel(tunnel.tunnelId);
  });

  delegate.on('click', '.edit', (e, target) => {
    const tunnelId = target.dataset.tunnelId;
    editTunnel(tunnelId);
  });

  delegate.on('click', '.exit', () => {
    window.close();
  });

  delegate.on('click', '.delete', (e, target) => {
    const tunnelId = target.dataset.tunnelId;
    const tunnelName = model.getTunnel(tunnelId).tunnelName;
    const confirmed = electron.remote.dialog.showMessageBox({
      buttons: ['Yes', 'No'],
      type: 'question',
      title: 'confirm deletion',
      message: `Delete tunnel ${tunnelName}?`
    }) === 0;

    if (confirmed) {
      model.removeTunnel(tunnelId);
      target.parentElement.parentElement.remove();
    }
  });
}

setup();
