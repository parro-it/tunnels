import { toggleState } from '../ssh';

function toggleTunnelStateSuccess(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'success', tunnelId }
  };
}


function toggleTunnelStateRunning(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'running', tunnelId }
  };
}

function toggleTunnelStateFailure(tunnelId, error) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { status: 'error', tunnelId, error }
  };
}

export const toggleTunnelState = tunnelId => dispatch => {
  dispatch(toggleTunnelStateRunning(tunnelId));

  return toggleState(tunnelId)

    .then(() => dispatch(
      toggleTunnelStateSuccess(tunnelId)
    ))

    .catch( error => dispatch(
      toggleTunnelStateFailure(tunnelId, error)
    ));
};
