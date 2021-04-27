import { FunctionComponent } from 'react'
import { Redirect, Route } from 'react-router'

import { ProtectedRouteProps } from './types'

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { children, isActive = () => true, onFailedActivation, ...rest } = props
  return (
    <Route
      render={(childProps) =>
        isActive(rest)
          ? children
          : onFailedActivation && (
              <Redirect
                to={{
                  pathname: onFailedActivation(rest),
                  state: { from: childProps.location },
                }}
              />
            )
      }
    />
  )
}
