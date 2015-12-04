'use strict';
const openSSHTunnel = require('open-ssh-tunnel');
const readFileSync = require('fs').readFileSync;
const model = require('./model');
const co = require('co');

const state = {};


function openTunnel(t) {
  const opts = {
    host: t.tunnelHostAddress,
    username: t.tunnelUserName,
    dstPort: Number(t.tunnelRemotePort),
    srcPort: Number(t.tunnelLocalPort),
    srcAddr: '127.0.0.1',
    dstAddr: '127.0.0.1',
    readyTimeout: 5000,
    forwardTimeout: 2000,
    localPort: Number(t.tunnelLocalPort),
    localAddr: '127.0.0.1'
  };

  if (t.tunnelKeyFile) {
    opts.privateKey = readFileSync(t.tunnelKeyFile);
  } else {
    opts.password = t.tunnelPassword;
  }

  return openSSHTunnel(opts)
    .then(server => {
      server.response = `Tunnel ${t.tunnelName} opened successfully.`;
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

    const tunnel = model.getTunnel(tunnelId);
    const server = yield openTunnel(tunnel);
    state[tunnelId] = server;
    return true;
  }),

  isOpen(tunnelId) {
    return !!state[tunnelId];
  }
};
