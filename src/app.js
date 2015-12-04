'use strict';

const domDelegate = require('dom-delegate');
const electron = require('electron');
const model = require('./model');
const tunnelsState = require('./tunnels-state');
const co = require('co');
const editTunnel = require('./edit.js');


function refreshList() {
  const tunnels = model.allTunnels();

  const itemTemplate = document.querySelector('#tunnel-item');
  const nav = document.querySelector('.sidebar nav');
  nav.innerHTML = '<h5 class="nav-group-title">Tunnels</h5>';
  tunnels.forEach(t => {
    const tmpl = document.importNode(itemTemplate.content, true);
    tmpl.querySelector('.tunnelName').textContent = t.tunnelName;
    tmpl.querySelector('.tunnel').dataset.tunnelId = t.tunnelId;
    tmpl.querySelector('.menu-actions').dataset.tunnelId = t.tunnelId;

    nav.appendChild(tmpl);

  });
  editTunnel(tunnels[0].tunnelId);
}

const toggleTunnelState = tunnelId => co.wrap( function *() {
  try {
    yield tunnelsState.toggleState(tunnelId);
    refreshList();
  } catch (err) {
    electron.remote.dialog.showErrorBox(
      'Cannot open tunnel.',
      err.message
    );
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
    document.querySelector(`[data-tunnel-id="${tunnelId}"`)
      .remove();
  }
};

const actionsMenuTemplate = tunnelId => [
  {
    label: 'Edit',
    click: () => editTunnel(tunnelId)
  }, {
    label: tunnelsState.isOpen(tunnelId) ? 'Close' : 'Open',
    click: toggleTunnelState(tunnelId)
  }, {
    label: 'Delete',
    click: deleteTunnel(tunnelId)
  }
];


function * openTunnels() {
  const openAtStartup = model.toOpenOnStartup();

  try {
    yield openAtStartup.map(tunnel =>
      tunnelsState.toggleState(tunnel.tunnelId)
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

  delegate.on('click', '.new-tunnel', () => {
    const tunnel = model.createTunnel();
    editTunnel(tunnel.tunnelId);
  });

  delegate.on('click', '.tunnel', (e, target) => {
    const tunnelId = target.dataset.tunnelId;
    editTunnel(tunnelId);
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


