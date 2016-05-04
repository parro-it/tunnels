import keytar from 'keytar';
import openSSHTunnel from '../ssh';

function openSuccess(tunnelId) {
	return {
		type: 'OPEN_TUNNEL_STATE',
		payload: {result: 'success', tunnelId}
	};
}

function closeSuccess(tunnelId) {
	return {
		type: 'CLOSE_TUNNEL_STATE',
		payload: {result: 'success', tunnelId}
	};
}

function openRunning(tunnelId) {
	return {
		type: 'OPEN_TUNNEL_STATE',
		payload: {result: 'running', tunnelId}
	};
}

function closeRunning(tunnelId) {
	return {
		type: 'CLOSE_TUNNEL_STATE',
		payload: {result: 'running', tunnelId}
	};
}

function openFailure(tunnelId, error) {
	return {
		type: 'OPEN_TUNNEL_STATE',
		payload: {result: 'error', tunnelId, error}
	};
}

const connections = {};

export const openTunnel = tunnel => dispatch => {
	const password = keytar.getPassword('tunnels2', tunnel.id);
	const _tunnel = Object.assign({}, tunnel, {password});

	dispatch(openRunning(_tunnel.id));

	return openSSHTunnel(_tunnel)

		.then(server => {
			connections[_tunnel.id] = server;
			dispatch(
				openSuccess(_tunnel.id)
			);
			return true;
		})

		.catch(error => dispatch(
			openFailure(_tunnel.id, error)
		));
};

export const closeTunnel = tunnel => dispatch => {
	dispatch(closeRunning(tunnel.id));

	connections[tunnel.id].close();
	delete connections[tunnel.id];

	dispatch(closeSuccess(tunnel.id));

	return Promise.resolve(false);
};

export const toggleTunnelState = tunnel => dispatch => {
	if (tunnel.status === 'open') {
		return closeTunnel(tunnel)(dispatch);
	}
	return openTunnel(tunnel)(dispatch);
};

export const openTunnelsAtStartup = tunnels => dispatch => {
	tunnels
		.filter(t => t.openOnStart)
		.forEach(t => openTunnel(t)(dispatch));
};

