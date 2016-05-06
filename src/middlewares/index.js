import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

import {sendActions} from '../modules/electron-xproc-redux';

import saveStore from './save-store';
import savePasswordKeychain from './save-password-keychain';

export default applyMiddleware(
	savePasswordKeychain,
	saveStore,
	thunk,
	sendActions(['OPEN_TUNNEL_STATE', 'CLOSE_TUNNEL_STATE'])
);
