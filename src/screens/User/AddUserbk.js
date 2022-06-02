/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "src/services/UserServices";
import { getRoles } from "src/services/RolesServices";

function AddUser() {

    const getState = useSelector(state => state);
    const {userSignin: { userInfo }} = getState

    const [inputs, setInputs] = useState({});
    const [roles, setRoles] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    //const [validated, setValidated] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = inputs 
        await addUser(userInfo,userData);
    }

    const getRolesData = async () => {
        setRoles(await getRoles(userInfo));
     }

     useEffect(() => {
        getRolesData();
      }, []);

  return (
    <> 
        <h5>Add new user</h5>
        <CForm onSubmit={submitHandler} >
        <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">Name</CFormLabel>
                <CFormInput placeholder="Please enter your name" aria-label="Name" name="name" id="name" onChange={(e) => handleChange(e)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">Email</CFormLabel>
                <CFormInput type="email" placeholder="Please enter your email" aria-label="Email"  name="email" id="email" onChange={(e) => handleChange(e)} valid required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="password" className="col-form-label">Password</CFormLabel>
                <CFormInput type="password" placeholder="Please enter your Pasword" aria-label="First name" name="password" id="password" onChange={(e) => handleChange(e)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="confirmPassword" className="col-form-label">Confirm Password</CFormLabel>
                <CFormInput type="password" placeholder="Please enter your confirm Passsword" aria-label="Confirm Password" name="confirmPassword" id="confirmPassword" onChange={(e) => handleChange(e)} required/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="image" className="col-form-label">Profile Pic</CFormLabel>
                <CFormInput type="file" id="image" name="image" aria-label="file example"  onChange={(e) => handleChange(e)} />
            </CCol>
            <CCol md={6}>
                    <CFormLabel htmlFor="role"   className="col-form-label">Role</CFormLabel>
                    <CFormSelect
                      aria-label="role"
                      name="role"
                      options={
                            roles ?. data ?.map((role, key) => {
                                return (
                                    { label : role.name, value: role.eid }
                                )
                            })
                           
                      }
                      onChange={(e) => handleChange(e)}
                  />
            </CCol>
          
            <CCol md={6}>
                    <CFormLabel htmlFor="status"   className="col-form-label">Status </CFormLabel>
                    <CFormSelect
                      aria-label="status"
                      name="status"
                      options={[
                          'Select Status',
                          { label: 'Active', value: '1' },
                          { label: 'Inactive', value: '2' },
                      ]}
                      onChange={(e) => handleChange(e)}
                  />
            </CCol>
        </CRow>
        <CRow>
            <h4 className="mt-5">More Information</h4>
            <CCol md={6}>
                <CFormLabel htmlFor="dob" className="col-sm-2 col-form-label">Date Of Birth</CFormLabel>
                <CFormInput locale="en-US" placeholder="YYYY-MM-DD" aria-label="dob" name="dob" id="dob" onChange={(e) => handleChange(e)}/>
            </CCol>
            <CCol md={6}>
                    <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">Gender</CFormLabel>
                    <CFormSelect aria-label="gender"
                        options={[
                            'Please enter your Gender',
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]}
                        onChange={(e) => handleChange(e)}
                    />
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="phone_no" className="col-form-label">Phone Number</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter your Phone number" aria-label="Phone"  name="phone_no" id="phone_no" onChange={(e) => handleChange(e)}/>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="maritial_status" className="col-form-label">Maritial Status</CFormLabel>
                <CFormSelect
                    aria-label="maritial_status"
                    options={[
                        'Please enter your Martial Status',
                        { label: 'Married', value: 'married' },
                        { label: 'Single', value: 'single' },
                    ]}
                    onChange={(e) => handleChange(e)}
                />
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="currentAddress" className="col-form-label">Current Address</CFormLabel>
                <CFormTextarea id="currentAddress" label="Current Address" placeholder="Current Address" required  onChange={(e) => handleChange(e)}>
                </CFormTextarea>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="permanentAddress" className="col-form-label">Permanent Address</CFormLabel>
                <CFormTextarea  id="permanentAddress" label="Permanent Address" placeholder="Permanent Address" required onChange={(e) => handleChange(e)}>
                </CFormTextarea>
            </CCol>
        </CRow>
        <CRow>
            <h4 className="mt-5">Bank Details</h4>  
            <CCol md={6}>
                <CFormLabel htmlFor="account_name" className="col-form-label">Account Holder’s Name</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter Account Holder’s Name" aria-label="account_name"  name="account_name" id="account_name" onChange={(e) => handleChange(e)}/>
            </CCol>  
            <CCol md={6}>
                <CFormLabel htmlFor="accNumber" className="col-form-label">Account Number</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter your Account Number" aria-label="accNumber"  name="accNumber" id="accNumber" onChange={(e) => handleChange(e)}/>
            </CCol> 
            <CCol md={6}>
                <CFormLabel htmlFor="bankName" className="col-form-label">Bank Name</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter your Bank Name" aria-label="bankName"  name="bankName" id="bankName" onChange={(e) => handleChange(e)}/>
            </CCol> 
            <CCol md={6}>
                <CFormLabel htmlFor="bankIndetityCode" className="col-form-label">Bank Identifier Code</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter your Bank Identifier Code" aria-label="bankIndetityCode"  name="bankIndetityCode" id="bankIndetityCode" onChange={(e) => handleChange(e)}/>
            </CCol>  
            <CCol md={6}>
                    <CFormLabel htmlFor="bank_branch" className="col-form-label">Branch, Tax Payer  ID</CFormLabel>
                    <CFormInput locale="en-US" placeholder="Please enter your Bank Identifier Code" aria-label="bank_branch"  name="bank_branch" id="bank_branch" onChange={(e) => handleChange(e)}/>
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
export default AddUser