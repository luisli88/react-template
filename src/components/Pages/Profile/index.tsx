import { FunctionComponent } from 'react'
import { AnyAction } from 'redux'

import { StoreReduxContext } from '~lib/reducer'

export const Profile: FunctionComponent<{ context: StoreReduxContext<any, AnyAction> }> = () => (
  <h1>Home</h1>
)
