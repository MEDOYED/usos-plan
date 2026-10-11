import type { Request, Response } from 'express';
import * as timetableService from '../services/timetableService.ts';

export async function getTimetable(req: Request, res: Response): Promise<void> {
  try {
    const week = typeof req.query.week === 'string' ? req.query.week : undefined;
    const date = typeof req.query.date === 'string' ? req.query.date : undefined;
    const refresh = req.query.refresh === 'true';

    const data = await timetableService.getTimetable({ week, date, refresh });
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch timetable from USOS feed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function getToday(req: Request, res: Response): Promise<void> {
  try {
    const refresh = req.query.refresh === 'true';
    const data = await timetableService.getToday(refresh);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching today schedule:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch today schedule',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function getSummary(req: Request, res: Response): Promise<void> {
  try {
    const refresh = req.query.refresh === 'true';
    const data = await timetableService.getSummary(refresh);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching timetable summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch timetable summary',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export function getHealth(_req: Request, res: Response): void {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'USOS Timetable API',
  });
}
