/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getTeams = async (userInfo,page=1,search_keyword="") => {
  console.log(search_keyword);
 
    let getpara=[]
    getpara[0]=page==1?'':"page="+page;
    getpara[1]=search_keyword==""?'':"s="+search_keyword;
    const para = getpara.join('&');
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/team/list?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
    
}

export const deleteTeam= async (userInfo, eid) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/team/delete',{
    eid: eid
  }, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return true
  
   
}
