import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import saveStore from './save-store';

export default applyMiddleware(
	saveStore, thunk
);
