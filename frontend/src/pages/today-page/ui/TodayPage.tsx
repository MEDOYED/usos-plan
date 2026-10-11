import React, { useEffect, useState } from 'react';
import { CalendarCheck, Clock, Sparkles } from 'lucide-react';
import { ClassCard } from '../../../entities/class-session/ui/ClassCard/ClassCard.tsx';
import { timetableApi } from '../../../shared/api/client.ts';
import { formatPolishDate } from '../../../shared/lib/date.ts';
import type { ClassSession, TodayResponse } from '../../../shared/types/index.ts';
import { Skeleton } from '../../../shared/ui/Skeleton/Skeleton.tsx';
import { ClassDetailModal } from '../../../widgets/class-modal/ui/ClassDetailModal.tsx';
import styles from './TodayPage.module.scss';

export const TodayPage: React.FC = () => {
  const [todayData, setTodayData] = useState<TodayResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSession, setActiveSession] = useState<ClassSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadToday = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await timetableApi.getToday();
        setTodayData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Błąd ładowania danych.');
      } finally {
        setIsLoading(false);
      }
    };
    loadToday();
  }, []);

  const handleSelectSession = (session: ClassSession) => {
    setActiveSession(session);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.page}>
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Skeleton height={140} radius={24} />
          <Skeleton height={100} radius={16} />
          <Skeleton height={100} radius={16} />
        </div>
      ) : todayData ? (
        <>
          <div className={styles.hero}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={24} color="var(--md-sys-color-primary)" />
              <span className={styles.dayTitle}>{todayData.dayName}</span>
            </div>
            <span className={styles.dateSub}>{formatPolishDate(todayData.date)}</span>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{todayData.events.length}</span>
                <span className={styles.statLabel}>Liczba zajęć</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{todayData.totalHours} h</span>
                <span className={styles.statLabel}>Łączny czas</span>
              </div>
            </div>
          </div>

          {todayData.currentEvent && (
            <div>
              <div className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={18} color="var(--md-sys-color-primary)" />
                Aktualnie trwają
              </div>
              <div style={{ marginTop: '8px' }}>
                <ClassCard
                  session={todayData.currentEvent}
                  isCurrent={true}
                  onClick={handleSelectSession}
                />
              </div>
            </div>
          )}

          {todayData.nextEvent && !todayData.currentEvent && (
            <div>
              <div className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={18} color="var(--md-sys-color-primary)" />
                Następne zajęcia
              </div>
              <div style={{ marginTop: '8px' }}>
                <ClassCard
                  session={todayData.nextEvent}
                  onClick={handleSelectSession}
                />
              </div>
            </div>
          )}

          <div className={styles.sectionTitle}>Wszystkie zajęcia dzisiaj</div>

          {todayData.events.length > 0 ? (
            <div className={styles.timeline}>
              {todayData.events.map(session => (
                <ClassCard
                  key={session.id}
                  session={session}
                  isCurrent={session.id === todayData.currentEvent?.id}
                  onClick={handleSelectSession}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Sparkles size={48} color="var(--md-sys-color-primary)" />
              <div style={{ fontSize: '18px', fontWeight: 700 }}>Brak zajęć na dzisiaj!</div>
              <p style={{ maxWidth: '360px', fontSize: '14px' }}>
                Możesz odpocząć lub sprawdzić plan na cały tydzień w zakładce „Plan tygodnia”.
              </p>
            </div>
          )}
        </>
      ) : (
        <div>{error || 'Brak danych'}</div>
      )}

      <ClassDetailModal
        session={activeSession}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
