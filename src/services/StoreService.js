/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getStores = async (userInfo,page=1,search_keyword="") => {
  console.log(search_keyword);
    let getpara=[]
    getpara[0]=page==1?'':"page="+page;
    getpara[1]=search_keyword==""?'':"s="+search_keyword;
    const para = getpara.join('&');
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/store/list?'+para+'merchant_id='+ 211019041655, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const deleteStore= async (userInfo, eid) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/store/delete',{
    eid: eid
  }, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return true
  
}
