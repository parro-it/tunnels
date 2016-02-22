import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import list from './list';
import editingTunnel from './editing-tunnel';

const reducers = {
  form,
  list,
  editingTunnel
};
export default combineReducers(reducers);
