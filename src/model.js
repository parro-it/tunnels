'use strict';
const store = require('store');
const uuid = require('node-uuid');

exports.allTunnels = function allTunnels() {
  const tunnelNames = store.getAll();
  const tunnels = Object.keys(tunnelNames).map(n=>tunnelNames[n]);
  return tunnels;
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
  const tunnelId = uuid.v4();
  const tunnelName = '<no name>';
  const tunnelLocalPort = 80;
  const tunnelRemotePort = 8080;
  const tunnelHostAddress = 'localhost';
  const tunnelUserName = 'root';
  const tunnelPassword = '';

  const tunnel = {
    tunnelId,
    tunnelName,
    tunnelLocalPort,
    tunnelRemotePort,
    tunnelHostAddress,
    tunnelUserName,
    tunnelPassword
  };

  exports.saveTunnel(tunnel);

  return tunnel;
};
