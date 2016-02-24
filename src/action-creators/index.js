import uuid from 'node-uuid';
export {default as toggleTunnelState} from './toggle-tunnel-state';

function newTunnel() {
  return {
    id: uuid.v4(),
    name: '<no name>',
    localPort: 80,
    remotePort: 8080,
    hostAddress: 'localhost',
    userName: 'root',
    password: '',
    openOnStart: false,
    keyFile: ''
  };
}

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
