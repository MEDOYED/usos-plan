const POLISH_MONTHS = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
];

const POLISH_DAYS_SHORT = ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'];
const POLISH_DAYS_FULL = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
];

/**
 * Format YYYY-MM-DD to human friendly Polish date e.g. "12 października 2026"
 */
export function formatPolishDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;

  const monthName = POLISH_MONTHS[month - 1] || '';
  return `${day} ${monthName} ${year}`;
}

/**
 * Format range e.g. "12 - 18 października 2026"
 */
export function formatPolishDateRange(startStr: string, endStr: string): string {
  if (!startStr || !endStr) return '';
  const [, startM, startD] = startStr.split('-').map(Number);
  const [endY, endM, endD] = endStr.split('-').map(Number);

  if (startM === endM) {
    const monthName = POLISH_MONTHS[(endM || 1) - 1] || '';
    return `${startD} – ${endD} ${monthName} ${endY}`;
  }

  const startMonthName = POLISH_MONTHS[(startM || 1) - 1] || '';
  const endMonthName = POLISH_MONTHS[(endM || 1) - 1] || '';
  return `${startD} ${startMonthName} – ${endD} ${endMonthName} ${endY}`;
}

/**
 * Get YYYY-MM-DD for today in local/Europe/Warsaw time
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculate adjacent week date string (+7 or -7 days)
 */
export function shiftWeekDate(currentDateStr: string, offsetWeeks: number): string {
  const [y, m, d] = (currentDateStr || getTodayDateString()).split('-').map(Number);
  const date = new Date(y!, (m || 1) - 1, d!);
  date.setDate(date.getDate() + offsetWeeks * 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get all 7 days of the week starting from Monday for a given week start string
 */
export function getDaysOfWeek(mondayStr: string): Array<{ date: string; dayName: string; shortName: string; dayNumber: number }> {
  const [y, m, d] = (mondayStr || getTodayDateString()).split('-').map(Number);
  const days = [];

  for (let i = 0; i < 7; i++) {
    const current = new Date(y!, (m || 1) - 1, (d || 1) + i);
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const dayIdx = current.getDay();

    days.push({
      date: dateStr,
      dayName: POLISH_DAYS_FULL[dayIdx] ?? '',
      shortName: POLISH_DAYS_SHORT[dayIdx] ?? '',
      dayNumber: current.getDate(),
    });
  }

  return days;
}
