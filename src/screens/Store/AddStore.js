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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
//custom styling imports
//cutom component imports
import MainBoard from 'src/components/include/MainBoard'
import { addStore, getStore, updateStore } from 'src/services/StoreService'
import { validate } from 'src/helper/validation'
import { CustomEmail, CustomText, CustomPhone, CustomTimeInput } from 'src/helper/helper'
import { Box } from '@mui/system'

//main function starts here
function AddStore() {
  const getState = useSelector((state) => state)
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  //states
  const { eid } = useParams()
  const [inputs, setInputs] = useState({
    status: 0,
    merchant_id: '211019041655',
    eid: 'TmpaOGZGSlFRbTV2VUVscFVGcFZlWEI2VUdWS1kwSnNWR1ZvUnpWemNXMXdWMXBLTWs5b2VIaG9UbnB5YW1NPQ==',
  })

  const [open, setOpen] = useState(false)
  const [errors, setErros] = useState(false)

  //chnage of value in form fields
  const handleChange = (event,extra={}) => {
    if(extra.day){
      const value = event.target.value
      if(inputs.business_hours==undefined){
        inputs.business_hours={}
      } 
      if(inputs.business_hours[extra.day]==undefined){
        inputs.business_hours[extra.day]={}
      }
      setInputs((values) => ({ ...values, business_hours: {...values.business_hours,[extra.day]:{...values['business_hours'][extra.day],[extra.index]: value}} }))  
    } else{
      const name = event.target.name
      const value = event.target.value  
      setInputs((values) => ({ ...values, [name]: value }))

    }
    
  }
  //const [validated, setValidated] = useState(false);
  //fucntion for handling form submission
        
  const submitHandler = async (e) => {
    var inputData = {}   
    console.log("73")
    console.log(inputData);
    e.preventDefault()
    

    let allerrors = validate(inputs, {electrical_outlets:"required"})
   
    let response

    if (Object.keys(allerrors).length === 0) {
        console.log("53")
       
        console.log(inputs['business_hours[monday][0]']);
        if (eid) {
          console.log('update will done')
          response = await updateStore(userInfo, inputs)
        } else {
          console.log('add will done')
          response = await addStore(userInfo, inputs)
        } 
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
    setErros(allerrors)
  }

  //time data

  //fetch
  const getStoreData = async () => {
    let storedata=await getStore(userInfo,eid);
    
    setInputs({...storedata.data.store,business_hours: JSON.parse(storedata.data.store.business_hours)})
    //console.log(storedata.data.store)

  }

  const handleClose = () => {
    setOpen(false)
    navigate('../stores', { replace: true })
  }

  //rendering
  useEffect(() => {
    if(eid){
      getStoreData()
    }
  }, [])

  //placeholders
  const namePlaceholder = 'Please enter your name'
  const emailPlaceholder = 'Please enter your e-mail'
  const locationPlaceholder = 'Please enter location'
  const phonePlaceholder = 'Please enter phone number'
  const categoryPlaceholder = 'Please enter store category'

  return (
    <MainBoard>
      {console.log(inputs)}
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
          <form onSubmit={(e) => submitHandler(e)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Store Detail</h6>
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="store_name"
                  placeholder={namePlaceholder}
                  value={inputs.store_name ? inputs.store_name : ''}
                  label="Store Name"
                  error={errors}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="store_address_1"
                  placeholder={locationPlaceholder}
                  value={inputs.store_address_1 ? inputs.store_address_1 : ''}
                  label="Store Location"
                  error={errors}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomPhone
                  label="No. of devices"
                  name="no_of_device"
                  required={true}
                  value={inputs.no_of_device ? inputs.no_of_device : ''}
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="store_category"
                  placeholder={categoryPlaceholder}
                  value={inputs.store_category ? inputs.store_category : ''}
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
                  name="store_contact"
                  required={true}
                  value={inputs.store_contact ? inputs.store_contact : ''}
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomEmail
                  label="Email"
                  name="store_email"
                  required={true}
                  value={inputs.store_email ? inputs.store_email : ''}
                  error={false}
                  placeholder={emailPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              {/* Q. business hour */}
              {/* monday starts */}
              
              {['monday','tuesday','wednesday','thursday','friday','saturday'].map((value) => {

                return (
                    <>
                    <Grid item xs={2}>
                        <Box className="custom-time-box">
                          <Typography variant="h6" align="center" component="div">
                            {value}:
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <CustomTimeInput
                          label="From:"
                          name="business_hours"
                          value={inputs?.business_hours?.[value]?.[0]}
                          handleChange={(e) => handleChange(e,{day:value,index:"0"})}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomTimeInput
                          label="To:"
                          name="business_hours"
                          value={inputs?.business_hours?.[value]?.[1]}
                          handleChange={(e) => handleChange(e,{day:value,index:"1"})}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      </>
                      )

               }) }

              
              <Grid item xs={2}></Grid>
              {/* sun ends*/}

              {/* Q. Point of sale  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0"> What is your current point of sale?</p>
                      
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        [
                          {name: 'cashRegister', label: 'Cash Register'},
                          {name: 'pos', label: 'POS'}
                        ]
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="current_point_sale"
                          value={value.name}
                          control={<Radio checked={inputs.current_point_sale && inputs.current_point_sale == value.name ? 'checked' : ''} />}
                          label={value.label}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>

              {/* Q. inventory database  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Do you have an inventory database?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        [
                          {name: 'yes', label: 'Yes'},
                          {name: 'no', label: 'No'}
                        ]
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="inventory_database"
                          value={value.name}
                          control={<Radio checked={inputs.inventory_database && inputs.inventory_database == value.name ? 'checked' : ''} />}
                          label={value.label}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Number of Items  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Number of Items?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        ['0-1000','1000-5000','10000+']
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="no_sale_item"
                          value={value}
                          control={<Radio checked={inputs.no_sale_item && inputs.no_sale_item == value ? 'checked' : ''} />}
                          label={value}
                        />
                        )
                        })
                      } 

                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Number of employees  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Number of Employee?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        ['0-5','6-10','10-20','20+']
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="no_employee"
                          value={value}
                          control={<Radio checked={inputs.no_employee && inputs.no_employee == value ? 'checked' : ''} />}
                          label={value}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Square footage  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Square Footage?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        [
                          {name: '500-700', label: '500-700 sq.ft.'},
                          {name: '800-1200', label: '800-1200 sq.ft.'},
                        ]
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="square_footage"
                          value={value.name}
                          control={<Radio checked={inputs.square_footage && inputs.square_footage == value.name ? 'checked' : ''} />}
                          label={value.label}
                        />
                        )
                        })
                      }
                      
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. no_paper_role_per_week  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Number of rolls of paper used per week?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        ['1-3','3-6','6-8']
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="no_paper_role_per_week"
                          value={value}
                          control={<Radio checked={inputs.no_paper_role_per_week && inputs.no_paper_role_per_week == value ? 'checked' : ''} />}
                          label={value}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Average monthly gross */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Average Monthly Gross?</p>
                  <CustomText
                    handleChange={(e) => handleChange(e)}
                    className="custom-form-padding"
                    name="average_monthly_gross"
                    placeholder="$ 00"
                    value={inputs.average_monthly_gross ? inputs.average_monthly_gross : ''}
                    label=""
                    error={false}
                    required={true}
                  />
                </div>
              </Grid>
              {/* Q. Internet connection  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Internet Connections?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        [
                          {name: 'wired', label: 'Wired'},
                          {name: 'wireless', label: 'Wireless'},
                          {name: 'both', label: 'Both'}
                        ]
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="internet_connections"
                          value={value.name}
                          control={<Radio checked={inputs.internet_connections && inputs.internet_connections == value.name ? 'checked' : ''} />}
                          label={value.label}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Electrical Outlets */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Electrical Outlets?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>

                      {
                        ['1-3','4-8','9-15']
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="electrical_outlets"
                          value={value}
                          error
                          control={<Radio checked={inputs.electrical_outlets && inputs.electrical_outlets == value ? 'checked' : ''} />}
                          label={value}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Counter Space */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0">Counter Space?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" onChange={handleChange}>
                      {
                        [
                          {name: 'yes', label: 'Yes'},
                          {name: 'no', label: 'No'}
                        ]
                        .map((value, key) => {
                        return (
                        <FormControlLabel
                          key={key}
                          name="counter_space"
                          value={value.name}
                          control={<Radio checked={inputs.counter_space && inputs.counter_space == value.name ? 'checked' : ''} />}
                          label={value.label}
                        />
                        )
                        })
                      } 
                    </RadioGroup>
                  </FormControl>
                </div>
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
