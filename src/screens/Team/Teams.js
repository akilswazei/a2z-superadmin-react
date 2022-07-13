//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//material Ui imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom style imports
import FormStyles from 'src/helper/FormStyles'
//custom components imports
import { getTeams, deleteTeam } from 'src/services/TeamServices'
import MainBoard from 'src/components/include/MainBoard'

//columns for data grid
const columns = [
  { field: 'eid', headerName: 'ID' },
  { field: 'company_name', headerName: 'company name', width: 200 },
  { field: 'company_address', headerName: 'address', width: 300 },
  { field: 'company_mobile', headerName: 'mobile', width: 250 },
  { field: 'hire_for', headerName: 'for', width: 150 },
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
    width: 250,
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

//styling for data grid
const datagridSx = FormStyles

//main function
const Teams = () => {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //state
  const [teams, setTeams] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch
  const getTeamData = async () => {
    setTeams(await getTeams(userInfo))
  }

  const searchTeam = async (value) => {
    setSearch(value)
    setPage(1)
    setTeams(await getTeams(userInfo, 1, value))
  }

  const changePage = async (e, value) => {
    setPage(value)
    setTeams(await getTeams(userInfo, value, search))
  }
  //events starts here
  const handleDelete = async (eid, e) => {
    deleteTeam(userInfo, eid)
    setTeams({ ...teams, data: { ...teams.data, data: [...teams.data.data.filter((v, i) => v.eid != eid)] } })
  }

  //re-rendrer
  useEffect(() => {
    getTeamData()
  }, [])

  console.log(teams)

  //navigating to add page of user
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/team/add')
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Agency</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchTeam(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Teams<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <hr></hr>
          <div style={{ height: '75vh', width: '100%' }}>
            {teams?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={teams.data.data}
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
              count={teams?.data?.links ? teams.data.links.length - 2 : 1}
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
export default Teams
