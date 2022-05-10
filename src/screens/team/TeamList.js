/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from 'src/redux/actions/TeamActions';

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
    TEST
    </>
  )
}
export default Users;
