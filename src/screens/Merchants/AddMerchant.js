/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addUser } from 'src/services/UserServices'
import MainBoard from 'src/components/include/MainBoard'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
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
import { CustomDate, CustomEmail, CustomPasssword, CustomText } from 'src/helper/helper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
function AddMerchant() {
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputs.password == inputs.confirm_password) {
      setErros({ ...errors, confirm_password: '' })
      await addUser(userInfo, inputs)
      setOpen(true)
    } else {
      setErros({ ...errors, confirm_password: 'password not matched' })
    }
  }

  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../users', { replace: true })
  }

  useEffect(() => {
    getRolesData()
  }, [])
  const namePlaceholder = 'Please enter your name'
  const emailPlaceholder = 'Please enter your e-mail'
  const passwordPlaceholder = 'Please enter password'
  const confirmPasswordPlaceholder = 'Please re-enter password'

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
          <h6>Add Merchant</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Merchant Details</h6>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sx={8} md={8}>
                  <CustomText
                    label="Legal Business Name of Entity"
                    name="business-name"
                    required={true}
                    error={false}
                    value=""
                    placeholder="A AND B MARKET PLUS, INC"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Fedral Tax ID"
                    name="status"
                    required={true}
                    error={false}
                    value=""
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={8} md={8}>
                  <CustomText
                    label="Doing Business as (DBA)"
                    name="dba"
                    required={true}
                    error={false}
                    value=""
                    placeholder="CAMPUS AND LIQUOR"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="State Tax ID"
                    name="status"
                    required={true}
                    error={false}
                    value=""
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={12} md={12}>
                  <CustomText
                    label="Address"
                    name="address"
                    required={true}
                    error={false}
                    value=""
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="City"
                    name="city"
                    required={true}
                    error={false}
                    value=""
                    placeholder="SAN DIEGO"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="State"
                    name="state"
                    required={true}
                    error={false}
                    value=""
                    placeholder="CA"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="Zip Code"
                    name="zip-code"
                    required={true}
                    error={false}
                    value=""
                    placeholder="A2DE10"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Business Phone Number"
                    name="business_name"
                    required={false}
                    error={false}
                    value=""
                    placeholder="709-999-9999"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Cell Phone"
                    name="business_name"
                    required={true}
                    error={false}
                    value=""
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Website/URL"
                    name="website"
                    required={false}
                    error={false}
                    value=""
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-5">
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Authorize Person to contact</h6>
              </Grid>

              <Grid item sx={6} md={4}>
                <CustomText
                  label="First Name"
                  name="first-name"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Luis"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Last Name"
                  name="last-name"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Brown"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Email"
                  name="email"
                  required={true}
                  error={false}
                  value=""
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Title"
                  name="title"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Manager"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Phone"
                  name="phone-2"
                  required={true}
                  error={false}
                  value=""
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Fax No."
                  name="fax"
                  required={true}
                  error={false}
                  value=""
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={4} className="align-center">
                <div>
                  <h6 className="p-0 m-0">
                    Type of Ownership :<sup>*</sup>
                  </h6>
                </div>
              </Grid>
              <Grid item md={8}>
                <FormControl className="custom-radio">
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="sole-proprietor" control={<Radio />} label="Sole Proprietor" />
                    <FormControlLabel value="partnership" control={<Radio />} label="Partnership" />
                    <FormControlLabel value="corporation" control={<Radio />} label="Corpration" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button type="submit" variant="outlined" color="primary" className="name" style={{ margin: '15px 5px' }}>
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
          </form>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default AddMerchant
