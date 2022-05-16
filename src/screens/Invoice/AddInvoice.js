/* eslint-disable prettier/prettier */
import { CButton, CCol, CFormInput, CFormLabel, CFormTextarea, CRow } from '@coreui/react'
import React, { useState } from 'react'

function AddInvoice() {

  const [invoiceTitle, setInvoiceTitle] = useState();
  const [invoiceId, setInvoiceId] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [billTo, setBillTo] = useState();
  const [subject, setSubject] = useState();
  const [product, setProduct] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();

  return (
    <>
         <CRow>
            <CCol md={4}>
                <CFormLabel htmlFor="InvoiceTitle" className="col-form-label">Invoice title</CFormLabel>
                <CFormInput placeholder="Please enter nvoice title" aria-label="InvoiceTitle" name="invoiceTitle" id="invoiceTitle" onChange={(e) => setInvoiceTitle(e.target.value)} required/>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="InvoiceId" className="col-form-label">Invoice ID</CFormLabel>
                <CFormInput  placeholder="Please enter invoice id" aria-label="InvoiceId" name="invoiceId" id="invoiceId" onChange={(e) => setInvoiceId(e.target.value)} required/>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="PaymentDate" className="col-form-label">Payment date</CFormLabel>
                <CFormInput placeholder="dd-mm-yy" aria-label="PaymentDate" name="paymentDate" id="paymentDate" onChange={(e) => setPaymentDate(e.target.value)} required/>
            </CCol>
         </CRow>
         <CRow>
            <CCol md={6}>
                <CFormLabel htmlFor="BillTo" className="col-form-label">Bill to</CFormLabel>
                <CFormTextarea placeholder="Bill to" aria-label="BillTo" name="billTo" id="billTo" onChange={(e) => setBillTo(e.target.value)}></CFormTextarea>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="Subject" className="col-form-label">Subject</CFormLabel>
                <CFormTextarea placeholder="Subject of invoice" aria-label="Subject" name="subject" id="subject" onChange={(e) => setSubject(e.target.value)}></CFormTextarea>
            </CCol>
         </CRow>
         <CRow>
            <CCol md={4}>
                <CFormLabel htmlFor="Product" className="col-form-label">Product</CFormLabel>
                <CFormInput aria-label="Product" name="product" id="product" onChange={(e) => setProduct(e.target.value)} required/>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="Description" className="col-form-label">Description</CFormLabel>
                <CFormInput aria-label="Description" name="description" id="description" onChange={(e) => setDescription(e.target.value)} required/>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="Amount" className="col-form-label">Payment date</CFormLabel>
                <CFormInput aria-label="Amount" name="amount" id="amount" onChange={(e) => setAmount(e.target.value)} required/>
            </CCol>
         </CRow>
         <CRow className='mt-3'>
            <CCol md={4}>
                <CButton color="secondary" >Add Product +</CButton>
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
    </>
  )
}

export default AddInvoice