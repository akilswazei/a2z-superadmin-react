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
          <h6 className="p-0 ">Add User</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-error"
                  label="Name"
                  name="name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-error"
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-error"
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  error={errors.confirm_password ? true : false}
                  required
                  id="outlined-error"
                  label="Confirm password"
                  name="confirm_password"
                  type="password"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
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
                  id="demo-simple-select-helper"
                  value={inputs.role}
                  label="Status"
                  name="status"
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
