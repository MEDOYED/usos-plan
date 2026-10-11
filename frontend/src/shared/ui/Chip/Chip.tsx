import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Chip.module.scss';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.chip, selected && styles.selected, className)}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
