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
    case 'EDIT_TUNNEL':
      const newList3 = state.slice(0);
      newList3.active  = action.id;
      return newList3;

    case 'ADD_TUNNEL':
      const newList = state.concat(action.tunnel);
      newList.active = action.tunnel.id;
      return newList;

    case 'SAVE_TUNNEL':
      return state.map(t => {
        if (t.id === action.tunnel.id) {
          return {
            ...action.tunnel,
            open: t.open,
            status: t.status
          };
        }
        return t;
      });

    case 'LOAD_STORE':
      return action.tunnels;

    case 'DELETE_TUNNEL':
      const newList2 = state.filter(t => t.id !== action.id);
      newList2.active = null;
      return newList2;

    case 'TOGGLE_TUNNEL_STATE':

      return changeTunnelState(
        state,
        action.payload
      );

    default:
      return state;
  }
}
