/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected.route'
import './scss/style.scss'
import './index.css'
import Individuals from './screens/Individuals/Individuals'
import AddIndividual from './screens/Individuals/AddIndividual'

import Stores from './screens/Store/Stores'
import AddStore from './screens/Store/AddStore'
import Merchants from './screens/Merchants/Merchants'

import { withThemeCreator } from '@material-ui/styles'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./screens/Dashboard/Dashboard'))

// Pages
const Login = React.lazy(() => import('./screens/Login/Login'))
const Users = React.lazy(() => import('./screens/User/Users'))
const AddUser = React.lazy(() => import('./screens/User/AddUser'))
const Teams = React.lazy(() => import('./screens/Team/Teams'))
const AddTeam = React.lazy(() => import('./screens/Team/AddTeam'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
//app theme component
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F78E0',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#E2626B',
    },
    success: {
      main: '#6BBEA3',
    },
  },
})

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="login" name="Login" element={<Login />} />
              <Route path="register" name="Register Page" element={<Register />} />
              <Route path="404" name="Page 404" element={<Page404 />} />
              <Route path="500" name="Page 500" element={<Page500 />} />
              <Route path="/" name="Home" element={<ProtectedRoute />}>
                <Route exact path="/dashboard" element={<DefaultLayout />} />
              
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/user/add" element={<AddUser />} />
               
                <Route exact path="/teams" element={<Teams />} />
                <Route exact path="/team/add" element={<AddTeam />} />
               
                <Route exact path="/individuals" element={<Individuals />} />
                <Route exact path="/individual/add" element={<AddIndividual />} />


                <Route exact path="/stores" element={<Stores />} />
                <Route exact path="/store/add" element={<AddStore />} />

                
                <Route exact path="/merchants" element={<Merchants />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
