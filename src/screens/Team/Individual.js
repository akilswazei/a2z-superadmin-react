/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPagination, CPaginationItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteIndividual, getIndividual } from 'src/services/IndividualService';



const Individual = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [individual, setIndividual] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const getIndividualData = async () => {
    setIndividual(await getIndividual(userInfo));
  }

  const searchIndividual =async (value) => {
    setSearch(value);
    setPage(1);
    setIndividual(await getIndividual(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setIndividual(await getIndividual(userInfo,value,search));
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
    <>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
            searchIndividual(e.target.value)
        }}
      />
      <Link to="/outsource/teams/add-team"><CButton color="danger">Add Individual<CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Service Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {
            individual ?. data ?. data ?.map((ind, key) => {
              return (
                <CTableRow key={key}>
                  <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                  <CTableDataCell>{ind.name}</CTableDataCell>
                  <CTableDataCell>{ind.email}</CTableDataCell>
                  <CTableDataCell>{ind.hire_for}</CTableDataCell>
                  <CTableDataCell><CButton color="success" size="sm">Active</CButton></CTableDataCell>
                  <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg' onClick={(e) => handleDelete(ind.eid, e)}/> </CTableDataCell>
                </CTableRow>
              ) ;
            })
          }
        </CTableBody>
      </CTable>
      <CPagination align="end" aria-label="Paginationa">
        {
            individual ?. data ?. links ?.map((team, key) => {
            if(key=='0'){
                return (<CPaginationItem >Previous</CPaginationItem>)
            }  else if(key===individual.data.links.length-1){
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
export default Individual;
