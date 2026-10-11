import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  calendarUrl:
    process.env.CALENDAR_URL ||
    'https://usosapps.uni.lodz.pl/services/tt/upcoming_ical?lang=pl&user_id=289852&key=E9QUyC66pLRXYhQAABfp',
  cacheTtlMs: parseInt(process.env.CACHE_TTL_MS || '600000', 10), // 10 minutes default
  timezone: 'Europe/Warsaw',
};
