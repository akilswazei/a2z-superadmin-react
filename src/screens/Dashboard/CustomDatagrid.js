/* eslint-disable react/prop-types */
import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import FormStyles from 'src/helper/FormStyles'
import { getUsers, deleteUsers } from 'src/services/UserServices'
import { useDispatch, useSelector } from 'react-redux'

const datagridSx = FormStyles
function CustomDatagrid() {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState
  const [users, setUsers] = useState({})
  const getUserData = async () => {
    setUsers(await getUsers(userInfo))
  }
  useEffect(() => {
    getUserData()
  }, [])
  console.log(users)
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
  ]
  return (
    <>
      <div style={{ height: '50vh', width: '100%' }} className="py-2">
        {users?.data?.data && (
          <DataGrid
            className="customTable"
            getRowId={(row) => Math.random() * 100}
            rows={users.data.data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[0]}
            sx={datagridSx}
          />
        )}
      </div>
    </>
  )
}

export default CustomDatagrid
