import React from 'react';
import type { ClassType } from '../../../../shared/types/index.ts';
import { Badge } from '../../../../shared/ui/Badge/Badge.tsx';

interface ClassBadgeProps {
  type: ClassType;
  label: string;
}

export const ClassBadge: React.FC<ClassBadgeProps> = ({ type, label }) => {
  const getColor = (): 'primary' | 'secondary' | 'tertiary' | 'success' | 'default' => {
    switch (type) {
      case 'lecture':
        return 'primary';
      case 'conversational':
        return 'secondary';
      case 'exercises':
        return 'tertiary';
      case 'laboratory':
        return 'success';
      case 'seminar':
      case 'project':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return <Badge color={getColor()}>{label}</Badge>;
};
