import { EnvironmentFireBase } from "./interface";
import { defaultEnvironmentFireBase } from "./enviroment.default";

export const environmetFireBase: EnvironmentFireBase = {
  ...defaultEnvironmentFireBase,
  production: true,
}
