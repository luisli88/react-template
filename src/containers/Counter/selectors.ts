import { generateReducerSelector, GenericReducerSelectorFunctionGenerator } from '~lib/reducer'
import { CounterModel } from './model'

export const selectId: GenericReducerSelectorFunctionGenerator = (storeKey: string) =>
  generateReducerSelector(storeKey, [(state: CounterModel) => state.id])
