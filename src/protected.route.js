import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ loggedIn }) => {
  return !!loggedIn ? <Outlet /> : <Navigate to="/login" />
}

// // eslint-disable-next-line react/prop-types
// export const ProtectedRoute = ({ element: Element, loggedIn, ...extraArgs }) => {
//   return (
//     <Route
//       {...extraArgs}
//       render={(props) => {
//         if (!!loggedIn) return <Element {...props} />
//         return (
//           <Navigate
//             to={{
//               pathname: '/login',
//               // eslint-disable-next-line react/prop-types
//               state: { from: props.location }, // COMMENT - from object can be used to track the origin and redirect there after login
//             }}
//           />
//         )
//       }}
//     />
//   )
// }

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userSignin.isLoggedIn,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)
