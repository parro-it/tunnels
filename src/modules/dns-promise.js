import { lookup } from 'dns';

export default function lookupPromise(hostname) {
	return new Promise((resolve, reject) => {
		lookup(hostname, (err, address) => {
			if (err) {
				reject(err);
			} else {
				resolve(address);
			}
		});
	});
}
