/* eslint-disable react/prop-types *//* eslint-disable prettier/prettier */
import { CCol, CRow } from '@coreui/react'
import React from 'react'
import '../index.css'
export default function UserSteps({step1, step2, step3}) {
    return (
        <>
            <CRow className="user-steps">
                <CCol md={4}>
                    <div className={step1 ? 'active': ''}>Basic Information</div>
                </CCol>
                <CCol md={4}>
                    <div className={step2 ? 'active': ''}>More Information</div>
                </CCol>
                <CCol md={4}>
                    <div className={step3 ? 'active': ''}>Bank Details</div>
                </CCol>
           </CRow>
        </>
        
    )
}
