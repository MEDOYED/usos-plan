export type ClassType =
  | 'lecture'
  | 'conversational'
  | 'exercises'
  | 'laboratory'
  | 'seminar'
  | 'project'
  | 'other';

export interface ClassSession {
  id: string;
  title: string;
  rawSummary: string;
  type: ClassType;
  typeLabel: string;
  typeCode: string;
  group?: string;
  startTime: string; // ISO 8601 string
  endTime: string;   // ISO 8601 string
  date: string;      // YYYY-MM-DD format
  dayOfWeek: number; // 0 for Sunday, 1 for Monday, etc.
  dayName: string;   // Poniedziałek, Wtorek, etc.
  startHour: string; // HH:mm
  endHour: string;   // HH:mm
  durationMinutes: number;
  room: string;
  building: string;
  location: string;
  url?: string;
  status: string;
}

export interface TimetableMeta {
  calendarName: string;
  timezone: string;
  lastFetched: string;
  totalEvents: number;
  selectedDate?: string;
  weekStart?: string;
  weekEnd?: string;
}

export interface TimetableResponse {
  events: ClassSession[];
  meta: TimetableMeta;
}

export interface TodayResponse {
  date: string;
  dayName: string;
  events: ClassSession[];
  currentEvent?: ClassSession | null;
  nextEvent?: ClassSession | null;
  totalHours: number;
}

export interface CourseSummary {
  name: string;
  type: ClassType;
  typeLabel: string;
  typeCode: string;
  room: string;
  building: string;
  group?: string;
  sessionCount: number;
  totalHours: number;
  url?: string;
}

export interface SummaryResponse {
  courses: CourseSummary[];
  totalCourses: number;
  totalSessions: number;
  totalHours: number;
  typeBreakdown: Record<string, number>;
}
