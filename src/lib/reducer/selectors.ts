import { createSelector } from 'reselect'
import {
  GenericReducerSelectorFunction,
  ModelBase,
  ReducerCombinerFunction,
  ReducerSelectorFunction,
  ReducerSelectorFunctions,
  ReducerSelectors,
  ReducerSelectorsFunction,
  ReducerStateStore,
  StoreSelectorFunctionGenerator,
} from './types'

export const getStoreSelector: StoreSelectorFunctionGenerator = (storeKey: string) => (store) =>
  store[storeKey]

export const generateReducerSelector: GenericReducerSelectorFunction = <M extends ModelBase>(
  storeKey: string,
  reducers: ReducerSelectorFunction<M>[] = [],
  combiner: ReducerCombinerFunction = (props) => props,
) =>
  createSelector(
    reducers.map((reducer) => (store: ReducerStateStore, ...props: any[]) => {
      const storeSelector = getStoreSelector(storeKey)
      const state = storeSelector(store)
      return reducer(state, ...props)
    }),
    combiner,
  )

export const generateReducerSelectors: ReducerSelectorsFunction = (
  storeKey: string,
  reducerSelectors: ReducerSelectorFunctions,
) =>
  Object.keys(reducerSelectors).reduce((selectors: ReducerSelectors, selectorName) => {
    const selector = reducerSelectors[selectorName]
    selectors[selectorName] = selector(storeKey)
    return selectors
  }, {})
