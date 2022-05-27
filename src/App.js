import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected.route'

import './scss/style.scss'
import './index.css'
import Individual from './screens/Team/Individual'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Users = React.lazy(() => import('./screens/User/Users'))
const Teams = React.lazy(() => import('./screens/Team/Teams'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
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
              <Route exact path="/teams" element={<Teams />} />
              <Route exact path="/individual" element={<Individual />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
