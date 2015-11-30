'use strict';

const join = require('path').join;
const ipc = require('electron').ipcRenderer;
const nunjucks = require('nunjucks');
const domDelegate = require('dom-delegate');
const model = require('./model');
const remote = require('electron').remote;
const dirname = require('path').dirname;
const dialog = remote.require('dialog');
const app = remote.require('app');

function getTunnel() {
  const tunnelName = document.querySelector('#tunnelName').value;
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
    tunnelHostAddress
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
    ipc.send('close');
  });

  delegate.on('click', '.test', () => {
    ipc.send('test-tunnel', getTunnel());
  });

  delegate.on('click', '.cancel', () => ipc.send('close'));
}

setup();
