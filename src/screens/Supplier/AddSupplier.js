/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addSupplier, getSupplier, getSuppliers, updateSupplier } from 'src/services/SupplierService'
import MainBoard from 'src/components/include/MainBoard'
import { useParams } from 'react-router-dom'
import { validate } from 'src/helper/validation'
import { Container, Button, InputLabel, MenuItem, Select, Grid } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { CustomEmail, CustomPasssword, CustomText, CustomPhone } from 'src/helper/helper'

function AddSupplier() {
  const getState = useSelector((state) => state)
  let navigate = useNavigate()
  const {
    userSignin: { userInfo },
  } = getState
  const { eid } = useParams()
  let initialInputState = { status: 1 }

  const [inputs, setInputs] = useState(initialInputState)
  const [suppliers, setSuppliers] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState({})

  console.log(inputs.name)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    let allerrors = validate(inputs, { name: 'required', password: 'required|confirm_password' })
    if (Object.keys(allerrors).length === 0) {
      let response
      if (eid) {
        console.log('update will done')
        response = await updateSupplier(userInfo, inputs)
      } else {
        response = await addSupplier(userInfo, inputs)
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
  const getSupplierData = async () => {
    setSuppliers(await getSuppliers(userInfo))
  }
  const getSuppliersData = async (eid) => {
    const beforeUpdateData = await getSupplier(userInfo, eid)
    setInputs(beforeUpdateData.data.user)
  }
  const handleClose = () => {
    setOpen(false)
    navigate('../individuals', { replace: true })
  }

  useEffect(() => {
    if (eid) {
      getSuppliersData(eid)
    }
    getSupplierData()
  }, [])
  const namePlaceholder = 'Please enter your name'
  const emailPlaceholder = 'Please enter your e-mail'
  const passwordPlaceholder = 'Please enter password'
  const confirmPasswordPlaceholder = 'Please re-enter password'
  const phonePlaceholder = 'Please enter phone number'
  const addressPlaceholder = 'Please enter address'
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
          <h6>Add Suppliers</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Company Information</h6>
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="supplier-name"
                  placeholder={namePlaceholder}
                  value={inputs.name ? inputs.name : ''}
                  label="Supplier Name"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  label="Contact Number"
                  name="contact-number"
                  required={true}
                  value={inputs.phone ? inputs.phone : ''}
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomEmail
                  label="Email"
                  name="email"
                  required={true}
                  value={inputs.email ? inputs.email : ''}
                  error={false}
                  placeholder={emailPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="address"
                  placeholder={addressPlaceholder}
                  value={inputs.address ? inputs.address : ''}
                  label="Address"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  label="Supplier Details"
                  name="supplier-details"
                  required={true}
                  value={inputs.details ? inputs.details : ''}
                  error={false}
                  placeholder="Please enter supplier details"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  label="Supplier Category"
                  name="supplier-category"
                  required={true}
                  value={inputs.category ? inputs.category : ''}
                  error={false}
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} className="mt-4">
                  <h6>Representative Information</h6>
                </Grid>
                <Grid item xs={6}>
                  <CustomText
                    label="Name"
                    name="rep-name"
                    required={true}
                    value={inputs.name ? inputs.name : ''}
                    error={false}
                    placeholder={namePlaceholder}
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomEmail
                    label="Email"
                    name="email"
                    required={true}
                    value={inputs.email ? inputs.email : ''}
                    error={false}
                    placeholder={emailPlaceholder}
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomText
                    handleChange={(e) => handleChange(e)}
                    name="rep-phone"
                    placeholder={phonePlaceholder}
                    value={inputs.phone ? inputs.phone : ''}
                    label="Phone"
                    error={false}
                    required={true}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} className="mt-4">
                  <h6>Supervisor Information</h6>
                </Grid>
                <Grid item xs={6}>
                  <CustomText
                    label="Name"
                    name="rep-name"
                    required={true}
                    value={inputs.name ? inputs.name : ''}
                    error={false}
                    placeholder={namePlaceholder}
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomEmail
                    label="Email"
                    name="email"
                    required={true}
                    value={inputs.email ? inputs.email : ''}
                    error={false}
                    placeholder={emailPlaceholder}
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomText
                    handleChange={(e) => handleChange(e)}
                    name="rep-phone"
                    placeholder={phonePlaceholder}
                    value={inputs.phone ? inputs.phone : ''}
                    label="Phone"
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
export default AddSupplier
