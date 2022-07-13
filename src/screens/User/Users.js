import * as React from 'react'
//react imports
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//navigation
import { useNavigate } from 'react-router-dom'
//material UI Imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom styling form
import FormStyles from 'src/helper/FormStyles'
//custom imports
import { getUsers, deleteUsers } from 'src/services/UserServices'
import MainBoard from 'src/components/include/MainBoard'
//imports ends here

//colums for tables starts here
const columns = [
  { field: 'eid', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'role', headerName: 'Role', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  {
    field: 'status',
    renderCell: (cellValues) => {
      return (
        <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
          {cellValues?.row?.status == 1 ? 'Inactive' : 'Active'}
        </button>
      )
    },
  },
  {
    field: 'action',
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
//colums for tables ends here

//custom table styling variable
const datagridSx = FormStyles

//main function starts here
export default function User() {
  //navigate function
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [users, setUsers] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetching data here
  const getUserData = async () => {
    setUsers(await getUsers(userInfo))
  }

  //search function
  const searchUser = async (value) => {
    setSearch(value)
    setPage(1)
    setUsers(await getUsers(userInfo, 1, value))
  }

  //change page function
  const changePage = async (e, value) => {
    setPage(value)
    setUsers(await getUsers(userInfo, value, search))
  }

  //delete function
  const handleDelete = async (eid, e) => {
    deleteUsers(userInfo, eid)
    setUsers({ ...users, data: { ...users.data, data: [...users.data.data.filter((v, i) => v.eid != eid)] } })
  }
  //navigating to add page of user
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/user/add')
  }

  //use effect to reload the fetch function
  useEffect(() => {
    getUserData()
  }, [])
  console.log(users)

  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6 className="p-0">A2Z Users</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchUser(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add User<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <hr></hr>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {users?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random() * 100}
                rows={users.data.data}
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
              count={users?.data?.links ? users.data.links.length - 2 : 1}
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
