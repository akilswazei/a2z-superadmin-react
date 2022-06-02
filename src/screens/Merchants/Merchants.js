/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteMerchant, getMerchants } from 'src/services/MerchantService'
import { useNavigate } from 'react-router-dom'

const datagridSx = {
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    '& .MuiDataGrid-row': {
      '&:nth-of-type(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255,255,255)',
    color: 'rgba(0,0,0)',
    fontSize: '1.1em',
  },
  '& .MuiDataGrid-row': {
    fontSize: '0.9em',
    fontWeight: '600',
  },
}
const Merchant = () => {
  const columns = [
    { field: 'eid', headerName: 'Id' },
    { field: 'business_contact_name', headerName: 'name', width: 130 },
    {
      field: 'Delete',
      headerName: 'Action',
      width: 150,
      renderCell: (cellValues) => {
        console.log(cellValues)
        return (
          <button
            eid={cellValues.row.eid}
            onClick={(event) => {
              handleDelete(cellValues.row.eid, event)
            }}
          >
            Delete
          </button>
        )
      },
    },
  ]
  const getrows = () => {
    let rows = []
    var i = 0
    merchants?.data?.data.map((item, key) => {
      rows[i++] = {
        eid: item.eid,
        business_contact_name: item.business_contact_name,
      }
    })
    return rows
  }
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [merchants, setMerchant] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getMerchantData = async () => {
    setMerchant(await getMerchants(userInfo))
  }

  const searchMerchant = async (value) => {
    setSearch(value)
    setPage(1)
    setMerchant(await getMerchants(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setMerchant(await getMerchants(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteMerchant(userInfo, eid)
    setMerchant({
      ...Merchant,
      data: { ...Merchant.data, data: [...Merchant.data.data.filter((v, i) => v.eid != eid)] },
    })
  }

  useEffect(() => {
    getMerchantData()
  }, [])

  //navigating to add page of merchant
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/merchant/add')
  }
  console.log(Merchant)
  let sr_no = 0

  return (
    <MainBoard>
      <Container fluid className="background-theme-purple">
        <Container className="pt-3">
          <h6>Merchants</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchMerchant(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Merchant<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {merchants?.data?.data && (
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={getrows()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
            {/* <Pagination count={11} defaultPage={6} /> */}
          </div>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Merchant
