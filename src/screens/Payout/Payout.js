/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { getPayout, getPayouts } from 'src/services/PayoutService'
import FormStyles from 'src/helper/FormStyles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { CustomText } from 'src/helper/helper'
const datagridSx = FormStyles

const Payout = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [payout, setPayout] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [openPay, setOpenPay] = React.useState(false)
  const [openPayHistory, setOpenPayHistory] = React.useState(false)
  const [openPayDesc, setOpenPayDesc] = React.useState(false)
  const [payNumber, setPayNumber] = React.useState()
  const getPayoutData = async () => {
    setPayout(await getPayouts(userInfo))
  }

  const searchPayout = async (value) => {
    setSearch(value)
    setPage(1)
    setPayout(await getPayouts(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setPayout(await getPayouts(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    // deletePayout(userInfo, eid)
    // setPayout({
    //   ...payout,
    //   data: { ...payout.data, data: [...payout.data.data.filter((v, i) => v.eid != eid)] },
    // })
  }
  useEffect(() => {
    getPayoutData()
  }, [])

  console.log(payout)
  let sr_no = 0
  const columns = [
    // { field: 'payout_name', headerName: 'Payout', width: 350 },
    // { field: 'category', headerName: 'Category', width: 150 },
    // { field: 'brand', headerName: 'Brand', width: 150 },
    // { field: 'supplier', headerName: 'Supplier', width: 150 },
    // { field: 'supplier_price', headerName: 'Supplier Price', width: 150 },
    // { field: 'selling_price', headerName: 'Store Sell Price', width: 150 },
    { field: 'eid', headerName: 'Eid', width: 150 },
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'outsource_type', headerName: 'Type', width: 150 },
    { field: 'total_earn', headerName: 'Total Earn', width: 150 },
    { field: 'total_paid', headerName: 'Paid', width: 150 },
    { field: 'to_pay', headerName: 'To Pay', width: 150 },
    // { field: 'company_name', headerName: 'Name', width: 200 },
    // { field: 'company_email', headerName: 'Email', width: 300 },
    // { field: 'service_type', headerName: 'service type', width: 150 },
    // {
    //   field: 'status',
    //   width: 150,
    //   renderCell: (cellValues) => {
    //     return (
    //       <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
    //         {cellValues?.row?.status == 1 ? 'Inactive' : 'Active'}
    //       </button>
    //     )
    //   },
    // },
    {
      field: 'actions',
      width: 300,
      renderCell: (cellValue) => {
        return (
          <div className="edit-delete-div">
            <span className="delete-icon" onClick={(e) => handleDelete(cellValue?.row?.eid, e)}>
              <button className="custom-pay-btn" onClick={handleClickPay}>
                Pay
              </button>
              <button className="custom-pay-btn" onClick={handleClickPayHistory}>
                Pay history
              </button>
              <button className="custom-pay-btn" onClick={handleClickPayDesc}>
                Pay description
              </button>
            </span>
          </div>
        )
      },
    },
  ]
  const handleClickPay = () => {
    setOpenPay(!openPay)
  }
  const handleClickPayHistory = () => {
    setOpenPayHistory(!openPayHistory)
  }
  const handleClickPayDesc = () => {
    setOpenPayDesc(!openPayDesc)
  }
  const handlePayClose = () => {
    setOpenPay(false)
    navigate('../payouts', { replace: true })
  }
  const handlePayHistoryClose = () => {
    setOpenPayHistory(false)
    navigate('../payouts', { replace: true })
  }
  const handlePayDescClose = () => {
    setOpenPayDesc(false)
    navigate('../payouts', { replace: true })
  }
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/payout/add')
  }
  const handleCreate = (e) => {
    e.preventDefault()
    console.log(payNumber)
    setPayNumber('')
    setOpenPay(false)
  }

  return (
    <MainBoard>
      {/* this dialogue box is for pay */}
      <Dialog
        open={openPay}
        onClose={handlePayClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Merchant ID'}</DialogTitle>
        <DialogContent>
          <CustomText
            label="Pay value in ($)"
            name="pay"
            placeholder="Value in $"
            error={false}
            required={true}
            handleChange={(e) => handleCreate(e)}
          />
          {/* <DialogContentText id="alert-dialog-description">Successfully Submitted</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <button className="custom-pay-btn" onClick={handlePayClose}>
            Submit
          </button>
        </DialogActions>
      </Dialog>
      {/* pay dialogue box ends here */}
      {/* this dialogue box is for pay history */}
      <Dialog
        open={openPayHistory}
        onClose={handlePayHistoryClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'History'}</DialogTitle>
        <DialogContent>
          <CustomText
            label="Pay value in ($)"
            name="pay"
            placeholder="Value in $"
            error={false}
            required={true}
            handleChange={(e) => handleCreate(e)}
          />
          {/* <DialogContentText id="alert-dialog-description">Successfully Submitted</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <button className="custom-pay-btn" onClick={handlePayHistoryClose}>
            Submit
          </button>
        </DialogActions>
      </Dialog>
      {/* pay  dialogue box ends here */}
      {/* this dialogue box is for pay description */}
      <Dialog
        open={openPayDesc}
        onClose={handlePayDescClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Description'}</DialogTitle>
        <DialogContent>
          <CustomText
            label="Pay value in ($)"
            name="pay"
            placeholder="Value in $"
            error={false}
            required={true}
            handleChange={(e) => handleCreate(e)}
          />
          {/* <DialogContentText id="alert-dialog-description">Successfully Submitted</DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <button className="custom-pay-btn" onClick={handlePayDescClose}>
            Submit
          </button>
        </DialogActions>
      </Dialog>
      {/* pay description  dialogue box ends here */}
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Payouts</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input type="text" placeholder="Sort by" className="m-1" />
            <input
              type="text"
              placeholder="Search here"
              className="m-1"
              onChange={(e) => {
                searchPayout(e.target.value)
              }}
            />
            <button onClick={navigateFunction} className="custom-blue-btn m-2">
              Add Payouts<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {payout?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={payout.data.data}
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
              count={payout?.data?.links ? payout.data.links.length - 2 : 1}
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
export default Payout
