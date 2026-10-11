import React, { type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'outlined';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  interactive = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        interactive && styles.interactive,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
