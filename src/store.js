// eslint-disable-next-line prettier/prettier
import { compose, applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { updateUserReducers, userListReducers, userReducers } from './reducers/UserReducers'

const reducer = combineReducers({
  // eslint-disable-next-line prettier/prettier
  allUsers : userReducers,
  userList: userListReducers,
  // eslint-disable-next-line prettier/prettier
  updateUser : updateUserReducers   
})

const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, componseEnhancer(applyMiddleware(thunk)))

export default store
