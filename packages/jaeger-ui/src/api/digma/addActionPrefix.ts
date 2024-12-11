import isString from '../../utils/ts/typeGuards/isString';

type PrefixedMap<T> = Record<keyof T, string>;

const addActionPrefix = <T extends Record<string, string>>(
  prefix: string,
  actions: T,
  separator?: string
): PrefixedMap<T> => {
  const res = {} as PrefixedMap<T>;

  Object.entries(actions).forEach(([key, value]) => {
    const prop = key as keyof T;

    res[prop] = `${prefix}${isString(separator) ? separator : '/'}${value}`;
  });

  return res;
};

export default addActionPrefix;
