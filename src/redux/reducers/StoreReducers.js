/* eslint-disable prettier/prettier */
import { GET_STORE, GET_STORE_FAIL } from 'src/constants/StoreConstants'

const initialState = {
    stores: [],
    store: null
};

export const allStoresReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_STORE:
      return { loading: false, stores: payload }
    case GET_STORE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
