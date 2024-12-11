import isNull from './isNull';

const isObject = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && !isNull(x);

export default isObject;
