/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {
  userReducers,
  userSigninReducer,
} from './redux/reducers/UserReducers'

import {
  mediaReducer
} from './redux/reducers/MediaReducers'

import {
  leadReducers,
} from './redux/reducers/LeadReducers'

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const leads_storage = localStorage.getItem('leads')
  ? JSON.parse(localStorage.getItem('leads'))
  : null  
  
console.log ("Store ", leads_storage)  

const initialState = {
  userSignin: {
    userInfo: userInfo,
    isLoggedIn: !!userInfo,    
  } ,
  leads: leads_storage, 
}

const reducer = combineReducers({
  allUsers: userReducers,
  userSignin: userSigninReducer,
  media: mediaReducer,
  leads: leadReducers,
})

const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, componseEnhancer(applyMiddleware(thunk)))

export default store
