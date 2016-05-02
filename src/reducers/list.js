import tunnel from './tunnel';

export default function list(state = [], action) {
	switch (action.type) {
		case 'EDIT_TUNNEL':
			const newList3 = state.slice(0);
			newList3.active	= action.id;
			return newList3;

		case 'ADD_TUNNEL':
			const newList = state.concat(action.tunnel);
			newList.active = action.tunnel.id;
			return newList;

		case 'DELETE_TUNNEL':
			const newList2 = state.filter(
				t => t.id !== action.id
			);
			newList2.active =
				newList2.length
					? newList2[0].id
					: null;
			return newList2;

		case 'SAVE_TUNNEL':
			return state.map(t => {
				if (t.id === action.tunnel.id) {
					return tunnel(t, action);
				}
				return t;
			});

		case 'LOAD_STORE':
			const newList4 =	action.tunnels;
			newList4.active =
				newList4.length
					? newList4[0].id
					: null;
			return newList4;

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
