import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppContainer from './containers/App';
import app from './reducers/app';


function startApp() {
  const store = createStore(app);
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
