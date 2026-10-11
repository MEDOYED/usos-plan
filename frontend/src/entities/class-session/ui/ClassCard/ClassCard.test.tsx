import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { ClassSession } from '../../../../shared/types/index.ts';
import { ClassCard } from './ClassCard.tsx';

const mockSession: ClassSession = {
  id: 'test-1',
  title: 'Rachunkowość zarządcza i zarządzanie finansami',
  rawSummary: 'CK - Rachunkowość zarządcza i zarządzanie finansami',
  type: 'conversational',
  typeLabel: 'Ćwiczenia konwersatoryjne',
  typeCode: 'CK',
  group: 'gr. 2',
  startTime: '2026-10-12T08:35:00.000Z',
  endTime: '2026-10-12T10:15:00.000Z',
  date: '2026-10-12',
  dayOfWeek: 1,
  dayName: 'Poniedziałek',
  startHour: '10:35',
  endHour: '12:15',
  durationMinutes: 100,
  room: '303',
  building: 'Wydział Zarządzania',
  location: 'Matejki 22/26, 90-238 Łódź',
  status: 'CONFIRMED',
};

describe('ClassCard component', () => {
  it('renders class details in Polish correctly', () => {
    render(<ClassCard session={mockSession} />);

    expect(screen.getByText('Rachunkowość zarządcza i zarządzanie finansami')).toBeInTheDocument();
    expect(screen.getByText('10:35 – 12:15')).toBeInTheDocument();
    expect(screen.getByText('Ćwiczenia konwersatoryjne')).toBeInTheDocument();
    expect(screen.getByText('Sala 303')).toBeInTheDocument();
    expect(screen.getByText('Wydział Zarządzania')).toBeInTheDocument();
  });

  it('triggers onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<ClassCard session={mockSession} onClick={handleClick} />);

    await userEvent.click(screen.getByText('Rachunkowość zarządcza i zarządzanie finansami'));
    expect(handleClick).toHaveBeenCalledWith(mockSession);
  });
});
