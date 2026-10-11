import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { CoursesPage } from '../../pages/courses-page/ui/CoursesPage.tsx';
import { SettingsPage } from '../../pages/settings-page/ui/SettingsPage.tsx';
import { TimetablePage } from '../../pages/timetable-page/ui/TimetablePage.tsx';
import { TodayPage } from '../../pages/today-page/ui/TodayPage.tsx';
import { BottomNav } from '../../widgets/bottom-nav/ui/BottomNav.tsx';
import { AppHeader } from '../../widgets/header/ui/AppHeader.tsx';

const RootLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 16px' }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TimetablePage />} />
          <Route path="today" element={<TodayPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
