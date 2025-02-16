import { EnvironmentFireBase, Environment } from "./interface";
import { defaultEnvironmentFireBase } from "./enviroment.default";

export const environment: Environment = {
  production: false,
  DBUrl: 'https://opentdb.com/api'
}

export const environmentFireBase: EnvironmentFireBase = {
  ...defaultEnvironmentFireBase
}
