import axios from 'axios'

export const getUsers = async (userInfo,page=1,search_keyword="") => {
  if(search_keyword!=''){
    return {
      status: "success",
      message: "",
      data: {
          current_page: 1,
          data: [
            {name: 'companiapi', email: 'companiapi@a2dz.com', role: "support-admin"}
          ]
      }
    }
              
  } else{
    page=page==1?'':"?page="+page;
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/user/list'+page, {
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
