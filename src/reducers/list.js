function changeTunnelState(tunnels, status, id) {
  return tunnels.map(t => {
    if (t.id === id) {
      return { ...t, status };
    }
    return t;
  });
}


export default function list(state = [], action) {
  switch (action.type) {
    case 'ADD_TUNNEL':
      return state.concat(action.tunnel);

    case 'SAVE_TUNNEL':
      return state.map(t => {
        if (t.id === action.tunnel.id) {
          return action.tunnel;
        }
        return t;
      });

    case 'LOAD_STORE':
      return action.tunnels;

    case 'DELETE_TUNNEL':
      return state.filter(t => t.id !== action.id);

    case 'TOGGLE_TUNNEL_STATE':

      return changeTunnelState(state, 'opening', action.payload.tunnelId);
    case 'TOGGLE_TUNNEL_STATE_RESOLVED':

      return changeTunnelState(state, 'open', action.meta.tunnelId);
    case 'TOGGLE_TUNNEL_STATE_REJECTED':

      return changeTunnelState(state, 'open-failed', action.meta.tunnelId);

    default:
      return state;
  }
}
