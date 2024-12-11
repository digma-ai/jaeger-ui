import isString from './ts/typeGuards/isString';

const getStaticAssetPath = (path: string) =>
  isString(window.staticPath) ? new URL(path, window.staticPath).href : path;

export default getStaticAssetPath;
