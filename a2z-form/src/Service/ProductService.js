import axios from 'axios'

export const getProductsList = async (userInfo, page = 1, search_keyword = '') => {
  console.log(search_keyword)
  let getpara = []
  getpara[0] = page == 1 ? '' : 'page=' + page
  getpara[1] = search_keyword == '' ? '' : 's=' + search_keyword
  const para = getpara.join('&')
//   const { data } = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/product/list?' + para, {
//     headers: {
//       Authorization: 'Bearer ' + userInfo.data.token,
//     },
//   })
const data = {data:[
    {
        "product_name": "Frito Lay Nut Harvest Chocolate & Nut Mix 2.25oz",
        "product_upc": "028400034821",
        "selling_price": "1.29",
        "supplier_price": "1.99",
        "market_price": "1.99",
        "status": 1,
        "imagefile": "http:\/\/atozsuperadmin.azurewebsites.net\/public\/uploads\/2022-04\/16492100022043436317.jpeg",
        "min_order_quantity": "1",
        "is_subscription": 0,
        "subscription_day": 0,
        "eid": "TW54OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ=="
    },
    {
        "product_name": "Brisk Lemon Flavor Ice Tea 12 x 12 Fl Oz\t",
        "product_upc": "012000810091",
        "selling_price": "4.11",
        "supplier_price": "4.55",
        "market_price": "4.55",
        "status": 1,
        "imagefile": "http:\/\/atozsuperadmin.azurewebsites.net\/public\/uploads\/2022-04\/1649209115706437725.jpeg",
        "min_order_quantity": "",
        "is_subscription": 0,
        "subscription_day": 0,
        "eid": "TVh4OFVsQkNibTlRU1dsUVdsVjVjSHBRWlVwalFteFVaV2hITlhOeGJYQlhXa295VDJoNGVHaE9lbkpxWXc9PQ=="
    }
]
}
  return data;
}