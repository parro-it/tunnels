import React from 'react';
import debugMenu from 'debug-menu';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import inputMenu from 'electron-input-menu';
import context from 'electron-contextmenu-middleware';
import {createStore} from 'redux';

import AppContainer from './containers/app';
import app from './reducers/app';
import {openTunnelsAtStartup, loadStore} from './action-creators';
import middlewares from './middlewares';

function startApp() {
	context.use(inputMenu);
	context.use(debugMenu.middleware);
	context.activate();

	document.body.classList.add(
		'platform-' + process.platform
	);

	const store = createStore(app, middlewares);
	const main = document.createElement('div');

	document.body.appendChild(main);
	render(
		<Provider store={store}>
			<AppContainer/>
		</Provider>,
		main
	);

	store.dispatch(loadStore());
	store.dispatch(openTunnelsAtStartup(store.getState().list));
}

document.addEventListener('DOMContentLoaded', startApp);
