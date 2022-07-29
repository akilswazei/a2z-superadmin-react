/* eslint-disable prettier/prettier */
//react imports
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

//material UI imports
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Container, Button, Grid } from '@material-ui/core'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

//custom component imports
import { getRoles } from 'src/services/RolesServices'
import { addMerchant, updateMerchant, getMerchant } from 'src/services/MerchantService'
import MainBoard from 'src/components/include/MainBoard'
import { validate } from 'src/helper/validation'
import { CustomText, CustomSelect } from 'src/helper/helper'

//main function starts here
function AddMerchant() {
  const getState = useSelector((state) => state)

  //naviagte fucntion
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  const { eid } = useParams()
  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [roles, setRoles] = useState({})
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState(false)

  //function for handling chnages in input data
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  //fucntion h=for handling submission of form
  const submitHandler = async (e) => {
    e.preventDefault()
    let allerrors = validate(inputs, { authorize_person_first_name: 'required' })
    console.log(allerrors)
    if (Object.keys(allerrors).length === 0) {
      let response
      if (eid) {
        console.log('update will done')
        response = await updateMerchant(userInfo, inputs)
      } else {
        response = await addMerchant(userInfo, inputs)
      }
      if (response.data && Object.keys(response.data).length != 0) {
        allerrors = response.data
        console.log(allerrors)
        Object.keys(allerrors).forEach(function (ckey) {
          allerrors[ckey] = allerrors[ckey].join()
          //console.log(allerrors[ckey])
        })
      } else {
        setOpen(true)
      }
    }
    // filter:  needs to map if field name is not matching  with api parameters
    setErros(allerrors)
  }

  const handleClose = () => {
    setOpen(false)
    navigate('../merchants', { replace: true })
  }

  

  useEffect(() => {
    ;(async () => {
      setRoles(await getRoles(userInfo))
    })()
    if (eid) {
      ;(async () => {
        const beforeUpdateData = await getMerchant(userInfo, eid)
        setInputs(beforeUpdateData.data.merchant)
      })()
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
          <h6>Add Merchant</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Merchant Details</h6>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sx={8} md={8}>
                  <CustomText
                    label="Legal Business Name of Entity"
                    name="legal_business_name"
                    error={errors}
                    value={inputs.legal_business_name ? inputs.legal_business_name : ''}
                    placeholder="A AND B MARKET PLUS, INC"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Fedral Tax ID"
                    name="federl_tax_id"
                    required={true}
                    error={errors}
                    value={inputs.federl_tax_id ? inputs.federl_tax_id : ''}
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={8} md={8}>
                  <CustomText
                    label="Doing Business as (DBA)"
                    name="doing_business_name"
                    required={true}
                    error={errors}
                    value={inputs.doing_business_name ? inputs.doing_business_name : ''}
                    placeholder="CAMPUS AND LIQUOR"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="State Tax ID"
                    name="state_tax_id"
                    required={true}
                    error={errors}
                    value={inputs.state_tax_id ? inputs.state_tax_id : ''}
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={12} md={12}>
                  <CustomText
                    label="Address"
                    name="address"
                    required={true}
                    error={errors}
                    value={inputs.address ? inputs.address : ''}
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="City"
                    name="city"
                    required={true}
                    error={errors}
                    value={inputs.city ? inputs.city : ''}
                    placeholder="SAN DIEGO"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="State"
                    name="state"
                    required={true}
                    error={errors}
                    value={inputs.state ? inputs.state : ''}
                    placeholder="CA"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={6} md={4}>
                  <CustomText
                    label="Zip Code"
                    name="zip_code"
                    required={true}
                    error={errors}
                    value={inputs.zip_code ? inputs.zip_code : ''}
                    placeholder="A2DE10"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Business Phone Number"
                    name="business_phone_number"
                    required={false}
                    error={errors}
                    value={inputs.business_phone_number ? inputs.business_phone_number : ''}
                    placeholder="709-999-9999"
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Cell Phone"
                    name="mobile_no"
                    required={true}
                    error={errors}
                    value={inputs.mobile_no ? inputs.mobile_no : ''}
                    placeholder=""
                    handleChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sx={4} md={4}>
                  <CustomText
                    label="Website/URL"
                    name="website"
                    required={false}
                    error={errors}
                    value={inputs.website ? inputs.website : ''}
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
              <Grid item md={12}>
                <FormControl className="custom-radio">
                  <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    {['sole-proprietor', 'partnership', 'corporation', 'other'].map((value, key) => {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Radio
                              name="ownership"
                              value={value}
                              checked={inputs.ownership && inputs.ownership == value ? 'checked' : ''}
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label="Sole Proprietor"
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item sx={6} md={4}>
                <CustomSelect
                  label="Title"
                  name="authorize_person_title"
                  error={errors}
                  value={inputs.authorize_person_title ? inputs.authorize_person_title : ''}
                  placeholder="Manager"
                  options={[
                    { eid: 'manager', name: 'Manager' },
                    { eid: 'owner', name: 'Owner' },
                  ]}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sx={6} md={4}>
                <CustomText
                  label="First Name"
                  name="authorize_person_first_name"
                  required={true}
                  error={errors}
                  value={inputs.authorize_person_first_name ? inputs.authorize_person_first_name : ''}
                  placeholder="Luis"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Last Name"
                  name="authorize_person_last_name"
                  required={true}
                  error={errors}
                  value={inputs.authorize_person_last_name ? inputs.authorize_person_last_name : ''}
                  placeholder="Brown"
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Email"
                  name="authorize_person_email"
                  required={true}
                  error={errors}
                  value={inputs.authorize_person_email ? inputs.authorize_person_email : ''}
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sx={6} md={4}>
                <CustomText
                  label="Phone"
                  name="authorize_person_phone_no"
                  required={true}
                  error={errors}
                  value={inputs.authorize_person_phone_no ? inputs.authorize_person_phone_no : ''}
                  placeholder=""
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item sx={6} md={4}>
                <CustomText
                  label="Fax No."
                  name="authorize_person_fax_no"
                  required={true}
                  error={errors}
                  value={inputs.authorize_person_fax_no ? inputs.authorize_person_fax_no : ''}
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
