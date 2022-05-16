/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


function AddStore() {
  const [storeName, setStoreName] = useState();
  const [location, setLocation] = useState();
  const [quantity, setQuantity] = useState();
  const [license, setLicense] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  
  const dispatch = useDispatch();


const submitHandler = (e) => {
    e.preventDefault();
    const storeData = {
        store_name: storeName,
        store_location: location,
        store_quantity:quantity,
        store_license: license,
        store_email:email,
        store_phone: phone,
    } 
    //dispatch(addUser(userData));
}

  return (
    <> 
        <h5>Store Details</h5>
        <CForm onSubmit={submitHandler} >
        <CRow>
            <CCol md={3}>
                <CFormLabel htmlFor="storeName" className="col-form-label">Store Name</CFormLabel>
                <CFormInput placeholder="Please enter store name" aria-label="storeName" name="store_name" id="store_name" onChange={(e) => setStoreName(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Location" className="col-sm-2 col-form-label">Location</CFormLabel>
                <CFormInput placeholder="Please enter location" aria-label="Location"  name="location" id="location" onChange={(e) => setLocation(e.target.value)} valid required/>
            </CCol>
            <CCol md={3}>
                    <CFormLabel htmlFor="quantity" className="col-form-label">Select Quantity</CFormLabel>
                    <CFormSelect
                      aria-label="quantitiy"
                      options={[
                          'Select Quantitiy',
                          { label: '5', value: '5' },
                          { label: '10', value: '10' },
                          { label: '15', value: '15' },
                          { label: '20', value: '20' },

                      ]}
                      onChange={(e) => setQuantity(e.target.value)}
                  />
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="License" className="col-form-label">License</CFormLabel>
                <CFormInput placeholder="Please enter liscense" aria-label="hireFor" name="license" id="license" onChange={(e) => setLicense(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Email" className="col-form-label">Email</CFormLabel>
                <CFormInput type="email" placeholder="Please enter email" aria-label="Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Phone" className="col-form-label">Phone</CFormLabel>
                <CFormInput placeholder="Please phone" aria-label="Phone" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} required/>
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
export default AddStore;