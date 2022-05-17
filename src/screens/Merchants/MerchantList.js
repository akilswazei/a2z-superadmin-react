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
      <div className="flex-column background-white-theme p-2">
      <Link to="/merchant-management/merchants/add-merchant" className="justify-end">
        <CButton color="danger custon-theme-btn">Add Merchant<CIcon icon={cilUserPlus}  size='lg'/></CButton>
      </Link>
      <hr></hr>
      <CTable className="custom-table">
        <CTableHead>
          <CTableRow className="custom-table-row">
              <CTableHeaderCell scope="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
              </CTableHeaderCell>
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
                      <CTableHeaderCell scope="col">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                          </div>
                      </CTableHeaderCell>
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
                        <CIcon className="icon-color-blue" icon={cilPencil}  size='lg'/> {' '} 
                        <CIcon className="icon-color-red" icon={cilTrash} size='lg'/>
                      </CTableDataCell>
                    </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      </div>
    </>
  )
}
export default MerchantList;
