/* eslint-disable prettier/prettier */
//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom style imports
import FormStyles from 'src/helper/FormStyles'
//custom components imports
import MainBoard from 'src/components/include/MainBoard'
import { deleteStore, getStores } from 'src/services/StoreService'
import { useNavigate } from 'react-router-dom'

//columns for data grid
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
//style for data grid
const datagridSx = FormStyles
//main function starts here
const Store = () => {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [stores, setStore] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch
  const getStoreData = async () => {
    setStore(await getStores(userInfo))
  }

  //search
  const searchStore = async (value) => {
    setSearch(value)
    setPage(1)
    setStore(await getStores(userInfo, 1, value))
  }
  //page change
  const changePage = async (value) => {
    setPage(value)
    setStore(await getStores(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteStore(userInfo, eid)
    setStore({ ...Store, data: { ...Store.data, data: [...Store.data.data.filter((v, i) => v.eid != eid)] } })
  }

  //rendering
  useEffect(() => {
    getStoreData()
  }, [])

  //navigate
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
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={stores.data.data}
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
              count={stores?.data?.links ? stores.data.links.length - 2 : 1}
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
export default Store
