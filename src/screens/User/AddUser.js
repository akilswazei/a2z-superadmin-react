/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from 'src/redux/actions/UserActions';
import UserSteps from 'src/components/UserSteps';

function AddUser() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [userame, setUsername] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }  
    setValidated(true);
    if(form.checkValidity() === true) {
        const userData = {
            name: name,
            email: email,
            phone: phone,
            userame: userame,
            role: role,
            password: password,
            confirmPassword: confirmPassword
         }
         dispatch(addUser(userData));
         navigate("/users-management/users/add-user/more-information");
    }
   
  }

  return (
    <> 
        <div>
        <h5>Add new user</h5>
        <UserSteps step1 ></UserSteps>
        <CForm onSubmit={submitHandler} noValidate validated={validated}>
        <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                <CFormInput placeholder="Please enter your name" aria-label="Name" name="name" id="name"  onChange={(e) => setName(e.target.value)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                <CFormInput type="email" placeholder="Please enter your email" aria-label="Eamil"  name="email" id="email" onChange={(e) => setEmail(e.target.value)} valid required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="phone" className="col-form-label">Phone Number</CFormLabel>
                <CFormInput placeholder="Please enter your name" aria-label="Phone Number" name="phone" id="phone" onChange={(e) => setPhone(e.target.value) } required/>
            </CCol>
        </CRow>
        <h5 className='mt-5'>Login Role</h5>
        <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="username" className="col-form-label">Username</CFormLabel>
                <CFormInput placeholder="Please enter your username" aria-label="Username"  name="username" id="username" onChange={(e) => setUsername(e.target.value) } required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="role" className="col-form-label">Role</CFormLabel>
                <CFormInput placeholder="Please enter your role" aria-label="Role" name="role" id="role" onChange={(e) => setRole(e.target.value) } required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="password" className="col-form-label">Password</CFormLabel>
                <CFormInput type="password" placeholder="Please enter your Pasword" aria-label="First name" name="password" id="password" onChange={(e) => setPassword(e.target.value) } required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="confirmPassword" className="col-form-label">Confirm Password</CFormLabel>
                <CFormInput type="password" placeholder="Please enter your confirm Passsword" aria-label="Confirm Password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value) } required/>
            </CCol>
        </CRow>
        <CRow className='mt-4'>
            <CCol md={6} >
                <CButton type="cancel" color="danger" variant="outline" placement="right">Cancel</CButton>
            </CCol>
            <CCol md={6} className='text-left'>
             <CButton type="submit" color="danger" >Next</CButton>
            </CCol>
        </CRow>
        </CForm>
        </div>
    </>
  )
}

export default AddUser