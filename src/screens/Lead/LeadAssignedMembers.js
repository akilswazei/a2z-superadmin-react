import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

import { getAssignedMembers } from 'src/services/LeadServices'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

LeadAssignedMembers.propTypes = {
    lead_id: PropTypes.number,
    team_id: PropTypes.number
}

function boldfont(text) {
    return ( <b>{text}</b>);
}

function LeadAssignedMembers(props) {

    const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState

    const [assignedMembers, setAssignedMembers] = useState()

    const getAssignedMembersFunc = async () => {
        setAssignedMembers(await getAssignedMembers(userInfo,props.lead_id,props.team_id))
    }

    useEffect(() => {
        getAssignedMembersFunc()
    }, [])

return (

    <div>
        <Item style={{ display: "flex", justifyContent: " flex-start"  , "box-shadow": "none" }}>
            <List className="mb-3" sx={{ display: 'block' }} xs={12}>
                <ListItem><h3>{boldfont('Members')}</h3></ListItem>
                
                {assignedMembers?.data && assignedMembers.data.map((member) => {
                    return <ListItem key = {member.id}>
                        <div className="user_image justify-content-center d-flex mt-0">
                            <img alt={member.name} src="/static/media/2.0c06e43dc16bee6cdfed.jpg" className="MuiAvatar-img css-1pqm26d-MuiAvatar-img" style={{ width: "40px" }} />
                        </div> 
                        &nbsp;&nbsp;&nbsp;{boldfont(member.name)}
                    </ListItem>
                })}

            </List>
        </Item>
    </div>

  );
}

export default LeadAssignedMembers