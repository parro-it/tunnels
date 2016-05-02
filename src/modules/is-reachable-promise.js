import isReachable from 'is-reachable';

export default function isReachablePromise(dests) {
	return new Promise((resolve, reject) => {
		isReachable(dests, (err, reachable) => {
			if (err) {
				reject(err);
			} else {
				resolve(reachable);
			}
		});
	});
}
