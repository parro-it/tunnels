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


function getTunnel() {
  const tunnelName = document.querySelector('#tunnelName').value;
  const tunnelPassword = document.querySelector('#tunnelPassword').value;
  const tunnelUserName = document.querySelector('#tunnelUserName').value;
  const tunnelLocalPort = document.querySelector('#tunnelLocalPort').value;
  const tunnelRemotePort = document.querySelector('#tunnelRemotePort').value;
  const tunnelHostAddress = document.querySelector('#tunnelHostAddress').value;
  const tunnelId = document.querySelector('#tunnelId').value;
  const tunnelKeyFile = document.querySelector('#tunnelKeyFile').value;

  return {
    tunnelUserName,
    tunnelId,
    tunnelName,
    tunnelKeyFile,
    tunnelLocalPort,
    tunnelRemotePort,
    tunnelHostAddress,
    tunnelPassword
  };
}

function saveTunnel() {
  model.saveTunnel(getTunnel());
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

  delegate.on('click', '.choose-key', () => {
    const elm = document.querySelector('#tunnelKeyFile');
    const filePath = (elm.value && dirname(elm.value)) || app.getPath('home');
    const newFilePath = dialog.showOpenDialog({
      title: 'Choose private key file',
      defaultPath: filePath
    });
    elm.value = newFilePath || '';
  });

  delegate.on('click', '.save', () => {
    saveTunnel();
    ipc.send('saved');
    window.close();
  });

  delegate.on('click', '.test', () => {
    openTunnel(getTunnel()).then(result => {
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
