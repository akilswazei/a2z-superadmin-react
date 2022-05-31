/* eslint-disable prettier/prettier */

import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Sidebar from 'src/components/sidebar/Sidebar'
import { Grid } from '@material-ui/core'
const DefaultLayout = () => {
  return (
    <div>
      {/* <AppSidebar /> */}
      <Grid container>
        <Grid item md={12}>
          <Sidebar />
        </Grid>
      </Grid>
    </div>
  )
}

export default DefaultLayout
