/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "src/redux/actions/UserActions";
import { getRoles } from "src/redux/actions/UserRoles";

function AddTeam() {
  const [companyName, setCompanyName] = useState();
  const [companyEmail, setcompanyEmail] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyMobile, setCompanyMobile] = useState();
  const [hireFor, setHireFor] = useState();
  const [isIndividual, setIsIndividual] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
        company_name: companyName,
        company_email: companyEmail,
        company_address:companyAddress,
        company_mobile: companyMobile,
        hire_for:hireFor,
        is_individual: isIndividual,
        name: name,
        email: email,
        password: password,
        status: status
    } 
    dispatch(addUser(userData));
}

useEffect(()=>{
    dispatch(getRoles());
}, [dispatch])

  return (
    <> 
        <h5>Add new user</h5>
        <CForm onSubmit={submitHandler} >
        <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="companyName" className="col-form-label">Company Name</CFormLabel>
                <CFormInput placeholder="Please enter your name" aria-label="companyName" name="company_name" id="company_name" onChange={(e) => setCompanyName(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="companyEmail" className="col-sm-2 col-form-label">Email</CFormLabel>
                <CFormInput type="email" placeholder="Please enter your email" aria-label="companyEmail"  name="company_email" id="company_email" onChange={(e) => setcompanyEmail(e.target.value)} valid required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="companyAddress" className="col-form-label">Address</CFormLabel>
                <CFormTextarea  label="Company Address" placeholder="Company Address" name="company_address" id="company_address" required onChange={(e) => setCompanyAddress(e.target.value)}>
                </CFormTextarea>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="companyMobile" className="col-sm-2 col-form-label">Phone</CFormLabel>
                <CFormInput placeholder="Please mobile" aria-label="hireFor" name="company_mobile" id="company_mobile" onChange={(e) => setCompanyMobile(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="hireFor" className="col-sm-2 col-form-label">Hire For</CFormLabel>
                <CFormInput placeholder="Please hire for" aria-label="hireFor" name="hire_for" id="hire_for" onChange={(e) => setHireFor(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                    <CFormLabel htmlFor="isIndividual" className="col-form-label">Type</CFormLabel>
                    <CFormSelect
                      aria-label="Is Individual"
                      options={[
                          'Choose Type',
                          { label: 'Individual', value: '0' },
                          { label: 'Multi', value: '1' },
                      ]}
                      onChange={(e) => setIsIndividual(e.target.value)}
                  />
            </CCol>
        </CRow>
        <CRow>
            <h4 className="mt-5">Team Admin User</h4>
            <CCol md={6}>
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                <CFormInput placeholder="Please enter your name" aria-label="name" name="name" id="name" onChange={(e) => setName(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                <CFormInput placeholder="Please enter your email" aria-label="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="password" className="col-form-label">Password</CFormLabel>
                <CFormInput type="password" placeholder="Please enter your Pasword" aria-label="First name" name="password" id="password" onChange={(e) => setPassword(e.target.value) } required/>
            </CCol>
            <CCol md={6}>
                    <CFormLabel htmlFor="status" className="col-form-label">Status</CFormLabel>
                    <CFormSelect
                      aria-label="Status"
                      options={[
                          'Select Status',
                          { label: 'Active', value: '1' },
                          { label: 'Inactive', value: '0' },
                      ]}
                      onChange={(e) => setStatus(e.target.value)}
                  />
            </CCol>
        </CRow>
        <CRow className='mt-4'>
            <CCol md={6} >
                <CButton type="reset" color="danger" variant="outline" placement="right">Cancel</CButton>
            </CCol>
            <CCol md={6} className='text-left'>
                <CButton type="submit" color="danger" >Submit</CButton>
            </CCol>
        </CRow>
        </CForm>
    </>
  )
}
export default AddTeam