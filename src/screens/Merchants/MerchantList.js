/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus, cilLowVision} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CProgress } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getMerchants } from 'src/redux/actions/MerchantActions';

const MerchantList = () => {
 
const dispatch = useDispatch();

const allMerchants = useSelector(state => state.allMerchants);
const {loading, merchants, error} = allMerchants;

useEffect(() => {
    dispatch(getMerchants());
}, [dispatch]);
  
  return (
    <>
      <Link to="/merchant-management/merchants/add-merchant"><CButton color="danger">Add Merchant<CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
                <CTableHeaderCell>Business Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Merchant Id</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Onboard Status</CTableHeaderCell>
                <CTableHeaderCell>Onboarding Date</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        { merchants ?. data ?. data.map((merchant, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{merchant.business_contact_name }</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{merchant.business_contact_email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{merchant.merchant_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                          <div>
                            <strong>{40}%</strong>
                          </div>
                        <CProgress thin color="orange" value={40} />
                      </CTableDataCell>
                      <CTableDataCell >
                        <div>{ merchant.onbording_date }</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color={"success"} size="sm">Active</CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon icon={cilLowVision} size='lg'/> 
                        <CIcon icon={cilPencil}  size='lg'/> 
                        <CIcon icon={cilTrash} size='lg'/>
                      </CTableDataCell>
                    </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </>
  )
}
export default MerchantList;
