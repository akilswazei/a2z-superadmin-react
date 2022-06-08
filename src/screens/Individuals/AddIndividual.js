/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addIndividual } from 'src/services/IndividualService'
import MainBoard from 'src/components/include/MainBoard'
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
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@material-ui/styles'
import { InputBase } from '@mui/material'
import { CustomEmail, CustomPasssword, CustomText, CustomPhone } from 'src/helper/Helper'

function AddIndividual() {
  const getState = useSelector((state) => state)
  let navigate = useNavigate()
  const {
    userSignin: { userInfo },
  } = getState

  const [inputs, setInputs] = useState({ status: 1 })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState({})

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(inputs)
    if (inputs.password == inputs.confirm_password) {
      setErros({ ...errors, confirm_password: '' })
      await addIndividual(userInfo, inputs)

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
    navigate('../individuals', { replace: true })
  }

  useEffect(() => {
    getRolesData()
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
          <h6>Add Freelancer</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Details</h6>
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="name"
                  placeholder={namePlaceholder}
                  value=""
                  label="Name"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6}>
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

              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">Hire Type</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={inputs.hire_for}
                  label="Hire For"
                  name="hire_for"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={'sale'}>Sale</MenuItem>
                  <MenuItem value={'support'}>Support</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <CustomPhone
                  label="Phone"
                  name="phone"
                  required={true}
                  value=""
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="Address"
                  placeholder={addressPlaceholder}
                  value=""
                  label="Address"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomPasssword
                  label="Password"
                  name="password"
                  required={true}
                  value=""
                  error={false}
                  placeholder={passwordPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomPasssword
                  label="Confirm password"
                  name="email"
                  required={true}
                  error={false}
                  value=""
                  placeholder={confirmPasswordPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button type="submit" variant="outlined" color="primary" className="name" style={{ margin: '5px' }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="name"
                  style={{ margin: '5px', boxShadow: 'none' }}
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
export default AddIndividual
