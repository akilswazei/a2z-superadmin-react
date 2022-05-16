/* eslint-disable prettier/prettier */
import { CButton, CCol, CImage, CRow } from '@coreui/react'
import React from 'react'
import profile from 'src/assets/images/ProfilePic/profile-pic-1.jpeg';
function UserProfile() {
  return (
    <>
        <CRow>
            <CCol md={5}>
                <div className='profile' style={{'background': "#FFF", "padding": "16px", 'borderRadius': '5px'}}>
                    <div className="text-center">
                        <CImage src={profile} width={200} height={200} style={{'borderRadius':'100rem'}}/>
                        <h5>Marlene Sasoeur</h5>
                    </div>
                    <div className='info'>
                        <CRow className='mt-4'>
                            <CCol md={6}>
                                <div><strong>Role:Admin</strong></div>
                                <div> Status: <CButton color="success" size="sm">Active</CButton></div>
                            </CCol>
                            <CCol md={6}>
                                <div><strong>Email: admin@xyz.com</strong></div>
                                <div> Phone No: +91 123123123</div>
                            </CCol>

                        </CRow>
                    </div>
                    <CRow className='mt-5'>
                        <div className='mt-6'>
                            <strong>Address</strong>
                            <hr></hr>
                            <p>Permanent address: B Block, Lorem Ipsum, India</p>
                        </div>
                    </CRow>
                   
                </div>
            </CCol>
            <CCol md={1}></CCol>
            <CCol md={6}>
               <div className='userInformation' style={{'background': "#FFF", "padding": "16px", 'borderRadius': '5px'}}>
                <h5>User Information</h5>
                <hr></hr>
                <CRow>
                    <CCol md={6}>
                        <div>Sales Commission (%): 0.00%</div>
                        <div>Date of birth: 10-01-1984</div>
                        <div>Gender: Male</div>
                        <div>Country: India</div>
                        <div>ID Proof: PAN CARD</div>
                    </CCol>
                    <CCol md={6}>
                        <div>Blood Group: B+</div>
                        <div>Marital Status: Married</div>
                        <div>ID Proof number: AANEP2210G</div>
                    </CCol>
                </CRow>
              
                <CRow className='mt-5'>
                    <h5 className='bank-details'>User Information</h5>
                    <hr></hr>
                    <CCol md={6}>
                        <div>Account Holder’s Name: Minimal Tweaks</div>
                        <div>Account Number: 9100156699877</div>
                        <div>Tax Payer ID: LOREM-IPSUM-99</div>
                    </CCol>
                    <CCol md={6}>
                        <div>Bank Name: SCOTIA BANK</div>
                        <div>Bank IFSC Code: SCB910015</div>
                        <div>Branch: Outer Circle, DL 38</div>
                    </CCol>
                </CRow>
                
                <CRow className='mt-5'>
                    <h5 className='bank-details'>HRMS Details</h5>
                    <hr></hr>
                    <CCol md={6}>
                        <div>Department: Design and Development</div>
                    </CCol>
                    <CCol md={6}>
                        <div>Designation: - Creative Director</div>
                    </CCol> 
                </CRow>
            </div>

            </CCol>
        </CRow>
    </>
  )
}

export default UserProfile