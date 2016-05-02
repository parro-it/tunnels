import localStore from 'store';

export default store => next => action => {
	const result = next(action);

	if (action.type === 'SAVE_TUNNEL') {
		const tunnels = store.getState().list;
		localStore.set('tunnels', tunnels);
		localStore.set('version', 1);
	}

	return result;
};
