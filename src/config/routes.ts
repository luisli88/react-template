import { RoutesConfiguration } from '~lib/router'

import { Login } from '~components/Pages/Login'
// import { UserHome } from '~components/Pages/User/Home'

export const configureRoutes: RoutesConfiguration = () => {
  return [
    {
      path: '/login',
      component: Login,
    },
    // {
    //   path: '/dashboard',
    //   component: UserHome,
    //   restrictionType: 'user',
    //   onFailedActivation: () => '/login',
    // },

  ]
}
