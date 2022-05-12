/* eslint-disable prettier/prettier */
import axios from 'axios';
import { ADD_TEAM, ADD_TEAM_FAIL, DELETE_TEAM, GET_TEAM, GET_TEAM_FAIL, TEAM_DETAIL_FAIL, TEAM_DETAIL_REQUEST, TEAM_DETAIL_SECCESS, TEAM_LIST, TEAM_LIST_FAIL, TEAM_SIGNIN_FAIL, TEAM_SIGNIN_REQUEST, TEAM_SIGNIN_SUCCESS, TEAM_SIGNOUT, TEAM_UPDATE, TEAM_UPDATE_FAIL } from '../../constants/TeamConstants';


export const addTEAM = (TEAMData) => async(dispatch) => {
    try {
        const {data} = await axios.post( process.env.REACT_APP_BASE_URL + "/admin/team/store", TEAMData);
        dispatch({type: ADD_TEAM, payload: data});
    } catch (error) {
        dispatch({
            type: ADD_TEAM_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })        
    }  
}

export const getTeams = () => async(dispatch, getState) => {
    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.get( process.env.REACT_APP_BASE_URL + "/admin/team/list", {
            headers: {
                Authorization: "Bearer " + userInfo.data.token,
            }
        })
        dispatch({type: GET_TEAM, payload: data});
    } catch (error) {
        dispatch({
            type: GET_TEAM_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

export const getTEAMsbyId = (id) => async(dispatch) => {
    dispatch({type: TEAM_DETAIL_REQUEST, payload: id});
    try {
        const {data} = await axios.get( process.env.BASE_URL + "/team/"+ id);
        dispatch({type: TEAM_DETAIL_SECCESS, payload: data});
    } catch (error) {
        dispatch({
            type: TEAM_DETAIL_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

export const updateTEAM = (id) => async(dispatch) => {
    try {
        const {data} = await axios.put("https://jsonplaceholder.typicode.com/TEAMs/"+ id );
        dispatch({type: TEAM_UPDATE, payload: data});
    } catch (error) {
        dispatch({
            type: TEAM_UPDATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

// TEAM list
export const searchTEAMList = () => async(dispatch) => {
    try {
        const {data} = await axios.get("http://localhost:3001/TEAMs/list/");
        dispatch({type: TEAM_LIST, payload: data});
    } catch (error) {
        dispatch({
            type: TEAM_LIST_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const deleteTeam= (token, eid) => async(dispatch) => {
    await axios.post( process.env.REACT_APP_BASE_URL + "/admin/team/delete",  {token, eid});
    dispatch({type: DELETE_TEAM, payload: {token, eid} });
}

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: TEAM_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post(  process.env.REACT_APP_BASE_URL +'/login', {email, password});
        dispatch({type: TEAM_SIGNIN_SUCCESS,  payload: data});
        localStorage.setItem('TEAMInfo', JSON.stringify(data));
    } catch (error) {
       dispatch({
           type: TEAM_SIGNIN_FAIL,
           payload: error.response && error.response.data.message ?  error.response.data.message : error.message
       })
    }
}


export const signout = () => (dispatch) => {
    localStorage.removeItem('TEAMInfo');
    dispatch({type: TEAM_SIGNOUT});
}