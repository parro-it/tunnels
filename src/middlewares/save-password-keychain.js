import keytar from 'keytar';

export default () => next => action => {
	if (action.type === 'SAVE_TUNNEL') {
		if (action.tunnel.password && action.tunnel.password[0] !== '\0') {
			const password = action.tunnel.password;
			action.tunnel.password = '\0encrypted';
			const saved = keytar.replacePassword('tunnels2', action.tunnel.id, password);
			if (!saved) {
				console.error('Cannot save password to keytar.');
			}
		}
	}

	return next(action);
};
