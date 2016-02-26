export default function statusBar(state = 'tunnels ver 1.0.0', action) {
  switch (action.type) {
    case 'SAVE_TUNNEL':
      return 'Tunnel saved';

    case 'LOAD_STORE':
      return 'Data restored';

    case 'DELETE_TUNNEL':
      return 'Tunnel deleted';

    case 'TOGGLE_TUNNEL_STATE':
      switch (action.payload.status) {
        case 'running':
          return 'Tunnel is opening';
        case 'error':
          console.error(action.payload); // eslint-disable-line no-console
          return `Error: ${action.payload.error.message}`;
        case 'success':
          return 'Tunnel opened successfully';
        default:
          throw new Error(`Unknwon TOGGLE_TUNNEL_STATE status ${action.payload.status}`);
      }

    default:
      return state;
  }
}
