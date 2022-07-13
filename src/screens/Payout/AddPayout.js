/* eslint-disable prettier/prettier */
//react imports
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Container, Button, Grid } from '@material-ui/core'
//custom components imports
import MainBoard from 'src/components/include/MainBoard'
import { CustomText } from 'src/helper/helper'
import { addPayouts, getPayouts } from 'src/services/PayoutService'

//main function starts here
function AddPayout() {
  const getState = useSelector((state) => state)
  //navigate fucntion
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [payouts, setPayouts] = useState({})
  const [open, setOpen] = useState(false)
  const [errors, setErros] = useState(false)
  const [progress, setProgress] = useState(0)

  //fucntion to handle value change in forms
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInputs((values) => ({ ...values, [name]: value }))
  }

  //function to handle form submit
  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputs.password == inputs.confirm_password) {
      setErros({ ...errors, confirm_password: '' })
      await addPayouts(userInfo, inputs)
      setOpen(true)
    } else {
      setErros({ ...errors, confirm_password: 'password not matched' })
    }
  }

  //fetch function
  const getPayoutData = async () => {
    setPayouts(await getPayouts(userInfo))
  }

  //function for modal close button
  const handleClose = () => {
    setOpen(false)
    navigate('../payouts', { replace: true })
  }

  //render function for fetch function
  useEffect(() => {
    getPayoutData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
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
          <h6>Add Payout</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="payout-name"
                  placeholder="Please enter name"
                  id="payout-name"
                  value=""
                  label="Payout Name"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="payout-name"
                  placeholder="Please enter nick name"
                  value=""
                  label="Payout Nickname"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="payout-name"
                  placeholder="Subscription payout"
                  value=""
                  label="Type of payout"
                  error={false}
                  required={true}
                />
              </Grid>

              <Grid item sx={4} md={4}>
                <CustomText
                  label="Unit in a Package"
                  name="unit"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Pack of 1"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={4}>
                <CustomText
                  label="Size"
                  name="size"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Please enter size"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={4}>
                <CustomText
                  label="Supplier"
                  name="supplier"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Please select supplier"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={4}>
                <CustomText
                  label="Brand"
                  name="brand"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Please select brand"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={8}></Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="Supplier Price"
                  name="supplier-price"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Please enter supplier price"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="Margin Profit in Store (in %)"
                  name="profit"
                  required={false}
                  error={false}
                  value=""
                  placeholder="Please enter profite"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="Store Sell Price"
                  name="sell-price"
                  required={true}
                  error={false}
                  value=""
                  placeholder="Please enter store sell price"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={4} md={6}>
                <CustomText
                  label="Discount"
                  name="discount"
                  required={false}
                  error={false}
                  value=""
                  placeholder="Please enter discount"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sx={4} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="is E-commerce Payout?" />
                </FormGroup>
              </Grid>
              <Grid item md={12}>
                <FormControlLabel disabled control={<Checkbox />} label="Container Deposite" />
                <FormControlLabel disabled control={<Checkbox />} label="FAX" />
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <CustomText
                    label="Combo name"
                    name="combo-name"
                    required={false}
                    error={false}
                    value=""
                    placeholder="Please enter combo name"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item md={4}>
                  <CustomText
                    label="Units in a Combo"
                    name="units"
                    required={false}
                    error={false}
                    value=""
                    placeholder="Please enter units in combo"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item md={4}>
                  <CustomText
                    label="Combo Price"
                    name="combo-price"
                    required={false}
                    error={false}
                    value=""
                    placeholder="Please enter units combo price"
                    handleChange={(e) => handleChange(e)}
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
export default AddPayout
