function changeTunnelStatus(tunnels, type, {result, tunnelId}) {
  return tunnels.map(t => {
    if (t.id === tunnelId) {
      let status = result;
      if (result === 'success') {
        if (type === 'OPEN_TUNNEL_STATE') {
          status = 'open';
        } else {
          status = 'close';
        }
      } else if (result === 'failure') {
        if (type === 'OPEN_TUNNEL_STATE') {
          status = 'close';
        } else {
          status = 'open';
        }
      }
      return { ...t, status };
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

    case 'OPEN_TUNNEL_STATE':
    case 'CLOSE_TUNNEL_STATE':

      return changeTunnelStatus(
        state,
        action.type,
        action.payload
      );

    default:
      return state;
  }
}
