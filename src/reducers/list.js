
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
    default:
      return state;
  }
}
