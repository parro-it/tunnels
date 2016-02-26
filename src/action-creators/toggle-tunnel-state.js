import openTunnel from '../ssh';

function openSuccess(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'success', tunnelId, actually: 'open' }
  };
}

function closeSuccess(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'success', tunnelId, actually: 'closed' }
  };
}

function openRunning(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'running', tunnelId }
  };
}


function closeRunning(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'running', tunnelId, actually: 'closed' }
  };
}

function openFailure(tunnelId, error) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'error', tunnelId, error }
  };
}

const openTunnels = {};

export const toggleTunnelState = tunnel => dispatch => {
  if (openTunnels[tunnel.id]) {
    dispatch(closeRunning(tunnel.id));

    openTunnels[tunnel.id].close();
    delete openTunnels[tunnel.id];

    dispatch(closeSuccess(tunnel.id));

    return Promise.resolve(false);
  }

  dispatch(openRunning(tunnel.id));

  return openTunnel(tunnel)

    .then(server => {
      openTunnels[tunnel.id] = server;
      dispatch(
        openSuccess(tunnel.id)
      );
      return true;
    })

    .catch( error => dispatch(
      openFailure(tunnel.id, error)
    ));

};
