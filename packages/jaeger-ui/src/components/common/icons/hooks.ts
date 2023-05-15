import { useMemo } from 'react';
import { IIconProps } from './types';

const DEFAULT_ICON_COLOR = '#828797';
export const DEFAULT_ICON_SIZE = 12;

export const useIconProps = (props: IIconProps): IIconProps => {
  const color: string = useMemo(() => props.color || DEFAULT_ICON_COLOR, [props.color]);
  const size: number = useMemo(() => props.size || DEFAULT_ICON_SIZE, [props.size]);
  return { color, size };
};
