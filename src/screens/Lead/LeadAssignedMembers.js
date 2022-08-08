import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { getMembers } from 'src/services/LeadServices'
import { assignMembers } from 'src/services/LeadServices'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

LeadAssignedMembers.propTypes = {
    lead_id: PropTypes.number,

}

function boldfont(text) {
    return ( <b>{text}</b>);
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function LeadAssignedMembers(props) {

    const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState    

    const [open, setOpen]                    = React.useState(false);
    const [openDialog, setOpenDialog]        = React.useState(false)    
    const [options, setOptions]              = React.useState([]);
    const loading = open && options.length === 0;
    const [dia_title, setDiaTitle]           = React.useState(false)
    const [dia_content, setDiaContent]       = React.useState(false)
    const [members, setMembers]              = React.useState()    
    const [name, setName] = useState('');

    React.useEffect(() => {
        let active = true;

        if (!loading) {
          return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                const resp = await getMembers(userInfo,props.lead_id)

                if(resp.status == "success") {                    

                    if(resp.data.length == 0) {
                        setOptions([]);
                        setDiaTitle("error")
                        setDiaContent("No members found.")
                        setOpenDialog(true)
                    } else {
                        setOptions(resp.data);
                    }
                }
            }
        })();

        return () => {
          active = false;
        };

    }, [loading]);

    React.useEffect(() => {
        if (!open) {
          setOptions([]);
        }
    }, [open]);

    const handleClose = () => {
        setName('')
        setOpenDialog(false)
    }

    const handleTagvalue = async (value) => {
        console.log("User: " + value.title + " User ID: " + value.id);

        var fieldData = {
                            "lead_id": props.lead_id,
                            "user_id": value.id,
                            "team_id": userInfo.data.user.team_id
                        };
        
        const response = await assignMembers(userInfo, fieldData)        

        if (response.data && Object.keys(response.data).length != 0) {
            
        } else {           

            setDiaTitle(response.status)
            setDiaContent(response.message)
            setOpenDialog(true)
        }
    };

    const getLeadsMembers = async () => {
        setMembers(await getMembers(userInfo,props.lead_id))
    }

    useEffect(() => {
        getLeadsMembers()
    }, [])

return (

    <div>        
        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
            <List className="mb-3" sx={{ display: 'block' }} xs={12}>                            
                <ListItem ><h3>{boldfont('Members')}</h3></ListItem>
                <ListItem >
                    <div className="user_image justify-content-center d-flex mt-0">
                        <img alt="Remy Sharp" src="/static/media/2.0c06e43dc16bee6cdfed.jpg" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img" style={{ width: "40px" }} />
                    </div> 
                    &nbsp;&nbsp;&nbsp;{boldfont('Arkan Somo')}
                </ListItem>
                <ListItem >
                    <div className="user_image justify-content-center d-flex mt-0">
                        <img alt="Remy Sharp" src="/static/media/2.0c06e43dc16bee6cdfed.jpg" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img" style={{ width: "40px" }} />
                    </div> 
                    &nbsp;&nbsp;&nbsp;{boldfont('Abhijeet Raghuvanshi')}
                </ListItem>
                <ListItem >
                    <div className="user_image justify-content-center d-flex mt-0">
                        <img alt="Remy Sharp" src="/static/media/2.0c06e43dc16bee6cdfed.jpg" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img" style={{ width: "40px" }} />
                    </div> 
                    &nbsp;&nbsp;&nbsp;{boldfont('Payal Motvani')}
                </ListItem>
            </List>
        </Item>
    </div>

  );
}

export default LeadAssignedMembers