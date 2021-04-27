import { createSlice, SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit'
import { generateReducerSelectors } from './selectors'
import { ModelBase, GenerateReducerFunction, ReducerSelectorFunctions } from './types'

export const generateReducer: GenerateReducerFunction = <
  M extends ModelBase,
  CaseReducers extends SliceCaseReducers<M>,
  Name extends string = string
>(
  reducerOptions: CreateSliceOptions<M, CaseReducers, Name>,
  actions: any,
  selectorsDefinitions: ReducerSelectorFunctions,
) => {
  const slice = createSlice(reducerOptions)
  const selectors = generateReducerSelectors(reducerOptions.name, selectorsDefinitions)
  return {
    ...slice,
    actions,
    selectors,
  }
}
