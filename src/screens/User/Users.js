/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from 'src/redux/actions/UserActions';

const Users = () => {
 
  const dispatch = useDispatch();
  
  const allUsers = useSelector(state => state.allUsers);
  const {loading, users, error} = allUsers;

  console.log(users, 'users')

  let sr_no = 0;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  const token = userInfo.data.token;

  useEffect(() => {
    dispatch(getUsers(userInfo.data.token));
  }, [dispatch, userInfo.data.token]);
  
  return (
    <>
      <Link to="/users-management/users/add-user"><CButton color="danger">Add User <CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {
            loading ? "Loading" : error ? "Error" : (
              
              users ?. data ?. data ?.map((user, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.role}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell><CButton color="success" size="sm">Active</CButton></CTableDataCell>
                    <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg' onClick={() => dispatch(deleteUser(token, user.eid)) }/> </CTableDataCell>
                  </CTableRow>
                ) ;
              })
            )
          }
        </CTableBody>
      </CTable>
    </>
  )
}
export default Users;
