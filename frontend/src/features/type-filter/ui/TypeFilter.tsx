import React from 'react';
import type { ClassType } from '../../../shared/types/index.ts';
import { Chip } from '../../../shared/ui/Chip/Chip.tsx';
import styles from './TypeFilter.module.scss';

export interface TypeFilterProps {
  selectedType: ClassType | 'all';
  onSelectType: (type: ClassType | 'all') => void;
}

const FILTER_OPTIONS: Array<{ key: ClassType | 'all'; label: string }> = [
  { key: 'all', label: 'Wszystkie' },
  { key: 'lecture', label: 'Wykłady' },
  { key: 'conversational', label: 'Ćw. konwersatoryjne' },
  { key: 'exercises', label: 'Ćwiczenia' },
  { key: 'laboratory', label: 'Laboratoria' },
];

export const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className={styles.filterContainer}>
      {FILTER_OPTIONS.map(opt => (
        <Chip
          key={opt.key}
          selected={selectedType === opt.key}
          onClick={() => onSelectType(opt.key)}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
};
