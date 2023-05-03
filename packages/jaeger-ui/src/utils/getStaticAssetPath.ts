import { isString } from "./ts/typeGuards/isString";

export const getStaticAssetPath = (path: string) => 
  isString(window.staticPath) ? new URL(path, window.staticPath).href : path
