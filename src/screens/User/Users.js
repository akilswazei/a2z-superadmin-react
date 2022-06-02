import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers, deleteUsers } from 'src/services/UserServices'
import MainBoard from 'src/components/include/MainBoard'
import { Container, createStyles } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
const columns = [
  { field: 'eid', headerName: 'id', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'role', headerName: 'Role', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
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
  { field: 'action', headerName: 'Action', width: 70 },
]

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
export default function User() {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [users, setUsers] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [success, setSuccess] = useState(0)

  const getUserData = async () => {
    setUsers(await getUsers(userInfo))
  }

  const searchUser = async (value) => {
    setSearch(value)
    setPage(1)
    setUsers(await getUsers(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setUsers(await getUsers(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteUsers(userInfo, eid)
    setUsers({ ...users, data: { ...users.data, data: [...users.data.data.filter((v, i) => v.eid != eid)] } })
  }
  //navigating to add page of user
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/user/add')
  }
  useEffect(() => {
    getUserData()
  }, [])

  //   const rows = [
  //     { id: 1, name: 'lannister', role: 'sales', status: 1, email: 'some@gmail.com' },
  //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  //   ]

  console.log(users?.data?.data)
  let sr_no = 0
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6 className="p-0">A2Z Users</h6>
        </Container>
        <Container className="background-white-theme">
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
                getRowId={(row) => Math.random() * 100}
                rows={users.data.data}
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
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     pageSize={5}
    //     rowsPerPageOptions={[5]}
    //     checkboxSelection
    //   />
    // </div>
  )
}
