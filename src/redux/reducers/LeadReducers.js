/* eslint-disable prettier/prettier */
import { 
            GET_LEAD, 
            GET_LEAD_FAIL, 
            LEAD_DETAIL_FAIL,
            LEAD_DETAIL_REQUEST, 
            LEAD_DETAIL_SECCESS, 
            LEAD_UPDATE, 
            LEAD_UPDATE_DETAIL,
            LEAD_UPDATE_FAIL 
        } from '../../constants/LeadConstants';


const leadInfo = localStorage.getItem('leads')        


const initialState = {
    leads: leadInfo.data
};

export const leadReducers = (state = initialState, {type, payload}) => {

    console.log("Lead Reducers ",state)

    switch (type) {
        case GET_LEAD :
            return { loading: false, leads: payload }
        case GET_LEAD_FAIL : 
            return { loading: false, error: payload }
        case LEAD_UPDATE: 
            return { loading: true, success: true, cards : payload.cards, columns : payload.columns}
        case LEAD_UPDATE_DETAIL: 
            return { loading: true, success: true, cards : payload.cards, columns : payload.columns}
        case LEAD_UPDATE_FAIL : 
            return {loading: false, error: payload }            
        default:
            return state;
    }
};


export const leadDetailReducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case LEAD_DETAIL_REQUEST:
            return {loading: true}
        case LEAD_DETAIL_SECCESS:
            return { loading: false, post: action.payload }
        case LEAD_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}