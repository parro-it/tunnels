'use strict';

const openTunnel = require('./ssh');
const model = require('./model');
const co = require('co');

const state = {};

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
