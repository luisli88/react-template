import { AWSError, Request } from 'aws-sdk'

export type AWSCallback<R> = (err: AWSError, response: R) => void
export type AWSFunction<R> = (callback: AWSCallback<R>) => Request<R, AWSError>

export const toPromise = <R>(awsFunction: AWSFunction<R>): Promise<R> =>
  new Promise((resolve, reject) => {
    awsFunction((err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
