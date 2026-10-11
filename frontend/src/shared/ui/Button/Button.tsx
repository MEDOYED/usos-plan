import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'tonal' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'filled',
  size = 'md',
  icon,
  iconPosition = 'start',
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'start' && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'end' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};
