import { 
    ADMIN_LOADED, 
    ADMIN_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from '../actions/types';

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: localStorage.getItem('user'),
}

export default function(state=initialState,action){
    switch(action.type){
        case ADMIN_LOADING:
        return {
            ...state,
            isLoading: true
        };
        case ADMIN_LOADED:
        localStorage.setItem('user', action.payload)
        return {
            ...state,
            isAuthenticated:true,
            isLoading: false,
            user:action.payload
        };
        case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token)
        return {
            ...state,
            ...action.payload,
            isAuthenticated:true,
            isLoading: false,
        };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return{
            ...state,
            token:null,
            user:null,
            isAuthenticated:false,
            isLoading:false,
        }
        default:
        return state;
    };
}