import { ICredentials } from '@aws-amplify/core'
import { CognitoUser } from 'amazon-cognito-identity-js'

export type UserModel = {
  challengeName: string
} & CognitoUser

export type UserReducerModel = {
  user: UserModel | null
  credentials: ICredentials | null
}

export type UserLoginParams = {
  username: string
  password: string
}

export type NewPasswordParams = {
  user: UserModel
  newPassword: string
  requiredAttributes?: any
}
