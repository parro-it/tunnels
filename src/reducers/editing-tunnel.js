
export default function editingTunnel(state = {id: null}, action) {
  switch (action.type) {
    case 'EDIT_TUNNEL':
      return {
        id: action.id
      };
    case 'ADD_TUNNEL':
      return {
        id: action.tunnel.id
      };
    case 'DELETE_TUNNEL':

      return {id: null};

    default:
      return state;
  }
}
