import React from 'react';
import { Calendar } from 'lucide-react';
import clsx from 'clsx';
import { ClassCard } from '../../../entities/class-session/ui/ClassCard/ClassCard.tsx';
import { getDaysOfWeek, getTodayDateString } from '../../../shared/lib/date.ts';
import type { ClassSession } from '../../../shared/types/index.ts';
import styles from './TimetableGrid.module.scss';

export interface TimetableGridProps {
  sessions: ClassSession[];
  weekStart: string;
  onSelectSession?: (session: ClassSession) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  sessions,
  weekStart,
  onSelectSession,
}) => {
  const todayStr = getTodayDateString();
  const allWeekDays = getDaysOfWeek(weekStart);

  // Group sessions by date
  const sessionsByDate = new Map<string, ClassSession[]>();
  for (const session of sessions) {
    const list = sessionsByDate.get(session.date) || [];
    list.push(session);
    sessionsByDate.set(session.date, list);
  }

  // Filter Monday to Friday (standard study days), or include weekend if any classes exist
  const hasWeekendClasses = sessions.some(s => {
    const day = s.dayOfWeek;
    return day === 0 || day === 6;
  });

  const displayDays = hasWeekendClasses ? allWeekDays : allWeekDays.slice(0, 5);

  return (
    <div className={styles.gridContainer}>
      {displayDays.map(day => {
        const daySessions = sessionsByDate.get(day.date) || [];
        const isToday = day.date === todayStr;

        return (
          <div
            key={day.date}
            className={clsx(styles.dayColumn, isToday && styles.isToday)}
          >
            <div className={styles.dayHeader}>
              <div className={styles.dayInfo}>
                <span className={styles.dayTitle}>{day.dayName}</span>
                <span className={styles.dayDate}>
                  {day.dayNumber} {day.date.split('-')[1]}
                </span>
              </div>
              {isToday && <span className={styles.todayPill}>Dziś</span>}
            </div>

            <div className={styles.sessionList}>
              {daySessions.length > 0 ? (
                daySessions.map(session => (
                  <ClassCard
                    key={session.id}
                    session={session}
                    onClick={onSelectSession}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Calendar size={28} opacity={0.6} />
                  <span>Brak zajęć w tym dniu</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
