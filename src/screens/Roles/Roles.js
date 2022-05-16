/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRoles } from 'src/redux/actions/UserRoles';

const Roles = () => {
  
  const dispatch = useDispatch();

  const userRole = useSelector(state => state.userRole);
  const {loading, roles, error} = userRole;
  
  let sr_no = 0;

  useEffect(() => {
    dispatch(getRoles());
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
        {
            loading ? "Loading" : error ? "Error" : (
              
              roles ?. data ?.map((role, key) => {
                return (
                  <CTableRow key={key}>
                    <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                    <CTableDataCell>{role.name}</CTableDataCell>
                    <CTableDataCell><CIcon icon={cilPencil}  size='lg'/> <CIcon icon={cilTrash} size='lg'/> </CTableDataCell>
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
export default Roles;
