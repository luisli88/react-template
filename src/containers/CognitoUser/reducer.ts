import { generateReducer, ReducerSelectorFunctions } from '~lib/reducer'

import * as actions from './actions'
import * as selectors from './selectors'
import { UserModel, UserReducerModel } from './model'
import { ICredentials } from '@aws-amplify/core'

const initialState: UserReducerModel = {
  user: null,
  credentials: null,
}

const setUser = (state: UserReducerModel, user: UserModel | null) => ({
  ...state,
  user,
})

const setCredentials = (state: UserReducerModel, credentials: ICredentials | null) => ({
  ...state,
  credentials,
})

export const reducer = generateReducer(
  {
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(actions.setUserAction, (state, action) => setUser(state, action.payload.user))
        .addCase(actions.fetchLoginAction.fulfilled, (state, action) =>
          setUser(state, action.payload),
        )
        .addCase(actions.fetchNewPasswordAction.fulfilled, (state, action) =>
          setUser(state, action.payload),
        )
        .addCase(actions.fetchLogoutAction.fulfilled, (state) => setUser(state, null))
        .addCase(actions.fetchCurrentUserAction.fulfilled, (state, action) =>
          setUser(state, action.payload),
        )
        .addCase(actions.fetchCurrentCredentialsAction.fulfilled, (state, action) =>
          setCredentials(state, action.payload),
        )

        .addCase(actions.fetchCurrentUserAction.rejected, (state) => setUser(state, null))
    },
  },
  selectors as ReducerSelectorFunctions,
)
