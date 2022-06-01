/* eslint-disable prettier/prettier */
import { ADD_TEAM, ADD_TEAM_FAIL, DELETE_TEAM, GET_TEAM, GET_TEAM_FAIL, TEAM_DETAIL_FAIL, TEAM_DETAIL_REQUEST, TEAM_DETAIL_SECCESS, TEAM_LIST, TEAM_LIST_FAIL, TEAM_SIGNIN_FAIL, TEAM_SIGNIN_REQUEST, TEAM_SIGNIN_SUCCESS, TEAM_SIGNOUT, TEAM_UPDATE, TEAM_UPDATE_FAIL } from "../../constants/TeamConstants";

const initialState = {
    teams: [],
    team: null
};

export const teamReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_TEAM : 
            return { loading: false, teams: payload }
        case GET_TEAM_FAIL : 
            return { loading: false, error: payload }
        case ADD_TEAM:
            return { loading: false, success: true, ...state, teams: [payload, ...state.teams]}
        case ADD_TEAM_FAIL:
            return { loading: false, error: payload }
        case DELETE_TEAM:
            return { loading: false, ...state, teams: state.teams.data.data.filter((x) => x.eid !== payload.eid )}
        default:
            return state;
    }
};

export const teamListReducers = (state = {loading: true, teams: []}, action) => {
    switch (action.type) {
        case TEAM_LIST : 
            return { loading: false, teams: action.payload }
        case TEAM_LIST_FAIL : 
            return {loading: false, error: action.payload }
        default:
            return state;
    }
}

export const updateTeamReducers = (state = initialState, {type, payload}) => {
    switch (type) {
        case TEAM_UPDATE: 
            return { loading: false, success: true, teams: payload}
        case TEAM_UPDATE_FAIL : 
            return {loading: false, error: payload }
        default:
            return state;
    }
}

export const teamDetailReducer = (state = {post: {}, loading: true}, action) => {
    switch (action.type) {
        case TEAM_DETAIL_REQUEST:
            return {loading: true}
        case TEAM_DETAIL_SECCESS:
            return { loading: false, post: action.payload }
        case TEAM_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

