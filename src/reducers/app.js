import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import list from './list';
import statusBar from './status-bar';

const reducers = {
	form,
	list,
	statusBar
};
export default combineReducers(reducers);
