import type { Meta, StoryObj } from '@storybook/react-vite';
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

const meta: Meta<typeof ClassCard> = {
  title: 'Entities/ClassSession/ClassCard',
  component: ClassCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClassCard>;

export const Default: Story = {
  args: {
    session: mockSession,
    isCurrent: false,
  },
};

export const CurrentlyActive: Story = {
  args: {
    session: mockSession,
    isCurrent: true,
  },
};
