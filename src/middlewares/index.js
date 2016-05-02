import { applyMiddleware } from 'redux';
import saveStore from './save-store';
import thunk from 'redux-thunk';

export default applyMiddleware(
	saveStore, thunk
);
