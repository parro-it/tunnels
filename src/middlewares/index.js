import { applyMiddleware } from 'redux';
import saveStore from './save-store';
import promise from 'redux-simple-promise';

export default applyMiddleware(saveStore, promise());
