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
import { CustomEmail, CustomPasssword, CustomText } from 'src/helper/Helper'

function AddTeam() {
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
          <h6>Add Users</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Basic Infomation</h6>
              </Grid>
              <Grid item xs={6}>
                {/* <h6 className="color-gray">
                  Name<sup>*</sup>
                </h6>
                <TextField
                  className="custom-form-field"
                  required
                  id="outlined-error"
                  name="name"
                  variant="outlined"
                  placeholder="Please enter your name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
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
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={inputs.role}
                  label="Role"
                  name="role"
                  defaultValue=""
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={''}>
                    <em>Select Role</em>
                  </MenuItem>
                  {roles?.data?.map((role, key) => {
                    return (
                      <MenuItem key={key} value={role.eid}>
                        {role.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </Grid>

              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper1"
                  value={inputs.role}
                  label="Status"
                  name="status"
                  defaultValue=""
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={''}>
                    <em>Select Status</em>
                  </MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>Inactive</MenuItem>
                </Select>
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
