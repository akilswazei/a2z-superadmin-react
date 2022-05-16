/* eslint-disable prettier/prettier */
import { GET_ROLE, GET_ROLE_FAIL } from "src/constants/RolesConstants";
import {  } from "../../constants/UserConstants";

const initialState = {
    roles: [],
    role: null
};



export const userRoleReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ROLE : 
            return { loading: false, roles: payload }
        case GET_ROLE_FAIL : 
            return { loading: false, error: payload }
        default:
            return state;
    }
};