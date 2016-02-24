'use strict';
const openSSHTunnel = require('open-ssh-tunnel');
const readFileSync = require('fs').readFileSync;
const co = require('co');

import store from 'store';
const state = {};


function openTunnel(t) {
  const opts = {
    host: t.hostAddress,
    username: t.userName,
    dstPort: Number(t.remotePort),
    srcPort: Number(t.localPort),
    srcAddr: '127.0.0.1',
    dstAddr: '127.0.0.1',
    readyTimeout: 5000,
    forwardTimeout: 2000,
    localPort: Number(t.localPort),
    localAddr: '127.0.0.1'
  };

  if (t.keyFile) {
    opts.privateKey = readFileSync(t.keyFile);
  } else {
    opts.password = t.password;
  }

  return openSSHTunnel(opts)
    .then(server => {
      server.response = `Tunnel ${t.name} opened successfully.`;
      return server;
    });
}

module.exports = {
  toggleState: co.wrap(function * (tunnelId) {
    if (!!state[tunnelId]) {
      state[tunnelId].close();
      delete state[tunnelId];
      return true;
    }

    const tunnel = store.get('tunnels').reduce(
      (found, t) => t.id === tunnelId ? t : found,
      null
    );
    const server = yield openTunnel(tunnel);
    state[tunnelId] = server;
    return true;
  }),

  isOpen(tunnelId) {
    return !!state[tunnelId];
  }
};
