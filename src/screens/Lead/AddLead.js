/* eslint-disable prettier/prettier */
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


function AddLead() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [faxNumber, setFaxNumber] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [subscribe, setSubscribe] = useState();
  const [onboardingStatus, setOnboardingStatus] = useState();
  const [onboardingDate, setOnboardingDate] = useState();
  const [merchantId, setMerchantId] = useState();
  const [legalBusinessName, setLegalBusinessName] = useState();
  const [DBA, setDBA] = useState();
  const [businessAddress, setBusinessAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [businessPhone, setBusinessPhone] = useState();
  const [cellPhone, setCellPhone] = useState();
  const [websiteUrl, setWebsiteUrl] = useState();
  const [federalTaxID, setFederalTaxID] = useState();
  const [stateTaxId, setStateTaxId] = useState();
  const [storeType, setStoreType] = useState();
  const [soleProprietor, setSoleProprietor] = useState();
  const [partnership, setPartnership] = useState();
  const [corporation, setCorporation] = useState();
  const [other, setOther] = useState();
  const [stateName, setStateName] = useState();
  const [customerName, setCustomerName] = useState();

  
  
  const dispatch = useDispatch();


const submitHandler = (e) => {
    e.preventDefault();
  
    //dispatch(addUser(userData));
}

  return (
    <> 
        <CForm onSubmit={submitHandler} >
        <h3 className='mb-4'>Basic Details</h3>
        <CRow>
            <CCol md={3}>
                <CFormLabel htmlFor="name" className="col-form-label">Name</CFormLabel>
                <CFormInput placeholder="Please enter name" aria-label="name" name="name" id="name" onChange={(e) => setName(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="email" className="col-form-label">Email</CFormLabel>
                <CFormInput type="email" placeholder="Please enter email" aria-label="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="title" className="col-form-label">Title</CFormLabel>
                <CFormInput placeholder="Please enter title" aria-label="title" name="title" id="title" onChange={(e) => setTitle(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Phone" className="col-sm-2 col-form-label">Phone</CFormLabel>
                <CFormInput placeholder="Please enter phone" aria-label="Phone"  name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} valid required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Fax" className="col-sm-2 col-form-label">Fax</CFormLabel>
                <CFormInput placeholder="Please enter Fax number" aria-label="Fax"  name="fax" id="fax" onChange={(e) => setFaxNumber(e.target.value)} valid required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">Address</CFormLabel>
                <CFormInput placeholder="Please enter address" aria-label="Address"  name="address" id="address" onChange={(e) => setAddress(e.target.value)} valid required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Date" className="col-sm-2 col-form-label">Date</CFormLabel>
                <CFormInput placeholder="Please enter date" aria-label="Date"  name="date" id="date" onChange={(e) => setAddress(e.target.value)} valid required/>
            </CCol>
            <CRow>
            <CCol md={9}>
                <CFormLabel htmlFor="Subscribe" className="col-form-label"><strong>Subscribe for email marketing</strong></CFormLabel>
                <CFormCheck id="subscribe" name="subscribe" label="Yes, please send automated text messages regarding my POS installation appointment to the mobile phone number listed above. 
Consent is not a condition of purchase and you can opt out at any time. Message and data rates may apply" onChange = {(e) => setSubscribe(e.target.value)}/> 
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Subscribe" className="col-form-label"></CFormLabel>
                <CFormCheck id="subscribe" name="subscribe" label="NO" onChange = {(e) => setStoreType(e.target.value)}/> 
            </CCol>
        </CRow>
        </CRow>
       

        <h4 className='mb-5 mt-5'>Business Detail</h4>
        <CRow>
            <CCol md={3}>
                <CFormLabel htmlFor="LegalBusinessName" className="col-form-label">Legal business name of entity</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter legal business name" aria-label="LegalBusinessName" name="OnboardingDate" id="OnboardingDate" onChange={(e) => setLegalBusinessName(e.target.value)} required/>
            </CCol>
        
            <CCol md={9}>
                <CFormLabel htmlFor="DBA" className="col-form-label">Doing business as name (DBA)</CFormLabel>
                <CFormInput placeholder="Please enter DBA name" aria-label="DBA" name="DBA" id="DBA" onChange = {(e) => setDBA(e.target.value)} required/>
            </CCol>

            <CCol md={3}>
                <CFormLabel htmlFor="BusinessAddress" className="col-form-label">Business address</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter address" aria-label="BusinessAddress" name="businessAddress" id="businessAddress" onChange = {(e) => setBusinessAddress(e.target.value)} />
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="City" className="col-form-label">City</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter city" aria-label="City" name="City" id="City" onChange = {(e) => setCity(e.target.value)}/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="State" className="col-form-label">State</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter state" aria-label="State" name="state" id="state" onChange = {(e) => setState(e.target.value)}/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="ZipCode" className="col-form-label">Zip Code</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter Zipcode" aria-label="ZipCode" name="zipCode" id="zipCode" onChange = {(e) => setZipCode(e.target.value)}/>
            </CCol>
        </CRow>
        <h4 className='mb-5 mt-5'>Business Contact</h4>
        <CRow>
            <CCol md={3}>
                <CFormLabel htmlFor="BusinessPhone" className="col-form-label">Business phone number</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter business phone" aria-label="BusinessPhone" name="BusinessPhone" id="BusinessPhone" onChange = {(e) => setBusinessPhone(e.target.value)}/>
            </CCol>
        
            <CCol md={3}>
                <CFormLabel htmlFor="CellPhone" className="col-form-label">Cell phone</CFormLabel>
                <CFormInput placeholder="Please enter cell phone" aria-label="CellPhone" name="CellPhone" id="CellPhone" onChange={(e) => setCellPhone(e.target.value)} required/>
            </CCol>

            <CCol md={3}>
                <CFormLabel htmlFor="WebsiteUrl" className="col-form-label">Website / URL</CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter website" aria-label="WebsiteUrl" name="websiteUrl" id="websiteUrl" onChange = {(e) => setWebsiteUrl(e.target.value)} />
            </CCol>
            
        </CRow>

        <h4 className='mb-5 mt-5'>Tax Detail</h4>
        <CRow>
            <CCol md={3}>
                <CFormLabel htmlFor="FederalTaxID " className="col-form-label">Federal Tax ID </CFormLabel>
                <CFormInput locale="en-US" placeholder="Please enter federal tax id" aria-label="FederalTaxID " name="federalTaxID" id="federalTaxID" onChange = {(e) => setFederalTaxID(e.target.value)}/>
            </CCol>
        
            <CCol md={3}>
                <CFormLabel htmlFor="StateTaxId" className="col-form-label">State Tax Id</CFormLabel>
                <CFormInput placeholder="Please enter state tax id" aria-label="StateTaxId" name="stateTaxId" id="stateTaxId" onChange={(e) => setStateTaxId(e.target.value)} required/>
            </CCol>
        </CRow>

        <h4 className='mb-5 mt-5'>Store Type</h4>
        <p>Does The Store Sell Snacks, Sodas/Beverages or Grocery Items?</p>
        <CRow>
            <CCol md={3}>
                <CFormCheck id="storeType" name="storeType" label="Yes" onChange = {(e) => setStoreType(e.target.value)}/> 
                <CFormCheck id="storeType" name="storeType" label="No" onChange = {(e) => setStoreType(e.target.value)}/>
            </CCol>
        
        </CRow>

        <h4 className='mb-5 mt-5'>Onwership Type</h4>
        <CRow>
            <CCol md={3}>
                <CFormCheck id="OnwershipType" name="onwershipType" label="Sole Proprietor" onChange = {(e) => setSoleProprietor(e.target.value)}/>
            </CCol>
            <CCol md={3}>
                <CFormCheck id="OnwershipType" name="onwershipType" label="Partnership" onChange = {(e) => setPartnership(e.target.value)}/>
            </CCol>
            <CCol md={3}>
                <CFormCheck id="OnwershipType" name="onwershipType" label="Corporation" onChange = {(e) => setZipCode(e.target.value)}/> 
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="Other" className="col-form-label">Other</CFormLabel>
                <CFormInput placeholder="Please specify others" aria-label="Other" name="other" id="other" onChange={(e) => setOther(e.target.value)} required/>
            </CCol>
        </CRow>

        <h4 className='mb-5 mt-5'>State of incorporation</h4>
        <CRow>
        <CCol md={3}>
                <CFormLabel htmlFor="StateName" className="col-form-label">State Name</CFormLabel>
                <CFormInput placeholder="Please specify others" aria-label="StateName" name="stateName" id="stateName" onChange={(e) => setMerchantId(e.target.value)} required/>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="CustomerName" className="col-form-label">Customer name</CFormLabel>
                <CFormInput placeholder="Please enter customer name" aria-label="CustomerName" name="customerName" id="customerName" onChange={(e) => setCustomerName(e.target.value)} required/>
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
export default AddLead;