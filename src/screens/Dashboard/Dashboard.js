/* eslint-disable prettier/prettier */

import React from 'react'
import MainBoard from 'src/components/include/MainBoard'
import { Grid } from '@material-ui/core'
import StoreIcon from '@mui/icons-material/Store'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Merchant from '../Merchants/Merchants'
const DefaultLayout = () => {
  return (
    <div>
      {/* <AppSidebar /> */}
      <Grid container>
        <Grid item md={12}>
          <MainBoard>
            {/* dashboard cards */}
            <Grid item md={11} className="mx-auto my-3">
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <div className="dashboard-card-div">
                    <div className="dashboard-card-icon">
                      <StorefrontIcon />
                    </div>
                    <div className="dashboard-card-content">
                      <p>45</p>
                      <p className="p2">Merchant Onboarded</p>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="dashboard-card-div dashboard-blue">
                    <div className="dashboard-card-icon">
                      <ReceiptIcon />
                    </div>
                    <div className="dashboard-card-content">
                      <p>25</p>
                      <p className="p2">Invoice Generated</p>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="dashboard-card-div dashboard-yellow">
                    <div className="dashboard-card-icon">
                      <PeopleAltIcon />
                    </div>
                    <div className="dashboard-card-content">
                      <p>120</p>
                      <p className="p2">New Leads</p>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className="dashboard-card-div dashboard-orange">
                    <div className="dashboard-card-icon">
                      <StoreIcon />
                    </div>
                    <div className="dashboard-card-content">
                      <p>30</p>
                      <p className="p2">Merchant Active</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* dashboard cards ends*/}
            {/* dashboard merchant */}

            {/* dashboard merchant ends*/}
          </MainBoard>
        </Grid>
      </Grid>
    </div>
  )
}

export default DefaultLayout
