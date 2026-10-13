import ical from 'node-ical';
import { config } from '../config/index.ts';
import type {
  ClassSession,
  CourseSummary,
  SummaryResponse,
  TimetableMeta,
  TimetableResponse,
  TodayResponse,
} from '../types/index.ts';
import { formatWarsawDate, normalizeIcsTimezones, parseAllEvents } from './icalParser.ts';

interface CacheEntry {
  sessions: ClassSession[];
  calendarName: string;
  lastFetched: Date;
}

let memoryCache: CacheEntry | null = null;

/**
 * Fetches and parses the calendar feed with in-memory caching
 */
export async function fetchCalendar(forceRefresh = false): Promise<CacheEntry> {
  const now = new Date();

  if (
    !forceRefresh &&
    memoryCache &&
    now.getTime() - memoryCache.lastFetched.getTime() < config.cacheTtlMs
  ) {
    return memoryCache;
  }

  try {
    const response = await fetch(config.calendarUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
    }
    const rawIcs = await response.text();
    const normalizedIcs = normalizeIcsTimezones(rawIcs, config.timezone);
    const rawEvents = ical.parseICS(normalizedIcs);
    const sessions = parseAllEvents(rawEvents);

    const vcal = rawEvents.vcalendar as Record<string, string> | undefined;
    const calendarName =
      vcal?.['WR-CALNAME'] ||
      vcal?.['wr-calname'] ||
      'USOS - Plan zajęć';

    memoryCache = {
      sessions,
      calendarName,
      lastFetched: now,
    };

    return memoryCache;
  } catch (error) {
    // If live fetch fails but we have stale cache, return it
    if (memoryCache) {
      console.warn('Live fetch failed, returning stale cache:', error);
      return memoryCache;
    }
    throw error;
  }
}

/**
 * Calculates start and end of week (Monday to Sunday) for a given date
 */
export function getWeekBounds(targetDateStr: string): { start: string; end: string } {
  const [year, month, day] = targetDateStr.split('-').map(Number);
  if (!year || !month || !day) {
    const today = formatWarsawDate(new Date());
    return getWeekBounds(today);
  }

  // Create local date object
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = date.getUTCDay(); // 0 is Sunday, 1 is Monday

  // Calculate difference to Monday
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const formatUtcDate = (d: Date) => d.toISOString().split('T')[0]!;

  return {
    start: formatUtcDate(monday),
    end: formatUtcDate(sunday),
  };
}

/**
 * Get timetable with filtering
 */
export async function getTimetable(options: {
  week?: string;
  date?: string;
  refresh?: boolean;
}): Promise<TimetableResponse> {
  const cache = await fetchCalendar(options.refresh);
  const now = new Date();
  const todayStr = formatWarsawDate(now);

  let filtered = cache.sessions;
  let weekStart: string | undefined;
  let weekEnd: string | undefined;
  let selectedDate = options.date;

  if (options.date) {
    filtered = filtered.filter(s => s.date === options.date);
    selectedDate = options.date;
  } else {
    // Default to week filter
    const refDate = options.week || todayStr;
    const bounds = getWeekBounds(refDate);
    weekStart = bounds.start;
    weekEnd = bounds.end;

    filtered = filtered.filter(s => s.date >= bounds.start && s.date <= bounds.end);
  }

  const meta: TimetableMeta = {
    calendarName: cache.calendarName,
    timezone: config.timezone,
    lastFetched: cache.lastFetched.toISOString(),
    totalEvents: filtered.length,
    selectedDate,
    weekStart,
    weekEnd,
  };

  return {
    events: filtered,
    meta,
  };
}

/**
 * Get today's classes with active and upcoming indicators
 */
export async function getToday(refresh = false): Promise<TodayResponse> {
  const cache = await fetchCalendar(refresh);
  const now = new Date();
  const todayStr = formatWarsawDate(now);

  const todayEvents = cache.sessions.filter(s => s.date === todayStr);

  const nowMs = now.getTime();
  let currentEvent: ClassSession | null = null;
  let nextEvent: ClassSession | null = null;

  for (const session of todayEvents) {
    const startMs = new Date(session.startTime).getTime();
    const endMs = new Date(session.endTime).getTime();

    if (nowMs >= startMs && nowMs <= endMs) {
      currentEvent = session;
    } else if (startMs > nowMs && (!nextEvent || startMs < new Date(nextEvent.startTime).getTime())) {
      nextEvent = session;
    }
  }

  const totalMinutes = todayEvents.reduce((acc, s) => acc + s.durationMinutes, 0);
  const dayName = todayEvents[0]?.dayName || 'Dzisiaj';

  return {
    date: todayStr,
    dayName,
    events: todayEvents,
    currentEvent,
    nextEvent,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
  };
}

/**
 * Get analytical summary of enrolled courses
 */
export async function getSummary(refresh = false): Promise<SummaryResponse> {
  const cache = await fetchCalendar(refresh);

  const courseMap = new Map<string, CourseSummary>();
  const typeBreakdown: Record<string, number> = {};

  for (const session of cache.sessions) {
    // Count types
    typeBreakdown[session.typeLabel] = (typeBreakdown[session.typeLabel] || 0) + 1;

    // Aggregate courses
    const key = `${session.title}__${session.typeCode}`;
    const existing = courseMap.get(key);

    if (existing) {
      existing.sessionCount += 1;
      existing.totalHours += Math.round((session.durationMinutes / 60) * 10) / 10;
    } else {
      courseMap.set(key, {
        name: session.title,
        type: session.type,
        typeLabel: session.typeLabel,
        typeCode: session.typeCode,
        room: session.room,
        building: session.building,
        group: session.group,
        sessionCount: 1,
        totalHours: Math.round((session.durationMinutes / 60) * 10) / 10,
        url: session.url,
      });
    }
  }

  const courses = Array.from(courseMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'pl'));
  const totalMinutes = cache.sessions.reduce((acc, s) => acc + s.durationMinutes, 0);

  return {
    courses,
    totalCourses: courses.length,
    totalSessions: cache.sessions.length,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    typeBreakdown,
  };
}
