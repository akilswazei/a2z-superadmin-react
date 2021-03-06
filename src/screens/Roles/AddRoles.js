/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from 'src/redux/actions/UserActions';


function AddRoles() {

  const [role, setRole] = useState();
  const [generalAdd, setGeneralAdd] = useState('secondary');
  const [generalView, setGeneralView] = useState('secondary');
  const [generalEdit, setGeneralEdit] = useState('secondary');
  const [generalDelete, setGeneralDelete] = useState('secondary');
  const [salesAdd, setSalesAdd] = useState('secondary');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  

 
  const submitHandler = () => {
  
     navigate("/users-management/users/add-user/more-information");
  }

  return (
    <> 
        <div>
        <h5>Add new role</h5>
       
        <CForm onSubmit={submitHandler}>
        <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="role" className="col-sm-2 col-form-label">Role</CFormLabel>
                <CFormInput placeholder="Please enter your Role" aria-label="role"  name="role" id="role" onChange={(e) => setRole(e.target.value)}/>
            </CCol>
        </CRow>
        <h5 className='mt-5'>Permissions</h5>
        <CRow >
           
            <CCol md={4}>
                 <h5>General</h5>
                 <CButton color="danger">Select All</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color={generalAdd}  onClick={() => setGeneralAdd((generalAdd) => generalAdd === "secondary" ? "danger" : "secondary" )}>Add</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color={generalView}  onClick={() => setGeneralView((generalView) => generalView === "secondary" ? "danger" : "secondary" )}>View</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color={generalEdit}  onClick={() => setGeneralEdit((generalEdit) => generalEdit === "secondary" ? "danger" : "secondary" )}>Edit</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color={generalDelete}  onClick={() => setGeneralDelete((generalDelete) => generalDelete === "secondary" ? "danger" : "secondary" )}>Delete</CButton>
            </CCol>
        </CRow>

        <CRow className="mt-5">
            <CCol md={4}>
                <h5>Sales</h5>
                 <CButton color="danger">Select All</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color={salesAdd}  onClick={() => setGeneralAdd((generalAdd) => generalAdd === "secondary" ? "danger" : "secondary" )}>Add</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">View</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">Edit</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">Delete</CButton>
            </CCol>
        </CRow>
        <CRow className="mt-5">
            <CCol md={4}>
                <h5>Support</h5>
                 <CButton color="danger">Select All</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">Add</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">View</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">Edit</CButton>
            </CCol>
            <CCol md={2}>
                <CButton color="secondary" variant="outline">Delete</CButton>
            </CCol>
        </CRow>
        <CRow className="mt-5">
            <CCol md={6}>
                <CButton type="cancel" color="danger" variant="outline" placement="right">Discard</CButton>
            </CCol>
            <CCol md={6}>
                <CButton type="submit" color="danger" >Save</CButton>
            </CCol>
        </CRow>
        </CForm>
        </div>
    </>
  )
}

export default AddRoles