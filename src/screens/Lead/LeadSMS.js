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
import TextareaAutosize from '@mui/material/TextareaAutosize';

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import Stack from '@mui/material/Stack';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const textareastyle = {
    width: '100%',
    border: '1px solid #C6C6C6',
    'border-radius': '8px',
    'padding':'5px'
}  

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    background-color: #fff;
    color: ${blue[500]};
    border: 1px solid ${blue[500]};
  }
`;

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

LeadSMS.propTypes = {
    lead_id: PropTypes.number,
    leadName: PropTypes.string,
}

function LeadSMS(props) {

    const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState

    let initialInputState       = { status: 1 }
    const [inputs, setInputs]   = useState(initialInputState)
    const [open, setOpen]       = React.useState(false)
    const [errors, setErros]    = React.useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        alert("ok");
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs((values) => ({ ...values, [name]: value }))
    }

    const handleClose = () => {
        setOpen(false)
    }    

    useEffect(() => {
        
    }, [])

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
                  <DialogContentText id="alert-dialog-description">SMS sent successfully</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>

            <Grid container spacing={2} xs={12}>
                <Grid item xs={12}>
                <form onSubmit={submitHandler}>
                <input type="hidden" name="lead_id" id="lead_id" value={props.lead_id} />
                <input type="hidden" name="user_id" id="user_id" value={userInfo.data.user.id} />
                    <Grid item xs={12}>
                        <Item style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>
                                <ListItem><h2>{boldfont('SMS To:')} {boldfont(props.leadName)}</h2></ListItem>
                            </List>
                        </Item>

                        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                            <ListItem className="mt-6">{boldfont('Message')}</ListItem>
                        </Item>

                        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                            <ListItem className="mt-6">
                                <TextareaAutosize fullWidth 
                                    maxRows={7}
                                    minRows={7}
                                    aria-label="maximum height"
                                    placeholder="SMS Text"
                                    style={textareastyle}
                                />
                            </ListItem>
                        </Item>

                        <Divider />

                        <Item style={{ display: "grid", justifyContent: " flex-end"  , "box-shadow": "none" }}>
                            <ListItem justify="flex-end">
                                <Stack spacing={2} direction="row" justify="flex-end">
                                    <CustomButton component="button" disabled>Close</CustomButton>
                                    <CustomButton component="button" type="submit" >Send</CustomButton>
                                </Stack>
                            </ListItem>
                        </Item>
                    </Grid>
                </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default LeadSMS