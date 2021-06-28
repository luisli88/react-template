import { FunctionComponent } from 'react'
import { ProtectedRoute, ProtectedRouteProps } from '~lib/router'
import { useUserHooks } from './hooks'

export const UserProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { context, onFailedActivation, ...rest } = props
  const { isUserLoggedIn } = useUserHooks(context)

  return (
    <ProtectedRoute
      context={context}
      isActive={isUserLoggedIn}
      onFailedActivation={onFailedActivation}
      {...rest}
    >
      {props.children}
    </ProtectedRoute>
  )
}

export const AdminProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { context, onFailedActivation, ...rest } = props
  const { isAdminLoggedIn } = useUserHooks(context)

  return (
    <ProtectedRoute
      context={context}
      isActive={isAdminLoggedIn}
      onFailedActivation={onFailedActivation}
      {...rest}
    >
      {props.children}
    </ProtectedRoute>
  )
}
