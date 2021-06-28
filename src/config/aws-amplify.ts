import Amplify, { Auth } from 'aws-amplify'
import { ConfigurationFunctionTemplate, ConfigurationResponse } from '~lib/configuration'

type AmplifyConfigurationResponse = {
  amplifyConfiguration: any
  amplifyAuthConfiguration: any
}

export const configure: ConfigurationFunctionTemplate<
  ConfigurationResponse,
  AmplifyConfigurationResponse
> = () => {
  const amplifyConfiguration = Amplify.configure({
    Auth: {
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      // identityPoolId: 'arn:aws:cognito-idp:us-east-1:808354458929:userpool/us-east-1_L6MeP9tJV',
      identityPoolId: 'us-east-1:d65e323f-74cc-493d-ae2a-7d329aeff0b5',

      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',

      // OPTIONAL - Amazon Cognito Federated Identity Pool Region
      // Required only if it's different from Amazon Cognito Region
      identityPoolRegion: 'us-east-1',

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_L6MeP9tJV',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '2dk7omnpmt2t8fli00tuv95isr', //'1tl0oqlf0pll9ie5ejacaj2c0m',

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,

      // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    },

    API: {
      endpoints: [
        {
          name: 'API',
          endpoint: 'https://nxsanrv2ic.execute-api.us-east-1.amazonaws.com/Dev',
          custom_header: async () => {
            return {
              Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            }
          },
        },
      ],
    },
  })

  const amplifyAuthConfiguration = Auth.configure()

  return {
    amplifyConfiguration,
    amplifyAuthConfiguration,
  }
}
