import React from 'react';
import { useIconProps } from './hooks';
import { IIconProps } from './types';

const SineIconComponent = (props: IIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 22 22">
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M4 11c7-13.86 7 13.86 14 0" />
    </svg>
  );
};

const SineIcon = React.memo(SineIconComponent);

export default SineIcon;
