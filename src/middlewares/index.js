import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import saveStore from './save-store';
import savePasswordKeychain from './save-password-keychain';

export default applyMiddleware(
	savePasswordKeychain, saveStore, thunk
);
