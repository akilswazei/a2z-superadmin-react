import axios from 'axios'

export const getMerchants = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/merchant/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getMerchant = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/merchant/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const addMerchant= async (userInfo, userdata) => {
  const {data}=await axios.post(process.env.REACT_APP_BASE_URL + '/admin/merchant/store',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  .catch(error => {
    return error.response
  });
  return data
}

export const updateMerchant= async (userInfo, userdata) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/merchant/update',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  }).catch((error) => {
      return error.response
  })
  return data
}
export const deleteMerchant= async (userInfo, eid) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/merchant/delete',{
    eid: eid
  }, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return true
}