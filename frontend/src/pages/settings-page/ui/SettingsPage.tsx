import React from 'react';
import { Check, Copy, Info, Moon, Palette, Smartphone } from 'lucide-react';
import { useThemeStore } from '../../../features/theme-switcher/model/useThemeStore.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import styles from './SettingsPage.module.scss';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [copied, setCopied] = React.useState(false);

  const icalUrl = 'https://usosapps.uni.lodz.pl/services/tt/upcoming_ical?lang=pl&user_id=289852&key=E9QUyC66pLRXYhQAABfp';

  const handleCopy = () => {
    navigator.clipboard.writeText(icalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Palette size={20} color="var(--md-sys-color-primary)" />
          <span>Wygląd i motyw</span>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <span className={styles.settingLabel}>Tryb ciemny (Dark Mode)</span>
            <span className={styles.settingDescription}>
              Aktualnie aktywny: {theme === 'dark' ? 'Ciemny' : 'Jasny'}
            </span>
          </div>

          <Button
            variant="tonal"
            size="sm"
            onClick={toggleTheme}
            icon={<Moon size={16} />}
          >
            {theme === 'dark' ? 'Zmień na jasny' : 'Zmień na ciemny'}
          </Button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Smartphone size={20} color="var(--md-sys-color-primary)" />
          <span>Instalacja na iPhone (PWA)</span>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--md-sys-color-on-surface-variant)' }}>
          Aby korzystać z tej aplikacji jak ze zwykłej aplikacji mobilnej na iPhone bez App Store:
        </p>

        <ol style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '24px', color: 'var(--md-sys-color-on-surface-variant)' }}>
          <li>Otwórz tę stronę w przeglądarce <strong>Safari</strong> na swoim iPhone.</li>
          <li>Naciśnij przycisk <strong>Udostępnij (Share)</strong> na dole ekranu (kwadrat ze strzałką w górę).</li>
          <li>Przewiń w dół i wybierz <strong>Do ekranu początkowego (Add to Home Screen)</strong>.</li>
          <li>Naciśnij <strong>Dodaj</strong> w prawym górnym rogu.</li>
        </ol>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Info size={20} color="var(--md-sys-color-primary)" />
          <span>Źródło danych kalendarza USOS</span>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)' }}>
          Aktywne połączenie z oficjalnym kanałem USOS API Uniwersytetu Łódzkiego (język: polski, odświeżanie automatyczne):
        </p>

        <div className={styles.codeBox}>{icalUrl}</div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="tonal"
            size="sm"
            onClick={handleCopy}
            icon={copied ? <Check size={16} /> : <Copy size={16} />}
          >
            {copied ? 'Skopiowano!' : 'Kopiuj odnośnik iCal'}
          </Button>
        </div>
      </div>
    </div>
  );
};
