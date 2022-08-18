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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//custom styling imports
//cutom component imports
import MainBoard from 'src/components/include/MainBoard'

import { validate } from 'src/helper/validation'
import { CustomEmail, CustomText, CustomPhone, CustomTimeInput } from 'src/helper/helper'
import { updateStoreDevices} from 'src/services/StoreService'

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
    const [device_data, setDeviceData] = useState([])
    
    const columns=[
      { id:"device_eid",label:"ID",type:"label",minWidth:"170",align:"left"  },
      { id:"device",label:"Device",type:"label",minWidth:"170",align:"left"  },
      { id:"device_id",label:"Device ID",type:"input",minWidth:"170",align:"left"  },
      { id:"liscense_key",label:"liscense key",type:"input",minWidth:"170",align:"left"  },
      { id:"action",label:"Actions",type:"checkbox",minWidth:"170",align:"left"  }
    ]
  
    //chnage of value in form fields
    const handleChange = (event,cid,device_eid) => {
      
      const temp_data=device_data.map((value,index)=>{
            if(value.device_eid==device_eid){
              value={...value,[cid]:event.target.value}
            }
            return value    
      })
      console.log(temp_data);
      setDeviceData(temp_data)
    }

    const submitHandler=async ()=>{
      const response = await updateStoreDevices(userInfo, {eid: eid, data: device_data})
      setOpen(true)
    }
    const activationChange=(event,cid,device_eid)=>{  
        const temp_data=device_data.map((value,index)=>{
          if(value.device_eid==device_eid){
              value={...value,[cid]:!value[cid]}
          }
          return value    
        })
        console.log(temp_data);
        setDeviceData(temp_data)
    }

    const handleClose = () => {
      setOpen(false)
      navigate('../stores', { replace: true })
    }  
    useEffect(()=>{
      const fn= async function(){
         setDeviceData([{device_eid: 101,device:"Device 1",device_id:"input",liscense_key:"input",action:true},
         {device_eid: 102,device:"Device 2",device_id:"input 2",liscense_key:"input 2",action:false}
        ])
      }()
    },[])
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
            <h6>All Devices</h6>
          </Container>
          <Container className="background-white-theme">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>

                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {device_data?.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns?.map((column) => {

                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>

                                {column.type=='label'?value:''}
                                {column.type=='input'?(<CustomText
                                    handleChange={(e) => handleChange(e,column.id,row.device_eid)}
                                    name={column.id}
                                    placeholder={column.label}
                                    value={value?value: ''}
                                    label=""
                                    error={errors}
                                    required={true}
                                  />):""}
                                  {column.type=='checkbox'?(<input type='checkbox' name={column.id}  defaultChecked={value}  onChange={(e) => activationChange(e,column.id,row.device_eid)} />):""}
                              
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="name"
                  onClick={submitHandler}
                  style={{ margin: '15px 5px', boxShadow: 'none' }}
                >
                  Submit
                </Button>

        </Container>
        </Container>
        </MainBoard>
    
    )
}
export default Devices
