'use strict';

const test = require('tape');
const openTunnel = require('../src/ssh');
const co = require('co');

test('can open an ssh tunnel', co.wrap(function *(t) {
  if (!process.env.UNIXSSH_USER) {
    t.ok(true);
    return t.end();
  }

  const tunnel = yield openTunnel({
    tunnelHostAddress: 'freebsd.unixssh.com',
    tunnelPassword: process.env.UNIXSSH_PWD,
    tunnelUserName: process.env.UNIXSSH_USER,
    tunnelRemotePort: 3306,
    tunnelLocalPort: 3309,
    tunnelName: 'test-tunnel'
  });

  t.equal(tunnel.response, 'Tunnel test-tunnel opened successfully.');
  tunnel.close();

  t.end();
}));


test('fail on bad port', t => {
  if (!process.env.UNIXSSH_USER) {
    t.ok(true);
    return t.end();
  }

  openTunnel({
    tunnelHostAddress: 'freebsd.unixssh.com',
    tunnelPassword: process.env.UNIXSSH_PWD,
    tunnelUserName: process.env.UNIXSSH_USER,
    tunnelRemotePort: 1234,
    tunnelLocalPort: 1234,
    tunnelName: 'test-tunnel'
  })
    .then(tunnel => {
      tunnel.close();
      t.fail('exception expected');
    })
    .catch(err => {
      t.equal(err.message, 'Timed out while waiting for forwardOut');
      t.end();
    });
});
