/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteTeam, getTeams } from 'src/redux/actions/TeamActions';

const Teams = () => {
 
  const dispatch = useDispatch();
  
  const allTeams = useSelector(state => state.allTeams);
  const {loading, teams, error} = allTeams;

  console.log(teams, 'Teams data')

  let sr_no = 0;

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);
  
  return (
    <>
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
            loading ? "Loading" : error ? "Error" : (
              
              teams ?. data ?. data ?.map((team, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                    <CTableDataCell>{team.company_name}</CTableDataCell>
                    <CTableDataCell>{team.company_email}</CTableDataCell>
                    <CTableDataCell>{team.company_mobile}</CTableDataCell>
                    <CTableDataCell>{team.company_address}</CTableDataCell>
                    <CTableDataCell><CButton color="success" size="sm">Active</CButton></CTableDataCell>
                    <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg' onClick={() => dispatch(deleteTeam()) }/> </CTableDataCell>
                  </CTableRow>
                ) ;
              })
            )
          }
        </CTableBody>
      </CTable>
    </>
  )
}
export default Teams;
