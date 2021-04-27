import { RouteContent } from '~lib/router'

import { Login } from '~components/Pages/Login'
import { Profile } from '~components/Pages/Profile'
import { ConfigurationParameters } from '~lib/configuration'

export const configureRoutes: (_: ConfigurationParameters) => RouteContent[] = () => [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/profile',
    component: Profile,
    isRestricted: true,
    onFailedActivation: () => '/login',
  },
  {
    path: '',
    isExact: true,
    redirectTo: () => '/login',
  },
]
