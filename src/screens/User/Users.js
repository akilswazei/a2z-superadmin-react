/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CPagination, CPaginationItem } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {  getUsers,deleteUsers } from 'src/services/UserServices';
import axios from 'axios'
const Users = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [users, setUsers] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
 

  const getUserData = async () => {
     setUsers(await getUsers(userInfo));
  }

  const searchUser =async (value) => {
    setSearch(value);
    setPage(1);
    setUsers(await getUsers(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setUsers(await getUsers(userInfo,value,search));
  }

  const handleDelete =async (eid,e) => {
    deleteUsers(userInfo,eid)
    setUsers({...users, data: {...users.data,data:[...users.data.data.filter((v,i) => v.eid!=eid)]}});
  }

  
  useEffect(() => {
    getUserData();
  }, []);
  
console.log(users);
  let sr_no = 0;

  return (
    <>
    <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          searchUser(e.target.value)
        }}
      />
      <Link to="/users-management/users/add-user"><CButton color="danger">Add User <CIcon icon={cilUserPlus}  size='lg'/></CButton></Link>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
        {
            users ?. data ?. data ?.map((user, key) => {
              return (
                <CTableRow key={key}>
                  <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{user.role}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell onClick={(e) => handleDelete(user.eid, e)}>Delete</CTableDataCell>
                    {
                      users ?. data ?. data ?.map((user, key) => {
                        return (
                          <CTableRow key={key}>
                            <CTableHeaderCell scope="row">{++sr_no}</CTableHeaderCell>
                            <CTableDataCell>{user.name}</CTableDataCell>
                            <CTableDataCell>{user.role}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell onClick={(e) => handleDelete(user.eid, e)}>Delete</CTableDataCell>

                          </CTableRow>
                        ) ;
                      })
                    }
                    </CTableRow>
                  )  
            })
          }
        </CTableBody>
      </CTable>
      <CPagination align="end" aria-label="Paginationa">
        {
            users ?. data ?. links ?.map((user, key) => {
            if(key=='0'){
                return (<CPaginationItem >Previous</CPaginationItem>)
            }  else if(key==users.data.links.length-1){
                return (<CPaginationItem >Next</CPaginationItem>)
            } else{
                return (<CPaginationItem onClick={(e)=>{ changePage(key) }}>{key}</CPaginationItem>)
            }

          })
        }
      </CPagination>
    </>
  )
}
export default Users;
