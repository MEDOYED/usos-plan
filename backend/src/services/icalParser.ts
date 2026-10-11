import type { CalendarComponent, VEvent } from 'node-ical';
import type { ClassSession, ClassType } from '../types/index.ts';

const POLISH_DAYS = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
];

/**
 * Maps abbreviation code to ClassType and descriptive Polish label
 */
export function parseClassType(code: string): { type: ClassType; label: string } {
  const upper = (code || '').toUpperCase().trim();

  switch (upper) {
    case 'W':
    case 'W1':
    case 'W2':
    case 'WYK':
      return { type: 'lecture', label: 'Wykład' };
    case 'CK':
      return { type: 'conversational', label: 'Ćwiczenia konwersatoryjne' };
    case 'C':
    case 'CW':
      return { type: 'exercises', label: 'Ćwiczenia' };
    case 'L':
    case 'LAB':
      return { type: 'laboratory', label: 'Laboratorium' };
    case 'S':
    case 'SEM':
      return { type: 'seminar', label: 'Seminarium' };
    case 'P':
    case 'PROJ':
      return { type: 'project', label: 'Projekt' };
    case 'K':
    case 'KON':
      return { type: 'conversational', label: 'Konwersatorium' };
    default:
      return { type: 'other', label: upper || 'Zajęcia' };
  }
}

/**
 * Formats a Date object to YYYY-MM-DD in Europe/Warsaw timezone
 */
export function formatWarsawDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * Formats a Date object to HH:mm in Europe/Warsaw timezone
 */
export function formatWarsawTime(date: Date): string {
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formatter.format(date);
}

/**
 * Gets day of week (0-6) in Europe/Warsaw timezone
 */
export function getWarsawDayOfWeek(date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    weekday: 'short',
  }).format(date);

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[parts] ?? date.getDay();
}

/**
 * Parses a single VEVENT component from node-ical into a normalized ClassSession
 */
export function parseVEvent(event: VEvent): ClassSession | null {
  if (!event || event.type !== 'VEVENT' || !event.start || !event.end) {
    return null;
  }

  const rawSummary = (event.summary || '').trim();

  // Extract type code and title (e.g. "CK - Rachunkowość zarządcza..." or "W2 - ...")
  let typeCode = '';
  let title = rawSummary;

  const matchType = rawSummary.match(/^([A-Za-z0-9]+)\s*-\s*(.+)$/);
  if (matchType && matchType[1] && matchType[2]) {
    typeCode = matchType[1].trim();
    title = matchType[2].trim();
  }

  const { type, label: typeLabel } = parseClassType(typeCode);

  // Parse description fields
  const description = (event.description || '').trim();
  let room = '';
  let building = '';
  let url = '';
  let group = '';

  const roomMatch = description.match(/Sala:\s*([^\n\r]+)/i);
  if (roomMatch && roomMatch[1]) {
    room = roomMatch[1].trim();
  }

  const urlMatch = description.match(/(https?:\/\/[^\s\n\r]+)/i);
  if (urlMatch && urlMatch[1]) {
    url = urlMatch[1].trim();
    const grMatch = url.match(/gr_nr=(\d+)/i);
    if (grMatch && grMatch[1]) {
      group = `gr. ${grMatch[1]}`;
    }
  }

  // Find building by taking lines that are not Sala and not URL
  const descLines = description
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('Sala:') && !line.startsWith('http'));

  if (descLines.length > 0 && descLines[0]) {
    building = descLines[0];
  }

  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const durationMinutes = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));

  const dateStr = formatWarsawDate(startDate);
  const dayOfWeek = getWarsawDayOfWeek(startDate);
  const dayName = POLISH_DAYS[dayOfWeek] ?? 'Poniedziałek';
  const startHour = formatWarsawTime(startDate);
  const endHour = formatWarsawTime(endDate);

  return {
    id: String(event.uid || `${startDate.getTime()}-${title}`),
    title,
    rawSummary,
    type,
    typeLabel,
    typeCode,
    group: group || undefined,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    date: dateStr,
    dayOfWeek,
    dayName,
    startHour,
    endHour,
    durationMinutes,
    room: room || 'Brak sali',
    building: building || 'Uniwersytet Łódzki',
    location: (event.location || '').trim() || 'Wydział Zarządzania UŁ',
    url: url || undefined,
    status: (event.status || 'CONFIRMED').toUpperCase(),
  };
}

/**
 * Parses all VEVENT components from raw node-ical object
 */
export function parseAllEvents(rawComponents: Record<string, CalendarComponent>): ClassSession[] {
  const sessions: ClassSession[] = [];

  for (const key of Object.keys(rawComponents)) {
    const comp = rawComponents[key];
    if (comp && comp.type === 'VEVENT') {
      const parsed = parseVEvent(comp as VEvent);
      if (parsed) {
        sessions.push(parsed);
      }
    }
  }

  // Sort chronologically by startTime
  sessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return sessions;
}
