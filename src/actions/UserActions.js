/* eslint-disable prettier/prettier */
import axios from 'axios';
import { ADD_USER, ADD_USER_FAIL, DELETE_USER, GET_USER, GET_USER_FAIL, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SECCESS, USER_LIST, USER_LIST_FAIL, USER_UPDATE, USER_UPDATE_FAIL } from '../constants/UserConstants';

export const addUser = (userData) => async(dispatch) => {
    try {
        const {data} = await axios.post("https://jsonplaceholder.typicode.com/users/", userData);
        dispatch({type: ADD_USER, payload: data});
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })        
    }  
}

export const getUsers = () => async(dispatch) => {
    try {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/");
        dispatch({type: GET_USER, payload: data});
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

export const getUsersbyId = (id) => async(dispatch) => {
    dispatch({type: USER_DETAIL_REQUEST, payload: id});
    try {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/"+ id);
        dispatch({type: USER_DETAIL_SECCESS, payload: data});
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}


export const updateUser = (id) => async(dispatch) => {
    try {
        const {data} = await axios.put("https://jsonplaceholder.typicode.com/users/"+ id );
        dispatch({type: USER_UPDATE, payload: data});
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })   
    } 
}

// user list
export const searchUserList = () => async(dispatch) => {
    try {
        const {data} = await axios.get("http://localhost:3001/users/list/");
        dispatch({type: USER_LIST, payload: data});
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}

export const deleteUser = (userId) => async(dispatch) => {
    await axios.delete("https://jsonplaceholder.typicode.com/users/" + userId);
    dispatch({type: DELETE_USER, payload: userId });
}