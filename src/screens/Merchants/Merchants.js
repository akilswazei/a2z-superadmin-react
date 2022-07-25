/* eslint-disable prettier/prettier */
import * as React from 'react'
//react imports
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//material UI imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom components imports
import { deleteMerchant, getMerchants } from 'src/services/MerchantService'
import MainBoard from 'src/components/include/MainBoard'
//custom styling imports
import FormStyles from 'src/helper/FormStyles'

//grid styling
const datagridSx = FormStyles

//main function starts here
const Merchant = () => {
  //colums for data grid
  const columns = [
    { field: 'eid', headerName: 'ID' },
    { field: 'merchant_id', headerName: 'merchant ID', width: 200 },
    { field: 'legal_business_name', headerName: 'Business Name', width: 150 },
    { field: 'authorize_person_email', headerName: 'email', width: 200 },
    { field: 'onbording_date', headerName: 'Onboarding Date', width: 200 },
    {
      field: 'status',
      renderCell: (cellValues) => {
        return (
          <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
            {cellValues?.row?.status == 1 ? 'Declined' : 'Approved'}
          </button>
        )
      },
    },
    {
      field: 'action',
      renderCell: (cellValue) => {
        return (
          <div className="edit-delete-div">
            <span className="pencil-icon">
              <EditIcon  onClick={(e) => navigate('/merchant/edit/' + cellValue?.row?.eid)} />
            </span>
            <span className="delete-icon">
              <DeleteIcon onClick={(e) =>handleDelete(cellValue?.row?.eid,e) } />
            </span>
          </div>
        )
      },
    },
  ]
  //colums ends here

  //selector function
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [merchants, setMerchants] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch function
  const getMerchantData = async () => {
    setMerchants(await getMerchants(userInfo))
  }
  //handle events starts here
  //search function
  const searchMerchant = async (value) => {
    setSearch(value)
    setPage(1)
    setMerchants(await getMerchants(userInfo, 1, value))
  }

  //pagination function for changing page
  const changePage = async (e, value) => {
    setPage(value)
    setMerchants(await getMerchants(userInfo, value, search))
  }

  //detlete function
  const handleDelete = async (eid, e) => {
    deleteMerchant(userInfo, eid)
    setMerchants({
      ...merchants,
      data: { ...merchants.data, data: [...merchants.data.data.filter((v, i) => v.eid != eid)] },
    })
  }
  //handle events ends here
  //use effect for fresh fetch
  useEffect(() => {
    getMerchantData()
  }, [])

  //navigating to add page of merchant
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/merchant/add')
  }
  console.log(merchants)

  return (
    <MainBoard>
      <Container>
        <Container className="p-0 mt-4">
          <h6>Merchants</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchMerchant(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Merchant<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <hr></hr>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {merchants?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={merchants.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
          </div>
          <Container>
            <Pagination
              className="pagination"
              count={merchants?.data?.links ? merchants.data.links.length - 2 : 1}
              page={page}
              defaultPage={page}
              onChange={(e, number) => changePage(e, number)}
            />
          </Container>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Merchant
