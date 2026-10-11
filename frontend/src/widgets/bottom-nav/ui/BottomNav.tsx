import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Settings } from 'lucide-react';
import clsx from 'clsx';
import styles from './BottomNav.module.scss';

export const BottomNav: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
        end
      >
        <div className={styles.iconPill}>
          <Calendar size={18} />
        </div>
        <span className={styles.label}>Tydzień</span>
      </NavLink>

      <NavLink
        to="/today"
        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
      >
        <div className={styles.iconPill}>
          <Clock size={18} />
        </div>
        <span className={styles.label}>Dzisiaj</span>
      </NavLink>

      <NavLink
        to="/courses"
        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
      >
        <div className={styles.iconPill}>
          <BookOpen size={18} />
        </div>
        <span className={styles.label}>Przedmioty</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
      >
        <div className={styles.iconPill}>
          <Settings size={18} />
        </div>
        <span className={styles.label}>Opcje</span>
      </NavLink>
    </nav>
  );
};
