/* eslint-disable prettier/prettier */
import { CCol, CRow } from '@coreui/react'
import React from 'react'

function TeamDetails() {
  return (
    <>
        <CRow className='mt-5'>
            <CCol md={12}>
                <h4>Tax Detail</h4>
                <hr/>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Company Name</strong></CCol>
                    <CCol md={9}><div>Global Fresh Market</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Type</strong></CCol>
                    <CCol md={9}><div>Support</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Email</strong></CCol>
                    <CCol md={9}><div>calvincdyess@jourrapide.com</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Phone</strong></CCol>
                    <CCol md={9}><div>856-517-0330</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Address</strong></CCol>
                    <CCol md={9}><div>131 Briarwood Drive ,Camden, NJ 08102</div></CCol>
                </CRow>
            </CCol>
            <CCol md={12} className='mt-5'>
                <h4>Team Admin User Detail</h4>
                <hr/>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Name</strong></CCol>
                    <CCol md={9}><div>Calvin C. Dyess</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>User Name</strong></CCol>
                    <CCol md={9}><div>calvin</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Title</strong></CCol>
                    <CCol md={9}><div>Sales Manager</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Email</strong></CCol>
                    <CCol md={9}><div>calvincdyess@jourrapide.com</div></CCol>
                </CRow>
                <CRow className='mb-2'>
                    <CCol md={3}><strong>Status</strong></CCol>
                    <CCol md={9}><div>Active</div></CCol>
                </CRow>
            </CCol>
       </CRow>

    </>
  )
}

export default TeamDetails;










