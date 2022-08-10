/* eslint-disable prettier/prettier */
//react imports
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
//material UI imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import { Container, Button, Grid } from '@material-ui/core'
//custom style

//custom imports
import { addProduct, updateProduct, getProduct } from 'src/services/ProductService'
import { getSuppliers } from 'src/services/SupplierService'
import { getCategories } from 'src/services/CategoryService'
import MainBoard from 'src/components/include/MainBoard'
import { validate } from 'src/helper/validation'
import { CustomText, CustomSelect, CustomFileUpload } from 'src/helper/helper'
import ImageUpload from '../../helper/ImageUpload'

function AddProduct() {
  let suupliers
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
    media: { fileFields },
  } = getState

  const { eid } = useParams()
  let initialInputState = { status: 1 }

  const [inputs, setInputs] = useState(initialInputState)
  const [suppliers, setSuppliers] = useState([])
  const [categories, setCategories] = useState([])

  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(fileFields)
    console.log(inputs)
    if (inputs.password == inputs.confirm_password) {
      setErrors({ ...errors, confirm_password: '' })
      let saveinfo = inputs
      saveinfo['image'] = fileFields['image_eid']['eid']
      //saveinfo['image'] = fileFields?.image_eid?.eid
      await addProduct(userInfo, saveinfo)
      setOpen(true)
    } else {
      setErrors({ ...errors, confirm_password: 'password not matched' })
    }
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
    const tempSuppliers = []
    const supplier_data = await getSuppliers(userInfo)
    supplier_data?.data?.data.map((value, key) => {
      tempSuppliers.push({ eid: value.eid, name: value.supplier_name })
    })
    setSuppliers(tempSuppliers)
  }
  const get_category_list = async (eid) => {
    const tempCategories = []
    const category_data = await getCategories(userInfo)

    category_data?.data?.data.map((value, key) => {
      tempCategories.push({ eid: value.eid, name: value.category_name })
    })
    setCategories(tempCategories)
  }

  useEffect(() => {
    get_supplier_list()
    get_category_list()

    if (eid) {
      getProductData(eid)
    }
  }, [])

  const namePlaceholder = 'Please enter your name'
  return (
    <MainBoard>
      <ImageUpload />
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
          <form onSubmit={submitHandler} noValidate>
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
                  value={inputs.product_name ? inputs.product_name : ''}
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
                  value={inputs.product_details ? inputs.product_details : ''}
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
                  value={inputs.product_upc ? inputs.product_upc : ''}
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
                  value={inputs.product_sku ? inputs.product_sku : ''}
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
                  value={inputs.quantity ? inputs.quantity : ''}
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
                  value={inputs.manufacturer ? inputs.manufacturer : ''}
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
                  value={inputs.supplier ? inputs.supplier : ''}
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
                  value={inputs.category ? inputs.category : ''}
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
                    value={inputs.is_in_house ? inputs.is_in_house : ''}
                    placeholder="is in house"
                    handleChange={(e) => handleChange(e)}
                    options={[
                      { eid: 1, name: 'In house' },
                      { eid: 0, name: 'marketplace' },
                    ]}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomSelect
                  handleChange={(e) => handleChange(e)}
                  name="is_subscription"
                  placeholder="Product Type"
                  value={inputs.is_subscription ? inputs.is_subscription : ''}
                  label="Type of product"
                  error={false}
                  required={true}
                  options={[
                    { eid: 1, name: 'Subscription Product' },
                    { eid: 0, name: 'Normal Product' },
                  ]}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="subscription_day"
                  placeholder="Subscription product"
                  value={inputs.subscription_day ? inputs.subscription_day : ''}
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
                  value={inputs.atz_cost_price ? inputs.atz_cost_price : ''}
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
                  value={inputs.atz_selling_price ? inputs.atz_selling_price : ''}
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
                  value={inputs.mrp ? inputs.mrp : ''}
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
                  value={inputs.min_order_quantity ? inputs.min_order_quantity : ''}
                  placeholder="Please enter quantity"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid container xs={12}>
                <Grid item xs={3}>
                  <CustomFileUpload
                    handleChange={(e) => handleChange(e)}
                    name="image_eid"
                    placeholder={namePlaceholder}
                    id="image_eid"
                    value={inputs.image_eid ? inputs.image_eid : ''}
                    label="Name"
                    error={false}
                    required={true}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="name"
                  style={{ margin: '15px 5px' }}
                  onClick={() => navigate('../products', { replace: true })}
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
