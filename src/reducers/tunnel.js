export default function tunnel(state = {}, action) {
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
