/* eslint-disable prettier/prettier */
import { cilPencil, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from 'src/redux/actions/UserActions'

const UserList = () => {
  const dispatch = useDispatch()

  const allUsers = useSelector((state) => state.allUsers)
  const { loading, users, error } = allUsers

  console.log(users, 'users')

  let sr_no = 0
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const token = userInfo.data.token

  useEffect(() => {
    dispatch(getUsers(userInfo.data.token))
  }, [dispatch, userInfo.data.token])

  return (
    <>
      <h5>A2Z Users</h5>
      <div className="flex-column background-white-theme p-2">
        {/* <Link to="/users-management/users/add-user">
          <CButton color="danger">
            Add User <CIcon icon={cilUserPlus} size="lg" />
          </CButton>
        </Link> */}
        <Link to="/users-management/users/add-user" className="justify-end">
          <CButton color="danger custom-theme-btn">
            Add User
            <CIcon icon={cilUserPlus} size="lg" />
          </CButton>
        </Link>
        <hr></hr>
        <CTable className="custom-table custom-font-size text-align-center-nowrap">
          <CTableHead>
            <CTableRow className="custom-table-row grid-6-align-center">
              <CTableHeaderCell scope="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {loading
              ? 'Loading'
              : error
              ? 'Error'
              : users?.data?.data?.map((user, key) => {
                  return (
                    <CTableRow key={key} className="grid-6-align-center">
                      <CTableHeaderCell scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </CTableHeaderCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.role}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className={
                            user.status === 1 ? 'custom-success-green-btn' : 'custom-fail-red-btn'
                          }
                          size="sm"
                        >
                          Active
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon className="icon-color-blue" icon={cilPencil} size="lg" />{' '}
                        <CIcon
                          className="icon-color-red"
                          icon={cilTrash}
                          size="lg"
                          onClick={() => dispatch(deleteUser(token, user.eid))}
                        />{' '}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
          </CTableBody>
        </CTable>
        <CPagination align="end" aria-label="Paginationa">
          <CPaginationItem disabled>Previous</CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
      </div>
    </>
  )
}
export default UserList
