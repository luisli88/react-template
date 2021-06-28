import { ConfigurationParameters, ConfigurationResponse } from '~lib/configuration'

import { configure as configureAmplify } from './aws-amplify'
import { configureInternationalization } from './i18n'
import { configureRoutes } from './routes'

export const configure = async (
  parameters: ConfigurationParameters = {},
): Promise<ConfigurationResponse> => ({
  amplify: configureAmplify(parameters),
  routes: configureRoutes(),
  i18n: await configureInternationalization(),
})
