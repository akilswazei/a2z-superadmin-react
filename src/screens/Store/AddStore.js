/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from "src/services/RolesServices";
import { addStore } from "src/services/StoreService";
import MainBoard from 'src/components/include/MainBoard'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Button, Icon, TextField, Paper, Typography,Grid } from "@material-ui/core";

function AddStore() {

    const getState = useSelector(state => state);
    const navigate = useNavigate();

    const {userSignin: { userInfo }} = getState

    const [inputs, setInputs] = useState({status:1,merchant_id: "211019041655"});
    const [roles, setRoles] = useState({});
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    //const [validated, setValidated] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(inputs)
       await addStore(userInfo,inputs);
       setOpen(true);
    }

    const getRolesData = async () => {
        setRoles(await getRoles(userInfo));
     }

     const handleClose = () => {
        setOpen(false);
        navigate("../stores", { replace: true });
      };

     useEffect(() => {
        getRolesData();
      }, []);

  return (
    <MainBoard>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Successfully Submitted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

        <Container fluid className="background-theme-purple">
            <Container className="background-white-theme p-4">
                <h1>Teams</h1>
                <form onSubmit={submitHandler} >
                    <h3>Company Details</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Store Name"
                                name="store_name"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Location"
                                name="store_address_1"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="No. of Device"
                                name="no_of_device"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Store Category"
                                name="store_category"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Phone"
                                name="store_contact"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        
                        <Grid item xs={4}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Email"
                                name="store_email"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>


                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="name"
                            >Submit</Button>  
                        </Grid>
                    
                    </Grid>
                </form>
           
            </Container>
        </Container> 
    </MainBoard>      
  )
}
export default AddStore