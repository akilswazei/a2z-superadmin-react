import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeams, deleteTeam } from 'src/services/TeamServices'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
const columns = [
  { field: 'eid', headerName: 'id' },
  { field: 'company_name', headerName: 'company_name', width: 150 },
  // { field: 'compnay_email', headerName: 'company_email', width: 180 },
  { field: 'company_address', headerName: 'company_address', width: 200 },
  { field: 'company_mobile', headerName: 'company_mobile', width: 150 },
  { field: 'hire_for', headerName: 'hire_for', width: 100 },
]

const datagridSx = {
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    '& .MuiDataGrid-row': {
      '&:nth-of-type(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255,255,255)',
    fontSize: '1.1em',
    textTransform: 'capitalize',
    color: 'gray',
  },
  '& .MuiDataGrid-row': {
    fontSize: '0.9em',
    fontWeight: '600',
  },
}

const Teams = () => {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [teams, setTeams] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getTeamData = async () => {
    setTeams(await getTeams(userInfo))
  }

  const searchTeam = async (value) => {
    setSearch(value)
    setPage(1)
    setTeams(await getTeams(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setTeams(await getTeams(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteTeam(userInfo, eid)
    setTeams({ ...teams, data: { ...teams.data, data: [...teams.data.data.filter((v, i) => v.eid != eid)] } })
  }

  useEffect(() => {
    getTeamData()
  }, [])

  console.log(teams)
  let sr_no = 0
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
          <h6>Teams</h6>
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
                getRowId={(row) => Math.random()}
                rows={teams.data.data}
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
export default Teams
