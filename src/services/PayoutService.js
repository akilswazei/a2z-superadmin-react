import axios from 'axios'

// export const getPayouts = async (userInfo, page = 1, search_keyword = '') => {
//   console.log(search_keyword)
//   let getpara = []
//   getpara[0] = page == 1 ? '' : 'page=' + page
//   getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
//   const para = getpara.join('&')
// const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/payout/list?' + para, {
//   headers: {
//     Authorization: 'Bearer ' + userInfo.data.token,
//   },
// })
//   const json_data = {
//     status: 'success',
//     message: '',
//     data: {
//       current_page: 1,
//       data: [
//         {
//           eid: 'Tkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==',
//           Name: 'Jone',
//           outsource_type: 'Freelancer',
//           total_earn: '2500',
//           total_paid: '1100',
//           to_pay: '1400',
//         },
//         {
//           eid: 'dTkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==',
//           Name: 'Mac',
//           outsource_type: 'Agency',
//           total_earn: '1500',
//           total_paid: '1000',
//           to_pay: '500',
//         },
//       ],
//       first_page_url: 'http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1',
//       from: 1,
//       last_page: 1,
//       last_page_url: 'http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1',
//       links: [
//         {
//           url: null,
//           label: '&laquo; Previous',
//           active: false,
//         },
//         {
//           url: 'http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1',
//           label: '1',
//           active: true,
//         },
//         {
//           url: null,
//           label: 'Next &raquo;',
//           active: false,
//         },
//       ],
//       next_page_url: null,
//       path: 'http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list',
//       per_page: 5,
//       prev_page_url: null,
//       to: 4,
//       total: 4,
//     },
//   }
//   return json_data
// }

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

export const getPayoutsHistory = async (userInfo, eid) => {
  let getpara = []

  getpara[0] = eid
  const para = getpara.join('&')
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL + 'admin/payout/payout-history?' + para, {
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
