
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

    default:
      return state;
  }
}
