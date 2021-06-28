import { useCallback } from 'react'
import { AnyAction } from 'redux'

import {
  asyncDispatchFactory,
  StoreReduxContext,
  useStoreHooksFromReduxContext,
} from '~lib/reducer'

import { NewPasswordParams, UserLoginParams } from './model'
import * as UserActions from './actions'
import { reducer as User } from './reducer'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserHooks = (context: StoreReduxContext<any, AnyAction>) => {
  const { useSelector, useDispatch } = useStoreHooksFromReduxContext(context)

  const asyncDispatch = asyncDispatchFactory(useDispatch())

  const fetchCurrentUser = async () =>
    await asyncDispatch(UserActions.fetchCurrentUserAction, undefined)
  const fetchCurrentCredentials = async () =>
    await asyncDispatch(UserActions.fetchCurrentCredentialsAction, undefined)
  const fetchLogin = async (data: UserLoginParams) =>
    await asyncDispatch(UserActions.fetchLoginAction, data)
  const fetchNewPassword = async (data: NewPasswordParams) =>
    await asyncDispatch(UserActions.fetchNewPasswordAction, data)
  const fetchLogout = async () => await asyncDispatch(UserActions.fetchLogoutAction, undefined)

  const user = useSelector(User.selectors.selectUser)
  const credentials = useSelector(User.selectors.selectCredentials)

  const isUserLoggedIn = useCallback(() => !!user, [user])
  const isAdminLoggedIn = useCallback(() => {
    if (!!user) {
      const groups = (user.signInUserSession.idToken.payload['cognito:groups'] || []) as string[]
      return groups.some((group: string) => group.toLowerCase() === 'admin')
    }
    return false
  }, [user])

  return {
    user,
    credentials,
    fetchCurrentUser,
    fetchCurrentCredentials,

    fetchLogin,
    fetchNewPassword,
    fetchLogout,

    isUserLoggedIn,
    isAdminLoggedIn,
  }
}
