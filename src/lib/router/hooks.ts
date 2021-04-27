import { useCallback } from 'react'
import { go, push, replace, goBack, goForward } from 'connected-react-router'
import { StoreReduxContext, useStoreHooksFromReduxContext } from '../reducer'
import { AnyAction } from 'redux'

export const useNavigation = (
  context: StoreReduxContext<any, AnyAction>,
): {
  pushPage: typeof push
  replacePage: typeof replace
  goTo: typeof go
  goOneBack: typeof goBack
  goOneForward: typeof goForward
} => {
  const { useDispatch } = useStoreHooksFromReduxContext(context)

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
  }
}
