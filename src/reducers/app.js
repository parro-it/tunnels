import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import list from './list';
import editingTunnel from './editing-tunnel';
import statusBar from './status-bar';

const reducers = {
  form,
  list,
  editingTunnel,
  statusBar
};
export default combineReducers(reducers);
