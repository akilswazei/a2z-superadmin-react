/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { updateUserReducers, userListReducers, userReducers, userSigninReducer } from './reducers/UserReducers'


const initialState = {
  userSignin : {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  }
};

const reducer = combineReducers({
  // eslint-disable-next-line prettier/prettier
  allUsers : userReducers,
  userList: userListReducers,
  // eslint-disable-next-line prettier/prettier
  updateUser : updateUserReducers,
  userSignin: userSigninReducer
})

const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, componseEnhancer(applyMiddleware(thunk)))

export default store
