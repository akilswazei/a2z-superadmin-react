/* eslint-disable prettier/prettier */
import { CButton, CCol, CRow } from '@coreui/react'
import React from 'react'

function ViewMerchnat() {

  
  return (
    <>
       
       <CRow>
        <CCol md={6}>
          <h4>Basic Detail</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Name</strong></CCol>
            <CCol md={8}><div> Pearl D Austin</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Email</strong></CCol>
            <CCol md={8}><div>pearldautsin@hotmail.com</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Title</strong></CCol>
            <CCol md={8}><div>VP Sales</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Phone</strong></CCol>
            <CCol md={8}><div>661-406-8438</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Fax</strong></CCol>
            <CCol md={8}><div> 661-406-8438</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Address</strong></CCol>
            <CCol md={8}><div>504 Lowndes Hill Park Road, Los Angeles, CA 90013</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Date</strong></CCol>
            <CCol md={8}><div>04-18-2021</div></CCol>
          </CRow>
        </CCol>
        <CCol md={6}>
          <h4>Merchant Detail</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Onboarding Date</strong></CCol>
            <CCol md={8}><div>02-17-2022</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Onboarding Status</strong></CCol>
            <CCol md={8}><div>Approved</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Merchant ID</strong></CCol>
            <CCol md={8}><div>235456363</div></CCol>
          </CRow>
        </CCol>
       </CRow>

       <CRow className='mt-5'>
        <CCol md={6}>
          <h4>Business Detail</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Legal Business Name of Entity</strong></CCol>
            <CCol md={7}><div>A & B Market Plus, Inc</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Doing Business As Name (DBA)</strong></CCol>
            <CCol md={7}><div>Cracker Barrel Old Country Store</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Business Address</strong></CCol>
            <CCol md={7}><div>504 Lowndes Hill Park Road, Los Angeles, CA 90013</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>City</strong></CCol>
            <CCol md={7}><div>Los Angeles</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>State</strong></CCol>
            <CCol md={7}><div>California</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Zip Code</strong></CCol>
            <CCol md={7}><div>90013</div></CCol>
          </CRow>
        </CCol>
        <CCol md={6}>
          <h4>Business Contact</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Business Ph</strong></CCol>
            <CCol md={8}><div>617-905-9464</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Cell Phone</strong></CCol>
            <CCol md={8}><div>740-588-2787</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Website/URL</strong></CCol>
            <CCol md={8}><div>https://www.google.com/</div></CCol>
          </CRow>
        </CCol>
       </CRow>


       <CRow className='mt-5'>
        <CCol md={6}>
          <h4>Tax Detail</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Federal Tax ID</strong></CCol>
            <CCol md={7}><div>P84354797</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={5}><strong>State Tax ID</strong></CCol>
            <CCol md={7}><div>P99994025</div></CCol>
          </CRow>
        </CCol>
        <CCol md={6}>
          <h4>Store Type</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Type</strong></CCol>
            <CCol md={8}><div>Grocery Items</div></CCol>
          </CRow>
        </CCol>
       </CRow>

       <CRow className='mt-5'>
        <CCol md={6}>
          <h4>Ownership Type</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Type</strong></CCol>
            <CCol md={7}><div>Sole Proprietor</div></CCol>
          </CRow>
        </CCol>
        <CCol md={6}>
          <h4>State of Incorporation</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>State</strong></CCol>
            <CCol md={8}><div>California</div></CCol>
          </CRow>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Customer</strong></CCol>
            <CCol md={8}><div>Pearl D Austin</div></CCol>
          </CRow>
        </CCol>
       </CRow>

       <CRow className='mt-5'>
        <CCol md={6}>
          <h4>Assigned User</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={5}><strong>Assigned to</strong></CCol>
            <CCol md={7}><div>Arkan Somo</div></CCol>
          </CRow>
        </CCol>
        <CCol md={6}>
          <h4>Set Priority</h4>
          <hr/>
          <CRow className='mb-2'>
            <CCol md={4}><strong>Priority</strong></CCol>
            <CCol md={8}><div>Medium</div></CCol>
          </CRow>
        </CCol>
       </CRow>

       <CButton component="a" color="primary" href="#" role="button" className='mt-5'>Convert to Merchant</CButton>

    </>
  )
}

export default ViewMerchnat

















