export { toggleTunnelState, openTunnelsAtStartup } from './toggle-tunnel-state';
export { loadStore } from './load-store';
import newTunnel from '../model/new-tunnel';

export function addTunnel() {
  return {
    type: 'ADD_TUNNEL',
    tunnel: newTunnel()
  };
}

export function editTunnel(id) {
  return {
    type: 'EDIT_TUNNEL',
    id
  };
}


export function deleteTunnel(id) {
  return {
    type: 'DELETE_TUNNEL',
    id
  };
}


export function saveTunnel(tunnel) {
  return {
    type: 'SAVE_TUNNEL',
    tunnel
  };
}
