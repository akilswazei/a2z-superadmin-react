/* eslint-disable prettier/prettier */
import { cilPencil, cilSearch, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CFormInput, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Individual() {
  return (
    <>
      <h5>Individual</h5>
      <div className="flex-column background-white-theme p-2">
          
            <div className="input-group rounded justify-end">
                <CFormInput type="search" placeholder="Search" aria-label="Search" className="search" aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                    <CIcon icon={cilSearch} size="lg" />
                </span>
            </div>
            <Link to="/users-management/roles/individual" className="justify-end">
            <CButton color="danger custon-theme-btn">Add User <CIcon icon={cilUserPlus} size="lg" /></CButton>
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
              <CTableHeaderCell scope="col">Username</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Service Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>   
             <CTableRow>   
                <CTableHeaderCell scope="row">
                    <div className="form-check">
                        <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        />
                    </div>
                </CTableHeaderCell>
                <CTableDataCell>Admin</CTableDataCell>
                <CTableDataCell>Sarah Parker</CTableDataCell>
                <CTableDataCell>sparker@hotmail.com</CTableDataCell>
                <CTableDataCell>Support</CTableDataCell>
                <CTableDataCell><CButton color="success" size="sm">Active</CButton></CTableDataCell>
                <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg' /> </CTableDataCell>
            </CTableRow>   
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default Individual