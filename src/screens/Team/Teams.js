import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeams, deleteTeam } from 'src/services/TeamServices';
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles,Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'eid', headerName: 'id' }
]



const Teams = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [teams, setTeams] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const getTeamData = async () => {
    setTeams(await getTeams(userInfo));
  }

  const searchTeam =async (value) => {
    setSearch(value);
    setPage(1);
    setTeams(await getTeams(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setTeams(await getTeams(userInfo,value,search));
  }

  const handleDelete =async (eid,e) => {
    deleteTeam(userInfo,eid)
    setTeams({...teams, data: {...teams.data,data:[...teams.data.data.filter((v,i) => v.eid!=eid)]}});
  }

  useEffect(() => {
    getTeamData();
  }, []);
  
  
console.log(teams);
  let sr_no = 0;
  
  return (
    <MainBoard>
    <Container fluid className="background-theme-purple">
      <Container className="pt-3">
        <h6>Teams</h6>
      </Container>
      <Container className="background-white-theme">
        <div className="justify-flex-end">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              searchTeam(e.target.value)
            }}
          />
          <button className="custom-blue-btn m-2">
            Add User<span>{<PersonAddAltIcon />}</span>
          </button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {teams?.data?.data && (
            <DataGrid
              getRowId={(row) => Math.random()}
              rows={teams.data.data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          )}
          <Pagination count={11} defaultPage={6}  />
        </div>
        
      </Container>
    </Container>
  </MainBoard>


    )
}
export default Teams;
