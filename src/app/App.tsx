import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { useReduxContext, useStoreHooksFromReduxContext } from '~lib/reducer'
import { AppRouter, useNavigation } from '~lib/router'

import { CognitoUser, UserProtectedRoute, useUserHooks } from '~containers/CognitoUser'

import { configure } from '../config'

const reducers = {
  [CognitoUser.name]: CognitoUser.reducer,
}

export const App: React.FunctionComponent = () => {
  const appContext = useReduxContext(reducers)
  const { context, useStore } = useStoreHooksFromReduxContext(appContext)
  const store = useStore()

  // User managemente
  const { user, fetchCurrentUser, fetchCurrentCredentials } = useUserHooks(appContext)
  const { pushPage } = useNavigation(appContext)

  const [isRequested, setRequested] = useState(false)

  // Load configuration
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    const fetchConfiguration = async () => {
      const { routes: configuredRoutes } = await configure()
      setRoutes(configuredRoutes)
    }
    fetchConfiguration()
  }, [])

  useEffect(() => {
    if (!isRequested) {
      fetchCurrentUser().then(() => fetchCurrentCredentials())
      setRequested(true)
    } else if (!user) {
      pushPage('/login')
    }
  }, [isRequested, user])

  // Render
  return (
    <Provider context={context} store={store}>
      {routes && (
        <AppRouter
          context={context}
          routes={routes}
          protectedComponents={{
            user: UserProtectedRoute,
          }}
        />
      )}
    </Provider>
  )
}
