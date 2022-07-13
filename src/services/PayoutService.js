import axios from 'axios'

export const getPayouts = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/payout/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getPayoutsHistory = async (userInfo, eid = '') => {
  let getpara = []

  getpara[0] = eid == '' ? '' : 'eid=' + eid

  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/payout/payout-history?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
export const getPayHistory = async (userInfo, eid = '') => {
  let getpara = []

  getpara[0] = eid == '' ? '' : 'eid=' + eid

  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/payout/payment-history?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getPayout = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/payout/list' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
export const addPay = async (userInfo, userData) => {
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/payout/store', userData, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
export const addPayouts = async (userInfo, userdata) => {
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/payout/store', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
