'use strict';
const store = require('store');
const uuid = require('node-uuid');

exports.allTunnels = function allTunnels() {
  const tunnelNames = store.getAll();
  const tunnels = Object.keys(tunnelNames).map(n=>tunnelNames[n]);
  return tunnels;
};

exports.toOpenOnStartup = function toOpenOnStartup() {
  return exports.allTunnels().filter(t => t.tunnelOpenOnStart);
};

exports.getTunnel = function getTunnel(id) {
  return store.get(id);
};

exports.removeTunnel = function removeTunnel(id) {
  return store.remove(id);
};

exports.saveTunnel = function saveTunnel(tunnel) {
  store.set(tunnel.tunnelId, tunnel);
};

exports.createTunnel = function createTunnel() {
  const tunnel = {
    tunnelId: uuid.v4(),
    tunnelName: '<no name>',
    tunnelLocalPort: 80,
    tunnelRemotePort: 8080,
    tunnelHostAddress: 'localhost',
    tunnelUserName: 'root',
    tunnelPassword: '',
    tunnelOpenOnStart: false
  };

  exports.saveTunnel(tunnel);

  return tunnel;
};
