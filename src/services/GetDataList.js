import axios from 'axios'

export const getDataList = async (userInfo, page = 1, search_keyword = '', url) => {
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + url + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
//url /admin/product/list?
