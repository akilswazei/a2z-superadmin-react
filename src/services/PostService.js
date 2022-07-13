import axios from 'axios'

export const getPosts = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/post/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const deletePosts = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/user/delete',
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

export const addPost = async (userInfo, userdata) => {
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/post/store', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
export const getPostsList = async (userInfo) => {
  let getpara = []

  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/help-categories' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}
