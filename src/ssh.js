'use strict';
const tunnel = require('open-ssh-tunnel');
const readFileSync = require('fs').readFileSync;


module.exports = function openTunnel(t) {
  const opts = {
    host: t.tunnelHostAddress,
    username: t.tunnelUserName,
    dstPort: Number(t.tunnelRemotePort),
    srcPort: Number(t.tunnelLocalPort),
    srcAddr: '127.0.0.1',
    dstAddr: '127.0.0.1',
    readyTimeout: 5000,
    forwardTimeout: 2000
  };

  if (t.tunnelKeyFile) {
    opts.privateKey = readFileSync(t.tunnelKeyFile);
  } else {
    opts.password = t.tunnelPassword;
  }

  return tunnel(opts)
    .then(server => {
      server.response = `Tunnel ${t.tunnelName} opened successfully.`;
      return server;
    });
};
