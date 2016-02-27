function changeTunnelState(tunnels, {status, tunnelId, actually}) {
  const newStatus = {
    running: 'opening',
    error: 'open-failed',
    success: actually
  }[status];

  return tunnels.map(t => {
    if (t.id === tunnelId) {
      let open = t.open;
      if (status === 'success') {
        if (actually === 'open') {
          open = true;
        } else {
          open = false;
        }
      }
      return { ...t, open, status: newStatus };
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

      return changeTunnelState(
        state,
        action.payload
      );

    default:
      return state;
  }
}
