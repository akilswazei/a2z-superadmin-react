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
            link: '',
            subitems: [
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
            ],
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
        name: 'Leads',
        link: '/dashboard',
        icon: <BallotIcon />,
      },
      {
        id: 4,
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
        ],
      },
      {
        id: 5,
        name: 'Marketplace',
        icon: <StorefrontIcon />,
        link: '',
        subitems: [
          {
            id: 1,
            name: 'Order',
            link: '/orders',
          },
          {
            id: 2,
            name: 'Subscription',
            link: '/subscriptions',
          },
          {
            id: 2,
            name: 'Product',
            link: '/products',
          },
          {
            id: 3,
            name: 'Supplier',
            link: '/suppliers',
          },
          {
            id: 4,
            name: 'Merchant Products',
            link: '/merchant-products',
          },
        ],
      },
      {
        id: 6,
        name: 'Payout',
        icon: <ReceiptIcon />,
        link: '',
        subitems: [
          {
            id: 1,
            name: 'Payouts',
            link: '/payouts',
          },
        ],
      },
      {
        id: 7,
        name: 'Support',
        icon: <HelpIcon />,
        link: '/',
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
    const nav = getItems()
    const { classes } = this.props
    return (
      <div>
        <List className={classes.root} key={nav.id}>
          {nav.items.map((item) => {
            return (
              <div key={item.id}>
                <div key={item.id}>
                  <ListItem button key={item.id} onClick={this.handleClick.bind(this, item.name)}>
                    <NavLink exact activeClassName="navbar__link--active" className="navbar__link" to={item.link}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                      {item.subitems != null ? this.state[item.name] ? <ExpandLess /> : <ExpandMore /> : ''}
                    </NavLink>
                  </ListItem>
                  <Collapse key={'c' + item.id} in={this.state[item.name]} timeout="auto" unmountOnExit>
                    {item.subitems &&
                      item.subitems.map((sitem) => {
                        return (
                          <div key={sitem.id}>
                            <div key={sitem.id}>
                              <ListItem
                                button
                                key={sitem.id}
                                className={classes.nested}
                                onClick={this.handleClick.bind(this, sitem.name)}
                              >
                                <NavLink
                                  exact
                                  activeClassName="navbar__link--active"
                                  className="navbar__link"
                                  to={sitem.link}
                                >
                                  <ListItemIcon>{sitem.icon}</ListItemIcon>
                                  <ListItemText key={sitem.id} primary={sitem.name} />
                                  {sitem.subitems != null ? (
                                    this.state[sitem.name] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )
                                  ) : (
                                    ''
                                  )}
                                </NavLink>
                              </ListItem>

                              <Collapse
                                key={'c' + item.id + sitem.id}
                                in={this.state[sitem.name]}
                                timeout="auto"
                                unmountOnExit
                              >
                                {sitem.subitems &&
                                  sitem.subitems.map((ssitem) => {
                                    return (
                                      <ListItem button key={ssitem.id}>
                                        <NavLink
                                          exact
                                          activeClassName="navbar__link--active"
                                          className="navbar__link"
                                          to={ssitem.link}
                                        >
                                          <ListItemIcon>{ssitem.icon}</ListItemIcon>
                                          <ListItemText key={ssitem.id} primary={ssitem.name} />
                                        </NavLink>
                                      </ListItem>
                                    )
                                  })}
                              </Collapse>
                            </div>
                          </div>
                        )
                      })}
                  </Collapse>
                </div>
              </div>
            )
          })}
          {/* <Divider key={list.id} absolute /> */}
        </List>
      </div>
    )
  }
}
Navlist.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Navlist)
