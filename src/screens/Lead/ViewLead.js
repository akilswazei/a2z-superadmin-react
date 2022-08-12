import PropTypes from 'prop-types'
import * as React from 'react'
import {Component} from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import MainBoard from 'src/components/include/MainBoard'
import { Container, createStyles } from '@material-ui/core'
import { useParams } from 'react-router';
import { leadUpdate } from 'src/services/LeadServices'
import { getLeadInfo } from 'src/services/LeadServices'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import LinkIcon from '@mui/icons-material/Link';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddLinkIcon from '@mui/icons-material/AddLink';
import attechment from '../../assets/images/image5.png'

import Modal from '@mui/material/Modal'

import LeadAttachment from 'src/screens/Lead/LeadAttachment'
import LeadSMS from 'src/screens/Lead/LeadSMS'
import LeadEmail from 'src/screens/Lead/LeadEmail'
import LeadMembers from 'src/screens/Lead/LeadMembers'

import EditIcon from '@mui/icons-material/Edit';

import InlineEdit from "src/components/InlineEditor/InlineEditor";

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/* tab imlementation start */

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function formtitle(title,width = 100) {
  return ( <Box sx={{ width: {width} }}>
          <Typography >{title}</Typography>
        </Box>
    );
}

function boldfont(user) {
  return ( <b>{user}</b>);
}

/* tab imlementation over */

