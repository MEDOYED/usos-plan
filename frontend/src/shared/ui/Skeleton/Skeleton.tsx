import React, { type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.scss';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
      {...props}
    />
  );
};
