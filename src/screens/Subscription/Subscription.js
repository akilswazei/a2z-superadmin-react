/* eslint-disable prettier/prettier */
//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

//material UI imports
import { Container } from '@material-ui/core'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom style imports
import FormStyles from 'src/helper/FormStyles'
//custom component imports
import MainBoard from 'src/components/include/MainBoard'
import { getSubscriptions } from 'src/services/SubscriptionService'
import { useNavigate } from 'react-router-dom'

//style for data grid
const datagridSx = FormStyles

//main function starts here
const Subscription = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [subscription, setSubscription] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch
  const getSubscriptionData = async () => {
    setSubscription(await getSubscriptions(userInfo))
  }

  //search
  const searchSubscription = async (value) => {
    setSearch(value)
    setPage(1)
    setSubscription(await getSubscriptions(userInfo, 1, value))
  }

  //page change
  const changePage = async (e, value) => {
    setPage(value)
    setSubscription(await getSubscriptions(userInfo, value, search))
  }
  //delete

  //custom function to retrive amount for data grid
  const getAmount = (params) => {
    const total_amt = params.row.product.atz_selling_price
    return total_amt
  }

  //rerendering
  useEffect(() => {
    getSubscriptionData()
  }, [])

  console.log(subscription)

  //columns for data grid
  const columns = [
    { field: 'eid', headerName: 'Subscription ID', width: 150 },
    { field: 'merchant_id', headerName: 'Merchant', width: 200 },
    { field: 'subscription_start_date', headerName: 'Start Date', width: 200 },
    { field: 'subscription_end_date', headerName: 'Next Renewal', width: 200 },
    {
      field: 'total_amount',
      headerName: 'Amount',
      width: 200,
      valueGetter: getAmount,
    },
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
            <span className="pencil-icon" onClick={(e) => navigate('/subscription/edit/' + cellValue?.row?.eid)}>
              <EditIcon />
            </span>
            {/* <span className="delete-icon">
              <DeleteIcon />
            </span> */}
          </div>
        )
      },
    },
  ]

  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Subscriptions</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              className="m-1"
              placeholder="Sort By"
              onChange={(e) => {
                searchSubscription(e.target.value)
              }}
            />

            <input
              type="text"
              placeholder="Search here"
              className="m-1"
              onChange={(e) => {
                searchSubscription(e.target.value)
              }}
            />
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {subscription?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={subscription.data.data}
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
              count={subscription?.data?.links ? subscription.data.links.length - 2 : 1}
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
export default Subscription
