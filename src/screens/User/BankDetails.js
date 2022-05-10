/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro';
import React, { useState } from 'react'
import UserSteps from 'src/components/UserSteps'

function BankDetails() {

    const [accHolderName, setAccHolderName] = useState();
    const [accNumber, setAccountNumber] = useState();
    const [bankName, setBankName] = useState();
    const [bankIndetityCode, setBankIndetityCode] = useState();
    const [branch, setBranch] = useState();
    const [department, setDepartment] = useState();
    const [designation, setDesignation] = useState();

    const submitHandler = () => {
        alert("Hello");
    } 
  return (
      <>
        <div>
           <h5>Add new user</h5>
           <UserSteps step1 step2 step3></UserSteps>
           <CForm onSubmit={submitHandler}>
            <CRow>
                <CCol md={6}>
                    <CFormLabel htmlFor="accHolderName" className="col-form-label">Account Holder’s Name</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter Account Holder’s Name" aria-label="accHolderName"  name="accHolderName" id="accHolderName" onChange={(e) => setAccHolderName(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="accNumber" className="col-form-label">Account Number</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Account Number" aria-label="accNumber"  name="accNumber" id="accNumber" onChange={(e) => setAccountNumber(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="bankName" className="col-form-label">Bank Name</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Bank Name" aria-label="bankName"  name="bankName" id="bankName" onChange={(e) => setBankName(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="bankIndetityCode" className="col-form-label">Bank Identifier Code</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Bank Identifier Code" aria-label="bankIndetityCode"  name="bankIndetityCode" id="bankIndetityCode" onChange={(e) => setBankIndetityCode(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="branch" className="col-form-label">Branch, Tax Payer  ID</CFormLabel>
                    <CFormSelect
                      aria-label="branch"
                      options={[
                          'Please select',
                          { label: 'branch 1', value: '1' },
                          { label: 'branch 2', value: '2' },
                      ]}
                      onChange={(value) => setBranch(value)}
                  />
                </CCol>
            </CRow>
            <CRow className='mt-5'> 
                <h5>HRMS Informations:</h5>
                <CCol md={6}>
                    <CFormLabel htmlFor="department" className="col-form-label">Branch, Tax Payer  ID</CFormLabel>
                    <CFormSelect
                      aria-label="department"
                      options={[
                          'Please select Department',
                          { label: 'branch 1', value: '1' },
                          { label: 'branch 2', value: '2' },
                      ]}
                      onChange={(value) => setDepartment(value)}
                  />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="designation" className="col-form-label">Designation</CFormLabel>
                        <CFormSelect
                        aria-label="designation"
                        options={[
                            'Please select Designation',
                            { label: 'designation 1', value: '1' },
                            { label: 'designation 2', value: '2' },
                        ]}
                        onChange={(value) => setDesignation(value)}
                        />
                </CCol>
            </CRow>
            <CRow className='mt-4'>
                <CCol md={6}>
                    <CButton type="cancel" color="danger" variant="outline">Cancel</CButton>
                </CCol>
                <CCol md={6}>
                    <CButton type="submit" color="danger" >Add</CButton>
                </CCol>
            </CRow>            
            </CForm>
        </div>
           
      </>
    
  )
}

export default BankDetails