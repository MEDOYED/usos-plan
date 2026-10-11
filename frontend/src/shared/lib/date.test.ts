import { describe, expect, it } from 'vitest';
import {
  formatPolishDate,
  formatPolishDateRange,
  getDaysOfWeek,
  shiftWeekDate,
} from './date.ts';

describe('date library', () => {
  it('formats single date to Polish localized string', () => {
    expect(formatPolishDate('2026-10-12')).toBe('12 października 2026');
    expect(formatPolishDate('2026-05-03')).toBe('3 maja 2026');
  });

  it('formats date range within same month', () => {
    expect(formatPolishDateRange('2026-10-12', '2026-10-18')).toBe('12 – 18 października 2026');
  });

  it('formats date range spanning two different months', () => {
    expect(formatPolishDateRange('2026-10-26', '2026-11-01')).toBe('26 października – 1 listopada 2026');
  });

  it('shifts week date correctly by +1 or -1 week', () => {
    expect(shiftWeekDate('2026-10-12', 1)).toBe('2026-10-19');
    expect(shiftWeekDate('2026-10-12', -1)).toBe('2026-10-05');
  });

  it('returns 7 days of the week starting from Monday', () => {
    const days = getDaysOfWeek('2026-10-12');
    expect(days).toHaveLength(7);
    expect(days[0]?.dayName).toBe('Poniedziałek');
    expect(days[0]?.date).toBe('2026-10-12');
    expect(days[4]?.dayName).toBe('Piątek');
    expect(days[4]?.date).toBe('2026-10-16');
  });
});
