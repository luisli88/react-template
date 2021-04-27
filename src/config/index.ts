import { ConfigurationParameters, ConfigurationResponse } from '~lib/configuration/types'

import { configureRoutes } from './routes'

export const configure = (parameters: ConfigurationParameters = {}): ConfigurationResponse => ({
  routes: configureRoutes(parameters),
})
