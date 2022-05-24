import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signout } from 'src/redux/actions/UserActions'

// eslint-disable-next-line react-hooks/rules-of-hooks
const dispatch = useDispatch()

// Adds a default interceptor for all calls.
// Calls the signout action if the server returns a 401 response.
export const authInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        // signout()
        dispatch(signout())
      }
      return error
    },
  )
}
