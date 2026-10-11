import { create } from 'zustand';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = 'usos_app_theme';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const useThemeStore = create<ThemeState>(set => {
  const initialTheme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set(state => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem(STORAGE_KEY, nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        return { theme: nextTheme };
      }),
    setTheme: (theme: Theme) => {
      localStorage.setItem(STORAGE_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
      set({ theme });
    },
  };
});
