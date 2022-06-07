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
import { deleteStore, getStores } from 'src/services/StoreService'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
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
}
const columns = [
  { field: 'eid', headerName: 'Store ID', width: 150 },
  { field: 'store_name', headerName: 'Name', width: 300 },
  { field: 'store_address_1', headerName: 'Address', width: 300 },
  { field: 'store_email', headerName: 'E-mail', width: 200 },
  { field: 'store_contact', headerName: 'Phone', width: 200 },
  {
    field: 'action',
    width: 100,
    renderCell: (cellValue) => {
      return (
        <div className="edit-delete-div">
          <span className="pencil-icon">
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

const Store = () => {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [stores, setStore] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getStoreData = async () => {
    setStore(await getStores(userInfo))
  }

  const searchStore = async (value) => {
    setSearch(value)
    setPage(1)
    setStore(await getStores(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setStore(await getStores(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteStore(userInfo, eid)
    setStore({ ...Store, data: { ...Store.data, data: [...Store.data.data.filter((v, i) => v.eid != eid)] } })
  }

  useEffect(() => {
    getStoreData()
  }, [])

  let sr_no = 0
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/store/add')
  }
  console.log(stores)
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Stores</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchStore(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Store<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }}>
            {stores?.data?.data && (
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={stores.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
            {/* <Pagination count={11} defaultPage={6}  /> */}
          </div>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Store
