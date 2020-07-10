import React, { useReducer, createContext } from "react";
import axios from 'axios'
import authReducer from "./authReducer";

import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, } from '../types'

export const AuthContext = createContext();


const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      loading: true,
      error: null,
      user: null
    });

    //Load User

    const loadUser = () => {
      console.log('load user')
    }

    //Register User
    const register = async formData => {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {
        const res = await axios.post('/api/users', formData, config)
        console.log(res.data)
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
      } catch (err) {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.msg
        })
      }
    }
    //Login User
      const login = () => {
      console.log('load user')
    }
    //Logout
      const logout = () => {
      console.log('load user')
    }
    //Clear Errors

    return (
        <AuthContext.Provider
            value={{
              token: state.token,
              isAuthenticated: state.isAuthenticated,
              loading: true,
              user: state.user,
              error: state.error,
              register,
              loadUser,
              login,
              logout
            }}
        >
           {props.children}
        </AuthContext.Provider>
    )
  
}

export default AuthState