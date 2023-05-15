import React from 'react';
import { useIconProps } from './hooks';
import { IIconProps } from './types';

const CrossedCrosshairCircleIconComponent = (props: IIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 73 72">
      <circle cx="36.5" cy="36" r="36" fill="#F5F5F5" />
      <path stroke={color} strokeLinecap="round" strokeWidth="2" d="m17 16 40 40" />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M54.33 36c0 9.57-7.76 17.33-17.33 17.33M54.33 36c0-9.57-7.76-17.33-17.33-17.33M54.33 36h-9.2M37 53.33A17.33 17.33 0 0 1 19.67 36M37 53.33v-9.2M19.67 36c0-9.57 7.76-17.33 17.33-17.33M19.67 36h9.2M37 18.67v9.2"
      />
    </svg>
  );
};

export const CrossedCrosshairCircleIcon = React.memo(CrossedCrosshairCircleIconComponent);
