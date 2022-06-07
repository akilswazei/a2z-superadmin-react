/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addTeam } from 'src/services/TeamServices'
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
function AddTeam() {
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
      await addTeam(userInfo, inputs)

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
    navigate('../teams', { replace: true })
  }

  useEffect(() => {
    getRolesData()
  }, [])
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: (theme.palette.mode = 'light'),
      border: '1px solid #ced4da',
      fontSize: 16,
      Width: 'auto',
      padding: '10px 12px',
    },
  }))
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
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Company Name"
                  name="company_name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
                <InputLabel shrink htmlFor="bootstrap-input">
                  Name*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Company Name"
                  name="company_name"
                  fullWidth={true}
                  placeholder="Please enter company name"
                  onChange={(e) => handleChange(e)}
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
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Email"
                  name="company_email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Email"
                  name="company_email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter company email address"
                />
              </Grid>
              <Grid item xs={6}>
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Phone"
                  name="company_mobile"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
                <InputLabel shrink htmlFor="bootstrap-input">
                  Phone*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Phone"
                  name="company_mobile"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter company contact"
                />
              </Grid>

              <Grid item xs={6}>
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Address"
                  name="company_address"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
                <InputLabel shrink htmlFor="bootstrap-input">
                  Address*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Address"
                  name="company_address"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter company address"
                />
              </Grid>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Team Admin User</h6>
              </Grid>

              <Grid item xs={6}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Name*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter name"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>

              <Grid item xs={6}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Email*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Email"
                  name="email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter email"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Email"
                  name="email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>

              <Grid item xs={6}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Password*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Password"
                  name="password"
                  fullWidth={true}
                  type="password"
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter password"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Password"
                  name="password"
                  fullWidth={true}
                  type="password"
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>

              <Grid item xs={6}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Confirm Password*
                </InputLabel>
                <BootstrapInput
                  error={errors.confirm_password ? true : false}
                  id="outlined-error"
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  helperText={errors.confirm_password && errors.confirm_password}
                  placeholder="Please re-enter password"
                />
                {/* <TextField
                  error={errors.confirm_password ? true : false}
                  id="outlined-error"
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  helperText={errors.confirm_password && errors.confirm_password}
                /> */}
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
export default AddTeam
