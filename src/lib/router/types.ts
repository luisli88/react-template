import { ComponentType } from 'react'
import { RouteProps } from 'react-router'
import { ReduxContextProps } from '../reducer'

export type RouteIsActiveFunction = (parameters: any) => boolean
export type PathGenerationFunction = (parameters: any) => string

export type RouteIsActiveProps = {
  isActive?: RouteIsActiveFunction
}

export type FailedRouteActivationProps = {
  onFailedActivation?: PathGenerationFunction
}

export type ProtectedRouteProps = ReduxContextProps &
  RouteIsActiveProps &
  FailedRouteActivationProps &
  RouteProps

// A Route content
export type RouteContent = {
  path: string
  isExact?: boolean
  component?: ComponentType<ReduxContextProps>

  redirectTo?: () => string
  isRestricted?: boolean
  onFailedActivation?: () => string
}

export type RoutesComponentProps = {
  routes: RouteContent[]
}

export type ProtectedRouteComponentProps = {
  protectedComponent?: ComponentType<ProtectedRouteProps>
}

export type RouterProps = RoutesComponentProps & ProtectedRouteComponentProps & ReduxContextProps
