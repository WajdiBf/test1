import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS } from './types'
import { SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
// Register User
export const registeruser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then((res) => {console.log(res.data.res)
      if(res.data.res==='user does Exist'){
        dispatch({
          type: GET_ERRORS,
            payload: res.data
        })}
      else{history.push('./login')}}
      )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

// Login - Get User Token

export const loginUser = userData => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      console.log('response',res.status)
      // save to localStorage
      const { token } = res.data
      // set token to localStorge
      localStorage.setItem('jwtToekn', token)
      // Set token to auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    
    .catch(err => 
      dispatch(
      { 
        type: GET_ERRORS,
        payload: err.response.data
      }

    )
    )
}
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
