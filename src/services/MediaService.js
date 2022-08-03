import axios from 'axios'

export const getMedias = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/media/list?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getMedia = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/media/show?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const addMedia = async (userInfo, userdata) => {
  const { data } = await axios.post(process.env.REACT_APP_BASE_URL + '/admin/media/store', userdata, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const updateMedia = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/media/update', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
export const deleteMedia = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/media/delete',
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
