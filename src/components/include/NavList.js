/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import { NavLink } from 'react-router-dom'

//icons
import PersonIcon from '@material-ui/icons/Person'
import DashboardIcon from '@material-ui/icons/Dashboard'
import BallotIcon from '@material-ui/icons/Ballot'
import StorefrontIcon from '@material-ui/icons/Storefront'
import ReceiptIcon from '@material-ui/icons/Receipt'
import HelpIcon from '@material-ui/icons/Help'
import StoreIcon from '@material-ui/icons/Store'
const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})
function getItems() {
  var json = {
    list: [
      {
        id: 1,
        title: 'first',
        link: '',
        items: [
          {
            id: 1,
            name: 'Dashboard',
            link: '/dashboard',
            icon: <DashboardIcon />,
          },
          {
            id: 2,
            name: 'User Management',
            icon: <PersonIcon />,
            link: '',
            subitems: [
              {
                id: 1,
                name: 'A2Z Users',
                link: '/users',
              },
              {
                id: 2,
                name: 'Outsource',
                link: '/dashboard',
                subitems2: [
                  {
                    id: 1,
                    name: 'Freelancer',
                    link: '/individuals',
                  },
                  {
                    id: 2,
                    name: 'Agency',
                    link: '/teams',
                  },
                  {
                    id: 3,
                    name: 'Role',
                    link: '/roles',
                  },
                ],
              },
              {
                id: 3,
                name: 'Freelancer',
                link: '/individuals',
              },
              {
                id: 4,
                name: 'Agency',
                link: '/teams',
              },
              {
                id: 5,
                name: 'Role',
                link: '/roles',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'second',
        link: '',
        items: [
          {
            id: 1,
            name: 'Leads',
            link: '/dashboard',
            icon: <BallotIcon />,
          },
          {
            id: 2,
            name: 'Merchants',
            icon: <StoreIcon />,
            link: '',
            subitems: [
              {
                id: 1,
                name: 'All Merchant',
                link: '/merchants',
              },
              {
                id: 2,
                name: 'Store',
                link: '/stores',
              },
              {
                id: 3,
                name: 'Terminal',
                link: '/dashboard',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: 'third',
        link: '',
        items: [
          {
            id: 1,
            name: 'Marketplace',
            icon: <StorefrontIcon />,
            link: '',
            subitems: [
              {
                id: 1,
                name: 'Order',
                link: '/dashboard',
              },
              {
                id: 2,
                name: 'Product',
                link: '/dashboard',
              },
              {
                id: 3,
                name: 'Supplier',
                link: '/dashboard',
              },
            ],
          },
          {
            id: 2,
            name: 'Sales Invoice',
            icon: <ReceiptIcon />,
            link: '/dashboard',
          },
          {
            id: 3,
            name: 'Support',
            icon: <HelpIcon />,
            link: '/',
          },
        ],
      },
    ],
  }
  return json
}
class Navlist extends React.Component {
  state = {}
  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] })
  }
  render() {
    const items = getItems()
    const { classes } = this.props
    return (
      <div>
        {items.list.map((list) => {
          return (
            <List className={classes.root} key={list.id}>
              {list.items.map((item) => {
                return (
                  <div key={item.id}>
                    {item.subitems != null ? (
                      <div key={item.id}>
                        <ListItem button key={item.id} onClick={this.handleClick.bind(this, item.name)}>
                          <NavLink exact activeClassName="navbar__link--active" className="navbar__link" to={item.link}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                            {this.state[item.name] ? <ExpandLess /> : <ExpandMore />}
                          </NavLink>
                        </ListItem>
                        <Collapse
                          key={list.items.id}
                          component="li"
                          in={this.state[item.name]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List disablePadding>
                            {item.subitems.map((sitem) => {
                              return (
                                <ListItem button key={sitem.id} className={classes.nested}>
                                  <NavLink
                                    exact
                                    activeClassName="navbar__link--active"
                                    className="navbar__link"
                                    to={sitem.link}
                                  >
                                    <ListItemIcon>{sitem.icon}</ListItemIcon>
                                    <ListItemText key={sitem.id} primary={sitem.name} />
                                  </NavLink>
                                </ListItem>
                              )
                            })}
                          </List>
                        </Collapse>{' '}
                      </div>
                    ) : (
                      <ListItem button onClick={this.handleClick.bind(this, item.name)} key={item.id}>
                        <NavLink exact activeClassName="navbar__link--active" className="navbar__link" to={item.link}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.name} />
                        </NavLink>
                      </ListItem>
                    )}
                  </div>
                )
              })}
              <Divider key={list.id} absolute />
            </List>
          )
        })}
      </div>
    )
  }
}
Navlist.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Navlist)
