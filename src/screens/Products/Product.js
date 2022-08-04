/* eslint-disable prettier/prettier */
//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//material Ui imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom styling imports
import FormStyles from 'src/helper/FormStyles'
//custom component imports
import MainBoard from 'src/components/include/MainBoard'
import { deleteProduct, getProducts } from 'src/services/ProductService'

//styling for data grid
const datagridSx = FormStyles

//main function starts here
const Product = () => {
  //navigate function
  const navigate = useNavigate()
  //selector
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [products, setProducts] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  //fetch function
  const getProductsData = async () => {
    setProducts(await getProducts(userInfo, 1, ''))
  }

  const searchProduct = async (value) => {
    setSearch(value)
    setPage(1)
    setProducts(await getProducts(userInfo, 1, value))
  }
  //change page function used in pagination
  const changePage = async (e, value) => {
    console.log(value)
    setPage(value)
    setProducts(await getProducts(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteProduct(userInfo, eid)
    setProducts({
      ...products,
      data: { ...products.data, data: [...products.data.data.filter((v, i) => v.eid != eid)] },
    })
  }

  //re render funaction for fetch fucntion
  useEffect(() => {
    getProductsData()
  }, [])

  console.log(products)

  const columns = [
    { field: 'product_name', headerName: 'Product', width: 350 },
    { field: 'supplier_price', headerName: 'Cost Product', width: 150 },
    { field: 'selling_price', headerName: 'Store Sell Price', width: 150 },
    { field: 'eid', headerName: 'username', width: 150 },
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
            <span className="pencil-icon" onClick={(e) => navigate('/product/edit/' + cellValue?.row?.eid)}>
              <EditIcon />
            </span>
            <span className="delete-icon">
              <DeleteIcon
                onClick={() => {
                  handleDelete(cellValue.row.eid)
                }}
              />
            </span>
          </div>
        )
      },
    },
  ]

  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/product/add')
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Products</h6>
        </Container>
        <Container className="background-white-theme">
          <div className="justify-flex-end input-div">
            <input type="text" placeholder="Sort by" className="m-1" />
            <input
              type="text"
              placeholder="Search here"
              className="m-1"
              onChange={(e) => {
                searchProduct(e.target.value)
              }}
            />
            <button onClick={navigateFunction} className="custom-blue-btn m-2">
              Add Products<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {products?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={products.data.data}
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
              count={products?.data?.links ? products.data.links.length - 2 : 1}
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
export default Product
