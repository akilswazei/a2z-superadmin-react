/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getRoles } from 'src/services/RolesServices'
import { addIndividual, getIndividual, updateIndividual } from 'src/services/IndividualService'
import MainBoard from 'src/components/include/MainBoard'
import { useParams } from 'react-router-dom'
import { validate } from 'src/helper/validation'
import { Container, Button, Grid } from '@material-ui/core'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CustomCheckbox from './CustomCheckbox'

import { CustomEmail, CustomPasssword, CustomText, CustomPhone } from 'src/helper/helper'

function AddRoles() {
  const getState = useSelector((state) => state)
  let navigate = useNavigate()
  const {
    userSignin: { userInfo },
  } = getState
  const { eid } = useParams()
  let initialInputState = { status: 1 }

  const [inputs, setInputs] = useState(initialInputState)
  const [roles, setRoles] = useState({})
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
        response = await updateIndividual(userInfo, inputs)
      } else {
        response = await addIndividual(userInfo, inputs)
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
  const getRolesData = async () => {
    setRoles(await getRoles(userInfo))
  }
  const getIndividualData = async (eid) => {
    const beforeUpdateData = await getIndividual(userInfo, eid)
    setInputs(beforeUpdateData.data.user)
  }
  const handleClose = () => {
    setOpen(false)
    navigate('../roles', { replace: true })
  }

  useEffect(() => {
    if (eid) {
      getIndividualData(eid)
    }
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
          <h6>Add new role</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Details</h6>
              </Grid>

              <Grid item xs={9}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="name"
                  placeholder="Please enter your role"
                  value={inputs.name ? inputs.name : ''}
                  label="Role"
                  error={false}
                  required={true}
                />
              </Grid>
              <Grid container className="my-4 custom-font">
                <Grid xs={12}>
                  <h6>Permissions:</h6>
                </Grid>
                <Grid item xs={8} className="my-2 mx-3">
                  <h6>General:</h6>
                  <CustomCheckbox />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8} className="my-2 mx-3">
                  <h6>Sales:</h6>
                  <CustomCheckbox />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8} className="my-2 mx-3">
                  <h6>Support:</h6>
                  <CustomCheckbox />
                </Grid>
                <Grid item xs={4}></Grid>
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
export default AddRoles
