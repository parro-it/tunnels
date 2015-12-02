'use strict';

const join = require('path').join;
const electron = require('electron');
const ipc = electron.ipcRenderer;
const nunjucks = require('nunjucks');
const domDelegate = require('dom-delegate');
const model = require('./model');
const remote = electron.remote;
const dialog = remote.require('dialog');
const openTunnel = require('./ssh');


function tunnelForm() {
  const tunnel = new window.JSONFormData(document.querySelector('form')).formData;
  tunnel.tunnelId = document.querySelector('[name=tunnelId]').value;
  tunnel.tunnelOpenOnStart = document.querySelector('[name=tunnelOpenOnStart]').checked;
  return tunnel;
}

function saveTunnel() {
  model.saveTunnel(tunnelForm());
}

function setup() {
  const delegate = domDelegate(document.body);

  const tunnelId = window.__args__.tunnelId;
  const tunnel = model.getTunnel(tunnelId);
  const template = nunjucks.render(
    join(__dirname, 'edit-form.html'),
    { tunnel }
  );

  document.body.innerHTML = template;

  delegate.on('click', '.save', () => {
    saveTunnel();
    ipc.send('saved');
    window.close();
  });

  delegate.on('click', '.test', () => {
    openTunnel(tunnelForm())
      .then(server => {
        remote.getCurrentWindow().setAlwaysOnTop(false);
        dialog.showMessageBox({
          buttons: ['Ok'],
          type: 'info',
          title: 'Connection status',
          message: server.response
        }, () => remote.getCurrentWindow().setAlwaysOnTop(true));
        server.close();
      })
      .catch(err => {
        remote.getCurrentWindow().setAlwaysOnTop(false);
        dialog.showMessageBox({
          buttons: ['Ok'],
          type: 'error',
          title: 'Connection status',
          message: err.message
        }, () => remote.getCurrentWindow().setAlwaysOnTop(true));
      });

  });

  delegate.on('click', '.cancel', () => window.close());
}

setup();
