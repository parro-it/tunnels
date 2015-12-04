'use strict';

const throttle = require('./throttle-override');
const electron = require('electron');
// const ipc = electron.ipcRenderer;
const domDelegate = require('dom-delegate');
const model = require('./model');
// const remote = electron.remote;
// const dialog = remote.require('dialog');
// const openTunnel = require('./ssh');
// const co = require('co');

function tunnelForm() {
  const tunnel = new window.JSONFormData(document.querySelector('form')).formData;
  tunnel.tunnelId = document.querySelector('[name=tunnelId]').value;
  tunnel.tunnelOpenOnStart = document.querySelector('[name=tunnelOpenOnStart]').checked;
  return tunnel;
}

/*
function showTestMessage(type, message) {
  remote.getCurrentWindow().setAlwaysOnTop(false);
  dialog.showMessageBox({
    buttons: ['Ok'],
    type,
    title: 'Connection status',
    message: message
  }, () => remote.getCurrentWindow().setAlwaysOnTop(true));
}
*/
function editTunnel(tunnelId) {
  const delegate = domDelegate(document.body);
  const currentlyActive = document.querySelector('.sidebar nav .active');
  if (currentlyActive) {
    currentlyActive.classList.remove('active');
  }
  document.querySelector(`[data-tunnel-id="${tunnelId}"`)
    .classList.add('active');

  const tunnel = model.getTunnel(tunnelId);
  const form = document.querySelector('main.pane form');
  const fields = form.querySelectorAll('[name]');
  Array.from(fields).forEach(f => {
    const name = f.name;
    f.value = tunnel[name];
  });

  const save = throttle(() => {
    model.saveTunnel(tunnelForm());
    alert('saved');
  }, 2000);

  delegate.on('input', '[name]', ()=> {
    save();
  });


/*
  delegate.on('click', '.test', co.wrap( function * () {
    try {
      const server = yield openTunnel(tunnelForm());
      showTestMessage('info', server.response);
      server.close();
    } catch (err) {
      showTestMessage('error', err.message);
    }
  }));
*/
}

module.exports = editTunnel;
