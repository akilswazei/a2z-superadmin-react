/* eslint-disable prettier/prettier */
import { 
            GET_LEAD, 
            GET_LEAD_FAIL, 
            LEAD_DETAIL_FAIL,
            LEAD_DETAIL_REQUEST, 
            LEAD_DETAIL_SECCESS, 
            LEAD_UPDATE, 
            LEAD_UPDATE_FAIL 
        } from '../../constants/LeadConstants';

const initialState = {
    leads: [],
    lead: null
};

export const leadReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_LEAD :
            return { loading: false, leads: payload }
        case GET_LEAD_FAIL : 
            return { loading: false, error: payload }
        default:
            return state;
    }
};

export const updateLeadReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case LEAD_UPDATE: 
            return { loading: false, success: true, leads: payload}
        case LEAD_UPDATE_FAIL : 
            return {loading: false, error: payload }
        default:
            return state;
    }
}

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