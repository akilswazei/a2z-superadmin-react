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
import { getPayoutsHistory } from 'src/services/PayoutService'
import FormStyles from 'src/helper/FormStyles'

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

  const getPayoutData = async () => {
    setPayout(await getPayoutsHistory(userInfo))
  }

  const searchPayout = async (value) => {
    setSearch(value)
    setPage(1)
    setPayout(await getPayoutsHistory(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setPayout(await getPayoutsHistory(userInfo, value, search))
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
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
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
  ]

  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/payout/add')
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Payout History</h6>
        </Container>
        <Container className="background-white-theme">
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
