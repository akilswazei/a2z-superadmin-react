import axios from 'axios'

export const getSuppliers = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
  const json_data={
    "status": "success",
    "message": "",
    "data": {
        "current_page": 1,
        "data": [

            {
                "supplier_name": "Southern Wine",
                contact_number: "9179",
                email: "jone@gmail.com",
                address: "2 jonson road SD",
                supplier_details:"no details",
                category: "TVh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
                respsentative_name: "",
                respsentative_email: "",
                respsentative_contact_no:"",
                "status": 0,
                "eid": "Tkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
            },
            {
                "supplier_name": "Coca-Cola",
                contact_number: "9179",
                email: "jone@gmail.com",
                address: "2 jonson road SD",
                supplier_details:"no details",
                category: "TVh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
                respsentative_name: "",
                respsentative_email: "",
                respsentative_contact_no:"",
                "status": 0,
                "eid": "Tkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
            },
            {
                "supplier_name": "PepsiCO",
                contact_number: "9179",
                email: "jone@gmail.com",
                addresss: "2 jonson road SD",
                supplier_details:"no details",
                category: "TVh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
                respsentative_name: "",
                respsentative_email: "",
                respsentative_contact_no:"",
                "status": 0,
                "eid": "Tkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
            }
        ],
        "first_page_url": "http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1",
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list?page=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "next_page_url": null,
        "path": "http://atozsuperadmin.azurewebsites.net/api/admin/supplier/list",
        "per_page": 5,
        "prev_page_url": null,
        "to": 4,
        "total": 4
    }
} 
  const  data = json_data
  console.log(data);
  // const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/supplier/list?' + para, {
  //   headers: {
  //     Authorization: 'Bearer ' + userInfo.data.token,
  //   },
  // })
  return data
}

export const getSupplier = async (userInfo, eid = '') => {
  const para = 'eid=' + eid
  const data={
    "status": "success",
    "message": "",
    "data": {
                "supplier_name": "Southern Wine",
                contact_number: "9179",
                email: "jone@gmail.com",
                address: "2 jonson road SD",
                supplier_details:"no details",
                category: "TTN4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
                respsentative_name: "",
                respsentative_email: "",
                respsentative_contact_no:"",
                "status": 0,
                "eid": "Tkh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ==",
            },
          }
  // const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/team/show-individual?' + para, {
  //   headers: {
  //     Authorization: 'Bearer ' + userInfo.data.token,
  //   },
  // })
  return data
}

export const deleteSupplier = async (userInfo, eid) => {
  const { data } = await axios.post(
    process.env.REACT_APP_BASE_URL + '/admin/team/delete',
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
    .post(process.env.REACT_APP_BASE_URL + '/admin/team/store-individual', userdata, {
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
    .post(process.env.REACT_APP_BASE_URL + '/admin/team/update-individual', userdata, {
      headers: {
        Authorization: 'Bearer ' + userInfo.data.token,
      },
    })
    .catch((error) => {
      return error.response
    })
  return data
}
