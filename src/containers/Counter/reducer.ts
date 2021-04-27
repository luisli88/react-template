import { generateReducer, ReducerSelectorFunctions } from '~lib/reducer'
import * as actions from './actions'
import * as model from './model'
import * as selectors from './selectors'

const initialState: model.CounterModel = {
  id: 0,
}

const updateId = (state: model.CounterModel, id: number) => ({
  ...state,
  id,
})

export const reducer = generateReducer(
  {
    name: 'counter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(actions.setIdAction, (state, action) => updateId(state, action.payload))
        .addCase(actions.fetchIdAction.fulfilled, (state, action) =>
          updateId(state, action.payload),
        )
    },
  },
  actions,
  selectors as ReducerSelectorFunctions,
)
