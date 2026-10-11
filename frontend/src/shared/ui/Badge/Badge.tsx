import React, { type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.scss';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'default',
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
