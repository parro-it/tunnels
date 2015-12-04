'use strict';
const store = require('store');
const uuid = require('node-uuid');
const throttle = require('./throttle-override');
const tunnels = store.getAll();
const EventEmitter = require('events').EventEmitter;

const model = new EventEmitter();

module.exports = model;

const save = throttle(tunnel => {
  store.set(tunnel.tunnelId, tunnel);
  model.emit('saved');
}, 1000);

model.allTunnels = function allTunnels() {
  return Object.keys(tunnels).map(n=>tunnels[n]);
};

model.toOpenOnStartup = function toOpenOnStartup() {
  return model.allTunnels().filter(t => t.tunnelOpenOnStart);
};

model.getTunnel = function getTunnel(id) {
  return tunnels[id];
};

model.removeTunnel = function removeTunnel(id) {
  delete tunnels[id];
  return store.remove(id);
};

model.saveTunnel = function saveTunnel(tunnel) {
  tunnels[tunnel.tunnelId] = tunnel;
  save(tunnel);
};

model.createTunnel = function createTunnel() {
  const tunnelId = uuid.v4();
  const tunnel = {
    tunnelId,
    tunnelName: '<no name>',
    tunnelLocalPort: 80,
    tunnelRemotePort: 8080,
    tunnelHostAddress: 'localhost',
    tunnelUserName: 'root',
    tunnelPassword: '',
    tunnelOpenOnStart: false
  };
  tunnels[tunnelId] = tunnel;
  model.saveTunnel(tunnel);

  return tunnel;
};
