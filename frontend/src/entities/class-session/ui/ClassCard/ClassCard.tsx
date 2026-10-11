import React from 'react';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';
import type { ClassSession } from '../../../../shared/types/index.ts';
import { ClassBadge } from '../ClassBadge/ClassBadge.tsx';
import styles from './ClassCard.module.scss';

export interface ClassCardProps {
  session: ClassSession;
  isCurrent?: boolean;
  onClick?: (session: ClassSession) => void;
  className?: string;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  session,
  isCurrent = false,
  onClick,
  className,
}) => {
  return (
    <div
      className={clsx(styles.card, isCurrent && styles.isCurrent, className)}
      onClick={() => onClick?.(session)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(session);
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.timeContainer}>
          <span className={styles.time}>
            {session.startHour} – {session.endHour}
          </span>
          <span className={styles.duration}>{session.durationMinutes} min</span>
        </div>
        {isCurrent && <span className={styles.liveBeacon}>Teraz</span>}
      </div>

      <div className={styles.title} title={session.title}>
        {session.title}
      </div>

      <div className={styles.tags}>
        <ClassBadge type={session.type} label={session.typeLabel} />
        {session.group && <span className={styles.groupTag}>{session.group}</span>}
      </div>

      <div className={styles.location}>
        <MapPin size={14} />
        <span className={styles.roomBadge}>Sala {session.room}</span>
        <span className={styles.building} title={session.building}>
          {session.building}
        </span>
      </div>
    </div>
  );
};
