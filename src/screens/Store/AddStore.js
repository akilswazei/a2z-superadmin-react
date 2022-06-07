/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addStore } from 'src/services/StoreService'
import MainBoard from 'src/components/include/MainBoard'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Container, Button, Icon, TextField, Paper, Typography, Grid, InputLabel } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { InputBase } from '@mui/material'
function AddStore() {
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(inputs)
    await addStore(userInfo, inputs)
    setOpen(true)
  }

  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../stores', { replace: true })
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
          <h6>Add Store</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Store Detail</h6>
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Store Name*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Store Name"
                  name="store_name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store name"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Store Name"
                  name="store_name"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Store location*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Location"
                  name="store_address_1"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store location"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Location"
                  name="store_address_1"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  No. of device*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="No. of Device"
                  name="no_of_device"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store devices"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="No. of Device"
                  name="no_of_device"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>
              <Grid item xs={4}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Store Category*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Store Category"
                  name="store_category"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store category"
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
                <InputLabel shrink htmlFor="bootstrap-input">
                  Store Contact*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Phone"
                  name="store_contact"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store contact"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Phone"
                  name="store_contact"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                /> */}
              </Grid>

              <Grid item xs={4}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Store email*
                </InputLabel>
                <BootstrapInput
                  required
                  id="outlined-error"
                  label="Email"
                  name="store_email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                  placeholder="Please enter store email"
                />
                {/* <TextField
                  required
                  id="outlined-error"
                  label="Email"
                  name="store_email"
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
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
export default AddStore
