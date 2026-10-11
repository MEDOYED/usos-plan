import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from '../../../shared/ui/IconButton/IconButton.tsx';
import { useThemeStore } from '../model/useThemeStore.ts';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <IconButton
      ariaLabel={theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}
      onClick={toggleTheme}
      variant="tonal"
      size="md"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </IconButton>
  );
};
