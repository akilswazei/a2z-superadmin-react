/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPagination, CPaginationItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import axios from 'axios'
import { deleteMerchant, getMerchants } from 'src/services/MerchantService';
const Merchants = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [merchants, setMerchants] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
 

  const getMerchantData = async () => {
     setMerchants(await getMerchants(userInfo));
  }

  const searchUser =async (value) => {
    setSearch(value);
    setPage(1);
    setMerchants(await getMerchants(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setMerchants(await getMerchants(userInfo,value,search));
  }

  const handleDelete =async (eid,e) => {
    deleteMerchant(userInfo,eid)
    setMerchants({...merchants, data: {...merchants.data,data:[...merchants.data.data.filter((v,i) => v.eid!=eid)]}});
  }

  
  useEffect(() => {
    getMerchantData();
  }, []);
  
console.log(merchants);
  let sr_no = 0;

  return (
    <>
    <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          searchUser(e.target.value)
        }}
      />
      <Link to="/users-management/users/add-user"><CButton color="danger">Add User <CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Business Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Merchant ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Onboard Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
        {
             merchants ?. data ?. data ?.map((merchant, key) => {
              return (
                <CTableRow key={key}>
                  <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                  <CTableDataCell>{merchant.company_name}</CTableDataCell>
                  <CTableDataCell>{merchant.business_contact_email}</CTableDataCell>
                  <CTableDataCell>{merchant.merchant_id}</CTableDataCell>
                  <CTableDataCell>{merchant.onbording_date}</CTableDataCell>
                  <CTableDataCell>{merchant.status === 1 ? "Approved" : "Declined"}</CTableDataCell>
                  <CTableDataCell onClick={(e) => handleDelete(merchant.eid, e)}>Delete</CTableDataCell>
                </CTableRow>
              ) ;
            })
          }
        </CTableBody>
      </CTable>
      <CPagination align="end" aria-label="Paginationa">
        {
           merchants ?. data ?. links ?.map((user, key) => {
            if(key=='0'){
                return (<CPaginationItem >Previous</CPaginationItem>)
            }  else if(key===merchants.data.links.length-1){
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
export default Merchants;
