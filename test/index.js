'use strict';
import 'babel-register';
const test = require('ava');
const openTunnel = require('../src/ssh');

test('can open an ssh tunnel', function *(t) {
	if (!process.env.UNIXSSH_USER) {
		t.pass(true);
		return;
	}

	const tunnel = yield openTunnel({
		tunnelHostAddress: 'freebsd.unixssh.com',
		tunnelPassword: process.env.UNIXSSH_PWD,
		tunnelUserName: process.env.UNIXSSH_USER,
		tunnelRemotePort: 3306,
		tunnelLocalPort: 3309,
		tunnelName: 'test-tunnel'
	});

	t.is(tunnel.response, 'Tunnel test-tunnel opened successfully.');
	tunnel.close();
});

test('fail on bad port', function *(t) {
	if (!process.env.UNIXSSH_USER) {
		t.pass(true);
		return;
	}

	try {
		const tunnel = yield openTunnel({
			tunnelHostAddress: 'freebsd.unixssh.com',
			tunnelPassword: process.env.UNIXSSH_PWD,
			tunnelUserName: process.env.UNIXSSH_USER,
			tunnelRemotePort: 1234,
			tunnelLocalPort: 1234,
			tunnelName: 'test-tunnel'
		});

		tunnel.close();
		t.fail('exception expected');
	} catch (err) {
		t.is(
			err.message,
			'Timed out while waiting for forwardOut'
		);
	}
});
