import axios from 'axios';

export const getLeads = async (userInfo,page=1,search_keyword="") => {    
    let getpara=[]
    getpara[0]=page==1?'':"page="+page;
    getpara[1]=search_keyword==""?'':"s="+search_keyword;
    const para = getpara.join('&');
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/lead/list?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const leadUpdateStatus = async (userInfo, userdata) => {
    
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/lead/lead-update-status', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}