import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers, deleteUsers } from 'src/services/UserServices'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
const columns = [
  { field: 'id', headerName: 'id', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'status', headerName: 'Status', width: 40 },
]

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

  console.log(users.data)
  let sr_no = 0
  return (
    <>
      <Container fluid className="background-theme-purple">
        <Container className="pt-3">
          <h6>Users</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchUser(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2">
              Add User<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: 400, width: '100%' }}>
            {users?.data?.data && (
              <DataGrid
                rows={users.data.data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            )}
          </div>
        </Container>
      </Container>
    </>
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
