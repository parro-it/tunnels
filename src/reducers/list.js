import tunnel from './tunnel';

export default function list(state = [], action) {
	let newList;
	switch (action.type) {
		case 'EDIT_TUNNEL':
			newList = state.slice(0);
			newList.active	= action.id;
			return newList;

		case 'ADD_TUNNEL':
			newList = state.concat(action.tunnel);
			newList.active = action.tunnel.id;
			return newList;

		case 'DELETE_TUNNEL':
			newList = state.filter(
				t => t.id !== action.id
			);
			newList.active =
				newList.length ?
					newList[0].id :
					null;
			return newList;

		case 'SAVE_TUNNEL':
			return state.map(t => {
				if (t.id === action.tunnel.id) {
					return tunnel(t, action);
				}
				return t;
			});

		case 'LOAD_STORE':
			newList =	action.tunnels;
			newList.active =
				newList.length ?
					newList[0].id :
					null;
			return newList;

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
