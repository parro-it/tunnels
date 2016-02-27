import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppContainer from './containers/App';
import app from './reducers/app';
import debugMenu from 'debug-menu';
import { openTunnelsAtStartup, loadStore } from './action-creators';
import middlewares from './middlewares';

function startApp() {
  debugMenu.install();

  document.body.classList.add(
    'platform-' + process.platform
  );

  const store = createStore(app, middlewares);
  setImmediate(() => {
    store.dispatch(loadStore());
    store.dispatch(openTunnelsAtStartup(store.getState().list));
  });

  const main = document.createElement('div');
  document.body.appendChild(main);
  render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    main
  );
}

document.addEventListener('DOMContentLoaded', startApp);
