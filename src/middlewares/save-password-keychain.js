import keytar from 'keytar';
import uuid from 'node-uuid';

export default () => next => action => {
	if (action.type === 'SAVE_TUNNEL') {
		if (action.tunnel.password && action.tunnel.password[0] !== '\0') {
			const password = action.tunnel.password;
			action.tunnel.password = '\0' + uuid.v4();
			keytar.addPassword('tunnels', action.tunnel.password, password);
		}
	}

	const result = next(action);
	return result;
};
