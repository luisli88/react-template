import React from 'react'
import { Provider } from 'react-redux'

import { useReduxContext, useStoreHooksFromReduxContext } from '~lib/reducer'
import { AppRouter } from '~lib/router'

import { Counter, CounterProtectedRoute } from '~containers/Counter'

import { configure } from '../config'

const reducers = {
  [Counter.name]: Counter.reducer,
}

export const App: React.FunctionComponent = () => {
  const { routes } = configure()

  const appContext = useReduxContext(reducers)

  const { context, useStore } = useStoreHooksFromReduxContext(appContext)
  const store = useStore()

  return (
    <Provider context={context} store={store}>
      <AppRouter
        context={context}
        routes={routes}
        protectedComponents={{ counter: CounterProtectedRoute }}
      />
    </Provider>
  )
}
