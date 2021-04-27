import * as React from 'react'
import { AnyAction } from 'redux'

import { StoreReduxContext } from '~lib/reducer'
import { useNavigation } from '~lib/router'

import { PrimaryButton, SecondaryButton } from '~components/Atoms/Button'
import { useCounterHooks } from '~containers/Counter'

export const Login: React.FunctionComponent<{
  context: StoreReduxContext<any, AnyAction>
}> = (props: { context: StoreReduxContext<any, AnyAction> }) => {
  const { id, fetchId, increment } = useCounterHooks(props.context)
  const { pushPage } = useNavigation(props.context)

  return (
    <div>
      <h1>{id}</h1>
      <PrimaryButton onClick={() => fetchId()}>Fetch</PrimaryButton>
      <PrimaryButton onClick={() => pushPage('/profile')}>Login</PrimaryButton>
      <SecondaryButton onClick={() => increment()}>Logout</SecondaryButton>
    </div>
  )
}
