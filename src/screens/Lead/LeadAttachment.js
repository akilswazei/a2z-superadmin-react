import * as React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddLinkIcon from '@mui/icons-material/AddLink';
import attachment_image from '../../assets/images/image5.png'
import { validate } from 'src/helper/validation'
import { CustomText } from 'src/helper/helper'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import serialize from "form-serialize";
import { addAttachment } from 'src/services/LeadServices'
import { getAttachment } from 'src/services/LeadServices'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function boldfont(text) {
    return ( <b>{text}</b>);
}

LeadAttachment.propTypes = {
    lead_id: PropTypes.number,
}

function LeadAttachment(props) {

    const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState

    let initialInputState = { status: 1 }
    const [inputs, setInputs] = useState(initialInputState)
    const [open, setOpen] = React.useState(false)
    const [errors, setErros] = React.useState(false)

    const [attachments, setAttachments] = useState()

    const submitHandler = async (e) => {
        
        e.preventDefault()

        const fieldData = serialize(e.target, { hash: true });

        /*const {
          attachment,      
          lead_id,
          user_id    
        } = fieldData;*/

        let allerrors = validate(inputs, {})        
        if (Object.keys(allerrors).length === 0) {
            let response

            response = await addAttachment(userInfo, fieldData)

            if (response.data && Object.keys(response.data).length != 0) {
                allerrors = response.data
            } else {
                e.target.reset();
                setOpen(true)
            }
        }        
        setErros(allerrors)
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values) => ({ ...values, [name]: value }))
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getLeadsAttachment = async () => {
        setAttachments(await getAttachment(userInfo,props.lead_id))
    }

    useEffect(() => {
        getLeadsAttachment()
    }, [])

    console.log("attachments->: " + JSON.stringify(attachments));

    // {attachments?.data && attachments.data.map((attachment, index) => {
    //     console.log("attachments file--------->: " + attachment.file);
    //                             }
    //                             )}

    return (

        <div>
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
            <Grid container spacing={2}>

                <form onSubmit={submitHandler}>
                <input type="hidden" name="lead_id" id="lead_id" value={props.lead_id} />
                <input type="hidden" name="user_id" id="user_id" value={userInfo.data.user.id} />
                    <Grid item xs={12}>
                        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>                            
                                <ListItem >{boldfont('Attach Files')}</ListItem>                            
                            </List>
                        </Item>

                        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>                            
                            <ListItem className="mt-3">{boldfont('Computer')}</ListItem>
                                <ListItem className="mt-3">
                                    <Box
                                        sx={{
                                            width: 500,
                                            maxWidth: '100%',
                                          }}
                                        >
                                        {/*<TextField fullWidth margin="normal" label="Paste any link here" name="attachment" id="attachment" />*/}
                                        <CustomText
                                              handleChange={(e) => handleChange(e)}
                                              name="attachment"
                                              placeholder="Paste any link here"
                                              id="attachment"
                                              error={false}                                              
                                              required={true}
                                            />

                                    </Box>
                                </ListItem>
                                <ListItem className="mt-3">
                                    <Button type="submit" variant="contained">Attach</Button>
                                </ListItem>
                            </List>
                        </Item>

                        <Item  style={{ "box-shadow": "none" }}>
                            <ListItem>{<AddLinkIcon style={{ fontWeight: 700 }} />} &nbsp;&nbsp; <ListItemText style={{ fontWeight: 700 }} primary="Attachments" /></ListItem>
                        </Item>

                        <Item className="row"  style={{ "box-shadow": "none" }}>
                              
                            {attachments?.data && attachments.data.map((attachment,index) => {

                            return <Box className="test col-md-2"
                                component="img"
                                key = {index}
                                sx={{
                                  height: 233,
                                  width: 350,
                                  maxHeight: { xs: 233, md: 167 },
                                  maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="Attachment"
                                src={attachment_image}
                              />

                              })}


                        </Item>                    

                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default LeadAttachment