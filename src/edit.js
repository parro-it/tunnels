'use strict';

const join = require('path').join;
const electron = require('electron');
const ipc = electron.ipcRenderer;
const nunjucks = require('nunjucks');
const domDelegate = require('dom-delegate');
const model = require('./model');
const remote = electron.remote;
const dirname = require('path').dirname;
const dialog = remote.require('dialog');
const app = remote.require('app');
const openTunnel = require('./ssh');


function tunnelForm() {
  const tunnel = new window.JSONFormData(document.querySelector('form')).formData;
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
    openTunnel(tunnelForm()).then(result => {
      dialog.showMessageBox({
        buttons: ['Ok'],
        type: 'info',
        title: 'Connection status',
        message: result.response
      });
    });

  });

  delegate.on('click', '.cancel', () => window.close());
}

setup();
