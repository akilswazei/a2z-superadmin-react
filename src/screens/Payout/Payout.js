/* eslint-disable prettier/prettier */
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { getPayout, getPayouts, getPayoutsHistory } from 'src/services/PayoutService'
import FormStyles from 'src/helper/FormStyles'
import { CustomText } from 'src/helper/helper'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import PayoutHistory from './PayoutHistory'
import { getPayHistory } from 'src/services/PayoutService'
import PayHistory from './PayHistory'

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
  const [payNumber, setPayNumber] = React.useState()
  const [openPay, setOpenPay] = React.useState(false)
  const [openHistoryPayout, setHistoryPayout] = React.useState(false)
  const [openHistoryPay, setOpenHistoryPay] = React.useState(false)
  const [eidNum, setEidNum] = React.useState('')
  const [payoutHistory, setPayoutHistory] = React.useState({})
  const [payHistory, setPayHistory] = useState({})

  const getPayoutData = async () => {
    setPayout(await getPayouts(userInfo))
  }
  const getPayoutHistoryData = async () => {
    setPayoutHistory(await getPayoutsHistory(userInfo, eidNum))
  }
  const getPayHistoryData = async () => {
    setPayHistory(await getPayHistory(userInfo, eidNum))
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

  useEffect(() => {
    getPayoutHistoryData()
    getPayHistoryData()
  }, [eidNum])

  const captureId = (cellValue) => {
    setEidNum(cellValue)
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
  const handlePayOpen = () => setOpenPay(true)
  const handlePayClose = () => setOpenPay(false)
  const handleHistoryClose = () => setHistoryPayout(false)
  const handleHistoryPayClose = () => setOpenHistoryPay(false)
  const handleHistoryOpen = (cellValue, e) => {
    captureId(cellValue)
    setHistoryPayout(true)
  }
  const handleHistoryPayOpen = (cellValue, e) => {
    captureId(cellValue)
    setOpenHistoryPay(true)
  }

  let sr_no = 0
  const columns = [
    { field: 'eid', headerName: 'EID', width: 150 },
    { field: 'company_name', headerName: 'Name', width: 150 },
    { field: 'hire_for', headerName: 'Type', width: 150 },
    { field: 'payout', headerName: 'Total Aamount', width: 150 },
    { field: 'paied', headerName: 'Paid', width: 150 },
    { field: 'to_pay', headerName: 'To Pay', width: 150 },
    {
      field: 'actions',
      width: 300,
      renderCell: (cellValue) => {
        return (
          <div className="">
            <span className="" onClick={(e) => handleDelete(cellValue?.row?.eid, e)}>
              <button className="custom-pay-btn" onClick={handlePayOpen}>
                Pay
              </button>
              <button className="custom-pay-btn" onClick={(e) => handleHistoryOpen(cellValue?.row?.eid, e)}>
                Payout history
              </button>
              <button
                className="custom-pay-btn"
                onClick={(e) => handleHistoryPayOpen(cellValue?.row?.eid, e)}
                id={cellValue?.row?.eid}
              >
                Pay history
              </button>
            </span>
          </div>
        )
      },
    },
  ]

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-30%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  }

  console.log(payHistory)
  return (
    <MainBoard>
      {/* this dialogue box is for pay */}
      <Modal
        open={openPay}
        onClose={handlePayClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-50">
          <h6>Pay</h6>
          <div>
            <CustomText
              label="Pay value in ($)"
              name="pay"
              placeholder="Value in $"
              error={false}
              required={true}
              handleChange={(e) => handleCreate(e)}
            />
          </div>
          <div className="mt-3">
            <CustomText
              label="Description"
              name="description"
              placeholder="Description"
              error={false}
              required={true}
              handleChange={(e) => handleCreate(e)}
            />
          </div>

          <button className="custom-pay-btn my-3" onClick={handlePayClose}>
            Pay
          </button>
        </Box>
      </Modal>
      {/* pay dialogue box ends here */}
      {/* this dialogue box is for pay history */}
      <PayoutHistory
        openHistoryPay={openHistoryPayout}
        handleHistoryClose={handleHistoryClose}
        payoutHistory={payoutHistory}
        style={style}
      />

      {/* pay  dialogue box ends here */}

      {/* this dialogue box is for pay description */}
      <PayHistory
        openPayHistory={openHistoryPay}
        handleHistoryPayClose={handleHistoryPayClose}
        payHistory={payHistory}
        style={style}
      />

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
