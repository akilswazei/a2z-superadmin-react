import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

//custom inports
import MerchantInfo from "./MerchantInfo";
import BusinessInfo from "./BusinessInfo";
// import PaymentPlan from "./PaymentPlan";
import ProductList from "./ProductList";

const steps = ["Step 1", "Step 2", "Step 3"];

export default function Form() {
  const [activeStep, setActiveStep] = React.useState(1);

  const [number, setNumber] = React.useState(0);
  const [stepProp, setStepProp] = React.useState();
  const [optional, setOptional] = React.useState();

  const isStepOptional = (number) => {
    return number === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log(activeStep);
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ margin: "3em 3em 0.5em 3em" }}>
        {steps.map((label, index) => {
          return (
            <Step key={label} {...stepProp}>
              <StepLabel {...optional}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography> */}
          {activeStep === 3 ? <ProductList /> : ""}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "center",
              alignItems: "end",
              margin: "auto 0 3em 0",
              height: "50vh",
            }}
          >
            {/* <Box sx={{ flex: "1 1 auto" }} /> */}
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {activeStep === 1 ? <MerchantInfo /> : ""}
          {activeStep === 2 ? <BusinessInfo /> : ""}
          {/* {activeStep === 3 ? <PaymentPlan />: '' } */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "center",
              margin: "0.5em 2em",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                mr: 1,
                border: "1px solid black",
              }}
            >
              Back
            </Button>
            {/* <Box sx={{ flex: "1 1 auto" }} /> */}

            <Button
              onClick={handleNext}
              sx={{
                mr: 1,
                border: "1px solid #1976D2",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
