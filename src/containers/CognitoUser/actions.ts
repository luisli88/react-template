import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth } from 'aws-amplify'

import {
  FETCH_CURRENT_CREDENTIALS,
  FETCH_CURRENT_USER,
  FETCH_NEW_PASSWORD,
  FETCH_USER_LOGIN,
  FETCH_USER_LOGOUT,
  SET_USER,
} from './constants'
import { NewPasswordParams, UserLoginParams, UserModel } from './model'

export const setUserAction = createAction(SET_USER, (user: UserModel) => ({
  payload: {
    user,
  },
}))

export const fetchCurrentUserAction = createAsyncThunk(
  FETCH_CURRENT_USER,
  async () => await Auth.currentAuthenticatedUser(),
)

export const fetchCurrentCredentialsAction = createAsyncThunk(
  FETCH_CURRENT_CREDENTIALS,
  async () => await Auth.currentUserCredentials(),
)

export const fetchLoginAction = createAsyncThunk(
  FETCH_USER_LOGIN,
  async (data: UserLoginParams) => {
    const { username, password } = data
    return await Auth.signIn(username, password)
  },
)

export const fetchNewPasswordAction = createAsyncThunk(
  FETCH_NEW_PASSWORD,
  async (data: NewPasswordParams) => {
    const { user, newPassword, requiredAttributes = {} } = data
    return await Auth.completeNewPassword(user, newPassword, requiredAttributes)
  },
)

export const fetchLogoutAction = createAsyncThunk(FETCH_USER_LOGOUT, async () => {
  return await Auth.signOut()
})
