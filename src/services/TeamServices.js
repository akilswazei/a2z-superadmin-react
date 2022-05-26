/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getTeams = async (userInfo,page=1,search_keyword="") => {
  if(search_keyword!=''){
    return {
      status: "success",
      message: "",
      data: {
          current_page: 1,
          data: [
            {company_name: 'company api', company_email: 'companiapi@a2dz.com', hire_for: "support"}
          ]
      }
    }
              
  } else{
    page=page==1 ? '' : "?page="+page;
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/team/list'+page, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        },
        data: {
          page: page
        }
      })
      return data
    }
}