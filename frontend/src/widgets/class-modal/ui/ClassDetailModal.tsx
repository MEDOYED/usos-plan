import { Clock, ExternalLink, MapPin } from 'lucide-react';
import { ClassBadge } from '../../../entities/class-session/ui/ClassBadge/ClassBadge.tsx';
import { formatPolishDate } from '../../../shared/lib/date.ts';
import type { ClassSession } from '../../../shared/types/index.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { Dialog } from '../../../shared/ui/Dialog/Dialog.tsx';

export interface ClassDetailModalProps {
  session: ClassSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  if (!session) return null;

  const mapsQuery = encodeURIComponent(`${session.building}, ${session.location}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={session.title}
      actions={
        <>
          {session.url && (
            <Button
              variant="tonal"
              size="sm"
              icon={<ExternalLink size={15} />}
              onClick={() => window.open(session.url, '_blank', 'noopener,noreferrer')}
            >
              Otwórz w USOSweb
            </Button>
          )}
          <Button variant="filled" size="sm" onClick={onClose}>
            Zamknij
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <ClassBadge type={session.type} label={session.typeLabel} />
          {session.group && (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '8px',
                backgroundColor: 'var(--md-sys-color-surface-container-highest)',
                color: 'var(--md-sys-color-on-surface-variant)',
              }}
            >
              {session.group}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Clock size={18} color="var(--md-sys-color-primary)" />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>
              {session.startHour} – {session.endHour} ({session.durationMinutes} minut)
            </div>
            <div style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              {session.dayName}, {formatPolishDate(session.date)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <MapPin size={18} color="var(--md-sys-color-primary)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>
              Sala {session.room}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              {session.building}
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                color: 'var(--md-sys-color-primary)',
                textDecoration: 'underline',
                marginTop: '4px',
                display: 'inline-block',
              }}
            >
              {session.location} (Google Maps)
            </a>
          </div>
        </div>

        {session.rawSummary && (
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            Kod w USOS: {session.rawSummary}
          </div>
        )}
      </div>
    </Dialog>
  );
};
