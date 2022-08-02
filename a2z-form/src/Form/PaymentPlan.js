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

//custom component imports

import { CustomText, CustomSelect } from "../Helper/Helper";

//main function starts here
function PaymentPlan() {
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
                  <h1 className="">Payment Plan</h1>
                </div>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <h3>Cost of Hardware</h3>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-5">
              <Grid item md={12} className="align-center">
                <div>
                  <h4 className="p-0 m-0">
                    Number of Point of sales needed (includes monitor, printer,
                    scanner)<sup>*</sup>
                  </h4>
                </div>
              </Grid>
              <Grid item md={12}>
                <FormControl className="custom-radio">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {[
                      "1 POS - $999",
                      "2 POS - $1899",
                      "3 POS - $2673",
                      "4 POS - $3348",
                      "5 POS - $3915",
                      "6 POS - $4374",
                      "Other",
                    ].map((value, key) => {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Radio
                              name="ownership"
                              value={value}
                              checked={
                                inputs.ownership && inputs.ownership == value
                                  ? "checked"
                                  : ""
                              }
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label={value}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item md={12} className="align-center">
                <div>
                  <h4 className="p-0 m-0">
                    Cost of additional hardware<sup>*</sup>
                  </h4>
                </div>
              </Grid>
              <Grid item md={12}>
                <FormControl className="custom-radio">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {[
                      "Label Printer - $100",
                      "Receipt printer - $199",
                      "Scanner - $199",
                      "Battery backup System - $99",
                      "Premium protection - $119.95",
                      "Not at moment",
                      "Other",
                    ].map((value, key) => {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Radio
                              name="ownership"
                              value={value}
                              checked={
                                inputs.ownership && inputs.ownership == value
                                  ? "checked"
                                  : ""
                              }
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label={value}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item md={12} className="align-center">
                <div>
                  <h4 className="p-0 m-0">
                    Full payment amount one time<sup>*</sup>
                  </h4>
                </div>
              </Grid>
              <Grid item md={12}>
                <FormControl className="custom-radio">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {[
                      "Check payable at A2Z address",
                      "Credit card (3% fee)",
                      "Monthly payment - amount(Monthly $99.99 (for 12 months))",
                    ].map((value, key) => {
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Radio
                              name="ownership"
                              value={value}
                              checked={
                                inputs.ownership && inputs.ownership == value
                                  ? "checked"
                                  : ""
                              }
                              onChange={(e) => handleChange(e)}
                            />
                          }
                          label={value}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
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
export default PaymentPlan;
