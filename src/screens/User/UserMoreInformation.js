/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserSteps from 'src/components/UserSteps'

function UserMoreInformation() {

    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [maritialStatus, setMaritialStatus] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [guardianName, setGuardianName] = useState();
    const [currentAddress, setCurrentAddress] = useState();
    const [permanentAddress, setPermanentAddress] = useState();

    const navigate = useNavigate();

    const submitHandler = () => {
        alert("Hello");
        navigate("/users-management/users/add-user/more-information/bank-details");
    } 
  return (
      <>
        <div>
           <h5>Add new user</h5>
           <h5>More Information</h5>
           <UserSteps step1 step2></UserSteps>
           <CForm onSubmit={submitHandler}>
            <CRow>
                <CCol md={6}>
                    <CFormLabel htmlFor="dob" className="col-sm-2 col-form-label">Name</CFormLabel>
                    <CDatePicker locale="en-US" placeholder="Please enter your Date of Birth" aria-label="dob"  name="dob" id="dob" onChange={(e) => setDob(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="gneder" className="col-sm-2 col-form-label">Email</CFormLabel>
                    <CFormSelect
                      
                        aria-label="gneder"
                        options={[
                            'Please enter your Gender',
                            { label: 'Male', value: '1' },
                            { label: 'Female', value: '2' },
                        ]}
                        onChange={(value) => setGender(value)}

                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="maritialStatus" className="col-form-label">Phone Number</CFormLabel>
                    <CFormSelect
                        aria-label="maritialStatus"
                        options={[
                            'Please enter your Martial Status',
                            { label: 'Married', value: '1' },
                            { label: 'Unmarried', value: '2' },
                        ]}
                        onChange={(value) => setMaritialStatus(value)}
                    />
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="phonenumber" className="col-form-label">Phone Number</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Phone number" aria-label="phonenumber"  name="phonenumber" id="phonenumber" onChange={(e) => setPhoneNumber(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="guardianName" className="col-form-label">Phone Number</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Guardian Name" aria-label="guardianName"  name="guardianName" id="guardianName" onChange={(e) => setGuardianName(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="currentAddress" className="col-form-label">Current Number</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Current Address" aria-label="currentAddress"  name="currentAddress" id="currentAddress" onChange={(e) => setCurrentAddress(e.target.value)}/>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="permanentAddress" className="col-form-label">Permannent Address</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Permanent Address" aria-label="permanentAddress"  name="permanentAddress" id="permanentAddress" onChange={(e) => setPermanentAddress(e.target.value)}/>
                </CCol>
               
            </CRow>
            <CRow className='mt-4'>
                <CCol md={6}>
                    <CButton type="cancel" color="danger" variant="outline">Cancel</CButton>
                </CCol>
                <CCol md={6}>
                    <CButton type="submit" color="danger" >Next</CButton>
                </CCol>
            </CRow>            
            </CForm>
        </div>
           
      </>
    
  )
}

export default UserMoreInformation