/* eslint-disable prettier/prettier */
//react imports
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Container, Button, Grid } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
//custom styling imports
//cutom component imports
import { getRoles } from 'src/services/RolesServices'
import MainBoard from 'src/components/include/MainBoard'
import { addStore, updateStore } from 'src/services/StoreService'
import { validate } from 'src/helper/validation'
import { CustomEmail, CustomText, CustomPhone } from 'src/helper/helper'

//main function starts here
function AddStore() {
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  //states
  const { eid } = useParams()
  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState(false)

  //chnage of value in form fields
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  //fucntion for handling form submission
  const submitHandler = async (e) => {
    e.preventDefault()
    let allerrors = validate(inputs, {})
    if (Object.keys(allerrors).length === 0) {
      let response
      if (eid) {
        console.log('update will done')
        response = await updateStore(userInfo, inputs)
      } else {
        response = await addStore(userInfo, inputs)
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

  //fetch
  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../stores', { replace: true })
  }

  //rendering
  useEffect(() => {
    getRolesData()
  }, [])

  //placeholders
  const namePlaceholder = 'Please enter your name'
  const emailPlaceholder = 'Please enter your e-mail'
  const locationPlaceholder = 'Please enter location'
  const phonePlaceholder = 'Please enter phone number'
  const categoryPlaceholder = 'Please enter store category'
  const devicePlacerholder = 'Please enter no. of devices'
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
          <h6>Add Store</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Store Detail</h6>
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="name"
                  placeholder={namePlaceholder}
                  value=""
                  label="Store Name"
                  error={false}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="location"
                  placeholder={locationPlaceholder}
                  value=""
                  label="Store Location"
                  error={false}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomPhone
                  label="No. of devices"
                  name="device number"
                  required={true}
                  value=""
                  error={false}
                  placeholder={devicePlacerholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="storeCategory"
                  placeholder={categoryPlaceholder}
                  value=""
                  label="Store Category"
                  error={false}
                  required={true}
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Store Category"
                  name="store_category"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>

              <Grid item xs={4}>
                <CustomPhone
                  label="Store Contact"
                  name="phone"
                  required={true}
                  value=""
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomEmail
                  label="Email"
                  name="email"
                  required={true}
                  value=""
                  error={false}
                  placeholder={emailPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
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
export default AddStore
