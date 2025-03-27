import {  GET_USER_DATA, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, get_USER_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    user: {},
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, user: action.payload, isError: false, isLoggedIn: true };
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isError: true, isLoggedIn: false };
        case GET_USER_DATA:
            return { ...state, isError: false};
        case get_USER_SUCCESS:
            return {...state,isError:false,user:action.payload}
        case LOGOUT_REQUEST:
            return {...state,isError:false,isLoading:true};
        case LOGOUT_SUCCESS:
            return {...state,isError:false,isLoading:false,user:{},isLoggedIn:false};
        case LOGOUT_FAILURE:
            return {...state,isError:true}
        default:
            return state
    }
}