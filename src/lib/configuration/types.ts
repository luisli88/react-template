export type ConfigurationParameters = { [name: string]: string }
export type ConfigurationResponse = { [name: string]: any }

export type ConfigurationFunctionTemplate<
  P extends ConfigurationParameters | undefined,
  R extends ConfigurationResponse
> = (parameters?: P) => R | Promise<R>
