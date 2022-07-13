/* eslint-disable prettier/prettier */
//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//material UI imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom styling imports
import FormStyles from 'src/helper/FormStyles'
//custom component imports
import MainBoard from 'src/components/include/MainBoard'
import { getRoles } from 'src/services/RolesServices'
import { deleteRole } from 'src/services/RoleService'

//styling for data grid
const datagridSx = FormStyles

//main function starts here
const Roles = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [roles, setRoles] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch function
  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  //search function
  const searchRoles = async (value) => {
    setSearch(value)
    setPage(1)
    setRoles(await getRoles(userInfo, 1, value))
  }

  //chnage page function
  const changePage = async (e, value) => {
    setPage(value)
    setRoles(await getRoles(userInfo, value, search))
  }

  //delete function
  const handleDelete = async (eid, e) => {
    deleteRole(userInfo, eid)
    setRoles({
      ...roles,
      data: { ...roles.data, data: [...roles.data.data.filter((v, i) => v.eid != eid)] },
    })
  }

  //re render function for fetch function
  useEffect(() => {
    getRolesData()
  }, [])

  console.log(roles)

  //columns for data grid
  const columns = [
    { field: 'name', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      width: 100,
      renderCell: (cellValue) => {
        return (
          <div className="edit-delete-div">
            <span className="pencil-icon" onClick={(e) => navigate('/role/edit/' + cellValue?.row?.eid)}>
              <EditIcon />
            </span>
            <span className="delete-icon" onClick={(e) => handleDelete(cellValue?.row?.eid, e)}>
              <DeleteIcon />
            </span>
          </div>
        )
      },
    },
  ]

  //navigation function
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/role/add')
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Roles</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchRoles(e.target.value)
              }}
            />
            <button onClick={navigateFunction} className="custom-blue-btn m-2">
              Add Role<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {roles?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={roles.data}
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
              count={roles?.data?.links ? roles.data.links.length - 2 : 1}
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
export default Roles
