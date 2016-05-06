const {default: thunk} = require('redux-thunk');
const {createStore, applyMiddleware} = require('redux');
const {sendActions, receiveActions} = require('./src/modules/electron-xproc-redux');

const changeTrayIcon = tray => () => next => action => {
	if (action.type === 'OPEN_TUNNEL_STATE') {
		if (action.payload.result === 'running') {
			tray.setImage(`${__dirname}/src/sitemap.png`);
		} else {
			tray.setImage(`${__dirname}/src/IconTemplate.png`);
		}
	}

	return next(action);
};

module.exports = (win, tray) => {
	const actionsToSend = sendActions(['OPEN_TUNNEL_REQUEST'], [win]);

	const mdws = applyMiddleware(
		changeTrayIcon(tray),
		thunk,
		actionsToSend
	);
	const reducer = (state = {}) => state;
	const store = createStore(reducer, mdws);
	store.dispatch(receiveActions);
};