function ViewLeadPopup({ openHistoryPayout, handleHistoryClose, style,eidNum }) {
  return (

        <>
          <Modal
            open={openHistoryPayout}
            onClose={handleHistoryClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >

            <Box sx={style} className="w-90">

            <List className='my-0 py-0'>
                <ListItem style={{display: 'inline-block' }}>
                <button className="custom-close-btn my-3" style={{ float: 'right' }} onClick={handleHistoryClose}>
                    X
                </button>
                </ListItem>
            </List>
              <div style={{float: 'clear' }} >
                <ViewLead lead_id={eidNum} />
              </div>
              
            </Box>
          </Modal>
        </>

    )
}

function ViewLead(props) {

	const [open, setOpen] 				= React.useState(false)
	const [isUpdate, setIsUpdate] 		= React.useState(0)
	const [leads, setLeads] 			= useState()
    const [errors, setErros] 			= React.useState({})
    const [dia_title, setDiaTitle]    	= React.useState(false)
    const [dia_content, setDiaContent]  = React.useState(false)

	const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { id } = props.lead_id;
    
    const getUpdatedLeadData = async () => {

        let response = await leadUpdate(userInfo, leads)
        if (response.data && Object.keys(response.data).length != 0) {
            
        } else {
        	setIsUpdate(0)
        	setDiaTitle(response.status)
            setDiaContent(response.message)
            setOpen(true)
        }
    }

    const getLeadsData = async () => {
        setLeads(await getLeadInfo(userInfo,props.lead_id))        
    }

    const _setState = key => value => {
     	setIsUpdate(1)
		setLeads(leads => {
		    return {
		        ...leads,
		        data: {
	          		...leads.data,
		          	[key] : value
		        },
		    }
		});
	};

	const handleClose = () => {
    	setOpen(false)
    }

    useEffect(() => {
    	if(!leads) {
    		getLeadsData()
        }
        if(isUpdate == 1) {        	
        	getUpdatedLeadData()
        }
    })

    return (
       <>
        {leads?.data && (
        
            <div className="p-2">

            	<Dialog
	                open={open}
	                onClose={handleClose}
	                aria-labelledby="alert-dialog-title"
	                aria-describedby="alert-dialog-description"
	            >
	                <DialogTitle id="alert-dialog-title">{dia_title}</DialogTitle>
	                <DialogContent>
	                  <DialogContentText id="alert-dialog-description">{dia_content }</DialogContentText>
	                </DialogContent>
	                <DialogActions>
	                  <Button onClick={handleClose}>OK</Button>
	                </DialogActions>
	            </Dialog>

                <div className="ViewLead">
                    <div  className="py-2">
                        <div className="row m-2">

                            
                            <div className="col-md-2 p-2 leaddetail_left background-white-theme custom-container-white" style={{ height: '100vh',overflow:'y' }}>
                                <div className="user_image justify-content-center d-flex mt-2">
                                    <img alt="Remy Sharp" src="/static/media/2.0c06e43dc16bee6cdfed.jpg" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img" />
                                </div>
                                <h4 className="justify-content-center  d-flex">{leads.data.customer_name}</h4>
                                <h5 className="justify-content-center  d-flex">Lead owner</h5>
                                <h6 className="justify-content-center  d-flex">Amount $100</h6>

                                <div className="action_panel mt-5 justify-content-center  d-flex">
                                    <Tooltip title="Email" placement="top"><MarkunreadIcon className="mx-2" /></Tooltip>
                                    <LinkIcon className="mx-2"/>
                                    <PersonAddAltIcon className="mx-2"/>
                                    <GroupsIcon className="mx-2"/>
                                    <ChatIcon className="mx-2"/>
                                </div>
                            </div>
                            
                            <div className="col-md-7 p-2 leaddetail_middle">
                                <Box className="mb-2" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Description" className="mx-2" {...a11yProps(0)} />
                                    <Tab label="Send SMS" className="mx-2" {...a11yProps(1)} />
                                    <Tab label="Attachment" className="mx-2" {...a11yProps(2)} />
                                    <Tab label="Email" className="mx-2" {...a11yProps(3)} />
                                    <Tab label="members" className="mx-2" {...a11yProps(4)} />
                                  </Tabs>
                                </Box>
                                <TabPanel className="tabdiv" value={value} index={0}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={5}>
                                        <Item  style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
                                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>
                                                <ListItem disablePadding><ListItemText className="form_heading" variant="h1" primary="Merchant Detail" /></ListItem>
                                                <Divider />
                                                <ListItem >                                                	
                                                	<InlineEdit
											          labelText={formtitle('Name')}
											          value={leads.data.customer_name}
											          variant="body1"
											          onConfirmChange={_setState("customer_name")}
											        />                                                	
                                            	</ListItem>
                                                <ListItem >{formtitle('Email')}<ListItemText  primary={leads.data.authorize_person_email} /></ListItem>
                                                <ListItem >{formtitle('Title')}<ListItemText  primary={leads.data.authorize_person_title} /></ListItem>
                                                <ListItem >{formtitle('Phone')}<ListItemText  primary={leads.data.authorize_person_phone_no} /></ListItem>
                                                <ListItem >{formtitle('Fax')}<ListItemText  primary={leads.data.authorize_person_fax_no} /></ListItem>
                                                <ListItem >{formtitle('Address')}<ListItemText  primary={leads.data.address} /></ListItem>
                                                <ListItem >{formtitle('Date')}<ListItemText  primary="04-15-2021" /></ListItem>
                                            </List>               
                                        </Item>
                                      </Grid>
                                      <Grid item xs={7}>
                                        <Item style={{ display: "flex", justifyContent: "flex-start" , "box-shadow": "none"}}>
                                            <List>
                                                <ListItem disablePadding><ListItemText className="form_heading" primary="Business Details" /></ListItem>
                                                <Divider />
                                                <ListItem >{formtitle('Legal Business Name of Entity',180)}<ListItemText inset primary={leads.data.legal_business_name} /></ListItem>
                                                <ListItem >{formtitle('Business Address',180)}<ListItemText inset primary={leads.data.business_address} /></ListItem>
                                                <ListItem >{formtitle('City',180)}<ListItemText inset primary={leads.data.business_city} /></ListItem>
                                                <ListItem >{formtitle('State',180)}<ListItemText inset primary={leads.data.business_state} /></ListItem>
                                                <ListItem >{formtitle('Zip Code',180)}<ListItemText inset primary={leads.data.business_zip} /></ListItem>
                                            </List>
                                        </Item>
                                      </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                      <Grid item xs={5}>
                                        <Item  style={{ display: "flex", justifyContent: "flex-start" , "box-shadow": "none"}}>
                                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>
                                                <ListItem className="mt-10"  disablePadding><ListItemText className="form_heading" primary="Store Type" /></ListItem>
                                                <Divider />
                                                <ListItem >{formtitle('Type')}<ListItemText primary="Grocery Type" /></ListItem>
                                            </List>               
                                        </Item>
                                      </Grid>
                                      <Grid item xs={7}>
                                        <Item style={{ display: "flex", justifyContent: "flex-start" , "box-shadow": "none"}}>
                                            <List>
                                                <ListItem disablePadding><ListItemText className="form_heading" primary="Assigned User" /></ListItem>
                                                <Divider />
                                                <ListItem >{formtitle('Assigned To',180)}<ListItemText inset primary="Ravi Sanchaniya" /></ListItem>
                                            </List>
                                        </Item>
                                      </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                      <Grid item xs={5}>
                                        <Item  style={{ display: "flex", justifyContent: "flex-start" , "box-shadow": "none"}}>
                                            <List className="mb-3" sx={{ display: 'block' }} xs={12}>
                                                <ListItem className="mt-10"  disablePadding><ListItemText className="form_heading" primary="Business Contact" /></ListItem>
                                                <Divider />
                                                <ListItem >{formtitle('Business Ph')}<ListItemText primary={leads.data.business_phone_number} /></ListItem>
                                                <ListItem >{formtitle('Cell Phone')}<ListItemText primary={leads.data.mobile_no} /></ListItem>
                                                <ListItem >{formtitle('Website/URL')}<ListItemText primary={leads.data.website} /></ListItem>
                                            </List>               
                                        </Item>
                                      </Grid>
                                      <Grid item xs={7}>
                                        <Item style={{ display: "flex", justifyContent: "flex-start" , "box-shadow": "none"}}>
                                            <List>
                                                <ListItem disablePadding><ListItemText className="form_heading" primary="Set Priority" /></ListItem>
                                                <Divider />
                                                <ListItem >{formtitle('Priority',180)}<ListItemText inset primary="Mediam" /></ListItem>
                                            </List>
                                        </Item>
                                      </Grid>
                                    </Grid>

                                </TabPanel>
                                <TabPanel className="tabdiv" value={value} index={1}>
                                    <LeadSMS leadName={leads.data.customer_name} lead_id={leads.data.id} lead_contact_no={leads.data.authorize_person_phone_no}  />
                                </TabPanel>

                                <TabPanel className="tabdiv" value={value} index={2}>
                                    <LeadAttachment lead_id={leads.data.id}/>
                                </TabPanel>

                                <TabPanel className="tabdiv" value={value} index={3}>
                                    <LeadEmail leadName={leads.data.customer_name} lead_id={leads.data.id} lead_contact_no={leads.data.authorize_person_phone_no}  />
                                </TabPanel>

                                <TabPanel className="tabdiv" value={value} index={4}>
                                    <LeadMembers lead_id={leads.data.id}/>
                                </TabPanel>

                            </div>

                            
                            <div className="col-md-3 p-2 leaddetail_right background-white-theme custom-container-white" style={{ height: '100vh',overflow:'y' }}>
                                <Item  style={{"box-shadow": "none"}}>
                                    <ListItem >{<AddLinkIcon style={{ fontWeight: 700 }} />} <ListItemText style={{ fontWeight: 700 }} primary="Attachment" /><Button size="small" variant="contained" startIcon={<AddIcon />}>Add</Button></ListItem>
                                    <ListItem ><span>{boldfont("Arakan Somo")} Attached image9.png</span></ListItem>
                                    <ListItem >Feb 25 at 11:00 PM</ListItem>
                                    <ListItem className="mb-5" >

                                    <Box
                                        component="img"
                                        sx={{
                                          height: 233,
                                          width: 350,
                                          maxHeight: { xs: 233, md: 167 },
                                          maxWidth: { xs: 350, md: 250 },
                                        }}
                                        alt="Attachment"
                                        src={attechment}
                                      />
                                    </ListItem>

                                    <ListItem ><span>{boldfont("Arakan Somo")} Attached image9.png</span></ListItem>
                                    <ListItem >Feb 25 at 11:00 PM</ListItem>
                                    <Divider className="mb-5"/>

                                    <ListItem ><span>{boldfont("Arakan Somo")} Attached image9.png</span></ListItem>
                                    <ListItem >Feb 25 at 11:00 PM</ListItem>
                                    <Divider className="mb-5"/>

                                    <ListItem ><span>{boldfont("Arakan Somo")} Attached image9.png</span></ListItem>
                                    <ListItem >Feb 25 at 11:00 PM</ListItem>

                                </Item>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        
        )}
        </>        
    );  
}

ViewLeadPopup.propTypes = {
    id: PropTypes.number,
    openHistoryPayout: PropTypes.func,
    handleHistoryClose: PropTypes.func,    
    style: PropTypes.string,
    eidNum:PropTypes.number
}

ViewLead.propTypes = {
    lead_id: PropTypes.number
}

export default ViewLeadPopup