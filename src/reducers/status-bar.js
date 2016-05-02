const ok = message => ({message, kind: 'ok'});
const error = message => ({message, kind: 'error'});


export default function statusBar(
	state = ok('tunnels ver 1.0.0'),
	action
	) {
	switch (action.type) {
		case 'SAVE_TUNNEL':
			return ok('Tunnel saved');

		case 'LOAD_STORE':
			return ok('Data restored');

		case 'DELETE_TUNNEL':
			return ok('Tunnel deleted');

		case 'OPEN_TUNNEL_STATE':
			switch (action.payload.result) {
				case 'running':
					return ok('Tunnel is opening');
				case 'error':
					console.error(action.payload); // eslint-disable-line no-console
					return error(`Cannot open tunnel: ${action.payload.error.message}`);
				case 'success':
					return ok('Tunnel open successfully');
				default:
					throw new Error(`Unknwon OPEN_TUNNEL_STATE result: ${action.payload.result}`);
			}

		case 'CLOSE_TUNNEL_STATE':
			switch (action.payload.result) {
				case 'running':
					return ok('Tunnel is closing');
				case 'error':
					console.error(action.payload); // eslint-disable-line no-console
					return error(`Cannot close tunnel: ${action.payload.error.message}`);
				case 'success':
					return ok('Tunnel closed successfully');
				default:
					throw new Error(`Unknwon CLOSE_TUNNEL_STATE result: ${action.payload.result}`);
			}

		default:
			return state;
	}
}
