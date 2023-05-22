import React, { useCallback, useEffect, useState } from 'react';
import { IButtonProps } from './types';

import './index.css';

const getIconColor = (isDisabled: boolean, isPressed: boolean): string => {
  if (isDisabled) {
    return '#49494d';
  }

  if (isPressed) {
    return '#dadada';
  }

  return '#b9c2eb';
};

const Button = (props: IButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = useCallback(() => setIsPressed(true), []);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsPressed(false);
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      type="button"
      className="Button"
      onClick={handleClick}
      disabled={props.disabled}
      onMouseDown={handleMouseDown}
    >
      <span className="Button__content">
        {props.icon && (
          <props.icon.component
            size={props.icon.size}
            color={props.icon.color || getIconColor(Boolean(props.disabled), isPressed)}
          />
        )}
        <span>{props.children}</span>
      </span>
    </button>
  );
};

export default Button;
