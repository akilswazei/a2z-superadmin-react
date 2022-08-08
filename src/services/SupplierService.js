import axios from 'axios'

export const getSuppliers = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')

  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/supplier/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getSupplier = async (userInfo, eid = '') => {
  const para = 'eid=' + eid

  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/supplier/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const deleteSupplier = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/supplier/delete',
    {
      eid: eid,
    },
    {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    },
  )
  return true
}
export const addSupplier = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/supplier/store', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
export const updateSupplier = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/supplier/update', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
