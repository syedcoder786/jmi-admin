import { 
    ADMIN_LOADED, 
    ADMIN_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';
import { returnErrors } from './errorActions'
import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({type:ADMIN_LOADING})

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            "Contect-type":"application/json"
        }
    }
    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get('/auth/admin', config)
        .then( res => dispatch({
            type:ADMIN_LOADED,
            payload:res.data
        }))
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
            type:AUTH_ERROR
            })
        })
}

//Login
export const login = (user) => (dispatch) => {
    axios({
        method:'post',
        url:'/auth/login',
        data: user
    }).then(user => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload:user.data
        })
    }).catch(err => {
        console.log(err.response.status)
        dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        })
    })
}

//Log out
export const logout = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}