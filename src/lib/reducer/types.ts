import { Context, Dispatch } from 'react'
import { Store, AnyAction, Reducer, ReducersMapObject, Action } from 'redux'
import { OutputSelector } from 'reselect'

import { Slice, SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit'

export type ModelBase = any

// NEW to React Redux
export type ReducerCollection = ReducersMapObject<any, AnyAction>
export type ReducerCollectionUpdateFunction = (newReducerCollection: ReducerCollection) => void
export type ReducerContext = {
  reducers: ReducerCollection
  updateReducers: ReducerCollectionUpdateFunction
}
export type RegisterReducerFunction = (reducerName: string, reducer: Reducer) => void

export type InitialContext<SS = any, A extends Action = AnyAction> = {
  store: Store<SS, A>
}
export type StoreContext<SS = any, A extends Action = AnyAction> = InitialContext<SS, A> & {
  storeState: SS
}

export type InitialReduxContext<SS = any, A extends Action = AnyAction> = Context<
  InitialContext<SS, A>
>
export type StoreReduxContext<SS = any, A extends Action = AnyAction> = Context<StoreContext<SS, A>>

export type StoreHooksModel<SS = any, A extends Action = AnyAction> = {
  context: StoreReduxContext<SS, A>

  useStore: () => Store<SS, A>
  useDispatch: () => Dispatch<any>
  useSelector: any
}

// Context
export type CreateGlobalContextFunction = (reducers?: ReducerCollection) => StoreReduxContext
export type CreateGlobalStoreFunction = (context: StoreReduxContext) => StoreHooksModel

// Selectors
export type ReducerStateStore = { [storeKey: string]: ModelBase }
export type StoreSelectorFunction = (store: ReducerStateStore) => ModelBase
export type StoreSelectorFunctionGenerator = (storeKey: string) => StoreSelectorFunction

export type SelectorFunction = (state: ReducerStateStore, ...props: any[]) => any
export type ReducerSelectorFunction<M extends ModelBase> = (state: M, ...props: any[]) => any
export type ReducerCombinerFunction = (...props: any[]) => any

export type ReducerSelector = OutputSelector<ReducerStateStore, any, (...res: any[]) => any>
export type GenericReducerSelectorFunction = <M extends ModelBase>(
  storeKey: string,
  selectors: ReducerSelectorFunction<M>[],
  combiner?: ReducerCombinerFunction,
) => ReducerSelector
export type GenericReducerSelectorFunctionGenerator = (storeKey: string) => ReducerSelector

export type ReducerSelectorFunctions = {
  [selectorName: string]: GenericReducerSelectorFunctionGenerator
}
export type ReducerSelectors = { [selectorName: string]: ReducerSelector }
export type ReducerSelectorsFunction = (
  storeKey: string,
  reducerSelectors: ReducerSelectorFunctions,
) => ReducerSelectors

export type BasicReducerAction = (...props: any) => any
export type ReducerActions = { [actionName: string]: BasicReducerAction }
export type ActionsSlice<A> = { actions: A }
export type SelectorsSlice = { selectors: ReducerSelectors }
export type GenerateReducerFunction = <
  M extends ModelBase,
  CaseReducers extends SliceCaseReducers<M>,
  Name extends string = string
>(
  reducerOptions: CreateSliceOptions<M, CaseReducers, Name>,
  selectors: ReducerSelectorFunctions,
) => Slice<M, CaseReducers, Name> & SelectorsSlice

// Components and props
export type ReduxContextProps = {
  context: StoreReduxContext<any, AnyAction>
}
