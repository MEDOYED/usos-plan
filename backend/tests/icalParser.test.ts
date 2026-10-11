import { describe, expect, it } from 'bun:test';
import type { VEvent } from 'node-ical';
import {
  formatWarsawDate,
  formatWarsawTime,
  getWarsawDayOfWeek,
  parseClassType,
  parseVEvent,
} from '../src/services/icalParser.ts';

describe('icalParser service', () => {
  it('correctly maps class types from acronyms to Polish descriptions', () => {
    expect(parseClassType('CK')).toEqual({
      type: 'conversational',
      label: 'Ćwiczenia konwersatoryjne',
    });
    expect(parseClassType('W')).toEqual({
      type: 'lecture',
      label: 'Wykład',
    });
    expect(parseClassType('W2')).toEqual({
      type: 'lecture',
      label: 'Wykład',
    });
    expect(parseClassType('L')).toEqual({
      type: 'laboratory',
      label: 'Laboratorium',
    });
    expect(parseClassType('C')).toEqual({
      type: 'exercises',
      label: 'Ćwiczenia',
    });
    expect(parseClassType('S')).toEqual({
      type: 'seminar',
      label: 'Seminarium',
    });
  });

  it('formats Warsaw dates and times properly', () => {
    // 2026-10-12 10:35 CEST (UTC+2) -> 08:35 UTC
    const date = new Date(Date.UTC(2026, 9, 12, 8, 35, 0));
    expect(formatWarsawDate(date)).toBe('2026-10-12');
    expect(formatWarsawTime(date)).toBe('10:35');
    expect(getWarsawDayOfWeek(date)).toBe(1); // Monday
  });

  it('correctly extracts and parses a standard USOS VEvent component', () => {
    const mockEvent: VEvent = {
      type: 'VEVENT',
      uid: 'test-event-123@usosapps.uni.lodz.pl',
      summary: 'CK - Rachunkowość zarządcza i zarządzanie finansami',
      start: new Date(Date.UTC(2026, 9, 12, 8, 35, 0)),
      end: new Date(Date.UTC(2026, 9, 12, 10, 15, 0)),
      description:
        'Sala: 303\nWydział Zarządzania\n\nhttps://usosweb.uni.lodz.pl/kontroler.php?_action=katalog2/przedmioty/pokazZajecia&gr_nr=2&zaj_cyk_id=499640\n',
      location: 'Matejki 22/26, 90-238 Łódź',
      status: 'CONFIRMED',
    } as unknown as VEvent;

    const parsed = parseVEvent(mockEvent);
    expect(parsed).not.toBeNull();
    if (!parsed) return;

    expect(parsed.id).toBe('test-event-123@usosapps.uni.lodz.pl');
    expect(parsed.title).toBe('Rachunkowość zarządcza i zarządzanie finansami');
    expect(parsed.type).toBe('conversational');
    expect(parsed.typeLabel).toBe('Ćwiczenia konwersatoryjne');
    expect(parsed.typeCode).toBe('CK');
    expect(parsed.group).toBe('gr. 2');
    expect(parsed.room).toBe('303');
    expect(parsed.building).toBe('Wydział Zarządzania');
    expect(parsed.location).toBe('Matejki 22/26, 90-238 Łódź');
    expect(parsed.startHour).toBe('10:35');
    expect(parsed.endHour).toBe('12:15');
    expect(parsed.durationMinutes).toBe(100);
    expect(parsed.dayName).toBe('Poniedziałek');
    expect(parsed.date).toBe('2026-10-12');
  });
});
