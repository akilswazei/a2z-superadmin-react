/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getIndividuals = async (userInfo,page=1,search_keyword="") => {
  console.log(search_keyword);
    let getpara=[]
    getpara[0]=page==1?'':"page="+page;
    getpara[1]=search_keyword==""?'':"s="+search_keyword;
    const para = getpara.join('&');
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/team/list-individual?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const getIndividual = async (userInfo,eid="") => {
    const para="eid="+eid;
    const {data}= await axios.get(process.env.REACT_APP_BASE_URL + '/admin/team/show-individual?'+para, {
        headers: {
          Authorization: 'Bearer ' + userInfo.data.token,
        }
      })
      return data
}

export const deleteIndividual= async (userInfo, eid) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/team/delete',{
    eid: eid
  }, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return true
}
export const addIndividual= async (userInfo, userdata) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/team/store-individual',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  }).catch((error) => {
      return error.response
  })
  return data
}
export const updateIndividual= async (userInfo, userdata) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/team/update-individual',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  }).catch((error) => {
      return error.response
  })
  return data
}
