import {readFileSync}	from 'fs';
import openSSHTunnel	from 'open-ssh-tunnel';

export default function openTunnel(t) {
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
		localAddr: '127.0.0.1',
		passphrase: t.passphrase
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
