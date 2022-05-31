import React, { useState } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, Avatar } from '@mui/material'
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import img1 from '../../assets/images/avatars/2.jpg'
import MailIcon from '@mui/icons-material/Mail'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  div: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
})
const Header = () => {
  const classes = useStyles()
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))

  return (
    <>
      <div className={classes.div}>
        <div>
          <Badge badgeContent={4} max={999} color="primary">
            <MailIcon color="action" />
          </Badge>
        </div>
        <div>
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt="Remy Sharp" src={img1} />
          </StyledBadge>
        </div>
      </div>
    </>
  )
}

export default Header
