import React, { useEffect, useState } from 'react';
import { BookOpen, ExternalLink, MapPin } from 'lucide-react';
import { ClassBadge } from '../../../entities/class-session/ui/ClassBadge/ClassBadge.tsx';
import { timetableApi } from '../../../shared/api/client.ts';
import type { SummaryResponse } from '../../../shared/types/index.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { Skeleton } from '../../../shared/ui/Skeleton/Skeleton.tsx';
import styles from './CoursesPage.module.scss';

export const CoursesPage: React.FC = () => {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await timetableApi.getSummary();
        setSummary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Błąd ładowania danych.');
      } finally {
        setIsLoading(false);
      }
    };
    loadSummary();
  }, []);

  return (
    <div className={styles.page}>
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Skeleton height={140} radius={24} />
          <Skeleton height={200} radius={16} />
        </div>
      ) : summary ? (
        <>
          <div className={styles.summaryHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={24} color="var(--md-sys-color-primary)" />
              <h1 className={styles.title}>Zarejestrowane przedmioty</h1>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              Zestawienie wszystkich Twoich kursów na semestr zimowy w Uniwersytecie Łódzkim
            </p>

            <div className={styles.metrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricNumber}>{summary.totalCourses}</span>
                <span className={styles.metricLabel}>Przedmioty</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricNumber}>{summary.totalSessions}</span>
                <span className={styles.metricLabel}>Zjazdy / Sesje</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricNumber}>{summary.totalHours} h</span>
                <span className={styles.metricLabel}>Godzin w semestrze</span>
              </div>
            </div>
          </div>

          <div className={styles.courseGrid}>
            {summary.courses.map((course, idx) => (
              <div key={idx} className={styles.courseCard}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <ClassBadge type={course.type} label={course.typeLabel} />
                  {course.group && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '6px',
                        background: 'var(--md-sys-color-surface-container-highest)',
                        color: 'var(--md-sys-color-on-surface-variant)',
                      }}
                    >
                      {course.group}
                    </span>
                  )}
                </div>

                <div className={styles.courseTitle}>{course.name}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
                  <MapPin size={15} />
                  <span>Sala {course.room}, {course.building}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-sys-color-primary)' }}>
                    {course.sessionCount} zjazdów ({course.totalHours} godz.)
                  </span>

                  {course.url && (
                    <Button
                      variant="text"
                      size="sm"
                      icon={<ExternalLink size={14} />}
                      onClick={() => window.open(course.url, '_blank', 'noopener,noreferrer')}
                    >
                      USOSweb
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>{error || 'Brak danych'}</div>
      )}
    </div>
  );
};
