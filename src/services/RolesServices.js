import axios from 'axios';
import { GET_ROLE, GET_ROLE_FAIL } from 'src/constants/RolesConstants';

export const getRoles = async (userInfo) => {
      const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role', {
          headers: {
            Authorization: 'Bearer ' + userInfo.data.token,
          }
        })
        return data
      
  }
