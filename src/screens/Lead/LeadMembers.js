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
import LeadAssignedMembers from 'src/screens/Lead/LeadAssignedMembers'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

LeadMembers.propTypes = {
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

function LeadMembers(props) {

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
    const [name, setName]                    = useState('');
    const [renderMembers, setRenderMembers]  = React.useState(2);

    React.useEffect(() => {
        let active = true;
        let newKey = 2;

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
            setRenderMembers(renderMembers * 89)
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

        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{dia_title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{dia_content }</DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>

        <Grid container spacing={2} xs={12}>
            <Grid item xs={12}>

                <Item style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                    <List className="mb-3" sx={{ display: 'block' }} xs={12}>                            
                        <ListItem ><h3>{boldfont('Add Members')}</h3></ListItem>
                    </List>
                </Item>


                <Item style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>

                    <ListItem className="mt-0">
                        <Autocomplete
                            id="asynchronous-demo"
                            sx={{ width: 600 }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            key="false"
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
                            options={options}
                            loading={loading}
                            inputValue={name}
                            onChange={(event, value) => handleTagvalue(value)}

                                renderInput={(params) => 

                                    <TextField
                                      {...params}
                                      label="Members"
                                      InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                          <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                          </React.Fragment>
                                        ),
                                      }}
                                    />
                            }
                            
                        />
                    </ListItem>

                </Item>

                <LeadAssignedMembers key={renderMembers} lead_id={props.lead_id} team_id={userInfo.data.user.team_id} />

            </Grid>
        </Grid>
    </div>

  );
}

export default LeadMembers