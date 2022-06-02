/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from "src/services/RolesServices";
import { addIndividual } from "src/services/IndividualService";
import MainBoard from 'src/components/include/MainBoard'
import { Container, Button, Icon, TextField, Paper, Typography,Grid } from "@material-ui/core";

function AddTeam() {

    const getState = useSelector(state => state);
    const {userSignin: { userInfo }} = getState

    const [inputs, setInputs] = useState({status:1});
    const [roles, setRoles] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values => ({...values, [name]: value}))
    }
    //const [validated, setValidated] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(inputs)
       await addIndividual(userInfo,inputs);
    }

    const getRolesData = async () => {
        setRoles(await getRoles(userInfo));
     }

     useEffect(() => {
        getRolesData();
      }, []);

  return (
    <MainBoard>
        <Container fluid className="background-theme-purple">
            <Container className="background-white-theme p-4">
                <h1>Teams</h1>
                <form onSubmit={submitHandler} >
                    <h3>Company Details</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Company Name"
                                name="company_name"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Company Type"
                                name="hire_for"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Email"
                                name="company_email"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Phone"
                                name="company_mobile"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Address"
                                name="company_address"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Team Admin User</h3>

                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Name"
                                name="name"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Email"
                                name="email"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                required
                                id="outlined-error"
                                label="Password"
                                name="password"
                                fullWidth={true}
                                onChange={(e) => handleChange(e)}
                                
                                />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="outlined-error"
                                label="Confirm Password"
                                name=""
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
export default AddTeam