/* eslint-disable prettier/prettier */
import * as React from 'react'
//react imports
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//material UI imports
import { Container } from '@material-ui/core'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import MainBoard from 'src/components/include/MainBoard'
import DeleteIcon from '@mui/icons-material/Delete'
//custom components imports
import { getOrders } from 'src/services/OrderService'
//custom styling imports
import FormStyles from 'src/helper/FormStyles'

//styling of datagrid
const datagridSx = FormStyles

//main function starts here
const Order = () => {
  //navigation function
  const navigate = useNavigate()
  //selector function
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [order, setOrder] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch function
  const getOrderData = async () => {
    setOrder(await getOrders(userInfo))
  }

  //search function
  const searchOrder = async (value) => {
    setSearch(value)
    setPage(1)
    setOrder(await getOrders(userInfo, 1, value))
  }

  //pagiantion fucntion for changing page
  const changePage = async (value) => {
    setPage(value)
    setOrder(await getOrders(userInfo, value, search))
  }

  //custom data grid function for specific data retrival
  const getStoreName = (params) => {
    return `${params.row.store.store_name || ''}`
  }
  const getStoreContact = (params) => {
    return `${params.row.store.store_contact || ''}`
  }
  const getOrderDate = (params) => {
    return `${params.row.store.updated_date}`
  }
  //use effect for rerender of the component
  useEffect(() => {
    getOrderData()
  }, [])

  console.log(order)

  //columns for data grid
  const columns = [
    {
      field: 'store_date',
      headerName: 'Date',
      width: 150,
      valueGetter: getOrderDate,
    },
    {
      field: 'store_name',
      headerName: 'Store',
      width: 170,
      valueGetter: getStoreName,
    },
    {
      field: 'store_contact',
      headerName: 'Store Contact',
      width: 150,
      valueGetter: getStoreContact,
    },
    { field: 'total_price', headerName: 'Amount', width: 150 },
    {
      field: 'status',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
            {cellValues?.row?.status == 1 ? 'Processing' : 'completed'}
          </button>
        )
      },
    },
    {
      field: 'actions',
      width: 100,
      renderCell: (cellValue) => {
        return (
          <div className="edit-delete-div">
            <span className="pencil-icon" onClick={(e) => navigate('/order/edit/' + cellValue?.row?.eid)}>
              <EditIcon />
            </span>
            <span className="delete-icon">
              <DeleteIcon />
            </span>
          </div>
        )
      },
    },
  ]
  //colum ends here

  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Orders</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              className="m-1"
              placeholder="Sort By"
              onChange={(e) => {
                searchOrder(e.target.value)
              }}
            />

            <input
              type="text"
              placeholder="Search here"
              className="m-1"
              onChange={(e) => {
                searchOrder(e.target.value)
              }}
            />
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {order?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={order.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
          </div>
          <Container>
            <Pagination
              className="pagination"
              count={order?.data?.links ? order.data.links.length - 2 : 1}
              page={page}
              defaultPage={page}
              onChange={(e, number) => changePage(e, number)}
            />
          </Container>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Order
