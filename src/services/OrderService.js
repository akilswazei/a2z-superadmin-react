import axios from 'axios'

export const getOrders = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/order/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getOrder = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/order/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
export const deleteOrder = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/order/delete',
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
