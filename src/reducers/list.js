function tunnel(state = {}, action) {
  const result = action.payload.result;
  switch (action.type) {
    case 'OPEN_TUNNEL_STATE':
      if (result === 'success') {
        return { ...state, status: 'open' };
      } else if (result === 'failure') {
        return { ...state, status: 'close' };
      }
      return { ...state, status: result };

    case 'CLOSE_TUNNEL_STATE':
      if (result === 'success') {
        return { ...state, status: 'close' };
      } else if (result === 'failure') {
        return { ...state, status: 'open' };
      }
      return { ...state, status: result };

    case 'SAVE_TUNNEL':
      return {
        ...action.tunnel,
        status: state.status
      };

    default:
      return state;
  }
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
          return tunnel(t, action);
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

      return state.map(t => {
        if (t.id === action.payload.tunnelId) {
          return tunnel(t, action);
        }
        return t;
      });


    default:
      return state;
  }
}
