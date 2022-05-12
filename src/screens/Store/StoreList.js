/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPaginationItem, CPagination } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getStores } from 'src/redux/actions/StoreActions';


const StoreList = () => {
 
  const dispatch = useDispatch();
  
  const allStores = useSelector(state => state.allStores);
  const {loading, stores, error} = allStores;

  console.log(stores, 'Store data')

  let sr_no = 0;
  const merchant_id = "211019041655";
  useEffect(() => {
    dispatch(getStores(merchant_id));
  }, [dispatch, merchant_id]);
  return (
    <>
      <Link to="/store-management/stores/add-store"><CButton color="danger">Add Store <CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Store Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">No. Of devices</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {            
          loading ? "Loading" : error ? "Error" : (
              stores ?. data ?. data ?.map((store, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                    <CTableDataCell>{store.store_name}</CTableDataCell>
                    <CTableDataCell>{store.company_email}</CTableDataCell>
                    <CTableDataCell>{store.store_contact}</CTableDataCell>
                    <CTableDataCell>{store.store_email}</CTableDataCell>
                    <CTableDataCell>{store.store_email}</CTableDataCell>
                    <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg' /> </CTableDataCell>
                  </CTableRow>
                ) ;
              })
            )
          }
        </CTableBody>
      </CTable>
      <CPagination align="end" aria-label="Paginationa">
        <CPaginationItem disabled>Previous</CPaginationItem>
        <CPaginationItem>1</CPaginationItem>
        <CPaginationItem>2</CPaginationItem>
        <CPaginationItem>3</CPaginationItem>
        <CPaginationItem>Next</CPaginationItem>
      </CPagination>
    </>
  )
}
export default StoreList;
