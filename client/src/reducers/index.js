import {combineReducers} from 'redux';
import errorReducer from './errorReducers';
import authReducer from './authReducers';
import nftReducer from './nftReducers';

export default combineReducers({
    error:errorReducer,
    auth:authReducer,
    nft:nftReducer,
});