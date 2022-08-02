//react imports
import React, { useEffect, useState } from "react";

//material UI imports
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Container, Button, Grid } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

//custom component imports

import {
  CustomText,
  CustomSelect,
  CustomPhone,
  CustomTimeInput,
  CustomEmail,
} from "../Helper/Helper";

//main function starts here
function BusinessInfo() {
  const [inputs, setInputs] = useState({
    status: 1,
    merchant_id: "211019041655",
  });
  const [open, setOpen] = React.useState(false);
  const [errors, setErros] = React.useState(false);

  //function for handling chnages in input data
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //const [validated, setValidated] = useState(false);
  //fucntion h=for handling submission of form
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //placeholders
  const namePlaceholder = "Please enter your name";
  const emailPlaceholder = "Please enter your e-mail";
  const locationPlaceholder = "Please enter location";
  const phonePlaceholder = "Please enter phone number";
  const categoryPlaceholder = "Please enter store category";

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Successfully Submitted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Container fluid>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <div className="custom-align-h">
                  <h1 className="">2. Business Information</h1>
                </div>
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="name"
                  placeholder={namePlaceholder}
                  value={inputs.name ? inputs.name : ""}
                  label="Store Name"
                  error={false}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="location"
                  placeholder={locationPlaceholder}
                  value={inputs.location ? inputs.location : ""}
                  label="Store Location"
                  error={false}
                  required={true}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomPhone
                  label="No. of devices"
                  name="numberOfDevices"
                  required={true}
                  value={inputs.nod ? inputs.nod : ""}
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomText
                  handleChange={(e) => handleChange(e)}
                  name="storeCategory"
                  placeholder={categoryPlaceholder}
                  value=""
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
                  name="phone"
                  required={true}
                  value={inputs.phone ? inputs.phone : ""}
                  error={false}
                  placeholder={phonePlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomEmail
                  label="Email"
                  name="email"
                  required={true}
                  value={inputs.email ? inputs.email : ""}
                  error={false}
                  placeholder={emailPlaceholder}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              {/* Q. business hour */}
              {/* monday starts */}
              {/* <Grid item xs={2}></Grid> */}
              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Monday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="monday_start"
                  value={inputs.monday_start ? inputs.monday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="monday_end"
                  value={inputs.monday_end ? inputs.monday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* monday ends*/}
              {/* tues starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Tuesday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="tuesday_start"
                  value={inputs.tuesday_start ? inputs.tuesday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="tuesday_end"
                  value={inputs.tuesday_end ? inputs.tuesday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* tues ends*/}
              {/* wed starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Wednesday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="wednesday_start"
                  value={inputs.wednesday_start ? inputs.wednesday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="wednesday_end"
                  value={inputs.wednesday_end ? inputs.wednesday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* wed ends*/}
              {/* thru starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Thursday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="thursday_start"
                  value={inputs.thursday_start ? inputs.thursday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="thursday_end"
                  value={inputs.thursday_end ? inputs.thursday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* thru ends*/}
              {/* fri starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Friday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="friday_start"
                  value={inputs.friday_start ? inputs.friday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="friday_end"
                  value={inputs.friday_end ? inputs.friday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* fri ends*/}
              {/* sat starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Saturday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="friday_start"
                  value={inputs.saturday_start ? inputs.saturday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="saturday_end"
                  value={inputs.saturday_end ? inputs.saturday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* sat ends*/}
              {/* sun starts*/}

              <Grid item xs={2}>
                <Box className="custom-time-box">
                  <Typography
                    variant="h6"
                    align="center"
                    component="div"
                    color="#787F8F"
                    fontWeight={"light"}
                  >
                    Sunday:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="From:"
                  name="sunday_start"
                  value={inputs.sunday_start ? inputs.sunday_start : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTimeInput
                  label="To:"
                  name="saturday_end"
                  value={inputs.ssunday_end ? inputs.sunday_end : ""}
                  handleChange={(e) => handleChange(e)}
                />
              </Grid>

              {/* sun ends*/}

              {/* Q. Point of sale  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">
                    {" "}
                    What is your current point of sale?
                  </p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="current_point_sale"
                        value="cashRegister"
                        control={<Radio />}
                        label="Cash Register"
                      />
                      <FormControlLabel
                        name="current_point_sale"
                        value="pos"
                        control={<Radio />}
                        label="POS"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>

              {/* Q. inventory database  */}
              <Grid item xs={12}>
                <div className="flex-row-left ">
                  <p className="m-0 form-gray">
                    Do you have an inventory database?
                  </p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="inventory_database"
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        name="inventory_database"
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Number of Items  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Number of Items?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="no_sale_item"
                        value="0-1000"
                        control={<Radio />}
                        label="0-1000"
                      />
                      <FormControlLabel
                        name="no_sale_item"
                        value="1000-5000"
                        control={<Radio />}
                        label="1000-5000"
                      />
                      <FormControlLabel
                        name="no_sale_item"
                        value="10000+"
                        control={<Radio />}
                        label="10000+"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Number of employees  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Number of Employee?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="no_employee"
                        value="0-5"
                        control={<Radio />}
                        label="0-5"
                      />
                      <FormControlLabel
                        name="no_employee"
                        value="6-10"
                        control={<Radio />}
                        label="6-10"
                      />
                      <FormControlLabel
                        name="no_employee"
                        value="10-20"
                        control={<Radio />}
                        label="10-20"
                      />
                      <FormControlLabel
                        name="no_employee"
                        value="20+"
                        control={<Radio />}
                        label="More than 20"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Square footage  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Square Footage?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="square_footage"
                        value="500-700"
                        control={<Radio />}
                        label="500-700 Sq ft."
                      />
                      <FormControlLabel
                        name="square_footage"
                        value="800-1200"
                        control={<Radio />}
                        label="800-1200 Sq ft."
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. no_paper_role_per_week  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">
                    Number of rolls of paper used per week?
                  </p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="no_paper_role_per_week"
                        value="1-3"
                        control={<Radio />}
                        label="1-3"
                      />
                      <FormControlLabel
                        name="no_paper_role_per_week"
                        value="3-6"
                        control={<Radio />}
                        label="3-6"
                      />
                      <FormControlLabel
                        name="no_paper_role_per_week"
                        value="6-8"
                        control={<Radio />}
                        label="6-8"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Average monthly gross */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Average Monthly Gross? </p>
                  <h6 className="color-gray form-label">
                    <sup> *</sup>
                  </h6>
                  <div className="form-input-avggross">
                    <CustomText
                      handleChange={(e) => handleChange(e)}
                      className="custom-form-padding "
                      name="average_monthly_gross"
                      placeholder="$ 00"
                      value={inputs.averageIncome ? inputs.averageIncome : ""}
                      label=""
                      error={false}
                    />
                  </div>
                </div>
              </Grid>
              {/* Q. Internet connection  */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Internet Connections?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="internet_connections"
                        value="wired"
                        control={<Radio />}
                        label="Wired"
                      />
                      <FormControlLabel
                        name="internet_connections"
                        value="wireless"
                        control={<Radio />}
                        label="Wireless"
                      />
                      <FormControlLabel
                        name="internet_connections"
                        value="both"
                        control={<Radio />}
                        label="Both"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Electrical Outlets */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Electrical Outlets?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="electrical_outlets"
                        value="1-3"
                        control={<Radio />}
                        label="1-3"
                      />
                      <FormControlLabel
                        name="electrical_outlets"
                        value="4-8"
                        control={<Radio />}
                        label="4-8"
                      />
                      <FormControlLabel
                        name="electrical_outlets"
                        value="9-15"
                        control={<Radio />}
                        label="9-15"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              {/* Q. Counter Space */}
              <Grid item xs={12}>
                <div className="flex-row-left">
                  <p className="m-0 form-gray">Counter Space?</p>
                  <FormControl className="custom-radio custom-form-padding">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        name="counter_space"
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        name="counter_space"
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
            </Grid> */}
          </form>
        </Container>
      </Container>
    </div>
  );
}
export default BusinessInfo;
