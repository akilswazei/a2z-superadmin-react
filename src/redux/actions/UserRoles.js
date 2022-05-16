/* eslint-disable prettier/prettier */
import axios from 'axios';
import { GET_ROLE, GET_ROLE_FAIL } from 'src/constants/RolesConstants';

export const getRoles = () => async (dispatch, getState) => {
  try {
    const {userSignin : {userInfo}} = getState();
    const { data } = await axios.get( process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role', {
      headers : {
        Authorization: "Bearer " + userInfo.data.token,
      }
    })
    dispatch({ type: GET_ROLE, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ROLE_FAIL,
      payload: error.message && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
