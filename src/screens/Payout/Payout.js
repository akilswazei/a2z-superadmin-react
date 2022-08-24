/* eslint-disable prettier/prettier */
//react imports
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
//custom styling
import FormStyles from 'src/helper/FormStyles'
//custom component imports
import MainBoard from 'src/components/include/MainBoard'
import { getPayouts, getPayoutsHistory } from 'src/services/PayoutService'
import PayoutHistory from './PayoutHistory'
import { getPayHistory } from 'src/services/PayoutService'
import PayHistory from './PayHistory'
import Pay from './Pay'

//custom style for data grid
const datagridSx = FormStyles

//main fucntion starts here
const Payout = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [payout, setPayout] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [openPay, setOpenPay] = useState(false)
  const [openHistoryPayout, setHistoryPayout] = useState(false)
  const [openHistoryPay, setOpenHistoryPay] = useState(false)
  const [eidNum, setEidNum] = useState('')
  const [payoutHistory, setPayoutHistory] = useState({})
  const [payHistory, setPayHistory] = useState({})
  const [rerender, setRerender] = useState(false)
  //state ends here

  //fetch function
  const getPayoutData = async () => {
    setPayout(await getPayouts(userInfo))
  }
  //fetch for payout history data
  const getPayoutHistoryData = async () => {
    setPayoutHistory(await getPayoutsHistory(userInfo, eidNum))
  }
  //fetch for pay history data
  const getPayHistoryData = async () => {
    setPayHistory(await getPayHistory(userInfo, eidNum))
  }
  //serch function
  const searchPayout = async (value) => {
    setSearch(value)
    setPage(1)
    setPayout(await getPayouts(userInfo, 1, value))
  }

  //function for change of page with new fetch request
  const changePage = async (e, value) => {
    console.log(value)
    setPage(value)
    setPayout(await getPayouts(userInfo, value, search))
  }

  // const handleDelete = async (eid, e) => {
  // deletePayout(userInfo, eid)
  // setPayout({
  //   ...payout,
  //   data: { ...payout.data, data: [...payout.data.data.filter((v, i) => v.eid != eid)] },
  // })
  // }

  //use effect for re render of fetch fucntion call
  useEffect(() => {
    getPayoutData()
  }, [])

  //use effect for re render of history of payout and pay when eid changes
  useEffect(() => {
    getPayoutHistoryData()
    getPayHistoryData()
  }, [eidNum])

  //function to caputre eid when user clicks on user details
  const captureId = (cellValue) => {
    setEidNum(cellValue)
  }
  //navigation function after submission
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/payout/add')
  }
  //modal open funation for pay modal
  const handlePayOpen = (cellValue, e) => {
    captureId(cellValue)
    setOpenPay(true)
  }
  //close pay modal
  const handlePayClose = () => setOpenPay(false)
  //close history modal of payout
  const handleHistoryClose = () => setHistoryPayout(false)
  //close history pay modal
  const handleHistoryPayClose = () => setOpenHistoryPay(false)
  //open payout history modal
  const handleHistoryOpen = (cellValue, e) => {
    captureId(cellValue)
    setHistoryPayout(true)
  }
  //open modal of history pay
  const handleHistoryPayOpen = (cellValue, e) => {
    captureId(cellValue)
    setOpenHistoryPay(true)
  }

  //column for data grid
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
            <span className="">
              <button className="custom-pay-btn" onClick={(e) => handlePayOpen(cellValue?.row?.eid, e)}>
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

  //custom styling for modal (pay history, payout history and pay)
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

  return (
    <MainBoard>
      {/* this dialogue box is for pay */}

      <Pay
        openPay={openPay}
        handlePayClose={handlePayClose}
        style={style}
        eidNum={eidNum}
        getPayoutData={getPayoutData}
      />
      {/* pay dialogue box ends here */}
      {/* this dialogue box is for pay history */}
      <PayoutHistory
        openHistoryPayout={openHistoryPayout}
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
                getRowId={(row) => Math.random() * 100}
                rows={payout.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[0]}
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
