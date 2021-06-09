import { useCallback } from 'react'
import { AnyAction } from 'redux'
import { StoreReduxContext, useStoreHooksFromReduxContext } from '~lib/reducer'
import { RouteIsActiveFunction } from '~lib/router'
import { fetchIdAction, setIdAction } from './actions'

import { reducer as Counter } from './reducer'

export const useCounterHooks = (
  context: StoreReduxContext<any, AnyAction>,
): {
  id: number
  isCounterActive: RouteIsActiveFunction
  fetchId: () => void
  increment: () => void
} => {
  const { useSelector, useDispatch } = useStoreHooksFromReduxContext(context)

  const dispatch = useDispatch()

  const id = useSelector(Counter.selectors.selectId)

  const isCounterActive = useCallback(() => id > 0 && id % 10 === 0, [id])
  const fetchId = useCallback(() => {
    dispatch(fetchIdAction(3000))
  }, [dispatch, id])
  const increment = useCallback(() => {
    dispatch(setIdAction(id + 1))
  }, [dispatch, id])

  return {
    id,
    isCounterActive,
    fetchId,
    increment,
  }
}
