'use strict';

const domDelegate = require('dom-delegate');
const electron = require('electron');
const model = require('./model');
const ssh = require('./ssh');
const co = require('co');
const zip = require('zipmap');
const debug = require('debug')('tunnels');

let resetStatusBarTimeout = null;

function log(message, status) {
  const statusBar = document.querySelector('.status-bar');
  statusBar.setAttribute('class', 'status-bar');
  statusBar.classList.add(`status-${status}`);
  statusBar.textContent = message;
  if (resetStatusBarTimeout) {
    clearTimeout(resetStatusBarTimeout);
  }
  resetStatusBarTimeout = setTimeout(()=> {
    statusBar.class = '';
    statusBar.textContent = '';
    resetStatusBarTimeout = null;
  }, 2000);
}


function tunnelForm() {
  const fields = Array.from(document.querySelectorAll('form [name]'));
  return zip(fields.map(field => [
    field.name,
    field.type === 'checkbox' ? field.checked : field.value
  ]));
}

function editTunnel(tunnelId) {
  const currentlyActive = document.querySelector('.sidebar nav .active');
  if (currentlyActive) {
    currentlyActive.classList.remove('active');
  }
  const tunnelListItem = document.querySelector(`[data-tunnel-id="${tunnelId}"`);
  if (tunnelListItem) {
    tunnelListItem.classList.add('active');
  }

  const tunnel = model.getTunnel(tunnelId);
  const form = document.querySelector('main.pane form');
  const fields = form.querySelectorAll('[name]');
  Array.from(fields).forEach(f => {
    const name = f.name;
    if (f.type === 'checkbox') {
      f.checked = tunnel[name];
    } else {
      f.value = tunnel[name];
    }
  });
}

function refreshList() {
  const tunnels = model.allTunnels();

  const itemTemplate = document.querySelector('#tunnel-item');
  const nav = document.querySelector('.sidebar nav');
  nav.innerHTML = '<h5 class="nav-group-title">Tunnels</h5>';
  tunnels.forEach(t => {
    const tmpl = document.importNode(itemTemplate.content, true);
    if (ssh.isOpen(t.tunnelId)) {
      tmpl.querySelector('.status').classList.add('status-ok');
    }


    tmpl.querySelector('.tunnelName').textContent = t.tunnelName;
    tmpl.querySelector('.tunnel').dataset.tunnelId = t.tunnelId;
    tmpl.querySelector('.menu-actions').dataset.tunnelId = t.tunnelId;

    nav.appendChild(tmpl);


  });
  if (tunnels.length) {
    editTunnel(tunnels[0].tunnelId);
  } else {
    const tunnel = model.createTunnel();
    editTunnel(tunnel.tunnelId);
  }
}

const toggleTunnelState = tunnelId => co.wrap( function *() {
  const tunnelListStatus = document.querySelector(`[data-tunnel-id="${tunnelId}"] .status`);
  tunnelListStatus.setAttribute('class', 'icon icon-record status');
  try {
    yield ssh.toggleState(tunnelId);
    if (ssh.isOpen(tunnelId)) {
      tunnelListStatus.classList.add('status-ok');
    }

  } catch (err) {
    tunnelListStatus.classList.add('status-error');
    log('Cannot open tunnel: ' + err.message, 'error');
  }
});

const deleteTunnel = tunnelId => () => {
  const tunnelName = model.getTunnel(tunnelId).tunnelName;
  const confirmed = electron.remote.dialog.showMessageBox({
    buttons: ['Yes', 'No'],
    type: 'question',
    title: 'confirm deletion',
    message: `Delete tunnel ${tunnelName}?`
  }) === 0;

  if (confirmed) {
    model.removeTunnel(tunnelId);
    document.querySelector(`[data-tunnel-id="${tunnelId}"]`)
      .remove();
  }
};

const actionsMenuTemplate = tunnelId => [
  {
    label: 'Edit',
    click: () => editTunnel(tunnelId)
  }, {
    label: ssh.isOpen(tunnelId) ? 'Close' : 'Open',
    click: toggleTunnelState(tunnelId)
  }, {
    label: 'Delete',
    click: deleteTunnel(tunnelId)
  }
];


function * openTunnels() {
  const openAtStartup = model.toOpenOnStartup();
  debug('openAtStartup', openAtStartup);

  try {
    yield openAtStartup.map(tunnel =>
      ssh.toggleState(tunnel.tunnelId)
        .catch(err => {
          err.message = `Cannot open tunnel ${tunnel.tunnelName}:\n${err.message}`;
          throw err;
        })
    );
  } catch (err) {
    electron.remote.dialog.showErrorBox(
      'Cannot open tunnel.',
      err.message
    );
  }
}

function * setup() {
  const delegate = domDelegate(document.body);


  document.body.classList.add(
    'platform-' + process.platform
  );

  model.on('saved', () => {
    log('Tunnel data saved', 'ok');
  });

  delegate.on('input', '[name]', () => {
    model.saveTunnel(tunnelForm());
  });

  delegate.on('click', '.new-tunnel', () => {
    const tunnel = model.createTunnel();
    editTunnel(tunnel.tunnelId);
    refreshList();
  });

  delegate.on('click', '.tunnel', (e, target) => {
    const tunnelId = target.dataset.tunnelId;
    editTunnel(tunnelId);
  });

  delegate.on('input', 'input[name=tunnelName]', (e, target) => {
    const tunnelId = document.querySelector('input[name=tunnelId]').value;
    const tunnelListName = document.querySelector(`[data-tunnel-id="${tunnelId}"] .tunnelName`);
    if (tunnelListName) {
      tunnelListName.textContent = target.value;
    }
  });

  delegate.on('click', '.menu-actions', (e, target) => {
    const tunnelId = target.dataset.tunnelId;
    const menu = actionsMenuTemplate(tunnelId);
    electron.remote.Menu.buildFromTemplate(menu).popup();
  });

  yield openTunnels();

  refreshList();

}


co(setup());


