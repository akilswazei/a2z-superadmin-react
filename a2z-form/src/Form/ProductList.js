//react imports
import React, { useEffect, useState } from "react";

//material UI imports
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Container, Button, Grid } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";

//custom component imports
import { CustomText, CustomSelect } from "../Helper/Helper";
import { getProductsList } from "../Service/ProductService";

//main function starts here
function ProductList() {
  const [inputs, setInputs] = useState({
    status: 1,
    merchant_id: "211019041655",
  });
  const [open, setOpen] = React.useState(false);
  const [errors, setErros] = React.useState(false);
  const [productList, setProductList] = React.useState(null);

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
  const getProducts = async () => {
    setProductList(await getProductsList());
  };
  console.log(productList);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
                  <h1 className="">3. Merchant Details</h1>
                </div>
              </Grid>
              <Grid container spacing={2}>
                {productList &&
                  productList?.data.map((product) => (
                    <>
                      <Grid item xs={3}>
                        <div className="imageGrid">
                          <img src={product.imagefile} alt="productImage" />
                          <div className="product-content">
                            <p>{product.product_name}</p>
                          </div>
                          <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            className="btn-group"
                          >
                            <Button>+</Button>
                            <Button>1</Button>
                            <Button>-</Button>
                          </ButtonGroup>
                        </div>
                      </Grid>
                    </>
                  ))}
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
export default ProductList;
