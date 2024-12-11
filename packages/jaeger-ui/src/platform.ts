import isString from './utils/ts/typeGuards/isString';

type Platform = 'JetBrains' | 'VS Code' | 'Web';

const PLATFORMS = ['JetBrains', 'VS Code', 'Web'];

const isPlatform = (platform: unknown): platform is Platform =>
  isString(platform) && PLATFORMS.includes(platform);

export const getPlatform = (platform: unknown): Platform | null => (isPlatform(platform) ? platform : null);

export const platform = getPlatform(window.platform);