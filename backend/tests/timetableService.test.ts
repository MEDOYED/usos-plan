import { describe, expect, it } from 'bun:test';
import { getWeekBounds } from '../src/services/timetableService.ts';

describe('timetableService', () => {
  it('calculates correct week bounds (Monday to Sunday) for any given date', () => {
    // 2026-10-12 is a Monday
    const boundsMon = getWeekBounds('2026-10-12');
    expect(boundsMon.start).toBe('2026-10-12');
    expect(boundsMon.end).toBe('2026-10-18');

    // 2026-10-15 is a Thursday
    const boundsThu = getWeekBounds('2026-10-15');
    expect(boundsThu.start).toBe('2026-10-12');
    expect(boundsThu.end).toBe('2026-10-18');

    // 2026-10-18 is a Sunday
    const boundsSun = getWeekBounds('2026-10-18');
    expect(boundsSun.start).toBe('2026-10-12');
    expect(boundsSun.end).toBe('2026-10-18');
  });
});
