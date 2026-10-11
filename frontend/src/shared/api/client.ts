import type { SummaryResponse, TimetableResponse, TodayResponse } from '../types/index.ts';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(endpoint: string, params?: Record<string, string | boolean | undefined>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  const json = await response.json();
  if (!json.success && json.error) {
    throw new ApiError(json.error);
  }

  return json.data as T;
}

export const timetableApi = {
  getTimetable: (options: { week?: string; date?: string; refresh?: boolean } = {}) =>
    request<TimetableResponse>('/timetable', options),

  getToday: (refresh = false) =>
    request<TodayResponse>('/timetable/today', { refresh }),

  getSummary: (refresh = false) =>
    request<SummaryResponse>('/timetable/summary', { refresh }),
};
