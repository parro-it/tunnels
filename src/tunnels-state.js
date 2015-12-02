'use strict';

const openTunnel = require('./ssh');
const model = require('./model');

const state = {};

module.exports = {


  toggleState(tunnelId) {
    if (!!state[tunnelId]) {
      state[tunnelId].close();
      delete state[tunnelId];
      return Promise.resolve(true);
    }

    const tunnel = model.getTunnel(tunnelId);
    return openTunnel(tunnel)
      .then(server => {
        state[tunnelId] = server;
        return true;
      });
  },

  isOpen(tunnelId) {
    return !!state[tunnelId];
  }
};
