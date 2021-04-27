import { FunctionComponent } from 'react'
import { ProtectedRoute, ProtectedRouteProps } from '~lib/router'
import { useCounterHooks } from './hooks'

export const CounterProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { context, onFailedActivation, ...rest } = props
  const { isCounterActive } = useCounterHooks(context)

  return (
    <ProtectedRoute
      context={context}
      isActive={isCounterActive}
      onFailedActivation={onFailedActivation}
      {...rest}
    >
      {props.children}
    </ProtectedRoute>
  )
}
