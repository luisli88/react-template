import { ComponentType } from 'react'
import { RouteProps } from 'react-router'
import { RouterProps } from 'react-router-dom'
import { ReduxContextProps } from '../reducer'

export type RouteIsActiveFunction = (parameters: any) => boolean
export type PathGenerationFunction = (parameters: any) => string

export type RouteIsActiveProps = {
  isActive?: RouteIsActiveFunction
}

export type RouterStateProps = {
  routeState: any
}

export type FailedRouteActivationProps = {
  onFailedActivation?: PathGenerationFunction
}

export type BasicRouteProps = ReduxContextProps & RouterProps

export type ProtectedRouteProps = BasicRouteProps &
  RouteIsActiveProps &
  FailedRouteActivationProps &
  RouteProps

// A Route content
export type RouteContent = {
  path: string
  isExact?: boolean
  component?: ComponentType<BasicRouteProps & RouterStateProps>

  redirectTo?: () => string
  restrictionType?: string | null
  onFailedActivation?: () => string
}

export type RoutesConfiguration = () => RouteContent[]

export type RoutesComponentProps = {
  routes: RouteContent[]
}

export type ProtectedRouteComponentProps = {
  protectedComponents?: { [restrictionName: string]: ComponentType<ProtectedRouteProps> }
}

export type RouterComponentProps = RoutesComponentProps &
  ProtectedRouteComponentProps &
  ReduxContextProps
