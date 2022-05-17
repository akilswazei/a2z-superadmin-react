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
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getRoles } from 'src/redux/actions/UserRoles'

const RolesList = () => {
  const dispatch = useDispatch()

  const userRole = useSelector((state) => state.userRole)
  const { loading, roles, error } = userRole

  let sr_no = 0

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  return (
    <>
      <h5>Roles</h5>
      <div className="flex-column background-white-theme p-2">
        <Link to="/users-management/roles/add-roles" className="justify-end">
          <CButton color="danger custom-theme-btn">
            Add Role
            <CIcon icon={cilUserPlus} size="lg" />
          </CButton>
        </Link>
        <hr></hr>
        <CTable className="custom-table">
          <CTableHead>
            <CTableRow className="custom-table-row">
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
              <CTableHeaderCell scope="col">Roles</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {loading
              ? 'Loading'
              : error
              ? 'Error'
              : roles?.data?.map((role, key) => {
                  return (
                    <CTableRow key={key}>
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
                      <CTableDataCell>{role.name}</CTableDataCell>
                      <CTableDataCell>
                        <CIcon className="icon-color-blue" icon={cilPencil} size="lg" />{' '}
                        <CIcon icon={cilTrash} size="lg" className="icon-color-red" />{' '}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}
export default RolesList
