/* eslint-disable prettier/prettier */

import { GET_MERCHANTS, GET_MERCHANTS_FAIL } from "src/constants/MerchantConstants";

const initialState = {
    merchants: [],
    merchant: null
};

export const allMerchantsReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_MERCHANTS:
      return { loading: false, merchants: payload }
    case GET_MERCHANTS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
