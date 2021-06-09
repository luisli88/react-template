import { createContext, useMemo } from 'react'
import { combineReducers } from 'redux'
import { createDispatchHook, createSelectorHook, createStoreHook } from 'react-redux'
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, History } from 'history'

import {
  CreateGlobalContextFunction,
  CreateGlobalStoreFunction,
  ReducerCollection,
  StoreReduxContext,
} from './types'

export const history = createBrowserHistory()

export const useReduxContext: CreateGlobalContextFunction = (reducers: ReducerCollection = {}) => {
  const createRootReducers = (history: History<unknown>) =>
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    })

  return useMemo(() => {
    const initialContext = {
      store: configureStore({
        reducer: createRootReducers(history),
        middleware: [
          routerMiddleware(history),
          ...getDefaultMiddleware({ serializableCheck: false }),
        ],
      }),
      storeState: {},
    }

    return createContext(initialContext)
  }, [reducers])
}

export const useStoreHooksFromReduxContext: CreateGlobalStoreFunction = (
  context: StoreReduxContext,
) => {
  return useMemo(
    () => ({
      context,

      useStore: createStoreHook(context),
      useDispatch: createDispatchHook(context),
      useSelector: createSelectorHook(context),
    }),
    [context],
  )
}
