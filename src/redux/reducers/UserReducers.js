/* eslint-disable prettier/prettier */
import {
  ADD_USER,
  ADD_USER_FAIL,
  DELETE_USER,
  GET_USER,
  GET_USER_FAIL,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SECCESS,
  USER_LIST,
  USER_LIST_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE,
  USER_UPDATE_FAIL,
} from '../../constants/UserConstants'

const userInfo = localStorage.getItem('userInfo')

// COMMENT - SHould get this from local storage to support page refresh
const initialState = {
  users: [],
  user: null,
  userInfo: userInfo,
  error: null,
  isLoggedIn: false,
}

export const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return { ...state, loading: false, users: payload }
    case GET_USER_FAIL:
      return { ...state, loading: false, error: payload }
    case ADD_USER:
      return { ...state, loading: false, success: true, ...state, users: [payload, ...state.users] }
    case ADD_USER_FAIL:
      return { ...state, loading: false, error: payload }
    case DELETE_USER:
      return {
        ...state,
        loading: false,
        users: state.users.data.data.filter((x) => x.eid !== payload.eid),
      }
    default:
      return state
  }
}

export const userListReducers = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case USER_LIST:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateUserReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_UPDATE:
      return { loading: false, success: true, users: payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const userDetailReducer = (state = { post: {}, loading: true }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true }
    case USER_DETAIL_SECCESS:
      return { loading: false, post: action.payload }
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true }
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, isLoggedIn: true }
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload, isLoggedIn: false }
    case USER_SIGNOUT:
      return initialState
    default:
      return state
  }
}
