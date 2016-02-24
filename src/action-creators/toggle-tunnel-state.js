import { toggleState } from '../ssh';

export default function toggleTunnelState(tunnelId) {
  return {
    type: 'TOGGLE_TUNNEL_STATE',
    payload: { promise: toggleState(tunnelId), tunnelId }
  };
}
