import { generateReducerSelector, GenericReducerSelectorFunctionGenerator } from '~lib/reducer'
import { UserReducerModel } from './model'

export const selectUser: GenericReducerSelectorFunctionGenerator = (storeKey: string) =>
  generateReducerSelector(storeKey, [(state: UserReducerModel) => state.user])

export const selectCredentials: GenericReducerSelectorFunctionGenerator = (storeKey: string) =>
  generateReducerSelector(storeKey, [(state: UserReducerModel) => state.credentials])
