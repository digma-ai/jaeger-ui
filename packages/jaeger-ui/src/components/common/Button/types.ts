import { ComponentType, MouseEventHandler, ReactNode } from 'react';
import { IIconProps } from '../icons/types';

export interface IButtonProps {
  icon?: {
    component: ComponentType<IIconProps>;
    color?: string;
    size?: number;
  };
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}
