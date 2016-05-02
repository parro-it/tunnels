import validateIP from 'validate-ip-node';
import isFQDN from '../modules/isFQDN';
import username from 'username';
import isReachable from '../modules/is-reachable-promise';
import dns from '../modules/dns-promise';

const FQDNOpts = {
	require_tld: false
};

const user = username.sync();

export function validate(tunnel) {
	const errors = {};
	const requiredFields = [
		'name',
		'hostAddress',
		'remotePort',
		'localPort',
		'userName'
	].concat(
		tunnel.authType === 'keyfile'
		? ['keyFile', 'passphrase']
		: ['password']
	);
	requiredFields
		.filter(f => !tunnel[f])
		.forEach(f => {
			errors[f] = 'Required';
		});

	if (
		!errors.hostAddress &&
		!isFQDN(tunnel.hostAddress, FQDNOpts) &&
		!validateIP(tunnel.hostAddress)
		) {

		errors.hostAddress = 'Should be a valid IP address or hostname';
	}

	if (tunnel.localPort < 0 || tunnel.localPort > 65535) {
		errors.localPort = 'Should be in the range 0:65535';
	} else if (tunnel.localPort < 1024 && user !== 'root') {
		errors.localPort = 'You should be root to use port < 1024';
	}

	if (tunnel.remotePort < 0 || tunnel.remotePort > 65535) {
		errors.remotePort = 'Should be in the range 0:65535';
	}

	return errors;
}


export function asyncValidate({hostAddress}) {
	return dns(hostAddress)
		.then(address => isReachable(address + ':22'))

		.then(reachable => {
			if (!reachable) {
				return {hostAddress: 'Host address port 22 not reachable'};
			}

			return null;
		})

		.catch(err => ({hostAddress: err.message}));
}
