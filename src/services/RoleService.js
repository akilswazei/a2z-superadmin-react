/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getRoles = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const getRole = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role?' + para, {
    headers: {
      Authorization: 'Bearer ' + userInfo.data.token,
    },
  })
  return data
}

export const deleteRole = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role',
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
export const addRole = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
export const updateRole = async (userInfo, userdata) => {
  const { data } = await axios
    .post(process.env.REACT_APP_BASE_URL + '/admin/role/get-super-admin-role', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
