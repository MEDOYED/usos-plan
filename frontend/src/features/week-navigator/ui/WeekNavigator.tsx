import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { formatPolishDateRange, shiftWeekDate } from '../../../shared/lib/date.ts';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { IconButton } from '../../../shared/ui/IconButton/IconButton.tsx';
import styles from './WeekNavigator.module.scss';

export interface WeekNavigatorProps {
  currentWeekStart: string;
  currentWeekEnd: string;
  onWeekChange: (newDate: string) => void;
  onResetToday: () => void;
  isLoading?: boolean;
}

export const WeekNavigator: React.FC<WeekNavigatorProps> = ({
  currentWeekStart,
  currentWeekEnd,
  onWeekChange,
  onResetToday,
  isLoading = false,
}) => {
  const handlePrev = () => {
    onWeekChange(shiftWeekDate(currentWeekStart, -1));
  };

  const handleNext = () => {
    onWeekChange(shiftWeekDate(currentWeekStart, 1));
  };

  return (
    <div className={styles.navigator}>
      <div className={styles.controls}>
        <IconButton
          ariaLabel="Poprzedni tydzień"
          variant="tonal"
          size="md"
          onClick={handlePrev}
          disabled={isLoading}
        >
          <ChevronLeft size={20} />
        </IconButton>

        <Button
          variant="text"
          size="sm"
          onClick={onResetToday}
          disabled={isLoading}
          icon={<RotateCcw size={15} />}
        >
          Bieżący tydzień
        </Button>

        <IconButton
          ariaLabel="Następny tydzień"
          variant="tonal"
          size="md"
          onClick={handleNext}
          disabled={isLoading}
        >
          <ChevronRight size={20} />
        </IconButton>
      </div>

      <div className={styles.dateDisplay}>
        <span className={styles.rangeText}>
          {formatPolishDateRange(currentWeekStart, currentWeekEnd)}
        </span>
        <span className={styles.subText}>Semestr zimowy 2026/27</span>
      </div>
    </div>
  );
};
