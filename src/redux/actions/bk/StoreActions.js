/* eslint-disable prettier/prettier */
import axios from "axios";
import { GET_STORE, GET_STORE_FAIL } from "src/constants/StoreConstants";

export const getStores = (merchant_id) => async(dispatch, getState) => {
    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get( process.env.REACT_APP_BASE_URL + "/admin/store/list?merchant_id="+ merchant_id,  { 
            "merchant_id" : merchant_id ,
            headers: {
                Authorization: "Bearer " + userInfo.data.token,
            }
        })
        dispatch({type: GET_STORE, payload: data});
    } catch (error) {
        dispatch({
            type: GET_STORE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}