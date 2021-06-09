import { useCallback } from 'react'
import { AnyAction } from 'redux'
import { go, push, replace, goBack, goForward } from 'connected-react-router'

import { StoreReduxContext, useStoreHooksFromReduxContext } from '../reducer'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useNavigation = (context: StoreReduxContext<any, AnyAction>) => {
  const { useDispatch, useStore } = useStoreHooksFromReduxContext(context)
  const store = useStore()
  const state = store.getState()['router']

  const dispatch = useDispatch()

  const pushPage = useCallback((path: string, state?: any) => dispatch(push(path, state)), [
    dispatch,
  ]) as typeof push

  const replacePage = useCallback((path: string, state?: any) => dispatch(replace(path, state)), [
    dispatch,
  ]) as typeof replace

  const goTo = useCallback((numberPages: number) => dispatch(go(numberPages)), [
    dispatch,
  ]) as typeof go

  const goOneBack = useCallback(() => dispatch(goBack()), [dispatch]) as typeof goBack

  const goOneForward = useCallback(() => dispatch(goForward()), [dispatch]) as typeof goForward

  return {
    pushPage,
    replacePage,
    goTo,
    goOneBack,
    goOneForward,
    routeState: state,
  }
}
