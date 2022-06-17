/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addProduct,updateProduct,getProduct } from 'src/services/ProductService'
import { getSuppliers } from 'src/services/SupplierService'
import { getCategories } from 'src/services/CategoryService'
import MainBoard from 'src/components/include/MainBoard'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useParams } from 'react-router-dom'
import { validate } from 'src/helper/validation'
import {
  Container,
  Button,
  Icon,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Paper,
  Typography,
  Grid,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { InputBase } from '@mui/material'
import { CustomEmail, CustomPasssword, CustomText, CustomSelect } from 'src/helper/helper'
import { cilChevronDoubleLeft } from '@coreui/icons'

function AddProduct() {
  let suupliers;
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  const { eid } = useParams()
  let initialInputState = { status: 1 }

  const [inputs, setInputs] = useState(initialInputState)
  const [suppliers, setSuppliers] = useState([])
  const [categories, setCategories] = useState([])
  
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState(false)
  const [progress, setProgress] = React.useState(0)


  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    let allerrors = validate(inputs, {})
    if (Object.keys(allerrors).length === 0) {
      let response
      if (eid) {
        console.log('update will done')
        response = await updateProduct(userInfo, inputs)
      } else {
        response = await addProduct(userInfo, inputs)
      }
      if (response.data && Object.keys(response.data).length != 0) {
        allerrors = response.data
        console.log(allerrors.email)
        Object.keys(allerrors).forEach(function (ckey) {
          allerrors[ckey] = allerrors[ckey].join()
          console.log(allerrors[ckey])
        })
      } else {
        setOpen(true)
      }
    }
    setErros(allerrors)
  }

  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../products', { replace: true })
  }
  const getProductData = async (eid) => {
    const beforeUpdateData = await getProduct(userInfo, eid)
    setInputs(beforeUpdateData.data)
  }
  const get_supplier_list = async (eid) => {
    const supplier_data = await getSuppliers(userInfo)
    supplier_data?.data?.data.map((value,key)=>{
      suppliers.push({eid: value.eid,name: value.supplier_name})
    })
  }
  const get_category_list = async (eid) => {
    const category_data = await getCategories(userInfo)
    category_data?.data?.data.map((value,key)=>{
      categories.push({eid: value.eid,name: value.category_name})
    })
  }

  useEffect(() => {
    get_supplier_list();
    get_category_list();
    getRolesData()
    if (eid) {
      getProductData(eid)
    }
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <MainBoard>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Successfully Submitted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Add Product</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
            <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Details</h6>
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="product_name"
                  placeholder="product name"
                  id="product-name"
                  value={inputs.product_name?inputs.product_name:""}
                  label="Product Name"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="product_details"
                  placeholder="Please enter details"
                  value={inputs.product_details?inputs.product_details:""}
                  label="Product Details"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item sx={4} md={4}>
                <CustomText
                  label="Product UPC"
                  name="product_upc"
                  required={true}
                  error={false}
                  value={inputs.product_upc?inputs.product_upc:""}
                  placeholder="Enter UPC"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sx={4} md={4}>
                <CustomText
                  label="Product SKU"
                  name="product_sku"
                  required={true}
                  error={false}
                  value={inputs.product_sku?inputs.product_sku:""}
                  placeholder="Enter UPC"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>              
              <Grid item sx={4} md={4}>
                <CustomText
                  label="Quantity"
                  name="quantity"
                  required={true}
                  error={false}
                  value={inputs.quantity?inputs.quantity:""}
                  placeholder="Please enter quantity  "
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={4}>
                <CustomText
                  label="Manufacturer"
                  name="manufacturer"
                  required={true}
                  error={false}
                  value={inputs.manufacturer?inputs.manufacturer:""}
                  placeholder="Please enter manufacturer name"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>



              <Grid item sx={4} md={4}>
                
                <CustomSelect
                    label="Supplier"
                    name="supplier"
                    fullWidth={true}
                    required={true}
                    error={false}
                    value={inputs.supplier?inputs.supplier:""}
                    handleChange={(e) => handleChange(e)}
                    options={suppliers}
                  />
                </Grid>
                
              <Grid item sx={4} md={4}>

              <CustomSelect
                    label="Category"
                    name="category"
                    fullWidth={true}
                    required={true}
                    error={false}
                    value={inputs.category?inputs.category:""}
                    handleChange={(e) => handleChange(e)}
                    options={categories}
                  />

              </Grid>
              
              
              
              <Grid item sx={4} md={4}>
                <FormGroup>
                  <CustomSelect
                    label="Product Of"
                    name="is_in_house"
                    required={true}
                    error={false}
                    value={inputs.is_in_house?inputs.is_in_house:""}
                    placeholder="is in house"
                    handleChange={(e) => handleChange(e)}
                    options={[{eid:1,name:"In house"},{eid:2,name:"marketplace"}]}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomSelect
                  handleChange={(e) => handleChange(e)}
                  name="is_subscription"
                  placeholder="Product Type"
                  value={inputs.is_subscription?inputs.is_subscription:""}
                  label="Type of product"
                  error={false}
                  required={true}
                  options={[{eid:1,name:"Subscription Product"},{eid:0,name:"Normal Product"}]}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="subscription_day"
                  placeholder="Subscription product"
                  value={inputs.subscription_day?inputs.subscription_day:""}
                  label="Subscription Days"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item md={8}></Grid>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Price and order requirement</h6>
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="A2Z Cost Price"
                  name="atz_cost_price"
                  required={true}
                  error={false}
                  value={inputs.atz_cost_price?inputs.atz_cost_price:""}
                  placeholder="Please enter supplier price"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="A2Z Selling Price"
                  name="atz_selling_price"
                  required={false}
                  error={false}
                  value={inputs.atz_selling_price?inputs.atz_selling_price:""}
                  placeholder="Please enter profite"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="MRP"
                  name="mrp"
                  required={true}
                  error={false}
                  value={inputs.mrp?inputs.mrp:""}
                  placeholder="Please MRP"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sx={4} md={6}>
                <CustomText
                  label="Min Order Quantity"
                  name="min_order_quantity"
                  required={true}
                  error={false}
                  value={inputs.min_order_quantity?inputs.min_order_quantity:""}
                  placeholder="Please enter quantity"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* image is left */}

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="name"
                  style={{ margin: '15px 5px' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="name"
                  style={{ margin: '15px 5px', boxShadow: 'none' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default AddProduct
