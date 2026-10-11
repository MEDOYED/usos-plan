import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './IconButton.module.scss';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'standard' | 'filled' | 'tonal' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'standard',
  size = 'md',
  ariaLabel,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.iconButton,
        styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        className
      )}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};
