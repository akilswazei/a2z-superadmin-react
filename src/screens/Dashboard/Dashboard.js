/* eslint-disable prettier/prettier */

import React from 'react'
import MainBoard from 'src/components/include/MainBoard'
import { Grid } from '@material-ui/core'
const DefaultLayout = () => {
  return (
    <div>
      {/* <AppSidebar /> */}
      <Grid container>
        <Grid item md={12}>
          <MainBoard><>Test</></MainBoard>
        </Grid>
      </Grid>
    </div>
  )
}

export default DefaultLayout
