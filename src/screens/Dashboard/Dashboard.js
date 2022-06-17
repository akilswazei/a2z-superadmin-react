/* eslint-disable prettier/prettier */

import React from 'react'
import MainBoard from 'src/components/include/MainBoard'
import { Grid } from '@material-ui/core'
import StoreIcon from '@mui/icons-material/Store'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Merchant from '../Merchants/Merchants'
import Chart from './Chart'
import { UserData } from './Data'
import { useState } from 'react'
import CustomDatagrid from './CustomDatagrid'
import { Container, createStyles } from '@material-ui/core'
import MerchantDash from './MerchantDash'
const DefaultLayout = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: ['rgba(255,255,255)'],
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  })
  return (
    <div>
      {/* <AppSidebar /> */}
      <Grid container>
        <Grid item md={12}>
          <MainBoard className="superadmin-dashboard-div">
            {/* dashboard cards */}
            <Grid item md={12} sm={12} xs={12} className="mx-2 my-3">
              <Grid container spacing={1}>
                <Grid item md={3} sm={6} xs={6}>
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
                <Grid item md={3} sm={6} xs={6}>
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
                <Grid item md={3} sm={6} xs={6}>
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
                <Grid item md={3} sm={6} xs={6}>
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
            {/* dashboard chart*/}
            <Grid container spacing={1}>
              <Grid item md={9} sm={12} xs={12} className="">
                <div className="custom-card-dashboard">
                  <h6>Merchant</h6>
                  <Container fluid className="custom-container-white p-0 m-0">
                    <Chart chartData={userData} className="my-1" />
                  </Container>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="small-chart">
                  <div className="small-cart-p">
                    <p className="bold">New Leads</p>
                    <p className="custom-p">28 Daily Avg</p>
                  </div>
                  <div className="small-cart-num">
                    <p>+955</p>
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* dashboard chart ends*/}
            {/* dashboard leads and invoice cards */}
            <Grid container spacing={0}>
              <Grid item md={6} sm={12} xs={12}>
                <div className="custom-card-dashboard">
                  <h6 className="">Invoice</h6>
                  <Container fluid className="custom-container-white p-0">
                    <div>
                      <CustomDatagrid />
                    </div>
                  </Container>
                </div>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <div className="custom-card-dashboard">
                  <h6 className="">New Leads</h6>
                  <Container fluid className="custom-container-white p-0">
                    <div>
                      <CustomDatagrid />
                    </div>
                  </Container>
                </div>
              </Grid>
            </Grid>
            {/* dashboard leads and invoice cards ends*/}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MerchantDash />
              </Grid>
            </Grid>
          </MainBoard>
        </Grid>
      </Grid>
    </div>
  )
}

export default DefaultLayout
