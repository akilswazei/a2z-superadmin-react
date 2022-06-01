/* eslint-disable prettier/prettier */
import axios from "axios";
import { GET_MERCHANTS, GET_MERCHANTS_FAIL } from "src/constants/MerchantConstants";

export const getMerchants = (merchant_id) => async(dispatch, getState) => {
    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get( process.env.REACT_APP_BASE_URL + "/admin/merchant/list",  { 
            headers: {
                Authorization: "Bearer " + userInfo.data.token,
            }
        })
        dispatch({type: GET_MERCHANTS, payload: data});
    } catch (error) {
        dispatch({
            type: GET_MERCHANTS_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}