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
import { validate } from 'src/helper/validation'
import { CustomEmail, CustomText, CustomPhone, CustomTimeInput } from 'src/helper/helper'
import { Box } from '@mui/system'

//main function starts here
function Devices() {
    const getState = useSelector((state) => state)
    const navigate = useNavigate()
    const {
      userSignin: { userInfo },
    } = getState
  
    //states
    const { eid } = useParams()
    const [inputs, setInputs] = useState({})  
    const [open, setOpen] = useState(false)
    const [errors, setErros] = useState(false)
  
    //chnage of value in form fields
    const handleChange = (event,extra={}) => {
    }
    return (
        <MainBoard>
        <Container fluid>
          <Container className="p-0 mt-4">
            <h6>Products</h6>
          </Container>
          <Container className="background-white-theme">
            {eid}
            </Container>
        </Container>
        </MainBoard>
    
    )
}
export default Devices
