/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteIndividual, getIndividuals } from 'src/services/IndividualService'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

const datagridSx = {
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    '& .MuiDataGrid-row': {
      '&:nth-of-type(2n)': {
        backgroundColor: '#F9F9FC',
        border: 'none',
      },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255,255,255)',
    border: 'none',
    color: 'rgba(180,182,193)',
    fontSize: '1.2em',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  '& .MuiDataGrid-row': {
    fontSize: '0.9em',
    fontWeight: '600',
    border: 'none',
  },
  '& .css-i4bv87-MuiSvgIcon-root': {
    color: '#1976D2',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .customTable .MuiDataGrid-root .MuiDataGrid-root--densityStandard': {
    border: '0px solid gray !important',
  },
}

const Product = () => {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [product, setProduct] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getProductData = async () => {
    setProduct(await getIndividuals(userInfo))
  }

  const searchIndividual = async (value) => {
    setSearch(value)
    setPage(1)
    setProduct(await getIndividuals(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setProduct(await getIndividuals(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteIndividual(userInfo, eid)
    setProduct({
      ...product,
      data: { ...product.data, data: [...product.data.data.filter((v, i) => v.eid != eid)] },
    })
  }
  useEffect(() => {
    getProductData()
  }, [])

  console.log(product)
  let sr_no = 0
  const columns = [
    { field: 'product', headerName: 'Product', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'supplier', headerName: 'Supplier', width: 150 },
    { field: 'supplier_price', headerName: 'Supplier Price', width: 150 },
    { field: 'store_sell_price', headerName: 'Store Sell Price', width: 150 },
    { field: 'eid', headerName: 'username', width: 150 },
    { field: 'company_name', headerName: 'Name', width: 200 },
    { field: 'company_email', headerName: 'Email', width: 300 },
    { field: 'service_type', headerName: 'service type', width: 150 },
    {
      field: 'status',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
            {cellValues?.row?.status == 1 ? 'Inactive' : 'Active'}
          </button>
        )
      },
    },
    {
      field: 'actions',
      width: 100,
      renderCell: (cellValue) => {
        return (
          <div className="edit-delete-div">
            <span className="pencil-icon" onClick={(e) => navigate('/individual/edit/' + cellValue?.row?.eid)}>
              <EditIcon />
            </span>
            <span className="delete-icon" onClick={(e) => handleDelete(cellValue?.row?.eid, e)}>
              <DeleteIcon />
            </span>
          </div>
        )
      },
    },
  ]

  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/individual/add')
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Products</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchIndividual(e.target.value)
              }}
            />
            <button onClick={navigateFunction} className="custom-blue-btn m-2">
              Add Products<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {product?.data?.data && (
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={product.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
            {/* <Pagination count={11} defaultPage={6} /> */}
          </div>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Product
