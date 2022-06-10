/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getOrders } from 'src/services/OrderService'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

const datagridSx = {
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    '& .MuiDataGrid-row': {
      '&:nth-of-type(2n)': {
        backgroundColor: '#F9F9FC',
        border: 'none',
      },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255,255,255)',
    border: 'none',
    color: 'rgba(180,182,193)',
    fontSize: '1.2em',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  '& .MuiDataGrid-row': {
    fontSize: '0.9em',
    fontWeight: '600',
    border: 'none',
  },
  '& .css-i4bv87-MuiSvgIcon-root': {
    color: '#1976D2',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .customTable .MuiDataGrid-root .MuiDataGrid-root--densityStandard': {
    border: '0px solid gray !important',
  },
  '& .MuiDataGrid-footerContainer': {
    '& .MuiTablePagination-root': {
      display: 'none',
    },
  },
}

const Order = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [order, setOrder] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getOrderData = async () => {
    setOrder(await getOrders(userInfo))
  }

  const searchOrder = async (value) => {
    setSearch(value)
    setPage(1)
    setOrder(await getOrders(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setOrder(await getOrders(userInfo, value, search))
  }

  // const handleDelete = async (eid, e) => {
  //   deleteIndividual(userInfo, eid)
  //   setOrder({
  //     ...order,
  //     data: { ...order.data, data: [...order.data.data.filter((v, i) => v.eid != eid)] },
  //   })
  // }
  useEffect(() => {
    getOrderData()
  }, [])

  console.log(order)
  let sr_no = 0
  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'eid', headerName: 'Order ID', width: 150 },
    { field: 'merchant', headerName: 'Merchant', width: 200 },
    { field: 'store', headerName: 'Stores', width: 200 },
    { field: 'contact', headerName: 'Contact', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    { field: 'company_name', headerName: 'Name', width: 200 },
    { field: 'company_email', headerName: 'Email', width: 300 },
    { field: 'service_type', headerName: 'service type', width: 150 },
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
            <span className="pencil-icon" onClick={(e) => navigate('/individual/edit/' + cellValue?.row?.eid)}>
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

  //   const navigateFunction = (e) => {
  //     e.preventDefault()
  //     navigate('/individual/add')
  //   }
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
            {/* <button className="custom-blue-btn m-2">
              Add Individual<span>{<PersonAddAltIcon />}</span>
            </button> */}
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
                getRowId={(row) => Math.random()}
                rows={order.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
            <Container>
              <Pagination
                className="pagination"
                count={order?.data?.links ? order.data.links.length - 2 : 1}
                page={page}
                defaultPage={page}
                onChange={(e, number) => changePage(e, number)}
              />
            </Container>
          </div>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Order
