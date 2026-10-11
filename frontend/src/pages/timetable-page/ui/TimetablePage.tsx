import React, { useEffect, useState } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { TypeFilter } from '../../../features/type-filter/ui/TypeFilter.tsx';
import { WeekNavigator } from '../../../features/week-navigator/ui/WeekNavigator.tsx';
import { timetableApi } from '../../../shared/api/client.ts';
import { getTodayDateString } from '../../../shared/lib/date.ts';
import type { ClassSession, ClassType } from '../../../shared/types/index.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { Skeleton } from '../../../shared/ui/Skeleton/Skeleton.tsx';
import { ClassDetailModal } from '../../../widgets/class-modal/ui/ClassDetailModal.tsx';
import { TimetableGrid } from '../../../widgets/timetable-grid/ui/TimetableGrid.tsx';
import styles from './TimetablePage.module.scss';

export const TimetablePage: React.FC = () => {
  const [currentWeekDate, setCurrentWeekDate] = useState<string>(getTodayDateString());
  const [selectedType, setSelectedType] = useState<ClassType | 'all'>('all');
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [weekStart, setWeekStart] = useState<string>('');
  const [weekEnd, setWeekEnd] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSession, setActiveSession] = useState<ClassSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadTimetable = async (weekDate: string, refresh = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await timetableApi.getTimetable({ week: weekDate, refresh });
      setSessions(response.events);
      if (response.meta.weekStart) setWeekStart(response.meta.weekStart);
      if (response.meta.weekEnd) setWeekEnd(response.meta.weekEnd);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się pobrać rozkładu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimetable(currentWeekDate);
  }, [currentWeekDate]);

  const handleWeekChange = (newDate: string) => {
    setCurrentWeekDate(newDate);
  };

  const handleResetToday = () => {
    setCurrentWeekDate(getTodayDateString());
  };

  const handleSelectSession = (session: ClassSession) => {
    setActiveSession(session);
    setIsModalOpen(true);
  };

  const filteredSessions = sessions.filter(s => {
    if (selectedType === 'all') return true;
    return s.type === selectedType;
  });

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <WeekNavigator
          currentWeekStart={weekStart || currentWeekDate}
          currentWeekEnd={weekEnd || currentWeekDate}
          onWeekChange={handleWeekChange}
          onResetToday={handleResetToday}
          isLoading={isLoading}
        />

        <TypeFilter
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </div>

      {error && (
        <div className={styles.errorCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <Button
            variant="tonal"
            size="sm"
            onClick={() => loadTimetable(currentWeekDate, true)}
            icon={<RotateCcw size={14} />}
          >
            Spróbuj ponownie
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loadingSkeletonGrid}>
          {[1, 2, 3, 4, 5].map(idx => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                background: 'var(--md-sys-color-surface-container-low)',
                borderRadius: '24px',
              }}
            >
              <Skeleton width="60%" height={24} radius={8} />
              <Skeleton width="100%" height={120} radius={16} />
              <Skeleton width="100%" height={120} radius={16} />
            </div>
          ))}
        </div>
      ) : (
        <TimetableGrid
          sessions={filteredSessions}
          weekStart={weekStart || currentWeekDate}
          onSelectSession={handleSelectSession}
        />
      )}

      <ClassDetailModal
        session={activeSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
