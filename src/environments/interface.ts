export interface Environment {
  production: boolean,
  DBUrl: string
}

export interface EnvironmentFireBase {
  production: boolean,
  FbDBUrl: string,
  firebase: {}
}
