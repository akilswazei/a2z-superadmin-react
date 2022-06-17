import axios from 'axios'

export const getProducts = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/product/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getProduct = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/product/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const addProduct= async (userInfo, userdata) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/product/store',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const updateProduct= async (userInfo, userdata) => {
  const {data}= await axios.post(process.env.REACT_APP_BASE_URL + '/admin/product/update',userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  }).catch((error) => {
      return error.response
  })
  return data
}