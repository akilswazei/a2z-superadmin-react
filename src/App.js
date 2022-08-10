/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected.route'
import './scss/style.scss'
import './index.css'
import Individuals from './screens/Individuals/Individuals'
import AddIndividual from './screens/Individuals/AddIndividual'
import Product from './screens/Products/Product'

import Stores from './screens/Store/Stores'
import AddStore from './screens/Store/AddStore'
import Merchants from './screens/Merchants/Merchants'

import Order from './screens/Order/Order'
import OrderDetail from './screens/Order/OrderDetail'

import Subscription from './screens/Subscription/Subscription'
import SubscriptionDetail from './screens/Subscription/SubscriptionDetail'

import { ThemeProvider, createTheme } from '@material-ui/core/styles'

import AddMerchant from './screens/Merchants/AddMerchant'
import AddProduct from './screens/Products/AddProduct'

import Payout from './screens/Payout/Payout'
import PayoutHistory from './screens/Payout/PayoutHistory'

import Roles from './screens/Roles/Roles'
import AddRoles from './screens/Roles/AddRoles'
import Supplier from './screens/Supplier/Supplier'
import AddSupplier from './screens/Supplier/AddSupplier'
import InhouseProducts from './screens/Products/InhouseProducts'
import Post from './screens/Support/Posts'
import AddPost from './screens/Support/AddPost'
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

const Lead = React.lazy(() => import('./screens/Lead/Lead'))
const ViewLead = React.lazy(() => import('./screens/Lead/ViewLead'))

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

                <Route exact path="/leads" element={<Lead />} />
                <Route exact path="/leads/view-lead/:id" element={<ViewLead />} />

                <Route exact path="/teams" element={<Teams />} />
                <Route exact path="/team/add" element={<AddTeam />} />

                <Route exact path="/individuals" element={<Individuals />} />
                <Route exact path="/individual/add" element={<AddIndividual />} />
                <Route exact path="/individual/edit/:eid" element={<AddIndividual />} />

                <Route exact path="/stores" element={<Stores />} />
                <Route exact path="/store/add" element={<AddStore />} />
                <Route exact path="/store/edit/:eid" element={<AddStore />} />

                <Route exact path="/merchants" element={<Merchants />} />
                <Route exact path="/merchant/add" element={<AddMerchant />} />
                <Route exact path="/merchant/edit/:eid" element={<AddMerchant />} />

                <Route exact path="/products" element={<Product />} />
                <Route exact path="/product/add" element={<AddProduct />} />
                <Route exact path="/product/edit/:eid" element={<AddProduct />} />
                <Route exact path="/inhouse-products" element={<InhouseProducts />} />
                <Route exact path="/inhouse-products/add" element={<AddProduct />} />
                <Route exact path="/inhouse-products/edit/:eid" element={<AddProduct />} />
                {/* <Route exact path="/payouts" element={<Payout />} />
                <Route exact path="/payout/add" element={<AddPayout />} /> */}

                <Route exact path="/orders" element={<Order />} />
                <Route exact path="order/edit/:eid" element={<OrderDetail />} />

                <Route exact path="/subscriptions" element={<Subscription />} />
                <Route exact path="subscription/edit/:eid" element={<SubscriptionDetail />} />

                <Route exact path="/payouts" element={<Payout />} />
                <Route exact path="/payouts/history" element={<PayoutHistory />} />

                <Route exact path="/roles" element={<Roles />} />
                <Route exact path="/role/add" element={<AddRoles />} />

                <Route exact path="/suppliers" element={<Supplier />} />
                <Route exact path="/supplier/add" element={<AddSupplier />} />
                <Route exact path="/supplier/edit/:eid" element={<AddSupplier />} />

                <Route exact path="/payouthistory" element={<PayoutHistory />} />
                <Route exact path="/posts" element={<Post />} />
                <Route exact path="/post/add" element={<AddPost />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
