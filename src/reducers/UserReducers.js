/* eslint-disable prettier/prettier */
import { ADD_USER, ADD_USER_FAIL, DELETE_USER, GET_USER, GET_USER_FAIL, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SECCESS, USER_LIST, USER_LIST_FAIL, USER_UPDATE, USER_UPDATE_FAIL } from "../constants/UserConstants";

const initialState = {
    users: [],
    user: null
};

export const userReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USER : 
            return { loading: false, users: payload }
        case GET_USER_FAIL : 
            return { loading: false, error: payload }
        case ADD_USER:
            return { loading: false, success: true, ...state, users: [payload, ...state.users]}
        case ADD_USER_FAIL:
            return { loading: false, error: payload }
        case DELETE_USER:
            return { loading: false, ...state, users: state.users.filter((x) => x.id !== payload )}
        default:
            return state;
    }
};

export const userListReducers = (state = {loading: true, users: []}, action) => {
    switch (action.type) {
        case USER_LIST : 
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL : 
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}


export const updateUserReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case USER_UPDATE: 
            return { loading: false, success: true, users: payload}
        case USER_UPDATE_FAIL : 
            return {loading: false, error: payload }
        default:
            return state;
    }
}

export const userDetailReducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {loading: true}
        case USER_DETAIL_SECCESS:
            return { loading: false, post: action.payload }
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}