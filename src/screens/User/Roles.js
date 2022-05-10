/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from 'src/redux/actions/UserActions';

const Roles = () => {
  
  const dispatch = useDispatch();



  let sr_no = 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Link to="/users-management/roles/add-roles"><CButton color="danger">Add Role<CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Roles</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          
         
        </CTableBody>
      </CTable>
    </>
  )
}
export default Roles;
