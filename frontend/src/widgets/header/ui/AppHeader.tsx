import React from 'react';
import { NavLink } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { ThemeSwitcher } from '../../../features/theme-switcher/ui/ThemeSwitcher.tsx';
import { IconButton } from '../../../shared/ui/IconButton/IconButton.tsx';
import styles from './AppHeader.module.scss';

export interface AppHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          <div className={styles.logoBadge}>UŁ</div>
          <div className={styles.brandText}>
            <span className={styles.appName}>Plan Zajęć USOS</span>
            <span className={styles.univName}>Uniwersytet Łódzki</span>
          </div>
        </NavLink>

        <nav className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
            end
          >
            Plan tygodnia
          </NavLink>
          <NavLink
            to="/today"
            className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
          >
            Dzisiejsze zajęcia
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
          >
            Przedmioty
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
          >
            Ustawienia
          </NavLink>
        </nav>

        <div className={styles.actions}>
          {onRefresh && (
            <IconButton
              ariaLabel="Odśwież rozkład"
              onClick={onRefresh}
              disabled={isRefreshing}
              variant="tonal"
              size="md"
            >
              <RefreshCw
                size={18}
                style={{
                  animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                }}
              />
            </IconButton>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
