/* eslint-disable prettier/prettier */
//react imports
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import { Container, Button, InputLabel, MenuItem, Select, Grid } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@material-ui/styles'
import { InputBase } from '@mui/material'
//custom style imports
//custom component imports
import { getRoles } from 'src/services/RolesServices'
import { addTeam } from 'src/services/TeamServices'
import MainBoard from 'src/components/include/MainBoard'
import { CustomEmail, CustomPasssword, CustomText, CustomPhone } from 'src/helper/helper'

//main function
function AddTeam() {
  const getState = useSelector((state) => state)
  //navigator
  let navigate = useNavigate()
  //redux
  const {
    userSignin: { userInfo },
  } = getState
  //states
  const [inputs, setInputs] = useState({ status: 1 })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState({})

  //fetch
  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  //events starts here
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
      await addTeam(userInfo, inputs)

      setOpen(true)
    } else {
      setErros({ ...errors, confirm_password: 'password not matched' })
    }
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../teams', { replace: true })
  }
  //events ends here

  //re-rendrer
  useEffect(() => {
    getRolesData()
  }, [])

  //placeholders
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
          <h6>Add Teams</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Add Company</h6>
              </Grid>
              <Grid item xs={6}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="name"
                  placeholder={namePlaceholder}
                  id="name"
                  value=""
                  label="Name"
                  error={false}
                  required={true}
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
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Team Admin User</h6>
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
export default AddTeam
