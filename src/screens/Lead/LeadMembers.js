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

import { getMembers } from 'src/services/LeadServices'

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
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const [attachments, setAttachments] = React.useState()

    React.useEffect(() => {
        let active = true;

        if (!loading) {
          return undefined;
        }

        (async () => {
          await sleep(1e3); // For demo purposes.

          if (active) {
            setOptions([...jsonMembers]);
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
        setOpen(false)
    }

    const handleTagvalue = (value) => {
        console.log("Title: " + value.title + " Year: " + value.year);
        // const { value } = target;
        // switch (fieldName) {
        //   case 'tags':
        //     console.log('Value ',  value)
        //     // Do your stuff here
        //     break;
        //   default:
        // }
    };

    const getLeadsMembers = async () => {
        setAttachments(await getMembers(userInfo,props.lead_id))
    }

    useEffect(() => {
        getLeadsMembers()
    }, [])

    console.log("attachments->: " + JSON.stringify(attachments));

return (

    <div>

        <Grid container spacing={2} xs={12}>
            <Grid item xs={12}>

                <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                    <List className="mb-3" sx={{ display: 'block' }} xs={12}>                            
                        <ListItem ><h3>{boldfont('Add Members')}</h3></ListItem>
                    </List>
                </Item>


                <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>

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
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
                            options={options}
                            loading={loading}
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

            </Grid>
        </Grid>
    </div>

  );
}

export default LeadMembers

const jsonMembers = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }  
];