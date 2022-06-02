/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles,Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteIndividual, getIndividuals } from 'src/services/IndividualService';

const columns = [
  { field: 'eid', headerName: 'id' }
]


const Individual = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [individual, setIndividual] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const getIndividualData = async () => {
    setIndividual(await getIndividuals(userInfo));
  }

  const searchIndividual =async (value) => {
    setSearch(value);
    setPage(1);
    setIndividual(await getIndividuals(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setIndividual(await getIndividuals(userInfo,value,search));
  }

  const handleDelete =async (eid,e) => {
    deleteIndividual(userInfo,eid)
    setIndividual({...individual, data: {...individual.data,data:[...individual.data.data.filter((v,i) => v.eid!=eid)]}});
  }

  useEffect(() => {
    getIndividualData();
  }, []);
  
  
console.log(individual);
  let sr_no = 0;
  
  return (
    <MainBoard>
    <Container fluid className="background-theme-purple">
      <Container className="pt-3">
        <h6>Individuals</h6>
      </Container>
      <Container className="background-white-theme">
        <div className="justify-flex-end">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              searchIndividual(e.target.value)
            }}
          />
          <button className="custom-blue-btn m-2">
            Add Individual<span>{<PersonAddAltIcon />}</span>
          </button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {individual?.data?.data && (
            <DataGrid
              getRowId={(row) => Math.random()}
              rows={individual.data.data}
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
export default Individual;
