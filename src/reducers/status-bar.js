export default function statusBar(state = 'tunnels ver 1.0.0', action) {
  switch (action.type) {
    case 'SAVE_TUNNEL':
      return 'Tunnel saved';

    case 'LOAD_STORE':
      return 'Data restored';

    case 'DELETE_TUNNEL':
      return 'Tunnel deleted';

    case 'TOGGLE_TUNNEL_STATE':
      return 'Tunnel is opening';

    case 'TOGGLE_TUNNEL_STATE_RESOLVED':

      return 'Tunnel opened successfully';

    case 'TOGGLE_TUNNEL_STATE_REJECTED':
      console.error(action.payload); // eslint-disable-line no-console
      return `Error: ${action.payload.message} Meta:${JSON.stringify(action.meta)}`;

    default:
      return state;
  }
}
