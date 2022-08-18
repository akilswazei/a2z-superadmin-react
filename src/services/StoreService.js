import axios from 'axios'

export const getStores = async (userInfo, page = 1, search_keyword = '', merchantId) => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  getpara[2] = merchantId == '' ? '' : 'merchant_id=' + merchantId
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/store/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getStore = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/store/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const updateStoreDevices=async(userInfo, userdata) =>{
  console.log(userdata)
}

export const addStore = async (userInfo, userdata) => {
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/store/store', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const updateStore = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/store/update', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
export const deleteStore = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/store/delete',
    {
      eid: eid,
    },
    {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    },
  )
  return data
}
