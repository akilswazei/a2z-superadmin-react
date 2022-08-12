/* eslint-disable prettier/prettier */
import axios from 'axios';
import { 
            GET_LEAD, 
            GET_LEAD_FAIL, 
            LEAD_DETAIL_FAIL,
            LEAD_DETAIL_REQUEST, 
            LEAD_DETAIL_SECCESS, 
            LEAD_UPDATE, 
            LEAD_UPDATE_FAIL 
        } from '../../constants/LeadConstants';


export const getLeads = () => async(dispatch, getState) => {
    try {        
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get( process.env.REACT_APP_BASE_URL + "/admin/lead/list", {
            headers: {
                Authorization: "Bearer " + userInfo.data.token,
            }
        })
        dispatch({type: GET_LEAD, payload: data});
    } catch (error) {
        dispatch({
            type: GET_LEAD_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getLeadsbyId = (id) => async(dispatch) => {
    dispatch({type: LEAD_DETAIL_REQUEST, payload: id});
    try {
        const {data} = await axios.get( process.env.BASE_URL + "/team/"+ id);
        dispatch({type: LEAD_DETAIL_SECCESS, payload: data});
    } catch (error) {
        dispatch({
            type: LEAD_DETAIL_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

export const updateLead = (id) => async(dispatch) => {
    try {
        const {data} = await axios.put("https://jsonplaceholder.typicode.com/TEAMs/"+ id );
        dispatch({type: LEAD_UPDATE, payload: data});
    } catch (error) {
        dispatch({
            type: LEAD_UPDATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

export const setColumnToLead = (card_id,column_id) => async(dispatch, getState) => {
    const {userSignin: {userInfo}} = getState();

    console.log("Card ID" + card_id + " Column ID" + column_id )
    const userdata = {
            "card_id" : card_id,
            "lead_new_status" : column_id,
            "lead_old_status" : 0,
            "userinfo" : userInfo
        }

    try {    

        const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/lead-update-status', userdata, {
            headers: {
              Authorization: 'Bearer ' + userInfo.data.token,
            },
        })        

        dispatch({type: LEAD_UPDATE, payload: data});
    } catch (error) {
        dispatch({
            type: GET_LEAD_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
