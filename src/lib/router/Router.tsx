import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { RouterProps } from './types'
import { history } from '../reducer'

export const AppRouter: React.FunctionComponent<RouterProps> = (props: RouterProps) => {
  const { context, routes, protectedComponent: ProtectedRoute = null } = props

  return (
    <ConnectedRouter context={context} history={history}>
      <Switch>
        {routes.map((route) => {
          const {
            path,
            isExact = false,

            component: Component = null,
            redirectTo,

            isRestricted = false,
            onFailedActivation,
          } = route

          const ParentRoute = ProtectedRoute && isRestricted ? ProtectedRoute : Route

          return redirectTo ? (
            <Route key={path} path={path}>
              <Redirect to={redirectTo()} />
            </Route>
          ) : (
            <ParentRoute
              key={path}
              context={context}
              path={path}
              exact={isExact}
              onFailedActivation={onFailedActivation}
            >
              {Component && <Component context={context} />}
            </ParentRoute>
          )
        })}
      </Switch>
    </ConnectedRouter>
  )
}
