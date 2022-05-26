/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPagination, CPaginationItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getTeams } from 'src/services/TeamServices';


const Teams = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState([]);
 

  const getTeamData = async () => {
    setTeams(await getTeams(userInfo));
  }

  const searchTeam = async (value) => {
    setSearch(value);
    setPage(1);
    setTeams(await getTeams(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setTeams(await getTeams(userInfo,value,search));
  }
  
  useEffect(() => {
    getTeamData();
  }, []);
  
console.log(teams);
  let sr_no = 0;
  
  return (
    <>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          searchTeam(e.target.value)
        }}
      />
      <Link to="/outsource/teams/add-team"><CButton color="danger">Add Team <CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Adresss</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {
            teams ?. data ?. data ?.map((team, key) => {
              return (
                <CTableRow key={key}>
                  <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                  <CTableDataCell>{team.company_name}</CTableDataCell>
                  <CTableDataCell>{team.company_email}</CTableDataCell>
                  <CTableDataCell>{team.company_mobile}</CTableDataCell>
                  <CTableDataCell>{team.company_address}</CTableDataCell>
                  <CTableDataCell><CButton color="success" size="sm">Active</CButton></CTableDataCell>
                  <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg'/> </CTableDataCell>
                </CTableRow>
              ) ;
            })
          }
        </CTableBody>
      </CTable>
      <CPagination align="end" aria-label="Paginationa">
        {
          teams ?. data ?. links ?.map((user, key) => {
            if(key==='0'){
                return (<CPaginationItem >Previous</CPaginationItem>)
            }  else if(key===teams.data.links.length-1){
                return (<CPaginationItem >Next</CPaginationItem>)
            } else{
                return (<CPaginationItem onClick={(e)=>{ changePage(key) }}>{key}</CPaginationItem>)
            }

          })
        }
      </CPagination>
    </>
  )
}
export default Teams;
