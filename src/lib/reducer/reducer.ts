import {
  createSlice,
  SliceCaseReducers,
  CreateSliceOptions,
  AsyncThunk,
  unwrapResult,
} from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { generateReducerSelectors } from './selectors'
import { ModelBase, GenerateReducerFunction, ReducerSelectorFunctions } from './types'

export const generateReducer: GenerateReducerFunction = <
  M extends ModelBase,
  CaseReducers extends SliceCaseReducers<M>,
  Name extends string = string
>(
  reducerOptions: CreateSliceOptions<M, CaseReducers, Name>,
  selectorsDefinitions: ReducerSelectorFunctions,
) => {
  const slice = createSlice(reducerOptions)
  const selectors = generateReducerSelectors(reducerOptions.name, selectorsDefinitions)
  return {
    ...slice,
    selectors,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const asyncDispatchFactory = (dispatch: Dispatch<any>) => async <
  Returned,
  ThunkArg,
  ThunkApiConfig = any
>(
  actionThunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>,
  args: ThunkArg,
) => await (dispatch(actionThunk.call(null, args)) as any).then(unwrapResult)
