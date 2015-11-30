'use strict';
const tunnel = require('tunnel-ssh');
const readFileSync = require('fs').readFileSync;
const isPortReachable = require('is-port-reachable');
const dialog = require('dialog');

module.exports = function openTunnel(t) {
  const opts = {
    host: t.tunnelHostAddress,
    port: 22,
    username: t.tunnelUserName,
    dstPort: Number(t.tunnelRemotePort),
    localPort: Number(t.tunnelLocalPort),
    keepAlive: true
  };

  if (t.tunnelKeyFile) {
    opts.privateKey = readFileSync(t.tunnelKeyFile);
  } else {
    // TODO: use password from keyring
  }

  let failed = false;

  function failure(server, reason) {
    failed = true;
    dialog.showMessageBox({
      buttons: ['Ok'],
      type: 'error',
      title: 'test failed',
      message: `Tunnel ${t.tunnelName} failed to open: ${reason}`

    }, () => {});
    server.close();
  }

  let uncaughtException = null;

  function checkReachable(server) {
    isPortReachable(t.tunnelLocalPort, {host: 'localhost'}, (err, reachable) => {
      if (err) {
        return failure(server, err.message);
      }

      if (reachable) {
        setTimeout(() => {
          if (failed) {
            return;
          }
          dialog.showMessageBox({
            buttons: ['Ok'],
            type: 'info',
            title: 'test passed',
            message: `Tunnel ${t.tunnelName} opened successfully.`
          }, () => {});
          server.close();
          process.removeListener('uncaughtException', uncaughtException);
        }, 3000);
      } else {
        return failure(server, 'remote endpoint not reachable');
      }
    });
  }


  const server = tunnel(opts, (e) => {
    if (e) {
      return failure(server, e.message);
    }

    checkReachable(server);
  });

  uncaughtException = err => failure(server, err.message);
  process.once('uncaughtException', uncaughtException);
};
